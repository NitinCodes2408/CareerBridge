// Intersection observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Unobserve to trigger only once
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.scroll-anim, .zoom-in');
    animatedElements.forEach(el => observer.observe(el));
});

// Sticky navbar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('bx-menu');
        icon.classList.add('bx-x');
    } else {
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu');
    }
});

// Close mobile menu on link click
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('bx-x');
            icon.classList.add('bx-menu');
        }
    });
});

// FAQ Accordion Logic
const faqHeaders = document.querySelectorAll('.faq-header');
faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const faqItem = header.parentElement;
        
        // Close other open faqs
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });

        // Toggle clicked faq
        faqItem.classList.toggle('active');
    });
});

// Form submission handler (prevent default)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple success state simulation
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Application Submitted!';
        submitBtn.style.backgroundColor = '#10B981'; // Success green
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.backgroundColor = '';
        }, 3000);
    });
}
