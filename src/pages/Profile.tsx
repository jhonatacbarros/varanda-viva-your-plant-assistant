import { Cloud, CloudOff, Leaf, Target, Flame, ChevronRight, Moon, Sun } from "lucide-react";
import { MOCK_PLANTS } from "@/data/plants";

const Profile = () => {
  const streak = 12;
  const completionRate = 87;
  const totalPlants = MOCK_PLANTS.length;

  return (
    <div className="px-4 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 animate-fade-in">
        <h1 className="text-2xl font-extrabold text-foreground">Perfil</h1>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4 mb-6 animate-slide-up opacity-0 stagger-1">
        <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center">
          <span className="text-3xl">🧑‍🌾</span>
        </div>
        <div>
          <h2 className="text-lg font-extrabold text-foreground">Jardineiro(a)</h2>
          <div className="flex items-center gap-1.5 mt-1">
            <CloudOff size={14} className="text-muted-foreground" />
            <span className="text-xs font-semibold text-muted-foreground">Modo offline</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-card rounded-2xl p-4 card-shadow text-center animate-slide-up opacity-0 stagger-2">
          <Flame size={24} className="mx-auto text-destructive mb-2" />
          <p className="text-2xl font-extrabold text-foreground">{streak}</p>
          <p className="text-[10px] font-bold text-muted-foreground">Dias seguidos</p>
        </div>
        <div className="bg-card rounded-2xl p-4 card-shadow text-center animate-slide-up opacity-0 stagger-3">
          <Target size={24} className="mx-auto text-primary mb-2" />
          <p className="text-2xl font-extrabold text-foreground">{completionRate}%</p>
          <p className="text-[10px] font-bold text-muted-foreground">Conclusão</p>
        </div>
        <div className="bg-card rounded-2xl p-4 card-shadow text-center animate-slide-up opacity-0 stagger-4">
          <Leaf size={24} className="mx-auto text-primary mb-2" />
          <p className="text-2xl font-extrabold text-foreground">{totalPlants}</p>
          <p className="text-[10px] font-bold text-muted-foreground">Plantas</p>
        </div>
      </div>

      {/* Weekly chart simplified */}
      <div className="bg-card rounded-2xl p-4 card-shadow mb-6 animate-slide-up opacity-0 stagger-5">
        <h3 className="text-sm font-extrabold text-foreground mb-3">Esta semana</h3>
        <div className="flex items-end justify-between gap-2 h-20">
          {[4, 3, 5, 2, 4, 3, 1].map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full rounded-lg transition-all ${
                  i === 3 ? "bg-warning" : "bg-primary"
                }`}
                style={{ height: `${val * 16}px` }}
              />
              <span className="text-[9px] font-bold text-muted-foreground">
                {["S", "T", "Q", "Q", "S", "S", "D"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2 animate-slide-up opacity-0 stagger-5">
        <button className="w-full bg-card rounded-xl p-4 card-shadow flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Cloud size={20} className="text-primary" />
            <span className="text-sm font-bold text-foreground">Login e Sincronização</span>
          </div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>
        <button className="w-full bg-card rounded-xl p-4 card-shadow flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Moon size={20} className="text-foreground" />
            <span className="text-sm font-bold text-foreground">Modo Escuro</span>
          </div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

export default Profile;
