import { Container } from "./Container";
import { SectionHeader } from "./SectionHeader";

export function StartReassurance() {
  return (
    <section className="bg-grad-panel">
      <Container className="py-24 sm:py-32">
        <SectionHeader
          eyebrow="Before you go"
          title={<>You&rsquo;re not doing this alone.</>}
          intro={
            <>
              The posting plan is proven and already built. The words are
              already written. If you get stuck, there&rsquo;s a real person
              on the other end, not a help center article.
            </>
          }
        />
      </Container>
    </section>
  );
}
