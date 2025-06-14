
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const DigiSphereTermsContent = () => (
  <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
    <h1 className="text-2xl font-bold mb-4 text-askus-dark">Terms of Service</h1>
    <p className="mb-6 text-gray-800">
      Welcome to DigiSphere! By accessing or using our website and services, you agree to the following terms and conditions.
    </p>
    <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
    <p className="mb-4 text-gray-700">
      By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these terms, you may not access or use our services.
    </p>
    <h2 className="text-xl font-semibold mb-2">2. Service Description</h2>
    <p className="mb-4 text-gray-700">
      DigiSphere offers innovative digital solutions, including web development, mobile app development, digital marketing, SEO, graphic design, and cybersecurity.
    </p>
    <h2 className="text-xl font-semibold mb-2">3. User Responsibilities</h2>
    <p className="mb-4 text-gray-700">
      - You are responsible for maintaining the confidentiality of your account information.<br />
      - You agree not to misuse our services or attempt to disrupt our site or systems in any way.<br />
      - You agree to provide accurate and up-to-date information when requested.
    </p>
    <h2 className="text-xl font-semibold mb-2">4. Intellectual Property</h2>
    <p className="mb-4 text-gray-700">
      All content, trademarks, logos, and intellectual property on DigiSphere are owned by us or our licensors. You may not use our intellectual property without explicit written permission.
    </p>
    <h2 className="text-xl font-semibold mb-2">5. Disclaimer of Warranties</h2>
    <p className="mb-4 text-gray-700">
      Our services are provided 'as is' and 'as available' without warranties of any kind. DigiSphere disclaims all warranties, express or implied, including merchantability and fitness for a particular purpose.
    </p>
    <h2 className="text-xl font-semibold mb-2">6. Limitation of Liability</h2>
    <p className="mb-4 text-gray-700">
      DigiSphere shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use or inability to use our services.
    </p>
    <h2 className="text-xl font-semibold mb-2">7. Changes to Terms</h2>
    <p className="mb-4 text-gray-700">
      We reserve the right to update these terms at any time. Your continued use of our services constitutes acceptance of the updated terms.
    </p>
    <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
    <p className="mb-4 text-gray-700">
      If you have any questions about these Terms, please contact us at <a href="mailto:ask.us.technocrats@gmail.com" className="text-askus-purple underline">ask.us.technocrats@gmail.com</a>.
    </p>
  </div>
);

const Terms = () => {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-12 px-4 bg-gray-50 flex justify-center items-center">
        <div>
          <DigiSphereTermsContent />
          <div className="flex items-center gap-2 mt-8">
            <Checkbox id="accept-terms" checked={accepted} onCheckedChange={val => setAccepted(!!val)} />
            <label htmlFor="accept-terms" className="text-gray-700 select-none">
              I accept the Terms of Service
            </label>
          </div>
          <Button
            className="mt-4"
            disabled={!accepted}
            onClick={() => alert("Thank you for accepting the Terms of Service!")}
          >
            Accept
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
