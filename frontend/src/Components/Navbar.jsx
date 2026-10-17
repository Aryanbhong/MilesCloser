// import { useState } from 'react';
// import { useNavigate, useLocation, Link } from 'react-router-dom';
// import { Settings, MessageCircle, Menu, X } from 'lucide-react';
// import ProfileInfo from './ProfileInfo';
// import SearchBar from './input/SearchBar';
// import { useAuthStore } from '../utils/useAuthStore';

// const Navbar = ({ userInfo, searchQuery, setSearchQuery, onSearchNote, handleClearSearch }) => {
//   const isToken = localStorage.getItem("token");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const logout = useAuthStore((state) => state.logout);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const handleLogout = () => logout(navigate);
//   const handleSearch = () => searchQuery && onSearchNote(searchQuery);
//   const onClearSearch = () => {
//     handleClearSearch();
//     setSearchQuery("");
//   };

//   const hideOnRoutes = ["/login", "/signUp", "/home"];
//   if (hideOnRoutes.includes(location.pathname)) return null;

//   return (
//     <nav className='bg-zinc-900 text-white shadow-lg sticky top-0 z-50'>
//       <div className='flex items-center justify-between px-4 md:px-6 py-3'>
//         {/* Brand Title */}
//        <Link
//         to="/dashboard"
//         className="text-3xl md:text-4xl font-extrabold italic tracking-tight bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-500 text-transparent bg-clip-text drop-shadow-md hover:drop-shadow-lg transition-all duration-300"
//         >
//         MilesTogether
//       </Link>

//         {/* Mobile menu toggle */}
//         <button
//           className='md:hidden text-white'
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//         </button>

//         {/* Desktop Nav */}
//         {isToken && (
//           <div className='hidden md:flex items-center gap-4'>
//             {location.pathname === "/dashboard" && (
//               <SearchBar
//                 value={searchQuery}
//                 onChange={({ target }) => setSearchQuery(target.value)}
//                 handleSearch={handleSearch}
//                 onClearSearch={onClearSearch}
//               />
//             )}
//             <Link to="/chat" className="hover:text-pink-400 transition-all duration-200">
//               <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
//             </Link>
//             <Link to="/profile" className="hover:text-pink-400 transition-all duration-200">
//               <Settings className="w-5 h-5 md:w-6 md:h-6" />
//             </Link>
//             <ProfileInfo userInfo={userInfo} handlelogout={handleLogout} />
//           </div>
//         )}
//       </div>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && isToken && (
//         <div className='md:hidden flex flex-col items-start px-4 pb-4 gap-4 bg-zinc-800'>
//           {location.pathname === "/dashboard" && (
//             <SearchBar
//               value={searchQuery}
//               onChange={({ target }) => setSearchQuery(target.value)}
//               handleSearch={handleSearch}
//               onClearSearch={onClearSearch}
//             />
//           )}
//           <Link to="/chat" className="hover:text-pink-400 transition-all duration-200" onClick={() => setIsMobileMenuOpen(false)}>
//             <MessageCircle className="inline w-5 h-5 mr-2" /> Chat
//           </Link>
//           <Link to="/profile" className="hover:text-pink-400 transition-all duration-200" onClick={() => setIsMobileMenuOpen(false)}>
//             <Settings className="inline w-5 h-5 mr-2" /> Profile
//           </Link>
//           <div className='w-full'>
//             <ProfileInfo userInfo={userInfo} handlelogout={() => {
//               handleLogout();
//               setIsMobileMenuOpen(false);
//             }} />
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;



// import { useState } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import {
//   Settings,
//   MessageCircle,
//   Menu,
//   X,
//   Heart,
//   LayoutDashboard,
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

//   const hideOnRoutes = ["/login", "/signUp", "/signup", "/home"];

//   if (hideOnRoutes.includes(location.pathname)) return null;

//   const navLinkClass = (path) =>
//     `group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
//       location.pathname === path
//         ? "bg-pink-100 text-pink-600 shadow-sm"
//         : "text-gray-600 hover:bg-pink-50 hover:text-pink-600"
//     }`;

//   return (
//     <nav className="sticky top-0 z-50 border-b border-pink-100/70 bg-white/80 text-gray-800 shadow-[0_4px_25px_rgba(236,72,153,0.08)] backdrop-blur-2xl">
//       {/* Soft background glow */}
//       <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
//         <div className="absolute -top-16 left-1/4 h-32 w-32 rounded-full bg-pink-200/30 blur-3xl" />
//         <div className="absolute -top-16 right-1/4 h-32 w-32 rounded-full bg-purple-200/30 blur-3xl" />
//       </div>

//       <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
//         {/* Brand */}
//         <Link
//           to="/dashboard"
//           onClick={() => setIsMobileMenuOpen(false)}
//           className="group flex shrink-0 items-center gap-2"
//         >
//           <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 via-rose-400 to-purple-400 text-white shadow-lg shadow-pink-200/60 transition duration-300 group-hover:rotate-[-8deg] group-hover:scale-110">
//             <Heart className="h-5 w-5 fill-white transition-transform duration-300 group-hover:scale-110" />
//           </div>

