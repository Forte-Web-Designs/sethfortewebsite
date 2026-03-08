# Design Brief — sethforte.com Redesign

## Brand Identity & Tone
- **Professional but approachable** — enterprise-grade expertise, small business accessibility
- **Direct and honest** — no jargon, no fluff, results-focused
- **Modern and technical** — glassmorphism, clean typography, subtle animations
- **Trust-forward** — stats, reviews, case studies prominently featured

## Color System

### CSS Custom Properties
```css
:root {
    /* Text */
    --text-primary: #f0f4f8;       /* Headlines, primary content */
    --text-secondary: #94a3b8;     /* Body text, descriptions */
    --text-muted: #64748b;         /* Labels, captions, metadata */

    /* Brand Accent */
    --accent: #0088DB;             /* Primary brand blue — CTAs, links, highlights */
    --accent-hover: #0099f0;       /* Lighter hover state */
    --accent-warm: #38b2f5;        /* Secondary accent — gradient end, badges */
    --accent-glow: rgba(0,136,219,0.15);  /* Ambient glow effects */

    /* Backgrounds */
    --background: #0a0e17;         /* Page background — deep navy */
    --background-alt: #111827;     /* Alternate sections, card solid bg */

    /* Borders */
    --border: #1e293b;             /* Default borders */
    --border-light: #2a3a50;       /* Lighter borders for hover states */

    /* Cards */
    --card-bg: rgba(17,24,39,0.7); /* Card background with transparency */
    --card-bg-solid: #111827;      /* Solid card background */
    --card-hover: rgba(30,41,59,0.5); /* Card hover state */

    /* Gradients */
    --gradient-start: #0088DB;     /* Gradient start (buttons, accents) */
    --gradient-end: #38b2f5;       /* Gradient end */

    /* Status */
    --success: #10b981;            /* Success states, positive indicators */

    /* Radii */
    --radius-sm: 8px;              /* Small elements, tags */
    --radius-md: 12px;             /* Cards, inputs */
    --radius-lg: 16px;             /* Large cards, sections */
    --radius-xl: 20px;             /* Hero cards, feature sections */
}
```

### Light Theme Overrides
```css
[data-theme="light"] {
    --text-primary: #0f172a;
    --text-secondary: #475569;
    --text-muted: #94a3b8;
    --accent: #0077c2;
    --accent-hover: #0066aa;
    --accent-warm: #2196f3;
    --accent-glow: rgba(0,119,194,0.1);
    --background: #f8fafc;
    --background-alt: #f1f5f9;
    --border: #e2e8f0;
    --border-light: #cbd5e1;
    --card-bg: rgba(255,255,255,0.8);
    --card-bg-solid: #ffffff;
    --card-hover: rgba(241,245,249,0.8);
    --gradient-start: #0077c2;
    --gradient-end: #2196f3;
}
```

## Typography Scale

| Role | Size | Weight | Tracking | Usage |
|------|------|--------|----------|-------|
| Hero | `clamp(2.5rem, 5vw, 3.5rem)` | 800 | -0.03em | Homepage hero headline |
| H1 | `2rem` | 700 | -0.02em | Page titles |
| H2 | `1.5rem` | 700 | -0.01em | Section headings |
| H3 | `1.125rem` | 600 | normal | Card titles, subsections |
| Section Label | `0.75rem` | 600 | 0.1em | Uppercase section markers |
| Body | `1rem` | 400 | normal | Paragraph text |
| Small | `0.875rem` | 400 | normal | Secondary info, descriptions |
| Fine Print | `0.75rem` | 400 | normal | Copyright, metadata |

**Font Stack:**
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Google Fonts Import:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

## Component Patterns

### Glassmorphism Header
```css
.site-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(10, 14, 23, 0.8);
    backdrop-filter: blur(20px) saturate(1.2);
    -webkit-backdrop-filter: blur(20px) saturate(1.2);
    border-bottom: 1px solid var(--border);
    padding: 0 2rem;
}
```

### Nav Links (Pill Style)
```css
.nav-link {
    padding: 0.5rem 1rem;
    border-radius: var(--radius-sm);
    color: var(--text-secondary);
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s ease;
}
.nav-link:hover {
    background: rgba(255,255,255,0.05);
    color: var(--text-primary);
}
.nav-link.active {
    background: var(--accent-glow);
    color: var(--accent);
}
```

### Hero Badge (Pulsing Dot)
```css
.hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 1rem;
    border-radius: 999px;
    background: var(--accent-glow);
    border: 1px solid rgba(0,136,219,0.2);
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--accent);
}
.hero-badge::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
    animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.5); }
}
```

### Section Labels (Accent Bar)
```css
.section-label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent);
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
}
.section-label::before {
    content: '';
    width: 20px;
    height: 2px;
    background: var(--accent);
    border-radius: 1px;
}
```

### Cards (Glassmorphism)
```css
.card {
    background: var(--card-bg);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 1.75rem;
    transition: transform 0.3s cubic-bezier(0.16,1,0.3,1),
                box-shadow 0.3s cubic-bezier(0.16,1,0.3,1),
                border-color 0.2s ease;
}
.card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0,136,219,0.1);
    border-color: var(--border-light);
}
```

