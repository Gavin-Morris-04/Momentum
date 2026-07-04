"use client";

import type { ReactNode } from "react";
import { PlanProvider } from "@/hooks/usePlan";

export function Providers({ children }: { children: ReactNode }) {
  return <PlanProvider>{children}</PlanProvider>;
}
