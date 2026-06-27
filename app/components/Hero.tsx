import { Container } from "./Container";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-mist/20 bg-gradient-to-br from-[#16294A] via-midnight to-ink text-bone">
      <div className="bg-blueprint-grid absolute inset-0 opacity-10" aria-hidden="true" />
      <Container className="relative py-20 sm:py-28">
        <div className="eyebrow eyebrow-on-dark mb-6">PARTNER PROGRAM · FOUNDING COHORT</div>
        <h1 className="max-w-3xl font-serif text-4xl font-medium leading-[1.05] tracking-[-0.01em] text-bone sm:text-6xl">
          A blueprint for a calmer mind. Now, a way to get paid for sharing it.
        </h1>
        <p className="mt-6 max-w-2xl font-serif text-lg italic text-brass-soft sm:text-xl">
          Evidence-based sleep, stress, and focus protocols — built for an audience that
          already trusts you on this exact subject.
        </p>

        <div className="mt-12 max-w-3xl overflow-hidden rounded-lg border border-mist/20 bg-ink/40">
          <div className="flex aspect-video items-center justify-center">
            <button
              type="button"
              aria-label="Play partner program overview video"
              className="flex h-16 w-16 items-center justify-center rounded-full bg-brass text-midnight transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>

        <p className="mt-6 max-w-xl text-base text-mist">
          Watch how the partnership works in under two minutes — then claim your spot
          while founding-partner terms are still open.
        </p>

        <a
          href="#apply"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-brass px-7 py-3 text-base font-medium text-midnight transition-colors hover:bg-brass-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone"
        >
          Apply to partner
        </a>
      </Container>
    </section>
  );
}
