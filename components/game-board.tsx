"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { createGameDeck, type KyrgyzItem } from "@/lib/game-data";
import { MemoryCard } from "./memory-card";
import { FactModal } from "./fact-modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { KyrgyzLogo } from "./kyrgyz-pattern";

/* ------------------------------------------------------------------ */
/*  Types & config                                                      */
/* ------------------------------------------------------------------ */

type Difficulty = "easy" | "medium" | "hard";

const DIFFICULTY: Record<Difficulty, { pairs: number; cols: string; label: string }> = {
  easy:   { pairs: 8,  cols: "grid-cols-4",               label: "Easy (4 x 4)" },
  medium: { pairs: 12, cols: "grid-cols-4 sm:grid-cols-6", label: "Medium (6 x 4)" },
  hard:   { pairs: 16, cols: "grid-cols-4 sm:grid-cols-8", label: "Hard (8 x 4)" },
};

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function GameBoard() {
  /* ---------- state ---------- */
  const [cards, setCards]             = useState<(KyrgyzItem & { uniqueId: string })[]>([]);
  const [flipped, setFlipped]         = useState<number[]>([]);
  const [matched, setMatched]         = useState<string[]>([]);
  const [moves, setMoves]             = useState(0);
  const [time, setTime]               = useState(0);
  const [playing, setPlaying]         = useState(false);
  const [difficulty, setDifficulty]   = useState<Difficulty>("easy");
  const [started, setStarted]         = useState(false);

  const [factItem, setFactItem]       = useState<KyrgyzItem | null>(null);
  const [factOpen, setFactOpen]       = useState(false);
  const [hint, setHint]               = useState<string | null>(null);
  const [checking, setChecking]       = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ---------- helpers ---------- */
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  /* ---------- start / restart ---------- */
  const startGame = useCallback((diff: Difficulty) => {
    clearTimer();
    const deck = createGameDeck(DIFFICULTY[diff].pairs);
    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setTime(0);
    setPlaying(true);
    setDifficulty(diff);
    setStarted(true);
    setHint(null);
    setChecking(false);
    setFactItem(null);
    setFactOpen(false);
  }, [clearTimer]);

  /* ---------- timer ---------- */
  useEffect(() => {
    if (playing && matched.length < cards.length) {
      timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return clearTimer;
  }, [playing, matched.length, cards.length, clearTimer]);

  /* ---------- win detection ---------- */
  const isWon = cards.length > 0 && matched.length === cards.length;

  useEffect(() => {
    if (isWon) {
      setPlaying(false);
      clearTimer();
    }
  }, [isWon, clearTimer]);

  /* ---------- card click ---------- */
  const handleClick = useCallback((index: number) => {
    // guards
    if (checking) return;
    if (flipped.includes(index)) return;
    if (matched.includes(cards[index]?.uniqueId)) return;
    if (flipped.length >= 2) return;

    const next = [...flipped, index];
    setFlipped(next);

    // second card flipped
    if (next.length === 2) {
      setChecking(true);
      setMoves((m) => m + 1);

      const [a, b] = next;
      const cardA = cards[a];
      const cardB = cards[b];

      if (cardA.id === cardB.id) {
        // matched
        setTimeout(() => {
          setMatched((prev) => [...prev, cardA.uniqueId, cardB.uniqueId]);
          setFlipped([]);
          setChecking(false);
          setFactItem(cardA);
          setFactOpen(true);
        }, 450);
      } else {
        // mismatch -- show hint, flip back
        setHint(`Remember: ${cardA.name} and ${cardB.name} are in different positions!`);
        setTimeout(() => {
          setFlipped([]);
          setHint(null);
          setChecking(false);
        }, 1500);
      }
    }
  }, [cards, flipped, matched, checking]);

  const totalPairs   = cards.length / 2;
  const matchedPairs = matched.length / 2;

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* -------- HEADER -------- */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <KyrgyzLogo className="text-primary transition-transform group-hover:scale-110" size={36} />
              <span className="font-extrabold text-lg text-foreground hidden sm:inline">Kyrgyz Memory</span>
            </Link>

            {/* Stats -- desktop */}
            {started && (
              <div className="hidden sm:flex items-center gap-3 text-sm">
                <Stat label="Moves" value={String(moves)} />
                <Stat label="Time" value={formatTime(time)} mono />
                <Stat label="Pairs" value={`${matchedPairs}/${totalPairs}`} />
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              {started && (
                <Button variant="outline" size="sm" onClick={() => startGame(difficulty)} className="font-semibold">
                  Restart
                </Button>
              )}
              <Button variant="ghost" size="sm" asChild className="font-semibold text-muted-foreground">
                <Link href="/">Home</Link>
              </Button>
            </div>
          </div>

          {/* Stats -- mobile */}
          {started && (
            <div className="sm:hidden flex items-center justify-center gap-4 mt-2 text-xs">
              <span className="text-muted-foreground">Moves: <strong className="text-foreground">{moves}</strong></span>
              <span className="text-muted-foreground">Time: <strong className="text-foreground font-mono">{formatTime(time)}</strong></span>
              <span className="text-muted-foreground">Pairs: <strong className="text-foreground">{matchedPairs}/{totalPairs}</strong></span>
            </div>
          )}
        </div>
      </header>

      {/* -------- MAIN -------- */}
      <main className="container mx-auto px-4 py-6 flex-1 flex flex-col">
        {/* ---- Difficulty selector (shown before game or after win dismissed) ---- */}
        {!playing && !isWon && (
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-sm w-full text-center">
              <KyrgyzLogo className="text-primary mx-auto mb-6" size={88} />
              <h2 className="text-3xl font-bold text-foreground mb-2">Choose Difficulty</h2>
              <p className="text-muted-foreground mb-8">Pick the grid size to begin.</p>
              <div className="flex flex-col gap-3">
                {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
                  <Button
                    key={d}
                    onClick={() => startGame(d)}
                    variant="outline"
                    size="lg"
                    className="w-full text-base font-bold capitalize hover:bg-primary hover:text-primary-foreground transition-colors py-6"
                  >
                    {DIFFICULTY[d].label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---- Hint banner ---- */}
        {hint && (
          <div className="max-w-lg mx-auto mb-4 p-3 bg-secondary/40 border border-secondary rounded-xl text-center text-sm text-foreground animate-in fade-in slide-in-from-top-2">
            <strong className="mr-1">Hint:</strong>{hint}
          </div>
        )}

        {/* ---- Card grid ---- */}
        {cards.length > 0 && playing && (
          <div
            className={cn(
              "grid gap-2 sm:gap-3 max-w-4xl mx-auto w-full",
              DIFFICULTY[difficulty].cols,
            )}
          >
            {cards.map((card, idx) => (
              <MemoryCard
                key={card.uniqueId}
                item={card}
                isFlipped={flipped.includes(idx)}
                isMatched={matched.includes(card.uniqueId)}
                onClick={() => handleClick(idx)}
                disabled={checking}
              />
            ))}
          </div>
        )}

        {/* ---- Win overlay ---- */}
        {isWon && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-card border-2 border-primary/20 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl animate-in zoom-in-95 fade-in duration-300">
              <KyrgyzLogo className="text-primary mx-auto mb-4" size={80} />
              <h2 className="text-3xl font-bold text-foreground mb-2">Congratulations!</h2>
              <p className="text-muted-foreground mb-6">
                You found all <strong className="text-foreground">{totalPairs} pairs</strong> in{" "}
                <strong className="text-foreground">{moves} moves</strong> and{" "}
                <strong className="text-foreground font-mono">{formatTime(time)}</strong>!
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <StatCard label="Moves" value={String(moves)} />
                <StatCard label="Time"  value={formatTime(time)} />
                <StatCard label="Level" value={difficulty} />
              </div>

              {/* Leaderboard placeholder */}
              <div className="bg-muted/50 rounded-lg p-3 mb-6 text-sm text-muted-foreground">
                Leaderboard coming soon!
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={() => startGame(difficulty)} className="flex-1 font-bold">
                  Play Again
                </Button>
                <Button variant="outline" asChild className="flex-1 font-bold bg-transparent">
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ---- Fact modal ---- */}
      <FactModal item={factItem} isOpen={factOpen} onClose={() => setFactOpen(false)} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Small helpers                                                       */
/* ------------------------------------------------------------------ */

function Stat({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full">
      <span className="text-muted-foreground">{label}:</span>
      <span className={cn("font-bold text-foreground", mono && "font-mono")}>{value}</span>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-muted rounded-xl p-3">
      <div className="text-2xl font-bold text-foreground capitalize">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
