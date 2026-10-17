// // import React, { useEffect, useState } from 'react'
// // import { useChatStore } from '../../utils/useChatStore'
// // import SidebarStructure from './SidebarStructure';
// // import { Users } from 'lucide-react';
// // import { useAuthStore } from '../../utils/useAuthStore';

// // const Sidebar = () => {
// //   const {getUsers, users, selectedUser, setSelectedUser, isUserLoading} = useChatStore();
// //   const {onlineUsers} = useAuthStore();
// //   const [showOnlineOnly, setShowOnlineOnly]= useState();
// //    const filteredUsers = showOnlineOnly
// //     ? users.filter((user) => onlineUsers.includes(user._id))
// //     : users;
    
// //   useEffect(() =>{
// //     getUsers()
// //   },[getUsers])

// //   if(isUserLoading) return <SidebarStructure/>
// //   return (
// //   <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
// //     <div className='border-b border-base-300 w-full p-5'>
// //       <div className='flex items-center gap-2'>
// //        <Users className='size-6'/>
// //        <span className='font-medium hidden lg:block'>Contacts</span>
// //       </div>
// //       {/* TODO: Online filter toggle */}
// //         <div className="mt-3 hidden lg:flex items-center gap-2">
// //           <label className="cursor-pointer flex items-center gap-2">
// //             <input
// //               type="checkbox"
// //               checked={showOnlineOnly}
// //               onChange={(e) => setShowOnlineOnly(e.target.checked)}
// //               className="checkbox checkbox-sm"
// //             />
// //             <span className="text-sm">Show online only</span>
// //           </label>
// //           <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
// //         </div>
// //       </div>

// //       <div className="overflow-y-auto w-full py-3">
// //         {filteredUsers.map((user) => (
// //           <button
// //             key={user._id}
// //             onClick={() => setSelectedUser(user)}
// //             className={`
// //               w-full p-3 flex items-center gap-3
// //               hover:bg-base-300 transition-colors
// //               ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
// //             `}
// //           >
// //             <div className="relative mx-auto lg:mx-0">
// //               <img
// //                 src={user.profilePic || "/avatar.png"}
// //                 alt={user.name}
// //                 className="size-12 object-cover rounded-full"
// //               />
// //               {onlineUsers.includes(user._id) && (
// //                 <span
// //                   className="absolute bottom-0 right-0 size-3 bg-green-500 
// //                   rounded-full ring-2 ring-zinc-900"
// //                 />
// //               )}
// //             </div>

// //             {/* User info - only visible on larger screens */}
// //             <div className="hidden lg:block text-left min-w-0">
// //               <div className="font-medium truncate">{user.fullName}</div>
// //               <div className="text-sm text-zinc-400">
// //                 {onlineUsers.includes(user._id) ? "Online" : "Offline"}
// //               </div>
// //             </div>
// //           </button>
// //         ))}

// //         {filteredUsers.length === 0 && (
// //           <div className="text-center text-zinc-500 py-4">No online users</div>
// //         )}
// //     </div>

// //   </aside>
// //   )
// // }

// // export default Sidebar
// import React, { useEffect, useState } from 'react';
// import { useChatStore } from '../../utils/useChatStore';
// import SidebarStructure from './SidebarStructure';
// import { Users } from 'lucide-react';
// import { useAuthStore } from '../../utils/useAuthStore';

// const Sidebar = () => {
//   const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } = useChatStore();
//   const { onlineUsers } = useAuthStore();
//   const [showOnlineOnly, setShowOnlineOnly] = useState(false);

//   const filteredUsers = showOnlineOnly
//     ? users.filter((user) => onlineUsers.includes(user._id))
//     : users;

//   useEffect(() => {
//     getUsers();
//   }, [getUsers]);

//   if (isUserLoading) return <SidebarStructure />;

//   return (
//     <aside className='h-full w-20 lg:w-72 bg-gray-900 border-r border-gray-700 text-white flex flex-col transition-all duration-200'>
//       <div className='border-b border-gray-700 w-full p-5'>
//         <div className='flex items-center gap-2'>
//           <Users className='size-6 text-pink-400' />
//           <span className='font-medium hidden lg:block'>Contacts</span>
//         </div>

//         <div className="mt-3 hidden lg:flex items-center gap-2">
//           <label className="cursor-pointer flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={showOnlineOnly}
//               onChange={(e) => setShowOnlineOnly(e.target.checked)}
//               className="checkbox checkbox-sm accent-pink-500"
//             />
//             <span className="text-sm">Show online only</span>
//           </label>
//           <span className="text-xs text-gray-400">({onlineUsers.length - 1} online)</span>
//         </div>
//       </div>

