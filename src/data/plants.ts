export interface ToxicityInfo {
  dogs: boolean;
  cats: boolean;
  birds: boolean;
  children: boolean;
  symptoms: string;
  severity: "não tóxica" | "levemente tóxica" | "moderadamente tóxica" | "altamente tóxica";
}

export type SoilMoisturePreference = "seco" | "levemente úmido" | "úmido" | "encharcado";
export type WateringMethod = "topo" | "imersão" | "fundo" | "borrifação";

export interface PreActionCheck {
  id: string;
  label: string;
  description: string;
  icon: string;
  critical: boolean; // if true, warns user NOT to proceed if check fails
}

export interface SmartCareConditions {
  soilMoisturePreference: SoilMoisturePreference;
  wateringMethod: WateringMethod;
  wateringMethodTip: string;
  checkSoilBeforeWatering: boolean;
  soilCheckDepth: string; // e.g. "2cm"
  drainageNeeded: boolean;
  mistingNeeded: boolean;
  mistingFrequency?: string;
  sensitiveToOverwatering: boolean;
  sensitiveToUnderwatering: boolean;
  dormancyPeriod?: string; // e.g. "Inverno"
  dormancyWateringReduction: string; // e.g. "Reduzir para 50%"
  leafWettingSensitive: boolean; // some plants don't like wet leaves
  bestTimeToWater: string; // e.g. "Manhã cedo"
  rootType: string; // e.g. "Raízes aéreas", "Raízes superficiais"
}

export interface ActionPreChecks {
  water: PreActionCheck[];
  spray: PreActionCheck[];
  fertilize: PreActionCheck[];
  prune: PreActionCheck[];
  sun: PreActionCheck[];
  harvest: PreActionCheck[];
  repot: PreActionCheck[];
}

export interface PlantCareInfo {
  waterFrequency: string;
  waterAmount: string;
  sunlight: "sol pleno" | "meia-sombra" | "sombra" | "luz indireta";
  sunHoursPerDay: string;
  humidity: "baixa" | "média" | "alta";
  temperature: string;
  idealSeason: string;
  climate: string;
  difficulty: "fácil" | "moderada" | "difícil";
  soilType: string;
  fertilizerType: string;
  fertilizerFrequency: string;
  pruningTips: string;
  propagation: string;
  toxicity: ToxicityInfo;
  smartConditions: SmartCareConditions;
  preChecks: ActionPreChecks;
}

