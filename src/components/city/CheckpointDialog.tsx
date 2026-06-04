import { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import chestImg from "@/assets/chest.png";
import type { CheckpointState } from "./checkpoints";
import { Lock, Check, X, Sparkles } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  day: number | null;
  state: CheckpointState | null;
  reward?: string;
  isMilestone?: boolean;
  district: string;
  claimed: boolean;
  onClaim: () => void;
}

export function CheckpointDialog({
  open, onOpenChange, day, state, reward, isMilestone, district, claimed, onClaim,
}: Props) {
  if (day == null || state == null) return null;

  const meta = {
    completed: { label: "Tamamlandı", color: "text-emerald-400", Icon: Check },
    current:   { label: "Aktif Gün",  color: "text-gold",        Icon: Sparkles },
    available: { label: "Açılabilir", color: "text-gold",        Icon: Sparkles },
    locked:    { label: "Kilitli",    color: "text-muted-foreground", Icon: Lock },
    missed:    { label: "Kaçırıldı",  color: "text-destructive",      Icon: X },
  }[state];

  const Icon = meta.Icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-[color:var(--color-gold)]/40 max-w-md">
        <DialogHeader>
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold/80">{district}</div>
          <DialogTitle className="font-display text-2xl text-gold flex items-center gap-2">
            Gün {day} <span className={`inline-flex items-center gap-1 text-xs font-sans normal-case ${meta.color}`}>
              <Icon className="w-3.5 h-3.5" /> {meta.label}
            </span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {isMilestone ? "Bu bir milestone checkpoint! Büyük ödül seni bekliyor." : "Günlük checkpoint ödülü."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center py-4">
          <div className="relative">
            <div className="absolute inset-0 bg-[radial-gradient(closest-side,oklch(0.85_0.17_88/0.45),transparent)] blur-2xl" />
            <img src={chestImg} alt="" className={`relative w-40 ${state === "locked" || state === "missed" ? "grayscale opacity-50" : "animate-float"}`} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="glass rounded-xl p-3">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Ödül</div>
            <div className="font-display text-gold text-lg">{reward ?? "—"}</div>
          </div>
          <div className="glass rounded-xl p-3">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Tür</div>
            <div className="font-display text-gold text-lg">{isMilestone ? "Sandık" : "Free Spin"}</div>
          </div>
        </div>

        <DialogFooter className="mt-3">
          {state === "completed" && (
            <button
              onClick={onClaim}
              disabled={claimed}
              className="w-full px-5 py-3 rounded-xl bg-gradient-gold-button text-[color:var(--color-gold-foreground)] font-display uppercase tracking-widest text-sm shadow-gold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {claimed ? "Ödül Alındı" : "Ödülü Al"}
            </button>
          )}
          {state === "current" && (
            <div className="w-full px-5 py-3 rounded-xl glass text-center font-display uppercase tracking-widest text-xs text-gold/90">
              Günlük yatırımını yap, checkpoint açılsın
            </div>
          )}
          {state === "locked" && (
            <div className="w-full px-5 py-3 rounded-xl glass text-center font-display uppercase tracking-widest text-xs text-muted-foreground">
              Bu checkpoint henüz kilitli
            </div>
          )}
          {state === "missed" && (
            <div className="w-full px-5 py-3 rounded-xl bg-destructive/20 text-center font-display uppercase tracking-widest text-xs text-destructive">
              Kaçırıldı — Kurtarılamaz
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function useCheckpointDialog() {
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState<number | null>(null);
  return { open, setOpen, day, setDay };
}
