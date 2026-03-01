import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Camera, Loader2, AlertTriangle, CheckCircle, Crown } from "lucide-react";
import { MOCK_PLANTS } from "@/data/plants";
import { MOCK_DIAGNOSIS, type AIDiagnosisResult } from "@/data/premium-mock";
import { usePremium } from "@/hooks/usePremium";

const PremiumDiagnosis = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const plantIdParam = searchParams.get("plant");
  const { isPremium } = usePremium();
  const [selectedPlant, setSelectedPlant] = useState<string>(plantIdParam || "");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<AIDiagnosisResult | null>(null);

  if (!isPremium) {
    navigate("/premium");
    return null;
  }

  const handleScan = () => {
    if (!selectedPlant) return;
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      setResult(MOCK_DIAGNOSIS[selectedPlant] || MOCK_DIAGNOSIS["1"]);
      setScanning(false);
    }, 2500);
  };

  const severityColor = (s: string) => {
    if (s === "leve") return "bg-warning/15 text-warning";
    if (s === "moderado") return "bg-destructive/15 text-destructive";
    return "bg-destructive/25 text-destructive";
  };

  const healthGradient = (h: number) => {
    if (h >= 80) return "from-success to-success/60";
    if (h >= 60) return "from-warning to-warning/60";
    return "from-destructive to-destructive/60";
  };

  return (
    <div className="px-4 pt-6 pb-24 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-card flex items-center justify-center card-shadow">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-lg font-extrabold text-foreground">Diagnóstico por IA</h1>
        <Crown size={16} className="text-warning" />
      </div>

      {/* Plant selector */}
      <div className="bg-card rounded-2xl p-4 card-shadow mb-4 animate-slide-up opacity-0 stagger-1">
        <p className="text-xs font-bold text-muted-foreground mb-2">Selecione a planta para diagnosticar:</p>
        <div className="grid grid-cols-3 gap-2">
          {MOCK_PLANTS.map((p) => (
            <button
              key={p.id}
              onClick={() => { setSelectedPlant(p.id); setResult(null); }}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                selectedPlant === p.id ? "bg-primary/15 ring-2 ring-primary" : "bg-secondary/50"
              }`}
            >
              <span className="text-2xl">{p.image}</span>
              <span className="text-[10px] font-bold text-foreground truncate w-full text-center">{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Scan button */}
      <button
        onClick={handleScan}
        disabled={!selectedPlant || scanning}
        className={`w-full rounded-2xl p-4 flex items-center justify-center gap-3 mb-6 transition-all animate-slide-up opacity-0 stagger-2 ${
          !selectedPlant ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
        }`}
      >
        {scanning ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            <span className="text-sm font-bold">Analisando com IA...</span>
          </>
        ) : (
          <>
            <Camera size={20} />
            <span className="text-sm font-bold">📸 Tirar foto e diagnosticar</span>
          </>
        )}
      </button>

      {/* Scanning animation */}
      {scanning && (
        <div className="bg-card rounded-2xl p-6 card-shadow text-center animate-bounce-in">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 animate-pulse">
            <span className="text-4xl">🔬</span>
          </div>
          <p className="text-sm font-bold text-foreground">Analisando folhas, caule e raízes...</p>
          <p className="text-xs text-muted-foreground mt-1">IA verificando padrões de saúde</p>
          <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: "70%" }} />
          </div>
        </div>
      )}

      {/* Result */}
      {result && !scanning && (
        <div className="space-y-4 animate-slide-up">
          {/* Health score */}
          <div className={`bg-gradient-to-r ${healthGradient(result.overallHealth)} rounded-2xl p-5 text-center`}>
            <p className="text-4xl font-extrabold text-primary-foreground">{result.overallHealth}%</p>
            <p className="text-sm font-bold text-primary-foreground/90 mt-1">Saúde geral da planta</p>
          </div>

          {/* Issues */}
          {result.issues.length > 0 && (
            <div className="bg-card rounded-2xl p-4 card-shadow">
              <h3 className="text-sm font-extrabold text-foreground mb-3 flex items-center gap-2">
                <AlertTriangle size={16} className="text-warning" />
                Problemas detectados ({result.issues.length})
              </h3>
              <div className="space-y-3">
                {result.issues.map((issue, i) => (
                  <div key={i} className="bg-secondary/30 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-foreground">{issue.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${severityColor(issue.severity)}`}>
                        {issue.severity}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mb-1.5">{issue.description}</p>
                    <div className="bg-success/8 rounded-lg p-2">
                      <p className="text-[11px] font-semibold text-success">💡 {issue.solution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Positives */}
          <div className="bg-card rounded-2xl p-4 card-shadow">
            <h3 className="text-sm font-extrabold text-foreground mb-3 flex items-center gap-2">
              <CheckCircle size={16} className="text-success" />
              Pontos positivos
            </h3>
            <div className="space-y-1.5">
              {result.positives.map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs">✅</span>
                  <span className="text-xs font-semibold text-foreground">{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-primary/10 rounded-2xl p-4 border border-primary/20">
            <h3 className="text-sm font-extrabold text-foreground mb-2 flex items-center gap-2">
              🧠 Recomendação da IA
            </h3>
            <p className="text-xs text-foreground font-semibold leading-relaxed">{result.recommendation}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumDiagnosis;
