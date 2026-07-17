import { Container } from "./Container";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const FOR_YOU = [
  "You create for an audience that cares about sleep, stress, focus, energy, or performance.",
  "Your audience trusts your recommendations. Engagement matters more to us than follower count.",
  "You'd rather recommend one thing that's genuinely good than scatter a dozen affiliate links.",
  "You want income from your audience without building a product or running support.",
];

const NOT_FOR_YOU = [
  "You're after a get-rich-quick scheme. Earnings scale with how the product lands, and we don't promise a number.",
  "Your audience has no interest in health, performance, or how they feel day to day.",
  "You want to rebuild or white-label the product. It stays Calm Blueprint.",
  "You won't mention it more than once. A single forgotten post rarely converts.",
];

export function CheckBadge() {
  return (
    <span
      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/15 shadow-[0_0_12px_-2px_rgba(62,217,139,0.6)]"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5 fill-none stroke-success [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2.5]"
      >
        <path d="M5 12.5l4 4 10-10" />
      </svg>
    </span>
  );
}

function CrossBadge() {
  return (
    <span
      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-danger/15 shadow-[0_0_12px_-2px_rgba(242,100,90,0.55)]"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5 fill-none stroke-danger [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2.5]"
      >
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </span>
  );
}

export function TheFit() {
  return (
    <section className="bg-grad-panel">
      <Container className="py-24 sm:py-32">
        <SectionHeader
          eyebrow="The fit"
          title="Is this the right partnership for you?"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="surface-card h-full rounded-2xl border border-success/25 p-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-success">
                This is for you if
              </h3>
              <ul className="mt-6 space-y-4">
                {FOR_YOU.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-bone-dim">
                    <CheckBadge />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="surface-card h-full rounded-2xl border border-danger/20 p-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-danger">
                Not for you if
              </h3>
              <ul className="mt-6 space-y-4">
                {NOT_FOR_YOU.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-bone-dim">
                    <CrossBadge />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
