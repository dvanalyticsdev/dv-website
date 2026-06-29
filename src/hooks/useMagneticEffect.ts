import { useRef, useEffect } from 'react';

export function useMagneticEffect(strength = 0.3) {
  const elementRef = useRef<any>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const elCenterX = rect.left + rect.width / 2;
      const elCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - elCenterX;
      const deltaY = e.clientY - elCenterY;

      const x = deltaX * strength;
      const y = deltaY * strength;

      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      el.style.transition = 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)';
    };

    const handleMouseLeave = () => {
      el.style.transform = 'translate3d(0px, 0px, 0)';
      el.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return elementRef;
}
