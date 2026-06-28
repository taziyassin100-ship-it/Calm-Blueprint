import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

const STEPS = [
  { n: "01", title: "Apply", body: "Tell us about your audience. Takes about two minutes." },
  { n: "02", title: "Get your link", body: "A unique tracked link, yours to use however fits your content." },
  { n: "03", title: "Share it", body: "Mention it once, mention it weekly — your call." },
  { n: "04", title: "Get paid", body: "Commission on every sale that comes through your link." },
];

export function HowItWorks() {
  return (
    <section className="bg-ink">
      <Container className="py-24 sm:py-32">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow centered>How it works</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl font-medium leading-tight tracking-[-0.01em] text-bone sm:text-4xl md:text-[2.75rem]">
              Four steps. No content requirements, no quotas.
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <ol className="mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
            {STEPS.map((step, i) => (
              <li key={step.n} className="relative text-center md:text-left">
                {/* brass connector between steps on desktop */}
                {i < STEPS.length - 1 && (
                  <span
                    className="absolute right-[-0.75rem] top-[0.6rem] hidden h-px w-6 bg-brass/40 md:block"
                    aria-hidden="true"
                  />
                )}
                <div className="font-serif text-2xl font-medium text-brass">
                  {step.n}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-bone">
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-bone-dim">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
