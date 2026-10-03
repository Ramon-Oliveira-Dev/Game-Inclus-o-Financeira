import React, { createContext, useContext, useState, useEffect } from "react";

interface PWAContextType {
  isInstallable: boolean;
  isInstalled: boolean;
  showiOSInstruction: boolean;
  setShowiOSInstruction: (show: boolean) => void;
  installApp: () => Promise<void>;
  appUrl: string;
}

const PWAContext = createContext<PWAContextType | undefined>(undefined);

export function PWAProvider({ children }: { children: React.ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showiOSInstruction, setShowiOSInstruction] = useState(false);

  const appUrl = React.useMemo(() => {
    try {
      let origin = window.location.origin;
      // Se estiver no domínio do desenvolvedor (-dev-), substitui por -pre- para abrir diretamente a versão final estável (Shared App URL)
      if (origin.includes("-dev-")) {
        origin = origin.replace("-dev-", "-pre-");
      }
      return origin;
    } catch (e) {
      return "https://ais-pre-quexd6q7qh5mww7kip5ho4-90978133043.us-west1.run.app";
    }
  }, []);

  useEffect(() => {
    // Check if already installed / running in standalone mode
    const isStandalone = 
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes("android-app://");
    
    setIsInstalled(!!isStandalone);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Listen for the app being installed
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const installApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      try {
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
          setIsInstalled(true);
          setIsInstallable(false);
          setDeferredPrompt(null);
        }
      } catch (err) {
        console.error("Error triggering native install prompt:", err);
      }
    } else {
      // If we don't have the event (e.g. on iOS Safari or already installed),
      // we show our comprehensive installation guide modal.
      setShowiOSInstruction(true);
    }
  };

  return (
    <PWAContext.Provider
      value={{
        isInstallable,
        isInstalled,
        showiOSInstruction,
        setShowiOSInstruction,
        installApp,
        appUrl
      }}
    >
      {children}
    </PWAContext.Provider>
  );
}

export function usePWA() {
  const context = useContext(PWAContext);
  if (context === undefined) {
    throw new Error("usePWA must be used within a PWAProvider");
  }
  return context;
}
