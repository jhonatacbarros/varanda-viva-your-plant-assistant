export interface PlantCareInfo {
  waterFrequency: string; // e.g. "A cada 2 dias"
  sunlight: "sol pleno" | "meia-sombra" | "sombra" | "luz indireta";
  humidity: "baixa" | "média" | "alta";
  temperature: string; // e.g. "18-28°C"
  difficulty: "fácil" | "moderada" | "difícil";
  soilType: string;
  toxicity: string;
}

export interface Plant {
  id: string;
  name: string;
  species: string;
  image: string;
  health: number;
  nextAction: string;
  nextActionType: "water" | "sun" | "prune" | "fertilize" | "harvest" | "repot" | "spray";
  growthProgress: number;
  addedDate: string;
  location: string;
  tags: string[];
  description: string;
  careInfo: PlantCareInfo;
  lastWatered: string;
  lastFertilized: string;
  nextWatering: string;
  nextFertilizing: string;
}

export interface Task {
  id: string;
  plantId: string;
  plantName: string;
  type: "water" | "sun" | "prune" | "fertilize" | "harvest" | "repot" | "spray";
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "critical";
  completed: boolean;
  dueDate: string;
  overdue: boolean;
}

export interface CareLog {
  id: string;
  plantId: string;
  plantName: string;
  type: "water" | "sun" | "prune" | "fertilize" | "harvest" | "repot" | "spray";
  action: string;
  note: string;
  date: string;
  time: string;
}

export interface FeedPost {
  id: string;
  userName: string;
  userAvatar: string;
  plantName: string;
  plantEmoji: string;
  image: string;
  caption: string;
  cultivares: number;
  comments: FeedComment[];
  timeAgo: string;
  cultivado: boolean;
}

export interface FeedComment {
  id: string;
  userName: string;
  text: string;
  timeAgo: string;
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
    description: "Erva aromática muito usada na culinária. Prefere sol direto pela manhã e solo úmido mas não encharcado.",
    careInfo: { waterFrequency: "A cada 2 dias", sunlight: "meia-sombra", humidity: "média", temperature: "18-30°C", difficulty: "fácil", soilType: "Rico em matéria orgânica, bem drenado", toxicity: "Não tóxica" },
    lastWatered: "2024-12-19",
    lastFertilized: "2024-12-14",
    nextWatering: "2024-12-21",
    nextFertilizing: "2024-12-28",
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
    description: "Suculenta resistente que armazena água nas folhas. Ideal para iniciantes, precisa de pouca manutenção.",
    careInfo: { waterFrequency: "A cada 10-14 dias", sunlight: "luz indireta", humidity: "baixa", temperature: "15-28°C", difficulty: "fácil", soilType: "Substrato para suculentas, muito drenante", toxicity: "Levemente tóxica para pets" },
    lastWatered: "2024-12-15",
    lastFertilized: "2024-12-01",
    nextWatering: "2024-12-25",
    nextFertilizing: "2025-01-01",
  },
  {
    id: "3",
    name: "Samambaia",
    species: "Nephrolepis exaltata",
    image: "🌱",
    health: 70,
    nextAction: "Borrifar folhas",
    nextActionType: "spray",
    growthProgress: 75,
    addedDate: "2024-01-20",
    location: "Banheiro",
    tags: ["moderada", "sombra", "umidade"],
    description: "Planta tropical que adora umidade alta. Perfeita para banheiros. Borrifar as folhas regularmente.",
    careInfo: { waterFrequency: "A cada 2-3 dias", sunlight: "sombra", humidity: "alta", temperature: "18-25°C", difficulty: "moderada", soilType: "Rico em húmus, mantém umidade", toxicity: "Não tóxica" },
    lastWatered: "2024-12-17",
    lastFertilized: "2024-12-10",
    nextWatering: "2024-12-20",
    nextFertilizing: "2024-12-24",
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
    description: "Orquídea elegante que floresce por meses. Regar por imersão e evitar acúmulo de água nas folhas.",
    careInfo: { waterFrequency: "A cada 5-7 dias (imersão)", sunlight: "luz indireta", humidity: "média", temperature: "18-28°C", difficulty: "moderada", soilType: "Casca de pinus, musgo sphagnum", toxicity: "Não tóxica" },
    lastWatered: "2024-12-16",
    lastFertilized: "2024-12-01",
    nextWatering: "2024-12-22",
    nextFertilizing: "2024-12-20",
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
    description: "Erva mediterrânea resistente que adora sol pleno. Excelente para culinária e tem aroma inconfundível.",
    careInfo: { waterFrequency: "A cada 3-5 dias", sunlight: "sol pleno", humidity: "baixa", temperature: "15-35°C", difficulty: "fácil", soilType: "Arenoso, bem drenado, pH alcalino", toxicity: "Não tóxica" },
    lastWatered: "2024-12-18",
    lastFertilized: "2024-12-10",
    nextWatering: "2024-12-22",
    nextFertilizing: "2024-12-25",
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
    description: "Trepadeira versátil que purifica o ar. Cresce em quase qualquer condição de luz, perfeita para interiores.",
    careInfo: { waterFrequency: "A cada 5-7 dias", sunlight: "luz indireta", humidity: "média", temperature: "18-30°C", difficulty: "fácil", soilType: "Universal, bem drenado", toxicity: "Tóxica para pets e crianças" },
    lastWatered: "2024-12-18",
    lastFertilized: "2024-12-05",
    nextWatering: "2024-12-23",
    nextFertilizing: "2024-12-19",
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
    type: "spray",
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
  {
    id: "t6",
    plantId: "1",
    plantName: "Manjericão",
    type: "harvest",
    title: "Colher Manjericão",
    description: "Folhas maduras prontas para colheita",
    priority: "low",
    completed: false,
    dueDate: "2024-12-21",
    overdue: false,
  },
  {
    id: "t7",
    plantId: "6",
    plantName: "Jibóia",
    type: "repot",
    title: "Transplantar Jibóia",
    description: "Raízes saindo pelo fundo do vaso",
    priority: "high",
    completed: false,
    dueDate: "2024-12-20",
    overdue: false,
  },
  {
    id: "t8",
    plantId: "5",
    plantName: "Alecrim",
    type: "sun",
    title: "Mover Alecrim ao sol",
    description: "Precisa de pelo menos 6h de sol direto",
    priority: "medium",
    completed: false,
    dueDate: "2024-12-20",
    overdue: false,
  },
  {
    id: "t9",
    plantId: "3",
    plantName: "Samambaia",
    type: "fertilize",
    title: "Adubar Samambaia",
    description: "Aplicar adubo foliar quinzenal",
    priority: "low",
    completed: false,
    dueDate: "2024-12-22",
    overdue: false,
  },
  {
    id: "t10",
    plantId: "4",
    plantName: "Orquídea",
    type: "spray",
    title: "Borrifar raízes da Orquídea",
    description: "Manter raízes aéreas hidratadas",
    priority: "medium",
    completed: false,
    dueDate: "2024-12-20",
    overdue: false,
  },
];

