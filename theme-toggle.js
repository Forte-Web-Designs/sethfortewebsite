(function() {
    // Light mode CSS variable overrides
    var lightCSS = ':root[data-theme="light"]{' +
        '--text-primary:#1a1a1a;' +
        '--text-secondary:#444;' +
        '--text-muted:#666;' +
        '--accent:#d4603a;' +
        '--accent-warm:#c8922e;' +
        '--background:#faf8f5;' +
        '--background-alt:#f0ece6;' +
        '--border:#e0dbd3;' +
        '--card-bg:#fff}' +
        '[data-theme="light"] .profile-photo{box-shadow:0 2px 8px rgba(0,0,0,0.1)}' +
        '[data-theme="light"] #scroll-top-btn{background:#fff;border-color:#e0dbd3;color:#666;box-shadow:0 2px 8px rgba(0,0,0,0.1)}' +
        '[data-theme="light"] #scroll-top-btn:hover{background:#d4603a;color:#fff;border-color:#d4603a}' +
        '[data-theme="light"] #sticky-cta-bar{background:#fff;border-top-color:#e0dbd3;box-shadow:0 -2px 12px rgba(0,0,0,0.08)}' +
        '[data-theme="light"] #sticky-cta-link{background:#d4603a}' +
        '[data-theme="light"] .credibility-item .stat{color:#d4603a;text-shadow:0 0 15px rgba(212,96,58,0.15)}' +
        '[data-theme="light"] .credibility-item .label{color:#666}' +
        '[data-theme="light"] .client-row{color:#666}' +
        '[data-theme="light"] .result-stat{color:#c8922e}' +
        '[data-theme="light"] .sidebar-email a{color:#666}' +
        '[data-theme="light"] .site-header{background:#faf8f5;border-bottom-color:#e0dbd3}' +
        '[data-theme="light"] body{background-image:radial-gradient(ellipse at 20% 0%,rgba(212,96,58,0.04) 0%,transparent 50%),radial-gradient(ellipse at 80% 100%,rgba(200,146,46,0.03) 0%,transparent 50%)}' +
        '[data-theme="light"] .review-tag{background:#f0ece6;border-color:#d8d2cb;color:#555}';

    // Toggle button styles
    var toggleCSS = '#theme-toggle{width:36px;height:36px;border-radius:50%;border:1px solid #2b2f3d;background:#1c1f2b;color:#b8b2a8;font-size:1rem;cursor:pointer;z-index:1001;display:flex;align-items:center;justify-content:center;transition:background 0.2s ease,color 0.2s ease,border-color 0.2s ease;box-shadow:0 2px 8px rgba(0,0,0,0.3);line-height:1;flex-shrink:0;margin-left:1rem}' +
        '#theme-toggle.scrolled{position:fixed;top:auto;bottom:8.5rem;right:2rem;margin-left:0}' +
        '#theme-toggle:hover{background:#e8734a;color:#fff;border-color:#e8734a}' +
        '[data-theme="light"] #theme-toggle{background:#fff;border-color:#e0dbd3;color:#666;box-shadow:0 2px 8px rgba(0,0,0,0.1)}' +
        '[data-theme="light"] #theme-toggle:hover{background:#d4603a;color:#fff;border-color:#d4603a}' +
        '@media(max-width:900px){#theme-toggle{position:fixed;top:1rem;right:1rem;margin-left:0}}' +
        '@media(max-width:600px){#theme-toggle{width:34px;height:34px;font-size:0.95rem}#theme-toggle.scrolled{right:1.25rem;bottom:8rem}}';

    // Inject styles
    var style = document.createElement('style');
    style.textContent = lightCSS + toggleCSS;
    document.head.appendChild(style);

    // Create toggle button
    var toggle = document.createElement('button');
    toggle.id = 'theme-toggle';
    toggle.setAttribute('aria-label', 'Toggle light/dark mode');

    var isMobile = window.innerWidth <= 900;
    var headerContainer = document.querySelector('.header-container');

    // On mobile the site-header is display:none, so always place on body
    if (headerContainer && !isMobile) {
        headerContainer.appendChild(toggle);
    } else {
        document.body.appendChild(toggle);
    }

    // Check saved preference or default to dark
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

    // Move toggle position based on scroll
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
