import { Container } from "./Container";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

type Step = { n: string; title: string; body: string };

const STEPS: Step[] = [
  { n: "01", title: "Apply", body: "Tell us about your audience. Takes about two minutes." },
  { n: "02", title: "Get your link", body: "A unique tracked link, yours to use however fits your content." },
  { n: "03", title: "Share it", body: "Mention it once, mention it weekly. Your call." },
  { n: "04", title: "Get paid", body: "Commission on every sale that comes through your link." },
];

export function HowItWorks({
  eyebrow = "How it works",
  title = "4 steps. No content requirements, no quotas.",
  steps = STEPS,
}: {
  eyebrow?: string;
  title?: string;
  steps?: Step[];
} = {}) {
  return (
    <section className="bg-grad-ink">
      <Container className="py-24 sm:py-32">
        <SectionHeader eyebrow={eyebrow} title={title} />

        <Reveal>
          <ol className="mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
            {steps.map((step, i) => (
              <li key={step.n} className="relative text-center md:text-left">
                {/* brass connector between steps on desktop */}
                {i < steps.length - 1 && (
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
