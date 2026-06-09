"use client";

import { CHALLENGES } from "@/lib/cards";
import { ChallengeCard } from "./ChallengeCard";

type DeckBrowserProps = {
  isUsed: (id: number) => boolean;
  onUseCard: (id: number) => void;
};

export function DeckBrowser({ isUsed, onUseCard }: DeckBrowserProps) {
  return (
    <div className="deck">
      {CHALLENGES.map((challenge) => {
        const used = isUsed(challenge.id);
        return (
          <div key={challenge.id} className="deck-item">
            <ChallengeCard challenge={challenge} used={used} />
            <div className="card-actions">
              {used ? (
                <span className="card-status">Tarjeta ya usada</span>
              ) : (
                <button
                  type="button"
                  className="btn-gold"
                  onClick={() => onUseCard(challenge.id)}
                >
                  Marcar esta tarjeta como usada
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
