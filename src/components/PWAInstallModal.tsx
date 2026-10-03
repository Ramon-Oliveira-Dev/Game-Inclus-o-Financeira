import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePWA } from "../contexts/PWAContext";
import { X, Copy, Check, Download, Share, Smartphone, ExternalLink, Globe } from "lucide-react";

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: string;
}

export function PWAInstallModal({ isOpen, onClose, lang }: PWAInstallModalProps) {
  const { isInstallable, installApp, appUrl } = usePWA();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(appUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const isIOS = typeof window !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="pwa-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#020617]/80 backdrop-blur-md z-[10000]"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[10001] pointer-events-none">
            <motion.div
              key="pwa-content"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-slate-900/95 border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative flex flex-col pointer-events-auto backdrop-blur-xl"
            >
              {/* Top Cyan Accent bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer active:scale-95"
              >
                <X size={16} />
              </button>

              <div className="p-5 md:p-6 flex flex-col gap-5 overflow-y-auto max-h-[85vh] scrollbar-hide">
                {/* Header info */}
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-xl bg-[#0a1220] border border-cyan-500/30 p-1 flex items-center justify-center shadow-lg shadow-cyan-500/10 shrink-0">
                    <img
                      src="/logo_app.png?v=5"
                      alt="Logo App"
                      className="w-full h-full object-contain rounded"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white leading-tight">
                      {lang === "pt"
                        ? "Instalar no Celular / Desktop"
                        : lang === "es"
                        ? "Instalar en Celular / Escritorio"
                        : "Install App on Mobile / Desktop"}
                    </h3>
                    <p className="text-xs text-cyan-400 font-bold tracking-wide mt-0.5">
                      PWA (Progressive Web App)
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed text-left">
                  {lang === "pt"
                    ? "Instale o aplicativo na sua tela de início para jogar com desempenho otimizado, suporte offline e acesso imediato com apenas um clique, livre de anúncios ou restrições."
                    : lang === "es"
                    ? "Instala la aplicación en tu pantalla de inicio para jugar con un rendimiento optimizado, soporte sin conexión y acceso inmediato con un solo clic, libre de anuncios o restricciones."
                    : "Install the app on your home screen for optimized performance, offline support, and immediate access in just one click—free of ads or restrictions."}
                </p>

                {/* Primary Install Trigger */}
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-left text-white/90 font-bold text-xs">
                    <Smartphone size={16} className="text-cyan-400" />
                    <span>
                      {lang === "pt"
                        ? "Opção 1: Instalação Direta"
                        : lang === "es"
                        ? "Opción 1: Instalación Directa"
                        : "Option 1: Direct Installation"}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 text-left">
                    {isInstallable
                      ? lang === "pt"
                        ? "Seu navegador suporta instalação direta! Clique abaixo para iniciar o download instantâneo."
                        : lang === "es"
                        ? "¡Tu navegador soporta instalación directa! Haz clic abajo para iniciar la descarga instantánea."
                        : "Your browser supports direct installation! Click below to start the instant download."
                      : lang === "pt"
                      ? "Se o botão abaixo não abrir o prompt nativo, siga as instruções rápidas da Opção 2 abaixo."
                      : lang === "es"
                      ? "Si el botón de abajo no abre el mensaje nativo, sigue as instrucciones de la Opción 2."
                      : "If the button below doesn't open the native prompt, follow the quick steps in Option 2 below."}
                  </p>

                  <button
                    onClick={() => {
                      installApp();
                    }}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black uppercase text-xs tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-500/20 active:scale-95"
                  >
                    <Download size={15} />
                    <span>
                      {lang === "pt"
                        ? "Instalar Agora"
                        : lang === "es"
                        ? "Instalar Ahora"
                        : "Install Now"}
                    </span>
                  </button>
                </div>

                {/* Manual Installation Instruction */}
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex flex-col gap-3 text-left">
                  <div className="flex items-center gap-2 font-bold text-white/90 text-xs">
                    <Share size={16} className="text-yellow-400" />
                    <span>
                      {lang === "pt"
                        ? "Opção 2: Instalação Manual"
                        : lang === "es"
                        ? "Opción 2: Instalación Manual"
                        : "Option 2: Manual Installation"}
                    </span>
                  </div>

                  {isIOS ? (
                    <ol className="text-[11px] text-slate-300 space-y-2 list-decimal list-inside pl-1">
                      <li>
                        {lang === "pt"
                          ? "Abra esta página no navegador Safari."
                          : lang === "es"
                          ? "Abre esta página en el navegador Safari."
                          : "Open this page in the Safari browser."}
                      </li>
                      <li>
                        {lang === "pt"
                          ? "Toque no botão de Compartilhar (ícone quadrado com uma seta para cima)."
                          : lang === "es"
                          ? "Toca el botón de Compartir (icono cuadrado con flecha hacia arriba)."
                          : "Tap the Share button (square icon with an arrow pointing up)."}
                      </li>
                      <li>
                        {lang === "pt"
                          ? "Role a lista e selecione 'Adicionar à Tela de Início'."
                          : lang === "es"
                          ? "Desplázate hacia abajo y selecciona 'Agregar a la pantalla de inicio'."
                          : "Scroll down and select 'Add to Home Screen'."}
                      </li>
                      <li>
                        {lang === "pt"
                          ? "Confirme no canto superior direito para finalizar!"
                          : lang === "es"
                          ? "¡Confirma en la esquina superior derecha para finalizar!"
                          : "Confirm in the top right corner to finish!"}
                      </li>
                    </ol>
                  ) : (
                    <ol className="text-[11px] text-slate-300 space-y-2 list-decimal list-inside pl-1">
                      <li>
                        {lang === "pt"
                          ? "Toque nos três pontos (menu do navegador) no topo ou rodapé."
                          : lang === "es"
                          ? "Toca los tres puntos (menú del navegador) arriba o abajo."
                          : "Tap the three dots (browser menu) at the top or bottom."}
                      </li>
                      <li>
                        {lang === "pt"
                          ? "Selecione 'Instalar aplicativo' ou 'Adicionar à tela inicial'."
                          : lang === "es"
                          ? "Selecciona 'Instalar aplicación' o 'Agregar a la pantalla de inicio'."
                          : "Select 'Install app' or 'Add to Home Screen'."}
                      </li>
                      <li>
                        {lang === "pt"
                          ? "Confirme o download na janela que se abre."
                          : lang === "es"
                          ? "Confirma la descarga en la ventana que se abre."
                          : "Confirm the download in the popup dialog."}
                      </li>
                    </ol>
                  )}
                </div>

                {/* Link Sharing & QR Code with Copy button */}
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex flex-col gap-4 text-left">
                  <div className="flex items-center gap-2 font-bold text-white/90 text-xs">
                    <Globe size={16} className="text-emerald-400" />
                    <span>
                      {lang === "pt"
                        ? "Escanear QR Code ou Copiar Link"
                        : lang === "es"
                        ? "Escanear Código QR o Copiar Enlace"
                        : "Scan QR Code or Copy Link"}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {lang === "pt"
                      ? "Aponte a câmera do seu celular para o QR Code abaixo para abrir o app diretamente, ou copie o link para compartilhar."
                      : lang === "es"
                      ? "Apunta la cámara de tu celular al código QR de abajo para abrir la aplicación directamente, o copia el enlace para compartir."
                      : "Point your phone camera at the QR Code below to open the app directly, or copy the link to share."}
                  </p>

                  {/* QR Code Container */}
                  <div className="flex flex-col items-center justify-center py-2 bg-black/20 rounded-xl border border-white/5 p-3">
                    <div className="bg-white p-2.5 rounded-xl shadow-2xl flex items-center justify-center w-[160px] h-[160px]">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(appUrl)}&margin=4`}
                        alt="QR Code"
                        className="w-[140px] h-[140px] object-contain select-none"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-[10px] text-cyan-400 font-mono font-bold tracking-widest mt-2 uppercase">
                      {lang === "pt" ? "Aponte a Câmera" : lang === "es" ? "Apunta la Cámara" : "Point Camera"}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={appUrl}
                      className="bg-black/30 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-300 flex-1 select-all focus:outline-none focus:border-cyan-500/40 font-mono truncate"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="px-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-all cursor-pointer active:scale-95 flex items-center justify-center shrink-0 gap-1.5 text-xs font-semibold"
                      title={lang === "pt" ? "Copiar Link" : lang === "es" ? "Copiar Enlace" : "Copy Link"}
                    >
                      {copied ? (
                        <>
                          <Check size={14} className="text-emerald-400" />
                          <span className="text-emerald-400">{lang === "pt" ? "Copiado" : lang === "es" ? "Copiado" : "Copied"}</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} className="text-slate-400" />
                          <span>{lang === "pt" ? "Copiar" : lang === "es" ? "Copiar" : "Copy"}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-950/60 border-t border-white/5 flex justify-end shrink-0">
                <button
                  onClick={onClose}
                  className="px-4 py-1.5 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer active:scale-95"
                >
                  {lang === "pt" ? "Fechar" : lang === "es" ? "Cerrar" : "Close"}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
