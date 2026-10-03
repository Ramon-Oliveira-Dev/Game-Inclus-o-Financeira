import { supabase } from "./supabase";
import { GameState } from "../types";

export async function syncProgressToSupabase(currentState: GameState, userId: string) {
  if (!userId || userId.startsWith("guest_") || !supabase) {
    console.log("Guest/Local user or no Supabase, skipping Supabase sync.");
    return true; // Pretend it succeeded
  }

  try {
    const payload = {
      id: userId,
      modulo_atual: currentState.ph,
      score_acumulado: currentState.score, // Idealmente o banco deveria somar isso, ou a aplicação soma os módulos
      game_data: {
        decisionHistory: currentState.decisionHistory || [],
        qual: currentState.qual,
        sust: currentState.sust,
        activeTriggers: currentState.activeTriggers || [],
      }
    };

    const { error } = await supabase
      .from("profiles")
      .upsert(payload);

    if (error) {
      console.warn("Supabase sync notice (operating in local mode):", error.message);
      return false;
    }

    return true; // Sucesso
  } catch (error: any) {
    console.warn("Notice syncing progress to Supabase (operating in local mode):", error?.message || error);
    return false; // Falha sem estourar console.error
  }
}

