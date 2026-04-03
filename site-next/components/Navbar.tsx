'use client';

import { useState, useEffect, useCallback, MouseEvent } from 'react';
import { navLinks } from '../data/content';

export default function Navbar(): React.ReactElement {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section detection
      const sections = document.querySelectorAll<HTMLElement>('.section, .hero');
      let current = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 200;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id') || '';
        }
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const lenis = window.__lenis;
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: -80 });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    if (menuOpen) {
      setMenuOpen(false);
      document.body.style.overflow = '';
      window.__lenis?.start();
    }
  }, [menuOpen]);

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
    // Pause/resume Lenis when toggling mobile menu
    if (window.__lenis) {
      if (next) {
        window.__lenis.stop();
      } else {
        window.__lenis.start();
      }
    }
  };

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#hero" className="nav-logo" onClick={(e) => scrollTo(e, '#hero')}>
            <span className="logo-bracket">[</span>
            <span className="logo-text">Nome da Empresa</span>
            <span className="logo-bracket">]</span>
          </a>

          <div className="nav-links">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link${activeSection === link.href.replace('#', '') ? ' active' : ''}`}
                onClick={(e) => scrollTo(e, link.href)}
              >
                {link.label}
              </a>
            ))}
            <a href="#contato" className="nav-link nav-link-cta" onClick={(e) => scrollTo(e, '#contato')}>
              Fale Conosco
            </a>
          </div>

          <button
            className={`nav-hamburger ${menuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-inner">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="mobile-link" onClick={(e) => scrollTo(e, link.href)}>
              {link.label}
            </a>
          ))}
          <a href="#contato" className="mobile-link mobile-link-cta" onClick={(e) => scrollTo(e, '#contato')}>
            Fale Conosco
          </a>
        </div>
      </div>
    </>
  );
}
