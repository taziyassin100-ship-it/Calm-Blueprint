import { Container } from "./Container";
import { Reveal } from "./Reveal";

export function StartVideo() {
  return (
    <section className="bg-grad-panel">
      <Container className="py-20 sm:py-24">
        <Reveal>
          {/* Placeholder player — swap for the real YouTube/Vimeo/MP4 embed. */}
          <div className="mx-auto w-full max-w-2xl">
            <div className="surface-card glow-brass group relative aspect-video overflow-hidden rounded-2xl border border-line">
              <div className="blueprint-grid absolute inset-0 opacity-50" aria-hidden="true" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <button
                  type="button"
                  aria-label="Play the partnership walkthrough video"
                  className="icon-glow-static flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-brass-light to-brass text-ink transition-transform duration-200 group-hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                  Video coming soon
                </span>
              </div>
            </div>
            <p className="mt-5 text-center text-sm text-muted">
              Watch first. The whole partnership in about three minutes.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
