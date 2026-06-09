"use client";

import { useState } from "react";
import { TOTAL_CARDS } from "@/lib/cards";
import { useUsedCards } from "@/lib/useUsedCards";
import { DeckBrowser } from "./DeckBrowser";
import { RandomPicker } from "./RandomPicker";

type ViewMode = "browse" | "random";

export function AppShell() {
  const [mode, setMode] = useState<ViewMode>("random");
  const { usedIds, markUsed, resetUsed, isUsed, ready } = useUsedCards();

  const usedCount = usedIds.size;

  function handleReset() {
    if (usedCount === 0) return;
    if (
      window.confirm("¿Resetear todas las tarjetas usadas? Esta acción no se puede deshacer.")
    ) {
      resetUsed();
    }
  }

  return (
    <>
      <header className="toolbar">
        <div className="toolbar-left">
          <span className="toolbar-title">Despedida Rubi · 2026</span>
          <span className="toolbar-sub">
            {usedCount}/{TOTAL_CARDS} usadas
          </span>
        </div>
        <div className="toolbar-right">
          <nav className="mode-nav" aria-label="Modo de visualización">
            <button
              type="button"
              className={`mode-btn${mode === "random" ? " active" : ""}`}
              onClick={() => setMode("random")}
            >
              Aleatoria
            </button>
            <button
              type="button"
              className={`mode-btn${mode === "browse" ? " active" : ""}`}
              onClick={() => setMode("browse")}
            >
              Ver todas
            </button>
          </nav>
          {usedCount > 0 && (
            <button type="button" className="btn-reset" onClick={handleReset}>
              Resetear
            </button>
          )}
        </div>
      </header>

      <main className="main-content">
        {!ready ? (
          <p className="loading-text">Cargando tarjetas…</p>
        ) : mode === "browse" ? (
          <DeckBrowser isUsed={isUsed} onUseCard={markUsed} />
        ) : (
          <RandomPicker
            usedIds={usedIds}
            isUsed={isUsed}
            onUseCard={markUsed}
            ready={ready}
          />
        )}
      </main>
    </>
  );
}
