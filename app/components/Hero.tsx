import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { CtaButton } from "./CtaButton";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-ink pt-36 pb-24 sm:pt-44 sm:pb-32"
    >
      {/* faint blueprint texture + a single warm glow behind the headline */}
      <div className="blueprint-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(201,162,75,0.10), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow centered>Partner program · Founding cohort</Eyebrow>
            <h1 className="mt-7 font-serif text-4xl font-medium leading-[1.08] tracking-[-0.01em] text-bone sm:text-5xl md:text-6xl">
              Your audience already trusts you on sleep, stress, and focus. Now
              you can earn{" "}
              <span className="text-brass">up to 70% per sale</span> from the fix.
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-bone-dim">
              Calm Blueprint builds the evidence-based protocols. You bring the
              audience that already wants them. Founding partners keep up to 70%
              of every sale — no fee to join, no inventory, nothing to create.
            </p>
          </Reveal>

          {/* Hero video — placeholder block. Swap this div for the real 16:9 embed. */}
          <Reveal delay={120}>
            <div className="mx-auto mt-12 w-full max-w-2xl">
              <div className="group relative aspect-video overflow-hidden rounded-2xl border border-line bg-ink-card shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
                <div className="blueprint-grid absolute inset-0 opacity-50" aria-hidden="true" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brass text-ink transition-transform duration-200 group-hover:scale-105">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                    Video coming soon
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-10">
              <CtaButton>Apply to partner →</CtaButton>
            </div>
            <p className="mt-5 text-sm text-muted">
              Free to apply. No content minimums, no quotas. We only make money
              when you make money.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
