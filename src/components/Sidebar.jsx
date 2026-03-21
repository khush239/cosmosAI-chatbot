import { Plus, MessageSquare, Trash2, Settings, User } from "lucide-react";

export function Sidebar({ 
  messages, 
  onReset, 
  isOpen, 
  onClose, 
  getMessageText 
}) {
  const userMessages = messages.filter(m => m.role === 'user');

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:relative top-0 left-0 z-[70] h-full w-[300px] bg-[#0a0a0f]/90 backdrop-blur-xl border-r border-white/5 flex flex-col transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#0a0a0f]/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-900/20">
              <span className="text-white font-bold text-xs">C</span>
            </div>
            <h1 className="text-lg font-bold tracking-tight text-white uppercase">Cosmos <span className="text-blue-500">AI</span></h1>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button 
            onClick={() => { onReset(); if(window.innerWidth < 1024) onClose(); }}
            className="w-full p-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-semibold flex items-center justify-start gap-3 transition-all duration-200 border border-white/5 hover:border-white/10 active:scale-[0.98] group"
          >
            <div className="p-1.5 rounded-lg bg-blue-600/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Plus className="w-4 h-4" />
            </div>
            New Mission
          </button>
        </div>

        {/* Navigation / History */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-3 space-y-6 pt-2 pb-6">
          <div className="space-y-1">
            <h3 className="px-3 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-3">Recent Missions</h3>
            {userMessages.length === 0 ? (
              <div className="px-3 py-4 text-xs text-zinc-600 italic leading-relaxed">
                Your mission logs are empty. Start a query to begin recording.
              </div>
            ) : (
              <div className="space-y-1 animate-in fade-in slide-in-from-left-2 duration-500">
                {userMessages.slice(-10).reverse().map((m, i) => (
                  <div 
                    key={i} 
                    className="group flex items-center gap-3 p-3 text-sm text-zinc-400 hover:text-white rounded-xl hover:bg-white/5 cursor-pointer transition-all duration-200"
                  >
                    <MessageSquare className="w-4 h-4 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                    <span className="truncate flex-1">{getMessageText(m)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* User / Footer */}
        <div className="p-4 border-t border-white/5 space-y-2 bg-[#08080c]">
          <button className="w-full p-2.5 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white text-sm flex items-center gap-3 transition-colors group">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-white/5 group-hover:border-white/20 transition-colors">
              <User className="w-4 h-4" />
            </div>
            <span className="flex-1 text-left font-medium">Cosmonaut</span>
            <Settings className="w-4 h-4 opacity-40 group-hover:opacity-100" />
          </button>
        </div>
      </aside>
    </>
  );
}
