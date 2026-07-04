export type Sex = "male" | "female";
export type Formula = "mifflin" | "harris" | "katch";
export type ActivityLevel =
  | "bmr"
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very"
  | "extra";
export type Goal =
  | "aggressive-cut"
  | "cut"
  | "mild-cut"
  | "maintain"
  | "lean-bulk";

export interface CalculatorInputs {
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
  activity: ActivityLevel;
  goal: Goal;
  formula: Formula;
  bodyFatPct?: number;
  fasterBulk: boolean;
  zigzag: boolean;
}

export interface MacroResult {
  bmr: number;
  maintenance: number;
  target: number;
  unclampedTarget: number;
  clamped: boolean;
  clampReason: string | null;
  protein: number;
  fat: number;
  carbs: number;
  fiber: number;
  water: string;
  weeklyRate: string;
  goalLabel: string;
  proteinPerLb: number;
  fatPct: number;
}

export const ACTIVITY_OPTIONS: {
  id: ActivityLevel;
  label: string;
  detail: string;
  multiplier: number;
  advanced?: boolean;
}[] = [
  {
    id: "bmr",
    label: "BMR only",
    detail: "Basal metabolic rate — no activity multiplier",
    multiplier: 1.0,
    advanced: true,
  },
  {
    id: "sedentary",
    label: "Sedentary",
    detail: "Little or no exercise",
    multiplier: 1.2,
  },
  {
    id: "light",
    label: "Light",
    detail: "Exercise 1–3 times/week",
    multiplier: 1.375,
  },
  {
    id: "moderate",
    label: "Moderate",
    detail: "Exercise 4–5 times/week",
    multiplier: 1.465,
  },
  {
    id: "active",
    label: "Active",
    detail: "Daily exercise or intense exercise 3–4 times/week",
    multiplier: 1.55,
  },
  {
    id: "very",
    label: "Very Active",
    detail: "Intense exercise 6–7 times/week",
    multiplier: 1.725,
  },
  {
    id: "extra",
    label: "Extra Active",
    detail: "Very intense exercise daily, or physical job",
    multiplier: 1.95,
  },
];

export const ACTIVITY_HELPERS = [
  "Exercise = 15–30 min elevated heart rate",
  "Intense = 45–120 min",
  "Very intense = 2+ hours",
];

export const FORMULA_OPTIONS: {
  id: Formula;
  label: string;
  note?: string;
}[] = [
  {
    id: "mifflin",
    label: "Mifflin-St Jeor",
    note: "Default — most reliable for most people",
  },
  {
    id: "harris",
    label: "Revised Harris-Benedict",
  },
  {
    id: "katch",
    label: "Katch-McArdle",
    note: "Most accurate if you're lean and actually know your body fat.",
  },
];

export const GOAL_OPTIONS: {
  id: Goal;
  label: string;
  delta: number;
  weeklyRate: string;
  caution?: string;
}[] = [
  {
    id: "aggressive-cut",
    label: "Aggressive cut",
    delta: -1000,
    weeklyRate: "≈ 2 lb/week",
    caution:
      "Losing more than 2 lb/week risks muscle loss and metabolic slowdown; not advised without near-perfect protein and sleep.",
  },
  {
    id: "cut",
    label: "Cut",
    delta: -500,
    weeklyRate: "≈ 1 lb/week",
  },
  {
    id: "mild-cut",
    label: "Mild cut",
    delta: -250,
    weeklyRate: "≈ 0.5 lb/week",
  },
  {
    id: "maintain",
    label: "Maintain",
    delta: 0,
    weeklyRate: "Hold weight",
  },
  {
    id: "lean-bulk",
    label: "Lean bulk",
    delta: 250,
    weeklyRate: "≈ 0.5 lb/week",
  },
];

export const BASIS_LINE =
  "Based on ~3,500 kcal per pound of body weight — a useful planning rule, not an exact law; your real rate will drift as your body adapts, so judge by the 7-day scale average.";

export function lbsToKg(lbs: number): number {
  return lbs / 2.2046226218;
}

export function kgToLbs(kg: number): number {
  return kg * 2.2046226218;
}

export function ftInToCm(ft: number, inches: number): number {
  return (ft * 12 + inches) * 2.54;
}

export function cmToFtIn(cm: number): { ft: number; inches: number } {
  const totalIn = cm / 2.54;
  const ft = Math.floor(totalIn / 12);
  const inches = Math.round(totalIn - ft * 12);
  return { ft, inches };
}

export function floorForSex(sex: Sex): number {
  return sex === "female" ? 1200 : 1500;
}

export function bmrMifflin(
  sex: Sex,
  weightKg: number,
  heightCm: number,
  age: number,
): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return sex === "male" ? base + 5 : base - 161;
}

export function bmrHarris(
  sex: Sex,
  weightKg: number,
  heightCm: number,
  age: number,
): number {
  if (sex === "male") {
    return 13.397 * weightKg + 4.799 * heightCm - 5.677 * age + 88.362;
  }
  return 9.247 * weightKg + 3.098 * heightCm - 4.33 * age + 447.593;
}

