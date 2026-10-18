// import { useState } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import {
//   Settings,
//   MessageCircle,
//   Menu,
//   X,
//   Heart,
//   LayoutDashboard,
//   Sparkles,
//   LogOut,
// } from "lucide-react";

// import ProfileInfo from "./ProfileInfo";
// import SearchBar from "./input/SearchBar";
// import { useAuthStore } from "../utils/useAuthStore";

// const Navbar = ({
//   userInfo,
//   searchQuery,
//   setSearchQuery,
//   onSearchNote,
//   handleClearSearch,
// }) => {
//   const isToken = localStorage.getItem("token");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const logout = useAuthStore((state) => state.logout);

//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const hideOnRoutes = ["/login", "/signUp", "/signup", "/home"];

//   const handleLogout = () => {
//     setIsMobileMenuOpen(false);
//     logout(navigate);
//   };

//   const handleSearch = () => {
//     if (searchQuery?.trim()) {
//       onSearchNote(searchQuery);
//     }
//   };

//   const onClearSearch = () => {
//     handleClearSearch();
//     setSearchQuery("");
//   };

//   if (hideOnRoutes.includes(location.pathname)) return null;

//   const navItems = [
//     {
//       path: "/dashboard",
//       label: "Memories",
//       icon: LayoutDashboard,
//     },
//     {
//       path: "/chat",
//       label: "Messages",
//       icon: MessageCircle,
//     },
//     {
//       path: "/profile",
//       label: "Settings",
//       icon: Settings,
//     },
//   ];

//   const isActive = (path) => location.pathname === path;

//   const desktopLinkClass = (path) =>
//     `relative flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-300 ${
//       isActive(path)
//         ? "bg-gradient-to-r from-fuchsia-500/15 to-violet-500/15 text-fuchsia-200"
//         : "text-purple-100/60 hover:bg-white/[0.05] hover:text-white"
//     }`;

//   const mobileLinkClass = (path) =>
//     `flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all duration-300 ${
//       isActive(path)
//         ? "border-fuchsia-400/25 bg-gradient-to-r from-fuchsia-500/15 to-violet-500/10 text-fuchsia-200"
//         : "border-white/[0.06] bg-white/[0.02] text-purple-100/70 hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
//     }`;

//   return (
//     <nav className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#100819]/85 text-white shadow-[0_8px_35px_rgba(0,0,0,0.22)] backdrop-blur-2xl">
     
//       <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
//         <div className="absolute -top-20 left-[15%] h-36 w-36 rounded-full bg-fuchsia-600/[0.09] blur-[70px]" />
//         <div className="absolute -top-20 right-[20%] h-36 w-36 rounded-full bg-blue-500/[0.08] blur-[70px]" />
//       </div>

//       <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
      
//         <Link
//           to="/dashboard"
//           onClick={() => setIsMobileMenuOpen(false)}
//           className="group flex shrink-0 items-center gap-3"
//           aria-label="MilesCloser home"
//         >
//           <div className="relative">
//             <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-blue-500 opacity-50 blur-md transition-opacity duration-300 group-hover:opacity-90" />

//             <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-gradient-to-br from-[#e879f9] via-[#a855f7] to-[#6366f1] shadow-lg shadow-fuchsia-950/30 transition duration-300 group-hover:scale-105 group-hover:rotate-3">
//               <Heart className="h-[21px] w-[21px] fill-white text-white" />
//             </div>

//             <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-[2.5px] border-[#100819] bg-emerald-400">
//               <span className="h-1 w-1 rounded-full bg-white" />
//             </span>
//           </div>

