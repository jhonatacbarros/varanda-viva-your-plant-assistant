export interface AIDiagnosisResult {
  overallHealth: number;
  issues: { name: string; severity: "leve" | "moderado" | "grave"; description: string; solution: string }[];
  positives: string[];
  recommendation: string;
}

export const MOCK_DIAGNOSIS: Record<string, AIDiagnosisResult> = {
  "1": {
    overallHealth: 82,
    issues: [
      { name: "Folhas amareladas", severity: "leve", description: "Algumas folhas inferiores apresentam amarelamento", solution: "Reduza a rega levemente e remova folhas afetadas" },
    ],
    positives: ["Caule firme e saudável", "Boa ramificação", "Aroma forte e presente"],
    recommendation: "Sua planta está saudável! Apenas ajuste a rega para evitar excesso de umidade na base.",
  },
  "2": {
    overallHealth: 95,
    issues: [],
    positives: ["Folhas grossas e firmes", "Coloração verde intensa", "Sem sinais de pragas", "Raízes saudáveis"],
    recommendation: "Planta em excelente estado! Continue com os cuidados atuais.",
  },
  "3": {
    overallHealth: 65,
    issues: [
      { name: "Pontas secas", severity: "moderado", description: "As pontas das folhas estão ressecadas e marrons", solution: "Aumente a umidade com borrifação diária e afaste de correntes de ar" },
      { name: "Folhas pálidas", severity: "leve", description: "Algumas folhas perderam a intensidade do verde", solution: "Aplique adubo foliar líquido quinzenalmente" },
    ],
    positives: ["Estrutura geral boa", "Novos brotos surgindo"],
    recommendation: "A samambaia precisa de mais umidade. Considere colocá-la no banheiro ou usar um umidificador.",
  },
  "4": {
    overallHealth: 58,
    issues: [
      { name: "Raízes aéreas secas", severity: "moderado", description: "Raízes expostas estão desidratadas e acinzentadas", solution: "Borrife as raízes aéreas diariamente e considere imersão semanal" },
      { name: "Sem floração", severity: "leve", description: "A planta não apresenta hastes florais há meses", solution: "Garanta diferença de temperatura entre dia e noite (5-10°C) para estimular floração" },
    ],
    positives: ["Folhas verdes e firmes", "Sem pragas visíveis"],
    recommendation: "Foque na hidratação das raízes e na variação de temperatura para estimular nova floração.",
  },
  "5": {
    overallHealth: 92,
    issues: [
      { name: "Galhos lenhosos na base", severity: "leve", description: "Base ficando muito lenhosa, pouca folhagem", solution: "Faça podas regulares acima dos nós para estimular brotação lateral" },
    ],
    positives: ["Aroma intenso", "Coloração excelente", "Crescimento vigoroso", "Sem pragas"],
    recommendation: "Alecrim muito saudável! A poda regular vai manter a planta produtiva e bonita.",
  },
  "6": {
    overallHealth: 88,
    issues: [
      { name: "Folha com mancha", severity: "leve", description: "Uma folha apresenta mancha marrom isolada", solution: "Remova a folha afetada. Se outras manchas aparecerem, reduza a rega." },
    ],
    positives: ["Crescimento ativo", "Folhas variegadas bonitas", "Caule forte"],
    recommendation: "Planta saudável com apenas um ponto de atenção. Monitore se a mancha se espalha.",
  },
};

export interface PotRecommendation {
  type: string;
  material: string;
  size: string;
  drainage: string;
  substrate: string;
  emoji: string;
  tip: string;
  price: string;
}

