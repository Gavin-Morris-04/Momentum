export function ThreeThings({ items }: { items: [string, string, string] }) {
  return (
    <aside className="max-w-read rounded-card border border-line border-l-[3px] border-l-cobalt bg-cobalt/[0.04] p-5">
      <p className="font-display text-sm font-semibold text-ink">
        If you only remember three things
      </p>
      <ol className="mt-3 space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-graphite">
            <span className="font-mono text-sm text-cobalt">{i + 1}.</span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </aside>
  );
}