//           <div className="flex flex-col">
//             <span className="bg-gradient-to-r from-white via-fuchsia-100 to-violet-200 bg-clip-text text-[21px] font-extrabold tracking-[-0.8px] text-transparent sm:text-[23px]">
//               MilesCloser<span className="text-fuchsia-400">.</span>
//             </span>
//             <span className="-mt-0.5 text-[9px] font-semibold uppercase tracking-[2.1px] text-purple-200/40">
//               Moments that matter
//             </span>
//           </div>
//         </Link>

        
//         {isToken && (
//           <div className="hidden items-center gap-1 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-1.5 lg:flex">
//             {navItems.map(({ path, label, icon: Icon }) => (
//               <Link
//                 key={path}
//                 to={path}
//                 className={desktopLinkClass(path)}
//                 aria-current={isActive(path) ? "page" : undefined}
//               >
//                 <Icon
//                   className={`h-[17px] w-[17px] transition-transform duration-300 ${
//                     isActive(path) ? "text-fuchsia-300" : ""
//                   }`}
//                 />
//                 <span>{label}</span>

//                 {isActive(path) && (
//                   <span className="absolute inset-x-3 -bottom-1 h-[2px] rounded-full bg-gradient-to-r from-fuchsia-400 to-violet-400" />
//                 )}
//               </Link>
//             ))}
//           </div>
//         )}

//         <div className="ml-auto flex min-w-0 items-center justify-end gap-2 sm:gap-3 lg:ml-0">
//           {isToken && location.pathname === "/dashboard" && (
//             <div className="hidden w-[220px] xl:block 2xl:w-[270px]">
//               <SearchBar
//                 value={searchQuery}
//                 onChange={({ target }) => setSearchQuery(target.value)}
//                 handleSearch={handleSearch}
//                 onClearSearch={onClearSearch}
//               />
//             </div>
//           )}

//           {isToken && (
//             <>
             
//               <div className="hidden items-center gap-1 md:flex lg:hidden">
//                 {navItems.map(({ path, label, icon: Icon }) => (
//                   <Link
//                     key={path}
//                     to={path}
//                     title={label}
//                     aria-label={label}
//                     aria-current={isActive(path) ? "page" : undefined}
//                     className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
//                       isActive(path)
//                         ? "bg-fuchsia-500/15 text-fuchsia-300"
//                         : "text-purple-100/60 hover:bg-white/[0.06] hover:text-white"
//                     }`}
//                   >
//                     <Icon className="h-[19px] w-[19px]" />
//                   </Link>
//                 ))}
//               </div>

//               <div className="hidden h-8 w-px bg-white/10 md:block" />

             
//               <div className="hidden md:block">
//                 <ProfileInfo
//                   userInfo={userInfo}
//                   handlelogout={handleLogout}
//                 />
//               </div>

             
//               <button
//                 type="button"
//                 aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
//                 aria-expanded={isMobileMenuOpen}
//                 onClick={() => setIsMobileMenuOpen((prev) => !prev)}
//                 className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-purple-100 transition-all duration-300 hover:border-fuchsia-400/30 hover:bg-fuchsia-500/10 hover:text-fuchsia-200 active:scale-95 md:hidden"
//               >
//                 {isMobileMenuOpen ? (
//                   <X className="h-5 w-5" />
//                 ) : (
//                   <Menu className="h-5 w-5" />
//                 )}
//               </button>
//             </>
//           )}
//         </div>
//       </div>

    
//       {isToken && isMobileMenuOpen && (
//         <div className="border-t border-white/[0.07] bg-[#130a1e]/95 px-4 pb-5 pt-4 shadow-2xl shadow-black/30 backdrop-blur-2xl md:hidden">
//           <div className="mx-auto flex max-w-xl flex-col gap-3">
//             {/* Mobile search */}
//             {location.pathname === "/dashboard" && (
//               <div className="mb-1 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-2">
//                 <SearchBar
//                   value={searchQuery}
//                   onChange={({ target }) => setSearchQuery(target.value)}
//                   handleSearch={handleSearch}
//                   onClearSearch={onClearSearch}
//                 />
//               </div>
//             )}

            
//             <div className="flex flex-col gap-2">
//               {navItems.map(({ path, label, icon: Icon }) => (
//                 <Link
//                   key={path}
//                   to={path}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className={mobileLinkClass(path)}
//                   aria-current={isActive(path) ? "page" : undefined}
//                 >
//                   <div
//                     className={`flex h-9 w-9 items-center justify-center rounded-xl ${
//                       isActive(path)
//                         ? "bg-fuchsia-500/15 text-fuchsia-300"
//                         : "bg-white/[0.04] text-purple-200/70"
//                     }`}
//                   >
//                     <Icon className="h-[18px] w-[18px]" />
//                   </div>

