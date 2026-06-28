import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { CtaButton } from "./CtaButton";
import { Reveal } from "./Reveal";

export function Partnership() {
  return (
    <section className="bg-ink">
      <Container className="py-24 sm:py-32">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow centered>The partnership</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl font-medium leading-tight tracking-[-0.01em] text-bone sm:text-4xl md:text-[2.75rem]">
              Up to 40% standard. Up to 70% if you join the founding cohort.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-bone-dim">
              You get a unique link. Every sale that comes through it earns you a
              commission — no fee to join, no minimum spend, no cost if it
              doesn&rsquo;t convert. We only make money when you make money.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
            {/* Standard rate — muted */}
            <div className="rounded-2xl border border-line bg-ink-card p-8 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                Standard rate
              </p>
              <p className="mt-6 font-serif text-5xl font-medium text-bone-dim">
                up to 40%
              </p>
              <p className="mt-6 text-sm text-muted">
                Applies after the founding cohort closes.
              </p>
            </div>

            {/* Founding rate — emphasized */}
            <div className="relative rounded-2xl border border-brass bg-ink-card p-8 text-center shadow-[0_0_50px_-18px_rgba(201,162,75,0.55)]">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brass px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                Founding
              </span>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brass">
                Founding partner rate
              </p>
              <p className="mt-6 font-serif text-5xl font-medium text-brass">
                up to 70%
              </p>
              <p className="mt-6 text-sm text-bone-dim">
                For our first wave of partners. No fixed end date — but it
                won&rsquo;t stay open indefinitely.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-muted">
            What you&rsquo;d be promoting: our flagship protocol, The Cortisol
            Sleep Reset, plus the wider catalogue across sleep, stress, focus,
            energy, and mind.
          </p>
          <div className="mt-10 text-center">
            <CtaButton>Apply to partner →</CtaButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
