# CLAUDE CODE: Redesign launchforte.com — Apple-Style Bold & Clear

## Context

Redesign the entire launchforte.com website with a new visual language. The site is hosted on Netlify, built with vanilla HTML/CSS/JS, zero dependencies, and styles inline in each page (per the existing CLAUDE.md).

**Keep all existing copy.** Do not rewrite headlines, subheads, body text, product descriptions, CTAs, or any other content. The only thing changing is the visual design system.

**Aesthetic direction:** Apple-style. Bold but professional. Soft warm-light background. Massive type with breathing room. One idea per scroll section. Generous whitespace. Single accent color used sparingly. Pill-shaped CTAs. Sentence-case copy.

## Step 1: Explore the repo

Before changing anything, run a full repo exploration:

1. List the file tree under `/site/` (or wherever pages live)
2. Open every page and note:
   - Page name and route
   - Sections present on the page
   - All copy (headlines, subheads, body, CTAs)
   - Any images or assets referenced
3. Open the current CLAUDE.md and read the existing design system rules
4. Identify the shared header/nav and footer pattern across pages

Output a brief summary of the inventory before proceeding. This is the source content that must survive the redesign unchanged.

## Step 2: Replace the design system CSS variables

In every page's `<style>` block, replace the existing `:root` block with this new one. **Do not change CSS variable names.** Existing component styles in `var()` references should continue to work.

```css
:root {
  /* =========================
     TEXT COLORS — high contrast, warm-neutral
     ========================= */
  --text-primary: #1d1d1f;       /* Headlines, key content */
  --text-secondary: #515154;     /* Body copy */
  --text-muted: #86868b;         /* Labels, fine print */

  /* =========================
     BRAND / ACCENT — Launch Forte blue stays
     ========================= */
  --accent: #0088DB;             /* CTAs, links, accent words */
  --accent-warm: #4ab5ed;        /* Hover, secondary highlights */
  --accent-tint: rgba(0,136,219,0.10);  /* Icon backgrounds, soft accents */

  /* =========================
     BACKGROUNDS — soft warm-light
     ========================= */
  --background: #f5f5f7;         /* Page background — Apple's signature gray */
  --background-alt: #ffffff;     /* Card and content surfaces */
  --card-bg: #ffffff;            /* Service cards, feature blocks */
  --background-dark: #1d1d1f;    /* Dark statement sections */

  /* =========================
     BORDERS — almost invisible
     ========================= */
  --border: rgba(0,0,0,0.08);    /* All dividers */
  --border-strong: rgba(0,0,0,0.12); /* Emphasized borders */
}
```

## Step 3: Update body background and add Apple-style atmosphere

Replace the existing body background gradient with this:

```css
body {
  background-color: var(--background);
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

**Remove** the existing radial-gradient ellipse overlays. Apple doesn't use background gradients on the body — backgrounds are flat and rhythm comes from alternating section backgrounds instead.

## Step 4: Update typography scale

Replace the existing typography rules with this scale. The defining moves: bigger headlines, tighter letter-spacing on display type, sub copy at 19px (not 16-17px), and weight 500 instead of 700 for headings.

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif;
  font-size: 17px;
  line-height: 1.5;
  color: var(--text-primary);
}

/* Hero headlines — 48-56px desktop */
.hero h1, h1.display {
  font-size: clamp(2.25rem, 5vw, 3.25rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.05;
  color: var(--text-primary);
  margin: 0 0 18px;
}

/* Section headlines — 36-40px */
h2, .section-heading {
  font-size: clamp(1.875rem, 3.5vw, 2.5rem);
  font-weight: 500;
  letter-spacing: -0.022em;
  line-height: 1.1;
  color: var(--text-primary);
  margin: 0 0 16px;
}

/* Card and feature headings — 20-26px */
h3, .card-heading {
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: -0.015em;
  line-height: 1.2;
  color: var(--text-primary);
  margin: 0 0 8px;
}

/* Eyebrow labels above headlines — colored accent */
.eyebrow {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--accent);
  letter-spacing: 0;
  text-transform: none;     /* Apple does NOT use uppercase for eyebrows */
  margin: 0 0 12px;
}

/* Sub copy under headlines — bigger than body */
.sub, .lede {
  font-size: 1.1875rem;     /* 19px */
  line-height: 1.45;
  color: var(--text-secondary);
  font-weight: 400;
  letter-spacing: -0.005em;
}

/* Body text */
p {
  font-size: 1.0625rem;     /* 17px */
  line-height: 1.55;
  color: var(--text-secondary);
}

/* Fine print */
.fine-print, small {
  font-size: 0.75rem;
  color: var(--text-muted);
}
```

**Remove** all uppercase + letter-spacing 0.1em "section label" treatments. Apple uses sentence-case eyebrows in the accent color instead.

## Step 5: Update button styles to pill-shape

Replace the existing button styles with these:

