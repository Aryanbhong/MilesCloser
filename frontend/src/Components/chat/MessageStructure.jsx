// import React from 'react'
// const MessageStructure = () => {
  
//   const structureMessages = Array(6).fill(null);

//   return (
//     <div className="flex-1 overflow-y-auto p-4 space-y-4">
//       {structureMessages.map((_, idx) => (
//         <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}>
//           <div className="chat-image avatar">
//             <div className="size-10 rounded-full">
//               <div className="skeleton w-full h-full rounded-full" />
//             </div>
//           </div>

//           <div className="chat-header mb-1">
//             <div className="skeleton h-4 w-16" />
//           </div>

//           <div className="chat-bubble bg-transparent p-0">
//             <div className="skeleton h-16 w-[200px]" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MessageStructure;



import React from "react";

const MessageStructure = () => {
  const structureMessages = Array.from({ length: 6 }, (_, idx) => ({
    id: idx,
    isMine: idx % 2 !== 0,
    width: [ "w-48", "w-64", "w-40", "w-56", "w-44", "w-60" ][idx],
    height: idx % 3 === 0 ? "h-16" : "h-12",
  }));

  return (
    <div className="flex w-full flex-1 flex-col gap-6 overflow-hidden px-3 py-5 sm:px-6 sm:py-6">
      {/* Loading label */}
      <div className="mb-2 flex items-center justify-center gap-2">
        <span className="h-2 w-2 animate-pulse rounded-full bg-pink-400" />
        <span className="text-xs font-medium tracking-wide text-pink-400">
          Preparing your conversation...
        </span>
      </div>

      {structureMessages.map((message) => (
        <div
          key={message.id}
          className={`flex w-full items-end gap-2.5 ${
            message.isMine ? "justify-end" : "justify-start"
          }`}
        >
          {/* Other person's avatar */}
          {!message.isMine && (
            <div className="h-10 w-10 shrink-0 animate-pulse rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 p-[2px]">
              <div className="h-full w-full rounded-[14px] border-2 border-white bg-pink-50" />
            </div>
          )}

          <div
            className={`flex flex-col gap-2 ${
              message.isMine ? "items-end" : "items-start"
            }`}
          >
            {/* Timestamp placeholder */}
            <div className="h-2.5 w-16 animate-pulse rounded-full bg-pink-100/80" />

            {/* Message bubble placeholder */}
            <div
              className={`relative overflow-hidden rounded-3xl p-3 shadow-sm ${
                message.isMine
                  ? "rounded-br-md bg-gradient-to-br from-pink-200/80 to-rose-100/80"
                  : "rounded-bl-md border border-pink-100/80 bg-white/90"
              }`}
            >
              <div
                className={`relative ${message.width} ${message.height} max-w-[65vw] overflow-hidden rounded-2xl bg-gradient-to-r from-pink-100 via-white/70 to-pink-100/80`}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
              </div>
            </div>

            {/* Tiny text line */}
            {message.id % 2 === 0 && (
              <div className="h-2 w-24 animate-pulse rounded-full bg-purple-100/80" />
            )}
          </div>

          {/* Your avatar */}
          {message.isMine && (
            <div className="h-10 w-10 shrink-0 animate-pulse rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 p-[2px]">
              <div className="h-full w-full rounded-[14px] border-2 border-white bg-white/80" />
            </div>
          )}
        </div>
      ))}

      {/* Bottom loading indicator */}
      <div className="mt-2 flex items-center justify-center gap-2">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-pink-300" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-rose-300 [animation-delay:150ms]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-300 [animation-delay:300ms]" />
      </div>
    </div>
  );
};

export default MessageStructure;
