
import { useState, useEffect, useRef } from 'react';

interface ScrollOptions {
  threshold?: number;
  rootMargin?: string;
  direction?: 'up' | 'right' | 'left';
  delay?: number;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: ScrollOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // If triggerOnce is true or not specified, unobserve after becoming visible
          if (options.triggerOnce !== false && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (options.triggerOnce === false) {
          // If triggerOnce is false, we want to reset visibility when out of view
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
  }, [options.threshold, options.rootMargin, options.triggerOnce]);
  
  return { 
    ref, 
    isVisible, 
    direction: options.direction || 'up', 
    delay: options.delay || 0,
    triggerOnce: options.triggerOnce !== false
  };
};
