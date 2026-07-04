import type { ReactNode } from "react";
import type { PageMeta, SectionNavItem } from "@/data/pages";
import { OnThisPage } from "./OnThisPage";
import { ThreeThings } from "./ThreeThings";
import { PullQuote } from "./PullQuote";
import { PageClosing } from "./PageClosing";

export function PageGuide({
  title,
  intro,
  meta,
  sections,
  children,
  showThreeThings = true,
  showPullQuote = true,
}: {
  title: string;
  intro: string | string[];
  meta: PageMeta;
  sections: SectionNavItem[];
  children: ReactNode;
  showThreeThings?: boolean;
  showPullQuote?: boolean;
}) {
  const introParagraphs = Array.isArray(intro) ? intro : [intro];

  return (
    <div className="xl:grid xl:grid-cols-[1fr_180px] xl:gap-10">
      <div className="min-w-0 space-y-10">
        <header className="max-w-read scroll-mt-24" id="top">
          <h1 className="font-display text-[40px] font-bold leading-none tracking-tight text-ink max-sm:text-[28px]">
            {title}
          </h1>
          <div className="mt-4 space-y-3">
            {introParagraphs.map((p, i) => (
              <p
                key={i}
                className="text-[16px] leading-relaxed text-graphite"
              >
                {p}
              </p>
            ))}
          </div>
          <p className="mt-4 inline-block rounded-pill border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-graphite">
            {meta.readingMinutes} min read
          </p>
        </header>

        {/* Mobile in-page nav — top of content */}
        <div className="xl:hidden">
          <OnThisPage sections={sections} />
        </div>

        {showThreeThings && <ThreeThings items={meta.threeThings} />}
        {showPullQuote && <PullQuote>{meta.pullQuote}</PullQuote>}

        {children}

        {meta.closing && <PageClosing {...meta.closing} />}
      </div>

      {/* Desktop right rail */}
      <div className="hidden xl:block">
        <OnThisPage sections={sections} />
      </div>
    </div>
  );
}
