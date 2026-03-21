export function LoadingPulsar() {
  return (
    <div className="flex items-center gap-3 p-5 glass-panel rounded-2xl w-fit max-w-[80%] rounded-tl-none">
      <div className="flex gap-1.5 items-center">
        <div className="w-2.5 h-2.5 rounded-full bg-blue-400/80 animate-bounce" style={{ animationDelay: "0ms", animationDuration: "1s" }} />
        <div className="w-2.5 h-2.5 rounded-full bg-purple-400/80 animate-bounce" style={{ animationDelay: "150ms", animationDuration: "1s" }} />
        <div className="w-2.5 h-2.5 rounded-full bg-pink-400/80 animate-bounce" style={{ animationDelay: "300ms", animationDuration: "1s" }} />
      </div>
      <span className="text-xs text-zinc-400 font-medium ml-2 animate-pulse">Consulting the stars...</span>
    </div>
  );
}
