
// import React, { useState } from 'react'
// import { toast } from 'react-toastify'
// import { MdClose, MdDeleteOutline, MdUpdate, MdAdd } from 'react-icons/md'
// import { getDefaultClassNames } from "react-day-picker"
// import DateSelector from "../../Components/input/DateSelector"
// import ImageSelector from '../../Components/input/ImageSelector'
// import TagInput from '../../Components/input/TagInput'
// import axiosInstance from '../../utils/axiosinstance'
// import moment from 'moment'

// const AddEditNote = ({
//   storyInfo,
//   type,
//   onClose,
//   getAllNotes,
// }) => {
//   const [visitedDate, setVisitedDate] = useState(storyInfo?.visitedDate || null);
//   const [title, setTitle] = useState(storyInfo?.title || "");
//   const [noteImg, setNoteImg] = useState(storyInfo?.imageUrl || null);
//   const [story, setStory] = useState(storyInfo?.story || "");
//   const [visitedLocation, setVisitedLocation] = useState(storyInfo?.visitedLocation || []);
//   const [sharedWithEmail, setSharedWithEmail] = useState("");
//   const [error, setError] = useState("");

//   const defaultClassNames = getDefaultClassNames();

//   const updateNote = async () => {
//     const noteId = storyInfo._id;
//     try {
//       let imageUrl = storyInfo.imageUrl || "";

//       if (noteImg && typeof noteImg === "object") {
//         const formData = new FormData();
//         formData.append("image", noteImg);
//         const response = await axiosInstance.post("/upload-img", formData);
//         imageUrl = response.data?.imageUrl || imageUrl;
//       }

//       const updateData = {
//         title,
//         story,
//         visitedLocation,
//         imageUrl,
//         visitedDate: visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
//       };

//       const response = await axiosInstance.put(`/edit-story/${noteId}`, updateData);

//       if (response.data?.story) {
//         toast.success("Note updated successfully");
//         getAllNotes();
//         onClose();
//       }
//     } catch (error) {
//       setError(error.response?.data?.message || "An unexpected error occurred");
//     }
//   };

//   const addNewNote = async () => {
//     try {
//       const formData = new FormData();

//       formData.append("title", title);
//       formData.append("story", story);
//       formData.append("visitedDate", visitedDate ? moment(visitedDate).valueOf() : moment().valueOf());
//       formData.append("visitedLocation", JSON.stringify(visitedLocation));
//       formData.append("sharedWithEmail", sharedWithEmail.trim());

//       if (noteImg && typeof noteImg === "object") {
//         formData.append("image", noteImg);
//       }

//       const response = await axiosInstance.post("/add-note", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (response.data?.story) {
//         toast.success("Note added successfully");
//         getAllNotes();
//         onClose();
//       }
//     } catch (error) {
//       setError(error.response?.data?.message || "An unexpected error occurred");
//     }
//   };

//   const handleAddOrUpdateClick = () => {
//     if (!title) return setError("Please enter the title");
//     if (!story) return setError("Please write something about your day");

//     setError("");
//     type === "edit" ? updateNote() : addNewNote();
//   };

//   const handleDeleteNoteImg = async () => {
//     if (!storyInfo.imageUrl) return;

//     try {
//       await axiosInstance.delete("/delete-image", {
//         params: { imageUrl: storyInfo.imageUrl },
//       });

//       const noteId = storyInfo._id;
//       await axiosInstance.put(`/edit-story/${noteId}`, {
//         title,
//         story,
//         visitedLocation,
//         visitedDate: moment().valueOf(),
//         imageUrl: "",
//       });

//       setNoteImg(null);
//     } catch (err) {
//       console.log("Error deleting image");
//     }
//   };

