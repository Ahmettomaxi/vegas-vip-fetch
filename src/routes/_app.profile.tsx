import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/app/TopBar";
import { useSession } from "@/lib/session";
import hostImg from "@/assets/host-character.png";
import { Calendar, Flame, Gift, Trophy } from "lucide-react";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({ meta: [{ title: "Profil — Vegasslot City" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { session } = useSession();
  const completed = session.completedDays.length;
  const monthlyPct = Math.round((completed / 31) * 100);
  const xp = 750, xpMax = 1500;

  return (
    <div>
      <PageTitle title="Profil" subtitle="İlerlemen, başarıların ve VIP durumun. Finansal bilgi gösterilmez." />

      <div className="glass rounded-3xl p-6 mb-5 grid md:grid-cols-[auto_1fr_auto] gap-6 items-center">
        <div className="relative w-24 h-24 rounded-full bg-gradient-purple ring-gold overflow-hidden flex items-center justify-center">
          <img src={hostImg} alt="" className="w-28 translate-y-2" />
        </div>
        <div>
          <div className="font-display text-2xl text-gold">{session.username}</div>
          <div className="text-xs text-muted-foreground">VIP Seviye {session.vipLevel}</div>
          <div className="mt-3 h-2 rounded-full bg-black/60 overflow-hidden max-w-xs">
            <div className="h-full bg-gradient-purple" style={{ width: `${(xp / xpMax) * 100}%` }} />
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">{xp} / {xpMax} XP — sonraki seviye</div>
        </div>
        <div className="flex gap-2">
          <Stat icon={Calendar} label="Gün" value={`${session.currentDay}`} />
          <Stat icon={Flame} label="Seri" value={`${session.streak}`} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <BigStat label="Tamamlanan Günler" value={`${completed} / 31`} />
        <BigStat label="Aylık İlerleme" value={`${monthlyPct}%`} />
        <BigStat label="Toplanan Ödüller" value={`${session.claimedDays.length}`} />
        <BigStat label="Kaçırılan Günler" value={`${session.missedDays.length}`} accent="destructive" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-5">
          <div className="font-display text-gold mb-3 inline-flex items-center gap-2"><Trophy className="w-4 h-4" /> Başarılar</div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "İlk Adım", on: true },
              { label: "3 Gün Serisi", on: true },
              { label: "Golden Bulvarı", on: true },
              { label: "Jackpot Square", on: false },
              { label: "Diamond", on: false },
              { label: "Royal Palace", on: false },
            ].map((b, i) => (
              <div key={i} className={`rounded-xl p-3 text-center text-xs border ${b.on ? "bg-gradient-gold-button text-[color:var(--color-gold-foreground)] border-[color:var(--color-gold)] shadow-gold" : "glass text-muted-foreground"}`}>
                {b.label}
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="font-display text-gold mb-3 inline-flex items-center gap-2"><Gift className="w-4 h-4" /> Son Ödüller</div>
          <ul className="divide-y divide-white/5">
            {[
              { d: 6, r: "50 FS" }, { d: 5, r: "Sandık" }, { d: 4, r: "50 FS" }, { d: 3, r: "50 FS" },
            ].map((x) => (
              <li key={x.d} className="flex justify-between py-2 text-sm">
                <span className="text-muted-foreground">Gün {x.d}</span>
                <span className="text-gold font-display">{x.r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="glass rounded-xl px-3 py-2 text-center min-w-[70px]">
      <Icon className="w-4 h-4 mx-auto text-gold" />
      <div className="font-display text-gold">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}
function BigStat({ label, value, accent }: { label: string; value: string; accent?: "destructive" }) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={`font-display text-2xl ${accent === "destructive" ? "text-destructive" : "text-gold"}`}>{value}</div>
    </div>
  );
}
