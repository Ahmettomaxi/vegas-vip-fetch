import { Link } from "@tanstack/react-router";
import { Home, Map, Gift, Trophy, ListChecks, User, Bell, Settings, LogOut, ScrollText, Crown } from "lucide-react";
import { useSession } from "@/lib/session";
import hostImg from "@/assets/host-character.png";

const NAV = [
  { to: "/city", icon: Map, label: "Şehir" },
  { to: "/missions", icon: ListChecks, label: "Görevler" },
  { to: "/rewards", icon: Gift, label: "Ödüller" },
  { to: "/monthly", icon: Crown, label: "Aylık Ödül" },
  { to: "/leaderboard", icon: Trophy, label: "Sıralama" },
  { to: "/profile", icon: User, label: "Profil" },
  { to: "/notifications", icon: Bell, label: "Bildirimler" },
  { to: "/how", icon: ScrollText, label: "Nasıl Çalışır" },
  { to: "/settings", icon: Settings, label: "Ayarlar" },
] as const;

export function AppSidebar() {
  const { session, exitCity } = useSession();
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 glass rounded-2xl p-4 gap-1 h-[calc(100vh-2rem)] sticky top-4">
      <div className="flex items-center gap-3 px-2 py-3 border-b border-[color:var(--color-gold)]/20 mb-3">
        <div className="relative w-12 h-12 rounded-full bg-gradient-purple ring-gold overflow-hidden flex items-center justify-center">
          <img src={hostImg} alt="" className="w-14 translate-y-1" />
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Hoşgeldin</div>
          <div className="font-display text-gold text-sm">{session.username}</div>
          <div className="text-[10px] text-muted-foreground">VIP Seviye {session.vipLevel}</div>
        </div>
      </div>

      {NAV.map((n) => (
        <Link
          key={n.to}
          to={n.to}
          activeProps={{ className: "bg-gradient-purple text-white border-[color:var(--color-gold)]/60 shadow-purple" }}
          inactiveProps={{ className: "text-muted-foreground hover:text-gold hover:bg-white/5" }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-transparent text-sm font-medium transition"
        >
          <n.icon className="w-4 h-4" />
          <span>{n.label}</span>
        </Link>
      ))}

      <button
        onClick={exitCity}
        className="mt-auto flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-destructive hover:bg-white/5"
      >
        <LogOut className="w-4 h-4" />
        <span>Şehirden Çık</span>
      </button>
    </aside>
  );
}

const MOBILE_NAV = [
  { to: "/city", icon: Home, label: "Şehir" },
  { to: "/missions", icon: ListChecks, label: "Görev" },
  { to: "/rewards", icon: Gift, label: "Ödül" },
  { to: "/leaderboard", icon: Trophy, label: "Sıra" },
  { to: "/profile", icon: User, label: "Profil" },
] as const;

export function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 glass rounded-t-2xl rounded-b-none px-1 py-2 flex justify-around pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      {MOBILE_NAV.map((it) => (
        <Link
          key={it.to}
          to={it.to}
          activeProps={{ className: "text-gold" }}
          inactiveProps={{ className: "text-muted-foreground" }}
          className="flex flex-col items-center gap-0.5 px-3 py-1.5"
        >
          <it.icon className="w-5 h-5" />
          <span className="text-[10px] uppercase tracking-widest">{it.label}</span>
        </Link>
      ))}
    </nav>
  );
}
