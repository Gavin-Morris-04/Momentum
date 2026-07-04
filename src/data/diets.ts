import type { Goal } from "@/lib/calories";

export type DietId = "simple-lean" | "hearty-classic";
export type IngredientUnit = "g" | "oz" | "unit" | "tbsp" | "tsp" | "cup" | "slice";
export type IngredientRole = "protein" | "carb" | "fat" | "produce" | "flex";

/** Goal family for menu variants. */
export type GoalFamily = "cut" | "maintain" | "bulk";

export function goalFamily(goal: Goal): GoalFamily {
  if (goal === "lean-bulk") return "bulk";
  if (goal === "maintain") return "maintain";
  return "cut";
}

export interface IngredientDef {
  name: string;
  role: IngredientRole;
  amount: number;
  unit: IngredientUnit;
  /** Macros for the base amount */
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  minAmount?: number;
  maxAmount?: number;
}

export interface MealDef {
  id: string;
  label: string;
  time: string;
  name: string;
  ingredients: IngredientDef[];
}

export interface DietVariant {
  family: GoalFamily;
  aggressive?: boolean;
  meals: MealDef[];
  /** Extra snack meal when target is very high */
  addOnSnack?: MealDef;
}

export interface DietPlan {
  id: DietId;
  name: string;
  description: string;
  variants: DietVariant[];
}

export const BASE_CALORIES = 1750;

function ing(
  name: string,
  role: IngredientRole,
  amount: number,
  unit: IngredientUnit,
  calories: number,
  protein: number,
  carbs: number,
  fat: number,
  minAmount?: number,
  maxAmount?: number,
): IngredientDef {
  return {
    name,
    role,
    amount,
    unit,
    calories,
    protein,
    carbs,
    fat,
    minAmount,
    maxAmount,
  };
}

/** DIET A — Simple & Lean variants */
const dietACut: MealDef[] = [
  {
    id: "a-m1",
    label: "Meal 1",
    time: "12:00 PM",
    name: "Protein Oatmeal Bowl",
    ingredients: [
      ing("Oats", "carb", 80, "g", 300, 10, 54, 5, 40, 160),
      ing("Nonfat Greek yogurt", "protein", 300, "g", 180, 30, 12, 0, 150, 500),
      ing("Banana", "carb", 1, "unit", 90, 1, 23, 0, 0.5, 2),
      ing("Blueberries", "produce", 150, "g", 85, 1, 21, 0),
      ing("Chia seeds", "fat", 1, "tbsp", 60, 2, 5, 4, 0.5, 2),
    ],
  },
  {
    id: "a-m2",
    label: "Meal 2",
    time: "4:00 PM",
    name: "Chicken & Potato Bowl",
    ingredients: [
      ing("Chicken breast", "protein", 6, "oz", 280, 52, 0, 6, 3, 12),
      ing("Baked potato", "carb", 500, "g", 385, 10, 87, 0, 200, 900),
      ing("Broccoli", "produce", 2, "cup", 60, 5, 12, 0),
    ],
  },
  {
    id: "a-snack",
    label: "Snack",
    time: "6:00 PM",
    name: "Apple & Yogurt",
    ingredients: [
      ing("Large apple", "carb", 1, "unit", 100, 0, 27, 0, 0.5, 2),
      ing("Nonfat Greek yogurt", "protein", 200, "g", 120, 20, 8, 0, 100, 400),
    ],
  },
  {
    id: "a-m3",
    label: "Meal 3",
    time: "8:00 PM",
    name: "Fish & Sweet Potato",
    ingredients: [
      ing("Cod, tilapia, or shrimp", "protein", 5, "oz", 140, 30, 0, 1, 3, 10),
      ing("Sweet potato", "carb", 350, "g", 300, 5, 70, 0, 150, 700),
      ing("Green beans", "produce", 2, "cup", 60, 3, 14, 0),
    ],
  },
];

