"use client";

import { type KyrgyzItem } from "@/lib/game-data";
import { cn } from "@/lib/utils";
import { TundukIcon } from "./kyrgyz-pattern";

interface MemoryCardProps {
  item: KyrgyzItem & { uniqueId: string };
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  disabled: boolean;
}

export function MemoryCard({
  item,
  isFlipped,
  isMatched,
  onClick,
  disabled,
}: MemoryCardProps) {
  const showFront = isFlipped || isMatched;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isMatched}
      className={cn(
        "relative aspect-square w-full cursor-pointer perspective-1000",
        "transition-all duration-300",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl",
        // Hover zoom effect (not when matched or disabled)
        !isMatched && !disabled && "hover:scale-105 hover:z-10",
        disabled && !isMatched && "cursor-not-allowed",
        isMatched && "cursor-default",
      )}
      aria-label={showFront ? `${item.name} card` : "Hidden card"}
    >
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-500 transform-style-preserve-3d",
          showFront && "rotate-y-180",
        )}
      >
        {/* ---- CARD BACK (Tunduk pattern on red felt) ---- */}
        <div
          className={cn(
            "absolute inset-0 backface-hidden rounded-xl",
            "bg-gradient-to-br from-primary to-primary/80 shadow-xl border-3 border-primary/40",
            "flex items-center justify-center",
            "hover:shadow-2xl transition-shadow duration-300",
          )}
        >
          <div className="absolute inset-2 rounded-lg border border-primary-foreground/20" />
          <TundukIcon className="text-primary-foreground opacity-90" size={56} />
        </div>

        {/* ---- CARD FRONT (cultural item) ---- */}
        <div
          className={cn(
            "absolute inset-0 backface-hidden rotate-y-180 rounded-xl",
            "shadow-xl border-3 overflow-hidden",
            "flex flex-col items-center justify-center gap-2 p-3",
            "transition-all duration-300",
            isMatched
              ? "border-chart-4 bg-gradient-to-br from-chart-4/10 to-chart-4/5 shadow-chart-4/30"
              : "border-border bg-gradient-to-br from-card to-card/90",
          )}
        >
          {/* Large Image Container with zoom effect */}
          <div
            className={cn(
              "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center overflow-hidden shrink-0",
              "shadow-inner border-2 border-border/50",
              "transition-transform duration-300",
              showFront && "animate-in zoom-in-95 duration-500",
            )}
            style={{ backgroundColor: `${item.color}30` }}
          >
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
                draggable={false}
              />
            ) : (
              <span className="text-4xl sm:text-5xl md:text-6xl" role="img" aria-label={item.name}>
                {item.emoji}
              </span>
            )}
          </div>

          {/* Item name */}
          <span className="text-xs sm:text-sm md:text-base font-bold text-card-foreground text-center leading-tight line-clamp-2">
            {item.name}
          </span>

          {/* Match checkmark */}
          {isMatched && (
            <span 
              className="absolute top-2 right-2 w-6 h-6 sm:w-7 sm:h-7 bg-chart-4 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg" 
              aria-hidden="true"
            >
              {"✓"}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
