import { useNavigate } from "react-router-dom";
import { Crown, Sparkles, Check, ArrowLeft, Zap } from "lucide-react";
import { usePremium, PREMIUM_FEATURES } from "@/hooks/usePremium";

const PremiumUpgrade = () => {
  const navigate = useNavigate();
  const { isPremium, activatePremium, startTrial } = usePremium();

  const benefits = [
    "Diagnóstico por IA ilimitado",
    "Estratégias de cuidado avançadas",
    "Recomendação de vasos ideais",
    "Compartilhar jardim com amigos",
    "Identificação de pragas por foto",
    "Alertas de clima inteligentes",
    "Sem anúncios",
    "Suporte prioritário",
  ];

  if (isPremium) {
    return (
      <div className="px-4 pt-6 pb-24 animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-card flex items-center justify-center card-shadow">
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <h1 className="text-lg font-extrabold text-foreground">Premium</h1>
          <Crown size={20} className="text-warning" />
        </div>

        <div className="bg-gradient-to-br from-warning/20 to-primary/20 rounded-2xl p-6 text-center mb-6">
          <span className="text-5xl">👑</span>
          <h2 className="text-xl font-extrabold text-foreground mt-3">Você é Premium!</h2>
          <p className="text-sm text-muted-foreground font-semibold mt-1">Todos os recursos estão liberados</p>
        </div>

        <h3 className="text-sm font-extrabold text-foreground mb-3">Recursos Premium</h3>
        <div className="grid grid-cols-2 gap-3">
          {PREMIUM_FEATURES.map((f) => (
            <button
              key={f.id}
              onClick={() => navigate(f.route)}
              className="bg-card rounded-2xl p-4 card-shadow text-left hover:card-shadow-hover transition-shadow"
            >
              <span className="text-2xl">{f.emoji}</span>
              <h4 className="text-xs font-extrabold text-foreground mt-2">{f.title}</h4>
              <p className="text-[10px] text-muted-foreground font-semibold mt-0.5">{f.description}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 pb-24 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-card flex items-center justify-center card-shadow">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-lg font-extrabold text-foreground">Premium</h1>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-warning/20 via-primary/10 to-accent/20 rounded-2xl p-6 text-center mb-6 animate-slide-up opacity-0 stagger-1">
        <div className="w-16 h-16 rounded-full bg-warning/20 flex items-center justify-center mx-auto mb-3">
          <Crown size={32} className="text-warning" />
        </div>
        <h2 className="text-xl font-extrabold text-foreground">Varanda Viva Premium</h2>
        <p className="text-sm text-muted-foreground font-semibold mt-1">Cuide das suas plantas como um profissional</p>
      </div>

      {/* Features preview */}
      <div className="space-y-3 mb-6 animate-slide-up opacity-0 stagger-2">
        {PREMIUM_FEATURES.map((f) => (
          <div key={f.id} className="bg-card rounded-xl p-3.5 card-shadow flex items-center gap-3">
            <span className="text-2xl">{f.emoji}</span>
            <div className="flex-1">
              <h4 className="text-xs font-extrabold text-foreground">{f.title}</h4>
              <p className="text-[10px] text-muted-foreground font-semibold">{f.description}</p>
            </div>
            <Crown size={14} className="text-warning flex-shrink-0" />
          </div>
        ))}
      </div>

      {/* Benefits list */}
      <div className="bg-card rounded-2xl p-4 card-shadow mb-6 animate-slide-up opacity-0 stagger-3">
        <h3 className="text-sm font-extrabold text-foreground mb-3">Tudo incluso:</h3>
        <div className="space-y-2">
          {benefits.map((b) => (
            <div key={b} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0">
                <Check size={12} className="text-success" />
              </div>
              <span className="text-xs font-semibold text-foreground">{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="space-y-3 animate-slide-up opacity-0 stagger-4">
        <button
          onClick={() => startTrial()}
          className="w-full bg-gradient-to-r from-warning to-primary rounded-2xl p-4 text-center"
        >
          <div className="flex items-center justify-center gap-2">
            <Sparkles size={18} className="text-primary-foreground" />
            <span className="text-sm font-extrabold text-primary-foreground">Experimentar 7 dias grátis</span>
          </div>
          <p className="text-[10px] text-primary-foreground/80 font-semibold mt-1">Depois R$ 14,90/mês · Cancele quando quiser</p>
        </button>

        <button
          onClick={() => activatePremium()}
          className="w-full bg-card rounded-2xl p-4 card-shadow text-center border-2 border-warning/30"
        >
          <div className="flex items-center justify-center gap-2">
            <Zap size={18} className="text-warning" />
            <span className="text-sm font-extrabold text-foreground">Plano Anual — R$ 99,90</span>
          </div>
          <p className="text-[10px] text-success font-bold mt-1">Economize 44% · R$ 8,33/mês</p>
        </button>
      </div>
    </div>
  );
};

export default PremiumUpgrade;
