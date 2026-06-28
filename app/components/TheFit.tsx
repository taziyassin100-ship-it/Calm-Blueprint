import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

const FOR_YOU = [
  "You create for an audience that cares about sleep, stress, focus, energy, or performance.",
  "Your audience trusts your recommendations — engagement matters more to us than follower count.",
  "You'd rather recommend one thing that's genuinely good than scatter a dozen affiliate links.",
  "You want income from your audience without building a product or running support.",
];

const NOT_FOR_YOU = [
  "You're after a get-rich-quick scheme — earnings scale with how the product lands, and we don't promise a number.",
  "Your audience has no interest in health, performance, or how they feel day to day.",
  "You want to rebuild or white-label the product — it stays Calm Blueprint.",
  "You won't mention it more than once — a single forgotten post rarely converts.",
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-0.5 h-5 w-5 shrink-0 fill-none stroke-brass [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2]"
      aria-hidden="true"
    >
      <path d="M5 12.5l4 4 10-10" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-0.5 h-5 w-5 shrink-0 fill-none stroke-muted [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2]"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function TheFit() {
  return (
    <section className="bg-ink-panel">
      <Container className="py-24 sm:py-32">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow centered>The fit</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl font-medium leading-tight tracking-[-0.01em] text-bone sm:text-4xl md:text-[2.75rem]">
              Is this the right partnership for you?
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-line bg-ink-card p-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-bone">
                This is for you if
              </h3>
              <ul className="mt-6 space-y-4">
                {FOR_YOU.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-bone-dim">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="h-full rounded-2xl border border-line bg-ink-card/60 p-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
                Not for you if
              </h3>
              <ul className="mt-6 space-y-4">
                {NOT_FOR_YOU.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                    <CrossIcon />
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
