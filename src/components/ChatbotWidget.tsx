
import React, { useState, useRef } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatbotWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! How can I help you today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to latest message
  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const resp = await fetch(
        "https://jlnddfcbojysyryjijlo.functions.supabase.co/chatbot",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              ...messages.map((m) => ({
                role: m.role,
                content: m.content,
              })),
              userMessage,
            ],
          }),
        }
      );

      const data = await resp.json();
      if (resp.ok && data.reply) {
        setMessages((msgs) => [
          ...msgs,
          { role: "assistant", content: data.reply }
        ]);
      } else {
        setMessages((msgs) => [
          ...msgs,
          { role: "assistant", content: data.error || "Sorry, something went wrong." }
        ]);
      }
    } catch (e: any) {
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: "Network/server error. Try again later." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chatbot Button */}
      {!open && (
        <button
          aria-label="Open Chatbot"
          className="fixed z-50 bottom-6 right-6 bg-askus-purple hover:bg-askus-dark shadow-lg rounded-full p-4 text-white flex items-center justify-center transition-colors duration-150"
          onClick={() => setOpen(true)}
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      )}
      {/* Widget Window */}
      {open && (
        <div className="fixed z-50 bottom-6 right-6 w-[340px] max-w-[95vw] bg-white rounded-xl shadow-2xl flex flex-col border border-gray-200">
          <div className="flex items-center justify-between p-3 border-b bg-askus-purple rounded-t-xl">
            <span className="text-white font-semibold">Ask DigiSphere</span>
            <button
              aria-label="Close chatbot"
              className="rounded-full text-white hover:bg-white/20 p-1"
              onClick={() => setOpen(false)}
            >
              <span className="text-lg">&times;</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 h-72 bg-gray-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg text-sm max-w-[82%] ${
                    m.role === "user"
                      ? "bg-askus-purple text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <div className="p-2 bg-white border-t flex items-center gap-2">
            <input
              type="text"
              placeholder={loading ? "AI is typing..." : "Type your message..."}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:border-askus-purple focus:outline-none text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              disabled={loading}
              aria-label="Chat message"
            />
            <Button
              size="sm"
              type="button"
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-askus-purple text-white hover:bg-askus-dark"
            >
              Send
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
