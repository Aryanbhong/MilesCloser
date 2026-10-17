// import moment from 'moment'
// import React from 'react'
// import { MdOutlineClose } from 'react-icons/md';

// const FilterInfoTitle = ({filterDates, filterType, onClear}) => {

//     const DateRangeChip=({date}) =>{
//         const startDate = date?.from 
//         ? moment(date?.from).format("Do MMM YYYY")
//         : "N/A";

//     const endDate = date?.to 
//     ? moment(date?.to).format("Do MMM YYYY")
//     : "N/A";

//     return(
//         <div className='flex items-center gap-2 bg-slate-100 px-3 py-2 rounded'>
//          <p className='text-xs font-medium'>
//            {startDate} - {endDate}

//          </p>

//          <button onClick={onClear}>
//             <MdOutlineClose/>
//          </button>
//         </div>
//     )
//     }
//   return (
//     filterType && (
//         <div className='mb-5'>
//       {filterType === "search" ? (
//         <h3 className='text-lg font-medium'>Search Results</h3>
//       ) : (
//         <div className='flex items-center gap-2'>
//             <h3 className='text-lg font-medium'>
//                 Notes from
//             </h3>

//             <DateRangeChip date={filterDates} />
//         </div>
//       )

//       }
//     </div>
//     )
//   )
// }

// export default FilterInfoTitle



// import moment from "moment";
// import React from "react";
// import { MdOutlineClose } from "react-icons/md";
// import { CalendarDays, Search, Heart } from "lucide-react";

// const FilterInfoTitle = ({ filterDates, filterType, onClear }) => {
//   const DateRangeChip = ({ date }) => {
//     const startDate = date?.from
//       ? moment(date.from).format("Do MMM YYYY")
//       : "N/A";

//     const endDate = date?.to
//       ? moment(date.to).format("Do MMM YYYY")
//       : "N/A";

//     return (
//       <div className="inline-flex items-center gap-2 rounded-xl border border-pink-100 bg-gradient-to-r from-pink-50 to-purple-50 px-3 py-2 shadow-sm transition-all duration-300 hover:shadow-md">
//         <CalendarDays className="h-4 w-4 shrink-0 text-pink-500" />

//         <p className="text-xs font-semibold text-gray-700 sm:text-sm">
//           {startDate} - {endDate}
//         </p>

//         <button
//           type="button"
//           onClick={onClear}
//           aria-label="Clear date filter"
//           className="ml-1 flex h-6 w-6 items-center justify-center rounded-lg text-pink-400 transition-all duration-200 hover:bg-pink-100 hover:text-pink-700 active:scale-90"
//         >
//           <MdOutlineClose className="h-4 w-4" />
//         </button>
//       </div>
//     );
//   };

//   if (!filterType) return null;

//   return (
//     <div className="mb-6 animate-in fade-in duration-300">
//       {filterType === "search" ? (
//         <div className="inline-flex items-center gap-3 rounded-2xl border border-pink-100 bg-white/80 px-4 py-3 shadow-[0_4px_20px_rgba(236,72,153,0.07)] backdrop-blur-xl">
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 text-pink-500">
//             <Search className="h-5 w-5" />
//           </div>

//           <div>
//             <h3 className="text-base font-bold text-gray-800 sm:text-lg">
//               Search Results
//             </h3>
//             <p className="text-xs text-gray-500">
//               Here&apos;s what we found for you
//             </p>
//           </div>

//           <Heart className="ml-2 h-4 w-4 fill-pink-300 text-pink-300" />
//         </div>
//       ) : (
//         <div className="flex flex-wrap items-center gap-3">
//           <div className="flex items-center gap-2">
//             <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 text-pink-500">
//               <CalendarDays className="h-5 w-5" />
//             </div>

//             <h3 className="text-base font-bold text-gray-700 sm:text-lg">
//               Notes from
//             </h3>
//           </div>

//           <DateRangeChip date={filterDates} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default FilterInfoTitle;



import moment from "moment";
import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { CalendarDays, Search, Heart } from "lucide-react";

const FilterInfoTitle = ({ filterDates, filterType, onClear }) => {
  const DateRangeChip = ({ date }) => {
    const startDate = date?.from
      ? moment(date.from).format("Do MMM YYYY")
      : "N/A";

    const endDate = date?.to
      ? moment(date.to).format("Do MMM YYYY")
      : "N/A";

    return (
      <div className="group inline-flex items-center gap-2 rounded-xl border border-fuchsia-400/20 bg-gradient-to-r from-[#21122f] to-[#171326] px-3 py-2 shadow-[0_0_15px_rgba(217,70,239,0.06)] transition-all duration-300 hover:border-fuchsia-400/40 hover:shadow-[0_0_20px_rgba(217,70,239,0.12)]">
        <CalendarDays className="h-4 w-4 shrink-0 text-fuchsia-400" />

        <p className="text-xs font-semibold text-purple-100 sm:text-sm">
          {startDate} - {endDate}
        </p>

        <button
          type="button"
          onClick={onClear}
          aria-label="Clear date filter"
          className="ml-1 flex h-6 w-6 items-center justify-center rounded-lg text-purple-300 transition-all duration-200 hover:bg-fuchsia-500/15 hover:text-fuchsia-300 active:scale-90"
        >
          <MdOutlineClose className="h-4 w-4" />
        </button>
      </div>
    );
  };

  if (!filterType) return null;

  return (
    <div className="mb-6 animate-in fade-in duration-300">
      {filterType === "search" ? (
        <div className="relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border border-fuchsia-400/20 bg-gradient-to-br from-[#21122f]/95 via-[#1b102b]/95 to-[#141020]/95 px-4 py-3 shadow-[0_0_25px_rgba(217,70,239,0.08)] backdrop-blur-xl">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-fuchsia-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 left-1/3 h-20 w-20 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-500/20 to-blue-500/20 text-fuchsia-300 shadow-[0_0_15px_rgba(217,70,239,0.08)]">
            <Search className="h-5 w-5" />
          </div>

          <div className="relative">
            <h3 className="text-base font-bold text-white sm:text-lg">
              Search Results
            </h3>
            <p className="text-xs text-purple-300">
              Here's what we found for you
            </p>
          </div>

          <Heart className="relative ml-2 h-4 w-4 shrink-0 fill-fuchsia-400/70 text-fuchsia-400 transition-transform duration-300 hover:scale-110" />
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-500/20 to-blue-500/20 text-fuchsia-300 shadow-[0_0_15px_rgba(217,70,239,0.06)]">
              <CalendarDays className="h-5 w-5" />
            </div>

            <h3 className="text-base font-bold text-purple-100 sm:text-lg">
              Notes from
            </h3>
          </div>

          <DateRangeChip date={filterDates} />
        </div>
      )}
    </div>
  );
};

export default FilterInfoTitle;
