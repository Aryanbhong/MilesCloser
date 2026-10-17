// import React from 'react'

// const EmptyCard = ({imgSrc, message}) => {
//   return (
//     <div className='flex flex-col items-center justify-center mt-20'>
//       <img src={imgSrc} alt="No notes" className='w-47 rounded-full object-cover' />

//       <p className='w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5'>
//         {message}
//       </p>
//     </div>
//   )
// }

// export default EmptyCard



// import React from "react";
// import { Heart, Sparkles } from "lucide-react";

// const EmptyCard = ({ imgSrc, message }) => {
//   return (
//     <div className="flex w-full flex-col items-center justify-center px-4 py-12 sm:py-16">
      
//       <div className="group relative mb-7">
       
//         <div className="absolute inset-3 rounded-full bg-pink-200/60 blur-2xl transition duration-500 group-hover:bg-purple-200/70" />

//         <Heart className="absolute -left-5 top-5 h-7 w-7 -rotate-12 fill-pink-200 text-pink-300 transition-transform duration-500 group-hover:-translate-y-2" />

//         <Sparkles className="absolute -right-4 top-2 h-6 w-6 text-purple-300 transition-transform duration-500 group-hover:rotate-12" />

      
//         <div className="relative rounded-[2rem] border border-white/80 bg-white/70 p-3 shadow-[0_12px_40px_rgba(236,72,153,0.13)] backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(236,72,153,0.2)]">
//           <img
//             src={imgSrc}
//             alt="No notes"
//             className="h-44 w-44 rounded-[1.5rem] object-cover sm:h-52 sm:w-52"
//           />
//         </div>

     
//         <div className="absolute -bottom-3 -right-3 flex h-11 w-11 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-pink-400 to-rose-400 text-white shadow-lg shadow-pink-200/60 transition-transform duration-300 group-hover:rotate-12">
//           <Heart className="h-5 w-5 fill-white" />
//         </div>
//       </div>

//       {/* Message */}
//       <div className="max-w-md rounded-3xl border border-pink-100/80 bg-white/70 px-6 py-5 text-center shadow-[0_8px_30px_rgba(236,72,153,0.06)] backdrop-blur-xl sm:px-8">
//         <p className="text-base font-semibold leading-7 text-gray-700 sm:text-lg">
//           {message}
//         </p>

//         <div className="mt-3 flex items-center justify-center gap-2">
//           <span className="h-1 w-8 rounded-full bg-pink-200" />
//           <Heart className="h-3.5 w-3.5 fill-pink-400 text-pink-400" />
//           <span className="h-1 w-8 rounded-full bg-purple-200" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmptyCard;



import React from "react";
import { Heart, Sparkles } from "lucide-react";

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center px-4 py-12 sm:py-16">
      {/* Illustration Card */}
      <div className="group relative mb-7">
        {/* Neon background glow */}
        <div className="absolute inset-3 rounded-full bg-fuchsia-500/15 blur-3xl transition duration-500 group-hover:bg-purple-500/25" />

        {/* Decorative hearts and sparkles */}
        <Heart className="absolute -left-5 top-5 h-7 w-7 -rotate-12 fill-fuchsia-400/60 text-fuchsia-300 transition-transform duration-500 group-hover:-translate-y-2" />

        <Sparkles className="absolute -right-4 top-2 h-6 w-6 text-blue-300 transition-transform duration-500 group-hover:rotate-12" />

        {/* Main Image */}
        <div className="relative rounded-[2rem] border border-fuchsia-400/20 bg-[#1b102b]/80 p-3 shadow-[0_12px_40px_rgba(217,70,239,0.12)] backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:border-fuchsia-400/40 group-hover:shadow-[0_20px_50px_rgba(217,70,239,0.2)]">
          <img
            src={imgSrc}
            alt="No notes"
            className="h-44 w-44 rounded-[1.5rem] object-cover sm:h-52 sm:w-52"
          />
        </div>

        {/* Floating heart badge */}
        <div className="absolute -bottom-3 -right-3 flex h-11 w-11 items-center justify-center rounded-2xl border-4 border-[#100819] bg-gradient-to-br from-fuchsia-500 to-blue-500 text-white shadow-lg shadow-fuchsia-500/20 transition-transform duration-300 group-hover:rotate-12">
          <Heart className="h-5 w-5 fill-white" />
        </div>
      </div>

      {/* Message */}
      <div className="relative max-w-md overflow-hidden rounded-3xl border border-fuchsia-400/15 bg-gradient-to-br from-[#21122f]/95 via-[#1b102b]/95 to-[#141020]/95 px-6 py-5 text-center shadow-[0_8px_30px_rgba(217,70,239,0.07)] backdrop-blur-xl sm:px-8">
        {/* Subtle ambient glow */}
        <div className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-8 h-24 w-24 rounded-full bg-blue-500/10 blur-3xl" />

        <p className="relative text-base font-semibold leading-7 text-purple-100 sm:text-lg">
          {message}
        </p>

        <div className="relative mt-3 flex items-center justify-center gap-2">
          <span className="h-1 w-8 rounded-full bg-gradient-to-r from-fuchsia-500/30 to-fuchsia-400" />
          <Heart className="h-3.5 w-3.5 fill-fuchsia-400 text-fuchsia-400" />
          <span className="h-1 w-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-500/30" />
        </div>
      </div>
    </div>
  );
};

export default EmptyCard;
