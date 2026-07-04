export interface RunSession {
  id: string;
  day: string;
  title: string;
  body: string;
}

export interface WeekRow {
  week: number;
  tuesday: string;
  thursday: string;
  sunday: string;
  weeklyMiles: string;
  note?: string;
}

export const RUN_SESSIONS: RunSession[] = [
  {
    id: "zone2",
    day: "Tuesday",
    title: "Zone 2",
    body: "30–45 min conversational pace, HR ~130–150 bpm. If you can't speak a full sentence, slow down.",
  },
  {
    id: "intervals",
    day: "Thursday",
    title: "Intervals",
    body: "5 min walk warm-up → 8–10 × (1 min hard / 2 min easy) → 5 min walk cool-down.",
  },
  {
    id: "long",
    day: "Sunday",
    title: "Long Easy Run",
    body: "Wk1 3 mi · Wk2 4 · Wk3 5 · Wk4 4 (planned down week) · Wk5 5 · Wk6 6 · Wk7 7 · Wk8 8. Day 60 is the 8-mile capstone. Easy pace throughout.",
  },
];

export const WEEK_PROGRESSION: WeekRow[] = [
  {
    week: 1,
    tuesday: "30–45 min Z2",
    thursday: "8–10 intervals",
    sunday: "3 mi",
    weeklyMiles: "~10–12 mi",
  },
  {
    week: 2,
    tuesday: "30–45 min Z2",
    thursday: "8–10 intervals",
    sunday: "4 mi",
    weeklyMiles: "~11–13 mi",
  },
  {
    week: 3,
    tuesday: "30–45 min Z2",
    thursday: "8–10 intervals",
    sunday: "5 mi",
    weeklyMiles: "~12–14 mi",
  },
  {
    week: 4,
    tuesday: "30–45 min Z2",
    thursday: "8–10 intervals",
    sunday: "4 mi",
    weeklyMiles: "~11–13 mi",
    note: "Planned down week — tissues adapt slower than lungs.",
  },
  {
    week: 5,
    tuesday: "30–45 min Z2",
    thursday: "8–10 intervals",
    sunday: "5 mi",
    weeklyMiles: "~12–14 mi",
  },
  {
    week: 6,
    tuesday: "30–45 min Z2",
    thursday: "8–10 intervals",
    sunday: "6 mi",
    weeklyMiles: "~13–15 mi",
  },
  {
    week: 7,
    tuesday: "30–45 min Z2",
    thursday: "8–10 intervals",
    sunday: "7 mi",
    weeklyMiles: "~14–16 mi",
  },
  {
    week: 8,
    tuesday: "30–45 min Z2",
    thursday: "8–10 intervals",
    sunday: "8 mi (Day 60 capstone)",
    weeklyMiles: "~15–17 mi",
  },
];

export const PHASE_LINE =
  "Runs 8 weeks: weeks 1–4 learn and build, week 5 deload on lifts (running holds), weeks 6–8 push. Week 4 long-run down week is intentional.";
