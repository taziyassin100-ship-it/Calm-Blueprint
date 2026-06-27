// app/components/Faq.tsx
import { Container } from "./Container";

const FAQS = [
  {
    q: "How much do I earn?",
    a: "40% commission standard — 70% right now, for our founding cohort of partners.",
  },
  {
    q: "Is there a cost to join?",
    a: "No. We only make money when you make money.",
  },
  {
    q: "What would I actually be promoting?",
    a: "The Cortisol Sleep Reset, our flagship 14-day protocol, plus our wider catalogue across sleep, stress, focus, energy, and mind.",
  },
  {
    q: "How do payouts work?",
    a: "We'll walk you through the specifics once you apply — happy to answer directly.",
  },
  {
    q: "Do I need a certain audience size?",
    a: "No fixed minimum. Tell us about your audience on the application and we'll go from there.",
  },
];

export function Faq() {
  return (
    <section className="border-b border-mist/20 bg-porcelain">
      <Container className="py-20">
        <div className="eyebrow mb-4">QUESTIONS</div>
        <h2 className="max-w-2xl font-serif text-3xl font-medium tracking-[-0.01em] text-midnight sm:text-4xl">
          Before you apply
        </h2>
        <dl className="mt-10 divide-y divide-mist/30 border-t border-mist/30">
          {FAQS.map((item) => (
            <div key={item.q} className="grid gap-2 py-6 sm:grid-cols-[1fr_2fr] sm:gap-8">
              <dt className="font-serif text-lg text-midnight">{item.q}</dt>
              <dd className="text-base text-ink/75">{item.a}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
