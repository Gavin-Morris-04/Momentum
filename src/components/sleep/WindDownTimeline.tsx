"use client";

import { useState } from "react";
import Link from "next/link";
import type { WindDownStep } from "@/data/sleep";

export function WindDownTimeline({ steps }: { steps: WindDownStep[] }) {
  const [expanded, setExpanded] = useState<string | null>(steps[0]?.id ?? null);

  return (
    <div className="relative space-y-0 border-l border-line pl-5">
      {steps.map((step) => {
        const open = expanded === step.id;
        return (
          <article key={step.id} className="relative pb-5 last:pb-0">
            <span
              className="absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-cobalt bg-paper"
              aria-hidden
            />
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setExpanded(open ? null : step.id)}
              className="w-full text-left focus-ring rounded-md"
            >
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-cobalt">
                {step.mark}
              </p>
              <p className="mt-1 font-display text-base font-semibold text-ink">
                {step.title}
              </p>
              <p className="mt-1 text-sm text-graphite">{step.summary}</p>
            </button>

            {open && (
              <div className="mt-3 rounded-card border border-line bg-paper/80 p-4">
                <p className="text-sm leading-relaxed text-graphite">{step.why}</p>
                {step.evidence && (
                  <p className="mt-2 font-mono text-[11px] text-graphite">
                    EVIDENCE — {step.evidence}
                  </p>
                )}
                {step.link && (
                  <p className="mt-2 text-sm">
                    <Link
                      href={step.link.href}
                      className="text-cobalt underline-offset-2 hover:underline focus-ring rounded-sm"
                    >
                      {step.link.label} →
                    </Link>
                  </p>
                )}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
