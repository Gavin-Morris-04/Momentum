import { CORE_NOTE, PHASE_DETAIL } from "@/data/splits";
import { SECTION_INTROS } from "@/data/home";
import { PAGE_META, getTransition } from "@/data/pages";
import { tipsFor } from "@/data/tips";
import { SplitPicker } from "@/components/SplitPicker";
import { TipGrid } from "@/components/TipGrid";
import { PageGuide } from "@/components/page/PageGuide";
import { SectionReveal } from "@/components/page/SectionReveal";
import { SectionHeader, SectionTransition } from "@/components/page/SectionHeader";
import { Dumbbell, Lightbulb } from "lucide-react";

const SECTIONS = [
  { id: "splits", label: "Your split" },
  { id: "notes", label: "Progression" },
  { id: "tips", label: "Tips" },
];

export default function LiftPage() {
  const tips = tipsFor("lift");
  const meta = PAGE_META.lift;

  return (
    <PageGuide
      title="Four complete splits"
      intro={[SECTION_INTROS.lift, PHASE_DETAIL]}
      meta={meta}
      sections={SECTIONS}
    >
      <SectionReveal id="splits" className="space-y-5">
        <SectionTransition>
          {getTransition("lift", "splits")}
        </SectionTransition>
        <SectionHeader icon={Dumbbell}>Pick your split</SectionHeader>
        <SplitPicker />
      </SectionReveal>

      <SectionReveal id="notes">
        <p className="max-w-read text-sm leading-relaxed text-graphite">
          {CORE_NOTE}
        </p>
      </SectionReveal>

      <SectionReveal id="tips" className="space-y-5">
        <SectionTransition>
          {getTransition("lift", "tips")}
        </SectionTransition>
        <SectionHeader icon={Lightbulb}>Lifting tips & tricks</SectionHeader>
        <TipGrid tips={tips} />
      </SectionReveal>
    </PageGuide>
  );
}
