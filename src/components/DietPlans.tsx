"use client";

import { DIETS, type DietId } from "@/data/diets";
import { goalLogic } from "@/data/goalCopy";
import { nextSwapOption, swapGroupFor } from "@/data/swaps";
import { Card, Eyebrow } from "@/components/ui/Card";
import { usePlan } from "@/hooks/usePlan";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  formatIngredientAmount,
  formatStatsLine,
} from "@/lib/mealBuilder";
import type { FirstMealTime, MealsPerDay } from "@/lib/prefs";

function LockedMealPlan() {
  function scrollToCalculator() {
    const el = document.getElementById("calc-sex");
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => el?.focus(), 400);
  }

  return (
    <div className="relative overflow-hidden rounded-card border border-line">
      {/* Decorative skeleton — no real numbers in DOM */}
      <div
        className="pointer-events-none select-none p-5 blur-[3px] opacity-40"
        aria-hidden
      >
        <div className="space-y-4 border-l border-line pl-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-card border border-line p-4">
              <div className="h-3 w-24 rounded-pill bg-line" />
              <div className="mt-3 h-5 w-40 rounded-pill bg-line" />
              <div className="mt-3 space-y-2">
                <div className="h-3 w-full rounded-pill bg-line" />
                <div className="h-3 w-4/5 rounded-pill bg-line" />
                <div className="h-3 w-3/5 rounded-pill bg-line" />
              </div>
              <div className="mt-4 h-2 w-full rounded-pill bg-line" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-paper/80 p-6">
        <Card className="max-w-md text-center shadow-card">
          <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
            Your meal plan builds itself
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-graphite">
            Enter your stats above, pick your goal, and Fit 60 writes a meal plan
            portioned exactly to you — your weight, your height, your age, your
            goal.
          </p>
          <button
            type="button"
            onClick={scrollToCalculator}
            className="mt-5 rounded-pill bg-cobalt px-5 py-2.5 text-sm font-medium text-paper focus-ring"
          >
            Calculate my calories
          </button>
        </Card>
      </div>
    </div>
  );
}

