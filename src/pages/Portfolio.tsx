
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';

const Portfolio = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-16 gradient-bg text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Our Projects</h1>
            <p className="text-lg md:text-xl text-gray-100">
              Explore our portfolio of successful projects that showcase our expertise and capabilities.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Categories */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-2 rounded-full bg-askus-purple text-white">All</button>
            <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200">Web Development</button>
            <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200">Mobile Apps</button>
            <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200">UI/UX Design</button>
            <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200">Digital Marketing</button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard 
              title="TechCorp Website" 
              description="A modern and responsive website designed to showcase TechCorp's services and ensure seamless user experience across all devices."
              client="TechCorp"
              clientRole="CEO"
              imageUrl="public/lovable-uploads/a3c632f7-8a70-411c-94a8-8b5271719754.png"
            />
            <ProjectCard 
              title="ShopEase App" 
              description="Developed a user-friendly eCommerce application with a smooth shopping experience tailored specifically for ShopEase's customers."
              client="ShopEase"
              clientRole="Founder"
              imageUrl="public/lovable-uploads/938ba006-17ea-4022-b354-32b4422ecdb2.png"
            />
            <ProjectCard 
              title="GreenLeaf Branding" 
              description="Crafted a unique and vibrant visual identity with a distinctive logo, color scheme, and marketing materials tailored specifically for GreenLeaf."
              client="GreenLeaf"
              clientRole="Marketing Director"
              imageUrl="public/lovable-uploads/44bad806-745b-4cf7-afbb-37673806efb8.png"
            />
            <ProjectCard 
              title="FinTech Dashboard" 
              description="Designed and developed an intuitive financial dashboard that provides real-time insights and analytics for better decision-making."
              client="FinTech Solutions"
              clientRole="Product Manager"
              imageUrl="public/lovable-uploads/6f63107c-1796-4af7-98af-0a2a7ad593d0.png"
            />
            <ProjectCard 
              title="HealthPlus Mobile App" 
              description="Created a comprehensive healthcare app that allows users to track their health metrics, schedule appointments, and access medical resources."
              client="HealthPlus"
              clientRole="CTO"
              imageUrl="public/lovable-uploads/7e1184aa-ad54-4d1e-9643-f15bbde0b7d6.png"
            />
            <ProjectCard 
              title="EduLearn Platform" 
              description="Developed an interactive e-learning platform with course management, student progress tracking, and multimedia content delivery."
              client="EduLearn"
              clientRole="CEO"
              imageUrl="public/lovable-uploads/57393e5d-f497-4439-b607-606324e331bc.png"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-askus-dark">Client Testimonials</h2>
            <p className="text-lg text-gray-600">
              Here's what our clients have to say about working with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-semibold text-askus-dark">Emily Richards</h4>
                  <p className="text-gray-500 text-sm">TechCorp CEO</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "AskUS transformed our online presence with a sleek, functional website. Their attention to detail and exceptional web design skills have significantly improved our user experience."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-semibold text-askus-dark">Mark Johnson</h4>
                  <p className="text-gray-500 text-sm">ShopEase Founder</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The mobile app developed by AskUS has been a game-changer for our business. Our customers love the intuitive interface and seamless shopping experience."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-semibold text-askus-dark">Sarah Chen</h4>
                  <p className="text-gray-500 text-sm">GreenLeaf CMO</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The team at AskUS perfectly captured our vision for the brand. Their innovative branding approach has helped us stand out in a competitive market."
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
