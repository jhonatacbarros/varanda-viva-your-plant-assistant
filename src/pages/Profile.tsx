import { useState } from "react";
import { Flame, Target, Leaf, Settings, Heart, Bookmark, Grid3X3, ChevronRight } from "lucide-react";
import { MOCK_PLANTS, MOCK_FEED_POSTS } from "@/data/plants";
import { useNavigate } from "react-router-dom";

type Tab = "posts" | "saved";

const Profile = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("posts");
  const streak = 12;
  const completionRate = 87;
  const totalPlants = MOCK_PLANTS.length;

  const userPosts = MOCK_FEED_POSTS.slice(0, 3);
  const savedPosts = MOCK_FEED_POSTS.filter((p) => p.liked);

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

      {/* Avatar */}
      <div className="flex items-center gap-4 mb-6 animate-slide-up opacity-0 stagger-1">
        <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center">
          <span className="text-3xl">🧑‍🌾</span>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-extrabold text-foreground">Jardineiro(a)</h2>
          <p className="text-xs text-muted-foreground font-semibold">
            {totalPlants} plantas · {userPosts.length} posts
          </p>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="px-3 py-2 bg-primary rounded-xl text-xs font-bold text-primary-foreground"
        >
          Login
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-card rounded-2xl p-4 card-shadow text-center animate-slide-up opacity-0 stagger-2">
          <Flame size={24} className="mx-auto text-destructive mb-2" />
          <p className="text-2xl font-extrabold text-foreground">{streak}</p>
          <p className="text-[10px] font-bold text-muted-foreground">Dias seguidos</p>
        </div>
        <div className="bg-card rounded-2xl p-4 card-shadow text-center animate-slide-up opacity-0 stagger-3">
          <Target size={24} className="mx-auto text-primary mb-2" />
          <p className="text-2xl font-extrabold text-foreground">{completionRate}%</p>
          <p className="text-[10px] font-bold text-muted-foreground">Conclusão</p>
        </div>
        <div className="bg-card rounded-2xl p-4 card-shadow text-center animate-slide-up opacity-0 stagger-4">
          <Leaf size={24} className="mx-auto text-primary mb-2" />
          <p className="text-2xl font-extrabold text-foreground">{totalPlants}</p>
          <p className="text-[10px] font-bold text-muted-foreground">Plantas</p>
        </div>
      </div>

      {/* Weekly chart */}
      <div className="bg-card rounded-2xl p-4 card-shadow mb-6 animate-slide-up opacity-0 stagger-5">
        <h3 className="text-sm font-extrabold text-foreground mb-3">Esta semana</h3>
        <div className="flex items-end justify-between gap-2 h-20">
          {[4, 3, 5, 2, 4, 3, 1].map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full rounded-lg transition-all ${i === 3 ? "bg-warning" : "bg-primary"}`}
                style={{ height: `${val * 16}px` }}
              />
              <span className="text-[9px] font-bold text-muted-foreground">
                {["S", "T", "Q", "Q", "S", "S", "D"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-card rounded-2xl card-shadow mb-4 p-1 animate-slide-up opacity-0 stagger-5">
        <button
          onClick={() => setTab("posts")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
            tab === "posts" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          <Grid3X3 size={14} />
          Meus Posts
        </button>
        <button
          onClick={() => setTab("saved")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
            tab === "saved" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          <Bookmark size={14} />
          Salvos
        </button>
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-3 gap-2">
        {(tab === "posts" ? userPosts : savedPosts).map((post) => (
          <div
            key={post.id}
            className="bg-card rounded-xl card-shadow aspect-square flex flex-col items-center justify-center relative"
          >
            <span className="text-4xl">{post.image}</span>
            <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1">
              <Heart size={10} className="text-destructive" />
              <span className="text-[9px] font-bold text-muted-foreground">{post.likes}</span>
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
    </div>
  );
};

export default Profile;
