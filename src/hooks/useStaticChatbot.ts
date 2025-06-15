
import { useState } from "react";

// A step in the conversation
export type ChatbotStep = {
  id: string;
  message: string;
  options?: {
    label: string;
    value: string;
    nextStepId?: string;
    reply?: string;
  }[];
  // Bot can reply instantly upon choosing this step (optional)
  autoReply?: string;
};

// Define your chatbot tree of steps (can be expanded easily)
export const chatbotSteps: Record<string, ChatbotStep> = {
  start: {
    id: "start",
    message: "👋 Want to chat about DigiSphere's services? If you have a question, don't be shy.",
    options: [
      { label: "Info about services I'm not yet using", value: "info", nextStepId: "info" },
      { label: "Help with my current service", value: "help", nextStepId: "help" },
      { label: "Something else", value: "other", nextStepId: "other" },
    ],
  },
  info: {
    id: "info",
    message: "Here’s info about our services! Which are you interested in?",
    options: [
      { label: "Web Development", value: "web", reply: "We offer bespoke web dev from idea to launch!" },
      { label: "SEO Optimization", value: "seo", reply: "We help businesses improve rankings and visibility." },
      { label: "Back to start", value: "back", nextStepId: "start" },
    ],
  },
  help: {
    id: "help",
    message: "We're here to support you! How can we help?",
    options: [
      { label: "Technical Support", value: "tech", reply: "Please describe your tech issue and we’ll connect you." },
      { label: "Billing question", value: "billing", reply: "Our billing team will reach out shortly." },
      { label: "Back to start", value: "back", nextStepId: "start" },
    ],
  },
  other: {
    id: "other",
    message: "Please describe your question and a human agent will get back to you soon.",
    // No options = end
  },
};

export type ChatMessage = { role: "assistant" | "user"; content: string; options?: ChatbotStep["options"] };

export function useStaticChatbot() {
  // Holds the full conversation
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: chatbotSteps["start"].message, options: chatbotSteps["start"].options },
  ]);
  // Track step
  const [currentStepId, setCurrentStepId] = useState<string>("start");

  // Called when user clicks a bot option button
  function sendOption(optionValue: string) {
    const step = chatbotSteps[currentStepId];
    const selectedOption = step.options?.find(o => o.value === optionValue);
    if (!selectedOption) return;

    // 1. Show user's message
    setMessages(prev => [
      ...prev,
      { role: "user", content: selectedOption.label },
    ]);

    // 2. If option has "reply", display reply as bot message (terminal)
    if (selectedOption.reply) {
      setMessages(prev => [
        ...prev,
        { role: "user", content: selectedOption.label },
        { role: "assistant", content: selectedOption.reply },
      ]);
      // Don't update step, as it's terminal
      return;
    }

    // 3. Otherwise, move to next step
    if (selectedOption.nextStepId && chatbotSteps[selectedOption.nextStepId]) {
      const nextStep = chatbotSteps[selectedOption.nextStepId];
      setMessages(prev => [
        ...prev,
        { role: "user", content: selectedOption.label },
        { role: "assistant", content: nextStep.message, options: nextStep.options },
      ]);
      setCurrentStepId(nextStep.id);
    }
  }

  // Returns buttons for currently available options (from last assistant message)
  const availableOptions =
    messages.length > 0 && messages[messages.length - 1].role === "assistant"
      ? messages[messages.length - 1].options || []
      : [];

  return { messages, sendOption, availableOptions };
}
