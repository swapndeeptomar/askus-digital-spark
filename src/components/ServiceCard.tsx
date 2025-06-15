
import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const ServiceCard = ({ title, description, icon: Icon }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="service-card bg-white p-6 rounded-xl shadow-md border border-gray-100 h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 transform"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn(
        "service-icon bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center text-askus-purple mb-4 transition-all duration-300",
        isHovered ? "scale-110 rotate-12 bg-purple-200" : ""
      )}>
        <Icon size={24} className={cn(
          "transition-all duration-300",
          isHovered ? "animate-pulse" : ""
        )} />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-askus-dark">{title}</h3>
      <p className="text-gray-600 mb-6 flex-grow">{description}</p>
      <Link to="/blogs" className="mt-auto">
        <Button variant="outline" className={cn(
          "w-full border-askus-purple text-askus-purple transition-all duration-300",
          isHovered ? "bg-askus-purple text-white" : "hover:bg-askus-purple hover:text-white"
        )}>
          Learn More
        </Button>
      </Link>
    </div>
  );
};

export default ServiceCard;

