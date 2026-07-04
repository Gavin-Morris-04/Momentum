export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type SplitId = "ppl-hybrid" | "upper-lower" | "full-body" | "body-part";

export interface ExerciseRow {
  name: string;
  setsReps: string;
  rest: string;
}

export interface TrainingDay {
  id: string;
  weekday?: Weekday;
  label: string;
  title: string;
  isRest?: boolean;
  exercises: ExerciseRow[];
  notes?: string[];
}

export interface Split {
  id: SplitId;
  number: string;
  name: string;
  daysPerWeek: number;
  bestFor: string;
  cardioNote: string;
  defaultDays: Weekday[];
  days: TrainingDay[];
}

export const PHASE_LINE =
  "Runs 8 weeks: weeks 1–4 learn and build, week 5 deload, weeks 6–8 push.";

export const PHASE_DETAIL =
  "Phase 1 (Days 1–28): learn the lifts and lock form. Week 5 is a scheduled deload (~60% loads, same movements). Weeks 6–8 resume double progression.";

export const HOW_TO_CHOOSE = [
  { days: "3 days", note: "Busy or beginner" },
  { days: "4 days", note: "Best balance for most" },
  { days: "6-day PPL hybrid", note: "Experienced, loves training, wants conditioning" },
  { days: "5-day body-part", note: "Maximum per-muscle focus" },
];

export const CORE_NOTE =
  "Alternate Core A (Hanging Leg Raises, Planks) and Core B (Reverse Crunches, Side Planks) every other day.";

const CORE_A: ExerciseRow[] = [
  { name: "Hanging Leg Raises", setsReps: "3×15", rest: "60s" },
  { name: "Plank", setsReps: "3×60s", rest: "60s" },
];

const CORE_B: ExerciseRow[] = [
  { name: "Reverse Crunches", setsReps: "3×20", rest: "60s" },
  { name: "Side Plank", setsReps: "3×45s", rest: "60s" },
];

