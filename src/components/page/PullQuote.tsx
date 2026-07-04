import type { ReactNode } from "react";

export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="max-w-read border-l-0 py-2">
      <p className="font-display text-[22px] font-medium italic leading-snug tracking-tight text-ink max-sm:text-lg">
        {children}
      </p>
      <svg
        className="mt-2 block h-2 w-32"
        viewBox="0 0 128 8"
        fill="none"
        aria-hidden
      >
        <path
          d="M1.5 5.2 C24 2.8, 48 6.4, 64 4.1 C80 1.8, 104 5.9, 126.5 3.4"
          stroke="var(--cobalt)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </blockquote>
  );
}
