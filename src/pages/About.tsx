
import React from 'react';
import { Trophy, Users, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
    
      {/* Header */}
      <section className="pt-32 pb-16 gradient-bg text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">About Us</h1>
            <p className="text-lg md:text-xl text-gray-100">
              Learn more about AskUS and our mission to deliver exceptional digital solutions.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="src/images/_421dcb59-fed4-4e7d-a602-57786bf36f2a.jfif" 
                alt="AskUS Team" 
                className="rounded-xl shadow-xl w-full"
              />
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-askus-dark">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2016, AskUS began with a simple mission: to help businesses harness the power of digital technology to grow and succeed. What started as a small team of passionate digital enthusiasts has evolved into a comprehensive digital solutions provider.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Over the years, we've worked with businesses of all sizes across various industries, helping them transform their digital presence and achieve their business goals. Our commitment to quality, innovation, and client satisfaction has been the cornerstone of our success.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-askus-purple mb-2">200+</div>
                  <p className="text-gray-600">Projects Completed</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-askus-purple mb-2">50+</div>
                  <p className="text-gray-600">Happy Clients</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-askus-purple mb-2">15+</div>
                  <p className="text-gray-600">Team Members</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-askus-purple mb-2">8+</div>
                  <p className="text-gray-600">Years of Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-askus-dark">Our Mission & Vision</h2>
            <p className="text-lg text-gray-600">
              Guided by our core values, we strive to deliver exceptional digital solutions that drive business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-2xl font-semibold mb-4 text-askus-dark">Our Mission</h3>
              <p className="text-gray-600 mb-4">
                To empower businesses with innovative digital solutions that drive growth, enhance customer engagement, and create lasting value in an increasingly digital world.
              </p>
              <p className="text-gray-600">
                We are committed to understanding each client's unique needs and delivering tailored solutions that exceed expectations and help them achieve their business objectives.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-2xl font-semibold mb-4 text-askus-dark">Our Vision</h3>
              <p className="text-gray-600 mb-4">
                To be the leading digital solutions provider known for excellence, innovation, and client satisfaction, helping businesses of all sizes harness the full potential of digital technology.
              </p>
              <p className="text-gray-600">
                We envision a future where every business, regardless of its size or industry, can leverage digital tools and strategies to thrive in the digital age.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-askus-dark">Our Core Values</h2>
            <p className="text-lg text-gray-600">
              These principles guide our work and interactions with clients and partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Trophy className="text-askus-purple" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-askus-dark">Excellence</h3>
              <p className="text-gray-600">We strive for excellence in everything we do, maintaining the highest standards of quality and professionalism.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="text-askus-purple" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-askus-dark">Collaboration</h3>
              <p className="text-gray-600">We believe in the power of collaboration, working closely with our clients and within our team to achieve the best results.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="text-askus-purple" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-askus-dark">Reliability</h3>
              <p className="text-gray-600">We pride ourselves on being reliable partners, delivering on our promises and meeting deadlines consistently.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Target className="text-askus-purple" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-askus-dark">Innovation</h3>
              <p className="text-gray-600">We embrace innovation and creativity, constantly exploring new technologies and approaches to deliver cutting-edge solutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-askus-dark">Meet Our Team</h2>
            <p className="text-lg text-gray-600">
              Our talented team of digital experts is the heart of AskUS.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
              <div className="h-64 bg-gray-200"></div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-askus-dark">John Smith</h3>
                <p className="text-askus-purple mb-3">CEO & Founder</p>
                <p className="text-gray-600 text-sm">
                  With over 15 years of experience in digital technology, John leads our team with vision and expertise.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
              <div className="h-64 bg-gray-200"></div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-askus-dark">Sarah Johnson</h3>
                <p className="text-askus-purple mb-3">CTO</p>
                <p className="text-gray-600 text-sm">
                  Sarah oversees all technical aspects of our projects, ensuring we deliver cutting-edge solutions.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
              <div className="h-64 bg-gray-200"></div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-askus-dark">Michael Chen</h3>
                <p className="text-askus-purple mb-3">Creative Director</p>
                <p className="text-gray-600 text-sm">
                  Michael brings creativity and innovation to all our design projects, creating stunning visual experiences.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
              <div className="h-64 bg-gray-200"></div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-askus-dark">Emily Davis</h3>
                <p className="text-askus-purple mb-3">Marketing Strategist</p>
                <p className="text-gray-600 text-sm">
                  Emily develops effective digital marketing strategies that help our clients reach their target audience.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-askus-purple hover:bg-askus-purple/90">
              Join Our Team
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
