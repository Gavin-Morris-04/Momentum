import type { Goal } from "@/lib/calories";

export const GOAL_LOGIC: Record<Goal, string> = {
  "aggressive-cut":
    "Protein is set high (1.2g per lb of your bodyweight) and every meal is maximum volume, because on a steep cut hunger and muscle loss are the enemies.",
  cut: "Protein at 1g per lb of your bodyweight, moderate fat, and the rest in carbs to fuel training.",
  "mild-cut":
    "A comfortable protein target with balanced fat and carbs — easy to hold for the long haul.",
  maintain:
    "A comfortable protein target with balanced fat and carbs — easy to hold for the long haul.",
  "lean-bulk":
    "Carbs are pushed highest to fuel progression; the surplus is small on purpose so the gain is tissue, not fat.",
};

export function goalLogic(goal: Goal): string {
  return GOAL_LOGIC[goal];
}
