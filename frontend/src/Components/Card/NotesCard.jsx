// import React from 'react'
// import moment from "moment";
// import  {FaHeart} from "react-icons/fa6"
// import { GrMapLocation} from "react-icons/gr"

// const NotesCard = ({
//     imageUrl,
//     title,
//     date,
//     story,
//     visitedLocation,
//     isFavourite,
//     onFavouriteClick,
//     onEdit,
//     onClick

   
// }) => {
//   return (
//     <div className='border  rounded-lg overflow-hidden bg-pink-50 hover:shadow-lg hover:shadow-slate-300 transition-all ease-in-out relative cursor-pointer'>
//       <img 
//       src={imageUrl} 
//       alt={title}
//       className='w-full h-56 object-cover rounded-lg'
//       onClick={onClick}
//        />

//        <button
//        className='w-12 h-12 flex items-center justify-center bg-transparent rounded-lg border border-white/30 absolute top-4 right-4'
//        onClick={onFavouriteClick}
//        >
//         <FaHeart
//         className={`icon-btn ${isFavourite ? "text-red-500" : "text-white"}`}
//         />
//        </button>

//     <div className='p-4' onClick={onClick}>
//       <div className='flex items-center gap-3'>
//         <div className='flex-1'>
//         <h6 className='text-sm font-medium'>{title} </h6>
//         <span>
//           {date ? moment(date).format("Do MMM YYYY"):"-"}
//         </span>
//         </div>
       
//       </div>

//       <p>{story?.slice(0,60)}</p>

//       <div className='inline-flex items-center gap-2 text-[13px] text-pink-600 bg-pink-200/60 rounded mt-3 px-2 py-1'>
//         <GrMapLocation className='text-sm'/>
//         {visitedLocation?.map((item, index) => visitedLocation.length ==  index + 1 ? `${item}` : `${item}`)}
//       </div>
//     </div>



//     </div>
//   )
// }

// export default NotesCard



import React from "react";
import moment from "moment";
import { FaHeart } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
import { CalendarDays, MapPin, ArrowUpRight } from "lucide-react";

const NotesCard = ({
  imageUrl,
  title,
  date,
  story,
  visitedLocation,
  isFavourite,
  onFavouriteClick,
  onEdit,
  onClick,
}) => {
  const locations = Array.isArray(visitedLocation)
    ? visitedLocation.filter(Boolean)
    : visitedLocation
      ? [visitedLocation]
      : [];

  return (
    <article
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-3xl border border-pink-100/80 bg-white shadow-[0_8px_30px_rgba(236,72,153,0.07)] transition-all duration-500 hover:-translate-y-2 hover:border-pink-200 hover:shadow-[0_20px_45px_rgba(236,72,153,0.16)]"
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden sm:h-60">
        <img
          src={imageUrl}
          alt={title || "Memory"}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/10" />

        {/* Memory label */}
        <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/80 px-3 py-1.5 text-xs font-semibold text-pink-600 shadow-sm backdrop-blur-md">
          <FaHeart className="text-[11px]" />
          A little memory
        </div>

        {/* Favourite button */}
        <button
          type="button"
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
          aria-pressed={Boolean(isFavourite)}
          onClick={(event) => {
            event.stopPropagation();
            onFavouriteClick?.(event);
          }}
          className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/50 shadow-lg backdrop-blur-xl transition-all duration-300 hover:scale-110 active:scale-95 ${
            isFavourite
              ? "bg-pink-500 text-white shadow-pink-300/50"
              : "bg-white/25 text-white hover:bg-white/90 hover:text-pink-500"
          }`}
        >
          <FaHeart
            className={`text-lg transition-transform duration-300 ${
              isFavourite ? "scale-110" : "group-hover:scale-110"
            }`}
          />
        </button>

        {/* Title over image */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="line-clamp-2 text-xl font-bold leading-snug text-white drop-shadow-md sm:text-2xl">
            {title || "Untitled Memory"}
          </h3>
        </div>

        {/* Corner decoration */}
        <div className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-xl border border-white/30 bg-white/20 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:rotate-6 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5" />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Date */}
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-pink-500">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-pink-100 to-purple-100">
            <CalendarDays className="h-4 w-4" />
          </div>

          <span>
            {date ? moment(date).format("Do MMM YYYY") : "Date not added"}
          </span>
        </div>

        {/* Story */}
        <p className="min-h-[3.5rem] text-sm leading-6 text-gray-600">
          {story
            ? story.length > 100
              ? `${story.slice(0, 100).trimEnd()}...`
              : story
            : "A beautiful memory waiting to be described..."}
        </p>

        {/* Divider */}
        <div className="my-4 h-px bg-gradient-to-r from-pink-100 via-purple-100 to-transparent" />

        {/* Locations */}
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-pink-50 text-pink-500">
            <MapPin className="h-4 w-4" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
              Places we remember
            </p>

            {locations.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {locations.slice(0, 3).map((item, index) => (
                  <span
                    key={`${item}-${index}`}
                    className="max-w-full truncate rounded-lg border border-pink-100 bg-gradient-to-r from-pink-50 to-purple-50 px-2.5 py-1 text-xs font-medium text-pink-700 transition-colors duration-200 group-hover:border-pink-200"
                  >
                    {item}
                  </span>
                ))}

                {locations.length > 3 && (
                  <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500">
                    +{locations.length - 3} more
                  </span>
                )}
              </div>
            ) : (
              <span className="text-xs text-gray-400">
                No location added
              </span>
            )}
          </div>
        </div>

        {/* Bottom accent */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-400 transition-colors duration-300 group-hover:text-pink-500">
            Made to be remembered
          </span>

          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-pink-300" />
            <span className="h-1.5 w-1.5 rounded-full bg-rose-300" />
            <span className="h-1.5 w-1.5 rounded-full bg-purple-300" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default NotesCard;

