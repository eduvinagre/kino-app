'use client';

import { techRing1, techRing2 } from '../data/content';
import SectionHeader from './SectionHeader';

export default function Technologies(): React.ReactElement {
  return (
    <section className="section technologies" id="tecnologias">
      <div className="container">
        <SectionHeader
          center
          label="// Ecossistema"
          title='Tecnologias que<br/><span class="accent">impulsionam</span> seu negócio'
          description="Trabalhamos com o ecossistema completo da AWS para entregar soluções integradas e escaláveis."
        />

        <div className="tech-orbit">
          <div className="orbit-center">
            <div className="orbit-center-inner glass-card">
              <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M30 8C17.85 8 8 17.85 8 30s9.85 22 22 22 22-9.85 22-22S42.15 8 30 8z" />
                <path d="M30 14c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16z" />
                <circle cx="30" cy="30" r="6" fill="currentColor" opacity="0.3" />
                <path d="M30 24v12M24 30h12" />
              </svg>
              <span>Amazon Connect</span>
            </div>
          </div>

          <div className="orbit-ring orbit-ring-1">
            {techRing1.map((item) => (
              <div key={item.label} className="orbit-item" style={{ '--angle': `${item.angle}deg` } as React.CSSProperties}>
                <div className="orbit-item-inner glass-card">
                  <span className="orbit-label">{item.label}</span>
                  <span className="orbit-desc">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="orbit-ring orbit-ring-2">
            {techRing2.map((item) => (
              <div key={item.label} className="orbit-item" style={{ '--angle': `${item.angle}deg` } as React.CSSProperties}>
                <div className="orbit-item-inner glass-card">
                  <span className="orbit-label">{item.label}</span>
                  <span className="orbit-desc">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