export const MOCK_POT_RECOMMENDATIONS: Record<string, PotRecommendation[]> = {
  "1": [
    { type: "Vaso de barro", material: "Cerâmica natural", size: "15-20cm diâmetro", drainage: "Com furo de drenagem", substrate: "Substrato orgânico + perlita", emoji: "🏺", tip: "O barro permite a raiz respirar, ideal para ervas", price: "R$ 15-30" },
    { type: "Jardineira retangular", material: "Plástico ou fibra", size: "40x15cm", drainage: "Múltiplos furos", substrate: "Substrato vegetal + vermiculita", emoji: "📦", tip: "Perfeito para cultivar várias ervas juntas na varanda", price: "R$ 25-50" },
  ],
  "2": [
    { type: "Vaso de concreto", material: "Cimento", size: "10-12cm diâmetro", drainage: "Furo grande", substrate: "Substrato para suculentas (arenoso)", emoji: "🪨", tip: "Concreto absorve umidade extra, perfeito para suculentas", price: "R$ 20-40" },
    { type: "Vaso de barro baixo", material: "Cerâmica", size: "12-15cm", drainage: "Com furo + camada de argila expandida", substrate: "Areia grossa + substrato drenante", emoji: "🏺", tip: "Vasos rasos evitam acúmulo de água nas raízes", price: "R$ 18-35" },
  ],
  "3": [
    { type: "Vaso suspenso", material: "Macramê + plástico", size: "20-25cm diâmetro", drainage: "Moderada", substrate: "Substrato rico em húmus + fibra de coco", emoji: "🧶", tip: "Suspenso permite as folhas caírem lindamente", price: "R$ 30-60" },
    { type: "Cachepô de fibra natural", material: "Fibra de coco ou sisal", size: "22-28cm", drainage: "Prato embutido", substrate: "Terra vegetal + húmus de minhoca", emoji: "🪺", tip: "Fibra natural mantém a umidade que a samambaia adora", price: "R$ 35-70" },
  ],
  "4": [
    { type: "Vaso transparente", material: "Vidro ou plástico cristal", size: "12-15cm", drainage: "Sem furo (controle visual)", substrate: "Casca de pinus + musgo sphagnum", emoji: "🫙", tip: "Transparente permite monitorar as raízes e umidade", price: "R$ 25-50" },
    { type: "Cachepô cerâmico", material: "Cerâmica esmaltada", size: "14-18cm", drainage: "Vaso plástico interno", substrate: "Casca de pinus grossa + carvão", emoji: "🏺", tip: "Elegante e funcional com vaso interno removível", price: "R$ 40-80" },
  ],
  "5": [
    { type: "Vaso de barro mediterrâneo", material: "Terracota", size: "18-22cm", drainage: "Excelente drenagem", substrate: "Terra + areia grossa + perlita", emoji: "🏺", tip: "Terracota simula o habitat natural do alecrim", price: "R$ 20-45" },
    { type: "Floreira de madeira", material: "Madeira tratada", size: "30x20cm", drainage: "Múltiplos furos + manta", substrate: "Terra + areia + calcário", emoji: "🪵", tip: "Ótima para varanda, combina com o estilo rústico", price: "R$ 40-80" },
  ],
  "6": [
    { type: "Cachepô alto", material: "Fibrocimento", size: "15-20cm diâmetro", drainage: "Bom", substrate: "Substrato universal + perlita", emoji: "🪴", tip: "Vasos altos dão suporte para os ramos longos", price: "R$ 30-60" },
    { type: "Suporte com tutor de musgo", material: "Plástico + tutor coco", size: "18cm + tutor 60cm", drainage: "Com furo", substrate: "Substrato leve + fibra de coco", emoji: "🌿", tip: "O tutor de musgo permite a jibóia escalar naturalmente", price: "R$ 45-90" },
  ],
};

export interface AdvancedCareStrategy {
  title: string;
  description: string;
  steps: string[];
  difficulty: "básico" | "intermediário" | "avançado";
  timeframe: string;
  emoji: string;
}

