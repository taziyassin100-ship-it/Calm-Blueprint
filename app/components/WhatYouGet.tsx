import { Container } from "./Container";
import { SectionHeader } from "./SectionHeader";
import { CtaButton } from "./CtaButton";
import { Reveal } from "./Reveal";

const CARDS = [
  {
    n: "01",
    title: "A product your audience already wants.",
    body: "Premium, evidence-based protocols across sleep, stress, focus, energy, and mind. Built for the people who already follow you.",
  },
  {
    n: "02",
    title: "Your link, and the work already done.",
    body: "One tracked link, plus the hooks and proof points already written. Recommending it takes minutes, not a content sprint.",
  },
  {
    n: "03",
    title: "Up to 70% on every sale.",
    body: "Keep up to 70% of every sale through your link. No minimum, no cost if it doesn't convert.",
  },
];

export function WhatYouGet() {
  return (
    <section className="bg-grad-panel">
      <Container className="py-24 sm:py-32">
        <SectionHeader
          eyebrow="What you get"
          title="Everything already built for you."
          intro="No product to create, no funnel to wire up, no support tickets to answer. You share a link, and we handle the rest."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.n} delay={i * 100}>
              <article className="surface-card group h-full rounded-2xl border border-line p-8 transition duration-200 hover:-translate-y-1 hover:border-brass/40 hover:shadow-[0_0_45px_-16px_rgba(232,181,62,0.5)]">
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
