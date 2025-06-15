import React, { useRef, useEffect, useState } from "react";
import { Bot, X, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocation, useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useStaticChatbot } from "@/hooks/useStaticChatbot";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const WHATSAPP_LINK = "https://wa.me/911234567890";
const GMAIL_LINK = "mailto:info@example.com";
const VIDEO_SCROLL_THRESHOLD = 400;

const ChatbotWidget: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [showFloatingButtons, setShowFloatingButtons] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const bottomRef = useRef<HTMLDivElement>(null);

  // For general inquiry freeform input
  const [freeformIssue, setFreeformIssue] = useState("");
  const [freeformEmail, setFreeformEmail] = useState("");
  const [freeformLoading, setFreeformLoading] = useState(false);
  const [freeformSubmitted, setFreeformSubmitted] = useState(false);
  const [freeformError, setFreeformError] = useState<string | null>(null);

  // Handler to switch to quote page and close chatbot
  const handleExternalNavigate = (page: string) => {
    setOpen(false);
    navigate(page);
  };

  // Handler to go back to main menu after confirmation
  const handleBackToMenu = () => {
    setFreeformSubmitted(false);
    setFreeformError(null);
    resetChat();
  };

  // Custom static bot logic (no freeform options anymore)
  const {
    messages,
    sendOption,
    availableOptions,
    resetChat,
  } = useStaticChatbot({ onExternalNavigate: handleExternalNavigate });

  // Detect if the last assistant message is the "other" step (general inquiry)
  const showFreeformInput =
    messages.length > 0 &&
    messages[messages.length - 1].role === "assistant" &&
    messages[messages.length - 1].content &&
    messages[messages.length - 1].content.toLowerCase().includes("please describe your inquiry") &&
    !freeformSubmitted;

  useEffect(() => {
    if (location.pathname !== "/") {
      setShowFloatingButtons(false);
      return;
    }
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setShowFloatingButtons(scrollY > VIDEO_SCROLL_THRESHOLD);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, showFreeformInput]);

  // Reset freeform states when chat is closed or reset
  useEffect(() => {
    if (!open) {
      setFreeformIssue("");
      setFreeformEmail("");
      setFreeformSubmitted(false);
      setFreeformError(null);
    }
  }, [open]);

  // Insert to Supabase chatbot table
  const handleFreeformSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFreeformError(null);
    if (!freeformIssue.trim()) {
      setFreeformError("Please enter your inquiry.");
      return;
    }
    setFreeformLoading(true);
    try {
      const { error } = await supabase.from("chatbot").insert({
        user_input: freeformIssue,
        source: "general_inquiry",
        user_email: freeformEmail || null,
        page_path: location.pathname,
      });
      if (error) {
        setFreeformError("There was an error submitting your issue. Please try again.");
      } else {
        setFreeformSubmitted(true);
        setFreeformIssue("");
        setFreeformEmail("");
      }
    } catch (err) {
      setFreeformError("There was an error submitting your issue. Please try again.");
    }
    setFreeformLoading(false);
  };

  return (
    <>
      {/* Floating Chatbot Button */}
      {!open && (
        <button
          aria-label="Open Chatbot"
          className="fixed z-50 bottom-6 right-6 bg-askus-purple hover:bg-askus-dark shadow-xl rounded-full p-4 text-white flex items-center justify-center transition-colors duration-150 focus:ring-4 focus:ring-askus-purple/20"
          onClick={() => setOpen(true)}
        >
          <Bot className="w-7 h-7" />
        </button>
      )}

      {/* Bottom-left WhatsApp + Gmail buttons */}
      {!open && showFloatingButtons && (
        <div className="fixed z-50 bottom-6 left-6 flex flex-col gap-2">
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
      )}

      {/* Chatbot Widget */}
      {open && (
        <div className="fixed z-50 bottom-6 right-6 w-[340px] max-w-[95vw] bg-white rounded-xl shadow-2xl flex flex-col border border-gray-200 h-[500px]">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b bg-gradient-to-r from-askus-purple via-indigo-500 to-askus-purple rounded-t-xl shadow-md">
            <span className="text-white font-bold tracking-wide drop-shadow text-lg flex items-center gap-1">
              <Bot className="w-5 h-5 text-white mr-1" />
              Ask DigiSphere
            </span>
            <button
              aria-label="Close chatbot"
              className="rounded-full text-white hover:bg-white/20 p-1 transition"
              onClick={() => setOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {/* Chat History */}
          <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-br from-askus-light/90 via-purple-50 to-white">
            <ScrollArea className="flex-1 px-2 py-2 overflow-y-auto">
              <div className="flex flex-col gap-3 pb-1">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} w-full items-end`}
                  >
                    {m.role === "assistant" ? (
                      // Bot message with icon left
                      <div className="flex flex-row items-end gap-2">
                        <div className="mb-2">
                          <div className="flex items-center justify-center rounded-full bg-askus-purple/90 w-8 h-8 shadow-sm">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <div
                          className={`relative rounded-2xl text-sm max-w-[84%] px-4 py-2 shadow
                            bg-white text-gray-900 rounded-bl-[2.2rem] border border-gray-100`}
                          style={{
                            wordBreak: "break-word",
                            transition: "box-shadow .3s,transform .3s",
                          }}
                        >
                          {/* Main message */}
                          <span>{m.content}</span>
                          {/* If this bot message has options, render them as wide buttons below (inside the bubble) */}
                          {m.options && m.options.length > 0 && (
                            <div className="flex flex-col gap-2 mt-3">
                              {m.options.map((option) => (
                                <Button
                                  key={option.value}
                                  variant="outline"
                                  onClick={() => sendOption(option.value)}
                                  className="w-full block py-2 border-askus-purple/60 text-askus-purple font-semibold rounded-xl whitespace-normal text-[15px] shadow-sm bg-purple-50/60 hover:bg-askus-purple hover:text-white hover:border-askus-purple transition"
                                  style={{ lineHeight: "1.3" }}
                                >
                                  {option.label}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      // User message with avatar right
                      <div className="flex flex-row-reverse items-end gap-2">
                        <div className="mb-2">
                          <Avatar className="w-8 h-8 border border-gray-200 shadow-sm bg-gray-50">
                            {/* Optionally set AvatarImage src for a user image, otherwise fallback */}
                            <AvatarImage src={undefined} alt="You" />
                            <AvatarFallback className="bg-askus-purple text-white">U</AvatarFallback>
                          </Avatar>
                        </div>
                        <div
                          className={`relative rounded-2xl text-sm max-w-[84%] px-4 py-2 shadow ml-auto
                            bg-askus-purple text-white rounded-br-[2.2rem] hover:scale-105 transition-transform`}
                          style={{
                            wordBreak: "break-word",
                            transition: "box-shadow .3s,transform .3s",
                          }}
                        >
                          <span>{m.content}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {/* Show freeform input after bot message for general inquiry IF NOT submitted */}
                {showFreeformInput && !freeformSubmitted && (
                  <form
                    onSubmit={handleFreeformSubmit}
                    className="w-full p-2 bg-white rounded-xl mt-1 border border-askus-purple/10 flex flex-col gap-2"
                  >
                    <label className="text-xs text-gray-700 font-medium" htmlFor="issue">
                      Your Inquiry
                    </label>
                    <Textarea
                      id="issue"
                      value={freeformIssue}
                      onChange={(e) => setFreeformIssue(e.target.value)}
                      rows={3}
                      maxLength={1000}
                      placeholder="Type your issue or question here..."
                      disabled={freeformLoading}
                      className="resize-none"
                      required
                    />
                    <label className="text-xs text-gray-700 font-medium" htmlFor="issue-email">
                      Your Email (optional)
                    </label>
                    <Input
                      id="issue-email"
                      type="email"
                      autoComplete="email"
                      value={freeformEmail}
                      onChange={(e) => setFreeformEmail(e.target.value)}
                      placeholder="your@email.com"
                      maxLength={100}
                      disabled={freeformLoading}
                    />
                    {freeformError && (
                      <div className="text-xs text-red-600">{freeformError}</div>
                    )}
                    <Button
                      type="submit"
                      className="w-full bg-askus-purple text-white mt-1"
                      disabled={freeformLoading}
                    >
                      {freeformLoading ? "Submitting..." : "Submit"}
                    </Button>
                  </form>
                )}
                {/* Confirmation message after submitting inquiry stays until user goes back */}
                {freeformSubmitted && (
                  <div className="flex flex-col gap-2">
                    <div className="w-full p-3 bg-purple-50 rounded-xl border border-askus-purple/10 text-askus-purple text-sm font-medium">
                      Thank you for reaching out! Our team will review your inquiry and get back to you within 2 business days.
                    </div>
                    <Button
                      onClick={handleBackToMenu}
                      className="w-full bg-askus-purple text-white"
                    >
                      Back to Main Menu
                    </Button>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