//   return (
//     <div className='relative w-full max-w-3xl mx-auto p-4'>
//       {/* Top Heading */}
//       <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4'>
//         <div>
//           <h5 className='text-xl font-semibold text-slate-700'>
//             {type === "add" ? "Add Note" : "Update Story"}
//           </h5>
//         </div>
//         <div className='flex flex-wrap items-center gap-2'>
//           {type === 'add' ? (
//             <button className='flex items-center gap-1 text-xs font-medium bg-pink-50 text-pink-400 border border-pink-100 hover:bg-pink-400 hover:text-white rounded px-3 py-[3px]' onClick={handleAddOrUpdateClick}>
//               <MdAdd className="text-lg" /> ADD STORY
//             </button>
//           ) : (
//             <>
//               <button className='flex items-center gap-1 text-xs font-medium bg-pink-50 text-pink-400 border border-pink-100 hover:bg-pink-400 hover:text-white rounded px-3 py-[3px]' onClick={handleAddOrUpdateClick}>
//                 <MdUpdate className='text-lg' /> UPDATE NOTE
//               </button>
//               <button className='flex items-center gap-1 text-xs font-medium bg-rose-50 text-rose-500 border border-rose-100 hover:bg-rose-500 hover:text-white rounded px-3 py-[3px]' onClick={onClose}>
//                 <MdDeleteOutline className='text-lg' /> DELETE
//               </button>
//             </>
//           )}
//           <button onClick={onClose}>
//             <MdClose className='text-xl text-slate-400' />
//           </button>
//         </div>
//       </div>

     
//       {error && (
//         <p className='text-red-500 text-xs pt-2 text-right'>{error}</p>
//       )}

     
//       <div className='flex-1 flex flex-col gap-4 pt-5'>
//        <div>
//           <label className='text-xs text-slate-400'>TITLE</label>
//           <input
//             type="text"
//             className='text-xl sm:text-2xl text-slate-950 outline-none w-full'
//             placeholder='Describe today in one sentence..'
//             value={title}
//             onChange={({ target }) => setTitle(target.value)}
//           />
//         </div>

       
//         <div className='w-full'>
//           <DateSelector date={visitedDate} setDate={setVisitedDate} />
//         </div>

     
//         <ImageSelector image={noteImg} setImage={setNoteImg} handleDeleteImg={handleDeleteNoteImg} />

     
//         <div>
//           <label className='text-pink-900 input-label'>What made today special or different? Drop your thoughts or moments here 💭📖.</label>
//           <textarea
//             className='text-sm sm:text-base text-slate-950 outline-none bg-pink-50 p-3 rounded w-full'
//             placeholder='.....'
//             rows={8}
//             value={story}
//             onChange={({ target }) => setStory(target.value)}
//           />
//         </div>

      
//         <div className='text-pink-950'>
//           <label className='input-label'>VISITED LOCATION</label>
//           <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
//         </div>

//         <div className='text-pink-950'>
//           <label className='input-label'>SHARE WITH (EMAIL)</label>
//           <input
//             type="email"
//             className='text-sm text-slate-950 outline-none bg-pink-50 p-3 rounded w-full'
//             placeholder='Enter email to share this note'
//             value={sharedWithEmail}
//             onChange={({ target }) => setSharedWithEmail(target.value)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddEditNote;



// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import {
//   MdClose,
//   MdDeleteOutline,
//   MdUpdate,
//   MdAdd,
// } from "react-icons/md";
// import {
//   Heart,
//   Sparkles,
//   MapPin,
//   CalendarDays,
//   BookHeart,
//   Mail,
// } from "lucide-react";
// import DateSelector from "../../Components/input/DateSelector";
// import ImageSelector from "../../Components/input/ImageSelector";
// import TagInput from "../../Components/input/TagInput";
// import axiosInstance from "../../utils/axiosinstance";
// import moment from "moment";

// const AddEditNote = ({
//   storyInfo,
//   type,
//   onClose,
//   getAllNotes,
// }) => {
//   const [visitedDate, setVisitedDate] = useState(
//     storyInfo?.visitedDate || null
//   );
//   const [title, setTitle] = useState(storyInfo?.title || "");
//   const [noteImg, setNoteImg] = useState(storyInfo?.imageUrl || null);
//   const [story, setStory] = useState(storyInfo?.story || "");
//   const [visitedLocation, setVisitedLocation] = useState(
//     storyInfo?.visitedLocation || []
//   );
//   const [sharedWithEmail, setSharedWithEmail] = useState("");
//   const [error, setError] = useState("");

//   const updateNote = async () => {
//     const noteId = storyInfo._id;

//     try {
//       let imageUrl = storyInfo.imageUrl || "";

//       if (noteImg && typeof noteImg === "object") {
//         const formData = new FormData();
//         formData.append("image", noteImg);

//         const response = await axiosInstance.post("/upload-img", formData);
//         imageUrl = response.data?.imageUrl || imageUrl;
//       }

//       const updateData = {
//         title,
//         story,
//         visitedLocation,
//         imageUrl,
//         visitedDate: visitedDate
//           ? moment(visitedDate).valueOf()
//           : moment().valueOf(),
//       };

