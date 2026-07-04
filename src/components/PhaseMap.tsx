import { PHASES } from "@/data/home";
import { Eyebrow } from "@/components/ui/Card";

export function PhaseMap() {
  const closedPhases = PHASES.filter((p) => !p.openEnded);
  const openPhase = PHASES.find((p) => p.openEnded);

  return (
    <section>
      <Eyebrow>Journey map</Eyebrow>
      <div className="mt-4 overflow-hidden rounded-card border border-line">
        <div className="grid md:grid-cols-[2fr_2fr_1.4fr_1.2fr]">
          {PHASES.map((phase, index) => (
            <div
              key={phase.id}
              className={`border-line p-4 max-md:border-b md:border-r ${
                index === PHASES.length - 1 ? "md:border-r-0 max-md:border-b-0" : ""
              } ${
                phase.openEnded
                  ? "bg-gradient-to-r from-paper via-paper/80 to-transparent"
                  : phase.id === "finish"
                    ? "bg-dawn/10"
                    : phase.id === "phase-2"
                      ? "bg-cobalt/5"
                      : "bg-paper"
              }`}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-graphite">
                {phase.label}
                {!phase.openEnded && phase.days !== phase.label
                  ? ` · ${phase.days}`
                  : phase.openEnded
                    ? ` · ${phase.days}`
                    : ""}
              </p>
              <p className="mt-1 font-display text-lg font-semibold text-ink">
                {phase.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-graphite">
                {phase.body}
              </p>
            </div>
          ))}
        </div>
        <div className="flex h-2 w-full">
          {closedPhases.map((phase) => (
            <div
              key={phase.id}
              className={`${
                phase.id === "phase-1"
                  ? "w-[40%] bg-cobalt/40"
                  : phase.id === "phase-2"
                    ? "w-[40%] bg-cobalt"
                    : "w-[12%] bg-dawn"
              }`}
            />
          ))}
          {openPhase && (
            <div
              className="flex-1 bg-gradient-to-r from-dawn/60 via-cobalt/20 to-transparent"
              aria-hidden
            />
          )}
        </div>
      </div>
    </section>
  );
}
