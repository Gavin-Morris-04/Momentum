import Link from "next/link";
import {
  EVENING_STARTER,
  FAITH_OPTIONAL,
  JOURNAL_EVIDENCE,
  JOURNAL_SECTIONS,
  JOURNAL_WHY,
  LIFE_INTRO,
  MICROADVENTURES,
  MICROADVENTURES_CLOSING,
  MICROADVENTURES_INTRO,
  PEOPLE_EVIDENCE,
  PRESENCE_HABITS,
  READING_INTRO,
  READING_RULES,
  READING_SHELF,
} from "@/data/life";
import { PAGE_META, getTransition } from "@/data/pages";
import { tipsFor } from "@/data/tips";
import { TipGrid } from "@/components/TipGrid";
import { PageGuide } from "@/components/page/PageGuide";
import { SectionReveal } from "@/components/page/SectionReveal";
import { SectionHeader, SectionTransition } from "@/components/page/SectionHeader";
import { Card } from "@/components/ui/Card";
import {
  BookOpen,
  Compass,
  Heart,
  NotebookPen,
  Sparkles,
  Users,
} from "lucide-react";

const SECTIONS = [
  { id: "journal", label: "Journaling" },
  { id: "adventures", label: "Microadventures" },
  { id: "reading", label: "Reading" },
  { id: "presence", label: "Being present" },
  { id: "faith", label: "Faith & stillness" },
  { id: "people", label: "People" },
  { id: "tips", label: "Tips" },
];

export default function LifePage() {
  const tips = tipsFor("life");
  const meta = PAGE_META.life;

  return (
    <PageGuide
      title="A richer, more present life"
      intro={LIFE_INTRO}
      meta={meta}
      sections={SECTIONS}
    >
      <SectionReveal id="journal" className="space-y-5">
        <SectionTransition>
          {getTransition("life", "journal")}
        </SectionTransition>
        <SectionHeader icon={NotebookPen}>The journaling guide</SectionHeader>
        <p className="max-w-read text-[15px] text-graphite">
          Five minutes morning, five at night, one notebook.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {JOURNAL_SECTIONS.map((section) => (
            <Card key={section.id} id={section.id === "evening" ? "journal" : undefined}>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-graphite">
                {section.timing}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-ink">
                {section.title}
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-graphite">
                {section.prompts.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <Card className="border-cobalt/20 bg-cobalt/[0.03]">
          <p className="font-display text-base font-semibold text-ink">
            {EVENING_STARTER.title}
          </p>
          <ul className="mt-3 space-y-2 text-sm text-graphite">
            {EVENING_STARTER.prompts.map((p) => (
              <li key={p} className="italic">
                {p}
              </li>
            ))}
          </ul>
        </Card>

        <p className="max-w-read text-[16px] leading-relaxed text-graphite">
          {JOURNAL_WHY}
        </p>
        <p className="max-w-read font-mono text-[11px] leading-relaxed text-graphite">
          Evidence — {JOURNAL_EVIDENCE}
        </p>
      </SectionReveal>

      <SectionReveal id="adventures" className="space-y-5">
        <SectionTransition>
          {getTransition("life", "adventures")}
        </SectionTransition>
        <SectionHeader icon={Compass}>Microadventures</SectionHeader>
        <p className="max-w-read text-[15px] leading-relaxed text-graphite">
          {MICROADVENTURES_INTRO}
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MICROADVENTURES.map((item) => (
            <Card key={item.id}>
              <p className="font-display text-base font-semibold text-ink">
                {item.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-graphite">
                {item.note}
              </p>
            </Card>
          ))}
        </div>
        <p className="max-w-read text-[15px] text-graphite">
          {MICROADVENTURES_CLOSING}
        </p>
      </SectionReveal>

      <SectionReveal id="reading" className="space-y-5">
        <SectionHeader icon={BookOpen}>Reading</SectionHeader>
        <p className="max-w-read text-[15px] leading-relaxed text-graphite">
          {READING_INTRO}
        </p>
        <Card>
          <ul className="space-y-2 text-sm text-graphite">
            {READING_RULES.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </Card>
        <div className="grid gap-4 sm:grid-cols-2">
          {READING_SHELF.map((item) => (
            <Card key={item.category}>
              <p className="font-display text-base font-semibold text-ink">
                {item.category}
              </p>
              <p className="mt-2 text-sm text-graphite">{item.examples}</p>
            </Card>
          ))}
        </div>
        <p className="text-sm text-graphite">
          This is the T-30 step on the{" "}
          <Link href="/sleep" className="text-cobalt underline-offset-2 hover:underline">
            Sleep page
          </Link>
          .
        </p>
      </SectionReveal>

      <SectionReveal id="presence" className="space-y-5">
        <SectionHeader icon={Sparkles}>Being in the moment</SectionHeader>
        <p className="max-w-read text-[15px] text-graphite">
          Practical presence. No incense required.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {PRESENCE_HABITS.map((habit) => (
            <Card key={habit.id}>
              <p className="font-display text-base font-semibold text-ink">
                {habit.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-graphite">
                {habit.body}
              </p>
            </Card>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal id="faith" className="space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-rest">
          {FAITH_OPTIONAL.label}
        </p>
        <SectionHeader icon={Heart}>{FAITH_OPTIONAL.title}</SectionHeader>
        <ul className="max-w-read space-y-3 text-[16px] leading-relaxed text-graphite">
          {FAITH_OPTIONAL.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </SectionReveal>

      <SectionReveal id="people" className="space-y-5">
        <SectionHeader icon={Users}>People</SectionHeader>
        <Card>
          <ul className="space-y-4 text-[15px] leading-relaxed text-graphite">
            <li>
              <span className="font-display font-semibold text-ink">
                One real conversation a day.
              </span>{" "}
              Call, don't text, at least one person.
            </li>
            <li>
              <span className="font-display font-semibold text-ink">
                One act of service a week.
              </span>{" "}
              Help someone who can't repay you — it gets your eyes off your own scale.
            </li>
          </ul>
          <p className="mt-4 font-mono text-[11px] leading-relaxed text-graphite">
            Evidence — {PEOPLE_EVIDENCE}
          </p>
        </Card>
      </SectionReveal>

      <SectionReveal id="tips" className="space-y-5">
        <SectionTransition>
          {getTransition("life", "tips")}
        </SectionTransition>
        <TipGrid tips={tips} sectionTitle="Life tips & tricks" />
      </SectionReveal>
    </PageGuide>
  );
}
