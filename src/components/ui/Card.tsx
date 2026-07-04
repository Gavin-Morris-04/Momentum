import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
  className={`rounded-card border border-line bg-paper p-5 shadow-card transition-[border-color,box-shadow,transform] duration-150 hover:-translate-y-px hover:border-cobalt/30 hover:shadow-[0_2px_4px_rgba(0,0,0,0.06)] ${className}`}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.12em] text-graphite">
      {children}
    </p>
  );
}

/** Slightly irregular cobalt stroke under section headings. */
export function HandDrawnUnderline() {
  return (
    <svg
      className="mt-2 block h-2 w-24"
      viewBox="0 0 96 8"
      fill="none"
      aria-hidden
    >
      <path
        d="M1.5 5.2 C18 2.8, 34 6.4, 48 4.1 C62 1.8, 78 5.9, 94.5 3.4"
        stroke="var(--cobalt)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PageTitle({ children }: { children: ReactNode }) {
  return (
    <div>
      <h1 className="font-display text-[40px] font-bold leading-none tracking-tight text-ink max-sm:text-[28px]">
        {children}
      </h1>
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-[28px] font-semibold tracking-tight text-ink max-sm:text-xl">
        {children}
      </h2>
      <HandDrawnUnderline />
    </div>
  );
}