//           <div className="flex flex-col">
//             <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-xl font-extrabold tracking-tight text-transparent sm:text-2xl">
//               MilesTogether
//             </span>
//             <span className="-mt-1 hidden text-[10px] font-medium tracking-[0.18em] text-gray-400 sm:block">
//               EVERY MOMENT MATTERS
//             </span>
//           </div>
//         </Link>

//         {/* Desktop Navigation */}
//         {isToken && (
//           <div className="hidden items-center gap-3 md:flex">
//             {location.pathname === "/dashboard" && (
//               <div className="mr-2">
//                 <SearchBar
//                   value={searchQuery}
//                   onChange={({ target }) => setSearchQuery(target.value)}
//                   handleSearch={handleSearch}
//                   onClearSearch={onClearSearch}
//                 />
//               </div>
//             )}

//             <Link
//               to="/dashboard"
//               title="Dashboard"
//               className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
//                 location.pathname === "/dashboard"
//                   ? "bg-pink-100 text-pink-600"
//                   : "text-gray-500 hover:bg-pink-50 hover:text-pink-600"
//               }`}
//             >
//               <LayoutDashboard className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
//             </Link>

//             <Link
//               to="/chat"
//               title="Messages"
//               className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
//                 location.pathname === "/chat"
//                   ? "bg-pink-100 text-pink-600"
//                   : "text-gray-500 hover:bg-pink-50 hover:text-pink-600"
//               }`}
//             >
//               <MessageCircle className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
//             </Link>

//             <Link
//               to="/profile"
//               title="Settings"
//               className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
//                 location.pathname === "/profile"
//                   ? "bg-pink-100 text-pink-600"
//                   : "text-gray-500 hover:bg-pink-50 hover:text-pink-600"
//               }`}
//             >
//               <Settings className="h-5 w-5 transition-transform duration-300 hover:rotate-45" />
//             </Link>

//             <div className="ml-1 border-l border-pink-100 pl-4">
//               <ProfileInfo
//                 userInfo={userInfo}
//                 handlelogout={handleLogout}
//               />
//             </div>
//           </div>
//         )}

//         {/* Mobile Menu Button */}
//         {isToken && (
//           <button
//             type="button"
//             aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
//             aria-expanded={isMobileMenuOpen}
//             onClick={() => setIsMobileMenuOpen((prev) => !prev)}
//             className="flex h-10 w-10 items-center justify-center rounded-xl border border-pink-100 bg-white/80 text-pink-600 shadow-sm transition-all duration-300 hover:bg-pink-50 hover:shadow-md active:scale-95 md:hidden"
//           >
//             {isMobileMenuOpen ? (
//               <X className="h-5 w-5" />
//             ) : (
//               <Menu className="h-5 w-5" />
//             )}
//           </button>
//         )}
//       </div>

//       {/* Mobile Menu */}
//       {isToken && isMobileMenuOpen && (
//         <div className="border-t border-pink-100/80 bg-white/95 px-4 pb-5 pt-4 shadow-lg shadow-pink-100/30 backdrop-blur-2xl md:hidden">
//           <div className="mx-auto flex max-w-7xl flex-col gap-3">
//             {location.pathname === "/dashboard" && (
//               <div className="mb-2 rounded-2xl border border-pink-100 bg-pink-50/50 p-2">
//                 <SearchBar
//                   value={searchQuery}
//                   onChange={({ target }) => setSearchQuery(target.value)}
//                   handleSearch={handleSearch}
//                   onClearSearch={onClearSearch}
//                 />
//               </div>
//             )}

//             <Link
//               to="/dashboard"
//               className={navLinkClass("/dashboard")}
//               onClick={() => setIsMobileMenuOpen(false)}
//             >
//               <LayoutDashboard className="h-5 w-5" />
//               Dashboard
//             </Link>

//             <Link
//               to="/chat"
//               className={navLinkClass("/chat")}
//               onClick={() => setIsMobileMenuOpen(false)}
//             >
//               <MessageCircle className="h-5 w-5" />
//               Messages
//               <span className="ml-auto text-xs text-pink-400">
//                 Stay connected
//               </span>
//             </Link>

//             <Link
//               to="/profile"
//               className={navLinkClass("/profile")}
//               onClick={() => setIsMobileMenuOpen(false)}
//             >
//               <Settings className="h-5 w-5" />
//               Profile & Settings
//             </Link>

//             <div className="my-1 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" />

//             <div className="rounded-2xl border border-pink-100 bg-gradient-to-br from-pink-50/80 to-purple-50/80 p-3">
//               <ProfileInfo
//                 userInfo={userInfo}
//                 handlelogout={handleLogout}
//               />
//             </div>

