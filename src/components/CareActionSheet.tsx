import { useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TASK_ICONS, TASK_LABELS } from "@/data/plants";
import type { Plant } from "@/data/plants";

type ActionType = "water" | "sun" | "prune" | "fertilize" | "harvest" | "repot" | "spray";

interface CareActionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actionType: ActionType;
  plant: Plant;
  onConfirm: (data: CareActionData) => void;
}

export interface CareActionData {
  type: ActionType;
  note: string;
  amount?: string;
  duration?: string;
  fertilizerType?: string;
  pruningArea?: string;
  newPotSize?: string;
  harvestAmount?: string;
}

const ACTION_FIELDS: Record<ActionType, { fields: string[]; tips: string }> = {
  water: {
    fields: ["amount", "note"],
    tips: "Regue até a água escorrer pelo fundo. Evite molhar folhas sensíveis.",
  },
  spray: {
    fields: ["duration", "note"],
    tips: "Use água filtrada em temperatura ambiente. Borrifar pela manhã é ideal.",
  },
  fertilize: {
    fields: ["fertilizerType", "amount", "note"],
    tips: "Nunca adube planta seca. Regue antes de aplicar fertilizante.",
  },
  prune: {
    fields: ["pruningArea", "note"],
    tips: "Use tesoura limpa e afiada. Corte em ângulo de 45°.",
  },
  harvest: {
    fields: ["harvestAmount", "note"],
    tips: "Colha pela manhã quando os óleos essenciais estão mais concentrados.",
  },
  repot: {
    fields: ["newPotSize", "note"],
    tips: "Escolha um vaso 2-3cm maior que o atual. Regue após transplantar.",
  },
  sun: {
    fields: ["duration", "note"],
    tips: "Evite sol direto do meio-dia para plantas sensíveis.",
  },
};

const FIELD_LABELS: Record<string, { label: string; placeholder: string }> = {
  amount: { label: "Quantidade", placeholder: "Ex: 200ml, 1 copo" },
  duration: { label: "Duração", placeholder: "Ex: 30 min, 2 horas" },
  fertilizerType: { label: "Tipo de adubo", placeholder: "Ex: NPK 10-10-10" },
  pruningArea: { label: "Área podada", placeholder: "Ex: Galhos secos, folhas amarelas" },
  newPotSize: { label: "Novo vaso", placeholder: "Ex: Vaso 20cm, 5 litros" },
  harvestAmount: { label: "Quantidade colhida", placeholder: "Ex: 10 folhas, 1 ramo" },
  note: { label: "Observação", placeholder: "Como estava a planta? Algo diferente?" },
};

const CareActionSheet = ({ open, onOpenChange, actionType, plant, onConfirm }: CareActionSheetProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const config = ACTION_FIELDS[actionType];

  const handleConfirm = () => {
    onConfirm({
      type: actionType,
      note: formData.note || "",
      amount: formData.amount,
      duration: formData.duration,
      fertilizerType: formData.fertilizerType || plant.careInfo.fertilizerType,
      pruningArea: formData.pruningArea,
      newPotSize: formData.newPotSize,
      harvestAmount: formData.harvestAmount,
    });
    setFormData({});
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl">
              {TASK_ICONS[actionType]}
            </div>
            <div>
              <DrawerTitle className="text-left">{TASK_LABELS[actionType]} {plant.name}</DrawerTitle>
              <p className="text-xs text-muted-foreground mt-0.5">{plant.species}</p>
            </div>
          </div>
        </DrawerHeader>

        <div className="px-4 pb-2 space-y-4">
          {/* Tip */}
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-3">
            <p className="text-xs font-semibold text-primary">💡 Dica</p>
            <p className="text-xs text-muted-foreground mt-1">{config.tips}</p>
          </div>

          {/* Recommended values from plant info */}
          {actionType === "water" && (
            <div className="bg-secondary/50 rounded-xl p-3">
              <p className="text-[10px] font-bold text-muted-foreground mb-1">Recomendado para esta planta</p>
              <p className="text-sm font-bold text-foreground">{plant.careInfo.waterAmount} • {plant.careInfo.waterFrequency}</p>
            </div>
          )}
          {actionType === "fertilize" && (
            <div className="bg-secondary/50 rounded-xl p-3">
              <p className="text-[10px] font-bold text-muted-foreground mb-1">Adubo recomendado</p>
              <p className="text-sm font-bold text-foreground">{plant.careInfo.fertilizerType}</p>
              <p className="text-xs text-muted-foreground">{plant.careInfo.fertilizerFrequency}</p>
            </div>
          )}
          {actionType === "prune" && (
            <div className="bg-secondary/50 rounded-xl p-3">
              <p className="text-[10px] font-bold text-muted-foreground mb-1">Dica de poda</p>
              <p className="text-sm font-bold text-foreground">{plant.careInfo.pruningTips}</p>
            </div>
          )}
          {actionType === "sun" && (
            <div className="bg-secondary/50 rounded-xl p-3">
              <p className="text-[10px] font-bold text-muted-foreground mb-1">Luz ideal</p>
              <p className="text-sm font-bold text-foreground">{plant.careInfo.sunHoursPerDay} de {plant.careInfo.sunlight}</p>
            </div>
          )}

          {/* Form fields */}
          {config.fields.map((field) => {
            const fieldInfo = FIELD_LABELS[field];
            if (field === "note") {
              return (
                <div key={field}>
                  <label className="text-xs font-bold text-foreground mb-1.5 block">{fieldInfo.label}</label>
                  <Textarea
                    placeholder={fieldInfo.placeholder}
                    value={formData[field] || ""}
                    onChange={(e) => setFormData((p) => ({ ...p, [field]: e.target.value }))}
                    className="min-h-[70px] text-sm rounded-xl"
                  />
                </div>
              );
            }
            return (
              <div key={field}>
                <label className="text-xs font-bold text-foreground mb-1.5 block">{fieldInfo.label}</label>
                <Input
                  placeholder={fieldInfo.placeholder}
                  value={formData[field] || ""}
                  onChange={(e) => setFormData((p) => ({ ...p, [field]: e.target.value }))}
                  className="rounded-xl"
                />
              </div>
            );
          })}
        </div>

        <DrawerFooter>
          <Button onClick={handleConfirm} className="rounded-xl h-12 text-base font-bold">
            {TASK_ICONS[actionType]} Registrar {TASK_LABELS[actionType].toLowerCase()}
          </Button>
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="rounded-xl">
            Cancelar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CareActionSheet;
