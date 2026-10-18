


// import React from "react";
// import { profileMaker } from "../utils/helper";
// import { LogOut, Heart } from "lucide-react";

// const ProfileInfo = ({ userInfo, handlelogout }) => {
//   if (!userInfo) return null;

//   return (
//     <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-fuchsia-400/15 bg-gradient-to-br from-[#281638]/90 to-[#19132f]/90 p-2.5 shadow-lg shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:border-fuchsia-400/30 hover:shadow-fuchsia-950/30">
//       {/* Profile Avatar */}
//       <div className="shrink-0 rounded-2xl bg-gradient-to-br from-fuchsia-400 via-purple-500 to-blue-400 p-[2px] shadow-md shadow-fuchsia-500/20">
//         <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-[14px] border-2 border-[#21142f] bg-gradient-to-br from-[#321a43] to-[#172343] text-sm font-bold text-fuchsia-300">
//           {userInfo.profilePic ? (
//             <img
//               src={userInfo.profilePic}
//               alt={userInfo.fullName || "Profile"}
//               className="h-full w-full object-cover"
//             />
//           ) : (
//             profileMaker(userInfo.fullName || "")
//           )}
//         </div>
//       </div>

//       {/* User Details */}
//       <div className="min-w-0 flex-1">
//         <div className="flex items-center gap-1.5">
//           <p className="truncate text-sm font-semibold text-white">
//             {userInfo.fullName || "Your Profile"}
//           </p>
//           <Heart className="h-3 w-3 shrink-0 fill-fuchsia-400/30 text-fuchsia-400" />
//         </div>

//         <p className="mt-0.5 text-xs text-purple-200/50">
//           Your MilesCloser account
//         </p>

//         {/* Logout Button */}
//         <button
//           type="button"
//           onClick={handlelogout}
//           className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-fuchsia-400/20 bg-fuchsia-500/10 px-2.5 py-1.5 text-xs font-medium text-fuchsia-300 transition-all duration-200 hover:border-fuchsia-400/40 hover:bg-fuchsia-500/20 hover:text-white active:scale-95"
//         >
//           <LogOut className="h-3.5 w-3.5" />
//           Sign out
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileInfo;


import React, { useState, useEffect, useRef } from "react";
import { profileMaker } from "../utils/helper";
import {
  LogOut,
  ChevronDown,
  Heart,
  UserRound,
} from "lucide-react";

const ProfileInfo = ({ userInfo, handlelogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  if (!userInfo) return null;

  const fullName = userInfo.fullName || "Your Profile";

  return (
    <div ref={containerRef} className="relative">
      {/* Compact navbar profile */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Open profile menu"
        className={`group flex max-w-[190px] items-center gap-2.5 rounded-2xl border p-1.5 pr-2.5 transition-all duration-200 ${
          isOpen
            ? "border-fuchsia-400/30 bg-fuchsia-500/10"
            : "border-transparent bg-white/[0.025] hover:border-white/10 hover:bg-white/[0.05]"
        }`}
      >
        {/* Avatar */}
        <span className="relative shrink-0 rounded-xl bg-gradient-to-br from-fuchsia-400 via-purple-500 to-blue-500 p-[1.5px]">
          <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-[10px] bg-[#1b102b] text-xs font-bold text-fuchsia-200">
            {userInfo.profilePic ? (
              <img
                src={userInfo.profilePic}
                alt={fullName}
                className="h-full w-full object-cover"
              />
            ) : (
              profileMaker(fullName)
            )}
          </span>

          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#100819] bg-emerald-400" />
        </span>

        {/* Name */}
        <span className="min-w-0 flex-1 text-left">
          <span className="block truncate text-xs font-semibold text-white sm:text-sm">
            {fullName}
          </span>
          <span className="mt-0.5 block text-[10px] text-purple-200/50">
            My account
          </span>
        </span>

        <ChevronDown
          className={`h-4 w-4 shrink-0 text-purple-200/50 transition-transform duration-200 group-hover:text-fuchsia-300 ${
            isOpen ? "rotate-180 text-fuchsia-300" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+12px)] z-[70] w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#1a1028] shadow-[0_16px_50px_rgba(0,0,0,0.5)]"
        >
          {/* Profile summary */}
          <div className="flex items-center gap-3 border-b border-white/[0.07] bg-gradient-to-r from-fuchsia-500/[0.08] to-blue-500/[0.06] p-4">
            <div className="shrink-0 rounded-xl bg-gradient-to-br from-fuchsia-400 via-purple-500 to-blue-500 p-[1.5px]">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-[10px] bg-[#21142f] text-sm font-bold text-fuchsia-200">
                {userInfo.profilePic ? (
                  <img
                    src={userInfo.profilePic}
                    alt={fullName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  profileMaker(fullName)
                )}
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                {fullName}
              </p>
              <p className="mt-0.5 text-xs text-purple-200/50">
                Your MilesCloser account
              </p>
            </div>

            <Heart className="h-4 w-4 shrink-0 fill-fuchsia-400/20 text-fuchsia-400" />
          </div>

          {/* Menu items */}
          <div className="p-2">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                window.location.assign("/profile");
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-purple-100/80 transition hover:bg-white/[0.05] hover:text-white"
            >
              <UserRound className="h-4 w-4 text-purple-300" />
              View profile
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                handlelogout();
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-rose-300 transition hover:bg-rose-500/10 hover:text-rose-200"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;