//       <div className="overflow-y-auto w-full py-3">
//         {filteredUsers.map((user) => (
//           <button
//             key={user._id}
//             onClick={() => setSelectedUser(user)}
//             className={`w-full p-3 flex items-center gap-3 
//               hover:bg-gray-800 transition-colors
//               ${selectedUser?._id === user._id ? "bg-pink-500/20 ring-1 ring-pink-100" : ""}
//             `}
//           >
//             <div className="relative mx-auto lg:mx-0">
//               <img
//                 src={user.profilePic || "/avatar.png"}
//                 alt={user.name}
//                 className="size-12 object-cover rounded-full"
//               />
//               {onlineUsers.includes(user._id) && (
//                 <span
//                   className="absolute bottom-0 right-0 size-3 bg-green-500 
//                   rounded-full ring-2 ring-gray-900"
//                 />
//               )}
//             </div>

//             <div className="hidden lg:block text-left min-w-0">
//               <div className="font-medium truncate">{user.fullName}</div>
//               <div className="text-sm text-gray-400">
//                 {onlineUsers.includes(user._id) ? "Online" : "Offline"}
//               </div>
//             </div>
//           </button>
//         ))}

//         {filteredUsers.length === 0 && (
//           <div className="text-center text-gray-400 py-4">No online users</div>
//         )}
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;



// import React, { useEffect, useState } from "react";
// import { Users, Heart, MessageCircle } from "lucide-react";
// import { useChatStore } from "../../utils/useChatStore";
// import SidebarStructure from "./SidebarStructure";
// import { useAuthStore } from "../../utils/useAuthStore";

// const Sidebar = () => {
//   const {
//     getUsers,
//     users,
//     selectedUser,
//     setSelectedUser,
//     isUserLoading,
//   } = useChatStore();

//   const { onlineUsers } = useAuthStore();
//   const [showOnlineOnly, setShowOnlineOnly] = useState(false);

//   const filteredUsers = showOnlineOnly
//     ? users.filter((user) => onlineUsers.includes(user._id))
//     : users;

//   useEffect(() => {
//     getUsers();
//   }, [getUsers]);

//   if (isUserLoading) return <SidebarStructure />;

//   return (
//     <aside className="flex h-full w-20 shrink-0 flex-col overflow-hidden border-r border-pink-100/80 bg-white/75 text-gray-700 shadow-[4px_0_24px_-16px_rgba(236,72,153,0.25)] backdrop-blur-xl transition-all duration-300 lg:w-72">

//       {/* Header */}
//       <div className="border-b border-pink-100/80 bg-gradient-to-br from-pink-50/90 via-white to-purple-50/80 p-4 lg:p-5">
//         <div className="flex items-center justify-center gap-3 lg:justify-start">
//           <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 text-white shadow-lg shadow-pink-200/60">
//             <Users className="h-5 w-5" />
//           </div>

//           <div className="hidden min-w-0 lg:block">
//             <h2 className="font-bold tracking-tight text-gray-800">
//               Your People
//             </h2>
//             <p className="text-xs text-pink-400">
//               Your favorite connections
//             </p>
//           </div>
//         </div>

//         {/* Online filter */}
//         <div className="mt-5 hidden lg:block">
//           <label className="flex cursor-pointer items-center justify-between gap-2 rounded-xl border border-pink-100 bg-white/80 p-3 transition hover:bg-pink-50/70">
//             <span className="flex items-center gap-2 text-sm font-medium text-gray-600">
//               <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
//               Show online only
//             </span>

//             <input
//               type="checkbox"
//               checked={showOnlineOnly}
//               onChange={(e) => setShowOnlineOnly(e.target.checked)}
//               className="h-4 w-4 cursor-pointer accent-pink-500"
//             />
//           </label>

//           <div className="mt-3 flex items-center justify-between px-1">
//             <span className="text-xs text-gray-400">Available now</span>
//             <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
//               {onlineUsers.length} online
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Contact list */}
//       <div className="flex-1 space-y-1 overflow-y-auto px-2 py-3 lg:px-3">
//         <p className="mb-3 hidden px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-pink-300 lg:block">
//           Conversations
//         </p>

//         {filteredUsers.map((user) => {
//           const isSelected = selectedUser?._id === user._id;
//           const isOnline = onlineUsers.includes(user._id);

