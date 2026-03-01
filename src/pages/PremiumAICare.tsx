import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Crown, ChevronDown, ChevronUp } from "lucide-react";
import { MOCK_PLANTS } from "@/data/plants";
import { MOCK_AI_CARE_STRATEGIES } from "@/data/premium-mock";
import { usePremium } from "@/hooks/usePremium";

const PremiumAICare = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const plantIdParam = searchParams.get("plant");
  const { isPremium } = usePremium();
  const [selectedPlant, setSelectedPlant] = useState<string>(plantIdParam || "1");
  const [expandedStrategy, setExpandedStrategy] = useState<number | null>(null);

  if (!isPremium) { navigate("/premium"); return null; }

  const strategies = MOCK_AI_CARE_STRATEGIES[selectedPlant] || MOCK_AI_CARE_STRATEGIES["1"];
  const plant = MOCK_PLANTS.find(p => p.id === selectedPlant);

  const difficultyColor: Record<string, string> = {
    "básico": "bg-success/15 text-success",
    "intermediário": "bg-warning/15 text-warning",
    "avançado": "bg-destructive/15 text-destructive",
  };

  return (
    <div className="px-4 pt-6 pb-24 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-card flex items-center justify-center card-shadow">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-lg font-extrabold text-foreground">Estratégias Avançadas</h1>
        <Crown size={16} className="text-warning" />
      </div>

      {/* Plant selector */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 animate-slide-up opacity-0 stagger-1">
        {MOCK_PLANTS.map((p) => (
          <button
            key={p.id}
            onClick={() => { setSelectedPlant(p.id); setExpandedStrategy(null); }}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl whitespace-nowrap transition-all flex-shrink-0 ${
              selectedPlant === p.id ? "bg-primary text-primary-foreground" : "bg-card card-shadow"
            }`}
          >
            <span className="text-lg">{p.image}</span>
            <span className="text-xs font-bold">{p.name}</span>
          </button>
        ))}
      </div>

      {/* Plant context */}
      {plant && (
        <div className="bg-card rounded-2xl p-4 card-shadow mb-4 animate-slide-up opacity-0 stagger-2">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{plant.image}</span>
            <div>
              <h3 className="text-sm font-extrabold text-foreground">{plant.name}</h3>
              <p className="text-[10px] text-muted-foreground italic">{plant.species}</p>
              <p className="text-[10px] text-primary font-bold mt-0.5">🧠 {strategies.length} estratégias disponíveis</p>
            </div>
          </div>
        </div>
      )}

      {/* Strategies */}
      <div className="space-y-3 animate-slide-up opacity-0 stagger-3">
        {strategies.map((strategy, i) => (
          <div key={i} className="bg-card rounded-2xl card-shadow overflow-hidden">
            <button
              onClick={() => setExpandedStrategy(expandedStrategy === i ? null : i)}
              className="w-full p-4 text-left"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <span className="text-2xl">{strategy.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-extrabold text-foreground">{strategy.title}</h4>
                    <p className="text-[11px] text-muted-foreground font-semibold mt-0.5">{strategy.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${difficultyColor[strategy.difficulty]}`}>
                        {strategy.difficulty}
                      </span>
                      <span className="text-[9px] font-bold text-muted-foreground">⏱️ {strategy.timeframe}</span>
                    </div>
                  </div>
                </div>
                {expandedStrategy === i ? <ChevronUp size={16} className="text-muted-foreground mt-1" /> : <ChevronDown size={16} className="text-muted-foreground mt-1" />}
              </div>
            </button>

            {expandedStrategy === i && (
              <div className="px-4 pb-4 animate-fade-in">
                <div className="border-t border-border pt-3">
                  <p className="text-xs font-bold text-foreground mb-2">Passo a passo:</p>
                  <div className="space-y-2">
                    {strategy.steps.map((step, si) => (
                      <div key={si} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[10px] font-extrabold text-primary">{si + 1}</span>
                        </div>
                        <p className="text-[11px] font-semibold text-foreground leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumAICare;
