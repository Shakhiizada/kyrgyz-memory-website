"use client";

import { useRef, useState, useCallback, useEffect } from "react";

export interface GameAudio {
  musicEnabled: boolean;
  toggleMusic: () => void;
  startMusic: () => void;
  stopMusic: () => void;
}

// Pleasant slow background melody
const BG_MUSIC_URL = "https://assets.mixkit.co/active_storage/sfx/123/123-preview.mp3";

export function useGameAudio(): GameAudio {
  const [musicEnabled, setMusicEnabled] = useState(false);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      bgMusicRef.current = new Audio(BG_MUSIC_URL);
      bgMusicRef.current.volume = 0.2;
      bgMusicRef.current.loop = true;
    }

    return () => {
      bgMusicRef.current?.pause();
    };
  }, []);

  const startMusic = useCallback(() => {
    if (bgMusicRef.current) {
      bgMusicRef.current.play().catch(() => {});
      setMusicEnabled(true);
    }
  }, []);

  const stopMusic = useCallback(() => {
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
      bgMusicRef.current.currentTime = 0;
      setMusicEnabled(false);
    }
  }, []);

  const toggleMusic = useCallback(() => {
    if (musicEnabled) {
      stopMusic();
    } else {
      startMusic();
    }
  }, [musicEnabled, startMusic, stopMusic]);

  return {
    musicEnabled,
    toggleMusic,
    startMusic,
    stopMusic,
  };
}
