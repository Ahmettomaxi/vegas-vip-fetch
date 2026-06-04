import { Gift, Trophy, ListChecks, ScrollText, User } from "lucide-react";

const ITEMS = [
  { icon: ListChecks, label: "Görevler" },
  { icon: Gift, label: "Ödüller" },
  { icon: Trophy, label: "Sıralama" },
  { icon: ScrollText, label: "Nasıl Çalışır" },
  { icon: User, label: "Profil" },
];

export function SideNav() {
  return (
    <div className="hidden md:flex flex-col gap-3">
      {ITEMS.map((it) => (
        <button
          key={it.label}
          className="group w-14 h-14 rounded-2xl glass flex items-center justify-center hover:scale-105 hover:ring-gold transition relative"
          title={it.label}
        >
          <it.icon className="w-6 h-6 text-gold" />
          <span className="absolute right-full mr-2 px-2 py-1 rounded bg-black/80 text-[10px] uppercase tracking-widest text-gold opacity-0 group-hover:opacity-100 whitespace-nowrap">
            {it.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export function MobileBottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 glass rounded-t-2xl rounded-b-none border-b-0 px-2 py-2 flex justify-around">
      {[
        { icon: ListChecks, label: "Görevler" },
        { icon: Gift, label: "Ödüller" },
        { icon: Trophy, label: "Sıralama" },
        { icon: User, label: "Profil" },
      ].map((it) => (
        <button key={it.label} className="flex flex-col items-center gap-1 px-3 py-1 text-gold/90">
          <it.icon className="w-5 h-5" />
          <span className="text-[10px] uppercase tracking-widest">{it.label}</span>
        </button>
      ))}
    </nav>
  );
}
