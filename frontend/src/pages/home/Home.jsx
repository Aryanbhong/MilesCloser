import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosinstance';
import NotesCard from '../../Components/Card/NotesCard';
import AddEditNote from './AddEditNote';
import {MdAdd} from "react-icons/md"
import ViewNote from './ViewNote';
import FilterInfoTitle from '../../Components/Card/FilterInfoTitle';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import EmptyCard from '../../Components/Card/EmptyCard';
import emptyImg from '../../images/emptyImg.jpg'
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import moment from 'moment';
import { getEmptyCardMessage } from '../../utils/helper';

const Home = () => {
  const navigate = useNavigate();
  const defaultClassNames = getDefaultClassNames();

  const [userInfo , setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState('')
  const [dateRange, setDateRange] = useState({from: null, to: null});

  const [openEditModal, setOpenEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [openViewModal , setOpenViewModal] = useState({
    isShown: false,
    data: null,
  });

  const getUserInfo = async () =>{
    try{
      const response = await axiosInstance.get("/get-user");
      if(response.data && response.data.user){
        setUserInfo(response.data.user);
      }
    } catch(error){
      if(error.response.status === 401){
        localStorage.clear();
        navigate("/login");
      }
    }
  }
 
  const getAllNotes = async () =>{
    try{
      const response = await axiosInstance.get("/getall-stories");
      if(response.data && response.data.stories){
        setAllNotes(response.data.stories);
      }
    }catch(error){
      console.log("an unexpected error occured. please try again.");
    }
  }

  const handleDelete= async(data)=>{
    const noteId = data._id;
    try{
      const response= await axiosInstance.delete("/delete-story/" + noteId);
      if(response.data && !response.data.error){
        toast.error("Note Deleted Successfully");
        setOpenViewModal((prevState) => ({...prevState, isShown: false}));
        getAllNotes();
      }
    }catch(error){
      console.log(" error aya delete karte wakt dekho bhai")
    }
  }

  const handleEdit =(data) =>{
    setOpenEditModal({ isShown: true, type: "edit" , data: data});
  }

  const updateIsFavourite= async (data)=>{
    const storyId = data._id;
    try{
      const response = await axiosInstance.put(
        "/update-is-favourite/" + storyId,
        { isFavourite: !data.isFavourite }
      );
      if(response.data && response.data.story){
        toast.success("Story Updated successfully..");
        if(filterType === "search" && searchQuery){
          onSearchNote(searchQuery);
        }else if(filterType === "date"){
          filterNotesByDate(dateRange);
        }else{
          getAllNotes();
        }
      }
    }catch(error){
      console.log("an unexpected error occurred. Please try again");
    }
  }

  const handleViewNote=async (data)=>{
    setOpenViewModal({ isShown: true, data: data});
  }
 
  const onSearchNote= async (query)=>{
    try{
      const response = await axiosInstance.get("/search",{
        params: { query }
      });
      if(response.data && response.data.stories){
        setFilterType("search");
        setAllNotes(response.data.stories);
      }
    }catch(error){
      console.log(" error aayaya haiaa")
    }
  }

  const filterNotesByDate= async(day)=>{
    try{
      const startDate = day.from ? moment(day.from).valueOf(): null;
      const endDate = day.to ? moment(day.to).valueOf() : null;
      if(startDate && endDate){
        const response = await axiosInstance.get("/notes/filter",{
          params:{ startDate , endDate },
        });
        if(response.data && response.data.stories){
          setFilterType("date");
          setAllNotes(response.data.stories)
        }
      }
    }catch(error){
      console.log(" error aa gaya ")
    }
  }

  const handleDayClick=(day)=>{
    setDateRange(day);
    filterNotesByDate(day);
  }

  const handleClearSearch=()=>{
    setFilterType("");
    getAllNotes();
  }

  const resetFilter=()=>{
    setDateRange({from: null, to:null});
    setFilterType("");
    getAllNotes();
  }
   
  useEffect(()=>{
    getUserInfo();
    getAllNotes();
  },[])

  return (
    <div className='main text-gray-800 overflow-x-hidden'>
      <Navbar 
        userInfo={userInfo}
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      <div className='container mx-auto py-10 px-7'>
        <FilterInfoTitle
          filterType={filterType}
          filterDates={dateRange}
          onClear={resetFilter}
        />

        <div className='flex flex-col lg:flex-row gap-7'>
          <div className='flex-1'>
            { allNotes.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {allNotes.map((item) => (
                  <NotesCard
                    key={item._id}
                    imageUrl={item.imageUrl}
                    title={item.title}
                    date={item.visitedDate}
                    story={item.story}
                    visitedLocation={item.visitedLocation}
                    isFavourite={item.isFavourite}
                    onFavouriteClick={()=> updateIsFavourite(item)}
                    onClick={()=> handleViewNote(item)}
                  />
                ))}
              </div>
            ) : (
              <EmptyCard imgSrc={emptyImg} message={getEmptyCardMessage(filterType)} />
            )}
          </div>

          <div className='w-full lg:w-[350px] mt-10 lg:mt-0'>
            <div className='text-black bg-white border border-slate-200 shadow-lg shadow-slate-200/60 rounded-lg'>
              <div className='p-3'>
                <DayPicker
                  mode="range"
                  selected={dateRange}
                  onSelect={handleDayClick}
                  captionLayout="dropdown-buttons"
                  pagedNavigation
                  classNames={{
                    ...defaultClassNames,
                    today: `${defaultClassNames.today} border-pink-500`,
                    selected: `bg-pink-500 border-pink-500 text-white rounded-md`,
                    root: `${defaultClassNames.root} shadow-lg p-5`,
                    chevron: `${defaultClassNames.chevron} fill-pink-500`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={openEditModal.isShown}
        onRequestClose={() => {}}
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)", zIndex: 999 } }}
        appElement={document.getElementById("root")}
        className='w-[90vw] sm:w-[70vw] md:w-[60vw] lg:w-[40vw] h-[85vh] bg-white rounded-lg mx-auto mt-10 p-5 overflow-y-scroll scroll-bar z-50'
      >
        <AddEditNote 
          type={openEditModal.type}
          storyInfo={openEditModal.data}
          onClose={() => setOpenEditModal({ isShown: false, type: "add", data: null })}
          getAllNotes={getAllNotes}
        />
      </Modal>

      <Modal
        isOpen={openViewModal.isShown}
        onRequestClose={() => {}}
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)", zIndex: 999 } }}
        appElement={document.getElementById("root")}
        className='w-[90vw] sm:w-[70vw] md:w-[60vw] lg:w-[40vw] h-[85vh] bg-white rounded-lg mx-auto mt-10 p-5 overflow-y-scroll scroll-bar z-50'
      >
        <ViewNote 
          type={openViewModal.type}
          storyInfo={openViewModal.data}
          onClose={() => setOpenViewModal((prevState) => ({...prevState, isShown: false}))}
          handleEdit={() => {
            setOpenViewModal((prevState) => ({...prevState, isShown: false}));
            handleEdit(openViewModal.data || null);
          }}
          handleDelete={() => handleDelete(openViewModal.data || null)}
        />
      </Modal>

      <button 
        className='fixed w-14 h-14 flex items-center justify-center rounded-full bg-pink-400 hover:bg-pink-500 right-5 bottom-5 shadow-lg z-40'
        onClick={() => setOpenEditModal({ isShown: true, type: "add" , data: null })}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <ToastContainer />
    </div>
  )
}

export default Home;
