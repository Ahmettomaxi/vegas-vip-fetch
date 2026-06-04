import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/app/TopBar";
import { useSession } from "@/lib/session";
import { CHECKPOINTS } from "@/components/city/checkpoints";
import chestImg from "@/assets/chest.png";
import { Check, Lock, X, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_app/rewards")({
  head: () => ({ meta: [{ title: "Ödüller — Vegasslot City" }] }),
  component: RewardsPage,
});

type ChestState = "claimed" | "available" | "locked" | "expired";

function stateFor(day: number, currentDay: number, completed: number[], claimed: number[]): ChestState {
  if (claimed.includes(day)) return "claimed";
  if (completed.includes(day)) return "available";
  if (day < currentDay) return "expired";
  return "locked";
}

export function RewardsPage() {
  const { session, claim } = useSession();
  return (
    <div>
      <PageTitle title="Ödül Sandıkları" subtitle="Her checkpoint için kazandığın ödülleri buradan topla." />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {CHECKPOINTS.map((cp) => {
          const st = stateFor(cp.day, session.currentDay, session.completedDays, session.claimedDays);
          return <ChestCard key={cp.day} day={cp.day} reward={cp.reward ?? "—"} milestone={cp.isMilestone} state={st} onClaim={() => claim(cp.day)} />;
        })}
      </div>
    </div>
  );
}

function ChestCard({ day, reward, milestone, state, onClaim }: { day: number; reward: string; milestone?: boolean; state: ChestState; onClaim: () => void }) {
  const styles: Record<ChestState, { ring: string; label: string; icon: any; color: string; cta?: string }> = {
    claimed:   { ring: "border-emerald-500/40",                label: "Alındı",     icon: Check,    color: "text-emerald-400" },
    available: { ring: "border-[color:var(--color-gold)] ring-gold", label: "Hazır",      icon: Sparkles, color: "text-gold", cta: "Ödülü Al" },
    locked:    { ring: "border-white/10",                       label: "Kilitli",    icon: Lock,     color: "text-muted-foreground" },
    expired:   { ring: "border-destructive/40",                 label: "Süresi Doldu", icon: X,      color: "text-destructive" },
  };
  const s = styles[state];
  const Icon = s.icon;
  return (
    <div className={`glass rounded-2xl p-4 border-2 ${s.ring} relative`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Gün {day}{milestone && " • Milestone"}</div>
        <div className={`inline-flex items-center gap-1 text-[10px] ${s.color}`}><Icon className="w-3 h-3" />{s.label}</div>
      </div>
      <img src={chestImg} alt="" className={`w-24 mx-auto ${state === "locked" || state === "expired" ? "grayscale opacity-50" : "animate-float"}`} />
      <div className="text-center mt-2 font-display text-gold text-lg">{reward}</div>
      {state === "available" && (
        <button onClick={onClaim} className="mt-3 w-full px-3 py-2 rounded-lg bg-gradient-gold-button text-[color:var(--color-gold-foreground)] font-display uppercase tracking-widest text-xs shadow-gold">
          {s.cta}
        </button>
      )}
    </div>
  );
}
