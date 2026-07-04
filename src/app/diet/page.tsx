import { SECTION_INTROS } from "@/data/home";
import { DIET_RULES } from "@/data/dietRules";
import { PAGE_META, getTransition } from "@/data/pages";
import { tipsFor } from "@/data/tips";
import { Calculator } from "@/components/Calculator";
import { DietPlans } from "@/components/DietPlans";
import { TipGrid } from "@/components/TipGrid";
import { PageGuide } from "@/components/page/PageGuide";
import { SectionReveal } from "@/components/page/SectionReveal";
import { SectionHeader, SectionTransition } from "@/components/page/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Calculator as CalcIcon, ClipboardList, Lightbulb } from "lucide-react";

const SECTIONS = [
  { id: "calculator", label: "Calculator" },
  { id: "plan", label: "Your meal plan" },
  { id: "rules", label: "Rules" },
  { id: "tips", label: "Tips" },
];

export default function DietPage() {
  const tips = tipsFor("diet");
  const meta = PAGE_META.diet;

  return (
    <PageGuide
      title="Natural food, written for you"
      intro={SECTION_INTROS.diet}
      meta={meta}
      sections={SECTIONS}
    >
      <SectionReveal id="calculator" className="space-y-5">
        <SectionTransition>
          {getTransition("diet", "calculator")}
        </SectionTransition>
        <SectionHeader icon={CalcIcon}>Your numbers</SectionHeader>
        <Calculator />
      </SectionReveal>

      <SectionReveal id="plan" className="space-y-5">
        <SectionTransition>
          {getTransition("diet", "plan")}
        </SectionTransition>
        <SectionHeader icon={ClipboardList}>Your meal plan</SectionHeader>
        <DietPlans />
      </SectionReveal>

      <SectionReveal id="rules" className="space-y-5">
        <SectionHeader icon={ClipboardList}>The rules</SectionHeader>
        <Card>
          <ul className="space-y-3 text-[15px] leading-relaxed text-graphite">
            {DIET_RULES.map((rule) => (
              <li key={rule} className="flex gap-2">
                <span className="text-cobalt" aria-hidden>
                  ·
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </Card>
      </SectionReveal>

      <SectionReveal id="tips" className="space-y-5">
        <SectionTransition>
          {getTransition("diet", "tips")}
        </SectionTransition>
        <SectionHeader icon={Lightbulb}>Dieting tips & tricks</SectionHeader>
        <TipGrid tips={tips} />
      </SectionReveal>
    </PageGuide>
  );
}