//           return (
//             <button
//               key={user._id}
//               onClick={() => setSelectedUser(user)}
//               title={user.fullName || user.name}
//               className={`group relative flex w-full items-center gap-3 rounded-2xl p-2.5 text-left transition-all duration-200 lg:p-3 ${
//                 isSelected
//                   ? "bg-gradient-to-r from-pink-100 to-purple-50 shadow-sm ring-1 ring-pink-200/80"
//                   : "hover:bg-pink-50/80"
//               }`}
//             >
//               {/* Selected indicator */}
//               {isSelected && (
//                 <span className="absolute bottom-3 left-0 top-3 w-1 rounded-r-full bg-gradient-to-b from-pink-400 to-purple-400" />
//               )}

//               {/* Avatar */}
//               <div className="relative mx-auto shrink-0 lg:mx-0">
//                 <div
//                   className={`rounded-2xl p-[2px] transition-all ${
//                     isSelected
//                       ? "bg-gradient-to-br from-pink-400 to-purple-400"
//                       : "bg-transparent group-hover:bg-pink-200"
//                   }`}
//                 >
//                   <img
//                     src={user.profilePic || "/avatar.png"}
//                     alt={user.fullName || user.name || "User"}
//                     className="h-11 w-11 rounded-[14px] border-2 border-white object-cover"
//                   />
//                 </div>

//                 {isOnline && (
//                   <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400 shadow-sm" />
//                 )}
//               </div>

//               {/* User information */}
//               <div className="hidden min-w-0 flex-1 lg:block">
//                 <div
//                   className={`truncate text-sm font-semibold ${
//                     isSelected ? "text-pink-600" : "text-gray-700"
//                   }`}
//                 >
//                   {user.fullName || user.name || "User"}
//                 </div>

//                 <div className="mt-1 flex items-center gap-1.5">
//                   <span
//                     className={`h-1.5 w-1.5 rounded-full ${
//                       isOnline ? "bg-emerald-400" : "bg-gray-300"
//                     }`}
//                   />
//                   <span
//                     className={`text-xs ${
//                       isOnline ? "text-emerald-600" : "text-gray-400"
//                     }`}
//                   >
//                     {isOnline ? "Online now" : "Offline"}
//                   </span>
//                 </div>
//               </div>

//               {isSelected && (
//                 <Heart className="hidden h-4 w-4 shrink-0 fill-pink-300 text-pink-400 lg:block" />
//               )}
//             </button>
//           );
//         })}

//         {/* Empty state */}
//         {filteredUsers.length === 0 && (
//           <div className="flex flex-col items-center px-3 py-10 text-center">
//             <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 text-pink-400">
//               <MessageCircle className="h-6 w-6" />
//             </div>

//             <p className="text-sm font-semibold text-gray-600">
//               {showOnlineOnly ? "No one's online" : "No contacts yet"}
//             </p>

//             <p className="mt-1 hidden max-w-[180px] text-xs leading-5 text-gray-400 lg:block">
//               {showOnlineOnly
//                 ? "Your people will appear here when they're online."
//                 : "Your conversations will appear here."}
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Footer */}
//       <div className="border-t border-pink-100/80 bg-gradient-to-r from-pink-50/70 to-purple-50/70 p-3">
//         <div className="flex items-center justify-center gap-2 lg:justify-start lg:px-2">
//           <Heart className="h-4 w-4 fill-pink-300 text-pink-400" />
//           <span className="hidden text-xs font-medium text-gray-400 lg:block">
//             Little moments, closer together
//           </span>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;


