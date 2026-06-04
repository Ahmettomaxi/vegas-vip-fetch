import chestImg from "@/assets/chest.png";

export function MissionCard({ onCheck }: { onCheck: () => void }) {
  return (
    <div className="glass rounded-2xl p-4 md:p-5 flex items-center gap-4">
      <img src={chestImg} alt="" className="w-14 md:w-16 animate-float" />
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Bugünkü Görev</div>
        <div className="font-display text-base md:text-lg text-gold leading-tight">
          Günlük yatırımını yap, sıradaki checkpoint açılsın
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">Ödül: <span className="text-gold">50 Freespin</span></div>
      </div>
      <button
        onClick={onCheck}
        className="shrink-0 px-4 md:px-6 py-3 rounded-xl bg-gradient-gold-button text-[color:var(--color-gold-foreground)] font-display uppercase tracking-widest text-xs md:text-sm shadow-gold hover:brightness-110 active:scale-[0.98] transition"
      >
        İlerlemeyi Kontrol Et
      </button>
    </div>
  );
}
