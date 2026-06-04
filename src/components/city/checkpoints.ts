// Coordinates (in % of map container) of the checkpoint markers ALREADY
// baked into each of the 3 city map illustrations. We do NOT redraw the
// markers — these positions just provide invisible hit-areas + current-day
// highlight on top of the existing artwork.
export type CheckpointState = "completed" | "current" | "available" | "locked" | "missed";

export interface Checkpoint {
  day: number;
  x: number; // %
  y: number; // %
  reward?: string;
  isMilestone?: boolean;
  cityId: 1 | 2 | 3;
}

// City 1 — Golden Boulevard (days 1-10)
const CITY_1: Checkpoint[] = [
  { day: 1,  x: 18, y: 70, cityId: 1, reward: "25 FS" },
  { day: 2,  x: 25, y: 66, cityId: 1, reward: "25 FS" },
  { day: 3,  x: 31, y: 63, cityId: 1, reward: "50 FS" },
  { day: 4,  x: 35, y: 58, cityId: 1, reward: "50 FS" },
  { day: 5,  x: 40, y: 52, cityId: 1, reward: "Chest", isMilestone: true },
  { day: 6,  x: 46, y: 46, cityId: 1, reward: "25 FS" },
  { day: 7,  x: 54, y: 40, cityId: 1, reward: "100 FS" },
  { day: 8,  x: 61, y: 32, cityId: 1, reward: "50 FS" },
  { day: 9,  x: 71, y: 27, cityId: 1, reward: "100 FS" },
  { day: 10, x: 81, y: 24, cityId: 1, reward: "Jackpot Gate", isMilestone: true },
];

// City 2 — Jackpot Square (days 11-20)
const CITY_2: Checkpoint[] = [
  { day: 11, x: 23, y: 68, cityId: 2, reward: "25 FS" },
  { day: 12, x: 32, y: 63, cityId: 2, reward: "25 FS" },
  { day: 13, x: 41, y: 64, cityId: 2, reward: "50 FS" },
  { day: 14, x: 48, y: 58, cityId: 2, reward: "50 FS" },
  { day: 15, x: 53, y: 50, cityId: 2, reward: "Chest", isMilestone: true },
  { day: 16, x: 59, y: 42, cityId: 2, reward: "100 FS" },
  { day: 17, x: 66, y: 37, cityId: 2, reward: "50 FS" },
  { day: 18, x: 73, y: 33, cityId: 2, reward: "100 FS" },
  { day: 19, x: 79, y: 28, cityId: 2, reward: "150 FS" },
  { day: 20, x: 84, y: 24, cityId: 2, reward: "VIP Gate", isMilestone: true },
];

// City 3 — VIP Lounge & Royal Palace (days 21-30)
const CITY_3: Checkpoint[] = [
  { day: 21, x: 20, y: 70, cityId: 3, reward: "50 FS" },
  { day: 22, x: 30, y: 65, cityId: 3, reward: "50 FS" },
  { day: 23, x: 38, y: 60, cityId: 3, reward: "100 FS" },
  { day: 24, x: 42, y: 53, cityId: 3, reward: "Chest", isMilestone: true },
  { day: 25, x: 47, y: 46, cityId: 3, reward: "100 FS" },
  { day: 26, x: 54, y: 41, cityId: 3, reward: "150 FS" },
  { day: 27, x: 62, y: 58, cityId: 3, reward: "100 FS" },
  { day: 28, x: 72, y: 55, cityId: 3, reward: "200 FS" },
  { day: 29, x: 67, y: 33, cityId: 3, reward: "250 FS" },
  { day: 30, x: 76, y: 27, cityId: 3, reward: "Royal Palace", isMilestone: true },
];

export const CHECKPOINTS: Checkpoint[] = [...CITY_1, ...CITY_2, ...CITY_3];

export const CITIES = [
  {
    id: 1 as const,
    name: "Golden Boulevard",
    subtitle: "Luxury Entry District",
    range: [1, 10] as const,
    gate: "Jackpot Gate",
    checkpoints: CITY_1,
  },
  {
    id: 2 as const,
    name: "Jackpot Square",
    subtitle: "Casino Core District",
    range: [11, 20] as const,
    gate: "VIP Gate",
    checkpoints: CITY_2,
  },
  {
    id: 3 as const,
    name: "VIP Lounge",
    subtitle: "Ultra Luxury District",
    range: [21, 30] as const,
    gate: "Royal Palace",
    checkpoints: CITY_3,
  },
];

export function cityForDay(day: number) {
  return CITIES.find((c) => day >= c.range[0] && day <= c.range[1]) ?? CITIES[0];
}

// Legacy export kept so other components that still import DISTRICTS compile.
export const DISTRICTS = CITIES.map((c) => ({
  id: c.id,
  name: c.name,
  x: 0,
  y: 0,
}));
