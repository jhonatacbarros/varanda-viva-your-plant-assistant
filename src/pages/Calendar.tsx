import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MOCK_TASKS, TASK_ICONS } from "@/data/plants";

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const Calendar = () => {
  const [currentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(currentDate.getDate());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfWeek }, () => null);

  // Simulate task distribution
  const taskDays: Record<number, { count: number; types: string[] }> = {
    18: { count: 1, types: ["water"] },
    19: { count: 1, types: ["prune"] },
    20: { count: 3, types: ["water", "water", "fertilize"] },
    22: { count: 2, types: ["sun", "water"] },
    25: { count: 1, types: ["harvest"] },
    28: { count: 2, types: ["water", "prune"] },
  };

  const tasksForSelectedDay = selectedDay === 20 ? MOCK_TASKS.filter(t => !t.completed).slice(0, 3) : 
    selectedDay && taskDays[selectedDay] ? [MOCK_TASKS[0]] : [];

  return (
    <div className="px-4 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 animate-fade-in">
        <h1 className="text-2xl font-extrabold text-foreground">Calendário</h1>
      </div>

      {/* Month nav */}
      <div className="flex items-center justify-between mb-4 animate-slide-up opacity-0 stagger-1">
        <button className="w-9 h-9 rounded-xl bg-card flex items-center justify-center card-shadow">
          <ChevronLeft size={18} className="text-foreground" />
        </button>
        <h2 className="text-lg font-extrabold text-foreground">
          {MONTHS[month]} {year}
        </h2>
        <button className="w-9 h-9 rounded-xl bg-card flex items-center justify-center card-shadow">
          <ChevronRight size={18} className="text-foreground" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[10px] font-bold text-muted-foreground py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 mb-6 animate-slide-up opacity-0 stagger-2">
        {blanks.map((_, i) => (
          <div key={`blank-${i}`} className="h-11" />
        ))}
        {days.map((day) => {
          const isToday = day === currentDate.getDate();
          const isSelected = day === selectedDay;
          const dayTasks = taskDays[day];

          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`h-11 rounded-xl flex flex-col items-center justify-center text-xs font-bold relative transition-all ${
                isSelected
                  ? "bg-primary text-primary-foreground scale-105"
                  : isToday
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground hover:bg-card"
              }`}
            >
              {day}
              {dayTasks && (
                <div className="flex gap-0.5 mt-0.5">
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

      {/* Selected day tasks */}
      {selectedDay && (
        <div className="animate-slide-up opacity-0 stagger-3">
          <h3 className="text-sm font-extrabold text-foreground mb-3">
            {selectedDay === currentDate.getDate() ? "Hoje" : `${selectedDay} de ${MONTHS[month]}`}
          </h3>
          {tasksForSelectedDay.length > 0 ? (
            <div className="space-y-2">
              {tasksForSelectedDay.map((task) => (
                <div
                  key={task.id}
                  className="bg-card rounded-xl p-3 card-shadow flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-lg">
                    {TASK_ICONS[task.type]}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">{task.title}</p>
                    <p className="text-[10px] text-muted-foreground font-semibold">
                      {task.plantName}
                    </p>
                  </div>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      task.completed ? "bg-success" : task.overdue ? "bg-destructive" : "bg-warning"
                    }`}
                  />
                </div>
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
      )}
    </div>
  );
};

export default Calendar;