import React, { useEffect, useState } from "react";
import { Users, Heart, MessageCircle } from "lucide-react";
import { useChatStore } from "../../utils/useChatStore";
import SidebarStructure from "./SidebarStructure";
import { useAuthStore } from "../../utils/useAuthStore";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUserLoading,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUserLoading) return <SidebarStructure />;

  return (
    <aside className="flex h-full w-20 shrink-0 flex-col overflow-hidden border-r border-fuchsia-400/10 bg-[#160d22]/95 text-purple-100 shadow-[4px_0_30px_-12px_rgba(217,70,239,0.12)] backdrop-blur-xl transition-all duration-300 lg:w-72">

      {/* Header */}
      <div className="border-b border-white/5 bg-gradient-to-br from-[#25112f]/90 via-[#1b102b] to-[#101a32]/90 p-4 lg:p-5">
        <div className="flex items-center justify-center gap-3 lg:justify-start">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-fuchsia-300/15 bg-gradient-to-br from-fuchsia-500 to-blue-600 text-white shadow-lg shadow-fuchsia-950/40">
            <Users className="h-5 w-5" />
          </div>

          <div className="hidden min-w-0 lg:block">
            <h2 className="font-bold tracking-tight text-white">
              Your People
            </h2>
            <p className="text-xs text-fuchsia-300/70">
              Your favorite connections
            </p>
          </div>
        </div>

        {/* Online filter */}
        <div className="mt-5 hidden lg:block">
          <label className="flex cursor-pointer items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition hover:border-fuchsia-400/20 hover:bg-fuchsia-500/5">
            <span className="flex items-center gap-2 text-sm font-medium text-purple-100/80">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
              Show online only
            </span>

            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="h-4 w-4 cursor-pointer accent-fuchsia-500"
            />
          </label>

          <div className="mt-3 flex items-center justify-between px-1">
            <span className="text-xs text-purple-200/40">
              Available now
            </span>
            <span className="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">
              {onlineUsers.length} online
            </span>
          </div>
        </div>
      </div>

      {/* Contact list */}
      <div className="flex-1 space-y-1 overflow-y-auto px-2 py-3 lg:px-3">
        <p className="mb-3 hidden px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-fuchsia-300/60 lg:block">
          Conversations
        </p>

        {filteredUsers.map((user) => {
          const isSelected = selectedUser?._id === user._id;
          const isOnline = onlineUsers.includes(user._id);

          return (
            <button
              key={user._id}
              type="button"
              onClick={() => setSelectedUser(user)}
              title={user.fullName || user.name}
              className={`group relative flex w-full items-center gap-3 rounded-2xl p-2.5 text-left transition-all duration-200 lg:p-3 ${
                isSelected
                  ? "bg-gradient-to-r from-fuchsia-500/15 to-blue-500/10 shadow-lg shadow-fuchsia-950/10 ring-1 ring-fuchsia-400/20"
                  : "hover:bg-white/[0.04]"
              }`}
            >
              {/* Selected indicator */}
              {isSelected && (
                <span className="absolute bottom-3 left-0 top-3 w-1 rounded-r-full bg-gradient-to-b from-fuchsia-400 to-blue-400 shadow-[0_0_10px_rgba(217,70,239,0.4)]" />
              )}

              {/* Avatar */}
              <div className="relative mx-auto shrink-0 lg:mx-0">
                <div
                  className={`rounded-2xl p-[2px] transition-all duration-200 ${
                    isSelected
                      ? "bg-gradient-to-br from-fuchsia-400 to-blue-500 shadow-md shadow-fuchsia-950/30"
                      : "bg-transparent group-hover:bg-gradient-to-br group-hover:from-fuchsia-500/60 group-hover:to-blue-500/60"
                  }`}
                >
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.fullName || user.name || "User"}
                    className="h-11 w-11 rounded-[14px] border-2 border-[#1b102b] object-cover"
                  />
                </div>

                {isOnline && (
                  <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#160d22] bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
                )}
              </div>

              {/* User information */}
              <div className="hidden min-w-0 flex-1 lg:block">
                <div
                  className={`truncate text-sm font-semibold transition-colors ${
                    isSelected
                      ? "text-fuchsia-200"
                      : "text-purple-100/80 group-hover:text-white"
                  }`}
                >
                  {user.fullName || user.name || "User"}
                </div>

                <div className="mt-1 flex items-center gap-1.5">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isOnline
                        ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.35)]"
                        : "bg-purple-200/25"
                    }`}
                  />
                  <span
                    className={`text-xs ${
                      isOnline
                        ? "text-emerald-300/90"
                        : "text-purple-200/40"
                    }`}
                  >
                    {isOnline ? "Online now" : "Offline"}
                  </span>
                </div>
              </div>

              {isSelected && (
                <Heart className="hidden h-4 w-4 shrink-0 fill-fuchsia-400/30 text-fuchsia-300 lg:block" />
              )}
            </button>
          );
        })}

        {/* Empty state */}
        {filteredUsers.length === 0 && (
          <div className="flex flex-col items-center px-3 py-10 text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-fuchsia-400/15 bg-gradient-to-br from-fuchsia-500/15 to-blue-500/15 text-fuchsia-300">
              <MessageCircle className="h-6 w-6" />
            </div>

            <p className="text-sm font-semibold text-white/80">
              {showOnlineOnly ? "No one's online" : "No contacts yet"}
            </p>

            <p className="mt-1 hidden max-w-[180px] text-xs leading-5 text-purple-200/45 lg:block">
              {showOnlineOnly
                ? "Your people will appear here when they're online."
                : "Your conversations will appear here."}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-white/5 bg-gradient-to-r from-[#21112f]/80 to-[#111b32]/80 p-3">
        <div className="flex items-center justify-center gap-2 lg:justify-start lg:px-2">
          <Heart className="h-4 w-4 fill-fuchsia-400/30 text-fuchsia-300" />
          <span className="hidden text-xs font-medium text-purple-200/45 lg:block">
            Little moments, closer together
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
