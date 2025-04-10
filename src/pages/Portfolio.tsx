
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
              imageUrl="https://media-hosting.imagekit.io/7b0d6ee564f64ed1/_e6f1ab64-aa5d-4734-ab3f-4a0e44626aa3.jfif?Expires=1838903280&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=cD~KFnB1PprK-ucJK5tHWeBYmjziNgxWIXIP8eybxNKhAQI-fksHZUM2n1JB-x8-8~rxajg8cz0Ve6H~nn0S3QK34jWYWENQkMgfpPZc6dHglHnn7iKyA2PnJzSzk8LvMO7z4fD3v0Hr~xIy2NquBEGXfoHmOPNhabG9yjVo16e24BWHuQWgPt3f52b46KyhGS0wMXr5Cn3ZxKUGQPI9NqCElKFlnFzof~oB9Yd5VgV2ESW1zIo3epQS3KPnBpLOSDgkKT6fIAgQMa7K6NqEs2CVi~kUg6ZUL4M9OuAomcbR8YqnqpqbA9dlCdTz5TmFNpIS9gBKEBcaD~ry5LlGWA__"
            />
            <ProjectCard 
              title="ShopEase App" 
              description="Developed a user-friendly eCommerce application with a smooth shopping experience tailored specifically for ShopEase's customers."
              client="ShopEase"
              clientRole="Founder"
              imageUrl="https://media-hosting.imagekit.io/d52c2497398b4d7f/Leonardo_Phoenix_09_A_modern_and_clean_mobile_app_design_conce_3.jpg?Expires=1838903280&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=ySt0z1bdkhNhVCj8nXMmuNVivRG4g~LDGuUbbG95ggce7OVs0cyQ4KmSEyHBa373etoTwoHCiy6Zv3s8uf3xpVecCsHvxEnAvw2FRMyjOY3-B31iualdfyzjlvOWWdAjQjr4aUwcMLiEyTqVQgGtQZtw3EtDMGKg~zn8JdvVe~Xvb6dkMtuNxt5fqou1qwTtKedqw-Q5vzTctQdztdVSnxTNVdFR~eU2K4tRN0ICMhvyeGccSqwBXqb5mijlvCbbW4eIqrz~JCnset4Vhqg18UPVGbsBFRFLCbYC1p5x0u6CzKCD1A5eQ50B~81srw5uthnIZWas-bUId-Zn8IcpAg__"
            />
            <ProjectCard 
              title="GreenLeaf Branding" 
              description="Crafted a unique and vibrant visual identity with a distinctive logo, color scheme, and marketing materials tailored specifically for GreenLeaf."
              client="GreenLeaf"
              clientRole="Marketing Director"
              imageUrl="https://media-hosting.imagekit.io/4543383170dc4009/_5ff173b6-d833-48c4-87c1-cd0e6b132cd4.jfif?Expires=1838903280&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=JRABbaxhokGtRPfE8tq1KQqnAsMjnlqymhUPTXsc2ihbZSN52oXjTLumeMCpTCBvlBS0Xnl0meP-ajXfzM4PsH2f~6rBb0UH9GmnKj96BmQV6cp3~L9eaT0Jzrqu3QErhMqK6bN4LX0DoELPfb0gtkbwnGLTyLaoKji7LQeigUu-DDOQ9bcBdgQGADSDCOEJLd3pkfJYv~O4SvTC4oscANDaVebaRqK3Q~DUnh6sy~aj8gw0nvek0xHTp~NLNiA95IZFMV~lrAFStLAMwKgih8M1p73AHoV5jdk49mh14DZAkFivoQ~c0ROZ9lNQoWv--lK4EziF5d4-jG~Hencaag__"
            />
            <ProjectCard 
              title="FinTech Dashboard" 
              description="Designed and developed an intuitive financial dashboard that provides real-time insights and analytics for better decision-making."
              client="FinTech Solutions"
              clientRole="Product Manager"
              imageUrl="https://media-hosting.imagekit.io/d60732f200754ca2/Leonardo_Phoenix_09_A_modern_fintech_dashboard_on_a_large_high_1.jpg?Expires=1838903280&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Stl-DdSKXvbdV3Fo2NOf7J02FLRFV7okyckjRfC0Vde~kwlWfzvz7R~wPeZ4ejvsRkk-4DmezGFjoIKLLLVDTRAf1186WVSpx3fKZjaMjaN7NeRZwBaXJkuN40DkBt-xOOan6Z5QJVkP~5nnJFQlm--S8W-NfOa6CltlpM2CB0LI50JXGBN1jsKdmuDl-K8zEcrV53weoG0LiHT5DUDv2e~X8S-icN71vtHJRfm6eUuqe5a02PZzu9Zt5g885Q7yEw7hwxyN~Gecbvjfbft4ngGS5uNmFXq5JsKTG2jUi9OYy5dwyMcjqIcL3KVbZFpMlmHZTCFdftXLyVNnDxsFJw__"
            />
            <ProjectCard 
              title="HealthPlus Mobile App" 
              description="Created a comprehensive healthcare app that allows users to track their health metrics, schedule appointments, and access medical resources."
              client="HealthPlus"
              clientRole="CTO"
              imageUrl="https://media-hosting.imagekit.io/0ab16c68247840bb/_ac9b5c03-2050-4ff8-9585-525284ada44e.jfif?Expires=1838903280&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=YiKWEIsFZ0fimwAX9hmgwKuNSgQgTLeU7EFTbhQ0GSDv5PXi3sV3cCcyUhbcAGpzftqJVWVn~fnekqdeHTc0FE3-ZX~Lege1m9Ig5K6tFAFrsKV1s2-df3Dy7xigwR8bw2JLKy-wmD2A0FxfXo2tYCaqZWLHpbgV-rAC0G01k2U5EdTF35N65PWy3WrOX8uxnyhAHgFP6e0RvhNCa-QvnRQGbP5SJcmmzmDDjgPz3wDkNSwtDhaoHtUYEes56kyNkZnEleaiLdAbi3-7LSN1TtJ-k3AXCKSymPY633GxdXZ4-UoqN82o1ga~Qmx9aghYkeKyhPxnZ24dSYk-oCp1cg__"
            />
            <ProjectCard 
              title="EduLearn Platform" 
              description="Developed an interactive e-learning platform with course management, student progress tracking, and multimedia content delivery."
              client="EduLearn"
              clientRole="CEO"
              imageUrl="https://media-hosting.imagekit.io/d753afe36fb84004/Leonardo_Phoenix_09_A_vibrant_and_modern_illustration_of_an_on_1.jpg?Expires=1838903280&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Pn9syiROw9i89kYpzB9sgEh4PjYVEH3i5aETOMILzPOiu1H3C3ChQjG05GQKnRbWLu7IXlSQUekLiGwbErbJD2U1vHP11uJWZqTIF7RL6tiRFWznoM64q2pxEsyUa6asWs9tbFBBwkoTIJ7-IInjnHJvQYS8GEPB1FGHCf4Yz3LOGXNAteYFo5lCEcg6lHYHcydHefXuGVHoKWe84htrBnz2t1Wyz30c6OJqgKrbCcg9gZhHKTAmbxvHJxQ5TMf8UqiXfQyzkgvkpCedkgZbCYKFPMJE6nAJveiRwMEkVRO8biNzlXx3goabL77cJAa36qjyraqx5JypBZidc6GCqw__"
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
                <div className="w-11 h-11 rounded-full bg-askus-purple text-white flex items-center justify-center font-bold">A</div>&nbsp;&nbsp;
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
                <div className="w-11 h-11 rounded-full bg-askus-purple text-white flex items-center justify-center font-bold">A</div>&nbsp;&nbsp;
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
                <div className="w-11 h-11 rounded-full bg-askus-purple text-white flex items-center justify-center font-bold">A</div>&nbsp;&nbsp;
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
