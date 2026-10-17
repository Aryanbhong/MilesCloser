// import React, { useState } from 'react'
// import moment from "moment"
// import { DayPicker, getDefaultClassNames } from "react-day-picker";
// import { MdClose, MdOutlineDateRange } from 'react-icons/md'

// const DateSelector = ({date, setDate}) => {

//   const defaultClassNames = getDefaultClassNames();
//   const [openDatePicker, setOpenDatePicker] = useState(false);
//   return (
//     <div>
//      <button className='inline-flex items-center gap-2 text-[13px] font-medium text-pink-600 bg-pink-200/40 hover:bg-pin-200/70 rounded px-2 py-1 cursor-pointer'
//       onClick={() =>{
//         setOpenDatePicker(true);
//      }}>
//         <MdOutlineDateRange className='text-lg' />
//         {date
//             ? moment(date).format("Do MMM YYYY")
//             : moment().format("Do MMM YYYY")
//         }
//      </button>

//     {openDatePicker && (
//         <div className='overflow-y-scroll p-5 bg-pink-50/80 rounded-lg relative pt-9'>
//         <button
//         className='w-10 h-10 rounded-full flex items-center justify-center bg-pink-100 hover:bg-pink-100 absolute top-2 right-2'
//         onClick={()=>{
//          setOpenDatePicker(false);
//         }}
//         >
//          <MdClose className='text-xl text-pink-600'/>
//         </button>
 
//         <DayPicker
//         captionLayout='dropdown-buttons'
//         mode="single"
//         selected={date}
//         onSelect={setDate}
//         pageNavigation
//         classNames={{
//           today: `border-pink-500`, // Add a border to today's date
//           selected: `bg-pink-500 border-pink-500 text-white rounded-md`, // Highlight the selected day
//           root: `${defaultClassNames.root} shadow-lg p-5`, // Add a shadow to the root element
//           chevron: `${defaultClassNames.chevron} fill-amber-500` // Change the color of the chevron
//         }}
//         />
//       </div>
//     )
//     }
//     </div>
//   )
// }


// export default DateSelector




import React, { useState } from 'react'
import moment from 'moment'
import { DayPicker, getDefaultClassNames } from 'react-day-picker'
import {
  MdClose,
  MdOutlineDateRange,
  MdKeyboardArrowDown,
  MdFavorite,
} from 'react-icons/md'

