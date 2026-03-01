import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Crown, UserPlus, Copy, Check, Users, Trash2 } from "lucide-react";
import { MOCK_SHARED_USERS } from "@/data/premium-mock";
import { MOCK_PLANTS } from "@/data/plants";
import { usePremium } from "@/hooks/usePremium";

const PremiumShare = () => {
  const navigate = useNavigate();
  const { isPremium } = usePremium();
  const [copied, setCopied] = useState(false);
  const [sharedUsers, setSharedUsers] = useState(MOCK_SHARED_USERS);
  const [showInvite, setShowInvite] = useState(false);

  if (!isPremium) { navigate("/premium"); return null; }

  const shareCode = "JARDIM-A7K9X";

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const removeUser = (id: string) => {
    setSharedUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <div className="px-4 pt-6 pb-24 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-card flex items-center justify-center card-shadow">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-lg font-extrabold text-foreground">Compartilhar Jardim</h1>
        <Crown size={16} className="text-warning" />
      </div>

      {/* Share code */}
      <div className="bg-gradient-to-br from-primary/15 to-accent/15 rounded-2xl p-5 text-center mb-6 animate-slide-up opacity-0 stagger-1">
        <Users size={28} className="mx-auto text-primary mb-2" />
        <p className="text-xs font-bold text-muted-foreground mb-2">Seu código de jardim:</p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-xl font-extrabold text-foreground tracking-widest bg-card px-4 py-2 rounded-xl">{shareCode}</span>
          <button onClick={handleCopy} className="w-10 h-10 rounded-xl bg-card flex items-center justify-center card-shadow">
            {copied ? <Check size={18} className="text-success" /> : <Copy size={18} className="text-foreground" />}
          </button>
        </div>
        <p className="text-[10px] text-muted-foreground font-semibold mt-2">
          Compartilhe este código para alguém ter acesso ao seu jardim
        </p>
      </div>

      {/* Invite button */}
      <button
        onClick={() => setShowInvite(!showInvite)}
        className="w-full bg-primary rounded-2xl p-4 flex items-center justify-center gap-2 mb-6 animate-slide-up opacity-0 stagger-2"
      >
        <UserPlus size={18} className="text-primary-foreground" />
        <span className="text-sm font-bold text-primary-foreground">Convidar por link</span>
      </button>

      {showInvite && (
        <div className="bg-card rounded-2xl p-4 card-shadow mb-6 animate-bounce-in">
          <p className="text-xs font-bold text-foreground mb-2">Link de convite:</p>
          <div className="bg-secondary/50 rounded-xl p-3">
            <p className="text-[11px] text-muted-foreground font-mono break-all">
              https://varandaviva.app/join/{shareCode.toLowerCase()}
            </p>
          </div>
          <button onClick={handleCopy} className="w-full mt-2 bg-primary/10 rounded-xl py-2 text-xs font-bold text-primary">
            {copied ? "✅ Link copiado!" : "📋 Copiar link"}
          </button>
        </div>
      )}

      {/* Shared users */}
      <div className="animate-slide-up opacity-0 stagger-3">
        <h3 className="text-sm font-extrabold text-foreground mb-3">
          Pessoas com acesso ({sharedUsers.length})
        </h3>
        <div className="space-y-2">
          {sharedUsers.map((user) => (
            <div key={user.id} className="bg-card rounded-xl p-3 card-shadow flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-xl">{user.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-foreground">{user.name}</p>
                <p className="text-[10px] text-muted-foreground font-semibold">
                  {user.plantsCount} plantas · {user.status === "pendente" ? "⏳ Pendente" : "✅ Ativo"}
                </p>
              </div>
              <button onClick={() => removeUser(user.id)} className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                <Trash2 size={14} className="text-destructive" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* What is shared */}
      <div className="bg-card rounded-2xl p-4 card-shadow mt-6 animate-slide-up opacity-0 stagger-4">
        <h3 className="text-sm font-extrabold text-foreground mb-3">O que é compartilhado?</h3>
        <div className="space-y-2">
          {[
            { emoji: "🌿", text: `Todas as ${MOCK_PLANTS.length} plantas do jardim` },
            { emoji: "📋", text: "Tarefas e lembretes de cuidados" },
            { emoji: "📊", text: "Histórico de cuidados" },
            { emoji: "📸", text: "Fotos e diagnósticos" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-sm">{item.emoji}</span>
              <span className="text-xs font-semibold text-foreground">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumShare;
