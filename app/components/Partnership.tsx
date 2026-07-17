import { Container } from "./Container";
import { SectionHeader } from "./SectionHeader";
import { CtaButton } from "./CtaButton";
import { Reveal } from "./Reveal";

export function Partnership() {
  return (
    <section className="bg-grad-ink">
      <Container className="py-24 sm:py-32">
        <SectionHeader
          eyebrow="The partnership"
          title={
            <>
              Get{" "}
              <span className="text-brass text-glow-brass">up to 70%</span> per
              sale instead of 40%, before the offer ends.
            </>
          }
          intro={
            <>
              You get a unique link. Every sale that comes through it earns you a
              commission. No fee to join, no minimum spend, no cost if it
              doesn&rsquo;t convert. We only make money when you make money.
            </>
          }
        />

        <Reveal>
          <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
            {/* Standard rate — muted */}
            <div className="surface-card rounded-2xl border border-line p-8 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                Standard rate
              </p>
              <p className="mt-6 font-serif text-5xl font-medium text-bone-dim">
                40%
              </p>
              <p className="mt-6 text-sm text-muted">
                Applies after the offer ends.
              </p>
            </div>

            {/* Higher rate — emphasized */}
            <div className="surface-card-feature glow-brass-strong relative rounded-2xl border border-brass p-8 text-center">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brass px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                Limited
              </span>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brass">
                Partner rate
              </p>
              <p className="mt-6 font-serif text-5xl font-medium text-brass">
                up to 70%
              </p>
              <p className="mt-6 text-sm text-bone-dim">
                For partners who join now. The offer won&rsquo;t stay open
                indefinitely.
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
