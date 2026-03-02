import { useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TASK_ICONS, TASK_LABELS } from "@/data/plants";
import type { Plant, PreActionCheck } from "@/data/plants";
import { Check, AlertTriangle, ChevronRight } from "lucide-react";

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

const FIELD_LABELS: Record<string, { label: string; placeholder: string }> = {
  amount: { label: "Quantidade", placeholder: "Ex: 200ml, 1 copo" },
  duration: { label: "Duração", placeholder: "Ex: 30 min, 2 horas" },
  fertilizerType: { label: "Tipo de adubo", placeholder: "Ex: NPK 10-10-10" },
  pruningArea: { label: "Área podada", placeholder: "Ex: Galhos secos, folhas amarelas" },
  newPotSize: { label: "Novo vaso", placeholder: "Ex: Vaso 20cm, 5 litros" },
  harvestAmount: { label: "Quantidade colhida", placeholder: "Ex: 10 folhas, 1 ramo" },
  note: { label: "Observação", placeholder: "Como estava a planta? Algo diferente?" },
};

const ACTION_FIELDS: Record<ActionType, string[]> = {
  water: ["amount", "note"],
  spray: ["duration", "note"],
  fertilize: ["fertilizerType", "amount", "note"],
  prune: ["pruningArea", "note"],
  harvest: ["harvestAmount", "note"],
  repot: ["newPotSize", "note"],
  sun: ["duration", "note"],
};

const MOISTURE_LABELS: Record<string, { label: string; color: string }> = {
  seco: { label: "🏜️ Solo deve estar seco", color: "text-warning" },
  "levemente úmido": { label: "💧 Solo levemente úmido", color: "text-primary" },
  úmido: { label: "💦 Solo deve estar úmido", color: "text-primary" },
  encharcado: { label: "🌊 Solo bem úmido", color: "text-primary" },
};

