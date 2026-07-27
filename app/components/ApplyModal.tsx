"use client";

import { useEffect, useState } from "react";
import { useApplyModal } from "./ApplyModalContext";
import { ApplyForm } from "./ApplyForm";

// Overlay that pops the application form in front of the page — the page
// behind blurs and stops scrolling while this is open, and the card itself
// is height-capped to the viewport so it never needs page scroll to reach.
export function ApplyModal() {
  const { isOpen, close } = useApplyModal();
  if (!isOpen) return null;
  return <ApplyModalDialog close={close} />;
}

function ApplyModalDialog({ close }: { close: () => void }) {
  // false on mount so the entrance transition below has something to
  // animate from; unmounting on close (rather than toggling this back to
  // false) resets it for free next time the dialog opens.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => setVisible(true));

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.documentElement.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      cancelAnimationFrame(frame);
    };
  }, [close]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Apply to become a partner"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      <div
        onClick={close}
        aria-hidden="true"
        className={`absolute inset-0 bg-ink-deep/80 backdrop-blur-md transition-opacity duration-300 motion-reduce:transition-none ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`surface-card glow-brass relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line p-7 shadow-2xl transition-all duration-300 motion-reduce:transition-none sm:p-10 ${
          visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-[0.98] opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-bone"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <ApplyForm />
      </div>
    </div>
  );
}
