
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const DigiSpherePrivacyContent = () => (
  <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
    <h1 className="text-2xl font-bold mb-4 text-askus-dark">Privacy Policy</h1>
    <p className="mb-6 text-gray-800">
      DigiSphere values your privacy and is committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information.
    </p>
    <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
    <p className="mb-4 text-gray-700">
      We may collect personal information such as your name, email, phone number, and company details when you use our services or contact us.
    </p>
    <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
    <p className="mb-4 text-gray-700">
      - To provide and improve our services<br />
      - To communicate with you<br />
      - To personalize your experience<br />
      - To comply with legal obligations
    </p>
    <h2 className="text-xl font-semibold mb-2">3. Information Sharing</h2>
    <p className="mb-4 text-gray-700">
      We do not sell or rent your personal data to third parties. Your data may be shared with trusted partners who assist us in providing services, subject to strict confidentiality agreements.
    </p>
    <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
    <p className="mb-4 text-gray-700">
      We implement industry-standard security measures to protect your data against unauthorized access, loss, or misuse.
    </p>
    <h2 className="text-xl font-semibold mb-2">5. Cookies</h2>
    <p className="mb-4 text-gray-700">
      DigiSphere uses cookies to enhance your browsing experience and analyze usage. You may disable cookies in your browser settings.
    </p>
    <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
    <p className="mb-4 text-gray-700">
      You may request to access, modify, or delete your personal data at any time by contacting us.
    </p>
    <h2 className="text-xl font-semibold mb-2">7. Changes to Privacy Policy</h2>
    <p className="mb-4 text-gray-700">
      We may update this Privacy Policy to reflect changes in our practices. Updates will be posted on this page. Continued use of our services constitutes acceptance of the revised policy.
    </p>
    <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
    <p className="mb-4 text-gray-700">
      For privacy-related questions, please email us at <a href="mailto:ask.us.technocrats@gmail.com" className="text-askus-purple underline">ask.us.technocrats@gmail.com</a>.
    </p>
  </div>
);

const Privacy = () => {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-12 px-4 bg-gray-50 flex justify-center items-center">
        <div>
          <DigiSpherePrivacyContent />
          <div className="flex items-center gap-2 mt-8">
            <Checkbox id="accept-privacy" checked={accepted} onCheckedChange={val => setAccepted(!!val)} />
            <label htmlFor="accept-privacy" className="text-gray-700 select-none">
              I accept the Privacy Policy
            </label>
          </div>
          <Button
            className="mt-4"
            disabled={!accepted}
            onClick={() => alert("Thank you for accepting the Privacy Policy!")}
          >
            Accept
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
