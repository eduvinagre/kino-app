'use client';

import { useState, useEffect } from 'react';

export default function Loader(): React.ReactElement {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loader ${hidden ? 'hidden' : ''}`}>
      <div className="loader-inner">
        <div className="loader-bar" />
        <span className="loader-text">Carregando</span>
      </div>
    </div>
  );
}