//       const response = await axiosInstance.put(
//         `/edit-story/${noteId}`,
//         updateData
//       );

//       if (response.data?.story) {
//         toast.success("Note updated successfully");
//         getAllNotes();
//         onClose();
//       }
//     } catch (error) {
//       setError(
//         error.response?.data?.message || "An unexpected error occurred"
//       );
//     }
//   };

//   const addNewNote = async () => {
//     try {
//       const formData = new FormData();

//       formData.append("title", title);
//       formData.append("story", story);
//       formData.append(
//         "visitedDate",
//         visitedDate ? moment(visitedDate).valueOf() : moment().valueOf()
//       );
//       formData.append("visitedLocation", JSON.stringify(visitedLocation));
//       formData.append("sharedWithEmail", sharedWithEmail.trim());

//       if (noteImg && typeof noteImg === "object") {
//         formData.append("image", noteImg);
//       }

//       const response = await axiosInstance.post("/add-note", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (response.data?.story) {
//         toast.success("Note added successfully");
//         getAllNotes();
//         onClose();
//       }
//     } catch (error) {
//       setError(
//         error.response?.data?.message || "An unexpected error occurred"
//       );
//     }
//   };

//   const handleAddOrUpdateClick = () => {
//     if (!title.trim()) {
//       setError("Please enter the title");
//       return;
//     }

//     if (!story.trim()) {
//       setError("Please write something about your day");
//       return;
//     }

//     setError("");
//     type === "edit" ? updateNote() : addNewNote();
//   };

//   const handleDeleteNoteImg = async () => {
//     if (!storyInfo?.imageUrl) return;

//     try {
//       await axiosInstance.delete("/delete-image", {
//         params: { imageUrl: storyInfo.imageUrl },
//       });

//       const noteId = storyInfo._id;

//       await axiosInstance.put(`/edit-story/${noteId}`, {
//         title,
//         story,
//         visitedLocation,
//         visitedDate: visitedDate
//           ? moment(visitedDate).valueOf()
//           : moment().valueOf(),
//         imageUrl: "",
//       });

//       setNoteImg(null);
//       toast.success("Image removed");
//     } catch (err) {
//       toast.error("Could not delete image");
//     }
//   };

//   const isEditing = type === "edit";

//   return (
//     <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-[2rem] border border-pink-100 bg-gradient-to-br from-white via-pink-50/60 to-purple-50/60 shadow-[0_25px_80px_-25px_rgba(236,72,153,0.22)]">

//       {/* Decorative background */}
//       <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-pink-200/30 blur-3xl" />
//       <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-purple-200/30 blur-3xl" />

//       {/* Header */}
//       <div className="relative border-b border-pink-100/80 bg-white/70 px-5 py-5 backdrop-blur-xl sm:px-8">
//         <div className="flex items-start justify-between gap-4">
//           <div className="flex items-center gap-3">
//             <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 text-white shadow-lg shadow-pink-200/60">
//               {isEditing ? (
//                 <MdUpdate className="text-2xl" />
//               ) : (
//                 <BookHeart className="h-6 w-6" />
//               )}
//             </div>

//             <div>
//               <p className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-pink-400">
//                 <Sparkles className="h-3 w-3" />
//                 Your personal scrapbook
//               </p>

//               <h2 className="text-xl font-bold tracking-tight text-gray-800 sm:text-2xl">
//                 {isEditing ? "Edit your memory" : "Capture a memory"}
//               </h2>

//               <p className="mt-1 text-xs text-gray-400 sm:text-sm">
//                 Every little moment deserves a place.
//               </p>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             aria-label="Close note editor"
//             className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-pink-100 bg-white text-gray-400 transition hover:border-pink-200 hover:bg-pink-50 hover:text-pink-500"
//           >
//             <MdClose className="text-xl" />
//           </button>
//         </div>
//       </div>

//       {/* Form content */}
//       <div className="relative max-h-[75vh] space-y-6 overflow-y-auto p-5 sm:p-8">

//         {/* Error */}
//         {error && (
//           <div
//             role="alert"
//             className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-600"
//           >
//             {error}
//           </div>
//         )}

//         {/* Title */}
//         <section className="space-y-2">
//           <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
//             <Heart className="h-4 w-4 text-pink-400" />
//             Give this memory a title
//           </label>

