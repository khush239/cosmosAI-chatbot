import { useEffect, useRef, useState } from "react";
import { MessageBubble } from "./components/MessageBubble";
import { InputBar } from "./components/InputBar";
import { LoadingPulsar } from "./components/LoadingPulsar";
import { EmptyState } from "./components/EmptyState";
import { Sidebar } from "./components/Sidebar";
import { StarBackground } from "./components/StarBackground";
import { useChat } from "@ai-sdk/react";
import { Menu } from "lucide-react";
import "./index.css";

export default function App() {
  const { 
    messages, 
    input, 
    handleInputChange, 
    handleSubmit, 
    isLoading, 
    error, 
    setMessages,
    append
  } = useChat({
    api: "/api/chat",
    onError: (err) => {
      console.error("Cosmic Link Error:", err);
    }
  });

  const messagesEndRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, error]);

  const handleSuggestionClick = (text) => {
    append({
      role: 'user',
      content: text,
    });
  };

  const handleReset = () => {
    setMessages([]);
  };

  return (
    <div className="h-screen w-full flex bg-[#030014] text-zinc-100 font-sans overflow-hidden relative selection:bg-blue-500/30">
      <StarBackground />
      
      <Sidebar 
        messages={messages}
        onReset={handleReset}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        getMessageText={(msg) => msg.content || ""}
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
                <MessageBubble key={m.id || i} role={m.role} content={m.content} />
              ))
            )}
            
            {isLoading && <LoadingPulsar />}
            
            {error && (
              <div className="p-4 rounded-xl bg-red-900/20 border border-red-500/20 text-red-200 text-sm">
                Error: {error.message || "Satellite link failed. Check your connection."}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Bar Area - Spacious padding for premium feel */}
        <div className="flex-none pt-4 pb-6 md:pb-10 border-t border-white/5 bg-[#030014] relative z-20">
          <InputBar 
            value={input}
            onChange={handleInputChange}
            onSubmit={handleSubmit} 
            isLoading={isLoading} 
          />
        </div>
      </main>
    </div>
  );
}
