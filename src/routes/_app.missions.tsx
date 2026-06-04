import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/app/TopBar";
import { Check, Clock, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_app/missions")({
  head: () => ({ meta: [{ title: "Görevler — Vegasslot City" }] }),
  component: MissionsPage,
});

const MISSIONS = [
  { type: "Günlük", title: "Günlük yatırımını yap", progress: 1, total: 1, reward: "50 FS", done: true },
  { type: "Günlük", title: "3 farklı slot oyna",    progress: 2, total: 3, reward: "25 FS", done: false },
  { type: "Haftalık", title: "5 gün üst üste giriş yap", progress: 4, total: 5, reward: "200 FS", done: false },
  { type: "Haftalık", title: "Haftada 3 checkpoint geç", progress: 3, total: 3, reward: "Mystery Box", done: true },
  { type: "Aylık", title: "Tüm milestone checkpointleri aç", progress: 2, total: 6, reward: "VIP Yükseltme", done: false },
  { type: "Özel", title: "Diamond District'e ulaş", progress: 0, total: 1, reward: "Turnuva Bileti", done: false },
];

function MissionsPage() {
  return (
    <div>
      <PageTitle title="Görevler" subtitle="Günlük, haftalık, aylık ve özel görevleri tamamla, ekstra ödüller kazan." />
      <div className="grid md:grid-cols-2 gap-3">
        {MISSIONS.map((m, i) => {
          const pct = Math.round((m.progress / m.total) * 100);
          return (
            <div key={i} className="glass rounded-2xl p-4 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${m.done ? "bg-emerald-500/20 text-emerald-400" : "bg-gradient-purple text-gold"}`}>
                {m.done ? <Check className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[10px] uppercase tracking-widest text-gold/80">{m.type}</div>
                  <div className="text-[10px] text-muted-foreground inline-flex items-center gap-1"><Clock className="w-3 h-3" />24s</div>
                </div>
                <div className="font-display text-gold text-sm">{m.title}</div>
                <div className="mt-2 h-1.5 rounded-full bg-black/60 overflow-hidden">
                  <div className={`h-full ${m.done ? "bg-emerald-500" : "bg-gradient-gold-button"}`} style={{ width: `${pct}%` }} />
                </div>
                <div className="flex items-center justify-between mt-1 text-[10px] text-muted-foreground">
                  <span>{m.progress}/{m.total}</span>
                  <span className="text-gold">Ödül: {m.reward}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
