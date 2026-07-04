import { SECTION_INTROS } from "@/data/home";
import { CalendarBuilder } from "@/components/CalendarBuilder";
import { Eyebrow, PageTitle } from "@/components/ui/Card";

export default function CalendarPage() {
  return (
    <div className="space-y-8">
      <header>
        <Eyebrow>Calendar</Eyebrow>
        <PageTitle>Export your sixty days</PageTitle>
        <p className="mt-3 max-w-read text-[16px] leading-relaxed text-graphite">
          {SECTION_INTROS.calendar}
        </p>
      </header>

      <CalendarBuilder />
    </div>
  );
}
