import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AssistantAvatar from "@/components/AssistantAvatar";

interface Message {
  from: "bot" | "user";
  text: string;
  options?: string[];
}

const FLOW: Message[][] = [
  [
    { from: "bot", text: "Olá! 🌱 Eu sou o Varanda Viva, seu assistente de cuidados com plantas!" },
    { from: "bot", text: "Vou te ajudar a manter suas plantinhas saudáveis e felizes. Vamos começar?" },
    { from: "bot", text: "Primeiro, que tipo de espaço você tem?", options: ["Varanda pequena", "Varanda grande", "Janela / Parapeito", "Interior apenas"] },
  ],
  [
    { from: "bot", text: "Ótima escolha! ☀️ E quanto ao sol que bate no seu espaço?" },
    { from: "bot", text: "Selecione a opção que melhor descreve:", options: ["Sol direto (manhã)", "Sol direto (tarde)", "Luz indireta", "Pouca luz"] },
  ],
  [
    { from: "bot", text: "Entendi! E quanto tempo você pode dedicar às plantas?" },
    { from: "bot", text: "Seja honesto(a), sem julgamentos! 😄", options: ["5 min por dia", "15 min por dia", "Só nos fins de semana", "Quando lembrar 😅"] },
  ],
  [
    { from: "bot", text: "Perfeito! Já tenho tudo que preciso. 🎉" },
    { from: "bot", text: "Vou preparar recomendações personalizadas para você. A partir de agora, estarei aqui todos os dias para te lembrar dos cuidados com suas plantas." },
    { from: "bot", text: "Vamos começar! 🌿" },
  ],
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<Message[]>(FLOW[0]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOption = (option: string) => {
    const userMsg: Message = { from: "user", text: option };
    const nextStep = step + 1;
    setSelectedOptions([...selectedOptions, option]);

    if (nextStep < FLOW.length) {
      setMessages((prev) => [...prev, userMsg, ...FLOW[nextStep]]);
      setStep(nextStep);
    } else {
      setMessages((prev) => [...prev, userMsg]);
    }
  };

  const isLastStep = step >= FLOW.length - 1 && messages[messages.length - 1]?.from === "bot";
  const currentOptions = messages.filter((m) => m.options).pop()?.options;
  const showOptions = !isLastStep && currentOptions && messages[messages.length - 1]?.options;

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto flex flex-col">
      {/* Header */}
      <div className="px-4 pt-8 pb-4 text-center animate-fade-in">
        <h1 className="text-xl font-extrabold text-foreground">Varanda Viva</h1>
        <p className="text-xs text-muted-foreground font-semibold mt-1">Seu assistente de plantas 🌱</p>
      </div>

      {/* Chat */}
      <div className="flex-1 px-4 overflow-y-auto space-y-3 pb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2 animate-slide-up opacity-0 ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            style={{ animationDelay: `${i * 0.08}s`, animationFillMode: "forwards" }}
          >
            {msg.from === "bot" && <AssistantAvatar size={32} />}
            <div
              className={`max-w-[75%] px-4 py-2.5 text-sm font-semibold ${
                msg.from === "bot"
                  ? "bg-secondary text-secondary-foreground rounded-2xl rounded-tl-sm"
                  : "bg-card text-foreground rounded-2xl rounded-tr-sm card-shadow"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Options or CTA */}
      <div className="px-4 pb-8 pt-2">
        {showOptions ? (
          <div className="grid grid-cols-2 gap-2">
            {currentOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => handleOption(opt)}
                className="bg-card rounded-xl p-3 text-sm font-bold text-foreground card-shadow hover:card-shadow-hover hover:scale-[1.02] transition-all"
              >
                {opt}
              </button>
            ))}
          </div>
        ) : isLastStep ? (
          <button
            onClick={() => navigate("/assistant")}
            className="w-full bg-primary text-primary-foreground rounded-xl py-4 text-base font-extrabold hover:opacity-90 transition-opacity animate-bounce-in"
          >
            Começar a cuidar! 🌿
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Onboarding;
