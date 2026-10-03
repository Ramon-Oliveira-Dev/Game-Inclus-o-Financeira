import { useCallback, useEffect } from "react";
import {
  sndSwoosh,
  sndTick,
  sndClick,
  sndStart,
  sndFinish,
} from "../lib/audio";

// Custom hook to expose sound effects for game events using Web Audio API
export function useSound() {
  const playSwoosh = useCallback(() => sndSwoosh(), []);
  const playTick = useCallback(() => sndTick(), []);
  const playClick = useCallback(() => sndClick(), []);
  const playStart = useCallback(() => sndStart(), []);
  const playFinish = useCallback(() => sndFinish(), []);

  return {
    playSwoosh,
    playTick,
    playClick,
    playStart,
    playFinish,
  };
}
