import { ReactNode } from 'react';

export interface NavLink {
  href: string;
  label: string;
}

export interface Service {
  number: string;
  title: string;
  description: string;
  tags: string[];
  icon: ReactNode;
}

export interface Stat {
  count: number;
  suffix: string;
  label: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  duration: string;
  icon: ReactNode;
}

export interface TechItem {
  label: string;
  desc: string;
  angle: number;
}

export interface SelectOption {
  value: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#diferenciais', label: 'Diferenciais' },
  { href: '#processo', label: 'Processo' },
  { href: '#tecnologias', label: 'Tecnologias' },
];

export const services: Service[] = [
  {
    number: '01',
    title: 'Implementação',
    description:
      'Design e deploy de contact centers completos. Fluxos de URA, roteamento inteligente, integrações com CRM e relatórios em tempo real.',
    tags: ['Amazon Connect', 'Contact Flows'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="6" width="36" height="36" rx="4" />
        <path d="M6 18h36M18 18v24" />
        <circle cx="30" cy="30" r="6" />
        <path d="M34 34l4 4" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Migração',
    description:
      'Migração segura de sistemas legados Avaya, Cisco, Genesys para Amazon Connect. Portabilidade de números e dados históricos.',
    tags: ['Zero Downtime', 'Data Migration'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 24h8l4-12 8 24 4-12h8" />
        <circle cx="8" cy="24" r="3" />
        <circle cx="40" cy="24" r="3" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'IA & Automação',
    description:
      'Chatbots com Amazon Lex, análise de sentimento com Contact Lens, voicebots e sumarização automática de chamadas.',
    tags: ['Amazon Lex', 'Contact Lens'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="16" r="8" />
        <path d="M12 36c0-6.627 5.373-12 12-12s12 5.373 12 12" />
        <path d="M24 8V4M32 10l3-3M16 10l-3-3" />
        <circle cx="24" cy="16" r="3" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Serviços Gerenciados',
    description:
      'Monitoramento 24/7, suporte técnico N1-N3, otimização contínua, relatórios mensais e revisões trimestrais de performance.',
    tags: ['24/7 Support', 'SLA Garantido'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="8" y="8" width="32" height="24" rx="3" />
        <path d="M8 16h32" />
        <circle cx="14" cy="12" r="1.5" fill="currentColor" />
        <circle cx="20" cy="12" r="1.5" fill="currentColor" />
        <path d="M16 36h16M20 32v4M28 32v4" />
      </svg>
    ),
  },
];

export const stats: Stat[] = [
  { count: 80, suffix: '%', label: 'Redução de custos vs. sistemas legados' },
  { count: 4, suffix: 'sem.', label: 'Tempo médio de implementação' },
  { count: 99, suffix: '.9%', label: 'Uptime garantido nos serviços gerenciados' },
  { count: 24, suffix: '/7', label: 'Monitoramento e suporte técnico' },
];

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Descoberta',
    description:
      'Workshops para entender suas necessidades, mapeamento de fluxos atuais e definição de objetivos.',
    duration: '1-2 semanas',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="20" cy="20" r="16" />
        <path d="M20 12v8l5 5" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Design da Solução',
    description:
      'Arquitetura técnica, design de fluxos de contato, plano de integrações e cronograma detalhado.',
    duration: '1-2 semanas',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="6" width="28" height="28" rx="3" />
        <path d="M6 14h28M14 14v20" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Implementação',
    description:
      'Configuração do Amazon Connect, desenvolvimento de fluxos, integrações e customizações.',
    duration: '3-6 semanas',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 28l6-6 4 4 8-8" />
        <polyline points="26 18 30 18 30 22" />
        <rect x="6" y="6" width="28" height="28" rx="3" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Testes & Go-Live',
    description:
      'UAT, treinamento da equipe, migração de números e lançamento com suporte hypercare dedicado.',
    duration: '1-2 semanas',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 6l14 28H6z" />
        <path d="M20 16v8M20 28v2" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Serviços Gerenciados',
    description:
      'Monitoramento contínuo, otimização, suporte 24/7 e evolução constante da sua plataforma.',
    duration: 'Continuo',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 6a14 14 0 1 1 0 28 14 14 0 0 1 0-28" />
        <path d="M14 20l4 4 8-8" />
      </svg>
    ),
  },
];

export const techRing1: TechItem[] = [
  { label: 'Amazon Lex', desc: 'Chatbots IA', angle: 0 },
  { label: 'Contact Lens', desc: 'Analytics', angle: 60 },
  { label: 'Lambda', desc: 'Serverless', angle: 120 },
  { label: 'Amazon Polly', desc: 'Text-to-Speech', angle: 180 },
  { label: 'Bedrock', desc: 'IA Generativa', angle: 240 },
  { label: 'S3', desc: 'Storage', angle: 300 },
];

export const techRing2: TechItem[] = [
  { label: 'Kinesis', desc: 'Streaming', angle: 30 },
  { label: 'QuickSight', desc: 'Dashboards', angle: 90 },
  { label: 'DynamoDB', desc: 'NoSQL DB', angle: 150 },
  { label: 'API Gateway', desc: 'APIs REST', angle: 210 },
  { label: 'CloudWatch', desc: 'Monitoring', angle: 270 },
  { label: 'IAM', desc: 'Seguranca', angle: 330 },
];

export const serviceOptions: SelectOption[] = [
  { value: 'implementation', label: 'Implementação Amazon Connect' },
  { value: 'migration', label: 'Migração de Contact Center' },
  { value: 'ai', label: 'IA & Automação' },
  { value: 'managed', label: 'Serviços Gerenciados' },
  { value: 'other', label: 'Outro' },
];

export const footerServiceLinks: NavLink[] = [
  { href: '#servicos', label: 'Implementação' },
  { href: '#servicos', label: 'Migração' },
  { href: '#servicos', label: 'IA & Automação' },
  { href: '#servicos', label: 'Serviços Gerenciados' },
];

export const footerCompanyLinks: NavLink[] = [
  { href: '#diferenciais', label: 'Sobre Nós' },
  { href: '#processo', label: 'Processo' },
  { href: '#tecnologias', label: 'Tecnologias' },
  { href: '#contato', label: 'Contato' },
];

export const footerSocialLinks: NavLink[] = [
  { href: '#', label: 'LinkedIn' },
  { href: '#', label: 'GitHub' },
  { href: '#', label: 'YouTube' },
];