const dietAAggressive: MealDef[] = [
  {
    id: "a-m1",
    label: "Meal 1",
    time: "12:00 PM",
    name: "Protein Oatmeal Bowl",
    ingredients: [
      ing("Oats", "carb", 40, "g", 150, 5, 27, 2.5, 20, 80),
      ing("Nonfat Greek yogurt", "protein", 400, "g", 240, 40, 16, 0, 200, 550),
      ing("Banana", "carb", 1, "unit", 90, 1, 23, 0, 0.5, 1.5),
      ing("Blueberries", "produce", 150, "g", 85, 1, 21, 0),
      ing("Chia seeds", "fat", 1, "tbsp", 60, 2, 5, 4, 0.5, 1.5),
    ],
  },
  {
    id: "a-m2",
    label: "Meal 2",
    time: "4:00 PM",
    name: "Chicken & Potato Bowl",
    ingredients: [
      ing("Chicken breast", "protein", 6, "oz", 280, 52, 0, 6, 4, 10),
      ing("Baked potato", "carb", 450, "g", 346, 9, 78, 0, 200, 700),
      ing("Broccoli", "produce", 2, "cup", 60, 5, 12, 0),
      ing("Green beans", "produce", 1, "cup", 30, 2, 7, 0),
    ],
  },
  {
    id: "a-snack",
    label: "Snack",
    time: "6:00 PM",
    name: "Apple & Yogurt",
    ingredients: [
      ing("Large apple", "carb", 1, "unit", 100, 0, 27, 0, 0.5, 1.5),
      ing("Nonfat Greek yogurt", "protein", 250, "g", 150, 25, 10, 0, 150, 400),
    ],
  },
  {
    id: "a-m3",
    label: "Meal 3",
    time: "8:00 PM",
    name: "Fish & Sweet Potato",
    ingredients: [
      ing("Cod, tilapia, or shrimp", "protein", 5, "oz", 140, 30, 0, 1, 4, 8),
      ing("Sweet potato", "carb", 300, "g", 257, 4, 60, 0, 150, 500),
      ing("Green beans", "produce", 2, "cup", 60, 3, 14, 0),
      ing("Broccoli", "produce", 1, "cup", 30, 2.5, 6, 0),
    ],
  },
];

const dietAMaintain: MealDef[] = [
  {
    id: "a-m1",
    label: "Meal 1",
    time: "12:00 PM",
    name: "Protein Oatmeal Bowl",
    ingredients: [
      ing("Oats", "carb", 80, "g", 300, 10, 54, 5, 40, 160),
      ing("Nonfat Greek yogurt", "protein", 300, "g", 180, 30, 12, 0, 150, 500),
      ing("Banana", "carb", 1, "unit", 90, 1, 23, 0, 0.5, 2),
      ing("Blueberries", "produce", 150, "g", 85, 1, 21, 0),
      ing("Chia seeds", "fat", 1, "tbsp", 60, 2, 5, 4, 0.5, 2),
    ],
  },
  {
    id: "a-m2",
    label: "Meal 2",
    time: "4:00 PM",
    name: "Chicken & Potato Bowl",
    ingredients: [
      ing("Chicken breast", "protein", 6, "oz", 280, 52, 0, 6, 3, 12),
      ing("Baked potato", "carb", 500, "g", 385, 10, 87, 0, 200, 900),
      ing("Broccoli", "produce", 2, "cup", 60, 5, 12, 0),
      ing("Olive oil", "fat", 1, "tsp", 40, 0, 0, 4.5, 0.5, 3),
    ],
  },
  {
    id: "a-snack",
    label: "Snack",
    time: "6:00 PM",
    name: "Apple, Yogurt & Peanut Butter",
    ingredients: [
      ing("Large apple", "carb", 1, "unit", 100, 0, 27, 0, 0.5, 2),
      ing("Nonfat Greek yogurt", "protein", 200, "g", 120, 20, 8, 0, 100, 400),
      ing("Natural peanut butter", "fat", 1, "tbsp", 95, 4, 3, 8, 0.5, 2),
    ],
  },
  {
    id: "a-m3",
    label: "Meal 3",
    time: "8:00 PM",
    name: "Fish & Sweet Potato",
    ingredients: [
      ing("Cod, tilapia, or shrimp", "protein", 5, "oz", 140, 30, 0, 1, 3, 10),
      ing("Sweet potato", "carb", 350, "g", 300, 5, 70, 0, 150, 700),
      ing("Green beans", "produce", 2, "cup", 60, 3, 14, 0),
    ],
  },
];

