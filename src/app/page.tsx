"use client";

import Link from "next/link";
import {
  AFTER_DAY_60,
  HERO_LINE,
  HOME_PULL_QUOTE,
  HOW_TO_USE,
  SECTION_CARDS,
  SITE_NAME,
  TAGLINE,
  THE_EIGHT,
  THE_EIGHT_TITLE,
  WHY_FIT_60,
} from "@/data/home";
import { tipsFor } from "@/data/tips";
import { PhaseMap } from "@/components/PhaseMap";
import { TipGrid } from "@/components/TipGrid";
import { PullQuote } from "@/components/page/PullQuote";
import { Card, Eyebrow, HandDrawnUnderline } from "@/components/ui/Card";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function HomePage() {
  const reduced = usePrefersReducedMotion();
  const tips = tipsFor("home");

  return (
    <div className="space-y-10">
      <header
        className={reduced ? undefined : "animate-home-in"}
        style={reduced ? undefined : { animationDelay: "0ms" }}
      >
        <Eyebrow>{TAGLINE}</Eyebrow>
        <h1 className="mt-2 font-display text-[64px] font-bold leading-none tracking-tight text-ink max-sm:text-[40px]">
          {SITE_NAME}
        </h1>
        <p className="mt-4 max-w-read text-[18px] leading-relaxed text-graphite">
          {HERO_LINE}
        </p>
        <div className="mt-8 max-w-read">
          <PullQuote>{HOME_PULL_QUOTE}</PullQuote>
        </div>
      </header>

      <div
        className={reduced ? undefined : "animate-home-in"}
        style={reduced ? undefined : { animationDelay: "60ms" }}
      >
        <PhaseMap />
      </div>

      <section
        className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${
          reduced ? "" : "animate-home-in"
        }`}
        style={reduced ? undefined : { animationDelay: "120ms" }}
      >
        {SECTION_CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-card border border-line bg-paper p-5 shadow-card transition-colors hover:border-cobalt/40 focus-ring"
          >
            <h2 className="font-display text-lg font-semibold tracking-tight text-ink">
              {card.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-graphite">
              {card.description}
            </p>
            <p className="mt-3 font-mono text-xs text-cobalt">{card.detail}</p>
          </Link>
        ))}
      </section>

      <section
        className={`max-w-read ${reduced ? "" : "animate-home-in"}`}
        style={reduced ? undefined : { animationDelay: "180ms" }}
      >
        <h2 className="font-display text-[28px] font-semibold tracking-tight text-ink max-sm:text-xl">
          Why Fit 60 exists
        </h2>
        <HandDrawnUnderline />
        <div className="mt-4 space-y-3 text-[16px] leading-relaxed text-graphite">
          {WHY_FIT_60.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </section>

      <section
        className={reduced ? undefined : "animate-home-in"}
        style={reduced ? undefined : { animationDelay: "220ms" }}
      >
        <Eyebrow>How to use this plan</Eyebrow>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_TO_USE.map((step) => (
            <Card key={step.step}>
              <p className="font-mono text-xs text-cobalt">
                {String(step.step).padStart(2, "0")}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink">{step.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section
        className={reduced ? undefined : "animate-home-in"}
        style={reduced ? undefined : { animationDelay: "260ms" }}
      >
        <h2 className="font-display text-[28px] font-semibold tracking-tight text-ink max-sm:text-xl">
          {THE_EIGHT_TITLE}
        </h2>
        <HandDrawnUnderline />
        <ol className="mt-4 max-w-read space-y-2">
          {THE_EIGHT.map((item, index) => (
            <li
              key={item}
              className="flex gap-3 text-[16px] leading-relaxed text-ink"
            >
              <span className="font-mono text-sm text-graphite">
                {index + 1}.
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </section>

      <section
        className={`max-w-read ${reduced ? "" : "animate-home-in"}`}
        style={reduced ? undefined : { animationDelay: "280ms" }}
      >
        <h2 className="font-display text-[28px] font-semibold tracking-tight text-ink max-sm:text-xl">
          {AFTER_DAY_60.title}
        </h2>
        <HandDrawnUnderline />
        <div className="mt-5 space-y-6 text-[16px] leading-relaxed text-graphite">
          {AFTER_DAY_60.sections.map((section) => (
            <div key={section.heading}>
              <h3 className="font-display text-lg font-semibold text-ink">
                {section.heading}
              </h3>
              <p className="mt-2">{section.body}</p>
            </div>
          ))}
          <p className="text-ink">{AFTER_DAY_60.closing}</p>
        </div>
      </section>

      <div
        className={reduced ? undefined : "animate-home-in"}
        style={reduced ? undefined : { animationDelay: "300ms" }}
      >
        <TipGrid
          tips={tips}
          sectionTitle="Rules that make everything else work"
        />
      </div>
    </div>
  );
}
