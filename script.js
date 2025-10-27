// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Update icon states on load
updateThemeIcons(currentTheme);

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcons(newTheme);
});

function updateThemeIcons(theme) {
    if (theme === 'dark') {
        sunIcon.classList.remove('active');
        moonIcon.classList.add('active');
    } else {
        moonIcon.classList.remove('active');
        sunIcon.classList.add('active');
    }
}

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Newsletter subscription handler
const subscribeBtn = document.querySelector('.subscribe-btn');
const emailInput = document.querySelector('.email-input');

if (subscribeBtn && emailInput) {
    subscribeBtn.addEventListener('click', handleSubscription);
    emailInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSubscription();
        }
    });
}

function handleSubscription() {
    const email = emailInput.value.trim();

    if (email && validateEmail(email)) {
        // Replace with your actual subscription logic (Mailchimp, ConvertKit, etc.)
        console.log('Subscribing email:', email);

        // Show success message
        subscribeBtn.textContent = 'Subscribed!';
        subscribeBtn.style.background = '#10b981';
        emailInput.value = '';

        setTimeout(() => {
            subscribeBtn.textContent = 'Subscribe';
            subscribeBtn.style.background = '';
        }, 3000);

        // Here you would typically make an API call to your email service
        // Example: fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) })
    } else {
        emailInput.style.borderColor = '#ef4444';
        emailInput.placeholder = 'Please enter a valid email';

        setTimeout(() => {
            emailInput.style.borderColor = '';
            emailInput.placeholder = 'Enter your email for insights & updates';
        }, 3000);
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Blog category filtering
const categoryButtons = document.querySelectorAll('.category-btn');
const blogCards = document.querySelectorAll('.blog-card');

categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
        const category = this.getAttribute('data-category');

        // Update active state
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Filter blog cards
        blogCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');

            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                // Fade in animation
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    card.style.opacity = '1';
                }, 10);
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// CTA Button handlers
const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .cta-btn-nav');
ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const buttonText = this.textContent.trim().toLowerCase();

        if (buttonText.includes('schedule') || buttonText.includes('call') || buttonText.includes('talk')) {
            // Replace with your actual scheduling link (Calendly, etc.)
            console.log('Opening scheduling page...');
            // window.location.href = 'https://calendly.com/yourlink';
            alert('Scheduling functionality - integrate with Calendly or similar service');
        } else if (buttonText.includes('work') || buttonText.includes('see')) {
            // Scroll to work section
            const workSection = document.querySelector('#work');
            if (workSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                window.scrollTo({
                    top: workSection.offsetTop - navHeight - 20,
                    behavior: 'smooth'
                });
            }
        } else if (buttonText.includes('contact') || buttonText.includes('message')) {
            // Replace with your contact form or email
            console.log('Opening contact...');
            window.location.href = 'mailto:seth@fortewebdesigns.com';
        } else if (buttonText.includes('resume') || buttonText.includes('download')) {
            // Replace with your actual resume PDF path
            console.log('Downloading resume...');
            alert('Add your resume PDF to the project and update this link');
            // window.open('/path/to/resume.pdf', '_blank');
        }
    });
});

// Navbar scroll effect - Always visible with backdrop blur
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class for backdrop blur effect
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

navbar.style.transition = 'box-shadow 0.3s ease, background-color 0.3s ease';

// Blog card click handlers
blogCards.forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('h3').textContent;
        console.log('Navigate to blog post:', title);

        // Replace with actual blog post navigation
        // const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        // window.location.href = `/blog/${slug}`;

        alert('Blog post navigation - implement routing to individual blog posts');
    });
});

// Modern Intersection Observer for scroll animations
const modernObserverOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -100px 0px'
};

const modernObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            modernObserver.unobserve(entry.target);
        }
    });
}, modernObserverOptions);

// Observe all elements that should animate on scroll
const animatedElements = document.querySelectorAll('.case-study-item, .service-item-new, .process-step, .testimonial, .who-for, .who-not, .intro-section, .credibility-section, .pricing-section, .writing-section, .cta-section-main, .about-section-new');
animatedElements.forEach((el, index) => {
    // Remove staggered delay for faster appearance
    modernObserver.observe(el);
});

// Number counting animation for case study metrics
function animateNumber(element, target, duration = 2000, suffix = '') {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        // Format the number based on size
        let displayValue;
        if (target >= 1000000) {
            displayValue = (current / 1000000).toFixed(1) + 'M';
        } else if (target >= 1000) {
            displayValue = (current / 1000).toFixed(target >= 10000 ? 0 : 1) + 'K';
        } else {
            displayValue = Math.floor(current);
        }

        element.textContent = displayValue + suffix;
    }, 16);
}

// Intersection Observer for number counting
const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const originalText = entry.target.textContent;

            // Parse numbers from text and preserve surrounding context
            const match = originalText.match(/(.*?)(£|\$)?(\d+(?:,\d+)*(?:\.\d+)?)\s*(million|K|k)?(\+?)(.*)/i);
            if (match) {
                const beforeText = match[1]; // Text before the number
                const currencySymbol = match[2] || ''; // £ or $ if present
                const afterText = match[6]; // Text after the number
                let value = parseFloat(match[3].replace(/,/g, ''));
                const unit = match[4];
                const suffix = match[5]; // The + sign if present

                if (unit && unit.toLowerCase() === 'million') {
                    value = value * 1000000;
                } else if (unit && (unit.toLowerCase() === 'k')) {
                    value = value * 1000;
                }

                // Animate the number
                let current = 0;
                const increment = value / 100;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= value) {
                        current = value;
                        clearInterval(timer);
                    }

                    let displayValue;
                    if (value >= 1000000) {
                        displayValue = currencySymbol + (current / 1000000).toFixed(1) + ' million';
                    } else if (value >= 1000) {
                        displayValue = currencySymbol + (current / 1000).toFixed(value >= 10000 ? 0 : 1) + 'K';
                    } else {
                        displayValue = Math.floor(current) + '%';
                    }

                    // Preserve the surrounding text
                    entry.target.textContent = beforeText + displayValue + suffix + afterText;
                }, 20);
            }

            numberObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe all case study result items with numbers
