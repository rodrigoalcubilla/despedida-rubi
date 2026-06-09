"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "despedida-rubi-used-cards";

function readUsedCards(): Set<number> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((n): n is number => typeof n === "number"));
  } catch {
    return new Set();
  }
}

function writeUsedCards(ids: Set<number>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
}

export function useUsedCards() {
  const [usedIds, setUsedIds] = useState<Set<number>>(new Set());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUsedIds(readUsedCards());
    setReady(true);
  }, []);

  const markUsed = useCallback((id: number) => {
    setUsedIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      writeUsedCards(next);
      return next;
    });
  }, []);

  const resetUsed = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUsedIds(new Set());
  }, []);

  const isUsed = useCallback((id: number) => usedIds.has(id), [usedIds]);

  return { usedIds, markUsed, resetUsed, isUsed, ready };
}
