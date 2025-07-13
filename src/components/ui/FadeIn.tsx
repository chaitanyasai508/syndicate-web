
import React, { useRef, useEffect, useState } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const FadeIn: React.FC<FadeInProps> = ({ children, className = '', delay = 0 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setVisible(true);
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    });

    const { current } = domRef;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={domRef}
      className={`fade-in ${isVisible ? 'visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default FadeIn;
