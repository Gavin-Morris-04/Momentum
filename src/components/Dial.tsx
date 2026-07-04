"use client";

import {
  BASIS_LINE,
  GOAL_OPTIONS,
  zigzagDays,
  type Goal,
} from "@/lib/calories";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const ORDER: Goal[] = [
  "aggressive-cut",
  "cut",
  "mild-cut",
  "maintain",
  "lean-bulk",
];

export function Dial({
  maintenance,
  target,
  goal,
  weeklyRate,
  clamped,
  clampReason,
  fasterBulk,
  zigzag,
  onGoalChange,
  onFasterBulkChange,
  onZigzagChange,
}: {
  maintenance: number;
  target: number;
  goal: Goal;
  weeklyRate: string;
  clamped: boolean;
  clampReason: string | null;
  fasterBulk: boolean;
  zigzag: boolean;
  onGoalChange: (goal: Goal) => void;
  onFasterBulkChange: (value: boolean) => void;
  onZigzagChange: (value: boolean) => void;
}) {
  const reduced = usePrefersReducedMotion();
  const index = ORDER.indexOf(goal);
  const pct = ORDER.length <= 1 ? 50 : (index / (ORDER.length - 1)) * 100;
  const zig = zigzagDays(target);

  const tint =
    goal === "lean-bulk"
      ? "bg-dawn/10"
      : goal === "aggressive-cut" || goal === "cut" || goal === "mild-cut"
        ? "bg-rest/10"
        : "bg-cobalt/5";

  function move(delta: number) {
    const next = Math.min(ORDER.length - 1, Math.max(0, index + delta));
    onGoalChange(ORDER[next]);
  }

  const caution = GOAL_OPTIONS.find((g) => g.id === goal)?.caution;

  return (
    <div
      className={`rounded-card border border-line p-5 ${tint}`}
      role="group"
      aria-label="Calorie goal dial"
    >
      <div className="flex items-end justify-between gap-4">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-graphite">
          Aggressive cut
        </p>
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-graphite">
          Lean bulk
        </p>
      </div>

      <div className="relative mt-5">
        <div className="h-1 rounded-pill bg-line" aria-hidden />
        <div
          className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cobalt shadow-card"
          style={{ left: `${pct}%` }}
          aria-hidden
        />
      </div>

      <div
        className="mt-6 text-center"
        tabIndex={0}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={ORDER.length - 1}
        aria-valuenow={index}
        aria-valuetext={`${GOAL_OPTIONS.find((g) => g.id === goal)?.label}: ${target} calories, ${weeklyRate}`}
        aria-label="Goal preset"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowUp") {
            e.preventDefault();
            move(1);
          }
          if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
            e.preventDefault();
            move(-1);
          }
        }}
      >
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-graphite">
          Daily target
        </p>
        <p
          className={`mt-2 font-display text-[64px] font-bold leading-none tracking-tight text-ink max-sm:text-[40px] ${
            reduced ? "number-morph-instant" : "number-morph"
          }`}
        >
          {target}
        </p>
        <p className="mt-2 font-mono text-sm text-graphite">
          {weeklyRate} · Maintenance {maintenance}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {GOAL_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onGoalChange(opt.id)}
            className={`rounded-pill border px-3 py-2 text-sm focus-ring ${
              goal === opt.id
                ? opt.id === "lean-bulk"
                  ? "border-dawn bg-dawn text-ink"
                  : opt.id === "aggressive-cut" ||
                      opt.id === "cut" ||
                      opt.id === "mild-cut"
                    ? "border-rest bg-rest text-paper"
                    : "border-cobalt bg-cobalt text-paper"
                : "border-line text-ink hover:border-cobalt/40"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {goal === "lean-bulk" && (
        <label className="mt-4 flex items-center justify-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            checked={fasterBulk}
            onChange={(e) => onFasterBulkChange(e.target.checked)}
            className="rounded accent-cobalt focus-ring"
          />
          Faster bulk (+500/day) — mostly fat if you rush
        </label>
      )}

      {caution && (
        <p className="mt-4 text-center text-sm text-rest">{caution}</p>
      )}
      {clamped && clampReason && (
        <p className="mt-3 text-center text-sm text-rest">{clampReason}</p>
      )}

      <label className="mt-4 flex items-center justify-center gap-2 text-sm text-graphite">
        <input
          type="checkbox"
          checked={zigzag}
          onChange={(e) => onZigzagChange(e.target.checked)}
          className="rounded accent-cobalt focus-ring"
        />
        Zigzag schedule (5 lower days + 2 higher)
      </label>
      {zigzag && (
        <p className="mt-2 text-center font-mono text-sm text-ink">
          Weekdays {zig.low} · Weekend {zig.high}
        </p>
      )}

      <p className="mt-5 text-center text-xs leading-relaxed text-graphite">
        {BASIS_LINE}
      </p>
    </div>
  );
}
