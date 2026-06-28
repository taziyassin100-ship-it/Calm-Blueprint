import type { ReactNode } from "react";

// The single repeated conversion action — a solid brass pill that
// smooth-scrolls to the application form.
export function CtaButton({
  children = "Apply to partner →",
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a
      href="#apply"
      className={`inline-flex items-center justify-center rounded-full bg-brass px-8 py-3.5 text-[15px] font-semibold tracking-wide text-ink shadow-[0_10px_30px_-12px_rgba(201,162,75,0.7)] transition duration-200 hover:-translate-y-0.5 hover:bg-brass-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass ${className}`}
    >
      {children}
    </a>
  );
}
