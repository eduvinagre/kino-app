/* ============================================
   GSAP + ScrollTrigger Animations
   All scroll-driven animations
   ============================================ */

(function () {
    'use strict';

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Wait for page load
    window.addEventListener('load', () => {
        initHeroAnimations();
        initSectionReveals();
        initServiceCards();
        initStats();
        initProcessTimeline();
        initTechOrbit();
        initContactForm();
        initParallax();
    });

    // ---- Hero Text Reveal ----
    function initHeroAnimations() {
        const tl = gsap.timeline({ delay: 1.6 });

        // Badge
        tl.fromTo('.hero-badge',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        );

        // Title lines
        tl.to('.title-line-inner', {
            y: 0,
            duration: 1,
            stagger: 0.12,
            ease: 'power4.out',
        }, '-=0.4');

        // Subtitle
        tl.fromTo('.hero-subtitle',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.5'
        );

        // CTA buttons
        tl.fromTo('.hero-cta .btn',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
            '-=0.4'
        );

        // Scroll indicator
        tl.fromTo('.hero-scroll-indicator',
            { opacity: 0 },
            { opacity: 1, duration: 1 },
            '-=0.2'
        );

        // Parallax hero on scroll
        gsap.to('.hero-content', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
            },
            y: 150,
            opacity: 0,
        });
    }

    // ---- Section Headers & General Reveals ----
    function initSectionReveals() {
        // Section labels
        gsap.utils.toArray('.section-label').forEach(el => {
            gsap.fromTo(el,
                { opacity: 0, x: -20 },
                {
                    opacity: 1, x: 0, duration: 0.6,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        });

        // Section titles with split effect
        gsap.utils.toArray('.section-title').forEach(el => {
            gsap.fromTo(el,
                { opacity: 0, y: 60 },
                {
                    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        });

        // Section descriptions
        gsap.utils.toArray('.section-desc').forEach(el => {
            gsap.fromTo(el,
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        });
    }

    // ---- Service Cards Stagger ----
    function initServiceCards() {
        const cards = gsap.utils.toArray('.service-card');

        cards.forEach((card, i) => {
            gsap.fromTo(card,
                { opacity: 0, y: 60, scale: 0.95 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 88%',
                        toggleActions: 'play none none reverse',
                    },
                    delay: (i % 2) * 0.15,
                }
            );
        });

        // Card hover tilt effect
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / centerY * -5;
                const rotateY = (x - centerX) / centerX * 5;

                gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    transformPerspective: 800,
                    duration: 0.4,
                    ease: 'power2.out',
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                });
            });
        });
    }

    // ---- Stats Counter Animation ----
    function initStats() {
        const statCards = gsap.utils.toArray('.stat-card');

        statCards.forEach((card, i) => {
            gsap.fromTo(card,
                { opacity: 0, y: 40, scale: 0.9 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: 0.7,
                    ease: 'power3.out',
                    delay: i * 0.1,
                    scrollTrigger: {
                        trigger: '.stats-grid',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        });

        // Counter animation
        const counters = document.querySelectorAll('.stat-number[data-count]');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));

            ScrollTrigger.create({
                trigger: counter,
                start: 'top 85%',
                onEnter: () => {
                    gsap.to(counter, {
                        innerText: target,
                        duration: 2,
                        ease: 'power2.out',
                        snap: { innerText: 1 },
                        onUpdate: function () {
                            counter.textContent = Math.round(parseFloat(counter.textContent));
                        },
                    });
                },
                once: true,
            });
        });

        // Diff left CTA button
        gsap.fromTo('.diff-left .btn',
            { opacity: 0, y: 20 },
            {
                opacity: 1, y: 0, duration: 0.6,
                scrollTrigger: {
                    trigger: '.diff-left .btn',
                    start: 'top 90%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    }

    // ---- Horizontal Scroll Timeline ----
    function initProcessTimeline() {
        const track = document.querySelector('.process-track');
        const wrapper = document.querySelector('.process-wrapper');
        if (!track || !wrapper) return;

        const totalWidth = track.scrollWidth;
        const viewWidth = wrapper.clientWidth;

        gsap.to(track, {
            x: -(totalWidth - viewWidth),
            ease: 'none',
            scrollTrigger: {
                trigger: '.process',
                start: 'top 15%',
                end: () => `+=${totalWidth - viewWidth}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
        });

        // Animate each step
        const steps = gsap.utils.toArray('.process-step');
        steps.forEach((step, i) => {
            gsap.fromTo(step,
                { opacity: 0.3, scale: 0.9 },
                {
                    opacity: 1, scale: 1,
                    scrollTrigger: {
                        trigger: step,
                        containerAnimation: gsap.getById && gsap.getById('processScroll'),
                        start: 'left 80%',
                        end: 'left 20%',
                        toggleActions: 'play none none reverse',
                    },
                    duration: 0.5,
                    delay: i * 0.05,
                }
            );
        });
    }

    // ---- Tech Orbit ----
    function initTechOrbit() {
        gsap.fromTo('.orbit-center',
            { opacity: 0, scale: 0 },
            {
                opacity: 1, scale: 1,
                duration: 1,
                ease: 'elastic.out(1, 0.5)',
                scrollTrigger: {
                    trigger: '.tech-orbit',
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                },
            }
        );

        gsap.fromTo('.orbit-ring-1',
            { opacity: 0, scale: 0.5 },
            {
                opacity: 1, scale: 1,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.tech-orbit',
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                },
                delay: 0.2,
            }
        );

        gsap.fromTo('.orbit-ring-2',
            { opacity: 0, scale: 0.5 },
            {
                opacity: 1, scale: 1,
                duration: 1.4,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.tech-orbit',
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                },
                delay: 0.4,
            }
        );
    }

    // ---- Contact Form Reveal ----
    function initContactForm() {
        gsap.fromTo('.contact-left',
            { opacity: 0, x: -40 },
            {
                opacity: 1, x: 0, duration: 0.8,
                scrollTrigger: {
                    trigger: '.contact-layout',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            }
        );

        gsap.fromTo('.contact-form',
            { opacity: 0, x: 40 },
            {
                opacity: 1, x: 0, duration: 0.8,
                scrollTrigger: {
                    trigger: '.contact-layout',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
                delay: 0.2,
            }
        );
    }

    // ---- Parallax effects ----
    function initParallax() {
        // Gradient mesh parallax
        gsap.to('.gradient-mesh', {
            scrollTrigger: {
                trigger: '.contact',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            },
            y: -80,
        });

        // Footer reveal
        gsap.fromTo('.footer-top',
            { opacity: 0, y: 40 },
            {
                opacity: 1, y: 0, duration: 0.8,
                scrollTrigger: {
                    trigger: '.footer',
                    start: 'top 90%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    }

})();
