"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type ApplyModalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const ApplyModalContext = createContext<ApplyModalContextValue | null>(null);

export function ApplyModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const value = useMemo(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [isOpen]
  );

  return (
    <ApplyModalContext.Provider value={value}>{children}</ApplyModalContext.Provider>
  );
}

export function useApplyModal() {
  const ctx = useContext(ApplyModalContext);
  if (!ctx) throw new Error("useApplyModal must be used within an ApplyModalProvider");
  return ctx;
}
