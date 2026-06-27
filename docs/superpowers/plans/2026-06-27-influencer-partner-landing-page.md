# Influencer Partner Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Calm Blueprint influencer-partner pitch page — a single scrolling Next.js page that introduces the brand to a creator, pitches the affiliate offer (40% standard / 70% founding-cohort), and lets them apply on the same page.

**Architecture:** Next.js App Router page composed of small presentational section components (`app/components/*`), a shared validation module (`lib/validation.ts`) reused by both the client form and the server route, and one API route (`app/api/apply/route.ts`) that validates and logs submissions. Brand tokens (colors/fonts) are wired into Tailwind v4 via `app/globals.css`.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4. Testing: Vitest + @testing-library/react + jsdom (added in Task 2 — project has no test runner yet).

All file paths below are relative to the project root:
`Claude For Calm Blueprint/calm-blueprint-landing/`

## Global Constraints

- Brand colors (exact hex, from `assets/brand-guide.html`): midnight `#122337`, ink `#0B1620`, slate `#5C7894`, mist `#B7C7D6`, bone `#F2EBDB`, porcelain `#FBF9F3`, brass `#C4A35A`, brass-soft `#C9B68A`.
- Fonts: Fraunces (display/serif, weights 400/500/600, has italic), Inter (body/UI, 400/500/600), IBM Plex Mono (eyebrows/labels, 400/500) — all via `next/font/google`.
- Confirmed commission facts — use exactly these, never round, invent, or add detail beyond them: standard commission **40%**, founding-cohort launch offer **70%**, no fixed end date for the 70% offer (frame as "founding partners" / "first wave," never a countdown), no fee to join, alignment line "we only make money when you make money."
- Voice rules (from the copywriter skill): calm, diagnostic, second person, sentence case except mono eyebrows (tracked uppercase). Never use: journey, manifest, unlock, transform, holistic, vibes, glow-up, "just breathe," exclamation marks, emoji in copy.
- Contact email in the footer is a placeholder (`partners@calmblueprint.com`) — flagged inline in Task 14 for the user to replace with the real address.
- Video in the hero is a **styled placeholder only** (no real `<video>`/embed) — explicitly out of scope per the spec.
- Form submission (Task 4) logs server-side and returns success — no email/DB integration; explicitly out of scope per the spec.
- **Verification approach by task type:** tasks with real logic (validation module, API route, BrandMark color-switching) get Vitest unit tests, written first (TDD). Tasks that are pure static markup/copy (Nav, Hero, teaser, brand intro, audience fit, partnership details, how-it-works, FAQ, footer) have no meaningful assertions to write about marketing prose — their "test" step is `npm run build` (type/lint check) plus a manual dev-server visual check against the spec. This mirrors the project's own established frontend workflow (screenshot/visual comparison for design, not snapshot tests for copy).

---

## File Structure

```
app/
  globals.css                  (modify — brand theme tokens + utility classes)
  layout.tsx                   (modify — brand fonts + metadata)
  icon.png                     (new — copied from assets/app-icon-1024.png)
  page.tsx                     (modify — composes all sections)
  api/apply/route.ts            (new — POST handler)
  api/apply/route.test.ts       (new)
  components/
    Container.tsx              (new — shared max-width wrapper)
    BrandMark.tsx               (new — reusable SVG mark)
    BrandMark.test.tsx          (new)
    Nav.tsx                     (new)
    Hero.tsx                    (new)
    OfferTeaser.tsx             (new)
    BrandIntro.tsx              (new)
    AudienceFit.tsx             (new)
    PartnershipDetails.tsx      (new)
    HowItWorks.tsx               (new)
    Faq.tsx                     (new)
    ApplicationForm.tsx         (new — client component)
    Footer.tsx                  (new)
lib/
  validation.ts                (new — shared validation logic)
  validation.test.ts            (new)
vitest.config.ts                (new)
vitest.setup.ts                 (new)
package.json                   (modify — add test deps + script)
```

---

### Task 1: Brand theme, fonts, and shared layout primitives

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Create: `app/icon.png` (binary copy, not a text edit)
- Create: `app/components/Container.tsx`

**Interfaces:**
- Produces: Tailwind color utilities `bg-midnight`, `text-midnight`, `bg-ink`, `text-slate`, `bg-mist`, `text-mist`, `bg-bone`, `text-bone`, `bg-porcelain`, `bg-brass`, `text-brass`, `bg-brass-soft`, `text-brass-soft` (derived from `--color-*` theme vars). Font utilities `font-serif` (Fraunces), `font-sans` (Inter), `font-mono` (IBM Plex Mono). CSS utility classes `.eyebrow`, `.eyebrow-on-dark`, `.bg-blueprint-grid`, `.datum-line`.
- Produces: `Container` component — `Container({ children, className }: { children: React.ReactNode; className?: string })`, used by every later section task to get the brand's 1080px-max-width wrapper with consistent horizontal padding.

