import { Container } from "./Container";

const STEPS = [
  { n: "01", title: "Apply", body: "Tell us about your audience. Takes about two minutes." },
  {
    n: "02",
    title: "Get your link",
    body: "A unique tracked link, yours to use however fits your content.",
  },
  { n: "03", title: "Share it", body: "Mention it once, mention it weekly — your call." },
  { n: "04", title: "Get paid", body: "Commission on every sale that comes through your link." },
];

export function HowItWorks() {
  return (
    <section className="border-b border-mist/20 bg-porcelain">
      <Container className="py-20">
        <div className="eyebrow mb-4">HOW IT WORKS</div>
        <h2 className="max-w-2xl font-serif text-3xl font-medium tracking-[-0.01em] text-midnight sm:text-4xl">
          Four steps. No content requirements, no quotas.
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.n}>
              <div className="font-mono text-sm text-brass">{step.n}</div>
              <h3 className="mt-2 font-serif text-xl text-midnight">{step.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{step.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
