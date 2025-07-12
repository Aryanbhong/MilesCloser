import React from 'react'
import moment from "moment";
import  {FaHeart} from "react-icons/fa6"
import { GrMapLocation} from "react-icons/gr"

const NotesCard = ({
    imageUrl,
    title,
    date,
    story,
    visitedLocation,
    isFavourite,
    onFavouriteClick,
    onEdit,
    onClick

   
}) => {
  return (
    <div className='border  rounded-lg overflow-hidden bg-pink-50 hover:shadow-lg hover:shadow-slate-300 transition-all ease-in-out relative cursor-pointer'>
      <img 
      src={imageUrl} 
      alt={title}
      className='w-full h-56 object-cover rounded-lg'
      onClick={onClick}
       />

       <button
       className='w-12 h-12 flex items-center justify-center bg-transparent rounded-lg border border-white/30 absolute top-4 right-4'
       onClick={onFavouriteClick}
       >
        <FaHeart
        className={`icon-btn ${isFavourite ? "text-red-500" : "text-white"}`}
        />
       </button>

    <div className='p-4' onClick={onClick}>
      <div className='flex items-center gap-3'>
        <div className='flex-1'>
        <h6 className='text-sm font-medium'>{title} </h6>
        <span>
          {date ? moment(date).format("Do MMM YYYY"):"-"}
        </span>
        </div>
       
      </div>

      <p>{story?.slice(0,60)}</p>

      <div className='inline-flex items-center gap-2 text-[13px] text-pink-600 bg-pink-200/60 rounded mt-3 px-2 py-1'>
        <GrMapLocation className='text-sm'/>
        {visitedLocation?.map((item, index) => visitedLocation.length ==  index + 1 ? `${item}` : `${item}`)}
      </div>
    </div>



    </div>
  )
}

export default NotesCard
