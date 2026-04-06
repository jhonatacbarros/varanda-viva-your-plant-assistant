import { useState } from "react";
import { Leaf, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type Mode = "login" | "signup";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mode, setMode] = useState<Mode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signup" && !form.name.trim()) {
      toast({ title: "Preencha seu nome", variant: "destructive" });
      return;
    }
    if (!form.email.trim() || !form.password.trim()) {
      toast({ title: "Preencha todos os campos", variant: "destructive" });
      return;
    }
    if (form.password.length < 6) {
      toast({ title: "A senha deve ter pelo menos 6 caracteres", variant: "destructive" });
      return;
    }

    const hasOnboarded = localStorage.getItem("vv_onboarded");
    if (mode === "signup" || !hasOnboarded) {
      localStorage.setItem("vv_user", JSON.stringify({ name: form.name || "Usuário", email: form.email }));
      navigate("/onboarding");
    } else {
      navigate("/home");
    }
  };

  const handleGoogleLogin = () => {
    const hasOnboarded = localStorage.getItem("vv_onboarded");
    localStorage.setItem("vv_user", JSON.stringify({ name: "Usuário Google", email: "user@gmail.com" }));
    navigate(hasOnboarded ? "/home" : "/onboarding");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="flex flex-col items-center mb-10 animate-bounce-in">
        <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center mb-4">
          <Leaf size={40} className="text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-extrabold text-foreground">Varanda Viva</h1>
        <p className="text-sm text-muted-foreground font-semibold mt-1">Seu assistente de plantas 🌱</p>
      </div>

      {/* Tabs */}
      <div className="w-full max-w-sm mb-6 animate-slide-up opacity-0 stagger-1" style={{ animationFillMode: "forwards" }}>
        <div className="flex bg-secondary rounded-xl p-1">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
              mode === "login" ? "bg-card text-foreground card-shadow" : "text-muted-foreground"
            }`}
          >
            Entrar
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
              mode === "signup" ? "bg-card text-foreground card-shadow" : "text-muted-foreground"
            }`}
          >
            Criar conta
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-3 animate-slide-up opacity-0 stagger-2" style={{ animationFillMode: "forwards" }}>
        {mode === "signup" && (
          <div className="relative">
            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Seu nome"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-card rounded-xl pl-12 pr-4 py-3.5 text-sm font-semibold text-foreground placeholder:text-muted-foreground card-shadow focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        )}

        <div className="relative">
          <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-card rounded-xl pl-12 pr-4 py-3.5 text-sm font-semibold text-foreground placeholder:text-muted-foreground card-shadow focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div className="relative">
          <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full bg-card rounded-xl pl-12 pr-12 py-3.5 text-sm font-semibold text-foreground placeholder:text-muted-foreground card-shadow focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground rounded-xl py-3.5 text-sm font-extrabold hover:opacity-90 transition-opacity"
        >
          {mode === "login" ? "Entrar" : "Criar conta"}
        </button>
      </form>

      {/* Divider */}
      <div className="w-full max-w-sm flex items-center gap-3 my-5 animate-slide-up opacity-0 stagger-2" style={{ animationFillMode: "forwards" }}>
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs font-semibold text-muted-foreground">ou</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Google */}
      <div className="w-full max-w-sm animate-slide-up opacity-0 stagger-3" style={{ animationFillMode: "forwards" }}>
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-card rounded-xl p-3.5 card-shadow flex items-center justify-center gap-3 hover:card-shadow-hover transition-shadow"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="text-sm font-bold text-foreground">Continuar com Google</span>
        </button>
      </div>

      {/* Skip */}
      <button
        onClick={() => navigate("/home")}
        className="mt-6 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors animate-slide-up opacity-0 stagger-3"
        style={{ animationFillMode: "forwards" }}
      >
        Continuar sem login
      </button>

      <p className="mt-4 text-center text-[10px] text-muted-foreground font-semibold leading-relaxed max-w-sm">
        Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade
      </p>
    </div>
  );
};

export default Login;
