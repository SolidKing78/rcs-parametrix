'use client';

import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number; opacity: number }>>([]);
  const [isVisible, setIsVisible] = useState(true);
  const isMouseDown = useRef(false);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = Date.now();

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      // Only add trail on movement when not clicking
      if (!isMouseDown.current) {
        const now = Date.now();
        if (now - lastTime > 30) { // Throttle trail creation
          setTrails((prev) => {
            const newTrails = [...prev, { x: e.clientX, y: e.clientY, id: now, opacity: 0.4 }];
            return newTrails.slice(-5); // Keep only last 5 trails
          });
          lastTime = now;
        }
      }
    };

    const handleMouseDown = () => {
      isMouseDown.current = true;
      // Clear trails on click to prevent stuck dots
      setTrails([]);
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setTrails([]); // Clear trails when mouse leaves
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Animate trails fade out quickly
    const animateTrails = () => {
      setTrails((prev) => {
        const now = Date.now();
        return prev
          .map((trail) => {
            const age = now - trail.id;
            const newOpacity = Math.max(0, trail.opacity - age / 200); // Faster fade (200ms)
            return { ...trail, opacity: newOpacity };
          })
          .filter((trail) => trail.opacity > 0.01);
      });
      animationFrameId = requestAnimationFrame(animateTrails);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    animateTrails();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <>
      <div
        className="custom-cursor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
        }}
      />
      {trails.map((trail) => (
        <div
          key={trail.id}
          className="custom-cursor-trail"
          style={{
            left: `${trail.x}px`,
            top: `${trail.y}px`,
            transform: 'translate(-50%, -50%)',
            opacity: trail.opacity,
          }}
        />
      ))}
    </>
  );
}

