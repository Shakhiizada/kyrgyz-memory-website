"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { KyrgyzLogo, DecorativeBorder } from "@/components/kyrgyz-pattern";
import { kyrgyzItems } from "@/lib/game-data";
import { Trophy } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Static data                                                         */
/* ------------------------------------------------------------------ */

const features = [
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="9" height="9" rx="1" />
        <rect x="13" y="2" width="9" height="9" rx="1" />
        <rect x="2" y="13" width="9" height="9" rx="1" />
        <rect x="13" y="13" width="9" height="9" rx="1" />
      </svg>
    ),
    title: "Match Cards",
    description: "Flip and pair traditional Kyrgyz cultural symbols in a classic memory game.",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    title: "Learn Culture",
    description: "Every match reveals a fascinating fact about Kyrgyz heritage and traditions.",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 7 7 7 7" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5C17 4 17 7 17 7" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    ),
    title: "Challenge Yourself",
    description: "Three difficulty levels -- Easy, Medium, and Hard -- to test your memory skills.",
  },
];

const showcaseItems = kyrgyzItems.slice(0, 6);

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  const [rulesOpen, setRulesOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* ======== NAVBAR ======== */}
      <nav className="sticky top-0 z-20 bg-background/90 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <KyrgyzLogo className="text-primary" size={36} />
            <span className="font-extrabold text-lg text-foreground tracking-tight">Kyrgyz Memory</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/leaderboard">
              <Button variant="ghost" size="sm" className="font-semibold text-muted-foreground hover:text-foreground">
                <Trophy className="w-4 h-4 mr-1" />
                Leaderboard
              </Button>
            </Link>
            <Dialog open={rulesOpen} onOpenChange={setRulesOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="font-semibold text-muted-foreground hover:text-foreground">
                  Rules
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg border-2 border-primary/20">
                <DialogHeader>
                  <DialogTitle className="text-2xl flex items-center gap-3">
                    <KyrgyzLogo className="text-primary" size={36} />
                    How to Play
                  </DialogTitle>
                </DialogHeader>
                <DecorativeBorder className="text-primary my-2" />
                <DialogDescription asChild>
                  <div className="space-y-4 text-foreground">
                    <div className="space-y-3">
                      {[
                        ["1", "Click any card", "to flip it and reveal a Kyrgyz cultural symbol."],
                        ["2", "Click a second card", "to find its match. Remember positions!"],
                        ["3", "Match all pairs", "to win. Each match reveals an educational fact."],
                      ].map(([n, bold, rest]) => (
                        <div key={n} className="flex gap-3 items-start">
                          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">{n}</span>
                          <p><strong>{bold}</strong> {rest}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-muted rounded-lg p-4 mt-4">
                      <h4 className="font-bold mb-2">Difficulty Levels:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li><strong className="text-foreground">Easy:</strong> 16 cards (8 pairs) -- 4 x 4 grid</li>
                        <li><strong className="text-foreground">Medium:</strong> 24 cards (12 pairs) -- 6 x 4 grid</li>
                        <li><strong className="text-foreground">Hard:</strong> 32 cards (16 pairs) -- 8 x 4 grid</li>
                      </ul>
                    </div>
                  </div>
                </DialogDescription>
                <div className="flex justify-end mt-4">
                  <Button onClick={() => setRulesOpen(false)} className="font-semibold">Got it!</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button asChild size="sm" className="font-bold">
              <Link href="/game">Play Now</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* ======== HERO ======== */}
      <section className="relative overflow-hidden">
        {/* Faint background logos */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none" aria-hidden="true">
          <div className="absolute top-8 left-8"><KyrgyzLogo size={200} /></div>
          <div className="absolute bottom-8 right-8"><KyrgyzLogo size={160} /></div>
        </div>

        <div className="container mx-auto px-4 pt-16 pb-20 sm:pt-24 sm:pb-28 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Big circular felt logo */}
            <div className="flex justify-center mb-8">
              <div className="drop-shadow-2xl">
                <KyrgyzLogo size={150} />
              </div>
            </div>

            <h1 className="text-5xl sm:text-7xl font-extrabold text-foreground mb-3 tracking-tight text-balance">
              Kyrgyz<span className="text-primary"> Memory</span>
            </h1>

            <DecorativeBorder className="text-primary max-w-xs mx-auto my-5" />

            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed text-pretty">
              Discover the rich cultural heritage of Kyrgyzstan through a fun memory card game.
              Match traditional instruments, costumes, ornaments, and animals while
              learning fascinating facts about this beautiful Central Asian nation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg font-bold px-10 py-6 shadow-lg hover:shadow-xl transition-all">
                <Link href="/game">Start Game</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg font-bold px-10 py-6 bg-transparent"
                onClick={() => setRulesOpen(true)}
              >
                About / Rules
              </Button>
            </div>
            <div className="mt-6">
              <Link href="/leaderboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Trophy className="w-4 h-4" />
                <span className="text-sm font-medium">View Leaderboard</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======== FEATURES ======== */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-4 text-balance">
            Why Play Kyrgyz Memory?
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            A unique blend of entertainment and education rooted in Central Asian heritage.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-md hover:border-primary/20 transition-all text-center group"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary/15 transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-bold text-lg text-card-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== CULTURAL PREVIEW ======== */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-4 text-balance">
            Discover Kyrgyz Culture
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            From ancient instruments to majestic animals, explore the symbols that define
            Kyrgyzstan{"'"}s rich heritage.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {showcaseItems.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-2xl p-4 shadow-sm border border-border hover:shadow-md hover:-translate-y-1 transition-all cursor-default group"
              >
                <div
                  className="w-full aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <span className="text-4xl">{item.emoji}</span>
                  )}
                </div>
                <h4 className="font-semibold text-sm text-card-foreground text-center truncate">{item.name}</h4>
                <p className="text-xs text-muted-foreground text-center">{item.nameKyrgyz}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild size="lg" className="font-bold px-8">
              <Link href="/game">Start Playing Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ======== ABOUT KYRGYZSTAN ======== */}
      <section className="py-16 sm:py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <KyrgyzLogo className="text-primary mx-auto mb-6" size={72} />
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
              About Kyrgyzstan
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Kyrgyzstan is a mountainous country in Central Asia, known for its stunning
              natural beauty, nomadic traditions, and rich cultural heritage. The Tian Shan
              mountains dominate the landscape, while the people maintain traditions
              passed down through countless generations.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The circular logo of this game is inspired by traditional Kyrgyz felt art,
              depicting the snow-capped Tian Shan mountains and a winding river --
              symbols of the country{"'"}s breathtaking nature. The Tunduk crown at the
              top represents the unity of 40 Kyrgyz tribes, as seen on the national flag.
            </p>
          </div>
        </div>
      </section>

      {/* ======== FOOTER ======== */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2.5 mb-3">
            <KyrgyzLogo className="text-primary" size={28} />
            <span className="font-bold text-foreground">Kyrgyz Memory</span>
          </div>
          <p className="text-sm text-muted-foreground">
            An educational game celebrating Kyrgyz culture and heritage.
          </p>
        </div>
      </footer>
    </div>
  );
}
