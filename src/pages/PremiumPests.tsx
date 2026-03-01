import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Crown, Camera, Loader2 } from "lucide-react";
import { MOCK_PEST_DATABASE, type PestInfo } from "@/data/premium-mock";
import { usePremium } from "@/hooks/usePremium";

const PremiumPests = () => {
  const navigate = useNavigate();
  const { isPremium } = usePremium();
  const [scanning, setScanning] = useState(false);
  const [detectedPest, setDetectedPest] = useState<PestInfo | null>(null);

  if (!isPremium) { navigate("/premium"); return null; }

  const handleScan = () => {
    setScanning(true);
    setDetectedPest(null);
    setTimeout(() => {
      const random = MOCK_PEST_DATABASE[Math.floor(Math.random() * MOCK_PEST_DATABASE.length)];
      setDetectedPest(random);
      setScanning(false);
    }, 2000);
  };

  return (
    <div className="px-4 pt-6 pb-24 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-card flex items-center justify-center card-shadow">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-lg font-extrabold text-foreground">Identificar Pragas</h1>
        <Crown size={16} className="text-warning" />
      </div>

      {/* Scan button */}
      <button
        onClick={handleScan}
        disabled={scanning}
        className="w-full bg-primary rounded-2xl p-5 text-center mb-6 animate-slide-up opacity-0 stagger-1"
      >
        {scanning ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 size={20} className="text-primary-foreground animate-spin" />
            <span className="text-sm font-bold text-primary-foreground">Identificando...</span>
          </div>
        ) : (
          <>
            <Camera size={28} className="mx-auto text-primary-foreground mb-2" />
            <span className="text-sm font-bold text-primary-foreground">📸 Fotografar planta para identificar praga</span>
            <p className="text-[10px] text-primary-foreground/70 mt-1">A IA analisará folhas, caule e solo</p>
          </>
        )}
      </button>

      {/* Detected pest */}
      {detectedPest && (
        <div className="bg-card rounded-2xl p-4 card-shadow mb-6 animate-bounce-in">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{detectedPest.emoji}</span>
            <div>
              <p className="text-[10px] font-bold text-destructive">⚠️ Praga identificada</p>
              <h3 className="text-lg font-extrabold text-foreground">{detectedPest.name}</h3>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-destructive/8 rounded-xl p-3">
              <p className="text-[10px] font-bold text-destructive mb-1.5">Sintomas:</p>
              {detectedPest.symptoms.map((s, i) => (
                <p key={i} className="text-[11px] text-foreground font-semibold">• {s}</p>
              ))}
            </div>

            <div className="bg-success/8 rounded-xl p-3">
              <p className="text-[10px] font-bold text-success mb-1">🧪 Tratamento:</p>
              <p className="text-[11px] text-foreground font-semibold">{detectedPest.treatment}</p>
            </div>

            <div className="bg-primary/8 rounded-xl p-3">
              <p className="text-[10px] font-bold text-primary mb-1">🛡️ Prevenção:</p>
              <p className="text-[11px] text-foreground font-semibold">{detectedPest.prevention}</p>
            </div>
          </div>
        </div>
      )}

      {/* Pest database */}
      <h3 className="text-sm font-extrabold text-foreground mb-3 animate-slide-up opacity-0 stagger-2">
        🔬 Base de pragas conhecidas
      </h3>
      <div className="space-y-2 animate-slide-up opacity-0 stagger-3">
        {MOCK_PEST_DATABASE.map((pest, i) => (
          <div key={i} className="bg-card rounded-xl p-3 card-shadow flex items-center gap-3">
            <span className="text-2xl">{pest.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-foreground">{pest.name}</p>
              <p className="text-[10px] text-muted-foreground truncate">{pest.symptoms[0]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumPests;
