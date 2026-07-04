import type { IngredientUnit } from "@/data/diets";

export interface SwapOption {
  name: string;
  unit: IngredientUnit;
  amount: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface SwapGroup {
  id: string;
  /** Ingredient names that participate in this swap group */
  members: string[];
  options: SwapOption[];
}

export const SWAP_GROUPS: SwapGroup[] = [
  {
    id: "poultry-fish-pork",
    members: [
      "Chicken breast",
      "93/7 ground turkey",
      "White fish",
      "Lean pork loin",
      "96/4 or 93/7 ground beef",
      "93/7 ground beef or turkey",
    ],
    options: [
      {
        name: "Chicken breast",
        unit: "oz",
        amount: 6,
        calories: 280,
        protein: 52,
        carbs: 0,
        fat: 6,
      },
      {
        name: "93/7 ground turkey",
        unit: "oz",
        amount: 6,
        calories: 260,
        protein: 48,
        carbs: 0,
        fat: 10,
      },
      {
        name: "White fish",
        unit: "oz",
        amount: 6,
        calories: 170,
        protein: 36,
        carbs: 0,
        fat: 2,
      },
      {
        name: "Lean pork loin",
        unit: "oz",
        amount: 6,
        calories: 250,
        protein: 44,
        carbs: 0,
        fat: 8,
      },
    ],
  },
  {
    id: "starch",
    members: [
      "Baked potato",
      "Cooked rice",
      "Cooked jasmine rice",
      "Sweet potato",
      "Jasmine rice",
    ],
    options: [
      {
        name: "Baked potato",
        unit: "g",
        amount: 500,
        calories: 385,
        protein: 10,
        carbs: 87,
        fat: 0,
      },
      {
        name: "Jasmine rice",
        unit: "g",
        amount: 200,
        calories: 260,
        protein: 5,
        carbs: 56,
        fat: 1,
      },
      {
        name: "Sweet potato",
        unit: "g",
        amount: 350,
        calories: 300,
        protein: 5,
        carbs: 70,
        fat: 0,
      },
    ],
  },
  {
    id: "fish",
    members: ["Cod, tilapia, or shrimp", "Salmon"],
    options: [
      {
        name: "Cod, tilapia, or shrimp",
        unit: "oz",
        amount: 5,
        calories: 140,
        protein: 30,
        carbs: 0,
        fat: 1,
      },
      {
        name: "Salmon",
        unit: "oz",
        amount: 5,
        calories: 280,
        protein: 32,
        carbs: 0,
        fat: 16,
      },
    ],
  },
  {
    id: "dairy-protein",
    members: [
      "Nonfat Greek yogurt",
      "Full-fat Greek yogurt",
      "Low-fat cottage cheese",
      "Cottage cheese",
    ],
    options: [
      {
        name: "Nonfat Greek yogurt",
        unit: "g",
        amount: 200,
        calories: 120,
        protein: 20,
        carbs: 8,
        fat: 0,
      },
      {
        name: "Low-fat cottage cheese",
        unit: "g",
        amount: 200,
        calories: 160,
        protein: 24,
        carbs: 8,
        fat: 2,
      },
    ],
  },
  {
    id: "berries",
    members: ["Blueberries", "Strawberries", "Any berry"],
    options: [
      {
        name: "Blueberries",
        unit: "g",
        amount: 150,
        calories: 85,
        protein: 1,
        carbs: 21,
        fat: 0,
      },
      {
        name: "Strawberries",
        unit: "g",
        amount: 150,
        calories: 50,
        protein: 1,
        carbs: 12,
        fat: 0,
      },
      {
        name: "Any berry",
        unit: "g",
        amount: 150,
        calories: 70,
        protein: 1,
        carbs: 17,
        fat: 0,
      },
    ],
  },
  {
    id: "veg",
    members: [
      "Broccoli",
      "Green beans",
      "Asparagus or zucchini",
      "Asparagus",
      "Zucchini",
    ],
    options: [
      {
        name: "Broccoli",
        unit: "cup",
        amount: 2,
        calories: 60,
        protein: 5,
        carbs: 12,
        fat: 0,
      },
      {
        name: "Green beans",
        unit: "cup",
        amount: 2,
        calories: 60,
        protein: 3,
        carbs: 14,
        fat: 0,
      },
      {
        name: "Asparagus",
        unit: "cup",
        amount: 2,
        calories: 40,
        protein: 4,
        carbs: 8,
        fat: 0,
      },
      {
        name: "Zucchini",
        unit: "cup",
        amount: 2,
        calories: 40,
        protein: 3,
        carbs: 8,
        fat: 0,
      },
    ],
  },
];

export function swapGroupFor(ingredientName: string): SwapGroup | undefined {
  return SWAP_GROUPS.find((g) => g.members.includes(ingredientName));
}

export function nextSwapOption(
  group: SwapGroup,
  currentName: string,
): SwapOption {
  const idx = group.options.findIndex((o) => o.name === currentName);
  const next = group.options[(idx + 1) % group.options.length];
  return next;
}
