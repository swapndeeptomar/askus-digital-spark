
import { useState } from "react";

// Main menu/FAQ pool setup (with formal, clear answers)
export type ChatbotStep = {
  id: string;
  message: string;
  options?: {
    label: string;
    value: string;
    nextStepId?: string;
    reply?: string;
  }[];
};

export const chatbotSteps: Record<string, ChatbotStep> = {
  start: {
    id: "start",
    message:
      "Welcome to DigiSphere Support! Please choose a topic below or describe your inquiry.",
    options: [
      {
        label: "What services does DigiSphere offer?",
        value: "services_offered",
        nextStepId: "services_offered",
      },
      {
        label: "How can I get a quote?",
        value: "get_quote",
        nextStepId: "get_quote",
      },
      {
        label: "Technical Support",
        value: "technical_support",
        nextStepId: "technical_support",
      },
      {
        label: "Billing and Payment",
        value: "billing",
        nextStepId: "billing",
      },
      {
        label: "Other/General Inquiry",
        value: "other",
        nextStepId: "other",
      },
    ],
  },
  services_offered: {
    id: "services_offered",
    message:
      "DigiSphere provides web development, digital marketing (including SEO/SEM), e-commerce solutions, cloud migration, and IT consulting. Do you want information on a specific service?",
    options: [
      {
        label: "Web Development",
        value: "web_development",
        reply:
          "Our web development team specializes in creating responsive, accessible, and performant websites tailored to your business needs.",
      },
      {
        label: "Digital Marketing",
        value: "digital_marketing",
        reply:
          "DigiSphere's digital marketing experts can help grow your online presence through SEO, SEM, and targeted campaigns.",
      },
      {
        label: "E-commerce Solutions",
        value: "ecommerce",
        reply:
          "We build robust e-commerce platforms, including storefronts, payment integration, and inventory management.",
      },
      {
        label: "Back to Main Menu",
        value: "back",
        nextStepId: "start",
      },
    ],
  },
  get_quote: {
    id: "get_quote",
    message:
      "To receive a personalized quote, please visit our Get Quote page or provide details about your project here, and our team will contact you within one business day.",
    options: [
      {
        label: "Visit Get Quote Page",
        value: "visit_quote",
        reply:
          "You can use the Get Quote page on our website to receive an instant estimate.",
      },
      {
        label: "Back to Main Menu",
        value: "back",
        nextStepId: "start",
      },
    ],
  },
  technical_support: {
    id: "technical_support",
    message:
      "For technical support, please describe your issue in detail. Our support team is available Monday-Friday, 9am-6pm IST, and will respond as soon as possible.",
    options: [
      {
        label: "Back to Main Menu",
        value: "back",
        nextStepId: "start",
      },
    ],
  },
  billing: {
    id: "billing",
    message:
      "For billing and payment questions, please specify whether you need help with invoices, payment methods, or other financial concerns.",
    options: [
      {
        label: "Back to Main Menu",
        value: "back",
        nextStepId: "start",
      },
    ],
  },
  other: {
    id: "other",
    message:
      "Please describe your inquiry in detail. Our customer support team will get back to you promptly.",
    options: [
      {
        label: "Back to Main Menu",
        value: "back",
        nextStepId: "start",
      },
    ],
  },
};

export type ChatMessage = {
  role: "assistant" | "user";
  content: string;
  options?: ChatbotStep["options"];
};

export function useStaticChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: chatbotSteps["start"].message,
      options: chatbotSteps["start"].options,
    },
  ]);
  const [currentStepId, setCurrentStepId] = useState<string>("start");

  function sendOption(optionValue: string) {
    const step = chatbotSteps[currentStepId];
    const selectedOption = step.options?.find((o) => o.value === optionValue);
    if (!selectedOption) return;

    // 1. Add user message
    setMessages((prev) => [
      ...prev,
      { role: "user", content: selectedOption.label },
    ]);

    // 2. Terminal reply if available
    if (selectedOption.reply) {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: selectedOption.label },
        { role: "assistant", content: selectedOption.reply },
        {
          role: "assistant",
          content: "Would you like to explore another topic?",
          options: [
            {
              label: "Back to Main Menu",
              value: "back",
              nextStepId: "start",
            },
          ],
        },
      ]);
      setCurrentStepId("start");
      return;
    }

    // 3. Next step
    if (selectedOption.nextStepId && chatbotSteps[selectedOption.nextStepId]) {
      const nextStep = chatbotSteps[selectedOption.nextStepId];
      setMessages((prev) => [
        ...prev,
        { role: "user", content: selectedOption.label },
        {
          role: "assistant",
          content: nextStep.message,
          options: nextStep.options,
        },
      ]);
      setCurrentStepId(nextStep.id);
    }
  }

  // Show latest assistant options always after last assistant message
  const availableOptions =
    messages.length > 0 && messages[messages.length - 1].role === "assistant"
      ? messages[messages.length - 1].options || []
      : [];

  // Restart method (for external use e.g. 'reset to main menu')
  function resetChat() {
    setMessages([
      {
        role: "assistant",
        content: chatbotSteps["start"].message,
        options: chatbotSteps["start"].options,
      },
    ]);
    setCurrentStepId("start");
  }

  return { messages, sendOption, availableOptions, resetChat };
}
