// import React, { useEffect, useRef, useState } from 'react'
// import {FaRegFileImage} from 'react-icons/fa'
// import {MdDeleteOutline} from "react-icons/md"

// const ImageSelector = ({image, setImage, handleDeleteImg}) => {

//     const inputRef = useRef(null);
//     const [previewUrl, setPreviewUrl] = useState(null);

//     const handleImageChange=(event)=>{
//     const file = event.target.files[0];
//     if(file){
//       setImage(file);
//     }
//     };

//     const onChooseFile = () =>{
//       inputRef.current.click();
//     }
    
//     const handleRemoveImage=()=>{
//      setImage(null);
//      handleDeleteImg()
//     }
//     useEffect(()=>{
//       //if image is a string url 
//       if(typeof image === 'string'){
//         setPreviewUrl(image);
//       }else if(image){
//         // if the image is as file oobject 
//         setPreviewUrl(URL.createObjectURL(image));
//       }else{
//         //if there is no image 
//         setPreviewUrl(null);
//       }

//       return () =>{
//         if(previewUrl && typeof previewUrl === 'string' && !image){
//           URL.revokeObjectURL(previewUrl)
//         }
//       }
//     },[image])
//   return (
//     <div>
//       <input 
//       type="file"
//       accept='image/*'
//       ref={inputRef}
//       onChange={handleImageChange}
//       className='hidden'
//       />

//       {!image ?
//        (<button className='w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded border border-slate-200/50' onClick={()=>onChooseFile()}>
//         <div className='w-14 h-14 flex items-center justify-center bg-pink-50 rounded-full border border-pink-100'>
//           <FaRegFileImage className="text-xl text-pink-500"/>
//         </div>

//         <p className='text-sm text-slate-500'>Browse image files to upload</p>
//       </button>)
//       :
//       (<div className='w-full relative'>
//        <img src={previewUrl} alt='selected' className='w-full h-[300px] object-cover rounded-lg'/>


//        <button
//        className='flex items-center gap-1 text-xs font-medium rounded px-3 py-[3px] bg-rose-50 text-rose-500 shadow-rose-100/0 border border-rose-100 hover:bg-rose-500 hover:text-white absolute top-2 right-2'
//        onClick={handleRemoveImage}
//        >
//         <MdDeleteOutline className="text-lg"/>
//        </button>
//       </div>
//       )}
//     </div>
//   )
// }

// export default ImageSelector



import React, { useEffect, useRef, useState } from 'react'
import { FaRegFileImage } from 'react-icons/fa'
import {
  MdDeleteOutline,
  MdOutlineCloudUpload,
  MdFavorite,
  MdClose,
} from 'react-icons/md'

const ImageSelector = ({ image, setImage, handleDeleteImg }) => {
  const inputRef = useRef(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (typeof image === 'string') {
      setPreviewUrl(image)
      return
    }

    if (image instanceof File) {
      const objectUrl = URL.createObjectURL(image)
      setPreviewUrl(objectUrl)

      return () => URL.revokeObjectURL(objectUrl)
    }

    setPreviewUrl(null)
  }, [image])

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please choose a valid image file.')
      event.target.value = ''
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB.')
      event.target.value = ''
      return
    }

    setError('')
    setImage(file)
  }

  const onChooseFile = () => {
    inputRef.current?.click()
  }

  const handleRemoveImage = () => {
    setImage(null)
    setError('')

    if (inputRef.current) {
      inputRef.current.value = ''
    }

    handleDeleteImg?.()
  }

  return (
    <div className="w-full">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <button
          type="button"
          onClick={onChooseFile}
          className="group relative flex h-[240px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-fuchsia-400/30 bg-gradient-to-br from-[#21112f] via-[#1b102b] to-[#101b35] p-6 transition-all duration-300 hover:border-fuchsia-400/70 hover:shadow-xl hover:shadow-fuchsia-950/30"
        >
          {/* Neon ambient glow */}
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-fuchsia-500/15 blur-3xl transition-transform duration-500 group-hover:scale-125" />
          <div className="pointer-events-none absolute -bottom-10 -left-8 h-36 w-36 rounded-full bg-blue-500/15 blur-3xl transition-transform duration-500 group-hover:scale-125" />

          {/* Upload icon */}
          <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-500/20 to-blue-500/20 text-fuchsia-300 shadow-lg shadow-fuchsia-950/30 transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-3">
            <FaRegFileImage className="text-2xl" />

            <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-fuchsia-300/30 bg-[#241333] text-blue-300 shadow-lg">
              <MdOutlineCloudUpload className="text-lg" />
            </span>
          </div>

          <span className="relative text-base font-bold text-white transition-colors group-hover:text-fuchsia-300">
            Add a memory photo
          </span>

          <span className="relative mt-2 text-center text-sm text-purple-200/50">
            Browse your images and choose a special moment
          </span>

          <span className="relative mt-4 rounded-full border border-fuchsia-400/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-purple-200/70">
            JPG, PNG, WEBP · Max 5MB
          </span>
        </button>
      ) : (
        <div className="group relative overflow-hidden rounded-3xl border border-fuchsia-400/20 bg-[#1c102b] shadow-xl shadow-black/30 ring-1 ring-white/5">
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Selected memory"
              className="h-[240px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] sm:h-[300px]"
            />
          )}

          {/* Image overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#100819]/90 via-transparent to-[#100819]/25" />

          {/* Memory badge */}
          <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-fuchsia-300/20 bg-[#1b102b]/80 px-3 py-2 text-xs font-semibold text-fuchsia-300 shadow-lg backdrop-blur-xl">
            <MdFavorite className="text-base" />
            Memory photo
          </div>

          {/* Remove image */}
          <button
            type="button"
            onClick={handleRemoveImage}
            aria-label="Remove selected image"
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-[#1b102b]/80 text-rose-300 shadow-lg backdrop-blur-xl transition-all hover:scale-105 hover:border-rose-400/40 hover:bg-rose-500 hover:text-white active:scale-95"
          >
            <MdDeleteOutline className="text-xl" />
          </button>

          {/* Bottom image controls */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
            <div className="min-w-0 rounded-xl border border-white/10 bg-[#1b102b]/85 px-3 py-2 shadow-lg backdrop-blur-xl">
              <p className="truncate text-xs font-semibold text-white">
                Looking picture-perfect!
              </p>
              <p className="text-[10px] text-purple-200/60">
                Your memory is ready
              </p>
            </div>

            <button
              type="button"
              onClick={onChooseFile}
              className="flex shrink-0 items-center gap-1.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-blue-600 px-3 py-2.5 text-xs font-semibold text-white shadow-lg shadow-fuchsia-950/30 transition-all hover:scale-105 hover:shadow-fuchsia-500/20 active:scale-95"
            >
              <FaRegFileImage className="text-sm" />
              Change
            </button>
          </div>
        </div>
      )}

      {/* Validation error */}
      {error && (
        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          <span>{error}</span>

          <button
            type="button"
            onClick={() => setError('')}
            aria-label="Dismiss error"
            className="shrink-0 rounded-full p-1 transition-colors hover:bg-rose-500/15 hover:text-rose-200"
          >
            <MdClose className="text-lg" />
          </button>
        </div>
      )}
    </div>
  )
}

export default ImageSelector
