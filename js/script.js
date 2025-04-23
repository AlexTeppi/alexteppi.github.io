// JavaScript for Forest News Website

document.addEventListener('DOMContentLoaded', function() {
    // Language Switcher
    const enBtn = document.getElementById('en-btn');
    const amBtn = document.getElementById('am-btn');
    
    enBtn.addEventListener('click', function() {
        document.body.classList.remove('amharic');
        enBtn.classList.add('active');
        amBtn.classList.remove('active');
        localStorage.setItem('language', 'english');
    });
    
    amBtn.addEventListener('click', function() {
        document.body.classList.add('amharic');
        amBtn.classList.add('active');
        enBtn.classList.remove('active');
        localStorage.setItem('language', 'amharic');
    });
    
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'amharic') {
        document.body.classList.add('amharic');
        amBtn.classList.add('active');
        enBtn.classList.remove('active');
    }
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // In a real implementation, you would send this to a server
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Email validation helper function
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Lazy loading images
    if ('IntersectionObserver' in window) {
        const imgOptions = {
            threshold: 0,
            rootMargin: "0px 0px 50px 0px"
        };
        
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                
                const img = entry.target;
                const src = img.getAttribute('data-src');
                
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }
                
                observer.unobserve(img);
            });
        }, imgOptions);
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imgObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
    }
    
    // Add animation on scroll
    if ('IntersectionObserver' in window) {
        const animOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -100px 0px"
        };
        
        const animObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            });
        }, animOptions);
        
        document.querySelectorAll('.news-card, .news-item, .section-title').forEach(el => {
            el.classList.add('anim-ready');
            animObserver.observe(el);
        });
    }
    
    // Current date for news items
    document.querySelectorAll('.date').forEach(dateEl => {
        if (dateEl.textContent.includes('Current')) {
            const now = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            dateEl.textContent = now.toLocaleDateString('en-US', options);
        }
    });
});
