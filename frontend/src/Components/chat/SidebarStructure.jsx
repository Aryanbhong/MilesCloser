
import { Users, Heart } from "lucide-react";

const SidebarStructure = () => {
  const skeletonContacts = Array.from({ length: 8 }, (_, idx) => idx);

  return (
    <aside className="flex h-full w-20 shrink-0 flex-col overflow-hidden border-r border-fuchsia-400/10 bg-[#160d22]/95 text-purple-100 shadow-[4px_0_30px_-12px_rgba(217,70,239,0.12)] backdrop-blur-xl transition-all duration-300 lg:w-72">

  
      <div className="border-b border-white/5 bg-gradient-to-br from-[#25112f]/90 via-[#1b102b] to-[#101a32]/90 p-4 lg:p-5">
        <div className="flex items-center justify-center gap-3 lg:justify-start">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-fuchsia-300/15 bg-gradient-to-br from-fuchsia-500 to-blue-600 text-white shadow-lg shadow-fuchsia-950/40">
            <Users className="h-5 w-5" />
          </div>

          <div className="hidden lg:block">
            <h2 className="font-bold tracking-tight text-white">
              Your People
            </h2>
            <p className="text-xs text-fuchsia-300/70">
              Your favorite connections
            </p>
          </div>
        </div>

     
        <div className="mt-5 hidden animate-pulse lg:block">
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <div className="h-3 w-28 rounded-full bg-fuchsia-400/15" />
            <div className="h-4 w-4 rounded border border-fuchsia-400/20 bg-fuchsia-400/10" />
          </div>

          <div className="mt-3 flex justify-between px-1">
            <div className="h-3 w-20 rounded-full bg-white/10" />
            <div className="h-5 w-16 rounded-full bg-emerald-400/10" />
          </div>
        </div>
      </div>

      
      <div className="flex-1 space-y-1 overflow-y-auto px-2 py-3 lg:px-3">
        <div className="mb-3 hidden px-3 lg:block">
          <div className="h-2.5 w-28 animate-pulse rounded-full bg-fuchsia-400/15" />
        </div>

        {skeletonContacts.map((idx) => (
          <div
            key={idx}
            className="flex w-full items-center gap-3 rounded-2xl p-2.5 transition-colors lg:p-3"
          >
            
            <div className="relative mx-auto shrink-0 lg:mx-0">
              <div className="rounded-2xl bg-gradient-to-br from-fuchsia-500/50 to-blue-500/50 p-[2px]">
                <div className="h-11 w-11 animate-pulse rounded-[14px] border border-white/10 bg-gradient-to-br from-[#32163d] via-[#21142f] to-[#15213b]" />
              </div>

             
              {idx % 3 !== 0 && (
                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 animate-pulse rounded-full border-2 border-[#160d22] bg-emerald-400/70 shadow-[0_0_8px_rgba(52,211,153,0.25)]" />
              )}
            </div>

    
            <div className="hidden min-w-0 flex-1 animate-pulse lg:block">
              <div
                className={`mb-2 h-3.5 rounded-full bg-gradient-to-r from-fuchsia-400/20 to-blue-400/20 ${
                  idx % 3 === 0
                    ? "w-24"
                    : idx % 2 === 0
                      ? "w-32"
                      : "w-28"
                }`}
              />

              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-200/20" />
                <div className="h-2.5 w-14 rounded-full bg-white/[0.07]" />
              </div>
            </div>

            {idx === 1 && (
              <Heart className="hidden h-4 w-4 text-fuchsia-400/30 lg:block" />
            )}
          </div>
        ))}
      </div>

 
      <div className="border-t border-white/5 bg-gradient-to-r from-[#21112f]/80 to-[#111b32]/80 p-3">
        <div className="flex items-center justify-center gap-2 lg:justify-start lg:px-2">
          <Heart className="h-4 w-4 animate-pulse fill-fuchsia-400/30 text-fuchsia-300/70" />
          <div className="hidden h-2.5 w-40 animate-pulse rounded-full bg-gradient-to-r from-fuchsia-400/15 to-blue-400/15 lg:block" />
        </div>
      </div>
    </aside>
  );
};

export default SidebarStructure;