export const SPLITS: Split[] = [
  {
    id: "ppl-hybrid",
    number: "01",
    name: "Push / Pull / Legs Hybrid",
    daysPerWeek: 6,
    bestFor:
      "Experienced lifters cutting or recomping who want conditioning.",
    cardioNote: "Running is built into the week.",
    defaultDays: [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ],
    days: [
      {
        id: "ppl-mon",
        weekday: "monday",
        label: "Monday",
        title: "Push",
        exercises: [
          { name: "Fly Machine", setsReps: "2×6–8", rest: "90s" },
          { name: "Incline Fly / DB Press", setsReps: "2×6–8", rest: "90s–2 min" },
          { name: "Weighted Dips", setsReps: "2×6–8", rest: "2 min" },
          { name: "Tricep Pushdown", setsReps: "2×6–8", rest: "60–90s" },
          { name: "Overhead Extension", setsReps: "2×6–8", rest: "60–90s" },
          { name: "Lateral Raises", setsReps: "3×8–10", rest: "60s" },
          { name: "Weighted Curl Machine", setsReps: "3×15", rest: "60s" },
          { name: "Side Bends", setsReps: "3×6–8", rest: "60s" },
        ],
      },
      {
        id: "ppl-tue",
        weekday: "tuesday",
        label: "Tuesday",
        title: "Zone 2 Run",
        exercises: [
          {
            name: "Zone 2 Run",
            setsReps: "30–45 min",
            rest: "HR ~130–150",
          },
          ...CORE_B,
        ],
        notes: ["Conversational pace."],
      },
      {
        id: "ppl-wed",
        weekday: "wednesday",
        label: "Wednesday",
        title: "Pull",
        exercises: [
          { name: "Lat Pulldown", setsReps: "2×8–10", rest: "90s–2 min" },
          { name: "Wide Grip Row", setsReps: "2×8–10", rest: "90s–2 min" },
          { name: "Close Grip Row", setsReps: "2×8–10", rest: "90s–2 min" },
          { name: "Rear Delt Cable", setsReps: "2×10", rest: "60s" },
          { name: "Preacher Curl", setsReps: "2×8–10", rest: "60–90s" },
          { name: "Seated Incline Curl", setsReps: "2×8–10", rest: "60–90s" },
          { name: "Decline Ab Curls", setsReps: "3×15", rest: "60s" },
          { name: "Side Bends", setsReps: "3×6–8", rest: "60s" },
        ],
      },
      {
        id: "ppl-thu",
        weekday: "thursday",
        label: "Thursday",
        title: "Intervals",
        exercises: [
          {
            name: "Intervals",
            setsReps: "5 min walk → 8–10 × (1 min hard / 2 min easy) → 5 min walk",
            rest: "—",
          },
          ...CORE_B,
        ],
      },
      {
        id: "ppl-fri",
        weekday: "friday",
        label: "Friday",
        title: "Push",
        exercises: [
          { name: "Fly Machine", setsReps: "2×6–8", rest: "90s" },
          { name: "Incline Fly / DB Press", setsReps: "2×6–8", rest: "90s–2 min" },
          { name: "Weighted Dips", setsReps: "2×6–8", rest: "2 min" },
          { name: "Tricep Pushdown", setsReps: "2×6–8", rest: "60–90s" },
          { name: "Overhead Extension", setsReps: "2×6–8", rest: "60–90s" },
          { name: "Lateral Raises", setsReps: "3×8–10", rest: "60s" },
          { name: "Weighted Curl Machine", setsReps: "3×15", rest: "60s" },
          { name: "Side Bends", setsReps: "3×6–8", rest: "60s" },
        ],
      },
      {
        id: "ppl-sat",
        weekday: "saturday",
        label: "Saturday",
        title: "Pull",
        exercises: [
          { name: "Lat Pulldown", setsReps: "2×8–10", rest: "90s–2 min" },
          { name: "Wide Grip Row", setsReps: "2×8–10", rest: "90s–2 min" },
          { name: "Close Grip Row", setsReps: "2×8–10", rest: "90s–2 min" },
          { name: "Rear Delt Cable", setsReps: "2×10", rest: "60s" },
          { name: "Preacher Curl", setsReps: "2×8–10", rest: "60–90s" },
          { name: "Seated Incline Curl", setsReps: "2×8–10", rest: "60–90s" },
          { name: "Decline Ab Curls", setsReps: "3×15", rest: "60s" },
          { name: "Side Bends", setsReps: "3×6–8", rest: "60s" },
        ],
      },
      {
        id: "ppl-sun",
        weekday: "sunday",
        label: "Sunday",
        title: "Long Easy Run",
        exercises: [
          {
            name: "Long Easy Run",
            setsReps:
              "Wk1 3 · Wk2 4 · Wk3 5 · Wk4 4 (down) · Wk5 5 · Wk6 6 · Wk7 7 · Wk8 8 (Day 60)",
            rest: "Easy pace",
          },
        ],
      },
    ],
  },
  {
    id: "upper-lower",
    number: "02",
    name: "Upper / Lower",
    daysPerWeek: 4,
    bestFor: "Most people — the best balance of frequency, recovery, and life.",
    cardioNote: "2 optional Zone 2 sessions on off days.",
    defaultDays: ["monday", "tuesday", "thursday", "friday"],
    days: [
      {
        id: "ul-upper-a",
        weekday: "monday",
        label: "Upper A",
        title: "Strength",
        exercises: [
          { name: "Barbell Bench Press", setsReps: "4×5–8", rest: "3 min" },
          { name: "Barbell Row", setsReps: "4×6–10", rest: "2–3 min" },
          { name: "Overhead Press", setsReps: "3×6–10", rest: "2–3 min" },
          { name: "Lat Pulldown", setsReps: "3×10–12", rest: "2 min" },
          { name: "Incline DB Curl", setsReps: "3×10–12", rest: "60–90s" },
          { name: "Rope Pushdown", setsReps: "3×12–15", rest: "60–90s" },
        ],
      },
      {
        id: "ul-lower-a",
        weekday: "tuesday",
        label: "Lower A",
        title: "Strength",
        exercises: [
          { name: "Back Squat", setsReps: "4×5–8", rest: "3 min" },
          { name: "Romanian Deadlift", setsReps: "3×8–10", rest: "2–3 min" },
          { name: "Leg Press", setsReps: "3×10–12", rest: "2 min" },
          { name: "Lying Leg Curl", setsReps: "3×12", rest: "90s" },
          { name: "Standing Calf Raise", setsReps: "4×12–15", rest: "60s" },
          { name: "Hanging Leg Raise", setsReps: "3×12", rest: "60s" },
        ],
      },
      {
        id: "ul-rest",
        weekday: "wednesday",
        label: "Rest or Zone 2",
        title: "Recovery",
        isRest: true,
        exercises: [],
        notes: ["Optional Zone 2 session."],
      },
      {
        id: "ul-upper-b",
        weekday: "thursday",
        label: "Upper B",
        title: "Hypertrophy",
        exercises: [
          { name: "Incline DB Press", setsReps: "4×8–12", rest: "2 min" },
          { name: "Pullups", setsReps: "4×6–10", rest: "2–3 min" },
          { name: "Seated DB Shoulder Press", setsReps: "3×10", rest: "2 min" },
          { name: "Seated Cable Row", setsReps: "3×10–12", rest: "2 min" },
          { name: "Lateral Raise", setsReps: "4×15–20", rest: "60s" },
          { name: "EZ Curl", setsReps: "3×10", rest: "60–90s" },
          { name: "Overhead Extension", setsReps: "3×12", rest: "60–90s" },
        ],
      },
      {
        id: "ul-lower-b",
        weekday: "friday",
        label: "Lower B",
        title: "Hypertrophy",
        exercises: [
          { name: "Deadlift", setsReps: "3×3–5", rest: "3–4 min" },
          { name: "Hack or Front Squat", setsReps: "3×8–10", rest: "2–3 min" },
          { name: "Walking Lunges", setsReps: "3×12/leg", rest: "2 min" },
          { name: "Leg Extension", setsReps: "3×15", rest: "90s" },
          { name: "Seated Calf Raise", setsReps: "4×15", rest: "60s" },
          { name: "Plank", setsReps: "3×60s", rest: "60s" },
        ],
      },
      {
        id: "ul-weekend",
        label: "Weekend",
        title: "Rest, steps, optional easy cardio",
        isRest: true,
        exercises: [],
      },
    ],
  },
  {
    id: "full-body",
    number: "03",
    name: "Full Body",
    daysPerWeek: 3,
    bestFor: "Beginners, busy schedules, returning after a layoff.",
    cardioNote: "Brisk daily walking + one optional 20-min interval session.",
    defaultDays: ["monday", "wednesday", "friday"],
    days: [
      {
        id: "fb-a",
        weekday: "monday",
        label: "Day A",
        title: "Full body",
        exercises: [
          { name: "Back Squat", setsReps: "3×5–8", rest: "3 min" },
          { name: "Barbell Bench Press", setsReps: "3×5–8", rest: "3 min" },
          {
            name: "Barbell or Chest-Supported Row",
            setsReps: "3×8–10",
            rest: "2 min",
          },
          { name: "Lateral Raise", setsReps: "3×15", rest: "60s" },
          { name: "EZ Curl", setsReps: "2×12", rest: "60s" },
          { name: "Plank", setsReps: "3×45s", rest: "60s" },
        ],
      },
      {
        id: "fb-b",
        weekday: "wednesday",
        label: "Day B",
        title: "Full body",
        exercises: [
          { name: "Deadlift", setsReps: "3×5", rest: "3–4 min" },
          { name: "Overhead Press", setsReps: "3×6–8", rest: "2–3 min" },
          {
            name: "Pullups or Lat Pulldown",
            setsReps: "3× to 1–2 shy of failure",
            rest: "2 min",
          },
          { name: "Leg Press", setsReps: "3×12", rest: "2 min" },
          { name: "Skull Crushers", setsReps: "2×12", rest: "60s" },
          { name: "Hanging Knee Raise", setsReps: "3×15", rest: "60s" },
        ],
      },
      {
        id: "fb-c",
        weekday: "friday",
        label: "Day C",
        title: "Full body",
        exercises: [
          { name: "Front or Goblet Squat", setsReps: "3×8–10", rest: "2–3 min" },
          { name: "Incline DB Press", setsReps: "3×10", rest: "2 min" },
          { name: "Seated Cable Row", setsReps: "3×10–12", rest: "2 min" },
          { name: "Romanian Deadlift", setsReps: "3×10", rest: "2 min" },
          { name: "Hammer Curl", setsReps: "2×12", rest: "60s" },
          { name: "Side Plank", setsReps: "3×30s/side", rest: "60s" },
        ],
      },
    ],
  },
  {
    id: "body-part",
    number: "04",
    name: "5-Day Body-Part Split",
    daysPerWeek: 5,
    bestFor: "Intermediate/advanced who love the gym.",
    cardioNote: "10–15 min incline walk after 2–3 sessions.",
    defaultDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    days: [
      {
        id: "bp-chest",
        weekday: "monday",
        label: "Day 1",
        title: "Chest",
        exercises: [
          { name: "Barbell Bench Press", setsReps: "4×6–10", rest: "3 min" },
          { name: "Incline DB Press", setsReps: "4×8–12", rest: "2 min" },
          {
            name: "Weighted Dips or Machine Press",
            setsReps: "3×10–12",
            rest: "2 min",
          },
          { name: "Cable Fly", setsReps: "3×12–15", rest: "60–90s" },
          { name: "Pushups", setsReps: "2× failure", rest: "60s" },
        ],
      },
      {
        id: "bp-back",
        weekday: "tuesday",
        label: "Day 2",
        title: "Back",
        exercises: [
          { name: "Deadlift", setsReps: "3×5", rest: "3–4 min" },
          { name: "Pullups", setsReps: "4 sets", rest: "2–3 min" },
          { name: "Barbell Row", setsReps: "4×8–10", rest: "2–3 min" },
          { name: "Lat Pulldown", setsReps: "3×10–12", rest: "2 min" },
          { name: "Straight-Arm Pulldown", setsReps: "3×12–15", rest: "60–90s" },
        ],
      },
      {
        id: "bp-shoulders",
        weekday: "wednesday",
        label: "Day 3",
        title: "Shoulders",
        exercises: [
          {
            name: "Seated DB Shoulder Press",
            setsReps: "4×8–12",
            rest: "2–3 min",
          },
          { name: "Lateral Raise", setsReps: "5×15–20", rest: "60s" },
          { name: "Cable Lateral Raise", setsReps: "3×12–15", rest: "60s" },
          { name: "Face Pulls", setsReps: "4×15", rest: "60s" },
          { name: "Rear-Delt Fly", setsReps: "3×15", rest: "60s" },
          { name: "Shrugs", setsReps: "3×12", rest: "90s" },
        ],
      },
      {
        id: "bp-legs",
        weekday: "thursday",
        label: "Day 4",
        title: "Legs",
        exercises: [
          { name: "Back Squat", setsReps: "4×6–10", rest: "3 min" },
          { name: "Romanian Deadlift", setsReps: "3×8–10", rest: "2–3 min" },
          { name: "Leg Press", setsReps: "3×10–12", rest: "2 min" },
          { name: "Leg Extension", setsReps: "3×15", rest: "90s" },
          { name: "Lying Leg Curl", setsReps: "3×12", rest: "90s" },
          { name: "Standing Calf Raise", setsReps: "5×12–15", rest: "60s" },
        ],
      },
      {
        id: "bp-arms",
        weekday: "friday",
        label: "Day 5",
        title: "Arms + Core",
        exercises: [
          { name: "EZ Bar Curl", setsReps: "4×8–12", rest: "90s" },
          { name: "Close-Grip Bench Press", setsReps: "4×8–10", rest: "2 min" },
          { name: "Incline DB Curl", setsReps: "3×12", rest: "60–90s" },
          { name: "Overhead Extension", setsReps: "3×12", rest: "60–90s" },
          { name: "Hammer Curl", setsReps: "3×12", rest: "60s" },
          { name: "Rope Pushdown", setsReps: "3×15", rest: "60s" },
          { name: "Hanging Leg Raise", setsReps: "3×15", rest: "60s" },
          { name: "Plank", setsReps: "3×60s", rest: "60s" },
        ],
      },
      {
        id: "bp-weekend",
        label: "Weekend",
        title: "Rest, steps, optional cardio",
        isRest: true,
        exercises: [],
      },
    ],
  },
];

export function getSplit(id: SplitId): Split {
  return SPLITS.find((s) => s.id === id) ?? SPLITS[0];
}

export function formatSessionDescription(day: TrainingDay): string {
  if (day.isRest || day.exercises.length === 0) {
    return day.notes?.join("\n") || day.title;
  }
  const lines = day.exercises.map(
    (e) => `${e.name}: ${e.setsReps} (rest ${e.rest})`,
  );
  if (day.notes?.length) lines.push(...day.notes);
  return lines.join("\n");
}

export const WEEKDAY_LABELS: Record<Weekday, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export const WEEKDAYS: Weekday[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
