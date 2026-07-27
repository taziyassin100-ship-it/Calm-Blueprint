"use client";

import type { ReactNode } from "react";
import { brassButtonClass } from "./buttonStyles";
import { useApplyModal } from "./ApplyModalContext";

// The single repeated conversion action — a solid brass pill that
// pops the application form open over the page.
export function CtaButton({
  children = "Apply to partner →",
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  const { open } = useApplyModal();
  return (
    <button
      type="button"
      onClick={open}
      className={`${brassButtonClass} hover:-translate-y-0.5 ${className}`}
    >
      {children}
    </button>
  );
}
