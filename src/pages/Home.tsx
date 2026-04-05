import { useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircle, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AssistantAvatar from "@/components/AssistantAvatar";
import { MOCK_PLANTS, MOCK_TASKS, TASK_ICONS } from "@/data/plants";

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const Home = () => {
  const navigate = useNavigate();
  const [currentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number>(currentDate.getDate());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfWeek }, () => null);

  const pendingTasks = MOCK_TASKS.filter(t => !t.completed);
  const overdueTasks = pendingTasks.filter(t => t.overdue);

  // Simulate task distribution
  const taskDays: Record<number, { count: number; types: string[] }> = {
    18: { count: 1, types: ["water"] },
    19: { count: 1, types: ["prune"] },
    20: { count: 3, types: ["water", "water", "fertilize"] },
    22: { count: 2, types: ["sun", "water"] },
    25: { count: 1, types: ["harvest"] },
    28: { count: 2, types: ["water", "prune"] },
  };

  const tasksForSelectedDay = selectedDay === currentDate.getDate()
    ? pendingTasks.slice(0, 4)
    : selectedDay && taskDays[selectedDay]
    ? [MOCK_TASKS[0]]
    : [];

  return (
    <div className="px-4 pt-6 pb-4">
      {/* Greeting + Assistant */}
      <div className="flex items-center justify-between mb-5 animate-fade-in">
        <div className="flex items-center gap-3">
          <AssistantAvatar size={44} />
          <div>
            <h1 className="text-xl font-extrabold text-foreground">Olá, Jardineiro! 🌱</h1>
            <p className="text-xs text-muted-foreground font-semibold">
              {pendingTasks.length} tarefa{pendingTasks.length !== 1 ? "s" : ""} pendente{pendingTasks.length !== 1 ? "s" : ""}
              {overdueTasks.length > 0 && (
                <span className="text-destructive"> · {overdueTasks.length} atrasada{overdueTasks.length !== 1 ? "s" : ""}</span>
              )}
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/assistant")}
          className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center card-shadow"
        >
          <MessageCircle size={20} className="text-primary-foreground" />
        </button>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-2 mb-5 animate-slide-up opacity-0 stagger-1">
        <div className="bg-card rounded-xl p-3 card-shadow text-center">
          <p className="text-xl font-extrabold text-foreground">{MOCK_PLANTS.length}</p>
          <p className="text-[10px] font-bold text-muted-foreground">Plantas</p>
        </div>
        <div className="bg-card rounded-xl p-3 card-shadow text-center">
          <p className="text-xl font-extrabold text-primary">{pendingTasks.length}</p>
          <p className="text-[10px] font-bold text-muted-foreground">Pendentes</p>
        </div>
        <div className="bg-card rounded-xl p-3 card-shadow text-center">
          <p className="text-xl font-extrabold text-destructive">{overdueTasks.length}</p>
          <p className="text-[10px] font-bold text-muted-foreground">Atrasadas</p>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-card rounded-2xl card-shadow p-4 mb-5 animate-slide-up opacity-0 stagger-2">
        <div className="flex items-center justify-between mb-3">
          <button className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
            <ChevronLeft size={16} className="text-foreground" />
          </button>
          <h2 className="text-sm font-extrabold text-foreground">
            {MONTHS[month]} {year}
          </h2>
          <button className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
            <ChevronRight size={16} className="text-foreground" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-0.5 mb-1">
          {DAYS.map((d) => (
            <div key={d} className="text-center text-[9px] font-bold text-muted-foreground py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-0.5">
          {blanks.map((_, i) => (
            <div key={`blank-${i}`} className="h-9" />
          ))}
          {days.map((day) => {
            const isToday = day === currentDate.getDate();
            const isSelected = day === selectedDay;
            const dayTasks = taskDays[day];

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`h-9 rounded-lg flex flex-col items-center justify-center text-[11px] font-bold relative transition-all ${
                  isSelected
                    ? "bg-primary text-primary-foreground scale-105"
                    : isToday
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {day}
                {dayTasks && (
                  <div className="flex gap-px mt-px">
                    {dayTasks.types.slice(0, 3).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 h-1 rounded-full ${
                          isSelected ? "bg-primary-foreground" : "bg-primary"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tasks for selected day */}
      <div className="animate-slide-up opacity-0 stagger-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-extrabold text-foreground">
            {selectedDay === currentDate.getDate() ? "📋 Tarefas de hoje" : `${selectedDay} de ${MONTHS[month]}`}
          </h3>
          <button
            onClick={() => navigate("/garden/add")}
            className="text-[10px] font-bold text-primary flex items-center gap-1"
          >
            <Plus size={12} />
            Planta
          </button>
        </div>

        {tasksForSelectedDay.length > 0 ? (
          <div className="space-y-2">
            {tasksForSelectedDay.map((task) => (
              <button
                key={task.id}
                onClick={() => navigate(`/garden/${task.plantId}`)}
                className="w-full bg-card rounded-xl p-3 card-shadow flex items-center gap-3 text-left transition-all active:scale-[0.98]"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                  task.overdue ? "bg-destructive/15" : task.priority === "high" || task.priority === "critical" ? "bg-warning/15" : "bg-secondary"
                }`}>
                  {TASK_ICONS[task.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">{task.title}</p>
                  <p className="text-[10px] text-muted-foreground font-semibold truncate">
                    {task.smartReason.slice(0, 60)}...
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      task.overdue ? "bg-destructive" : task.priority === "critical" ? "bg-destructive animate-pulse" : task.priority === "high" ? "bg-warning" : "bg-primary"
                    }`}
                  />
                  <span className="text-[9px] font-bold text-muted-foreground">
                    {task.overdue ? "Atrasada" : task.priority === "critical" ? "Urgente" : ""}
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-xl p-6 card-shadow text-center">
            <p className="text-3xl mb-2">🌿</p>
            <p className="text-sm font-semibold text-muted-foreground">
              Nenhuma tarefa neste dia
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
