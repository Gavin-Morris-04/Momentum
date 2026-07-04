"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BYDAY_MAP,
  buildCalendar,
  downloadIcs,
  getBrowserTimeZone,
  googleCalendarUrl,
  nextWeekdayDate,
  type CalendarEventInput,
} from "@/lib/ics";
import {
  formatSessionDescription,
  getSplit,
  PHASE_DETAIL,
  WEEKDAY_LABELS,
  WEEKDAYS,
  type SplitId,
  type Weekday,
} from "@/data/splits";
import { Card, Eyebrow } from "@/components/ui/Card";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { usePlan } from "@/hooks/usePlan";
import { mealDescription } from "@/lib/mealBuilder";
import { PREF_KEYS } from "@/lib/prefs";

function parseTimeToMinutes(value: string): number {
  const [h, m] = value.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

type WeekOption = 4 | 8 | 9 | 12;

export function CalendarBuilder() {
  const { ready, builtDiet } = usePlan();
  const [splitId, setSplitId] = useLocalStorage<SplitId>(
    PREF_KEYS.split,
    "upper-lower",
  );

  const [workoutTime, setWorkoutTime] = useState("06:00");
  const [duration, setDuration] = useState(75);
  const [days, setDays] = useState<Weekday[]>([
    "monday",
    "tuesday",
    "thursday",
    "friday",
  ]);
  const [daysTouched, setDaysTouched] = useState(false);
  const [mealsOn, setMealsOn] = useState(false);
  const [sleepOn, setSleepOn] = useState(true);
  const [weeks, setWeeks] = useState<WeekOption>(9);
  const [showLinks, setShowLinks] = useState(false);
  const [events, setEvents] = useState<CalendarEventInput[]>([]);

  useEffect(() => {
    if (!daysTouched) {
      setDays(getSplit(splitId).defaultDays);
    }
  }, [splitId, daysTouched]);

  function onSplitChange(id: SplitId) {
    setSplitId(id);
    setDays(getSplit(id).defaultDays);
    setDaysTouched(false);
  }

  function toggleDay(day: Weekday) {
    setDaysTouched(true);
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  }

  const builtEvents = useMemo(() => {
    const tz = getBrowserTimeZone();
    const startMinutes = parseTimeToMinutes(workoutTime);
    const list: CalendarEventInput[] = [];
    const chosen = getSplit(splitId);
    const trainingDays = chosen.days.filter(
      (d) => d.weekday && days.includes(d.weekday) && !d.isRest,
    );

    for (const day of trainingDays) {
      if (!day.weekday) continue;
      const phaseNote =
        day.title.toLowerCase().includes("run") ||
        day.title.toLowerCase().includes("zone") ||
        day.title.toLowerCase().includes("interval")
          ? "Running: weeks 1–4 build, week 4 long-run down week, weeks 5–8 climb to Day 60 capstone."
          : PHASE_DETAIL;
      list.push({
        uid: `workout-${splitId}-${day.id}@fit60`,
        title: `Fit 60 — ${day.title} (Phase 1–2)`,
        description: `${phaseNote}\n\n${formatSessionDescription(day)}`,
        startDate: nextWeekdayDate(day.weekday),
        startMinutes,
        durationMinutes: duration,
        timeZone: tz,
        count: weeks,
        byDay: BYDAY_MAP[day.weekday],
      });
    }

    if (mealsOn && ready && builtDiet) {
      for (const meal of builtDiet.meals) {
        const hourMatch = meal.time.match(/(\d{1,2}):/);
        let hour = hourMatch ? Number(hourMatch[1]) : 12;
        if (meal.time.includes("PM") && hour !== 12) hour += 12;
        if (meal.time.includes("AM") && hour === 12) hour = 0;
        list.push({
          uid: `meal-${builtDiet.plan.id}-${meal.id}@fit60`,
          title: `Fit 60 — ${meal.label}: ${meal.name}`,
          description: `${builtDiet.header}\n\n${mealDescription(meal)}`,
          startDate: nextWeekdayDate("monday"),
          startMinutes: hour * 60,
          durationMinutes: 15,
          timeZone: tz,
          count: weeks * 7,
          freq: "DAILY",
        });
      }
    }

    if (sleepOn) {
      list.push({
        uid: "wind-down@fit60",
        title: "Fit 60 — Wind-down",
        description: "Dim lights. No gaming. No scrolling. Screens off by 10:00.",
        startDate: nextWeekdayDate("monday"),
        startMinutes: 21 * 60 + 30,
        durationMinutes: 60,
        timeZone: tz,
        count: weeks * 7,
        freq: "DAILY",
      });
      list.push({
        uid: "lights-out@fit60",
        title: "Fit 60 — Lights out",
        description: "Phone across the room. Lights out.",
        startDate: nextWeekdayDate("monday"),
        startMinutes: 22 * 60 + 30,
        durationMinutes: 15,
        timeZone: tz,
        count: weeks * 7,
        freq: "DAILY",
      });
    }

    return list;
  }, [
    splitId,
    days,
    workoutTime,
    duration,
    weeks,
    mealsOn,
    sleepOn,
    ready,
    builtDiet,
  ]);

  function handleDownload() {
    setEvents(builtEvents);
    const ics = buildCalendar(builtEvents);
    downloadIcs("fit-60.ics", ics);
  }

  const weekOptions: { value: WeekOption; label: string }[] = [
    { value: 4, label: "4 weeks" },
    { value: 8, label: "8 weeks" },
    { value: 9, label: "Full 60-day plan" },
    { value: 12, label: "12 weeks" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <Eyebrow>Builder</Eyebrow>
        <div className="mt-5 space-y-5">
          <label className="block">
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-graphite">
              Split
            </span>
            <select
              value={splitId}
              onChange={(e) => onSplitChange(e.target.value as SplitId)}
              className="mt-1 w-full rounded-pill border border-line bg-paper px-3 py-2 text-ink focus-ring"
            >
              {(["ppl-hybrid", "upper-lower", "full-body", "body-part"] as const).map(
                (id) => {
                  const s = getSplit(id);
                  return (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  );
                },
              )}
            </select>
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-graphite">
                Workout time
              </span>
              <input
                type="time"
                value={workoutTime}
                onChange={(e) => setWorkoutTime(e.target.value)}
                className="mt-1 w-full rounded-pill border border-line bg-paper px-3 py-2 font-mono text-ink focus-ring"
              />
            </label>
            <label className="block">
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-graphite">
                Duration (minutes)
              </span>
              <input
                type="number"
                min={30}
                max={180}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value) || 75)}
                className="mt-1 w-full rounded-pill border border-line bg-paper px-3 py-2 font-mono text-ink focus-ring"
              />
            </label>
          </div>

          <fieldset>
            <legend className="font-mono text-xs uppercase tracking-[0.12em] text-graphite">
              Training days
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {WEEKDAYS.map((day) => {
                const on = days.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    aria-pressed={on}
                    className={`rounded-pill border px-3 py-2 text-sm focus-ring ${
                      on
                        ? "border-cobalt bg-cobalt text-paper"
                        : "border-line text-ink"
                    }`}
                  >
                    {WEEKDAY_LABELS[day].slice(0, 3)}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="flex flex-col gap-3">
            <label
              className={`flex items-center gap-3 text-sm ${
                ready ? "text-ink" : "text-graphite"
              }`}
            >
              <input
                type="checkbox"
                checked={mealsOn && ready}
                disabled={!ready}
                onChange={(e) => setMealsOn(e.target.checked)}
                className="rounded accent-cobalt focus-ring disabled:opacity-50"
              />
              Meal reminders from your goal-solved diet
            </label>
            {!ready && (
              <p className="text-sm text-graphite">
                Complete the calculator on the Diet page to add meal events.
              </p>
            )}
            <label className="flex items-center gap-3 text-sm text-ink">
              <input
                type="checkbox"
                checked={sleepOn}
                onChange={(e) => setSleepOn(e.target.checked)}
                className="rounded accent-cobalt focus-ring"
              />
              Sleep: wind-down 9:30–10:30 PM + lights out 10:30 PM
            </label>
          </div>

          <fieldset>
            <legend className="font-mono text-xs uppercase tracking-[0.12em] text-graphite">
              Repeat weekly for
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {weekOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setWeeks(opt.value)}
                  className={`rounded-pill border px-3 py-2 text-sm focus-ring ${
                    weeks === opt.value
                      ? "border-cobalt bg-cobalt text-paper"
                      : "border-line text-ink"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      </Card>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleDownload}
          className="rounded-pill bg-cobalt px-5 py-3 text-sm font-medium text-paper focus-ring"
        >
          Download calendar file (.ics)
        </button>
        <button
          type="button"
          onClick={() => {
            setEvents(builtEvents);
            setShowLinks((v) => !v);
          }}
          className="rounded-pill border border-line px-5 py-3 text-sm font-medium text-ink focus-ring"
        >
          {showLinks ? "Hide Google links" : "Show Google Calendar links"}
        </button>
      </div>

      {showLinks && (
        <Card>
          <Eyebrow>Add to Google Calendar</Eyebrow>
          <ul className="mt-4 space-y-2">
            {(events.length ? events : builtEvents).map((event) => (
              <li key={event.uid}>
                <a
                  href={googleCalendarUrl(event)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-cobalt underline-offset-2 hover:underline focus-ring rounded-sm"
                >
                  {event.title}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card>
        <Eyebrow>Import instructions</Eyebrow>
        <ul className="mt-4 max-w-read space-y-3 text-[16px] leading-relaxed text-graphite">
          <li>
            <strong className="text-ink">iPhone / Apple Calendar:</strong> open
            the .ics file — it imports natively.
          </li>
          <li>
            <strong className="text-ink">Google Calendar:</strong> Settings →
            Import & export → Import, then choose the .ics file.
          </li>
          <li>
            <strong className="text-ink">Outlook:</strong> File → Open & Export →
            Import/Export → Import an iCalendar (.ics) file.
          </li>
        </ul>
      </Card>
    </div>
  );
}
