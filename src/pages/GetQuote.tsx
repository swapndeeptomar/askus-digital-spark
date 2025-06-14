
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const GetQuote = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="pt-32 pb-16 gradient-bg text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Request a Free Quote
            </h1>
            <p className="text-lg md:text-xl text-gray-100">
              Tell us about your project, and we’ll get back to you with a tailored quote as soon as possible.
            </p>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-askus-dark">Get a Free Quote</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <Input id="name" placeholder="Enter your name" className="w-full p-3 border rounded-lg"/>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                <Input id="email" type="email" placeholder="Enter your email" className="w-full p-3 border rounded-lg"/>
              </div>
              <div>
                <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">Project Details</label>
                <Textarea id="project" placeholder="Tell us a bit about your project..." className="w-full p-3 border rounded-lg" rows={6}/>
              </div>
              <Button type="submit" className="w-full bg-askus-purple hover:bg-askus-purple/90 flex items-center justify-center gap-2">
                <Send size={16} /> Submit Request
              </Button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default GetQuote;