### Gradient Buttons
```css
.btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.75rem;
    background: linear-gradient(135deg, var(--accent), var(--accent-hover));
    color: #ffffff;
    border: none;
    border-radius: var(--radius-sm);
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.btn-primary::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    transition: left 0.5s ease;
}
.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,136,219,0.35);
}
.btn-primary:hover::after {
    left: 100%;
}
```

### Secondary Button
```css
.btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.75rem;
    background: transparent;
    color: var(--text-secondary);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.2s ease;
}
.btn-secondary:hover {
    border-color: var(--accent);
    color: var(--accent);
}
```

### Review Cards
```css
.review-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 1.75rem 2rem;
    margin-bottom: 1rem;
    transition: border-color 0.2s ease;
}
.review-card:hover {
    border-color: var(--border-light);
}
.review-stars {
    color: var(--accent-warm);
    font-size: 0.85rem;
    letter-spacing: 0.05em;
}
```

### Link Style
```css
a {
    color: var(--accent);
    text-decoration: none;
    transition: color 0.2s ease;
}
a:hover {
    color: var(--accent-hover);
    text-decoration: underline;
    text-underline-offset: 2px;
}
```

### Dividers
```css
.section-divider {
    border: none;
    border-top: 1px solid var(--border);
    margin: 4rem 0;
}
```

## Layout Rules

### Content Widths
- **Max site width:** 1200px (centered)
- **Content max-width:** 780px (main content area)
- **Hero text max-width:** 700px (centered)
- **Card grid max-width:** inherits from content area

### Spacing Scale
| Token | Value | Usage |
|-------|-------|-------|
| xs | 0.25rem | Tight spacing between related elements |
| sm | 0.5rem | Between inline elements, tag gaps |
| md | 1rem | Between cards in grids, list items |
| lg | 2rem | Section padding, major element gaps |
| xl | 4rem | Between major sections |
| 2xl | 6rem | Top-level section dividers |

### Grid Patterns
- **Stage cards:** 2-column grid, 1.25rem gap → single column on mobile
- **Result cards:** 3-column grid → single column on mobile
- **Footer:** 3-column grid → 2-column tablet → single column mobile
- **Capability grid:** 2-column → single column on mobile
- **Steps grid:** 3-column → single column on mobile

## Animation Standards

### Scroll Reveal
```css
.reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1),
                transform 0.6s cubic-bezier(0.16,1,0.3,1);
}
.reveal.revealed {
    opacity: 1;
    transform: translateY(0);
}
```

### Fade In (On Load)
```css
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
.animate-fade-up {
    animation: fadeInUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards;
}
```

### Hover Interactions
- **Cards:** `transform: translateY(-2px)` + box-shadow, 0.3s ease
- **Buttons:** `transform: translateY(-2px)` + glow shadow, 0.2s ease
- **Links:** color transition 0.2s ease
- **Nav items:** background + color transition 0.2s ease

### Timing
- **Interactions:** 0.2-0.3s ease
- **Reveals:** 0.6s cubic-bezier(0.16,1,0.3,1)
- **Stagger delay:** 0.1s increments

## Responsive Breakpoints

| Breakpoint | Target | Key Changes |
|------------|--------|-------------|
| Default | Desktop (769px+) | Full layout, glassmorphism header, desktop nav |
| `max-width: 768px` | Tablet/Mobile | Hamburger menu, single-column grids, reduced padding |
| `max-width: 480px` | Small Mobile | Smaller fonts, tighter spacing, full-width buttons |

## Page Structure Template
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Meta tags -->
    <!-- Google Fonts (Inter) -->
    <!-- Favicon -->
    <style>
        /* Reset */
        /* CSS Variables */
        /* Global styles (body, a, animations) */
        /* Header styles */
        /* Page-specific styles */
        /* Footer styles */
        /* Responsive breakpoints */
    </style>
</head>
<body>
    <!-- Glassmorphism Header -->
    <header class="site-header">...</header>

    <!-- Main Content -->
    <main>
        <!-- Hero / Page Title Section -->
        <!-- Content Sections with .reveal -->
        <!-- CTA Section -->
    </main>

    <!-- Footer -->
    <footer class="site-footer">...</footer>

    <!-- Scripts -->
    <script src="/scroll-reveal.js"></script>
    <script src="/theme-toggle.js"></script>
    <script src="/scroll-top.js"></script>
    <script src="/hamburger.js"></script>
</body>
</html>
```

## Design Principles
1. **Content first** — design serves the message, not the other way around
2. **Progressive disclosure** — don't overwhelm; reveal information as needed
3. **Consistent rhythm** — uniform spacing, consistent component patterns
4. **Performance** — minimal dependencies, optimized animations
5. **Accessibility** — sufficient contrast, keyboard navigation, semantic HTML
6. **Mobile-considerate** — every layout works beautifully on small screens
