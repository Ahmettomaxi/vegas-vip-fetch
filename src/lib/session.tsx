import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface Session {
  username: string;          // masked
  vipLevel: number;
  currentDay: number;        // 1..31
  completedDays: number[];
  missedDays: number[];
  claimedDays: number[];
  streak: number;
}

const DEFAULT: Session = {
  username: "Ah****95",
  vipLevel: 3,
  currentDay: 7,
  completedDays: [1, 2, 3, 4, 5, 6],
  missedDays: [],
  claimedDays: [1, 2, 3, 4, 5, 6],
  streak: 4,
};

interface Ctx {
  entered: boolean;
  session: Session;
  enterCity: () => void;
  exitCity: () => void;
  claim: (day: number) => void;
}

const SessionCtx = createContext<Ctx | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [entered, setEntered] = useState(false);
  const [session, setSession] = useState<Session>(DEFAULT);

  useEffect(() => {
    try {
      const e = localStorage.getItem("vsc_entered");
      if (e === "1") setEntered(true);
      const s = localStorage.getItem("vsc_session");
      if (s) setSession({ ...DEFAULT, ...JSON.parse(s) });
    } catch {}
  }, []);

  const persist = (next: Session) => {
    setSession(next);
    try { localStorage.setItem("vsc_session", JSON.stringify(next)); } catch {}
  };

  return (
    <SessionCtx.Provider
      value={{
        entered,
        session,
        enterCity: () => { setEntered(true); try { localStorage.setItem("vsc_entered", "1"); } catch {} },
        exitCity: () => { setEntered(false); try { localStorage.removeItem("vsc_entered"); } catch {} },
        claim: (day) => {
          if (session.claimedDays.includes(day)) return;
          persist({ ...session, claimedDays: [...session.claimedDays, day] });
        },
      }}
    >
      {children}
    </SessionCtx.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionCtx);
  if (!ctx) throw new Error("useSession must be inside SessionProvider");
  return ctx;
}