export const MOCK_AI_CARE_STRATEGIES: Record<string, AdvancedCareStrategy[]> = {
  "1": [
    { title: "Poda apical para arbustificação", description: "Técnica para criar um manjericão mais cheio e produtivo", steps: ["Identifique o ponto de crescimento apical (ponta)", "Corte com tesoura limpa acima do 2º par de folhas", "Aplique canela em pó no corte para prevenir fungos", "Em 7-10 dias surgirão dois novos ramos"], difficulty: "básico", timeframe: "2-3 semanas para resultado", emoji: "✂️" },
    { title: "Cultivo hidropônico simples", description: "Cultive manjericão sem solo, direto na água", steps: ["Corte uma estaca de 10cm com folhas", "Remova folhas inferiores (deixe 2-3 pares)", "Coloque em frasco com água filtrada", "Troque a água a cada 3 dias", "Adicione 2 gotas de adubo líquido por semana"], difficulty: "intermediário", timeframe: "Raízes em 7-14 dias", emoji: "💧" },
  ],
  "2": [
    { title: "Propagação por folha", description: "Multiplique sua suculenta a partir de uma única folha", steps: ["Escolha folha saudável e gire suavemente para remover", "Deixe cicatrizar por 3-5 dias em local seco", "Coloque sobre substrato levemente úmido", "Borrife água 1x por semana", "Mudinha aparece em 3-6 semanas"], difficulty: "básico", timeframe: "4-8 semanas", emoji: "🌱" },
    { title: "Arranjo de suculentas em terrário", description: "Crie uma composição decorativa com várias espécies", steps: ["Escolha recipiente de vidro baixo", "Camada 1: pedriscos para drenagem (2cm)", "Camada 2: carvão ativado (fina)", "Camada 3: substrato para suculentas (5cm)", "Plante espécies de tamanhos variados", "Decore com pedras decorativas"], difficulty: "intermediário", timeframe: "1-2 horas", emoji: "🎨" },
  ],
  "3": [
    { title: "Banho de imersão mensal", description: "Técnica de hidratação profunda para samambaias", steps: ["Submerja o vaso em balde com água morna (não quente)", "Deixe por 15-20 minutos", "Adicione 1ml de adubo foliar na água", "Escorra bem antes de recolocar no local", "Repita mensalmente no verão"], difficulty: "básico", timeframe: "20 minutos mensais", emoji: "🛁" },
    { title: "Divisão de touceira para multiplicação", description: "Divida uma samambaia grande em várias menores", steps: ["Retire a planta do vaso com cuidado", "Identifique as divisões naturais do rizoma", "Separe com as mãos ou faca limpa", "Cada divisão deve ter raízes e frondes", "Plante em vasos individuais", "Mantenha na sombra e bem úmido por 2 semanas"], difficulty: "avançado", timeframe: "Recuperação em 2-4 semanas", emoji: "🔪" },
  ],
  "4": [
    { title: "Indução de reflorescimento", description: "Técnica para estimular nova floração", steps: ["Reduza a rega para 1x a cada 10 dias", "Exponha a diferença de temperatura dia/noite (5-8°C)", "Aplique adubo rico em fósforo (NPK 10-30-20)", "Garanta 12-14h de luz indireta diária", "A haste floral surge em 6-12 semanas"], difficulty: "avançado", timeframe: "2-3 meses", emoji: "🌸" },
    { title: "Rega por imersão perfeita", description: "Método correto de regar orquídeas sem apodrecer raízes", steps: ["Use água em temperatura ambiente", "Submerja apenas o vaso (não a coroa/folhas)", "Deixe por 15 minutos", "Escorra completamente por 5 minutos", "Nunca deixe água parada no pratinho", "Regue novamente quando raízes ficarem prateadas"], difficulty: "básico", timeframe: "Semanal", emoji: "💧" },
  ],
  "5": [
    { title: "Secagem de ramos para uso culinário", description: "Seque alecrim perfeitamente para uso prolongado", steps: ["Corte ramos de 15-20cm pela manhã", "Amarre em pequenos feixes com barbante", "Pendure de cabeça para baixo em local seco e ventilado", "Evite luz solar direta", "Em 7-14 dias estarão prontos", "Armazene em pote de vidro hermético"], difficulty: "básico", timeframe: "1-2 semanas", emoji: "🌿" },
    { title: "Óleo essencial caseiro", description: "Extraia óleo aromático do seu alecrim", steps: ["Colha 200g de ramos frescos", "Amasse levemente para liberar óleos", "Coloque em frasco com 500ml de óleo de oliva", "Deixe macerar por 2-3 semanas em local escuro", "Agite diariamente", "Coe e armazene em frasco escuro"], difficulty: "intermediário", timeframe: "2-3 semanas", emoji: "🧴" },
  ],
  "6": [
    { title: "Criar tutor de musgo caseiro", description: "Monte um suporte para a jibóia escalar", steps: ["Use tubo PVC de 3cm de diâmetro (60cm)", "Envolva com musgo sphagnum úmido", "Amarre com fio de nylon ou barbante", "Fixe no vaso e direcione os ramos", "Borrife o musgo 2x por semana", "A planta se fixará naturalmente em 2-4 semanas"], difficulty: "intermediário", timeframe: "Montagem: 30min", emoji: "🪵" },
    { title: "Propagação em água com raízes visíveis", description: "Decore sua casa com estacas enraizando em vasos de vidro", steps: ["Corte estaca de 15cm abaixo de um nó", "Remova a folha do nó inferior", "Coloque em vaso de vidro com água filtrada", "Posicione em local com luz indireta", "Troque a água semanalmente", "Raízes surgem em 7-14 dias"], difficulty: "básico", timeframe: "1-2 semanas", emoji: "🫙" },
  ],
};

