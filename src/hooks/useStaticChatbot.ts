
import { useState } from "react";

type ChatOption = {
  label: string;
  value: string;
  reply: string;
};

export const chatOptions: ChatOption[] = [
  {
    label: "What services do you offer?",
    value: "services",
    reply:
      "We offer web development, mobile app development, SEO optimization, digital marketing, graphic design, and cybersecurity solutions. Let me know if you want details for any service!",
  },
  {
    label: "How do I contact you?",
    value: "contact",
    reply: "You can contact us through our contact page or by emailing info@example.com.",
  },
  {
    label: "Can I get a quote?",
    value: "quote",
    reply: "Sure, click the 'Get a Free Quote' button on our homepage, and fill in the form!",
  },
  {
    label: "Where are you located?",
    value: "location",
    reply: "We are based in Chennai, India and proudly serve clients worldwide.",
  },
  {
    label: "Do you offer support?",
    value: "support",
    reply: "Absolutely! Our team is available to support you via email, WhatsApp, or phone.",
  },
];

export function useStaticChatbot() {
  const [messages, setMessages] = useState([
    { role: "assistant" as const, content: "Hi! How can I help you today? Please pick an option below." },
  ]);

  // "value" of last selected, empty if none
  const [selectedValue, setSelectedValue] = useState("");

  function sendOption(value: string) {
    const option = chatOptions.find(opt => opt.value === value);
    if (!option) return;
    setMessages(prev => [
      ...prev,
      { role: "user" as const, content: option.label },
      { role: "assistant" as const, content: option.reply },
    ]);
    setSelectedValue(""); // reset select for reuse
  }

  return { messages, sendOption, selectedValue, setSelectedValue };
}
