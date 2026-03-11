(function() {
    var btn = document.createElement('button');
    btn.id = 'scroll-top-btn';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = '\u2191';
    document.body.appendChild(btn);

    var bar = document.createElement('div');
    bar.id = 'sticky-cta-bar';
    bar.innerHTML = '<a href="https://calendly.com/seth-fortewebdesigns/30min" target="_blank" rel="noopener" id="sticky-cta-link">Book a Call</a>';
    document.body.appendChild(bar);

    var style = document.createElement('style');
    style.textContent = '' +
        '#scroll-top-btn{position:fixed;bottom:5rem;right:2rem;width:40px;height:40px;border-radius:10px;border:1px solid var(--border-light,rgba(255,255,255,0.1));background:var(--surface,#141418);color:var(--text-muted,#64748b);font-size:0.875rem;cursor:pointer;opacity:0;visibility:hidden;transition:opacity 0.3s ease,visibility 0.3s ease,color 0.2s ease,border-color 0.2s ease;z-index:1000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(12px)}' +
        '#scroll-top-btn.visible{opacity:1;visibility:visible}' +
        '#scroll-top-btn:hover{color:var(--text-primary,#f0f4f8);border-color:rgba(99,102,241,0.3);background:rgba(99,102,241,0.08)}' +
        '#sticky-cta-bar{position:fixed;bottom:0;left:0;right:0;background:rgba(9,9,11,0.85);backdrop-filter:blur(16px);border-top:1px solid var(--border,rgba(255,255,255,0.06));padding:0.65rem 2rem;text-align:center;z-index:999;transform:translateY(100%);transition:transform 0.3s ease}' +
        '#sticky-cta-bar.visible{transform:translateY(0)}' +
        '#sticky-cta-link{display:inline-block;background:var(--accent,#6366f1);color:#fff;padding:0.55rem 1.75rem;border-radius:980px;font-size:0.8125rem;font-weight:500;text-decoration:none;transition:all 0.2s ease;font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif;letter-spacing:-0.01em}' +
        '#sticky-cta-link:hover{background:var(--accent-hover,#818cf8);text-decoration:none;box-shadow:0 4px 20px rgba(99,102,241,0.25)}' +
        'body{padding-bottom:3.5rem}' +
        '@media(max-width:480px){#scroll-top-btn{bottom:4.5rem;right:1.25rem;width:40px;height:40px;font-size:0.9rem}#sticky-cta-bar{padding:0.6rem 1.5rem}#sticky-cta-link{padding:0.55rem 1.5rem;font-size:0.85rem}}';
    document.head.appendChild(style);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
            bar.classList.add('visible');
        } else {
            btn.classList.remove('visible');
            bar.classList.remove('visible');
        }
    });

    function smoothScrollToTop() {
        var start = window.scrollY;
        var duration = Math.min(1200, 400 + start * 0.3);
        var startTime = null;

        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var elapsed = timestamp - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var ease = easeOutCubic(progress);
            window.scrollTo(0, start * (1 - ease));
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    btn.addEventListener('click', smoothScrollToTop);
})();
