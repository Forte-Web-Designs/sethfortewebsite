# Seth Forte — sethforte.com

## Project Overview
Personal consulting website for Seth Forte, an automation consultant and systems architect based in Grapevine, Texas. The site showcases services (4-stage model: Foundation, Launch, Growth, Scale), case studies, client reviews, blog writing, and an Upwork portfolio. Primary CTA is booking a call via Calendly.

## Tech Stack
- **Vanilla HTML/CSS/JS** — no frameworks, no build tools, no npm
- **All styles inline** in `<style>` tags within each HTML page
- **Font:** Inter via Google Fonts (weights 400, 500, 600, 700, 800)
- **Deployed on Netlify**
- **Forms:** Calendly embed for booking, Beehiiv embed for newsletter
- **Tracking:** Google Analytics, Meta Pixel (referenced in some pages)

## Key Directories
```
/                    → Root HTML pages + JS files + images
/articles/           → Blog article pages (~50+ articles)
/work/               → Case study detail pages (8 projects)
/automation/         → Tool-specific landing pages (shopify, zapier)
```

## Site Pages
| File | Description |
|------|-------------|
| `index.html` | Homepage — hero, credibility bar, stage cards, results, writing preview, newsletter, Calendly |
| `about.html` | About page — background, results, personal story, connect links |
| `services.html` | Services overview — 4 stages with capability grids |
| `contact.html` | Contact — how I work, email, Calendly embed |
| `case-studies.html` | Work portfolio — 9 case study cards with stats |
| `reviews.html` | Client reviews — 18 review cards with stars and tags |
| `writing.html` | Writing hub — featured articles list |
| `posts.html` | All posts — complete article listing |
| `upwork.html` | Upwork portfolio — capabilities, results, reviews, skills, CTA |
| `foundation.html` | Stage 1 service page — CRM/infrastructure details |
| `launch.html` | Stage 2 service page — traffic/funnels details |
| `growth.html` | Stage 3 service page — multi-channel lead gen |
| `scale.html` | Stage 4 service page — reporting/content/support |
| `review.html` | Infrastructure Review service page |
| `audit.html` | Automation Audit service page |
| `work/*.html` | Individual case study pages (8 total) |
| `articles/*.html` | Individual blog articles (~50+ total) |
| `automation/*.html` | Tool landing pages (shopify, zapier) |

## Design System — CSS Custom Properties
```css
:root {
    --text-primary: #f0f4f8;
    --text-secondary: #94a3b8;
    --text-muted: #64748b;
    --accent: #0088DB;
    --accent-hover: #0099f0;
    --accent-warm: #38b2f5;
    --accent-glow: rgba(0,136,219,0.15);
    --background: #0a0e17;
    --background-alt: #111827;
    --border: #1e293b;
    --border-light: #2a3a50;
    --card-bg: rgba(17,24,39,0.7);
    --card-bg-solid: #111827;
    --card-hover: rgba(30,41,59,0.5);
    --gradient-start: #0088DB;
    --gradient-end: #38b2f5;
    --success: #10b981;
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --radius-xl: 20px;
}
```

## Typography
- **Font family:** `'Inter', sans-serif`
- **Hero:** `clamp(2.5rem, 5vw, 3.5rem)`, weight 800, letter-spacing -0.03em
- **H1:** 2rem, weight 700
- **H2:** 1.5rem, weight 700
- **Section labels:** 0.75rem, uppercase, weight 600, letter-spacing 0.1em, accent colored
- **Body:** 1rem (16px base), weight 400, line-height 1.7
- **Small:** 0.875rem
- **Fine print:** 0.75rem

## Component Patterns
- **Glassmorphism header** — sticky, backdrop-filter blur(20px), semi-transparent bg
- **Nav links** — pill-style with border-radius, hover bg `rgba(255,255,255,0.05)`
- **Hero sections** — badge pill with pulsing dot, large headline, staggered fade-up
- **Section labels** — uppercase, accent colored, `::before` 20px accent bar
- **Cards** — backdrop-filter blur, semi-transparent bg, border, hover lift translateY(-2px)
- **Gradient buttons** — linear-gradient(135deg, accent, accent-hover), ::after shine on hover
- **Background atmosphere** — body::before with radial gradient ambient glow
- **Scroll reveal** — `.reveal` class, IntersectionObserver, translateY(24px) → 0
- **Review cards** — card-bg, border, star rating, attribution, hover border change

## Responsive Breakpoints
- **Desktop:** default (no media query)
- **Tablet:** `@media (max-width: 768px)` — single column, hamburger menu
- **Mobile:** `@media (max-width: 480px)` — smaller padding/fonts

## JavaScript Files
| File | Purpose |
|------|---------|
| `scroll-reveal.js` | IntersectionObserver adds `.revealed` class to `.reveal` elements |
| `theme-toggle.js` | Dark/light toggle, localStorage persistence, CSS variable overrides |
| `scroll-top.js` | Scroll-to-top button + sticky CTA bar after 300px scroll |
| `hamburger.js` | Mobile hamburger menu — full-screen overlay with nav links |
| `blog.js` | Blog category filtering (used on posts pages) |

## Coding Conventions
- All styles in `<style>` tags — NO external CSS files
- Use `var()` for every color — never hardcode hex in component styles
- Desktop-first media queries
- All pages include all 4 JS files at bottom of `<body>`
- Every page has same header/nav and footer structure
- Inter font loaded via Google Fonts `<link>` in every page `<head>`

## Dark/Light Theme
- Default: dark theme
- Light: `[data-theme="light"]` on `<html>` element
- Toggle button in header (moves to fixed position on scroll)
- Light theme overrides all CSS variables

## DO NOT
- Use Tailwind, React, Vue, or any framework
- Use npm, webpack, or any build tool
- Create external CSS files
- Hardcode hex colors in component styles (use CSS variables)
- Remove existing content, links, form attributes, or tracking scripts
- Add unnecessary dependencies
