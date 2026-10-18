
import React, { useEffect, useState } from "react";
import { Users, Heart, MessageCircle } from "lucide-react";
import { useChatStore } from "../../utils/useChatStore";
import SidebarStructure from "./SidebarStructure";
import { useAuthStore } from "../../utils/useAuthStore";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUserLoading,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUserLoading) return <SidebarStructure />;

  return (
    <aside className="flex h-full w-20 shrink-0 flex-col overflow-hidden border-r border-fuchsia-400/10 bg-[#160d22]/95 text-purple-100 shadow-[4px_0_30px_-12px_rgba(217,70,239,0.12)] backdrop-blur-xl transition-all duration-300 lg:w-72">

     
      <div className="border-b border-white/5 bg-gradient-to-br from-[#25112f]/90 via-[#1b102b] to-[#101a32]/90 p-4 lg:p-5">
        <div className="flex items-center justify-center gap-3 lg:justify-start">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-fuchsia-300/15 bg-gradient-to-br from-fuchsia-500 to-blue-600 text-white shadow-lg shadow-fuchsia-950/40">
            <Users className="h-5 w-5" />
          </div>

          <div className="hidden min-w-0 lg:block">
            <h2 className="font-bold tracking-tight text-white">
              Your People
            </h2>
            <p className="text-xs text-fuchsia-300/70">
              Your favorite connections
            </p>
          </div>
        </div>

    
        <div className="mt-5 hidden lg:block">
          <label className="flex cursor-pointer items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition hover:border-fuchsia-400/20 hover:bg-fuchsia-500/5">
            <span className="flex items-center gap-2 text-sm font-medium text-purple-100/80">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
              Show online only
            </span>

            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="h-4 w-4 cursor-pointer accent-fuchsia-500"
            />
          </label>

          <div className="mt-3 flex items-center justify-between px-1">
            <span className="text-xs text-purple-200/40">
              Available now
            </span>
            <span className="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">
              {onlineUsers.length} online
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto px-2 py-3 lg:px-3">
        <p className="mb-3 hidden px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-fuchsia-300/60 lg:block">
          Conversations
        </p>

        {filteredUsers.map((user) => {
          const isSelected = selectedUser?._id === user._id;
          const isOnline = onlineUsers.includes(user._id);

          return (
            <button
              key={user._id}
              type="button"
              onClick={() => setSelectedUser(user)}
              title={user.fullName || user.name}
              className={`group relative flex w-full items-center gap-3 rounded-2xl p-2.5 text-left transition-all duration-200 lg:p-3 ${
                isSelected
                  ? "bg-gradient-to-r from-fuchsia-500/15 to-blue-500/10 shadow-lg shadow-fuchsia-950/10 ring-1 ring-fuchsia-400/20"
                  : "hover:bg-white/[0.04]"
              }`}
            >
            
              {isSelected && (
                <span className="absolute bottom-3 left-0 top-3 w-1 rounded-r-full bg-gradient-to-b from-fuchsia-400 to-blue-400 shadow-[0_0_10px_rgba(217,70,239,0.4)]" />
              )}

         
              <div className="relative mx-auto shrink-0 lg:mx-0">
                <div
                  className={`rounded-2xl p-[2px] transition-all duration-200 ${
                    isSelected
                      ? "bg-gradient-to-br from-fuchsia-400 to-blue-500 shadow-md shadow-fuchsia-950/30"
                      : "bg-transparent group-hover:bg-gradient-to-br group-hover:from-fuchsia-500/60 group-hover:to-blue-500/60"
                  }`}
                >
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.fullName || user.name || "User"}
                    className="h-11 w-11 rounded-[14px] border-2 border-[#1b102b] object-cover"
                  />
                </div>

                {isOnline && (
                  <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#160d22] bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
                )}
              </div>

           
              <div className="hidden min-w-0 flex-1 lg:block">
                <div
                  className={`truncate text-sm font-semibold transition-colors ${
                    isSelected
                      ? "text-fuchsia-200"
                      : "text-purple-100/80 group-hover:text-white"
                  }`}
                >
                  {user.fullName || user.name || "User"}
                </div>

                <div className="mt-1 flex items-center gap-1.5">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isOnline
                        ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.35)]"
                        : "bg-purple-200/25"
                    }`}
                  />
                  <span
                    className={`text-xs ${
                      isOnline
                        ? "text-emerald-300/90"
                        : "text-purple-200/40"
                    }`}
                  >
                    {isOnline ? "Online now" : "Offline"}
                  </span>
                </div>
              </div>

              {isSelected && (
                <Heart className="hidden h-4 w-4 shrink-0 fill-fuchsia-400/30 text-fuchsia-300 lg:block" />
              )}
            </button>
          );
        })}

    
        {filteredUsers.length === 0 && (
          <div className="flex flex-col items-center px-3 py-10 text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-fuchsia-400/15 bg-gradient-to-br from-fuchsia-500/15 to-blue-500/15 text-fuchsia-300">
              <MessageCircle className="h-6 w-6" />
            </div>

            <p className="text-sm font-semibold text-white/80">
              {showOnlineOnly ? "No one's online" : "No contacts yet"}
            </p>

            <p className="mt-1 hidden max-w-[180px] text-xs leading-5 text-purple-200/45 lg:block">
              {showOnlineOnly
                ? "Your people will appear here when they're online."
                : "Your conversations will appear here."}
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-white/5 bg-gradient-to-r from-[#21112f]/80 to-[#111b32]/80 p-3">
        <div className="flex items-center justify-center gap-2 lg:justify-start lg:px-2">
          <Heart className="h-4 w-4 fill-fuchsia-400/30 text-fuchsia-300" />
          <span className="hidden text-xs font-medium text-purple-200/45 lg:block">
            Little moments, closer together
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
