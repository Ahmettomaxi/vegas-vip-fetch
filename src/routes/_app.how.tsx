import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/app/TopBar";
import hostImg from "@/assets/host-character.png";

export const Route = createFileRoute("/_app/how")({
  head: () => ({ meta: [{ title: "Nasıl Çalışır — Vegasslot City" }] }),
  component: HowPage,
});

const STEPS = [
  { n: 1, t: "Şehre Giriş", d: "Hesabın doğrulanır, karakterin şehrin başlangıcına yerleştirilir." },
  { n: 2, t: "Her Gün Yatırım", d: "Minimum günlük yatırımı tamamla — sıradaki checkpoint için sayaç açılır." },
  { n: 3, t: "Checkpoint'e Ulaş", d: "Bot doğrulaması yapılır ve checkpoint kilidi açılır." },
  { n: 4, t: "Ödülünü Topla", d: "Sandığı aç, ödülünü hesabına ekle. Her gün kaçırmamaya dikkat et." },
  { n: 5, t: "Ay Sonu Büyük Ödül", d: "31 günü tamamla, Royal Palace'taki büyük ödülü kazan." },
];

function HowPage() {
  return (
    <div>
      <PageTitle title="Nasıl Çalışır?" subtitle="Vegasslot City yolculuğunun beş adımı." />
      <div className="glass rounded-3xl p-6 md:p-8 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
        <ol className="flex flex-col gap-4">
          {STEPS.map((s) => (
            <li key={s.n} className="flex gap-4">
              <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-gold-button text-[color:var(--color-gold-foreground)] font-display flex items-center justify-center shadow-gold">{s.n}</div>
              <div>
                <div className="font-display text-gold">{s.t}</div>
                <div className="text-sm text-muted-foreground">{s.d}</div>
              </div>
            </li>
          ))}
        </ol>
        <img src={hostImg} alt="" className="w-64 hidden lg:block animate-float" />
      </div>
    </div>
  );
}
