import { REFERENCES, REFERENCE_GROUPS } from "@/data/references";
import { Card, PageTitle } from "@/components/ui/Card";

export default function ReferencesPage() {
  return (
    <div className="space-y-8">
      <header className="max-w-read">
        <PageTitle>The science behind Fit 60</PageTitle>
        <p className="mt-3 text-[16px] leading-relaxed text-graphite">
          Named sources only. No fabricated DOIs or URLs. Where evidence is
          modest, we say so.
        </p>
      </header>

      <div className="space-y-8">
        {REFERENCE_GROUPS.map((group) => {
          const items = REFERENCES.filter((r) => r.group === group);
          return (
            <section key={group}>
              <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
                {group}
              </h2>
              <div className="mt-4 space-y-3">
                {items.map((item) => (
                  <Card key={`${item.topic}-${item.source}`}>
                    <h3 className="font-display text-base font-semibold text-ink">
                      {item.topic}
                    </h3>
                    <p className="mt-2 font-mono text-xs text-cobalt">
                      {item.source}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-graphite">
                      {item.summary}
                    </p>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