export function bmrKatch(weightKg: number, bodyFatPct: number): number {
  const f = Math.min(60, Math.max(3, bodyFatPct)) / 100;
  return 370 + 21.6 * (1 - f) * weightKg;
}

export function computeBmr(inputs: CalculatorInputs): number {
  if (inputs.formula === "harris") {
    return bmrHarris(inputs.sex, inputs.weightKg, inputs.heightCm, inputs.age);
  }
  if (inputs.formula === "katch") {
    return bmrKatch(inputs.weightKg, inputs.bodyFatPct ?? 15);
  }
  return bmrMifflin(inputs.sex, inputs.weightKg, inputs.heightCm, inputs.age);
}

export function roundTo25(n: number): number {
  return Math.round(n / 25) * 25;
}

/** Macro targets by goal tier (protein g/lb, fat % of calories). */
export function macroTargetsForGoal(goal: Goal): {
  proteinPerLb: number;
  fatPct: number;
} {
  switch (goal) {
    case "aggressive-cut":
      return { proteinPerLb: 1.2, fatPct: 0.2 };
    case "cut":
      return { proteinPerLb: 1.0, fatPct: 0.25 };
    case "mild-cut":
    case "maintain":
      return { proteinPerLb: 0.9, fatPct: 0.27 };
    case "lean-bulk":
      return { proteinPerLb: 0.8, fatPct: 0.27 };
  }
}

export function goalDelta(inputs: CalculatorInputs): number {
  if (inputs.goal === "lean-bulk" && inputs.fasterBulk) return 500;
  return GOAL_OPTIONS.find((g) => g.id === inputs.goal)?.delta ?? 0;
}

export function calculateMacros(inputs: CalculatorInputs): MacroResult {
  const age = Math.min(80, Math.max(15, inputs.age));
  const bmrRaw = computeBmr({ ...inputs, age });
  const bmr = Math.round(bmrRaw);
  const multiplier =
    ACTIVITY_OPTIONS.find((a) => a.id === inputs.activity)?.multiplier ?? 1.55;
  const maintenance = roundTo25(bmrRaw * multiplier);
  const delta = goalDelta(inputs);
  const unclampedTarget = maintenance + delta;
  const floor = floorForSex(inputs.sex);
  const clamped = unclampedTarget < floor;
  const target = clamped ? floor : unclampedTarget;

  const weightLbs = kgToLbs(inputs.weightKg);
  const { proteinPerLb, fatPct } = macroTargetsForGoal(inputs.goal);
  const protein = Math.round(weightLbs * proteinPerLb);

  let fatCals = target * fatPct;
  let fat = Math.round(fatCals / 9);
  if (fat < 40) {
    fat = 40;
    fatCals = fat * 9;
  }

  const proteinCals = protein * 4;
  const carbs = Math.max(0, Math.round((target - proteinCals - fatCals) / 4));
  const fiber = Math.round((target / 1000) * 14);

  const cutting =
    inputs.goal === "aggressive-cut" ||
    inputs.goal === "cut" ||
    inputs.goal === "mild-cut";
  const water = cutting ? "1–1.5 gal" : "0.75–1 gal";

  const goalOpt = GOAL_OPTIONS.find((g) => g.id === inputs.goal)!;
  let weeklyRate = goalOpt.weeklyRate;
  if (inputs.goal === "lean-bulk" && inputs.fasterBulk) {
    weeklyRate = "≈ 1 lb/week (faster — mostly fat)";
  }

  let clampReason: string | null = null;
  if (clamped) {
    clampReason = `Target floored at ${floor} kcal (${inputs.sex === "female" ? "women" : "men"}). Try a milder tier.`;
  }

  return {
    bmr,
    maintenance,
    target,
    unclampedTarget,
    clamped,
    clampReason,
    protein,
    fat,
    carbs,
    fiber,
    water,
    weeklyRate,
    goalLabel: goalOpt.label,
    proteinPerLb,
    fatPct,
  };
}

/** Zigzag: 5 lower days + 2 higher days, same weekly total. */
export function zigzagDays(
  target: number,
  weekendBump = 250,
): { low: number; high: number } {
  const weekly = target * 7;
  const high = target + weekendBump;
  const low = Math.round((weekly - high * 2) / 5);
  return { low: roundTo25(low), high: roundTo25(high) };
}

export const DEFAULT_INPUTS: CalculatorInputs = {
  sex: "male",
  age: 30,
  heightCm: 178,
  weightKg: lbsToKg(182),
  activity: "very",
  goal: "cut",
  formula: "mifflin",
  bodyFatPct: 15,
  fasterBulk: false,
  zigzag: false,
};

export const OUTCOME_EXPECTATIONS = [
  {
    goal: "cut",
    label: "Normal cut",
    outcome: "≈ 8–16 lbs down over 60 days",
  },
  {
    goal: "aggressive-cut",
    label: "Aggressive cut",
    outcome: "≈ 12–17 lbs — muscle-loss risk rises; protein and sleep must be perfect",
  },
  {
    goal: "lean-bulk",
    label: "Lean bulk",
    outcome: "≈ 2–4 lbs gained, mostly tissue if gaining slowly",
  },
];
