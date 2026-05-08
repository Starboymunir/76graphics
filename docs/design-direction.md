# 76 Graphics — Design Direction & Daily Research Log

> **Purpose.** A living document. The client wants the website to feel _flashy, cinematic,
> intentional_. This file is where we (a) record what we steal from competitor research
> and (b) queue daily improvements so the site keeps levelling up.
>
> **Tone target:** redtag.digital × premium agency reel × American patriotic edge.
> Think "wrap shop with a film studio's attention to motion."

---

## 1. The North Star

| Principle | What it means in code |
| --- | --- |
| **Cinema first** | Every page has an arrival animation. Page transitions are deliberate (curtain swipes / clip reveals), not crossfades. |
| **Kinetic typography** | Big, opinionated, _Apotek Extended_ headlines that move with scroll. Outline-stroke text + scroll-clipped fills. |
| **Material truth** | Wraps are physical — show texture, edges, paint reflections. Avoid generic stock imagery. |
| **One bold accent** | Use the red (`#b32025`) like neon — sparingly, with intent. Pair with the navy + the blue stripe + the white. |
| **Motion that earns the frame** | Don't animate to animate. Every motion either guides the eye, sells brand confidence, or rewards a scroll/hover. |
| **Performance discipline** | Heavy animation gets `prefers-reduced-motion` fallbacks, IntersectionObserver gating, and CSS `will-change` budget hygiene. |

---

## 2. Competitor research (Round 1)

### 2.1 [redtag.digital](https://www.redtag.digital/) — _the benchmark_

**Steal:**

- **"LEAVE ORDINARY BEHIND" treatment** — gigantic kinetic statement that breaks the grid → ✅ shipped as `KineticMarquee` on homepage
- **"Mission Control" blog metaphor** — they called their blog _Mission Control_. We use _Field Notes / Notes From The Shop Floor_ for our equivalent → ✅ shipped on `/blog`
- **5-step Approach timeline** (Learn → Plan → Build → Launch → Measure) — we already have a `Process` section, but it should be visually upgraded to feel as cinematic as theirs (next round)
- **Capabilities grid** with sharp icon + headline + 1-line summary, 2x2. Every cell hover-reveals a thumb of recent work
- **Cinematic intro reel** — letter-by-letter brand mark on landing → ✅ shipped as `BrandIntro` (sessionStorage-gated)
- **Space/voyage metaphor** — they framed services as "expeditions". Our equivalent: _builds_, _campaigns_, _journeys_

**Pass on:** the cosmic black-hole mouse cursor (too on-brand for them, off for a wrap shop)

### 2.2 [wrapstyle.com](https://wrapstyle.com/) — global wrap network

**Steal:**

- **News integrated into the homepage** — their latest articles surface above the fold once you scroll past the hero. We can do the same: add a `LatestPosts` strip on the homepage pulling from `/api/blog`.
- **Partner network map** — interactive US map with dot-pulse for their fleet of cities. We could do "where we ship" or "where our wraps roll".
- **Service icon grid** — Wrapping / Protection / Design / Tinting. Tight, bold, monochrome icons. Our `Services` block is text-heavy; could benefit from a similar tightening.
- **Gallery with infinite-scroll filter** — category chips snap-filter the gallery without a page reload.

### 2.3 [inozetek.com](https://inozetek.com/) — film manufacturer

**Steal:**

- **Trust-badge product cards** — every wrap film card has hard data overlays (UV rejection %, IR rejection %, durability years). Our `Portfolio` cards could earn similar metric overlays ("3M certified", "5-year warranty", "fleet wrap").
- **Dealer-locator CTA pinned to the hero** — strong "find a shop near you" energy. We can mirror with a "schedule a shop visit" CTA.
- **Subtle ASCII easter egg** in source — fun, low-cost brand personality. Worth adding to our HTML head as a comment.

### 2.4 Pending fetches (next round)

