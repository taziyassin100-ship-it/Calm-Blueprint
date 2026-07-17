import type { ReactNode } from "react";
import { brassButtonClass } from "./buttonStyles";

// The single repeated conversion action — a solid brass pill that
// smooth-scrolls to the application form.
export function CtaButton({
  children = "Apply to partner →",
  className = "",
  href = "#apply",
}: {
  children?: ReactNode;
  className?: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className={`${brassButtonClass} hover:-translate-y-0.5 ${className}`}
    >
      {children}
    </a>
  );
}