//           <input
//             type="text"
//             className="w-full rounded-2xl border border-pink-100 bg-white/80 px-4 py-4 text-base font-medium text-gray-800 shadow-sm outline-none transition placeholder:text-gray-300 focus:border-pink-300 focus:ring-4 focus:ring-pink-100/70 sm:text-lg"
//             placeholder="A day worth remembering..."
//             value={title}
//             onChange={({ target }) => {
//               setTitle(target.value);
//               if (error) setError("");
//             }}
//           />
//         </section>

//         {/* Date */}
//         <section className="space-y-2">
//           <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
//             <CalendarDays className="h-4 w-4 text-pink-400" />
//             When did it happen?
//           </label>

//           <div className="rounded-2xl border border-pink-100 bg-white/80 p-3 shadow-sm">
//             <DateSelector
//               date={visitedDate}
//               setDate={setVisitedDate}
//             />
//           </div>
//         </section>

//         {/* Image */}
//         <section className="space-y-2">
//           <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
//             <Sparkles className="h-4 w-4 text-purple-400" />
//             Add a photo
//             <span className="font-normal normal-case tracking-normal text-gray-400">
//               (optional)
//             </span>
//           </label>

//           <div className="rounded-2xl border border-pink-100 bg-white/80 p-3 shadow-sm sm:p-4">
//             <ImageSelector
//               image={noteImg}
//               setImage={setNoteImg}
//               handleDeleteImg={handleDeleteNoteImg}
//             />
//           </div>
//         </section>

//         {/* Story */}
//         <section className="space-y-2">
//           <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
//             <BookHeart className="h-4 w-4 text-pink-400" />
//             Tell your story
//           </label>

//           <textarea
//             className="w-full resize-y rounded-2xl border border-pink-100 bg-white/80 p-4 text-sm leading-7 text-gray-700 shadow-sm outline-none transition placeholder:text-gray-300 focus:border-pink-300 focus:ring-4 focus:ring-pink-100/70 sm:text-base"
//             placeholder="What made today special? Write down the little moments, the laughs, the places, and everything you want to remember..."
//             rows={6}
//             value={story}
//             onChange={({ target }) => {
//               setStory(target.value);
//               if (error) setError("");
//             }}
//           />

//           <p className="text-right text-xs text-gray-400">
//             Your memories, your words 💗
//           </p>
//         </section>

//         {/* Locations */}
//         <section className="space-y-2">
//           <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
//             <MapPin className="h-4 w-4 text-pink-400" />
//             Places you visited
//           </label>

//           <div className="rounded-2xl border border-pink-100 bg-white/80 p-3 shadow-sm sm:p-4">
//             <TagInput
//               tags={visitedLocation}
//               setTags={setVisitedLocation}
//             />
//           </div>
//         </section>

//         {/* Share email - currently passed only when creating a note */}
//         {!isEditing && (
//           <section className="space-y-2">
//             <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
//               <Mail className="h-4 w-4 text-purple-400" />
//               Share this memory
//               <span className="font-normal normal-case tracking-normal text-gray-400">
//                 (optional)
//               </span>
//             </label>

//             <input
//               type="email"
//               className="w-full rounded-2xl border border-pink-100 bg-white/80 px-4 py-3.5 text-sm text-gray-700 shadow-sm outline-none transition placeholder:text-gray-300 focus:border-pink-300 focus:ring-4 focus:ring-pink-100/70"
//               placeholder="Enter their email address"
//               value={sharedWithEmail}
//               onChange={({ target }) => setSharedWithEmail(target.value)}
//             />

//             <p className="text-xs leading-5 text-gray-400">
//               Add an email if your app's sharing feature supports it.
//             </p>
//           </section>
//         )}

//         {/* Actions */}
//         <div className="flex flex-col-reverse gap-3 border-t border-pink-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
//           {isEditing ? (
//             <button
//               type="button"
//               onClick={onClose}
//               className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-500 transition hover:bg-rose-100"
//             >
//               <MdDeleteOutline className="text-lg" />
//               Cancel editing
//             </button>
//           ) : (
//             <p className="flex items-center gap-2 text-xs text-gray-400">
//               <Heart className="h-4 w-4 fill-pink-200 text-pink-300" />
//               A little memory to keep forever
//             </p>
//           )}

//           <button
//             type="button"
//             onClick={handleAddOrUpdateClick}
//             className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200/60 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-pink-200/70 active:translate-y-0"
//           >
//             {isEditing ? (
//               <>
//                 <MdUpdate className="text-lg" />
//                 Save changes
//               </>
//             ) : (
//               <>
//                 <MdAdd className="text-xl" />
//                 Save memory
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddEditNote;



