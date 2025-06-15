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
  const [pdfUploadUrl, setPdfUploadUrl] = useState<string | null>(null);

  const { toast } = useToast();
  const printRef = useRef<HTMLDivElement>(null);

  // Helper: get full selected service data and total
  const selectedServicesInfo = SERVICES.filter(s => selectedServices.includes(s.id));
  const totalEstimate = selectedServicesInfo.reduce((acc, s) => acc + s.price, 0);

  // PDF generation logic extracted for re-use
  const createPdfBlob = (): Blob => {
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

    // Leave some space before adding the formal text
    y += 60;

    // Signature / Formal label
    doc.setFontSize(13);
    doc.setFont(undefined, "bold");
    doc.setTextColor(66, 66, 66);
    doc.text("For DigiSphere,", colService, y);

    y += 22;
    doc.setFont(undefined, "italic");
    doc.setFontSize(12);
    doc.text("Digitally signed by DigiSphere", colService, y);

    y += 30;
    doc.setFont(undefined, "bold");
    doc.setFontSize(11);
    doc.setTextColor(120, 120, 120);
    doc.text("Terms and Conditions", colService, y);

    y += 16;
    doc.setFont(undefined, "normal");
    doc.setFontSize(10);
    doc.setTextColor(130, 130, 130);
    const termsLines = doc.splitTextToSize(
      "1. The estimate provided is based on the specifications shared and may be subject to revision upon further project discussion.\n" +
      "2. Taxes, if any, will be charged extra as applicable.\n" +
      "3. Work commences upon receipt of initial payment as agreed.\n" +
      "4. All intellectual property developed remains with DigiSphere until full payment is received.\n" +
      "5. This quote is strictly confidential. Please contact us for clarifications.",
      doc.internal.pageSize.getWidth() - 96
    );
    doc.text(termsLines, colService, y);

    // Get the PDF blob (we'll upload this)
    return doc.output("blob");
  };

  // PDF download handler
  const handleDownloadPdf = () => {
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

    // Leave some space before adding the formal text
    y += 60;

    // Signature / Formal label
    doc.setFontSize(13);
    doc.setFont(undefined, "bold");
    doc.setTextColor(66, 66, 66);
    doc.text("For DigiSphere,", colService, y);

    y += 22;
    doc.setFont(undefined, "italic");
    doc.setFontSize(12);
    doc.text("Digitally signed by DigiSphere", colService, y);

    y += 30;
    doc.setFont(undefined, "bold");
    doc.setFontSize(11);
    doc.setTextColor(120, 120, 120);
    doc.text("Terms and Conditions", colService, y);

    y += 16;
    doc.setFont(undefined, "normal");
    doc.setFontSize(10);
    doc.setTextColor(130, 130, 130);
    const termsLines = doc.splitTextToSize(
      "1. The estimate provided is based on the specifications shared and may be subject to revision upon further project discussion.\n" +
      "2. Taxes, if any, will be charged extra as applicable.\n" +
      "3. Work commences upon receipt of initial payment as agreed.\n" +
      "4. All intellectual property developed remains with DigiSphere until full payment is received.\n" +
      "5. This quote is strictly confidential. Please contact us for clarifications.",
      doc.internal.pageSize.getWidth() - 96
    );
    doc.text(termsLines, colService, y);

    // Save PDF
    const safeName = name ? name.replace(/[^a-zA-Z0-9]/g, "_") : "User";
    doc.save(
      `digisphere-quote-${safeName}-${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`
    );
  };

  const uploadPdfToStorage = async (blob: Blob): Promise<{ filename: string; publicUrl: string | null } | null> => {
    const safeName = name ? name.replace(/[^a-zA-Z0-9]/g, "_") : "user";
    const filename = `digisphere-quote-${safeName}-${Date.now()}.pdf`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('quotes-pdfs')
      .upload(filename, blob, { contentType: "application/pdf" });

    if (error) {
      toast({
        variant: "destructive",
        title: "PDF Upload Failed",
        description: error.message
      });
      return null;
    }

    // Get the public URL
    const { data: publicData } = supabase
      .storage
      .from("quotes-pdfs")
      .getPublicUrl(filename);

    if (publicData?.publicUrl) setPdfUploadUrl(publicData.publicUrl);

    toast({
      variant: "default",
      title: "Quote PDF Uploaded",
      description: "Your PDF quote is securely stored.",
    });

    return { filename, publicUrl: publicData?.publicUrl ?? null };
  };

  // Handle Save to Supabase and upload PDF file
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

    try {
      // 1. Create and upload PDF
      const pdfBlob = createPdfBlob();
      const upload = await uploadPdfToStorage(pdfBlob);
      if (!upload) throw new Error("PDF upload failed");

      // 2. Insert quote details into new quotes table
      const { error: dbError } = await supabase.from("quotes").insert([
        {
          name,
          email,
          phone,
          project_details: details,
          selected_services: selectedServicesInfo.map(s => ({
            id: s.id,
            name: s.name,
            description: s.description,
            price: s.price,
          })),
          total_estimate: totalEstimate,
          pdf_filename: upload.filename,
          pdf_url: upload.publicUrl,
        },
      ]);
      if (dbError) throw dbError;

      toast({
        variant: "default",
        title: "Quote sent!",
        description: "We'll get back to you soon.",
      });
      setQuoteReady(true);
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
                    onClick={handleDownloadPdf}
                    className="border border-askus-purple text-askus-purple hover:bg-purple-50"
                  >
                    Download Your Quote
                  </Button>
                )}
              </div>
            </form>
            {/* Optional: show PDF URL after upload */}
            {quoteReady && pdfUploadUrl && (
              <div className="mt-4">
                <span className="text-xs text-gray-400">PDF stored at: </span> 
                <a href={pdfUploadUrl} target="_blank" rel="noopener noreferrer" className="text-askus-purple underline break-all">{pdfUploadUrl}</a>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingContactButtons />
    </div>
  );
};

export default GetQuote;
