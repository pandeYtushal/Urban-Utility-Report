import { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm your UrbanReporter AI. How can I help you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const chatRef = useRef(null); 
  const lastMsgRef = useRef(null);

  const detectIntent = (text) => {
    const keywords = ["report", "issue", "problem", "complaint"];
    return keywords.some((word) => text.toLowerCase().includes(word));
  };


  useEffect(() => {

    if (lastMsgRef.current) {
      lastMsgRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      return;
    }
    if (!chatRef.current) return;
    
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, loading, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    if (detectIntent(input)) {
      setTimeout(() => {
        navigate("/report");
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            text:
              "Taking you to the Report page where you can log your issue. Please provide location and description there.",
          },
        ]);
        setLoading(false);
      }, 600);
      return;
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        console.error("API response not OK:", res.status, res.statusText);
        const errorData = await res.json().catch(() => ({}));
        setMessages((prev) => [
          ...newMessages,
          { 
            role: "assistant", 
            text: errorData.reply || `Error: ${res.status} ${res.statusText}` 
          },
        ]);
        return;
      }

      const data = await res.json();
      console.log("API response:", data);
      setMessages((prev) => [
        ...newMessages,
        { role: "assistant", text: data.reply || data.error || "I couldn't process that." },
      ]);
    } catch (error) {
      console.error("Chatbot fetch error:", error);
      setMessages((prev) => [
        ...newMessages,
        { role: "assistant", text: `Error connecting to AI: ${error.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* floating button */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-teal-500 to-blue-500 text-white p-4 rounded-full shadow-xl z-50"
        >
          <MessageCircle size={26} />
        </motion.button>
      )}

      {/* chat window */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.22 }}
          className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] max-h-[80vh] bg-[#121212]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 z-50 flex flex-col overflow-hidden"
        >
          {/* header */}
          <div className="flex justify-between items-center px-4 py-3 bg-[#1a1a1a] border-b border-white/10">
            <h2 className="text-sm font-semibold text-teal-400">UrbanReporter AI</h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition">
              <X size={22} />
            </button>
          </div>

          {/* messages container */}
          <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((msg, i) => {
              const isUser = msg.role === "user";
              const isLast = i === messages.length - 1;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.12, delay: i * 0.02 }}
                  ref={isLast ? lastMsgRef : null}
                  className={`p-3 rounded-xl max-w-[85%] text-sm shadow-md backdrop-blur-md ${
                    isUser ? "bg-gradient-to-r from-teal-600 to-blue-600 text-white ml-auto" : "bg-white/10 text-gray-200"
                  }`}
                >
                  {msg.text}
                </motion.div>
              );
            })}

            {loading && <div className="text-gray-400 text-xs italic">Typing...</div>}
          </div>

          {/* input */}
          <div className="flex items-center px-3 py-3 bg-[#1b1b1b] border-t border-white/10">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me about reports..."
              className="flex-1 bg-transparent outline-none text-sm text-gray-100 placeholder-gray-500"
            />
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleSend}
              disabled={loading}
              className="p-2 rounded-full hover:bg-white/10 transition disabled:opacity-50"
            >
              <Send size={18} className="text-teal-400" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </>
  );
}
