"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { createGameDeck, type KyrgyzItem } from "@/lib/game-data";
import { MemoryCard } from "./memory-card";
import { FactModal } from "./fact-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { KyrgyzLogo } from "./kyrgyz-pattern";
import { Trophy, User, Users, Crown, Volume2, VolumeX, Music, Music2 } from "lucide-react";
import { useGameAudio } from "@/hooks/use-game-audio";

/* ------------------------------------------------------------------ */
/*  Types & config                                                      */
/* ------------------------------------------------------------------ */

type Difficulty = "easy" | "medium" | "hard";
type GamePhase = "select-players" | "enter-names" | "select-difficulty" | "playing" | "finished";

interface Player {
  id: number;
  name: string;
  score: number;
  dbId?: number; // ID from database if registered
}

const DIFFICULTY: Record<Difficulty, { pairs: number; cols: string; label: string }> = {
  easy:   { pairs: 8,  cols: "grid-cols-4",               label: "Easy (4 x 4)" },
  medium: { pairs: 12, cols: "grid-cols-4 sm:grid-cols-6", label: "Medium (6 x 4)" },
  hard:   { pairs: 16, cols: "grid-cols-4 sm:grid-cols-8", label: "Hard (8 x 4)" },
};

const PLAYER_COLORS = [
  "bg-primary text-primary-foreground",
  "bg-accent text-accent-foreground", 
  "bg-secondary text-secondary-foreground",
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function GameBoard() {
  /* ---------- game phase state ---------- */
  const [phase, setPhase] = useState<GamePhase>("select-players");
  const [playerCount, setPlayerCount] = useState(1);
  
  /* ---------- player state ---------- */
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerNames, setPlayerNames] = useState<string[]>(["", "", ""]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [nameErrors, setNameErrors] = useState<string[]>(["", "", ""]);
  
  /* ---------- game state ---------- */
  const [cards, setCards]             = useState<(KyrgyzItem & { uniqueId: string })[]>([]);
  const [flipped, setFlipped]         = useState<number[]>([]);
  const [matched, setMatched]         = useState<string[]>([]);
  const [moves, setMoves]             = useState(0);
  const [time, setTime]               = useState(0);
  const [difficulty, setDifficulty]   = useState<Difficulty>("easy");

  const [factItem, setFactItem]       = useState<KyrgyzItem | null>(null);
  const [factOpen, setFactOpen]       = useState(false);
  const [hint, setHint]               = useState<string | null>(null);
  const [checking, setChecking]       = useState(false);
  
  /* ---------- score saving state ---------- */
  const [scoreSaved, setScoreSaved] = useState(false);
  const [scoreSaving, setScoreSaving] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ---------- audio ---------- */
  const audio = useGameAudio();

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

  const currentPlayer = players[currentPlayerIndex];

  /* ---------- select player count ---------- */
  const selectPlayerCount = (count: number) => {
    setPlayerCount(count);
    setPlayerNames(["", "", ""]);
    setNameErrors(["", "", ""]);
    setPhase("enter-names");
  };

  /* ---------- validate and proceed to difficulty ---------- */
  const submitNames = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = ["", "", ""];
    let hasError = false;
    
    for (let i = 0; i < playerCount; i++) {
      if (playerNames[i].trim().length < 2) {
        errors[i] = "Name must be at least 2 characters";
        hasError = true;
      }
    }
    
    if (hasError) {
      setNameErrors(errors);
      return;
    }

    // Create players array
    const newPlayers: Player[] = [];
    
    for (let i = 0; i < playerCount; i++) {
      const name = playerNames[i].trim();
      
      // Try to register player in database
      try {
        const res = await fetch("/api/players", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });

        if (res.ok) {
          const data = await res.json();
          newPlayers.push({
            id: i + 1,
            name,
            score: 0,
            dbId: data.player.id,
          });
        } else {
          newPlayers.push({ id: i + 1, name, score: 0 });
        }
      } catch {
        newPlayers.push({ id: i + 1, name, score: 0 });
      }
    }

    setPlayers(newPlayers);
    setPhase("select-difficulty");
  };

  /* ---------- update player name input ---------- */
  const updatePlayerName = (index: number, value: string) => {
    const newNames = [...playerNames];
    newNames[index] = value;
    setPlayerNames(newNames);
    
    // Clear error when typing
    if (nameErrors[index]) {
      const newErrors = [...nameErrors];
      newErrors[index] = "";
      setNameErrors(newErrors);
    }
  };

  /* ---------- save score ---------- */
  const saveScores = useCallback(async () => {
    if (scoreSaved || scoreSaving) return;
    
    setScoreSaving(true);
    
    // Save score for winner (or single player)
    const winner = [...players].sort((a, b) => b.score - a.score)[0];
    
    if (winner?.dbId) {
      try {
        await fetch("/api/scores", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            player_id: winner.dbId,
            difficulty,
            moves,
            time_seconds: time,
            pairs_found: cards.length / 2,
            completed: true,
          }),
        });
        setScoreSaved(true);
      } catch (err) {
        console.error("Failed to save score:", err);
      }
    }
    
    setScoreSaving(false);
  }, [players, scoreSaved, scoreSaving, difficulty, moves, time, cards.length]);

  /* ---------- start / restart ---------- */
  const startGame = useCallback((diff: Difficulty) => {
    clearTimer();
    const deck = createGameDeck(DIFFICULTY[diff].pairs);
    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setTime(0);
    setDifficulty(diff);
    setCurrentPlayerIndex(0);
    setHint(null);
    setChecking(false);
    setFactItem(null);
    setFactOpen(false);
    setScoreSaved(false);
    setScoreSaving(false);
    
    // Reset player scores
    setPlayers(prev => prev.map(p => ({ ...p, score: 0 })));
    
    setPhase("playing");
  }, [clearTimer]);

  /* ---------- timer ---------- */
  useEffect(() => {
    if (phase === "playing" && matched.length < cards.length) {
      timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return clearTimer;
  }, [phase, matched.length, cards.length, clearTimer]);

  /* ---------- win detection ---------- */
  const isWon = cards.length > 0 && matched.length === cards.length;

  useEffect(() => {
    if (isWon && phase === "playing") {
      setPhase("finished");
      clearTimer();
      saveScores();
      audio.playWin();
      audio.stopMusic();
    }
  }, [isWon, phase, clearTimer, saveScores, audio]);

  /* ---------- switch to next player (multiplayer) ---------- */
  const switchToNextPlayer = useCallback(() => {
    if (players.length > 1) {
      setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
    }
  }, [players.length]);

  /* ---------- card click ---------- */
  const handleClick = useCallback((index: number) => {
    // guards
    if (checking) return;
    if (flipped.includes(index)) return;
    if (matched.includes(cards[index]?.uniqueId)) return;
    if (flipped.length >= 2) return;

    const next = [...flipped, index];
    setFlipped(next);
    audio.playFlip();

    // second card flipped
    if (next.length === 2) {
      setChecking(true);
      setMoves((m) => m + 1);

      const [a, b] = next;
      const cardA = cards[a];
      const cardB = cards[b];

      if (cardA.id === cardB.id) {
        // matched - current player gets a point
        setTimeout(() => {
          setMatched((prev) => [...prev, cardA.uniqueId, cardB.uniqueId]);
          setFlipped([]);
          setChecking(false);
          setFactItem(cardA);
          setFactOpen(true);
          audio.playMatch();
          
          // Update current player's score
          setPlayers(prev => prev.map((p, i) => 
            i === currentPlayerIndex ? { ...p, score: p.score + 1 } : p
          ));
          
          // Player gets another turn on match (don't switch)
        }, 450);
      } else {
        // mismatch -- show hint, flip back, switch player
        setHint(`Remember: ${cardA.name} and ${cardB.name} are in different positions!`);
        setTimeout(() => {
          setFlipped([]);
          setHint(null);
          setChecking(false);
          switchToNextPlayer();
        }, 1500);
      }
    }
  }, [cards, flipped, matched, checking, currentPlayerIndex, switchToNextPlayer]);

  /* ---------- restart completely ---------- */
  const restartCompletely = () => {
    clearTimer();
    setPhase("select-players");
    setPlayerCount(1);
    setPlayers([]);
    setPlayerNames(["", "", ""]);
    setCurrentPlayerIndex(0);
    setCards([]);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setTime(0);
  };

  const totalPairs   = cards.length / 2;
  const matchedPairs = matched.length / 2;
  
  // Get winner(s) for multiplayer
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];
  const isTie = players.length > 1 && sortedPlayers.filter(p => p.score === winner?.score).length > 1;

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

            {/* Stats -- desktop (during play) */}
            {phase === "playing" && (
              <div className="hidden sm:flex items-center gap-3 text-sm">
                <Stat label="Moves" value={String(moves)} />
                <Stat label="Time" value={formatTime(time)} mono />
                <Stat label="Pairs" value={`${matchedPairs}/${totalPairs}`} />
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Audio controls */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={audio.toggleSound}
                className="h-9 w-9 text-muted-foreground hover:text-foreground"
                title={audio.soundEnabled ? "Mute sounds" : "Unmute sounds"}
              >
                {audio.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={audio.toggleMusic}
                className={`h-9 w-9 ${audio.musicEnabled ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                title={audio.musicEnabled ? "Stop music" : "Play music"}
              >
                {audio.musicEnabled ? <Music className="w-4 h-4" /> : <Music2 className="w-4 h-4" />}
              </Button>
              
              {phase === "playing" && (
                <Button variant="outline" size="sm" onClick={() => startGame(difficulty)} className="font-semibold">
                  Restart
                </Button>
              )}
              <Link href="/leaderboard">
                <Button variant="ghost" size="sm" className="font-semibold text-muted-foreground">
                  <Trophy className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Leaderboard</span>
                </Button>
              </Link>
              <Button variant="ghost" size="sm" asChild className="font-semibold text-muted-foreground">
                <Link href="/">Home</Link>
              </Button>
            </div>
          </div>

          {/* Stats -- mobile */}
          {phase === "playing" && (
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
        
        {/* ==== PHASE: Select number of players ==== */}
        {phase === "select-players" && (
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-md w-full text-center">
              <KyrgyzLogo className="text-primary mx-auto mb-6" size={88} />
              <h2 className="text-3xl font-bold text-foreground mb-2">Select Players</h2>
              <p className="text-muted-foreground mb-8">How many players will be playing?</p>
              
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((count) => (
                  <Button
                    key={count}
                    onClick={() => selectPlayerCount(count)}
                    variant="outline"
                    size="lg"
                    className="w-full text-lg font-bold py-8 hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Users className="w-6 h-6 mr-3" />
                    {count} Player{count > 1 ? "s" : ""}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==== PHASE: Enter player names ==== */}
        {phase === "enter-names" && (
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-md w-full text-center">
              <KyrgyzLogo className="text-primary mx-auto mb-6" size={72} />
              <h2 className="text-3xl font-bold text-foreground mb-2">Enter Names</h2>
              <p className="text-muted-foreground mb-6">
                Enter nickname{playerCount > 1 ? "s" : ""} for {playerCount} player{playerCount > 1 ? "s" : ""}
              </p>
              
              <form onSubmit={submitNames} className="space-y-4">
                {Array.from({ length: playerCount }).map((_, index) => (
                  <div key={index} className="text-left">
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      <span className={cn(
                        "inline-flex items-center justify-center w-6 h-6 rounded-full mr-2 text-xs font-bold",
                        PLAYER_COLORS[index]
                      )}>
                        {index + 1}
                      </span>
                      Player {index + 1} {index === 0 && <span className="text-destructive">*</span>}
                    </label>
                    <Input
                      type="text"
                      placeholder={`Player ${index + 1} nickname`}
                      value={playerNames[index]}
                      onChange={(e) => updatePlayerName(index, e.target.value)}
                      maxLength={20}
                      className={cn(
                        "text-lg",
                        nameErrors[index] && "border-destructive"
                      )}
                      autoFocus={index === 0}
                    />
                    {nameErrors[index] && (
                      <p className="text-destructive text-sm mt-1">{nameErrors[index]}</p>
                    )}
                  </div>
                ))}
                
                <div className="pt-4 flex gap-3">
                  <Button 
                    type="button"
                    variant="outline"
                    size="lg"
                    className="flex-1 font-bold bg-transparent"
                    onClick={() => setPhase("select-players")}
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="flex-1 font-bold"
                  >
                    Continue
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ==== PHASE: Select difficulty ==== */}
        {phase === "select-difficulty" && (
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-md w-full text-center">
              <KyrgyzLogo className="text-primary mx-auto mb-6" size={72} />
              <h2 className="text-3xl font-bold text-foreground mb-2">Choose Difficulty</h2>
              
              {/* Show players */}
              <div className="flex justify-center gap-2 mb-6">
                {players.map((p, i) => (
                  <div key={p.id} className={cn(
                    "px-4 py-2 rounded-full text-sm font-semibold",
                    PLAYER_COLORS[i]
                  )}>
                    {p.name}
                  </div>
                ))}
              </div>
              
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
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-6 text-muted-foreground"
                onClick={() => setPhase("enter-names")}
              >
                Change names
              </Button>
            </div>
          </div>
        )}

        {/* ==== PHASE: Playing ==== */}
        {phase === "playing" && (
          <>
            {/* Player turn indicator (multiplayer) */}
            {players.length > 1 && (
              <div className="max-w-4xl mx-auto w-full mb-4">
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {players.map((p, i) => (
                    <div
                      key={p.id}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all",
                        i === currentPlayerIndex 
                          ? cn(PLAYER_COLORS[i], "ring-2 ring-offset-2 ring-primary scale-105")
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      <User className="w-4 h-4" />
                      <span>{p.name}</span>
                      <span className="font-bold">({p.score})</span>
                      {i === currentPlayerIndex && (
                        <span className="text-xs animate-pulse">Turn</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Single player score display */}
            {players.length === 1 && currentPlayer && (
              <div className="max-w-4xl mx-auto w-full mb-4">
                <div className="flex items-center justify-center">
                  <div className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold",
                    PLAYER_COLORS[0]
                  )}>
                    <User className="w-4 h-4" />
                    <span>{currentPlayer.name}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Hint banner */}
            {hint && (
              <div className="max-w-lg mx-auto mb-4 p-3 bg-secondary/40 border border-secondary rounded-xl text-center text-sm text-foreground animate-in fade-in slide-in-from-top-2">
                <strong className="mr-1">Hint:</strong>{hint}
              </div>
            )}

            {/* Card grid */}
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
          </>
        )}

        {/* ==== PHASE: Finished (Win screen) ==== */}
        {phase === "finished" && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-card border-2 border-primary/20 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl animate-in zoom-in-95 fade-in duration-300">
              <KyrgyzLogo className="text-primary mx-auto mb-4" size={80} />
              
              {players.length === 1 ? (
                <>
                  <h2 className="text-3xl font-bold text-foreground mb-2">Congratulations!</h2>
                  <p className="text-muted-foreground mb-6">
                    <strong className="text-foreground">{winner?.name}</strong>, you found all{" "}
                    <strong className="text-foreground">{totalPairs} pairs</strong> in{" "}
                    <strong className="text-foreground">{moves} moves</strong> and{" "}
                    <strong className="text-foreground font-mono">{formatTime(time)}</strong>!
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    {isTie ? "It's a Tie!" : "Winner!"}
                  </h2>
                  {!isTie && winner && (
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Crown className="w-8 h-8 text-yellow-500" />
                      <span className="text-2xl font-bold text-foreground">{winner.name}</span>
                    </div>
                  )}
                  
                  {/* Scoreboard */}
                  <div className="bg-muted/50 rounded-xl p-4 mb-6">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3">Final Scores</h3>
                    <div className="space-y-2">
                      {sortedPlayers.map((p, i) => (
                        <div 
                          key={p.id}
                          className={cn(
                            "flex items-center justify-between px-4 py-2 rounded-lg",
                            i === 0 && !isTie ? "bg-primary/10" : "bg-background"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            {i === 0 && !isTie && <Crown className="w-4 h-4 text-yellow-500" />}
                            <span className="font-semibold text-foreground">{p.name}</span>
                          </div>
                          <span className="text-xl font-bold text-foreground">{p.score}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="grid grid-cols-3 gap-3 mb-6">
                <StatCard label="Moves" value={String(moves)} />
                <StatCard label="Time"  value={formatTime(time)} />
                <StatCard label="Level" value={difficulty} />
              </div>

              {/* Score saving status */}
              <div className="bg-muted/50 rounded-lg p-3 mb-6 text-sm">
                {scoreSaving ? (
                  <span className="text-muted-foreground">Saving score...</span>
                ) : scoreSaved ? (
                  <span className="text-green-600 font-medium">Score saved to leaderboard!</span>
                ) : (
                  <span className="text-muted-foreground">Score will be saved automatically</span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={() => startGame(difficulty)} className="flex-1 font-bold">
                  Play Again
                </Button>
                <Link href="/leaderboard" className="flex-1">
                  <Button variant="outline" className="w-full font-bold bg-transparent">
                    <Trophy className="w-4 h-4 mr-2" />
                    Leaderboard
                  </Button>
                </Link>
              </div>
              <Button variant="ghost" className="mt-3 w-full text-muted-foreground" onClick={restartCompletely}>
                New Game (Change Players)
              </Button>
              <Button variant="ghost" asChild className="w-full text-muted-foreground">
                <Link href="/">Back to Home</Link>
              </Button>
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
