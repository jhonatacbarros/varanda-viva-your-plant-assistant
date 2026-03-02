import { useState } from "react";
import { Check, Clock, SkipForward, ChevronDown, ChevronUp, Zap, Thermometer, Sprout, CalendarDays } from "lucide-react";
import { Task } from "@/data/plants";
import TaskIcon from "./TaskIcon";

interface TaskCardProps {
  task: Task;
  index: number;
  onComplete: (id: string) => void;
}

const priorityStyles: Record<string, string> = {
  low: "border-l-4 border-l-primary",
  medium: "border-l-4 border-l-accent",
  high: "border-l-4 border-l-warning",
  critical: "border-l-4 border-l-destructive",
};

const triggerIcons: Record<string, React.ReactNode> = {
  schedule: <CalendarDays size={10} />,
  condition: <Zap size={10} />,
  environment: <Thermometer size={10} />,
  growth: <Sprout size={10} />,
};

const triggerLabels: Record<string, string> = {
  schedule: "Agendada",
  condition: "Baseada em condição",
  environment: "Ambiente",
  growth: "Crescimento",
};

const triggerColors: Record<string, string> = {
  schedule: "bg-primary/10 text-primary",
  condition: "bg-warning/10 text-warning",
  environment: "bg-accent/10 text-accent-foreground",
  growth: "bg-success/10 text-success",
};

const TaskCard = ({ task, index, onComplete }: TaskCardProps) => {
  const [completing, setCompleting] = useState(false);
  const [completed, setCompleted] = useState(task.completed);
  const [expanded, setExpanded] = useState(false);

  const handleComplete = () => {
    setCompleting(true);
    setTimeout(() => {
      setCompleted(true);
      onComplete(task.id);
    }, 400);
  };

  return (
    <div
      className={`bg-card rounded-xl card-shadow animate-slide-up opacity-0 stagger-${index + 1} ${
        priorityStyles[task.priority]
      } ${completing ? "task-complete-animation" : ""} ${
        completed ? "opacity-60" : ""
      } transition-all duration-300`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
            completed ? "bg-success/20" : task.overdue ? "bg-destructive/15" : "bg-secondary"
          }`}>
            <TaskIcon
              type={task.type}
              size={20}
              className={completed ? "text-success" : task.overdue ? "text-destructive" : "text-foreground"}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={`font-bold text-sm ${completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                {task.title}
              </h3>
              {task.overdue && !completed && (
                <span className="text-[10px] font-bold bg-destructive text-destructive-foreground px-1.5 py-0.5 rounded-full">
                  Atrasado
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{task.description}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[10px] text-muted-foreground font-semibold">{task.plantName}</span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 ${triggerColors[task.trigger]}`}>
                {triggerIcons[task.trigger]}
                {triggerLabels[task.trigger]}
              </span>
            </div>
          </div>
        </div>

        {/* Expandable smart info */}
        {!completed && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 mt-2.5 ml-13 text-[11px] font-bold text-primary"
          >
            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            {expanded ? "Menos detalhes" : "Por que este cuidado?"}
          </button>
        )}

        {expanded && !completed && (
          <div className="ml-13 mt-2 space-y-2 animate-fade-in">
            {/* Smart reason */}
            <div className="bg-primary/5 border border-primary/10 rounded-lg p-2.5">
              <p className="text-[10px] font-bold text-primary mb-0.5">🧠 Por que agora?</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{task.smartReason}</p>
            </div>

            {/* Condition to check */}
            <div className="bg-warning/5 border border-warning/10 rounded-lg p-2.5">
              <p className="text-[10px] font-bold text-warning mb-0.5">📋 O que verificar</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{task.condition}</p>
            </div>
          </div>
        )}

        {!completed && (
          <div className="flex gap-2 mt-3 ml-13">
            <button
              onClick={handleComplete}
              className="flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-xs font-bold hover:opacity-90 transition-opacity"
            >
              <Check size={14} />
              Concluir
            </button>
            <button className="flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-80 transition-opacity">
              <Clock size={14} />
              Adiar
            </button>
            <button className="flex items-center gap-1 text-muted-foreground px-2 py-1.5 rounded-lg text-xs font-semibold hover:bg-secondary transition-colors">
              <SkipForward size={14} />
              Pular
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
