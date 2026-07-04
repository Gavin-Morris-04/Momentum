export interface SectionCard {
  href: string;
  title: string;
  description: string;
  detail: string;
}

export interface HowToStep {
  step: number;
  body: string;
}

export interface PhaseBlock {
  id: string;
  label: string;
  days: string;
  title: string;
  body: string;
  /** Open-ended segment after day 60 — visually continues, not a closed box */
  openEnded?: boolean;
}

export const SITE_NAME = "Fit 60";
export const TAGLINE = "Sixty days to build it. A lifetime to live it.";
export const FOOTER_LINE =
  "Fit 60 is a guide and a tool for your wellbeing. Sixty days to build it, a lifetime to live it.";

export const HERO_LINE =
  "A complete guide for your wellbeing — training, food, sleep, and a fuller life. Follow it strictly for sixty days, not to finish something, but to start something you'll keep forever.";

export const HOME_PULL_QUOTE = "The plan ends. The person it built doesn't.";

export const WHY_FIT_60 = [
  "I built Fit 60 because I wanted one honest place with the whole plan — lifts, meals, runs, sleep — without ads or upsells.",
  "Every number is either backed by evidence or clearly labeled as opinion.",
  "Sixty days is long enough to prove to yourself that this is possible — and short enough to actually do it.",
  "The sixty days are just long enough to prove to yourself that this is who you can be. What you do with day 61 is the actual point.",
];

export const PHASES: PhaseBlock[] = [
  {
    id: "phase-1",
    label: "Phase 1",
    days: "Days 1–28",
    title: "Build",
    body: "Learn the movements, lock the rhythms — lifts, meals, bedtime, and weeks 1–4 of running.",
  },
  {
    id: "phase-2",
    label: "Phase 2",
    days: "Days 29–56",
    title: "Grow",
    body: "Push the numbers, deepen the habits — progression on every lift, running mileage climbs, the routine starts to feel like yours.",
  },
  {
    id: "finish",
    label: "Days 57–60",
    days: "Look back, then forward",
    title: "Look back, then forward",
    body: "Retake the Day 1 photos, reread the journal's first week, do the Day 60 capstone long run. On your final Sunday review, write one page titled \"What I'm taking with me\" — the three habits you refuse to give back.",
  },
  {
    id: "day-61",
    label: "Day 61+",
    days: "Yours now",
    title: "Yours now",
    body: "The plan ends. The person it built doesn't.",
    openEnded: true,
  },
];

export const AFTER_DAY_60 = {
  title: "After day 60",
  sections: [
    {
      heading: "Keep the skeleton, loosen the grip",
      body: "Keep lifting 3–5 days, keep the protein habit, keep the bedtime, keep the journal — but move from following a plan to owning one. Recalculate at maintenance, pick the split you liked most, and let food become flexible around the same principles.",
    },
    {
      heading: "The tools stay open",
      body: "The calculator, the meal builder, the splits, and the calendar don't expire — come back and re-solve them every time your body, schedule, or goal changes. That's what a tool is for.",
    },
    {
      heading: "Run it again when you need it",
      body: "Some people return to the full strict 60 after a drifting season, an injury, a hard year. It'll be here.",
    },
  ],
  closing:
    "What you actually built isn't the pounds — it's the proof. You kept your word to yourself for sixty straight days. You know how to eat, train, sleep, rest, and pay attention. Stronger, calmer, better rested, more present, closer to your people. Nobody can take a kept promise away from you.",
};

export const SECTION_CARDS: SectionCard[] = [
  {
    href: "/lift",
    title: "Lift",
    description: "Four complete workout splits with every set and rep written out — a structure you can carry long after day 60.",
    detail: "4 splits · 8-week progression · week 5 deload",
  },
  {
    href: "/diet",
    title: "Diet",
    description: "Tell us your numbers and Fit 60 writes a meal plan for you — principles that portion your food forever.",
    detail: "Your numbers · your goal · live portions",
  },
  {
    href: "/run",
    title: "Run",
    description: "Eight-week running structure building toward an 8-mile capstone — the start of a habit, not a finish line.",
    detail: "Zone 2 · intervals · Day 60 long run",
  },
  {
    href: "/sleep",
    title: "Sleep",
    description: "The schedule, the science, and the wind-down that makes everything else work — a gift you keep giving yourself.",
    detail: "10:30 PM · 8+ hours · evidence-backed",
  },
  {
    href: "/life",
    title: "Life",
    description: "Journal, microadventures, reading, and presence — the part of wellbeing no calculator can portion.",
    detail: "Journal · adventures · stillness",
  },
  {
    href: "/supplements",
    title: "Supplements",
    description: "Natural compounds only — what to take, when, and what to skip. Food first, forever.",
    detail: "Natural only · evidence labeled",
  },
  {
    href: "/calendar",
    title: "Calendar",
    description: "Export workouts, meals, and sleep for the full 60-day journey — and come back whenever you need to run it again.",
    detail: ".ics · Full 60-day plan default",
  },
];

export const HOW_TO_USE: HowToStep[] = [
  { step: 1, body: "Calculate your maintenance calories and pick a goal." },
  { step: 2, body: "Pick your split and follow Phase 1, then Phase 2." },
  { step: 3, body: "Eat the plan Fit 60 writes for you and follow the sleep schedule on /sleep." },
  { step: 4, body: "Export it to your calendar — then keep what works on day 61 and beyond." },
];

export const THE_EIGHT_TITLE = "The Eight — the habits you're keeping.";

export const THE_EIGHT = [
  "Stay within your calorie target for your goal.",
  "Hit 15,000–20,000 steps daily.",
  "Lift 3–5x per week.",
  "Do cardio 2–3x per week.",
  "Sleep 8+ hours.",
  "Hit your protein number.",
  "No alcohol.",
  "No cheat meals.",
];

export const SECTION_INTROS = {
  lift: "You don't need a fancy program. You need one you'll run for eight weeks — and return to whenever you need structure. Here are four, written out set by set.",
  diet: "You don't need a perfect diet. You need principles you'll actually live by — tell us your numbers and Fit 60 writes yours for the next sixty days.",
  run: "Easy days stay easy. Hard days stay honest. Eight weeks builds a runner — that doesn't expire on day 61.",
  sleep: "Sleep isn't recovery from the plan — it's the thing that makes the rest of the plan work. Same schedule every night, all sixty days — then keep the bedtime.",
  life: "Stronger in the gym means little without being calmer, more present, and closer to your people. Here's the part no calculator can portion.",
  supplements: "Food first, forever. These are the last 5% — natural compounds only, with the evidence labeled.",
  calendar: "Put the plan on your calendar for sixty days — the tools stay open whenever your body or goals change.",
};
