import Link from "next/link";
import {
  BEDROOM_RULES,
  DAYTIME_RULES,
  EVIDENCE_CARDS,
  NAP_GUIDANCE,
  SLEEP_INTRO,
  SLEEP_SCHEDULE,
  SUPPLEMENTS_CROSS_LINK,
  TROUBLESHOOTING,
  TROUBLESHOOTING_CLOSING,
  WIND_DOWN,
} from "@/data/sleep";
import { PAGE_META, getTransition } from "@/data/pages";
import { tipsFor } from "@/data/tips";
import { TipGrid } from "@/components/TipGrid";
import { PageGuide } from "@/components/page/PageGuide";
import { SectionReveal } from "@/components/page/SectionReveal";
import { SectionHeader, SectionTransition } from "@/components/page/SectionHeader";
import { Accordion } from "@/components/ui/Accordion";
import { Card } from "@/components/ui/Card";
import { WindDownTimeline } from "@/components/sleep/WindDownTimeline";
import {
  BedDouble,
  Clock,
  Lightbulb,
  Moon,
  Sparkles,
} from "lucide-react";

const SECTIONS = [
  { id: "multiplier", label: "The multiplier" },
  { id: "evidence", label: "Why we're strict" },
  { id: "winddown", label: "Wind-down" },
  { id: "bedroom", label: "Build a cave" },
  { id: "daytime", label: "Daytime rules" },
  { id: "naps", label: "Naps" },
  { id: "troubleshoot", label: "Troubleshooting" },
  { id: "tips", label: "Tips" },
];

export default function SleepPage() {
  const tips = tipsFor("sleep");
  const meta = PAGE_META.sleep;

  return (
    <PageGuide
      title="The multiplier"
      intro={SLEEP_INTRO}
      meta={meta}
      sections={SECTIONS}
    >
      <SectionReveal id="multiplier">
        <div className="max-w-read">
          <p className="font-display text-2xl font-semibold leading-snug text-ink max-sm:text-xl">
            In bed {SLEEP_SCHEDULE.bed} · Wake {SLEEP_SCHEDULE.wake} ·{" "}
            {SLEEP_SCHEDULE.duration}, all sixty days.
          </p>
        </div>
      </SectionReveal>

      <SectionReveal id="evidence" className="space-y-5">
        <SectionTransition>
          {getTransition("sleep", "evidence")}
        </SectionTransition>
        <SectionHeader icon={Lightbulb}>Why we're strict about this</SectionHeader>
        <div className="grid gap-4 md:grid-cols-2">
          {EVIDENCE_CARDS.map((card) => (
            <Card key={card.id}>
              <p className="font-display text-base font-semibold text-ink">
                {card.claim}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-graphite">
                {card.explanation}
              </p>
              <p className="mt-3 font-mono text-[11px] leading-relaxed text-graphite">
                EVIDENCE — {card.evidence}
              </p>
            </Card>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal id="winddown" className="space-y-5">
        <SectionTransition>
          {getTransition("sleep", "winddown")}
        </SectionTransition>
        <SectionHeader icon={Clock}>The nightly wind-down</SectionHeader>
        <WindDownTimeline steps={WIND_DOWN} />

        <Card className="border-cobalt/20 bg-cobalt/[0.03]">
          <p className="font-display text-base font-semibold text-ink">
            {SUPPLEMENTS_CROSS_LINK.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-graphite">
            {SUPPLEMENTS_CROSS_LINK.body}{" "}
            <Link
              href="/supplements"
              className="text-cobalt underline-offset-2 hover:underline focus-ring rounded-sm"
            >
              Supplements →
            </Link>
          </p>
        </Card>
      </SectionReveal>

      <SectionReveal id="bedroom" className="space-y-5">
        <SectionHeader icon={BedDouble}>Build a cave</SectionHeader>
        <Card>
          <ul className="grid gap-4 sm:grid-cols-2">
            {BEDROOM_RULES.map((rule) => (
              <li key={rule.id}>
                <span className="font-display font-semibold text-ink">
                  {rule.label}
                </span>
                <span className="text-graphite"> — {rule.detail}</span>
              </li>
            ))}
          </ul>
        </Card>
      </SectionReveal>

      <SectionReveal id="daytime" className="space-y-5">
        <SectionHeader icon={Moon}>Daytime rules that decide the night</SectionHeader>
        <Card>
          <ul className="space-y-3 text-[15px] leading-relaxed text-graphite">
            {DAYTIME_RULES.map((rule) => (
              <li key={rule} className="flex gap-2">
                <span className="text-cobalt" aria-hidden>
                  ·
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </Card>
      </SectionReveal>

      <SectionReveal id="naps">
        <Card>
          <p className="font-display text-base font-semibold text-ink">
            {NAP_GUIDANCE.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-graphite">
            {NAP_GUIDANCE.body}
          </p>
        </Card>
      </SectionReveal>

      <SectionReveal id="troubleshoot" className="space-y-5">
        <SectionHeader icon={Sparkles}>Troubleshooting</SectionHeader>
        <Accordion
          items={TROUBLESHOOTING.map((item) => ({
            id: item.id,
            summary: item.question,
            content: item.answer,
          }))}
        />
        <p className="max-w-read text-sm text-graphite">{TROUBLESHOOTING_CLOSING}</p>
      </SectionReveal>

      <SectionReveal id="tips" className="space-y-5">
        <SectionTransition>
          {getTransition("sleep", "tips")}
        </SectionTransition>
        <TipGrid tips={tips} sectionTitle="Sleep tips & tricks" />
      </SectionReveal>
    </PageGuide>
  );
}
