import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const RAZORPAY_KEY = "rzp_test_1DP5mmOlF5G5ag"; // demo key, replace with real key in prod!
const PAYMENT_AMOUNT = 50000; // 500.00 INR as sample

const Payment = () => {
  const [number, setNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handler for Razorpay payment success
  async function handleRazorpaySuccess(response: any) {
    // Record payment in Supabase
    setIsLoading(true);
    // Insert to Supabase payments: { number, amount, status }
    const { error } = await supabase.from("payments").insert({
      number: number || "unknown",
      amount: PAYMENT_AMOUNT / 100, // store as rupees, not paise
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

  // Razorpay will be embedded via script on button click
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow py-20">
        <div className="container mx-auto max-w-xl bg-white p-6 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-center text-askus-dark mb-8">
            Make a Payment
          </h1>
          <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <span className="font-semibold text-sm mb-1">Scan to Pay (Sample QR)</span>
              <div className="border rounded-lg bg-gray-100 p-2">
                <img
                  src="/lovable-uploads/b9148232-f0bf-406b-9c86-a82618eb4e94.png"
                  alt="DigiSphere QR"
                  className="w-40 h-40 object-contain"
                />
              </div>
              <span className="text-xs text-gray-500 mt-2">
                UPI/PayTM/Google Pay compatible
              </span>
            </div>
            <div className="flex flex-col items-center gap-4 w-full sm:w-auto">
              <span className="font-semibold text-sm">Pay with Razorpay</span>
              {/* Input for mobile/UPI number */}
              <input
                type="text"
                placeholder="Your phone or UPI number"
                className="w-full sm:w-56 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-askus-purple bg-gray-50 text-sm"
                value={number}
                onChange={e => setNumber(e.target.value)}
                disabled={isLoading}
              />
              <Button
                className="bg-askus-purple hover:bg-askus-purple/90 px-6 py-3 w-full"
                onClick={openRazorpayCheckout}
                disabled={isLoading}
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
              For queries regarding your payment, please <Link to="/contact" className="text-askus-purple underline">contact us</Link>.
            </p>
            <span className="text-gray-400 text-xs">This is a demo payment page for DigiSphere.</span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;
