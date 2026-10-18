
import { MessageSquare, Heart, Sparkles } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="relative flex w-full flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-[#100819] via-[#1b102b] to-[#101b35] p-6 sm:p-10">

      
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/[0.06] blur-3xl" />

      <Heart className="absolute left-[15%] top-[22%] h-6 w-6 animate-bounce text-fuchsia-400/60" />
      <Heart className="absolute bottom-[23%] right-[17%] h-5 w-5 animate-pulse text-rose-400/60" />
      <Sparkles className="absolute right-[22%] top-[18%] h-6 w-6 animate-pulse text-blue-300/70" />
      <Sparkles className="absolute bottom-[18%] left-[22%] h-5 w-5 text-fuchsia-300/60" />

   
      <div className="relative w-full max-w-lg rounded-[2rem] border border-fuchsia-400/15 bg-[#1c102b]/65 p-8 text-center shadow-[0_20px_80px_-25px_rgba(217,70,239,0.18)] backdrop-blur-2xl sm:p-12">

      
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-br from-fuchsia-500/[0.06] via-transparent to-blue-500/[0.06]" />

     
        <div className="relative mb-7 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-fuchsia-500/30 to-blue-500/30 opacity-70 blur-2xl" />

            <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] border border-fuchsia-300/20 bg-gradient-to-br from-fuchsia-500/15 via-[#28143a] to-blue-500/15 shadow-lg shadow-fuchsia-950/30">
              <MessageSquare
                className="h-11 w-11 text-fuchsia-300"
                strokeWidth={1.7}
              />

              <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border border-fuchsia-300/30 bg-gradient-to-br from-fuchsia-500 to-blue-600 shadow-lg shadow-fuchsia-950/40">
                <Heart className="h-4 w-4 fill-white text-white" />
              </span>
            </div>
          </div>
        </div>

        
        <div className="relative space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-300/80">
            Your little corner of connection
          </p>

          <h2 className="bg-gradient-to-r from-fuchsia-300 via-pink-300 to-blue-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
            Welcome to MilesCloser!
          </h2>

          <p className="mx-auto max-w-sm text-sm leading-7 text-purple-100/60 sm:text-base">
            Every conversation brings you a little closer. Select a chat from
            the sidebar and start sharing your moments.
          </p>
        </div>

       
        <div className="relative mt-8 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/15 bg-gradient-to-r from-fuchsia-500/10 to-blue-500/10 px-5 py-3 text-sm font-medium text-fuchsia-200/90 shadow-lg shadow-black/10">
          <Heart className="h-4 w-4 fill-fuchsia-400/40 text-fuchsia-300" />
          Choose a conversation to begin
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;

