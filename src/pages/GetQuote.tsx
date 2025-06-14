
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingContactButtons from "@/components/FloatingContactButtons";
import MovingHeaderLines from "@/components/MovingHeaderLines";
import ServiceQuoteGenerator, { SERVICES } from "@/components/ServiceQuoteGenerator";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const GetQuote = () => {
  // Controlled form fields
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { toast } = useToast();
  const printRef = useRef<HTMLDivElement>(null);

  // Helper: get full selected service data and total
  const selectedServicesInfo = SERVICES.filter(s => selectedServices.includes(s.id));
  const totalEstimate = selectedServicesInfo.reduce((acc, s) => acc + s.price, 0);

  // Handle Save to Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validation (feel free to enhance further)
    if (!name || !email || !details) {
      toast({
        variant: "destructive",
        title: "Please fill all required fields (Name, Email, Details)"
      });
      return;
    }
    setSubmitting(true);

    // Compose subject, message for DB
    const serviceList = selectedServicesInfo.map(s => `- ${s.name} (₹${s.price.toLocaleString()})`).join("\n");
    const subject = selectedServicesInfo.length
      ? `Quote Request: ${selectedServicesInfo.map(s => s.name).join(", ")}`
      : "Quote Request";
    const message = `Project Details:\n${details}\n\nServices Selected:\n${serviceList || "None selected"}\n\nEstimated Total: ₹${totalEstimate.toLocaleString()}`;
    const mobile = phone;

    try {
      const { error } = await supabase.from("contact_messages").insert([
        {
          name,
          email,
          mobile,
          subject,
          message,
        },
      ]);
      if (error) {
        throw error;
      }
      toast({
        variant: "default",
        title: "Quote sent!",
        description: "We'll get back to you soon.",
      });
      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setDetails("");
      setSelectedServices([]);
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Failed to send quote",
        description: err.message || "Unknown error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Print
  const handlePrint = () => {
    if (!printRef.current) return;
    const printContents = printRef.current.innerHTML;
    const printWindow = window.open('', '', 'height=640,width=480');
    if (!printWindow) return;
    printWindow.document.write('<html><head><title>Quote Summary</title>');
    printWindow.document.write(
      `<style>
        body { font-family: sans-serif; padding: 24px; }
        h3 { color: #7c3aed; }
        .services-table { border-collapse: collapse; width: 100%; margin-bottom: 1em; }
        .services-table th,.services-table td { border: 1px solid #e5e7eb; padding: 0.5em 0.75em; text-align: left; }
        .total { font-weight: bold; color: #7c3aed; }
      </style>`
    );
    printWindow.document.write('</head><body>');
    printWindow.document.write(printContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

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

      {/* Auto Quote Generator */}
      <section className="pt-10 pb-2 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <ServiceQuoteGenerator
              selected={selectedServices}
              onChange={setSelectedServices}
            />
          </div>
        </div>
      </section>

      {/* Quote Form + Print Preview */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-askus-dark">Project Details</h2>
            {/* Printable preview */}
            <div ref={printRef} className="hidden print:block">
              <h3>User Information</h3>
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Email:</strong> {email}</p>
              {phone && <p><strong>Phone:</strong> {phone}</p>}
              <h3>Project Details</h3>
              <p>{details}</p>
              <h3>Selected Services</h3>
              {selectedServicesInfo.length === 0 ? (
                <p>No services selected.</p>
              ) : (
                <table className="services-table">
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedServicesInfo.map(s => (
                      <tr key={s.id}>
                        <td>{s.name}</td>
                        <td>₹{s.price.toLocaleString()}</td>
                      </tr>
                    ))}
                    <tr className="total">
                      <td>Total</td>
                      <td>₹{totalEstimate.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>

            <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
              <div>
                <Label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                  Your Name
                </Label>
                <Input 
                  type="text" 
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Your Email
                </Label>
                <Input 
                  type="email" 
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                  Phone Number
                </Label>
                <Input 
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
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
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                  placeholder="Describe your project"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex items-center gap-4">
                <Button
                  className="bg-askus-purple hover:bg-askus-purple/90 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? "Sending..." : "Get Your Quote"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrint}
                  className="border border-askus-purple text-askus-purple hover:bg-purple-50"
                >
                  Print Quote
                </Button>
              </div>
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
