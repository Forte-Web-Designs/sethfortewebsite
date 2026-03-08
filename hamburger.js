(function() {
    var style = document.createElement('style');
    style.textContent = '' +
        '.hamburger-btn{display:none;position:fixed;top:0.75rem;right:1rem;width:40px;height:40px;border-radius:50%;border:1px solid var(--border-light,rgba(255,255,255,0.12));background:var(--background,#0a0e17);color:var(--text-primary,#f0f4f8);font-size:1.25rem;cursor:pointer;z-index:1002;align-items:center;justify-content:center;transition:color 0.3s ease,border-color 0.3s ease;line-height:1}' +
        '.hamburger-btn:hover{color:var(--accent);border-color:var(--accent)}' +
        '.hamburger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(10,14,23,0.98);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);z-index:1001;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.75rem;opacity:0;visibility:hidden;transition:opacity 0.3s ease,visibility 0.3s ease}' +
        '.hamburger-overlay.open{opacity:1;visibility:visible}' +
        '.hamburger-overlay a{color:var(--text-primary,#f0f4f8);font-size:1.5rem;font-weight:500;padding:0.75rem 2rem;transition:color 0.3s ease;text-decoration:none;font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif;letter-spacing:-0.01em}' +
        '.hamburger-overlay a:hover{color:var(--accent)}' +
        '.hamburger-close{position:absolute;top:0.75rem;right:1rem;width:40px;height:40px;border-radius:50%;border:1px solid var(--border-light,rgba(255,255,255,0.12));background:transparent;color:var(--text-primary,#f0f4f8);font-size:1.5rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:color 0.3s ease,border-color 0.3s ease}' +
        '.hamburger-close:hover{color:var(--accent);border-color:var(--accent)}' +
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