- [ ] **Step 1: Replace `app/globals.css` with brand theme tokens and signature-system utility classes**

```css
@import "tailwindcss";

@theme inline {
  --color-midnight: #122337;
  --color-ink: #0b1620;
  --color-slate: #5c7894;
  --color-mist: #b7c7d6;
  --color-bone: #f2ebdb;
  --color-porcelain: #fbf9f3;
  --color-brass: #c4a35a;
  --color-brass-soft: #c9b68a;

  --font-serif: var(--font-fraunces);
  --font-sans: var(--font-inter);
  --font-mono: var(--font-plex-mono);
}

/* Brand palette is fixed by design — sections go dark/light intentionally, not via OS dark mode. */
body {
  background: var(--color-porcelain);
  color: var(--color-ink);
  font-family: var(--font-sans);
}

.eyebrow {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-slate);
  display: flex;
  align-items: center;
  gap: 14px;
}
.eyebrow::before {
  content: "";
  width: 34px;
  height: 1px;
  background: var(--color-brass);
}
.eyebrow-on-dark {
  color: var(--color-mist);
}

.bg-blueprint-grid {
  background-image: linear-gradient(var(--color-mist) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-mist) 1px, transparent 1px);
  background-size: 64px 64px;
}

.datum-line {
  position: relative;
  height: 1px;
  background: var(--color-mist);
  opacity: 0.35;
}
.datum-line::before,
.datum-line::after {
  content: "";
  position: absolute;
  top: -3px;
  width: 1px;
  height: 7px;
  background: var(--color-brass);
}
.datum-line::before {
  left: 0;
}
.datum-line::after {
  right: 0;
}
```

- [ ] **Step 2: Replace `app/layout.tsx` with brand fonts and partner-page metadata**

```tsx
import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Calm Blueprint — Partner Program",
  description:
    "Become a Calm Blueprint affiliate partner. Founding partners earn 70% commission — we only make money when you make money.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Copy the app icon into the App Router's special icon slot**

```bash
cp "../../assets/app-icon-1024.png" "app/icon.png"
rm -f "app/favicon.ico"
```

(Run from the project root. Next.js auto-generates favicon/touch-icon tags from `app/icon.png`; the old default `favicon.ico` is removed so it doesn't take precedence.)

- [ ] **Step 4: Create the shared `Container` primitive**

```tsx
// app/components/Container.tsx
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1080px] px-6 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
```

- [ ] **Step 5: Verify the build is clean**

Run: `npm run lint && npm run build`
Expected: both succeed with no errors (the page still renders the old default `create-next-app` content at this point — that's expected, it gets replaced in Task 15).

- [ ] **Step 6: Commit**

```bash
git add app/globals.css app/layout.tsx app/icon.png app/components/Container.tsx
git rm --cached app/favicon.ico
git commit -m "feat: wire Calm Blueprint brand theme, fonts, and icon"
```

---

### Task 2: Test runner setup + `BrandMark` component

**Files:**
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Modify: `package.json` (add devDependencies + `test` script)
- Create: `app/components/BrandMark.tsx`
- Test: `app/components/BrandMark.test.tsx`

**Interfaces:**
- Produces: `BrandMark({ variant, size, className }: { variant?: "light" | "dark"; size?: number; className?: string })` — reused by `Nav` (Task 5) and `Footer` (Task 14).

- [ ] **Step 1: Install test dependencies**

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 2: Add the `test` script to `package.json`**

In the `"scripts"` block, add:
```json
    "test": "vitest run",
```
(alongside the existing `dev`, `build`, `start`, `lint` scripts — keep all of them.)

- [ ] **Step 3: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
```

- [ ] **Step 4: Create `vitest.setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 5: Write the failing test for `BrandMark`**

```tsx
// app/components/BrandMark.test.tsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BrandMark } from "./BrandMark";

describe("BrandMark", () => {
  it("renders an accessible svg with the default light stroke color", () => {
    const { getByRole } = render(<BrandMark />);
    const svg = getByRole("img", { name: "Calm Blueprint mark" });
    expect(svg.tagName.toLowerCase()).toBe("svg");
    expect(svg.querySelector("circle")).toHaveAttribute("stroke", "#122337");
  });

  it("switches to the bone stroke color in the dark variant", () => {
    const { getByRole } = render(<BrandMark variant="dark" />);
    const svg = getByRole("img", { name: "Calm Blueprint mark" });
    expect(svg.querySelector("circle")).toHaveAttribute("stroke", "#F2EBDB");
  });

  it("applies the requested pixel size", () => {
    const { getByRole } = render(<BrandMark size={64} />);
    const svg = getByRole("img", { name: "Calm Blueprint mark" });
    expect(svg).toHaveAttribute("width", "64");
    expect(svg).toHaveAttribute("height", "64");
  });
});
```

- [ ] **Step 6: Run the test to verify it fails**

Run: `npx vitest run app/components/BrandMark.test.tsx`
Expected: FAIL — `Cannot find module './BrandMark'` (component doesn't exist yet).

- [ ] **Step 7: Implement `BrandMark`**

```tsx
// app/components/BrandMark.tsx
type BrandMarkProps = {
  variant?: "light" | "dark";
  size?: number;
  className?: string;
};

