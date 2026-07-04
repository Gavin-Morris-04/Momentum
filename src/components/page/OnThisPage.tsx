"use client";

import { useEffect, useState } from "react";
import type { SectionNavItem } from "@/data/pages";

export function OnThisPage({ sections }: { sections: SectionNavItem[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(section.id);
        },
        { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  if (sections.length < 2) return null;

  const navLinks = (
    <ul className="space-y-1">
      {sections.map((s) => (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            className={`block rounded-md px-2 py-1.5 text-sm transition-colors focus-ring ${
              active === s.id
                ? "bg-cobalt/10 font-medium text-cobalt"
                : "text-graphite hover:text-ink"
            }`}
          >
            {s.label}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Desktop right rail */}
      <aside className="hidden xl:block" aria-label="On this page">
        <div className="sticky top-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-graphite">
            On this page
          </p>
          <nav className="mt-3">{navLinks}</nav>
        </div>
      </aside>

      {/* Mobile pill bar */}
      <div className="xl:hidden" aria-label="On this page">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="w-full rounded-pill border border-line bg-paper px-4 py-2 text-left text-sm font-medium text-ink focus-ring"
        >
          On this page {open ? "▴" : "▾"}
        </button>
        {open && (
          <nav
            className="mt-2 rounded-card border border-line bg-paper p-3"
            aria-label="On this page"
          >
            {navLinks}
          </nav>
        )}
      </div>
    </>
  );
}
