(function() {
    var lightCSS = ':root[data-theme="light"]{' +
        '--text-primary:#0f172a;' +
        '--text-secondary:#475569;' +
        '--text-muted:#94a3b8;' +
        '--accent:#4f46e5;' +
        '--accent-hover:#6366f1;' +
        '--accent-subtle:rgba(79,70,229,0.06);' +
        '--accent-glow:rgba(79,70,229,0.12);' +
        '--accent-2:#0891b2;' +
        '--accent-3:#7c3aed;' +
        '--background:#f8fafc;' +
        '--background-alt:#f1f5f9;' +
        '--surface:#ffffff;' +
        '--surface-hover:#f8fafc;' +
        '--border:rgba(0,0,0,0.06);' +
        '--border-light:rgba(0,0,0,0.1)}' +
        '[data-theme="light"] .site-header{background:rgba(248,250,252,0.85)}' +
        '[data-theme="light"] .grid-bg{background-image:linear-gradient(rgba(0,0,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.03) 1px,transparent 1px)}' +
        '[data-theme="light"] .hero-glow{background:radial-gradient(ellipse,rgba(79,70,229,0.08) 0%,transparent 70%)}' +
        '[data-theme="light"] .gradient-text{background:linear-gradient(135deg,#4f46e5,#0891b2,#7c3aed);background-size:200% 200%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}' +
        '[data-theme="light"] .metric-item{background:#ffffff}' +
        '[data-theme="light"] .metric-item:hover{background:#f8fafc}' +
        '[data-theme="light"] .metrics-bar{background:rgba(0,0,0,0.06)}' +
        '[data-theme="light"] .stage-card{background:#ffffff;border-color:rgba(0,0,0,0.06)}' +
        '[data-theme="light"] .stage-card:hover{background:#f8fafc;border-color:rgba(79,70,229,0.2)}' +
        '[data-theme="light"] .result-card{background:#ffffff;border-color:rgba(0,0,0,0.06)}' +
        '[data-theme="light"] .result-card:hover{background:#f8fafc;border-color:rgba(79,70,229,0.2)}' +
        '[data-theme="light"] .cta-block{background:#ffffff;border-color:rgba(0,0,0,0.06)}' +
        '[data-theme="light"] .cta-block::before{background:radial-gradient(ellipse,rgba(79,70,229,0.06) 0%,transparent 70%)}' +
        '[data-theme="light"] .process-step{background:#ffffff;border-color:rgba(0,0,0,0.06)}' +
        '[data-theme="light"] #scroll-top-btn{background:#fff;border-color:rgba(0,0,0,0.1);color:#94a3b8}' +
        '[data-theme="light"] #scroll-top-btn:hover{background:rgba(79,70,229,0.06);color:#4f46e5;border-color:rgba(79,70,229,0.2)}' +
        '[data-theme="light"] #sticky-cta-bar{background:rgba(248,250,252,0.9);border-top-color:rgba(0,0,0,0.06)}' +
        '[data-theme="light"] #sticky-cta-link{background:#4f46e5}' +
        '[data-theme="light"] #sticky-cta-link:hover{background:#6366f1}' +
        '[data-theme="light"] .review-tag{background:#f5f5f7;border-color:rgba(0,0,0,0.06);color:#6e6e73}' +
        '[data-theme="light"] .hamburger-overlay{background:rgba(255,255,255,0.98)}' +
        '[data-theme="light"] .hamburger-overlay a{color:#1d1d1f}' +
        '[data-theme="light"] .hamburger-overlay a:hover{color:#4f46e5}' +
        '[data-theme="light"] .result-stat{background:linear-gradient(135deg,#4f46e5,#0891b2);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}' +
        '[data-theme="light"] .btn-primary{background:#4f46e5}' +
        '[data-theme="light"] .btn-primary:hover{background:#6366f1;box-shadow:0 8px 30px rgba(79,70,229,0.2)}' +
        '[data-theme="light"] .btn-ghost{border-color:rgba(0,0,0,0.12);color:#475569}' +
        '[data-theme="light"] .btn-ghost:hover{border-color:rgba(0,0,0,0.2);background:rgba(0,0,0,0.02);color:#0f172a}';

    var toggleCSS = '#theme-toggle{width:36px;height:36px;border-radius:50%;border:1px solid var(--border);background:transparent;color:var(--text-muted);font-size:1rem;cursor:pointer;z-index:1001;display:flex;align-items:center;justify-content:center;transition:color 0.3s ease,border-color 0.3s ease;line-height:1;flex-shrink:0;margin-left:0.75rem}' +
        '#theme-toggle.scrolled{position:fixed;top:auto;bottom:8.5rem;right:2rem;margin-left:0;background:var(--background);border:1px solid var(--border-light)}' +
        '#theme-toggle:hover{color:var(--text-primary);border-color:var(--border-light)}' +
        '@media(max-width:768px){#theme-toggle{position:fixed;top:1rem;right:4rem;margin-left:0;background:var(--background);border:1px solid var(--border-light)}}' +
        '@media(max-width:480px){#theme-toggle{width:34px;height:34px;font-size:0.95rem;right:3.5rem}#theme-toggle.scrolled{right:1.25rem;bottom:8rem}}';

    var style = document.createElement('style');
    style.textContent = lightCSS + toggleCSS;
    document.head.appendChild(style);

    var toggle = document.createElement('button');
    toggle.id = 'theme-toggle';
    toggle.setAttribute('aria-label', 'Toggle light/dark mode');

    var isMobile = window.innerWidth <= 768;
    var headerContainer = document.querySelector('.header-container');

    if (headerContainer && !isMobile) {
        headerContainer.appendChild(toggle);
    } else {
        document.body.appendChild(toggle);
    }

    var saved = localStorage.getItem('theme');
    var theme = saved || 'dark';
    applyTheme(theme);

    function applyTheme(t) {
        document.documentElement.setAttribute('data-theme', t);
        toggle.innerHTML = t === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF18';
        localStorage.setItem('theme', t);
    }

    toggle.addEventListener('click', function() {
        var current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
    });

    var isScrolled = false;
    window.addEventListener('scroll', function() {
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