const STROKE_COLORS = {
  light: { mark: "#122337", line: "#5C7894" },
  dark: { mark: "#F2EBDB", line: "#B7C7D6" },
} as const;

export function BrandMark({ variant = "light", size = 40, className }: BrandMarkProps) {
  const { mark, line } = STROKE_COLORS[variant];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Calm Blueprint mark"
      className={className}
    >
      <g fill="none" stroke={mark} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="50" cy="50" r="38" strokeWidth="2.4" />
        <line x1="6" y1="50" x2="12" y2="50" strokeWidth="2.4" />
        <line x1="88" y1="50" x2="94" y2="50" strokeWidth="2.4" />
        <line x1="20" y1="50" x2="80" y2="50" stroke={line} strokeWidth="1" opacity="0.45" />
        <path
          d="M26,50 Q29,30 32,50 Q35,67 38,50 Q41,38 44,50 Q47,58 50,50 Q53,45 56,50 Q59,54 62,50 Q65,48 68,50 Q71,51.5 74,50"
          strokeWidth="3"
        />
      </g>
      <circle cx="74" cy="50" r="3.6" fill="#C4A35A" />
    </svg>
  );
}
```

- [ ] **Step 8: Run the test to verify it passes**

Run: `npx vitest run app/components/BrandMark.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 9: Commit**

```bash
git add vitest.config.ts vitest.setup.ts package.json package-lock.json app/components/BrandMark.tsx app/components/BrandMark.test.tsx
git commit -m "feat: add Vitest setup and reusable BrandMark component"
```

---

### Task 3: Shared validation logic

**Files:**
- Create: `lib/validation.ts`
- Test: `lib/validation.test.ts`

**Interfaces:**
- Produces: `ApplicationInput` type, `ApplicationErrors` type, `ValidationResult` type, `validateApplication(input: Partial<ApplicationInput>): ValidationResult`. Consumed by `app/api/apply/route.ts` (Task 4) and `app/components/ApplicationForm.tsx` (Task 13).

- [ ] **Step 1: Write the failing tests**

```ts
// lib/validation.test.ts
import { describe, it, expect } from "vitest";
import { validateApplication } from "./validation";

const VALID = {
  name: "Jordan Lee",
  email: "jordan@example.com",
  platform: "Instagram",
  profileLink: "https://instagram.com/jordanlee",
  audienceSize: "120K followers",
};

describe("validateApplication", () => {
  it("passes for a fully valid application", () => {
    const result = validateApplication(VALID);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("flags a missing name", () => {
    const result = validateApplication({ ...VALID, name: "" });
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBe("Name is required.");
  });

  it("flags an invalid email", () => {
    const result = validateApplication({ ...VALID, email: "not-an-email" });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBe("Enter a valid email address.");
  });

  it("flags missing platform, profile link, and audience size together", () => {
    const result = validateApplication({ name: "Jordan Lee", email: "jordan@example.com" });
    expect(result.valid).toBe(false);
    expect(result.errors.platform).toBe("Platform is required.");
    expect(result.errors.profileLink).toBe("Profile link is required.");
    expect(result.errors.audienceSize).toBe("Audience size is required.");
  });

  it("treats the optional note as valid whether present or absent", () => {
    expect(validateApplication(VALID).errors.note).toBeUndefined();
    expect(validateApplication({ ...VALID, note: "Big sleep-content audience" }).errors.note).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run lib/validation.test.ts`
Expected: FAIL — `Cannot find module './validation'`.

- [ ] **Step 3: Implement `lib/validation.ts`**

```ts
// lib/validation.ts
export interface ApplicationInput {
  name: string;
  email: string;
  platform: string;
  profileLink: string;
  audienceSize: string;
  note?: string;
}

export type ApplicationErrors = Partial<Record<keyof ApplicationInput, string>>;

export interface ValidationResult {
  valid: boolean;
  errors: ApplicationErrors;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateApplication(input: Partial<ApplicationInput>): ValidationResult {
  const errors: ApplicationErrors = {};

  if (!input.name?.trim()) {
    errors.name = "Name is required.";
  }

  if (!input.email?.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(input.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!input.platform?.trim()) {
    errors.platform = "Platform is required.";
  }

  if (!input.profileLink?.trim()) {
    errors.profileLink = "Profile link is required.";
  }

  if (!input.audienceSize?.trim()) {
    errors.audienceSize = "Audience size is required.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run lib/validation.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/validation.ts lib/validation.test.ts
git commit -m "feat: add shared application validation logic"
```

---

### Task 4: Application API route

