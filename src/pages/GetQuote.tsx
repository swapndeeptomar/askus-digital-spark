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
import jsPDF from "jspdf";

const GetQuote = () => {
  // Controlled form fields
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [quoteReady, setQuoteReady] = useState(false); // Show download button after submit

  const { toast } = useToast();
  const printRef = useRef<HTMLDivElement>(null);

  // Helper: get full selected service data and total
  const selectedServicesInfo = SERVICES.filter(s => selectedServices.includes(s.id));
  const totalEstimate = selectedServicesInfo.reduce((acc, s) => acc + s.price, 0);

  // Handle Save to Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !details) {
      toast({
        variant: "destructive",
        title: "Please fill all required fields (Name, Email, Details)"
      });
      return;
    }
    setSubmitting(true);

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
      setQuoteReady(true); // Enable Download button
      // Do NOT reset form values so user can download using the filled data
      // setName(""); setEmail(""); setPhone(""); setDetails(""); setSelectedServices([]);
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

  // PDF download handler
  const downloadPdf = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    // Dimensions
    const pageWidth = doc.internal.pageSize.getWidth();
    // DigiSphere Purple: #8F5DF0
    const headerHeight = 80;

    // Header rect (purple)
    doc.setFillColor(143, 93, 240);
    doc.rect(0, 0, pageWidth, headerHeight, "F");

    // DigiSphere title
    doc.setFontSize(28);
    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, 'bold');
    doc.text("DigiSphere - Service Quote", pageWidth / 2, 52, {
      align: "center",
      baseline: "middle",
    });

    // Start content after header
    let y = headerHeight + 28;

    // "Prepared For" section
    doc.setFontSize(15);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(33, 33, 33);
    doc.text("Prepared For:", 48, y);

    y += 26;
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(`Name: `, 60, y);
    doc.setFont(undefined, 'bold');
    doc.text(name || "-", 108, y);

    doc.setFont(undefined, 'normal');
    y += 18;
    doc.text(`Email: `, 60, y);
    doc.setFont(undefined, 'bold');
    doc.text(email || "-", 108, y);

    doc.setFont(undefined, 'normal');
    y += 18;
    doc.text(`Mobile: `, 60, y);
    doc.setFont(undefined, 'bold');
    doc.text(phone || "-", 108, y);

    // Project Details
    y += 30;
    doc.setFont(undefined, 'bold');
    doc.setFontSize(13);
    doc.setTextColor(33, 33, 33);
    doc.text("Project Details", 48, y);

    y += 16;
    doc.setFont(undefined, 'normal');
    doc.setFontSize(12);
    doc.setTextColor(66, 66, 66);
    const detLines = doc.splitTextToSize(details || "-", pageWidth - 96);
    doc.text(detLines, 60, y);
    y += detLines.length * 15 + 4;

    // Selected Services section
    y += 16;
    doc.setFont(undefined, 'bold');
    doc.setFontSize(13);
    doc.setTextColor(33, 33, 33);
    doc.text("Selected Services", 48, y);

    y += 16;

    // Table Header
    doc.setFont(undefined, 'bold');
    doc.setFontSize(12);
    doc.setTextColor(33,33,33);
    doc.setDrawColor(143, 93, 240); // Header underline

    // Table columns start x positions
    const colService = 60;
    const colDesc = colService + 130;
    const colPrice = pageWidth - 90;

    doc.text("Service", colService, y);
    doc.text("Description", colDesc, y);
    doc.text("Price (₹)", colPrice, y, { align: "right" });

    y += 3;
    doc.setLineWidth(1);
    doc.line(colService, y, pageWidth - 60, y);

    y += 13;

    // Table rows
    doc.setFont(undefined, 'normal');
    doc.setFontSize(11);

    if (selectedServicesInfo.length === 0) {
      doc.setTextColor(146, 146, 146);
      doc.text("No services selected.", colService, y);
      y += 20;
    } else {
      selectedServicesInfo.forEach((serv, idx) => {
        doc.setTextColor(33, 33, 33);
        doc.text(serv.name, colService, y, { maxWidth: 125 });

        // Service description (wrap if needed)
        const descLines = doc.splitTextToSize(serv.description, colPrice - colDesc - 24);
        doc.setTextColor(80, 80, 80);
        doc.text(descLines, colDesc, y);

        // The price should align right
        doc.setTextColor(33, 33, 33);
        doc.text(`₹${serv.price.toLocaleString()}`, colPrice, y, { align: "right" });

        // Move y by the tallest cell
        y += Math.max(18, descLines.length * 14);
      });
    }

    // Total Estimate section
    y += 18;
    doc.setLineWidth(0.5);
    doc.setDrawColor(200, 180, 255);
    doc.line(colService, y, pageWidth - 60, y);

    y += 24;
    doc.setFontSize(15);
    doc.setFont(undefined, "bold");
    doc.setTextColor(143, 93, 240);
    doc.text("Total Estimate:", colService, y);
    doc.text(
      `₹${totalEstimate.toLocaleString()}`,
      colPrice,
      y,
      { align: "right" }
    );

    // Validity note
    y += 10;
    doc.setFont(undefined, "normal");
    doc.setFontSize(11);
    doc.setTextColor(176, 154, 219);
    doc.text(
      "This quote is valid for 15 days. Contact us if you have any questions.",
      colService,
      y + 20
    );

    // Save PDF
    const safeName = name ? name.replace(/[^a-zA-Z0-9]/g, "_") : "User";
    doc.save(
      `digisphere-quote-${safeName}-${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`
    );
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
            {/* Printable preview (unchanged, hidden) */}
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
                  disabled={quoteReady}
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
                  disabled={quoteReady}
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
                  disabled={quoteReady}
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
                  disabled={quoteReady}
                />
              </div>
              <div className="flex flex-wrap items-center gap-4">
                {!quoteReady && (
                  <Button
                    className="bg-askus-purple hover:bg-askus-purple/90 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit to Get Quote"}
                  </Button>
                )}
                {quoteReady && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={downloadPdf}
                    className="border border-askus-purple text-askus-purple hover:bg-purple-50"
                  >
                    Download Your Quote
                  </Button>
                )}
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
