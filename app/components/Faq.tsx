"use client";

import { useState } from "react";
import { Container } from "./Container";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

type FaqItem = { q: string; a: string };

const FAQS: FaqItem[] = [
  {
    q: "How much do I earn?",
    a: "40% standard, and up to 70% right now, while the offer is open. Earnings scale with how the product lands with your audience; we don't promise a fixed number.",
  },
  {
    q: "Is there a cost to join?",
    a: "No. No fee, no subscription, no minimum spend. We only make money when you make money.",
  },
  {
    q: "What would I actually be promoting?",
    a: "The Cortisol Sleep Reset, our flagship 14-day protocol, plus the wider catalogue across sleep, stress, focus, energy, and mind.",
  },
  {
    q: "Do I have to create content or hit a quota?",
    a: "No content minimums, no quotas. Mention it once or build it into your regular content. Your call.",
  },
  {
    q: "Do I need a certain audience size?",
    a: "No fixed minimum. What matters is an engaged audience that trusts you. Tell us about yours on the application and we'll go from there.",
  },
  {
    q: "How do payouts work?",
    a: "We'll walk you through the specifics once you apply. Happy to answer directly.",
  },
];

export function Faq({
  eyebrow = "Questions",
  title = "Before you apply",
  items = FAQS,
}: {
  eyebrow?: string;
  title?: string;
  items?: FaqItem[];
} = {}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-grad-panel">
      <Container className="py-24 sm:py-32">
        <SectionHeader eyebrow={eyebrow} title={title} />

        <Reveal>
          <div className="mx-auto mt-12 max-w-3xl divide-y divide-line border-y border-line">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-button-${i}`}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
                    >
                      <span
                        className={`text-base font-medium sm:text-lg ${
                          isOpen ? "text-brass" : "text-bone"
                        }`}
                      >
                        {item.q}
                      </span>
                      <svg
                        viewBox="0 0 24 24"
                        className={`h-5 w-5 shrink-0 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2] transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-brass" : "text-muted"
                        }`}
                        aria-hidden="true"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-button-${i}`}
                    hidden={!isOpen}
                    className="pb-6 pr-10 text-[15px] leading-relaxed text-bone-dim"
                  >
                    {item.a}
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
