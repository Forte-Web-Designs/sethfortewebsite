(function() {
    var lightCSS = ':root[data-theme="light"]{' +
        '--text-primary:#0f172a;' +
        '--text-secondary:#475569;' +
        '--text-muted:#94a3b8;' +
        '--accent:#0077c2;' +
        '--accent-hover:#0066aa;' +
        '--accent-warm:#2196f3;' +
        '--accent-glow:rgba(0,119,194,0.1);' +
        '--background:#f8fafc;' +
        '--background-alt:#f1f5f9;' +
        '--border:#e2e8f0;' +
        '--border-light:#cbd5e1;' +
        '--card-bg:rgba(255,255,255,0.8);' +
        '--card-bg-solid:#ffffff;' +
        '--card-hover:rgba(241,245,249,0.8);' +
        '--gradient-start:#0077c2;' +
        '--gradient-end:#2196f3}' +
        '[data-theme="light"] body{background-image:radial-gradient(ellipse at 20% 0%,rgba(0,119,194,0.04) 0%,transparent 50%),radial-gradient(ellipse at 80% 100%,rgba(33,150,243,0.03) 0%,transparent 50%)}' +
        '[data-theme="light"] .site-header{background:rgba(248,250,252,0.85)}' +
        '[data-theme="light"] .profile-photo{box-shadow:0 2px 8px rgba(0,0,0,0.1)}' +
        '[data-theme="light"] #scroll-top-btn{background:#fff;border-color:#e2e8f0;color:#94a3b8;box-shadow:0 2px 8px rgba(0,0,0,0.08)}' +
        '[data-theme="light"] #scroll-top-btn:hover{background:#0077c2;color:#fff;border-color:#0077c2}' +
        '[data-theme="light"] #sticky-cta-bar{background:#fff;border-top-color:#e2e8f0;box-shadow:0 -2px 12px rgba(0,0,0,0.06)}' +
        '[data-theme="light"] #sticky-cta-link{background:linear-gradient(135deg,#0077c2,#0066aa)}' +
        '[data-theme="light"] .credibility-item .stat{color:#0077c2;text-shadow:none}' +
        '[data-theme="light"] .result-stat{color:#0077c2}' +
        '[data-theme="light"] .review-tag{background:#f1f5f9;border-color:#e2e8f0;color:#475569}' +
        '[data-theme="light"] .hamburger-overlay{background:rgba(248,250,252,0.98)}';

    var toggleCSS = '#theme-toggle{width:36px;height:36px;border-radius:50%;border:1px solid var(--border);background:var(--card-bg-solid);color:var(--text-muted);font-size:1rem;cursor:pointer;z-index:1001;display:flex;align-items:center;justify-content:center;transition:background 0.2s ease,color 0.2s ease,border-color 0.2s ease;box-shadow:0 2px 8px rgba(0,0,0,0.2);line-height:1;flex-shrink:0;margin-left:0.75rem}' +
        '#theme-toggle.scrolled{position:fixed;top:auto;bottom:8.5rem;right:2rem;margin-left:0}' +
        '#theme-toggle:hover{background:var(--accent);color:#fff;border-color:var(--accent)}' +
        '@media(max-width:768px){#theme-toggle{position:fixed;top:1rem;right:4rem;margin-left:0}}' +
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