const DateSelector = ({ date, setDate }) => {
  const defaultClassNames = getDefaultClassNames()
  const [openDatePicker, setOpenDatePicker] = useState(false)

  const handleSelect = (selectedDate) => {
    setDate(selectedDate)

    if (selectedDate) {
      setOpenDatePicker(false)
    }
  }

  return (
    <div className="relative inline-block">
      {/* Date Button */}
      <button
        type="button"
        onClick={() => setOpenDatePicker((prev) => !prev)}
        className="group inline-flex items-center gap-2 rounded-2xl border border-fuchsia-400/15 bg-[#1c102b]/90 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-fuchsia-400/40 hover:bg-[#241333] hover:shadow-fuchsia-950/30"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-fuchsia-400/10 bg-gradient-to-br from-fuchsia-500/20 to-blue-500/20 text-fuchsia-300 transition-transform duration-300 group-hover:scale-105">
          <MdOutlineDateRange className="text-lg" />
        </span>

        <span className="flex flex-col items-start">
          <span className="text-[10px] font-medium uppercase tracking-wider text-purple-200/50">
            Memory date
          </span>

          <span>
            {date ? moment(date).format('Do MMM YYYY') : 'Choose a date'}
          </span>
        </span>

        <MdKeyboardArrowDown
          className={`ml-1 text-xl text-fuchsia-300 transition-transform duration-300 ${
            openDatePicker ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Calendar Panel */}
      {openDatePicker && (
        <>
          {/* Click outside to close */}
          <button
            type="button"
            aria-label="Close calendar"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpenDatePicker(false)}
          />

          <div className="absolute right-0 top-full z-50 mt-3 w-[min(340px,calc(100vw-2rem))] animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden rounded-3xl border border-fuchsia-400/20 bg-[#180e25]/95 shadow-2xl shadow-black/40 backdrop-blur-2xl">
            {/* Calendar Header */}
            <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-r from-[#381443] via-[#29143e] to-[#122849] px-5 py-4 text-white">
              <div className="pointer-events-none absolute -right-5 -top-8 h-24 w-24 rounded-full bg-fuchsia-500/20 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-10 right-16 h-20 w-20 rounded-full bg-blue-500/20 blur-2xl" />

              <div className="relative flex items-center justify-between gap-3">
                <div>
                  <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-fuchsia-200/80">
                    <MdFavorite className="text-fuchsia-300" />
                    Your memories
                  </div>

                  <h3 className="text-lg font-bold">
                    Pick a date
                  </h3>

                  <p className="mt-1 text-xs text-purple-100/60">
                    {date
                      ? moment(date).format('dddd, Do MMMM YYYY')
                      : 'Choose a special day'}
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Close date picker"
                  onClick={() => setOpenDatePicker(false)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-purple-100/70 transition-colors hover:border-fuchsia-400/30 hover:bg-fuchsia-500/15 hover:text-white"
                >
                  <MdClose className="text-xl" />
                </button>
              </div>
            </div>

            {/* Calendar */}
            <div className="overflow-x-auto p-3 sm:p-4">
              <DayPicker
                captionLayout="dropdown"
                mode="single"
                selected={date}
                onSelect={handleSelect}
                defaultMonth={date || new Date()}
                pageNavigation
                classNames={{
                  root: `${defaultClassNames.root} mx-auto`,
                  months: `${defaultClassNames.months} max-w-full`,
                  month: `${defaultClassNames.month} w-full`,
                  month_caption: `${defaultClassNames.month_caption} mb-3 flex items-center justify-center gap-2`,
                  caption_label: `${defaultClassNames.caption_label} font-bold text-white`,
                  dropdowns: `${defaultClassNames.dropdowns} flex items-center justify-center gap-2`,
                  dropdown: `${defaultClassNames.dropdown} rounded-lg border border-fuchsia-400/20 bg-[#241333] px-2 py-1 text-sm text-white outline-none focus:border-fuchsia-400`,
                  nav: `${defaultClassNames.nav} flex items-center gap-1`,
                  button_previous: `${defaultClassNames.button_previous} rounded-lg text-fuchsia-300 transition-colors hover:bg-fuchsia-500/10 hover:text-white`,
                  button_next: `${defaultClassNames.button_next} rounded-lg text-blue-300 transition-colors hover:bg-blue-500/10 hover:text-white`,
                  month_grid: `${defaultClassNames.month_grid} w-full border-collapse`,
                  weekdays: `${defaultClassNames.weekdays}`,
                  weekday: `${defaultClassNames.weekday} pb-2 text-xs font-semibold text-fuchsia-300/70`,
                  week: `${defaultClassNames.week}`,
                  day: `${defaultClassNames.day} p-0.5 text-center`,
                  day_button: `${defaultClassNames.day_button} flex h-9 w-9 items-center justify-center rounded-xl text-sm font-medium text-purple-100/80 transition-all hover:bg-fuchsia-500/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/60`,
                  today: `${defaultClassNames.today} font-bold text-blue-300 ring-1 ring-inset ring-blue-400/50`,
                  selected: `${defaultClassNames.selected} rounded-xl bg-gradient-to-br from-fuchsia-500 to-blue-600 font-bold text-white shadow-md shadow-fuchsia-950/40`,
                  outside: `${defaultClassNames.outside} text-purple-200/20`,
                  disabled: `${defaultClassNames.disabled} cursor-not-allowed text-purple-200/20 opacity-40`,
                  chevron: `${defaultClassNames.chevron} fill-fuchsia-300`,
                }}
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-[#20112f]/80 px-4 py-3">
              <button
                type="button"
                onClick={() => {
                  setDate(undefined)
                  setOpenDatePicker(false)
                }}
                className="rounded-xl px-3 py-2 text-xs font-semibold text-purple-200/60 transition-colors hover:bg-white/5 hover:text-rose-300"
              >
                Clear date
              </button>

              <button
                type="button"
                onClick={() => {
                  setDate(new Date())
                  setOpenDatePicker(false)
                }}
                className="rounded-xl bg-gradient-to-r from-fuchsia-500 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-fuchsia-950/30 transition-all hover:scale-105 hover:shadow-fuchsia-500/20 active:scale-95"
              >
                Today
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default DateSelector
