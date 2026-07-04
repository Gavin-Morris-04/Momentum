"use client";

import { useState, type ReactNode } from "react";

export function Accordion({
  items,
}: {
  items: { id: string; summary: string; content: ReactNode }[];
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="divide-y divide-line rounded-card border border-line">
      {items.map((item) => {
        const expanded = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              id={`${item.id}-trigger`}
              aria-expanded={expanded}
              aria-controls={`${item.id}-panel`}
              onClick={() => setOpenId(expanded ? null : item.id)}
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left focus-ring"
            >
              <span className="font-display text-base font-semibold text-ink">
                {item.summary}
              </span>
              <span
                className="mt-0.5 font-mono text-sm text-graphite"
                aria-hidden
              >
                {expanded ? "−" : "+"}
              </span>
            </button>
            {expanded && (
              <div
                id={`${item.id}-panel`}
                role="region"
                aria-labelledby={`${item.id}-trigger`}
                className="px-5 pb-4 text-[15px] leading-relaxed text-graphite"
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
