export interface Plant {
  id: string;
  name: string;
  species: string;
  image: string;
  health: number; // 0-100
  nextAction: string;
  nextActionType: "water" | "sun" | "prune" | "fertilize" | "harvest";
  growthProgress: number; // 0-100
  addedDate: string;
  location: string;
  tags: string[];
}

export interface Task {
  id: string;
  plantId: string;
  plantName: string;
  type: "water" | "sun" | "prune" | "fertilize" | "harvest" | "repot";
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "critical";
  completed: boolean;
  dueDate: string;
  overdue: boolean;
}

export const MOCK_PLANTS: Plant[] = [
  {
    id: "1",
    name: "Manjericão",
    species: "Ocimum basilicum",
    image: "🌿",
    health: 85,
    nextAction: "Regar hoje",
    nextActionType: "water",
    growthProgress: 60,
    addedDate: "2024-01-15",
    location: "Varanda",
    tags: ["fácil", "sol da manhã", "aromática"],
  },
  {
    id: "2",
    name: "Suculenta Jade",
    species: "Crassula ovata",
    image: "🪴",
    health: 95,
    nextAction: "Regar em 3 dias",
    nextActionType: "water",
    growthProgress: 40,
    addedDate: "2024-02-01",
    location: "Sala",
    tags: ["fácil", "pouca água", "iniciante"],
  },
  {
    id: "3",
    name: "Samambaia",
    species: "Nephrolepis exaltata",
    image: "🌱",
    health: 70,
    nextAction: "Borrifar folhas",
    nextActionType: "water",
    growthProgress: 75,
    addedDate: "2024-01-20",
    location: "Banheiro",
    tags: ["moderada", "sombra", "umidade"],
  },
  {
    id: "4",
    name: "Orquídea",
    species: "Phalaenopsis",
    image: "🌸",
    health: 60,
    nextAction: "Adubar",
    nextActionType: "fertilize",
    growthProgress: 30,
    addedDate: "2024-03-10",
    location: "Quarto",
    tags: ["moderada", "luz indireta"],
  },
  {
    id: "5",
    name: "Alecrim",
    species: "Rosmarinus officinalis",
    image: "🌿",
    health: 90,
    nextAction: "Podar galhos secos",
    nextActionType: "prune",
    growthProgress: 80,
    addedDate: "2024-01-05",
    location: "Varanda",
    tags: ["fácil", "sol pleno", "aromática"],
  },
  {
    id: "6",
    name: "Jibóia",
    species: "Epipremnum aureum",
    image: "🍃",
    health: 88,
    nextAction: "Regar em 2 dias",
    nextActionType: "water",
    growthProgress: 55,
    addedDate: "2024-02-20",
    location: "Sala",
    tags: ["fácil", "pouca luz", "iniciante"],
  },
];

export const MOCK_TASKS: Task[] = [
  {
    id: "t1",
    plantId: "1",
    plantName: "Manjericão",
    type: "water",
    title: "Regar Manjericão",
    description: "Solo seco, hora de regar!",
    priority: "high",
    completed: false,
    dueDate: "2024-12-20",
    overdue: false,
  },
  {
    id: "t2",
    plantId: "3",
    plantName: "Samambaia",
    type: "water",
    title: "Borrifar Samambaia",
    description: "Umidade baixa, borrife as folhas",
    priority: "medium",
    completed: false,
    dueDate: "2024-12-20",
    overdue: false,
  },
  {
    id: "t3",
    plantId: "4",
    plantName: "Orquídea",
    type: "fertilize",
    title: "Adubar Orquídea",
    description: "Aplicar adubo líquido diluído",
    priority: "low",
    completed: false,
    dueDate: "2024-12-20",
    overdue: false,
  },
  {
    id: "t4",
    plantId: "5",
    plantName: "Alecrim",
    type: "prune",
    title: "Podar Alecrim",
    description: "Remover galhos secos e estimular crescimento",
    priority: "medium",
    completed: true,
    dueDate: "2024-12-19",
    overdue: false,
  },
  {
    id: "t5",
    plantId: "2",
    plantName: "Suculenta Jade",
    type: "water",
    title: "Regar Suculenta",
    description: "Atrasado! Rega era para ontem",
    priority: "critical",
    completed: false,
    dueDate: "2024-12-18",
    overdue: true,
  },
];

export const TASK_ICONS: Record<string, string> = {
  water: "💧",
  sun: "☀️",
  prune: "✂️",
  fertilize: "🧪",
  harvest: "🌾",
  repot: "🪴",
};

export const CATALOG_PLANTS = [
  { name: "Manjericão", tags: ["fácil", "sol da manhã"], emoji: "🌿" },
  { name: "Suculenta", tags: ["pouca água", "iniciante"], emoji: "🪴" },
  { name: "Samambaia", tags: ["sombra", "umidade"], emoji: "🌱" },
  { name: "Orquídea", tags: ["luz indireta", "moderada"], emoji: "🌸" },
  { name: "Alecrim", tags: ["sol pleno", "aromática"], emoji: "🌿" },
  { name: "Jibóia", tags: ["pouca luz", "iniciante"], emoji: "🍃" },
  { name: "Lavanda", tags: ["sol pleno", "fácil"], emoji: "💜" },
  { name: "Hortelã", tags: ["fácil", "aromática"], emoji: "🌱" },
];
