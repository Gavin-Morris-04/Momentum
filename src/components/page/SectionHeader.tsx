import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { HandDrawnUnderline } from "@/components/ui/Card";

export function SectionHeader({
  icon: Icon,
  children,
  id,
}: {
  icon: LucideIcon;
  children: ReactNode;
  id?: string;
}) {
  return (
    <div id={id} className="scroll-mt-24">
      <div className="flex items-center gap-2.5">
        <Icon
          className="h-[17px] w-[17px] shrink-0 text-graphite"
          strokeWidth={1.5}
          aria-hidden
        />
        <h2 className="font-display text-[28px] font-semibold tracking-tight text-ink max-sm:text-xl">
          {children}
        </h2>
      </div>
      <HandDrawnUnderline />
    </div>
  );
}

export function SectionTransition({ children }: { children?: string }) {
  if (!children) return null;
  return (
    <p className="max-w-read text-[15px] leading-relaxed text-graphite">
      {children}
    </p>
  );
}
