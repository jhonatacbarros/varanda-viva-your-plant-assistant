import { useState } from "react";
import { Heart, MessageCircle, Send, Plus, Bookmark } from "lucide-react";
import { MOCK_FEED_POSTS, FeedPost } from "@/data/plants";

const Feed = () => {
  const [posts, setPosts] = useState<FeedPost[]>(MOCK_FEED_POSTS);
  const [expandedComments, setExpandedComments] = useState<string | null>(null);

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const toggleComments = (postId: string) => {
    setExpandedComments((prev) => (prev === postId ? null : postId));
  };

  return (
    <div className="px-4 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 animate-fade-in">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Comunidade</h1>
          <p className="text-xs font-semibold text-muted-foreground">Compartilhe suas conquistas 🌱</p>
        </div>
        <button className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
          <Plus size={20} className="text-primary-foreground" />
        </button>
      </div>

      {/* Posts */}
      <div className="space-y-4 pb-4">
        {posts.map((post, i) => (
          <div
            key={post.id}
            className={`bg-card rounded-2xl card-shadow overflow-hidden animate-slide-up opacity-0 stagger-${Math.min(i + 1, 5)}`}
          >
            {/* Post header */}
            <div className="flex items-center gap-3 p-4 pb-2">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xl">
                {post.userAvatar}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground">{post.userName}</p>
                <p className="text-[10px] text-muted-foreground font-semibold">
                  {post.plantEmoji} {post.plantName} · {post.timeAgo}
                </p>
              </div>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Bookmark size={18} />
              </button>
            </div>

            {/* Plant visual */}
            <div className="mx-4 bg-secondary rounded-xl flex items-center justify-center py-10">
              <span className="text-7xl">{post.image}</span>
            </div>

            {/* Caption */}
            <div className="px-4 pt-3">
              <p className="text-sm text-foreground leading-relaxed">
                <span className="font-bold">{post.userName}</span>{" "}
                {post.caption}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 px-4 py-3">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-1.5 transition-all duration-200"
              >
                <Heart
                  size={20}
                  className={`transition-all duration-200 ${
                    post.liked ? "fill-destructive text-destructive scale-110" : "text-foreground"
                  }`}
                />
                <span className={`text-xs font-bold ${post.liked ? "text-destructive" : "text-foreground"}`}>
                  {post.likes}
                </span>
              </button>
              <button
                onClick={() => toggleComments(post.id)}
                className="flex items-center gap-1.5"
              >
                <MessageCircle size={20} className="text-foreground" />
                <span className="text-xs font-bold text-foreground">{post.comments.length}</span>
              </button>
              <button className="ml-auto">
                <Send size={18} className="text-muted-foreground" />
              </button>
            </div>

            {/* Comments */}
            {expandedComments === post.id && post.comments.length > 0 && (
              <div className="px-4 pb-3 space-y-2 animate-fade-in">
                <div className="h-px bg-border" />
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-2">
                    <p className="text-xs text-foreground leading-relaxed">
                      <span className="font-bold">{comment.userName}</span>{" "}
                      <span className="text-muted-foreground">{comment.text}</span>
                    </p>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap mt-0.5">
                      {comment.timeAgo}
                    </span>
                  </div>
                ))}
                {/* Comment input */}
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="Comente..."
                    className="flex-1 bg-secondary rounded-full px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button className="text-primary font-bold text-xs">Enviar</button>
                </div>
              </div>
            )}

            {/* Show comments hint */}
            {expandedComments !== post.id && post.comments.length > 0 && (
              <button
                onClick={() => toggleComments(post.id)}
                className="px-4 pb-3 text-xs text-muted-foreground font-semibold"
              >
                Ver {post.comments.length} comentário{post.comments.length > 1 ? "s" : ""}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
