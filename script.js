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

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    // Hide navbar on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

navbar.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

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
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
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
    // Add staggered delay based on index
    el.style.transitionDelay = `${index * 0.1}s`;
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
            const match = originalText.match(/(.*?)(\d+(?:,\d+)*(?:\.\d+)?)\s*(million|K|k)?(\+?)(.*)/i);
            if (match) {
                const beforeText = match[1]; // Text before the number
                const afterText = match[5]; // Text after the number
                let value = parseFloat(match[2].replace(/,/g, ''));
                const unit = match[3];
                const suffix = match[4]; // The + sign if present
                const prefix = originalText.includes('£') ? '£' : originalText.includes('$') ? '$' : '';

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
                        displayValue = prefix + (current / 1000000).toFixed(1) + ' million';
                    } else if (value >= 1000) {
                        displayValue = prefix + (current / 1000).toFixed(value >= 10000 ? 0 : 1) + 'K';
                    } else {
                        displayValue = prefix + Math.floor(current) + '%';
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

// Mobile menu toggle (for future enhancement)
function initMobileMenu() {
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');

    // Check if mobile menu doesn't exist
    if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-toggle')) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '☰';
        menuToggle.setAttribute('aria-label', 'Toggle menu');

        menuToggle.style.cssText = `
            display: block;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            color: var(--primary-color);
        `;

        navContainer.appendChild(menuToggle);

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');

            if (navLinks.classList.contains('mobile-active')) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'white';
                navLinks.style.padding = '1rem';
                navLinks.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                menuToggle.innerHTML = '✕';
            } else {
                navLinks.style.display = 'none';
                menuToggle.innerHTML = '☰';
            }
        });
    }
}

// Initialize on load and resize
if (window.innerWidth <= 768) {
    initMobileMenu();
}

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth <= 768) {
            initMobileMenu();
        } else {
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            if (mobileToggle) {
                mobileToggle.remove();
            }
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.display = '';
            navLinks.classList.remove('mobile-active');
        }
    }, 250);
});

// Console welcome message
console.log('%cSeth Forte', 'font-size: 24px; font-weight: bold; color: #667eea;');
console.log('%cAI Consultant | Software Engineer | Writer | Coach', 'font-size: 14px; color: #666;');
console.log('\nInterested in working together? Reach out at seth@fortewebdesigns.com');

// Initialize everything on DOM load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Seth Forte website loaded successfully!');

    // Add any initialization code here
    // Example: Load testimonials, initialize carousels, etc.
});