export const MOCK_CARE_LOGS: CareLog[] = [
  { id: "cl1", plantId: "1", plantName: "Manjericão", type: "water", action: "Regou", note: "Solo estava bem seco", date: "2024-12-19", time: "08:30" },
  { id: "cl2", plantId: "1", plantName: "Manjericão", type: "prune", action: "Podou", note: "Removeu folhas amareladas", date: "2024-12-18", time: "10:15" },
  { id: "cl3", plantId: "1", plantName: "Manjericão", type: "harvest", action: "Colheu", note: "Colheu folhas para receita de pesto", date: "2024-12-16", time: "17:00" },
  { id: "cl4", plantId: "1", plantName: "Manjericão", type: "fertilize", action: "Adubou", note: "Adubo NPK diluído 10-10-10", date: "2024-12-14", time: "09:00" },
  { id: "cl5", plantId: "2", plantName: "Suculenta Jade", type: "water", action: "Regou", note: "Rega leve, solo drenante", date: "2024-12-15", time: "07:45" },
  { id: "cl6", plantId: "2", plantName: "Suculenta Jade", type: "sun", action: "Moveu ao sol", note: "Colocou na janela por 4h", date: "2024-12-13", time: "08:00" },
  { id: "cl7", plantId: "3", plantName: "Samambaia", type: "spray", action: "Borrifou", note: "Borrifou folhas e substrato", date: "2024-12-19", time: "07:00" },
  { id: "cl8", plantId: "3", plantName: "Samambaia", type: "water", action: "Regou", note: "Rega profunda", date: "2024-12-17", time: "08:20" },
  { id: "cl9", plantId: "4", plantName: "Orquídea", type: "water", action: "Regou", note: "Imersão por 15 min", date: "2024-12-16", time: "09:30" },
  { id: "cl10", plantId: "4", plantName: "Orquídea", type: "spray", action: "Borrifou", note: "Borrifou raízes aéreas", date: "2024-12-18", time: "10:00" },
  { id: "cl11", plantId: "5", plantName: "Alecrim", type: "prune", action: "Podou", note: "Poda de formação", date: "2024-12-19", time: "11:00" },
  { id: "cl12", plantId: "5", plantName: "Alecrim", type: "harvest", action: "Colheu", note: "Ramos para tempero", date: "2024-12-17", time: "18:00" },
  { id: "cl13", plantId: "5", plantName: "Alecrim", type: "sun", action: "Moveu ao sol", note: "Voltou para varanda ensolarada", date: "2024-12-15", time: "07:30" },
  { id: "cl14", plantId: "6", plantName: "Jibóia", type: "water", action: "Regou", note: "Solo úmido, rega leve", date: "2024-12-18", time: "08:00" },
  { id: "cl15", plantId: "6", plantName: "Jibóia", type: "prune", action: "Podou", note: "Cortou ramo para propagar", date: "2024-12-12", time: "14:00" },
];