const dietABulk: MealDef[] = [
  {
    id: "a-m1",
    label: "Meal 1",
    time: "12:00 PM",
    name: "Protein Oatmeal Bowl",
    ingredients: [
      ing("Oats", "carb", 80, "g", 300, 10, 54, 5, 50, 180),
      ing("Full-fat Greek yogurt", "protein", 300, "g", 290, 24, 12, 15, 150, 500),
      ing("Banana", "carb", 1, "unit", 90, 1, 23, 0, 0.5, 2),
      ing("Blueberries", "produce", 150, "g", 85, 1, 21, 0),
      ing("Honey", "carb", 1, "tbsp", 64, 0, 17, 0, 0.5, 3),
      ing("Granola", "carb", 30, "g", 140, 3, 22, 5, 15, 60),
    ],
  },
  {
    id: "a-m2",
    label: "Meal 2",
    time: "4:00 PM",
    name: "Chicken & Rice Bowl",
    ingredients: [
      ing("Chicken breast", "protein", 6, "oz", 280, 52, 0, 6, 4, 12),
      ing("Cooked rice", "carb", 250, "g", 325, 6, 70, 1, 150, 500),
      ing("Broccoli", "produce", 2, "cup", 60, 5, 12, 0),
      ing("Olive oil", "fat", 2, "tsp", 80, 0, 0, 9, 1, 4),
    ],
  },
  {
    id: "a-snack",
    label: "Snack",
    time: "6:00 PM",
    name: "Apple, Yogurt & Nuts",
    ingredients: [
      ing("Large apple", "carb", 1, "unit", 100, 0, 27, 0, 0.5, 2),
      ing("Full-fat Greek yogurt", "protein", 200, "g", 190, 16, 8, 10, 100, 400),
      ing("Almonds or walnuts", "fat", 30, "g", 175, 6, 6, 15, 15, 45),
    ],
  },
  {
    id: "a-m3",
    label: "Meal 3",
    time: "8:00 PM",
    name: "Salmon & Sweet Potato",
    ingredients: [
      ing("Salmon", "protein", 5, "oz", 280, 32, 0, 16, 4, 10),
      ing("Sweet potato", "carb", 350, "g", 300, 5, 70, 0, 200, 700),
      ing("Green beans", "produce", 2, "cup", 60, 3, 14, 0),
    ],
  },
];

const dietAAddOn: MealDef = {
  id: "a-extra",
  label: "Extra snack",
  time: "10:00 AM",
  name: "Banana & Peanut Butter",
  ingredients: [
    ing("Banana", "carb", 1, "unit", 90, 1, 23, 0, 1, 2),
    ing("Natural peanut butter", "fat", 2, "tbsp", 190, 8, 6, 16, 1, 3),
  ],
};

/** DIET B — Hearty & Classic */
const dietBAggressive: MealDef[] = [
  {
    id: "b-m1",
    label: "Meal 1",
    time: "12:00 PM",
    name: "Eggs & Sourdough",
    ingredients: [
      ing("Whole eggs", "protein", 1, "unit", 70, 6, 0.5, 5, 1, 2),
      ing("Egg whites", "protein", 250, "g", 125, 27.5, 2.5, 0, 150, 400),
      ing("Sourdough", "carb", 2, "slice", 200, 8, 38, 2, 1, 3),
      ing("Strawberries", "produce", 150, "g", 50, 1, 12, 0),
    ],
  },
  {
    id: "b-m2",
    label: "Meal 2",
    time: "4:00 PM",
    name: "Beef & Rice Bowl",
    ingredients: [
      ing("96/4 or 93/7 ground beef", "protein", 6, "oz", 260, 38, 0, 10, 4, 10),
      ing("Cooked jasmine rice", "carb", 180, "g", 234, 4.5, 50, 1, 100, 400),
      ing("Peppers and onions", "produce", 1.5, "cup", 60, 1.5, 13.5, 0),
      ing("Broccoli", "produce", 1, "cup", 30, 2.5, 6, 0),
    ],
  },
  {
    id: "b-snack",
    label: "Snack",
    time: "6:00 PM",
    name: "Cottage Cheese Bowl",
    ingredients: [
      ing("Low-fat cottage cheese", "protein", 200, "g", 160, 24, 8, 2, 100, 400),
      ing("Pineapple or berries", "produce", 100, "g", 50, 0, 13, 0),
    ],
  },
  {
    id: "b-m3",
    label: "Meal 3",
    time: "8:00 PM",
    name: "Salmon & Quinoa",
    ingredients: [
      ing("Salmon", "protein", 5, "oz", 280, 32, 0, 16, 4, 5),
      ing("Cooked quinoa", "carb", 120, "g", 144, 5, 26, 2, 80, 250),
      ing("Asparagus or zucchini", "produce", 2, "cup", 40, 3, 8, 0),
      ing("Green beans", "produce", 1, "cup", 30, 2, 7, 0),
    ],
  },
];