const numberElements = document.querySelectorAll('.case-study-results li, .case-study-timeline, .pricing-proof, .credibility-truth');
numberElements.forEach(el => {
    if (/\d/.test(el.textContent)) {
        numberObserver.observe(el);
    }
});

// Project/case study link handlers
const projectLinks = document.querySelectorAll('.project-link, .case-study-link');
projectLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const projectName = this.closest('.flagship-project, .case-study-card')
            .querySelector('h3, h4').textContent;

        console.log('Navigate to project:', projectName);

        // Replace with actual project page navigation
        alert(`Project page for: ${projectName}\n\nCreate individual pages for each project/case study`);
    });
});

// Add "View All Articles" button handler
const viewAllBtn = document.querySelector('.blog-cta .btn-outline');
if (viewAllBtn) {
    viewAllBtn.addEventListener('click', function() {
        console.log('Navigate to all articles page');
        // Replace with actual blog archive page
        // window.location.href = '/blog';
        alert('Blog archive page - create a dedicated blog listing page');
    });
}

// Keyboard accessibility improvements
document.addEventListener('keydown', function(e) {
    // ESC key to close modals (if you add them)
    if (e.key === 'Escape') {
        // Close any open modals
        console.log('ESC pressed');
    }
});

// Track CTA clicks (for analytics)
function trackCTAClick(ctaName) {
    console.log('CTA clicked:', ctaName);

    // Add your analytics tracking here
    // Example: gtag('event', 'cta_click', { cta_name: ctaName });
    // Example: plausible('CTA Click', { props: { name: ctaName } });
}

// Add tracking to all CTA buttons
document.querySelectorAll('[class*="btn"]').forEach(btn => {
    btn.addEventListener('click', function() {
        const ctaName = this.textContent.trim();
        trackCTAClick(ctaName);
    });
});

// Performance optimization: Lazy load images (when you add them)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Mobile menu toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!menuToggle || !navLinks) return;

    // Add click handler to existing menu toggle
    menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.classList.toggle('mobile-active');

        if (navLinks.classList.contains('mobile-active')) {
            menuToggle.innerHTML = '✕';
            menuToggle.setAttribute('aria-expanded', 'true');
        } else {
            menuToggle.innerHTML = '☰';
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu when a nav link is clicked
    const navLinkItems = navLinks.querySelectorAll('a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('mobile-active')) {
                navLinks.classList.remove('mobile-active');
                menuToggle.innerHTML = '☰';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container') && navLinks.classList.contains('mobile-active')) {
            navLinks.classList.remove('mobile-active');
            menuToggle.innerHTML = '☰';
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
});

// Clean up menu state on resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.mobile-menu-toggle');

        if (window.innerWidth > 768 && navLinks) {
            navLinks.classList.remove('mobile-active');
            if (menuToggle) {
                menuToggle.innerHTML = '☰';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    }, 250);
});

// Console welcome message
console.log('%cSeth Forte', 'font-size: 24px; font-weight: bold; color: #667eea;');
console.log('%cAI Consultant | Software Engineer | Writer | Coach', 'font-size: 14px; color: #666;');
console.log('\nInterested in working together? Reach out at seth@fortewebdesigns.com');

// ============================================
// MODERN SCROLL ANIMATIONS (Apple/Claude.ai)
// ============================================

// Enhanced Intersection Observer for smooth scroll reveals
const scrollRevealOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const scrollRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay for child elements
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';

            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);

            scrollRevealObserver.unobserve(entry.target);
        }
    });
}, scrollRevealOptions);

// Observe sections for scroll reveal
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        scrollRevealObserver.observe(section);
    });
});

// Parallax effect for images on scroll
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;

    // Parallax for article images
    const articleImages = document.querySelectorAll('.article-image');
    articleImages.forEach(img => {
        const rect = img.getBoundingClientRect();
        const scrollPercent = (rect.top - window.innerHeight) / (rect.height + window.innerHeight);
        const translateY = scrollPercent * 50;

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            img.style.transform = `translateY(${translateY}px)`;
        }
    });

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Smooth scale animation for case study cards on hover
document.querySelectorAll('.case-study-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Button ripple effect on click
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            top: ${y}px;
            left: ${x}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth counter animation for numbers in results
// DISABLED - Conflicts with green highlighting for key results
function animateCounters() {
    // Counter animation disabled to preserve green highlighting on key metrics
    // The highlight-result spans would be removed by textContent replacement
    return;
}

// Initialize everything on DOM load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Seth Forte website loaded successfully!');

    // Initialize counter animations
    animateCounters();

    // Add smooth focus states for accessibility
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--accent-color)';
            this.style.outlineOffset = '4px';
        });

        element.addEventListener('blur', function() {
            this.style.outline = '';
        });
    });
});