**Files:**
- Create: `app/api/apply/route.ts`
- Test: `app/api/apply/route.test.ts`

**Interfaces:**
- Consumes: `validateApplication` and `ApplicationInput` from `lib/validation.ts` (Task 3).
- Produces: `POST(request: Request): Promise<Response>` — consumed by `ApplicationForm.tsx` (Task 13) via `fetch("/api/apply", { method: "POST", ... })`. Success response: `{ ok: true }` with status 200. Failure response: `{ ok: false, errors: ApplicationErrors }` with status 400.

- [ ] **Step 1: Write the failing tests**

```ts
// app/api/apply/route.test.ts
import { describe, it, expect, vi } from "vitest";
import { POST } from "./route";

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/apply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/apply", () => {
  it("returns 200 and ok:true for a valid application", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const response = await POST(
      makeRequest({
        name: "Jordan Lee",
        email: "jordan@example.com",
        platform: "Instagram",
        profileLink: "https://instagram.com/jordanlee",
        audienceSize: "120K followers",
      })
    );
    const json = await response.json();
    expect(response.status).toBe(200);
    expect(json).toEqual({ ok: true });
    logSpy.mockRestore();
  });

  it("returns 400 with field errors for an incomplete application", async () => {
    const response = await POST(makeRequest({ name: "", email: "not-an-email" }));
    const json = await response.json();
    expect(response.status).toBe(400);
    expect(json.ok).toBe(false);
    expect(json.errors.name).toBeDefined();
    expect(json.errors.platform).toBeDefined();
  });

  it("returns 400 for a body that isn't valid JSON", async () => {
    const badRequest = new Request("http://localhost/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not json",
    });
    const response = await POST(badRequest);
    expect(response.status).toBe(400);
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run app/api/apply/route.test.ts`
Expected: FAIL — `Cannot find module './route'`.

- [ ] **Step 3: Implement the route**

```ts
// app/api/apply/route.ts
import { NextResponse } from "next/server";
import { validateApplication, type ApplicationInput } from "@/lib/validation";

export async function POST(request: Request) {
  let body: Partial<ApplicationInput> | null;
  try {
    body = await request.json();
  } catch {
    body = null;
  }

  if (!body) {
    return NextResponse.json(
      { ok: false, errors: { name: "Invalid request body." } },
      { status: 400 }
    );
  }

  const { valid, errors } = validateApplication(body);
  if (!valid) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  console.log("[apply] new partner application:", body);
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run app/api/apply/route.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add app/api/apply/route.ts app/api/apply/route.test.ts
git commit -m "feat: add /api/apply route with validation"
```

---

### Task 5: Nav

**Files:**
- Create: `app/components/Nav.tsx`

**Interfaces:**
- Consumes: `BrandMark` (Task 2), `Container` (Task 1).
- Produces: `Nav()` — no props, rendered once at the top of `page.tsx` (Task 15).

- [ ] **Step 1: Implement `Nav`**

```tsx
// app/components/Nav.tsx
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
```

- [ ] **Step 2: Verify build is clean**

