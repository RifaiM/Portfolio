/**
 * RIFAI - SOFTWARE DEVELOPER PORTFOLIO (2026)
 * Lightweight, Clean Interactions & Theme System
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeSystem();
    initNavbarScroll();
    initScrollProgress();
    initCopyEmail();
    initJakartaClock();
    initScrollReveals();
});

/**
 * 1. Dark / Light Theme System with Persistence
 */
function initThemeSystem() {
    const themeBtn = document.getElementById('theme-toggle');
    const storedTheme = localStorage.getItem('portfolio-theme') || 'dark';

    if (storedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }

    if (!themeBtn) return;

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        if (newTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }

        localStorage.setItem('portfolio-theme', newTheme);
    });
}

/**
 * 2. Navbar Background Adjustment on Scroll
 */
function initNavbarScroll() {
    const navbarContainer = document.querySelector('.navbar-container');
    if (!navbarContainer) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbarContainer.classList.add('scrolled');
        } else {
            navbarContainer.classList.remove('scrolled');
        }
    }, { passive: true });
}

/**
 * 3. Minimal Scroll Progress Bar
 */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function onScroll() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        if (progressBar && docHeight > 0) {
            const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
            progressBar.style.transform = `scaleX(${progress})`;
        }

        // Active nav tracking
        let currentSection = '';
        const scrollPosition = scrollTop + 160;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/**
 * 4. Email Copy-to-Clipboard Functionality
 */
function initCopyEmail() {
    const copyBtn = document.getElementById('copy-email-btn');
    const toast = document.getElementById('toast');
    const emailAddress = 'rifaialc@gmail.com';

    if (!copyBtn || !toast) return;

    copyBtn.addEventListener('click', async () => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(emailAddress);
            } else {
                const textArea = document.createElement('textarea');
                textArea.value = emailAddress;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }

            showToast();
        } catch (err) {
            console.error('Failed to copy email:', err);
        }
    });

    function showToast() {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }
}

/**
 * 5. Live Jakarta Time (WIB)
 */
function initJakartaClock() {
    const timeDisplay = document.getElementById('local-time');
    if (!timeDisplay) return;

    function updateTime() {
        const now = new Date();
        const options = {
            timeZone: 'Asia/Jakarta',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        const formatter = new Intl.DateTimeFormat('en-GB', options);
        const timeString = formatter.format(now);
        timeDisplay.textContent = `Jakarta ${timeString} WIB`;
    }

    updateTime();
    setInterval(updateTime, 1000);
}

/**
 * 6. Subtle Scroll Reveals (GSAP / ScrollTrigger)
 */
function initScrollReveals() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance
    gsap.from('.hero-content > *', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
    });

    // Project cards reveal
    gsap.utils.toArray('.project-card').forEach(card => {
        gsap.from(card, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none'
            }
        });
    });

    // About & Contact sections
    gsap.from('.about-grid', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    });

    gsap.from('.contact-card', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    });
}