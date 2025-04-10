
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface TechnologyCardProps {
  name: string;
  icon: string;
  delay?: number;
}

const TechnologyCard: React.FC<TechnologyCardProps> = ({ name, icon, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "tech-card group cursor-pointer",
        "flex flex-col items-center justify-center p-5",
        "bg-purple-50 rounded-full w-36 h-36 md:w-40 md:h-40",
        "transition-all duration-500",
        "hover:shadow-lg hover:bg-blue-100",
        "opacity-0 animate-fade-in"
      )}
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={cn(
          "relative w-14 h-14 md:w-16 md:h-16 mb-2",
          "transition-all duration-500 ease-out",
          "group-hover:scale-110 group-hover:-rotate-6"
        )}
      >
        <img 
          src={icon} 
          alt={`${name} logo`} 
          className="w-full h-full object-contain"
        />
      </div>
      <span 
        className={cn(
          "text-sm md:text-base font-medium text-askus-dark",
          "transition-all duration-300",
          "group-hover:text-askus-purple"
        )}
      >
        {name}
      </span>
      <div 
        className={cn(
          "absolute inset-0 rounded-full bg-white/0 transition-all duration-500",
          isHovered ? "scale-90 bg-white/10" : "scale-100"
        )}
      />
    </div>
  );
};

export default TechnologyCard;
