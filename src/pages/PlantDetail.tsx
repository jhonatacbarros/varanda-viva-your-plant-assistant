import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Droplets, Sun, Heart, Scissors, FlaskConical, Sprout, Repeat2, CloudDrizzle } from "lucide-react";
import { MOCK_PLANTS, MOCK_TASKS, MOCK_CARE_LOGS, TASK_ICONS, TASK_LABELS } from "@/data/plants";
import { useState } from "react";

const tabs = ["Visão geral", "Cuidados", "Calendário", "Histórico"];

const typeIcons: Record<string, React.ReactNode> = {
  water: <Droplets size={16} className="text-foreground" />,
  sun: <Sun size={16} className="text-foreground" />,
  prune: <Scissors size={16} className="text-foreground" />,
  fertilize: <FlaskConical size={16} className="text-foreground" />,
  harvest: <Sprout size={16} className="text-foreground" />,
  repot: <Repeat2 size={16} className="text-foreground" />,
  spray: <CloudDrizzle size={16} className="text-foreground" />,
};

const PlantDetail = () => {
  const { plantId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [completedActions, setCompletedActions] = useState<string[]>([]);

  const plant = MOCK_PLANTS.find((p) => p.id === plantId);
  if (!plant) return <div className="p-6 text-center text-muted-foreground">Planta não encontrada</div>;

  const plantTasks = MOCK_TASKS.filter((t) => t.plantId === plant.id);
  const plantLogs = MOCK_CARE_LOGS.filter((l) => l.plantId === plant.id).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const healthColor = plant.health >= 80 ? "bg-success" : plant.health >= 50 ? "bg-warning" : "bg-destructive";

  const handleQuickAction = (type: string) => {
    setCompletedActions((prev) => [...prev, type]);
    setTimeout(() => {
      setCompletedActions((prev) => prev.filter((t) => t !== type));
    }, 2000);
  };

  const quickActions = ["water", "spray", "fertilize", "prune", "sun", "harvest", "repot"];

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

      {/* Quick actions */}
      <div className="px-4 mt-4">
        <h3 className="text-sm font-extrabold text-foreground mb-2">Ações rápidas</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {quickActions.map((type) => {
            const isCompleted = completedActions.includes(type);
            return (
              <button
                key={type}
                onClick={() => handleQuickAction(type)}
                className={`flex flex-col items-center gap-1 min-w-[64px] py-2.5 px-2 rounded-xl transition-all duration-300 ${
                  isCompleted
                    ? "bg-success/20 scale-95"
                    : "bg-card card-shadow hover:card-shadow-hover active:scale-95"
                }`}
              >
                <span className="text-xl">{TASK_ICONS[type]}</span>
                <span className={`text-[10px] font-bold ${isCompleted ? "text-success" : "text-foreground"}`}>
                  {isCompleted ? "✓" : TASK_LABELS[type]}
                </span>
              </button>
            );
          })}
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
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground font-semibold">Cuidados realizados</span>
                  <span className="text-xs font-bold text-foreground">{plantLogs.length}</span>
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
            {/* Recent activity summary */}
            <div className="bg-card rounded-xl p-4 card-shadow">
              <h3 className="text-sm font-extrabold text-foreground mb-3">Atividade recente</h3>
              {plantLogs.slice(0, 3).map((log) => (
                <div key={log.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                    <span className="text-sm">{TASK_ICONS[log.type]}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-foreground">{log.action}</p>
                    <p className="text-[10px] text-muted-foreground">{log.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div className="space-y-3 animate-fade-in">
            <h3 className="text-sm font-extrabold text-foreground">Próximas tarefas</h3>
            {plantTasks.length > 0 ? (
              plantTasks.map((task) => (
                <div key={task.id} className={`bg-card rounded-xl p-3 card-shadow flex items-center gap-3 ${
                  task.overdue ? "border-l-4 border-l-destructive" : ""
                }`}>
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    task.completed ? "bg-success/20" : task.overdue ? "bg-destructive/15" : "bg-secondary"
                  }`}>
                    {typeIcons[task.type] || <Droplets size={16} className="text-foreground" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-bold ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                        {task.title}
                      </p>
                      {task.overdue && !task.completed && (
                        <span className="text-[9px] font-bold bg-destructive text-destructive-foreground px-1.5 py-0.5 rounded-full">
                          Atrasado
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground">{task.description}</p>
                  </div>
                  <span className="text-xs font-bold text-muted-foreground">{task.dueDate.slice(5)}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Sem tarefas pendentes 🎉</p>
            )}

            {/* Care tips */}
            <div className="bg-accent/30 rounded-xl p-4 mt-2">
              <h4 className="text-xs font-extrabold text-foreground mb-2">💡 Dicas de cuidado</h4>
              <ul className="space-y-1.5">
                <li className="text-[11px] text-foreground">• Regue pela manhã para evitar fungos</li>
                <li className="text-[11px] text-foreground">• Verifique o solo antes de regar novamente</li>
                <li className="text-[11px] text-foreground">• Adube a cada 15 dias na primavera/verão</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className="animate-fade-in space-y-3">
            <h3 className="text-sm font-extrabold text-foreground">Calendário de cuidados</h3>
            {/* Mini calendar showing care dates */}
            <div className="bg-card rounded-xl p-4 card-shadow">
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {["S", "T", "Q", "Q", "S", "S", "D"].map((d, i) => (
                  <span key={i} className="text-[10px] font-bold text-muted-foreground">{d}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 31 }, (_, i) => {
                  const day = i + 1;
                  const dateStr = `2024-12-${String(day).padStart(2, "0")}`;
                  const logsForDay = plantLogs.filter((l) => l.date === dateStr);
                  const hasLog = logsForDay.length > 0;
                  return (
                    <div
                      key={i}
                      className={`w-full aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold ${
                        hasLog ? "bg-primary text-primary-foreground" : "text-foreground"
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Legend */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-primary" />
                <span className="text-[10px] font-semibold text-muted-foreground">Cuidado realizado</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div className="animate-fade-in space-y-2">
            <h3 className="text-sm font-extrabold text-foreground mb-1">Histórico de cuidados</h3>
            <p className="text-xs text-muted-foreground mb-3">{plantLogs.length} ações registradas</p>
            {plantLogs.length > 0 ? (
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-border" />
                <div className="space-y-0">
                  {plantLogs.map((log, i) => (
                    <div key={log.id} className="flex gap-3 relative pb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 z-10 ${
                        i === 0 ? "bg-primary/20" : "bg-card card-shadow"
                      }`}>
                        <span className="text-lg">{TASK_ICONS[log.type]}</span>
                      </div>
                      <div className="bg-card rounded-xl p-3 card-shadow flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-bold text-foreground">{log.action}</p>
                          <span className="text-[10px] text-muted-foreground font-semibold">{log.time}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">{log.note}</p>
                        <p className="text-[10px] text-muted-foreground mt-1 font-bold">{log.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-card rounded-xl p-6 card-shadow text-center">
                <p className="text-3xl mb-2">📝</p>
                <p className="text-sm font-semibold text-muted-foreground">Nenhum registro ainda</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantDetail;
