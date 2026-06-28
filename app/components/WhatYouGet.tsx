import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { CtaButton } from "./CtaButton";
import { Reveal } from "./Reveal";

const CARDS = [
  {
    n: "01",
    title: "A product your audience already wants.",
    body: "The Cortisol Sleep Reset, our flagship 14-day protocol, plus a full catalogue across sleep, stress, focus, energy, and mind. Evidence-based and premium — built for the exact people who follow you: founders, executives, and high-performers in their 30s and 40s.",
  },
  {
    n: "02",
    title: "Your link, and the work already done.",
    body: "One unique tracked link, yours to use however fits your content. Plus the angles, hooks, and proof points already written — so recommending it takes minutes, not a content sprint.",
  },
  {
    n: "03",
    title: "Up to 70% on every sale.",
    body: "Founding partners keep up to 70% of every sale that comes through their link. No minimum spend, no cost if it doesn't convert. We only make money when you make money.",
  },
];

export function WhatYouGet() {
  return (
    <section className="bg-ink-panel">
      <Container className="py-24 sm:py-32">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow centered>What you get</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl font-medium leading-tight tracking-[-0.01em] text-bone sm:text-4xl md:text-[2.75rem]">
              Everything&rsquo;s already built. You bring the audience.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-bone-dim">
              No product to create, no funnel to wire up, no support tickets to
              answer. You share a link — we handle the rest.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.n} delay={i * 100}>
              <article className="group h-full rounded-2xl border border-line bg-ink-card p-8 transition duration-200 hover:-translate-y-1 hover:border-brass/40">
                <div className="font-serif text-4xl font-medium text-brass">
                  {card.n}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-bone">
                  {card.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-bone-dim">
                  {card.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 text-center">
            <CtaButton>Apply to partner →</CtaButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
