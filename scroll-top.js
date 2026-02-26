(function() {
    // Create the button
    var btn = document.createElement('button');
    btn.id = 'scroll-top-btn';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = '&#9650;';
    document.body.appendChild(btn);

    // Inject styles
    var style = document.createElement('style');
    style.textContent = '#scroll-top-btn{position:fixed;bottom:2rem;right:2rem;width:44px;height:44px;border-radius:50%;border:1px solid #2a2a2a;background:#1a1a1a;color:#b0b0b0;font-size:1rem;cursor:pointer;opacity:0;visibility:hidden;transition:opacity 0.3s ease,visibility 0.3s ease,background 0.2s ease,color 0.2s ease;z-index:999;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.3)}#scroll-top-btn.visible{opacity:1;visibility:visible}#scroll-top-btn:hover{background:#6ba3b8;color:#fff;border-color:#6ba3b8}@media(max-width:600px){#scroll-top-btn{bottom:1.25rem;right:1.25rem;width:40px;height:40px;font-size:0.9rem}}';
    document.head.appendChild(style);

    // Show/hide on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    // Smooth scroll to top on click
    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();
