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
//     `group flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
//       location.pathname === path
//         ? "border-fuchsia-400/20 bg-fuchsia-500/15 text-fuchsia-300 shadow-md shadow-fuchsia-950/20"
//         : "border-transparent text-purple-200/60 hover:border-fuchsia-400/15 hover:bg-white/5 hover:text-white"
//     }`;

//   const iconLinkClass = (path) =>
//     `flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 ${
//       location.pathname === path
//         ? "border-fuchsia-400/25 bg-fuchsia-500/15 text-fuchsia-300 shadow-lg shadow-fuchsia-950/20"
//         : "border-transparent text-purple-200/60 hover:border-white/10 hover:bg-white/5 hover:text-white"
//     }`;

//   return (
//     <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#160b24]/90 text-white shadow-[0_4px_30px_rgba(0,0,0,0.2)] backdrop-blur-2xl">
//       {/* Neon background glow */}
//       <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
//         <div className="absolute -top-16 left-1/4 h-32 w-32 rounded-full bg-fuchsia-500/10 blur-3xl" />
//         <div className="absolute -top-16 right-1/4 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />
//         <div className="absolute -top-10 left-1/2 h-24 w-24 rounded-full bg-orange-500/[0.06] blur-3xl" />
//       </div>

//       <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
//         {/* Brand */}
//         <Link
//           to="/dashboard"
//           onClick={() => setIsMobileMenuOpen(false)}
//           className="group flex shrink-0 items-center gap-2"
//         >
//           <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-blue-500 text-white shadow-lg shadow-fuchsia-500/20 transition duration-300 group-hover:rotate-[-8deg] group-hover:scale-110">
//             <Heart className="h-5 w-5 fill-white transition-transform duration-300 group-hover:scale-110" />
//             <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#160b24] bg-orange-400" />
//           </div>

//           <div className="flex flex-col">
//             <span className="bg-gradient-to-r from-fuchsia-300 via-pink-300 to-blue-300 bg-clip-text text-xl font-extrabold tracking-tight text-transparent sm:text-2xl">
//               MilesCloser
//             </span>
//             <span className="-mt-1 hidden text-[10px] font-medium tracking-[0.18em] text-purple-200/45 sm:block">
//               EVERY MOMENT MATTERS
//             </span>
//           </div>
//         </Link>

//         {/* Desktop Navigation */}
//         {isToken && (
//           <div className="hidden items-center gap-2 md:flex">
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
//               aria-label="Dashboard"
//               className={iconLinkClass("/dashboard")}
//             >
//               <LayoutDashboard className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
//             </Link>

//             <Link
//               to="/chat"
//               title="Messages"
//               aria-label="Messages"
//               className={iconLinkClass("/chat")}
//             >
//               <MessageCircle className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
//             </Link>

//             <Link
//               to="/profile"
//               title="Settings"
//               aria-label="Profile and settings"
//               className={iconLinkClass("/profile")}
//             >
//               <Settings className="h-5 w-5 transition-transform duration-300 hover:rotate-45" />
//             </Link>

//             <div className="ml-2 border-l border-white/10 pl-4">
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
//             className="flex h-10 w-10 items-center justify-center rounded-xl border border-fuchsia-400/20 bg-white/5 text-fuchsia-300 shadow-sm transition-all duration-300 hover:border-fuchsia-400/40 hover:bg-fuchsia-500/10 hover:shadow-lg hover:shadow-fuchsia-950/20 active:scale-95 md:hidden"
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
//         <div className="border-t border-white/10 bg-[#1a0d29]/95 px-4 pb-5 pt-4 shadow-xl shadow-black/20 backdrop-blur-2xl md:hidden">
//           <div className="mx-auto flex max-w-7xl flex-col gap-3">
//             {location.pathname === "/dashboard" && (
//               <div className="mb-2 rounded-2xl border border-fuchsia-400/15 bg-white/[0.03] p-2">
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
//               <span className="ml-auto text-xs text-fuchsia-300/70">
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

//             <div className="my-1 h-px bg-gradient-to-r from-transparent via-fuchsia-400/30 to-transparent" />

//             <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-500/[0.07] to-blue-500/[0.05] p-3">
//               <ProfileInfo
//                 userInfo={userInfo}
//                 handlelogout={handleLogout}
//               />
//             </div>