//                   <span className="font-medium">{label}</span>

//                   {isActive(path) && (
//                     <span className="ml-auto h-2 w-2 rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(232,121,249,0.8)]" />
//                   )}
//                 </Link>
//               ))}
//             </div>

          
//             <div className="mt-2 rounded-2xl border border-white/[0.07] bg-gradient-to-br from-fuchsia-500/[0.06] to-blue-500/[0.04] p-3">
//               <ProfileInfo
//                 userInfo={userInfo}
//                 handlelogout={handleLogout}
//               />
//             </div>

           
//             <div className="flex items-center justify-center gap-2 pt-2 text-xs text-purple-200/40">
//               <Sparkles className="h-3.5 w-3.5 text-fuchsia-300/70" />
//               <span>Made for your special moments</span>
//               <Heart className="h-3 w-3 fill-fuchsia-400/70 text-fuchsia-400/70" />
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Settings,
  MessageCircle,
  Menu,
  X,
  Heart,
  LayoutDashboard,
  Sparkles,
  Search,
} from "lucide-react";

import ProfileInfo from "./ProfileInfo";
import SearchBar from "./input/SearchBar";
import { useAuthStore } from "../utils/useAuthStore";

const Navbar = ({
  userInfo,
  searchQuery,
  setSearchQuery,
  onSearchNote,
  handleClearSearch,
}) => {
  const isToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const hideOnRoutes = ["/login", "/signUp", "/signup", "/home"];

  const handleLogout = () => {
    setIsMobileMenuOpen(false);
    logout(navigate);
  };

  const handleSearch = () => {
    if (searchQuery?.trim()) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    handleClearSearch();
    setSearchQuery("");
  };

  if (hideOnRoutes.includes(location.pathname)) return null;

  const navItems = [
    { path: "/dashboard", label: "Memories", icon: LayoutDashboard },
    { path: "/chat", label: "Messages", icon: MessageCircle },
    { path: "/profile", label: "Settings", icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  const desktopLinkClass = (path) =>
    `relative flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
      isActive(path)
        ? "bg-fuchsia-500/10 text-fuchsia-200"
        : "text-purple-100/60 hover:bg-white/[0.05] hover:text-white"
    }`;

  const mobileLinkClass = (path) =>
    `flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all duration-200 ${
      isActive(path)
        ? "border-fuchsia-400/25 bg-fuchsia-500/10 text-fuchsia-200"
        : "border-white/[0.06] bg-white/[0.02] text-purple-100/70 hover:bg-white/[0.05] hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#100819]/90 text-white shadow-[0_8px_35px_rgba(0,0,0,0.22)] backdrop-blur-2xl">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 left-[15%] h-36 w-36 rounded-full bg-fuchsia-600/[0.08] blur-[70px]" />
        <div className="absolute -top-20 right-[20%] h-36 w-36 rounded-full bg-blue-500/[0.08] blur-[70px]" />
      </div>

      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center gap-4 px-4 sm:px-6 lg:gap-6 lg:px-8 xl:gap-8">
        {/* LEFT: Brand */}
        <Link
          to="/dashboard"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="MilesCloser home"
          className="group flex shrink-0 items-center gap-2.5"
        >
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-blue-500 opacity-40 blur-md transition-opacity group-hover:opacity-80" />
            <div className="relative flex h-10 w-10 items-center justify-center rounded-[14px] border border-white/15 bg-gradient-to-br from-fuchsia-400 via-purple-500 to-indigo-500 shadow-lg shadow-fuchsia-950/30 transition-transform duration-200 group-hover:scale-105">
              <Heart className="h-5 w-5 fill-white text-white" />
            </div>
          </div>

          <div className="flex min-w-0 flex-col">
            <span className="whitespace-nowrap bg-gradient-to-r from-white via-fuchsia-100 to-violet-200 bg-clip-text text-[20px] font-extrabold tracking-tight text-transparent sm:text-[22px]">
              MilesCloser<span className="text-fuchsia-400">.</span>
            </span>
            <span className="hidden text-[9px] font-medium uppercase tracking-[1.7px] text-purple-200/40 sm:block">
              Moments that matter
            </span>
          </div>
        </Link>

        {/* CENTER: Desktop navigation */}
        {isToken && (
          <div className="hidden shrink-0 items-center gap-1 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-1 lg:flex">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={desktopLinkClass(path)}
                aria-current={isActive(path) ? "page" : undefined}
              >
                <Icon
                  className={`h-[17px] w-[17px] ${
                    isActive(path) ? "text-fuchsia-300" : ""
                  }`}
                />
                <span>{label}</span>
                {isActive(path) && (
                  <span className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-fuchsia-400 to-violet-400" />
                )}
              </Link>
            ))}
          </div>
        )}

        {/* RIGHT: Search, profile, mobile controls */}
        <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3 lg:flex-initial lg:gap-4">
          {/* Search gets available space instead of forcing overlap */}
          {isToken && location.pathname === "/dashboard" && (
            <div className="hidden min-w-0 max-w-[300px] flex-1 xl:block">
              <SearchBar
                value={searchQuery}
                onChange={({ target }) => setSearchQuery(target.value)}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
              />
            </div>
          )}

          {/* Medium-screen navigation */}
          {isToken && (
            <div className="hidden shrink-0 items-center gap-1 md:flex lg:hidden">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  title={label}
                  aria-label={label}
                  aria-current={isActive(path) ? "page" : undefined}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                    isActive(path)
                      ? "bg-fuchsia-500/15 text-fuchsia-300"
                      : "text-purple-100/60 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <Icon className="h-[19px] w-[19px]" />
                </Link>
              ))}
            </div>
          )}

          {/* Divider */}
          {isToken && (
            <div className="hidden h-8 w-px shrink-0 bg-white/10 md:block" />
          )}

          {/* Compact profile, always at the right */}
          {isToken && (
            <div className="hidden shrink-0 md:block">
              <ProfileInfo
                userInfo={userInfo}
                handlelogout={handleLogout}
              />
            </div>
          )}

          {/* Mobile menu toggle */}
          {isToken && (
            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-purple-100 transition-all hover:border-fuchsia-400/30 hover:bg-fuchsia-500/10 hover:text-fuchsia-200 active:scale-95 md:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isToken && isMobileMenuOpen && (
        <div className="border-t border-white/[0.07] bg-[#130a1e]/95 px-4 pb-5 pt-4 shadow-2xl shadow-black/30 backdrop-blur-2xl md:hidden">
          <div className="mx-auto flex max-w-xl flex-col gap-3">
            {location.pathname === "/dashboard" && (
              <div className="mb-1 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-2">
                <SearchBar
                  value={searchQuery}
                  onChange={({ target }) => setSearchQuery(target.value)}
                  handleSearch={handleSearch}
                  onClearSearch={onClearSearch}
                />
              </div>
            )}

            <div className="flex flex-col gap-2">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={mobileLinkClass(path)}
                  aria-current={isActive(path) ? "page" : undefined}
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                      isActive(path)
                        ? "bg-fuchsia-500/15 text-fuchsia-300"
                        : "bg-white/[0.04] text-purple-200/70"
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </div>
                  <span className="font-medium">{label}</span>
                  {isActive(path) && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(232,121,249,0.8)]" />
                  )}
                </Link>
              ))}
            </div>

            <div className="mt-2 rounded-2xl border border-white/[0.07] bg-gradient-to-br from-fuchsia-500/[0.06] to-blue-500/[0.04] p-3">
              <ProfileInfo
                userInfo={userInfo}
                handlelogout={handleLogout}
              />
            </div>

            <div className="flex items-center justify-center gap-2 pt-2 text-xs text-purple-200/40">
              <Sparkles className="h-3.5 w-3.5 text-fuchsia-300/70" />
              <span>Made for your special moments</span>
              <Heart className="h-3 w-3 fill-fuchsia-400/70 text-fuchsia-400/70" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

