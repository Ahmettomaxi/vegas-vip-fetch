import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/app/TopBar";
import { useState } from "react";
import { Crown, Medal } from "lucide-react";

export const Route = createFileRoute("/_app/leaderboard")({
  head: () => ({ meta: [{ title: "Sıralama — Vegasslot City" }] }),
  component: LeaderboardPage,
});

const TABS = ["Günlük", "Haftalık", "Aylık", "Tüm Zamanlar"] as const;

const ROWS = [
  { rank: 1, name: "Ca****81", vip: 5, streak: 12, rewards: 18 },
  { rank: 2, name: "Me****27", vip: 4, streak: 9,  rewards: 14 },
  { rank: 3, name: "Ah****95", vip: 3, streak: 4,  rewards: 6,  me: true },
  { rank: 4, name: "Lu****72", vip: 4, streak: 7,  rewards: 11 },
  { rank: 5, name: "Sp****45", vip: 3, streak: 5,  rewards: 8 },
  { rank: 6, name: "Yo****33", vip: 3, streak: 3,  rewards: 7 },
  { rank: 7, name: "Fa****18", vip: 2, streak: 2,  rewards: 5 },
  { rank: 8, name: "Ke****09", vip: 2, streak: 2,  rewards: 4 },
];

function LeaderboardPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Aylık");

  return (
    <div>
      <PageTitle title="Sıralama" subtitle="Kullanıcı adları gizliliğini korumak için maskelenir. Finansal veriler gösterilmez." />

      <div className="glass rounded-2xl p-1 inline-flex gap-1 mb-4">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-xs font-display uppercase tracking-widest transition ${
              tab === t ? "bg-gradient-gold-button text-[color:var(--color-gold-foreground)] shadow-gold" : "text-muted-foreground hover:text-gold"
            }`}
          >{t}</button>
        ))}
      </div>

      {/* Podium */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[ROWS[1], ROWS[0], ROWS[2]].map((p, idx) => (
          <div key={p.rank} className={`glass rounded-2xl p-4 text-center relative ${idx === 1 ? "-mt-2 ring-gold" : ""}`}>
            <div className={`mx-auto w-14 h-14 rounded-full flex items-center justify-center ${
              p.rank === 1 ? "bg-gradient-gold-button text-[color:var(--color-gold-foreground)] shadow-gold" :
              p.rank === 2 ? "bg-slate-400/30 text-slate-200" :
                              "bg-amber-700/30 text-amber-300"
            }`}>
              {p.rank === 1 ? <Crown className="w-6 h-6" /> : <Medal className="w-6 h-6" />}
            </div>
            <div className="font-display text-gold mt-2">{p.name}</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">VIP {p.vip} • #{p.rank}</div>
            <div className="mt-2 text-xs text-gold">{p.rewards} ödül</div>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground border-b border-white/5">
          <div className="col-span-1">#</div>
          <div className="col-span-5">Oyuncu</div>
          <div className="col-span-2 text-center">VIP</div>
          <div className="col-span-2 text-center">Seri</div>
          <div className="col-span-2 text-right">Ödüller</div>
        </div>
        {ROWS.map((r) => (
          <div key={r.rank} className={`grid grid-cols-12 px-4 py-3 items-center border-b border-white/5 text-sm ${r.me ? "bg-gradient-purple/30" : ""}`}>
            <div className="col-span-1 font-display text-gold">{r.rank}</div>
            <div className="col-span-5">{r.name}{r.me && <span className="ml-2 text-[10px] text-gold">SEN</span>}</div>
            <div className="col-span-2 text-center text-muted-foreground">VIP {r.vip}</div>
            <div className="col-span-2 text-center text-muted-foreground">{r.streak} gün</div>
            <div className="col-span-2 text-right text-gold">{r.rewards}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
