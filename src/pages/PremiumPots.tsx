import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Crown } from "lucide-react";
import { MOCK_PLANTS } from "@/data/plants";
import { MOCK_POT_RECOMMENDATIONS } from "@/data/premium-mock";
import { usePremium } from "@/hooks/usePremium";

const PremiumPots = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const plantIdParam = searchParams.get("plant");
  const { isPremium } = usePremium();
  const [selectedPlant, setSelectedPlant] = useState<string>(plantIdParam || "1");

  if (!isPremium) { navigate("/premium"); return null; }

  const pots = MOCK_POT_RECOMMENDATIONS[selectedPlant] || MOCK_POT_RECOMMENDATIONS["1"];
  const plant = MOCK_PLANTS.find(p => p.id === selectedPlant);

  return (
    <div className="px-4 pt-6 pb-24 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-card flex items-center justify-center card-shadow">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-lg font-extrabold text-foreground">Vasos Ideais</h1>
        <Crown size={16} className="text-warning" />
      </div>

      {/* Plant selector */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 animate-slide-up opacity-0 stagger-1">
        {MOCK_PLANTS.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedPlant(p.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl whitespace-nowrap transition-all flex-shrink-0 ${
              selectedPlant === p.id ? "bg-primary text-primary-foreground" : "bg-card card-shadow"
            }`}
          >
            <span className="text-lg">{p.image}</span>
            <span className="text-xs font-bold">{p.name}</span>
          </button>
        ))}
      </div>

      {/* Current plant info */}
      {plant && (
        <div className="bg-primary/10 rounded-2xl p-3 mb-4 animate-slide-up opacity-0 stagger-2">
          <p className="text-xs font-bold text-foreground">💡 Solo ideal para {plant.name}:</p>
          <p className="text-[11px] text-muted-foreground font-semibold mt-0.5">{plant.careInfo.soilType}</p>
        </div>
      )}

      {/* Pot recommendations */}
      <div className="space-y-4 animate-slide-up opacity-0 stagger-3">
        {pots.map((pot, i) => (
          <div key={i} className="bg-card rounded-2xl p-4 card-shadow">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-14 h-14 rounded-xl bg-secondary/50 flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">{pot.emoji}</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-extrabold text-foreground">{pot.type}</h4>
                <p className="text-[10px] text-muted-foreground font-semibold">{pot.material}</p>
                <p className="text-xs font-bold text-primary mt-1">{pot.price}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-secondary/30 rounded-lg p-2">
                <p className="text-[9px] font-bold text-muted-foreground">📏 Tamanho</p>
                <p className="text-[11px] font-bold text-foreground">{pot.size}</p>
              </div>
              <div className="bg-secondary/30 rounded-lg p-2">
                <p className="text-[9px] font-bold text-muted-foreground">💧 Drenagem</p>
                <p className="text-[11px] font-bold text-foreground">{pot.drainage}</p>
              </div>
            </div>

            <div className="bg-secondary/30 rounded-lg p-2 mb-3">
              <p className="text-[9px] font-bold text-muted-foreground">🌱 Substrato recomendado</p>
              <p className="text-[11px] font-bold text-foreground">{pot.substrate}</p>
            </div>

            <div className="bg-success/8 rounded-lg p-2.5 border border-success/15">
              <p className="text-[11px] font-semibold text-success">💡 {pot.tip}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumPots;
