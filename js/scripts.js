/**
 * Chalet Miage Website JavaScript
 * Contemporary Mountain Chalet in Saint Gervais Les Bains
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================================================
    // Smooth Scrolling Animation on Scroll
    // ==========================================================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // ==========================================================================
    // Interactive Hover Effects
    // ==========================================================================
    
    document.querySelectorAll('.feature-card, .activity-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // ==========================================================================
    // Mobile Navigation Toggle (for future mobile menu)
    // ==========================================================================
    
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // ==========================================================================
    // Smooth Scroll for Navigation Links
    // ==========================================================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==========================================================================
    // Loading Animation for Images
    // ==========================================================================
    
    const images = document.querySelectorAll('.story-image');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Add loading state
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
    });

    // ==========================================================================
    // Contact Form Enhancement (for future contact form)
    // ==========================================================================
    
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Form submission logic will go here
            console.log('Form submitted - ready for integration');
        });
    }

    // ==========================================================================
    // Performance: Lazy Loading Images (for future optimization)
    // ==========================================================================
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ==========================================================================
    // Console Welcome Message
    // ==========================================================================
    
    console.log('🏔️ Welcome to Chalet Miage - Contemporary Mountain Design');
    console.log('🎿 Saint Gervais Les Bains, French Alps');
    console.log('📧 info@chaletmiage.com');
    
});
