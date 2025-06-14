
import React, { useState, useRef } from "react";
import { Bot, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      {/* Floating Chatbot Button (no animation, bot icon) */}
      {!open && (
        <button
          aria-label="Open Chatbot"
          className="fixed z-50 bottom-6 right-6 bg-askus-purple hover:bg-askus-dark shadow-xl rounded-full p-4 text-white flex items-center justify-center transition-colors duration-150 focus:ring-4 focus:ring-askus-purple/20"
          onClick={() => setOpen(true)}
        >
          <Bot className="w-7 h-7" />
        </button>
      )}
      {/* Widget Window */}
      {open && (
        <div className="fixed z-50 bottom-6 right-6 w-[340px] max-w-[95vw] bg-white rounded-xl shadow-2xl flex flex-col border border-gray-200 h-[500px]">
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
              <span className="text-lg font-bold">&times;</span>
            </button>
          </div>
          {/* Scrollable message container */}
          <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-br from-askus-light/90 via-purple-50 to-white">
            <ScrollArea className="flex-1 px-3 py-2">
              <div className="flex flex-col gap-3 pb-1">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-2xl text-sm max-w-[80%] shadow-md 
                        ${
                          m.role === "user"
                            ? "bg-askus-purple text-white rounded-br-[2.2rem] hover:scale-105 transition transform"
                            : "bg-white text-gray-900 rounded-bl-[2.2rem] border border-gray-100"
                        }`}
                      style={{
                        wordBreak: "break-word",
                        transition: "box-shadow .3s,transform .3s"
                      }}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
            </ScrollArea>
          </div>
          <div className="p-2 bg-gradient-to-l from-purple-50 via-white to-white border-t flex items-center gap-2">
            <div className="flex flex-row w-full gap-2 items-center">
              <input
                type="text"
                placeholder={loading ? "AI is typing..." : "Type your message..."}
                className="flex-1 px-4 py-2 rounded-2xl border-2 border-gray-200 focus:border-askus-purple focus:outline-none text-sm bg-white shadow-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
                disabled={loading}
                aria-label="Chat message"
                style={{ minWidth: 0 }}
              />
              <Button
                size="icon"
                type="button"
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-askus-purple text-white hover:bg-askus-dark rounded-full shadow flex items-center justify-center transition h-10 w-10 p-0"
                tabIndex={0}
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
