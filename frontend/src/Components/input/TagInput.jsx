
import React, { useState } from 'react'
import { MdAdd, MdClose, MdOutlinePlace, MdFavorite } from 'react-icons/md'
import { GrMapLocation } from 'react-icons/gr'

const TagInput = ({ tags = [], setTags }) => {
  const [inputValue, setInputValue] = useState('')

  const addNewTag = () => {
    const newTag = inputValue.trim()

    if (!newTag) return

    
    const alreadyExists = tags.some(
      (tag) => tag.toLowerCase() === newTag.toLowerCase()
    )

    if (alreadyExists) {
      setInputValue('')
      return
    }

    setTags([...tags, newTag])
    setInputValue('')
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addNewTag()
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div className="w-full">
    
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-500/20 to-blue-500/20 text-fuchsia-300">
            <GrMapLocation className="text-base" />
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-bold text-white">
              Places & Locations
            </h3>
            <p className="text-xs text-purple-200/50">
              Where did this memory happen?
            </p>
          </div>
        </div>

        {tags.length > 0 && (
          <span className="shrink-0 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-2.5 py-1 text-xs font-semibold text-fuchsia-300">
            {tags.length} {tags.length === 1 ? 'place' : 'places'}
          </span>
        )}
      </div>

     
      {tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="group inline-flex max-w-full items-center gap-1.5 rounded-xl border border-fuchsia-400/20 bg-gradient-to-r from-fuchsia-500/10 to-blue-500/[0.07] py-1.5 pl-3 pr-1.5 text-sm font-medium text-fuchsia-200 shadow-sm transition-all duration-200 hover:border-fuchsia-400/40 hover:bg-fuchsia-500/15"
            >
              <MdOutlinePlace className="shrink-0 text-base text-fuchsia-400" />

              <span className="max-w-[200px] break-words">
                {tag}
              </span>

              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                aria-label={`Remove ${tag}`}
                className="ml-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-purple-200/50 transition-all hover:bg-rose-500/15 hover:text-rose-300 active:scale-90"
              >
                <MdClose className="text-base" />
              </button>
            </span>
          ))}
        </div>
      )}

   
      <div className="group relative">
        <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-blue-500 opacity-0 blur transition duration-300 group-focus-within:opacity-30" />

        <div className="relative flex items-center gap-2 rounded-2xl border border-white/10 bg-[#1c102b]/90 p-1.5 pl-4 shadow-lg shadow-black/10 backdrop-blur-xl transition-all group-focus-within:border-fuchsia-400/40">
          <MdOutlinePlace className="shrink-0 text-xl text-fuchsia-400" />

          <input
            type="text"
            value={inputValue}
            className="w-full min-w-0 bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-purple-200/35"
            placeholder="Add a city, place, or destination..."
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />

          <button
            type="button"
            onClick={addNewTag}
            disabled={!inputValue.trim()}
            aria-label="Add location"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-blue-600 text-white shadow-md shadow-fuchsia-950/30 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-fuchsia-500/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
          >
            <MdAdd className="text-2xl" />
          </button>
        </div>
      </div>

     
      <div className="mt-2 flex items-center gap-1.5 pl-1">
        <MdFavorite className="text-xs text-orange-300/80" />
        <p className="text-xs text-purple-200/45">
          Press Enter or tap + to add a location.
        </p>
      </div>
    </div>
  )
}

export default TagInput

