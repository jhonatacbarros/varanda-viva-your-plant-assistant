import { useNavigate } from "react-router-dom";
import { ArrowLeft, Crown, CloudSun } from "lucide-react";
import { MOCK_WEATHER_ADJUSTMENTS } from "@/data/premium-mock";
import { usePremium } from "@/hooks/usePremium";

const PremiumWeather = () => {
  const navigate = useNavigate();
  const { isPremium } = usePremium();

  if (!isPremium) { navigate("/premium"); return null; }

  // Mock current weather
  const currentWeather = {
    temp: 32,
    humidity: 45,
    condition: "Ensolarado",
    emoji: "☀️",
    city: "São Paulo, SP",
    uv: 8,
  };

  return (
    <div className="px-4 pt-6 pb-24 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-card flex items-center justify-center card-shadow">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-lg font-extrabold text-foreground">Clima Inteligente</h1>
        <Crown size={16} className="text-warning" />
      </div>

      {/* Current weather */}
      <div className="bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl p-5 mb-6 animate-slide-up opacity-0 stagger-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-muted-foreground">{currentWeather.city}</p>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-4xl font-extrabold text-foreground">{currentWeather.temp}°</span>
              <span className="text-3xl mb-1">{currentWeather.emoji}</span>
            </div>
            <p className="text-xs font-semibold text-foreground mt-1">{currentWeather.condition}</p>
          </div>
          <div className="text-right space-y-1">
            <div className="bg-card/60 backdrop-blur rounded-lg px-3 py-1.5">
              <p className="text-[9px] font-bold text-muted-foreground">Umidade</p>
              <p className="text-sm font-extrabold text-foreground">{currentWeather.humidity}%</p>
            </div>
            <div className="bg-card/60 backdrop-blur rounded-lg px-3 py-1.5">
              <p className="text-[9px] font-bold text-muted-foreground">UV</p>
              <p className="text-sm font-extrabold text-warning">{currentWeather.uv}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Today's plant tips */}
      <div className="bg-primary/10 rounded-2xl p-4 border border-primary/20 mb-6 animate-slide-up opacity-0 stagger-2">
        <h3 className="text-sm font-extrabold text-foreground mb-2 flex items-center gap-2">
          <CloudSun size={16} className="text-primary" />
          Dicas para hoje
        </h3>
        <div className="space-y-1.5">
          <p className="text-[11px] font-semibold text-foreground">☀️ Dia quente — regue suas plantas de manhã cedo ou ao entardecer</p>
          <p className="text-[11px] font-semibold text-foreground">💧 Umidade média — borrife samambaias e orquídeas</p>
          <p className="text-[11px] font-semibold text-foreground">🌡️ UV alto — proteja suculentas do sol direto das 11h-15h</p>
        </div>
      </div>

      {/* Weather scenarios */}
      <h3 className="text-sm font-extrabold text-foreground mb-3 animate-slide-up opacity-0 stagger-3">
        Cenários climáticos
      </h3>
      <div className="space-y-3 animate-slide-up opacity-0 stagger-4">
        {MOCK_WEATHER_ADJUSTMENTS.map((adj, i) => (
          <div key={i} className="bg-card rounded-2xl p-4 card-shadow">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{adj.emoji}</span>
              <h4 className="text-sm font-extrabold text-foreground">{adj.condition}</h4>
            </div>
            <div className="space-y-1.5 mb-3">
              {adj.adjustments.map((a, ai) => (
                <p key={ai} className="text-[11px] font-semibold text-foreground">• {a}</p>
              ))}
            </div>
            <div className="bg-warning/10 rounded-lg p-2 border border-warning/15">
              <p className="text-[10px] font-bold text-warning">{adj.alert}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumWeather;
