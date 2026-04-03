'use client';

import { services } from '../data/content';
import SectionHeader from './SectionHeader';

export default function Services(): React.ReactElement {
  return (
    <section className="section services" id="servicos">
      <div className="container">
        <SectionHeader
          label="// Serviços"
          title='Solucoes completas em<br/><span class="accent">Amazon Connect</span>'
          description="Do planejamento à operação, cobrimos todo o ciclo de vida do seu contact center em nuvem."
        />

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.number} className="service-card glass-card" data-service={service.number}>
              <div className="card-number">{service.number}</div>
              <div className="card-icon">{service.icon}</div>
              <h3 className="card-title">{service.title}</h3>
              <p className="card-desc">{service.description}</p>
              <div className="card-footer">
                {service.tags.map((tag) => (
                  <span key={tag} className="card-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
