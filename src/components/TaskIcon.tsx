import { Droplets, Sun, Scissors, FlaskConical, Sprout } from "lucide-react";

interface TaskIconProps {
  type: string;
  size?: number;
  className?: string;
}

const iconMap: Record<string, typeof Droplets> = {
  water: Droplets,
  sun: Sun,
  prune: Scissors,
  fertilize: FlaskConical,
  harvest: Sprout,
  repot: Sprout,
};

const TaskIcon = ({ type, size = 20, className = "" }: TaskIconProps) => {
  const Icon = iconMap[type] || Sprout;
  return <Icon size={size} className={className} />;
};

export default TaskIcon;
