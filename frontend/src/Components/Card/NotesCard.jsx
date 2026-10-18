
import React from "react";
import moment from "moment";
import { FaHeart } from "react-icons/fa6";
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
      className="group relative cursor-pointer overflow-hidden rounded-3xl border border-fuchsia-400/15 bg-[#160d22] shadow-[0_8px_35px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-2 hover:border-fuchsia-400/30 hover:shadow-[0_20px_45px_rgba(168,85,247,0.12)]"
    >
    
      <div className="pointer-events-none absolute -right-16 -top-16 z-10 h-40 w-40 rounded-full bg-fuchsia-500/[0.06] blur-3xl" />

 
      <div className="relative h-56 overflow-hidden sm:h-60">
        <img
          src={imageUrl}
          alt={title || "Memory"}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

      
        <div className="absolute inset-0 bg-gradient-to-t from-[#100819] via-[#100819]/20 to-black/10" />

    
        <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-fuchsia-300/20 bg-[#160d22]/75 px-3 py-1.5 text-xs font-semibold text-fuchsia-200 shadow-lg backdrop-blur-xl">
          <FaHeart className="text-[11px] text-fuchsia-400" />
          A little memory
        </div>

      
        <button
          type="button"
          aria-label={
            isFavourite ? "Remove from favourites" : "Add to favourites"
          }
          aria-pressed={Boolean(isFavourite)}
          onClick={(event) => {
            event.stopPropagation();
            onFavouriteClick?.(event);
          }}
          className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl border shadow-lg backdrop-blur-xl transition-all duration-300 hover:scale-110 active:scale-95 ${
            isFavourite
              ? "border-fuchsia-300/40 bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white shadow-fuchsia-500/25"
              : "border-white/20 bg-[#160d22]/50 text-white hover:border-fuchsia-300/40 hover:bg-fuchsia-500/20 hover:text-fuchsia-200"
          }`}
        >
          <FaHeart
            className={`text-lg transition-transform duration-300 ${
              isFavourite ? "scale-110" : "group-hover:scale-110"
            }`}
          />
        </button>

     
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="line-clamp-2 text-xl font-bold leading-snug text-white drop-shadow-lg sm:text-2xl">
            {title || "Untitled Memory"}
          </h3>
        </div>


        <div className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-[#160d22]/50 text-fuchsia-200 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:rotate-6 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5" />
        </div>
      </div>

     
      <div className="relative p-5">
      
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-fuchsia-300">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-fuchsia-400/15 bg-gradient-to-br from-fuchsia-500/15 to-blue-500/10">
            <CalendarDays className="h-4 w-4" />
          </div>

          <span>
            {date ? moment(date).format("Do MMM YYYY") : "Date not added"}
          </span>
        </div>

     
        <p className="min-h-[3.5rem] text-sm leading-6 text-purple-100/65">
          {story
            ? story.length > 100
              ? `${story.slice(0, 100).trimEnd()}...`
              : story
            : "A beautiful memory waiting to be described..."}
        </p>

        <div className="my-4 h-px bg-gradient-to-r from-fuchsia-400/25 via-purple-400/15 to-transparent" />

       
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-fuchsia-400/10 bg-fuchsia-500/[0.08] text-fuchsia-300">
            <MapPin className="h-4 w-4" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-purple-300/45">
              Places we remember
            </p>

            {locations.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {locations.slice(0, 3).map((item, index) => (
                  <span
                    key={`${item}-${index}`}
                    className="max-w-full truncate rounded-lg border border-fuchsia-400/15 bg-gradient-to-r from-fuchsia-500/[0.08] to-blue-500/[0.06] px-2.5 py-1 text-xs font-medium text-purple-200 transition-colors duration-200 group-hover:border-fuchsia-400/25"
                  >
                    {item}
                  </span>
                ))}

                {locations.length > 3 && (
                  <span className="rounded-lg border border-white/[0.06] bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-purple-300/60">
                    +{locations.length - 3} more
                  </span>
                )}
              </div>
            ) : (
              <span className="text-xs text-purple-300/40">
                No location added
              </span>
            )}
          </div>
        </div>

   
        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs font-medium text-purple-300/40 transition-colors duration-300 group-hover:text-fuchsia-300">
            Made to be remembered
          </span>

          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400/80 shadow-[0_0_7px_rgba(232,121,249,0.4)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400/80" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default NotesCard;

