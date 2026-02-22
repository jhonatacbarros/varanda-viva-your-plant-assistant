import { useState, useEffect, useMemo } from "react";

export interface GamificationLevel {
  level: number;
  title: string;
  emoji: string;
  minPoints: number;
}

export const LEVELS: GamificationLevel[] = [
  { level: 1, title: "Semente", emoji: "🌰", minPoints: 0 },
  { level: 2, title: "Broto", emoji: "🌱", minPoints: 10 },
  { level: 3, title: "Muda", emoji: "🪴", minPoints: 30 },
  { level: 4, title: "Arbusto", emoji: "🌿", minPoints: 60 },
  { level: 5, title: "Árvore", emoji: "🌳", minPoints: 100 },
  { level: 6, title: "Floresta", emoji: "🌲", minPoints: 150 },
  { level: 7, title: "Jardim Lendário", emoji: "🏡", minPoints: 250 },
];

export interface Badge {
  id: string;
  title: string;
  emoji: string;
  description: string;
  requirement: number;
  type: "cultivar" | "post" | "care" | "streak";
}

export const BADGES: Badge[] = [
  { id: "b1", title: "Primeiro Cultivo", emoji: "🌱", description: "Cultive seu primeiro post", requirement: 1, type: "cultivar" },
  { id: "b2", title: "Cultivador", emoji: "🌿", description: "Cultive 10 posts", requirement: 10, type: "cultivar" },
  { id: "b3", title: "Mão Verde", emoji: "💚", description: "Cultive 50 posts", requirement: 50, type: "cultivar" },
  { id: "b4", title: "Mestre Jardineiro", emoji: "👨‍🌾", description: "Cultive 100 posts", requirement: 100, type: "cultivar" },
  { id: "b5", title: "Primeiro Post", emoji: "📸", description: "Crie sua primeira postagem", requirement: 1, type: "post" },
  { id: "b6", title: "Cuidador Dedicado", emoji: "🧤", description: "Complete 20 tarefas de cuidado", requirement: 20, type: "care" },
  { id: "b7", title: "Fogo Sagrado", emoji: "🔥", description: "7 dias seguidos cuidando", requirement: 7, type: "streak" },
];

const STORAGE_KEY = "varanda-viva-gamification";

interface GamificationState {
  cultivarPoints: number;
  totalCultivares: number;
  postsCreated: number;
  careCompleted: number;
  streakDays: number;
}

const defaultState: GamificationState = {
  cultivarPoints: 15,
  totalCultivares: 15,
  postsCreated: 3,
  careCompleted: 12,
  streakDays: 12,
};

export const useGamification = () => {
  const [state, setState] = useState<GamificationState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultState;
    } catch {
      return defaultState;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const currentLevel = useMemo(() => {
    return [...LEVELS].reverse().find((l) => state.cultivarPoints >= l.minPoints) || LEVELS[0];
  }, [state.cultivarPoints]);

  const nextLevel = useMemo(() => {
    return LEVELS.find((l) => l.minPoints > state.cultivarPoints) || null;
  }, [state.cultivarPoints]);

  const progressToNext = useMemo(() => {
    if (!nextLevel) return 100;
    const prevMin = currentLevel.minPoints;
    return Math.round(((state.cultivarPoints - prevMin) / (nextLevel.minPoints - prevMin)) * 100);
  }, [state.cultivarPoints, currentLevel, nextLevel]);

  const unlockedBadges = useMemo(() => {
    return BADGES.filter((badge) => {
      switch (badge.type) {
        case "cultivar": return state.totalCultivares >= badge.requirement;
        case "post": return state.postsCreated >= badge.requirement;
        case "care": return state.careCompleted >= badge.requirement;
        case "streak": return state.streakDays >= badge.requirement;
        default: return false;
      }
    });
  }, [state]);

  const addCultivar = () => {
    setState((prev) => ({
      ...prev,
      cultivarPoints: prev.cultivarPoints + 1,
      totalCultivares: prev.totalCultivares + 1,
    }));
  };

  const removeCultivar = () => {
    setState((prev) => ({
      ...prev,
      cultivarPoints: Math.max(0, prev.cultivarPoints - 1),
    }));
  };

  return {
    ...state,
    currentLevel,
    nextLevel,
    progressToNext,
    unlockedBadges,
    allBadges: BADGES,
    addCultivar,
    removeCultivar,
  };
};
