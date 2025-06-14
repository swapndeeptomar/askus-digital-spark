import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingContactButtons from "@/components/FloatingContactButtons";
import MovingHeaderLines from "@/components/MovingHeaderLines";

const GetQuote = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Header */}
      <section className="pt-32 pb-16 gradient-bg text-white relative overflow-hidden">
        <MovingHeaderLines />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Get a Quote</h1>
            <p className="text-lg md:text-xl text-gray-100">
              Fill out the form below to receive a custom quote for your project.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-askus-dark">Project Details</h2>
            <form className="space-y-6">
              <div>
                <Label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                  Your Name
                </Label>
                <Input 
                  type="text" 
                  id="name" 
                  placeholder="Enter your name" 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                />
              </div>
              <div>
                <Label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Your Email
                </Label>
                <Input 
                  type="email" 
                  id="email" 
                  placeholder="Enter your email" 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                />
              </div>
              <div>
                <Label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                  Phone Number
                </Label>
                <Input 
                  type="tel" 
                  id="phone" 
                  placeholder="Enter your phone number" 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                />
              </div>
              <div>
                <Label htmlFor="projectDetails" className="block text-gray-700 text-sm font-bold mb-2">
                  Project Details
                </Label>
                <Textarea 
                  id="projectDetails" 
                  rows={5}
                  placeholder="Describe your project" 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                />
              </div>
              <Button className="bg-askus-purple hover:bg-askus-purple/90 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline">
                Get Your Quote
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingContactButtons />
    </div>
  );
};

export default GetQuote;
