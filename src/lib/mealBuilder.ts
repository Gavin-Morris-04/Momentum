import {
  getDiet,
  getVariant,
  type DietId,
  type DietPlan,
  type IngredientDef,
  type IngredientUnit,
  type MealDef,
} from "@/data/diets";
import { swapGroupFor, type SwapOption } from "@/data/swaps";
import {
  ACTIVITY_OPTIONS,
  cmToFtIn,
  kgToLbs,
  type ActivityLevel,
  type Goal,
  type MacroResult,
} from "@/lib/calories";
import type { FirstMealTime, MealsPerDay } from "@/lib/prefs";

export interface ScaledIngredient {
  name: string;
  role: IngredientDef["role"];
  amount: number;
  unit: IngredientUnit;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  /** Swap group id if this ingredient can be swapped */
  swapGroupId?: string;
}

export interface BuiltMeal {
  id: string;
  label: string;
  time: string;
  name: string;
  ingredients: ScaledIngredient[];
  totals: Macros;
}

export interface BuiltDiet {
  plan: DietPlan;
  goal: Goal;
  meals: BuiltMeal[];
  totals: Macros;
  targetCalories: number;
  targetProtein: number;
  withinTolerance: boolean;
  proteinWithinTolerance: boolean;
  droppedSnack: boolean;
  addedSnack: boolean;
  header: string;
}

export interface BuildOptions {
  dietId: DietId;
  goal: Goal;
  macros: MacroResult;
  mealsPerDay?: MealsPerDay;
  swaps?: Record<string, string>;
  firstMealTime?: FirstMealTime;
}

