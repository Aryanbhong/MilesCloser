

import { X, Heart, MessageCircle } from "lucide-react";
import { useChatStore } from "../../utils/useChatStore";
import { useAuthStore } from "../../utils/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="relative overflow-hidden border-b border-fuchsia-400/15 bg-[#160d22]/95 px-4 py-3 shadow-[0_4px_25px_rgba(0,0,0,0.2)] backdrop-blur-2xl sm:px-6">
     
      <div className="pointer-events-none absolute -right-8 -top-12 h-28 w-28 rounded-full bg-fuchsia-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-8 h-24 w-24 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative flex items-center justify-between gap-3">
      
        <div className="flex min-w-0 items-center gap-3">
         
          <div className="relative shrink-0">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-blue-500 p-[2px] shadow-[0_0_18px_rgba(217,70,239,0.15)] transition-transform duration-300 hover:scale-105">
              <div className="h-full w-full overflow-hidden rounded-[14px] border border-white/10 bg-[#1b102b]">
                <img
                  src={selectedUser.profilePic || "/avatar.png"}
                  alt={selectedUser.fullName || "Chat user"}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

          
            <span
              className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-[3px] border-[#160d22] ${
                isOnline
                  ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]"
                  : "bg-slate-500"
              }`}
              title={isOnline ? "Online" : "Offline"}
            />
          </div>

     
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-base font-bold tracking-tight text-purple-50 sm:text-lg">
                {selectedUser.fullName || "Conversation"}
              </h3>

              <Heart className="hidden h-3.5 w-3.5 shrink-0 fill-fuchsia-400/70 text-fuchsia-400/70 sm:block" />
            </div>

            <div className="mt-1 flex items-center gap-1.5">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isOnline
                    ? "animate-pulse bg-emerald-400"
                    : "bg-slate-500"
                }`}
              />

              <p
                className={`text-xs font-medium ${
                  isOnline ? "text-emerald-400" : "text-purple-300/50"
                }`}
              >
                {isOnline ? "Online now" : "Offline"}
              </p>

              <span className="mx-1 h-3 w-px bg-fuchsia-400/20" />

              <MessageCircle className="h-3.5 w-3.5 text-fuchsia-400/70" />

              <span className="text-xs text-purple-300/50">
                Messages
              </span>
            </div>
          </div>
        </div>

        
        <button
          type="button"
          onClick={() => setSelectedUser(null)}
          aria-label="Close conversation"
          title="Close conversation"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-purple-300/60 shadow-sm transition-all duration-300 hover:rotate-90 hover:border-fuchsia-400/30 hover:bg-fuchsia-500/10 hover:text-fuchsia-300 hover:shadow-[0_0_18px_rgba(217,70,239,0.12)] active:scale-95"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;


