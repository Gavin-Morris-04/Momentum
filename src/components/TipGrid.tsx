"use client";

import { useState } from "react";
import { groupTips, type Tip } from "@/data/tips";
import { Card, Eyebrow, HandDrawnUnderline } from "@/components/ui/Card";

const PER_GROUP = 6;

export function TipGrid({
  tips,
  sectionTitle,
}: {
  tips: Tip[];
  sectionTitle?: string;
}) {
  const groups = groupTips(tips);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {},
  );

  function toggleGroup(group: string) {
    setExpandedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  }

  return (
    <section>
      {sectionTitle && (
        <div>
          <h2 className="font-display text-[28px] font-semibold tracking-tight text-ink max-sm:text-xl">
            {sectionTitle}
          </h2>
          <HandDrawnUnderline />
        </div>
      )}
      <div className={sectionTitle ? "mt-6 space-y-8" : "space-y-8"}>
        {groups.map((group) => {
          const expanded = expandedGroups[group.group] ?? false;
          const visible = expanded
            ? group.tips
            : group.tips.slice(0, PER_GROUP);
          const hiddenCount = group.tips.length - PER_GROUP;

          return (
            <div key={group.group}>
              <Eyebrow>{group.group}</Eyebrow>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((tip) => (
                  <Card key={tip.title}>
                    <p className="text-[15px] font-medium leading-snug text-ink">
                      {tip.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-graphite">
                      {tip.body}
                    </p>
                    {tip.evidence && (
                      <p className="mt-3 font-mono text-[11px] leading-relaxed text-graphite">
                        Evidence — {tip.evidence}
                      </p>
                    )}
                  </Card>
                ))}
              </div>

              {hiddenCount > 0 && (
                <button
                  type="button"
                  onClick={() => toggleGroup(group.group)}
                  className="mt-4 rounded-pill border border-line px-4 py-2 text-sm font-medium text-ink transition-colors duration-150 focus-ring hover:border-cobalt/40 hover:bg-cobalt/[0.03]"
                >
                  {expanded
                    ? "Show fewer"
                    : `Show all ${group.tips.length} ${group.group.toLowerCase()} tips`}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
