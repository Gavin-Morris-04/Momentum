import { SECTION_INTROS } from "@/data/home";
import { PAGE_META } from "@/data/pages";
import {
  BUYING_TIPS,
  PROTEIN_NATURAL,
  SKIP_LIST,
  SUPPLEMENT_GROUPS,
  SUPPLEMENTS_DISCLAIMER,
  SUPPLEMENTS_HONESTY,
  SUPPLEMENTS_THESIS,
} from "@/data/supplements";
import { PageClosing } from "@/components/page/PageClosing";
import { PullQuote } from "@/components/page/PullQuote";
import { Card, Eyebrow, PageTitle, SectionTitle } from "@/components/ui/Card";

export default function SupplementsPage() {
  const meta = PAGE_META.supplements;

  return (
    <div className="space-y-10">
      <header className="max-w-read">
        <Eyebrow>Supplements</Eyebrow>
        <PageTitle>Natural compounds only</PageTitle>
        <p className="mt-3 text-[16px] leading-relaxed text-graphite">
          {SECTION_INTROS.supplements}
        </p>
        <p className="mt-3 text-[16px] leading-relaxed text-graphite">
          {SUPPLEMENTS_THESIS}
        </p>
        <p className="mt-2 text-sm font-medium text-ink">
          {SUPPLEMENTS_HONESTY}
        </p>
        <p className="mt-2 text-sm text-graphite">{SUPPLEMENTS_DISCLAIMER}</p>
      </header>

      <PullQuote>{meta.pullQuote}</PullQuote>

      {SUPPLEMENT_GROUPS.map((group) => (
        <section key={group.id}>
          <SectionTitle>{group.title}</SectionTitle>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {group.items.map((item) => (
              <Card key={item.id}>
                <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                  {item.name}
                </h3>
                <p className="mt-2 font-mono text-sm text-cobalt">{item.dose}</p>
                <p className="mt-1 text-sm text-graphite">{item.when}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink">
                  {item.does}
                </p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-graphite">
                  Natural source
                </p>
                <p className="mt-1 text-sm text-graphite">{item.naturalSource}</p>
                {item.evidence && (
                  <p className="mt-3 font-mono text-[11px] leading-relaxed text-graphite">
                    Evidence — {item.evidence}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </section>
      ))}

      <section>
        <SectionTitle>{PROTEIN_NATURAL.title}</SectionTitle>
        <Card className="mt-4 max-w-read">
          <p className="text-[16px] leading-relaxed text-ink">
            {PROTEIN_NATURAL.foodFirst}
          </p>
          <p className="mt-3 text-[16px] leading-relaxed text-graphite">
            {PROTEIN_NATURAL.whey}
          </p>
        </Card>
      </section>

      <section>
        <SectionTitle>What to skip</SectionTitle>
        <Card className="mt-4 border-l-2 border-l-rest">
          <ul className="space-y-3">
            {SKIP_LIST.map((item) => (
              <li key={item.name}>
                <p className="font-medium text-ink">{item.name}</p>
                <p className="mt-1 text-sm text-graphite">{item.body}</p>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section>
        <SectionTitle>Buying tips</SectionTitle>
        <ol className="mt-4 max-w-read space-y-2">
          {BUYING_TIPS.map((tip, index) => (
            <li
              key={tip}
              className="flex gap-3 text-[16px] leading-relaxed text-ink"
            >
              <span className="font-mono text-sm text-graphite">
                {index + 1}.
              </span>
              <span>{tip}</span>
            </li>
          ))}
        </ol>
      </section>

      {meta.closing && <PageClosing {...meta.closing} />}
    </div>
  );
}
