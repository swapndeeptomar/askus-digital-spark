import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLocation } from "react-router-dom";

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
      "DigiSphere offers a full suite of IT and digital services. Choose a specific service to know more:",
    options: [
      {
        label: "Web Development",
        value: "web_dev",
        reply:
          "Our web development team creates custom, robust websites tailored to your business needs for seamless experiences.",
      },
      {
        label: "Mobile App Development",
        value: "mobile_app",
        reply:
          "We develop innovative mobile apps that drive engagement and efficiency on both iOS and Android.",
      },
      {
        label: "SEO Optimization",
        value: "seo",
        reply:
          "We boost your online visibility with SEO best practices, helping you rank higher and attract more visitors.",
      },
      {
        label: "Digital Marketing",
        value: "digital_marketing",
        reply:
          "Our digital marketing experts grow your reach through targeted campaigns and effective strategies.",
      },
      {
        label: "Graphic Design",
        value: "graphic_design",
        reply:
          "We deliver creative graphic design solutions to power your brand messaging and visual impact.",
      },
      {
        label: "Cybersecurity",
        value: "cybersecurity",
        reply:
          "We secure your operations with advanced cybersecurity services and up-to-date risk management.",
      },
      {
        label: "Custom Software Development",
        value: "custom_software",
        reply:
          "From analysis to deployment, we build software tailored to your unique business requirements.",
      },
      {
        label: "UI/UX Design",
        value: "uiux",
        reply:
          "Our design experts craft intuitive, delightful experiences that maximize user satisfaction and conversion.",
      },
      {
        label: "Software & App Testing",
        value: "testing",
        reply:
          "We rigorously test your software and apps to ensure they are secure, stable, and fully optimized.",
      },
      {
        label: "E-commerce Solutions",
        value: "ecommerce_solutions",
        reply:
          "We build complete e-commerce stores with payment integration and scalable inventory management.",
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
      "To get a personalized quote, you can visit our Quote page directly or share project details for our team to contact you.",
    options: [
      {
        label: "Visit Quote Page",
        value: "visit_quote",
        reply:
          "You can get an instant estimate using our Get Quote page: [Open Quote Page](/get-quote)",
      },
      {
        label: "Submit Project Details",
        value: "submit_details",
        reply:
          "Please share the details of your project. Our team will reach out with a quote within one business day.",
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
      "Please select what you need help with regarding billing and payments.",
    options: [
      {
        label: "Invoices",
        value: "billing_invoices",
        reply:
          "For invoice-related queries, please email billing@digisphere.com with your invoice number and concern.",
      },
      {
        label: "Payment Methods",
        value: "billing_payment_methods",
        reply:
          "We accept bank transfers, UPI, and credit/debit cards. If you need further assistance, please mention your preferred method.",
      },
      {
        label: "Other Financial Concerns",
        value: "billing_other",
        reply:
          "Please specify your concern, and our finance team will follow up promptly.",
      },
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

// Props: Optionally handle external navigation
type UseStaticChatbotParams = {
  onExternalNavigate?: (route: string) => void;
};

export function useStaticChatbot(params?: UseStaticChatbotParams) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: chatbotSteps["start"].message,
      options: chatbotSteps["start"].options,
    },
  ]);
  const [currentStepId, setCurrentStepId] = useState<string>("start");

  // Updated sendOption without freeform input
  function sendOption(optionValue: string) {
    if (optionValue === "back") {
      resetChat();
      return;
    }

    if (optionValue === "visit_quote" && params?.onExternalNavigate) {
      params.onExternalNavigate("/get-quote");
      resetChat();
      return;
    }

    const step = chatbotSteps[currentStepId];
    const selectedOption = step.options?.find((o) => o.value === optionValue);
    if (!selectedOption) return;

    const userMessage: ChatMessage = { role: "user", content: selectedOption.label };

    // Special handling for Billing Other: show custom message instead of input
    if (currentStepId === "billing" && optionValue === "billing_other") {
      setMessages((prev) => [
        ...prev,
        userMessage,
        {
          role: "assistant",
          content:
            "For financial concerns, please use the 'Other/General Inquiry' option in the main menu.",
          options: [
            {
              label: "Back to Main Menu",
              value: "back",
              nextStepId: "start",
            },
          ],
        },
      ]);
      setCurrentStepId("billing");
      return;
    }

    // Regular flow for reply
    if (selectedOption.reply) {
      setMessages((prev) => [
        ...prev,
        userMessage,
        { role: "assistant", content: selectedOption.reply },
        selectedOption.nextStepId && chatbotSteps[selectedOption.nextStepId]
          ? {
              role: "assistant",
              content: chatbotSteps[selectedOption.nextStepId].message,
              options: chatbotSteps[selectedOption.nextStepId].options,
            }
          : {
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
      setCurrentStepId(selectedOption.nextStepId ?? "start");
      return;
    }

    // Normal step navigation
    if (selectedOption.nextStepId && chatbotSteps[selectedOption.nextStepId]) {
      const nextStep = chatbotSteps[selectedOption.nextStepId];
      setMessages((prev) => [
        ...prev,
        userMessage,
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

  return {
    messages,
    sendOption,
    availableOptions,
    resetChat,
  };
}
