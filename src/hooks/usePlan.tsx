"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { calculateMacros, type MacroResult } from "@/lib/calories";
import {
  DEFAULT_PLAN,
  isPlanReady,
  isPlanValid,
  PREF_KEYS,
  type PlanState,
} from "@/lib/prefs";
import { buildDiet, type BuiltDiet } from "@/lib/mealBuilder";

interface PlanContextValue {
  plan: PlanState;
  hydrated: boolean;
  ready: boolean;
  macros: MacroResult | null;
  builtDiet: BuiltDiet | null;
  updatePlan: (partial: Partial<PlanState>) => void;
  /** Mark calculator complete if inputs are valid */
  completeCalculator: () => void;
  startOver: () => void;
}

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan, hydrated] = useLocalStorage<PlanState>(
    PREF_KEYS.plan,
    DEFAULT_PLAN,
  );

  const updatePlan = useCallback((partial: Partial<PlanState>) => {
    setPlan((prev) => {
      const next = { ...prev, ...partial };
      // Any calculator field edit with valid inputs marks complete
      const calcTouched =
        partial.sex !== undefined ||
        partial.age !== undefined ||
        partial.heightCm !== undefined ||
        partial.weightKg !== undefined ||
        partial.activity !== undefined ||
        partial.goal !== undefined ||
        partial.formula !== undefined ||
        partial.bodyFatPct !== undefined ||
        partial.fasterBulk !== undefined ||
        partial.zigzag !== undefined;
      if (calcTouched && isPlanValid(next)) {
        next.completed = true;
      }
      return next;
    });
  }, [setPlan]);

  const completeCalculator = useCallback(() => {
    setPlan((prev) => {
      if (!isPlanValid(prev)) return prev;
      return { ...prev, completed: true };
    });
  }, [setPlan]);

  const startOver = useCallback(() => {
    setPlan({ ...DEFAULT_PLAN });
  }, [setPlan]);

  const ready = hydrated && isPlanReady(plan);

  const macros = useMemo(() => {
    if (!ready) return null;
    return calculateMacros(plan);
  }, [plan, ready]);

  const builtDiet = useMemo(() => {
    if (!ready || !macros) return null;
    return buildDiet({
      dietId: plan.dietId,
      goal: plan.goal,
      macros,
      mealsPerDay: plan.mealsPerDay,
      swaps: plan.swaps,
      firstMealTime: plan.firstMealTime,
    });
  }, [plan, ready, macros]);

  const value = useMemo(
    () => ({
      plan,
      hydrated,
      ready,
      macros,
      builtDiet,
      updatePlan,
      completeCalculator,
      startOver,
    }),
    [
      plan,
      hydrated,
      ready,
      macros,
      builtDiet,
      updatePlan,
      completeCalculator,
      startOver,
    ],
  );

  return (
    <PlanContext.Provider value={value}>{children}</PlanContext.Provider>
  );
}

export function usePlan(): PlanContextValue {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
