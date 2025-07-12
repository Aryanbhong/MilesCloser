import React, { useState } from 'react'
import moment from "moment"
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { MdClose, MdOutlineDateRange } from 'react-icons/md'

const DateSelector = ({date, setDate}) => {

  const defaultClassNames = getDefaultClassNames();
  const [openDatePicker, setOpenDatePicker] = useState(false);
  return (
    <div>
     <button className='inline-flex items-center gap-2 text-[13px] font-medium text-pink-600 bg-pink-200/40 hover:bg-pin-200/70 rounded px-2 py-1 cursor-pointer'
      onClick={() =>{
        setOpenDatePicker(true);
     }}>
        <MdOutlineDateRange className='text-lg' />
        {date
            ? moment(date).format("Do MMM YYYY")
            : moment().format("Do MMM YYYY")
        }
     </button>

    {openDatePicker && (
        <div className='overflow-y-scroll p-5 bg-pink-50/80 rounded-lg relative pt-9'>
        <button
        className='w-10 h-10 rounded-full flex items-center justify-center bg-pink-100 hover:bg-pink-100 absolute top-2 right-2'
        onClick={()=>{
         setOpenDatePicker(false);
        }}
        >
         <MdClose className='text-xl text-pink-600'/>
        </button>
 
        <DayPicker
        captionLayout='dropdown-buttons'
        mode="single"
        selected={date}
        onSelect={setDate}
        pageNavigation
        classNames={{
          today: `border-pink-500`, // Add a border to today's date
          selected: `bg-pink-500 border-pink-500 text-white rounded-md`, // Highlight the selected day
          root: `${defaultClassNames.root} shadow-lg p-5`, // Add a shadow to the root element
          chevron: `${defaultClassNames.chevron} fill-amber-500` // Change the color of the chevron
        }}
        />
      </div>
    )
    }
    </div>
  )
}


export default DateSelector