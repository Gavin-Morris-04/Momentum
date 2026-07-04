"use client";

import { useState } from "react";
import { Dial } from "@/components/Dial";
import { Card, Eyebrow } from "@/components/ui/Card";
import { usePlan } from "@/hooks/usePlan";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  ACTIVITY_HELPERS,
  ACTIVITY_OPTIONS,
  calculateMacros,
  cmToFtIn,
  FORMULA_OPTIONS,
  ftInToCm,
  kgToLbs,
  lbsToKg,
  OUTCOME_EXPECTATIONS,
  type Goal,
} from "@/lib/calories";

export function Calculator() {
  const { plan, hydrated, updatePlan, startOver, ready } = usePlan();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const reduced = usePrefersReducedMotion();

  // Live preview macros even before "ready" so dial works while filling
  const result = calculateMacros(plan);

  const { ft, inches } = cmToFtIn(plan.heightCm);
  const weightDisplay =
    plan.weightUnit === "lbs"
      ? Math.round(kgToLbs(plan.weightKg) * 10) / 10
      : Math.round(plan.weightKg * 10) / 10;

  const morph = reduced ? "number-morph-instant" : "number-morph";
  const mainActivities = ACTIVITY_OPTIONS.filter((a) => !a.advanced);

  return (
    <div className="space-y-5" id="calculator">
      <Card>
        <Eyebrow>Maintenance calculator</Eyebrow>
        <p className="mt-2 max-w-read text-sm text-graphite">
          Tell us your numbers and Fit 60 writes your meal plan. Results save in
          this browser.
        </p>
        <p className="mt-2 font-mono text-[11px] leading-relaxed text-graphite">
          Evidence — Mifflin-St Jeor predicts resting metabolic rate within ~10%
          of measured values more reliably than other common equations
          (Frankenfield et al., 2005; Academy of Nutrition and Dietetics).
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-graphite">
              Sex
            </span>
            <select
              id="calc-sex"
              value={plan.sex}
              onChange={(e) =>
                updatePlan({ sex: e.target.value as typeof plan.sex })
              }
              className="mt-1 w-full rounded-pill border border-line bg-paper px-3 py-2 text-ink focus-ring"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>

          <label className="block">
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-graphite">
              Age (15–80)
            </span>
            <input
              id="calc-age"
              type="number"
              min={15}
              max={80}
              value={hydrated ? plan.age : ""}
              onChange={(e) => {
                const n = Number(e.target.value) || 15;
                updatePlan({ age: Math.min(80, Math.max(15, n)) });
              }}
              className="mt-1 w-full rounded-pill border border-line bg-paper px-3 py-2 font-mono text-ink focus-ring"
            />
          </label>

          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-graphite">
                Height
              </span>
              <button
                type="button"
                onClick={() =>
                  updatePlan({
                    heightUnit:
                      plan.heightUnit === "imperial" ? "metric" : "imperial",
                  })
                }
                className="font-mono text-xs text-cobalt focus-ring rounded-sm"
              >
                {plan.heightUnit === "imperial" ? "Use cm" : "Use ft/in"}
              </button>
            </div>
            {plan.heightUnit === "imperial" ? (
              <div className="mt-1 flex gap-2">
                <input
                  id="calc-height"
                  type="number"
                  min={3}
                  max={8}
                  value={hydrated ? ft : ""}
                  onChange={(e) =>
                    updatePlan({
                      heightCm: ftInToCm(Number(e.target.value) || 0, inches),
                    })
                  }
                  aria-label="Feet"
                  className="w-full rounded-pill border border-line bg-paper px-3 py-2 font-mono text-ink focus-ring"
                />
                <input
                  type="number"
                  min={0}
                  max={11}
                  value={hydrated ? inches : ""}
                  onChange={(e) =>
                    updatePlan({
                      heightCm: ftInToCm(ft, Number(e.target.value) || 0),
                    })
                  }
                  aria-label="Inches"
                  className="w-full rounded-pill border border-line bg-paper px-3 py-2 font-mono text-ink focus-ring"
                />
              </div>
            ) : (
              <input
                id="calc-height"
                type="number"
                min={100}
                max={250}
                value={hydrated ? Math.round(plan.heightCm) : ""}
                onChange={(e) =>
                  updatePlan({ heightCm: Number(e.target.value) || 0 })
                }
                className="mt-1 w-full rounded-pill border border-line bg-paper px-3 py-2 font-mono text-ink focus-ring"
              />
            )}
          </div>

          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-graphite">
                Weight
              </span>
              <button
                type="button"
                onClick={() =>
                  updatePlan({
                    weightUnit: plan.weightUnit === "lbs" ? "kg" : "lbs",
                  })
                }
                className="font-mono text-xs text-cobalt focus-ring rounded-sm"
              >
                {plan.weightUnit === "lbs" ? "Use kg" : "Use lbs"}
              </button>
            </div>
            <input
              id="calc-weight"
              type="number"
              min={50}
              max={500}
              step={0.1}
              value={hydrated ? weightDisplay : ""}
              onChange={(e) => {
                const n = Number(e.target.value) || 0;
                updatePlan({
                  weightKg: plan.weightUnit === "lbs" ? lbsToKg(n) : n,
                });
              }}
              className="mt-1 w-full rounded-pill border border-line bg-paper px-3 py-2 font-mono text-ink focus-ring"
            />
          </div>

          <label className="block sm:col-span-2">
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-graphite">
              Activity level
            </span>
            <select
              id="calc-activity"
              value={plan.activity === "bmr" ? "sedentary" : plan.activity}
              onChange={(e) =>
                updatePlan({
                  activity: e.target.value as typeof plan.activity,
                })
              }
              className="mt-1 w-full rounded-pill border border-line bg-paper px-3 py-2 text-ink focus-ring"
            >
              {mainActivities.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label} — {opt.detail}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-graphite">
              {ACTIVITY_HELPERS.join(" · ")}
            </p>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setSettingsOpen((v) => !v)}
            className="rounded-pill border border-line px-4 py-2 text-sm text-ink focus-ring"
          >
            {settingsOpen ? "Hide settings" : "Settings"}
          </button>
          {ready && (
            <button
              type="button"
              onClick={startOver}
              className="text-sm text-graphite underline-offset-2 hover:underline focus-ring rounded-sm"
            >
              Start over
            </button>
          )}
        </div>

        {settingsOpen && (
          <div className="mt-4 space-y-3 border-t border-line pt-4">
            <label className="block">
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-graphite">
                Formula
              </span>
              <select
                value={plan.formula}
                onChange={(e) =>
                  updatePlan({
                    formula: e.target.value as typeof plan.formula,
                  })
                }
                className="mt-1 w-full rounded-pill border border-line bg-paper px-3 py-2 text-ink focus-ring"
              >
                {FORMULA_OPTIONS.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                  </option>
                ))}
              </select>
              {FORMULA_OPTIONS.find((f) => f.id === plan.formula)?.note && (
                <p className="mt-2 text-xs text-graphite">
                  {FORMULA_OPTIONS.find((f) => f.id === plan.formula)?.note}
                </p>
              )}
            </label>

            {plan.formula === "katch" && (
              <label className="block">
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-graphite">
                  Body fat %
                </span>
                <input
                  type="number"
                  min={3}
                  max={60}
                  step={0.1}
                  value={hydrated ? plan.bodyFatPct : ""}
                  onChange={(e) =>
                    updatePlan({ bodyFatPct: Number(e.target.value) || 15 })
                  }
                  className="mt-1 w-full rounded-pill border border-line bg-paper px-3 py-2 font-mono text-ink focus-ring"
                />
              </label>
            )}

            <label className="flex items-center gap-2 text-sm text-ink">
              <input
                type="checkbox"
                checked={plan.activity === "bmr"}
                onChange={(e) =>
                  updatePlan({
                    activity: e.target.checked ? "bmr" : "sedentary",
                  })
                }
                className="rounded accent-cobalt focus-ring"
              />
              BMR only (×1.0) — advanced
            </label>
          </div>
        )}
      </Card>

      <Dial
        maintenance={result.maintenance}
        target={result.target}
        goal={plan.goal}
        weeklyRate={result.weeklyRate}
        clamped={result.clamped}
        clampReason={result.clampReason}
        fasterBulk={plan.fasterBulk}
        zigzag={plan.zigzag}
        onGoalChange={(goal: Goal) => updatePlan({ goal })}
        onFasterBulkChange={(fasterBulk) => updatePlan({ fasterBulk })}
        onZigzagChange={(zigzag) => updatePlan({ zigzag })}
      />

      {ready && (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { label: "Protein", value: `${result.protein}g` },
              { label: "Carbs", value: `${result.carbs}g` },
              { label: "Fat", value: `${result.fat}g` },
              { label: "Fiber", value: `${result.fiber}g` },
              { label: "Water", value: result.water },
            ].map((stat) => (
              <Card key={stat.label}>
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-graphite">
                  {stat.label}
                </p>
                <p className={`mt-2 font-mono text-2xl text-ink ${morph}`}>
                  {stat.value}
                </p>
              </Card>
            ))}
          </div>
          <p className="font-mono text-[11px] leading-relaxed text-graphite">
            Evidence — Protein intakes up to ~1.6 g/kg/day maximize muscle gain
            (Morton et al., 2018); higher intakes help preserve muscle in a
            deficit (Helms et al., 2014).
          </p>

          <Card>
            <Eyebrow>What to expect over sixty days</Eyebrow>
            <ul className="mt-3 space-y-2">
              {OUTCOME_EXPECTATIONS.map((item) => (
                <li key={item.goal} className="text-sm text-ink">
                  <span className="font-medium">{item.label}:</span>{" "}
                  <span className="text-graphite">{item.outcome}</span>
                </li>
              ))}
            </ul>
          </Card>
        </>
      )}
    </div>
  );
}
