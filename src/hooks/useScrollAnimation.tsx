
import { useState, useEffect, useRef } from 'react';

interface ScrollOptions {
  threshold?: number;
  rootMargin?: string;
  direction?: 'up' | 'right' | 'left' | 'down';
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  animation?: 'fade' | 'slide' | 'scale' | 'rotate' | 'bounce';
}

export const useScrollAnimation = (options: ScrollOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // If once is true or not provided (default behavior), stop observing after becoming visible
          if (options.once !== false && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (options.once === false) {
          // If once is explicitly set to false, allow toggling visibility
          setIsVisible(false);
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
  }, [options.threshold, options.rootMargin, options.once]);
  
  return { 
    ref, 
    isVisible, 
    direction: options.direction || 'up',
    delay: options.delay || 0,
    duration: options.duration || 700,
    distance: options.distance || 40,
    animation: options.animation || 'fade'
  };
};
