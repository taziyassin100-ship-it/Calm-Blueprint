import { Container } from "./Container";

const TERRITORIES = ["Sleep", "Regulation", "Focus", "Energy", "Mind"];

export function AudienceFit() {
  return (
    <section className="border-b border-mist/20 bg-porcelain">
      <Container className="py-20">
        <div className="eyebrow mb-4">WHY YOUR AUDIENCE</div>
        <h2 className="max-w-2xl font-serif text-3xl font-medium tracking-[-0.01em] text-midnight sm:text-4xl">
          If your audience already asks about sleep, stress, or burnout, they&rsquo;re
          already qualified.
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-ink/80">
          Calm Blueprint&rsquo;s customers are founders, executives, and high-performers in
          their 30s and 40s — the same audience that already follows creators covering these
          five territories:
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {TERRITORIES.map((territory) => (
            <span
              key={territory}
              className="rounded-full border border-mist/40 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.1em] text-slate"
            >
              {territory}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
