'use client';

import { processSteps } from '../data/content';
import SectionHeader from './SectionHeader';

export default function Process(): React.ReactElement {
  return (
    <section className="section process" id="processo">
      <div className="container">
        <SectionHeader
          label="// Como funciona"
          title='Do conceito ao<br/><span class="accent">go-live em semanas</span>'
        />
      </div>
      <div className="process-wrapper">
        <div className="process-track">
          {processSteps.map((step, i) => (
            <div key={step.number} className="process-step">
              <div className="step-number">{step.number}</div>
              <div className="step-content glass-card">
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <span className="step-duration">{step.duration}</span>
              </div>
              {i < processSteps.length - 1 && <div className="step-line" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
