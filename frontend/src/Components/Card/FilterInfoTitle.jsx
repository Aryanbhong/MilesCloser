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
      <div className="inline-flex items-center gap-2 rounded-xl border border-pink-100 bg-gradient-to-r from-pink-50 to-purple-50 px-3 py-2 shadow-sm transition-all duration-300 hover:shadow-md">
        <CalendarDays className="h-4 w-4 shrink-0 text-pink-500" />

        <p className="text-xs font-semibold text-gray-700 sm:text-sm">
          {startDate} - {endDate}
        </p>

        <button
          type="button"
          onClick={onClear}
          aria-label="Clear date filter"
          className="ml-1 flex h-6 w-6 items-center justify-center rounded-lg text-pink-400 transition-all duration-200 hover:bg-pink-100 hover:text-pink-700 active:scale-90"
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
        <div className="inline-flex items-center gap-3 rounded-2xl border border-pink-100 bg-white/80 px-4 py-3 shadow-[0_4px_20px_rgba(236,72,153,0.07)] backdrop-blur-xl">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 text-pink-500">
            <Search className="h-5 w-5" />
          </div>

          <div>
            <h3 className="text-base font-bold text-gray-800 sm:text-lg">
              Search Results
            </h3>
            <p className="text-xs text-gray-500">
              Here&apos;s what we found for you
            </p>
          </div>

          <Heart className="ml-2 h-4 w-4 fill-pink-300 text-pink-300" />
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 text-pink-500">
              <CalendarDays className="h-5 w-5" />
            </div>

            <h3 className="text-base font-bold text-gray-700 sm:text-lg">
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