//             <p className="pt-1 text-center text-xs text-gray-400">
//               Made with <Heart className="inline h-3 w-3 fill-pink-400 text-pink-400" /> for your special moments
//             </p>
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

  const hideOnRoutes = ["/login", "/signUp", "/signup", "/home"];

  if (hideOnRoutes.includes(location.pathname)) return null;

  const navLinkClass = (path) =>
    `group flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
      location.pathname === path
        ? "border-fuchsia-400/20 bg-fuchsia-500/15 text-fuchsia-300 shadow-md shadow-fuchsia-950/20"
        : "border-transparent text-purple-200/60 hover:border-fuchsia-400/15 hover:bg-white/5 hover:text-white"
    }`;

  const iconLinkClass = (path) =>
    `flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 ${
      location.pathname === path
        ? "border-fuchsia-400/25 bg-fuchsia-500/15 text-fuchsia-300 shadow-lg shadow-fuchsia-950/20"
        : "border-transparent text-purple-200/60 hover:border-white/10 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#160b24]/90 text-white shadow-[0_4px_30px_rgba(0,0,0,0.2)] backdrop-blur-2xl">
      {/* Neon background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-16 left-1/4 h-32 w-32 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute -top-16 right-1/4 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -top-10 left-1/2 h-24 w-24 rounded-full bg-orange-500/[0.06] blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          to="/dashboard"
          onClick={() => setIsMobileMenuOpen(false)}
          className="group flex shrink-0 items-center gap-2"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-blue-500 text-white shadow-lg shadow-fuchsia-500/20 transition duration-300 group-hover:rotate-[-8deg] group-hover:scale-110">
            <Heart className="h-5 w-5 fill-white transition-transform duration-300 group-hover:scale-110" />
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#160b24] bg-orange-400" />
          </div>

          <div className="flex flex-col">
            <span className="bg-gradient-to-r from-fuchsia-300 via-pink-300 to-blue-300 bg-clip-text text-xl font-extrabold tracking-tight text-transparent sm:text-2xl">
              MilesCloser
            </span>
            <span className="-mt-1 hidden text-[10px] font-medium tracking-[0.18em] text-purple-200/45 sm:block">
              EVERY MOMENT MATTERS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        {isToken && (
          <div className="hidden items-center gap-2 md:flex">
            {location.pathname === "/dashboard" && (
              <div className="mr-2">
                <SearchBar
                  value={searchQuery}
                  onChange={({ target }) => setSearchQuery(target.value)}
                  handleSearch={handleSearch}
                  onClearSearch={onClearSearch}
                />
              </div>
            )}

            <Link
              to="/dashboard"
              title="Dashboard"
              aria-label="Dashboard"
              className={iconLinkClass("/dashboard")}
            >
              <LayoutDashboard className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            </Link>

            <Link
              to="/chat"
              title="Messages"
              aria-label="Messages"
              className={iconLinkClass("/chat")}
            >
              <MessageCircle className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
            </Link>

            <Link
              to="/profile"
              title="Settings"
              aria-label="Profile and settings"
              className={iconLinkClass("/profile")}
            >
              <Settings className="h-5 w-5 transition-transform duration-300 hover:rotate-45" />
            </Link>

            <div className="ml-2 border-l border-white/10 pl-4">
              <ProfileInfo
                userInfo={userInfo}
                handlelogout={handleLogout}
              />
            </div>
          </div>
        )}

        {/* Mobile Menu Button */}
        {isToken && (
          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-fuchsia-400/20 bg-white/5 text-fuchsia-300 shadow-sm transition-all duration-300 hover:border-fuchsia-400/40 hover:bg-fuchsia-500/10 hover:shadow-lg hover:shadow-fuchsia-950/20 active:scale-95 md:hidden"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isToken && isMobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#1a0d29]/95 px-4 pb-5 pt-4 shadow-xl shadow-black/20 backdrop-blur-2xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            {location.pathname === "/dashboard" && (
              <div className="mb-2 rounded-2xl border border-fuchsia-400/15 bg-white/[0.03] p-2">
                <SearchBar
                  value={searchQuery}
                  onChange={({ target }) => setSearchQuery(target.value)}
                  handleSearch={handleSearch}
                  onClearSearch={onClearSearch}
                />
              </div>
            )}

            <Link
              to="/dashboard"
              className={navLinkClass("/dashboard")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>

            <Link
              to="/chat"
              className={navLinkClass("/chat")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <MessageCircle className="h-5 w-5" />
              Messages
              <span className="ml-auto text-xs text-fuchsia-300/70">
                Stay connected
              </span>
            </Link>

            <Link
              to="/profile"
              className={navLinkClass("/profile")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Settings className="h-5 w-5" />
              Profile & Settings
            </Link>

            <div className="my-1 h-px bg-gradient-to-r from-transparent via-fuchsia-400/30 to-transparent" />

            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-500/[0.07] to-blue-500/[0.05] p-3">
              <ProfileInfo
                userInfo={userInfo}
                handlelogout={handleLogout}
              />
            </div>

            <p className="flex flex-wrap items-center justify-center gap-1 pt-2 text-center text-xs text-purple-200/50">
              Made with
              <Heart className="h-3 w-3 fill-fuchsia-400 text-fuchsia-400" />
              <span>for your special moments</span>
            </p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