const dietBCut: MealDef[] = dietBAggressive.map((m) => ({
  ...m,
  ingredients: m.ingredients.map((i) => ({ ...i })),
}));
// Adjust cut (non-aggressive) slightly
dietBCut[0] = {
  id: "b-m1",
  label: "Meal 1",
  time: "12:00 PM",
  name: "Eggs & Sourdough",
  ingredients: [
    ing("Whole eggs", "protein", 1, "unit", 70, 6, 0.5, 5, 1, 2),
    ing("Egg whites", "protein", 220, "g", 110, 24, 2, 0, 150, 350),
    ing("Sourdough", "carb", 2, "slice", 200, 8, 38, 2, 1, 3),
    ing("Strawberries", "produce", 150, "g", 50, 1, 12, 0),
  ],
};

const dietBMaintain: MealDef[] = [
  {
    id: "b-m1",
    label: "Meal 1",
    time: "12:00 PM",
    name: "Eggs & Sourdough",
    ingredients: [
      ing("Whole eggs", "protein", 2, "unit", 140, 12, 1, 10, 1, 3),
      ing("Egg whites", "protein", 200, "g", 100, 22, 2, 0, 100, 350),
      ing("Sourdough", "carb", 2, "slice", 200, 8, 38, 2, 1, 4),
      ing("Strawberries", "produce", 150, "g", 50, 1, 12, 0),
    ],
  },
  {
    id: "b-m2",
    label: "Meal 2",
    time: "4:00 PM",
    name: "Beef & Rice Bowl",
    ingredients: [
      ing("93/7 ground beef or turkey", "protein", 6, "oz", 300, 36, 0, 16, 4, 12),
      ing("Cooked jasmine rice", "carb", 200, "g", 260, 5, 56, 1, 100, 450),
      ing("Peppers and onions", "produce", 1, "cup", 40, 1, 9, 0),
    ],
  },
  {
    id: "b-snack",
    label: "Snack",
    time: "6:00 PM",
    name: "Cottage Cheese Bowl",
    ingredients: [
      ing("Low-fat cottage cheese", "protein", 200, "g", 160, 24, 8, 2, 100, 400),
      ing("Honey", "carb", 1, "tsp", 20, 0, 6, 0, 0.5, 2),
      ing("Pineapple or berries", "produce", 100, "g", 50, 0, 13, 0),
    ],
  },
  {
    id: "b-m3",
    label: "Meal 3",
    time: "8:00 PM",
    name: "Salmon & Quinoa",
    ingredients: [
      ing("Salmon", "protein", 5, "oz", 280, 32, 0, 16, 4, 10),
      ing("Cooked quinoa", "carb", 150, "g", 180, 6, 32, 3, 80, 300),
      ing("Asparagus or zucchini", "produce", 2, "cup", 40, 3, 8, 0),
    ],
  },
];

