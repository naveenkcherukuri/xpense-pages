// Theme management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update navbar background for dark theme
    const navbar = document.getElementById('navbar');
    if (navbar && savedTheme === 'dark') {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update navbar background
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (newTheme === 'dark') {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        }
    }
}

// Theme switcher functionality
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});

// Loading screen management
document.addEventListener('DOMContentLoaded', () => {
    const loading = document.getElementById('loading');
    if (loading) {
        // Hide loading screen after a short delay
        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const isDark = currentTheme === 'dark';
        
        if (window.scrollY > 100) {
            if (isDark) {
                navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            }
            navbar.style.boxShadow = isDark ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            if (isDark) {
                navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
            navbar.style.boxShadow = 'none';
        }
    }
});

// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Smooth scrolling for navigation links
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

// Animated counters
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = stat.getAttribute('data-target');
                if (target) {
                    const number = parseFloat(target);
                    animateCounter(stat, number);
                }
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe hero stats
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    observer.observe(heroStats);
}

// Parallax effect for gradient orbs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.1);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Interactive phone mockup
const phoneMockup = document.querySelector('.phone-mockup');
if (phoneMockup) {
    phoneMockup.addEventListener('mousemove', (e) => {
        const rect = phoneMockup.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        phoneMockup.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    phoneMockup.addEventListener('mouseleave', () => {
        phoneMockup.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
}

// Animated progress bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Animated chart bars
function animateChartBars() {
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
        const height = bar.style.height;
        bar.style.height = '0%';
        
        setTimeout(() => {
            bar.style.height = height;
        }, index * 100);
    });
}

// Trigger animations when demo section is visible
const demoSection = document.querySelector('.demo');
if (demoSection) {
    const demoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                animateChartBars();
                demoObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    demoObserver.observe(demoSection);
}

// Hover effects for feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Pricing card interactions
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('featured')) {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('featured')) {
            card.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Button click animations
document.querySelectorAll('button, .download-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    button, .download-btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});

// Floating animation for download buttons
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.animation = 'float 2s ease-in-out infinite';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.animation = 'none';
    });
});

// Particle background effect
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: particle-float ${3 + Math.random() * 4}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

// Add particle animation styles
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particle-float {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles after page load
window.addEventListener('load', () => {
    createParticles();
});

// Intersection Observer for fade-in animations
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe elements for fade-in
document.querySelectorAll('.feature-card, .pricing-card, .demo-content > div').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations here
}, 16));

// Add CSS for enhanced animations
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    .feature-card, .pricing-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .hero-title {
        background: linear-gradient(135deg, #ffd700, #ff6b6b, #4facfe);
        background-size: 200% 200%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: gradient-shift 3s ease-in-out infinite;
    }
    
    @keyframes gradient-shift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
    }
    
    .gradient-orb {
        animation: float 6s ease-in-out infinite, glow 4s ease-in-out infinite alternate;
    }
    
    @keyframes glow {
        from { filter: blur(60px) brightness(1); }
        to { filter: blur(60px) brightness(1.2); }
    }
    
    .phone-mockup {
        transition: transform 0.3s ease;
    }
    
    .download-btn {
        position: relative;
        overflow: hidden;
    }
    
    .download-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s;
    }
    
    .download-btn:hover::before {
        left: 100%;
    }
`;
document.head.appendChild(enhancedStyles);

// Console welcome message
console.log(`
%c🎉 Welcome to Xpense! 🎉
%c
%cThanks for checking out our product page!
%cBuilt with ❤️ using modern web technologies.

%cFeatures:
%c• Responsive design
%c• Smooth animations
%c• Interactive elements
%c• Modern UI/UX
%c• Performance optimized

%cVisit: https://xpense.app
`,
'color: #88304E; font-size: 20px; font-weight: bold;',
'',
'color: #FF9800; font-size: 14px;',
'color: #64748B; font-size: 12px;',
'',
'color: #333333; font-size: 12px;',
'color: #64748B; font-size: 12px;',
'color: #64748B; font-size: 12px;',
'color: #64748B; font-size: 12px;',
'color: #64748B; font-size: 12px;',
'color: #64748B; font-size: 12px;',
'',
'color: #88304E; font-size: 14px; font-weight: bold;'
);
