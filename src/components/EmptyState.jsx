import { Atom, Orbit, Rocket, Sparkles, Telescope } from "lucide-react";

const SUGGESTIONS = [
  {
    icon: <Telescope className="w-5 h-5 text-blue-400" />,
    text: "How do black holes form?",
    description: "Learn about stellar collapse",
  },
  {
    icon: <Sparkles className="w-5 h-5 text-purple-400" />,
    text: "What is the James Webb Space Telescope?",
    description: "Discover our newest eye in the sky",
  },
  {
    icon: <Orbit className="w-5 h-5 text-emerald-400" />,
    text: "Explain dark matter to a 5 year old",
    description: "The universe's biggest mystery",
  },
  {
    icon: <Rocket className="w-5 h-5 text-orange-400" />,
    text: "What are the plans for the Artemis mission?",
    description: "Humanity's return to the Moon",
  },
  {
    icon: <Atom className="w-5 h-5 text-cyan-400" />,
    text: "Are we alone in the universe?",
    description: "The Fermi Paradox and astrobiology",
  },
];

export function EmptyState({ onSuggestionClick }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 mt-4 mb-8 w-full relative z-10 animate-in fade-in zoom-in duration-700">
      <div className="w-24 h-24 mb-8 rounded-full bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-[0_0_50px_rgba(147,51,234,0.3)] relative">
        <Sparkles className="w-12 h-12 text-white animate-pulse" />
        <div className="absolute inset-0 rounded-full border border-white/20 animate-ping [animation-duration:3s]" />
      </div>
      
      <h2 className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6 text-center tracking-tight">
        Welcome to COSMOS
      </h2>
      <p className="text-zinc-400 max-w-xl text-center mb-12 text-base md:text-xl leading-relaxed">
        Your digital guide to the universe. What cosmic mystery shall we explore today?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
        {SUGGESTIONS.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion.text)}
            className={`flex items-start gap-5 p-5 bg-white/[0.03] border border-white/[0.05] rounded-2xl hover:bg-white/[0.08] hover:border-white/20 hover:scale-[1.02] transition-all duration-300 text-left group shadow-xl ${
              index === SUGGESTIONS.length - 1 && SUGGESTIONS.length % 2 !== 0 ? "md:col-span-2 md:max-w-md md:mx-auto w-full" : ""
            }`}
          >
            <div className="p-3.5 bg-black/40 rounded-xl group-hover:scale-110 transition-transform shrink-0 border border-white/5 shadow-inner">
              {suggestion.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-zinc-100 mb-1.5 group-hover:text-blue-400 transition-colors">{suggestion.text}</div>
              <div className="text-xs md:text-sm text-zinc-500 line-clamp-2 leading-relaxed">{suggestion.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
