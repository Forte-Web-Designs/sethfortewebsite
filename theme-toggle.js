(function() {
    // Apply persisted theme immediately to minimize flash before icons load
    var saved = localStorage.getItem('theme');
    var theme = saved === 'dark' || saved === 'light' ? saved : 'light';
    document.documentElement.setAttribute('data-theme', theme);

    // Pages carrying data-studio on <html> ship the Studio design system, whose
    // dark mode is defined by [data-theme="dark"] tokens in their own <style>
    // block. The legacy overrides below are scoped away from those pages so the
    // two systems never fight; every not-yet-converted page is unaffected.
    var darkCSS = ':root[data-theme="dark"]:not([data-studio]){' +
        '--text-primary:#f5f5f7;' +
        '--text-secondary:#a1a1a6;' +
        '--text-muted:#86868b;' +
        '--accent:#4ab5ed;' +
        '--accent-hover:#0088DB;' +
        '--accent-warm:#0088DB;' +
        '--accent-subtle:rgba(74,181,237,0.12);' +
        '--accent-glow:rgba(74,181,237,0.12);' +
        '--accent-tint:rgba(74,181,237,0.14);' +
        '--accent-2:#0088DB;' +
        '--accent-3:#4ab5ed;' +
        '--background:#1d1d1f;' +
        '--background-alt:#000000;' +
        '--background-dark:#000000;' +
        '--surface:#2a2a2c;' +
        '--surface-hover:#3a3a3c;' +
        '--card-bg:#2a2a2c;' +
        '--border:rgba(255,255,255,0.10);' +
        '--border-light:rgba(255,255,255,0.16)}' +
        '[data-theme="dark"]:not([data-studio]) body{background:#1d1d1f;color:#f5f5f7}' +
        '[data-theme="dark"]:not([data-studio]) .site-header{background:rgba(29,29,31,0.85)!important;border-bottom:0.5px solid rgba(255,255,255,0.10)}' +
        '[data-theme="dark"]:not([data-studio]) .nav-link{color:#f5f5f7;opacity:0.85}' +
        '[data-theme="dark"]:not([data-studio]) .nav-link:hover,[data-theme="dark"]:not([data-studio]) .nav-link.active{color:#f5f5f7;opacity:1}' +
        '[data-theme="dark"]:not([data-studio]) .header-logo{color:#f5f5f7}' +
        '[data-theme="dark"]:not([data-studio]) .stage-card,[data-theme="dark"]:not([data-studio]) .result-card,[data-theme="dark"]:not([data-studio]) .review-card,[data-theme="dark"]:not([data-studio]) .capability-card,[data-theme="dark"]:not([data-studio]) .step-card,[data-theme="dark"]:not([data-studio]) .case-study-card,[data-theme="dark"]:not([data-studio]) .featured-card,[data-theme="dark"]:not([data-studio]) .video-quote-card,[data-theme="dark"]:not([data-studio]) .feature-block,[data-theme="dark"]:not([data-studio]) .service-card,[data-theme="dark"]:not([data-studio]) .featured-case,[data-theme="dark"]:not([data-studio]) .audit-section,[data-theme="dark"]:not([data-studio]) .stat-card,[data-theme="dark"]:not([data-studio]) .metric-item,[data-theme="dark"]:not([data-studio]) .cta-block,[data-theme="dark"]:not([data-studio]) .cta-section,[data-theme="dark"]:not([data-studio]) .next-step,[data-theme="dark"]:not([data-studio]) .engagement-block{background:#2a2a2c;border-color:rgba(255,255,255,0.10);color:#f5f5f7}' +
        '[data-theme="dark"]:not([data-studio]) .stage-card:hover,[data-theme="dark"]:not([data-studio]) .result-card:hover,[data-theme="dark"]:not([data-studio]) .review-card:hover,[data-theme="dark"]:not([data-studio]) .capability-card:hover,[data-theme="dark"]:not([data-studio]) .step-card:hover,[data-theme="dark"]:not([data-studio]) .case-study-card:hover,[data-theme="dark"]:not([data-studio]) .featured-card:hover,[data-theme="dark"]:not([data-studio]) .video-quote-card:hover{background:#3a3a3c;border-color:rgba(255,255,255,0.16)}' +
        '[data-theme="dark"]:not([data-studio]) h1,[data-theme="dark"]:not([data-studio]) h2,[data-theme="dark"]:not([data-studio]) h3,[data-theme="dark"]:not([data-studio]) h4,[data-theme="dark"]:not([data-studio]) .page-title,[data-theme="dark"]:not([data-studio]) .section-heading,[data-theme="dark"]:not([data-studio]) .hero-headline{color:#f5f5f7}' +
        '[data-theme="dark"]:not([data-studio]) p,[data-theme="dark"]:not([data-studio]) .body-text,[data-theme="dark"]:not([data-studio]) .about-text,[data-theme="dark"]:not([data-studio]) .sub,[data-theme="dark"]:not([data-studio]) .hero-sub,[data-theme="dark"]:not([data-studio]) .page-subtitle{color:#a1a1a6}' +
        '[data-theme="dark"]:not([data-studio]) .review-text,[data-theme="dark"]:not([data-studio]) .video-quote-text{color:#a1a1a6}' +
        '[data-theme="dark"]:not([data-studio]) .review-name,[data-theme="dark"]:not([data-studio]) .video-quote-name{color:#f5f5f7}' +
        '[data-theme="dark"]:not([data-studio]) .review-project,[data-theme="dark"]:not([data-studio]) .video-quote-project,[data-theme="dark"]:not([data-studio]) .case-study-meta,[data-theme="dark"]:not([data-studio]) .stage-tagline{color:#86868b}' +
        '[data-theme="dark"]:not([data-studio]) .btn-primary{background:#4ab5ed;color:#1d1d1f!important}' +
        '[data-theme="dark"]:not([data-studio]) .btn-primary:hover{background:#0088DB;color:#ffffff!important}' +
        '[data-theme="dark"]:not([data-studio]) .btn-ghost,[data-theme="dark"]:not([data-studio]) .btn-secondary{color:#4ab5ed;border-color:rgba(255,255,255,0.16)}' +
        '[data-theme="dark"]:not([data-studio]) .btn-ghost:hover,[data-theme="dark"]:not([data-studio]) .btn-secondary:hover{background:rgba(74,181,237,0.12);color:#4ab5ed}' +
        '[data-theme="dark"]:not([data-studio]) .btn-link{color:#4ab5ed!important}' +
        '[data-theme="dark"]:not([data-studio]) .btn-link:hover{color:#7ec9f1!important}' +
        '[data-theme="dark"]:not([data-studio]) a{color:#4ab5ed}' +
        '[data-theme="dark"]:not([data-studio]) .section-label,[data-theme="dark"]:not([data-studio]) .eyebrow{color:#4ab5ed}' +
        '[data-theme="dark"]:not([data-studio]) .result-stat,[data-theme="dark"]:not([data-studio]) .case-study-stat,[data-theme="dark"]:not([data-studio]) .featured-stat,[data-theme="dark"]:not([data-studio]) .stat-card .stat,[data-theme="dark"]:not([data-studio]) .feature-block .stat,[data-theme="dark"]:not([data-studio]) .metric-value,[data-theme="dark"]:not([data-studio]) .stat,[data-theme="dark"]:not([data-studio]) .gradient-text{color:#4ab5ed!important;-webkit-text-fill-color:#4ab5ed!important}' +
        '[data-theme="dark"]:not([data-studio]) .footer-section,[data-theme="dark"]:not([data-studio]) .site-footer{background:#000000;color:#86868b}' +
        '[data-theme="dark"]:not([data-studio]) .tech-tag,[data-theme="dark"]:not([data-studio]) .case-study-tags span,[data-theme="dark"]:not([data-studio]) .review-tag{background:rgba(74,181,237,0.14);color:#4ab5ed}' +
        '[data-theme="dark"]:not([data-studio]) .carousel-item{color:#a1a1a6}' +
        '[data-theme="dark"]:not([data-studio]) .metric-label,[data-theme="dark"]:not([data-studio]) .trust-label,[data-theme="dark"]:not([data-studio]) .featured-label,[data-theme="dark"]:not([data-studio]) .stage-number,[data-theme="dark"]:not([data-studio]) .step-number,[data-theme="dark"]:not([data-studio]) .case-label{color:#86868b}' +
        '[data-theme="dark"]:not([data-studio]) .featured-in,[data-theme="dark"]:not([data-studio]) .featured-in a{color:#a1a1a6}' +
        '[data-theme="dark"]:not([data-studio]) hr,[data-theme="dark"]:not([data-studio]) .section-divider{border-color:rgba(255,255,255,0.10)}' +
        '[data-theme="dark"]:not([data-studio]) .results-summary li,[data-theme="dark"]:not([data-studio]) .results-summary li strong{color:#a1a1a6}' +
        '[data-theme="dark"]:not([data-studio]) .results-summary li strong{color:#f5f5f7}' +
        '[data-theme="dark"]:not([data-studio]) .hamburger-overlay{background:rgba(29,29,31,0.98)}' +
        '[data-theme="dark"]:not([data-studio]) .hamburger-overlay a{color:#f5f5f7}' +
        '[data-theme="dark"]:not([data-studio]) .hamburger-overlay a:hover{color:#4ab5ed}' +
        '[data-theme="dark"]:not([data-studio]) #scroll-top-btn{background:#2a2a2c;border-color:rgba(255,255,255,0.10);color:#a1a1a6}' +
        '[data-theme="dark"]:not([data-studio]) #scroll-top-btn:hover{color:#4ab5ed;border-color:rgba(74,181,237,0.40)}' +
        '[data-theme="dark"]:not([data-studio]) #sticky-cta-bar{background:rgba(29,29,31,0.95);border-top-color:rgba(255,255,255,0.10)}' +
        '[data-theme="dark"]:not([data-studio]) #sticky-cta-link{background:#4ab5ed;color:#1d1d1f}' +
        '[data-theme="dark"]:not([data-studio]) #sticky-cta-link:hover{background:#0088DB;color:#ffffff}';

    var toggleCSS = '#theme-toggle{width:28px;height:28px;border-radius:50%;border:none;background:transparent;color:var(--text-muted);cursor:pointer;z-index:1001;display:flex;align-items:center;justify-content:center;transition:color 0.2s ease,opacity 0.2s ease;line-height:1;flex-shrink:0;margin-left:0.75rem;padding:0;opacity:0.7}' +
        '#theme-toggle:hover{color:var(--text-primary);opacity:1}' +

        /* --- Studio pages: the toggle must read against three different
           grounds — the dark hero video, the light pane, and the dark pane in
           dark mode. A bare icon inherits whatever is behind it, so give it a
           real chip: a translucent disc that always carries its own contrast. */
        'html[data-studio] #theme-toggle{width:36px;height:36px;opacity:1;color:#FFFFFF;' +
          'background:rgba(10,10,10,0.45);border:1px solid rgba(255,255,255,0.28);' +
          '-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);' +
          'transition:background 0.2s ease,border-color 0.2s ease,color 0.2s ease}' +
        'html[data-studio] #theme-toggle:hover{background:rgba(10,10,10,0.62);border-color:rgba(255,255,255,0.45);color:#FFFFFF}' +
        /* Off the hero (scrolled, or any page whose header sits on paper) the
           chip flips to match the pane it now sits on. */
        'html[data-studio] #theme-toggle.on-paper{color:var(--ink)!important;' +
          'background:rgba(255,255,255,0.82)!important;border-color:rgba(10,10,10,0.14)!important}' +
        'html[data-studio] #theme-toggle.on-paper:hover{background:#FFFFFF!important;border-color:rgba(10,10,10,0.28)!important;color:var(--ink)!important}' +
        'html[data-studio][data-theme="dark"] #theme-toggle.on-paper{color:var(--ink)!important;' +
          'background:rgba(23,23,23,0.86)!important;border-color:rgba(255,255,255,0.20)!important}' +
        'html[data-studio][data-theme="dark"] #theme-toggle.on-paper:hover{background:#262626!important;border-color:rgba(255,255,255,0.34)!important;color:var(--ink)!important}' +
        'html[data-studio] #theme-toggle svg{width:17px;height:17px}' +
        '#theme-toggle svg{width:18px;height:18px;display:block;transition:transform 0.45s cubic-bezier(0.4,0,0.2,1)}' +
        '#theme-toggle.theme-switching svg{transform:rotate(180deg)}' +
        '#theme-toggle.scrolled{position:fixed;top:auto;bottom:8.5rem;right:2rem;margin-left:0;background:var(--background);border:0.5px solid var(--border-light);opacity:0.95}' +
        '@media(max-width:768px){#theme-toggle{position:fixed;top:1rem;right:4rem;margin-left:0;background:var(--background);border:0.5px solid var(--border-light);width:32px;height:32px;opacity:0.95}#theme-toggle svg{width:16px;height:16px}}' +
        '@media(max-width:480px){#theme-toggle{right:3.5rem}#theme-toggle.scrolled{right:1.25rem;bottom:8rem}}' +
        // Smooth theme transition: applied only after first paint, only during a flip.
        // Targets the properties that actually change between themes.
        'html.theme-transition, html.theme-transition body, html.theme-transition *, html.theme-transition *::before, html.theme-transition *::after {' +
        'transition: background-color 0.45s cubic-bezier(0.4,0,0.2,1), background 0.45s cubic-bezier(0.4,0,0.2,1), color 0.45s cubic-bezier(0.4,0,0.2,1), border-color 0.45s cubic-bezier(0.4,0,0.2,1), fill 0.45s cubic-bezier(0.4,0,0.2,1), stroke 0.45s cubic-bezier(0.4,0,0.2,1), box-shadow 0.45s cubic-bezier(0.4,0,0.2,1) !important;' +
        '}' +
        // Don't animate transform-driven hover lifts during a theme flip
        'html.theme-transition * { transition-property: background-color, background, color, border-color, fill, stroke, box-shadow !important; }';

    var style = document.createElement('style');
    style.textContent = darkCSS + toggleCSS;
    document.head.appendChild(style);

    var sunIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
    var moonIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

    var toggle = document.createElement('button');
    toggle.id = 'theme-toggle';
    toggle.type = 'button';

    function applyTheme(t) {
        document.documentElement.setAttribute('data-theme', t);
        toggle.innerHTML = t === 'dark' ? sunIcon : moonIcon;
        toggle.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        try { localStorage.setItem('theme', t); } catch (e) {}
    }

    var isMobile = window.innerWidth <= 768;
    var headerContainer = document.querySelector('.header-container');

    if (headerContainer && !isMobile) {
        headerContainer.appendChild(toggle);
    } else {
        document.body.appendChild(toggle);
    }

    applyTheme(theme);

    // Which ground is the toggle sitting on? Only the homepage has the dark
    // cinematic hero; every other page's header sits on the paper pane from the
    // start. Keeping this in one place means the chip is never guessing.
    var heroZone = document.querySelector('.hero-cinematic');
    function updateToggleGround() {
        if (!document.documentElement.hasAttribute('data-studio')) return;
        var onPaper = true;
        if (heroZone) {
            // Measure against the toggle's actual position on screen. It starts
            // in the header and later becomes position:fixed near the bottom of
            // the viewport, so read its live rect rather than assuming a spot.
            var t = toggle.getBoundingClientRect();
            var probeY = t.height ? t.top + t.height / 2 : 50;
            onPaper = heroZone.getBoundingClientRect().bottom <= probeY;
        }
        toggle.classList.toggle('on-paper', onPaper);
    }
    updateToggleGround();

    var transitionTimer = null;
    toggle.addEventListener('click', function() {
        var root = document.documentElement;
        // Enable the smooth color transition just for this flip
        root.classList.add('theme-transition');
        toggle.classList.add('theme-switching');

        var current = root.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
        updateToggleGround();

        // Remove the transition class after the animation runs so it
        // doesn't slow down unrelated hover states across the page.
        if (transitionTimer) clearTimeout(transitionTimer);
        transitionTimer = setTimeout(function() {
            root.classList.remove('theme-transition');
            toggle.classList.remove('theme-switching');
        }, 500);
    });

    var isScrolled = false;
    window.addEventListener('resize', updateToggleGround);
    window.addEventListener('scroll', function() {
        updateToggleGround();
        if (window.scrollY > 300) {
            if (!isScrolled) {
                isScrolled = true;
                toggle.classList.add('scrolled');
                if (!isMobile && headerContainer && toggle.parentNode === headerContainer) {
                    document.body.appendChild(toggle);
                }
            }
        } else {
            if (isScrolled) {
                isScrolled = false;
                toggle.classList.remove('scrolled');
                if (!isMobile && headerContainer) {
                    toggle.style.position = '';
                    toggle.style.top = '';
                    toggle.style.right = '';
                    headerContainer.appendChild(toggle);
                }
            }
        }
    });
})();
