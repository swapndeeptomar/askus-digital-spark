
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const ServiceCard = ({ title, description, icon: Icon }: ServiceCardProps) => {
  return (
    <div className="service-card">
      <div className="service-icon">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-300 mb-6 flex-grow">{description}</p>
      <Button variant="outline" className="mt-auto border-askus-red text-askus-red hover:bg-askus-red hover:text-white">
        Learn More
      </Button>
    </div>
  );
};

export default ServiceCard;
