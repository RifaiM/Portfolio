/**
 * RIFAI PORTFOLIO — GSAP ANIMATIONS & INTERACTION SYSTEM (2026)
 * Powered by GSAP 3 & ScrollTrigger with Dark/Light Theme Switching
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeSystem();
    initNavbarScroll();
    initScrollProgressAndActiveNav();
    initGSAPAnimations();
    initWordFlipper();
    initStatCounters();
    initAmbientGlowFloating();
    initMagneticButtons();
    initSpotlightCards();
    initCopyEmail();
    initJakartaClock();
    initCard3DTilt();
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
 * 2. Navbar Glassmorphic Background Adjustment on Scroll
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
 * 3. Scroll Progress Indicator & Active Section Nav Highlight
 */
function initScrollProgressAndActiveNav() {
    const progressBar = document.getElementById('scroll-progress');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function onScroll() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Progress bar calculation
        if (progressBar && docHeight > 0) {
            const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
            progressBar.style.transform = `scaleX(${progress})`;
        }

        // Active navigation link tracking
        let currentSection = '';
        const scrollPosition = scrollTop + 180;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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
 * 4. GSAP & ScrollTrigger Entrance & Scroll Animations
 */
function initGSAPAnimations() {
    if (typeof gsap === 'undefined') return;

    // Register ScrollTrigger plugin if available
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // Hero Section Entrance Timeline
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

    // ScrollTrigger for Section Headers
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

        // Project Cards Entrance & Image Parallax Effect
        gsap.utils.toArray('.project-card').forEach((card) => {
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

            // Parallax effect on project images inside card
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

        // About Section & Skill Cards Stagger Reveal
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

        // Contact Box Entrance
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
 * 5. Animated Counter Numbers for Stats
 */
function initStatCounters() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const stats = document.querySelectorAll('.stat-number[data-target]');
    if (!stats.length) return;

    ScrollTrigger.create({
        trigger: '.about-stats',
        start: 'top 85%',
        once: true,
        onEnter: () => {
            stats.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'), 10) || 0;
                const prefix = stat.getAttribute('data-prefix') || '';
                const suffix = stat.getAttribute('data-suffix') || '';

                const obj = { val: 0 };
                gsap.to(obj, {
                    val: target,
                    duration: 1.8,
                    ease: 'power2.out',
                    onUpdate: () => {
                        stat.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
                    }
                });
            });
        }
    });
}

/**
 * 6. Continuous Organic Floating for Ambient Glow Orbs
 */
function initAmbientGlowFloating() {
    if (typeof gsap === 'undefined') return;

    gsap.to('.glow-1', {
        x: '+=80',
        y: '+=60',
        scale: 1.15,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    gsap.to('.glow-2', {
        x: '-=70',
        y: '+=90',
        scale: 1.2,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1
    });

    gsap.to('.glow-3', {
        x: '+=60',
        y: '-=50',
        scale: 1.1,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2
    });
}

/**
 * 7. Magnetic Micro-Interaction on Primary Buttons
 */
function initMagneticButtons() {
    if (window.matchMedia('(pointer: coarse)').matches || typeof gsap === 'undefined') return;

    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .project-link-btn, .theme-toggle-btn, .copy-btn');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.22,
                y: y * 0.22,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'elastic.out(1.1, 0.4)'
            });
        });
    });
}

/**
 * 8. Cursor Spotlight Glow on Cards (Linear / Vercel Glassmorphism)
 */
function initSpotlightCards() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cards = document.querySelectorAll('.project-card, .skill-card, .contact-box');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

/**
 * 9. Email Copy-to-Clipboard Functionality with Toast Notification
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
 * 10. Live Jakarta (WIB) Digital Clock
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
 * 11. Subtle 3D Card Parallax Tilt on Hover
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

/**
 * 12. 3D Kinetic Word Flipper (Option 1)
 */
function initWordFlipper() {
    const container = document.querySelector('.word-flipper-container');
    const words = document.querySelectorAll('.flip-word');
    if (!container || words.length === 0 || typeof gsap === 'undefined') return;

    let currentIndex = 0;
    const totalWords = words.length;

    // Measure exact rendered width of a word inside the hero title typography context
    function getWordWidth(element) {
        const parent = container.parentElement || container;
        const clone = element.cloneNode(true);
        clone.style.visibility = 'hidden';
        clone.style.position = 'absolute';
        clone.style.display = 'inline-block';
        clone.style.width = 'auto';
        clone.style.transform = 'none';
        clone.style.left = '-9999px';
        clone.style.top = '-9999px';
        parent.appendChild(clone);
        const width = clone.getBoundingClientRect().width;
        parent.removeChild(clone);
        return width;
    }

    function setContainerWidth(animate = false, targetWidth = null) {
        const width = targetWidth !== null ? targetWidth : Math.ceil(getWordWidth(words[currentIndex])) + 14;
        if (animate) {
            gsap.to(container, {
                width: width,
                duration: 0.45,
                ease: 'power3.inOut'
            });
        } else {
            container.style.width = `${width}px`;
        }
    }

    // Set initial width
    setContainerWidth(false);

    // Re-measure when Google Fonts finish loading
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            setContainerWidth(false);
        });
    }

    // Initialize words in starting 3D transform states
    words.forEach((word, i) => {
        if (i === 0) {
            gsap.set(word, { opacity: 1, yPercent: 0, rotateX: 0 });
        } else {
            gsap.set(word, { opacity: 0, yPercent: 100, rotateX: -80 });
        }
    });

    let intervalId = null;

    function flipToNext() {
        if (document.hidden) return;

        const currentWord = words[currentIndex];
        const nextIndex = (currentIndex + 1) % totalWords;
        const nextWord = words[nextIndex];

        const targetWidth = Math.ceil(getWordWidth(nextWord)) + 14;

        const tl = gsap.timeline();

        // 1. Animate container width smoothly to fit new word
        tl.to(container, {
            width: targetWidth,
            duration: 0.5,
            ease: 'power3.inOut'
        }, 0);

        // 2. Flip current word OUT (rotate up)
        tl.to(currentWord, {
            yPercent: -100,
            rotateX: 80,
            opacity: 0,
            duration: 0.55,
            ease: 'power3.inOut'
        }, 0);

        // 3. Flip next word IN (from bottom)
        tl.fromTo(nextWord, 
            { yPercent: 100, rotateX: -80, opacity: 0 },
            {
                yPercent: 0,
                rotateX: 0,
                opacity: 1,
                duration: 0.65,
                ease: 'power3.out'
            },
            0.15
        );

        currentIndex = nextIndex;
    }

    // Start interval cycle
    intervalId = setInterval(flipToNext, 2800);

    // Pause on background tab to conserve resources
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (intervalId) clearInterval(intervalId);
        } else {
            intervalId = setInterval(flipToNext, 2800);
        }
    });

    // Handle responsive window resize
    window.addEventListener('resize', () => {
        setContainerWidth(false);
    });
}