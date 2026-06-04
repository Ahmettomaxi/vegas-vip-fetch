import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useSession } from "@/lib/session";
import { ChevronRight, Sparkles, Calendar, Trophy, Crown, Gift, Map, ShieldCheck } from "lucide-react";
import logoImg from "@/assets/logo.png";
import hostImg from "@/assets/host-character.png";
import chestImg from "@/assets/chest.png";
import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vegasslot City — Şansın Şehrindeki Yolculuğu" },
      { name: "description", content: "31 günlük lüks Vegas yolculuğu. Her gün checkpoint geç, ödülleri topla, aylık büyük ödülü kazan." },
      { property: "og:title", content: "Vegasslot City" },
      { property: "og:description", content: "Şansın şehrindeki premium yolculuk." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { entered, enterCity } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (entered) navigate({ to: "/city", replace: true });
  }, [entered, navigate]);

  const handleEnter = () => { enterCity(); navigate({ to: "/city" }); };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-[100svh] flex flex-col">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.10_0.04_285/0.6)_0%,oklch(0.10_0.04_285/0.35)_45%,oklch(0.08_0.04_285/0.95)_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(2px_2px_at_20%_30%,oklch(1_0_0/0.6),transparent),radial-gradient(1.5px_1.5px_at_70%_20%,oklch(1_0_0/0.4),transparent),radial-gradient(2px_2px_at_50%_80%,oklch(1_0_0/0.3),transparent)]" />

        <header className="relative z-10 flex items-center justify-between px-5 md:px-10 pt-5">
          <img src={logoImg} alt="Vegasslot City" className="h-14 md:h-20 drop-shadow-[0_6px_16px_rgba(0,0,0,0.7)]" />
          <button
            onClick={handleEnter}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-gold-button text-[color:var(--color-gold-foreground)] font-display uppercase tracking-widest text-xs shadow-gold hover:brightness-110 transition"
          >
            Şehre Gir <ChevronRight className="w-4 h-4" />
          </button>
        </header>

        <div className="relative z-10 flex-1 flex items-center px-5 md:px-10 py-10">
          <div className="grid md:grid-cols-2 gap-10 items-center w-full max-w-7xl mx-auto">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-5 text-[10px] uppercase tracking-[0.3em] text-gold">
                <Sparkles className="w-3 h-3" /> 31 Günlük Lüks Yolculuk
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-gold leading-[1.05]">
                Şansın <br/>Şehrindeki <br/>Yolculuğu
              </h1>
              <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-lg mx-auto md:mx-0">
                Altın Bulvarı'ndan Royal Palace'a uzanan 31 günlük premium retention macerası. Her gün bir checkpoint geç, ödülleri topla, ay sonunda büyük ödülü kazan.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <button
                  onClick={handleEnter}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-gradient-gold-button text-[color:var(--color-gold-foreground)] font-display uppercase tracking-widest text-sm shadow-gold hover:brightness-110 active:scale-[0.98] transition"
                >
                  Şehre Giriş Yap <ChevronRight className="w-4 h-4" />
                </button>
                <a
                  href="#nasil"
                  className="inline-flex items-center justify-center px-7 py-4 rounded-xl glass font-display uppercase tracking-widest text-sm text-gold hover:scale-[1.02] transition"
                >
                  Nasıl Çalışır
                </a>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-3 max-w-md mx-auto md:mx-0">
                <KpiPill label="Aktif Oyuncu" value="12.458" />
                <KpiPill label="Açılan Sandık" value="85.632" />
                <KpiPill label="Bu Ay Ödül" value="5.230" />
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="absolute -inset-10 bg-[radial-gradient(closest-side,oklch(0.85_0.17_88/0.35),transparent)]" />
              <img src={hostImg} alt="Vegasslot City Host" className="relative w-full max-w-md mx-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)] animate-float" />
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <Section title="Premium Casino Retention Ekosistemi" eyebrow="Vegasslot City">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Pillar icon={Calendar} title="Günlük Checkpoint" body="Her gün bir checkpoint açılır. Yatırımını yap, ilerlemeni kilitle." />
          <Pillar icon={Gift} title="Anında Ödüller" body="Free spin, bonus, mystery box ve VIP puanları seni bekliyor." />
          <Pillar icon={Crown} title="Aylık Büyük Ödül" body="31 günü tamamla, Bronze'dan Diamond'a yükselen büyük ödülü kazan." />
          <Pillar icon={Trophy} title="Liderlik Tablosu" body="Günlük, haftalık ve aylık sıralamada Royal Palace'a yüksel." />
        </div>
      </Section>

      {/* How it works */}
      <Section title="Nasıl Çalışır?" eyebrow="5 Basit Adım" id="nasil">
        <div className="grid md:grid-cols-5 gap-4">
          {[
            { n: 1, t: "Şehre Giriş", d: "Hesabın doğrulanır ve şehre adımını atarsın." },
            { n: 2, t: "Her Gün Yatırım", d: "Minimum günlük yatırımı tamamla." },
            { n: 3, t: "Checkpoint'e Ulaş", d: "Yatırımın bot tarafından doğrulanır." },
            { n: 4, t: "Ödülünü Topla", d: "Her gün açılan sandığı kaçırma." },
            { n: 5, t: "Aylık Büyük Ödül", d: "31 günü tamamla, Royal Palace seni bekliyor." },
          ].map((s) => (
            <div key={s.n} className="glass rounded-2xl p-5 relative">
              <div className="w-10 h-10 rounded-full bg-gradient-gold-button text-[color:var(--color-gold-foreground)] font-display flex items-center justify-center text-lg shadow-gold mb-3">
                {s.n}
              </div>
              <div className="font-display text-gold">{s.t}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.d}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Daily rewards preview */}
      <Section title="Günlük Ödüller" eyebrow="31 Gün Boyunca">
        <div className="grid grid-cols-7 sm:grid-cols-10 lg:grid-cols-16 gap-2">
          {Array.from({ length: 31 }).map((_, i) => {
            const d = i + 1;
            const milestone = [5, 10, 15, 20, 25, 31].includes(d);
            return (
              <div
                key={d}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center font-display text-xs border ${
                  milestone
                    ? "bg-gradient-gold-button text-[color:var(--color-gold-foreground)] border-[color:var(--color-gold)] shadow-gold"
                    : "glass text-gold/90 border-[color:var(--color-gold)]/30"
                }`}
              >
                <span>{d}</span>
                <span className="text-[8px] opacity-80">{milestone ? "ÖDÜL" : `${25 + (d % 4) * 25} FS`}</span>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Monthly grand */}
      <Section title="Aylık Büyük Ödül" eyebrow="Royal Palace'a Yüksel">
        <div className="glass rounded-3xl p-6 md:p-10 grid md:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <img src={chestImg} alt="Grand reward" className="w-full max-w-xs mx-auto animate-float drop-shadow-[0_20px_40px_oklch(0.85_0.17_88/0.4)]" />
          </div>
          <div>
            <h3 className="font-display text-3xl text-gold">31 Günü Tamamla, Büyük Ödülü Kazan</h3>
            <p className="mt-3 text-muted-foreground">
              Tier sistemi içinde Bronze, Silver, Gold ve Diamond seviyelerinden geç. Her seviye, daha lüks bir sandık ve daha büyük free spin ödülü demek.
            </p>
            <div className="mt-5 grid grid-cols-4 gap-2">
              {["Bronze", "Silver", "Gold", "Diamond"].map((t, i) => (
                <div key={t} className={`rounded-xl p-3 text-center border ${i === 2 ? "bg-gradient-gold-button text-[color:var(--color-gold-foreground)] border-[color:var(--color-gold)] shadow-gold" : "glass"}`}>
                  <div className="font-display text-xs">{t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section title="Sıkça Sorulan Sorular" eyebrow="FAQ">
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { q: "Şehre nasıl girerim?", a: "Hesabın doğrulandıktan sonra 'Şehre Giriş Yap' butonu ile yolculuğun başlar." },
            { q: "Kaçırdığım günler ne olur?", a: "Geçmiş günler kalıcı olarak kaybedilir, ancak ilerlemen kaldığın yerden devam eder." },
            { q: "Hangi ödülleri kazanabilirim?", a: "Free spin, bonus, cashback, mystery box, VIP puan ve aylık büyük ödül." },
            { q: "Aylık büyük ödül nedir?", a: "31 günü tamamlayan oyuncular için Bronze'dan Diamond'a uzanan tier ödülü." },
            { q: "Finansal bilgilerim görünür mü?", a: "Hayır. Vegasslot City sadece ilerlemeni ve ödüllerini gösterir." },
            { q: "Mobilden oynayabilir miyim?", a: "Evet — masaüstü, tablet ve mobil için optimize edilmiş bir deneyim." },
          ].map((f, i) => (
            <details key={i} className="glass rounded-2xl p-5 group">
              <summary className="cursor-pointer font-display text-gold flex items-center justify-between">
                {f.q}
                <ChevronRight className="w-4 h-4 transition group-open:rotate-90" />
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <section className="relative px-5 md:px-10 py-16">
        <div className="glass rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.85_0.17_88/0.15),transparent_70%)]" />
          <Map className="relative w-10 h-10 mx-auto text-gold mb-3" />
          <h2 className="relative font-display text-3xl md:text-4xl text-gold">Şehir Seni Bekliyor</h2>
          <p className="relative mt-3 text-muted-foreground">Karakterini Royal Palace'a ulaştırmaya hazır mısın?</p>
          <button
            onClick={handleEnter}
            className="relative mt-6 inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-gradient-gold-button text-[color:var(--color-gold-foreground)] font-display uppercase tracking-widest text-sm shadow-gold hover:brightness-110 transition"
          >
            Şehre Giriş Yap <ChevronRight className="w-4 h-4" />
          </button>
          <div className="relative mt-5 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
            <ShieldCheck className="w-3 h-3 text-gold" /> Güvenli giriş • Backend doğrulamalı session
          </div>
        </div>
      </section>

      <footer className="px-5 md:px-10 py-8 text-center text-xs text-muted-foreground">
        © Vegasslot City • Şansın Şehrindeki Yolculuğu
      </footer>
    </div>
  );
}

function KpiPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-xl px-3 py-2 text-center">
      <div className="font-display text-gold text-sm md:text-base">{value}</div>
      <div className="text-[9px] uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}

function Section({ title, eyebrow, children, id }: { title: string; eyebrow?: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="relative px-5 md:px-10 py-14 max-w-7xl mx-auto">
      {eyebrow && <div className="text-[10px] uppercase tracking-[0.3em] text-gold/80 text-center mb-2">{eyebrow}</div>}
      <h2 className="font-display text-3xl md:text-4xl text-gold text-center mb-8">{title}</h2>
      {children}
    </section>
  );
}

function Pillar({ icon: Icon, title, body }: { icon: any; title: string; body: string }) {
  return (
    <div className="glass rounded-2xl p-5 hover:-translate-y-1 transition">
      <div className="w-11 h-11 rounded-xl bg-gradient-purple flex items-center justify-center mb-3 shadow-purple">
        <Icon className="w-5 h-5 text-gold" />
      </div>
      <div className="font-display text-gold">{title}</div>
      <div className="text-sm text-muted-foreground mt-1">{body}</div>
    </div>
  );
}
