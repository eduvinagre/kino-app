'use client';

import { stats } from '../data/content';
import MagneticButton from './MagneticButton';

export default function Differentials(): React.ReactElement {
  return (
    <section className="section differentials" id="diferenciais">
      <div className="container">
        <div className="diff-layout">
          <div className="diff-left">
            <span className="section-label">// Por que nós?</span>
            <h2 className="section-title">
              Resultados que<br />
              <span className="accent">fazem diferença</span>
            </h2>
            <p className="section-desc">
              Somos especialistas focados exclusivamente em Amazon Connect e AWS. Isso significa
              implementações mais rápidas, custos menores e expertise incomparável.
            </p>
            <MagneticButton href="#contato" className="btn btn-primary">
              <span>Comece Agora</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </MagneticButton>
          </div>
          <div className="diff-right">
            <div className="stats-grid">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-card glass-card">
                  <span className="stat-number" data-count={stat.count}>0</span>
                  <span className="stat-suffix">{stat.suffix}</span>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
