"use client";

import { useState } from "react";
import {
  HOW_TO_CHOOSE,
  PHASE_LINE,
  SPLITS,
  type SplitId,
} from "@/data/splits";
import { Card } from "@/components/ui/Card";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { PREF_KEYS } from "@/lib/prefs";

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

function defaultExpandedDay(splitId: SplitId): string {
  const split = SPLITS.find((s) => s.id === splitId);
  if (!split) return "";

  const today = WEEKDAYS[new Date().getDay()];
  const todayDay = split.days.find((d) => d.label === today);
  if (todayDay) return todayDay.id;

  const firstWorkout = split.days.find((d) => !d.isRest && d.exercises.length > 0);
  return firstWorkout?.id ?? split.days[0]?.id ?? "";
}

export function SplitPicker() {
  const [splitId, setSplitId] = useLocalStorage<SplitId>(
    PREF_KEYS.split,
    "upper-lower",
  );
  const [expandedDay, setExpandedDay] = useState<string>(() =>
    defaultExpandedDay("upper-lower"),
  );

  const split = SPLITS.find((s) => s.id === splitId) ?? SPLITS[0];

  function select(id: SplitId) {
    setSplitId(id);
    setExpandedDay(defaultExpandedDay(id));
  }

  function toggleDay(dayId: string) {
    setExpandedDay((current) => (current === dayId ? "" : dayId));
  }

  return (
    <div className="space-y-6">
      {/* Segmented tabs */}
      <div
        role="tablist"
        aria-label="Workout splits"
        className="flex flex-wrap gap-1 rounded-card border border-line bg-paper p-1"
      >
        {SPLITS.map((s) => {
          const active = splitId === s.id;
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={active}
              id={`tab-${s.id}`}
              aria-controls={`panel-${s.id}`}
              onClick={() => select(s.id)}
              className={`rounded-pill px-4 py-2 text-sm font-medium transition-colors duration-150 focus-ring ${
                active
                  ? "bg-cobalt text-paper"
                  : "text-graphite hover:text-ink"
              }`}
            >
              {s.name}
            </button>
          );
        })}
      </div>

      <Card>
        <p className="text-sm leading-relaxed text-graphite">
          Best for: {split.bestFor} {split.cardioNote}
        </p>
        <p className="mt-2 font-mono text-[11px] text-cobalt">{PHASE_LINE}</p>
      </Card>

      {/* Selected split panel */}
      <div
        role="tabpanel"
        id={`panel-${split.id}`}
        aria-labelledby={`tab-${split.id}`}
        className="space-y-2"
      >
        {split.days.map((day) => {
          const expanded = expandedDay === day.id;
          const exerciseCount = day.exercises.length;
          const summary =
            exerciseCount > 0
              ? `${day.title} — ${exerciseCount} exercises · ~60 min`
              : day.title;

          return (
            <div
              key={day.id}
              className="overflow-hidden rounded-card border border-line bg-paper transition-[border-color] duration-150 hover:border-cobalt/30"
            >
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={`day-panel-${day.id}`}
                onClick={() => toggleDay(day.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-ring"
              >
                <div>
                  <p
                    className={`font-mono text-xs uppercase tracking-[0.12em] ${
                      day.isRest ? "text-rest" : "text-graphite"
                    }`}
                  >
                    {day.label}
                  </p>
                  <p className="mt-1 font-display text-base font-semibold text-ink">
                    {summary}
                  </p>
                </div>
                <span className="font-mono text-sm text-graphite" aria-hidden>
                  {expanded ? "−" : "+"}
                </span>
              </button>

              {expanded && (
                <div
                  id={`day-panel-${day.id}`}
                  className="border-t border-line px-5 pb-5"
                >
                  {day.exercises.length > 0 ? (
                    <>
                      <table className="mt-4 hidden w-full text-left text-sm sm:table">
                        <thead>
                          <tr className="border-b border-line font-mono text-xs uppercase tracking-[0.1em] text-graphite">
                            <th className="pb-2 font-normal">Exercise</th>
                            <th className="pb-2 font-normal">Sets × Reps</th>
                            <th className="pb-2 font-normal">Rest</th>
                          </tr>
                        </thead>
                        <tbody>
                          {day.exercises.map((ex) => (
                            <tr
                              key={`${day.id}-${ex.name}`}
                              className="border-b border-line/70 last:border-b-0"
                            >
                              <td className="py-2 pr-2 text-ink">{ex.name}</td>
                              <td className="py-2 pr-2 font-mono text-xs text-graphite">
                                {ex.setsReps}
                              </td>
                              <td className="py-2 font-mono text-xs text-graphite">
                                {ex.rest}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <ul className="mt-4 space-y-3 sm:hidden">
                        {day.exercises.map((ex) => (
                          <li key={`${day.id}-${ex.name}-m`}>
                            <p className="text-sm font-medium text-ink">
                              {ex.name}
                            </p>
                            <p className="font-mono text-xs text-graphite">
                              {ex.setsReps} · rest {ex.rest}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}

                  {day.notes?.map((note) => (
                    <p key={note} className="mt-3 text-sm text-graphite">
                      {note}
                    </p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Card>
        <h3 className="font-display text-lg font-semibold text-ink">
          How to choose
        </h3>
        <ul className="mt-4 space-y-2">
          {HOW_TO_CHOOSE.map((item) => (
            <li key={item.days} className="flex gap-3 text-[16px] text-ink">
              <span className="font-mono text-sm text-cobalt">{item.days}</span>
              <span className="text-graphite">= {item.note}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

/** @deprecated Use SplitPicker only — tabs replace the old list. */
export function SplitList() {
  return null;
}
