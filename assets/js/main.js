/**
 * MOCHAMMAD RIFAI PORTFOLIO — GSAP ANIMATIONS & THEME SYSTEM (2026)
 * Powered by GSAP 3 & ScrollTrigger with Dark/Light Theme Switching
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeSystem();
    initNavbarScroll();
    initGSAPAnimations();
    initCopyEmail();
    initJakartaClock();
    initCard3DTilt();
});

/**
 * Dark / Light Theme System with Persistence
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

        // GSAP pulse animation on toggle
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(themeBtn, 
                { scale: 0.8, rotate: -30 }, 
                { scale: 1, rotate: 0, duration: 0.4, ease: 'back.out(2)' }
            );
        }
    });
}

/**
 * Navbar Glassmorphic background adjustment on scroll
 */
function initNavbarScroll() {
    const navbarContainer = document.querySelector('.navbar-container');
    if (!navbarContainer) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbarContainer.classList.add('scrolled');
        } else {
            navbarContainer.classList.remove('scrolled');
        }
    }, { passive: true });
}

/**
 * GSAP & ScrollTrigger Liquid Entrance & Scroll Animations
 */
function initGSAPAnimations() {
    if (typeof gsap === 'undefined') return;

    // Register ScrollTrigger plugin if available
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // 1. Hero Section Entrance Timeline
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

    heroTl
        .fromTo('.hero-badge', 
            { opacity: 0, y: 25 }, 
            { opacity: 1, y: 0, delay: 0.2 }
        )
        .fromTo('.hero-title', 
            { opacity: 0, y: 35 }, 
            { opacity: 1, y: 0 }, 
            '-=0.7'
        )
        .fromTo('.hero-subtitle', 
            { opacity: 0, y: 30 }, 
            { opacity: 1, y: 0 }, 
            '-=0.7'
        )
        .fromTo('.tag-pill', 
            { opacity: 0, scale: 0.9, y: 15 }, 
            { opacity: 1, scale: 1, y: 0, stagger: 0.06 }, 
            '-=0.6'
        )
        .fromTo('.hero-actions .btn', 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, stagger: 0.15 }, 
            '-=0.4'
        );

    // 2. ScrollTrigger for Section Headers & Ambient Glows
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.fromTo(header, 
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: header,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // 3. Project Cards Entrance & Image Parallax Effect
        gsap.utils.toArray('.project-card').forEach((card, index) => {
            gsap.fromTo(card,
                { opacity: 0, y: 60, scale: 0.96 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );

            // Subtle Parallax effect on project images inside card
            const img = card.querySelector('.media-frame img');
            if (img) {
                gsap.fromTo(img,
                    { yPercent: -8 },
                    {
                        yPercent: 8,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true
                        }
                    }
                );
            }
        });

        // 4. About Section & Skill Cards Stagger Reveal
        gsap.fromTo('.about-main', 
            { opacity: 0, x: -40 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.about-section',
                    start: 'top 80%'
                }
            }
        );

        gsap.fromTo('.skill-card',
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.about-cards',
                    start: 'top 85%'
                }
            }
        );

        // 5. Contact Box Glow & Entrance
        gsap.fromTo('.contact-box',
            { opacity: 0, y: 50, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.contact-section',
                    start: 'top 80%'
                }
            }
        );
    }
}

/**
 * Email Copy-to-Clipboard functionality with Toast notification
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
        }, 3000);
    }
}

/**
 * Live Jakarta (WIB) Digital Clock
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
            second: '2-digit',
            hour12: false
        };
        const formatter = new Intl.DateTimeFormat('en-GB', options);
        const timeString = formatter.format(now);
        timeDisplay.textContent = `Jakarta (WIB) — ${timeString}`;
    }

    updateTime();
    setInterval(updateTime, 1000);
}

/**
 * Subtle 3D Card Parallax Tilt on Hover
 */
function initCard3DTilt() {
    const cards = document.querySelectorAll('.project-card');
    if (window.matchMedia('(pointer: coarse)').matches) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 45;
            const rotateY = (centerX - x) / 45;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
}