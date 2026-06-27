import { BrandMark } from "./BrandMark";
import { Container } from "./Container";

export function Nav() {
  return (
    <header className="border-b border-mist/30 bg-porcelain/90 backdrop-blur sticky top-0 z-20">
      <Container className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <BrandMark size={32} />
          <div className="flex flex-col leading-none">
            <span className="font-serif text-lg font-medium text-midnight">CALM</span>
            <span className="font-mono text-[10px] tracking-[0.5em] text-slate">BLUEPRINT</span>
          </div>
        </div>
        <a
          href="#apply"
          className="rounded-full border border-midnight px-5 py-2 text-sm font-medium text-midnight transition-colors hover:bg-midnight hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
        >
          Apply to partner
        </a>
      </Container>
    </header>
  );
}
