import { useState } from "react";
import { Send, MessageCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "👋 Hi there! I'm your UrbanReporter Assistant. How can I help you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔥 Smart keyword detection (open report page automatically)
  const detectIntent = (text) => {
    const keywords = ["report", "issue", "problem", "complaint"];
    return keywords.some((word) => text.toLowerCase().includes(word));
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // 🧠 Check if user wants to report an issue
    if (detectIntent(input)) {
      setTimeout(() => {
        navigate("/report");
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            text:
              "🚀 Taking you to the Report page where you can log your issue. Please provide location and description there.",
          },
        ]);
        setLoading(false);
      }, 800);
      return;
    }

    try {
      // 🛰️ Connect to backend AI
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      setMessages([
        ...newMessages,
        { role: "assistant", text: data.reply || "⚠️ I couldn’t process that." },
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { role: "assistant", text: "⚠️ Error connecting to AI." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Send on Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* 💬 Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-linear-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-80"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* 🪟 Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-[rgba(24,24,27,0.95)] backdrop-blur-md border border-gray-700 text-gray-100 rounded-2xl shadow-2xl z-90 flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
            <h2 className="text-sm font-semibold text-teal-400">
              UrbanReporter AI
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[85%] ${
                  msg.role === "user"
                    ? "bg-linear-to-r from-teal-600 to-blue-600 text-white self-end ml-auto"
                    : "bg-gray-800/70 text-gray-100"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="text-gray-400 text-xs italic">Thinking...</div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gray-700 flex items-center px-3 py-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me about reports..."
              className="flex-1 bg-transparent outline-none text-sm text-white placeholder-gray-500"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="p-2 rounded-full hover:bg-gray-700 transition disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
