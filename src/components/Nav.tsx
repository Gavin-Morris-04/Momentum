"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SITE_NAME } from "@/data/home";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/lift", label: "Lift" },
  { href: "/diet", label: "Diet" },
  { href: "/run", label: "Run" },
  { href: "/sleep", label: "Sleep" },
  { href: "/life", label: "Life" },
  { href: "/supplements", label: "Supplements" },
  { href: "/calendar", label: "Calendar" },
] as const;

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 py-2.5">
        <Link
          href="/"
          className="font-display text-sm font-semibold tracking-tight text-ink focus-ring"
        >
          {SITE_NAME}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-pill px-3 py-1.5 text-sm font-medium transition-colors focus-ring ${
                  active
                    ? "bg-cobalt/10 text-cobalt"
                    : "text-graphite hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="rounded-pill border border-line px-3 py-1.5 text-sm text-ink focus-ring lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-line px-4 py-3 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-pill px-3 py-2 text-sm font-medium focus-ring ${
                      active
                        ? "bg-cobalt/10 text-cobalt"
                        : "text-graphite hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
