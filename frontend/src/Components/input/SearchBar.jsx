// import React from 'react'
// import { FaMagnifyingGlass } from 'react-icons/fa6'
// import {IoMdClose} from "react-icons/io"

// const SearchBar = ({value, onChange, handleSearch, onClearSearch}) => {
//   return (
//     <div className='w-80 flex items-center text-blue-950 px-4 bg-slate-100 rounded-md'>
//       <input 
//       type="text" 
//       name="" 
//       id="" 
//       placeholder='Search Notes'
//       className='w-full text-xs bg-transparent py-[11px] outline-none'
//       value={value}
//       onChange={onChange}
//       />
//       {
//         value && <IoMdClose  className='text-xl text-slate-500 cursor-pointer hover:text-black mr-3' onClick={onClearSearch}/>
//       }

//     <FaMagnifyingGlass className='text-slate-400 cursor-pointer hover:text-black' onClick={handleSearch} />
//     </div>

   
//   )
// }

// export default SearchBar



import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="group relative w-full sm:w-72 md:w-80">
      {/* Neon focus glow */}
      <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-blue-500 opacity-0 blur transition duration-300 group-focus-within:opacity-40" />

      <div className="relative flex items-center gap-2 rounded-2xl border border-white/10 bg-[#1c102b]/90 py-1.5 pl-4 pr-2 shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-300 group-focus-within:border-fuchsia-400/40 group-focus-within:bg-[#241333]">
        {/* Search icon */}
        <FaMagnifyingGlass className="shrink-0 text-sm text-fuchsia-400" />

        {/* Search input */}
        <input
          type="text"
          name="searchNotes"
          placeholder="Search your memories..."
          aria-label="Search notes"
          className="w-full min-w-0 bg-transparent py-2 text-sm text-white outline-none placeholder:text-purple-200/40"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />

        {/* Clear search */}
        {value && (
          <button
            type="button"
            onClick={onClearSearch}
            aria-label="Clear search"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-purple-200/50 transition-all hover:bg-rose-500/15 hover:text-rose-300 active:scale-95"
          >
            <IoMdClose className="text-xl" />
          </button>
        )}

        {/* Search button */}
        <button
          type="button"
          onClick={handleSearch}
          aria-label="Search memories"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-blue-600 text-white shadow-md shadow-fuchsia-950/30 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-fuchsia-500/20 active:scale-95"
        >
          <FaMagnifyingGlass className="text-sm" />
        </button>
      </div>
    </div>
  )
}

export default SearchBar

