import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingContactButtons from "@/components/FloatingContactButtons";

const Contact = () => {
  return <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-16 gradient-bg text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Contact Us</h1>
            <p className="text-lg md:text-xl text-gray-100">
              Get in touch with our team to discuss how we can help with your digital needs at DigiSphere.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-askus-dark">Get in Touch</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <Input id="name" placeholder="Enter your name" className="w-full p-3 border rounded-lg" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                    <Input id="email" type="email" placeholder="Enter your email" className="w-full p-3 border rounded-lg" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <Input id="subject" placeholder="Enter subject" className="w-full p-3 border rounded-lg" />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                  <Textarea id="message" placeholder="Enter your message" className="w-full p-3 border rounded-lg" rows={6} />
                </div>
                
                <Button type="submit" className="w-full bg-askus-purple hover:bg-askus-purple/90 flex items-center justify-center gap-2">
                  <Send size={16} />
                  Send Message
                </Button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-askus-dark">Our Location</h2>
              
              {/* Map */}
              <div className="h-64 bg-gray-200 rounded-xl mb-8 overflow-hidden">
                <img alt="Location Map" className="w-full h-full object-cover" src="https://onefivenine.com/images/GoogleMapImages/22_7475_89.jpg" />
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold mb-4 text-askus-dark">Contact Details</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Mail className="text-askus-purple mt-1" size={20} />
                    <div>
                      <p className="font-medium text-askus-dark">Email</p>
                      <p className="text-gray-600">ask.us.technocrats@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Phone className="text-askus-purple mt-1" size={20} />
                    <div>
                      <p className="font-medium text-askus-dark">Phone</p>
                      <p className="text-gray-600"><a><u>9926089855</u></a> , <a><u>9039616208</u></a> </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <MapPin className="text-askus-purple mt-1" size={20} />
                    <div>
                      <p className="font-medium text-askus-dark">Address</p>
                      <p className="text-gray-600">Indore , Madhya Pradesh</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium text-askus-dark mb-2">Working Hours</h4>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
                
                <div className="mt-6 flex space-x-4">
                  <a href="https://facebook.com" className="text-askus-purple hover:text-askus-purple/80" aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                  </a>
                  <a href="https://twitter.com" className="text-askus-purple hover:text-askus-purple/80" aria-label="Twitter">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                  </a>
                  <a href="https://linkedin.com" className="text-askus-purple hover:text-askus-purple/80" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-askus-dark">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Find answers to commonly asked questions about our services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-3 text-askus-dark">What services do you offer?</h3>
              <p className="text-gray-600">
                We offer a comprehensive range of digital services including web development, mobile app development, SEO optimization, digital marketing, graphic design, and cybersecurity solutions.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-3 text-askus-dark">How much do your services cost?</h3>
              <p className="text-gray-600">
                Our pricing varies based on the specific requirements of each project. We offer customized solutions tailored to your needs and budget. Contact us for a free quote.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-3 text-askus-dark">How long does a typical project take?</h3>
              <p className="text-gray-600">
                Project timelines depend on the scope and complexity of the work. We provide detailed timelines during the planning phase and keep you updated throughout the project.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-3 text-askus-dark">Do you offer ongoing support?</h3>
              <p className="text-gray-600">
                Yes, we offer various support and maintenance packages to ensure your digital assets continue to perform optimally after launch. We can discuss the best option for your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingContactButtons />
    </div>;
};
export default Contact;