Run: `npm run lint && npm run build`
Expected: both succeed (Nav isn't mounted in `page.tsx` until Task 15, so this just confirms the file type-checks and lints cleanly).

- [ ] **Step 3: Commit**

```bash
git add app/components/Nav.tsx
git commit -m "feat: add partner-page Nav component"
```

---

### Task 6: Hero

**Files:**
- Create: `app/components/Hero.tsx`

**Interfaces:**
- Consumes: `Container` (Task 1).
- Produces: `Hero()` — no props.

- [ ] **Step 1: Implement `Hero`**

```tsx
// app/components/Hero.tsx
import { Container } from "./Container";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-mist/20 bg-gradient-to-br from-[#16294A] via-midnight to-ink text-bone">
      <div className="bg-blueprint-grid absolute inset-0 opacity-10" aria-hidden="true" />
      <Container className="relative py-20 sm:py-28">
        <div className="eyebrow eyebrow-on-dark mb-6">PARTNER PROGRAM · FOUNDING COHORT</div>
        <h1 className="max-w-3xl font-serif text-4xl font-medium leading-[1.05] tracking-[-0.01em] text-bone sm:text-6xl">
          A blueprint for a calmer mind. Now, a way to get paid for sharing it.
        </h1>
        <p className="mt-6 max-w-2xl font-serif text-lg italic text-brass-soft sm:text-xl">
          Evidence-based sleep, stress, and focus protocols — built for an audience that
          already trusts you on this exact subject.
        </p>

        <div className="mt-12 max-w-3xl overflow-hidden rounded-lg border border-mist/20 bg-ink/40">
          <div className="flex aspect-video items-center justify-center">
            <button
              type="button"
              aria-label="Play partner program overview video"
              className="flex h-16 w-16 items-center justify-center rounded-full bg-brass text-midnight transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>

        <p className="mt-6 max-w-xl text-base text-mist">
          Watch how the partnership works in under two minutes — then claim your spot
          while founding-partner terms are still open.
        </p>

        <a
          href="#apply"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-brass px-7 py-3 text-base font-medium text-midnight transition-colors hover:bg-brass-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone"
        >
          Apply to partner
        </a>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Verify build is clean, then manually check the section**

Run: `npm run lint && npm run build`
Expected: both succeed.

Manual check (after Task 15 wires this into the page): the headline, italic subhead, video placeholder, encouragement paragraph, and CTA appear in that exact order, matching the spec's hero structure.

- [ ] **Step 3: Commit**

```bash
git add app/components/Hero.tsx
git commit -m "feat: add Hero section with video placeholder and CTA"
```

---

### Task 7: Offer teaser

**Files:**
- Create: `app/components/OfferTeaser.tsx`

**Interfaces:**
- Consumes: `Container` (Task 1).
- Produces: `OfferTeaser()` — no props.

- [ ] **Step 1: Implement `OfferTeaser`**

```tsx
// app/components/OfferTeaser.tsx
import { Container } from "./Container";

export function OfferTeaser() {
  return (
    <section className="bg-midnight text-bone">
      <Container className="py-10 text-center">
        <p className="font-serif text-xl sm:text-2xl">
          Founding partners earn <span className="text-brass">70% commission</span> on every
          sale, before the rate settles at 40%.
        </p>
        <p className="mt-2 text-sm text-mist">
          We only make money when you make money — no fee to join, ever.
        </p>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Verify build is clean**

Run: `npm run lint && npm run build`
Expected: both succeed.

- [ ] **Step 3: Commit**

```bash
git add app/components/OfferTeaser.tsx
git commit -m "feat: add short offer teaser section"
```

---

### Task 8: Brand intro ("What Calm Blueprint is")

**Files:**
- Create: `app/components/BrandIntro.tsx`

**Interfaces:**
- Consumes: `Container` (Task 1).
- Produces: `BrandIntro()` — no props.

- [ ] **Step 1: Implement `BrandIntro`**

```tsx
// app/components/BrandIntro.tsx
import { Container } from "./Container";

const PILLARS = [
  {
    label: "Pillar 01",
    title: "Engineered, not vague",
    body: "Every product is a protocol with a mechanism, a sequence, and a result you can feel. No fluff, no woo.",
  },
  {
    label: "Pillar 02",
    title: "Built for high output",
    body: "For people running at 95% capacity. We don't ask them to slow down — we help their recovery keep pace with their ambition.",
  },
  {
    label: "Pillar 03",
    title: "Calm is the metric",
    body: "Regulation you can measure: faster sleep onset, fewer 4 AM wake-ups, a steadier baseline. Outcomes over affirmations.",
  },
];

export function BrandIntro() {
  return (
    <section className="border-b border-mist/20 bg-porcelain">
      <Container className="py-20">
        <div className="eyebrow mb-4">WHO WE ARE</div>
        <h2 className="max-w-2xl font-serif text-3xl font-medium tracking-[-0.01em] text-midnight sm:text-4xl">
          Engineered calm, not wellness fluff.
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-ink/80">
          Most wellness brands sell softness — candles, pastels, &ldquo;just breathe.&rdquo;
          Calm Blueprint sells something its audience actually respects: engineering. We treat
          a dysregulated nervous system the way a founder treats a broken system — diagnose the
          root cause, apply a sequenced protocol, measure the result.
        </p>
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-mist/30 bg-mist/30 sm:grid-cols-3">
          {PILLARS.map((pillar) => (
            <div key={pillar.label} className="bg-porcelain p-7">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-brass">
                {pillar.label}
              </div>
              <h3 className="mt-3 font-serif text-xl text-midnight">{pillar.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{pillar.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Verify build is clean**

Run: `npm run lint && npm run build`
Expected: both succeed.

- [ ] **Step 3: Commit**

```bash
git add app/components/BrandIntro.tsx
git commit -m "feat: add brand intro section"
```

---

### Task 9: Audience fit ("Why this audience")

**Files:**
- Create: `app/components/AudienceFit.tsx`

**Interfaces:**
- Consumes: `Container` (Task 1).
- Produces: `AudienceFit()` — no props.

- [ ] **Step 1: Implement `AudienceFit`**

```tsx
// app/components/AudienceFit.tsx
import { Container } from "./Container";

const TERRITORIES = ["Sleep", "Regulation", "Focus", "Energy", "Mind"];

export function AudienceFit() {
  return (
    <section className="border-b border-mist/20 bg-porcelain">
      <Container className="py-20">
        <div className="eyebrow mb-4">WHY YOUR AUDIENCE</div>
        <h2 className="max-w-2xl font-serif text-3xl font-medium tracking-[-0.01em] text-midnight sm:text-4xl">
          If your audience already asks about sleep, stress, or burnout, they&rsquo;re
          already qualified.
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-ink/80">
          Calm Blueprint&rsquo;s customers are founders, executives, and high-performers in
          their 30s and 40s — the same audience that already follows creators covering these
          five territories:
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {TERRITORIES.map((territory) => (
            <span
              key={territory}
              className="rounded-full border border-mist/40 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.1em] text-slate"
            >
              {territory}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Verify build is clean**

Run: `npm run lint && npm run build`
Expected: both succeed.

- [ ] **Step 3: Commit**

```bash
git add app/components/AudienceFit.tsx
git commit -m "feat: add audience-fit section"
```

---

### Task 10: Partnership details (full commission breakdown)

**Files:**
- Create: `app/components/PartnershipDetails.tsx`

**Interfaces:**
- Consumes: `Container` (Task 1).
- Produces: `PartnershipDetails()` — no props.

- [ ] **Step 1: Implement `PartnershipDetails`**

```tsx
// app/components/PartnershipDetails.tsx
import { Container } from "./Container";

export function PartnershipDetails() {
  return (
    <section id="partnership" className="border-b border-mist/20 bg-midnight text-bone">
      <Container className="py-20">
        <div className="eyebrow eyebrow-on-dark mb-4">THE PARTNERSHIP</div>
        <h2 className="max-w-2xl font-serif text-3xl font-medium tracking-[-0.01em] text-bone sm:text-4xl">
          40% commission, standard. 70% if you join the founding cohort.
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-mist">
          You get a unique link. Every sale that comes through it earns you a commission —
          no fee to join, no minimum spend, no cost if it doesn&rsquo;t convert. We only make
          money when you make money.
        </p>

        <div className="datum-line my-10" />

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-brass-soft">
              Standard rate
            </div>
            <div className="mt-2 font-serif text-4xl text-bone">40%</div>
            <p className="mt-2 text-sm text-mist">Applies after the founding cohort closes.</p>
          </div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-brass-soft">
              Founding partner rate
            </div>
            <div className="mt-2 font-serif text-4xl text-brass">70%</div>
            <p className="mt-2 text-sm text-mist">
              For our first wave of partners — no fixed end date, but it won&rsquo;t stay open
              indefinitely.
            </p>
          </div>
        </div>

        <p className="mt-10 max-w-2xl text-base text-mist">
          What you&rsquo;d be promoting: our flagship protocol, <em>The Cortisol Sleep Reset</em>
          , plus the wider catalogue across sleep, stress, focus, energy, and mind.
        </p>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Verify build is clean**

Run: `npm run lint && npm run build`
Expected: both succeed.

- [ ] **Step 3: Commit**

```bash
git add app/components/PartnershipDetails.tsx
git commit -m "feat: add full partnership/commission breakdown section"
```

---

### Task 11: How it works

**Files:**
- Create: `app/components/HowItWorks.tsx`

**Interfaces:**
- Consumes: `Container` (Task 1).
- Produces: `HowItWorks()` — no props.

- [ ] **Step 1: Implement `HowItWorks`**

```tsx
// app/components/HowItWorks.tsx
import { Container } from "./Container";

const STEPS = [
  { n: "01", title: "Apply", body: "Tell us about your audience. Takes about two minutes." },
  {
    n: "02",
    title: "Get your link",
    body: "A unique tracked link, yours to use however fits your content.",
  },
  { n: "03", title: "Share it", body: "Mention it once, mention it weekly — your call." },
  { n: "04", title: "Get paid", body: "Commission on every sale that comes through your link." },
];

export function HowItWorks() {
  return (
    <section className="border-b border-mist/20 bg-porcelain">
      <Container className="py-20">
        <div className="eyebrow mb-4">HOW IT WORKS</div>
        <h2 className="max-w-2xl font-serif text-3xl font-medium tracking-[-0.01em] text-midnight sm:text-4xl">
          Four steps. No content requirements, no quotas.
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.n}>
              <div className="font-mono text-sm text-brass">{step.n}</div>
              <h3 className="mt-2 font-serif text-xl text-midnight">{step.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{step.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Verify build is clean**

Run: `npm run lint && npm run build`
Expected: both succeed.

- [ ] **Step 3: Commit**

```bash
git add app/components/HowItWorks.tsx
git commit -m "feat: add how-it-works section"
```

---

### Task 12: FAQ

**Files:**
- Create: `app/components/Faq.tsx`

**Interfaces:**
- Consumes: `Container` (Task 1).
- Produces: `Faq()` — no props.

- [ ] **Step 1: Implement `Faq`**

```tsx
// app/components/Faq.tsx
import { Container } from "./Container";

const FAQS = [
  {
    q: "How much do I earn?",
    a: "40% commission standard — 70% right now, for our founding cohort of partners.",
  },
  {
    q: "Is there a cost to join?",
    a: "No. We only make money when you make money.",
  },
  {
    q: "What would I actually be promoting?",
    a: "The Cortisol Sleep Reset, our flagship 14-day protocol, plus our wider catalogue across sleep, stress, focus, energy, and mind.",
  },
  {
    q: "How do payouts work?",
    a: "We'll walk you through the specifics once you apply — happy to answer directly.",
  },
  {
    q: "Do I need a certain audience size?",
    a: "No fixed minimum. Tell us about your audience on the application and we'll go from there.",
  },
];

export function Faq() {
  return (
    <section className="border-b border-mist/20 bg-porcelain">
      <Container className="py-20">
        <div className="eyebrow mb-4">QUESTIONS</div>
        <h2 className="max-w-2xl font-serif text-3xl font-medium tracking-[-0.01em] text-midnight sm:text-4xl">
          Before you apply
        </h2>
        <dl className="mt-10 divide-y divide-mist/30 border-t border-mist/30">
          {FAQS.map((item) => (
            <div key={item.q} className="grid gap-2 py-6 sm:grid-cols-[1fr_2fr] sm:gap-8">
              <dt className="font-serif text-lg text-midnight">{item.q}</dt>
              <dd className="text-base text-ink/75">{item.a}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Verify build is clean**

Run: `npm run lint && npm run build`
Expected: both succeed.

- [ ] **Step 3: Commit**

```bash
git add app/components/Faq.tsx
git commit -m "feat: add FAQ section"
```

---

### Task 13: Application form

**Files:**
- Create: `app/components/ApplicationForm.tsx` (client component)

**Interfaces:**
- Consumes: `Container` (Task 1), `validateApplication`/`ApplicationInput` (Task 3), `POST /api/apply` (Task 4).
- Produces: `ApplicationForm()` — no props, rendered with `id="apply"` anchor target in `page.tsx` (Task 15).

- [ ] **Step 1: Implement `ApplicationForm`**

```tsx
// app/components/ApplicationForm.tsx
"use client";

import { useState, type FormEvent } from "react";
import { Container } from "./Container";
import { validateApplication, type ApplicationErrors, type ApplicationInput } from "@/lib/validation";

const PLATFORMS = ["Instagram", "YouTube", "TikTok", "X", "Newsletter", "Other"];

const EMPTY_FORM: ApplicationInput = {
  name: "",
  email: "",
  platform: "",
  profileLink: "",
  audienceSize: "",
  note: "",
};

export function ApplicationForm() {
  const [form, setForm] = useState<ApplicationInput>(EMPTY_FORM);
  const [errors, setErrors] = useState<ApplicationErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  function update<K extends keyof ApplicationInput>(key: K, value: ApplicationInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { valid, errors: validationErrors } = validateApplication(form);
    setErrors(validationErrors);
    if (!valid) return;

    setStatus("submitting");
    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const body = await response.json();
        setErrors(body.errors ?? {});
        setStatus("idle");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("idle");
      setErrors({ name: "Something went wrong. Please try again." });
    }
  }

  if (status === "success") {
    return (
      <section id="apply" className="border-b border-mist/20 bg-porcelain">
        <Container className="py-20 text-center">
          <h2 className="font-serif text-3xl text-midnight">Application received.</h2>
          <p className="mt-3 text-lg text-ink/75">We&rsquo;ll be in touch.</p>
        </Container>
      </section>
    );
  }

  return (
    <section id="apply" className="border-b border-mist/20 bg-porcelain">
      <Container className="py-20">
        <div className="eyebrow mb-4">APPLY</div>
        <h2 className="max-w-2xl font-serif text-3xl font-medium tracking-[-0.01em] text-midnight sm:text-4xl">
          Apply to become a founding partner
        </h2>

        <form onSubmit={handleSubmit} className="mt-10 grid max-w-2xl gap-6">
          <Field label="Name" error={errors.name}>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full rounded-md border border-mist/50 bg-white px-4 py-2.5 text-ink focus:border-brass focus:outline-none"
            />
          </Field>

          <Field label="Email" error={errors.email}>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full rounded-md border border-mist/50 bg-white px-4 py-2.5 text-ink focus:border-brass focus:outline-none"
            />
          </Field>

          <Field label="Primary platform" error={errors.platform}>
            <select
              value={form.platform}
              onChange={(e) => update("platform", e.target.value)}
              className="w-full rounded-md border border-mist/50 bg-white px-4 py-2.5 text-ink focus:border-brass focus:outline-none"
            >
              <option value="">Select a platform</option>
              {PLATFORMS.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Profile link" error={errors.profileLink}>
            <input
              type="text"
              value={form.profileLink}
              onChange={(e) => update("profileLink", e.target.value)}
              placeholder="https://"
              className="w-full rounded-md border border-mist/50 bg-white px-4 py-2.5 text-ink focus:border-brass focus:outline-none"
            />
          </Field>

          <Field label="Audience size" error={errors.audienceSize}>
            <input
              type="text"
              value={form.audienceSize}
              onChange={(e) => update("audienceSize", e.target.value)}
              placeholder="e.g. 120K followers"
              className="w-full rounded-md border border-mist/50 bg-white px-4 py-2.5 text-ink focus:border-brass focus:outline-none"
            />
          </Field>

          <Field label="Anything else we should know? (optional)" error={errors.note}>
            <textarea
              value={form.note}
              onChange={(e) => update("note", e.target.value)}
              rows={3}
              className="w-full rounded-md border border-mist/50 bg-white px-4 py-2.5 text-ink focus:border-brass focus:outline-none"
            />
          </Field>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-midnight px-7 py-3 text-base font-medium text-bone transition-colors hover:bg-ink disabled:opacity-60"
          >
            {status === "submitting" ? "Submitting…" : "Submit application"}
          </button>
        </form>
      </Container>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
      {error && <span className="mt-1 block text-sm text-red-700">{error}</span>}
    </label>
  );
}
```

- [ ] **Step 2: Verify build is clean**

Run: `npm run lint && npm run build`
Expected: both succeed.

- [ ] **Step 3: Commit**

```bash
git add app/components/ApplicationForm.tsx
git commit -m "feat: add application form wired to /api/apply"
```

---

### Task 14: Footer

**Files:**
- Create: `app/components/Footer.tsx`

**Interfaces:**
- Consumes: `BrandMark` (Task 2), `Container` (Task 1).
- Produces: `Footer()` — no props.

- [ ] **Step 1: Implement `Footer`**

```tsx
// app/components/Footer.tsx
import { BrandMark } from "./BrandMark";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="bg-ink py-14 text-center text-mist">
      <Container>
        <div className="flex justify-center">
          <BrandMark variant="dark" size={36} />
        </div>
        <p className="mt-4 font-serif text-xl italic text-bone">
          A blueprint for a calmer mind.
        </p>
        {/* Placeholder contact address — replace with the real partner inbox. */}
        <p className="mt-4 font-mono text-xs tracking-[0.16em] text-slate">
          QUESTIONS? PARTNERS@CALMBLUEPRINT.COM
        </p>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 2: Verify build is clean**

Run: `npm run lint && npm run build`
Expected: both succeed.

- [ ] **Step 3: Commit**

```bash
git add app/components/Footer.tsx
git commit -m "feat: add Footer component"
```

---

### Task 15: Compose the page and remove default scaffold content

**Files:**
- Modify: `app/page.tsx`
- Delete: `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg` (unused `create-next-app` defaults)

**Interfaces:**
- Consumes: every component from Tasks 5–14, in order.

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
// app/page.tsx
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { OfferTeaser } from "./components/OfferTeaser";
import { BrandIntro } from "./components/BrandIntro";
import { AudienceFit } from "./components/AudienceFit";
import { PartnershipDetails } from "./components/PartnershipDetails";
import { HowItWorks } from "./components/HowItWorks";
import { Faq } from "./components/Faq";
import { ApplicationForm } from "./components/ApplicationForm";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
        <OfferTeaser />
        <BrandIntro />
        <AudienceFit />
        <PartnershipDetails />
        <HowItWorks />
        <Faq />
        <ApplicationForm />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Remove the unused default public assets**

```bash
rm -f public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg
```

- [ ] **Step 3: Verify the build is clean**

Run: `npm run lint && npm run build`
Expected: both succeed with no errors or unused-import warnings.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git add -u public
git commit -m "feat: compose the full partner landing page"
```

---

### Task 16: Full-page manual verification

**Files:** none (verification only).

- [ ] **Step 1: Start the dev server**

Run: `npm run dev` (leave running in the background)

- [ ] **Step 2: Run the full automated test suite**

Run: `npx vitest run`
Expected: all tests pass (BrandMark, validation, route handler — 11 tests total across Tasks 2–4).

- [ ] **Step 3: Manually walk the page at `http://localhost:3000`**

Check, top to bottom, against the spec (`docs/superpowers/specs/2026-06-27-influencer-partner-landing-page-design.md`):
- Nav shows the mark + wordmark and an "Apply to partner" link that jumps to the form.
- Hero order is exactly: eyebrow → headline → italic subhead → video placeholder → encouragement paragraph → CTA button.
- Offer teaser is brief (2 sentences) and states 70%/40% plus the "we only make money when you make money" line.
- Brand intro, audience fit, full partnership breakdown, how-it-works, and FAQ sections render with correct copy and no leftover default Next.js content.
- Submitting the application form with all fields filled shows the "Application received" success state; submitting with missing fields shows inline errors and does not submit.
- Resize to a narrow (mobile) viewport and confirm sections stack to a single column without horizontal scroll or overlapping text.

- [ ] **Step 4: Fix any visual or copy mismatches found, then re-run Step 2 and re-check Step 3**

- [ ] **Step 5: Final commit (only if Step 4 produced changes)**

```bash
git add -A
git commit -m "fix: address visual review findings on partner landing page"
```
