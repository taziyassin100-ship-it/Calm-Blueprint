import { Container } from "./Container";
import { CtaButton } from "./CtaButton";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section
      id="top"
      className="bg-grad-ink relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32"
    >
      {/* faint blueprint texture + a single warm glow behind the headline */}
      <div className="blueprint-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[540px] w-[860px] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(232,181,62,0.14), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <h1 className="font-serif text-3xl font-medium leading-[1.1] tracking-[-0.01em] text-bone sm:text-4xl md:text-5xl">
              Your audience already trusts you.{" "}
              <span className="text-brass">Now give them a product they need.</span>
            </h1>
          </Reveal>

          {/* Hero video — placeholder block. Swap this div for the real 16:9 embed. */}
          <Reveal delay={120}>
            <div className="mx-auto mt-12 w-full max-w-2xl">
              <div className="surface-card glow-brass group relative aspect-video overflow-hidden rounded-2xl border border-line">
                <div className="blueprint-grid absolute inset-0 opacity-50" aria-hidden="true" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <span className="icon-glow-static flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-brass-light to-brass text-ink transition-transform duration-200 group-hover:scale-110">
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
            {/* single value paragraph below the video frame */}
            <p className="mx-auto mt-12 max-w-3xl text-lg leading-relaxed text-bone-dim">
              Calm Blueprint provides you with a digital product your audience
              already needs, and you keep up to 70% of each sale. No fee to
              join, no inventory, nothing to create. Everything&rsquo;s built for
              you, and we only make money when you make money.
            </p>
            <div className="mt-8">
              <CtaButton>Apply to partner →</CtaButton>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
