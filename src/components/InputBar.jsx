import { ArrowUp, Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";

export function InputBar({ value, onChange, onSubmit, isLoading }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [value]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        onSubmit(e);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-6">
      <div className="relative group transition-all duration-300">
        {/* Background Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
        
        <form
          onSubmit={onSubmit}
          className="relative flex items-end gap-3 bg-[#0d0a1a] border border-white/10 hover:border-white/20 focus-within:border-purple-500/50 rounded-2xl p-2.5 transition-all duration-300 shadow-2xl"
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask COSMOS anything..."
            className="flex-1 max-h-[240px] min-h-[64px] bg-transparent text-white placeholder-zinc-500 text-lg md:text-xl border-0 focus:ring-0 resize-none py-5 px-5 outline-none custom-scrollbar leading-relaxed"
            rows={1}
          />

          <button
            type="submit"
            disabled={!value.trim() || isLoading}
            className={`w-14 h-14 md:w-16 md:h-16 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg shrink-0 ${
              value.trim() && !isLoading
                ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white hover:scale-105 active:scale-95 shadow-purple-500/20 shadow-xl"
                : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <ArrowUp className="w-6 h-6 md:w-7 md:h-7 stroke-[2.5px]" />
            )}
          </button>
        </form>
      </div>
      
      <div className="mt-3 flex justify-center items-center gap-4 text-[10px] md:text-xs text-zinc-500 font-medium tracking-wide">
        <span className="flex items-center gap-1.5 bg-white/5 py-1 px-2.5 rounded-full border border-white/5">
          <kbd className="font-sans">Enter</kbd> to send
        </span>
        <span className="flex items-center gap-1.5 bg-white/5 py-1 px-2.5 rounded-full border border-white/5">
          <kbd className="font-sans">Shift + Enter</kbd> for new line
        </span>
      </div>
    </div>
  );
}
