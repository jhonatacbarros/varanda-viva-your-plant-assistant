import { useState } from "react";
import { Flame, Target, Leaf, Settings, Sprout, Bookmark, Grid3X3, Trophy, ChevronRight, Crown } from "lucide-react";
import { MOCK_PLANTS, MOCK_FEED_POSTS } from "@/data/plants";
import { useNavigate } from "react-router-dom";
import { useGamification, LEVELS } from "@/hooks/useGamification";
import { usePremium } from "@/hooks/usePremium";

type Tab = "posts" | "saved" | "badges";

const Profile = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("posts");
  const { isPremium } = usePremium();
  const {
    cultivarPoints,
    currentLevel,
    nextLevel,
    progressToNext,
    unlockedBadges,
    allBadges,
    streakDays,
    careCompleted,
  } = useGamification();

  const totalPlants = MOCK_PLANTS.length;
  const userPosts = MOCK_FEED_POSTS.slice(0, 3);
  const savedPosts = MOCK_FEED_POSTS.filter((p) => p.cultivado);

  return (
    <div className="px-4 pt-6 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 animate-fade-in">
        <h1 className="text-2xl font-extrabold text-foreground">Perfil</h1>
        <button
          onClick={() => navigate("/settings")}
          className="w-10 h-10 rounded-xl bg-card flex items-center justify-center card-shadow"
        >
          <Settings size={20} className="text-foreground" />
        </button>
      </div>

      {/* Avatar + Level */}
      <div className="flex items-center gap-4 mb-4 animate-slide-up opacity-0 stagger-1">
        <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center relative">
          <span className="text-3xl">🧑‍🌾</span>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary flex items-center justify-center text-sm shadow-md">
            {currentLevel.emoji}
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-extrabold text-foreground">Jardineiro(a)</h2>
          <p className="text-xs text-primary font-bold">
            {currentLevel.emoji} Nível {currentLevel.level} — {currentLevel.title}
          </p>
          <p className="text-[10px] text-muted-foreground font-semibold">
            {totalPlants} plantas · {userPosts.length} posts
          </p>
        </div>
        <button
          onClick={() => navigate("/premium")}
          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
            isPremium ? "bg-gradient-to-r from-warning to-primary text-primary-foreground" : "bg-warning/15 text-warning"
          }`}
        >
          <Crown size={14} />
          {isPremium ? "Premium" : "Upgrade"}
        </button>
      </div>

      {/* XP Progress Bar */}
      <div className="bg-card rounded-2xl card-shadow p-4 mb-6 animate-slide-up opacity-0 stagger-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sprout size={16} className="text-primary" />
            <span className="text-xs font-bold text-foreground">{cultivarPoints} pontos de cultivo</span>
          </div>
          {nextLevel && (
            <span className="text-[10px] font-bold text-muted-foreground">
              Próx: {nextLevel.emoji} {nextLevel.title}
            </span>
          )}
        </div>
        <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progressToNext}%` }}
          />
        </div>
        {nextLevel && (
          <p className="text-[10px] text-muted-foreground font-semibold mt-1 text-right">
            {nextLevel.minPoints - cultivarPoints} pontos para {nextLevel.title}
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-card rounded-2xl p-4 card-shadow text-center animate-slide-up opacity-0 stagger-3">
          <Flame size={24} className="mx-auto text-destructive mb-2" />
          <p className="text-2xl font-extrabold text-foreground">{streakDays}</p>
          <p className="text-[10px] font-bold text-muted-foreground">Dias seguidos</p>
        </div>
        <div className="bg-card rounded-2xl p-4 card-shadow text-center animate-slide-up opacity-0 stagger-4">
          <Sprout size={24} className="mx-auto text-primary mb-2" />
          <p className="text-2xl font-extrabold text-foreground">{cultivarPoints}</p>
          <p className="text-[10px] font-bold text-muted-foreground">Cultivares</p>
        </div>
        <div className="bg-card rounded-2xl p-4 card-shadow text-center animate-slide-up opacity-0 stagger-5">
          <Leaf size={24} className="mx-auto text-primary mb-2" />
          <p className="text-2xl font-extrabold text-foreground">{totalPlants}</p>
          <p className="text-[10px] font-bold text-muted-foreground">Plantas</p>
        </div>
      </div>

      {/* Level roadmap */}
      <div className="bg-card rounded-2xl card-shadow p-4 mb-6 animate-slide-up opacity-0 stagger-5">
        <h3 className="text-sm font-extrabold text-foreground mb-3">Jornada de Cultivo</h3>
        <div className="flex items-center gap-1 overflow-x-auto pb-1">
          {LEVELS.map((lvl) => {
            const reached = cultivarPoints >= lvl.minPoints;
            return (
              <div key={lvl.level} className="flex flex-col items-center min-w-[48px]">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all ${
                  reached ? "bg-primary/20 scale-105" : "bg-secondary opacity-50"
                }`}>
                  {lvl.emoji}
                </div>
                <span className={`text-[9px] font-bold mt-1 ${reached ? "text-primary" : "text-muted-foreground"}`}>
                  {lvl.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-card rounded-2xl card-shadow mb-4 p-1 animate-slide-up opacity-0 stagger-5">
        <button
          onClick={() => setTab("posts")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-bold transition-all ${
            tab === "posts" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          <Grid3X3 size={13} />
          Posts
        </button>
        <button
          onClick={() => setTab("saved")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-bold transition-all ${
            tab === "saved" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          <Bookmark size={13} />
          Salvos
        </button>
        <button
          onClick={() => setTab("badges")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-bold transition-all ${
            tab === "badges" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          <Trophy size={13} />
          Conquistas
        </button>
      </div>

      {/* Tab content */}
      {tab === "badges" ? (
        <div className="grid grid-cols-2 gap-3">
          {allBadges.map((badge) => {
            const unlocked = unlockedBadges.some((b) => b.id === badge.id);
            return (
              <div
                key={badge.id}
                className={`bg-card rounded-2xl card-shadow p-4 flex flex-col items-center text-center transition-all ${
                  unlocked ? "" : "opacity-40 grayscale"
                }`}
              >
                <span className="text-3xl mb-2">{badge.emoji}</span>
                <p className="text-xs font-extrabold text-foreground">{badge.title}</p>
                <p className="text-[10px] text-muted-foreground font-semibold mt-1">{badge.description}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {(tab === "posts" ? userPosts : savedPosts).map((post) => (
            <div
              key={post.id}
              className="bg-card rounded-xl card-shadow aspect-square flex flex-col items-center justify-center relative"
            >
              <span className="text-4xl">{post.image}</span>
              <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1">
                <Sprout size={10} className="text-primary" />
                <span className="text-[9px] font-bold text-muted-foreground">{post.cultivares}</span>
              </div>
            </div>
          ))}
          {(tab === "posts" ? userPosts : savedPosts).length === 0 && (
            <div className="col-span-3 py-12 text-center">
              <p className="text-sm text-muted-foreground font-semibold">
                {tab === "posts" ? "Nenhum post ainda" : "Nenhum post salvo"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
