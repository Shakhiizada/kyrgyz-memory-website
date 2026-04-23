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
            "relative w-full h-full transition-transform duration-300 transform-style-preserve-3d",
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
          {/* Image */}
          <div
            className={cn(
              "w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center overflow-hidden shrink-0",
              "shadow-inner border-2 border-border/40",
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
              <span className="text-3xl sm:text-4xl md:text-5xl" role="img" aria-label={item.name}>
                {item.emoji}
              </span>
            )}
          </div>

          {/* Item name -- large, bold, always readable */}
          <span
            className="text-[11px] sm:text-sm md:text-base font-extrabold text-center leading-tight w-full px-0.5"
            style={{ color: "#1a1a1a" }}
          >
            {item.name}
          </span>
          {/* Kyrgyz name */}
          <span
            className="text-[9px] sm:text-[11px] font-semibold text-center leading-none w-full px-0.5 opacity-70"
            style={{ color: "#1a1a1a" }}
          >
            {item.nameKyrgyz}
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
