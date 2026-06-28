import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

/*
 * HONEST FALLBACK (Option B): no testimonials, names, or earnings invented.
 * These three cards state why the partnership is easy to recommend.
 * When real testimonials are ready, swap each <article> below for a
 * testimonial card (quote, partner name, platform, optional result).
 */
const CARDS = [
  {
    title: "A product that survives scrutiny.",
    body: "Your audience is skeptical of wellness — that's the point. Every protocol leads with a mechanism, not a mood. It's built to be recommended to people who don't fall for fluff.",
  },
  {
    title: "Made for the audience you already have.",
    body: "No reframing your content, no hard pivot. If you talk about output, recovery, sleep, or focus, this slots in where you already are.",
  },
  {
    title: "Aligned incentives, in writing.",
    body: "No fee, no quota, no risk on your side. You earn on results; we earn on results. That's the whole deal — and it's why the rate is what it is.",
  },
];

export function Partners() {
  return (
    <section className="bg-ink-panel">
      <Container className="py-24 sm:py-32">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow centered>Partners</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl font-medium leading-tight tracking-[-0.01em] text-bone sm:text-4xl md:text-[2.75rem]">
              Built to be easy to recommend — and easy to earn from.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 100}>
              {/* Swap for a real testimonial card when available. */}
              <article className="h-full rounded-2xl border border-line bg-ink-card p-8">
                <h3 className="text-lg font-semibold text-bone">{card.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-bone-dim">
                  {card.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
