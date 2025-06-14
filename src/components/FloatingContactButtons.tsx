
import React from "react";
import { MessageCircle, Mail } from "lucide-react";

// Replace with your actual contact info if needed
const WHATSAPP_LINK = "https://wa.me/911234567890";
const GMAIL_LINK = "mailto:info@example.com";

const FloatingContactButtons: React.FC = () => (
  <div className="fixed z-50 bottom-6 left-6 flex flex-col gap-2 print:hidden">
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="group relative bg-purple-50 rounded-full flex items-center justify-center w-8 h-8 shadow-sm border border-askus-purple/15 transition hover:ring-2 hover:ring-green-400 hover:bg-green-50"
      style={{ minWidth: 32, minHeight: 32 }}
    >
      <MessageCircle className="w-4 h-4 text-green-600 group-hover:scale-110 transition" />
      <span className="absolute -right-2 -top-2 text-[10px] px-1.5 py-0.5 rounded bg-white shadow pointer-events-none opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-90 transition-opacity transition-transform duration-150 text-gray-600 border border-gray-100">
        WhatsApp
      </span>
    </a>
    <a
      href={GMAIL_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Gmail"
      className="group relative bg-purple-50 rounded-full flex items-center justify-center w-8 h-8 shadow-sm border border-askus-purple/15 transition hover:ring-2 hover:ring-red-400 hover:bg-red-50"
      style={{ minWidth: 32, minHeight: 32 }}
    >
      <Mail className="w-4 h-4 text-red-500 group-hover:scale-110 transition" />
      <span className="absolute -right-2 -top-2 text-[10px] px-1.5 py-0.5 rounded bg-white shadow pointer-events-none opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-90 transition-opacity transition-transform duration-150 text-gray-600 border border-gray-100">
        Gmail
      </span>
    </a>
  </div>
);

export default FloatingContactButtons;
