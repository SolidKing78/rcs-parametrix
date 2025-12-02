'use client';

import { useEffect, useState } from 'react';

export default function LoadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    const handleLoad = () => {
      setProgress(100);
      setTimeout(() => {
        setProgress(0);
      }, 500);
    };

    window.addEventListener('load', handleLoad);
    return () => {
      clearInterval(interval);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-50 transition-all duration-300"
      style={{ width: `${progress}%` }}
    />
  );
}

