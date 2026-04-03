import { footerServiceLinks, footerCompanyLinks, footerSocialLinks } from '../data/content';

export default function Footer(): React.ReactElement {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#hero" className="nav-logo">
              <span className="logo-bracket">[</span>
              <span className="logo-text">Nome da Empresa</span>
              <span className="logo-bracket">]</span>
            </a>
            <p>
              Especialistas em Amazon Connect e serviços AWS. Transformando o atendimento ao cliente
              com tecnologia de ponta.
            </p>
          </div>
          <div className="footer-links-group">
            <h4>Serviços</h4>
            {footerServiceLinks.map((link) => (
              <a key={link.label} href={link.href}>{link.label}</a>
            ))}
          </div>
          <div className="footer-links-group">
            <h4>Empresa</h4>
            {footerCompanyLinks.map((link) => (
              <a key={link.label} href={link.href}>{link.label}</a>
            ))}
          </div>
          <div className="footer-links-group">
            <h4>Social</h4>
            {footerSocialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-badges">
            <span className="aws-badge">AWS Partner</span>
          </div>
          <span>&copy; 2026 [Nome da Empresa]. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
