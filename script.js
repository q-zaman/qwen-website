// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ===== Custom Cursor =====
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });
    gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15
    });
});

// Hover effects for cursor
const hoverElements = document.querySelectorAll('a, button, .product-card');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(follower, { scale: 1.5, duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(follower, { scale: 1, duration: 0.3 });
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Menu Toggle =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== Hero Section Animations =====
const heroTl = gsap.timeline();

heroTl.to('.title-line', {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power4.out'
})
.to('.hero-subtitle', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out'
}, '-=0.5')
.to('.hero-buttons', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out'
}, '-=0.6')
.from('.hero-image', {
    opacity: 0,
    x: 50,
    duration: 1.2,
    ease: 'power3.out'
}, '-=1');

// ===== Product Filter =====
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        productCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                gsap.to(card, {
                    opacity: 1,
                    scale: 1,
                    display: 'block',
                    duration: 0.4,
                    ease: 'power2.out'
                });
            } else {
                gsap.to(card, {
                    opacity: 0,
                    scale: 0.8,
                    display: 'none',
                    duration: 0.4,
                    ease: 'power2.out'
                });
            }
        });
    });
});

// ===== GSAP Scroll Animations =====

// Fade up animations for section headers
gsap.utils.toArray('.gsap-fade-up').forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    });
});

// Product cards stagger animation
gsap.from('.gsap-product', {
    scrollTrigger: {
        trigger: '.products-grid',
        start: 'top 75%'
    },
    opacity: 0,
    y: 60,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out'
});

// Story section animations
gsap.from('.gsap-story-left', {
    scrollTrigger: {
        trigger: '.story-container',
        start: 'top 70%'
    },
    opacity: 0,
    x: -50,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.gsap-story-right', {
    scrollTrigger: {
        trigger: '.story-container',
        start: 'top 70%'
    },
    opacity: 0,
    x: 50,
    duration: 1,
    ease: 'power3.out',
    delay: 0.2
});

// Testimonial cards
gsap.from('.gsap-testimonial', {
    scrollTrigger: {
        trigger: '.testimonial-slider',
        start: 'top 75%'
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
});

// Newsletter section
gsap.from('.gsap-newsletter', {
    scrollTrigger: {
        trigger: '.newsletter',
        start: 'top 75%'
    },
    opacity: 0,
    scale: 0.9,
    duration: 1,
    ease: 'power3.out'
});

// ===== Counter Animation for Stats =====
const statNumbers = document.querySelectorAll('.stat-number');

statNumbers.forEach(stat => {
    const target = parseInt(stat.dataset.target);
    
    ScrollTrigger.create({
        trigger: stat,
        start: 'top 80%',
        once: true,
        onEnter: () => {
            gsap.to(stat, {
                innerText: target,
                duration: 2,
                snap: { innerText: 1 },
                ease: 'power2.out',
                onUpdate: function() {
                    if (target >= 1000) {
                        stat.innerText = Math.ceil(this.targets()[0].innerText).toLocaleString();
                    } else {
                        stat.innerText = Math.ceil(this.targets()[0].innerText);
                    }
                }
            });
        }
    });
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ===== Add to Cart Animation =====
const addToCartBtns = document.querySelectorAll('.add-to-cart');
const cartCount = document.querySelector('.cart-count');
let count = 0;

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        count++;
        cartCount.innerText = count;
        
        // Button animation
        gsap.fromTo(btn, 
            { scale: 1 },
            { scale: 1.3, duration: 0.2, yoyo: true, repeat: 1 }
        );
        
        // Cart icon pulse
        gsap.fromTo('.cart-btn',
            { scale: 1 },
            { scale: 1.2, duration: 0.3, yoyo: true, repeat: 1 }
        );
    });
});

// ===== Quick View Modal (Simple Implementation) =====
const quickViewBtns = document.querySelectorAll('.quick-view');

quickViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const productCard = btn.closest('.product-card');
        const productName = productCard.querySelector('.product-name').innerText;
        alert(`Quick view for: ${productName}\n(Full modal implementation would go here)`);
    });
});

// ===== Theme Toggle (Light/Dark) =====
const themeToggle = document.querySelector('.theme-toggle');
let isDarkTheme = false;

themeToggle.addEventListener('click', () => {
    isDarkTheme = !isDarkTheme;
    const icon = themeToggle.querySelector('i');
    
    if (isDarkTheme) {
        document.body.style.background = '#1a1a2e';
        document.body.style.color = '#fff';
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        document.body.style.background = '#FFF8F0';
        document.body.style.color = '#1A1A2E';
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// ===== Newsletter Form Submission =====
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    // Simple validation
    if (email) {
        const btn = newsletterForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Subscribed!';
        btn.style.background = 'linear-gradient(135deg, #D4AF37, #F4E5B0)';
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = '';
            newsletterForm.reset();
        }, 3000);
    }
});

// ===== Parallax Effect for Hero Image =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage && scrolled < window.innerHeight) {
        gsap.to(heroImage, {
            y: scrolled * 0.3,
            duration: 0.5,
            ease: 'power2.out'
        });
    }
});

console.log('RitaShoe website loaded successfully! 🐱👑');