- [ ] [metrowrapz.com / metrogroupmiami.com](https://metrogroupmiami.com/) — flashy wrap shop brand
- [ ] [protectivefilmsolutions.com](https://protectivefilmsolutions.com/) — clean wrap-shop pattern
- [ ] [artofwrap.com](https://artofwrap.com/) — wrap aesthetics
- [ ] [iwrappedyourcar.com](https://iwrappedyourcar.com/) — Florida wrap shop personality
- [ ] [wrapshop.com](https://wrapshop.com/)
- [ ] [autopia.studio](https://autopia.studio/) — modern wrap brand site (design forward)
- [ ] [3M.com/wraps section](https://www.3m.com/3M/en_US/p/c/auto-graphic-films/) — material authority
- [ ] [activate.org](https://activate.org) — for activation/event craft inspiration
- [ ] [active-theory.com](https://activetheory.net/) — for absolutely-nuts WebGL inspiration (when we're ready for that)
- [ ] [resn.co.nz](https://resn.co.nz/) — interactive shaders / 3D
- [ ] [lusion.co](https://lusion.co/) — physics-driven cursor / hero

---

## 3. What just shipped (this milestone)

| Feature | File(s) | Notes |
| --- | --- | --- |
| **Cinematic site intro** | `src/components/BrandIntro.tsx` | Curtain reveal + letter-stagger wordmark + patriotic stripe sweep. Plays once per session. |
| **Curtain page transitions** | `src/components/PageTransition.tsx` | Wraps `{children}` in `app/layout.tsx`. Splits screen at center between routes. |
| **Kinetic marquee section** | `src/components/KineticMarquee.tsx` | Scroll-driven dual-row marquee with skewed counter-rotation + scroll-clipped fill on the headline. Mounted in `app/page.tsx`. |
| **Blog system (admin-editable)** | `src/lib/blog.ts`, `data/blog.json`, `src/app/api/blog`, `src/app/api/admin/blog`, `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, `src/app/admin/blog/page.tsx` | Full CRUD. Admin can create/edit/delete posts with cover-image upload via Cloudinary. Public list + post pages already match the cinematic look. |
| **Blog link** | `Navbar.tsx`, `Footer.tsx`, dashboard header | Discoverable everywhere. |

> **Vercel note:** the blog (like portfolio) writes to `data/blog.json`. On Vercel that filesystem is read-only at runtime, so admin saves only persist locally for now. If/when blog content needs to live in production, we should migrate to Vercel KV / Postgres / Sanity. For the current workflow (Munir edits locally, commits, deploys), this is fine.

---

## 4. The flashy queue — daily-task plan

The client asked for "the most complex animations ever done with CSS." That's a marathon, not a sprint. Each item below is scoped to fit a single working session so we ship something flashy every day.

### Day 2 — **Custom cursor + magnetic hover** ✅ shipped

- Replaced the OS cursor (desktop ≥1024px, non-coarse pointer, motion not reduced)
- Two-layer cursor: lerping ring + 1:1 dot, mix-blend-mode: difference for legibility on any background
- Hover variants via `data-cursor`: `view` (red disc), `drag` (square), default (red ring)
- Contextual label chip via `data-cursor-label` ("Quote", "View", "Explore")
- Magnetic CTAs via `data-magnetic` + optional `-strength` / `-radius` attributes
- Wired up: Navbar Quote CTA, Hero CTAs, Portfolio thumbnails
- Files: [`src/components/Cursor.tsx`](../src/components/Cursor.tsx), CSS in [`src/app/globals.css`](../src/app/globals.css), mounted in [`src/app/layout.tsx`](../src/app/layout.tsx)

### Day 3 — **Scroll-driven hero parallax + sticky horizontal showcase** ✅ shipped (May 8 2026)

- **Hero parallax** ([`src/components/Hero.tsx`](../src/components/Hero.tsx)):
  - `useScroll({ target, offset: ["start start", "end start"] })`
  - Background image: `y 0→30%`, `scale 1→1.1` (slowest, deepest layer)
  - "76" stars-and-stripes watermark: `y 0→-25%`, `scale 1→1.18`
  - Inner content: `y 0→-15%`, `opacity 1→0` (fades out as you scroll past)
- **ShowcaseRail** — replaces the generic bento Featured Work block on the homepage:
  - File: [`src/components/ShowcaseRail.tsx`](../src/components/ShowcaseRail.tsx)
  - Section is `(panels) * 100vh` tall, inner stage is `sticky top-0 h-screen` → vertical scroll converts to horizontal track translation via `useSpring(useTransform(scrollYProgress))`
  - 1 intro panel ("Real Brands. Real Loud.") + 6 project panels
  - Per-panel choreography: massive numeral (`38vw` outline only) drifts vertically, image card slides horizontally with parallax `imageX`, scales up as it enters, info bar fades with `titleOpacity` mapped to that panel's progress window
  - Counter-drifting `FEATURED · FEATURED · FEATURED` background headline
  - Active counter (`(03) / (07)`) animates on index change
  - Bottom progress bar tracks `scrollYProgress`
  - Mobile fallback: vertical card stack with numbered overlays (no sticky pinning under 1024px)
- Magnetic + cursor labels wired throughout (project cards = `view`, "All Work" link = "Full Portfolio")

### Day 4 — **Cursor image trail + "By The Numbers" reel** ✅ shipped (May 8 2026)

- **Replaced** the redundant homepage `CaseStudies` block (it was a second weaker portfolio bento on top of `ShowcaseRail`) with a brand-new dark-canvas section: [`src/components/ByTheNumbers.tsx`](../src/components/ByTheNumbers.tsx).
- **Animated counters**: `useMotionValue` + `animate()` count up from 0 when the section enters the viewport (`useInView({ once: true, margin: "-15%" })`). Four KPIs: 500+ wraps, 12yr on the road, 24hr turnaround, 4M sq ft of vinyl.
- **Cursor image trail (the Day 4 flex piece)**: an `ImageTrail` overlay scoped to the section's bounding rect listens to `mousemove`, distance-throttles at ~110px, and pushes a `framer-motion` thumbnail with a randomised tilt at the cursor location. The list is capped at 8 active items and each one auto-removes after 1.2s. Disabled on `pointer: coarse` and `prefers-reduced-motion`.
- **Live status ticker**: framer-motion infinite linear translate. Doubled-array trick avoids snap. Pulsing red "LIVE" dot pinned to the left edge.
- **Films we trust** strip — 3M / Avery Dennison / Inozetek / Hexis / Oracal — addresses the inozetek.com "trust badges" steal from §2.4.
- Black bg `#0a0a0a` with red ambient radial glow + grain texture — visually distinct from every other section on the page.

**Also fixed** ([`src/components/Navbar.tsx`](../src/components/Navbar.tsx)): widened nav container from `max-w-7xl` to `max-w-[1500px]`, added a top-level `gap-10`, bumped nav-link gaps to `gap-9 xl:gap-11`, and gave the right-side CTA cluster `gap-5` so the logo / nav / phone / Quote button no longer crowd each other.

### Day 5 — **Real WebGL hero (the big one)**

- Add `three.js` + `@react-three/fiber`
- Hero gets a shader-driven canvas: noise-displaced wrap film floating, with mouse parallax
- Fallback to current static hero when WebGL unsupported / `prefers-reduced-motion`

### Day 6 — **Three.js interactive 3D car**

- A simple low-poly car (rotatable, drag to spin) on the Vehicle Wraps service page
- User picks a wrap pattern from our `Patterns/` library and it lives-applies to the car material
- This is the trophy feature — sales tool + flex piece

### Day 7 — **Ambient sound + audio-reactive visual**

- Optional, mute by default
- Subtle hum + click on transition — like a film projector
- Toggle in nav

### Day 8 — **CSS-only complex flex piece** (no JS allowed)

- Pure CSS demo of e.g. a wrap being applied to a car (using `mask-image` + `@keyframes` + `clip-path`). Add as a section on the homepage to prove the craft. This is the "most complex CSS" badge.

### Day 9 — **Live shop status + order tracker**

- Stretch: small dashboard widget showing "currently wrapping: 3 vehicles", live count, "open today till 6pm"
- Powers the "real shop with real work" credibility

### Day 10 — **Performance + accessibility polish**

- Lighthouse pass: hit ≥90 on every page despite all the motion
- `prefers-reduced-motion` honoured on every animation
- Keyboard skip-intro for `BrandIntro`

---

## 5. Daily research rhythm (for me)

The client wants me researching wrap/brand companies every day. Format:

1. Pick **one** competitor from §2.4 (or anywhere flashy)
2. Spend ≤15 min on it. Write a 3-bullet entry under the right section above:
   - **Steal:** what we'd lift
   - **Pass on:** what's wrong for our client
   - **One specific implementation idea** for our codebase
3. Commit the doc-only change immediately so progress is visible

Once the queue in §4 starts producing checkmarks, this doc becomes the source of truth for "what's the next flashy thing I'm building today."

---

## 6. Brand tokens (for any new component)

```text
navy        #092f4d   /* primary surface */
navy-deep   #031827   /* hero / blog surface */
red         #b32025   /* accent — use like neon */
red-light   #ff6f73   /* accent on dark backgrounds */
blue-band   #285493   /* third stripe of the patriotic accent */
white       #ffffff
```

```text
font-display: 'Apotek Extended' — uppercase, weight 900, letter-spacing -0.01em
font-body:    'Inter'           — uppercase eyebrows letter-spacing 0.18–0.35em
```

Patriotic stripe — paste anywhere: `linear-gradient(90deg,#b32025 0%,#ffffff 50%,#285493 100%)`

---

_Last updated: this commit. Update on every flashy ship._
