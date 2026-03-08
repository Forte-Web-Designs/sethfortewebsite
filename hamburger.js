(function() {
    var style = document.createElement('style');
    style.textContent = '' +
        '.hamburger-btn{display:none;position:fixed;top:1rem;right:1rem;width:40px;height:40px;border-radius:var(--radius-sm,8px);border:1px solid var(--border);background:var(--card-bg-solid);color:var(--text-primary);font-size:1.25rem;cursor:pointer;z-index:1002;align-items:center;justify-content:center;transition:background 0.2s ease,color 0.2s ease;box-shadow:0 2px 8px rgba(0,0,0,0.2);line-height:1}' +
        '.hamburger-btn:hover{background:var(--accent);color:#fff;border-color:var(--accent)}' +
        '.hamburger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(10,14,23,0.98);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);z-index:1001;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.5rem;opacity:0;visibility:hidden;transition:opacity 0.3s ease,visibility 0.3s ease}' +
        '.hamburger-overlay.open{opacity:1;visibility:visible}' +
        '.hamburger-overlay a{color:var(--text-primary);font-size:1.25rem;font-weight:500;padding:0.75rem 2rem;border-radius:var(--radius-sm,8px);transition:background 0.2s ease,color 0.2s ease;text-decoration:none;font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif}' +
        '.hamburger-overlay a:hover{background:rgba(255,255,255,0.05);color:var(--accent)}' +
        '.hamburger-close{position:absolute;top:1rem;right:1rem;width:40px;height:40px;border-radius:var(--radius-sm,8px);border:1px solid var(--border);background:transparent;color:var(--text-primary);font-size:1.5rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background 0.2s ease}' +
        '.hamburger-close:hover{background:rgba(255,255,255,0.05)}' +
        '@media(max-width:768px){.hamburger-btn{display:flex}.header-nav{display:none !important}}';
    document.head.appendChild(style);

    var hamburger = document.createElement('button');
    hamburger.className = 'hamburger-btn';
    hamburger.setAttribute('aria-label', 'Open menu');
    hamburger.innerHTML = '\u2630';
    document.body.appendChild(hamburger);

    var overlay = document.createElement('div');
    overlay.className = 'hamburger-overlay';

    var closeBtn = document.createElement('button');
    closeBtn.className = 'hamburger-close';
    closeBtn.setAttribute('aria-label', 'Close menu');
    closeBtn.innerHTML = '\u2715';
    overlay.appendChild(closeBtn);

    var navLinks = document.querySelectorAll('.header-nav a');
    navLinks.forEach(function(link) {
        var clone = link.cloneNode(true);
        overlay.appendChild(clone);
    });

    document.body.appendChild(overlay);

    hamburger.addEventListener('click', function() {
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', function() {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    });

    overlay.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('open')) {
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
})();