interface Macros {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const MEAL_TIMES: Record<FirstMealTime, string[]> = {
  "08:00": ["8:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"],
  "10:00": ["10:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"],
  "12:00": ["12:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"],
};

function roundAmount(amount: number, unit: IngredientUnit): number {
  switch (unit) {
    case "g":
      return Math.max(0, Math.round(amount / 5) * 5);
    case "oz":
    case "unit":
    case "tbsp":
    case "tsp":
    case "slice":
    case "cup":
      return Math.max(0, Math.round(amount * 2) / 2);
    default:
      return Math.round(amount);
  }
}

export function formatIngredientAmount(
  amount: number,
  unit: IngredientUnit,
): string {
  const n = Number.isInteger(amount)
    ? String(amount)
    : amount.toFixed(1).replace(/\.0$/, "");
  if (unit === "unit") return n;
  if (unit === "slice") return `${n} ${amount === 1 ? "slice" : "slices"}`;
  return `${n}${unit === "g" || unit === "oz" ? unit : ` ${unit}`}`;
}

function applySwapOption(
  ing: IngredientDef,
  option: SwapOption,
): IngredientDef {
  const ratio = option.amount === 0 ? 0 : ing.amount / option.amount;
  return {
    ...ing,
    name: option.name,
    unit: option.unit,
    amount: ing.amount,
    calories: option.calories * ratio,
    protein: option.protein * ratio,
    carbs: option.carbs * ratio,
    fat: option.fat * ratio,
  };
}

function applySwaps(
  meals: MealDef[],
  swaps: Record<string, string>,
): MealDef[] {
  return meals.map((meal) => ({
    ...meal,
    ingredients: meal.ingredients.map((ing) => {
      const group = swapGroupFor(ing.name);
      if (!group) return { ...ing };
      const selected = swaps[group.id];
      if (!selected) return { ...ing };
      const option = group.options.find((o) => o.name === selected);
      if (!option) return { ...ing };
      return applySwapOption(ing, option);
    }),
  }));
}

function applyMealTimes(
  meals: MealDef[],
  firstMealTime: FirstMealTime,
): MealDef[] {
  const times = MEAL_TIMES[firstMealTime];
  return meals.map((meal, index) => ({
    ...meal,
    time: times[Math.min(index, times.length - 1)] ?? meal.time,
  }));
}

function scaleIngredient(
  ing: IngredientDef,
  amount: number,
  swapGroupId?: string,
): ScaledIngredient {
  const rounded = roundAmount(amount, ing.unit);
  const ratio = ing.amount === 0 ? 0 : rounded / ing.amount;
  return {
    name: ing.name,
    role: ing.role,
    amount: rounded,
    unit: ing.unit,
    calories: Math.round(ing.calories * ratio),
    protein: Math.round(ing.protein * ratio * 10) / 10,
    carbs: Math.round(ing.carbs * ratio * 10) / 10,
    fat: Math.round(ing.fat * ratio * 10) / 10,
    swapGroupId,
  };
}

function sumMacros(items: ScaledIngredient[]): Macros {
  return items.reduce(
    (acc, i) => ({
      calories: acc.calories + i.calories,
      protein: acc.protein + i.protein,
      carbs: acc.carbs + i.carbs,
      fat: acc.fat + i.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );
}

function slotMacros(slots: { ing: IngredientDef; amount: number }[]): Macros {
  return slots.reduce(
    (acc, s) => {
      const ratio = s.ing.amount === 0 ? 0 : s.amount / s.ing.amount;
      return {
        calories: acc.calories + s.ing.calories * ratio,
        protein: acc.protein + s.ing.protein * ratio,
        carbs: acc.carbs + s.ing.carbs * ratio,
        fat: acc.fat + s.ing.fat * ratio,
      };
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );
}

/** Soft floor only — prefer target accuracy over catalog min/max bounds. */
function softClamp(ing: IngredientDef, amount: number): number {
  return Math.max(ing.amount * 0.1, amount);
}

function buildFromMeals(
  meals: MealDef[],
  targetCalories: number,
  targetProtein: number,
  targetFat: number,
): BuiltMeal[] {
  type Slot = {
    mealIndex: number;
    ingIndex: number;
    ing: IngredientDef;
    amount: number;
  };

  const slots: Slot[] = [];
  meals.forEach((meal, mealIndex) => {
    meal.ingredients.forEach((ing, ingIndex) => {
      slots.push({ mealIndex, ingIndex, ing, amount: ing.amount });
    });
  });

  const proteinSlots = slots.filter((s) => s.ing.role === "protein");
  const fatSlots = slots.filter((s) => s.ing.role === "fat");
  const carbSlots = slots.filter((s) => s.ing.role === "carb");
  const produceSlots = slots.filter((s) => s.ing.role === "produce");
  const flexSlots = slots.filter((s) => s.ing.role === "flex");

  for (const s of produceSlots) {
    s.amount = s.ing.amount;
  }

  function scaleGroup(
    group: Slot[],
    targetMacro: number,
    key: "protein" | "fat" | "calories",
  ) {
    if (!group.length) return;
    const current = group.reduce((sum, s) => {
      const ratio = s.ing.amount === 0 ? 0 : s.amount / s.ing.amount;
      return sum + s.ing[key] * ratio;
    }, 0);
    if (current <= 0) return;
    const scale = targetMacro / current;
    for (const s of group) {
      s.amount = softClamp(s.ing, s.amount * scale);
    }
  }

  // Protein foods cover (target − protein from produce/carbs/fat at base)
  const otherProtein = [...produceSlots, ...carbSlots, ...fatSlots].reduce(
    (sum, s) => sum + s.ing.protein * (s.amount / s.ing.amount),
    0,
  );
  scaleGroup(proteinSlots, Math.max(0, targetProtein - otherProtein), "protein");

  const otherFat = slotMacros([
    ...produceSlots,
    ...proteinSlots,
    ...carbSlots,
  ]).fat;
  scaleGroup(fatSlots, Math.max(0, targetFat - otherFat), "fat");

  // Carbs fill remaining calories
  const nonCarbCals = slotMacros([
    ...produceSlots,
    ...proteinSlots,
    ...fatSlots,
    ...flexSlots,
  ]).calories;
  const carbTargetCals = Math.max(0, targetCalories - nonCarbCals);
  scaleGroup(carbSlots, carbTargetCals, "calories");

  // Flex absorbs leftover calories
  const afterFlexBase = slotMacros(slots).calories;
  const flexGap = targetCalories - afterFlexBase;
  if (flexSlots.length && Math.abs(flexGap) > 20) {
    const flexCals = slotMacros(flexSlots).calories;
    if (flexCals > 0) {
      scaleGroup(flexSlots, flexCals + flexGap, "calories");
    }
  }

  // Lock protein, then fill/trim calories with carbs and fat only (never touch protein again)
  for (let i = 0; i < 5; i++) {
    const otherP = slotMacros([
      ...produceSlots,
      ...carbSlots,
      ...fatSlots,
      ...flexSlots,
    ]).protein;
    scaleGroup(
      proteinSlots,
      Math.max(0, targetProtein - otherP),
      "protein",
    );

    const nonCarbCals2 = slotMacros([
      ...produceSlots,
      ...proteinSlots,
      ...fatSlots,
      ...flexSlots,
    ]).calories;
    if (carbSlots.length) {
      scaleGroup(
        carbSlots,
        Math.max(10, targetCalories - nonCarbCals2),
        "calories",
      );
    }

    const calGap = targetCalories - slotMacros(slots).calories;
    if (calGap < -25 && fatSlots.length) {
      const fatCals = slotMacros(fatSlots).calories;
      scaleGroup(fatSlots, Math.max(5, fatCals + calGap), "calories");
    } else if (calGap > 25 && fatSlots.length && !carbSlots.length) {
      const fatCals = slotMacros(fatSlots).calories;
      scaleGroup(fatSlots, fatCals + calGap, "calories");
    }
  }

  // Final protein lock after carb/fat moves (carbs contribute a little protein)
  const otherPFinal = slotMacros([
    ...produceSlots,
    ...carbSlots,
    ...fatSlots,
    ...flexSlots,
  ]).protein;
  scaleGroup(
    proteinSlots,
    Math.max(0, targetProtein - otherPFinal),
    "protein",
  );
  const nonCarbFinal = slotMacros([
    ...produceSlots,
    ...proteinSlots,
    ...fatSlots,
    ...flexSlots,
  ]).calories;
  if (carbSlots.length) {
    scaleGroup(
      carbSlots,
      Math.max(10, targetCalories - nonCarbFinal),
      "calories",
    );
  }

  return meals.map((meal, mealIndex) => {
    const ingredients = meal.ingredients.map((ing, ingIndex) => {
      const slot = slots.find(
        (s) => s.mealIndex === mealIndex && s.ingIndex === ingIndex,
      )!;
      const group = swapGroupFor(ing.name);
      return scaleIngredient(ing, slot.amount, group?.id);
    });
    // Totals from pre-round amounts so rounding display doesn't break targets
    const precise = meal.ingredients.map((_, ingIndex) => {
      const slot = slots.find(
        (s) => s.mealIndex === mealIndex && s.ingIndex === ingIndex,
      )!;
      const ratio =
        slot.ing.amount === 0 ? 0 : slot.amount / slot.ing.amount;
      return {
        calories: slot.ing.calories * ratio,
        protein: slot.ing.protein * ratio,
        carbs: slot.ing.carbs * ratio,
        fat: slot.ing.fat * ratio,
      };
    });
    const totals = precise.reduce(
      (acc, i) => ({
        calories: acc.calories + i.calories,
        protein: acc.protein + i.protein,
        carbs: acc.carbs + i.carbs,
        fat: acc.fat + i.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 },
    );
    return {
      id: meal.id,
      label: meal.label,
      time: meal.time,
      name: meal.name,
      ingredients,
      totals: {
        calories: Math.round(totals.calories),
        protein: Math.round(totals.protein),
        carbs: Math.round(totals.carbs),
        fat: Math.round(totals.fat),
      },
    };
  });
}

export function buildDiet(options: BuildOptions): BuiltDiet {
  const {
    dietId,
    goal,
    macros,
    mealsPerDay = 4,
    swaps = {},
    firstMealTime = "12:00",
  } = options;

  const plan = getDiet(dietId);
  const variant = getVariant(plan, goal);
  let meals = variant.meals.map((m) => ({
    ...m,
    ingredients: m.ingredients.map((i) => ({ ...i })),
  }));
  let droppedSnack = false;
  let addedSnack = false;

  const targetCalories = macros.target;
  const targetProtein = macros.protein;
  const targetFat = macros.fat;

  // User preference: 3 meals removes snack (redistribute via solver)
  if (mealsPerDay === 3) {
    const withoutSnack = meals.filter(
      (m) => !m.label.toLowerCase().includes("snack"),
    );
    if (withoutSnack.length < meals.length) {
      meals = withoutSnack;
      droppedSnack = true;
    }
  }

  // Very low floor: also drop snack
  if (targetCalories <= 1500 && mealsPerDay === 4) {
    const withoutSnack = meals.filter(
      (m) => !m.label.toLowerCase().includes("snack"),
    );
    if (withoutSnack.length < meals.length) {
      meals = withoutSnack;
      droppedSnack = true;
    }
  }

  // Very high: add extra snack
  if (targetCalories > 3200 && variant.addOnSnack && mealsPerDay === 4) {
    meals = [
      ...meals,
      {
        ...variant.addOnSnack,
        ingredients: variant.addOnSnack.ingredients.map((i) => ({ ...i })),
      },
    ];
    addedSnack = true;
  }

  meals = applySwaps(meals, swaps);
  meals = applyMealTimes(meals, firstMealTime);

  const builtMeals = buildFromMeals(
    meals,
    targetCalories,
    targetProtein,
    targetFat,
  );

  const totals = builtMeals.reduce(
    (acc, m) => ({
      calories: acc.calories + m.totals.calories,
      protein: acc.protein + m.totals.protein,
      carbs: acc.carbs + m.totals.carbs,
      fat: acc.fat + m.totals.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );

  const withinTolerance =
    Math.abs(totals.calories - targetCalories) / targetCalories <= 0.03;
  const proteinWithinTolerance =
    Math.abs(totals.protein - targetProtein) <= 5;

  const header = `Your plan — ${macros.goalLabel.toLowerCase()}`;

  return {
    plan,
    goal,
    meals: builtMeals,
    totals,
    targetCalories,
    targetProtein,
    withinTolerance,
    proteinWithinTolerance,
    droppedSnack,
    addedSnack,
    header,
  };
}

export function mealDescription(meal: BuiltMeal): string {
  const lines = meal.ingredients.map(
    (i) => `${formatIngredientAmount(i.amount, i.unit)} ${i.name}`.trim(),
  );
  lines.push(
    `~${meal.totals.calories} cal · ${meal.totals.protein}P / ${meal.totals.carbs}C / ${meal.totals.fat}F`,
  );
  return lines.join("\n");
}

export function formatStatsLine(plan: {
  weightKg: number;
  heightCm: number;
  age: number;
  activity: ActivityLevel;
  weightUnit: "lbs" | "kg";
  heightUnit: "imperial" | "metric";
}): string {
  const weight =
    plan.weightUnit === "lbs"
      ? `${Math.round(kgToLbs(plan.weightKg))} lb`
      : `${Math.round(plan.weightKg)} kg`;
  let height: string;
  if (plan.heightUnit === "imperial") {
    const { ft, inches } = cmToFtIn(plan.heightCm);
    height = `${ft}'${inches}"`;
  } else {
    height = `${Math.round(plan.heightCm)} cm`;
  }
  const activity =
    ACTIVITY_OPTIONS.find((a) => a.id === plan.activity)?.label ?? plan.activity;
  return `${weight} · ${height} · ${plan.age} · ${activity}`;
}
