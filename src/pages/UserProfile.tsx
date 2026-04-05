import { useState } from "react";
import { ArrowLeft, Sprout, Grid3X3, UserPlus, UserCheck, MessageCircle, Leaf } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { MOCK_USERS } from "@/data/users";
import { MOCK_FEED_POSTS } from "@/data/plants";

const UserProfile = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const user = MOCK_USERS.find(u => u.id === userId);
  const [isFollowing, setIsFollowing] = useState(user?.isFollowing ?? false);
  const [followerCount, setFollowerCount] = useState(user?.followers ?? 0);

  if (!user) {
    return (
      <div className="px-4 pt-6 text-center">
        <p className="text-muted-foreground">Usuário não encontrado</p>
        <button onClick={() => navigate(-1)} className="text-primary font-bold mt-4">Voltar</button>
      </div>
    );
  }

  const userPosts = MOCK_FEED_POSTS.filter(p => p.userId === user.id);

  const handleFollow = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowerCount(prev => prev - 1);
    } else {
      setIsFollowing(true);
      setFollowerCount(prev => prev + 1);
    }
  };

  return (
    <div className="px-4 pt-6 pb-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 animate-fade-in">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl bg-card flex items-center justify-center card-shadow"
        >
          <ArrowLeft size={18} className="text-foreground" />
        </button>
        <h1 className="text-lg font-extrabold text-foreground">{user.name}</h1>
      </div>

      {/* Profile info */}
      <div className="flex items-center gap-4 mb-5 animate-slide-up opacity-0 stagger-1">
        <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center">
          <span className="text-3xl">{user.avatar}</span>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-extrabold text-foreground">{user.name}</h2>
          <p className="text-xs text-muted-foreground font-semibold">{user.bio}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5 animate-slide-up opacity-0 stagger-2">
        <div className="bg-card rounded-xl p-3 card-shadow text-center">
          <p className="text-lg font-extrabold text-foreground">{userPosts.length}</p>
          <p className="text-[10px] font-bold text-muted-foreground">Posts</p>
        </div>
        <div className="bg-card rounded-xl p-3 card-shadow text-center">
          <p className="text-lg font-extrabold text-foreground">{followerCount}</p>
          <p className="text-[10px] font-bold text-muted-foreground">Seguidores</p>
        </div>
        <div className="bg-card rounded-xl p-3 card-shadow text-center">
          <p className="text-lg font-extrabold text-foreground">{user.following}</p>
          <p className="text-[10px] font-bold text-muted-foreground">Seguindo</p>
        </div>
      </div>

      {/* Follow button */}
      <button
        onClick={handleFollow}
        className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 mb-6 transition-all active:scale-[0.98] animate-slide-up opacity-0 stagger-3 ${
          isFollowing
            ? "bg-secondary text-foreground"
            : "bg-primary text-primary-foreground"
        }`}
      >
        {isFollowing ? (
          <>
            <UserCheck size={18} />
            Seguindo
          </>
        ) : (
          <>
            <UserPlus size={18} />
            Seguir
          </>
        )}
      </button>

      {/* Garden preview */}
      {user.plants.length > 0 && (
        <div className="mb-5 animate-slide-up opacity-0 stagger-4">
          <h3 className="text-sm font-extrabold text-foreground mb-3 flex items-center gap-2">
            <Leaf size={14} className="text-primary" />
            Jardim de {user.name.split(" ")[0]}
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {user.plants.map((plant, i) => (
              <div key={i} className="min-w-[80px] bg-card rounded-xl p-3 card-shadow text-center">
                <span className="text-2xl">{plant.emoji}</span>
                <p className="text-[10px] font-bold text-foreground mt-1">{plant.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Posts */}
      <div className="animate-slide-up opacity-0 stagger-5">
        <h3 className="text-sm font-extrabold text-foreground mb-3 flex items-center gap-2">
          <Grid3X3 size={14} className="text-primary" />
          Publicações
        </h3>
        {userPosts.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {userPosts.map((post) => (
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
          </div>
        ) : (
          <div className="bg-card rounded-xl p-8 card-shadow text-center">
            <p className="text-3xl mb-2">📷</p>
            <p className="text-sm font-semibold text-muted-foreground">Nenhuma publicação ainda</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
