import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AdminContactMessages from "@/components/admin/AdminContactMessages";
import AdminPayments from "@/components/admin/AdminPayments";
import AdminQuotes from "@/components/admin/AdminQuotes";
import AdminTestimonials from "@/components/admin/AdminTestimonials";
import AdminQuotesPDFs from "@/components/admin/AdminQuotesPDFs";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Protect this page—must be admin
    const isAdmin = localStorage.getItem("isAdmin") === "1";
    if (!isAdmin) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden bg-gradient-to-br from-askus-purple/70 via-askus-light/90 to-white/95 dark:from-[#201C3E]/90 dark:via-[#15001E]/80 dark:to-[#2b2550]/70">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center px-2 sm:px-6 pt-24 w-full">
        <div className="w-full max-w-6xl mx-auto bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/60 text-center space-y-6">
          <div className="flex flex-col gap-2 items-center mb-3">
            <div className="w-12 h-12 bg-askus-purple rounded-full text-white flex items-center justify-center font-bold text-2xl shadow">A</div>
            <h2 className="text-3xl font-bold text-askus-dark">Admin Panel</h2>
          </div>
          <Tabs defaultValue="contact" className="w-full text-left">
            <TabsList className="flex flex-wrap gap-2 mb-6 justify-center w-full">
              <TabsTrigger value="contact" className="min-w-[110px]">Contact Messages</TabsTrigger>
              <TabsTrigger value="payments" className="min-w-[110px]">Payments</TabsTrigger>
              <TabsTrigger value="quotes" className="min-w-[110px]">Quotes</TabsTrigger>
              <TabsTrigger value="testimonials" className="min-w-[110px]">Testimonials</TabsTrigger>
              <TabsTrigger value="pdfs" className="min-w-[110px]">Quotes PDFs</TabsTrigger>
            </TabsList>
            <TabsContent value="contact"><AdminContactMessages /></TabsContent>
            <TabsContent value="payments"><AdminPayments /></TabsContent>
            <TabsContent value="quotes"><AdminQuotes /></TabsContent>
            <TabsContent value="testimonials"><AdminTestimonials /></TabsContent>
            <TabsContent value="pdfs"><AdminQuotesPDFs /></TabsContent>
          </Tabs>
          <Button onClick={handleLogout} className="bg-askus-purple hover:bg-askus-purple/90 w-full mt-8">Logout</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
