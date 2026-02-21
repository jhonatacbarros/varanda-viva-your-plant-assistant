import { useState } from "react";
import { Bell } from "lucide-react";
import AssistantAvatar from "@/components/AssistantAvatar";
import TaskCard from "@/components/TaskCard";
import { MOCK_TASKS } from "@/data/plants";

const greetings = [
  "Bom dia! ☀️ Suas plantas precisam de atenção hoje.",
  "Olá! Vamos cuidar do seu jardim?",
  "Hoje é dia de mimar suas plantinhas! 🌿",
];

const Assistant = () => {
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const pendingCount = tasks.filter((t) => !t.completed && !t.overdue).length;
  const overdueCount = tasks.filter((t) => t.overdue && !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  const handleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: true } : t))
    );
  };

  const greeting = greetings[0];

  return (
    <div className="px-4 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Varanda Viva</h1>
          <p className="text-sm text-muted-foreground font-semibold">Seu assistente de plantas 🌱</p>
        </div>
        <button className="relative w-10 h-10 rounded-xl bg-card flex items-center justify-center card-shadow">
          <Bell size={20} className="text-foreground" />
          {(pendingCount + overdueCount) > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
              {pendingCount + overdueCount}
            </span>
          )}
        </button>
      </div>

      {/* Assistant message */}
      <div className="flex gap-3 mb-6 animate-slide-up opacity-0 stagger-1">
        <AssistantAvatar size={44} />
        <div className="bg-secondary rounded-2xl rounded-tl-sm p-3.5 flex-1">
          <p className="text-sm font-semibold text-secondary-foreground">{greeting}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {overdueCount > 0
              ? `⚠️ ${overdueCount} tarefa${overdueCount > 1 ? "s" : ""} atrasada${overdueCount > 1 ? "s" : ""}`
              : `✅ ${pendingCount} tarefa${pendingCount !== 1 ? "s" : ""} para hoje`}
          </p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-card rounded-xl p-3 text-center card-shadow animate-slide-up opacity-0 stagger-2">
          <p className="text-xl font-extrabold text-foreground">{pendingCount}</p>
          <p className="text-[10px] font-semibold text-muted-foreground">Pendentes</p>
        </div>
        <div className="bg-card rounded-xl p-3 text-center card-shadow animate-slide-up opacity-0 stagger-3">
          <p className="text-xl font-extrabold text-destructive">{overdueCount}</p>
          <p className="text-[10px] font-semibold text-muted-foreground">Atrasadas</p>
        </div>
        <div className="bg-card rounded-xl p-3 text-center card-shadow animate-slide-up opacity-0 stagger-4">
          <p className="text-xl font-extrabold text-primary">{completedCount}</p>
          <p className="text-[10px] font-semibold text-muted-foreground">Concluídas</p>
        </div>
      </div>

      {/* Section label */}
      <h2 className="text-lg font-extrabold text-foreground mb-3">Tarefas de hoje</h2>

      {/* Tasks */}
      <div className="space-y-3 pb-4">
        {tasks
          .sort((a, b) => {
            if (a.completed !== b.completed) return a.completed ? 1 : -1;
            if (a.overdue !== b.overdue) return a.overdue ? -1 : 1;
            const p = { critical: 0, high: 1, medium: 2, low: 3 };
            return p[a.priority] - p[b.priority];
          })
          .map((task, i) => (
            <TaskCard
              key={task.id}
              task={task}
              index={i}
              onComplete={handleComplete}
            />
          ))}
      </div>
    </div>
  );
};

export default Assistant;
