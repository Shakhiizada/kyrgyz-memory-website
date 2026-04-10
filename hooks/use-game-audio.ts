"use client";

import { useRef, useState, useCallback, useEffect } from "react";

export interface GameAudio {
  soundEnabled: boolean;
  musicEnabled: boolean;
  toggleSound: () => void;
  toggleMusic: () => void;
  playFlip: () => void;
  playMatch: () => void;
  playWin: () => void;
  startMusic: () => void;
  stopMusic: () => void;
}

// Audio URLs (using free sound effects)
const SOUNDS = {
  flip: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3",
  match: "https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3",
  win: "https://assets.mixkit.co/active_storage/sfx/1432/1432-preview.mp3",
  bgMusic: "https://assets.mixkit.co/active_storage/sfx/2779/2779-preview.mp3",
};

export function useGameAudio(): GameAudio {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);
  
  const flipAudioRef = useRef<HTMLAudioElement | null>(null);
  const matchAudioRef = useRef<HTMLAudioElement | null>(null);
  const winAudioRef = useRef<HTMLAudioElement | null>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio elements on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      flipAudioRef.current = new Audio(SOUNDS.flip);
      flipAudioRef.current.volume = 0.3;
      
      matchAudioRef.current = new Audio(SOUNDS.match);
      matchAudioRef.current.volume = 0.4;
      
      winAudioRef.current = new Audio(SOUNDS.win);
      winAudioRef.current.volume = 0.5;
      
      bgMusicRef.current = new Audio(SOUNDS.bgMusic);
      bgMusicRef.current.volume = 0.15;
      bgMusicRef.current.loop = true;
    }
    
    return () => {
      bgMusicRef.current?.pause();
    };
  }, []);

  const playFlip = useCallback(() => {
    if (soundEnabled && flipAudioRef.current) {
      flipAudioRef.current.currentTime = 0;
      flipAudioRef.current.play().catch(() => {});
    }
  }, [soundEnabled]);

  const playMatch = useCallback(() => {
    if (soundEnabled && matchAudioRef.current) {
      matchAudioRef.current.currentTime = 0;
      matchAudioRef.current.play().catch(() => {});
    }
  }, [soundEnabled]);

  const playWin = useCallback(() => {
    if (soundEnabled && winAudioRef.current) {
      winAudioRef.current.currentTime = 0;
      winAudioRef.current.play().catch(() => {});
    }
  }, [soundEnabled]);

  const startMusic = useCallback(() => {
    if (musicEnabled && bgMusicRef.current) {
      bgMusicRef.current.play().catch(() => {});
    }
  }, [musicEnabled]);

  const stopMusic = useCallback(() => {
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
      bgMusicRef.current.currentTime = 0;
    }
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  const toggleMusic = useCallback(() => {
    setMusicEnabled((prev) => {
      const newValue = !prev;
      if (newValue && bgMusicRef.current) {
        bgMusicRef.current.play().catch(() => {});
      } else if (!newValue && bgMusicRef.current) {
        bgMusicRef.current.pause();
      }
      return newValue;
    });
  }, []);

  return {
    soundEnabled,
    musicEnabled,
    toggleSound,
    toggleMusic,
    playFlip,
    playMatch,
    playWin,
    startMusic,
    stopMusic,
  };
}