```css
.btn-primary {
  background: var(--accent);
  color: #fff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 980px;        /* Pill shape — Apple signature */
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
  text-decoration: none;
  display: inline-block;
}
.btn-primary:hover {
  background: var(--accent-warm);
}

.btn-secondary {
  background: transparent;
  color: var(--accent);
  border: none;                /* No border — text + chevron only */
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: opacity 0.2s ease;
}
.btn-secondary:hover {
  opacity: 0.7;
}
.btn-secondary::after {
  content: '›';
  font-size: 1.1rem;
  margin-left: 2px;
}
```

**Remove** the existing `transform: translateY(-2px)` hover lift and the `box-shadow: 0 6px 20px rgba(0,136,219,0.35)` glow. Apple buttons do not lift or glow on hover — they change color subtly.

## Step 6: Restructure each page section to follow these rules

For every section on every page, apply this structure. **Do not change the copy.** Only change how the copy is laid out.

### Section padding and rhythm

```css
.section {
  padding: 5rem 1.5rem;     /* Desktop: 80px vertical, 24px horizontal */
  text-align: center;       /* Most sections center-align */
}
.section.dark {
  background: var(--background-dark);
  color: #f5f5f7;
  padding: 6rem 1.5rem;     /* Dark sections get extra room */
}
.section.dark h2 { color: #f5f5f7; }
.section.dark .sub { color: #a1a1a6; }
.section.tinted {
  background: var(--background);
}
.section.white {
  background: #ffffff;
}

/* Inner content max-width */
.section-inner {
  max-width: 980px;
  margin: 0 auto;
}
.section-content {
  max-width: 620px;         /* Headlines and copy stay narrow */
  margin: 0 auto;
}
```

### Alternating section backgrounds

The page should alternate between `background: #f5f5f7` (tinted) and `background: #ffffff` (white), with at least one `background: #1d1d1f` (dark) section as a bold statement break. Order on the homepage should be: hero (tinted) → services (white) → dark statement (dark) → process or two-up (white) → final CTA (tinted) → footer.

### Hero structure

```html
<section class="section tinted">
  <div class="section-inner">
    <p class="eyebrow">[existing eyebrow text]</p>
    <h1 class="display">[existing headline]</h1>
    <p class="sub">[existing sub copy]</p>
    <div class="ctas">
      <a href="#" class="btn-primary">[existing primary CTA]</a>
      <a href="#" class="btn-secondary">[existing secondary CTA]</a>
    </div>
  </div>
</section>
```

### Service / feature cards (3-up grid)

```css
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 3.5rem;
  text-align: left;
}
.service-card {
  background: var(--card-bg);
  border-radius: 18px;       /* Large radius — Apple uses 18-22px */
  padding: 2.25rem 1.5rem;
  border: none;              /* No borders on cards */
}
.service-card .icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--accent-tint);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 20px;
}
.service-card .icon-wrap svg, .service-card .icon-wrap i {
  color: var(--accent);
  width: 22px;
  height: 22px;
}
@media (max-width: 768px) {
  .grid-3 { grid-template-columns: 1fr; }
}
```

### Dark statement section (the bold "what makes us different" moment)

```html
<section class="section dark">
  <div class="section-inner">
    <p class="eyebrow" style="color: var(--accent-warm);">[existing eyebrow]</p>
    <h2>[existing statement headline with one accent word in <span style="color: var(--accent-warm);">]</span></h2>
    <p class="sub">[existing supporting sub copy]</p>
  </div>
</section>
```

### Two-up feature blocks (used for "how it works" or "by the numbers")

```css
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 3.5rem;
  text-align: left;
}
.feature-block {
  background: var(--card-bg);
  border-radius: 18px;
  padding: 2.75rem 2.25rem;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.feature-block.accent {
  background: linear-gradient(180deg, #f0faff 0%, #e5f4fd 100%);
}
.feature-block .stat {
  font-size: 3.5rem;
  font-weight: 500;
  letter-spacing: -0.03em;
  color: var(--accent);
  line-height: 1;
  margin-top: 28px;
}
.feature-block .stat-label {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  margin-top: 6px;
}
@media (max-width: 768px) {
  .grid-2 { grid-template-columns: 1fr; }
}
```

## Step 7: Update the header/nav

The existing nav has a logo on the left, links in the middle, and CTAs on the right. Keep that structure. Restyle as:

```css
.site-header {
  background: rgba(245, 245, 247, 0.85);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 0.5px solid var(--border);
  padding: 14px 28px;
  position: sticky;
  top: 0;
  z-index: 100;
}
.site-header .logo {
  font-size: 0.9375rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}
.site-header .nav-links a {
  font-size: 0.8125rem;
  color: var(--text-primary);
  opacity: 0.85;
  text-decoration: none;
}
.site-header .nav-links a:hover {
  opacity: 1;
  text-decoration: none;
}
.site-header .nav-cta {
  font-size: 0.8125rem;
  color: var(--accent);
  font-weight: 500;
  text-decoration: none;
}
```

## Step 8: Update the footer

Keep the existing copy. Restyle as:

```css
.site-footer {
  background: var(--background-dark);
  color: var(--text-muted);
  padding: 2rem 2rem 1.75rem;
  border-top: 1px solid #2a2a2c;
  text-align: center;
}
.site-footer p {
  font-size: 0.6875rem;
  line-height: 1.5;
  color: #86868b;
  margin: 0;
}
```

## Step 9: Update the CLAUDE.md design system file

Open the existing `/CLAUDE.md` and update the **Design System** section to reflect the new tokens. Keep all other sections (coding conventions, tech stack, file structure, etc.) exactly as they are. Specifically:

- Update the `:root` CSS custom properties block to match Step 2
- Update the typography scale table to match Step 4
- Update the button patterns to match Step 5
- Update the card pattern to match Step 6 (large radius, no borders)
- Update the design principles section to:
  1. "Apple-style breathing room — one idea per section, generous whitespace"
  2. "Sentence-case everywhere — no ALL CAPS, no Title Case in body"
  3. "Single accent — blue is used sparingly for emphasis, never as background"
  4. "Soft contrast — warm-light backgrounds, near-black text, never pure black on pure white"
  5. "Flat surfaces — no shadows, no gradients on body, large radius on cards"

## Step 10: Apply page-by-page

For each page in the site, apply the new design system without changing the copy:

1. **Homepage** — hero (tinted), services or features (white), dark statement (dark), how it works or two-up (white), final CTA (tinted)
2. **Services / Products pages** — hero (tinted), service detail blocks (alternating), CTA (tinted)
3. **About page** — hero (tinted), narrative blocks (white), CTA (tinted)
4. **Pricing or Process pages** — hero (tinted), comparison or step blocks (white), CTA (tinted)
5. **Contact page** — keep simple, single-column, generous padding

For every page:

- Find the existing eyebrow/section label → change it from uppercase + letter-spacing to sentence-case in `var(--accent)`
- Find the existing h1/h2 → keep the copy, apply new scale and -0.025em letter-spacing
- Find the existing sub copy → keep the copy, bump font-size to 19px
- Find the existing CTAs → keep the copy, apply pill-shape
- Wrap related copy in `<section class="section [tinted/white/dark]">`
- Move grid items into `.grid-3` or `.grid-2` containers as appropriate

**Where existing copy contains an emphasis phrase (the kind of phrase that should pop visually), wrap that phrase only in `<span style="color: var(--accent);">` to apply the accent.** Pick at most one accent phrase per headline. Examples of what to look for: phrases after a comma, the punchline of a two-clause headline, the verb in a hero statement.

## Step 11: Responsive behavior

The existing breakpoints (max-width: 768px, max-width: 600px, max-width: 480px) stay the same. Make sure:

- Grids collapse to single column at 768px
- Section padding reduces from `5rem 1.5rem` to `3.5rem 1.25rem` at 768px
- Hero h1 stays readable via the existing `clamp()` values
- Nav links collapse to hamburger at 768px (use existing hamburger.js)
- Dark sections reduce padding from `6rem 1.5rem` to `4rem 1.25rem` at 768px

## Step 12: Constraints — what NOT to change

- Do not rewrite copy
- Do not delete pages
- Do not introduce frameworks, build tools, or npm packages
- Do not create external CSS files — keep styles inline in `<style>` per page
- Do not change file/folder structure
- Do not change the existing scroll-reveal.js or hamburger.js
- Do not add Tailwind, React, or any framework
- Do not introduce new fonts beyond the system stack (-apple-system, BlinkMacSystemFont, SF Pro Display, Inter as fallback)
- Do not add box-shadow or hover lift effects (Apple uses neither)
- Do not use `transform: translateY(-2px)` on hover for cards or buttons

## Step 13: Final QA pass

After all pages are updated:

1. Open every page in a local dev server and visually confirm:
   - Background is `#f5f5f7` (warm light gray, not white, not pure black)
   - All h1s look ~48-52px on desktop with tight letter-spacing
   - Accent blue appears in eyebrows, CTAs, one phrase per headline, and icon backgrounds — and nowhere else
   - At least one section per page is the dark statement section
   - CTAs are pill-shaped
   - Cards have 18px+ border-radius and no borders
2. Check the homepage at 1440px, 1024px, 768px, and 375px widths
3. Confirm WCAG AA contrast on body text (`--text-secondary` `#515154` on `#f5f5f7` passes)
4. Confirm the nav is sticky with backdrop blur
5. Run through every interactive element (links, CTAs, hamburger) to confirm hover states are subtle (color/opacity change, not transform)

## Step 14: Commit

Commit with the message:
```
Redesign launchforte.com — Apple-style bold/clear visual refresh

- Replaced dark blue palette with soft warm-light background (#f5f5f7)
- New type scale with -0.025em display letter-spacing
- Pill-shaped CTAs, removed hover-lift effects
- Alternating section rhythm (tinted/white/dark)
- Updated CLAUDE.md design system to match
- Preserved all existing copy across every page
```

Push to the connected branch and let Netlify auto-deploy.
