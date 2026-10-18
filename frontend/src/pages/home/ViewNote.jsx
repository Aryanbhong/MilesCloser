

import moment from 'moment'
import React from 'react'
import { GrMapLocation } from 'react-icons/gr'
import {
  MdClose,
  MdDeleteOutline,
  MdUpdate,
  MdFavorite,
  MdCalendarMonth,
  MdAutoAwesome,
} from 'react-icons/md'

const ViewNote = ({ storyInfo, onClose, handleDelete, handleEdit }) => {
  return (
    <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-fuchsia-400/30 bg-gradient-to-br from-[#190923] via-[#25103a] to-[#10132f] p-5 text-white shadow-2xl shadow-fuchsia-950/40 sm:p-8">

      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute right-1/3 top-1/2 h-32 w-32 rounded-full bg-orange-500/10 blur-3xl" />


      <div className="relative z-10 flex items-center justify-between gap-3 border-b border-fuchsia-400/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white shadow-lg shadow-fuchsia-500/20">
            <MdFavorite className="text-xl" />
          </div>

          <div>
            <p className="text-sm font-extrabold tracking-wide text-white">
              Memory Details
            </p>
            <p className="text-xs text-purple-200/70">
              A little moment worth keeping ✨
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close note"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-purple-200 transition-all duration-200 hover:rotate-90 hover:border-fuchsia-400/50 hover:bg-fuchsia-500/20 hover:text-white"
        >
          <MdClose className="text-xl" />
        </button>
      </div>

      <div className="relative z-10 flex flex-col gap-5 py-6">

        {storyInfo?.userId?.fullName && (
          <div className="flex w-fit items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-3 py-1.5">
            <MdAutoAwesome className="text-lg text-fuchsia-300" />
            <p className="text-xs font-semibold italic text-fuchsia-200">
              {storyInfo.userId.fullName}'s journal
            </p>
          </div>
        )}

      
        <div>
          <h1 className="break-words text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">
            {storyInfo?.title}
          </h1>

          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-fuchsia-400 via-purple-400 to-orange-400" />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-fuchsia-400/20 bg-white/5 px-3 py-2.5 shadow-sm">
            <MdCalendarMonth className="text-lg text-fuchsia-300" />
            <span className="text-xs font-semibold text-purple-100 sm:text-sm">
              {storyInfo?.visitedDate
                ? moment(storyInfo.visitedDate).format('Do MMM YYYY')
                : 'Date not available'}
            </span>
          </div>

          {!!storyInfo?.visitedLocation?.length && (
            <div className="flex max-w-full items-start gap-2 rounded-xl border border-blue-400/20 bg-blue-500/10 px-3 py-2.5">
              <GrMapLocation className="mt-0.5 shrink-0 text-base text-cyan-300" />

              <span className="break-words text-xs font-medium leading-5 text-blue-100 sm:text-sm">
                {storyInfo.visitedLocation.join(', ')}
              </span>
            </div>
          )}
        </div>

   
        {storyInfo?.imageUrl && (
          <div className="group relative mt-1 overflow-hidden rounded-2xl border border-fuchsia-300/20 bg-black/20 p-1 shadow-xl shadow-fuchsia-950/20">
            <img
              src={storyInfo.imageUrl}
              alt={storyInfo?.title || 'Memory'}
              className="max-h-[420px] min-h-[200px] w-full rounded-xl object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />

            <div className="pointer-events-none absolute inset-1 rounded-xl bg-gradient-to-t from-[#160824]/70 via-transparent to-white/5" />

            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-[#190923]/80 px-3 py-2 text-xs font-semibold text-fuchsia-100 shadow-lg backdrop-blur-md">
              <MdFavorite className="text-sm text-pink-400" />
              A cherished moment
            </div>
          </div>
        )}

   
        <div className="rounded-2xl border border-purple-300/15 bg-white/[0.04] p-4 shadow-inner shadow-purple-950/20 sm:p-5">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-6 w-1 rounded-full bg-gradient-to-b from-fuchsia-400 via-purple-400 to-orange-400" />
            <h2 className="text-sm font-bold text-white sm:text-base">
              The Story Behind This Memory
            </h2>
          </div>

          <p className="whitespace-pre-line break-words text-justify text-sm leading-7 text-purple-100/80">
            {storyInfo?.story || 'No story has been added to this memory yet.'}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 py-1 text-fuchsia-300">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-fuchsia-400/40" />
          <MdFavorite className="text-base" />
          <span className="text-xs font-medium italic text-purple-200">
            Saved with love
          </span>
          <MdFavorite className="text-base text-pink-400" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-orange-400/40" />
        </div>
      </div>

    
      <div className="relative z-10 flex flex-col-reverse gap-3 border-t border-fuchsia-400/20 pt-5 sm:flex-row sm:justify-end">
        <button
          onClick={handleDelete}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-2.5 text-sm font-semibold text-rose-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-rose-400/60 hover:bg-rose-500/20 hover:shadow-lg hover:shadow-rose-950/20"
        >
          <MdDeleteOutline className="text-xl" />
          Delete Memory
        </button>

        <button
          onClick={handleEdit}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-fuchsia-950/30 transition-all duration-200 hover:-translate-y-0.5 hover:from-fuchsia-400 hover:via-purple-400 hover:to-blue-400 hover:shadow-xl hover:shadow-fuchsia-900/30"
        >
          <MdUpdate className="text-xl" />
          Update Memory
        </button>
      </div>
    </div>
  )
}

export default ViewNote
