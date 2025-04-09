import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Smartphone, Search, PieChart, Paintbrush, Shield, ChevronRight, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import ProjectCard from '@/components/ProjectCard';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const Index = () => {
  // Create scroll animation hooks for different sections
  const animation1 = useScrollAnimation({ threshold: 0.2 });
  const animation2 = useScrollAnimation({ threshold: 0.2, rootMargin: '100px' });
  const animation3 = useScrollAnimation({ threshold: 0.2, rootMargin: '150px' });
  const imageAnimation = useScrollAnimation({ threshold: 0.3 });

  // Add new animation hooks for project cards with left direction
  const projectSectionAnimation = useScrollAnimation({ threshold: 0.1 });
  const projectCard1Animation = useScrollAnimation({ threshold: 0.2, direction: 'left', delay: 0 });
  const projectCard2Animation = useScrollAnimation({ threshold: 0.2, direction: 'left', delay: 150 });
  const projectCard3Animation = useScrollAnimation({ threshold: 0.2, direction: 'left', delay: 300 });

  return <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Video Banner */}
      <section className="w-full relative">
        <div className="w-full">
          <AspectRatio ratio={16/9} className="bg-black">
            <video 
              autoPlay 
              muted 
              loop 
              className="w-full h-full object-cover"
              poster="public/lovable-uploads/6f63107c-1796-4af7-98af-0a2a7ad593d0.png"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-32807-large.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center p-6">
                <Button variant="outline" className="rounded-full w-16 h-16 flex items-center justify-center mb-4 border-white/70 bg-transparent hover:bg-white/10">
                  <Play className="h-8 w-8 text-white" />
                </Button>
                <h2 className="text-white text-2xl md:text-3xl font-bold">Discover AskUS</h2>
              </div>
            </div>
          </AspectRatio>
        </div>
      </section>
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 md:pb-28 gradient-bg text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              Transform Your Digital Presence with AskUS
            </h1>
            <p className="text-lg md:text-xl text-gray-100 mb-8 animate-slide-up opacity-0" style={{
            animationDelay: '0.2s'
          }}>
              We provide innovative digital solutions to help your business thrive in the online world. From web development to digital marketing, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up opacity-0" style={{
            animationDelay: '0.4s'
          }}>
              <Button className="bg-white text-askus-purple hover:bg-gray-100 text-lg py-6 px-8 rounded-full">
                Get Started
              </Button>
              <Button variant="outline" className="border-white text-lg py-6 px-8 rounded-full bg-slate-50 text-purple-600">
                Our Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-askus-dark">Our Services</h2>
            <p className="text-lg text-gray-600">
              We offer a wide range of digital services to help your business grow and succeed online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard title="Web Development" description="Custom web development solutions tailored to meet your business needs, ensuring seamless user experience and robust functionality." icon={Code} />
            <ServiceCard title="Mobile App Development" description="Innovative mobile app solutions that enhance user engagement and streamline business operations on both iOS and Android platforms." icon={Smartphone} />
            <ServiceCard title="SEO Optimization" description="Boost your online presence with our expert SEO services, designed to improve search rankings and drive organic traffic to your website." icon={Search} />
            <ServiceCard title="Digital Marketing" description="Comprehensive digital marketing strategies that increase brand visibility and customer engagement across various online platforms." icon={PieChart} />
            <ServiceCard title="Graphic Design" description="Creative design services that capture your brand's essence and communicate your message clearly and effectively." icon={Paintbrush} />
            <ServiceCard title="Cybersecurity" description="Protect your business and customer data with our advanced cybersecurity solutions, ensuring peace of mind and operational integrity." icon={Shield} />
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button className="bg-askus-purple hover:bg-askus-purple/90">
                View All Services <ChevronRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-askus-dark">
                Why Choose AskUS?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                At AskUS, we are dedicated to transforming your business through innovative digital solutions. With our expertise and commitment to excellence, we help you stay ahead in the competitive digital landscape.
              </p>
              
              <div className="space-y-4">
                <div 
                  ref={animation1.ref} 
                  className={cn(
                    "flex items-start gap-4 transition-all duration-700 transform",
                    animation1.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                  )}
                >
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-askus-purple flex-shrink-0">1</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-askus-dark">Expertise & Experience</h3>
                    <p className="text-gray-600">Our team of skilled professionals brings years of experience in delivering top-notch digital solutions.</p>
                  </div>
                </div>
                
                <div 
                  ref={animation2.ref} 
                  className={cn(
                    "flex items-start gap-4 transition-all duration-700 transform delay-150",
                    animation2.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                  )}
                >
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-askus-purple flex-shrink-0">2</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-askus-dark">Client-Focused Approach</h3>
                    <p className="text-gray-600">We prioritize understanding your unique business needs to deliver tailored solutions that drive results.</p>
                  </div>
                </div>
                
                <div 
                  ref={animation3.ref} 
                  className={cn(
                    "flex items-start gap-4 transition-all duration-700 transform delay-300",
                    animation3.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                  )}
                >
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-askus-purple flex-shrink-0">3</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-askus-dark">Innovation & Quality</h3>
                    <p className="text-gray-600">We stay updated with the latest technologies and trends to ensure the highest quality services.</p>
                  </div>
                </div>
              </div>
              
              <div className={cn(
                "mt-8 transition-all duration-700 transform delay-500",
                animation3.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}>
                <Link to="/about">
                  <Button className="bg-askus-purple hover:bg-askus-purple/90">
                    Learn More About Us <ArrowRight className="ml-2" size={16} />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div 
              ref={imageAnimation.ref}
              className={cn(
                "rounded-xl overflow-hidden shadow-xl transition-all duration-1000 transform",
                imageAnimation.isVisible ? "opacity-100 translate-x-0 rotate-0" : "opacity-0 translate-x-20 rotate-6"
              )}
            >
              <img src="public/lovable-uploads/57393e5d-f497-4439-b607-606324e331bc.png" alt="Digital Marketing Team" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={projectSectionAnimation.ref}
            className={cn(
              "text-center max-w-3xl mx-auto mb-16 transition-all duration-700 transform",
              projectSectionAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-askus-dark">Our Projects</h2>
            <p className="text-lg text-gray-600">
              Check out some of our recent work that showcases our capabilities and expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              ref={projectCard1Animation.ref}
              className={cn(
                "transition-all duration-1000 transform",
                projectCard1Animation.isVisible 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 -translate-x-24"
              )}
              style={{ 
                transitionDelay: `${projectCard1Animation.delay}ms` 
              }}
            >
              <ProjectCard 
                title="TechCorp Website" 
                description="A modern and responsive website designed to showcase TechCorp's services and ensure seamless user experience across all devices." 
                client="TechCorp" 
                clientRole="CEO" 
                imageUrl="public/lovable-uploads/a3c632f7-8a70-411c-94a8-8b5271719754.png" 
              />
            </div>
            
            <div 
              ref={projectCard2Animation.ref}
              className={cn(
                "transition-all duration-1000 transform",
                projectCard2Animation.isVisible 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 -translate-x-24"
              )}
              style={{ 
                transitionDelay: `${projectCard2Animation.delay}ms` 
              }}
            >
              <ProjectCard 
                title="ShopEase App" 
                description="Developed a user-friendly eCommerce application with a smooth shopping experience tailored specifically for ShopEase's customers." 
                client="ShopEase" 
                clientRole="Founder" 
                imageUrl="public/lovable-uploads/938ba006-17ea-4022-b354-32b4422ecdb2.png" 
              />
            </div>
            
            <div 
              ref={projectCard3Animation.ref}
              className={cn(
                "transition-all duration-1000 transform",
                projectCard3Animation.isVisible 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 -translate-x-24"
              )}
              style={{ 
                transitionDelay: `${projectCard3Animation.delay}ms` 
              }}
            >
              <ProjectCard 
                title="GreenLeaf Branding" 
                description="Crafted a unique and vibrant visual identity with a distinctive logo, color scheme, and marketing materials tailored specifically for GreenLeaf." 
                client="GreenLeaf" 
                clientRole="Marketing Director" 
                imageUrl="public/lovable-uploads/44bad806-745b-4cf7-afbb-37673806efb8.png" 
              />
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/portfolio">
              <Button className="bg-askus-purple hover:bg-askus-purple/90">
                View All Projects <ChevronRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 gradient-bg text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
            <p className="text-xl mb-8">
              Contact us today to discuss how our services can help your business grow and succeed in the digital world.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact">
                <Button className="bg-white text-askus-purple hover:bg-gray-100 text-lg py-6 px-8 rounded-full">
                  Contact Us
                </Button>
              </Link>
              <Button variant="outline" className="border-white py-6 px-8 rounded-full text-lg text-purple-600 bg-slate-50">
                Get a Free Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Index;
