'use client';

import { useState, useCallback, FormEvent } from 'react';
import { serviceOptions } from '../data/content';

export default function Contact(): React.ReactElement {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const form = e.currentTarget;
    setTimeout(() => {
      setSubmitted(false);
      form.reset();
    }, 3000);
  }, []);

  return (
    <section className="section contact" id="contato">
      <div className="gradient-mesh" />
      <div className="container">
        <div className="contact-layout">
          <div className="contact-left">
            <span className="section-label">// Contato</span>
            <h2 className="section-title">
              Pronto para<br />
              <span className="accent">transformar</span>
              <br />
              seu atendimento?
            </h2>
            <p className="section-desc">
              Agende uma conversa com nossos especialistas. Vamos entender suas necessidades e
              apresentar a melhor solução.
            </p>
            <div className="contact-info">
              <div className="contact-info-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8l9 6 9-6" />
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                </svg>
                <span>contato@empresa.com.br</span>
              </div>
              <div className="contact-info-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                <span>+55 (11) 0000-0000</span>
              </div>
            </div>
          </div>
          <div className="contact-right">
            <form className="contact-form glass-card" onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" id="name" name="name" required placeholder=" " />
                <label htmlFor="name">Nome completo</label>
                <div className="form-line" />
              </div>
              <div className="form-group">
                <input type="email" id="email" name="email" required placeholder=" " />
                <label htmlFor="email">E-mail corporativo</label>
                <div className="form-line" />
              </div>
              <div className="form-group">
                <input type="text" id="company" name="company" placeholder=" " />
                <label htmlFor="company">Empresa</label>
                <div className="form-line" />
              </div>
              <div className="form-group">
                <select id="service" name="service" required defaultValue="">
                  <option value="" disabled />
                  {serviceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <label htmlFor="service">Serviço de interesse</label>
                <div className="form-line" />
              </div>
              <div className="form-group">
                <textarea id="message" name="message" rows={3} placeholder=" " />
                <label htmlFor="message">Mensagem</label>
                <div className="form-line" />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-submit"
                style={submitted ? { background: '#22c55e' } : undefined}
              >
                <span>{submitted ? 'Enviado!' : 'Enviar Mensagem'}</span>
                {!submitted && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
                  </svg>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
