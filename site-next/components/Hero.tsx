'use client';

import dynamic from 'next/dynamic';
import MagneticButton from './MagneticButton';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

export default function Hero(): React.ReactElement {
  return (
    <section className="hero" id="hero">
      <HeroScene />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          AWS Partner Network
        </div>
        <h1 className="hero-title">
          <span className="title-line">
            <span className="title-line-inner">Transformamos</span>
          </span>
          <span className="title-line">
            <span className="title-line-inner">seu atendimento</span>
          </span>
          <span className="title-line accent">
            <span className="title-line-inner">com a nuvem.</span>
          </span>
        </h1>
        <p className="hero-subtitle">
          Especialistas em <strong>Amazon Connect</strong> e servicos AWS.
          <br />
          Implementacao, migracao e gestao de contact centers inteligentes.
        </p>
        <div className="hero-cta">
          <MagneticButton href="#contato" className="btn btn-primary">
            <span>Iniciar Projeto</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </MagneticButton>
          <MagneticButton href="#servicos" className="btn btn-ghost">
            <span>Nossos Servicos</span>
          </MagneticButton>
        </div>
        <div className="hero-scroll-indicator">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </div>
    </section>
  );
}