const dietBBulk: MealDef[] = [
  {
    id: "b-m1",
    label: "Meal 1",
    time: "12:00 PM",
    name: "Eggs & Sourdough",
    ingredients: [
      ing("Whole eggs", "protein", 3, "unit", 210, 18, 1.5, 15, 2, 4),
      ing("Egg whites", "protein", 150, "g", 75, 16.5, 1.5, 0, 100, 300),
      ing("Sourdough", "carb", 3, "slice", 300, 12, 57, 3, 2, 4),
      ing("Butter or avocado", "fat", 1, "tbsp", 100, 0, 0, 11, 0.5, 2),
      ing("Strawberries", "produce", 150, "g", 50, 1, 12, 0),
    ],
  },
  {
    id: "b-m2",
    label: "Meal 2",
    time: "4:00 PM",
    name: "Beef & Rice Bowl",
    ingredients: [
      ing("93/7 ground beef or turkey", "protein", 6, "oz", 300, 36, 0, 16, 4, 12),
      ing("Cooked jasmine rice", "carb", 280, "g", 364, 7, 78, 1, 150, 500),
      ing("Peppers and onions", "produce", 1, "cup", 40, 1, 9, 0),
      ing("Olive oil", "fat", 1, "tsp", 40, 0, 0, 4.5, 0.5, 3),
    ],
  },
  {
    id: "b-snack",
    label: "Snack",
    time: "6:00 PM",
    name: "Cottage Cheese Bowl",
    ingredients: [
      ing("Low-fat cottage cheese", "protein", 200, "g", 160, 24, 8, 2, 100, 400),
      ing("Granola", "carb", 30, "g", 140, 3, 22, 5, 15, 50),
      ing("Almonds or walnuts", "fat", 20, "g", 115, 4, 4, 10, 10, 40),
      ing("Pineapple or berries", "produce", 100, "g", 50, 0, 13, 0),
    ],
  },
  {
    id: "b-m3",
    label: "Meal 3",
    time: "8:00 PM",
    name: "Salmon & Quinoa",
    ingredients: [
      ing("Salmon", "protein", 6, "oz", 336, 38, 0, 19, 5, 10),
      ing("Cooked quinoa", "carb", 180, "g", 216, 7, 38, 3.5, 100, 350),
      ing("Asparagus or zucchini", "produce", 2, "cup", 40, 3, 8, 0),
    ],
  },
];

const dietBAddOn: MealDef = {
  id: "b-extra",
  label: "Extra snack",
  time: "10:00 AM",
  name: "Eggs & Fruit",
  ingredients: [
    ing("Whole eggs", "protein", 2, "unit", 140, 12, 1, 10, 1, 3),
    ing("Banana", "carb", 1, "unit", 90, 1, 23, 0, 1, 2),
  ],
};

export const DIETS: DietPlan[] = [
  {
    id: "simple-lean",
    name: "Simple & Lean",
    description:
      "Oats, chicken, fish, potatoes — minimal ingredients, easy prep.",
    variants: [
      { family: "cut", aggressive: true, meals: dietAAggressive, addOnSnack: dietAAddOn },
      { family: "cut", meals: dietACut, addOnSnack: dietAAddOn },
      { family: "maintain", meals: dietAMaintain, addOnSnack: dietAAddOn },
      { family: "bulk", meals: dietABulk, addOnSnack: dietAAddOn },
    ],
  },
  {
    id: "hearty-classic",
    name: "Hearty & Classic",
    description:
      "Eggs, beef, salmon, rice — fuller plates, still whole foods.",
    variants: [
      { family: "cut", aggressive: true, meals: dietBAggressive, addOnSnack: dietBAddOn },
      { family: "cut", meals: dietBCut, addOnSnack: dietBAddOn },
      { family: "maintain", meals: dietBMaintain, addOnSnack: dietBAddOn },
      { family: "bulk", meals: dietBBulk, addOnSnack: dietBAddOn },
    ],
  },
];

export function getDiet(id: DietId): DietPlan {
  return DIETS.find((d) => d.id === id) ?? DIETS[0];
}

export function getVariant(plan: DietPlan, goal: Goal): DietVariant {
  const family = goalFamily(goal);
  if (goal === "aggressive-cut") {
    const aggressive = plan.variants.find((v) => v.family === "cut" && v.aggressive);
    if (aggressive) return aggressive;
  }
  return (
    plan.variants.find((v) => v.family === family && !v.aggressive) ??
    plan.variants.find((v) => v.family === family) ??
    plan.variants[0]
  );
}
