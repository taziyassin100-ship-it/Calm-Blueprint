import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

// Shared centered section opener: eyebrow → serif heading → optional intro,
// with optional extra centered content (e.g. chips) below.
export function SectionHeader({
  eyebrow,
  title,
  intro,
  containerClassName = "max-w-2xl",
  children,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  containerClassName?: string;
  children?: ReactNode;
}) {
  return (
    <Reveal>
      <div className={`mx-auto ${containerClassName} text-center`}>
        <Eyebrow centered>{eyebrow}</Eyebrow>
        <h2 className="mt-6 font-serif text-3xl font-medium leading-tight tracking-[-0.01em] text-bone sm:text-4xl md:text-[2.75rem]">
          {title}
        </h2>
        {intro ? (
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-bone-dim">
            {intro}
          </p>
        ) : null}
        {children}
      </div>
    </Reveal>
  );
}
