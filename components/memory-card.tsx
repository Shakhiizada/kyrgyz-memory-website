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
        "transition-transform duration-200 hover:scale-[1.04] active:scale-[0.97]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl",
        disabled && "cursor-not-allowed",
        isMatched && "cursor-default hover:scale-100",
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
            "bg-primary shadow-lg border-2 border-primary/30",
            "flex items-center justify-center",
          )}
        >
          <TundukIcon className="text-primary-foreground opacity-80" size={44} />
        </div>

        {/* ---- CARD FRONT (cultural item) ---- */}
        <div
          className={cn(
            "absolute inset-0 backface-hidden rotate-y-180 rounded-xl",
            "shadow-lg border-2 overflow-hidden",
            "flex flex-col items-center justify-center gap-1.5 p-2",
            isMatched
              ? "border-chart-4 bg-chart-4/5"
              : "border-border bg-card",
          )}
        >
          {/* Image / emoji fallback */}
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center overflow-hidden shrink-0"
            style={{ backgroundColor: `${item.color}20` }}
          >
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover rounded-lg"
                draggable={false}
              />
            ) : (
              <span className="text-3xl sm:text-4xl" role="img" aria-label={item.name}>
                {item.emoji}
              </span>
            )}
          </div>

          <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-card-foreground text-center leading-tight line-clamp-2">
            {item.name}
          </span>

          {isMatched && (
            <span className="absolute top-1 right-1.5 text-chart-4 font-bold text-sm" aria-hidden="true">
              {"✓"}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
