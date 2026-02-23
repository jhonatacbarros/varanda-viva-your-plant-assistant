import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Droplets, Sun, Scissors, FlaskConical, Sprout, Repeat2, CloudDrizzle, MapPin, Calendar, Thermometer, CloudRain, AlertTriangle, ChevronDown, ChevronUp, Leaf, Clock } from "lucide-react";
import { MOCK_PLANTS, MOCK_TASKS, MOCK_CARE_LOGS, TASK_ICONS, TASK_LABELS } from "@/data/plants";
import { useState } from "react";

const typeIcons: Record<string, React.ReactNode> = {
  water: <Droplets size={18} />,
  sun: <Sun size={18} />,
  prune: <Scissors size={18} />,
  fertilize: <FlaskConical size={18} />,
  harvest: <Sprout size={18} />,
  repot: <Repeat2 size={18} />,
  spray: <CloudDrizzle size={18} />,
};

const sunlightLabels: Record<string, string> = {
  "sol pleno": "☀️ Sol pleno",
  "meia-sombra": "⛅ Meia-sombra",
  "sombra": "🌥️ Sombra",
  "luz indireta": "💡 Luz indireta",
};

const difficultyColors: Record<string, string> = {
  "fácil": "bg-success/15 text-success",
  "moderada": "bg-warning/15 text-warning",
  "difícil": "bg-destructive/15 text-destructive",
};