//             <p className="flex flex-wrap items-center justify-center gap-1 pt-2 text-center text-xs text-purple-200/50">
//               Made with
//               <Heart className="h-3 w-3 fill-fuchsia-400 text-fuchsia-400" />
//               <span>for your special moments</span>
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
  Sparkles,
  LogOut,
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
    {
      path: "/dashboard",
      label: "Memories",
      icon: LayoutDashboard,
    },
    {
      path: "/chat",
      label: "Messages",
      icon: MessageCircle,
    },
    {
      path: "/profile",
      label: "Settings",
      icon: Settings,
    },
  ];

  const isActive = (path) => location.pathname === path;

  const desktopLinkClass = (path) =>
    `relative flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-300 ${
      isActive(path)
        ? "bg-gradient-to-r from-fuchsia-500/15 to-violet-500/15 text-fuchsia-200"
        : "text-purple-100/60 hover:bg-white/[0.05] hover:text-white"
    }`;

  const mobileLinkClass = (path) =>
    `flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all duration-300 ${
      isActive(path)
        ? "border-fuchsia-400/25 bg-gradient-to-r from-fuchsia-500/15 to-violet-500/10 text-fuchsia-200"
        : "border-white/[0.06] bg-white/[0.02] text-purple-100/70 hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#100819]/85 text-white shadow-[0_8px_35px_rgba(0,0,0,0.22)] backdrop-blur-2xl">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 left-[15%] h-36 w-36 rounded-full bg-fuchsia-600/[0.09] blur-[70px]" />
        <div className="absolute -top-20 right-[20%] h-36 w-36 rounded-full bg-blue-500/[0.08] blur-[70px]" />
      </div>

      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        {/* Brand */}
        <Link
          to="/dashboard"
          onClick={() => setIsMobileMenuOpen(false)}
          className="group flex shrink-0 items-center gap-3"
          aria-label="MilesCloser home"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-blue-500 opacity-50 blur-md transition-opacity duration-300 group-hover:opacity-90" />

            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-gradient-to-br from-[#e879f9] via-[#a855f7] to-[#6366f1] shadow-lg shadow-fuchsia-950/30 transition duration-300 group-hover:scale-105 group-hover:rotate-3">
              <Heart className="h-[21px] w-[21px] fill-white text-white" />
            </div>

            <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-[2.5px] border-[#100819] bg-emerald-400">
              <span className="h-1 w-1 rounded-full bg-white" />
            </span>
          </div>

          <div className="flex flex-col">
            <span className="bg-gradient-to-r from-white via-fuchsia-100 to-violet-200 bg-clip-text text-[21px] font-extrabold tracking-[-0.8px] text-transparent sm:text-[23px]">
              MilesCloser<span className="text-fuchsia-400">.</span>
            </span>
            <span className="-mt-0.5 text-[9px] font-semibold uppercase tracking-[2.1px] text-purple-200/40">
              Moments that matter
            </span>
          </div>
        </Link>

        {/* Desktop navigation */}
        {isToken && (
          <div className="hidden items-center gap-1 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-1.5 lg:flex">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={desktopLinkClass(path)}
                aria-current={isActive(path) ? "page" : undefined}
              >
                <Icon
                  className={`h-[17px] w-[17px] transition-transform duration-300 ${
                    isActive(path) ? "text-fuchsia-300" : ""
                  }`}
                />
                <span>{label}</span>

                {isActive(path) && (
                  <span className="absolute inset-x-3 -bottom-1 h-[2px] rounded-full bg-gradient-to-r from-fuchsia-400 to-violet-400" />
                )}
              </Link>
            ))}
          </div>
        )}

        {/* Right-side actions */}
        <div className="ml-auto flex min-w-0 items-center justify-end gap-2 sm:gap-3 lg:ml-0">
          {isToken && location.pathname === "/dashboard" && (
            <div className="hidden w-[220px] xl:block 2xl:w-[270px]">
              <SearchBar
                value={searchQuery}
                onChange={({ target }) => setSearchQuery(target.value)}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
              />
            </div>
          )}

          {isToken && (
            <>
              {/* Compact navigation on medium screens */}
              <div className="hidden items-center gap-1 md:flex lg:hidden">
                {navItems.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    title={label}
                    aria-label={label}
                    aria-current={isActive(path) ? "page" : undefined}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                      isActive(path)
                        ? "bg-fuchsia-500/15 text-fuchsia-300"
                        : "text-purple-100/60 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    <Icon className="h-[19px] w-[19px]" />
                  </Link>
                ))}
              </div>

              <div className="hidden h-8 w-px bg-white/10 md:block" />

              {/* User profile */}
              <div className="hidden md:block">
                <ProfileInfo
                  userInfo={userInfo}
                  handlelogout={handleLogout}
                />
              </div>

              {/* Mobile menu toggle */}
              <button
                type="button"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-purple-100 transition-all duration-300 hover:border-fuchsia-400/30 hover:bg-fuchsia-500/10 hover:text-fuchsia-200 active:scale-95 md:hidden"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isToken && isMobileMenuOpen && (
        <div className="border-t border-white/[0.07] bg-[#130a1e]/95 px-4 pb-5 pt-4 shadow-2xl shadow-black/30 backdrop-blur-2xl md:hidden">
          <div className="mx-auto flex max-w-xl flex-col gap-3">
            {/* Mobile search */}
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

            {/* Navigation links */}
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

            {/* Mobile profile */}
            <div className="mt-2 rounded-2xl border border-white/[0.07] bg-gradient-to-br from-fuchsia-500/[0.06] to-blue-500/[0.04] p-3">
              <ProfileInfo
                userInfo={userInfo}
                handlelogout={handleLogout}
              />
            </div>

            {/* Footer */}
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

