
import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Smartphone, Search, PieChart, Paintbrush, Shield, ChevronRight, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import ProjectCard from '@/components/ProjectCard';
import TechnologyCard from '@/components/TechnologyCard';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  // Create scroll animation hooks for different sections
  const animation1 = useScrollAnimation({
    threshold: 0.2
  });
  const animation2 = useScrollAnimation({
    threshold: 0.2,
    rootMargin: '100px'
  });
  const animation3 = useScrollAnimation({
    threshold: 0.2,
    rootMargin: '150px'
  });
  const imageAnimation = useScrollAnimation({
    threshold: 0.3
  });

  // Add new animation hooks for project cards with left direction
  const projectSectionAnimation = useScrollAnimation({
    threshold: 0.1
  });
  const projectCard1Animation = useScrollAnimation({
    threshold: 0.2,
    direction: 'left',
    delay: 0
  });
  const projectCard2Animation = useScrollAnimation({
    threshold: 0.2,
    direction: 'left',
    delay: 150
  });
  const projectCard3Animation = useScrollAnimation({
    threshold: 0.2,
    direction: 'left',
    delay: 300
  });

  // Technology section animation hook
  const techSectionAnimation = useScrollAnimation({
    threshold: 0.1
  });

  // Technologies data with their logos
  const technologies = [
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
    { name: "Shopify", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ58f__Hs5QwGWIEcsawDwW1o5IQzaYNPONhQ&s" },
    { name: "SEMrush", icon: "https://prowly-prod.s3.eu-west-1.amazonaws.com/uploads/60169/assets/601039/-1f98f505180d14739e58c06d7a11eaea.png" },
    { name: "WordPress", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg" },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "MOZ", icon: "https://e7.pngegg.com/pngimages/839/267/png-clipart-moz-logo-moz-logo-seo-icons-logos-emojis-tech-companies.png" },
    { name: "Ahrefs", icon: "https://ahrefs.com/assets/esbuild/primary-light-AK6KQQMG.png" },
    { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
    { name: "Canva", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" },
    { name: "Premiere Pro", icon: "https://mir-s3-cdn-cf.behance.net/projects/404/328cfe200010453.666d37dd6d937.png" },
    { name: "Illustrator", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" },
    { name: "After Effects", icon: "https://cdn.worldvectorlogo.com/logos/after-effects-2019.svg" },
  ];

  return <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Video Banner - Modified for better mobile alignment */}
      <section className="w-full relative">
        <div className="w-full">
          <AspectRatio ratio={isMobile ? 9 / 16 : 16 / 9} className="bg-black">
            <video autoPlay muted loop className="w-full h-full object-cover" poster="">
              <source src="https://media-hosting.imagekit.io/b0477b7546ce42f5/vecteezy_futuristic-digital-landscape-with-vibrant-neon-lines_54523303.mov?Expires=1838903280&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=fwFT3NK88TKwXHnicbE91SMujREVzPDLBAc8eTdigqZvyAF0bsjGCLKrIQUtEGihkYlpIbl5~HMDmRH71ji2tTlssbcl8IbVLsqHWLplYMISDOM67q48w9B0u~07u3l7qlkX~41WmHLmGQAi-KiMplR3ccwXVmvJNPN5au1TyvBKBLHF1CdLJtgZ1bmtT-ybkVT1lMtNU4WsYSdQZh63FuGy18WCWh1rWPUXZAkdaJ-QvqZwnag5~~waTry1gpdKRvEiLzCnP1O2JTOVEHQpZ-mlHfiOVC07TZK1B7l8Ozl4YP64BN2Vfvbgr5FRov0u7YsoHG~ALgYWaKbwGxSkbw__"/>
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center p-6">
                <Button variant="outline" className="rounded-full w-16 h-16 flex items-center justify-center mb-4 border-white/70 bg-transparent hover:bg-white/10 mx-auto">
                  <Play className="h-8 w-8 text-white" />
                </Button>
                <h2 className="text-white text-2xl md:text-3xl font-bold flex items-center justify-center">Discover AskUs</h2>
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
              Transform Your Digital Presence with AskUs
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
              <Link to="/contact">
                Get Started
                </Link>
              </Button>
              <Button variant="outline" className="border-white text-lg py-6 px-8 rounded-full bg-slate-50 text-purple-600">
              <Link to="/services">
                Our Services
                </Link>
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

      {/* Technologies We Use Section */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={techSectionAnimation.ref} className={cn("mb-12 transition-all duration-700 transform", techSectionAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
            <div className="text-left max-w-3xl mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-purple-500 mb-2">Tech Use</h3>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-askus-dark">Technology We Use</h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                AskUs has always been focused on appreciating advanced technology to achieve higher standards. 
                This is our way of ensuring that we deliver solutions that are relevant to the current market 
                and those that would be deemed relevant in the near future.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 justify-items-center">
            {technologies.map((tech, index) => (
              <TechnologyCard 
                key={tech.name} 
                name={tech.name} 
                icon={tech.icon} 
                delay={index * 100} 
              />
            ))}
          </div>
        </div>
        <div className="text-center mt-12">
            <Link to="/contact">
              <Button className="bg-askus-purple hover:bg-askus-purple/90">
                View All Technologies <ChevronRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>
      </section>

      {/* About Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-askus-dark">
                Why Choose AskUs?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                At AskUs, we are dedicated to transforming your business through innovative digital solutions. With our expertise and commitment to excellence, we help you stay ahead in the competitive digital landscape.
              </p>
              
              <div className="space-y-4">
                <div ref={animation1.ref} className={cn("flex items-start gap-4 transition-all duration-700 transform", animation1.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10")}>
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-askus-purple flex-shrink-0">1</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-askus-dark">Expertise & Experience</h3>
                    <p className="text-gray-600">Our team of skilled professionals brings years of experience in delivering top-notch digital solutions.</p>
                  </div>
                </div>
                
                <div ref={animation2.ref} className={cn("flex items-start gap-4 transition-all duration-700 transform delay-150", animation2.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10")}>
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-askus-purple flex-shrink-0">2</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-askus-dark">Client-Focused Approach</h3>
                    <p className="text-gray-600">We prioritize understanding your unique business needs to deliver tailored solutions that drive results.</p>
                  </div>
                </div>
                
                <div ref={animation3.ref} className={cn("flex items-start gap-4 transition-all duration-700 transform delay-300", animation3.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10")}>
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-askus-purple flex-shrink-0">3</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-askus-dark">Innovation & Quality</h3>
                    <p className="text-gray-600">We stay updated with the latest technologies and trends to ensure the highest quality services.</p>
                  </div>
                </div>
              </div>
              
              <div className={cn("mt-8 transition-all duration-700 transform delay-500", animation3.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
                <Link to="/about">
                  <Button className="bg-askus-purple hover:bg-askus-purple/90">
                    Learn More About Us <ArrowRight className="ml-2" size={16} />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div ref={imageAnimation.ref} className={cn("rounded-xl overflow-hidden shadow-xl transition-all duration-1000 transform", imageAnimation.isVisible ? "opacity-100 translate-x-0 rotate-0" : "opacity-0 translate-x-20 rotate-6")}>
              <img src="https://media-hosting.imagekit.io/b7be3e2a05d844af/Leonardo_Phoenix_09_A_sleek_and_modern_design_for_AskUS_digita_2.jpg?Expires=1838903280&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=fHwCtYKX6H~dSMASF7NrC7Cbs5mzkzXuH0k4qS21En0Y927PaA8d6s02tGEgDEYIF-Lvk-ZEJ9U80dYCUvwIpyfPtET5aUrScYo991LFrb6Ch3jcWJEQjjHDDNg5FZsGN3eVKZrebA9cA6FUrvmBkCNHn5pigzQIz9GY~oehXnc19ZWOxFhX9hDEKFnOFX3ZBS7sUk4G1FigsAOUtcBCI5cDGh2AAbvPDMLF4u8I7oFNh2QdDGC7fHxNNwGcRt1ncBIBRHys4rQXRmVISafAYscsbu-DoVjuIvsKarvhekA8~wQWaSU4~Vl0DUy4MKTufdee1rRdPfhZcY9xAJLcfw__" alt="Digital Marketing Team" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={projectSectionAnimation.ref} className={cn("text-center max-w-3xl mx-auto mb-16 transition-all duration-700 transform", projectSectionAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-askus-dark">Our Projects</h2>
            <p className="text-lg text-gray-600">
              Check out some of our recent work that showcases our capabilities and expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div ref={projectCard1Animation.ref} className={cn("transition-all duration-1000 transform", projectCard1Animation.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-24")} style={{
            transitionDelay: `${projectCard1Animation.delay}ms`
          }}>
              <ProjectCard title="TechCorp Website" description="A modern and responsive website designed to showcase TechCorp's services and ensure seamless user experience across all devices." client="TechCorp" clientRole="CEO" imageUrl="https://media-hosting.imagekit.io/7b0d6ee564f64ed1/_e6f1ab64-aa5d-4734-ab3f-4a0e44626aa3.jfif?Expires=1838903280&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=cD~KFnB1PprK-ucJK5tHWeBYmjziNgxWIXIP8eybxNKhAQI-fksHZUM2n1JB-x8-8~rxajg8cz0Ve6H~nn0S3QK34jWYWENQkMgfpPZc6dHglHnn7iKyA2PnJzSzk8LvMO7z4fD3v0Hr~xIy2NquBEGXfoHmOPNhabG9yjVo16e24BWHuQWgPt3f52b46KyhGS0wMXr5Cn3ZxKUGQPI9NqCElKFlnFzof~oB9Yd5VgV2ESW1zIo3epQS3KPnBpLOSDgkKT6fIAgQMa7K6NqEs2CVi~kUg6ZUL4M9OuAomcbR8YqnqpqbA9dlCdTz5TmFNpIS9gBKEBcaD~ry5LlGWA__" />
            </div>
            
            <div ref={projectCard2Animation.ref} className={cn("transition-all duration-1000 transform", projectCard2Animation.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-24")} style={{
            transitionDelay: `${projectCard2Animation.delay}ms`
          }}>
              <ProjectCard title="ShopEase App" description="Developed a user-friendly eCommerce application with a smooth shopping experience tailored specifically for ShopEase's customers." client="ShopEase" clientRole="Founder" imageUrl="https://media-hosting.imagekit.io/d52c2497398b4d7f/Leonardo_Phoenix_09_A_modern_and_clean_mobile_app_design_conce_3.jpg?Expires=1838903280&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=ySt0z1bdkhNhVCj8nXMmuNVivRG4g~LDGuUbbG95ggce7OVs0cyQ4KmSEyHBa373etoTwoHCiy6Zv3s8uf3xpVecCsHvxEnAvw2FRMyjOY3-B31iualdfyzjlvOWWdAjQjr4aUwcMLiEyTqVQgGtQZtw3EtDMGKg~zn8JdvVe~Xvb6dkMtuNxt5fqou1qwTtKedqw-Q5vzTctQdztdVSnxTNVdFR~eU2K4tRN0ICMhvyeGccSqwBXqb5mijlvCbbW4eIqrz~JCnset4Vhqg18UPVGbsBFRFLCbYC1p5x0u6CzKCD1A5eQ50B~81srw5uthnIZWas-bUId-Zn8IcpAg__" />
            </div>
            
            <div ref={projectCard3Animation.ref} className={cn("transition-all duration-1000 transform", projectCard3Animation.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-24")} style={{
            transitionDelay: `${projectCard3Animation.delay}ms`
          }}>
              <ProjectCard title="GreenLeaf Branding" description="Crafted a unique and vibrant visual identity with a distinctive logo, color scheme, and marketing materials tailored specifically for GreenLeaf." client="GreenLeaf" clientRole="Marketing Director" imageUrl="https://media-hosting.imagekit.io/4543383170dc4009/_5ff173b6-d833-48c4-87c1-cd0e6b132cd4.jfif?Expires=1838903280&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=JRABbaxhokGtRPfE8tq1KQqnAsMjnlqymhUPTXsc2ihbZSN52oXjTLumeMCpTCBvlBS0Xnl0meP-ajXfzM4PsH2f~6rBb0UH9GmnKj96BmQV6cp3~L9eaT0Jzrqu3QErhMqK6bN4LX0DoELPfb0gtkbwnGLTyLaoKji7LQeigUu-DDOQ9bcBdgQGADSDCOEJLd3pkfJYv~O4SvTC4oscANDaVebaRqK3Q~DUnh6sy~aj8gw0nvek0xHTp~NLNiA95IZFMV~lrAFStLAMwKgih8M1p73AHoV5jdk49mh14DZAkFivoQ~c0ROZ9lNQoWv--lK4EziF5d4-jG~Hencaag__" />
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
