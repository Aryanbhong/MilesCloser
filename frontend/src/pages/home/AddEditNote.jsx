
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { MdClose, MdDeleteOutline, MdUpdate, MdAdd } from 'react-icons/md'
import { getDefaultClassNames } from "react-day-picker"
import DateSelector from "../../Components/input/DateSelector"
import ImageSelector from '../../Components/input/ImageSelector'
import TagInput from '../../Components/input/TagInput'
import axiosInstance from '../../utils/axiosinstance'
import moment from 'moment'

const AddEditNote = ({
  storyInfo,
  type,
  onClose,
  getAllNotes,
}) => {
  const [visitedDate, setVisitedDate] = useState(storyInfo?.visitedDate || null);
  const [title, setTitle] = useState(storyInfo?.title || "");
  const [noteImg, setNoteImg] = useState(storyInfo?.imageUrl || null);
  const [story, setStory] = useState(storyInfo?.story || "");
  const [visitedLocation, setVisitedLocation] = useState(storyInfo?.visitedLocation || []);
  const [sharedWithEmail, setSharedWithEmail] = useState("");
  const [error, setError] = useState("");

  const defaultClassNames = getDefaultClassNames();

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
        visitedDate: visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
      };

      const response = await axiosInstance.put(`/edit-story/${noteId}`, updateData);

      if (response.data?.story) {
        toast.success("Note updated successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      setError(error.response?.data?.message || "An unexpected error occurred");
    }
  };

  const addNewNote = async () => {
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("story", story);
      formData.append("visitedDate", visitedDate ? moment(visitedDate).valueOf() : moment().valueOf());
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
      setError(error.response?.data?.message || "An unexpected error occurred");
    }
  };

  const handleAddOrUpdateClick = () => {
    if (!title) return setError("Please enter the title");
    if (!story) return setError("Please write something about your day");

    setError("");
    type === "edit" ? updateNote() : addNewNote();
  };

  const handleDeleteNoteImg = async () => {
    if (!storyInfo.imageUrl) return;

    try {
      await axiosInstance.delete("/delete-image", {
        params: { imageUrl: storyInfo.imageUrl },
      });

      const noteId = storyInfo._id;
      await axiosInstance.put(`/edit-story/${noteId}`, {
        title,
        story,
        visitedLocation,
        visitedDate: moment().valueOf(),
        imageUrl: "",
      });

      setNoteImg(null);
    } catch (err) {
      console.log("Error deleting image");
    }
  };

  return (
    <div className='relative w-full max-w-3xl mx-auto p-4'>
      {/* Top Heading */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4'>
        <div>
          <h5 className='text-xl font-semibold text-slate-700'>
            {type === "add" ? "Add Note" : "Update Story"}
          </h5>
        </div>
        <div className='flex flex-wrap items-center gap-2'>
          {type === 'add' ? (
            <button className='flex items-center gap-1 text-xs font-medium bg-pink-50 text-pink-400 border border-pink-100 hover:bg-pink-400 hover:text-white rounded px-3 py-[3px]' onClick={handleAddOrUpdateClick}>
              <MdAdd className="text-lg" /> ADD STORY
            </button>
          ) : (
            <>
              <button className='flex items-center gap-1 text-xs font-medium bg-pink-50 text-pink-400 border border-pink-100 hover:bg-pink-400 hover:text-white rounded px-3 py-[3px]' onClick={handleAddOrUpdateClick}>
                <MdUpdate className='text-lg' /> UPDATE NOTE
              </button>
              <button className='flex items-center gap-1 text-xs font-medium bg-rose-50 text-rose-500 border border-rose-100 hover:bg-rose-500 hover:text-white rounded px-3 py-[3px]' onClick={onClose}>
                <MdDeleteOutline className='text-lg' /> DELETE
              </button>
            </>
          )}
          <button onClick={onClose}>
            <MdClose className='text-xl text-slate-400' />
          </button>
        </div>
      </div>

     
      {error && (
        <p className='text-red-500 text-xs pt-2 text-right'>{error}</p>
      )}

     
      <div className='flex-1 flex flex-col gap-4 pt-5'>
       <div>
          <label className='text-xs text-slate-400'>TITLE</label>
          <input
            type="text"
            className='text-xl sm:text-2xl text-slate-950 outline-none w-full'
            placeholder='Describe today in one sentence..'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

       
        <div className='w-full'>
          <DateSelector date={visitedDate} setDate={setVisitedDate} />
        </div>

     
        <ImageSelector image={noteImg} setImage={setNoteImg} handleDeleteImg={handleDeleteNoteImg} />

     
        <div>
          <label className='text-pink-900 input-label'>What made today special or different? Drop your thoughts or moments here 💭📖.</label>
          <textarea
            className='text-sm sm:text-base text-slate-950 outline-none bg-pink-50 p-3 rounded w-full'
            placeholder='.....'
            rows={8}
            value={story}
            onChange={({ target }) => setStory(target.value)}
          />
        </div>

      
        <div className='text-pink-950'>
          <label className='input-label'>VISITED LOCATION</label>
          <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
        </div>

        <div className='text-pink-950'>
          <label className='input-label'>SHARE WITH (EMAIL)</label>
          <input
            type="email"
            className='text-sm text-slate-950 outline-none bg-pink-50 p-3 rounded w-full'
            placeholder='Enter email to share this note'
            value={sharedWithEmail}
            onChange={({ target }) => setSharedWithEmail(target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AddEditNote;

