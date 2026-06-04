import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/app/TopBar";
import chestImg from "@/assets/chest.png";
import { Check } from "lucide-react";
import { useSession } from "@/lib/session";

export const Route = createFileRoute("/_app/monthly")({
  head: () => ({ meta: [{ title: "Aylık Büyük Ödül — Vegasslot City" }] }),
  component: MonthlyPage,
});

const TIERS = [
  { name: "Bronze",  required: 10, reward: "100 Freespin",   color: "from-amber-700 to-amber-900" },
  { name: "Silver",  required: 18, reward: "250 Freespin",   color: "from-slate-300 to-slate-500" },
  { name: "Gold",    required: 25, reward: "500 Freespin",   color: "from-yellow-400 to-yellow-700" },
  { name: "Diamond", required: 31, reward: "1000 Freespin + Mystery", color: "from-cyan-200 to-purple-500" },
];

function MonthlyPage() {
  const { session } = useSession();
  const completed = session.completedDays.length;
  const monthlyPct = Math.round((completed / 31) * 100);
  const currentTier = TIERS.slice().reverse().find((t) => completed >= t.required) ?? null;

  return (
    <div>
      <PageTitle title="Aylık Büyük Ödül" subtitle="31 günü tamamla, Royal Palace'ta seni bekleyen büyük ödülü kazan." />
      <div className="glass rounded-3xl p-6 md:p-8 mb-6 grid md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Aylık İlerleme</div>
          <div className="font-display text-4xl text-gold mt-1">{completed} / 31 Gün</div>
          <div className="mt-4 h-3 rounded-full bg-black/60 overflow-hidden border border-white/5">
            <div className="h-full bg-gradient-gold-button shimmer" style={{ width: `${monthlyPct}%` }} />
          </div>
          <div className="mt-2 text-xs text-muted-foreground">Bulunduğun seviye: <span className="text-gold font-display">{currentTier?.name ?? "Henüz yok"}</span></div>
        </div>
        <div className="relative">
          <img src={chestImg} alt="" className="w-44 mx-auto animate-float drop-shadow-[0_20px_40px_oklch(0.85_0.17_88/0.4)]" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TIERS.map((t) => {
          const unlocked = completed >= t.required;
          return (
            <div key={t.name} className={`glass rounded-2xl p-5 relative ${unlocked ? "ring-gold" : "opacity-80"}`}>
              <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-b ${t.color} shadow-card flex items-center justify-center`}>
                <span className="font-display text-white text-lg">{t.name[0]}</span>
              </div>
              <div className="text-center mt-3 font-display text-gold text-xl">{t.name}</div>
              <div className="text-center text-xs text-muted-foreground">{t.required} gün tamamla</div>
              <div className="text-center mt-2 text-sm text-gold">{t.reward}</div>
              <div className={`mt-3 text-center text-[10px] uppercase tracking-widest ${unlocked ? "text-emerald-400" : "text-muted-foreground"}`}>
                {unlocked ? <span className="inline-flex items-center gap-1"><Check className="w-3 h-3" /> Açıldı</span> : "Kilitli"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
