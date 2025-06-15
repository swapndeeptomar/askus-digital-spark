
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

// Razorpay will be embedded via script on button click
function openRazorpayCheckout() {
  const options = {
    key: "rzp_test_1DP5mmOlF5G5ag", // demo key, replace with real key in prod!
    amount: 50000, // 500.00 INR as sample
    currency: "INR",
    name: "DigiSphere",
    description: "Sample Payment",
    image: "/favicon.ico",
    handler: function (response: any) {
      alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
    },
    prefill: {
      name: "",
      email: "",
      contact: "",
    },
    theme: {
      color: "#8F5DF0",
    },
  };

  // If Razorpay not present, load script dynamically
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

const Payment = () => {
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
                  src="/qr_digisphere_sample.png"
                  alt="DigiSphere QR"
                  className="w-40 h-40 object-contain"
                />
              </div>
              <span className="text-xs text-gray-500 mt-2">
                UPI/PayTM/Google Pay compatible
              </span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <span className="font-semibold text-sm">Pay with Razorpay</span>
              <Button
                className="bg-askus-purple hover:bg-askus-purple/90 px-6 py-3 w-full"
                onClick={openRazorpayCheckout}
              >
                Pay via Razorpay
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
