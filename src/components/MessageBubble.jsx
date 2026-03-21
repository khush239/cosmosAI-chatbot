import { Copy, Sparkles, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MessageBubble({ role, content }) {
  const isUser = role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  if (isUser) {
    return (
      <div className="flex w-full justify-end mb-6">
        <div className="flex gap-4 max-w-[85%] md:max-w-[75%] items-end">
          <div className="px-5 py-4 rounded-2xl rounded-br-sm bg-gradient-to-br from-blue-600 to-purple-700 text-white shadow-lg overflow-hidden break-words">
            <p className="text-sm md:text-base whitespace-pre-wrap">{content}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-700 mb-1">
            <User className="w-4 h-4 text-zinc-300" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-start mb-6 group">
      <div className="flex gap-4 max-w-[95%] md:max-w-[85%]">
        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shrink-0 border border-purple-500 shadow-[0_0_10px_rgba(147,51,234,0.5)] mt-1">
          <Sparkles className="w-4 h-4 text-purple-400" />
        </div>
        <div className="px-5 py-4 rounded-2xl rounded-tl-sm glass-panel text-zinc-200 shadow-xl overflow-hidden relative">
          <div className="prose prose-invert prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-zinc-800 prose-a:text-blue-400 prose-strong:text-purple-300 max-w-none text-sm md:text-base break-words">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-1.5 bg-black/40 hover:bg-black/70 rounded-md text-zinc-400 hover:text-white transition-opacity opacity-0 group-hover:opacity-100"
            title="Copy response"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
