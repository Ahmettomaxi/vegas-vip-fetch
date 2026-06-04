import { Link, useLocation } from "@tanstack/react-router";
import { Bell, Menu } from "lucide-react";
import { useSession } from "@/lib/session";
import logoImg from "@/assets/logo.png";

export function TopBar() {
  const { session } = useSession();
  const loc = useLocation();
  return (
    <header className="flex items-center justify-between gap-3 mb-4">
      <Link to="/city" className="flex items-center gap-3">
        <img src={logoImg} alt="Vegasslot City" className="h-10 md:h-14" />
      </Link>
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex flex-col items-end mr-2">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Hoşgeldin</span>
          <span className="font-display text-gold text-sm">{session.username}</span>
        </div>
        <Link
          to="/notifications"
          className="relative w-10 h-10 rounded-xl glass flex items-center justify-center text-gold hover:scale-105 transition"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-[10px] text-white flex items-center justify-center">3</span>
        </Link>
        <Link
          to="/profile"
          activeProps={{ className: "ring-gold" }}
          className="lg:hidden w-10 h-10 rounded-xl glass flex items-center justify-center text-gold"
          aria-label="Menü"
        >
          <Menu className="w-4 h-4" />
        </Link>
      </div>
    </header>
  );
}

export function PageTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-5">
      <h1 className="font-display text-2xl md:text-3xl text-gold">{title}</h1>
      {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  );
}
