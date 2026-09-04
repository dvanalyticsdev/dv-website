import { useEffect, useRef } from 'react';

export function useScrollReveal(dependency?: any) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observedElements = new Set<Element>();

    const revealElements = (elements: Iterable<Element>) => {
      Array.from(elements).forEach((el) => el.classList.add('revealed'));
    };

    if (!('IntersectionObserver' in window)) {
      revealElements(container.querySelectorAll('.reveal-on-scroll'));
      return;
    }

    const observerOptions: IntersectionObserverInit = {
      threshold: 0.08,
      rootMargin: '0px 0px -20px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // Trigger only once
        }
      });
    }, observerOptions);

    const observeRevealElements = () => {
      container.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        if (!observedElements.has(el) && !el.classList.contains('revealed')) {
          observedElements.add(el);
          observer.observe(el);
        }
      });
    };

    observeRevealElements();

    const mutationObserver = new MutationObserver(() => {
      observeRevealElements();
    });

    mutationObserver.observe(container, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      observedElements.forEach((el) => observer.unobserve(el));
    };
  }, [dependency]);

  return containerRef;
}
