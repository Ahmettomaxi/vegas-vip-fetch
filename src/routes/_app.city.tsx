import { createFileRoute } from "@tanstack/react-router";
import { useSession } from "@/lib/session";
import { CityMap } from "@/components/city/CityMap";
import { HudBar } from "@/components/city/HudBar";
import { MissionCard } from "@/components/city/MissionCard";

export const Route = createFileRoute("/_app/city")({
  head: () => ({ meta: [{ title: "Şehir Haritası — Vegasslot City" }] }),
  component: CityPage,
});

function CityPage() {
  const { session } = useSession();
  const completedCount = session.completedDays.length;
  const monthlyProgress = Math.round((completedCount / 31) * 100);

  return (
    <div className="flex flex-col gap-4">
      <HudBar
        username={session.username}
        vipLevel={session.vipLevel}
        completedCount={completedCount}
        totalDays={31}
        dailyProgress={19}
        monthlyProgress={monthlyProgress}
        nextReward="50 Freespin"
        streak={session.streak}
      />
      <div className="relative h-[58vh] lg:h-[68vh] min-h-[440px]">
        <CityMap />
      </div>
      <MissionCard onCheck={() => {}} />
    </div>
  );
}
