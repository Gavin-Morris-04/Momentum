import { describe, expect, it } from "vitest";
import { calculateMacros, lbsToKg, type Goal } from "@/lib/calories";
import { buildDiet } from "@/lib/mealBuilder";
import type { DietId } from "@/data/diets";

const GOALS: Goal[] = [
  "aggressive-cut",
  "cut",
  "mild-cut",
  "maintain",
  "lean-bulk",
];

const WEIGHTS_LB = [130, 182, 240];
const MENUS: DietId[] = ["simple-lean", "hearty-classic"];

function macrosFor(weightLb: number, goal: Goal) {
  return calculateMacros({
    sex: "male",
    age: 30,
    heightCm: 178,
    weightKg: lbsToKg(weightLb),
    activity: "very",
    goal,
    formula: "mifflin",
    bodyFatPct: 15,
    fasterBulk: false,
    zigzag: false,
  });
}

describe("mealBuilder", () => {
  for (const weightLb of WEIGHTS_LB) {
    for (const goal of GOALS) {
      for (const dietId of MENUS) {
        for (const mealsPerDay of [3, 4] as const) {
          it(`${weightLb}lb · ${goal} · ${dietId} · ${mealsPerDay} meals within ±3% kcal and ±5g protein`, () => {
            const macros = macrosFor(weightLb, goal);
            const built = buildDiet({
              dietId,
              goal,
              macros,
              mealsPerDay,
            });
            const calErr =
              Math.abs(built.totals.calories - macros.target) / macros.target;
            const proErr = Math.abs(built.totals.protein - macros.protein);
            expect(calErr).toBeLessThanOrEqual(0.03);
            expect(proErr).toBeLessThanOrEqual(5);
          });
        }
      }
    }
  }

  it("swap combinations stay on target", () => {
    const macros = macrosFor(182, "cut");
    const swaps = [
      { "poultry-fish-pork": "93/7 ground turkey", starch: "Jasmine rice" },
      { fish: "Salmon", "dairy-protein": "Low-fat cottage cheese" },
    ];
    for (const swap of swaps) {
      const built = buildDiet({
        dietId: "simple-lean",
        goal: "cut",
        macros,
        mealsPerDay: 4,
        swaps: swap,
      });
      const calErr =
        Math.abs(built.totals.calories - macros.target) / macros.target;
      const proErr = Math.abs(built.totals.protein - macros.protein);
      expect(calErr).toBeLessThanOrEqual(0.03);
      expect(proErr).toBeLessThanOrEqual(5);
    }
  });
});
