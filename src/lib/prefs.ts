import type { DietId } from "@/data/diets";
import type { SplitId } from "@/data/splits";
import type {
  ActivityLevel,
  Formula,
  Goal,
  Sex,
} from "@/lib/calories";
import { DEFAULT_INPUTS, lbsToKg } from "@/lib/calories";

export const PREF_KEYS = {
  split: "fit60:splitId",
  /** Single source of truth for calculator + meal plan preferences */
  plan: "fit60:plan",
} as const;

export type FirstMealTime = "08:00" | "10:00" | "12:00";
export type MealsPerDay = 3 | 4;

export interface PlanState {
  /** User has completed calculator + chosen a goal */
  completed: boolean;
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
  heightUnit: "imperial" | "metric";
  weightUnit: "lbs" | "kg";
  activity: ActivityLevel;
  formula: Formula;
  bodyFatPct: number;
  goal: Goal;
  fasterBulk: boolean;
  zigzag: boolean;
  dietId: DietId;
  mealsPerDay: MealsPerDay;
  /** swapGroupId → selected option name */
  swaps: Record<string, string>;
  firstMealTime: FirstMealTime;
}

export const DEFAULT_PLAN: PlanState = {
  completed: false,
  sex: DEFAULT_INPUTS.sex,
  age: DEFAULT_INPUTS.age,
  heightCm: DEFAULT_INPUTS.heightCm,
  weightKg: DEFAULT_INPUTS.weightKg,
  heightUnit: "imperial",
  weightUnit: "lbs",
  activity: DEFAULT_INPUTS.activity,
  formula: DEFAULT_INPUTS.formula,
  bodyFatPct: DEFAULT_INPUTS.bodyFatPct ?? 15,
  goal: DEFAULT_INPUTS.goal,
  fasterBulk: false,
  zigzag: false,
  dietId: "simple-lean",
  mealsPerDay: 4,
  swaps: {},
  firstMealTime: "12:00",
};

export function isPlanValid(plan: PlanState): boolean {
  return (
    plan.age >= 15 &&
    plan.age <= 80 &&
    plan.heightCm >= 100 &&
    plan.heightCm <= 250 &&
    plan.weightKg >= lbsToKg(50) &&
    plan.weightKg <= lbsToKg(500) &&
    (plan.sex === "male" || plan.sex === "female") &&
    !!plan.activity &&
    !!plan.goal
  );
}

export function isPlanReady(plan: PlanState): boolean {
  return plan.completed && isPlanValid(plan);
}

export type { SplitId, DietId };
