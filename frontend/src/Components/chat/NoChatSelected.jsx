// import { MessageSquare } from "lucide-react";

// const NoChatSelected = () => {
//   return (
//     <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
//       <div className="max-w-md text-center space-y-6">
//         {/* Icon Display */}
//         <div className="flex justify-center gap-4 mb-4">
//           <div className="relative">
//             <div
//               className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
//              justify-center animate-bounce"
//             >
//               <MessageSquare className="w-8 h-8 text-primary " />
//             </div>
//           </div>
//         </div>

//         {/* Welcome Text */}
//         <h2 className="text-2xl font-bold">Welcome to MilesCloser!</h2>
//         <p className="text-base-content/60">
//           Select a conversation from the sidebar to start chatting
//         </p>
//       </div>
//     </div>
//   );
// };

// export default NoChatSelected;


import { MessageSquare, Heart, Sparkles } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="relative flex w-full flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50 p-6 sm:p-10">

      {/* Soft background decorations */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-pink-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-purple-200/30 blur-3xl" />

      {/* Floating decorations */}
      <Heart className="absolute left-[15%] top-[22%] h-6 w-6 animate-bounce text-pink-300/70" />
      <Heart className="absolute bottom-[23%] right-[17%] h-5 w-5 animate-pulse text-rose-300/70" />
      <Sparkles className="absolute right-[22%] top-[18%] h-6 w-6 animate-pulse text-purple-300" />
      <Sparkles className="absolute bottom-[18%] left-[22%] h-5 w-5 text-pink-300" />

      {/* Welcome card */}
      <div className="relative w-full max-w-lg rounded-[2rem] border border-white/80 bg-white/60 p-8 text-center shadow-[0_20px_60px_-20px_rgba(236,72,153,0.2)] backdrop-blur-xl sm:p-12">

        {/* Chat icon */}
        <div className="mb-7 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-pink-300 to-purple-300 opacity-40 blur-xl" />

            <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] border border-white/80 bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 shadow-lg shadow-pink-200/40">
              <MessageSquare className="h-11 w-11 text-pink-500" strokeWidth={1.7} />

              <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-pink-400 to-rose-500 shadow-md">
                <Heart className="h-4 w-4 fill-white text-white" />
              </span>
            </div>
          </div>
        </div>

        {/* Welcome text */}
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pink-400">
            Your little corner of connection
          </p>

          <h2 className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
            Welcome to MilesTogether!
          </h2>

          <p className="mx-auto max-w-sm text-sm leading-7 text-gray-500 sm:text-base">
            Every conversation brings you a little closer. Select a chat from
            the sidebar and start sharing your moments.
          </p>
        </div>

        {/* Bottom hint */}
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-pink-100 bg-pink-50/80 px-5 py-3 text-sm font-medium text-pink-500 shadow-sm">
          <Heart className="h-4 w-4 fill-pink-300 text-pink-400" />
          Choose a conversation to begin
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
