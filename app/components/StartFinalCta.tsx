import { Container } from "./Container";
import { SectionHeader } from "./SectionHeader";
import { CtaButton } from "./CtaButton";
import { Reveal } from "./Reveal";

// Same placeholder partner inbox used in Footer.tsx — replace both before launch.
const PARTNER_LINK_EMAIL =
  "mailto:partners@calmblueprint.com?subject=Ready%20for%20my%20tracked%20link";

export function StartFinalCta() {
  return (
    <section id="get-link" className="scroll-mt-24 bg-grad-ink">
      <Container className="py-24 sm:py-32">
        <SectionHeader
          eyebrow="Last step"
          title="Get your tracked link."
          intro="Reply to the email you received and we’ll send your unique tracked link."
        />

        <Reveal>
          <div className="mt-10 text-center">
            <CtaButton href={PARTNER_LINK_EMAIL}>Get your tracked link</CtaButton>
            <p className="mx-auto mt-5 max-w-md text-sm text-muted">
              No cost, no quota, no risk on your side. We only make money when
              you do.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