export interface Plant {
  id: string;
  name: string;
  species: string;
  image: string;
  photo?: string; // user uploaded photo URL
  health: number;
  nextAction: string;
  nextActionType: "water" | "sun" | "prune" | "fertilize" | "harvest" | "repot" | "spray";
  growthProgress: number;
  addedDate: string;
  location: string;
  origin: string; // e.g. "Mediterrâneo"
  companionPlants: string[]; // plants that grow well together
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
  smartReason: string; // WHY this task exists (condition-based)
  condition: string; // what to check before doing it
  priority: "low" | "medium" | "high" | "critical";
  completed: boolean;
  dueDate: string;
  overdue: boolean;
  trigger: "schedule" | "condition" | "environment" | "growth"; // what triggered this task
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
  userId: string;
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
    origin: "Índia e Ásia tropical",
    companionPlants: ["Tomate", "Pimentão", "Alecrim"],
    tags: ["fácil", "sol da manhã", "aromática"],
    description: "Erva aromática muito usada na culinária. Prefere sol direto pela manhã e solo úmido mas não encharcado.",
    careInfo: {
      waterFrequency: "A cada 2 dias", waterAmount: "150-200ml", sunlight: "meia-sombra", sunHoursPerDay: "4-6h",
      humidity: "média", temperature: "18-30°C", idealSeason: "Primavera e Verão", climate: "Tropical e Subtropical",
      difficulty: "fácil", soilType: "Rico em matéria orgânica, bem drenado",
      fertilizerType: "NPK 10-10-10 diluído", fertilizerFrequency: "A cada 15 dias",
      pruningTips: "Corte acima do segundo par de folhas para estimular ramificação",
      propagation: "Sementes ou estacas em água",
      toxicity: { dogs: false, cats: false, birds: false, children: false, symptoms: "Nenhum", severity: "não tóxica" },
      smartConditions: {
        soilMoisturePreference: "levemente úmido",
        wateringMethod: "topo",
        wateringMethodTip: "Regue diretamente no solo, evitando molhar as folhas para prevenir fungos.",
        checkSoilBeforeWatering: true,
        soilCheckDepth: "2cm",
        drainageNeeded: true,
        mistingNeeded: false,
        sensitiveToOverwatering: true,
        sensitiveToUnderwatering: true,
        dormancyPeriod: "Inverno",
        dormancyWateringReduction: "Reduzir 50%, regar apenas quando solo estiver seco",
        leafWettingSensitive: true,
        bestTimeToWater: "Manhã cedo (6-8h)",
        rootType: "Raízes superficiais e finas",
      },
      preChecks: {
        water: [
          { id: "soil", label: "Verificar solo", description: "Enfie o dedo 2cm no solo. Deve estar seco ao toque antes de regar.", icon: "🪴", critical: true },
          { id: "leaves", label: "Checar folhas", description: "Folhas murchas = precisa de água. Folhas amarelas = excesso de água.", icon: "🍃", critical: false },
          { id: "drain", label: "Garantir drenagem", description: "Certifique-se que o vaso tem furos e o prato não acumula água.", icon: "🕳️", critical: true },
        ],
        spray: [
          { id: "temp", label: "Evitar em calor intenso", description: "Não borrife sob sol direto. Gotas podem queimar as folhas.", icon: "☀️", critical: true },
        ],
        fertilize: [
          { id: "moist", label: "Solo deve estar úmido", description: "Nunca adube em solo seco. Regue 1h antes de aplicar fertilizante.", icon: "💧", critical: true },
          { id: "season", label: "Verificar estação", description: "Adubar preferencialmente na primavera/verão quando a planta está crescendo.", icon: "🌸", critical: false },
        ],
        prune: [
          { id: "tool", label: "Ferramenta limpa", description: "Use tesoura esterilizada com álcool 70% para evitar doenças.", icon: "✂️", critical: true },
          { id: "node", label: "Cortar acima do nó", description: "Corte acima do segundo par de folhas para estimular ramificação.", icon: "🌿", critical: false },
        ],
        sun: [
          { id: "time", label: "Horário ideal", description: "Sol da manhã (antes das 10h) é ideal. Evite sol do meio-dia.", icon: "🌅", critical: false },
        ],
        harvest: [
          { id: "morning", label: "Colher pela manhã", description: "Os óleos essenciais estão mais concentrados antes das 10h.", icon: "🌅", critical: false },
          { id: "amount", label: "Não colher mais que 1/3", description: "Deixe pelo menos 2/3 da planta para ela se recuperar.", icon: "📏", critical: true },
        ],
        repot: [
          { id: "roots", label: "Verificar raízes", description: "Transplantar quando raízes saem pelos furos ou circulam o vaso.", icon: "🌱", critical: false },
          { id: "size", label: "Vaso 2-3cm maior", description: "Vaso muito grande retém umidade demais e pode apodrecer raízes.", icon: "🏺", critical: true },
        ],
      },
    },
    lastWatered: "2024-12-19", lastFertilized: "2024-12-14", nextWatering: "2024-12-21", nextFertilizing: "2024-12-28",
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
    origin: "África do Sul",
    companionPlants: ["Echeveria", "Aloe vera", "Sedum"],
    tags: ["fácil", "pouca água", "iniciante"],
    description: "Suculenta resistente que armazena água nas folhas. Ideal para iniciantes, precisa de pouca manutenção.",
    careInfo: {
      waterFrequency: "A cada 10-14 dias", waterAmount: "50-100ml", sunlight: "luz indireta", sunHoursPerDay: "3-4h",
      humidity: "baixa", temperature: "15-28°C", idealSeason: "Primavera", climate: "Árido e Semiárido",
      difficulty: "fácil", soilType: "Substrato para suculentas, muito drenante",
      fertilizerType: "Fertilizante para suculentas", fertilizerFrequency: "A cada 2 meses",
      pruningTips: "Remover folhas secas na base. Poda mínima necessária.",
      propagation: "Folhas ou estacas de caule",
      toxicity: { dogs: true, cats: true, birds: false, children: true, symptoms: "Vômito e diarreia leve se ingerida", severity: "levemente tóxica" },
      smartConditions: {
        soilMoisturePreference: "seco",
        wateringMethod: "fundo",
        wateringMethodTip: "Coloque o vaso em um prato com água por 15min e deixe absorver por baixo. Isso evita apodrecimento.",
        checkSoilBeforeWatering: true,
        soilCheckDepth: "3-4cm",
        drainageNeeded: true,
        mistingNeeded: false,
        sensitiveToOverwatering: true,
        sensitiveToUnderwatering: false,
        dormancyPeriod: "Inverno",
        dormancyWateringReduction: "Regar apenas 1x por mês. Solo deve ficar completamente seco entre regas.",
        leafWettingSensitive: true,
        bestTimeToWater: "Manhã (para evaporar excesso durante o dia)",
        rootType: "Raízes superficiais, armazena água nas folhas",
      },
      preChecks: {
        water: [
          { id: "soil-deep", label: "Solo completamente seco?", description: "Enfie o dedo 3-4cm no substrato. Deve estar TOTALMENTE seco. Se houver qualquer umidade, NÃO regue.", icon: "🏜️", critical: true },
          { id: "leaves", label: "Folhas enrugadas?", description: "Folhas levemente enrugadas ou moles = hora de regar. Folhas firmes = ainda não precisa.", icon: "🍃", critical: false },
          { id: "weight", label: "Peso do vaso", description: "Levante o vaso. Se estiver leve, a planta precisa de água. Se pesado, espere mais.", icon: "⚖️", critical: false },
        ],
        spray: [
          { id: "never", label: "⚠️ Não borrifar!", description: "Suculentas NÃO devem ser borrifadas. Água nas folhas causa apodrecimento.", icon: "🚫", critical: true },
        ],
        fertilize: [
          { id: "dilute", label: "Diluir pela metade", description: "Use metade da dosagem recomendada. Suculentas são sensíveis a excesso de nutrientes.", icon: "💧", critical: true },
          { id: "growth", label: "Apenas no crescimento", description: "Adubar somente na primavera/verão. Nunca no inverno (dormência).", icon: "🌱", critical: true },
        ],
        prune: [
          { id: "dry", label: "Apenas folhas secas", description: "Remova apenas folhas completamente secas e soltas. Não arranque folhas saudáveis.", icon: "🍂", critical: false },
        ],
        sun: [
          { id: "gradual", label: "Acostumar gradualmente", description: "Aumente exposição ao sol aos poucos. Mudança brusca causa queimaduras.", icon: "🌅", critical: true },
        ],
        harvest: [],
        repot: [
          { id: "dry-soil", label: "Solo seco para transplantar", description: "Transplante com solo seco. Espere 5-7 dias para regar após o transplante.", icon: "🏺", critical: true },
          { id: "roots", label: "Verificar raízes podres", description: "Ao remover do vaso, corte raízes escuras/moles com tesoura esterilizada.", icon: "🔍", critical: false },
        ],
      },
    },
    lastWatered: "2024-12-15", lastFertilized: "2024-12-01", nextWatering: "2024-12-25", nextFertilizing: "2025-01-01",
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
    origin: "Américas tropicais",
    companionPlants: ["Lírio da paz", "Antúrio", "Filodendro"],
    tags: ["moderada", "sombra", "umidade"],
    description: "Planta tropical que adora umidade alta. Perfeita para banheiros. Borrifar as folhas regularmente.",
    careInfo: {
      waterFrequency: "A cada 2-3 dias", waterAmount: "200-300ml", sunlight: "sombra", sunHoursPerDay: "1-2h indireta",
      humidity: "alta", temperature: "18-25°C", idealSeason: "O ano todo (tropical)", climate: "Tropical úmido",
      difficulty: "moderada", soilType: "Rico em húmus, mantém umidade",
      fertilizerType: "Adubo foliar líquido", fertilizerFrequency: "Quinzenal na primavera/verão",
      pruningTips: "Remover folhas amareladas e secas rente à base",
      propagation: "Divisão de touceira ou esporos",
      toxicity: { dogs: false, cats: false, birds: false, children: false, symptoms: "Nenhum", severity: "não tóxica" },
      smartConditions: {
        soilMoisturePreference: "úmido",
        wateringMethod: "topo",
        wateringMethodTip: "Regue uniformemente sobre o solo. Solo deve estar sempre úmido, NUNCA seco. Mas não encharcado.",
        checkSoilBeforeWatering: true,
        soilCheckDepth: "1cm",
        drainageNeeded: true,
        mistingNeeded: true,
        mistingFrequency: "Diariamente, especialmente em dias secos",
        sensitiveToOverwatering: false,
        sensitiveToUnderwatering: true,
        leafWettingSensitive: false,
        dormancyWateringReduction: "Sem dormência significativa, manter regas regulares",
        bestTimeToWater: "Manhã (umidade dura o dia todo)",
        rootType: "Raízes rizomatosas superficiais",
      },
      preChecks: {
        water: [
          { id: "surface", label: "Superfície do solo", description: "Toque a superfície do solo. Se o primeiro 1cm estiver secando, já é hora de regar. Não espere secar por completo!", icon: "👆", critical: true },
          { id: "humidity", label: "Umidade do ar", description: "Se o ar está seco (aquecedor/ar-cond.), aumente a frequência. Samambaias precisam de umidade alta.", icon: "💨", critical: false },
          { id: "color", label: "Cor das folhas", description: "Pontas marrons = falta de umidade. Folhas amarelas = excesso de água. Ajuste conforme.", icon: "🍃", critical: false },
        ],
        spray: [
          { id: "daily", label: "Borrifar é essencial!", description: "Samambaias ADORAM ser borrifadas. Use água filtrada em temp. ambiente. Ideal: 2-3x por dia em clima seco.", icon: "💦", critical: false },
          { id: "avoid-cold", label: "Água em temp. ambiente", description: "Nunca use água gelada. A samambaia é tropical e sofre com choque térmico.", icon: "🌡️", critical: true },
        ],
        fertilize: [
          { id: "foliar", label: "Aplicar via foliar", description: "Dilua o adubo na água de borrifação. Samambaias absorvem nutrientes pelas folhas.", icon: "🍃", critical: false },
          { id: "moist", label: "Solo úmido antes", description: "O solo deve estar úmido antes de aplicar qualquer fertilizante.", icon: "💧", critical: true },
        ],
        prune: [
          { id: "base", label: "Cortar rente à base", description: "Corte frondes secas/amarelas rente ao solo. Nunca corte pela metade.", icon: "✂️", critical: true },
        ],
        sun: [
          { id: "indirect", label: "Apenas luz indireta", description: "Sol direto queima as folhas rapidamente. Mantenha em local luminoso mas sem sol direto.", icon: "🌥️", critical: true },
        ],
        harvest: [],
        repot: [
          { id: "divide", label: "Dividir se grande demais", description: "Samambaias grandes podem ser divididas durante o transplante. Cada parte deve ter raízes.", icon: "🌱", critical: false },
        ],
      },
    },
    lastWatered: "2024-12-17", lastFertilized: "2024-12-10", nextWatering: "2024-12-20", nextFertilizing: "2024-12-24",
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
    origin: "Sudeste Asiático",
    companionPlants: ["Bromélia", "Samambaia", "Musgo"],
    tags: ["moderada", "luz indireta"],
    description: "Orquídea elegante que floresce por meses. Regar por imersão e evitar acúmulo de água nas folhas.",
    careInfo: {
      waterFrequency: "A cada 5-7 dias (imersão)", waterAmount: "Imersão por 15min", sunlight: "luz indireta", sunHoursPerDay: "4-6h indireta",
      humidity: "média", temperature: "18-28°C", idealSeason: "Floresce no inverno/primavera", climate: "Tropical",
      difficulty: "moderada", soilType: "Casca de pinus, musgo sphagnum",
      fertilizerType: "Adubo para orquídeas (NPK 20-20-20)", fertilizerFrequency: "Quinzenal durante crescimento",
      pruningTips: "Cortar haste floral seca acima do 3º nó. Nunca cortar raízes verdes.",
      propagation: "Keikis (brotos laterais) ou divisão",
      toxicity: { dogs: false, cats: false, birds: false, children: false, symptoms: "Nenhum", severity: "não tóxica" },
      smartConditions: {
        soilMoisturePreference: "levemente úmido",
        wateringMethod: "imersão",
        wateringMethodTip: "Mergulhe o vaso em água por 15min e depois deixe escorrer. NUNCA deixe água acumulada no prato.",
        checkSoilBeforeWatering: true,
        soilCheckDepth: "2cm no substrato (casca)",
        drainageNeeded: true,
        mistingNeeded: true,
        mistingFrequency: "Raízes aéreas: 2-3x por semana",
        sensitiveToOverwatering: true,
        sensitiveToUnderwatering: false,
        leafWettingSensitive: true,
        dormancyWateringReduction: "Reduzir regas no inverno. Espaçar para cada 10-14 dias.",
        bestTimeToWater: "Manhã (raízes secam durante o dia)",
        rootType: "Raízes aéreas epífitas (verdes = saudáveis, cinzas = secas)",
      },
      preChecks: {
        water: [
          { id: "roots", label: "Cor das raízes", description: "Raízes VERDES = ainda hidratadas, espere. Raízes CINZA/PRATEADAS = hora de regar por imersão.", icon: "🌿", critical: true },
          { id: "substrate", label: "Substrato leve?", description: "Levante o vaso. Se estiver leve, o substrato secou e precisa de imersão. Se pesado, espere.", icon: "⚖️", critical: false },
          { id: "no-crown", label: "Não molhar a coroa", description: "NUNCA acumule água entre as folhas centrais. Isso causa apodrecimento fatal.", icon: "⚠️", critical: true },
        ],
        spray: [
          { id: "aerial", label: "Apenas raízes aéreas", description: "Borrife somente as raízes aéreas expostas, não as folhas nem flores.", icon: "🌿", critical: true },
          { id: "morning", label: "Apenas de manhã", description: "Borrife de manhã para secar durante o dia. À noite favorece fungos.", icon: "🌅", critical: true },
        ],
        fertilize: [
          { id: "dilute", label: "Diluir bastante", description: "Use 1/4 da dosagem recomendada. Orquídeas são sensíveis a excesso.", icon: "💧", critical: true },
          { id: "no-bloom", label: "Não adubar em floração", description: "Durante a floração, reduza ou pare a adubação para prolongar as flores.", icon: "🌸", critical: false },
          { id: "wet-first", label: "Regar antes de adubar", description: "Raízes secas queimam com fertilizante. Molhe primeiro, depois aplique.", icon: "💧", critical: true },
        ],
        prune: [
          { id: "stem", label: "Haste floral seca?", description: "Corte a haste APENAS quando estiver totalmente seca e marrom. Hastes verdes podem reflorescer!", icon: "🌸", critical: true },
          { id: "green-roots", label: "Nunca cortar raízes verdes", description: "Raízes verdes são saudáveis mesmo se parecem feias. Corte apenas raízes secas ou podres.", icon: "🌿", critical: true },
        ],
        sun: [
          { id: "burn", label: "Sem sol direto", description: "Luz indireta forte é ideal. Sol direto queima folhas e flores.", icon: "🌥️", critical: true },
        ],
        harvest: [],
        repot: [
          { id: "after-bloom", label: "Após a floração", description: "Transplante após a floração, quando a planta está em descanso.", icon: "🌸", critical: true },
          { id: "bark", label: "Substrato novo", description: "Use casca de pinus nova. Substrato velho se decompõe e sufoca raízes.", icon: "🪵", critical: true },
        ],
      },
    },
    lastWatered: "2024-12-16", lastFertilized: "2024-12-01", nextWatering: "2024-12-22", nextFertilizing: "2024-12-20",
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
    origin: "Região Mediterrânea",
    companionPlants: ["Manjericão", "Lavanda", "Sálvia"],
    tags: ["fácil", "sol pleno", "aromática"],
    description: "Erva mediterrânea resistente que adora sol pleno. Excelente para culinária e tem aroma inconfundível.",
    careInfo: {
      waterFrequency: "A cada 3-5 dias", waterAmount: "100-150ml", sunlight: "sol pleno", sunHoursPerDay: "6-8h",
      humidity: "baixa", temperature: "15-35°C", idealSeason: "Primavera e Verão", climate: "Mediterrâneo e Temperado",
      difficulty: "fácil", soilType: "Arenoso, bem drenado, pH alcalino",
      fertilizerType: "Adubo orgânico ou NPK 4-14-8", fertilizerFrequency: "Mensal",
      pruningTips: "Podar após floração. Nunca cortar madeira velha sem folhas.",
      propagation: "Estacas semi-lenhosas na primavera",
      toxicity: { dogs: false, cats: false, birds: false, children: false, symptoms: "Nenhum", severity: "não tóxica" },
      smartConditions: {
        soilMoisturePreference: "seco",
        wateringMethod: "topo",
        wateringMethodTip: "Regue na base da planta. Alecrim prefere solo que seca entre regas — ele é do Mediterrâneo!",
        checkSoilBeforeWatering: true,
        soilCheckDepth: "3cm",
        drainageNeeded: true,
        mistingNeeded: false,
        sensitiveToOverwatering: true,
        sensitiveToUnderwatering: false,
        dormancyPeriod: "Inverno (crescimento reduzido)",
        dormancyWateringReduction: "Reduzir bastante. Solo deve secar completamente entre regas.",
        leafWettingSensitive: false,
        bestTimeToWater: "Manhã cedo",
        rootType: "Raízes lenhosas profundas, bem resistentes",
      },
      preChecks: {
        water: [
          { id: "dry-deep", label: "Solo seco a 3cm?", description: "Alecrim é mediterrâneo e DETESTA excesso de água. Solo deve estar bem seco antes de regar.", icon: "🏜️", critical: true },
          { id: "drainage", label: "Drenagem excelente", description: "O vaso DEVE drenar perfeitamente. Alecrim apodrece rapidamente com encharcamento.", icon: "🕳️", critical: true },
        ],
        spray: [
          { id: "avoid", label: "Não recomendado", description: "Alecrim não precisa de borrifação. Umidade nas folhas pode causar oídio (fungo branco).", icon: "🚫", critical: false },
        ],
        fertilize: [
          { id: "light", label: "Adubo leve", description: "Alecrim cresce melhor em solo pobre. Excesso de adubo reduz o aroma.", icon: "🌿", critical: false },
        ],
        prune: [
          { id: "no-old-wood", label: "Não cortar madeira velha", description: "Corte apenas partes verdes. Madeira velha sem folhas NÃO brota novamente.", icon: "🪵", critical: true },
          { id: "after-bloom", label: "Podar após floração", description: "O melhor momento é após as flores caírem. Estimula novo crescimento.", icon: "🌸", critical: false },
        ],
        sun: [
          { id: "full-sun", label: "Quanto mais sol, melhor", description: "Alecrim precisa de 6-8h de sol direto. Sem sol suficiente, fica fraco e perde aroma.", icon: "☀️", critical: false },
        ],
        harvest: [
          { id: "morning", label: "Colher pela manhã", description: "Óleos essenciais concentrados antes das 10h. Melhor sabor e aroma.", icon: "🌅", critical: false },
          { id: "stem", label: "Cortar ramos, não arrancar", description: "Use tesoura para cortar ramos de 10cm. Nunca arranque com as mãos.", icon: "✂️", critical: false },
        ],
        repot: [
          { id: "rarely", label: "Transplante raro", description: "Alecrim não gosta de ser transplantado. Faça apenas se realmente necessário.", icon: "⚠️", critical: false },
        ],
      },
    },
    lastWatered: "2024-12-18", lastFertilized: "2024-12-10", nextWatering: "2024-12-22", nextFertilizing: "2024-12-25",
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
    origin: "Ilhas Salomão (Oceania)",
    companionPlants: ["Filodendro", "Costela-de-adão", "Singônio"],
    tags: ["fácil", "pouca luz", "iniciante"],
    description: "Trepadeira versátil que purifica o ar. Cresce em quase qualquer condição de luz, perfeita para interiores.",
    careInfo: {
      waterFrequency: "A cada 5-7 dias", waterAmount: "150-200ml", sunlight: "luz indireta", sunHoursPerDay: "2-4h indireta",
      humidity: "média", temperature: "18-30°C", idealSeason: "Primavera e Verão", climate: "Tropical",
      difficulty: "fácil", soilType: "Universal, bem drenado",
      fertilizerType: "NPK 10-10-10 líquido", fertilizerFrequency: "Mensal na primavera/verão",
      pruningTips: "Cortar ramos longos para controlar tamanho. Propagar as estacas!",
      propagation: "Estacas em água (fácil e rápido)",
      toxicity: { dogs: true, cats: true, birds: true, children: true, symptoms: "Irritação oral, salivação excessiva, vômito. Cristais de oxalato de cálcio.", severity: "moderadamente tóxica" },
      smartConditions: {
        soilMoisturePreference: "levemente úmido",
        wateringMethod: "topo",
        wateringMethodTip: "Regue quando os primeiros 2-3cm do solo estiverem secos. Jibóia tolera seca ocasional.",
        checkSoilBeforeWatering: true,
        soilCheckDepth: "2-3cm",
        drainageNeeded: true,
        mistingNeeded: false,
        sensitiveToOverwatering: true,
        sensitiveToUnderwatering: false,
        leafWettingSensitive: false,
        dormancyWateringReduction: "Reduzir no inverno. Espaçar para cada 10-14 dias.",
        bestTimeToWater: "Manhã ou final da tarde",
        rootType: "Raízes aéreas trepadeiras, absorvem umidade do ar",
      },
      preChecks: {
        water: [
          { id: "soil-check", label: "Solo seco a 2-3cm?", description: "Enfie o dedo 2-3cm no solo. Se ainda úmido, espere mais 1-2 dias.", icon: "👆", critical: true },
          { id: "yellow", label: "Folhas amarelando?", description: "Folhas amarelas na base = excesso de água. Folhas murchas = falta de água.", icon: "🍃", critical: false },
        ],
        spray: [
          { id: "optional", label: "Opcional mas benéfico", description: "Jibóia aceita borrifação ocasional. Útil em dias muito secos.", icon: "💦", critical: false },
        ],
        fertilize: [
          { id: "season", label: "Apenas no crescimento", description: "Adubar na primavera/verão. No inverno a planta descansa.", icon: "🌱", critical: false },
          { id: "moist", label: "Solo úmido antes", description: "Regue antes de adubar para proteger as raízes.", icon: "💧", critical: true },
        ],
        prune: [
          { id: "propagate", label: "Propague as estacas!", description: "Cada pedaço cortado com um nó pode virar uma nova planta em água. Não jogue fora!", icon: "🌿", critical: false },
          { id: "gloves", label: "Usar luvas", description: "A seiva pode irritar a pele. Use luvas ao podar.", icon: "🧤", critical: true },
        ],
        sun: [
          { id: "no-direct", label: "Sem sol direto forte", description: "Tolera pouca luz mas cresce melhor em luz indireta brilhante. Sol direto queima.", icon: "🌥️", critical: false },
        ],
        harvest: [],
        repot: [
          { id: "spring", label: "Transplantar na primavera", description: "Primavera é o melhor momento. A planta se recupera mais rápido.", icon: "🌸", critical: false },
          { id: "drainage", label: "Solo bem drenante", description: "Adicione perlita ao substrato universal para melhorar a drenagem.", icon: "🪨", critical: false },
        ],
      },
    },
    lastWatered: "2024-12-18", lastFertilized: "2024-12-05", nextWatering: "2024-12-23", nextFertilizing: "2024-12-19",
  },
];

