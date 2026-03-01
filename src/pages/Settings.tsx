import { ArrowLeft, Moon, Sun, Bell, Shield, HelpCircle, LogOut, ChevronRight, Leaf, Info, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
import { usePremium } from "@/hooks/usePremium";

const Settings = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { isPremium } = usePremium();

  const sections = [
    {
      title: "Aparência",
      items: [
        {
          icon: theme === "dark" ? Moon : Sun,
          label: "Modo Escuro",
          action: "toggle",
          value: theme === "dark",
          onToggle: toggleTheme,
        },
      ],
    },
    {
      title: "Notificações",
      items: [
        { icon: Bell, label: "Lembretes de rega", action: "toggle", value: true },
        { icon: Bell, label: "Dicas do assistente", action: "toggle", value: true },
      ],
    },
    {
      title: "Sobre",
      items: [
        { icon: Info, label: "Versão do app", subtitle: "1.0.0" },
        { icon: Shield, label: "Política de Privacidade", action: "link" },
        { icon: HelpCircle, label: "Central de Ajuda", action: "link" },
      ],
    },
  ];

  return (
    <div className="px-4 pt-6 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 animate-fade-in">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-card flex items-center justify-center card-shadow">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-lg font-extrabold text-foreground">Configurações</h1>
      </div>

      {/* Premium Banner */}
      <button
        onClick={() => navigate("/premium")}
        className={`w-full rounded-2xl p-4 flex items-center gap-3 mb-5 animate-slide-up opacity-0 stagger-1 ${
          isPremium ? "bg-gradient-to-r from-warning/20 to-primary/20 border border-warning/20" : "bg-gradient-to-r from-warning/15 to-accent/15"
        }`}
      >
        <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center">
          <Crown size={20} className="text-warning" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-extrabold text-foreground">{isPremium ? "Você é Premium! 👑" : "Varanda Viva Premium"}</p>
          <p className="text-[10px] text-muted-foreground font-semibold">{isPremium ? "Gerencie sua assinatura" : "Desbloqueie IA, diagnósticos e mais"}</p>
        </div>
        <ChevronRight size={16} className="text-muted-foreground" />
      </button>

      {/* Sections */}
      <div className="space-y-5">
        {sections.map((section, si) => (
          <div key={section.title} className={`animate-slide-up opacity-0 stagger-${Math.min(si + 1, 5)}`}>
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">
              {section.title}
            </h2>
            <div className="bg-card rounded-2xl card-shadow overflow-hidden">
              {section.items.map((item, ii) => (
                <button
                  key={item.label}
                  onClick={item.action === "toggle" && item.onToggle ? item.onToggle : undefined}
                  className={`w-full flex items-center justify-between px-4 py-3.5 ${
                    ii < section.items.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={20} className="text-primary" />
                    <div className="text-left">
                      <span className="text-sm font-bold text-foreground">{item.label}</span>
                      {item.subtitle && (
                        <p className="text-[10px] text-muted-foreground font-semibold">{item.subtitle}</p>
                      )}
                    </div>
                  </div>
                  {item.action === "toggle" ? (
                    <div className={`w-11 h-6 rounded-full transition-colors flex items-center px-0.5 ${
                      item.value ? "bg-primary" : "bg-secondary"
                    }`}>
                      <div className={`w-5 h-5 rounded-full bg-card shadow transition-transform ${
                        item.value ? "translate-x-5" : "translate-x-0"
                      }`} />
                    </div>
                  ) : item.action === "link" ? (
                    <ChevronRight size={16} className="text-muted-foreground" />
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={() => navigate("/login")}
        className="w-full mt-6 bg-card rounded-2xl card-shadow p-4 flex items-center justify-center gap-2 animate-slide-up opacity-0 stagger-5"
      >
        <LogOut size={18} className="text-destructive" />
        <span className="text-sm font-bold text-destructive">Sair da conta</span>
      </button>
    </div>
  );
};

export default Settings;
