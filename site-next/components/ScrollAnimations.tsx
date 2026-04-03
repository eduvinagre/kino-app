'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimations(): null {
  useEffect(() => {
    const timer = setTimeout(() => {
      initHeroAnimations();
      initSectionReveals();
      initServiceCards();
      initStats();
      initProcessTimeline();
      initTechOrbit();
      initContactForm();
      initParallax();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}

function initHeroAnimations(): void {
  const tl = gsap.timeline({ delay: 1.6 });

  tl.fromTo('.hero-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
  tl.to('.title-line-inner', { y: 0, duration: 1, stagger: 0.12, ease: 'power4.out' }, '-=0.4');
  tl.fromTo('.hero-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');
  tl.fromTo('.hero-cta .btn', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.4');
  tl.fromTo('.hero-scroll-indicator', { opacity: 0 }, { opacity: 1, duration: 1 }, '-=0.2');

  gsap.to('.hero-content', {
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
    y: 150,
    opacity: 0,
  });
}

function initSectionReveals(): void {
  gsap.utils.toArray<HTMLElement>('.section-label').forEach((el) => {
    gsap.fromTo(el, { opacity: 0, x: -20 }, {
      opacity: 1, x: 0, duration: 0.6,
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
    });
  });

  gsap.utils.toArray<HTMLElement>('.section-title').forEach((el) => {
    gsap.fromTo(el, { opacity: 0, y: 60 }, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
    });
  });

  gsap.utils.toArray<HTMLElement>('.section-desc').forEach((el) => {
    gsap.fromTo(el, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
    });
  });
}

function initServiceCards(): void {
  const cards = gsap.utils.toArray<HTMLElement>('.service-card');

  cards.forEach((card, i) => {
    gsap.fromTo(card, { opacity: 0, y: 60, scale: 0.95 }, {
      opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' },
      delay: (i % 2) * 0.15,
    });

    card.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      gsap.to(card, {
        rotateX: (y - centerY) / centerY * -5,
        rotateY: (x - centerX) / centerX * 5,
        transformPerspective: 800,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power2.out' });
    });
  });
}

function initStats(): void {
  const statCards = gsap.utils.toArray<HTMLElement>('.stat-card');
  statCards.forEach((card, i) => {
    gsap.fromTo(card, { opacity: 0, y: 40, scale: 0.9 }, {
      opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out', delay: i * 0.1,
      scrollTrigger: { trigger: '.stats-grid', start: 'top 80%', toggleActions: 'play none none reverse' },
    });
  });

  document.querySelectorAll<HTMLElement>('.stat-number[data-count]').forEach((counter) => {
    const target = parseInt(counter.getAttribute('data-count') || '0');
    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(counter, {
          innerText: target,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          onUpdate() {
            counter.textContent = String(Math.round(parseFloat(counter.textContent || '0')));
          },
        });
      },
      once: true,
    });
  });

  const diffBtn = document.querySelector<HTMLElement>('.diff-left .btn');
  if (diffBtn) {
    gsap.fromTo(diffBtn, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.6,
      scrollTrigger: { trigger: diffBtn, start: 'top 90%', toggleActions: 'play none none reverse' },
    });
  }
}

function initProcessTimeline(): void {
  const track = document.querySelector<HTMLElement>('.process-track');
  const wrapper = document.querySelector<HTMLElement>('.process-wrapper');
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
}

function initTechOrbit(): void {
  gsap.fromTo('.orbit-center', { opacity: 0, scale: 0 }, {
    opacity: 1, scale: 1, duration: 1, ease: 'elastic.out(1, 0.5)',
    scrollTrigger: { trigger: '.tech-orbit', start: 'top 75%', toggleActions: 'play none none reverse' },
  });

  gsap.fromTo('.orbit-ring-1', { opacity: 0, scale: 0.5 }, {
    opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
    scrollTrigger: { trigger: '.tech-orbit', start: 'top 75%', toggleActions: 'play none none reverse' },
    delay: 0.2,
  });

  gsap.fromTo('.orbit-ring-2', { opacity: 0, scale: 0.5 }, {
    opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out',
    scrollTrigger: { trigger: '.tech-orbit', start: 'top 75%', toggleActions: 'play none none reverse' },
    delay: 0.4,
  });
}

function initContactForm(): void {
  gsap.fromTo('.contact-left', { opacity: 0, x: -40 }, {
    opacity: 1, x: 0, duration: 0.8,
    scrollTrigger: { trigger: '.contact-layout', start: 'top 80%', toggleActions: 'play none none reverse' },
  });

  gsap.fromTo('.contact-form', { opacity: 0, x: 40 }, {
    opacity: 1, x: 0, duration: 0.8,
    scrollTrigger: { trigger: '.contact-layout', start: 'top 80%', toggleActions: 'play none none reverse' },
    delay: 0.2,
  });
}

function initParallax(): void {
  gsap.to('.gradient-mesh', {
    scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom top', scrub: 1 },
    y: -80,
  });

  gsap.fromTo('.footer-top', { opacity: 0, y: 40 }, {
    opacity: 1, y: 0, duration: 0.8,
    scrollTrigger: { trigger: '.footer', start: 'top 90%', toggleActions: 'play none none reverse' },
  });
}
