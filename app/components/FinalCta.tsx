import { Container } from "./Container";
import { CtaButton } from "./CtaButton";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

// Closing section — a short pitch and one button, not a standing form.
// The form itself only appears once someone clicks through.
export function FinalCta() {
  return (
    <section className="bg-grad-ink">
      <Container className="py-24 text-center sm:py-32">
        <SectionHeader
          eyebrow="Apply"
          title="Ready to become a partner?"
          intro="Takes two minutes to apply. We'll follow up by email with next steps."
        />
        <Reveal delay={120}>
          <div className="mt-10">
            <CtaButton>Apply to partner →</CtaButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
