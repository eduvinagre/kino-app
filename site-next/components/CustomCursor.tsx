'use client';

import { useEffect, useRef, useCallback } from 'react';

export default function CustomCursor(): React.ReactElement {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, dotX: 0, dotY: 0, outX: 0, outY: 0 });
  const rafId = useRef<number | null>(null);

  const animate = useCallback(() => {
    const p = pos.current;
    p.dotX += (p.x - p.dotX) * 0.3;
    p.dotY += (p.y - p.dotY) * 0.3;
    p.outX += (p.x - p.outX) * 0.12;
    p.outY += (p.y - p.outY) * 0.12;

    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${p.dotX}px, ${p.dotY}px)`;
    }
    if (outlineRef.current) {
      outlineRef.current.style.transform = `translate(${p.outX}px, ${p.outY}px)`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    const onEnter = () => cursorRef.current?.classList.add('hovering');
    const onLeave = () => cursorRef.current?.classList.remove('hovering');

    document.addEventListener('mousemove', onMove);

    const hoverTargets = document.querySelectorAll(
      'a, button, .service-card, .stat-card, .orbit-item-inner, input, textarea, select'
    );
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      hoverTargets.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  return (
    <div className="cursor" ref={cursorRef}>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-outline" ref={outlineRef} />
    </div>
  );
}
