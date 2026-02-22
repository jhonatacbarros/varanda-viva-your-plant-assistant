import { useState } from "react";
import { ArrowLeft, Search, Check, Sun, Droplets, Scissors, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CATALOG_PLANTS } from "@/data/plants";

const LOCATIONS = ["Varanda", "Sala", "Quarto", "Cozinha", "Banheiro", "Escritório"];

const AddPlant = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"catalog" | "details" | "done">("catalog");
  const [search, setSearch] = useState("");
  const [selectedPlant, setSelectedPlant] = useState<typeof CATALOG_PLANTS[0] | null>(null);
  const [plantName, setPlantName] = useState("");
  const [location, setLocation] = useState("");

  const filtered = CATALOG_PLANTS.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.tags.some((t) => t.includes(search.toLowerCase()))
  );

  const handleAdd = () => {
    setStep("done");
    setTimeout(() => navigate("/garden"), 1500);
  };

  if (step === "done") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 animate-bounce-in">
        <span className="text-7xl mb-4">{selectedPlant?.emoji || "🌱"}</span>
        <h2 className="text-xl font-extrabold text-foreground mb-2">Planta adicionada!</h2>
        <p className="text-sm text-muted-foreground font-semibold text-center">
          {plantName || selectedPlant?.name} foi adicionada ao seu jardim 🌿
        </p>
      </div>
    );
  }

  if (step === "details" && selectedPlant) {
    return (
      <div className="px-4 pt-6 pb-6">
        <div className="flex items-center gap-3 mb-6 animate-fade-in">
          <button onClick={() => setStep("catalog")} className="w-10 h-10 rounded-xl bg-card flex items-center justify-center card-shadow">
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <h1 className="text-lg font-extrabold text-foreground">Configurar planta</h1>
        </div>

        {/* Plant preview */}
        <div className="bg-card rounded-2xl card-shadow flex flex-col items-center py-8 mb-5 animate-slide-up opacity-0 stagger-1">
          <span className="text-7xl mb-3">{selectedPlant.emoji}</span>
          <h2 className="text-lg font-extrabold text-foreground">{selectedPlant.name}</h2>
          <div className="flex gap-2 mt-2">
            {selectedPlant.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-secondary rounded-lg text-[10px] font-bold text-foreground">{tag}</span>
            ))}
          </div>
        </div>

        {/* Name */}
        <div className="bg-card rounded-2xl card-shadow p-4 mb-3 animate-slide-up opacity-0 stagger-2">
          <label className="text-xs font-bold text-muted-foreground mb-2 block">Apelido (opcional)</label>
          <input
            value={plantName}
            onChange={(e) => setPlantName(e.target.value)}
            placeholder={selectedPlant.name}
            className="w-full bg-secondary rounded-xl px-3 py-3 text-sm font-semibold text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Location */}
        <div className="bg-card rounded-2xl card-shadow p-4 mb-5 animate-slide-up opacity-0 stagger-3">
          <label className="text-xs font-bold text-muted-foreground mb-3 block">
            <MapPin size={12} className="inline mr-1" />
            Onde ela fica?
          </label>
          <div className="flex flex-wrap gap-2">
            {LOCATIONS.map((loc) => (
              <button
                key={loc}
                onClick={() => setLocation(location === loc ? "" : loc)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  location === loc ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="w-full bg-primary text-primary-foreground rounded-2xl py-4 font-bold text-sm flex items-center justify-center gap-2 animate-slide-up opacity-0 stagger-4"
        >
          <Check size={18} />
          Adicionar ao Meu Jardim
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 pb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5 animate-fade-in">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-card flex items-center justify-center card-shadow">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-lg font-extrabold text-foreground">Adicionar Planta</h1>
      </div>

      {/* Search */}
      <div className="relative mb-5 animate-slide-up opacity-0 stagger-1">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar no catálogo..."
          className="w-full bg-card rounded-xl pl-10 pr-4 py-3 text-sm font-semibold text-foreground placeholder:text-muted-foreground card-shadow outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Catalog */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((plant, i) => (
          <button
            key={plant.name}
            onClick={() => { setSelectedPlant(plant); setStep("details"); }}
            className={`bg-card rounded-2xl p-4 card-shadow text-left hover:card-shadow-hover transition-all animate-slide-up opacity-0 stagger-${Math.min(i + 1, 5)}`}
          >
            <span className="text-4xl block mb-2">{plant.emoji}</span>
            <h3 className="font-bold text-sm text-foreground">{plant.name}</h3>
            <div className="flex flex-wrap gap-1 mt-2">
              {plant.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-accent rounded-lg text-[9px] font-bold text-accent-foreground">{tag}</span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AddPlant;