const CareActionSheet = ({ open, onOpenChange, actionType, plant, onConfirm }: CareActionSheetProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [step, setStep] = useState<"checks" | "form">("checks");

  const preChecks = plant.careInfo.preChecks[actionType] || [];
  const smart = plant.careInfo.smartConditions;
  const fields = ACTION_FIELDS[actionType];
  const hasChecks = preChecks.length > 0;
  const criticalChecks = preChecks.filter(c => c.critical);
  const allCriticalChecked = criticalChecks.every(c => checkedItems[c.id]);

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
    setCheckedItems({});
    setStep("checks");
    onOpenChange(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setStep("checks");
      setCheckedItems({});
    }
    onOpenChange(open);
  };

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
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

        <div className="px-4 pb-2 space-y-3 max-h-[60vh] overflow-y-auto">
          {/* Step 1: Pre-checks */}
          {step === "checks" && hasChecks && (
            <>
              {/* Smart watering info for water action */}
              {actionType === "water" && (
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-3 space-y-2">
                  <p className="text-xs font-bold text-primary flex items-center gap-1.5">
                    🧠 Condições inteligentes para {plant.name}
                  </p>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground">Solo ideal</span>
                      <span className={`text-[11px] font-bold ${MOISTURE_LABELS[smart.soilMoisturePreference]?.color}`}>
                        {MOISTURE_LABELS[smart.soilMoisturePreference]?.label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground">Método</span>
                      <span className="text-[11px] font-bold text-foreground capitalize">{smart.wateringMethod}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground">Checar profundidade</span>
                      <span className="text-[11px] font-bold text-foreground">{smart.soilCheckDepth}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground">Melhor horário</span>
                      <span className="text-[11px] font-bold text-foreground">{smart.bestTimeToWater}</span>
                    </div>
                    {smart.sensitiveToOverwatering && (
                      <div className="flex items-center gap-1.5 mt-1">
                        <AlertTriangle size={11} className="text-warning" />
                        <span className="text-[10px] font-bold text-warning">Sensível a excesso de água!</span>
                      </div>
                    )}
                    {smart.sensitiveToUnderwatering && (
                      <div className="flex items-center gap-1.5 mt-1">
                        <AlertTriangle size={11} className="text-destructive" />
                        <span className="text-[10px] font-bold text-destructive">Não pode ficar sem água!</span>
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground italic mt-1">{smart.wateringMethodTip}</p>
                </div>
              )}

              {/* Watering method tip for non-water actions */}
              {actionType === "spray" && smart.mistingNeeded && (
                <div className="bg-success/5 border border-success/10 rounded-xl p-3">
                  <p className="text-xs font-bold text-success">✅ Borrifação recomendada</p>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {smart.mistingFrequency || "Borrifar regularmente ajuda esta planta."}
                  </p>
                </div>
              )}
              {actionType === "spray" && !smart.mistingNeeded && (
                <div className="bg-warning/5 border border-warning/10 rounded-xl p-3">
                  <p className="text-xs font-bold text-warning">⚠️ Borrifação não necessária</p>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Esta planta não precisa de borrifação regular. Pode até ser prejudicial.
                  </p>
                </div>
              )}

              {/* Leaf sensitivity warning */}
              {actionType === "water" && smart.leafWettingSensitive && (
                <div className="bg-warning/8 border border-warning/15 rounded-xl p-2.5 flex items-start gap-2">
                  <AlertTriangle size={14} className="text-warning flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-bold text-warning">Evitar molhar as folhas</p>
                    <p className="text-[10px] text-muted-foreground">Água nas folhas pode causar manchas ou fungos nesta planta.</p>
                  </div>
                </div>
              )}

              {/* Pre-action checklist */}
              <div>
                <p className="text-xs font-bold text-foreground mb-2">📋 Verifique antes de prosseguir</p>
                <div className="space-y-2">
                  {preChecks.map((check) => (
                    <button
                      key={check.id}
                      onClick={() => toggleCheck(check.id)}
                      className={`w-full text-left rounded-xl p-3 transition-all duration-200 border ${
                        checkedItems[check.id]
                          ? "bg-success/10 border-success/20"
                          : check.critical
                            ? "bg-destructive/5 border-destructive/15"
                            : "bg-card border-border"
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                          checkedItems[check.id] ? "bg-success text-success-foreground" : "bg-secondary"
                        }`}>
                          {checkedItems[check.id] ? <Check size={14} /> : <span className="text-sm">{check.icon}</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className={`text-xs font-bold ${checkedItems[check.id] ? "text-success line-through" : "text-foreground"}`}>
                              {check.label}
                            </p>
                            {check.critical && !checkedItems[check.id] && (
                              <span className="text-[8px] font-bold bg-destructive/15 text-destructive px-1.5 py-0.5 rounded-full">
                                Obrigatório
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{check.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Root info */}
              {(actionType === "water" || actionType === "repot") && (
                <div className="bg-secondary/50 rounded-xl p-2.5">
                  <p className="text-[10px] font-bold text-muted-foreground">🌱 Tipo de raiz</p>
                  <p className="text-xs font-bold text-foreground mt-0.5">{smart.rootType}</p>
                </div>
              )}
            </>
          )}

          {/* Step 2: Form */}
          {(step === "form" || !hasChecks) && (
            <>
              {/* Recommended values */}
              {actionType === "water" && (
                <div className="bg-secondary/50 rounded-xl p-3">
                  <p className="text-[10px] font-bold text-muted-foreground mb-1">Recomendado para esta planta</p>
                  <p className="text-sm font-bold text-foreground">{plant.careInfo.waterAmount} • {plant.careInfo.waterFrequency}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Método: {smart.wateringMethod} • Horário: {smart.bestTimeToWater}</p>
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
              {fields.map((field) => {
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
            </>
          )}
        </div>

        <DrawerFooter>
          {step === "checks" && hasChecks ? (
            <>
              <Button
                onClick={() => setStep("form")}
                disabled={!allCriticalChecked}
                className="rounded-xl h-12 text-base font-bold"
              >
                Continuar <ChevronRight size={18} className="ml-1" />
              </Button>
              {!allCriticalChecked && (
                <p className="text-[10px] text-center text-muted-foreground">
                  Marque os itens obrigatórios para continuar
                </p>
              )}
            </>
          ) : (
            <Button onClick={handleConfirm} className="rounded-xl h-12 text-base font-bold">
              {TASK_ICONS[actionType]} Registrar {TASK_LABELS[actionType].toLowerCase()}
            </Button>
          )}
          <Button variant="ghost" onClick={() => handleOpenChange(false)} className="rounded-xl">
            Cancelar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CareActionSheet;
