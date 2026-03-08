(function() {
    var css = '.reveal{opacity:0;transform:translateY(24px);transition:opacity 0.6s cubic-bezier(0.16,1,0.3,1),transform 0.6s cubic-bezier(0.16,1,0.3,1)}' +
        '.reveal.revealed{opacity:1;transform:translateY(0)}' +
        '.reveal-delay-1{transition-delay:0.1s}' +
        '.reveal-delay-2{transition-delay:0.2s}' +
        '.reveal-delay-3{transition-delay:0.3s}' +
        '.reveal-delay-4{transition-delay:0.4s}';
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var selectors = [
        '.section-label',
        '.stage-card',
        '.result-card',
        '.writing-item',
        '.audit-section',
        '.cta-section',
        '.newsletter-section',
        '.credibility-section',
        '.review-card',
        '.capability-card',
        '.capability-item',
        '.step-card',
        '.cost-item',
        '.familiar-item',
        '.case-study-card',
        '.deliverable-item',
        '.why-item',
        '.skill-group',
        '.result-item'
    ];

    function addRevealClasses() {
        selectors.forEach(function(sel) {
            var els = document.querySelectorAll(sel);
            els.forEach(function(el, i) {
                if (!el.classList.contains('animate-fade-up') && !el.classList.contains('animate-fade-in')) {
                    el.classList.add('reveal');
                    if (sel === '.stage-card' || sel === '.result-card' || sel === '.capability-card' || sel === '.step-card') {
                        var delay = (i % 4) + 1;
                        if (delay <= 4) el.classList.add('reveal-delay-' + delay);
                    }
                }
            });
        });
    }

    function onIntersect(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(onIntersect, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

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
