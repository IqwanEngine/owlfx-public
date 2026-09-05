import { useEffect, useRef } from 'react';

interface ScrollRevealOptions extends IntersectionObserverInit {
  dependencies?: unknown[];
}

/**
 * Custom hook to implement a luxury 'Reveal on Scroll' effect using Intersection Observer.
 * Automatically discovers all child elements with the `.reveal-on-scroll` class and attaches
 * a performant observer that applies the `.is-revealed` class when scrolled into view.
 */
export function useScrollReveal(options?: ScrollRevealOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dependencies = options?.dependencies || [];

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // Check browser support for IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      const elements = root.querySelectorAll('.reveal-on-scroll');
      elements.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const elements = root.querySelectorAll('.reveal-on-scroll');
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: options?.threshold ?? 0.1,
        rootMargin: options?.rootMargin ?? '0px 0px -40px 0px',
      }
    );

    elements.forEach((el) => {
      if (!el.classList.contains('is-revealed')) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options?.threshold, options?.rootMargin, ...dependencies]);

  return containerRef;
}
