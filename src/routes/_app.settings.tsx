import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/app/TopBar";
import { useSession } from "@/lib/session";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Ayarlar — Vegasslot City" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { exitCity } = useSession();
  const navigate = useNavigate();
  return (
    <div>
      <PageTitle title="Ayarlar" subtitle="Hesap ve bildirim tercihlerini yönet." />
      <div className="grid md:grid-cols-2 gap-4">
        <Card title="Bildirimler">
          <Toggle label="Günlük checkpoint hatırlatması" defaultOn />
          <Toggle label="Yeni ödül bildirimleri" defaultOn />
          <Toggle label="Aylık özet" />
          <Toggle label="Promosyon e-postaları" />
        </Card>
        <Card title="Görüntüleme">
          <Toggle label="Karakter animasyonları" defaultOn />
          <Toggle label="Harita havai fişekleri" defaultOn />
          <Toggle label="Düşük performans modu" />
        </Card>
        <Card title="Hesap">
          <Row label="Kullanıcı Adı" value="Ah****95" />
          <Row label="VIP Seviye" value="VIP 3" />
          <Row label="Üyelik" value="Aktif" />
        </Card>
        <Card title="Tehlikeli Bölge">
          <button
            onClick={() => { exitCity(); navigate({ to: "/" }); }}
            className="w-full px-4 py-3 rounded-xl bg-destructive/20 text-destructive font-display uppercase tracking-widest text-xs hover:bg-destructive/30"
          >
            Şehirden Çık
          </button>
        </Card>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="font-display text-gold mb-3">{title}</div>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}
function Toggle({ label, defaultOn }: { label: string; defaultOn?: boolean }) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm text-muted-foreground">{label}</span>
      <input type="checkbox" defaultChecked={defaultOn} className="peer sr-only" />
      <span className="relative w-10 h-6 rounded-full bg-black/60 peer-checked:bg-gradient-gold-button transition after:absolute after:top-0.5 after:left-0.5 after:w-5 after:h-5 after:rounded-full after:bg-white peer-checked:after:translate-x-4 after:transition" />
    </label>
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm py-1">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-gold font-display">{value}</span>
    </div>
  );
}
