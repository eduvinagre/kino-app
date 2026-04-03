'use client';

import { useRef, useCallback, ReactNode, MouseEvent as ReactMouseEvent } from 'react';

interface MagneticButtonProps {
  href?: string;
  className?: string;
  children: ReactNode;
  type?: 'button' | 'submit';
}

export default function MagneticButton({ href, className, children, type }: MagneticButtonProps): React.ReactElement {
  const ref = useRef<HTMLElement>(null);

  const onMove = useCallback((e: ReactMouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
    el.style.transition = 'transform 0.4s cubic-bezier(0.65, 0.05, 0, 1)';
    setTimeout(() => { if (el) el.style.transition = ''; }, 400);
  }, []);

  const onClick = useCallback((e: ReactMouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const ripple = document.createElement('span');
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.cssText = `
      position:absolute;width:${size}px;height:${size}px;left:${x}px;top:${y}px;
      background:rgba(255,255,255,0.3);border-radius:50%;transform:scale(0);
      animation:ripple 0.6s ease-out;pointer-events:none;z-index:0;
    `;
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    if (href?.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const lenis = window.__lenis;
        if (lenis) {
          lenis.scrollTo(target as HTMLElement, { offset: -80 });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [href]);

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={className}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type || 'button'}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
