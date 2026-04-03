/* ============================================
   Main JS - Lenis, Navigation, Cursor, Init
   ============================================ */

(function () {
    'use strict';

    // ---- Loader ----
    const loader = document.getElementById('loader');

    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loader) loader.classList.add('hidden');
        }, 1500);
    });

    // ---- Lenis Smooth Scroll ----
    let lenis;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 1.5,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Connect Lenis to GSAP ScrollTrigger
        if (typeof ScrollTrigger !== 'undefined') {
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        }
    }

    // ---- Custom Cursor ----
    const cursor = document.getElementById('cursor');
    const cursorDot = cursor ? cursor.querySelector('.cursor-dot') : null;
    const cursorOutline = cursor ? cursor.querySelector('.cursor-outline') : null;

    if (cursor && window.matchMedia('(pointer: fine)').matches) {
        let cursorX = 0, cursorY = 0;
        let dotX = 0, dotY = 0;
        let outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
        });

        function animateCursor() {
            // Dot follows instantly
            dotX += (cursorX - dotX) * 0.3;
            dotY += (cursorY - dotY) * 0.3;
            if (cursorDot) {
                cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
            }

            // Outline lags behind
            outlineX += (cursorX - outlineX) * 0.12;
            outlineY += (cursorY - outlineY) * 0.12;
            if (cursorOutline) {
                cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
            }

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effects
        const hoverTargets = document.querySelectorAll('a, button, .service-card, .stat-card, .orbit-item-inner, input, textarea, select');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });
    }

    // ---- Magnetic Buttons ----
    const magneticElements = document.querySelectorAll('[data-magnetic]');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
            el.style.transition = 'transform 0.4s cubic-bezier(0.65, 0.05, 0, 1)';
            setTimeout(() => { el.style.transition = ''; }, 400);
        });
    });

    // ---- Navigation ----
    const nav = document.getElementById('nav');
    const hamburger = document.getElementById('navHamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Scroll behavior
    let lastScroll = 0;

    function handleNavScroll() {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // Hamburger toggle
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';

            // Pause/resume Lenis
            if (lenis) {
                if (mobileMenu.classList.contains('active')) {
                    lenis.stop();
                } else {
                    lenis.start();
                }
            }
        });

        // Close on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
                if (lenis) lenis.start();
            });
        });
    }

    // Smooth scroll to anchor (for nav links)
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                if (lenis) {
                    lenis.scrollTo(target, { offset: -80 });
                } else {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // ---- Contact Form ----
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = form.querySelector('.btn-submit');
            const originalContent = btn.innerHTML;

            btn.innerHTML = '<span>Enviado!</span>';
            btn.style.background = '#22c55e';

            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.style.background = '';
                form.reset();
            }, 3000);
        });
    }

    // ---- Active Nav Link on Scroll ----
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link:not(.nav-link-cta)');

    function updateActiveLink() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
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

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    // ---- Ripple effect on form submit ----
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 0;
            `;

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to { transform: scale(4); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

})();
