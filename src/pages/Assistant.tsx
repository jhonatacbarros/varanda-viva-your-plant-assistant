import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Leaf, Droplets, Sun, Bug, Scissors } from "lucide-react";
import AssistantAvatar from "@/components/AssistantAvatar";
import { MOCK_PLANTS, MOCK_TASKS } from "@/data/plants";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const QUICK_ACTIONS = [
  { label: "Tarefas de hoje", icon: "📋", prompt: "Quais são as tarefas de hoje?" },
  { label: "Como regar?", icon: "💧", prompt: "Como devo regar minhas plantas?" },
  { label: "Planta doente", icon: "🩺", prompt: "Minha planta está com folhas amarelas, o que fazer?" },
  { label: "Dica do dia", icon: "💡", prompt: "Me dê uma dica de jardinagem" },
];

function getSmartResponse(input: string): string {
  const lower = input.toLowerCase();

  // Match specific plant
  for (const plant of MOCK_PLANTS) {
    if (lower.includes(plant.name.toLowerCase()) || lower.includes(plant.species.toLowerCase())) {
      if (lower.includes("regar") || lower.includes("água") || lower.includes("rega")) {
        return `**${plant.name} (${plant.species})** 💧\n\n${plant.careInfo.smartConditions.wateringMethodTip}\n\n- **Frequência:** ${plant.careInfo.waterFrequency}\n- **Quantidade:** ${plant.careInfo.waterAmount}\n- **Melhor horário:** ${plant.careInfo.smartConditions.bestTimeToWater}\n- **Verificar solo:** ${plant.careInfo.smartConditions.soilCheckDepth} de profundidade\n\n⚠️ ${plant.careInfo.smartConditions.sensitiveToOverwatering ? "Sensível a excesso de água!" : "Tolera bem a umidade."}`;
      }
      if (lower.includes("sol") || lower.includes("luz")) {
        return `**${plant.name} — Iluminação** ☀️\n\n- **Tipo:** ${plant.careInfo.sunlight}\n- **Horas por dia:** ${plant.careInfo.sunHoursPerDay}\n- **Temperatura ideal:** ${plant.careInfo.temperature}\n\n💡 Dica: ${plant.careInfo.smartConditions.leafWettingSensitive ? "Evite molhar as folhas sob luz solar direta." : "Pode borrifar as folhas normalmente."}`;
      }
      if (lower.includes("adubar") || lower.includes("fertiliz") || lower.includes("nutrient")) {
        return `**${plant.name} — Adubação** 🧪\n\n- **Tipo:** ${plant.careInfo.fertilizerType}\n- **Frequência:** ${plant.careInfo.fertilizerFrequency}\n- **Solo ideal:** ${plant.careInfo.soilType}\n\n📌 ${plant.careInfo.preChecks.fertilize.map(c => c.description).join("\n📌 ")}`;
      }
      if (lower.includes("poda") || lower.includes("podar") || lower.includes("cortar")) {
        return `**${plant.name} — Poda** ✂️\n\n${plant.careInfo.pruningTips}\n\n${plant.careInfo.preChecks.prune.map(c => `${c.icon} **${c.label}:** ${c.description}`).join("\n")}`;
      }
      if (lower.includes("tóxic") || lower.includes("pet") || lower.includes("animal") || lower.includes("cachorro") || lower.includes("gato")) {
        const tox = plant.careInfo.toxicity;
        return `**${plant.name} — Toxicidade** ⚕️\n\n- Severidade: **${tox.severity}**\n- 🐕 Cães: ${tox.dogs ? "⚠️ Tóxica" : "✅ Segura"}\n- 🐈 Gatos: ${tox.cats ? "⚠️ Tóxica" : "✅ Segura"}\n- 🐦 Aves: ${tox.birds ? "⚠️ Tóxica" : "✅ Segura"}\n- 👶 Crianças: ${tox.children ? "⚠️ Cuidado" : "✅ Segura"}\n\n${tox.symptoms !== "Nenhum" ? `Sintomas: ${tox.symptoms}` : "Nenhum sintoma conhecido."}`;
      }
      // Generic plant info
      return `**${plant.name}** ${plant.image}\n*${plant.species}*\n\n${plant.description}\n\n- 💧 Rega: ${plant.careInfo.waterFrequency}\n- ☀️ Luz: ${plant.careInfo.sunlight} (${plant.careInfo.sunHoursPerDay})\n- 🌡️ Temperatura: ${plant.careInfo.temperature}\n- 📍 Localização: ${plant.location}\n- 🌍 Origem: ${plant.origin}\n- 🏷️ Dificuldade: ${plant.careInfo.difficulty}\n\nPergunta algo mais específico! Posso ajudar com rega, luz, adubação, poda ou toxicidade.`;
    }
  }

  // Tasks
  if (lower.includes("tarefa") || lower.includes("hoje") || lower.includes("pendente") || lower.includes("fazer")) {
    const pending = MOCK_TASKS.filter(t => !t.completed);
    const overdue = pending.filter(t => t.overdue);
    if (pending.length === 0) {
      return "🎉 **Parabéns!** Nenhuma tarefa pendente por hoje. Suas plantas estão bem cuidadas!";
    }
    let msg = `📋 **Tarefas de hoje** (${pending.length} pendente${pending.length > 1 ? "s" : ""})\n\n`;
    if (overdue.length > 0) {
      msg += `⚠️ **${overdue.length} atrasada${overdue.length > 1 ? "s" : ""}:**\n`;
      overdue.forEach(t => { msg += `- 🔴 ${t.title} — *${t.plantName}*\n  └ ${t.smartReason}\n`; });
      msg += "\n";
    }
    const normal = pending.filter(t => !t.overdue);
    if (normal.length > 0) {
      msg += `✅ **Para hoje:**\n`;
      normal.forEach(t => { msg += `- ${t.title} — *${t.plantName}*\n  └ ${t.smartReason}\n`; });
    }
    return msg;
  }

  // Watering general
  if (lower.includes("regar") || lower.includes("água") || lower.includes("rega")) {
    return `💧 **Dicas gerais de rega:**\n\n1. **Sempre verifique o solo** antes de regar — enfie o dedo 2-3cm\n2. **Regue pela manhã** para evitar fungos\n3. **Água em temperatura ambiente** — nunca gelada\n4. **Drenagem é essencial** — verifique os furos do vaso\n\nSuas plantas:\n${MOCK_PLANTS.map(p => `- **${p.name}:** ${p.careInfo.waterFrequency} (${p.careInfo.smartConditions.wateringMethod})`).join("\n")}\n\nPergunta sobre uma planta específica para dicas detalhadas!`;
  }

  // Yellow leaves / disease
  if (lower.includes("amarel") || lower.includes("doente") || lower.includes("doença") || lower.includes("morrendo") || lower.includes("murcha")) {
    return `🩺 **Diagnóstico — Folhas amarelas / murcha**\n\nCausas mais comuns:\n\n1. **Excesso de água** (mais comum!) — Verifique se o solo está encharcado\n2. **Falta de luz** — Mude para local mais iluminado\n3. **Deficiência nutricional** — Quando foi a última adubação?\n4. **Pragas** — Verifique debaixo das folhas\n5. **Estresse térmico** — Temperaturas muito altas ou baixas\n\n💡 **O que fazer agora:**\n- Pare de regar até o solo secar\n- Mova para luz indireta brilhante\n- Remova folhas completamente amarelas\n- Observe por 5-7 dias\n\nMe diga qual planta está com problema para um diagnóstico mais preciso!`;
  }

  // Tips
  if (lower.includes("dica") || lower.includes("conselho") || lower.includes("sugestão")) {
    const tips = [
      "🌿 **Dica do dia:** Agrupe suas plantas! Elas criam um microclima úmido entre si, beneficiando especialmente tropicais como samambaias.",
      "💧 **Dica do dia:** Use a água de cozimento de legumes (fria!) para regar — é rica em nutrientes e suas plantas vão adorar!",
      "☀️ **Dica do dia:** Gire seus vasos 1/4 de volta a cada semana para que a planta cresça uniformemente em direção à luz.",
      "🪴 **Dica do dia:** Cascas de banana cortadas e secas são um ótimo fertilizante caseiro, rico em potássio!",
      "🌱 **Dica do dia:** Quando transplantar, regue a planta 1h antes. Raízes úmidas sofrem menos estresse durante a mudança.",
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  }

  // Pests
  if (lower.includes("praga") || lower.includes("inseto") || lower.includes("cochonilha") || lower.includes("pulgão") || lower.includes("bug")) {
    return `🐛 **Pragas comuns em plantas caseiras:**\n\n1. **Cochonilha** — Bolinhas brancas/marrons nos caules\n   → Remova com cotonete + álcool\n\n2. **Pulgão** — Insetos pequenos verdes/pretos\n   → Borrife água com sabão neutro\n\n3. **Ácaro** — Pontinhos vermelhos, teias finas\n   → Aumente umidade, borrife com água\n\n4. **Mosca-do-fungo** — Mosquinhas no solo\n   → Deixe o solo secar entre regas\n\n💡 **Prevenção:** Limpe as folhas regularmente e inspecione novas plantas antes de juntar às outras.`;
  }

  // Companion plants
  if (lower.includes("companheir") || lower.includes("junto") || lower.includes("combinam")) {
    return `🌿 **Plantas companheiras no seu jardim:**\n\n${MOCK_PLANTS.map(p => `**${p.name}** combina com: ${p.companionPlants.join(", ")}`).join("\n\n")}\n\n💡 Plantas companheiras se beneficiam mutuamente — compartilham nutrientes, repelem pragas ou criam microclimas favoráveis.`;
  }

  // Greetings
  if (lower.match(/^(oi|olá|ola|hey|eai|e ai|bom dia|boa tarde|boa noite|hello|hi)/)) {
    const pendingCount = MOCK_TASKS.filter(t => !t.completed).length;
    return `Olá! 🌱 Sou o assistente do **Varanda Viva**!\n\nVocê tem **${MOCK_PLANTS.length} plantas** no jardim e **${pendingCount} tarefas** pendentes.\n\nComo posso ajudar? Posso falar sobre:\n- 💧 Rega e cuidados\n- ☀️ Iluminação ideal\n- 🩺 Diagnóstico de problemas\n- ✂️ Poda e adubação\n- 🐛 Pragas e prevenção\n\nOu pergunte sobre uma planta específica!`;
  }

  // Fallback
  return `🌱 Posso ajudar com várias coisas sobre seu jardim!\n\nTente perguntar sobre:\n- Uma planta específica (ex: *"Como cuidar do manjericão?"*)\n- Tarefas do dia (ex: *"O que preciso fazer hoje?"*)\n- Problemas (ex: *"Folhas amarelas"*)\n- Dicas de jardinagem\n- Pragas e prevenção\n\nSeu jardim tem: ${MOCK_PLANTS.map(p => `${p.image} ${p.name}`).join(", ")}`;
}

const Assistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Olá! 🌱 Sou o assistente do **Varanda Viva**!\n\nVocê tem **${MOCK_PLANTS.length} plantas** no jardim e **${MOCK_TASKS.filter(t => !t.completed).length} tarefas** pendentes hoje.\n\nComo posso ajudar?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate response delay
    setTimeout(() => {
      const response = getSmartResponse(text);
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 600 + Math.random() * 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  // Simple markdown-like rendering
  const renderContent = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      // Bold
      let rendered = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      // Italic
      rendered = rendered.replace(/\*(.+?)\*/g, '<em>$1</em>');
      
      if (line.trim() === "") return <br key={i} />;
      return (
        <p
          key={i}
          className="text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: rendered }}
        />
      );
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)]">
      {/* Header */}
      <div className="px-4 pt-6 pb-3 animate-fade-in">
        <div className="flex items-center gap-3">
          <AssistantAvatar size={44} />
          <div>
            <h1 className="text-xl font-extrabold text-foreground">Assistente</h1>
            <p className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Online — pronto para ajudar
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 space-y-3 pb-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 animate-slide-up ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && <AssistantAvatar size={32} />}
            <div
              className={`max-w-[80%] rounded-2xl p-3 ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-card card-shadow rounded-tl-sm"
              }`}
            >
              <div className={msg.role === "user" ? "text-primary-foreground" : "text-foreground"}>
                {renderContent(msg.content)}
              </div>
              <p className={`text-[9px] mt-1 ${msg.role === "user" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                {msg.timestamp.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-2 items-end animate-fade-in">
            <AssistantAvatar size={32} />
            <div className="bg-card card-shadow rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

        {/* Quick actions - only show at start */}
        {messages.length <= 1 && !isTyping && (
          <div className="space-y-2 animate-slide-up opacity-0 stagger-2">
            <p className="text-xs font-bold text-muted-foreground px-1">Sugestões rápidas</p>
            <div className="grid grid-cols-2 gap-2">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.label}
                  onClick={() => sendMessage(action.prompt)}
                  className="bg-card card-shadow rounded-xl p-3 text-left transition-all active:scale-95 hover:card-shadow-hover"
                >
                  <span className="text-xl">{action.icon}</span>
                  <p className="text-xs font-bold text-foreground mt-1">{action.label}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border bg-background">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pergunte sobre suas plantas..."
            className="flex-1 bg-card rounded-xl px-4 py-3 text-sm font-semibold text-foreground placeholder:text-muted-foreground outline-none card-shadow focus:ring-2 focus:ring-primary/30 transition-shadow"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center text-primary-foreground disabled:opacity-40 transition-all active:scale-95"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Assistant;