export const MOCK_FEED_POSTS: FeedPost[] = [
  {
    id: "f1",
    userName: "Ana Paula",
    userAvatar: "👩‍🌾",
    plantName: "Monstera Deliciosa",
    plantEmoji: "🌿",
    image: "🪴",
    caption: "Minha monstera deu uma folha nova fenestrada! 3 meses de espera valeram a pena 🥹💚",
    cultivares: 24,
    comments: [
      { id: "c1", userName: "Carlos", text: "Linda demais! Qual adubo você usa?", timeAgo: "2h" },
      { id: "c2", userName: "Maria", text: "Parabéns! A minha ainda tá na luta 😅", timeAgo: "1h" },
    ],
    timeAgo: "3h",
    cultivado: false,
  },
  {
    id: "f2",
    userName: "Pedro Santos",
    userAvatar: "🧑‍🌾",
    plantName: "Tomate Cereja",
    plantEmoji: "🍅",
    image: "🌱",
    caption: "Primeira colheita do meu tomate cereja na varanda! Orgulho de planteiro de apartamento 🏙️🍅",
    cultivares: 42,
    comments: [
      { id: "c3", userName: "Julia", text: "Que incrível! Dá pra plantar em vaso mesmo?", timeAgo: "5h" },
      { id: "c4", userName: "Ana Paula", text: "Maravilhoso! Quanto tempo levou?", timeAgo: "4h" },
      { id: "c5", userName: "Lucas", text: "Inspirador! Vou tentar também", timeAgo: "3h" },
    ],
    timeAgo: "6h",
    cultivado: true,
  },
  {
    id: "f3",
    userName: "Camila Rocha",
    userAvatar: "👩",
    plantName: "Orquídea Phalaenopsis",
    plantEmoji: "🌸",
    image: "🌺",
    caption: "Minha orquídea refloresce depois de 8 meses! Segredo: paciência e luz indireta ✨🌸",
    cultivares: 67,
    comments: [
      { id: "c6", userName: "Fernanda", text: "Conta mais! A minha nunca refloresceu 😭", timeAgo: "1h" },
    ],
    timeAgo: "8h",
    cultivado: false,
  },
  {
    id: "f4",
    userName: "Lucas Mendes",
    userAvatar: "🧔",
    plantName: "Samambaia",
    plantEmoji: "🌱",
    image: "☘️",
    caption: "Setup novo: samambaia pendurada no banheiro. Ela ama a umidade! 🚿🌿",
    cultivares: 31,
    comments: [
      { id: "c7", userName: "Camila Rocha", text: "Adorei a ideia! Vou copiar 😍", timeAgo: "30min" },
      { id: "c8", userName: "Pedro Santos", text: "Genial! Qual suporte você usou?", timeAgo: "20min" },
    ],
    timeAgo: "12h",
    cultivado: false,
  },
  {
    id: "f5",
    userName: "Fernanda Lima",
    userAvatar: "👩‍🦰",
    plantName: "Suculentas",
    plantEmoji: "🪴",
    image: "🌵",
    caption: "Minha coleção de suculentas já tem 15! Cada uma com personalidade diferente 💚🪴",
    cultivares: 55,
    comments: [
      { id: "c9", userName: "Ana Paula", text: "Qual sua favorita? 😍", timeAgo: "2h" },
      { id: "c10", userName: "Lucas Mendes", text: "Impressionante! Quanto tempo pra juntar tudo?", timeAgo: "1h" },
    ],
    timeAgo: "1d",
    cultivado: true,
  },
];

export const TASK_ICONS: Record<string, string> = {
  water: "💧",
  sun: "☀️",
  prune: "✂️",
  fertilize: "🧪",
  harvest: "🌾",
  repot: "🪴",
  spray: "💦",
};

export const TASK_LABELS: Record<string, string> = {
  water: "Regar",
  sun: "Luz solar",
  prune: "Podar",
  fertilize: "Adubar",
  harvest: "Colher",
  repot: "Transplantar",
  spray: "Borrifar",
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
