# Calm Blueprint — Influencer Partner Landing Page

**Date:** 2026-06-27
**Status:** Approved (pending final review)

## Purpose

This is **not** a customer-facing sales page. It's a one-page pitch the founder will
hand directly to influencers/creators they're recruiting as affiliate partners in
the sleep/stress/focus/energy/nervous-system niche. The page must:

1. Introduce Calm Blueprint to someone who's never heard of it (brand welcome).
2. Explain the affiliate partnership and the current commission offer.
3. Let them apply on the spot, on the same page.

Audience: individual creators/influencers, not end customers. Tone follows the
existing Calm Blueprint brand voice (calm authority, diagnostic, no hype, no
wellness clichés) — see `references/voice-and-vocabulary.md` in the copywriter
skill — but the *content* is partner-facing, not product sales copy.

## Confirmed business facts (do not invent beyond these)

- Standard affiliate commission: **40%** per sale.
- Current launch-window offer: **70%** per sale for partners who join now, framed
  as "founding partners." No fixed end date — do not state a deadline or
  countdown; frame as "our first wave of partners" instead.
- Core alignment message: **"We only make money when you make money"** — no
  upfront cost, no fee to join, pure performance commission.
- Mechanism for delivery: an affiliate link/code (no further payout/logistics
  details are confirmed — FAQ must not invent cookie windows, payout schedules,
  or minimums).

## Page structure (single scrolling page)

1. **Nav** — brand mark + wordmark (left), single "Apply to partner" link on the
   right that scrolls to the application form anchor (`#apply`). No other routes.

2. **Hero**
   - Eyebrow + headline + subhead, written to a creator (not a buyer) — positions
     the opportunity directly, no "join our affiliate program" boilerplate.
   - A 16:9 video slot directly under the headline area: **styled placeholder
     only** — brand-colored frame (navy/bone/brass), centered play-button glyph,
     no real `<video>`/embed wiring yet. Built so a real video can be dropped in
     later without restructuring the section.
   - Directly under the video: one short paragraph encouraging the click
     (specific, not hypey — e.g. naming the 70% hook and the application taking
     under 2 minutes).
   - Primary CTA button under that paragraph: **"Apply to partner"** (or similar),
     anchor-scrolls to `#apply` on the same page. No new route, no modal.

3. **Short offer teaser** (immediately after hero, intentionally brief — 2-3
   lines max, not the full breakdown)
   - States the 70% launch-window commission as the headline hook.
   - States the alignment line: we only make money when you make money.
   - No commission mechanics, no FAQ-level detail here — that's section 6.

4. **What Calm Blueprint is** — the brand welcome. Adapted from the brand guide's
   thesis ("engineered calm, not wellness fluff") so a creator unfamiliar with the
   brand understands what they'd be attaching their name to.

5. **Why this audience** — bridges the brand to the creator's audience: sleep,
   stress, focus, energy, nervous-system content creators are a natural fit
   because their audience already lives the problem this brand solves.

6. **The partnership — full detail**
   - 40% standard / 70% launch-window framing, spelled out (not just teased).
   - "Founding partners" framing, no fake deadline.
   - What they'd be promoting: flagship protocol + the broader catalogue
     (territories), pulling language from `references/product-catalog.md`.

7. **How it works** — short numbered sequence: Apply → Get your link → Share with
   your audience → Earn commission per sale. Kept generic since payout logistics
   aren't decided yet.

8. **FAQ** — only answers what's actually confirmed (commission %, that it's
   affiliate-link based, no cost to join). Anything not yet decided gets answered
   as "we'll cover that when we talk" rather than invented specifics.

9. **Application form** (`id="apply"`)
   - Fields: name, email, primary platform (select: Instagram/YouTube/TikTok/
     X/Newsletter/Other), handle or profile link, audience size, short note
     (optional, "anything else we should know").
   - Client-side validation (required fields, email format).
   - Submits to `app/api/apply/route.ts`.
   - **For now:** the route logs the payload server-side and returns a success
     response. No email/DB integration yet — swapping in a real backend later is
     a contained change to that one file.
   - **On success:** swap the form for an inline confirmation message in brand
     voice (e.g. "Application received. We'll be in touch."). **Do not** build a
     redirect to a separate thank-you page — that's explicitly future work.

10. **Footer** — mark, tagline ("A blueprint for a calmer mind."), contact email
    placeholder.

## Visual direction

- Reuse the **exact inline SVG mark** from `assets/brand-guide.html` (circle +
  settling waveform + brass node) rather than the raster logo PNGs, so it's crisp
  and recolorable for light/dark contexts. Copy `app-icon-1024.png` in as the
  favicon source.
- Wire the brand palette and type system into this Next.js project's Tailwind v4
  theme (`app/globals.css` `@theme`) — currently the project still has the
  default `create-next-app` theme:
  - Colors: midnight `#122337`, ink `#0B1620`, slate `#5C7894`, mist `#B7C7D6`,
    bone `#F2EBDB`, porcelain `#FBF9F3`, brass `#C4A35A`, brass-soft `#C9B68A`.
  - Fonts via `next/font/google`: Fraunces (display/serif), Inter (body/UI),
    IBM Plex Mono (eyebrows/labels/metadata).
- Hero gets the brand's signature treatment: midnight gradient background, faint
  64px blueprint grid at ~10% opacity, a single gold-thread SVG accent curve —
  same system as the brand guide, not a new visual language.
- Datum-line-with-brass-ticks motif and tracked-mono section eyebrows are reused
  throughout for section openers, consistent with the brand's "spec-sheet" system.

## Technical approach

- Next.js App Router (already scaffolded), Tailwind v4, TypeScript — no new
  dependencies needed for the page itself.
- Page content built as composed sections inside `app/page.tsx` (or extracted to
  `app/_components/` if a section grows complex enough to warrant it — not
  pre-emptively split).
- `app/api/apply/route.ts` — `POST` handler, validates payload shape, logs it,
  returns `{ ok: true }`. No external service calls.
- Mobile-first responsive layout, matching the brand guide's existing breakpoint
  behavior (single-column stacking under ~760px).

## Explicitly out of scope (future work, not this pass)

- Real video file or embed — placeholder only.
- Real form backend (email/DB/CRM integration).
- Post-submission redirect to a dedicated thank-you page.
- A fixed deadline/countdown for the 70% offer.
- Specific payout schedule, cookie duration, or minimum payout threshold.