const PlantDetail = () => {
  const { plantId } = useParams();
  const navigate = useNavigate();
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [showCareDetails, setShowCareDetails] = useState(false);

  const plant = MOCK_PLANTS.find((p) => p.id === plantId);
  if (!plant) return <div className="p-6 text-center text-muted-foreground">Planta não encontrada</div>;

  const plantTasks = MOCK_TASKS.filter((t) => t.plantId === plant.id && !t.completed);
  const plantLogs = MOCK_CARE_LOGS.filter((l) => l.plantId === plant.id).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const healthColor = plant.health >= 80 ? "text-success" : plant.health >= 50 ? "text-warning" : "text-destructive";
  const healthBg = plant.health >= 80 ? "bg-success" : plant.health >= 50 ? "bg-warning" : "bg-destructive";

  const handleQuickAction = (type: string) => {
    setCompletedActions((prev) => [...prev, type]);
    setTimeout(() => {
      setCompletedActions((prev) => prev.filter((t) => t !== type));
    }, 2000);
  };

  const daysAgo = (dateStr: string) => {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "Hoje";
    if (diff === 1) return "Ontem";
    return `${diff} dias atrás`;
  };

  const daysUntil = (dateStr: string) => {
    const diff = Math.floor((new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (diff <= 0) return "Hoje!";
    if (diff === 1) return "Amanhã";
    return `Em ${diff} dias`;
  };

  // Determine which actions are most relevant
  const urgentActions = plantTasks.filter(t => t.overdue || t.priority === "critical" || t.priority === "high");
  const upcomingActions = plantTasks.filter(t => !t.overdue && t.priority !== "critical" && t.priority !== "high");

  return (
    <div className="animate-fade-in pb-6">
      {/* Compact Hero */}
      <div className="relative bg-secondary/50 px-4 pt-4 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate("/garden")}
            className="w-9 h-9 rounded-xl bg-card/80 backdrop-blur flex items-center justify-center"
          >
            <ArrowLeft size={18} className="text-foreground" />
          </button>
          <div className="flex-1" />
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${difficultyColors[plant.careInfo.difficulty]}`}>
            {plant.careInfo.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-5xl w-20 h-20 rounded-2xl bg-card/60 backdrop-blur flex items-center justify-center flex-shrink-0">
            {plant.image}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-extrabold text-foreground">{plant.name}</h1>
            <p className="text-xs text-muted-foreground font-semibold italic">{plant.species}</p>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <MapPin size={12} className="text-muted-foreground" />
                <span className="text-[11px] font-bold text-muted-foreground">{plant.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Leaf size={12} className={healthColor} />
                <span className={`text-[11px] font-extrabold ${healthColor}`}>{plant.health}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Health & Growth Bars - compact */}
      <div className="px-4 -mt-3">
        <div className="bg-card rounded-xl p-3 card-shadow">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-muted-foreground">Saúde</span>
                <span className="text-[10px] font-extrabold text-foreground">{plant.health}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${healthBg} transition-all`} style={{ width: `${plant.health}%` }} />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-muted-foreground">Crescimento</span>
                <span className="text-[10px] font-extrabold text-foreground">{plant.growthProgress}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${plant.growthProgress}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Cards - key info at a glance */}
      <div className="px-4 mt-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-card rounded-xl p-3 card-shadow">
            <div className="flex items-center gap-2 mb-1.5">
              <Droplets size={14} className="text-primary" />
              <span className="text-[10px] font-bold text-muted-foreground">Última rega</span>
            </div>
            <p className="text-sm font-extrabold text-foreground">{daysAgo(plant.lastWatered)}</p>
            <p className="text-[10px] text-primary font-bold mt-0.5">Próx: {daysUntil(plant.nextWatering)}</p>
          </div>
          <div className="bg-card rounded-xl p-3 card-shadow">
            <div className="flex items-center gap-2 mb-1.5">
              <FlaskConical size={14} className="text-accent-foreground" />
              <span className="text-[10px] font-bold text-muted-foreground">Último adubo</span>
            </div>
            <p className="text-sm font-extrabold text-foreground">{daysAgo(plant.lastFertilized)}</p>
            <p className="text-[10px] text-primary font-bold mt-0.5">Próx: {daysUntil(plant.nextFertilizing)}</p>
          </div>
        </div>
      </div>

      {/* Urgent actions - prominent */}
      {urgentActions.length > 0 && (
        <div className="px-4 mt-4">
          <h3 className="text-sm font-extrabold text-foreground mb-2 flex items-center gap-1.5">
            <AlertTriangle size={14} className="text-destructive" />
            Ação necessária
          </h3>
          <div className="space-y-2">
            {urgentActions.map((task) => {
              const isCompleted = completedActions.includes(task.type + task.id);
              return (
                <button
                  key={task.id}
                  onClick={() => handleQuickAction(task.type + task.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                    isCompleted
                      ? "bg-success/15 scale-[0.98]"
                      : task.overdue
                      ? "bg-destructive/10 border border-destructive/20"
                      : "bg-warning/10 border border-warning/20"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isCompleted ? "bg-success/20" : task.overdue ? "bg-destructive/15" : "bg-warning/15"
                  }`}>
                    {isCompleted ? <span className="text-success font-bold">✓</span> : typeIcons[task.type]}
                  </div>
                  <div className="flex-1 text-left">
                    <p className={`text-sm font-bold ${isCompleted ? "text-success line-through" : "text-foreground"}`}>
                      {task.title}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{task.description}</p>
                  </div>
                  {task.overdue && !isCompleted && (
                    <span className="text-[9px] font-bold bg-destructive text-destructive-foreground px-2 py-0.5 rounded-full">
                      Atrasado
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Actions Grid - all at once */}
      <div className="px-4 mt-4">
        <h3 className="text-sm font-extrabold text-foreground mb-2">Registrar cuidado</h3>
        <div className="grid grid-cols-4 gap-2">
          {(["water", "spray", "fertilize", "prune", "sun", "harvest", "repot"] as const).map((type) => {
            const isCompleted = completedActions.includes(type);
            return (
              <button
                key={type}
                onClick={() => handleQuickAction(type)}
                className={`flex flex-col items-center gap-1.5 py-3 px-1 rounded-xl transition-all duration-300 ${
                  isCompleted
                    ? "bg-success/20 scale-95"
                    : "bg-card card-shadow active:scale-95"
                }`}
              >
                <span className="text-xl">{TASK_ICONS[type]}</span>
                <span className={`text-[10px] font-bold leading-tight text-center ${isCompleted ? "text-success" : "text-foreground"}`}>
                  {isCompleted ? "✓ Feito!" : TASK_LABELS[type]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Upcoming tasks */}
      {upcomingActions.length > 0 && (
        <div className="px-4 mt-4">
          <h3 className="text-sm font-extrabold text-foreground mb-2 flex items-center gap-1.5">
            <Clock size={14} className="text-muted-foreground" />
            Próximos cuidados
          </h3>
          <div className="space-y-1.5">
            {upcomingActions.map((task) => (
              <div key={task.id} className="bg-card rounded-xl p-3 card-shadow flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  {typeIcons[task.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-foreground truncate">{task.title}</p>
                  <p className="text-[10px] text-muted-foreground">{task.description}</p>
                </div>
                <span className="text-[10px] font-bold text-muted-foreground flex-shrink-0">{task.dueDate.slice(5)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Plant description */}
      <div className="px-4 mt-4">
        <div className="bg-card rounded-xl p-4 card-shadow">
          <h3 className="text-sm font-extrabold text-foreground mb-2">Sobre esta planta</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{plant.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {plant.tags.map((tag) => (
              <span key={tag} className="bg-primary/10 text-primary text-[10px] font-bold px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Care info - expandable */}
      <div className="px-4 mt-3">
        <button
          onClick={() => setShowCareDetails(!showCareDetails)}
          className="w-full bg-card rounded-xl p-4 card-shadow"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-foreground">Guia de cuidados</h3>
            {showCareDetails ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
          </div>

          {/* Always visible summary */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="text-center">
              <p className="text-lg">{sunlightLabels[plant.careInfo.sunlight]?.split(" ")[0]}</p>
              <p className="text-[10px] font-bold text-muted-foreground">{plant.careInfo.sunlight}</p>
            </div>
            <div className="text-center">
              <p className="text-lg">💧</p>
              <p className="text-[10px] font-bold text-muted-foreground">{plant.careInfo.humidity}</p>
            </div>
            <div className="text-center">
              <p className="text-lg">🌡️</p>
              <p className="text-[10px] font-bold text-muted-foreground">{plant.careInfo.temperature}</p>
            </div>
          </div>

          {/* Expanded details */}
          {showCareDetails && (
            <div className="mt-3 pt-3 border-t border-border space-y-2.5 animate-fade-in">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground font-semibold">Frequência de rega</span>
                <span className="text-xs font-bold text-foreground">{plant.careInfo.waterFrequency}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground font-semibold">Tipo de solo</span>
                <span className="text-xs font-bold text-foreground text-right max-w-[55%]">{plant.careInfo.soilType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground font-semibold">Toxicidade</span>
                <span className={`text-xs font-bold ${plant.careInfo.toxicity === "Não tóxica" ? "text-success" : "text-destructive"}`}>
                  {plant.careInfo.toxicity}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground font-semibold">Adicionada em</span>
                <span className="text-xs font-bold text-foreground">{plant.addedDate}</span>
              </div>
            </div>
          )}
        </button>
      </div>

      {/* Recent history - inline */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-extrabold text-foreground">Histórico recente</h3>
          <span className="text-[10px] font-bold text-muted-foreground">{plantLogs.length} registros</span>
        </div>
        {plantLogs.length > 0 ? (
          <>
            <div className="space-y-1.5">
              {(showAllHistory ? plantLogs : plantLogs.slice(0, 4)).map((log) => (
                <div key={log.id} className="bg-card rounded-xl p-3 card-shadow flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">{TASK_ICONS[log.type]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-foreground">{log.action}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{log.note}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[10px] font-bold text-muted-foreground">{log.date.slice(5)}</p>
                    <p className="text-[9px] text-muted-foreground">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
            {plantLogs.length > 4 && (
              <button
                onClick={() => setShowAllHistory(!showAllHistory)}
                className="w-full text-center text-xs font-bold text-primary mt-2 py-2"
              >
                {showAllHistory ? "Ver menos" : `Ver todos (${plantLogs.length})`}
              </button>
            )}
          </>
        ) : (
          <div className="bg-card rounded-xl p-6 card-shadow text-center">
            <p className="text-3xl mb-2">📝</p>
            <p className="text-sm font-semibold text-muted-foreground">Nenhum registro ainda</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantDetail;