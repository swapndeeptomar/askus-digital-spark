
import React, { useEffect, useState } from 'react';
import { Loader2, Code, Smartphone, Search, PieChart, Paintbrush, Shield, Server, Settings, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import FloatingContactButtons from "@/components/FloatingContactButtons";
import MovingHeaderLines from "@/components/MovingHeaderLines";
import { supabase } from '@/integrations/supabase/client';

// Icon mapping from string names to Lucide icon components
const serviceIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'code': Code,
  'smartphone': Smartphone,
  'search': Search,
  'pie-chart': PieChart,
  'paintbrush': Paintbrush,
  'shield': Shield,
  'server': Server,
  'settings': Settings,
  'file-check': FileCheck,
};

type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  icon?: string | null;
};

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      setLoading(true);
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);
      if (!error && data) {
        setServices(data as Service[]);
      }
      setLoading(false);
    }
    fetchServices();
  }, []);

  // Create animation hooks for the process steps
  const process1Animation = useScrollAnimation({
    threshold: 0.2,
    direction: 'up',
    delay: 0
  });
  
  const process2Animation = useScrollAnimation({
    threshold: 0.2,
    direction: 'up',
    delay: 150
  });
  
  const process3Animation = useScrollAnimation({
    threshold: 0.2,
    direction: 'up',
    delay: 300
  });
  
  const process4Animation = useScrollAnimation({
    threshold: 0.2,
    direction: 'up',
    delay: 450
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-16 gradient-bg text-white relative overflow-hidden">
        <MovingHeaderLines />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Our Services</h1>
            <p className="text-lg md:text-xl text-gray-100">
              Explore our range of services designed to enhance your digital presence and drive business growth for DigiSphere.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-12 text-askus-purple">
              <Loader2 className="animate-spin mr-2" /> Loading services...
            </div>
          ) : services.length === 0 ? (
            <div className="py-8 text-gray-500 text-center">No services found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                // Get icon component from icon map or default to Code
                const IconComponent = service.icon && serviceIconMap[service.icon] ? serviceIconMap[service.icon] : Code;
                return (
                  <ServiceCard
                    key={service.id}
                    title={service.name}
                    description={service.description}
                    icon={IconComponent}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-askus-dark">Our Process</h2>
            <p className="text-lg text-gray-600">
              We follow a structured approach at DigiSphere to ensure the success of your digital projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div 
              ref={process1Animation.ref} 
              className={cn(
                "process-step",
                process1Animation.isVisible 
                  ? "opacity-100 transform-none" 
                  : "opacity-0 translate-y-10"
              )}
              style={{
                transitionDuration: `${process1Animation.duration}ms`,
                transitionDelay: `${process1Animation.delay}ms`
              }}
            >
              <div className="flex justify-center mb-4">
                <div className="process-number">1</div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-askus-dark text-center">Discovery</h3>
              <p className="text-gray-600 text-center">
                We start by understanding your business goals, target audience, and project requirements.
              </p>
            </div>
            
            <div 
              ref={process2Animation.ref} 
              className={cn(
                "process-step",
                process2Animation.isVisible 
                  ? "opacity-100 transform-none" 
                  : "opacity-0 translate-y-10"
              )}
              style={{
                transitionDuration: `${process2Animation.duration}ms`,
                transitionDelay: `${process2Animation.delay}ms`
              }}
            >
              <div className="flex justify-center mb-4">
                <div className="process-number">2</div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-askus-dark text-center">Planning</h3>
              <p className="text-gray-600 text-center">
                We create a detailed project plan with timelines, milestones, and deliverables.
              </p>
            </div>
            
            <div 
              ref={process3Animation.ref} 
              className={cn(
                "process-step",
                process3Animation.isVisible 
                  ? "opacity-100 transform-none" 
                  : "opacity-0 translate-y-10"
              )}
              style={{
                transitionDuration: `${process3Animation.duration}ms`,
                transitionDelay: `${process3Animation.delay}ms`
              }}
            >
              <div className="flex justify-center mb-4">
                <div className="process-number">3</div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-askus-dark text-center">Execution</h3>
              <p className="text-gray-600 text-center">
                Our team works diligently to develop and implement the solutions as per the plan.
              </p>
            </div>
            
            <div 
              ref={process4Animation.ref} 
              className={cn(
                "process-step",
                process4Animation.isVisible 
                  ? "opacity-100 transform-none" 
                  : "opacity-0 translate-y-10"
              )}
              style={{
                transitionDuration: `${process4Animation.duration}ms`,
                transitionDelay: `${process4Animation.delay}ms`
              }}
            >
              <div className="flex justify-center mb-4">
                <div className="process-number">4</div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-askus-dark text-center">Delivery & Support</h3>
              <p className="text-gray-600 text-center">
                We deliver the final product and provide ongoing support to ensure its success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 gradient-bg text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8">
              Contact us today to discuss how our services can help your business grow and succeed in the digital world with DigiSphere.
            </p>
            <Link to="/contact">
              <Button className="bg-white text-askus-purple hover:bg-gray-100 text-lg py-6 px-8 rounded-full">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingContactButtons />
    </div>
  );
};

export default Services;

