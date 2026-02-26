(function() {
    // Light mode CSS variable overrides
    var lightCSS = ':root[data-theme="light"]{' +
        '--text-primary:#1a1a1a;' +
        '--text-secondary:#444;' +
        '--text-muted:#666;' +
        '--accent:#4a8a9f;' +
        '--accent-warm:#c07a3e;' +
        '--background:#f5f5f5;' +
        '--background-alt:#eaeaea;' +
        '--border:#ddd;' +
        '--card-bg:#fff}' +
        '[data-theme="light"] .profile-photo{box-shadow:0 2px 8px rgba(0,0,0,0.1)}' +
        '[data-theme="light"] #scroll-top-btn{background:#fff;border-color:#ddd;color:#666;box-shadow:0 2px 8px rgba(0,0,0,0.1)}' +
        '[data-theme="light"] #scroll-top-btn:hover{background:#4a8a9f;color:#fff;border-color:#4a8a9f}' +
        '[data-theme="light"] #sticky-cta-bar{background:#fff;border-top-color:#ddd;box-shadow:0 -2px 12px rgba(0,0,0,0.08)}' +
        '[data-theme="light"] #sticky-cta-link{background:#4a8a9f}' +
        '[data-theme="light"] .credibility-item .stat{color:#1a1a1a}' +
        '[data-theme="light"] .credibility-item .label{color:#666}' +
        '[data-theme="light"] .client-row{color:#666}' +
        '[data-theme="light"] .result-stat{color:#c07a3e}' +
        '[data-theme="light"] .sidebar-email a{color:#666}' +
        '[data-theme="light"] .site-header{background:#f5f5f5;border-bottom-color:#ddd}';

    // Toggle button styles
    var toggleCSS = '#theme-toggle{position:fixed;bottom:8.5rem;right:2rem;width:44px;height:44px;border-radius:50%;border:1px solid #2a2a2a;background:#1a1a1a;color:#b0b0b0;font-size:1.1rem;cursor:pointer;z-index:1000;display:flex;align-items:center;justify-content:center;transition:opacity 0.3s ease,visibility 0.3s ease,background 0.2s ease,color 0.2s ease,border-color 0.2s ease;box-shadow:0 2px 8px rgba(0,0,0,0.3);opacity:0;visibility:hidden;line-height:1}' +
        '#theme-toggle.visible{opacity:1;visibility:visible}' +
        '#theme-toggle:hover{background:#6ba3b8;color:#fff;border-color:#6ba3b8}' +
        '[data-theme="light"] #theme-toggle{background:#fff;border-color:#ddd;color:#666;box-shadow:0 2px 8px rgba(0,0,0,0.1)}' +
        '[data-theme="light"] #theme-toggle:hover{background:#4a8a9f;color:#fff;border-color:#4a8a9f}' +
        '@media(max-width:600px){#theme-toggle{bottom:8rem;right:1.25rem;width:40px;height:40px;font-size:1rem}}';

    // Inject styles
    var style = document.createElement('style');
    style.textContent = lightCSS + toggleCSS;
    document.head.appendChild(style);

    // Create toggle button
    var toggle = document.createElement('button');
    toggle.id = 'theme-toggle';
    toggle.setAttribute('aria-label', 'Toggle light/dark mode');
    document.body.appendChild(toggle);

    // Check saved preference or default to dark
    var saved = localStorage.getItem('theme');
    var theme = saved || 'dark';
    applyTheme(theme);

    function applyTheme(t) {
        document.documentElement.setAttribute('data-theme', t);
        toggle.innerHTML = t === 'dark' ? '\u2600' : '\u263E';
        localStorage.setItem('theme', t);
    }

    toggle.addEventListener('click', function() {
        var current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
    });

    // Show/hide with scroll (same trigger as scroll-top button)
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            toggle.classList.add('visible');
        } else {
            toggle.classList.remove('visible');
        }
    });
})();
