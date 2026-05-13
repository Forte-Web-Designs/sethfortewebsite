(function() {
    var style = document.createElement('style');
    style.textContent = '' +
        '.hamburger-btn{display:none;position:fixed;top:0.75rem;right:1rem;width:40px;height:40px;border-radius:50%;border:0.5px solid var(--border-light);background:var(--background);color:var(--text-primary);font-size:1.25rem;cursor:pointer;z-index:1002;align-items:center;justify-content:center;transition:color 0.2s ease,border-color 0.2s ease,opacity 0.2s ease;line-height:1;padding:0}' +
        '.hamburger-btn:hover{color:var(--accent);border-color:var(--accent)}' +
        '.hamburger-btn.is-open{opacity:0;pointer-events:none;visibility:hidden}' +
        '.hamburger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:var(--background);z-index:1003;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.5rem;opacity:0;visibility:hidden;transition:opacity 0.25s ease,visibility 0.25s ease}' +
        '[data-theme="dark"] .hamburger-overlay{background:#1d1d1f}' +
        '.hamburger-overlay.open{opacity:1;visibility:visible}' +
        '.hamburger-overlay a{color:var(--text-primary);font-size:1.5rem;font-weight:500;padding:0.75rem 2rem;transition:color 0.2s ease,opacity 0.2s ease;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display",Inter,sans-serif;letter-spacing:-0.015em;opacity:0.85}' +
        '.hamburger-overlay a:hover,.hamburger-overlay a:active{color:var(--accent);opacity:1}' +
        '.hamburger-overlay a *,.hamburger-overlay a span{color:var(--text-primary)!important;-webkit-text-fill-color:var(--text-primary)!important;background:none!important;background-clip:unset!important;-webkit-background-clip:unset!important}' +
        '.hamburger-close{position:fixed;top:0.75rem;right:1rem;width:40px;height:40px;border-radius:50%;border:0.5px solid var(--border-light);background:var(--background);color:var(--text-primary);font-size:1.25rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:color 0.2s ease,border-color 0.2s ease;z-index:1004;padding:0}' +
        '.hamburger-close:hover,.hamburger-close:active{color:var(--accent);border-color:var(--accent)}' +
        '[data-theme="dark"] .hamburger-close{background:#2a2a2c;color:#f5f5f7;border-color:rgba(255,255,255,0.16)}' +
        '@media(max-width:768px){.hamburger-btn{display:flex}.header-nav{display:none !important}}';
    document.head.appendChild(style);

    var hamburger = document.createElement('button');
    hamburger.className = 'hamburger-btn';
    hamburger.type = 'button';
    hamburger.setAttribute('aria-label', 'Open menu');
    hamburger.innerHTML = '☰';
    document.body.appendChild(hamburger);

    var overlay = document.createElement('div');
    overlay.className = 'hamburger-overlay';

    var closeBtn = document.createElement('button');
    closeBtn.className = 'hamburger-close';
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', 'Close menu');
    closeBtn.innerHTML = '✕';
    overlay.appendChild(closeBtn);

    var navLinks = document.querySelectorAll('.header-nav a');
    navLinks.forEach(function(link) {
        var clone = link.cloneNode(true);
        overlay.appendChild(clone);
    });

    document.body.appendChild(overlay);

    function openMenu() {
        overlay.classList.add('open');
        hamburger.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        overlay.classList.remove('open');
        hamburger.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        openMenu();
    });

    closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeMenu();
    });

    // Close when tapping a link
    overlay.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' || e.target.closest('a')) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('open')) {
            closeMenu();
        }
    });
})();
