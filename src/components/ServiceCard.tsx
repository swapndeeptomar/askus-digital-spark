
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
    <div className="service-card bg-white p-6 rounded-xl shadow-md border border-gray-100 h-full flex flex-col">
      <div className="service-icon bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center text-askus-purple mb-4">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-askus-dark">{title}</h3>
      <p className="text-gray-600 mb-6 flex-grow">{description}</p>
      <Button variant="outline" className="mt-auto border-askus-purple text-askus-purple hover:bg-askus-purple hover:text-white">
        Learn More
      </Button>
    </div>
  );
};

export default ServiceCard;
