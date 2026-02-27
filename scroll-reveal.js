(function() {
    // Inject styles for scroll reveal
    var css = '.reveal{opacity:0;transform:translateY(30px);transition:opacity 0.7s ease,transform 0.7s ease}' +
        '.reveal.visible{opacity:1;transform:translateY(0)}' +
        '.reveal-delay-1{transition-delay:0.1s}' +
        '.reveal-delay-2{transition-delay:0.2s}' +
        '.reveal-delay-3{transition-delay:0.3s}';
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    // Elements to observe - target sections and cards
    var selectors = [
        '.section-title',
        '.stage-card',
        '.result-card',
        '.writing-item',
        '.audit-section',
        '.cta-section',
        '.newsletter-section',
        '.credibility-section',
        '.section-divider'
    ];

    function addRevealClasses() {
        selectors.forEach(function(sel) {
            var els = document.querySelectorAll(sel);
            els.forEach(function(el, i) {
                // Don't add to elements that already have animate classes
                if (!el.classList.contains('animate-fade-up') && !el.classList.contains('animate-fade-in')) {
                    el.classList.add('reveal');
                    // Stagger cards in grids
                    if (sel === '.stage-card' || sel === '.result-card') {
                        var delay = (i % 3) + 1;
                        if (delay <= 3) el.classList.add('reveal-delay-' + delay);
                    }
                }
            });
        });
    }

    function onIntersect(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }

    // Use IntersectionObserver for performant scroll detection
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(onIntersect, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Wait for DOM to be ready
        function init() {
            addRevealClasses();
            document.querySelectorAll('.reveal').forEach(function(el) {
                observer.observe(el);
            });
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    }
})();
