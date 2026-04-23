"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { KyrgyzLogo, DecorativeBorder } from "@/components/kyrgyz-pattern";
import { Trophy, Clock, ArrowLeft, Target, Medal, Users } from "lucide-react";

interface LeaderboardEntry {
  id: number;
  player_name: string;
  difficulty: string;
  moves: number;
  time_seconds: number;
  pairs_found: number;
  played_at: string;
}

interface DifficultyStats {
  difficulty: string;
  total_games: string;
  best_moves: number;
  best_time: number;
  avg_moves: string;
  avg_time: string;
}

type DifficultyFilter = "all" | "easy" | "medium" | "hard";

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [stats, setStats] = useState<DifficultyStats[]>([]);
  const [filter, setFilter] = useState<DifficultyFilter>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeaderboard();
  }, [filter]);

  async function fetchLeaderboard() {
    try {
      setLoading(true);
      const url = filter === "all" 
        ? "/api/leaderboard?limit=20" 
        : `/api/leaderboard?difficulty=${filter}&limit=20`;
      
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch leaderboard");
      
      const data = await res.json();
      setLeaderboard(data.leaderboard || []);
      setStats(data.stats || []);
      setError(null);
    } catch (err) {
      console.error("Leaderboard error:", err);
      setError("Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  }

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  function getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "hard": return "bg-red-100 text-red-800";
      default: return "bg-muted text-muted-foreground";
    }
  }

  function getMedalColor(rank: number): string {
    switch (rank) {
      case 1: return "text-yellow-500";
      case 2: return "text-gray-400";
      case 3: return "text-amber-600";
      default: return "text-muted-foreground";
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <KyrgyzLogo size={40} />
            <span className="font-bold text-lg text-foreground">Kyrgyz Memory</span>
          </Link>
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-8 bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Trophy className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Leaderboard</h1>
          </div>
          <p className="text-muted-foreground">Top memory masters of Kyrgyz culture</p>
        </div>
      </section>

      <DecorativeBorder className="text-primary" />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        {stats.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.difficulty}
                className="bg-card rounded-xl border border-border p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getDifficultyColor(stat.difficulty)}`}>
                    {stat.difficulty}
                  </span>
                  <Users className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {stat.total_games} games
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div className="flex items-center gap-2">
                    <Target className="w-3 h-3" />
                    Best: {stat.best_moves} moves
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    Best: {formatTime(stat.best_time)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(["all", "easy", "medium", "hard"] as const).map((level) => (
            <Button
              key={level}
              variant={filter === level ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(level)}
              className="capitalize"
            >
              {level === "all" ? "All Levels" : level}
            </Button>
          ))}
        </div>

        {/* Leaderboard Table */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-muted-foreground">Loading leaderboard...</p>
            </div>
          ) : error ? (
            <div className="p-12 text-center">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={fetchLeaderboard} variant="outline">
                Try Again
              </Button>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="p-12 text-center">
              <Trophy className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No scores yet. Be the first!</p>
              <Link href="/game">
                <Button>Play Now</Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Rank</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Player</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Level</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Moves</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Time</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {leaderboard.map((entry, index) => (
                    <tr key={entry.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {index < 3 ? (
                            <Medal className={`w-5 h-5 ${getMedalColor(index + 1)}`} />
                          ) : (
                            <span className="text-muted-foreground w-5 text-center">{index + 1}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-medium text-foreground">{entry.player_name}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getDifficultyColor(entry.difficulty)}`}>
                          {entry.difficulty}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-foreground">
                          <Target className="w-4 h-4 text-muted-foreground" />
                          {entry.moves}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-foreground">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          {formatTime(entry.time_seconds)}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {new Date(entry.played_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link href="/game">
            <Button size="lg" className="gap-2">
              <Trophy className="w-5 h-5" />
              Challenge the Leaderboard
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
