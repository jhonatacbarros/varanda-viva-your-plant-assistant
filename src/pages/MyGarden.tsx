import { useState } from "react";
import { LayoutGrid, List, Plus, Search, Droplets, MapPin } from "lucide-react";
import { MOCK_PLANTS } from "@/data/plants";
import { useNavigate } from "react-router-dom";

const healthColor = (health: number) => {
  if (health >= 80) return "bg-success";
  if (health >= 50) return "bg-warning";
  return "bg-destructive";
};

const healthText = (health: number) => {
  if (health >= 80) return "text-success";
  if (health >= 50) return "text-warning";
  return "text-destructive";
};

const difficultyBadge: Record<string, string> = {
  "fácil": "bg-success/15 text-success",
  "moderada": "bg-warning/15 text-warning",
  "difícil": "bg-destructive/15 text-destructive",
};

const MyGarden = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredPlants = MOCK_PLANTS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 animate-fade-in">
        <h1 className="text-2xl font-extrabold text-foreground">Meu Jardim</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="w-9 h-9 rounded-xl bg-card flex items-center justify-center card-shadow"
          >
            {viewMode === "grid" ? <List size={18} className="text-foreground" /> : <LayoutGrid size={18} className="text-foreground" />}
          </button>
          <button onClick={() => navigate("/garden/add")} className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <Plus size={18} className="text-primary-foreground" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-5 animate-slide-up opacity-0 stagger-1">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar por nome, espécie ou local..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-card rounded-xl pl-10 pr-4 py-3 text-sm font-semibold text-foreground placeholder:text-muted-foreground card-shadow border-0 outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Plant count */}
      <p className="text-xs font-bold text-muted-foreground mb-3">
        {filteredPlants.length} planta{filteredPlants.length !== 1 ? "s" : ""} no seu jardim
      </p>

      {/* Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 gap-3 pb-4">
          {filteredPlants.map((plant, i) => (
            <button
              key={plant.id}
              onClick={() => navigate(`/garden/${plant.id}`)}
              className={`bg-card rounded-2xl p-3.5 card-shadow text-left hover:card-shadow-hover transition-shadow animate-slide-up opacity-0 stagger-${Math.min(i + 1, 5)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="text-3xl">{plant.image}</div>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${difficultyBadge[plant.careInfo.difficulty]}`}>
                  {plant.careInfo.difficulty}
                </span>
              </div>
              <h3 className="font-bold text-sm text-foreground truncate">{plant.name}</h3>
              <p className="text-[10px] text-muted-foreground font-semibold italic truncate">{plant.species}</p>
              {/* Health bar */}
              <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${healthColor(plant.health)} transition-all`}
                  style={{ width: `${plant.health}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <div className="flex items-center gap-1">
                  <MapPin size={10} className="text-muted-foreground" />
                  <span className="text-[9px] text-muted-foreground font-semibold">{plant.location}</span>
                </div>
                <span className={`text-[10px] font-extrabold ${healthText(plant.health)}`}>{plant.health}%</span>
              </div>
              {/* Next action */}
              <div className="mt-2 bg-secondary/50 rounded-lg px-2 py-1.5">
                <p className="text-[10px] font-bold text-foreground truncate">{plant.nextAction}</p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-2 pb-4">
          {filteredPlants.map((plant, i) => (
            <button
              key={plant.id}
              onClick={() => navigate(`/garden/${plant.id}`)}
              className={`w-full bg-card rounded-xl p-3 card-shadow flex items-center gap-3 text-left hover:card-shadow-hover transition-shadow animate-slide-up opacity-0 stagger-${Math.min(i + 1, 5)}`}
            >
              <div className="text-3xl w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                {plant.image}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-foreground truncate">{plant.name}</h3>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 ${difficultyBadge[plant.careInfo.difficulty]}`}>
                    {plant.careInfo.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <MapPin size={10} className="text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground font-semibold">{plant.location}</span>
                </div>
                <p className="text-[10px] font-bold text-primary mt-1">{plant.nextAction}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className={`text-sm font-extrabold ${healthText(plant.health)}`}>{plant.health}%</span>
                <div className="w-12 h-1.5 bg-secondary rounded-full overflow-hidden mt-1">
                  <div
                    className={`h-full rounded-full ${healthColor(plant.health)} transition-all`}
                    style={{ width: `${plant.health}%` }}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyGarden;
