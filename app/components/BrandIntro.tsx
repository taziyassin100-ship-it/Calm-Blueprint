import { Container } from "./Container";

const PILLARS = [
  {
    label: "Pillar 01",
    title: "Engineered, not vague",
    body: "Every product is a protocol with a mechanism, a sequence, and a result you can feel. No fluff, no woo.",
  },
  {
    label: "Pillar 02",
    title: "Built for high output",
    body: "For people running at 95% capacity. We don't ask them to slow down — we help their recovery keep pace with their ambition.",
  },
  {
    label: "Pillar 03",
    title: "Calm is the metric",
    body: "Regulation you can measure: faster sleep onset, fewer 4 AM wake-ups, a steadier baseline. Outcomes over affirmations.",
  },
];

export function BrandIntro() {
  return (
    <section className="border-b border-mist/20 bg-porcelain">
      <Container className="py-20">
        <div className="eyebrow mb-4">WHO WE ARE</div>
        <h2 className="max-w-2xl font-serif text-3xl font-medium tracking-[-0.01em] text-midnight sm:text-4xl">
          Engineered calm, not wellness fluff.
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-ink/80">
          Most wellness brands sell softness — candles, pastels, &ldquo;soft affirmations.&rdquo;
          Calm Blueprint sells something its audience actually respects: engineering. We treat
          a dysregulated nervous system the way a founder treats a broken system — diagnose the
          root cause, apply a sequenced protocol, measure the result.
        </p>
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-mist/30 bg-mist/30 sm:grid-cols-3">
          {PILLARS.map((pillar) => (
            <div key={pillar.label} className="bg-porcelain p-7">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-brass">
                {pillar.label}
              </div>
              <h3 className="mt-3 font-serif text-xl text-midnight">{pillar.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{pillar.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
