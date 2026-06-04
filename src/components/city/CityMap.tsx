import { useMemo, useState } from "react";
import city1Asset from "@/assets/city-1.png.asset.json";
import city2Asset from "@/assets/city-2.png.asset.json";
import city3Asset from "@/assets/city-3.png.asset.json";
import {
  CHECKPOINTS,
  CITIES,
  cityForDay,
  type CheckpointState,
} from "./checkpoints";
import { CheckpointDialog } from "./CheckpointDialog";
import { useSession } from "@/lib/session";

const CITY_IMAGES: Record<number, string> = {
  1: city1Asset.url,
  2: city2Asset.url,
  3: city3Asset.url,
};

function stateFor(
  day: number,
  current: number,
  completed: number[],
  missed: number[],
): CheckpointState {
  if (day === current) return "current";
  if (completed.includes(day)) return "completed";
  if (missed.includes(day)) return "missed";
  if (day < current) return "missed";
  return "locked";
}

export function CityMap() {
  const { session, claim } = useSession();
  const { currentDay, completedDays, missedDays, claimedDays } = session;

  const activeCity = useMemo(() => cityForDay(currentDay), [currentDay]);
  const [viewCityId, setViewCityId] = useState<1 | 2 | 3>(activeCity.id);
  const city = useMemo(
    () => CITIES.find((c) => c.id === viewCityId) ?? activeCity,
    [viewCityId, activeCity],
  );

  const [openDay, setOpenDay] = useState<number | null>(null);
  const activeCp = openDay != null ? CHECKPOINTS.find((c) => c.day === openDay) : null;
  const activeState = activeCp
    ? stateFor(activeCp.day, currentDay, completedDays, missedDays)
    : null;

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl border border-[color:var(--color-border)] shadow-card bg-black">
      <img
        src={CITY_IMAGES[city.id]}
        alt={`${city.name} — Vegasslot City map`}
        className="absolute inset-0 w-full h-full object-cover select-none"
        draggable={false}
      />

      {/* Subtle bottom shade so floating UI stays legible */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

      {/* City selector */}
      <div className="absolute top-3 right-3 z-30 flex gap-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[color:var(--color-gold)]/40 p-1">
        {CITIES.map((c) => {
          const unlocked = currentDay >= c.range[0];
          const isActive = c.id === viewCityId;
          return (
            <button
              key={c.id}
              disabled={!unlocked}
              onClick={() => setViewCityId(c.id)}
              className={`px-2.5 py-1 rounded-full text-[10px] md:text-xs font-display uppercase tracking-widest transition ${
                isActive
                  ? "bg-gradient-gold-button text-[color:var(--color-gold-foreground)]"
                  : unlocked
                    ? "text-gold hover:bg-white/10"
                    : "text-white/30 cursor-not-allowed"
              }`}
              aria-label={c.name}
            >
              {c.id}
            </button>
          );
        })}
      </div>

      {/* Invisible hit-areas + state overlays on the baked checkpoints */}
      {city.checkpoints.map((cp) => {
        const st = stateFor(cp.day, currentDay, completedDays, missedDays);
        return (
          <Hotspot
            key={cp.day}
            x={cp.x}
            y={cp.y}
            day={cp.day}
            state={st}
            milestone={cp.isMilestone}
            onClick={() => setOpenDay(cp.day)}
          />
        );
      })}

      <CheckpointDialog
        open={openDay != null}
        onOpenChange={(v) => !v && setOpenDay(null)}
        day={openDay}
        state={activeState}
        reward={activeCp?.reward}
        isMilestone={activeCp?.isMilestone}
        district={city.name}
        claimed={openDay != null && claimedDays.includes(openDay)}
        onClaim={() => openDay != null && claim(openDay)}
      />
    </div>
  );
}

function Hotspot({
  x,
  y,
  day,
  state,
  milestone,
  onClick,
}: {
  x: number;
  y: number;
  day: number;
  state: CheckpointState;
  milestone?: boolean;
  onClick: () => void;
}) {
  // Sizes are matched to the baked checkpoint circles in the artwork.
  const size = milestone ? "w-12 h-12 md:w-14 md:h-14" : "w-9 h-9 md:w-11 md:h-11";

  const ring: Record<CheckpointState, string> = {
    completed: "ring-2 ring-[color:var(--color-gold)]/70",
    current:
      "ring-4 ring-white shadow-[0_0_24px_8px_oklch(0.85_0.18_88/0.7)] animate-pulse-gold",
    available: "ring-2 ring-[color:var(--color-gold)]/60",
    locked: "ring-1 ring-white/20 bg-black/40 backdrop-blur-[1px]",
    missed: "ring-2 ring-[color:var(--color-destructive)]/70 bg-black/30",
  };

  return (
    <button
      onClick={onClick}
      aria-label={`Gün ${day}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer transition-transform duration-300 hover:scale-110 ${size} ${ring[state]}`}
    >
      {state === "current" && (
        <span className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-black/80 border border-[color:var(--color-gold)]/60 text-[9px] md:text-[10px] font-display uppercase tracking-widest text-gold whitespace-nowrap">
          Gün {day}
        </span>
      )}
    </button>
  );
}