import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  MdClose,
  MdDeleteOutline,
  MdUpdate,
  MdAdd,
} from "react-icons/md";
import {
  Heart,
  Sparkles,
  MapPin,
  CalendarDays,
  BookHeart,
  Mail,
} from "lucide-react";
import DateSelector from "../../Components/input/DateSelector";
import ImageSelector from "../../Components/input/ImageSelector";
import TagInput from "../../Components/input/TagInput";
import axiosInstance from "../../utils/axiosinstance";
import moment from "moment";

const AddEditNote = ({
  storyInfo,
  type,
  onClose,
  getAllNotes,
}) => {
  const [visitedDate, setVisitedDate] = useState(
    storyInfo?.visitedDate || null
  );
  const [title, setTitle] = useState(storyInfo?.title || "");
  const [noteImg, setNoteImg] = useState(storyInfo?.imageUrl || null);
  const [story, setStory] = useState(storyInfo?.story || "");
  const [visitedLocation, setVisitedLocation] = useState(
    storyInfo?.visitedLocation || []
  );
  const [sharedWithEmail, setSharedWithEmail] = useState("");
  const [error, setError] = useState("");

  const updateNote = async () => {
    const noteId = storyInfo._id;

    try {
      let imageUrl = storyInfo.imageUrl || "";

      if (noteImg && typeof noteImg === "object") {
        const formData = new FormData();
        formData.append("image", noteImg);

        const response = await axiosInstance.post("/upload-img", formData);
        imageUrl = response.data?.imageUrl || imageUrl;
      }

      const updateData = {
        title,
        story,
        visitedLocation,
        imageUrl,
        visitedDate: visitedDate
          ? moment(visitedDate).valueOf()
          : moment().valueOf(),
      };

      const response = await axiosInstance.put(
        `/edit-story/${noteId}`,
        updateData
      );

      if (response.data?.story) {
        toast.success("Note updated successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An unexpected error occurred"
      );
    }
  };

  const addNewNote = async () => {
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("story", story);
      formData.append(
        "visitedDate",
        visitedDate ? moment(visitedDate).valueOf() : moment().valueOf()
      );
      formData.append("visitedLocation", JSON.stringify(visitedLocation));
      formData.append("sharedWithEmail", sharedWithEmail.trim());

      if (noteImg && typeof noteImg === "object") {
        formData.append("image", noteImg);
      }

      const response = await axiosInstance.post("/add-note", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data?.story) {
        toast.success("Note added successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An unexpected error occurred"
      );
    }
  };

  const handleAddOrUpdateClick = () => {
    if (!title.trim()) {
      setError("Please enter the title");
      return;
    }

    if (!story.trim()) {
      setError("Please write something about your day");
      return;
    }

    setError("");
    type === "edit" ? updateNote() : addNewNote();
  };

  const handleDeleteNoteImg = async () => {
    if (!storyInfo?.imageUrl) return;

    try {
      await axiosInstance.delete("/delete-image", {
        params: { imageUrl: storyInfo.imageUrl },
      });

      const noteId = storyInfo._id;

      await axiosInstance.put(`/edit-story/${noteId}`, {
        title,
        story,
        visitedLocation,
        visitedDate: visitedDate
          ? moment(visitedDate).valueOf()
          : moment().valueOf(),
        imageUrl: "",
      });

      setNoteImg(null);
      toast.success("Image removed");
    } catch (err) {
      toast.error("Could not delete image");
    }
  };

  const isEditing = type === "edit";

  return (
    <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-[#1b0b2e] via-[#281044] to-[#3a0b35] shadow-[0_25px_90px_-25px_rgba(217,70,239,0.42)]">

      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-pink-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-blue-500/30 blur-3xl" />

      {/* Header */}
      <div className="relative border-b border-white/10 bg-gradient-to-r from-[#200a35] via-[#2b0d43] to-[#3b103d] px-5 py-5 backdrop-blur-xl sm:px-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-orange-400 text-white shadow-lg shadow-fuchsia-500/30">
              {isEditing ? (
                <MdUpdate className="text-2xl" />
              ) : (
                <BookHeart className="h-6 w-6" />
              )}
            </div>

            <div>
              <p className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-fuchsia-300">
                <Sparkles className="h-3 w-3" />
                Your personal scrapbook
              </p>

              <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                {isEditing ? "Edit your memory" : "Capture a memory"}
              </h2>

              <p className="mt-1 text-xs text-white/45 sm:text-sm">
                Every little moment deserves a place.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close note editor"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white text-white/45 transition hover:border-pink-300/60 hover:bg-pink-500/100/15 hover:text-pink-200"
          >
            <MdClose className="text-xl" />
          </button>
        </div>
      </div>

      {/* Form content */}
      <div className="relative max-h-[75vh] space-y-6 overflow-y-auto p-5 text-white sm:p-8">

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="rounded-2xl border border-rose-300/30 bg-rose-500/15 px-4 py-3 text-sm text-rose-100"
          >
            {error}
          </div>
        )}

        {/* Title */}
        <section className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/70">
            <Heart className="h-4 w-4 text-pink-300" />
            Give this memory a title
          </label>

          <input
            type="text"
            className="w-full rounded-2xl border border-white/15 bg-[#12071f]/70 px-4 py-4 text-base font-medium text-white shadow-inner shadow-black/10 outline-none transition placeholder:text-white/35 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-500/20 sm:text-lg"
            placeholder="A day worth remembering..."
            value={title}
            onChange={({ target }) => {
              setTitle(target.value);
              if (error) setError("");
            }}
          />
        </section>

        {/* Date */}
        <section className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/70">
            <CalendarDays className="h-4 w-4 text-pink-300" />
            When did it happen?
          </label>

          <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-3 shadow-sm">
            <DateSelector
              date={visitedDate}
              setDate={setVisitedDate}
            />
          </div>
        </section>

        {/* Image */}
        <section className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/70">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            Add a photo
            <span className="font-normal normal-case tracking-normal text-white/45">
              (optional)
            </span>
          </label>

          <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-3 shadow-sm sm:p-4">
            <ImageSelector
              image={noteImg}
              setImage={setNoteImg}
              handleDeleteImg={handleDeleteNoteImg}
            />
          </div>
        </section>

        {/* Story */}
        <section className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/70">
            <BookHeart className="h-4 w-4 text-pink-300" />
            Tell your story
          </label>

          <textarea
            className="w-full resize-y rounded-2xl border border-white/15 bg-[#12071f]/70 p-4 text-sm leading-7 text-white/90 shadow-inner shadow-black/10 outline-none transition placeholder:text-white/35 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-500/20 sm:text-base"
            placeholder="What made today special? Write down the little moments, the laughs, the places, and everything you want to remember..."
            rows={6}
            value={story}
            onChange={({ target }) => {
              setStory(target.value);
              if (error) setError("");
            }}
          />

          <p className="text-right text-xs text-white/45">
            Your memories, your words 💗
          </p>
        </section>

        {/* Locations */}
        <section className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/70">
            <MapPin className="h-4 w-4 text-pink-300" />
            Places you visited
          </label>

          <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-3 shadow-sm sm:p-4">
            <TagInput
              tags={visitedLocation}
              setTags={setVisitedLocation}
            />
          </div>
        </section>

        {/* Share email - currently passed only when creating a note */}
        {!isEditing && (
          <section className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/70">
              <Mail className="h-4 w-4 text-cyan-300" />
              Share this memory
              <span className="font-normal normal-case tracking-normal text-white/45">
                (optional)
              </span>
            </label>

            <input
              type="email"
              className="w-full rounded-2xl border border-white/15 bg-[#12071f]/70 px-4 py-3.5 text-sm text-white/90 shadow-inner shadow-black/10 outline-none transition placeholder:text-white/35 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-500/20"
              placeholder="Enter their email address"
              value={sharedWithEmail}
              onChange={({ target }) => setSharedWithEmail(target.value)}
            />

            <p className="text-xs leading-5 text-white/45">
              Add an email if your app's sharing feature supports it.
            </p>
          </section>
        )}

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          {isEditing ? (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-100 bg-rose-500/15 px-4 py-3 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/25"
            >
              <MdDeleteOutline className="text-lg" />
              Cancel editing
            </button>
          ) : (
            <p className="flex items-center gap-2 text-xs text-white/45">
              <Heart className="h-4 w-4 fill-pink-200 text-pink-300" />
              A little memory to keep forever
            </p>
          )}

          <button
            type="button"
            onClick={handleAddOrUpdateClick}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-400 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/30 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-pink-500/40 active:translate-y-0"
          >
            {isEditing ? (
              <>
                <MdUpdate className="text-lg" />
                Save changes
              </>
            ) : (
              <>
                <MdAdd className="text-xl" />
                Save memory
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditNote;