export interface PestInfo {
  name: string;
  emoji: string;
  symptoms: string[];
  treatment: string;
  prevention: string;
}

export const MOCK_PEST_DATABASE: PestInfo[] = [
  { name: "Pulgão", emoji: "🐛", symptoms: ["Folhas enroladas", "Secreção pegajosa", "Pontos verdes/pretos nas folhas"], treatment: "Pulverize com água + detergente neutro (5 gotas/litro). Repita a cada 3 dias.", prevention: "Plante lavanda ou alecrim próximo como repelente natural." },
  { name: "Cochonilha", emoji: "🪳", symptoms: ["Carocinhos brancos ou marrons", "Folhas pegajosas", "Fungo preto (fumagina)"], treatment: "Remova manualmente com algodão + álcool 70%. Aplique óleo de neem.", prevention: "Boa ventilação e evitar excesso de nitrogênio no adubo." },
  { name: "Ácaro rajado", emoji: "🕷️", symptoms: ["Pontos amarelos nas folhas", "Teias finas na parte inferior", "Folhas secando"], treatment: "Lave as folhas com jato de água. Aplique acaricida biológico.", prevention: "Manter umidade alta ao redor da planta." },
  { name: "Fungo (oídio)", emoji: "🍄", symptoms: ["Pó branco nas folhas", "Folhas deformadas", "Crescimento lento"], treatment: "Remova folhas afetadas. Pulverize leite diluído (1:9 em água).", prevention: "Boa circulação de ar e evitar molhar as folhas à noite." },
  { name: "Mosca branca", emoji: "🦟", symptoms: ["Nuvem de insetos ao tocar a planta", "Folhas amarelando", "Fumagina"], treatment: "Armadilha adesiva amarela + pulverização de óleo de neem.", prevention: "Inspeção regular e quarentena de plantas novas." },
];

export interface WeatherCareAdjustment {
  condition: string;
  emoji: string;
  adjustments: string[];
  alert: string;
}

export const MOCK_WEATHER_ADJUSTMENTS: WeatherCareAdjustment[] = [
  { condition: "Onda de calor (>35°C)", emoji: "🔥", adjustments: ["Aumente a rega em 50%", "Mova plantas sensíveis para sombra", "Borrife folhas no início da manhã", "Evite adubar durante calor extremo"], alert: "⚠️ Proteja suculentas e samambaias do sol direto" },
  { condition: "Chuvas intensas", emoji: "🌧️", adjustments: ["Reduza ou suspenda a rega", "Verifique drenagem dos vasos", "Proteja plantas de encharcamento", "Após a chuva, verifique pragas"], alert: "💡 Aproveite para coletar água da chuva para rega" },
  { condition: "Tempo seco (umidade <30%)", emoji: "🏜️", adjustments: ["Borrife todas as plantas diariamente", "Use pratos com pedriscos e água", "Agrupe plantas para criar microclima", "Samambaias precisam de atenção extra"], alert: "⚠️ Samambaias e orquídeas sofrem muito com ar seco" },
  { condition: "Frio intenso (<10°C)", emoji: "❄️", adjustments: ["Traga plantas tropicais para dentro", "Reduza a rega drasticamente", "Não adube no inverno", "Proteja raízes com mulch"], alert: "⚠️ Manjericão e jibóia não toleram geadas" },
];

export interface GardenShareUser {
  id: string;
  name: string;
  avatar: string;
  sharedSince: string;
  plantsCount: number;
  status: "ativo" | "pendente";
}

export const MOCK_SHARED_USERS: GardenShareUser[] = [
  { id: "su1", name: "Maria Silva", avatar: "👩", sharedSince: "2024-12-01", plantsCount: 6, status: "ativo" },
  { id: "su2", name: "João Costa", avatar: "👨", sharedSince: "2024-12-15", plantsCount: 3, status: "pendente" },
];
