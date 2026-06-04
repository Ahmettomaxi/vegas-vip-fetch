import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/app/TopBar";
import { Bell, Check, Crown, Gift, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_app/notifications")({
  head: () => ({ meta: [{ title: "Bildirimler — Vegasslot City" }] }),
  component: NotificationsPage,
});

const ITEMS = [
  { icon: Sparkles, title: "Checkpoint Açıldı", body: "Gün 6 checkpoint'ine ulaştın. Ödülünü topla.", time: "2 saat önce", unread: true },
  { icon: Gift,     title: "Ödül Hazır",        body: "50 Freespin ödülün hesabına eklendi.",         time: "Dün",         unread: true },
  { icon: Crown,    title: "Yeni Tier",         body: "Aylık ilerlemen Silver seviyesine yaklaşıyor.", time: "2 gün önce",  unread: true },
  { icon: Bell,     title: "Hatırlatma",        body: "Bugünkü görevini tamamlamayı unutma.",         time: "3 gün önce",  unread: false },
  { icon: Check,    title: "Görev Tamamlandı",  body: "Haftalık görev: 5 gün üst üste giriş yap.",     time: "5 gün önce",  unread: false },
];

function NotificationsPage() {
  return (
    <div>
      <PageTitle title="Bildirim Merkezi" subtitle="Şehirdeki tüm hareketler ve ödüller burada." />
      <div className="glass rounded-2xl divide-y divide-white/5">
        {ITEMS.map((n, i) => (
          <div key={i} className="flex gap-4 p-4 items-start">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${n.unread ? "bg-gradient-gold-button text-[color:var(--color-gold-foreground)] shadow-gold" : "glass text-muted-foreground"}`}>
              <n.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="font-display text-gold text-sm">{n.title}</div>
                {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-destructive" />}
              </div>
              <div className="text-sm text-muted-foreground">{n.body}</div>
              <div className="text-[10px] text-muted-foreground mt-1">{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
