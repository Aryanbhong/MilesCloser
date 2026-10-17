// import React from 'react'
// import { profileMaker } from '../utils/helper'
// import { LogOut } from 'lucide-react'

// const ProfileInfo = ({userInfo , handlelogout}) => {
//   return (
//     userInfo && (
//         <div className='flex items-center gap-3'>
//        <div className='w-12 h-12 flex items-center justify-center bg-slate-100 rounded-full text-slate-950 font-medium overflow-hidden'>
//   {userInfo.profilePic ? (
//     <img
//       src={userInfo.profilePic}
//       alt="profile"
//       className="w-full h-full rounded-full object-cover"
//     />
//   ) : (
//     profileMaker(userInfo ? userInfo.fullName : "")
//   )}
// </div>
      
//        <div>
//         <p className='text-sm font-medium'>{userInfo.fullName || ""}</p>
//         <button className='text-sm text-slate-700 underline' onClick={handlelogout}>
//             <LogOut/>
//         </button>
//        </div>
//     </div>
//     )
//   )
// }

// export default ProfileInfo



// import React from "react";
// import { profileMaker } from "../utils/helper";
// import { LogOut, Heart } from "lucide-react";

// const ProfileInfo = ({ userInfo, handlelogout }) => {
//   if (!userInfo) return null;

//   return (
//     <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-pink-100/80 bg-white/70 p-2.5 shadow-sm shadow-pink-100/50 backdrop-blur-xl transition-all duration-300 hover:border-pink-200 hover:shadow-md hover:shadow-pink-100/60">

//       {/* Profile Avatar */}
//       <div className="shrink-0 rounded-2xl bg-gradient-to-br from-pink-400 via-rose-300 to-purple-400 p-[2px] shadow-md shadow-pink-200/50">
//         <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-[14px] border-2 border-white bg-gradient-to-br from-pink-100 to-purple-100 text-sm font-bold text-pink-600">
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
//           <p className="truncate text-sm font-semibold text-gray-800">
//             {userInfo.fullName || "Your Profile"}
//           </p>
//           <Heart className="h-3 w-3 shrink-0 fill-pink-300 text-pink-400" />
//         </div>

//         <p className="mt-0.5 text-xs text-gray-400">
//           Your MilesTogether account
//         </p>

//         {/* Logout Button */}
//         <button
//           type="button"
//           onClick={handlelogout}
//           className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-pink-100 bg-pink-50/80 px-2.5 py-1.5 text-xs font-medium text-pink-600 transition-all duration-200 hover:border-pink-200 hover:bg-pink-100 hover:text-rose-600 active:scale-95"
//         >
//           <LogOut className="h-3.5 w-3.5" />
//           Sign out
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileInfo;



import React from "react";
import { profileMaker } from "../utils/helper";
import { LogOut, Heart } from "lucide-react";

const ProfileInfo = ({ userInfo, handlelogout }) => {
  if (!userInfo) return null;

  return (
    <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-fuchsia-400/15 bg-gradient-to-br from-[#281638]/90 to-[#19132f]/90 p-2.5 shadow-lg shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:border-fuchsia-400/30 hover:shadow-fuchsia-950/30">
      {/* Profile Avatar */}
      <div className="shrink-0 rounded-2xl bg-gradient-to-br from-fuchsia-400 via-purple-500 to-blue-400 p-[2px] shadow-md shadow-fuchsia-500/20">
        <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-[14px] border-2 border-[#21142f] bg-gradient-to-br from-[#321a43] to-[#172343] text-sm font-bold text-fuchsia-300">
          {userInfo.profilePic ? (
            <img
              src={userInfo.profilePic}
              alt={userInfo.fullName || "Profile"}
              className="h-full w-full object-cover"
            />
          ) : (
            profileMaker(userInfo.fullName || "")
          )}
        </div>
      </div>

      {/* User Details */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="truncate text-sm font-semibold text-white">
            {userInfo.fullName || "Your Profile"}
          </p>
          <Heart className="h-3 w-3 shrink-0 fill-fuchsia-400/30 text-fuchsia-400" />
        </div>

        <p className="mt-0.5 text-xs text-purple-200/50">
          Your MilesCloser account
        </p>

        {/* Logout Button */}
        <button
          type="button"
          onClick={handlelogout}
          className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-fuchsia-400/20 bg-fuchsia-500/10 px-2.5 py-1.5 text-xs font-medium text-fuchsia-300 transition-all duration-200 hover:border-fuchsia-400/40 hover:bg-fuchsia-500/20 hover:text-white active:scale-95"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;

