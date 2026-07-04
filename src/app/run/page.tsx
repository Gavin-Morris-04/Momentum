import { SECTION_INTROS } from "@/data/home";
import { PAGE_META, getTransition } from "@/data/pages";
import { PHASE_LINE, RUN_SESSIONS, WEEK_PROGRESSION } from "@/data/running";
import { tipsFor } from "@/data/tips";
import { TipGrid } from "@/components/TipGrid";
import { PageGuide } from "@/components/page/PageGuide";
import { SectionReveal } from "@/components/page/SectionReveal";
import { SectionHeader, SectionTransition } from "@/components/page/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Calendar, Footprints, Lightbulb } from "lucide-react";

const SECTIONS = [
  { id: "sessions", label: "Weekly structure" },
  { id: "progression", label: "8-week plan" },
  { id: "tips", label: "Tips" },
];

export default function RunPage() {
  const tips = tipsFor("run");
  const meta = PAGE_META.run;

  return (
    <PageGuide
      title="Eight weeks to the capstone"
      intro={SECTION_INTROS.run}
      meta={meta}
      sections={SECTIONS}
    >
      <SectionReveal id="sessions" className="space-y-5">
        <SectionTransition>
          {getTransition("run", "structure")}
        </SectionTransition>
        <SectionHeader icon={Footprints}>Your weekly runs</SectionHeader>
        <p className="max-w-read font-mono text-[11px] text-cobalt">{PHASE_LINE}</p>
        <div className="grid gap-4 md:grid-cols-3">
          {RUN_SESSIONS.map((session) => (
            <Card key={session.id}>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-graphite">
                {session.day}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-ink">
                {session.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-graphite">
                {session.body}
              </p>
            </Card>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal id="progression" className="space-y-5">
        <SectionHeader icon={Calendar}>8-week progression</SectionHeader>
        <div className="overflow-x-auto rounded-card border border-line">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-line">
              <tr>
                {["Week", "Tue", "Thu", "Sun", "Weekly"].map((h) => (
                  <th
                    key={h}
                    className="px-3 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-graphite"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {WEEK_PROGRESSION.map((row) => (
                <tr
                  key={row.week}
                  className={`border-b border-line last:border-b-0 ${
                    row.note ? "bg-rest/5" : ""
                  }`}
                >
                  <td className="px-3 py-2.5 font-mono text-ink">
                    {row.week}
                    {row.note ? " · Down" : ""}
                  </td>
                  <td className="px-3 py-2.5 font-mono text-graphite">
                    {row.tuesday}
                  </td>
                  <td className="px-3 py-2.5 font-mono text-graphite">
                    {row.thursday}
                  </td>
                  <td className="px-3 py-2.5 font-mono text-graphite">
                    {row.sunday}
                  </td>
                  <td className="px-3 py-2.5 font-mono text-graphite">
                    {row.weeklyMiles}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="max-w-read text-sm text-graphite">
          Week 4 is a planned down week — tissues adapt slower than lungs. Day
          60 is the 8-mile capstone long run.
        </p>
      </SectionReveal>

      <SectionReveal id="tips" className="space-y-5">
        <SectionTransition>
          {getTransition("run", "tips")}
        </SectionTransition>
        <SectionHeader icon={Lightbulb}>Running tips & tricks</SectionHeader>
        <TipGrid tips={tips} />
      </SectionReveal>
    </PageGuide>
  );
}
