
import React, { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Download } from "lucide-react";
import ServiceQuoteGenerator, { SERVICES } from "@/components/ServiceQuoteGenerator";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const GetQuote = () => {
  // Service selection and controlled form state
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    project: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // For PDF generation
  const summaryRef = useRef<HTMLDivElement>(null);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({
      ...f,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Allow PDF download after submit
    setTimeout(() => {
      handleDownloadPDF();
    }, 200); // Give a moment for summary to render if needed
  };

  // Format service summary for PDF
  const getServiceSummary = () => {
    const selected = SERVICES.filter((s) => selectedServices.includes(s.id));
    const total = selected.reduce((sum, s) => sum + s.price, 0);
    return {
      selected,
      total,
    };
  };

  // PDF Download handler using html2canvas + jspdf
  const handleDownloadPDF = async () => {
    if (!summaryRef.current) return;
    const input = summaryRef.current;
    // Use html2canvas to get image, then put in jsPDF
    const canvas = await html2canvas(input, { scale: 2, backgroundColor: "#fff" });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });
    // Scale image width to fit PDF page
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = canvas;
    const imgWidth = pageWidth - 40;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 20, 20, imgWidth, imgHeight);
    pdf.save("askus-quote.pdf");
  };

  const { selected, total } = getServiceSummary();

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
          <div className="max-w-xl mx-auto">
            <ServiceQuoteGenerator
              selected={selectedServices}
              onChange={setSelectedServices}
              readOnly={submitted}
            />
            <div
              ref={summaryRef}
              className="bg-white p-8 rounded-xl shadow-md border border-gray-100 print:bg-white"
            >
              <h2 className="text-2xl font-bold mb-6 text-askus-dark">
                Get a Free Quote
              </h2>
              <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    className="w-full p-3 border rounded-lg"
                    value={form.name}
                    onChange={handleFormChange}
                    readOnly={submitted}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-3 border rounded-lg"
                    value={form.email}
                    onChange={handleFormChange}
                    readOnly={submitted}
                  />
                </div>
                <div>
                  <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
                    Project Details
                  </label>
                  <Textarea
                    id="project"
                    placeholder="Tell us a bit about your project..."
                    className="w-full p-3 border rounded-lg"
                    rows={6}
                    value={form.project}
                    onChange={handleFormChange}
                    readOnly={submitted}
                  />
                </div>
                {!submitted ? (
                  <Button
                    type="submit"
                    className="w-full bg-askus-purple hover:bg-askus-purple/90 flex items-center justify-center gap-2"
                  >
                    <Send size={16} /> Submit Request
                  </Button>
                ) : (
                  <Button
                    type="button"
                    className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
                    onClick={handleDownloadPDF}
                  >
                    <Download size={16} /> Download PDF
                  </Button>
                )}
              </form>
              {/* Show summary inside form after submit for PDF */}
              {submitted && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-askus-purple mb-2 flex items-center gap-2">
                    Your Selected Services
                  </h3>
                  {selected.length === 0 ? (
                    <div className="text-gray-400">No services selected.</div>
                  ) : (
                    <ul>
                      {selected.map((s, idx) => (
                        <li key={s.id} className="flex justify-between py-1 border-b last:border-b-0">
                          <span>{s.name}</span>
                          <span className="text-askus-purple font-medium">
                            ₹{s.price.toLocaleString()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex justify-between mt-4 border-t pt-3 font-bold">
                    <span>Total Estimate:</span>
                    <span className="text-askus-purple text-lg">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
            {!!submitted && (
              <p className="text-center mt-3 text-green-700">
                Thank you for your request! You may now download your quote as a PDF.
              </p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default GetQuote;
