// import { Users } from "lucide-react";

// const SidebarStructure = () => {

//   const skeletonContacts = Array(8).fill(null);

//   return (
//     <aside
//       className="h-full w-20 lg:w-72 border-r border-base-300 
//     flex flex-col transition-all duration-200"
//     >
    
//       <div className="border-b border-base-300 w-full p-5">
//         <div className="flex items-center gap-2">
//           <Users className="w-6 h-6" />
//           <span className="font-medium hidden lg:block">Contacts</span>
//         </div>
//       </div>

//       <div className="overflow-y-auto w-full py-3">
//         {skeletonContacts.map((_, idx) => (
//           <div key={idx} className="w-full p-3 flex items-center gap-3">
          
//             <div className="relative mx-auto lg:mx-0">
//               <div className="skeleton size-12 rounded-full" />
//             </div>
//             <div className="hidden lg:block text-left min-w-0 flex-1">
//               <div className="skeleton h-4 w-32 mb-2" />
//               <div className="skeleton h-3 w-16" />
//             </div>
//           </div>
//         ))}
//       </div>
//     </aside>
//   );
// };

// export default SidebarStructure;



import { Users, Heart } from "lucide-react";

const SidebarStructure = () => {
  const skeletonContacts = Array.from({ length: 8 }, (_, idx) => idx);

  return (
    <aside className="flex h-full w-20 shrink-0 flex-col overflow-hidden border-r border-pink-100/80 bg-white/75 text-gray-700 shadow-[4px_0_24px_-16px_rgba(236,72,153,0.2)] backdrop-blur-xl transition-all duration-300 lg:w-72">

      {/* Header */}
      <div className="border-b border-pink-100/80 bg-gradient-to-br from-pink-50/90 via-white to-purple-50/80 p-4 lg:p-5">
        <div className="flex items-center justify-center gap-3 lg:justify-start">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 text-white shadow-lg shadow-pink-200/50">
            <Users className="h-5 w-5" />
          </div>

          <div className="hidden lg:block">
            <h2 className="font-bold tracking-tight text-gray-800">
              Your People
            </h2>
            <p className="text-xs text-pink-400">
              Your favorite connections
            </p>
          </div>
        </div>

        {/* Online filter placeholder */}
        <div className="mt-5 hidden animate-pulse lg:block">
          <div className="flex items-center justify-between rounded-xl border border-pink-100 bg-white/80 p-3">
            <div className="h-3 w-28 rounded-full bg-pink-100" />
            <div className="h-4 w-4 rounded border border-pink-200 bg-pink-50" />
          </div>

          <div className="mt-3 flex justify-between px-1">
            <div className="h-3 w-20 rounded-full bg-gray-100" />
            <div className="h-5 w-16 rounded-full bg-emerald-50" />
          </div>
        </div>
      </div>

      {/* Skeleton contacts */}
      <div className="flex-1 space-y-1 overflow-y-auto px-2 py-3 lg:px-3">
        <div className="mb-3 hidden px-3 lg:block">
          <div className="h-2.5 w-28 animate-pulse rounded-full bg-pink-100" />
        </div>

        {skeletonContacts.map((idx) => (
          <div
            key={idx}
            className="flex w-full items-center gap-3 rounded-2xl p-2.5 lg:p-3"
          >
            {/* Avatar skeleton */}
            <div className="relative mx-auto shrink-0 lg:mx-0">
              <div className="rounded-2xl bg-gradient-to-br from-pink-200 to-purple-200 p-[2px]">
                <div className="h-11 w-11 animate-pulse rounded-[14px] border-2 border-white bg-gradient-to-br from-pink-100 via-white to-purple-100" />
              </div>

              {/* Online status placeholder */}
              {idx % 3 !== 0 && (
                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 animate-pulse rounded-full border-2 border-white bg-emerald-200" />
              )}
            </div>

            {/* Contact information skeleton */}
            <div className="hidden min-w-0 flex-1 animate-pulse lg:block">
              <div
                className={`mb-2 h-3.5 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 ${
                  idx % 3 === 0
                    ? "w-24"
                    : idx % 2 === 0
                      ? "w-32"
                      : "w-28"
                }`}
              />

              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-gray-200" />
                <div className="h-2.5 w-14 rounded-full bg-gray-100" />
              </div>
            </div>

            {/* Decorative heart placeholder */}
            {idx === 1 && (
              <Heart className="hidden h-4 w-4 text-pink-100 lg:block" />
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-pink-100/80 bg-gradient-to-r from-pink-50/70 to-purple-50/70 p-3">
        <div className="flex items-center justify-center gap-2 lg:justify-start lg:px-2">
          <Heart className="h-4 w-4 animate-pulse fill-pink-200 text-pink-300" />
          <div className="hidden h-2.5 w-40 animate-pulse rounded-full bg-pink-100 lg:block" />
        </div>
      </div>
    </aside>
  );
};

export default SidebarStructure;
