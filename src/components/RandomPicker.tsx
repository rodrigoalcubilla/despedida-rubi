"use client";

import { useCallback, useEffect, useState } from "react";
import { Challenge, pickRandomUnused, TOTAL_CARDS } from "@/lib/cards";
import { ChallengeCard } from "./ChallengeCard";

type RandomPickerProps = {
  usedIds: Set<number>;
  isUsed: (id: number) => boolean;
  onUseCard: (id: number) => void;
  ready: boolean;
};

export function RandomPicker({ usedIds, isUsed, onUseCard, ready }: RandomPickerProps) {
  const [current, setCurrent] = useState<Challenge | null>(null);

  const drawRandom = useCallback(() => {
    setCurrent(pickRandomUnused(usedIds));
  }, [usedIds]);

  useEffect(() => {
    if (ready) drawRandom();
  }, [ready, drawRandom]);

  useEffect(() => {
    if (current && isUsed(current.id)) {
      setCurrent(pickRandomUnused(usedIds));
    }
  }, [usedIds, current, isUsed]);

  const remaining = TOTAL_CARDS - usedIds.size;
  const allUsed = remaining === 0;

  if (!ready) {
    return <p className="loading-text">Cargando tarjetas…</p>;
  }

  if (allUsed) {
    return (
      <div className="random-empty">
        <p className="random-empty-title">¡Todas las tarjetas usadas!</p>
        <p className="random-empty-text">
          Has completado los {TOTAL_CARDS} retos. Puedes resetear desde el menú superior.
        </p>
      </div>
    );
  }

  return (
    <div className="random-view">
      <div className="random-meta">
        <span>
          {remaining} {remaining === 1 ? "tarjeta disponible" : "tarjetas disponibles"}
        </span>
      </div>

      {current && (
        <div className="random-card-wrap">
          <ChallengeCard challenge={current} used={isUsed(current.id)} compact />
          <div className="card-actions random-actions">
            <button type="button" className="btn-gold" onClick={drawRandom}>
              Otra aleatoria
            </button>
            {!isUsed(current.id) && (
              <button
                type="button"
                className="btn-outline"
                onClick={() => onUseCard(current.id)}
              >
                Usar esta tarjeta
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
