import { useEffect, useRef, useState } from "react";
import { MessageBubble } from "./components/MessageBubble";
import { InputBar } from "./components/InputBar";
import { LoadingPulsar } from "./components/LoadingPulsar";
import { EmptyState } from "./components/EmptyState";
import { Sidebar } from "./components/Sidebar";
import { StarBackground } from "./components/StarBackground";
import { AlertCircle, Menu, Plus, X } from "lucide-react";
import "./index.css";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [localInput, setLocalInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, error]);

  const getMessageText = (msg) => {
    if (msg.content) return msg.content;
    if (msg.parts && Array.isArray(msg.parts)) {
      return msg.parts.map((p) => p.text || "").join("");
    }
    return "";
  };

  const appendMessage = async (text) => {
    if (!text.trim()) return;
    
    setError(null);
    const userMessage = { id: Date.now().toString(), role: "user", content: text };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setLocalInput("");
    setIsLoading(true);

    try {
      // In a unified Vercel deploy, /api/chat is relative to the root
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: currentMessages.map(m => ({ role: m.role, content: m.content })) }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const msg = errorData.details || errorData.error || `Satellite link failed (${response.status})`;
        throw new Error(msg);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const assistantId = (Date.now() + 1).toString();
      
      // Add empty assistant message to populate as chunks arrive
      setMessages(prev => [...prev, { id: assistantId, role: "assistant", content: "" }]);
      let assistantText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        // Note: pipeDataStreamToResponse sends data in '0:"text"' protocol
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith('0:')) {
            try {
              const text = JSON.parse(line.slice(2));
              assistantText += text;
              setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: assistantText } : m));
            } catch (e) { /* partial chunk */ }
          }
        }
      }
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (text) => {
    appendMessage(text);
  };

  const handleReset = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <div className="h-screen w-full flex bg-[#030014] text-zinc-100 font-sans overflow-hidden relative selection:bg-blue-500/30">
      <StarBackground />
      
      <Sidebar 
        messages={messages}
        onReset={handleReset}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        getMessageText={getMessageText}
      />

      {/* Main Area */}
      <main className="flex-1 flex flex-col relative min-w-0 h-full backdrop-blur-[2px] transition-all duration-500">
        {/* Mobile Header */}
        <div className="lg:hidden p-4 border-b border-white/5 flex items-center bg-[#030014]/80 backdrop-blur-md sticky top-0 z-30">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 mr-2 hover:bg-white/5 rounded-lg transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-bold uppercase tracking-widest text-xs text-blue-400">Cosmos AI</span>
        </div>

        {/* Messages List - min-h-0 is critical for flexbox overflow containers */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 min-h-0 custom-scrollbar">
          <div className="max-w-4xl mx-auto space-y-6 pb-4">
            {messages.length === 0 ? (
              <div className="min-h-[70vh] flex items-center justify-center">
                <EmptyState onSuggestionClick={handleSuggestionClick} />
              </div>
            ) : (
              messages.map((m, i) => (
                <MessageBubble key={m.id || i} role={m.role} content={getMessageText(m)} />
              ))
            )}
            
            {isLoading && <LoadingPulsar />}
            
            {error && (
              <div className="p-4 rounded-xl bg-red-900/20 border border-red-500/20 text-red-200 text-sm">
                Error: {error.message}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Bar Area - Spacious padding for premium feel */}
        <div className="flex-none pt-4 pb-6 md:pb-10 border-t border-white/5 bg-[#030014] relative z-20">
          <InputBar 
            value={localInput}
            onChange={(e) => setLocalInput(e.target.value)}
            onSubmit={(e) => {
              if (e && e.preventDefault) e.preventDefault();
              appendMessage(localInput);
            }} 
            isLoading={isLoading} 
          />
        </div>
      </main>
    </div>
  );
}
