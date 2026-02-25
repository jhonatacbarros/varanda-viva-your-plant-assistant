import { useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, MapPin } from "lucide-react";
import type { Plant } from "@/data/plants";

interface EditPlantSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plant: Plant;
  onSave: (data: EditPlantData) => void;
}

export interface EditPlantData {
  name: string;
  image: string;
  location: string;
}

const EMOJI_OPTIONS = ["🌿", "🪴", "🌱", "🌸", "🍃", "🌺", "🌻", "🌷", "🌵", "🍀", "☘️", "🌾", "🌹", "💐", "🌼", "🍂", "🍁", "🌴", "🎋", "🎍"];
const LOCATION_OPTIONS = ["Varanda", "Sala", "Quarto", "Cozinha", "Banheiro", "Escritório", "Jardim", "Quintal", "Área externa"];

const EditPlantSheet = ({ open, onOpenChange, plant, onSave }: EditPlantSheetProps) => {
  const [name, setName] = useState(plant.name);
  const [image, setImage] = useState(plant.image);
  const [location, setLocation] = useState(plant.location);

  const handleSave = () => {
    onSave({ name, image, location });
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            <Pencil size={18} /> Editar {plant.name}
          </DrawerTitle>
        </DrawerHeader>

        <div className="px-4 pb-2 space-y-5">
          {/* Emoji picker */}
          <div>
            <label className="text-xs font-bold text-foreground mb-2 block">Ícone da planta</label>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-4xl">
                {image}
              </div>
              <div className="text-xs text-muted-foreground">
                Escolha um emoji ou<br />toque para mudar
              </div>
            </div>
            <div className="grid grid-cols-10 gap-1.5">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setImage(emoji)}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg transition-all ${
                    image === emoji ? "bg-primary/20 ring-2 ring-primary scale-110" : "bg-secondary/50 hover:bg-secondary"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-xs font-bold text-foreground mb-1.5 block">Nome/Apelido</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome da planta"
              className="rounded-xl"
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-xs font-bold text-foreground mb-2 block flex items-center gap-1.5">
              <MapPin size={12} /> Localização
            </label>
            <div className="flex flex-wrap gap-2">
              {LOCATION_OPTIONS.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocation(loc)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    location === loc
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        </div>

        <DrawerFooter>
          <Button onClick={handleSave} className="rounded-xl h-12 text-base font-bold">
            Salvar alterações
          </Button>
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="rounded-xl">
            Cancelar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default EditPlantSheet;
