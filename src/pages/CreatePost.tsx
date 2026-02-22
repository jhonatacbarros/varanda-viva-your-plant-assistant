import { useState } from "react";
import { ArrowLeft, Image, Smile } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MOCK_PLANTS } from "@/data/plants";

const PLANT_EMOJIS = ["🌿", "🪴", "🌱", "🌸", "🍃", "🌺", "🌵", "☘️", "🌻", "🍅", "💐", "🌹"];

const CreatePost = () => {
  const navigate = useNavigate();
  const [caption, setCaption] = useState("");
  const [selectedPlant, setSelectedPlant] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("🪴");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [posted, setPosted] = useState(false);

  const handlePost = () => {
    if (!caption.trim()) return;
    setPosted(true);
    setTimeout(() => navigate("/feed"), 1200);
  };

  if (posted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 animate-bounce-in">
        <span className="text-7xl mb-4">🎉</span>
        <h2 className="text-xl font-extrabold text-foreground mb-2">Publicado!</h2>
        <p className="text-sm text-muted-foreground font-semibold text-center">
          Sua planta foi compartilhada com a comunidade
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 animate-fade-in">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-card flex items-center justify-center card-shadow">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-lg font-extrabold text-foreground">Nova Postagem</h1>
        <button
          onClick={handlePost}
          disabled={!caption.trim()}
          className="px-4 py-2 bg-primary rounded-xl text-sm font-bold text-primary-foreground disabled:opacity-40 transition-opacity"
        >
          Publicar
        </button>
      </div>

      {/* Image preview */}
      <div className="bg-card rounded-2xl card-shadow flex items-center justify-center py-16 mb-4 relative animate-slide-up opacity-0 stagger-1">
        <span className="text-8xl">{selectedEmoji}</span>
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="absolute bottom-3 right-3 w-10 h-10 bg-primary rounded-xl flex items-center justify-center"
        >
          <Smile size={20} className="text-primary-foreground" />
        </button>
      </div>

      {/* Emoji picker */}
      {showEmojiPicker && (
        <div className="bg-card rounded-2xl card-shadow p-4 mb-4 animate-slide-up">
          <p className="text-xs font-bold text-muted-foreground mb-3">Escolha o ícone da planta</p>
          <div className="flex flex-wrap gap-3">
            {PLANT_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => { setSelectedEmoji(emoji); setShowEmojiPicker(false); }}
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all ${
                  selectedEmoji === emoji ? "bg-primary/20 scale-110 ring-2 ring-primary" : "bg-secondary"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Select plant */}
      <div className="bg-card rounded-2xl card-shadow p-4 mb-4 animate-slide-up opacity-0 stagger-2">
        <p className="text-xs font-bold text-muted-foreground mb-3">Marcar planta (opcional)</p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {MOCK_PLANTS.map((plant) => (
            <button
              key={plant.id}
              onClick={() => setSelectedPlant(selectedPlant === plant.id ? "" : plant.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedPlant === plant.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground"
              }`}
            >
              <span>{plant.image}</span>
              {plant.name}
            </button>
          ))}
        </div>
      </div>

      {/* Caption */}
      <div className="bg-card rounded-2xl card-shadow p-4 animate-slide-up opacity-0 stagger-3">
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Conte sobre sua planta..."
          rows={4}
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground font-semibold outline-none resize-none"
        />
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
          <span className="text-[10px] text-muted-foreground font-semibold">
            {caption.length}/280
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
