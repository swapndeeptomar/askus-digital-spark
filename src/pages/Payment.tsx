
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { QrCode, CreditCard } from "lucide-react";

const RAZORPAY_KEY = "rzp_test_1DP5mmOlF5G5ag";
const PAYMENT_AMOUNT = 50000; // 500.00 INR as sample

const Payment = () => {
  const [number, setNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleRazorpaySuccess(response: any) {
    setIsLoading(true);
    const { error } = await supabase.from("payments").insert({
      number: number || "unknown",
      amount: PAYMENT_AMOUNT / 100,
      status: "success",
    });
    setIsLoading(false);
    if (error) {
      toast({
        title: "Error saving payment!",
        description: "Payment was successful but we could not save it. Please contact support.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Payment successful!",
      description: `Payment ID: ${response.razorpay_payment_id}`,
    });
  }

  function openRazorpayCheckout() {
    if (!number) {
      toast({
        title: "Enter your phone or UPI number",
        description: "Please enter your number before proceeding to pay.",
        variant: "destructive",
      });
      return;
    }

    const options = {
      key: RAZORPAY_KEY,
      amount: PAYMENT_AMOUNT,
      currency: "INR",
      name: "DigiSphere",
      description: "Sample Payment",
      image: "/favicon.ico",
      handler: handleRazorpaySuccess,
      prefill: {
        name: "",
        email: "",
        contact: number,
      },
      theme: { color: "#8F5DF0" },
    };

    if (!(window as any).Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      };
      document.body.appendChild(script);
    } else {
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    }
  }

  return (
    <div className="flex flex-col min-h-screen gradient-bg">
      <Navbar />
      <main className="flex-grow py-20">
        <div className="container mx-auto max-w-xl bg-white/90 p-6 sm:p-10 rounded-2xl shadow-2xl animate-fade-in border border-purple-100">
          <h1 className="text-3xl font-bold text-center text-askus-dark mb-4 animate-slide-up">
            Make a Payment
          </h1>
          <div className="flex justify-center mb-2">
            <span className="inline-flex items-center gap-3 text-askus-purple/90 font-semibold bg-purple-50 px-3 py-1.5 rounded-lg shadow-sm animate-float">
              <CreditCard className="text-askus-purple" size={22} />
              Secure Payments via DigiSphere
              <QrCode className="ml-2 text-askus-purple" size={22} />
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-10 items-center justify-center mt-8">
            {/* QR payment */}
            <div className="flex flex-col items-center gap-2 bg-purple-50/60 p-4 rounded-xl shadow hover:shadow-xl transition-all">
              <span className="font-semibold text-sm mb-1 flex items-center gap-1">
                <QrCode className="text-askus-purple" size={18} /> Scan to Pay (Sample QR)
              </span>
              <div className="border rounded-lg bg-gray-100 p-2 shadow transition-all">
                <img
                  src="/lovable-uploads/b9148232-f0bf-406b-9c86-a82618eb4e94.png"
                  alt="DigiSphere QR"
                  className="w-40 h-40 object-contain"
                />
              </div>
              <span className="text-xs text-gray-500 mt-2">
                UPI / PayTM / Google Pay compatible
              </span>
            </div>

            {/* Razorpay card payment */}
            <div className="flex flex-col items-center gap-4 w-full sm:w-auto bg-purple-50/60 p-4 rounded-xl shadow hover:shadow-xl transition-all">
              <span className="font-semibold text-sm flex items-center gap-1">
                <CreditCard className="text-askus-purple" size={18} />
                Pay with Razorpay
              </span>
              <Input
                type="text"
                placeholder="Your phone or UPI number"
                className="w-full sm:w-56"
                value={number}
                onChange={e => setNumber(e.target.value)}
                disabled={isLoading}
                maxLength={32}
              />
              <Button
                className="bg-askus-purple hover:bg-askus-purple/90 px-6 py-3 w-full transition-transform duration-200 hover:scale-105 hover:shadow-lg"
                onClick={openRazorpayCheckout}
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? "Processing..." : "Pay via Razorpay"}
              </Button>
              <span className="text-xs text-gray-500">
                Accepts debit/credit card, UPI, and more
              </span>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600 text-xs mb-2">
              For queries regarding your payment, please{" "}
              <Link to="/contact" className="text-askus-purple underline">
                contact us
              </Link>.
            </p>
            <span className="text-gray-400 text-xs">
              This is a demo payment page for DigiSphere.
            </span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;
