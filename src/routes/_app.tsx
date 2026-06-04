import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useSession } from "@/lib/session";
import { AppSidebar, MobileNav } from "@/components/app/AppSidebar";
import { TopBar } from "@/components/app/TopBar";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  const { entered } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!entered) navigate({ to: "/", replace: true });
  }, [entered, navigate]);

  return (
    <div className="relative min-h-screen w-full">
      <div className="pointer-events-none fixed inset-0 opacity-40 [background-image:radial-gradient(2px_2px_at_20%_30%,oklch(1_0_0/0.4),transparent),radial-gradient(1.5px_1.5px_at_70%_20%,oklch(1_0_0/0.3),transparent),radial-gradient(2px_2px_at_50%_80%,oklch(1_0_0/0.2),transparent)]" />
      <div className="relative max-w-[1400px] mx-auto p-4 lg:p-6 flex gap-6">
        <AppSidebar />
        <main className="flex-1 min-w-0 pb-24 lg:pb-0">
          <TopBar />
          <Outlet />
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
