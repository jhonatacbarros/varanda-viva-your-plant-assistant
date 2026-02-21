import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Droplets, Sun, Heart } from "lucide-react";
import { MOCK_PLANTS, MOCK_TASKS } from "@/data/plants";
import { useState } from "react";

const tabs = ["Visão geral", "Cuidados", "Calendário", "Histórico"];

const PlantDetail = () => {
  const { plantId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const plant = MOCK_PLANTS.find((p) => p.id === plantId);
  if (!plant) return <div className="p-6 text-center text-muted-foreground">Planta não encontrada</div>;

  const plantTasks = MOCK_TASKS.filter((t) => t.plantId === plant.id);

  const healthColor = plant.health >= 80 ? "bg-success" : plant.health >= 50 ? "bg-warning" : "bg-destructive";

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="relative bg-secondary px-4 pt-4 pb-8 rounded-b-3xl">
        <button
          onClick={() => navigate("/garden")}
          className="w-9 h-9 rounded-xl bg-card/80 backdrop-blur flex items-center justify-center mb-4"
        >
          <ArrowLeft size={18} className="text-foreground" />
        </button>
        <div className="text-center">
          <div className="text-6xl mb-3">{plant.image}</div>
          <h1 className="text-2xl font-extrabold text-foreground">{plant.name}</h1>
          <p className="text-sm text-muted-foreground font-semibold">{plant.species}</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <Heart size={14} className="text-primary" />
            <span className="text-sm font-bold text-foreground">{plant.health}% saudável</span>
          </div>
        </div>
      </div>

      {/* Health bar */}
      <div className="px-4 -mt-3">
        <div className="bg-card rounded-xl p-4 card-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-muted-foreground">Saúde</span>
            <span className="text-xs font-extrabold text-foreground">{plant.health}%</span>
          </div>
          <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${healthColor} transition-all`} style={{ width: `${plant.health}%` }} />
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs font-bold text-muted-foreground">Crescimento</span>
            <span className="text-xs font-extrabold text-foreground">{plant.growthProgress}%</span>
          </div>
          <div className="h-2.5 bg-secondary rounded-full overflow-hidden mt-1">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${plant.growthProgress}%` }} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-4">
        <div className="flex gap-1 bg-card rounded-xl p-1 card-shadow">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`flex-1 py-2 rounded-lg text-[11px] font-bold transition-all ${
                activeTab === i
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="px-4 mt-4 pb-4">
        {activeTab === 0 && (
          <div className="space-y-3 animate-fade-in">
            <div className="bg-card rounded-xl p-4 card-shadow">
              <h3 className="text-sm font-extrabold text-foreground mb-2">Informações</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground font-semibold">Local</span>
                  <span className="text-xs font-bold text-foreground">{plant.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground font-semibold">Adicionada em</span>
                  <span className="text-xs font-bold text-foreground">{plant.addedDate}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {plant.tags.map((tag) => (
                <span key={tag} className="bg-primary/15 text-primary text-[11px] font-bold px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        {activeTab === 1 && (
          <div className="space-y-3 animate-fade-in">
            <h3 className="text-sm font-extrabold text-foreground">Próximas tarefas</h3>
            {plantTasks.length > 0 ? (
              plantTasks.map((task) => (
                <div key={task.id} className="bg-card rounded-xl p-3 card-shadow flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                    {task.type === "water" ? <Droplets size={18} className="text-foreground" /> : <Sun size={18} className="text-foreground" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{task.title}</p>
                    <p className="text-[10px] text-muted-foreground">{task.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Sem tarefas pendentes 🎉</p>
            )}
          </div>
        )}
        {activeTab === 2 && (
          <div className="bg-card rounded-xl p-6 card-shadow text-center animate-fade-in">
            <p className="text-3xl mb-2">📅</p>
            <p className="text-sm font-semibold text-muted-foreground">Calendário da planta em breve</p>
          </div>
        )}
        {activeTab === 3 && (
          <div className="bg-card rounded-xl p-6 card-shadow text-center animate-fade-in">
            <p className="text-3xl mb-2">📝</p>
            <p className="text-sm font-semibold text-muted-foreground">Histórico em breve</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantDetail;
