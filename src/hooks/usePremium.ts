import { useState, useEffect } from "react";

const STORAGE_KEY = "varanda-viva-premium";

export interface PremiumState {
  isPremium: boolean;
  activatedAt: string | null;
  trialDaysLeft: number;
}

export const PREMIUM_FEATURES = [
  {
    id: "ai-diagnosis",
    title: "Diagnóstico por IA",
    description: "Tire uma foto da sua planta e receba análise de saúde em segundos",
    emoji: "📸",
    route: "/premium/diagnosis",
  },
  {
    id: "ai-care",
    title: "Estratégias Avançadas",
    description: "Planos de cuidados personalizados criados por IA",
    emoji: "🧠",
    route: "/premium/ai-care",
  },
  {
    id: "ideal-pots",
    title: "Vasos Ideais",
    description: "Recomendações de vasos, substratos e arranjos perfeitos",
    emoji: "🏺",
    route: "/premium/pots",
  },
  {
    id: "garden-share",
    title: "Compartilhar Jardim",
    description: "Compartilhe seu jardim com amigos e familiares",
    emoji: "🤝",
    route: "/premium/share",
  },
  {
    id: "pest-id",
    title: "Identificar Pragas",
    description: "Detecte e identifique pragas e doenças com IA",
    emoji: "🔬",
    route: "/premium/pests",
  },
  {
    id: "weather-sync",
    title: "Clima Inteligente",
    description: "Cuidados ajustados automaticamente ao clima da sua região",
    emoji: "🌤️",
    route: "/premium/weather",
  },
];

export const usePremium = () => {
  const [state, setState] = useState<PremiumState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : { isPremium: false, activatedAt: null, trialDaysLeft: 7 };
    } catch {
      return { isPremium: false, activatedAt: null, trialDaysLeft: 7 };
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const activatePremium = () => {
    setState({ isPremium: true, activatedAt: new Date().toISOString(), trialDaysLeft: 0 });
  };

  const deactivatePremium = () => {
    setState({ isPremium: false, activatedAt: null, trialDaysLeft: 0 });
  };

  const startTrial = () => {
    setState({ isPremium: true, activatedAt: new Date().toISOString(), trialDaysLeft: 7 });
  };

  return { ...state, activatePremium, deactivatePremium, startTrial };
};
