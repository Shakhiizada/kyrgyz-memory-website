"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { KyrgyzLogo, DecorativeBorder } from "@/components/kyrgyz-pattern";
import { useAuth } from "@/contexts/auth-context";
import { Trophy, Clock, Target, Gamepad2, User, LogOut, ArrowLeft } from "lucide-react";

interface GameScore {
  id: number;
  difficulty: string;
  moves: number;
  time_seconds: number;
  pairs_found: number;
  played_at: string;
}

interface Stats {
  totalGames: number;
  totalPairs: number;
  bestTime: number | null;
  avgMoves: number | null;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [scores, setScores] = useState<GameScore[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalGames: 0,
    totalPairs: 0,
    bestTime: null,
    avgMoves: null,
  });
  const [loadingScores, setLoadingScores] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Fetch user scores
  useEffect(() => {
    if (user) {
      fetch(`/api/scores?username=${user.username}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.scores) {
            setScores(data.scores);
            
            // Calculate stats
            const totalGames = data.scores.length;
            const totalPairs = data.scores.reduce((acc: number, s: GameScore) => acc + s.pairs_found, 0);
            const times = data.scores.map((s: GameScore) => s.time_seconds).filter((t: number) => t > 0);
            const bestTime = times.length > 0 ? Math.min(...times) : null;
            const avgMoves = totalGames > 0 
              ? Math.round(data.scores.reduce((acc: number, s: GameScore) => acc + s.moves, 0) / totalGames) 
              : null;
            
            setStats({ totalGames, totalPairs, bestTime, avgMoves });
          }
          setLoadingScores(false);
        })
        .catch(() => setLoadingScores(false));
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <KyrgyzLogo size={80} className="text-primary opacity-50" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <KyrgyzLogo className="text-primary" size={36} />
            <span className="font-extrabold text-lg text-foreground hidden sm:inline">Kyrgyz Memory</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="font-semibold text-muted-foreground">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout} className="font-semibold">
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">{user.username}</h1>
          <p className="text-muted-foreground">Player Profile</p>
        </div>

        <DecorativeBorder className="text-primary mb-8" />

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard 
            icon={<Gamepad2 className="w-5 h-5" />}
            label="Games Played"
            value={stats.totalGames}
          />
          <StatCard 
            icon={<Target className="w-5 h-5" />}
            label="Total Pairs"
            value={stats.totalPairs}
          />
          <StatCard 
            icon={<Clock className="w-5 h-5" />}
            label="Best Time"
            value={stats.bestTime ? formatTime(stats.bestTime) : "-"}
          />
          <StatCard 
            icon={<Trophy className="w-5 h-5" />}
            label="Avg Moves"
            value={stats.avgMoves ?? "-"}
          />
        </div>

        {/* Game History */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Game History
          </h2>

          {loadingScores ? (
            <p className="text-muted-foreground text-center py-8">Loading games...</p>
          ) : scores.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No games played yet</p>
              <Button asChild>
                <Link href="/game">Play Your First Game</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {scores.slice(0, 10).map((score) => (
                <div 
                  key={score.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                      score.difficulty === "easy" 
                        ? "bg-green-100 text-green-700"
                        : score.difficulty === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {score.difficulty}
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">
                        {score.pairs_found} pairs in {score.moves} moves
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(score.played_at)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-foreground">
                      {formatTime(score.time_seconds)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg" className="font-bold">
            <Link href="/game">Play Game</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-bold bg-transparent">
            <Link href="/leaderboard">View Leaderboard</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 text-center">
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary mb-2">
        {icon}
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
