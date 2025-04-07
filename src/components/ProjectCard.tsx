
import React from 'react';
import { Button } from '@/components/ui/button';

interface ProjectCardProps {
  title: string;
  description: string;
  client: string;
  clientRole: string;
  imageUrl: string;
}

const ProjectCard = ({ title, description, client, clientRole, imageUrl }: ProjectCardProps) => {
  return (
    <div className="bg-askus-black rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-askus-red/20 h-full flex flex-col">
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow text-white">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        <div className="mt-auto">
          <div className="mb-4 text-sm">
            <p className="font-medium text-white">{client}</p>
            <p className="text-gray-400">{clientRole}</p>
          </div>
          <Button className="w-full bg-askus-red hover:bg-askus-red/90">View Project</Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
