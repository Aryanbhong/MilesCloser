

import React from "react";

const MessageStructure = () => {
  const structureMessages = Array.from({ length: 6 }, (_, idx) => ({
    id: idx,
    isMine: idx % 2 !== 0,
    width: ["w-48", "w-64", "w-40", "w-56", "w-44", "w-60"][idx],
    height: idx % 3 === 0 ? "h-16" : "h-12",
  }));

  return (
    <div className="relative flex w-full flex-1 flex-col gap-6 overflow-hidden bg-[#100819] px-3 py-5 sm:px-6 sm:py-6">
   
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-56 w-56 rounded-full bg-fuchsia-600/5 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-0 h-56 w-56 rounded-full bg-blue-600/5 blur-[100px]" />

    
      <div className="relative z-10 mb-2 flex items-center justify-center gap-2">
        <span className="h-2 w-2 animate-pulse rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(232,121,249,0.8)]" />
        <span className="bg-gradient-to-r from-fuchsia-300 to-blue-300 bg-clip-text text-xs font-medium tracking-wide text-transparent">
          Preparing your conversation...
        </span>
      </div>

      {structureMessages.map((message) => (
        <div
          key={message.id}
          className={`relative z-10 flex w-full items-end gap-2.5 ${
            message.isMine ? "justify-end" : "justify-start"
          }`}
        >
         
          {!message.isMine && (
            <div className="h-10 w-10 shrink-0 animate-pulse rounded-2xl bg-gradient-to-br from-fuchsia-500/70 to-blue-500/70 p-[2px] shadow-[0_0_15px_rgba(217,70,239,0.12)]">
              <div className="h-full w-full rounded-[14px] border border-white/10 bg-[#1b102b]" />
            </div>
          )}

          <div
            className={`flex flex-col gap-2 ${
              message.isMine ? "items-end" : "items-start"
            }`}
          >
          
            <div
              className={`h-2.5 w-16 animate-pulse rounded-full ${
                message.isMine ? "bg-blue-300/15" : "bg-fuchsia-300/15"
              }`}
            />

          
            <div
              className={`relative overflow-hidden rounded-3xl p-3 ${
                message.isMine
                  ? "rounded-br-md border border-blue-400/20 bg-gradient-to-br from-blue-500/15 to-fuchsia-500/10 shadow-[0_0_20px_rgba(59,130,246,0.05)]"
                  : "rounded-bl-md border border-fuchsia-400/15 bg-[#1b102b]/90 shadow-[0_0_20px_rgba(217,70,239,0.04)]"
              }`}
            >
              <div
                className={`relative ${message.width} ${message.height} max-w-[65vw] overflow-hidden rounded-2xl bg-gradient-to-r from-[#241333] via-[#30203f] to-[#241333]`}
              >
              
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-fuchsia-200/10 to-transparent" />
              </div>
            </div>

      
            {message.id % 2 === 0 && (
              <div className="h-2 w-24 animate-pulse rounded-full bg-purple-300/10" />
            )}
          </div>

      
          {message.isMine && (
            <div className="h-10 w-10 shrink-0 animate-pulse rounded-2xl bg-gradient-to-br from-blue-500/70 to-fuchsia-500/70 p-[2px] shadow-[0_0_15px_rgba(96,165,250,0.12)]">
              <div className="h-full w-full rounded-[14px] border border-white/10 bg-[#1b102b]" />
            </div>
          )}
        </div>
      ))}

     
      <div className="relative z-10 mt-2 flex items-center justify-center gap-2">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-fuchsia-400 shadow-[0_0_8px_rgba(232,121,249,0.6)]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.5)] [animation-delay:150ms]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)] [animation-delay:300ms]" />
      </div>
    </div>
  );
};

export default MessageStructure;