export function DietPlans() {
  const { plan, hydrated, ready, macros, builtDiet, updatePlan } = usePlan();
  const reduced = usePrefersReducedMotion();
  const morph = reduced ? "number-morph-instant" : "number-morph";

  // SSR + pre-complete: locked only (no meal data)
  if (!hydrated || !ready || !macros || !builtDiet) {
    return <LockedMealPlan />;
  }

  function cycleSwap(groupId: string, currentName: string) {
    const group = swapGroupFor(currentName);
    if (!group) return;
    const next = nextSwapOption(group, currentName);
    updatePlan({
      swaps: { ...plan.swaps, [groupId]: next.name },
    });
  }

  const statsLine = formatStatsLine(plan);

  return (
    <div className="space-y-5">
      <div>
        <h3 className={`font-display text-xl font-semibold text-ink ${morph}`}>
          {builtDiet.header}
        </h3>
        <p className={`mt-2 font-mono text-xs leading-relaxed text-graphite ${morph}`}>
          Built for: {statsLine} → Maintenance {macros.maintenance.toLocaleString()}{" "}
          kcal → Target {macros.target.toLocaleString()} kcal · {macros.protein}g
          protein · {macros.fat}g fat · {macros.carbs}g carbs
        </p>
        <p className="mt-3 max-w-read text-sm leading-relaxed text-graphite">
          {goalLogic(plan.goal)}
        </p>
      </div>

      <Card>
        <Eyebrow>Make it yours</Eyebrow>
        <div className="mt-4 space-y-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-graphite">
              Menu
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {DIETS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => updatePlan({ dietId: d.id as DietId })}
                  className={`rounded-pill border px-4 py-2 text-sm font-medium focus-ring ${
                    plan.dietId === d.id
                      ? "border-cobalt bg-cobalt text-paper"
                      : "border-line text-ink hover:border-cobalt/40"
                  }`}
                >
                  {d.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-graphite">
              Meals per day
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {([3, 4] as MealsPerDay[]).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => updatePlan({ mealsPerDay: n })}
                  className={`rounded-pill border px-4 py-2 text-sm font-medium focus-ring ${
                    plan.mealsPerDay === n
                      ? "border-cobalt bg-cobalt text-paper"
                      : "border-line text-ink hover:border-cobalt/40"
                  }`}
                >
                  {n} meals
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-graphite">
              First meal time
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(
                [
                  { value: "08:00", label: "8 AM" },
                  { value: "10:00", label: "10 AM" },
                  { value: "12:00", label: "12 PM" },
                ] as { value: FirstMealTime; label: string }[]
              ).map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updatePlan({ firstMealTime: opt.value })}
                  className={`rounded-pill border px-4 py-2 text-sm font-medium focus-ring ${
                    plan.firstMealTime === opt.value
                      ? "border-cobalt bg-cobalt text-paper"
                      : "border-line text-ink hover:border-cobalt/40"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-graphite">
          Every option keeps you on your numbers — swap freely.
        </p>
      </Card>

      {builtDiet.droppedSnack && plan.mealsPerDay === 3 && (
        <p className="text-sm text-graphite">
          Snack removed — calories and protein redistributed across three meals.
        </p>
      )}
      {builtDiet.addedSnack && (
        <p className="text-sm text-graphite">
          Extra snack added — target is above 3,200 kcal.
        </p>
      )}

      <div className="flex flex-wrap gap-4 font-mono text-sm text-graphite">
        <span>
          Day total{" "}
          <span className={`text-ink ${morph}`}>
            ~{builtDiet.totals.calories} cal ·{" "}
            {Math.round(builtDiet.totals.protein)}P /{" "}
            {Math.round(builtDiet.totals.carbs)}C /{" "}
            {Math.round(builtDiet.totals.fat)}F
          </span>
        </span>
        {!builtDiet.withinTolerance && (
          <span className="text-rest">Outside ±3% — portions at bounds</span>
        )}
      </div>

      <div className="relative space-y-0 border-l border-line pl-5">
        {builtDiet.meals.map((meal) => (
          <article key={meal.id} className="relative pb-6 last:pb-0">
            <span
              className="absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-cobalt bg-paper"
              aria-hidden
            />
            <Card>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-graphite">
                {meal.label} — {meal.time}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-ink">
                {meal.name}
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-graphite">
                {meal.ingredients.map((ing) => {
                  const group = ing.swapGroupId
                    ? swapGroupFor(ing.name)
                    : undefined;
                  const canSwap =
                    group &&
                    (ing.role === "protein" ||
                      ing.role === "carb" ||
                      ing.role === "produce");
                  return (
                    <li
                      key={`${meal.id}-${ing.name}`}
                      className="flex flex-wrap items-center gap-2"
                    >
                      <span className={`font-mono text-ink ${morph}`}>
                        {formatIngredientAmount(ing.amount, ing.unit)}
                      </span>{" "}
                      <span>{ing.name}</span>
                      {canSwap && group && (
                        <button
                          type="button"
                          onClick={() => cycleSwap(group.id, ing.name)}
                          aria-label={`Swap ${ing.name} for ${nextSwapOption(group, ing.name).name}`}
                          className="rounded-pill border border-line px-2 py-0.5 font-mono text-xs text-cobalt focus-ring hover:border-cobalt/40"
                          title="Swap ingredient"
                        >
                          ⇄
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className="mt-3 flex h-2 overflow-hidden rounded-pill bg-line">
                {(() => {
                  const t =
                    meal.totals.protein + meal.totals.carbs + meal.totals.fat ||
                    1;
                  return (
                    <>
                      <div
                        className="h-full bg-cobalt"
                        style={{
                          width: `${(meal.totals.protein / t) * 100}%`,
                        }}
                      />
                      <div
                        className="h-full bg-graphite"
                        style={{
                          width: `${(meal.totals.carbs / t) * 100}%`,
                        }}
                      />
                      <div
                        className="h-full bg-dawn"
                        style={{
                          width: `${(meal.totals.fat / t) * 100}%`,
                        }}
                      />
                    </>
                  );
                })()}
              </div>
              <p className={`mt-2 font-mono text-xs text-graphite ${morph}`}>
                ~{meal.totals.calories} cal · {meal.totals.protein}g P ·{" "}
                {meal.totals.carbs}g C · {meal.totals.fat}g F
              </p>
            </Card>
          </article>
        ))}
      </div>
    </div>
  );
}
