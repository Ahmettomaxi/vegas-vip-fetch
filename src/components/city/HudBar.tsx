import hostImg from "@/assets/host-character.png";
import chestImg from "@/assets/chest.png";

interface Props {
  username: string;
  vipLevel: number;
  completedCount: number;
  totalDays: number;
  dailyProgress: number; // 0..100
  monthlyProgress: number; // 0..100
  nextReward: string;
  streak: number;
}

export function HudBar({
  username, vipLevel, completedCount, totalDays, dailyProgress, monthlyProgress, nextReward, streak,
}: Props) {
  return (
    <div className="glass rounded-2xl px-3 py-3 md:px-5 md:py-4 flex items-center gap-3 md:gap-6 flex-wrap">
      {/* Profile */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-purple ring-gold flex items-center justify-center overflow-hidden">
          <img src={hostImg} alt="" className="w-14 md:w-16 translate-y-1" />
        </div>
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Merhaba,</div>
          <div className="font-display text-base md:text-lg text-gold leading-none truncate">{username}</div>
          <div className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-gradient-purple text-white border border-[color:var(--color-gold)]/40">
            VIP SEVİYE {vipLevel}
          </div>
        </div>
      </div>

      <Divider />

      <Stat label="Mevcut Seri" value={`${streak} Gün`} accent />
      <Stat label="Tamamlanan" value={`${completedCount} / ${totalDays}`} />

      <Divider />

      {/* Daily progress */}
      <div className="flex-1 min-w-[160px]">
        <div className="flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
          <span>Günlük İlerleme</span><span className="text-gold">{dailyProgress}%</span>
        </div>
        <ProgressBar value={dailyProgress} />
      </div>

      {/* Next reward */}
      <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-black/40 border border-[color:var(--color-gold)]/30">
        <img src={chestImg} alt="" className="w-10" />
        <div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Sonraki Ödül</div>
          <div className="font-display text-sm text-gold">{nextReward}</div>
        </div>
      </div>

      {/* Monthly */}
      <div className="flex-1 min-w-[160px]">
        <div className="flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
          <span>Aylık İlerleme</span><span className="text-gold">{monthlyProgress}%</span>
        </div>
        <ProgressBar value={monthlyProgress} purple />
      </div>
    </div>
  );
}

function Divider() {
  return <div className="hidden md:block w-px h-10 bg-[color:var(--color-gold)]/20" />;
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="text-center">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={`font-display text-lg ${accent ? "text-gold" : "text-foreground"}`}>{value}</div>
    </div>
  );
}

function ProgressBar({ value, purple }: { value: number; purple?: boolean }) {
  return (
    <div className="relative h-2.5 rounded-full bg-black/60 overflow-hidden border border-white/5">
      <div
        className={`h-full rounded-full ${purple ? "bg-gradient-purple" : "bg-gradient-gold-button"} relative`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      >
        <div className="absolute inset-0 shimmer rounded-full" />
      </div>
    </div>
  );
}
