import moment from 'moment'
import React from 'react'
import { GrMapLocation } from 'react-icons/gr'
import { MdClose, MdDeleteOutline, MdUpdate } from 'react-icons/md'

const ViewNote = ({ storyInfo, onClose, handleDelete, handleEdit }) => {
  return (
    <div className='relative w-full max-w-3xl mx-auto p-4'>
      {/* Action Buttons */}
      <div className='flex items-center justify-end'>
        <div className='flex items-center gap-3 bg-pink-50/50 p-2 rounded-l-lg'>
          <button
            className='flex items-center gap-1 text-xs font-medium bg-pink-50 text-pink-400 border border-pink-100 hover:bg-pink-400 hover:text-white rounded px-3 py-[3px]'
            onClick={handleEdit}
          >
            <MdUpdate className='text-lg' /> UPDATE NOTE
          </button>
          <button
            className='flex items-center gap-1 text-xs font-medium rounded px-3 py-[3px] bg-rose-50 text-rose-500 border border-rose-100 hover:bg-rose-500 hover:text-white'
            onClick={handleDelete}
          >
            <MdDeleteOutline className='text-lg' /> DELETE
          </button>
          <button onClick={onClose}>
            <MdClose className='text-xl text-slate-400' />
          </button>
        </div>
      </div>

  
      <div className='flex-1 flex flex-col gap-2 py-4'>
        {storyInfo?.userId?.fullName && (
          <p className='text-[11px] text-pink-800 italic'>
           {storyInfo.userId.fullName }'s journal
          </p>
        )}

        <h1 className='text-2xl text-slate-950'>
          {storyInfo?.title}
        </h1>

        <div className='flex items-center justify-between gap-3'>
          <span className='text-sm text-slate-500'>
            {storyInfo && moment(storyInfo.visitedDate).format("Do MMM YYYY")}
          </span>

          <div className='inline-flex items-center gap-2 text-[13px] text-pink-600 bg-pink-200/40 rounded px-2 py-1'>
            <GrMapLocation className='text-sm' />
            {storyInfo?.visitedLocation?.map((item, index) =>
              storyInfo.visitedLocation.length === index + 1 ? `${item}` : `${item}, `
            )}
          </div>
        </div>

        {/* Image */}
        {storyInfo?.imageUrl && (
          <img
            src={storyInfo.imageUrl}
            alt="Note"
            className='w-full h-[300px] object-cover rounded-lg mt-4'
          />
        )}

        {/* Story */}
        <div className='mt-4'>
          <p className='text-sm text-slate-950 leading-6 text-justify whitespace-pre-line'>
            {storyInfo?.story}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewNote;