export const MOCK_TASKS: Task[] = [
  {
    id: "t1",
    plantId: "1",
    plantName: "Manjericão",
    type: "water",
    title: "Regar Manjericão",
    description: "Solo seco a 2cm de profundidade",
    smartReason: "O solo do manjericão seca rápido na varanda. Ele precisa de solo levemente úmido, não encharcado.",
    condition: "👆 Antes de regar: enfie o dedo 2cm no solo. Se seco ao toque, regue 150-200ml pelo topo, evitando as folhas.",
    priority: "high",
    completed: false,
    dueDate: "2024-12-20",
    overdue: false,
    trigger: "condition",
  },
  {
    id: "t2",
    plantId: "3",
    plantName: "Samambaia",
    type: "spray",
    title: "Borrifar Samambaia",
    description: "Ar seco detectado — umidade abaixo do ideal",
    smartReason: "Samambaias precisam de umidade alta constantemente. Em ambiente com ar-condicionado ou aquecedor, borrifar é essencial.",
    condition: "💦 Use água filtrada em temperatura ambiente. Borrife folhas e substrato. Nunca use água gelada (choque térmico).",
    priority: "medium",
    completed: false,
    dueDate: "2024-12-20",
    overdue: false,
    trigger: "environment",
  },
  {
    id: "t3",
    plantId: "4",
    plantName: "Orquídea",
    type: "fertilize",
    title: "Adubar Orquídea",
    description: "Período de crescimento ativo — nutrientes necessários",
    smartReason: "A orquídea está em fase de crescimento e precisa de nutrientes. Use 1/4 da dosagem normal — orquídeas são sensíveis.",
    condition: "⚠️ ANTES: regue por imersão 1h antes de adubar. Raízes secas queimam com fertilizante. Não adubar durante floração.",
    priority: "low",
    completed: false,
    dueDate: "2024-12-20",
    overdue: false,
    trigger: "growth",
  },
  {
    id: "t4",
    plantId: "5",
    plantName: "Alecrim",
    type: "prune",
    title: "Podar Alecrim",
    description: "Galhos secos após floração — hora de podar",
    smartReason: "Após a floração é o momento ideal para poda. Estimula novo crescimento e mantém formato compacto.",
    condition: "✂️ IMPORTANTE: corte apenas partes verdes. Madeira velha sem folhas NÃO brota. Use tesoura esterilizada com álcool 70%.",
    priority: "medium",
    completed: true,
    dueDate: "2024-12-19",
    overdue: false,
    trigger: "growth",
  },
  {
    id: "t5",
    plantId: "2",
    plantName: "Suculenta Jade",
    type: "water",
    title: "Regar Suculenta",
    description: "Solo completamente seco + folhas levemente enrugadas",
    smartReason: "A suculenta armazena água nas folhas. Só regar quando o substrato estiver TOTALMENTE seco a 3-4cm. Folhas enrugadas confirmam necessidade.",
    condition: "🏜️ Verifique: solo seco a 3-4cm? Vaso leve? Folhas enrugadas? Se sim, regue por BAIXO (vaso em prato com água por 15min).",
    priority: "critical",
    completed: false,
    dueDate: "2024-12-18",
    overdue: true,
    trigger: "condition",
  },
  {
    id: "t6",
    plantId: "1",
    plantName: "Manjericão",
    type: "harvest",
    title: "Colher Manjericão",
    description: "Folhas maduras — colher pela manhã para melhor aroma",
    smartReason: "Os óleos essenciais do manjericão estão mais concentrados de manhã, antes das 10h. Não colha mais de 1/3 da planta.",
    condition: "🌅 Colha pela manhã cedo. Corte acima de um par de folhas para a planta ramificar. Máximo 1/3 da planta por vez.",
    priority: "low",
    completed: false,
    dueDate: "2024-12-21",
    overdue: false,
    trigger: "growth",
  },
  {
    id: "t7",
    plantId: "6",
    plantName: "Jibóia",
    type: "repot",
    title: "Transplantar Jibóia",
    description: "Raízes saindo pelos furos — planta precisa de espaço",
    smartReason: "Raízes circulando o vaso e saindo pelos furos indicam que a planta precisa de um vaso maior. Ideal: transplantar na primavera.",
    condition: "🏺 Use vaso 2-3cm maior com boa drenagem. Adicione perlita ao substrato. Use luvas — a seiva pode irritar a pele.",
    priority: "high",
    completed: false,
    dueDate: "2024-12-20",
    overdue: false,
    trigger: "condition",
  },
  {
    id: "t8",
    plantId: "5",
    plantName: "Alecrim",
    type: "sun",
    title: "Mover Alecrim ao sol",
    description: "Recebeu menos de 6h de sol — crescimento pode ser afetado",
    smartReason: "Alecrim é mediterrâneo e precisa de 6-8h de sol direto. Sem sol suficiente, fica fraco, perde aroma e fica suscetível a doenças.",
    condition: "☀️ Coloque em local com sol direto por pelo menos 6h. Sol da manhã é ideal. Quanto mais sol, melhor o aroma!",
    priority: "medium",
    completed: false,
    dueDate: "2024-12-20",
    overdue: false,
    trigger: "environment",
  },
  {
    id: "t9",
    plantId: "3",
    plantName: "Samambaia",
    type: "fertilize",
    title: "Adubar Samambaia",
    description: "Adubação foliar quinzenal — fase de crescimento",
    smartReason: "Samambaias absorvem nutrientes pelas folhas. Dilua adubo foliar na água de borrifação para absorção mais eficiente.",
    condition: "💧 Solo deve estar ÚMIDO antes de adubar. Aplique via borrifação diluída. Apenas na primavera/verão.",
    priority: "low",
    completed: false,
    dueDate: "2024-12-22",
    overdue: false,
    trigger: "schedule",
  },
  {
    id: "t10",
    plantId: "4",
    plantName: "Orquídea",
    type: "spray",
    title: "Borrifar raízes da Orquídea",
    description: "Raízes aéreas cinza/prateadas — precisam de hidratação",
    smartReason: "Raízes aéreas cinza indicam desidratação. Borrife apenas as raízes (não as folhas/flores), somente de manhã para evitar fungos.",
    condition: "🌿 Verifique: raízes cinza? Se sim, borrife com água filtrada em temp. ambiente. Apenas raízes aéreas, não o centro da planta!",
    priority: "medium",
    completed: false,
    dueDate: "2024-12-20",
    overdue: false,
    trigger: "condition",
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

export { MOCK_USERS } from "./users";

export const MOCK_FEED_POSTS: FeedPost[] = [
  {
    id: "f1",
    userId: "u1",
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
    userId: "u2",
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
    userId: "u3",
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
    userId: "u4",
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
    userId: "u5",
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
