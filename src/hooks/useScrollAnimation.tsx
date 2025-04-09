
import { useState, useEffect, useRef } from 'react';

interface ScrollOptions {
  threshold?: number;
  rootMargin?: string;
  direction?: 'up' | 'right' | 'left';
  delay?: number;
}

export const useScrollAnimation = (options: ScrollOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, no need to observe anymore
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    );
    
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.rootMargin]);
  
  return { ref, isVisible, direction: options.direction || 'up', delay: options.delay || 0 };
};
