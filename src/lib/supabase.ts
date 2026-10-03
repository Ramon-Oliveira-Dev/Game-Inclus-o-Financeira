/// <reference types="vite/client" />
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const DEFAULT_SUPABASE_URL = "https://tvsvbconflodadnsrlzb.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2c3ZiY29uZmxvZGFkbnNybHpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwNzQxNTgsImV4cCI6MjEwMTY1MDE1OH0.byBkI6xc3SLoV7toBH_zBNix7Ky5bg5pTM3H2WNZcOg";

export function getStoredSupabaseConfig() {
  const envUrl = import.meta.env.VITE_SUPABASE_URL || "";
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

  const localUrl = typeof window !== "undefined" ? localStorage.getItem("VITE_SUPABASE_URL") || "" : "";
  const localKey = typeof window !== "undefined" ? localStorage.getItem("VITE_SUPABASE_ANON_KEY") || "" : "";

  const url = (envUrl || localUrl || DEFAULT_SUPABASE_URL).trim().replace(/^["']|["']$/g, "");
  const anonKey = (envKey || localKey || DEFAULT_SUPABASE_ANON_KEY).trim().replace(/^["']|["']$/g, "");

  return { url, anonKey, isFromEnv: Boolean(envUrl && envKey) };
}

export function createSupabaseInstance(): SupabaseClient | null {
  const { url: rawUrl, anonKey: rawKey } = getStoredSupabaseConfig();

  if (!rawUrl || !rawKey) return null;

  let supabaseUrl = rawUrl;
  if (!supabaseUrl.startsWith("http://") && !supabaseUrl.startsWith("https://")) {
    supabaseUrl = "https://" + supabaseUrl;
  }

  try {
    const urlObj = new URL(supabaseUrl);
    supabaseUrl = urlObj.origin;
    
    // Custom fetch wrapper to catch network errors gracefully (e.g. offline/Failed to fetch)
    const customFetch = (input: RequestInfo | URL, init?: RequestInit) => {
      return fetch(input, init).catch((err) => {
        console.warn("Supabase connection issue (offline or network restriction):", err?.message || err);
        return new Response(
          JSON.stringify({
            error: "network_error",
            message: "Sem conexão com o servidor do banco de dados.",
          }),
          {
            status: 503,
            statusText: "Service Unavailable",
            headers: { "Content-Type": "application/json" },
          }
        );
      });
    };

    return createClient(supabaseUrl, rawKey, {
      global: {
        fetch: customFetch,
      },
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    });
  } catch (err) {
    console.warn("Invalid Supabase URL:", rawUrl, err);
    return null;
  }
}

export function saveSupabaseConfig(url: string, anonKey: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("VITE_SUPABASE_URL", url.trim());
    localStorage.setItem("VITE_SUPABASE_ANON_KEY", anonKey.trim());
    // Reload page to apply changes cleanly across all context providers
    window.location.reload();
  }
}

export function clearSupabaseConfig() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("VITE_SUPABASE_URL");
    localStorage.removeItem("VITE_SUPABASE_ANON_KEY");
    window.location.reload();
  }
}

export const supabase: SupabaseClient | null = createSupabaseInstance();

