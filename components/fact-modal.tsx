"use client";

import { type KyrgyzItem } from "@/lib/game-data";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DecorativeBorder } from "./kyrgyz-pattern";

interface FactModalProps {
  item: KyrgyzItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function FactModal({ item, isOpen, onClose }: FactModalProps) {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-md border-2 border-primary/20 bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <span
              className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden shrink-0"
              style={{ backgroundColor: `${item.color}25` }}
            >
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl">{item.emoji}</span>
              )}
            </span>
            <div className="text-left">
              <div className="text-card-foreground">{item.name}</div>
              <div className="text-sm font-normal text-muted-foreground">{item.nameKyrgyz}</div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <DecorativeBorder className="text-primary my-1" />

        <DialogDescription className="text-base text-card-foreground/90 leading-relaxed">
          {/* AI placeholder: item.aiGeneratedFact || item.fact */}
          {item.fact}
        </DialogDescription>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <span className="text-xs text-muted-foreground capitalize px-2.5 py-1 bg-muted rounded-full font-medium">
            {item.category}
          </span>
          <Button onClick={onClose} className="font-semibold">
            Continue Playing
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
