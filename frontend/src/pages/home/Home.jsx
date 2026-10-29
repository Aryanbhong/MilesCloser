// // // // // // import React, { useEffect, useState } from 'react'
// // // // // // import Navbar from '../../Components/Navbar'
// // // // // // import { useNavigate } from 'react-router-dom'
// // // // // // import axiosInstance from '../../utils/axiosinstance';
// // // // // // import NotesCard from '../../Components/Card/NotesCard';
// // // // // // import AddEditNote from './AddEditNote';
// // // // // // import {MdAdd} from "react-icons/md"
// // // // // // import ViewNote from './ViewNote';
// // // // // // import FilterInfoTitle from '../../Components/Card/FilterInfoTitle';
// // // // // // import Modal from 'react-modal';
// // // // // // import { ToastContainer, toast } from 'react-toastify';
// // // // // // import "react-toastify/dist/ReactToastify.css";
// // // // // // import EmptyCard from '../../Components/Card/EmptyCard';
// // // // // // import emptyImg from '../../images/emptyImg.jpg'
// // // // // // import { DayPicker, getDefaultClassNames } from "react-day-picker";
// // // // // // import moment from 'moment';
// // // // // // import { getEmptyCardMessage } from '../../utils/helper';

// // // // // // const Home = () => {
// // // // // //   const navigate = useNavigate();
// // // // // //   const defaultClassNames = getDefaultClassNames();

// // // // // //   const [userInfo , setUserInfo] = useState(null);
// // // // // //   const [allNotes, setAllNotes] = useState([]);
// // // // // //   const [searchQuery, setSearchQuery] = useState("");
// // // // // //   const [filterType, setFilterType] = useState('')
// // // // // //   const [dateRange, setDateRange] = useState({from: null, to: null});

// // // // // //   const [openEditModal, setOpenEditModal] = useState({
// // // // // //     isShown: false,
// // // // // //     type: "add",
// // // // // //     data: null,
// // // // // //   });

// // // // // //   const [openViewModal , setOpenViewModal] = useState({
// // // // // //     isShown: false,
// // // // // //     data: null,
// // // // // //   });

// // // // // //   const getUserInfo = async () =>{
// // // // // //     try{
// // // // // //       const response = await axiosInstance.get("/get-user");
// // // // // //       if(response.data && response.data.user){
// // // // // //         setUserInfo(response.data.user);
// // // // // //       }
// // // // // //     } catch(error){
// // // // // //       if(error.response.status === 401){
// // // // // //         localStorage.clear();
// // // // // //         navigate("/login");
// // // // // //       }
// // // // // //     }
// // // // // //   }
 
// // // // // //   const getAllNotes = async () =>{
// // // // // //     try{
// // // // // //       const response = await axiosInstance.get("/getall-stories");
// // // // // //       if(response.data && response.data.stories){
// // // // // //         setAllNotes(response.data.stories);
// // // // // //       }
// // // // // //     }catch(error){
// // // // // //       console.log("an unexpected error occured. please try again.");
// // // // // //     }
// // // // // //   }

// // // // // //   const handleDelete= async(data)=>{
// // // // // //     const noteId = data._id;
// // // // // //     try{
// // // // // //       const response= await axiosInstance.delete("/delete-story/" + noteId);
// // // // // //       if(response.data && !response.data.error){
// // // // // //         toast.error("Note Deleted Successfully");
// // // // // //         setOpenViewModal((prevState) => ({...prevState, isShown: false}));
// // // // // //         getAllNotes();
// // // // // //       }
// // // // // //     }catch(error){
// // // // // //       console.log(" error aya delete karte wakt dekho bhai")
// // // // // //     }
// // // // // //   }

// // // // // //   const handleEdit =(data) =>{
// // // // // //     setOpenEditModal({ isShown: true, type: "edit" , data: data});
// // // // // //   }

// // // // // //   const updateIsFavourite= async (data)=>{
// // // // // //     const storyId = data._id;
// // // // // //     try{
// // // // // //       const response = await axiosInstance.put(
// // // // // //         "/update-is-favourite/" + storyId,
// // // // // //         { isFavourite: !data.isFavourite }
// // // // // //       );
// // // // // //       if(response.data && response.data.story){
// // // // // //         toast.success("Story Updated successfully..");
// // // // // //         if(filterType === "search" && searchQuery){
// // // // // //           onSearchNote(searchQuery);
// // // // // //         }else if(filterType === "date"){
// // // // // //           filterNotesByDate(dateRange);
// // // // // //         }else{
// // // // // //           getAllNotes();
// // // // // //         }
// // // // // //       }
// // // // // //     }catch(error){
// // // // // //       console.log("an unexpected error occurred. Please try again");
// // // // // //     }
// // // // // //   }

// // // // // //   const handleViewNote=async (data)=>{
// // // // // //     setOpenViewModal({ isShown: true, data: data});
// // // // // //   }
 
// // // // // //   const onSearchNote= async (query)=>{
// // // // // //     try{
// // // // // //       const response = await axiosInstance.get("/search",{
// // // // // //         params: { query }
// // // // // //       });
// // // // // //       if(response.data && response.data.stories){
// // // // // //         setFilterType("search");
// // // // // //         setAllNotes(response.data.stories);
// // // // // //       }
// // // // // //     }catch(error){
// // // // // //       console.log(" error aayaya haiaa")
// // // // // //     }
// // // // // //   }

// // // // // //   const filterNotesByDate= async(day)=>{
// // // // // //     try{
// // // // // //       const startDate = day.from ? moment(day.from).valueOf(): null;
// // // // // //       const endDate = day.to ? moment(day.to).valueOf() : null;
// // // // // //       if(startDate && endDate){
// // // // // //         const response = await axiosInstance.get("/notes/filter",{
// // // // // //           params:{ startDate , endDate },
// // // // // //         });
// // // // // //         if(response.data && response.data.stories){
// // // // // //           setFilterType("date");
// // // // // //           setAllNotes(response.data.stories)
// // // // // //         }
// // // // // //       }
// // // // // //     }catch(error){
// // // // // //       console.log(" error aa gaya ")
// // // // // //     }
// // // // // //   }

// // // // // //   const handleDayClick=(day)=>{
// // // // // //     setDateRange(day);
// // // // // //     filterNotesByDate(day);
// // // // // //   }

// // // // // //   const handleClearSearch=()=>{
// // // // // //     setFilterType("");
// // // // // //     getAllNotes();
// // // // // //   }

// // // // // //   const resetFilter=()=>{
// // // // // //     setDateRange({from: null, to:null});
// // // // // //     setFilterType("");
// // // // // //     getAllNotes();
// // // // // //   }
   
// // // // // //   useEffect(()=>{
// // // // // //     getUserInfo();
// // // // // //     getAllNotes();
// // // // // //   },[])

// // // // // //   return (
// // // // // //     <div className='main text-gray-800 overflow-x-hidden'>
// // // // // //       <Navbar 
// // // // // //         userInfo={userInfo}
// // // // // //         searchQuery={searchQuery} 
// // // // // //         setSearchQuery={setSearchQuery}
// // // // // //         onSearchNote={onSearchNote}
// // // // // //         handleClearSearch={handleClearSearch}
// // // // // //       />

// // // // // //       <div className='container mx-auto py-10 px-7'>
// // // // // //         <FilterInfoTitle
// // // // // //           filterType={filterType}
// // // // // //           filterDates={dateRange}
// // // // // //           onClear={resetFilter}
// // // // // //         />

// // // // // //         <div className='flex flex-col lg:flex-row gap-7'>
// // // // // //           <div className='flex-1'>
// // // // // //             { allNotes.length > 0 ? (
// // // // // //               <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
// // // // // //                 {allNotes.map((item) => (
// // // // // //                   <NotesCard
// // // // // //                     key={item._id}
// // // // // //                     imageUrl={item.imageUrl}
// // // // // //                     title={item.title}
// // // // // //                     date={item.visitedDate}
// // // // // //                     story={item.story}
// // // // // //                     visitedLocation={item.visitedLocation}
// // // // // //                     isFavourite={item.isFavourite}
// // // // // //                     onFavouriteClick={()=> updateIsFavourite(item)}
// // // // // //                     onClick={()=> handleViewNote(item)}
// // // // // //                   />
// // // // // //                 ))}
// // // // // //               </div>
// // // // // //             ) : (
// // // // // //               <EmptyCard imgSrc={emptyImg} message={getEmptyCardMessage(filterType)} />
// // // // // //             )}
// // // // // //           </div>

// // // // // //           <div className='w-full lg:w-[350px] mt-10 lg:mt-0'>
// // // // // //             <div className='text-black bg-white border border-slate-200 shadow-lg shadow-slate-200/60 rounded-lg'>
// // // // // //               <div className='p-3'>
// // // // // //                 <DayPicker
// // // // // //                   mode="range"
// // // // // //                   selected={dateRange}
// // // // // //                   onSelect={handleDayClick}
// // // // // //                   captionLayout="dropdown-buttons"
// // // // // //                   pagedNavigation
// // // // // //                   classNames={{
// // // // // //                     ...defaultClassNames,
// // // // // //                     today: `${defaultClassNames.today} border-pink-500`,
// // // // // //                     selected: `bg-pink-500 border-pink-500 text-white rounded-md`,
// // // // // //                     root: `${defaultClassNames.root} shadow-lg p-5`,
// // // // // //                     chevron: `${defaultClassNames.chevron} fill-pink-500`,
// // // // // //                   }}
// // // // // //                 />
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       <Modal
// // // // // //         isOpen={openEditModal.isShown}
// // // // // //         onRequestClose={() => {}}
// // // // // //         style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)", zIndex: 999 } }}
// // // // // //         appElement={document.getElementById("root")}
// // // // // //         className='w-[90vw] sm:w-[70vw] md:w-[60vw] lg:w-[40vw] h-[85vh] bg-white rounded-lg mx-auto mt-10 p-5 overflow-y-scroll scroll-bar z-50'
// // // // // //       >
// // // // // //         <AddEditNote 
// // // // // //           type={openEditModal.type}
// // // // // //           storyInfo={openEditModal.data}
// // // // // //           onClose={() => setOpenEditModal({ isShown: false, type: "add", data: null })}
// // // // // //           getAllNotes={getAllNotes}
// // // // // //         />
// // // // // //       </Modal>

// // // // // //       <Modal
// // // // // //         isOpen={openViewModal.isShown}
// // // // // //         onRequestClose={() => {}}
// // // // // //         style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)", zIndex: 999 } }}
// // // // // //         appElement={document.getElementById("root")}
// // // // // //         className='w-[90vw] sm:w-[70vw] md:w-[60vw] lg:w-[40vw] h-[85vh] bg-white rounded-lg mx-auto mt-10 p-5 overflow-y-scroll scroll-bar z-50'
// // // // // //       >
// // // // // //         <ViewNote 
// // // // // //           type={openViewModal.type}
// // // // // //           storyInfo={openViewModal.data}
// // // // // //           onClose={() => setOpenViewModal((prevState) => ({...prevState, isShown: false}))}
// // // // // //           handleEdit={() => {
// // // // // //             setOpenViewModal((prevState) => ({...prevState, isShown: false}));
// // // // // //             handleEdit(openViewModal.data || null);
// // // // // //           }}
// // // // // //           handleDelete={() => handleDelete(openViewModal.data || null)}
// // // // // //         />
// // // // // //       </Modal>

// // // // // //       <button 
// // // // // //         className='fixed w-14 h-14 flex items-center justify-center rounded-full bg-pink-400 hover:bg-pink-500 right-5 bottom-5 shadow-lg z-40'
// // // // // //         onClick={() => setOpenEditModal({ isShown: true, type: "add" , data: null })}
// // // // // //       >
// // // // // //         <MdAdd className="text-[32px] text-white" />
// // // // // //       </button>

// // // // // //       <ToastContainer />
// // // // // //     </div>
// // // // // //   )
// // // // // // }

// // // // // // export default Home;



// // // // // // import React, { useEffect, useState } from "react";
// // // // // // import { useNavigate } from "react-router-dom";
// // // // // // import {
// // // // // //   Heart,
// // // // // //   Sparkles,
// // // // // //   BookHeart,
// // // // // //   CalendarDays,
// // // // // //   Plus,
// // // // // //   PenLine,
// // // // // //   ArrowDownWideNarrow,
// // // // // //   Images,
// // // // // // } from "lucide-react";
// // // // // // import Navbar from "../../Components/Navbar";
// // // // // // import axiosInstance from "../../utils/axiosinstance";
// // // // // // import NotesCard from "../../Components/Card/NotesCard";
// // // // // // import AddEditNote from "./AddEditNote";
// // // // // // import ViewNote from "./ViewNote";
// // // // // // import FilterInfoTitle from "../../Components/Card/FilterInfoTitle";
// // // // // // import Modal from "react-modal";
// // // // // // import { ToastContainer, toast } from "react-toastify";
// // // // // // import "react-toastify/dist/ReactToastify.css";
// // // // // // import EmptyCard from "../../Components/Card/EmptyCard";
// // // // // // import emptyImg from "../../images/emptyImg.jpg";
// // // // // // import { DayPicker, getDefaultClassNames } from "react-day-picker";
// // // // // // import moment from "moment";
// // // // // // import { getEmptyCardMessage } from "../../utils/helper";

// // // // // // const Home = () => {
// // // // // //   const navigate = useNavigate();
// // // // // //   const defaultClassNames = getDefaultClassNames();

// // // // // //   const [userInfo, setUserInfo] = useState(null);
// // // // // //   const [allNotes, setAllNotes] = useState([]);
// // // // // //   const [searchQuery, setSearchQuery] = useState("");
// // // // // //   const [filterType, setFilterType] = useState("");
// // // // // //   const [dateRange, setDateRange] = useState({
// // // // // //     from: null,
// // // // // //     to: null,
// // // // // //   });

// // // // // //   const [openEditModal, setOpenEditModal] = useState({
// // // // // //     isShown: false,
// // // // // //     type: "add",
// // // // // //     data: null,
// // // // // //   });

// // // // // //   const [openViewModal, setOpenViewModal] = useState({
// // // // // //     isShown: false,
// // // // // //     data: null,
// // // // // //   });

// // // // // //   const getUserInfo = async () => {
// // // // // //     try {
// // // // // //       const response = await axiosInstance.get("/get-user");

// // // // // //       if (response.data?.user) {
// // // // // //         setUserInfo(response.data.user);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       if (error.response?.status === 401) {
// // // // // //         localStorage.clear();
// // // // // //         navigate("/login");
// // // // // //       } else {
// // // // // //         console.error("Unable to fetch user information.");
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   const getAllNotes = async () => {
// // // // // //     try {
// // // // // //       const response = await axiosInstance.get("/getall-stories");

// // // // // //       if (response.data?.stories) {
// // // // // //         setAllNotes(response.data.stories);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error("Unable to fetch notes.");
// // // // // //     }
// // // // // //   };

// // // // // //   const handleDelete = async (data) => {
// // // // // //     if (!data?._id) return;

// // // // // //     try {
// // // // // //       const response = await axiosInstance.delete(
// // // // // //         `/delete-story/${data._id}`
// // // // // //       );

// // // // // //       if (response.data && !response.data.error) {
// // // // // //         toast.success("Memory deleted successfully 💗");
// // // // // //         setOpenViewModal({ isShown: false, data: null });
// // // // // //         getAllNotes();
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       toast.error(
// // // // // //         error.response?.data?.message || "Unable to delete this memory."
// // // // // //       );
// // // // // //     }
// // // // // //   };

// // // // // //   const handleEdit = (data) => {
// // // // // //     setOpenEditModal({
// // // // // //       isShown: true,
// // // // // //       type: "edit",
// // // // // //       data,
// // // // // //     });
// // // // // //   };

// // // // // //   const updateIsFavourite = async (data) => {
// // // // // //     const storyId = data._id;

// // // // // //     try {
// // // // // //       const response = await axiosInstance.put(
// // // // // //         `/update-is-favourite/${storyId}`,
// // // // // //         { isFavourite: !data.isFavourite }
// // // // // //       );

// // // // // //       if (response.data?.story) {
// // // // // //         toast.success(
// // // // // //           data.isFavourite
// // // // // //             ? "Removed from favourites"
// // // // // //             : "Added to favourites 💗"
// // // // // //         );

// // // // // //         if (filterType === "search" && searchQuery) {
// // // // // //           onSearchNote(searchQuery);
// // // // // //         } else if (filterType === "date") {
// // // // // //           filterNotesByDate(dateRange);
// // // // // //         } else {
// // // // // //           getAllNotes();
// // // // // //         }
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       toast.error("Unable to update your favourites.");
// // // // // //     }
// // // // // //   };

// // // // // //   const handleViewNote = (data) => {
// // // // // //     setOpenViewModal({
// // // // // //       isShown: true,
// // // // // //       data,
// // // // // //     });
// // // // // //   };

// // // // // //   const onSearchNote = async (query) => {
// // // // // //     try {
// // // // // //       const response = await axiosInstance.get("/search", {
// // // // // //         params: { query },
// // // // // //       });

// // // // // //       if (response.data?.stories) {
// // // // // //         setFilterType("search");
// // // // // //         setAllNotes(response.data.stories);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       toast.error("Unable to search memories.");
// // // // // //     }
// // // // // //   };

// // // // // //   const filterNotesByDate = async (day) => {
// // // // // //     try {
// // // // // //       if (!day?.from || !day?.to) return;

// // // // // //       const startDate = moment(day.from).startOf("day").valueOf();
// // // // // //       const endDate = moment(day.to).endOf("day").valueOf();

// // // // // //       const response = await axiosInstance.get("/notes/filter", {
// // // // // //         params: { startDate, endDate },
// // // // // //       });

// // // // // //       if (response.data?.stories) {
// // // // // //         setFilterType("date");
// // // // // //         setAllNotes(response.data.stories);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       toast.error("Unable to filter memories by date.");
// // // // // //     }
// // // // // //   };

// // // // // //   const handleDayClick = (day) => {
// // // // // //     if (!day) return;

// // // // // //     setDateRange(day);

// // // // // //     if (day.from && day.to) {
// // // // // //       filterNotesByDate(day);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleClearSearch = () => {
// // // // // //     setSearchQuery("");
// // // // // //     setDateRange({ from: null, to: null });
// // // // // //     setFilterType("");
// // // // // //     getAllNotes();
// // // // // //   };

// // // // // //   const resetFilter = () => {
// // // // // //     setDateRange({ from: null, to: null });
// // // // // //     setFilterType("");
// // // // // //     setSearchQuery("");
// // // // // //     getAllNotes();
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     getUserInfo();
// // // // // //     getAllNotes();
// // // // // //   }, []);

// // // // // //   const favouriteCount = allNotes.filter(
// // // // // //     (note) => note.isFavourite
// // // // // //   ).length;

// // // // // //   const firstName =
// // // // // //     userInfo?.fullName?.trim().split(/\s+/)[0] || "there";

// // // // // //   return (
// // // // // //     <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-[#fff7fb] via-white to-[#f7f2ff] text-gray-800">

// // // // // //       {/* Background decoration */}
// // // // // //       <div className="pointer-events-none fixed -left-32 top-32 h-80 w-80 rounded-full bg-pink-200/25 blur-[100px]" />
// // // // // //       <div className="pointer-events-none fixed -right-32 top-64 h-96 w-96 rounded-full bg-purple-200/25 blur-[110px]" />
// // // // // //       <div className="pointer-events-none fixed bottom-0 left-1/3 h-64 w-64 rounded-full bg-rose-100/30 blur-[100px]" />

// // // // // //       {/* Navigation */}
// // // // // //       <div className="relative z-30">
// // // // // //         <Navbar
// // // // // //           userInfo={userInfo}
// // // // // //           searchQuery={searchQuery}
// // // // // //           setSearchQuery={setSearchQuery}
// // // // // //           onSearchNote={onSearchNote}
// // // // // //           handleClearSearch={handleClearSearch}
// // // // // //         />
// // // // // //       </div>

// // // // // //       <main className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pb-28 pt-7 sm:px-6 sm:pt-10 lg:px-10">

// // // // // //         {/* Welcome hero */}
// // // // // //         <section className="relative mb-8 overflow-hidden rounded-[2rem] border border-white/80 bg-gradient-to-r from-pink-100/90 via-rose-50 to-purple-100/90 p-6 shadow-[0_20px_60px_-30px_rgba(219,39,119,0.3)] sm:p-9 lg:p-11">

// // // // // //           <div className="pointer-events-none absolute -right-8 -top-16 h-56 w-56 rounded-full border-[35px] border-white/30" />
// // // // // //           <div className="pointer-events-none absolute -bottom-20 right-36 h-48 w-48 rounded-full bg-white/30 blur-2xl" />

// // // // // //           <Heart className="absolute right-[18%] top-8 hidden h-6 w-6 animate-pulse fill-pink-300/70 text-pink-300/70 sm:block" />
// // // // // //           <Sparkles className="absolute bottom-9 right-12 hidden h-7 w-7 text-purple-300 sm:block" />

// // // // // //           <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-center">
// // // // // //             <div className="max-w-2xl">
// // // // // //               <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/60 px-3.5 py-2 text-xs font-semibold tracking-wide text-pink-500 shadow-sm backdrop-blur-md">
// // // // // //                 <Sparkles className="h-4 w-4" />
// // // // // //                 YOUR PERSONAL MEMORY JOURNAL
// // // // // //               </div>

// // // // // //               <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-800 sm:text-4xl lg:text-5xl">
// // // // // //                 Every moment has
// // // // // //                 <span className="block bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text pb-1 text-transparent">
// // // // // //                   a story to tell.
// // // // // //                 </span>
// // // // // //               </h1>

// // // // // //               <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
// // // // // //                 Welcome back, {firstName}! Keep your favourite memories,
// // // // // //                 revisit special places, and hold on to the little things
// // // // // //                 that make life beautiful.
// // // // // //               </p>

// // // // // //               <button
// // // // // //                 type="button"
// // // // // //                 onClick={() =>
// // // // // //                   setOpenEditModal({
// // // // // //                     isShown: true,
// // // // // //                     type: "add",
// // // // // //                     data: null,
// // // // // //                   })
// // // // // //                 }
// // // // // //                 className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-300/40 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-pink-300/50 active:translate-y-0"
// // // // // //               >
// // // // // //                 <Plus className="h-5 w-5" />
// // // // // //                 Create a memory
// // // // // //               </button>
// // // // // //             </div>

// // // // // //             {/* Hero illustration */}
// // // // // //             <div className="hidden shrink-0 items-center justify-center md:flex">
// // // // // //               <div className="relative flex h-40 w-40 items-center justify-center rounded-[2.5rem] border border-white/80 bg-white/50 shadow-xl shadow-pink-200/30 backdrop-blur-lg lg:h-48 lg:w-48">
// // // // // //                 <div className="absolute inset-3 rounded-[2rem] border border-pink-100/80" />

// // // // // //                 <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-pink-400 via-rose-400 to-purple-400 shadow-xl shadow-pink-300/40 lg:h-28 lg:w-28">
// // // // // //                   <BookHeart className="h-12 w-12 text-white lg:h-14 lg:w-14" />
// // // // // //                 </div>

// // // // // //                 <div className="absolute -right-3 top-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white bg-white shadow-lg">
// // // // // //                   <Heart className="h-5 w-5 fill-pink-400 text-pink-400" />
// // // // // //                 </div>

// // // // // //                 <div className="absolute -bottom-3 -left-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-white bg-white shadow-lg">
// // // // // //                   <Sparkles className="h-5 w-5 text-purple-400" />
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </section>

// // // // // //         {/* Stats */}
// // // // // //         <section className="mb-8 grid grid-cols-2 gap-3 sm:gap-5">
// // // // // //           <div className="group flex items-center gap-3 rounded-2xl border border-pink-100/80 bg-white/75 p-4 shadow-sm shadow-pink-100/50 backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-md sm:gap-4 sm:p-5">
// // // // // //             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-pink-500 sm:h-12 sm:w-12">
// // // // // //               <BookHeart className="h-5 w-5 sm:h-6 sm:w-6" />
// // // // // //             </div>
// // // // // //             <div className="min-w-0">
// // // // // //               <p className="text-2xl font-bold text-gray-800 sm:text-3xl">
// // // // // //                 {allNotes.length}
// // // // // //               </p>
// // // // // //               <p className="truncate text-xs text-gray-500 sm:text-sm">
// // // // // //                 Memories shown
// // // // // //               </p>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           <div className="group flex items-center gap-3 rounded-2xl border border-purple-100/80 bg-white/75 p-4 shadow-sm shadow-purple-100/50 backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-md sm:gap-4 sm:p-5">
// // // // // //             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-500 sm:h-12 sm:w-12">
// // // // // //               <Heart className="h-5 w-5 fill-purple-300 sm:h-6 sm:w-6" />
// // // // // //             </div>
// // // // // //             <div className="min-w-0">
// // // // // //               <p className="text-2xl font-bold text-gray-800 sm:text-3xl">
// // // // // //                 {favouriteCount}
// // // // // //               </p>
// // // // // //               <p className="truncate text-xs text-gray-500 sm:text-sm">
// // // // // //                 Favourites shown
// // // // // //               </p>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </section>

// // // // // //         {/* Memory collection heading */}
// // // // // //         <section className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
// // // // // //           <div>
// // // // // //             <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-pink-400">
// // // // // //               <Images className="h-4 w-4" />
// // // // // //               YOUR COLLECTION
// // // // // //             </div>

// // // // // //             <h2 className="text-2xl font-bold tracking-tight text-gray-800 sm:text-3xl">
// // // // // //               Your memories
// // // // // //               <span className="ml-2 text-pink-400">♡</span>
// // // // // //             </h2>

// // // // // //             <p className="mt-2 text-sm text-gray-500">
// // // // // //               Little moments, beautifully remembered.
// // // // // //             </p>
// // // // // //           </div>

// // // // // //           <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-pink-100 bg-white/80 px-3.5 py-2.5 text-xs font-medium text-gray-500 shadow-sm">
// // // // // //             <ArrowDownWideNarrow className="h-4 w-4 text-pink-400" />
// // // // // //             Your story collection
// // // // // //           </div>
// // // // // //         </section>

// // // // // //         {/* Main content and date picker */}
// // // // // //         <div className="flex flex-col gap-7 xl:flex-row xl:items-start">

// // // // // //           {/* Notes grid */}
// // // // // //           <section className="min-w-0 flex-1">
// // // // // //             <FilterInfoTitle
// // // // // //               filterType={filterType}
// // // // // //               filterDates={dateRange}
// // // // // //               onClear={resetFilter}
// // // // // //             />

// // // // // //             {allNotes.length > 0 ? (
// // // // // //               <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-3">
// // // // // //                 {allNotes.map((item) => (
// // // // // //                   <NotesCard
// // // // // //                     key={item._id}
// // // // // //                     imageUrl={item.imageUrl}
// // // // // //                     title={item.title}
// // // // // //                     date={item.visitedDate}
// // // // // //                     story={item.story}
// // // // // //                     visitedLocation={item.visitedLocation}
// // // // // //                     isFavourite={item.isFavourite}
// // // // // //                     onFavouriteClick={() => updateIsFavourite(item)}
// // // // // //                     onClick={() => handleViewNote(item)}
// // // // // //                   />
// // // // // //                 ))}
// // // // // //               </div>
// // // // // //             ) : (
// // // // // //               <div className="mt-5 rounded-[2rem] border border-pink-100/80 bg-white/60 p-4 shadow-sm backdrop-blur-lg sm:p-6">
// // // // // //                 <EmptyCard
// // // // // //                   imgSrc={emptyImg}
// // // // // //                   message={getEmptyCardMessage(filterType)}
// // // // // //                 />
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </section>

// // // // // //           {/* Date picker panel */}
// // // // // //           <aside className="w-full shrink-0 xl:sticky xl:top-24 xl:w-[330px] 2xl:w-[350px]">
// // // // // //             <div className="overflow-hidden rounded-[2rem] border border-pink-100/80 bg-white/80 shadow-[0_16px_50px_-28px_rgba(219,39,119,0.3)] backdrop-blur-xl">

// // // // // //               <div className="border-b border-pink-100/80 bg-gradient-to-r from-pink-50 to-purple-50/80 p-5">
// // // // // //                 <div className="flex items-center gap-3">
// // // // // //                   <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-pink-500 shadow-sm">
// // // // // //                     <CalendarDays className="h-5 w-5" />
// // // // // //                   </div>

// // // // // //                   <div>
// // // // // //                     <h3 className="font-bold text-gray-800">
// // // // // //                       Memory timeline
// // // // // //                     </h3>
// // // // // //                     <p className="mt-0.5 text-xs text-gray-500">
// // // // // //                       Find a special day
// // // // // //                     </p>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               <div className="p-2 sm:p-4">
// // // // // //                 <DayPicker
// // // // // //                   mode="range"
// // // // // //                   selected={dateRange}
// // // // // //                   onSelect={handleDayClick}
// // // // // //                   captionLayout="dropdown-buttons"
// // // // // //                   pagedNavigation
// // // // // //                   classNames={{
// // // // // //                     ...defaultClassNames,
// // // // // //                     root: `${defaultClassNames.root} mx-auto w-full p-2 sm:p-3`,
// // // // // //                     months: `${defaultClassNames.months} w-full`,
// // // // // //                     month: `${defaultClassNames.month} w-full`,
// // // // // //                     month_grid: `${defaultClassNames.month_grid} w-full border-collapse`,
// // // // // //                     weekdays: `${defaultClassNames.weekdays} text-xs font-semibold text-pink-400`,
// // // // // //                     weekday: `${defaultClassNames.weekday} py-2`,
// // // // // //                     day: `${defaultClassNames.day} p-0`,
// // // // // //                     day_button: `${defaultClassNames.day_button} h-9 w-9 rounded-xl text-sm transition hover:bg-pink-50 hover:text-pink-600`,
// // // // // //                     today: `${defaultClassNames.today} font-bold text-pink-600`,
// // // // // //                     selected: `${defaultClassNames.selected} !bg-pink-500 !text-white rounded-xl`,
// // // // // //                     range_start: `${defaultClassNames.range_start} !rounded-l-xl !bg-pink-500 !text-white`,
// // // // // //                     range_end: `${defaultClassNames.range_end} !rounded-r-xl !bg-pink-500 !text-white`,
// // // // // //                     range_middle: `${defaultClassNames.range_middle} !bg-pink-100 !text-pink-700`,
// // // // // //                     nav: `${defaultClassNames.nav} text-pink-500`,
// // // // // //                     button_previous: `${defaultClassNames.button_previous} rounded-xl hover:bg-pink-50`,
// // // // // //                     button_next: `${defaultClassNames.button_next} rounded-xl hover:bg-pink-50`,
// // // // // //                     chevron: `${defaultClassNames.chevron} fill-pink-500`,
// // // // // //                     caption_label: `${defaultClassNames.caption_label} font-bold text-gray-700`,
// // // // // //                     dropdowns: `${defaultClassNames.dropdowns} gap-1`,
// // // // // //                     dropdown: `${defaultClassNames.dropdown} rounded-lg border border-pink-100 bg-white px-1 py-1 text-sm text-gray-700 outline-none focus:border-pink-300`,
// // // // // //                   }}
// // // // // //                 />
// // // // // //               </div>

// // // // // //               <div className="border-t border-pink-100/80 px-5 py-4">
// // // // // //                 <div className="flex items-start gap-2.5">
// // // // // //                   <Heart className="mt-0.5 h-4 w-4 shrink-0 fill-pink-200 text-pink-400" />
// // // // // //                   <p className="text-xs leading-5 text-gray-500">
// // // // // //                     Select a start and end date to discover the memories
// // // // // //                     you made during that time.
// // // // // //                   </p>
// // // // // //                 </div>

// // // // // //                 {dateRange.from && (
// // // // // //                   <div className="mt-3 rounded-xl bg-pink-50/80 px-3 py-2 text-xs font-medium text-pink-600">
// // // // // //                     <span>
// // // // // //                       {moment(dateRange.from).format("MMM D, YYYY")}
// // // // // //                     </span>
// // // // // //                     {dateRange.to && (
// // // // // //                       <>
// // // // // //                         <span className="mx-2 text-pink-300">→</span>
// // // // // //                         <span>
// // // // // //                           {moment(dateRange.to).format("MMM D, YYYY")}
// // // // // //                         </span>
// // // // // //                       </>
// // // // // //                     )}
// // // // // //                   </div>
// // // // // //                 )}

// // // // // //                 {(filterType === "date" || dateRange.from) && (
// // // // // //                   <button
// // // // // //                     type="button"
// // // // // //                     onClick={resetFilter}
// // // // // //                     className="mt-3 w-full rounded-xl border border-pink-100 bg-white px-3 py-2 text-xs font-semibold text-pink-500 transition hover:bg-pink-50"
// // // // // //                   >
// // // // // //                     Clear date filter
// // // // // //                   </button>
// // // // // //                 )}
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </aside>
// // // // // //         </div>
// // // // // //       </main>

// // // // // //       {/* Add/Edit modal */}
// // // // // //       <Modal
// // // // // //         isOpen={openEditModal.isShown}
// // // // // //         onRequestClose={() =>
// // // // // //           setOpenEditModal({
// // // // // //             isShown: false,
// // // // // //             type: "add",
// // // // // //             data: null,
// // // // // //           })
// // // // // //         }
// // // // // //         appElement={document.getElementById("root")}
// // // // // //         overlayClassName="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-gray-900/30 p-3 backdrop-blur-sm sm:p-6"
// // // // // //         className="relative my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/80 bg-white shadow-2xl shadow-pink-200/30 outline-none"
// // // // // //       >
// // // // // //         <AddEditNote
// // // // // //           type={openEditModal.type}
// // // // // //           storyInfo={openEditModal.data}
// // // // // //           onClose={() =>
// // // // // //             setOpenEditModal({
// // // // // //               isShown: false,
// // // // // //               type: "add",
// // // // // //               data: null,
// // // // // //             })
// // // // // //           }
// // // // // //           getAllNotes={getAllNotes}
// // // // // //         />
// // // // // //       </Modal>

// // // // // //       {/* View note modal */}
// // // // // //       <Modal
// // // // // //         isOpen={openViewModal.isShown}
// // // // // //         onRequestClose={() =>
// // // // // //           setOpenViewModal({ isShown: false, data: null })
// // // // // //         }
// // // // // //         appElement={document.getElementById("root")}
// // // // // //         overlayClassName="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-gray-900/30 p-3 backdrop-blur-sm sm:p-6"
// // // // // //         className="relative my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/80 bg-white shadow-2xl shadow-pink-200/30 outline-none"
// // // // // //       >
// // // // // //         <ViewNote
// // // // // //           type={openViewModal.type}
// // // // // //           storyInfo={openViewModal.data}
// // // // // //           onClose={() =>
// // // // // //             setOpenViewModal((prevState) => ({
// // // // // //               ...prevState,
// // // // // //               isShown: false,
// // // // // //             }))
// // // // // //           }
// // // // // //           handleEdit={() => {
// // // // // //             setOpenViewModal((prevState) => ({
// // // // // //               ...prevState,
// // // // // //               isShown: false,
// // // // // //             }));
// // // // // //             handleEdit(openViewModal.data || null);
// // // // // //           }}
// // // // // //           handleDelete={() => handleDelete(openViewModal.data || null)}
// // // // // //         />
// // // // // //       </Modal>

// // // // // //       {/* Floating add button */}
// // // // // //       <button
// // // // // //         type="button"
// // // // // //         aria-label="Create a new memory"
// // // // // //         onClick={() =>
// // // // // //           setOpenEditModal({
// // // // // //             isShown: true,
// // // // // //             type: "add",
// // // // // //             data: null,
// // // // // //           })
// // // // // //         }
// // // // // //         className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-purple-500 text-white shadow-xl shadow-pink-300/50 transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl hover:shadow-pink-300/60 active:scale-95 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
// // // // // //       >
// // // // // //         <Plus className="h-7 w-7 transition-transform duration-300 group-hover:rotate-90 sm:h-8 sm:w-8" />
// // // // // //         <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl border border-pink-100 bg-white px-3 py-2 text-xs font-semibold text-pink-600 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
// // // // // //           Create a memory
// // // // // //         </span>
// // // // // //       </button>

// // // // // //       <ToastContainer
// // // // // //         position="bottom-right"
// // // // // //         autoClose={2500}
// // // // // //         theme="light"
// // // // // //         toastClassName="!rounded-2xl !border !border-pink-100 !shadow-lg"
// // // // // //       />
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default Home;



// // // // // import React, { useEffect, useState } from "react";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import {
// // // // //   Heart,
// // // // //   Sparkles,
// // // // //   BookHeart,
// // // // //   CalendarDays,
// // // // //   Plus,
// // // // //   PenLine,
// // // // //   ArrowDownWideNarrow,
// // // // //   Images,
// // // // // } from "lucide-react";
// // // // // import Navbar from "../../Components/Navbar";
// // // // // import axiosInstance from "../../utils/axiosinstance";
// // // // // import NotesCard from "../../Components/Card/NotesCard";
// // // // // import AddEditNote from "./AddEditNote";
// // // // // import ViewNote from "./ViewNote";
// // // // // import FilterInfoTitle from "../../Components/Card/FilterInfoTitle";
// // // // // import Modal from "react-modal";
// // // // // import { ToastContainer, toast } from "react-toastify";
// // // // // import "react-toastify/dist/ReactToastify.css";
// // // // // import EmptyCard from "../../Components/Card/EmptyCard";
// // // // // import emptyImg from "../../images/emptyImg.jpg";
// // // // // import { DayPicker, getDefaultClassNames } from "react-day-picker";
// // // // // import moment from "moment";
// // // // // import { getEmptyCardMessage } from "../../utils/helper";

// // // // // const Home = () => {
// // // // //   const navigate = useNavigate();
// // // // //   const defaultClassNames = getDefaultClassNames();

// // // // //   const [userInfo, setUserInfo] = useState(null);
// // // // //   const [allNotes, setAllNotes] = useState([]);
// // // // //   const [searchQuery, setSearchQuery] = useState("");
// // // // //   const [filterType, setFilterType] = useState("");
// // // // //   const [dateRange, setDateRange] = useState({
// // // // //     from: null,
// // // // //     to: null,
// // // // //   });

// // // // //   const [openEditModal, setOpenEditModal] = useState({
// // // // //     isShown: false,
// // // // //     type: "add",
// // // // //     data: null,
// // // // //   });

// // // // //   const [openViewModal, setOpenViewModal] = useState({
// // // // //     isShown: false,
// // // // //     data: null,
// // // // //   });

// // // // //   const getUserInfo = async () => {
// // // // //     try {
// // // // //       const response = await axiosInstance.get("/get-user");

// // // // //       if (response.data?.user) {
// // // // //         setUserInfo(response.data.user);
// // // // //       }
// // // // //     } catch (error) {
// // // // //       if (error.response?.status === 401) {
// // // // //         localStorage.clear();
// // // // //         navigate("/login");
// // // // //       } else {
// // // // //         console.error("Unable to fetch user information.");
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   const getAllNotes = async () => {
// // // // //     try {
// // // // //       const response = await axiosInstance.get("/getall-stories");

// // // // //       if (response.data?.stories) {
// // // // //         setAllNotes(response.data.stories);
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error("Unable to fetch notes.");
// // // // //     }
// // // // //   };

// // // // //   const handleDelete = async (data) => {
// // // // //     if (!data?._id) return;

// // // // //     try {
// // // // //       const response = await axiosInstance.delete(
// // // // //         `/delete-story/${data._id}`
// // // // //       );

// // // // //       if (response.data && !response.data.error) {
// // // // //         toast.success("Memory deleted successfully 💗");
// // // // //         setOpenViewModal({ isShown: false, data: null });
// // // // //         getAllNotes();
// // // // //       }
// // // // //     } catch (error) {
// // // // //       toast.error(
// // // // //         error.response?.data?.message || "Unable to delete this memory."
// // // // //       );
// // // // //     }
// // // // //   };

// // // // //   const handleEdit = (data) => {
// // // // //     setOpenEditModal({
// // // // //       isShown: true,
// // // // //       type: "edit",
// // // // //       data,
// // // // //     });
// // // // //   };

// // // // //   const updateIsFavourite = async (data) => {
// // // // //     const storyId = data._id;

// // // // //     try {
// // // // //       const response = await axiosInstance.put(
// // // // //         `/update-is-favourite/${storyId}`,
// // // // //         { isFavourite: !data.isFavourite }
// // // // //       );

// // // // //       if (response.data?.story) {
// // // // //         toast.success(
// // // // //           data.isFavourite
// // // // //             ? "Removed from favourites"
// // // // //             : "Added to favourites 💗"
// // // // //         );

// // // // //         if (filterType === "search" && searchQuery) {
// // // // //           onSearchNote(searchQuery);
// // // // //         } else if (filterType === "date") {
// // // // //           filterNotesByDate(dateRange);
// // // // //         } else {
// // // // //           getAllNotes();
// // // // //         }
// // // // //       }
// // // // //     } catch (error) {
// // // // //       toast.error("Unable to update your favourites.");
// // // // //     }
// // // // //   };

// // // // //   const handleViewNote = (data) => {
// // // // //     setOpenViewModal({
// // // // //       isShown: true,
// // // // //       data,
// // // // //     });
// // // // //   };

// // // // //   const onSearchNote = async (query) => {
// // // // //     try {
// // // // //       const response = await axiosInstance.get("/search", {
// // // // //         params: { query },
// // // // //       });

// // // // //       if (response.data?.stories) {
// // // // //         setFilterType("search");
// // // // //         setAllNotes(response.data.stories);
// // // // //       }
// // // // //     } catch (error) {
// // // // //       toast.error("Unable to search memories.");
// // // // //     }
// // // // //   };

// // // // //   const filterNotesByDate = async (day) => {
// // // // //     try {
// // // // //       if (!day?.from || !day?.to) return;

// // // // //       const startDate = moment(day.from).startOf("day").valueOf();
// // // // //       const endDate = moment(day.to).endOf("day").valueOf();

// // // // //       const response = await axiosInstance.get("/notes/filter", {
// // // // //         params: { startDate, endDate },
// // // // //       });

// // // // //       if (response.data?.stories) {
// // // // //         setFilterType("date");
// // // // //         setAllNotes(response.data.stories);
// // // // //       }
// // // // //     } catch (error) {
// // // // //       toast.error("Unable to filter memories by date.");
// // // // //     }
// // // // //   };

// // // // //   const handleDayClick = (day) => {
// // // // //     if (!day) return;

// // // // //     setDateRange(day);

// // // // //     if (day.from && day.to) {
// // // // //       filterNotesByDate(day);
// // // // //     }
// // // // //   };

// // // // //   const handleClearSearch = () => {
// // // // //     setSearchQuery("");
// // // // //     setDateRange({ from: null, to: null });
// // // // //     setFilterType("");
// // // // //     getAllNotes();
// // // // //   };

// // // // //   const resetFilter = () => {
// // // // //     setDateRange({ from: null, to: null });
// // // // //     setFilterType("");
// // // // //     setSearchQuery("");
// // // // //     getAllNotes();
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     getUserInfo();
// // // // //     getAllNotes();
// // // // //   }, []);

// // // // //   const favouriteCount = allNotes.filter(
// // // // //     (note) => note.isFavourite
// // // // //   ).length;

// // // // //   const firstName =
// // // // //     userInfo?.fullName?.trim().split(/\s+/)[0] || "there";

// // // // //   return (
// // // // //     <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-[#160824] via-[#281044] to-[#102a52] text-white">

// // // // //       {/* Background decoration */}
// // // // //       <div className="pointer-events-none fixed -left-32 top-32 h-80 w-80 rounded-full bg-fuchsia-500/40 blur-[110px]" />
// // // // //       <div className="pointer-events-none fixed -right-32 top-64 h-96 w-96 rounded-full bg-blue-500/35 blur-[120px]" />
// // // // //       <div className="pointer-events-none fixed bottom-0 left-1/3 h-64 w-64 rounded-full bg-orange-500/25 blur-[110px]" />

// // // // //       {/* Navigation */}
// // // // //       <div className="relative z-30">
// // // // //         <Navbar
// // // // //           userInfo={userInfo}
// // // // //           searchQuery={searchQuery}
// // // // //           setSearchQuery={setSearchQuery}
// // // // //           onSearchNote={onSearchNote}
// // // // //           handleClearSearch={handleClearSearch}
// // // // //         />
// // // // //       </div>

// // // // //       <main className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pb-28 pt-7 sm:px-6 sm:pt-10 lg:px-10">

// // // // //         {/* Quick actions and calendar appear first */}
// // // // //         <section className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
// // // // //           <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-br from-[#28103f] via-[#4c145f] to-[#172c67] p-6 text-white shadow-2xl shadow-fuchsia-950/30 sm:p-8">
// // // // //             <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full bg-fuchsia-500/50 blur-[80px]" />
// // // // //             <div className="pointer-events-none absolute -bottom-20 left-[30%] h-48 w-48 rounded-full bg-orange-500/40 blur-[80px]" />
// // // // //             <div className="relative flex h-full flex-col justify-between gap-8 sm:flex-row sm:items-center">
// // // // //               <div>
// // // // //                 <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold tracking-wide text-pink-100 backdrop-blur-xl">
// // // // //                   <Sparkles className="h-4 w-4 text-orange-300" />
// // // // //                   SAVE THE LITTLE THINGS
// // // // //                 </div>
// // // // //                 <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
// // // // //                   Add a new memory
// // // // //                   <span className="ml-2 bg-gradient-to-r from-pink-300 to-orange-300 bg-clip-text text-transparent">♡</span>
// // // // //                 </h2>
// // // // //                 <p className="mt-3 max-w-lg text-sm leading-6 text-white/75 sm:text-base">
// // // // //                   Capture a special place, a beautiful day, or a moment you want to remember forever.
// // // // //                 </p>
// // // // //               </div>
// // // // //               <button
// // // // //                 type="button"
// // // // //                 onClick={() => setOpenEditModal({ isShown: true, type: "add", data: null })}
// // // // //                 className="relative inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-400 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-fuchsia-950/30 transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-pink-500/30"
// // // // //               >
// // // // //                 <Plus className="h-5 w-5" />
// // // // //                 Create a memory
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* Calendar panel */}
// // // // //           <aside className="w-full xl:w-full">
// // // // //             <div className="overflow-hidden rounded-[2rem] border border-pink-100/80 bg-white/95 shadow-[0_16px_50px_-20px_rgba(217,70,239,0.4)] backdrop-blur-xl">

// // // // //               <div className="border-b border-white/20 bg-gradient-to-r from-pink-100 via-fuchsia-100 to-orange-100 p-5">
// // // // //                 <div className="flex items-center gap-3">
// // // // //                   <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-pink-500 shadow-sm">
// // // // //                     <CalendarDays className="h-5 w-5" />
// // // // //                   </div>

// // // // //                   <div>
// // // // //                     <h3 className="font-bold text-gray-800">
// // // // //                       Memory timeline
// // // // //                     </h3>
// // // // //                     <p className="mt-0.5 text-xs text-gray-500">
// // // // //                       Find a special day
// // // // //                     </p>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div className="p-2 sm:p-4">
// // // // //                 <DayPicker
// // // // //                   mode="range"
// // // // //                   selected={dateRange}
// // // // //                   onSelect={handleDayClick}
// // // // //                   captionLayout="dropdown-buttons"
// // // // //                   pagedNavigation
// // // // //                   classNames={{
// // // // //                     ...defaultClassNames,
// // // // //                     root: `${defaultClassNames.root} mx-auto w-full p-2 sm:p-3`,
// // // // //                     months: `${defaultClassNames.months} w-full`,
// // // // //                     month: `${defaultClassNames.month} w-full`,
// // // // //                     month_grid: `${defaultClassNames.month_grid} w-full border-collapse`,
// // // // //                     weekdays: `${defaultClassNames.weekdays} text-xs font-semibold text-pink-400`,
// // // // //                     weekday: `${defaultClassNames.weekday} py-2`,
// // // // //                     day: `${defaultClassNames.day} p-0`,
// // // // //                     day_button: `${defaultClassNames.day_button} h-9 w-9 rounded-xl text-sm transition hover:bg-pink-50 hover:text-pink-600`,
// // // // //                     today: `${defaultClassNames.today} font-bold text-pink-600`,
// // // // //                     selected: `${defaultClassNames.selected} !bg-pink-500 !text-white rounded-xl`,
// // // // //                     range_start: `${defaultClassNames.range_start} !rounded-l-xl !bg-pink-500 !text-white`,
// // // // //                     range_end: `${defaultClassNames.range_end} !rounded-r-xl !bg-pink-500 !text-white`,
// // // // //                     range_middle: `${defaultClassNames.range_middle} !bg-pink-100 !text-pink-700`,
// // // // //                     nav: `${defaultClassNames.nav} text-pink-500`,
// // // // //                     button_previous: `${defaultClassNames.button_previous} rounded-xl hover:bg-pink-50`,
// // // // //                     button_next: `${defaultClassNames.button_next} rounded-xl hover:bg-pink-50`,
// // // // //                     chevron: `${defaultClassNames.chevron} fill-pink-500`,
// // // // //                     caption_label: `${defaultClassNames.caption_label} font-bold text-gray-700`,
// // // // //                     dropdowns: `${defaultClassNames.dropdowns} gap-1`,
// // // // //                     dropdown: `${defaultClassNames.dropdown} rounded-lg border border-pink-100 bg-white px-1 py-1 text-sm text-gray-700 outline-none focus:border-pink-300`,
// // // // //                   }}
// // // // //                 />
// // // // //               </div>

// // // // //               <div className="border-t border-pink-100/80 px-5 py-4">
// // // // //                 <div className="flex items-start gap-2.5">
// // // // //                   <Heart className="mt-0.5 h-4 w-4 shrink-0 fill-pink-200 text-pink-400" />
// // // // //                   <p className="text-xs leading-5 text-gray-500">
// // // // //                     Select a start and end date to discover the memories
// // // // //                     you made during that time.
// // // // //                   </p>
// // // // //                 </div>

// // // // //                 {dateRange.from && (
// // // // //                   <div className="mt-3 rounded-xl bg-pink-50/80 px-3 py-2 text-xs font-medium text-pink-600">
// // // // //                     <span>
// // // // //                       {moment(dateRange.from).format("MMM D, YYYY")}
// // // // //                     </span>
// // // // //                     {dateRange.to && (
// // // // //                       <>
// // // // //                         <span className="mx-2 text-pink-300">→</span>
// // // // //                         <span>
// // // // //                           {moment(dateRange.to).format("MMM D, YYYY")}
// // // // //                         </span>
// // // // //                       </>
// // // // //                     )}
// // // // //                   </div>
// // // // //                 )}

// // // // //                 {(filterType === "date" || dateRange.from) && (
// // // // //                   <button
// // // // //                     type="button"
// // // // //                     onClick={resetFilter}
// // // // //                     className="mt-3 w-full rounded-xl border border-pink-100 bg-white px-3 py-2 text-xs font-semibold text-pink-500 transition hover:bg-pink-50"
// // // // //                   >
// // // // //                     Clear date filter
// // // // //                   </button>
// // // // //                 )}
// // // // //               </div>
// // // // //             </div>
// // // // //           </aside>
// // // // //         </section>

// // // // //         {/* Welcome hero comes after the quick actions and calendar */}
// // // // //         {/* Welcome hero */}
// // // // //         <section className="relative mb-8 overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-r from-[#3b104f]/95 via-[#55145f]/90 to-[#182d67]/95 p-6 shadow-[0_20px_60px_-30px_rgba(219,39,119,0.3)] sm:p-9 lg:p-11">

// // // // //           <div className="pointer-events-none absolute -right-8 -top-16 h-56 w-56 rounded-full border-[35px] border-white/30" />
// // // // //           <div className="pointer-events-none absolute -bottom-20 right-36 h-48 w-48 rounded-full bg-white/30 blur-2xl" />

// // // // //           <Heart className="absolute right-[18%] top-8 hidden h-6 w-6 animate-pulse fill-pink-300/70 text-pink-300/70 sm:block" />
// // // // //           <Sparkles className="absolute bottom-9 right-12 hidden h-7 w-7 text-orange-300 sm:block" />

// // // // //           <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-center">
// // // // //             <div className="max-w-2xl">
// // // // //               <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold tracking-wide text-pink-100 shadow-sm backdrop-blur-md">
// // // // //                 <Sparkles className="h-4 w-4" />
// // // // //                 YOUR PERSONAL MEMORY JOURNAL
// // // // //               </div>

// // // // //               <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
// // // // //                 Every moment has
// // // // //                 <span className="block bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text pb-1 text-transparent">
// // // // //                   a story to tell.
// // // // //                 </span>
// // // // //               </h1>

// // // // //               <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
// // // // //                 Welcome back, {firstName}! Keep your favourite memories,
// // // // //                 revisit special places, and hold on to the little things
// // // // //                 that make life beautiful.
// // // // //               </p>

// // // // //               <button
// // // // //                 type="button"
// // // // //                 onClick={() =>
// // // // //                   setOpenEditModal({
// // // // //                     isShown: true,
// // // // //                     type: "add",
// // // // //                     data: null,
// // // // //                   })
// // // // //                 }
// // // // //                 className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-300/40 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-pink-300/50 active:translate-y-0"
// // // // //               >
// // // // //                 <Plus className="h-5 w-5" />
// // // // //                 Create a memory
// // // // //               </button>
// // // // //             </div>

// // // // //             {/* Hero illustration */}
// // // // //             <div className="hidden shrink-0 items-center justify-center md:flex">
// // // // //               <div className="relative flex h-40 w-40 items-center justify-center rounded-[2.5rem] border border-white/80 bg-white/50 shadow-xl shadow-pink-200/30 backdrop-blur-lg lg:h-48 lg:w-48">
// // // // //                 <div className="absolute inset-3 rounded-[2rem] border border-pink-100/80" />

// // // // //                 <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-pink-400 via-rose-400 to-purple-400 shadow-xl shadow-pink-300/40 lg:h-28 lg:w-28">
// // // // //                   <BookHeart className="h-12 w-12 text-white lg:h-14 lg:w-14" />
// // // // //                 </div>

// // // // //                 <div className="absolute -right-3 top-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white bg-white shadow-lg">
// // // // //                   <Heart className="h-5 w-5 fill-pink-400 text-pink-400" />
// // // // //                 </div>

// // // // //                 <div className="absolute -bottom-3 -left-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-white bg-white shadow-lg">
// // // // //                   <Sparkles className="h-5 w-5 text-purple-400" />
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </section>

// // // // //         {/* Stats */}
// // // // //         <section className="mb-8 grid grid-cols-2 gap-3 sm:gap-5">
// // // // //           <div className="group flex items-center gap-3 rounded-2xl border border-white/20 bg-white/95 p-4 shadow-sm shadow-pink-100/50 backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-md sm:gap-4 sm:p-5">
// // // // //             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-pink-500 sm:h-12 sm:w-12">
// // // // //               <BookHeart className="h-5 w-5 sm:h-6 sm:w-6" />
// // // // //             </div>
// // // // //             <div className="min-w-0">
// // // // //               <p className="text-2xl font-bold text-purple-950 sm:text-3xl">
// // // // //                 {allNotes.length}
// // // // //               </p>
// // // // //               <p className="truncate text-xs text-gray-500 sm:text-sm">
// // // // //                 Memories shown
// // // // //               </p>
// // // // //             </div>
// // // // //           </div>

// // // // //           <div className="group flex items-center gap-3 rounded-2xl border border-white/20 bg-white/95 p-4 shadow-sm shadow-purple-100/50 backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-md sm:gap-4 sm:p-5">
// // // // //             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-500 sm:h-12 sm:w-12">
// // // // //               <Heart className="h-5 w-5 fill-purple-300 sm:h-6 sm:w-6" />
// // // // //             </div>
// // // // //             <div className="min-w-0">
// // // // //               <p className="text-2xl font-bold text-purple-950 sm:text-3xl">
// // // // //                 {favouriteCount}
// // // // //               </p>
// // // // //               <p className="truncate text-xs text-gray-500 sm:text-sm">
// // // // //                 Favourites shown
// // // // //               </p>
// // // // //             </div>
// // // // //           </div>
// // // // //         </section>

// // // // //         {/* Memory collection heading */}
// // // // //         <section className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
// // // // //           <div>
// // // // //             <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-pink-400">
// // // // //               <Images className="h-4 w-4" />
// // // // //               YOUR COLLECTION
// // // // //             </div>

// // // // //             <h2 className="text-2xl font-bold tracking-tight text-purple-950 sm:text-3xl">
// // // // //               Your memories
// // // // //               <span className="ml-2 text-pink-400">♡</span>
// // // // //             </h2>

// // // // //             <p className="mt-2 text-sm text-gray-500">
// // // // //               Little moments, beautifully remembered.
// // // // //             </p>
// // // // //           </div>

// // // // //           <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-pink-100 bg-white/80 px-3.5 py-2.5 text-xs font-medium text-gray-500 shadow-sm">
// // // // //             <ArrowDownWideNarrow className="h-4 w-4 text-pink-400" />
// // // // //             Your story collection
// // // // //           </div>
// // // // //         </section>

// // // // //         {/* Memories collection */}
// // // // //         <div className="w-full">

// // // // //           {/* Notes grid */}
// // // // //           <section className="min-w-0 w-full">
// // // // //             <FilterInfoTitle
// // // // //               filterType={filterType}
// // // // //               filterDates={dateRange}
// // // // //               onClear={resetFilter}
// // // // //             />

// // // // //             {allNotes.length > 0 ? (
// // // // //               <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-3">
// // // // //                 {allNotes.map((item) => (
// // // // //                   <NotesCard
// // // // //                     key={item._id}
// // // // //                     imageUrl={item.imageUrl}
// // // // //                     title={item.title}
// // // // //                     date={item.visitedDate}
// // // // //                     story={item.story}
// // // // //                     visitedLocation={item.visitedLocation}
// // // // //                     isFavourite={item.isFavourite}
// // // // //                     onFavouriteClick={() => updateIsFavourite(item)}
// // // // //                     onClick={() => handleViewNote(item)}
// // // // //                   />
// // // // //                 ))}
// // // // //               </div>
// // // // //             ) : (
// // // // //               <div className="mt-5 rounded-[2rem] border border-pink-100/80 bg-white/60 p-4 shadow-sm backdrop-blur-lg sm:p-6">
// // // // //                 <EmptyCard
// // // // //                   imgSrc={emptyImg}
// // // // //                   message={getEmptyCardMessage(filterType)}
// // // // //                 />
// // // // //               </div>
// // // // //             )}
// // // // //           </section>


// // // // //         </div>
// // // // //       </main>

// // // // //       {/* Add/Edit modal */}
// // // // //       <Modal
// // // // //         isOpen={openEditModal.isShown}
// // // // //         onRequestClose={() =>
// // // // //           setOpenEditModal({
// // // // //             isShown: false,
// // // // //             type: "add",
// // // // //             data: null,
// // // // //           })
// // // // //         }
// // // // //         appElement={document.getElementById("root")}
// // // // //         overlayClassName="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-gray-900/30 p-3 backdrop-blur-sm sm:p-6"
// // // // //         className="relative my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/80 bg-white shadow-2xl shadow-pink-200/30 outline-none"
// // // // //       >
// // // // //         <AddEditNote
// // // // //           type={openEditModal.type}
// // // // //           storyInfo={openEditModal.data}
// // // // //           onClose={() =>
// // // // //             setOpenEditModal({
// // // // //               isShown: false,
// // // // //               type: "add",
// // // // //               data: null,
// // // // //             })
// // // // //           }
// // // // //           getAllNotes={getAllNotes}
// // // // //         />
// // // // //       </Modal>

// // // // //       {/* View note modal */}
// // // // //       <Modal
// // // // //         isOpen={openViewModal.isShown}
// // // // //         onRequestClose={() =>
// // // // //           setOpenViewModal({ isShown: false, data: null })
// // // // //         }
// // // // //         appElement={document.getElementById("root")}
// // // // //         overlayClassName="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-gray-900/30 p-3 backdrop-blur-sm sm:p-6"
// // // // //         className="relative my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/80 bg-white shadow-2xl shadow-pink-200/30 outline-none"
// // // // //       >
// // // // //         <ViewNote
// // // // //           type={openViewModal.type}
// // // // //           storyInfo={openViewModal.data}
// // // // //           onClose={() =>
// // // // //             setOpenViewModal((prevState) => ({
// // // // //               ...prevState,
// // // // //               isShown: false,
// // // // //             }))
// // // // //           }
// // // // //           handleEdit={() => {
// // // // //             setOpenViewModal((prevState) => ({
// // // // //               ...prevState,
// // // // //               isShown: false,
// // // // //             }));
// // // // //             handleEdit(openViewModal.data || null);
// // // // //           }}
// // // // //           handleDelete={() => handleDelete(openViewModal.data || null)}
// // // // //         />
// // // // //       </Modal>

// // // // //       {/* Floating add button */}
// // // // //       <button
// // // // //         type="button"
// // // // //         aria-label="Create a new memory"
// // // // //         onClick={() =>
// // // // //           setOpenEditModal({
// // // // //             isShown: true,
// // // // //             type: "add",
// // // // //             data: null,
// // // // //           })
// // // // //         }
// // // // //         className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-orange-400 text-white shadow-xl shadow-pink-300/50 transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl hover:shadow-pink-300/60 active:scale-95 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
// // // // //       >
// // // // //         <Plus className="h-7 w-7 transition-transform duration-300 group-hover:rotate-90 sm:h-8 sm:w-8" />
// // // // //         <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl border border-pink-100 bg-white px-3 py-2 text-xs font-semibold text-pink-600 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
// // // // //           Create a memory
// // // // //         </span>
// // // // //       </button>

// // // // //       <ToastContainer
// // // // //         position="bottom-right"
// // // // //         autoClose={2500}
// // // // //         theme="light"
// // // // //         toastClassName="!rounded-2xl !border !border-pink-100 !shadow-lg"
// // // // //       />
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Home;



// // // // import React, { useEffect, useState } from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import {
// // // //   Heart,
// // // //   Sparkles,
// // // //   BookHeart,
// // // //   CalendarDays,
// // // //   Plus,
// // // //   ArrowDownWideNarrow,
// // // //   Images,
// // // // } from "lucide-react";

// // // // import Navbar from "../../Components/Navbar";
// // // // import ConnectionPanel from "../../Components/ConnectionPanel";
// // // // import axiosInstance from "../../utils/axiosinstance";
// // // // import NotesCard from "../../Components/Card/NotesCard";
// // // // import AddEditNote from "./AddEditNote";
// // // // import ViewNote from "./ViewNote";
// // // // import FilterInfoTitle from "../../Components/Card/FilterInfoTitle";
// // // // import Modal from "react-modal";
// // // // import { ToastContainer, toast } from "react-toastify";
// // // // import "react-toastify/dist/ReactToastify.css";
// // // // import EmptyCard from "../../Components/Card/EmptyCard";
// // // // import emptyImg from "../../images/emptyImg.jpg";
// // // // import { DayPicker, getDefaultClassNames } from "react-day-picker";
// // // // import moment from "moment";
// // // // import { getEmptyCardMessage } from "../../utils/helper";

// // // // const Home = () => {
// // // //   const navigate = useNavigate();
// // // //   const defaultClassNames = getDefaultClassNames();

// // // //   const [userInfo, setUserInfo] = useState(null);
// // // //   const [allNotes, setAllNotes] = useState([]);
// // // //   const [searchQuery, setSearchQuery] = useState("");
// // // //   const [filterType, setFilterType] = useState("");
// // // //   const [dateRange, setDateRange] = useState({
// // // //     from: null,
// // // //     to: null,
// // // //   });

// // // //   const [openEditModal, setOpenEditModal] = useState({
// // // //     isShown: false,
// // // //     type: "add",
// // // //     data: null,
// // // //   });

// // // //   const [openViewModal, setOpenViewModal] = useState({
// // // //     isShown: false,
// // // //     data: null,
// // // //   });

// // // //   const getUserInfo = async () => {
// // // //     try {
// // // //       const response = await axiosInstance.get("/get-user");

// // // //       if (response.data?.user) {
// // // //         setUserInfo(response.data.user);
// // // //       }
// // // //     } catch (error) {
// // // //       if (error.response?.status === 401) {
// // // //         localStorage.clear();
// // // //         navigate("/login");
// // // //       } else {
// // // //         console.error("Unable to fetch user information.");
// // // //       }
// // // //     }
// // // //   };

// // // //   const getAllNotes = async () => {
// // // //     try {
// // // //       const response = await axiosInstance.get("/getall-stories");

// // // //       if (response.data?.stories) {
// // // //         setAllNotes(response.data.stories);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Unable to fetch notes.");
// // // //     }
// // // //   };

// // // //   const handleDelete = async (data) => {
// // // //     if (!data?._id) return;

// // // //     try {
// // // //       const response = await axiosInstance.delete(
// // // //         `/delete-story/${data._id}`
// // // //       );

// // // //       if (response.data && !response.data.error) {
// // // //         toast.success("Memory deleted successfully 💗");
// // // //         setOpenViewModal({ isShown: false, data: null });
// // // //         getAllNotes();
// // // //       }
// // // //     } catch (error) {
// // // //       toast.error(
// // // //         error.response?.data?.message ||
// // // //           "Unable to delete this memory."
// // // //       );
// // // //     }
// // // //   };

// // // //   const handleEdit = (data) => {
// // // //     setOpenEditModal({
// // // //       isShown: true,
// // // //       type: "edit",
// // // //       data,
// // // //     });
// // // //   };

// // // //   const updateIsFavourite = async (data) => {
// // // //     const storyId = data._id;

// // // //     try {
// // // //       const response = await axiosInstance.put(
// // // //         `/update-is-favourite/${storyId}`,
// // // //         { isFavourite: !data.isFavourite }
// // // //       );

// // // //       if (response.data?.story) {
// // // //         toast.success(
// // // //           data.isFavourite
// // // //             ? "Removed from favourites"
// // // //             : "Added to favourites 💗"
// // // //         );

// // // //         if (filterType === "search" && searchQuery) {
// // // //           onSearchNote(searchQuery);
// // // //         } else if (filterType === "date") {
// // // //           filterNotesByDate(dateRange);
// // // //         } else {
// // // //           getAllNotes();
// // // //         }
// // // //       }
// // // //     } catch (error) {
// // // //       toast.error("Unable to update your favourites.");
// // // //     }
// // // //   };

// // // //   const handleViewNote = (data) => {
// // // //     setOpenViewModal({
// // // //       isShown: true,
// // // //       data,
// // // //     });
// // // //   };

// // // //   const onSearchNote = async (query) => {
// // // //     try {
// // // //       const response = await axiosInstance.get("/search", {
// // // //         params: { query },
// // // //       });

// // // //       if (response.data?.stories) {
// // // //         setFilterType("search");
// // // //         setAllNotes(response.data.stories);
// // // //       }
// // // //     } catch (error) {
// // // //       toast.error("Unable to search memories.");
// // // //     }
// // // //   };

// // // //   const filterNotesByDate = async (day) => {
// // // //     try {
// // // //       if (!day?.from || !day?.to) return;

// // // //       const startDate = moment(day.from).startOf("day").valueOf();
// // // //       const endDate = moment(day.to).endOf("day").valueOf();

// // // //       const response = await axiosInstance.get("/notes/filter", {
// // // //         params: { startDate, endDate },
// // // //       });

// // // //       if (response.data?.stories) {
// // // //         setFilterType("date");
// // // //         setAllNotes(response.data.stories);
// // // //       }
// // // //     } catch (error) {
// // // //       toast.error("Unable to filter memories by date.");
// // // //     }
// // // //   };

// // // //   const handleDayClick = (day) => {
// // // //     if (!day) return;

// // // //     setDateRange(day);

// // // //     if (day.from && day.to) {
// // // //       filterNotesByDate(day);
// // // //     }
// // // //   };

// // // //   const handleClearSearch = () => {
// // // //     setSearchQuery("");
// // // //     setDateRange({ from: null, to: null });
// // // //     setFilterType("");
// // // //     getAllNotes();
// // // //   };

// // // //   const resetFilter = () => {
// // // //     setDateRange({ from: null, to: null });
// // // //     setFilterType("");
// // // //     setSearchQuery("");
// // // //     getAllNotes();
// // // //   };

// // // //   useEffect(() => {
// // // //     getUserInfo();
// // // //     getAllNotes();
// // // //   }, []);

// // // //   const favouriteCount = allNotes.filter(
// // // //     (note) => note.isFavourite
// // // //   ).length;

// // // //   const firstName =
// // // //     userInfo?.fullName?.trim().split(/\s+/)[0] || "there";

// // // //   return (
// // // //     <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-[#160824] via-[#281044] to-[#102a52] text-white">
// // // //       {/* Background decoration */}
// // // //       <div className="pointer-events-none fixed -left-32 top-32 h-80 w-80 rounded-full bg-fuchsia-500/40 blur-[110px]" />
// // // //       <div className="pointer-events-none fixed -right-32 top-64 h-96 w-96 rounded-full bg-blue-500/35 blur-[120px]" />
// // // //       <div className="pointer-events-none fixed bottom-0 left-1/3 h-64 w-64 rounded-full bg-orange-500/25 blur-[110px]" />

// // // //       {/* Navigation */}
// // // //       <div className="relative z-30">
// // // //         <Navbar
// // // //           userInfo={userInfo}
// // // //           searchQuery={searchQuery}
// // // //           setSearchQuery={setSearchQuery}
// // // //           onSearchNote={onSearchNote}
// // // //           handleClearSearch={handleClearSearch}
// // // //         />
// // // //       </div>

// // // //       <main className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pb-28 pt-7 sm:px-6 sm:pt-10 lg:px-10">
// // // //         {/* Quick actions and calendar */}
// // // //         <section className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
// // // //           {/* Create memory banner */}
// // // //           <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-br from-[#28103f] via-[#4c145f] to-[#172c67] p-6 text-white shadow-2xl shadow-fuchsia-950/30 sm:p-8">
// // // //             <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full bg-fuchsia-500/50 blur-[80px]" />
// // // //             <div className="pointer-events-none absolute -bottom-20 left-[30%] h-48 w-48 rounded-full bg-orange-500/40 blur-[80px]" />

// // // //             <div className="relative flex h-full flex-col justify-between gap-8 sm:flex-row sm:items-center">
// // // //               <div>
// // // //                 <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold tracking-wide text-pink-100 backdrop-blur-xl">
// // // //                   <Sparkles className="h-4 w-4 text-orange-300" />
// // // //                   SAVE THE LITTLE THINGS
// // // //                 </div>

// // // //                 <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
// // // //                   Add a new memory
// // // //                   <span className="ml-2 bg-gradient-to-r from-pink-300 to-orange-300 bg-clip-text text-transparent">
// // // //                     ♡
// // // //                   </span>
// // // //                 </h2>

// // // //                 <p className="mt-3 max-w-lg text-sm leading-6 text-white/75 sm:text-base">
// // // //                   Capture a special place, a beautiful day, or a moment
// // // //                   you want to remember forever.
// // // //                 </p>
// // // //               </div>

// // // //               <button
// // // //                 type="button"
// // // //                 onClick={() =>
// // // //                   setOpenEditModal({
// // // //                     isShown: true,
// // // //                     type: "add",
// // // //                     data: null,
// // // //                   })
// // // //                 }
// // // //                 className="relative inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-400 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-fuchsia-950/30 transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-pink-500/30"
// // // //               >
// // // //                 <Plus className="h-5 w-5" />
// // // //                 Create a memory
// // // //               </button>
// // // //             </div>
// // // //           </div>

// // // //           {/* Calendar */}
// // // //           <aside className="w-full">
// // // //             <div className="overflow-hidden rounded-[2rem] border border-pink-100/80 bg-white/95 shadow-[0_16px_50px_-20px_rgba(217,70,239,0.4)] backdrop-blur-xl">
// // // //               <div className="border-b border-white/20 bg-gradient-to-r from-pink-100 via-fuchsia-100 to-orange-100 p-5">
// // // //                 <div className="flex items-center gap-3">
// // // //                   <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-pink-500 shadow-sm">
// // // //                     <CalendarDays className="h-5 w-5" />
// // // //                   </div>

// // // //                   <div>
// // // //                     <h3 className="font-bold text-gray-800">
// // // //                       Memory timeline
// // // //                     </h3>
// // // //                     <p className="mt-0.5 text-xs text-gray-500">
// // // //                       Find a special day
// // // //                     </p>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               <div className="p-2 sm:p-4">
// // // //                 <DayPicker
// // // //                   mode="range"
// // // //                   selected={dateRange}
// // // //                   onSelect={handleDayClick}
// // // //                   captionLayout="dropdown-buttons"
// // // //                   pagedNavigation
// // // //                   classNames={{
// // // //                     ...defaultClassNames,
// // // //                     root: `${defaultClassNames.root} mx-auto w-full p-2 sm:p-3`,
// // // //                     months: `${defaultClassNames.months} w-full`,
// // // //                     month: `${defaultClassNames.month} w-full`,
// // // //                     month_grid: `${defaultClassNames.month_grid} w-full border-collapse`,
// // // //                     weekdays: `${defaultClassNames.weekdays} text-xs font-semibold text-pink-400`,
// // // //                     weekday: `${defaultClassNames.weekday} py-2`,
// // // //                     day: `${defaultClassNames.day} p-0`,
// // // //                     day_button: `${defaultClassNames.day_button} h-9 w-9 rounded-xl text-sm transition hover:bg-pink-50 hover:text-pink-600`,
// // // //                     today: `${defaultClassNames.today} font-bold text-pink-600`,
// // // //                     selected: `${defaultClassNames.selected} !bg-pink-500 !text-white rounded-xl`,
// // // //                     range_start: `${defaultClassNames.range_start} !rounded-l-xl !bg-pink-500 !text-white`,
// // // //                     range_end: `${defaultClassNames.range_end} !rounded-r-xl !bg-pink-500 !text-white`,
// // // //                     range_middle: `${defaultClassNames.range_middle} !bg-pink-100 !text-pink-700`,
// // // //                     nav: `${defaultClassNames.nav} text-pink-500`,
// // // //                     button_previous: `${defaultClassNames.button_previous} rounded-xl hover:bg-pink-50`,
// // // //                     button_next: `${defaultClassNames.button_next} rounded-xl hover:bg-pink-50`,
// // // //                     chevron: `${defaultClassNames.chevron} fill-pink-500`,
// // // //                     caption_label: `${defaultClassNames.caption_label} font-bold text-gray-700`,
// // // //                     dropdowns: `${defaultClassNames.dropdowns} gap-1`,
// // // //                     dropdown: `${defaultClassNames.dropdown} rounded-lg border border-pink-100 bg-white px-1 py-1 text-sm text-gray-700 outline-none focus:border-pink-300`,
// // // //                   }}
// // // //                 />
// // // //               </div>

// // // //               <div className="border-t border-pink-100/80 px-5 py-4">
// // // //                 <div className="flex items-start gap-2.5">
// // // //                   <Heart className="mt-0.5 h-4 w-4 shrink-0 fill-pink-200 text-pink-400" />
// // // //                   <p className="text-xs leading-5 text-gray-500">
// // // //                     Select a start and end date to discover the memories
// // // //                     you made during that time.
// // // //                   </p>
// // // //                 </div>

// // // //                 {dateRange.from && (
// // // //                   <div className="mt-3 rounded-xl bg-pink-50/80 px-3 py-2 text-xs font-medium text-pink-600">
// // // //                     <span>
// // // //                       {moment(dateRange.from).format("MMM D, YYYY")}
// // // //                     </span>

// // // //                     {dateRange.to && (
// // // //                       <>
// // // //                         <span className="mx-2 text-pink-300">→</span>
// // // //                         <span>
// // // //                           {moment(dateRange.to).format("MMM D, YYYY")}
// // // //                         </span>
// // // //                       </>
// // // //                     )}
// // // //                   </div>
// // // //                 )}

// // // //                 {(filterType === "date" || dateRange.from) && (
// // // //                   <button
// // // //                     type="button"
// // // //                     onClick={resetFilter}
// // // //                     className="mt-3 w-full rounded-xl border border-pink-100 bg-white px-3 py-2 text-xs font-semibold text-pink-500 transition hover:bg-pink-50"
// // // //                   >
// // // //                     Clear date filter
// // // //                   </button>
// // // //                 )}
// // // //               </div>
// // // //             </div>
// // // //           </aside>
// // // //         </section>

// // // //         {/* Welcome hero */}
// // // //         <section className="relative mb-8 overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-r from-[#3b104f]/95 via-[#55145f]/90 to-[#182d67]/95 p-6 shadow-[0_20px_60px_-30px_rgba(219,39,119,0.3)] sm:p-9 lg:p-11">
// // // //           <div className="pointer-events-none absolute -right-8 -top-16 h-56 w-56 rounded-full border-[35px] border-white/30" />
// // // //           <div className="pointer-events-none absolute -bottom-20 right-36 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

// // // //           <Heart className="absolute right-[18%] top-8 hidden h-6 w-6 animate-pulse fill-pink-300/70 text-pink-300/70 sm:block" />
// // // //           <Sparkles className="absolute bottom-9 right-12 hidden h-7 w-7 text-orange-300 sm:block" />

// // // //           <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-center">
// // // //             <div className="max-w-2xl">
// // // //               <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold tracking-wide text-pink-100 shadow-sm backdrop-blur-md">
// // // //                 <Sparkles className="h-4 w-4" />
// // // //                 YOUR PERSONAL MEMORY JOURNAL
// // // //               </div>

// // // //               <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
// // // //                 Every moment has
// // // //                 <span className="block bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 bg-clip-text pb-1 text-transparent">
// // // //                   a story to tell.
// // // //                 </span>
// // // //               </h1>

// // // //               <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
// // // //                 Welcome back, {firstName}! Keep your favourite memories,
// // // //                 revisit special places, and hold on to the little things
// // // //                 that make life beautiful.
// // // //               </p>

// // // //               <button
// // // //                 type="button"
// // // //                 onClick={() =>
// // // //                   setOpenEditModal({
// // // //                     isShown: true,
// // // //                     type: "add",
// // // //                     data: null,
// // // //                   })
// // // //                 }
// // // //                 className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-900/30 transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
// // // //               >
// // // //                 <Plus className="h-5 w-5" />
// // // //                 Create a memory
// // // //               </button>
// // // //             </div>

// // // //             {/* Hero illustration */}
// // // //             <div className="hidden shrink-0 items-center justify-center md:flex">
// // // //               <div className="relative flex h-40 w-40 items-center justify-center rounded-[2.5rem] border border-white/20 bg-white/10 shadow-xl backdrop-blur-lg lg:h-48 lg:w-48">
// // // //                 <div className="absolute inset-3 rounded-[2rem] border border-white/20" />

// // // //                 <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-pink-400 via-rose-400 to-purple-500 shadow-xl lg:h-28 lg:w-28">
// // // //                   <BookHeart className="h-12 w-12 text-white lg:h-14 lg:w-14" />
// // // //                 </div>

// // // //                 <div className="absolute -right-3 top-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-[#27103e] shadow-lg">
// // // //                   <Heart className="h-5 w-5 fill-pink-400 text-pink-400" />
// // // //                 </div>

// // // //                 <div className="absolute -bottom-3 -left-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-[#27103e] shadow-lg">
// // // //                   <Sparkles className="h-5 w-5 text-orange-300" />
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </section>

// // // //         {/* Stats */}
// // // //         <section className="mb-8 grid grid-cols-2 gap-3 sm:gap-5">
// // // //           <div className="group flex items-center gap-3 rounded-2xl border border-white/20 bg-white/95 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:gap-4 sm:p-5">
// // // //             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-pink-500 sm:h-12 sm:w-12">
// // // //               <BookHeart className="h-5 w-5 sm:h-6 sm:w-6" />
// // // //             </div>

// // // //             <div className="min-w-0">
// // // //               <p className="text-2xl font-bold text-purple-950 sm:text-3xl">
// // // //                 {allNotes.length}
// // // //               </p>
// // // //               <p className="truncate text-xs text-gray-500 sm:text-sm">
// // // //                 Memories shown
// // // //               </p>
// // // //             </div>
// // // //           </div>

// // // //           <div className="group flex items-center gap-3 rounded-2xl border border-white/20 bg-white/95 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:gap-4 sm:p-5">
// // // //             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-500 sm:h-12 sm:w-12">
// // // //               <Heart className="h-5 w-5 fill-purple-300 sm:h-6 sm:w-6" />
// // // //             </div>

// // // //             <div className="min-w-0">
// // // //               <p className="text-2xl font-bold text-purple-950 sm:text-3xl">
// // // //                 {favouriteCount}
// // // //               </p>
// // // //               <p className="truncate text-xs text-gray-500 sm:text-sm">
// // // //                 Favourites shown
// // // //               </p>
// // // //             </div>
// // // //           </div>
// // // //         </section>

// // // //         {/* Connections panel */}
// // // //         <section className="mb-10">
// // // //           <ConnectionPanel />
// // // //         </section>

// // // //         {/* Memory collection heading */}
// // // //         <section className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
// // // //           <div>
// // // //             <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-pink-300">
// // // //               <Images className="h-4 w-4" />
// // // //               YOUR COLLECTION
// // // //             </div>

// // // //             <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
// // // //               Your memories
// // // //               <span className="ml-2 text-pink-300">♡</span>
// // // //             </h2>

// // // //             <p className="mt-2 text-sm text-white/60">
// // // //               Little moments, beautifully remembered.
// // // //             </p>
// // // //           </div>

// // // //           <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-xs font-medium text-white/70">
// // // //             <ArrowDownWideNarrow className="h-4 w-4 text-pink-300" />
// // // //             Your story collection
// // // //           </div>
// // // //         </section>

// // // //         {/* Memories collection */}
// // // //         <section className="w-full">
// // // //           <FilterInfoTitle
// // // //             filterType={filterType}
// // // //             filterDates={dateRange}
// // // //             onClear={resetFilter}
// // // //           />

// // // //           {allNotes.length > 0 ? (
// // // //             <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-3">
// // // //               {allNotes.map((item) => (
// // // //                 <NotesCard
// // // //                   key={item._id}
// // // //                   imageUrl={item.imageUrl}
// // // //                   title={item.title}
// // // //                   date={item.visitedDate}
// // // //                   story={item.story}
// // // //                   visitedLocation={item.visitedLocation}
// // // //                   isFavourite={item.isFavourite}
// // // //                   onFavouriteClick={() => updateIsFavourite(item)}
// // // //                   onClick={() => handleViewNote(item)}
// // // //                 />
// // // //               ))}
// // // //             </div>
// // // //           ) : (
// // // //             <div className="mt-5 rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 sm:p-6">
// // // //               <EmptyCard
// // // //                 imgSrc={emptyImg}
// // // //                 message={getEmptyCardMessage(filterType)}
// // // //               />
// // // //             </div>
// // // //           )}
// // // //         </section>
// // // //       </main>

// // // //       {/* Add/Edit modal */}
// // // //       <Modal
// // // //         isOpen={openEditModal.isShown}
// // // //         onRequestClose={() =>
// // // //           setOpenEditModal({
// // // //             isShown: false,
// // // //             type: "add",
// // // //             data: null,
// // // //           })
// // // //         }
// // // //         appElement={document.getElementById("root")}
// // // //         overlayClassName="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-gray-900/50 p-3 backdrop-blur-sm sm:p-6"
// // // //         className="relative my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/80 bg-white shadow-2xl outline-none"
// // // //       >
// // // //         <AddEditNote
// // // //           type={openEditModal.type}
// // // //           storyInfo={openEditModal.data}
// // // //           onClose={() =>
// // // //             setOpenEditModal({
// // // //               isShown: false,
// // // //               type: "add",
// // // //               data: null,
// // // //             })
// // // //           }
// // // //           getAllNotes={getAllNotes}
// // // //         />
// // // //       </Modal>

// // // //       {/* View note modal */}
// // // //       <Modal
// // // //         isOpen={openViewModal.isShown}
// // // //         onRequestClose={() =>
// // // //           setOpenViewModal({ isShown: false, data: null })
// // // //         }
// // // //         appElement={document.getElementById("root")}
// // // //         overlayClassName="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-gray-900/50 p-3 backdrop-blur-sm sm:p-6"
// // // //         className="relative my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/80 bg-white shadow-2xl outline-none"
// // // //       >
// // // //         <ViewNote
// // // //           type={openViewModal.type}
// // // //           storyInfo={openViewModal.data}
// // // //           onClose={() =>
// // // //             setOpenViewModal((previous) => ({
// // // //               ...previous,
// // // //               isShown: false,
// // // //             }))
// // // //           }
// // // //           handleEdit={() => {
// // // //             setOpenViewModal((previous) => ({
// // // //               ...previous,
// // // //               isShown: false,
// // // //             }));
// // // //             handleEdit(openViewModal.data || null);
// // // //           }}
// // // //           handleDelete={() => handleDelete(openViewModal.data || null)}
// // // //         />
// // // //       </Modal>

// // // //       {/* Floating add button */}
// // // //       <button
// // // //         type="button"
// // // //         aria-label="Create a new memory"
// // // //         onClick={() =>
// // // //           setOpenEditModal({
// // // //             isShown: true,
// // // //             type: "add",
// // // //             data: null,
// // // //           })
// // // //         }
// // // //         className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-orange-400 text-white shadow-xl shadow-pink-950/40 transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl active:scale-95 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
// // // //       >
// // // //         <Plus className="h-7 w-7 transition-transform duration-300 group-hover:rotate-90 sm:h-8 sm:w-8" />
// // // //         <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl border border-pink-100 bg-white px-3 py-2 text-xs font-semibold text-pink-600 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
// // // //           Create a memory
// // // //         </span>
// // // //       </button>

// // // //       <ToastContainer
// // // //         position="bottom-right"
// // // //         autoClose={2500}
// // // //         theme="dark"
// // // //         toastClassName="!rounded-2xl !border !border-white/10 !shadow-lg"
// // // //       />
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Home;




// // // import React, { useEffect, useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import {
// // //   Heart,
// // //   Sparkles,
// // //   BookHeart,
// // //   CalendarDays,
// // //   Plus,
// // //   ArrowDownWideNarrow,
// // //   Images,
// // // } from "lucide-react";

// // // import Navbar from "../../Components/Navbar";
// // // import ConnectionPanel from "../../Components/ConnectionPanel";
// // // import axiosInstance from "../../utils/axiosinstance";
// // // import NotesCard from "../../Components/Card/NotesCard";
// // // import AddEditNote from "./AddEditNote";
// // // import ViewNote from "./ViewNote";
// // // import FilterInfoTitle from "../../Components/Card/FilterInfoTitle";
// // // import Modal from "react-modal";
// // // import { ToastContainer, toast } from "react-toastify";
// // // import "react-toastify/dist/ReactToastify.css";
// // // import EmptyCard from "../../Components/Card/EmptyCard";
// // // import emptyImg from "../../images/emptyImg.jpg";
// // // import { DayPicker, getDefaultClassNames } from "react-day-picker";
// // // import "react-day-picker/style.css";
// // // import moment from "moment";
// // // import { getEmptyCardMessage } from "../../utils/helper";

// // // const Home = () => {
// // //   const navigate = useNavigate();
// // //   const defaultClassNames = getDefaultClassNames();

// // //   const [userInfo, setUserInfo] = useState(null);
// // //   const [allNotes, setAllNotes] = useState([]);
// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const [filterType, setFilterType] = useState("");
// // //   const [dateRange, setDateRange] = useState({
// // //     from: null,
// // //     to: null,
// // //   });

// // //   const [openEditModal, setOpenEditModal] = useState({
// // //     isShown: false,
// // //     type: "add",
// // //     data: null,
// // //   });

// // //   const [openViewModal, setOpenViewModal] = useState({
// // //     isShown: false,
// // //     data: null,
// // //   });

// // //   const getUserInfo = async () => {
// // //     try {
// // //       const response = await axiosInstance.get("/get-user");

// // //       if (response.data?.user) {
// // //         setUserInfo(response.data.user);
// // //       }
// // //     } catch (error) {
// // //       if (error.response?.status === 401) {
// // //         localStorage.clear();
// // //         navigate("/login");
// // //       } else {
// // //         console.error("Unable to fetch user information.");
// // //       }
// // //     }
// // //   };

// // //   const getAllNotes = async () => {
// // //     try {
// // //       const response = await axiosInstance.get("/getall-stories");

// // //       if (response.data?.stories) {
// // //         setAllNotes(response.data.stories);
// // //       }
// // //     } catch (error) {
// // //       console.error("Unable to fetch notes.");
// // //     }
// // //   };

// // //   const handleDelete = async (data) => {
// // //     if (!data?._id) return;

// // //     try {
// // //       const response = await axiosInstance.delete(
// // //         `/delete-story/${data._id}`
// // //       );

// // //       if (response.data && !response.data.error) {
// // //         toast.success("Memory deleted successfully 💗");
// // //         setOpenViewModal({ isShown: false, data: null });
// // //         getAllNotes();
// // //       }
// // //     } catch (error) {
// // //       toast.error(
// // //         error.response?.data?.message ||
// // //           "Unable to delete this memory."
// // //       );
// // //     }
// // //   };

// // //   const handleEdit = (data) => {
// // //     setOpenEditModal({
// // //       isShown: true,
// // //       type: "edit",
// // //       data,
// // //     });
// // //   };

// // //   const updateIsFavourite = async (data) => {
// // //     const storyId = data._id;

// // //     try {
// // //       const response = await axiosInstance.put(
// // //         `/update-is-favourite/${storyId}`,
// // //         { isFavourite: !data.isFavourite }
// // //       );

// // //       if (response.data?.story) {
// // //         toast.success(
// // //           data.isFavourite
// // //             ? "Removed from favourites"
// // //             : "Added to favourites 💗"
// // //         );

// // //         if (filterType === "search" && searchQuery) {
// // //           onSearchNote(searchQuery);
// // //         } else if (filterType === "date") {
// // //           filterNotesByDate(dateRange);
// // //         } else {
// // //           getAllNotes();
// // //         }
// // //       }
// // //     } catch (error) {
// // //       toast.error("Unable to update your favourites.");
// // //     }
// // //   };

// // //   const handleViewNote = (data) => {
// // //     setOpenViewModal({
// // //       isShown: true,
// // //       data,
// // //     });
// // //   };

// // //   const onSearchNote = async (query) => {
// // //     try {
// // //       const response = await axiosInstance.get("/search", {
// // //         params: { query },
// // //       });

// // //       if (response.data?.stories) {
// // //         setFilterType("search");
// // //         setAllNotes(response.data.stories);
// // //       }
// // //     } catch (error) {
// // //       toast.error("Unable to search memories.");
// // //     }
// // //   };

// // //   const filterNotesByDate = async (day) => {
// // //     try {
// // //       if (!day?.from || !day?.to) return;

// // //       const startDate = moment(day.from).startOf("day").valueOf();
// // //       const endDate = moment(day.to).endOf("day").valueOf();

// // //       const response = await axiosInstance.get("/notes/filter", {
// // //         params: { startDate, endDate },
// // //       });

// // //       if (response.data?.stories) {
// // //         setFilterType("date");
// // //         setAllNotes(response.data.stories);
// // //       }
// // //     } catch (error) {
// // //       toast.error("Unable to filter memories by date.");
// // //     }
// // //   };

// // //   const handleDayClick = (day) => {
// // //     if (!day) return;

// // //     setDateRange(day);

// // //     if (day.from && day.to) {
// // //       filterNotesByDate(day);
// // //     }
// // //   };

// // //   const handleClearSearch = () => {
// // //     setSearchQuery("");
// // //     setDateRange({ from: null, to: null });
// // //     setFilterType("");
// // //     getAllNotes();
// // //   };

// // //   const resetFilter = () => {
// // //     setDateRange({ from: null, to: null });
// // //     setFilterType("");
// // //     setSearchQuery("");
// // //     getAllNotes();
// // //   };

// // //   useEffect(() => {
// // //     getUserInfo();
// // //     getAllNotes();
// // //   }, []);

// // //   const favouriteCount = allNotes.filter(
// // //     (note) => note.isFavourite
// // //   ).length;

// // //   const firstName =
// // //     userInfo?.fullName?.trim().split(/\s+/)[0] || "there";

// // //   return (
// // //     <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-[#160824] via-[#281044] to-[#102a52] text-white">
// // //       {/* Background decoration */}
// // //       <div className="pointer-events-none fixed -left-32 top-32 h-80 w-80 rounded-full bg-fuchsia-500/40 blur-[110px]" />
// // //       <div className="pointer-events-none fixed -right-32 top-64 h-96 w-96 rounded-full bg-blue-500/35 blur-[120px]" />
// // //       <div className="pointer-events-none fixed bottom-0 left-1/3 h-64 w-64 rounded-full bg-orange-500/25 blur-[110px]" />

// // //       {/* Navigation */}
// // //       <div className="relative z-30">
// // //         <Navbar
// // //           userInfo={userInfo}
// // //           searchQuery={searchQuery}
// // //           setSearchQuery={setSearchQuery}
// // //           onSearchNote={onSearchNote}
// // //           handleClearSearch={handleClearSearch}
// // //         />
// // //       </div>

// // //       <main className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pb-28 pt-7 sm:px-6 sm:pt-10 lg:px-10">
// // //         {/* Quick actions and calendar */}
// // //         <section className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
// // //           {/* SAVE THE LITTLE THINGS — unchanged */}
// // //           <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-br from-[#28103f] via-[#4c145f] to-[#172c67] p-6 text-white shadow-2xl shadow-fuchsia-950/30 sm:p-8">
// // //             <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full bg-fuchsia-500/50 blur-[80px]" />
// // //             <div className="pointer-events-none absolute -bottom-20 left-[30%] h-48 w-48 rounded-full bg-orange-500/40 blur-[80px]" />

// // //             <div className="relative flex h-full flex-col justify-between gap-8 sm:flex-row sm:items-center">
// // //               <div>
// // //                 <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold tracking-wide text-pink-100 backdrop-blur-xl">
// // //                   <Sparkles className="h-4 w-4 text-orange-300" />
// // //                   SAVE THE LITTLE THINGS
// // //                 </div>

// // //                 <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
// // //                   Add a new memory
// // //                   <span className="ml-2 bg-gradient-to-r from-pink-300 to-orange-300 bg-clip-text text-transparent">
// // //                     ♡
// // //                   </span>
// // //                 </h2>

// // //                 <p className="mt-3 max-w-lg text-sm leading-6 text-white/75 sm:text-base">
// // //                   Capture a special place, a beautiful day, or a moment
// // //                   you want to remember forever.
// // //                 </p>
// // //               </div>

// // //               <button
// // //                 type="button"
// // //                 onClick={() =>
// // //                   setOpenEditModal({
// // //                     isShown: true,
// // //                     type: "add",
// // //                     data: null,
// // //                   })
// // //                 }
// // //                 className="relative inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-400 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-fuchsia-950/30 transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-pink-500/30"
// // //               >
// // //                 <Plus className="h-5 w-5" />
// // //                 Create a memory
// // //               </button>
// // //             </div>
// // //           </div>

// // //           {/* Calendar — dark theme */}
// // //           <aside className="w-full">
// // //             <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#171023]/95 shadow-2xl shadow-purple-950/40 backdrop-blur-xl">
// // //               {/* Calendar header */}
// // //               <div className="border-b border-white/10 bg-gradient-to-r from-[#29123e] via-[#351444] to-[#172b50] p-5">
// // //                 <div className="flex items-center gap-3">
// // //                   <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-pink-300/20 bg-pink-400/10 text-pink-300">
// // //                     <CalendarDays className="h-5 w-5" />
// // //                   </div>

// // //                   <div>
// // //                     <h3 className="font-bold text-white">
// // //                       Memory timeline
// // //                     </h3>
// // //                     <p className="mt-0.5 text-xs text-slate-400">
// // //                       Find a special day
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               {/* Dark DayPicker */}
// // //               <div className="p-3 sm:p-4">
// // //                 <DayPicker
// // //                   mode="range"
// // //                   selected={dateRange}
// // //                   onSelect={handleDayClick}
// // //                   captionLayout="dropdown-buttons"
// // //                   pagedNavigation
// // //                   classNames={{
// // //                     ...defaultClassNames,
// // //                     root: `${defaultClassNames.root} mx-auto w-full text-slate-200`,
// // //                     months: `${defaultClassNames.months} w-full`,
// // //                     month: `${defaultClassNames.month} w-full space-y-3`,
// // //                     month_caption: `${defaultClassNames.month_caption} relative flex h-10 items-center justify-center`,
// // //                     caption_label: `${defaultClassNames.caption_label} font-bold text-white`,
// // //                     dropdowns: `${defaultClassNames.dropdowns} flex items-center justify-center gap-2`,
// // //                     dropdown: `${defaultClassNames.dropdown} rounded-lg border border-white/10 bg-[#251532] px-2 py-1.5 text-sm text-slate-200 outline-none focus:border-pink-400`,
// // //                     nav: `${defaultClassNames.nav} text-pink-300`,
// // //                     button_previous: `${defaultClassNames.button_previous} absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-pink-400/30 hover:bg-pink-500/15 hover:text-pink-200`,
// // //                     button_next: `${defaultClassNames.button_next} absolute right-0 top-1 flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-pink-400/30 hover:bg-pink-500/15 hover:text-pink-200`,
// // //                     month_grid: `${defaultClassNames.month_grid} w-full border-collapse`,
// // //                     weekdays: `${defaultClassNames.weekdays} flex w-full`,
// // //                     weekday: `${defaultClassNames.weekday} flex-1 py-2 text-center text-xs font-semibold uppercase text-slate-500`,
// // //                     week: `${defaultClassNames.week} mt-1 flex w-full`,
// // //                     day: `${defaultClassNames.day} relative flex-1 p-0 text-center text-sm`,
// // //                     day_button: `${defaultClassNames.day_button} mx-auto flex h-9 w-9 items-center justify-center rounded-xl text-sm text-slate-300 transition hover:bg-pink-500/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-400`,
// // //                     today: `${defaultClassNames.today} font-bold text-pink-300`,
// // //                     selected: `${defaultClassNames.selected} [&>button]:bg-gradient-to-br [&>button]:from-pink-500 [&>button]:to-fuchsia-600 [&>button]:font-bold [&>button]:text-white [&>button]:shadow-lg [&>button]:shadow-pink-500/20`,
// // //                     range_start: `${defaultClassNames.range_start} rounded-l-xl bg-pink-500/15 [&>button]:bg-gradient-to-br [&>button]:from-pink-500 [&>button]:to-fuchsia-600 [&>button]:text-white`,
// // //                     range_end: `${defaultClassNames.range_end} rounded-r-xl bg-pink-500/15 [&>button]:bg-gradient-to-br [&>button]:from-pink-500 [&>button]:to-fuchsia-600 [&>button]:text-white`,
// // //                     range_middle: `${defaultClassNames.range_middle} bg-pink-500/15 text-pink-100`,
// // //                     outside: `${defaultClassNames.outside} opacity-30`,
// // //                     disabled: `${defaultClassNames.disabled} cursor-not-allowed opacity-25`,
// // //                     hidden: `${defaultClassNames.hidden} invisible`,
// // //                   }}
// // //                 />
// // //               </div>

// // //               {/* Date range footer */}
// // //               <div className="border-t border-white/10 bg-black/10 px-5 py-4">
// // //                 <div className="flex items-start gap-2.5">
// // //                   <Heart className="mt-0.5 h-4 w-4 shrink-0 fill-pink-400/20 text-pink-300" />

// // //                   <p className="text-xs leading-5 text-slate-400">
// // //                     Select a start and end date to discover the memories
// // //                     you made during that time.
// // //                   </p>
// // //                 </div>

// // //                 {dateRange.from && (
// // //                   <div className="mt-3 rounded-xl border border-pink-400/15 bg-pink-500/[0.08] px-3 py-2 text-xs font-medium text-pink-200">
// // //                     <span>
// // //                       {moment(dateRange.from).format("MMM D, YYYY")}
// // //                     </span>

// // //                     {dateRange.to && (
// // //                       <>
// // //                         <span className="mx-2 text-pink-400">→</span>
// // //                         <span>
// // //                           {moment(dateRange.to).format("MMM D, YYYY")}
// // //                         </span>
// // //                       </>
// // //                     )}

// // //                     {!dateRange.to && (
// // //                       <span className="ml-2 text-slate-400">
// // //                         — select an end date
// // //                       </span>
// // //                     )}
// // //                   </div>
// // //                 )}

// // //                 {(filterType === "date" || dateRange.from) && (
// // //                   <button
// // //                     type="button"
// // //                     onClick={resetFilter}
// // //                     className="mt-3 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-pink-400/30 hover:bg-pink-500/10 hover:text-pink-200"
// // //                   >
// // //                     Clear date filter
// // //                   </button>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </aside>
// // //         </section>

// // //         {/* Welcome hero */}
// // //         <section className="relative mb-8 overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-r from-[#3b104f]/95 via-[#55145f]/90 to-[#182d67]/95 p-6 shadow-[0_20px_60px_-30px_rgba(219,39,119,0.3)] sm:p-9 lg:p-11">
// // //           <div className="pointer-events-none absolute -right-8 -top-16 h-56 w-56 rounded-full border-[35px] border-white/30" />
// // //           <div className="pointer-events-none absolute -bottom-20 right-36 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

// // //           <Heart className="absolute right-[18%] top-8 hidden h-6 w-6 animate-pulse fill-pink-300/70 text-pink-300/70 sm:block" />
// // //           <Sparkles className="absolute bottom-9 right-12 hidden h-7 w-7 text-orange-300 sm:block" />

// // //           <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-center">
// // //             <div className="max-w-2xl">
// // //               <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold tracking-wide text-pink-100 shadow-sm backdrop-blur-md">
// // //                 <Sparkles className="h-4 w-4" />
// // //                 YOUR PERSONAL MEMORY JOURNAL
// // //               </div>

// // //               <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
// // //                 Every moment has
// // //                 <span className="block bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 bg-clip-text pb-1 text-transparent">
// // //                   a story to tell.
// // //                 </span>
// // //               </h1>

// // //               <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
// // //                 Welcome back, {firstName}! Keep your favourite memories,
// // //                 revisit special places, and hold on to the little things
// // //                 that make life beautiful.
// // //               </p>

// // //               <button
// // //                 type="button"
// // //                 onClick={() =>
// // //                   setOpenEditModal({
// // //                     isShown: true,
// // //                     type: "add",
// // //                     data: null,
// // //                   })
// // //                 }
// // //                 className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-900/30 transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
// // //               >
// // //                 <Plus className="h-5 w-5" />
// // //                 Create a memory
// // //               </button>
// // //             </div>

// // //             {/* Hero illustration */}
// // //             <div className="hidden shrink-0 items-center justify-center md:flex">
// // //               <div className="relative flex h-40 w-40 items-center justify-center rounded-[2.5rem] border border-white/20 bg-white/10 shadow-xl backdrop-blur-lg lg:h-48 lg:w-48">
// // //                 <div className="absolute inset-3 rounded-[2rem] border border-white/20" />

// // //                 <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-pink-400 via-rose-400 to-purple-500 shadow-xl lg:h-28 lg:w-28">
// // //                   <BookHeart className="h-12 w-12 text-white lg:h-14 lg:w-14" />
// // //                 </div>

// // //                 <div className="absolute -right-3 top-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-[#27103e] shadow-lg">
// // //                   <Heart className="h-5 w-5 fill-pink-400 text-pink-400" />
// // //                 </div>

// // //                 <div className="absolute -bottom-3 -left-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-[#27103e] shadow-lg">
// // //                   <Sparkles className="h-5 w-5 text-orange-300" />
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </section>

// // //         {/* Stats */}
// // //         <section className="mb-8 grid grid-cols-2 gap-3 sm:gap-5">
// // //           <div className="group flex items-center gap-3 rounded-2xl border border-white/20 bg-white/95 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:gap-4 sm:p-5">
// // //             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-pink-500 sm:h-12 sm:w-12">
// // //               <BookHeart className="h-5 w-5 sm:h-6 sm:w-6" />
// // //             </div>

// // //             <div className="min-w-0">
// // //               <p className="text-2xl font-bold text-purple-950 sm:text-3xl">
// // //                 {allNotes.length}
// // //               </p>
// // //               <p className="truncate text-xs text-gray-500 sm:text-sm">
// // //                 Memories shown
// // //               </p>
// // //             </div>
// // //           </div>

// // //           <div className="group flex items-center gap-3 rounded-2xl border border-white/20 bg-white/95 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:gap-4 sm:p-5">
// // //             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-500 sm:h-12 sm:w-12">
// // //               <Heart className="h-5 w-5 fill-purple-300 sm:h-6 sm:w-6" />
// // //             </div>

// // //             <div className="min-w-0">
// // //               <p className="text-2xl font-bold text-purple-950 sm:text-3xl">
// // //                 {favouriteCount}
// // //               </p>
// // //               <p className="truncate text-xs text-gray-500 sm:text-sm">
// // //                 Favourites shown
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </section>

// // //         {/* Connections panel */}
// // //         <section className="mb-10">
// // //           <ConnectionPanel />
// // //         </section>

// // //         {/* Memory collection heading */}
// // //         <section className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
// // //           <div>
// // //             <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-pink-300">
// // //               <Images className="h-4 w-4" />
// // //               YOUR COLLECTION
// // //             </div>

// // //             <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
// // //               Your memories
// // //               <span className="ml-2 text-pink-300">♡</span>
// // //             </h2>

// // //             <p className="mt-2 text-sm text-white/60">
// // //               Little moments, beautifully remembered.
// // //             </p>
// // //           </div>

// // //           <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-xs font-medium text-white/70">
// // //             <ArrowDownWideNarrow className="h-4 w-4 text-pink-300" />
// // //             Your story collection
// // //           </div>
// // //         </section>

// // //         {/* Memories collection */}
// // //         <section className="w-full">
// // //           <FilterInfoTitle
// // //             filterType={filterType}
// // //             filterDates={dateRange}
// // //             onClear={resetFilter}
// // //           />

// // //           {allNotes.length > 0 ? (
// // //             <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-3">
// // //               {allNotes.map((item) => (
// // //                 <NotesCard
// // //                   key={item._id}
// // //                   imageUrl={item.imageUrl}
// // //                   title={item.title}
// // //                   date={item.visitedDate}
// // //                   story={item.story}
// // //                   visitedLocation={item.visitedLocation}
// // //                   isFavourite={item.isFavourite}
// // //                   onFavouriteClick={() => updateIsFavourite(item)}
// // //                   onClick={() => handleViewNote(item)}
// // //                 />
// // //               ))}
// // //             </div>
// // //           ) : (
// // //             <div className="mt-5 rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 sm:p-6">
// // //               <EmptyCard
// // //                 imgSrc={emptyImg}
// // //                 message={getEmptyCardMessage(filterType)}
// // //               />
// // //             </div>
// // //           )}
// // //         </section>
// // //       </main>

// // //       {/* Add/Edit modal */}
// // //       <Modal
// // //         isOpen={openEditModal.isShown}
// // //         onRequestClose={() =>
// // //           setOpenEditModal({
// // //             isShown: false,
// // //             type: "add",
// // //             data: null,
// // //           })
// // //         }
// // //         appElement={document.getElementById("root")}
// // //         overlayClassName="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-gray-900/50 p-3 backdrop-blur-sm sm:p-6"
// // //         className="relative my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/80 bg-white shadow-2xl outline-none"
// // //       >
// // //         <AddEditNote
// // //           type={openEditModal.type}
// // //           storyInfo={openEditModal.data}
// // //           onClose={() =>
// // //             setOpenEditModal({
// // //               isShown: false,
// // //               type: "add",
// // //               data: null,
// // //             })
// // //           }
// // //           getAllNotes={getAllNotes}
// // //         />
// // //       </Modal>

// // //       {/* View note modal */}
// // //       <Modal
// // //         isOpen={openViewModal.isShown}
// // //         onRequestClose={() =>
// // //           setOpenViewModal({ isShown: false, data: null })
// // //         }
// // //         appElement={document.getElementById("root")}
// // //         overlayClassName="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-gray-900/50 p-3 backdrop-blur-sm sm:p-6"
// // //         className="relative my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/80 bg-white shadow-2xl outline-none"
// // //       >
// // //         <ViewNote
// // //           type={openViewModal.type}
// // //           storyInfo={openViewModal.data}
// // //           onClose={() =>
// // //             setOpenViewModal((previous) => ({
// // //               ...previous,
// // //               isShown: false,
// // //             }))
// // //           }
// // //           handleEdit={() => {
// // //             setOpenViewModal((previous) => ({
// // //               ...previous,
// // //               isShown: false,
// // //             }));
// // //             handleEdit(openViewModal.data || null);
// // //           }}
// // //           handleDelete={() => handleDelete(openViewModal.data || null)}
// // //         />
// // //       </Modal>

// // //       {/* Floating add button */}
// // //       <button
// // //         type="button"
// // //         aria-label="Create a new memory"
// // //         onClick={() =>
// // //           setOpenEditModal({
// // //             isShown: true,
// // //             type: "add",
// // //             data: null,
// // //           })
// // //         }
// // //         className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-orange-400 text-white shadow-xl shadow-pink-950/40 transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl active:scale-95 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
// // //       >
// // //         <Plus className="h-7 w-7 transition-transform duration-300 group-hover:rotate-90 sm:h-8 sm:w-8" />
// // //         <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl border border-pink-100 bg-white px-3 py-2 text-xs font-semibold text-pink-600 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
// // //           Create a memory
// // //         </span>
// // //       </button>

// // //       <ToastContainer
// // //         position="bottom-right"
// // //         autoClose={2500}
// // //         theme="dark"
// // //         toastClassName="!rounded-2xl !border !border-white/10 !shadow-lg"
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default Home;



// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   Heart,
// //   Sparkles,
// //   BookHeart,
// //   CalendarDays,
// //   Plus,
// //   ArrowDownWideNarrow,
// //   Images,
// // } from "lucide-react";

// // import Navbar from "../../Components/Navbar";
// // import ConnectionPanel from "../../Components/ConnectionPanel";
// // import axiosInstance from "../../utils/axiosinstance";
// // import NotesCard from "../../Components/Card/NotesCard";
// // import AddEditNote from "./AddEditNote";
// // import ViewNote from "./ViewNote";
// // import FilterInfoTitle from "../../Components/Card/FilterInfoTitle";
// // import Modal from "react-modal";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import EmptyCard from "../../Components/Card/EmptyCard";
// // import emptyImg from "../../images/emptyImg.jpg";
// // import { DayPicker, getDefaultClassNames } from "react-day-picker";
// // import "react-day-picker/style.css";
// // import moment from "moment";
// // import { getEmptyCardMessage } from "../../utils/helper";

// // const Home = () => {
// //   const navigate = useNavigate();
// //   const defaultClassNames = getDefaultClassNames();

// //   const [userInfo, setUserInfo] = useState(null);
// //   const [allNotes, setAllNotes] = useState([]);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [filterType, setFilterType] = useState("");
// //   const [dateRange, setDateRange] = useState({
// //     from: null,
// //     to: null,
// //   });

// //   const [openEditModal, setOpenEditModal] = useState({
// //     isShown: false,
// //     type: "add",
// //     data: null,
// //   });

// //   const [openViewModal, setOpenViewModal] = useState({
// //     isShown: false,
// //     data: null,
// //   });

// //   const getUserInfo = async () => {
// //     try {
// //       const response = await axiosInstance.get("/get-user");

// //       if (response.data?.user) {
// //         setUserInfo(response.data.user);
// //       }
// //     } catch (error) {
// //       if (error.response?.status === 401) {
// //         localStorage.clear();
// //         navigate("/login");
// //       } else {
// //         console.error("Unable to fetch user information.");
// //       }
// //     }
// //   };

// //   const getAllNotes = async () => {
// //     try {
// //       const response = await axiosInstance.get("/getall-stories");

// //       if (response.data?.stories) {
// //         setAllNotes(response.data.stories);
// //       }
// //     } catch (error) {
// //       console.error("Unable to fetch notes.");
// //     }
// //   };

// //   const handleDelete = async (data) => {
// //     if (!data?._id) return;

// //     try {
// //       const response = await axiosInstance.delete(
// //         `/delete-story/${data._id}`
// //       );

// //       if (response.data && !response.data.error) {
// //         toast.success("Memory deleted successfully 💗");
// //         setOpenViewModal({ isShown: false, data: null });
// //         getAllNotes();
// //       }
// //     } catch (error) {
// //       toast.error(
// //         error.response?.data?.message ||
// //           "Unable to delete this memory."
// //       );
// //     }
// //   };

// //   const handleEdit = (data) => {
// //     setOpenEditModal({
// //       isShown: true,
// //       type: "edit",
// //       data,
// //     });
// //   };

// //   const updateIsFavourite = async (data) => {
// //     const storyId = data._id;

// //     try {
// //       const response = await axiosInstance.put(
// //         `/update-is-favourite/${storyId}`,
// //         { isFavourite: !data.isFavourite }
// //       );

// //       if (response.data?.story) {
// //         toast.success(
// //           data.isFavourite
// //             ? "Removed from favourites"
// //             : "Added to favourites 💗"
// //         );

// //         if (filterType === "search" && searchQuery) {
// //           onSearchNote(searchQuery);
// //         } else if (filterType === "date") {
// //           filterNotesByDate(dateRange);
// //         } else {
// //           getAllNotes();
// //         }
// //       }
// //     } catch (error) {
// //       toast.error("Unable to update your favourites.");
// //     }
// //   };

// //   const handleViewNote = (data) => {
// //     setOpenViewModal({
// //       isShown: true,
// //       data,
// //     });
// //   };

// //   const onSearchNote = async (query) => {
// //     try {
// //       const response = await axiosInstance.get("/search", {
// //         params: { query },
// //       });

// //       if (response.data?.stories) {
// //         setFilterType("search");
// //         setAllNotes(response.data.stories);
// //       }
// //     } catch (error) {
// //       toast.error("Unable to search memories.");
// //     }
// //   };

// //   const filterNotesByDate = async (day) => {
// //     try {
// //       if (!day?.from || !day?.to) return;

// //       const startDate = moment(day.from).startOf("day").valueOf();
// //       const endDate = moment(day.to).endOf("day").valueOf();

// //       const response = await axiosInstance.get("/notes/filter", {
// //         params: { startDate, endDate },
// //       });

// //       if (response.data?.stories) {
// //         setFilterType("date");
// //         setAllNotes(response.data.stories);
// //       }
// //     } catch (error) {
// //       toast.error("Unable to filter memories by date.");
// //     }
// //   };

// //   const handleDayClick = (day) => {
// //     if (!day) return;

// //     setDateRange(day);

// //     if (day.from && day.to) {
// //       filterNotesByDate(day);
// //     }
// //   };

// //   const handleClearSearch = () => {
// //     setSearchQuery("");
// //     setDateRange({ from: null, to: null });
// //     setFilterType("");
// //     getAllNotes();
// //   };

// //   const resetFilter = () => {
// //     setDateRange({ from: null, to: null });
// //     setFilterType("");
// //     setSearchQuery("");
// //     getAllNotes();
// //   };

// //   useEffect(() => {
// //     getUserInfo();
// //     getAllNotes();
// //   }, []);

// //   const favouriteCount = allNotes.filter(
// //     (note) => note.isFavourite
// //   ).length;

// //   return (
// //     <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-[#160824] via-[#281044] to-[#102a52] text-white">
// //       {/* Background decoration */}
// //       <div className="pointer-events-none fixed -left-32 top-32 h-80 w-80 rounded-full bg-fuchsia-500/40 blur-[110px]" />
// //       <div className="pointer-events-none fixed -right-32 top-64 h-96 w-96 rounded-full bg-blue-500/35 blur-[120px]" />
// //       <div className="pointer-events-none fixed bottom-0 left-1/3 h-64 w-64 rounded-full bg-orange-500/25 blur-[110px]" />

// //       {/* Navigation */}
// //       <div className="relative z-30">
// //         <Navbar
// //           userInfo={userInfo}
// //           searchQuery={searchQuery}
// //           setSearchQuery={setSearchQuery}
// //           onSearchNote={onSearchNote}
// //           handleClearSearch={handleClearSearch}
// //         />
// //       </div>

// //       <main className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pb-28 pt-7 sm:px-6 sm:pt-10 lg:px-10">
// //         {/* Calendar */}
// //         <section className="mb-8 flex justify-end">
// //           <aside className="w-full max-w-[380px]">
// //             <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#171023]/95 shadow-2xl shadow-purple-950/40 backdrop-blur-xl">
// //               {/* Calendar header */}
// //               <div className="border-b border-white/10 bg-gradient-to-r from-[#29123e] via-[#351444] to-[#172b50] p-5">
// //                 <div className="flex items-center gap-3">
// //                   <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-pink-300/20 bg-pink-400/10 text-pink-300">
// //                     <CalendarDays className="h-5 w-5" />
// //                   </div>

// //                   <div>
// //                     <h3 className="font-bold text-white">
// //                       Memory timeline
// //                     </h3>
// //                     <p className="mt-0.5 text-xs text-slate-400">
// //                       Find a special day
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Dark DayPicker */}
// //               <div className="p-3 sm:p-4">
// //                 <DayPicker
// //                   mode="range"
// //                   selected={dateRange}
// //                   onSelect={handleDayClick}
// //                   captionLayout="dropdown-buttons"
// //                   pagedNavigation
// //                   classNames={{
// //                     ...defaultClassNames,
// //                     root: `${defaultClassNames.root} mx-auto w-full text-slate-200`,
// //                     months: `${defaultClassNames.months} w-full`,
// //                     month: `${defaultClassNames.month} w-full space-y-3`,
// //                     month_caption: `${defaultClassNames.month_caption} relative flex h-10 items-center justify-center`,
// //                     caption_label: `${defaultClassNames.caption_label} font-bold text-white`,
// //                     dropdowns: `${defaultClassNames.dropdowns} flex items-center justify-center gap-2`,
// //                     dropdown: `${defaultClassNames.dropdown} rounded-lg border border-white/10 bg-[#251532] px-2 py-1.5 text-sm text-slate-200 outline-none focus:border-pink-400`,
// //                     nav: `${defaultClassNames.nav} text-pink-300`,
// //                     button_previous: `${defaultClassNames.button_previous} absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-pink-400/30 hover:bg-pink-500/15 hover:text-pink-200`,
// //                     button_next: `${defaultClassNames.button_next} absolute right-0 top-1 flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-pink-400/30 hover:bg-pink-500/15 hover:text-pink-200`,
// //                     month_grid: `${defaultClassNames.month_grid} w-full border-collapse`,
// //                     weekdays: `${defaultClassNames.weekdays} flex w-full`,
// //                     weekday: `${defaultClassNames.weekday} flex-1 py-2 text-center text-xs font-semibold uppercase text-slate-500`,
// //                     week: `${defaultClassNames.week} mt-1 flex w-full`,
// //                     day: `${defaultClassNames.day} relative flex-1 p-0 text-center text-sm`,
// //                     day_button: `${defaultClassNames.day_button} mx-auto flex h-9 w-9 items-center justify-center rounded-xl text-sm text-slate-300 transition hover:bg-pink-500/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-400`,
// //                     today: `${defaultClassNames.today} font-bold text-pink-300`,
// //                     selected: `${defaultClassNames.selected} [&>button]:bg-gradient-to-br [&>button]:from-pink-500 [&>button]:to-fuchsia-600 [&>button]:font-bold [&>button]:text-white [&>button]:shadow-lg [&>button]:shadow-pink-500/20`,
// //                     range_start: `${defaultClassNames.range_start} rounded-l-xl bg-pink-500/15 [&>button]:bg-gradient-to-br [&>button]:from-pink-500 [&>button]:to-fuchsia-600 [&>button]:text-white`,
// //                     range_end: `${defaultClassNames.range_end} rounded-r-xl bg-pink-500/15 [&>button]:bg-gradient-to-br [&>button]:from-pink-500 [&>button]:to-fuchsia-600 [&>button]:text-white`,
// //                     range_middle: `${defaultClassNames.range_middle} bg-pink-500/15 text-pink-100`,
// //                     outside: `${defaultClassNames.outside} opacity-30`,
// //                     disabled: `${defaultClassNames.disabled} cursor-not-allowed opacity-25`,
// //                     hidden: `${defaultClassNames.hidden} invisible`,
// //                   }}
// //                 />
// //               </div>

// //               {/* Date range footer */}
// //               <div className="border-t border-white/10 bg-black/10 px-5 py-4">
// //                 <div className="flex items-start gap-2.5">
// //                   <Heart className="mt-0.5 h-4 w-4 shrink-0 fill-pink-400/20 text-pink-300" />

// //                   <p className="text-xs leading-5 text-slate-400">
// //                     Select a start and end date to discover the memories
// //                     you made during that time.
// //                   </p>
// //                 </div>

// //                 {dateRange.from && (
// //                   <div className="mt-3 rounded-xl border border-pink-400/15 bg-pink-500/[0.08] px-3 py-2 text-xs font-medium text-pink-200">
// //                     <span>
// //                       {moment(dateRange.from).format("MMM D, YYYY")}
// //                     </span>

// //                     {dateRange.to && (
// //                       <>
// //                         <span className="mx-2 text-pink-400">→</span>
// //                         <span>
// //                           {moment(dateRange.to).format("MMM D, YYYY")}
// //                         </span>
// //                       </>
// //                     )}

// //                     {!dateRange.to && (
// //                       <span className="ml-2 text-slate-400">
// //                         — select an end date
// //                       </span>
// //                     )}
// //                   </div>
// //                 )}

// //                 {(filterType === "date" || dateRange.from) && (
// //                   <button
// //                     type="button"
// //                     onClick={resetFilter}
// //                     className="mt-3 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-pink-400/30 hover:bg-pink-500/10 hover:text-pink-200"
// //                   >
// //                     Clear date filter
// //                   </button>
// //                 )}
// //               </div>
// //             </div>
// //           </aside>
// //         </section>

// //         {/* Stats */}
// //         <section className="mb-8 grid grid-cols-2 gap-3 sm:gap-5">
// //           <div className="group flex items-center gap-3 rounded-2xl border border-white/20 bg-white/95 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:gap-4 sm:p-5">
// //             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-pink-500 sm:h-12 sm:w-12">
// //               <BookHeart className="h-5 w-5 sm:h-6 sm:w-6" />
// //             </div>

// //             <div className="min-w-0">
// //               <p className="text-2xl font-bold text-purple-950 sm:text-3xl">
// //                 {allNotes.length}
// //               </p>
// //               <p className="truncate text-xs text-gray-500 sm:text-sm">
// //                 Memories shown
// //               </p>
// //             </div>
// //           </div>

// //           <div className="group flex items-center gap-3 rounded-2xl border border-white/20 bg-white/95 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:gap-4 sm:p-5">
// //             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-500 sm:h-12 sm:w-12">
// //               <Heart className="h-5 w-5 fill-purple-300 sm:h-6 sm:w-6" />
// //             </div>

// //             <div className="min-w-0">
// //               <p className="text-2xl font-bold text-purple-950 sm:text-3xl">
// //                 {favouriteCount}
// //               </p>
// //               <p className="truncate text-xs text-gray-500 sm:text-sm">
// //                 Favourites shown
// //               </p>
// //             </div>
// //           </div>
// //         </section>

// //         {/* Connections panel */}
// //         <section className="mb-10">
// //           <ConnectionPanel />
// //         </section>

// //         {/* Memory collection heading */}
// //         <section className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
// //           <div>
// //             <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-pink-300">
// //               <Images className="h-4 w-4" />
// //               YOUR COLLECTION
// //             </div>

// //             <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
// //               Your memories
// //               <span className="ml-2 text-pink-300">♡</span>
// //             </h2>

// //             <p className="mt-2 text-sm text-white/60">
// //               Little moments, beautifully remembered.
// //             </p>
// //           </div>

// //           <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-xs font-medium text-white/70">
// //             <ArrowDownWideNarrow className="h-4 w-4 text-pink-300" />
// //             Your story collection
// //           </div>
// //         </section>

// //         {/* Memories collection */}
// //         <section className="w-full">
// //           <FilterInfoTitle
// //             filterType={filterType}
// //             filterDates={dateRange}
// //             onClear={resetFilter}
// //           />

// //           {allNotes.length > 0 ? (
// //             <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-3">
// //               {allNotes.map((item) => (
// //                 <NotesCard
// //                   key={item._id}
// //                   imageUrl={item.imageUrl}
// //                   title={item.title}
// //                   date={item.visitedDate}
// //                   story={item.story}
// //                   visitedLocation={item.visitedLocation}
// //                   isFavourite={item.isFavourite}
// //                   onFavouriteClick={() => updateIsFavourite(item)}
// //                   onClick={() => handleViewNote(item)}
// //                 />
// //               ))}
// //             </div>
// //           ) : (
// //             <div className="mt-5 rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 sm:p-6">
// //               <EmptyCard
// //                 imgSrc={emptyImg}
// //                 message={getEmptyCardMessage(filterType)}
// //               />
// //             </div>
// //           )}
// //         </section>
// //       </main>

// //       {/* Add/Edit modal */}
// //       <Modal
// //         isOpen={openEditModal.isShown}
// //         onRequestClose={() =>
// //           setOpenEditModal({
// //             isShown: false,
// //             type: "add",
// //             data: null,
// //           })
// //         }
// //         appElement={document.getElementById("root")}
// //         overlayClassName="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-gray-900/50 p-3 backdrop-blur-sm sm:p-6"
// //         className="relative my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/80 bg-white shadow-2xl outline-none"
// //       >
// //         <AddEditNote
// //           type={openEditModal.type}
// //           storyInfo={openEditModal.data}
// //           onClose={() =>
// //             setOpenEditModal({
// //               isShown: false,
// //               type: "add",
// //               data: null,
// //             })
// //           }
// //           getAllNotes={getAllNotes}
// //         />
// //       </Modal>

// //       {/* View note modal */}
// //       <Modal
// //         isOpen={openViewModal.isShown}
// //         onRequestClose={() =>
// //           setOpenViewModal({ isShown: false, data: null })
// //         }
// //         appElement={document.getElementById("root")}
// //         overlayClassName="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-gray-900/50 p-3 backdrop-blur-sm sm:p-6"
// //         className="relative my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/80 bg-white shadow-2xl outline-none"
// //       >
// //         <ViewNote
// //           type={openViewModal.type}
// //           storyInfo={openViewModal.data}
// //           onClose={() =>
// //             setOpenViewModal((previous) => ({
// //               ...previous,
// //               isShown: false,
// //             }))
// //           }
// //           handleEdit={() => {
// //             setOpenViewModal((previous) => ({
// //               ...previous,
// //               isShown: false,
// //             }));
// //             handleEdit(openViewModal.data || null);
// //           }}
// //           handleDelete={() => handleDelete(openViewModal.data || null)}
// //         />
// //       </Modal>

// //       {/* Floating add button */}
// //       <button
// //         type="button"
// //         aria-label="Create a new memory"
// //         onClick={() =>
// //           setOpenEditModal({
// //             isShown: true,
// //             type: "add",
// //             data: null,
// //           })
// //         }
// //         className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-orange-400 text-white shadow-xl shadow-pink-950/40 transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl active:scale-95 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
// //       >
// //         <Plus className="h-7 w-7 transition-transform duration-300 group-hover:rotate-90 sm:h-8 sm:w-8" />
// //         <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl border border-pink-100 bg-white px-3 py-2 text-xs font-semibold text-pink-600 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
// //           Create a memory
// //         </span>
// //       </button>

// //       <ToastContainer
// //         position="bottom-right"
// //         autoClose={2500}
// //         theme="dark"
// //         toastClassName="!rounded-2xl !border !border-white/10 !shadow-lg"
// //       />
// //     </div>
// //   );
// // };

// // export default Home;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Heart,
//   Sparkles,
//   BookHeart,
//   CalendarDays,
//   Plus,
//   ArrowDownWideNarrow,
//   Images,
// } from "lucide-react";

// import Navbar from "../../Components/Navbar";
// import ConnectionPanel from "../../Components/ConnectionPanel";
// import axiosInstance from "../../utils/axiosinstance";
// import NotesCard from "../../Components/Card/NotesCard";
// import AddEditNote from "./AddEditNote";
// import ViewNote from "./ViewNote";
// import FilterInfoTitle from "../../Components/Card/FilterInfoTitle";
// import Modal from "react-modal";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import EmptyCard from "../../Components/Card/EmptyCard";
// import emptyImg from "../../images/emptyImg.jpg";
// import { DayPicker, getDefaultClassNames } from "react-day-picker";
// import "react-day-picker/style.css";
// import moment from "moment";
// import { getEmptyCardMessage } from "../../utils/helper";

// const Home = () => {
//   const navigate = useNavigate();
//   const defaultClassNames = getDefaultClassNames();

//   const [userInfo, setUserInfo] = useState(null);
//   const [allNotes, setAllNotes] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterType, setFilterType] = useState("");
//   const [dateRange, setDateRange] = useState({
//     from: null,
//     to: null,
//   });

//   const [openEditModal, setOpenEditModal] = useState({
//     isShown: false,
//     type: "add",
//     data: null,
//   });

//   const [openViewModal, setOpenViewModal] = useState({
//     isShown: false,
//     data: null,
//   });

//   // Fetch user information
//   const getUserInfo = async () => {
//     try {
//       const response = await axiosInstance.get("/get-user");

//       if (response.data?.user) {
//         setUserInfo(response.data.user);
//       }
//     } catch (error) {
//       if (error.response?.status === 401) {
//         localStorage.clear();
//         navigate("/login");
//       } else {
//         console.error("Unable to fetch user information.");
//       }
//     }
//   };

//   // Fetch all memories
//   const getAllNotes = async () => {
//     try {
//       const response = await axiosInstance.get("/getall-stories");

//       if (response.data?.stories) {
//         setAllNotes(response.data.stories);
//       }
//     } catch (error) {
//       console.error("Unable to fetch notes.");
//     }
//   };

//   // Delete memory
//   const handleDelete = async (data) => {
//     if (!data?._id) return;

//     try {
//       const response = await axiosInstance.delete(
//         `/delete-story/${data._id}`
//       );

//       if (response.data && !response.data.error) {
//         toast.success("Memory deleted successfully 💗");
//         setOpenViewModal({ isShown: false, data: null });
//         getAllNotes();
//       }
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message ||
//           "Unable to delete this memory."
//       );
//     }
//   };

//   // Edit memory
//   const handleEdit = (data) => {
//     setOpenEditModal({
//       isShown: true,
//       type: "edit",
//       data,
//     });
//   };

//   // Toggle favourite
//   const updateIsFavourite = async (data) => {
//     const storyId = data._id;

//     try {
//       const response = await axiosInstance.put(
//         `/update-is-favourite/${storyId}`,
//         { isFavourite: !data.isFavourite }
//       );

//       if (response.data?.story) {
//         toast.success(
//           data.isFavourite
//             ? "Removed from favourites"
//             : "Added to favourites 💗"
//         );

//         if (filterType === "search" && searchQuery) {
//           onSearchNote(searchQuery);
//         } else if (filterType === "date") {
//           filterNotesByDate(dateRange);
//         } else {
//           getAllNotes();
//         }
//       }
//     } catch (error) {
//       toast.error("Unable to update your favourites.");
//     }
//   };

//   // View memory
//   const handleViewNote = (data) => {
//     setOpenViewModal({
//       isShown: true,
//       data,
//     });
//   };

//   // Search memories
//   const onSearchNote = async (query) => {
//     try {
//       const response = await axiosInstance.get("/search", {
//         params: { query },
//       });

//       if (response.data?.stories) {
//         setFilterType("search");
//         setAllNotes(response.data.stories);
//       }
//     } catch (error) {
//       toast.error("Unable to search memories.");
//     }
//   };

//   // Filter memories by date range
//   const filterNotesByDate = async (day) => {
//     try {
//       if (!day?.from || !day?.to) return;

//       const startDate = moment(day.from).startOf("day").valueOf();
//       const endDate = moment(day.to).endOf("day").valueOf();

//       const response = await axiosInstance.get("/notes/filter", {
//         params: { startDate, endDate },
//       });

//       if (response.data?.stories) {
//         setFilterType("date");
//         setAllNotes(response.data.stories);
//       }
//     } catch (error) {
//       toast.error("Unable to filter memories by date.");
//     }
//   };

//   // Select dates in DayPicker
//   const handleDayClick = (day) => {
//     if (!day) return;

//     setDateRange(day);

//     if (day.from && day.to) {
//       filterNotesByDate(day);
//     }
//   };

//   // Clear search
//   const handleClearSearch = () => {
//     setSearchQuery("");
//     setDateRange({ from: null, to: null });
//     setFilterType("");
//     getAllNotes();
//   };

//   // Reset filters
//   const resetFilter = () => {
//     setDateRange({ from: null, to: null });
//     setFilterType("");
//     setSearchQuery("");
//     getAllNotes();
//   };

//   useEffect(() => {
//     getUserInfo();
//     getAllNotes();
//   }, []);

//   const favouriteCount = allNotes.filter(
//     (note) => note.isFavourite
//   ).length;

//   return (
//     <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-[#160824] via-[#281044] to-[#102a52] text-white">
//       {/* Background glow effects */}
//       <div className="pointer-events-none fixed -left-32 top-32 h-80 w-80 rounded-full bg-fuchsia-500/30 blur-[110px]" />
//       <div className="pointer-events-none fixed -right-32 top-64 h-96 w-96 rounded-full bg-blue-500/25 blur-[120px]" />
//       <div className="pointer-events-none fixed bottom-0 left-1/3 h-64 w-64 rounded-full bg-orange-500/15 blur-[110px]" />

//       {/* Navbar */}
//       <div className="relative z-30">
//         <Navbar
//           userInfo={userInfo}
//           searchQuery={searchQuery}
//           setSearchQuery={setSearchQuery}
//           onSearchNote={onSearchNote}
//           handleClearSearch={handleClearSearch}
//         />
//       </div>

//       <main className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pb-28 pt-7 sm:px-6 sm:pt-10 lg:px-10">
//         {/* Stats on left + DayPicker on right */}
//         <section className="mb-8 grid grid-cols-1 items-stretch gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
//           {/* Left side: statistics */}
//           <div className="grid grid-cols-1 content-start gap-4 sm:grid-cols-2">
//             {/* Memories shown */}
//             <div className="group relative flex min-h-[150px] items-center gap-4 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#28103f]/95 via-[#301541]/95 to-[#17274b]/95 p-5 shadow-xl shadow-purple-950/20 transition duration-300 hover:-translate-y-1 hover:border-pink-300/30 hover:shadow-pink-950/20 sm:p-6">
//               <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-fuchsia-500/15 blur-2xl transition group-hover:bg-fuchsia-500/25" />

//               <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-pink-300/20 bg-gradient-to-br from-pink-500/20 to-fuchsia-500/10 text-pink-300 shadow-lg shadow-pink-950/20">
//                 <BookHeart className="h-7 w-7" />
//               </div>

//               <div className="relative min-w-0">
//                 <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
//                   {allNotes.length}
//                 </p>
//                 <p className="mt-1 text-sm font-medium text-slate-300">
//                   Memories shown
//                 </p>
//                 <p className="mt-1 text-xs text-slate-500">
//                   Your moments, collected
//                 </p>
//               </div>
//             </div>

//             {/* Favourites shown */}
//             <div className="group relative flex min-h-[150px] items-center gap-4 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#28103f]/95 via-[#301541]/95 to-[#17274b]/95 p-5 shadow-xl shadow-purple-950/20 transition duration-300 hover:-translate-y-1 hover:border-pink-300/30 hover:shadow-pink-950/20 sm:p-6">
//               <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-pink-500/15 blur-2xl transition group-hover:bg-pink-500/25" />

//               <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-pink-300/20 bg-gradient-to-br from-pink-500/20 to-rose-500/10 text-pink-300 shadow-lg shadow-pink-950/20">
//                 <Heart className="h-7 w-7 fill-pink-400/30" />
//               </div>

//               <div className="relative min-w-0">
//                 <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
//                   {favouriteCount}
//                 </p>
//                 <p className="mt-1 text-sm font-medium text-slate-300">
//                   Favourites shown
//                 </p>
//                 <p className="mt-1 text-xs text-slate-500">
//                   Your most-loved memories
//                 </p>
//               </div>
//             </div>

//             {/* Supporting message */}
//             <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 sm:col-span-2 sm:p-6">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-400/10 text-pink-300">
//                   <Sparkles className="h-5 w-5" />
//                 </div>

//                 <div>
//                   <p className="text-sm font-semibold text-white">
//                     Every memory matters ♡
//                   </p>
//                   <p className="mt-1 text-xs leading-5 text-slate-400">
//                     Keep your favourite moments close and revisit them whenever you like.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right side: dark DayPicker */}
//           <aside className="w-full">
//             <div className="h-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#171023]/95 shadow-2xl shadow-purple-950/40 backdrop-blur-xl">
//               {/* Calendar heading */}
//               <div className="border-b border-white/10 bg-gradient-to-r from-[#29123e] via-[#351444] to-[#172b50] p-5">
//                 <div className="flex items-center gap-3">
//                   <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-pink-300/20 bg-pink-400/10 text-pink-300">
//                     <CalendarDays className="h-5 w-5" />
//                   </div>

//                   <div>
//                     <h3 className="font-bold text-white">
//                       Memory timeline
//                     </h3>
//                     <p className="mt-0.5 text-xs text-slate-400">
//                       Find a special day
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* DayPicker */}
//               <div className="p-3 sm:p-4">
//                 <DayPicker
//                   mode="range"
//                   selected={dateRange}
//                   onSelect={handleDayClick}
//                   captionLayout="dropdown-buttons"
//                   pagedNavigation
//                   classNames={{
//                     ...defaultClassNames,
//                     root: `${defaultClassNames.root} mx-auto w-full text-slate-200`,
//                     months: `${defaultClassNames.months} w-full`,
//                     month: `${defaultClassNames.month} w-full space-y-3`,
//                     month_caption: `${defaultClassNames.month_caption} relative flex h-10 items-center justify-center`,
//                     caption_label: `${defaultClassNames.caption_label} font-bold text-white`,
//                     dropdowns: `${defaultClassNames.dropdowns} flex items-center justify-center gap-2`,
//                     dropdown: `${defaultClassNames.dropdown} rounded-lg border border-white/10 bg-[#251532] px-2 py-1.5 text-sm text-slate-200 outline-none focus:border-pink-400`,
//                     nav: `${defaultClassNames.nav} text-pink-300`,
//                     button_previous: `${defaultClassNames.button_previous} absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-pink-400/30 hover:bg-pink-500/15 hover:text-pink-200`,
//                     button_next: `${defaultClassNames.button_next} absolute right-0 top-1 flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-pink-400/30 hover:bg-pink-500/15 hover:text-pink-200`,
//                     month_grid: `${defaultClassNames.month_grid} w-full border-collapse`,
//                     weekdays: `${defaultClassNames.weekdays} flex w-full`,
//                     weekday: `${defaultClassNames.weekday} flex-1 py-2 text-center text-xs font-semibold uppercase text-slate-500`,
//                     week: `${defaultClassNames.week} mt-1 flex w-full`,
//                     day: `${defaultClassNames.day} relative flex-1 p-0 text-center text-sm`,
//                     day_button: `${defaultClassNames.day_button} mx-auto flex h-9 w-9 items-center justify-center rounded-xl text-sm text-slate-300 transition hover:bg-pink-500/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-400`,
//                     today: `${defaultClassNames.today} font-bold text-pink-300`,
//                     selected: `${defaultClassNames.selected} [&>button]:bg-gradient-to-br [&>button]:from-pink-500 [&>button]:to-fuchsia-600 [&>button]:font-bold [&>button]:text-white [&>button]:shadow-lg [&>button]:shadow-pink-500/20`,
//                     range_start: `${defaultClassNames.range_start} rounded-l-xl bg-pink-500/15 [&>button]:bg-gradient-to-br [&>button]:from-pink-500 [&>button]:to-fuchsia-600 [&>button]:text-white`,
//                     range_end: `${defaultClassNames.range_end} rounded-r-xl bg-pink-500/15 [&>button]:bg-gradient-to-br [&>button]:from-pink-500 [&>button]:to-fuchsia-600 [&>button]:text-white`,
//                     range_middle: `${defaultClassNames.range_middle} bg-pink-500/15 text-pink-100`,
//                     outside: `${defaultClassNames.outside} opacity-30`,
//                     disabled: `${defaultClassNames.disabled} cursor-not-allowed opacity-25`,
//                     hidden: `${defaultClassNames.hidden} invisible`,
//                   }}
//                 />
//               </div>

//               {/* Date range footer */}
//               <div className="border-t border-white/10 bg-black/10 px-5 py-4">
//                 <div className="flex items-start gap-2.5">
//                   <Heart className="mt-0.5 h-4 w-4 shrink-0 fill-pink-400/20 text-pink-300" />

//                   <p className="text-xs leading-5 text-slate-400">
//                     Select a start and end date to discover the memories you made during that time.
//                   </p>
//                 </div>

//                 {dateRange.from && (
//                   <div className="mt-3 rounded-xl border border-pink-400/15 bg-pink-500/[0.08] px-3 py-2 text-xs font-medium text-pink-200">
//                     <span>
//                       {moment(dateRange.from).format("MMM D, YYYY")}
//                     </span>

//                     {dateRange.to && (
//                       <>
//                         <span className="mx-2 text-pink-400">→</span>
//                         <span>
//                           {moment(dateRange.to).format("MMM D, YYYY")}
//                         </span>
//                       </>
//                     )}

//                     {!dateRange.to && (
//                       <span className="ml-2 text-slate-400">
//                         — select an end date
//                       </span>
//                     )}
//                   </div>
//                 )}

//                 {(filterType === "date" || dateRange.from) && (
//                   <button
//                     type="button"
//                     onClick={resetFilter}
//                     className="mt-3 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-pink-400/30 hover:bg-pink-500/10 hover:text-pink-200"
//                   >
//                     Clear date filter
//                   </button>
//                 )}
//               </div>
//             </div>
//           </aside>
//         </section>

//         {/* Connections panel */}
//         <section className="mb-10">
//           <ConnectionPanel />
//         </section>

//         {/* Memory collection heading */}
//         <section className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
//           <div>
//             <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-pink-300">
//               <Images className="h-4 w-4" />
//               YOUR COLLECTION
//             </div>

//             <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
//               Your memories
//               <span className="ml-2 text-pink-300">♡</span>
//             </h2>

//             <p className="mt-2 text-sm text-white/60">
//               Little moments, beautifully remembered.
//             </p>
//           </div>

//           <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-xs font-medium text-white/70">
//             <ArrowDownWideNarrow className="h-4 w-4 text-pink-300" />
//             Your story collection
//           </div>
//         </section>

//         {/* Memories collection */}
//         <section className="w-full">
//           <FilterInfoTitle
//             filterType={filterType}
//             filterDates={dateRange}
//             onClear={resetFilter}
//           />

//           {allNotes.length > 0 ? (
//             <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-3">
//               {allNotes.map((item) => (
//                 <NotesCard
//                   key={item._id}
//                   imageUrl={item.imageUrl}
//                   title={item.title}
//                   date={item.visitedDate}
//                   story={item.story}
//                   visitedLocation={item.visitedLocation}
//                   isFavourite={item.isFavourite}
//                   onFavouriteClick={() => updateIsFavourite(item)}
//                   onClick={() => handleViewNote(item)}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="mt-5 rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 sm:p-6">
//               <EmptyCard
//                 imgSrc={emptyImg}
//                 message={getEmptyCardMessage(filterType)}
//               />
//             </div>
//           )}
//         </section>
//       </main>

//       {/* Add/Edit modal */}
//       <Modal
//         isOpen={openEditModal.isShown}
//         onRequestClose={() =>
//           setOpenEditModal({
//             isShown: false,
//             type: "add",
//             data: null,
//           })
//         }
//         appElement={document.getElementById("root")}
//         overlayClassName="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-gray-900/70 p-3 backdrop-blur-sm sm:p-6"
//         className="relative my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#171023] shadow-2xl outline-none"
//       >
//         <AddEditNote
//           type={openEditModal.type}
//           storyInfo={openEditModal.data}
//           onClose={() =>
//             setOpenEditModal({
//               isShown: false,
//               type: "add",
//               data: null,
//             })
//           }
//           getAllNotes={getAllNotes}
//         />
//       </Modal>

//       {/* View note modal */}
//       <Modal
//         isOpen={openViewModal.isShown}
//         onRequestClose={() =>
//           setOpenViewModal({ isShown: false, data: null })
//         }
//         appElement={document.getElementById("root")}
//         overlayClassName="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-gray-900/70 p-3 backdrop-blur-sm sm:p-6"
//         className="relative my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#171023] shadow-2xl outline-none"
//       >
//         <ViewNote
//           type={openViewModal.type}
//           storyInfo={openViewModal.data}
//           onClose={() =>
//             setOpenViewModal((previous) => ({
//               ...previous,
//               isShown: false,
//             }))
//           }
//           handleEdit={() => {
//             setOpenViewModal((previous) => ({
//               ...previous,
//               isShown: false,
//             }));
//             handleEdit(openViewModal.data || null);
//           }}
//           handleDelete={() => handleDelete(openViewModal.data || null)}
//         />
//       </Modal>

//       {/* Floating create button */}
//       <button
//         type="button"
//         aria-label="Create a new memory"
//         onClick={() =>
//           setOpenEditModal({
//             isShown: true,
//             type: "add",
//             data: null,
//           })
//         }
//         className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-orange-400 text-white shadow-xl shadow-pink-950/40 transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl active:scale-95 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
//       >
//         <Plus className="h-7 w-7 transition-transform duration-300 group-hover:rotate-90 sm:h-8 sm:w-8" />

//         <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl border border-white/10 bg-[#21112e] px-3 py-2 text-xs font-semibold text-pink-200 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
//           Create a memory
//         </span>
//       </button>

//       {/* Toast notifications */}
//       <ToastContainer
//         position="bottom-right"
//         autoClose={2500}
//         theme="dark"
//         toastClassName="!rounded-2xl !border !border-white/10 !shadow-lg"
//       />
//     </div>
//   );
// };

// export default Home;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Heart,
//   Sparkles,
//   BookHeart,
//   CalendarDays,
//   Plus,
//   ArrowDownWideNarrow,
//   Images,
// } from "lucide-react";

// import Navbar from "../../Components/Navbar";
// import ConnectionPanel from "../../Components/ConnectionPanel";
// import axiosInstance from "../../utils/axiosinstance";
// import NotesCard from "../../Components/Card/NotesCard";
// import AddEditNote from "./AddEditNote";
// import ViewNote from "./ViewNote";
// import FilterInfoTitle from "../../Components/Card/FilterInfoTitle";
// import Modal from "react-modal";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import EmptyCard from "../../Components/Card/EmptyCard";
// import emptyImg from "../../images/emptyImg.jpg";
// import { DayPicker, getDefaultClassNames } from "react-day-picker";
// import "react-day-picker/style.css";
// import moment from "moment";
// import { getEmptyCardMessage } from "../../utils/helper";

// const Home = () => {
//   const navigate = useNavigate();
//   const defaultClassNames = getDefaultClassNames();

//   const [userInfo, setUserInfo] = useState(null);
//   const [allNotes, setAllNotes] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterType, setFilterType] = useState("");
//   const [dateRange, setDateRange] = useState({
//     from: null,
//     to: null,
//   });

//   const [openEditModal, setOpenEditModal] = useState({
//     isShown: false,
//     type: "add",
//     data: null,
//   });

//   const [openViewModal, setOpenViewModal] = useState({
//     isShown: false,
//     data: null,
//   });

//   // Fetch user information
//   const getUserInfo = async () => {
//     try {
//       const response = await axiosInstance.get("/get-user");

//       if (response.data?.user) {
//         setUserInfo(response.data.user);
//       }
//     } catch (error) {
//       if (error.response?.status === 401) {
//         localStorage.clear();
//         navigate("/login");
//       } else {
//         console.error("Unable to fetch user information.");
//       }
//     }
//   };

//   // Fetch all memories
//   const getAllNotes = async () => {
//     try {
//       const response = await axiosInstance.get("/getall-stories");

//       if (response.data?.stories) {
//         setAllNotes(response.data.stories);
//       }
//     } catch (error) {
//       console.error("Unable to fetch notes.");
//     }
//   };

//   // Delete memory
//   const handleDelete = async (data) => {
//     if (!data?._id) return;

//     try {
//       const response = await axiosInstance.delete(
//         `/delete-story/${data._id}`
//       );

//       if (response.data && !response.data.error) {
//         toast.success("Memory deleted successfully 💗");
//         setOpenViewModal({ isShown: false, data: null });
//         getAllNotes();
//       }
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message ||
//           "Unable to delete this memory."
//       );
//     }
//   };

//   // Edit memory
//   const handleEdit = (data) => {
//     setOpenEditModal({
//       isShown: true,
//       type: "edit",
//       data,
//     });
//   };

//   // Toggle favourite
//   const updateIsFavourite = async (data) => {
//     const storyId = data._id;

//     try {
//       const response = await axiosInstance.put(
//         `/update-is-favourite/${storyId}`,
//         { isFavourite: !data.isFavourite }
//       );

//       if (response.data?.story) {
//         toast.success(
//           data.isFavourite
//             ? "Removed from favourites"
//             : "Added to favourites 💗"
//         );

//         if (filterType === "search" && searchQuery) {
//           onSearchNote(searchQuery);
//         } else if (filterType === "date") {
//           filterNotesByDate(dateRange);
//         } else {
//           getAllNotes();
//         }
//       }
//     } catch (error) {
//       toast.error("Unable to update your favourites.");
//     }
//   };

//   // View memory
//   const handleViewNote = (data) => {
//     setOpenViewModal({
//       isShown: true,
//       data,
//     });
//   };

//   // Search memories
//   const onSearchNote = async (query) => {
//     try {
//       const response = await axiosInstance.get("/search", {
//         params: { query },
//       });

//       if (response.data?.stories) {
//         setFilterType("search");
//         setAllNotes(response.data.stories);
//       }
//     } catch (error) {
//       toast.error("Unable to search memories.");
//     }
//   };

//   // Filter memories by date range
//   const filterNotesByDate = async (day) => {
//     try {
//       if (!day?.from || !day?.to) return;

//       const startDate = moment(day.from).startOf("day").valueOf();
//       const endDate = moment(day.to).endOf("day").valueOf();

//       const response = await axiosInstance.get("/notes/filter", {
//         params: { startDate, endDate },
//       });

//       if (response.data?.stories) {
//         setFilterType("date");
//         setAllNotes(response.data.stories);
//       }
//     } catch (error) {
//       toast.error("Unable to filter memories by date.");
//     }
//   };

//   // Select dates in DayPicker
//   const handleDayClick = (day) => {
//     if (!day) return;

//     setDateRange(day);

//     if (day.from && day.to) {
//       filterNotesByDate(day);
//     }
//   };

//   // Clear search
//   const handleClearSearch = () => {
//     setSearchQuery("");
//     setDateRange({ from: null, to: null });
//     setFilterType("");
//     getAllNotes();
//   };

//   // Reset filters
//   const resetFilter = () => {
//     setDateRange({ from: null, to: null });
//     setFilterType("");
//     setSearchQuery("");
//     getAllNotes();
//   };

//   useEffect(() => {
//     getUserInfo();
//     getAllNotes();
//   }, []);

//   const favouriteCount = allNotes.filter(
//     (note) => note.isFavourite
//   ).length;

//   return (
//     <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-[#160824] via-[#281044] to-[#102a52] text-white">
//       {/* Background glow effects */}
//       <div className="pointer-events-none fixed -left-32 top-32 h-80 w-80 rounded-full bg-fuchsia-500/30 blur-[110px]" />
//       <div className="pointer-events-none fixed -right-32 top-64 h-96 w-96 rounded-full bg-blue-500/25 blur-[120px]" />
//       <div className="pointer-events-none fixed bottom-0 left-1/3 h-64 w-64 rounded-full bg-orange-500/15 blur-[110px]" />

//       {/* Navbar */}
//       <div className="relative z-30">
//         <Navbar
//           userInfo={userInfo}
//           searchQuery={searchQuery}
//           setSearchQuery={setSearchQuery}
//           onSearchNote={onSearchNote}
//           handleClearSearch={handleClearSearch}
//         />
//       </div>

//       <main className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pb-28 pt-7 sm:px-6 sm:pt-10 lg:px-10">
//         {/* Left column: stats + connections | Right column: calendar */}
//         <section className="mb-8 grid grid-cols-1 items-stretch gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
//           {/* LEFT COLUMN */}
//           <div className="flex min-w-0 flex-col gap-4">
//             {/* Statistics */}
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               {/* Memories shown */}
//               <div className="group relative flex min-h-[150px] items-center gap-4 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#28103f]/95 via-[#301541]/95 to-[#17274b]/95 p-5 shadow-xl shadow-purple-950/20 transition duration-300 hover:-translate-y-1 hover:border-pink-300/30 hover:shadow-pink-950/20 sm:p-6">
//                 <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-fuchsia-500/15 blur-2xl transition group-hover:bg-fuchsia-500/25" />

//                 <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-pink-300/20 bg-gradient-to-br from-pink-500/20 to-fuchsia-500/10 text-pink-300 shadow-lg shadow-pink-950/20">
//                   <BookHeart className="h-7 w-7" />
//                 </div>

//                 <div className="relative min-w-0">
//                   <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
//                     {allNotes.length}
//                   </p>
//                   <p className="mt-1 text-sm font-medium text-slate-300">
//                     Memories shown
//                   </p>
//                   <p className="mt-1 text-xs text-slate-500">
//                     Your moments, collected
//                   </p>
//                 </div>
//               </div>

//               {/* Favourites shown */}
//               <div className="group relative flex min-h-[150px] items-center gap-4 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#28103f]/95 via-[#301541]/95 to-[#17274b]/95 p-5 shadow-xl shadow-purple-950/20 transition duration-300 hover:-translate-y-1 hover:border-pink-300/30 hover:shadow-pink-950/20 sm:p-6">
//                 <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-pink-500/15 blur-2xl transition group-hover:bg-pink-500/25" />

//                 <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-pink-300/20 bg-gradient-to-br from-pink-500/20 to-rose-500/10 text-pink-300 shadow-lg shadow-pink-950/20">
//                   <Heart className="h-7 w-7 fill-pink-400/30" />
//                 </div>

//                 <div className="relative min-w-0">
//                   <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
//                     {favouriteCount}
//                   </p>
//                   <p className="mt-1 text-sm font-medium text-slate-300">
//                     Favourites shown
//                   </p>
//                   <p className="mt-1 text-xs text-slate-500">
//                     Your most-loved memories
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Connection panel fills the remaining left-side space */}
//             <div className="relative flex-1 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#211032]/95 via-[#28133d]/95 to-[#152547]/95 p-1 shadow-xl shadow-purple-950/20">
//               <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />
//               <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

//               <div className="relative h-full">
//                 <ConnectionPanel />
//               </div>
//             </div>
//           </div>

//           {/* RIGHT COLUMN: DARK DAYPICKER */}
//           <aside className="w-full min-w-0">
//             <div className="h-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#171023]/95 shadow-2xl shadow-purple-950/40 backdrop-blur-xl">
//               {/* Calendar heading */}
//               <div className="border-b border-white/10 bg-gradient-to-r from-[#29123e] via-[#351444] to-[#172b50] p-5">
//                 <div className="flex items-center gap-3">
//                   <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-pink-300/20 bg-pink-400/10 text-pink-300">
//                     <CalendarDays className="h-5 w-5" />
//                   </div>

//                   <div>
//                     <h3 className="font-bold text-white">
//                       Memory timeline
//                     </h3>
//                     <p className="mt-0.5 text-xs text-slate-400">
//                       Find a special day
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* DayPicker */}
//               <div className="p-3 sm:p-4">
//                 <DayPicker
//                   mode="range"
//                   selected={dateRange}
//                   onSelect={handleDayClick}
//                   captionLayout="dropdown-buttons"
//                   pagedNavigation
//                   classNames={{
//                     ...defaultClassNames,
//                     root: `${defaultClassNames.root} mx-auto w-full text-slate-200`,
//                     months: `${defaultClassNames.months} w-full`,
//                     month: `${defaultClassNames.month} w-full space-y-3`,
//                     month_caption: `${defaultClassNames.month_caption} relative flex h-10 items-center justify-center`,
//                     caption_label: `${defaultClassNames.caption_label} font-bold text-white`,
//                     dropdowns: `${defaultClassNames.dropdowns} flex items-center justify-center gap-2`,
//                     dropdown: `${defaultClassNames.dropdown} rounded-lg border border-white/10 bg-[#251532] px-2 py-1.5 text-sm text-slate-200 outline-none focus:border-pink-400`,
//                     nav: `${defaultClassNames.nav} text-pink-300`,
//                     button_previous: `${defaultClassNames.button_previous} absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-pink-400/30 hover:bg-pink-500/15 hover:text-pink-200`,
//                     button_next: `${defaultClassNames.button_next} absolute right-0 top-1 flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-pink-400/30 hover:bg-pink-500/15 hover:text-pink-200`,
//                     month_grid: `${defaultClassNames.month_grid} w-full border-collapse`,
//                     weekdays: `${defaultClassNames.weekdays} flex w-full`,
//                     weekday: `${defaultClassNames.weekday} flex-1 py-2 text-center text-xs font-semibold uppercase text-slate-500`,
//                     week: `${defaultClassNames.week} mt-1 flex w-full`,
//                     day: `${defaultClassNames.day} relative flex-1 p-0 text-center text-sm`,
//                     day_button: `${defaultClassNames.day_button} mx-auto flex h-9 w-9 items-center justify-center rounded-xl text-sm text-slate-300 transition hover:bg-pink-500/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-400`,
//                     today: `${defaultClassNames.today} font-bold text-pink-300`,
//                     selected: `${defaultClassNames.selected} [&>button]:bg-gradient-to-br [&>button]:from-pink-500 [&>button]:to-fuchsia-600 [&>button]:font-bold [&>button]:text-white [&>button]:shadow-lg [&>button]:shadow-pink-500/20`,
//                     range_start: `${defaultClassNames.range_start} rounded-l-xl bg-pink-500/15 [&>button]:bg-gradient-to-br [&>button]:from-pink-500 [&>button]:to-fuchsia-600 [&>button]:text-white`,
//                     range_end: `${defaultClassNames.range_end} rounded-r-xl bg-pink-500/15 [&>button]:bg-gradient-to-br [&>button]:from-pink-500 [&>button]:to-fuchsia-600 [&>button]:text-white`,
//                     range_middle: `${defaultClassNames.range_middle} bg-pink-500/15 text-pink-100`,
//                     outside: `${defaultClassNames.outside} opacity-30`,
//                     disabled: `${defaultClassNames.disabled} cursor-not-allowed opacity-25`,
//                     hidden: `${defaultClassNames.hidden} invisible`,
//                   }}
//                 />
//               </div>

//               {/* Date range footer */}
//               <div className="border-t border-white/10 bg-black/10 px-5 py-4">
//                 <div className="flex items-start gap-2.5">
//                   <Heart className="mt-0.5 h-4 w-4 shrink-0 fill-pink-400/20 text-pink-300" />

//                   <p className="text-xs leading-5 text-slate-400">
//                     Select a start and end date to discover the memories you made during that time.
//                   </p>
//                 </div>

//                 {dateRange.from && (
//                   <div className="mt-3 rounded-xl border border-pink-400/15 bg-pink-500/[0.08] px-3 py-2 text-xs font-medium text-pink-200">
//                     <span>
//                       {moment(dateRange.from).format("MMM D, YYYY")}
//                     </span>

//                     {dateRange.to && (
//                       <>
//                         <span className="mx-2 text-pink-400">
//                           →
//                         </span>
//                         <span>
//                           {moment(dateRange.to).format("MMM D, YYYY")}
//                         </span>
//                       </>
//                     )}

//                     {!dateRange.to && (
//                       <span className="ml-2 text-slate-400">
//                         — select an end date
//                       </span>
//                     )}
//                   </div>
//                 )}

//                 {(filterType === "date" || dateRange.from) && (
//                   <button
//                     type="button"
//                     onClick={resetFilter}
//                     className="mt-3 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-pink-400/30 hover:bg-pink-500/10 hover:text-pink-200"
//                   >
//                     Clear date filter
//                   </button>
//                 )}
//               </div>
//             </div>
//           </aside>
//         </section>

//         {/* Memory collection heading */}
//         <section className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
//           <div>
//             <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-pink-300">
//               <Images className="h-4 w-4" />
//               YOUR COLLECTION
//             </div>

//             <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
//               Your memories
//               <span className="ml-2 text-pink-300">♡</span>
//             </h2>

//             <p className="mt-2 text-sm text-white/60">
//               Little moments, beautifully remembered.
//             </p>
//           </div>

//           <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-xs font-medium text-white/70">
//             <ArrowDownWideNarrow className="h-4 w-4 text-pink-300" />
//             Your story collection
//           </div>
//         </section>

//         {/* Memories collection */}
//         <section className="w-full">
//           <FilterInfoTitle
//             filterType={filterType}
//             filterDates={dateRange}
//             onClear={resetFilter}
//           />

//           {allNotes.length > 0 ? (
//             <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-3">
//               {allNotes.map((item) => (
//                 <NotesCard
//                   key={item._id}
//                   imageUrl={item.imageUrl}
//                   title={item.title}
//                   date={item.visitedDate}
//                   story={item.story}
//                   visitedLocation={item.visitedLocation}
//                   isFavourite={item.isFavourite}
//                   onFavouriteClick={() => updateIsFavourite(item)}
//                   onClick={() => handleViewNote(item)}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="mt-5 rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 sm:p-6">
//               <EmptyCard
//                 imgSrc={emptyImg}
//                 message={getEmptyCardMessage(filterType)}
//               />
//             </div>
//           )}
//         </section>
//       </main>

//       {/* Add/Edit modal */}
//       <Modal
//         isOpen={openEditModal.isShown}
//         onRequestClose={() =>
//           setOpenEditModal({
//             isShown: false,
//             type: "add",
//             data: null,
//           })
//         }
//         appElement={document.getElementById("root")}
//         overlayClassName="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-gray-900/70 p-3 backdrop-blur-sm sm:p-6"
//         className="relative my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#171023] shadow-2xl outline-none"
//       >
//         <AddEditNote
//           type={openEditModal.type}
//           storyInfo={openEditModal.data}
//           onClose={() =>
//             setOpenEditModal({
//               isShown: false,
//               type: "add",
//               data: null,
//             })
//           }
//           getAllNotes={getAllNotes}
//         />
//       </Modal>

//       {/* View note modal */}
//       <Modal
//         isOpen={openViewModal.isShown}
//         onRequestClose={() =>
//           setOpenViewModal({ isShown: false, data: null })
//         }
//         appElement={document.getElementById("root")}
//         overlayClassName="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-gray-900/70 p-3 backdrop-blur-sm sm:p-6"
//         className="relative my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#171023] shadow-2xl outline-none"
//       >
//         <ViewNote
//           type={openViewModal.type}
//           storyInfo={openViewModal.data}
//           onClose={() =>
//             setOpenViewModal((previous) => ({
//               ...previous,
//               isShown: false,
//             }))
//           }
//           handleEdit={() => {
//             setOpenViewModal((previous) => ({
//               ...previous,
//               isShown: false,
//             }));
//             handleEdit(openViewModal.data || null);
//           }}
//           handleDelete={() =>
//             handleDelete(openViewModal.data || null)
//           }
//         />
//       </Modal>

//       {/* Floating create button */}
//       <button
//         type="button"
//         aria-label="Create a new memory"
//         onClick={() =>
//           setOpenEditModal({
//             isShown: true,
//             type: "add",
//             data: null,
//           })
//         }
//         className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-orange-400 text-white shadow-xl shadow-pink-950/40 transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl active:scale-95 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
//       >
//         <Plus className="h-7 w-7 transition-transform duration-300 group-hover:rotate-90 sm:h-8 sm:w-8" />

//         <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl border border-white/10 bg-[#21112e] px-3 py-2 text-xs font-semibold text-pink-200 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
//           Create a memory
//         </span>
//       </button>

//       {/* Toast notifications */}
//       <ToastContainer
//         position="bottom-right"
//         autoClose={2500}
//         theme="dark"
//         toastClassName="!rounded-2xl !border !border-white/10 !shadow-lg"
//       />
//     </div>
//   );
// };

// export default Home;




// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Heart,
//   Sparkles,
//   BookHeart,
//   CalendarDays,
//   Plus,
//   ArrowDownWideNarrow,
//   Images,
// } from "lucide-react";

// import Navbar from "../../Components/Navbar";
// import ConnectionPanel from "../../Components/ConnectionPanel";
// import axiosInstance from "../../utils/axiosinstance";
// import NotesCard from "../../Components/Card/NotesCard";
// import AddEditNote from "./AddEditNote";
// import ViewNote from "./ViewNote";
// import FilterInfoTitle from "../../Components/Card/FilterInfoTitle";
// import Modal from "react-modal";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import EmptyCard from "../../Components/Card/EmptyCard";
// import emptyImg from "../../images/emptyImg.jpg";
// import { DayPicker, getDefaultClassNames } from "react-day-picker";
// import moment from "moment";
// import { getEmptyCardMessage } from "../../utils/helper";

// const Home = () => {
//   const navigate = useNavigate();
//   const defaultClassNames = getDefaultClassNames();

//   const [userInfo, setUserInfo] = useState(null);
//   const [allNotes, setAllNotes] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterType, setFilterType] = useState("");
//   const [dateRange, setDateRange] = useState({
//     from: null,
//     to: null,
//   });

//   const [openEditModal, setOpenEditModal] = useState({
//     isShown: false,
//     type: "add",
//     data: null,
//   });

//   const [openViewModal, setOpenViewModal] = useState({
//     isShown: false,
//     data: null,
//   });

//   const getUserInfo = async () => {
//     try {
//       const response = await axiosInstance.get("/get-user");

//       if (response.data?.user) {
//         setUserInfo(response.data.user);
//       }
//     } catch (error) {
//       if (error.response?.status === 401) {
//         localStorage.clear();
//         navigate("/login");
//       } else {
//         console.error("Unable to fetch user information.");
//       }
//     }
//   };

//   const getAllNotes = async () => {
//     try {
//       const response = await axiosInstance.get("/getall-stories");

//       if (response.data?.stories) {
//         setAllNotes(response.data.stories);
//       }
//     } catch (error) {
//       console.error("Unable to fetch notes.");
//     }
//   };

//   const handleDelete = async (data) => {
//     if (!data?._id) return;

//     try {
//       const response = await axiosInstance.delete(
//         `/delete-story/${data._id}`
//       );

//       if (response.data && !response.data.error) {
//         toast.success("Memory deleted successfully 💗");
//         setOpenViewModal({ isShown: false, data: null });
//         getAllNotes();
//       }
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message ||
//           "Unable to delete this memory."
//       );
//     }
//   };

//   const handleEdit = (data) => {
//     setOpenEditModal({
//       isShown: true,
//       type: "edit",
//       data,
//     });
//   };

//   const updateIsFavourite = async (data) => {
//     const storyId = data._id;

//     try {
//       const response = await axiosInstance.put(
//         `/update-is-favourite/${storyId}`,
//         { isFavourite: !data.isFavourite }
//       );

//       if (response.data?.story) {
//         toast.success(
//           data.isFavourite
//             ? "Removed from favourites"
//             : "Added to favourites 💗"
//         );

//         if (filterType === "search" && searchQuery) {
//           onSearchNote(searchQuery);
//         } else if (filterType === "date") {
//           filterNotesByDate(dateRange);
//         } else {
//           getAllNotes();
//         }
//       }
//     } catch (error) {
//       toast.error("Unable to update your favourites.");
//     }
//   };

//   const handleViewNote = (data) => {
//     setOpenViewModal({
//       isShown: true,
//       data,
//     });
//   };

//   const onSearchNote = async (query) => {
//     try {
//       const response = await axiosInstance.get("/search", {
//         params: { query },
//       });

//       if (response.data?.stories) {
//         setFilterType("search");
//         setAllNotes(response.data.stories);
//       }
//     } catch (error) {
//       toast.error("Unable to search memories.");
//     }
//   };

//   const filterNotesByDate = async (day) => {
//     try {
//       if (!day?.from || !day?.to) return;

//       const startDate = moment(day.from).startOf("day").valueOf();
//       const endDate = moment(day.to).endOf("day").valueOf();

//       const response = await axiosInstance.get("/notes/filter", {
//         params: { startDate, endDate },
//       });

//       if (response.data?.stories) {
//         setFilterType("date");
//         setAllNotes(response.data.stories);
//       }
//     } catch (error) {
//       toast.error("Unable to filter memories by date.");
//     }
//   };

//   const handleDayClick = (day) => {
//     if (!day) return;

//     setDateRange(day);

//     if (day.from && day.to) {
//       filterNotesByDate(day);
//     }
//   };

//   const handleClearSearch = () => {
//     setSearchQuery("");
//     setDateRange({ from: null, to: null });
//     setFilterType("");
//     getAllNotes();
//   };

//   const resetFilter = () => {
//     setDateRange({ from: null, to: null });
//     setFilterType("");
//     setSearchQuery("");
//     getAllNotes();
//   };

//   useEffect(() => {
//     getUserInfo();
//     getAllNotes();
//   }, []);

//   const favouriteCount = allNotes.filter(
//     (note) => note.isFavourite
//   ).length;

//   const firstName =
//     userInfo?.fullName?.trim().split(/\s+/)[0] || "there";

//   const addMemory = () => {
//     setOpenEditModal({
//       isShown: true,
//       type: "add",
//       data: null,
//     });
//   };

//   return (
//     <div className="relative min-h-screen overflow-x-hidden bg-[#0d0915] text-white">
//       {/* Background glow */}
//       <div className="pointer-events-none fixed -left-32 top-32 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[110px]" />
//       <div className="pointer-events-none fixed -right-32 top-48 h-80 w-80 rounded-full bg-blue-600/10 blur-[120px]" />

//       {/* Navbar */}
//       <div className="relative z-30 border-b border-white/[0.06]">
//         <Navbar
//           userInfo={userInfo}
//           searchQuery={searchQuery}
//           setSearchQuery={setSearchQuery}
//           onSearchNote={onSearchNote}
//           handleClearSearch={handleClearSearch}
//         />
//       </div>

//       <main className="relative z-10 mx-auto w-full max-w-[1500px] px-4 pb-24 pt-5 sm:px-6 sm:pt-7 lg:px-8">
//         {/* Main dashboard */}
//         <section className="mb-6 grid grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
//           {/* Left column */}
//           <div className="min-w-0 space-y-4">
//             {/* Welcome */}
//             <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#191021] via-[#171020] to-[#101827] p-5 sm:p-6">
//               <div className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full bg-fuchsia-500/10 blur-[70px]" />

//               <div className="relative">
//                 <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-fuchsia-300/15 bg-fuchsia-400/[0.07] px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-fuchsia-200">
//                   <Sparkles className="h-3.5 w-3.5" />
//                   YOUR PERSONAL MEMORY JOURNAL
//                 </div>

//                 <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
//                   Welcome back, {firstName}
//                   <span className="ml-2 text-fuchsia-300">♡</span>
//                 </h1>

//                 <p className="mt-2 max-w-xl text-sm leading-6 text-white/50">
//                   Keep your favourite memories, revisit special places,
//                   and save the little moments that matter.
//                 </p>

//                 <button
//                   type="button"
//                   onClick={addMemory}
//                   className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-950/30 transition duration-200 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0"
//                 >
//                   <Plus className="h-4 w-4" />
//                   Create a memory
//                 </button>
//               </div>
//             </div>

//             {/* Connection panel — restored */}
//             <div className="rounded-2xl border border-white/[0.07] bg-[#15111c] p-3 transition hover:border-violet-400/15 sm:p-4">
//               <ConnectionPanel />
//             </div>

//             {/* Statistics */}
//             <div className="grid grid-cols-2 gap-3">
//               <div className="flex min-h-[100px] items-center gap-3 rounded-2xl border border-white/[0.07] bg-[#15111c] p-4 transition hover:border-fuchsia-400/20">
//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-fuchsia-400/10 text-fuchsia-300">
//                   <BookHeart className="h-5 w-5" />
//                 </div>
//                 <div className="min-w-0">
//                   <p className="text-2xl font-bold text-white">
//                     {allNotes.length}
//                   </p>
//                   <p className="text-xs text-white/45">
//                     Memories shown
//                   </p>
//                 </div>
//               </div>

//               <div className="flex min-h-[100px] items-center gap-3 rounded-2xl border border-white/[0.07] bg-[#15111c] p-4 transition hover:border-pink-400/20">
//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-400/10 text-pink-300">
//                   <Heart className="h-5 w-5 fill-current" />
//                 </div>
//                 <div className="min-w-0">
//                   <p className="text-2xl font-bold text-white">
//                     {favouriteCount}
//                   </p>
//                   <p className="text-xs text-white/45">
//                     Favourites shown
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Calendar — right column */}
//           <aside className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#15111c]">
//             <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3.5">
//               <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-fuchsia-400/10 text-fuchsia-300">
//                 <CalendarDays className="h-4 w-4" />
//               </div>
//               <div>
//                 <h2 className="text-sm font-semibold text-white">
//                   Memory timeline
//                 </h2>
//                 <p className="mt-0.5 text-xs text-white/40">
//                   Find memories by date
//                 </p>
//               </div>
//             </div>

//             <div className="overflow-x-auto p-2 sm:p-3">
//               <DayPicker
//                 mode="range"
//                 selected={dateRange}
//                 onSelect={handleDayClick}
//                 captionLayout="dropdown-buttons"
//                 pagedNavigation
//                 classNames={{
//                   ...defaultClassNames,
//                   root: `${defaultClassNames.root} mx-auto w-full`,
//                   months: `${defaultClassNames.months} w-full`,
//                   month: `${defaultClassNames.month} w-full`,
//                   month_grid: `${defaultClassNames.month_grid} w-full border-collapse`,
//                   weekdays: `${defaultClassNames.weekdays} text-[11px] font-medium text-white/40`,
//                   weekday: `${defaultClassNames.weekday} py-2`,
//                   day: `${defaultClassNames.day} p-0`,
//                   day_button: `${defaultClassNames.day_button} h-9 w-9 rounded-lg text-xs text-white/75 transition hover:bg-fuchsia-400/15 hover:text-white`,
//                   today: `${defaultClassNames.today} font-bold text-fuchsia-300`,
//                   selected: `${defaultClassNames.selected} !bg-fuchsia-500 !text-white rounded-lg`,
//                   range_start: `${defaultClassNames.range_start} !rounded-l-lg !bg-fuchsia-500 !text-white`,
//                   range_end: `${defaultClassNames.range_end} !rounded-r-lg !bg-fuchsia-500 !text-white`,
//                   range_middle: `${defaultClassNames.range_middle} !bg-fuchsia-500/15 !text-fuchsia-100`,
//                   nav: `${defaultClassNames.nav} text-fuchsia-300`,
//                   button_previous: `${defaultClassNames.button_previous} rounded-lg text-white/60 hover:bg-white/5`,
//                   button_next: `${defaultClassNames.button_next} rounded-lg text-white/60 hover:bg-white/5`,
//                   chevron: `${defaultClassNames.chevron} fill-fuchsia-300`,
//                   caption_label: `${defaultClassNames.caption_label} text-sm font-semibold text-white`,
//                   dropdowns: `${defaultClassNames.dropdowns} gap-1`,
//                   dropdown: `${defaultClassNames.dropdown} rounded-md border border-white/10 bg-[#201829] px-1 py-1 text-xs text-white outline-none focus:border-fuchsia-400/50`,
//                 }}
//               />
//             </div>

//             <div className="border-t border-white/[0.06] px-4 py-3">
//               <p className="text-xs leading-5 text-white/40">
//                 Select a start and end date to find memories from that period.
//               </p>

//               {dateRange.from && (
//                 <div className="mt-3 rounded-lg border border-fuchsia-300/10 bg-fuchsia-400/[0.06] px-3 py-2 text-xs text-fuchsia-200">
//                   <span>
//                     {moment(dateRange.from).format("MMM D, YYYY")}
//                   </span>
//                   {dateRange.to && (
//                     <>
//                       <span className="mx-2 text-white/30">→</span>
//                       <span>
//                         {moment(dateRange.to).format("MMM D, YYYY")}
//                       </span>
//                     </>
//                   )}
//                 </div>
//               )}

//               {(filterType === "date" || dateRange.from) && (
//                 <button
//                   type="button"
//                   onClick={resetFilter}
//                   className="mt-3 w-full rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-white/60 transition hover:border-fuchsia-400/30 hover:bg-fuchsia-400/[0.06] hover:text-fuchsia-200"
//                 >
//                   Clear date filter
//                 </button>
//               )}
//             </div>
//           </aside>
//         </section>

//         {/* Memories heading */}
//         <section className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
//           <div>
//             <div className="mb-1.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-fuchsia-300/80">
//               <Images className="h-3.5 w-3.5" />
//               YOUR COLLECTION
//             </div>

//             <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
//               Your memories
//               <span className="ml-2 text-fuchsia-300">♡</span>
//             </h2>

//             <p className="mt-1 text-xs text-white/40 sm:text-sm">
//               Little moments, beautifully remembered.
//             </p>
//           </div>

//           <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs text-white/45">
//             <ArrowDownWideNarrow className="h-3.5 w-3.5 text-fuchsia-300" />
//             Your story collection
//           </div>
//         </section>

//         {/* Notes grid */}
//         <section className="min-w-0 w-full">
//           <FilterInfoTitle
//             filterType={filterType}
//             filterDates={dateRange}
//             onClear={resetFilter}
//           />

//           {allNotes.length > 0 ? (
//             <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3">
//               {allNotes.map((item) => (
//                 <NotesCard
//                   key={item._id}
//                   imageUrl={item.imageUrl}
//                   title={item.title}
//                   date={item.visitedDate}
//                   story={item.story}
//                   visitedLocation={item.visitedLocation}
//                   isFavourite={item.isFavourite}
//                   onFavouriteClick={() => updateIsFavourite(item)}
//                   onClick={() => handleViewNote(item)}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="mt-4 rounded-2xl border border-white/[0.07] bg-[#15111c] p-4 sm:p-6">
//               <EmptyCard
//                 imgSrc={emptyImg}
//                 message={getEmptyCardMessage(filterType)}
//               />
//             </div>
//           )}
//         </section>
//       </main>

//       {/* Add/Edit modal */}
//       <Modal
//         isOpen={openEditModal.isShown}
//         onRequestClose={() =>
//           setOpenEditModal({
//             isShown: false,
//             type: "add",
//             data: null,
//           })
//         }
//         appElement={document.getElementById("root")}
//         overlayClassName="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-3 backdrop-blur-sm sm:p-6"
//         className="relative my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#15111c] shadow-2xl outline-none"
//       >
//         <AddEditNote
//           type={openEditModal.type}
//           storyInfo={openEditModal.data}
//           onClose={() =>
//             setOpenEditModal({
//               isShown: false,
//               type: "add",
//               data: null,
//             })
//           }
//           getAllNotes={getAllNotes}
//         />
//       </Modal>

//       {/* View note modal */}
//       <Modal
//         isOpen={openViewModal.isShown}
//         onRequestClose={() =>
//           setOpenViewModal({ isShown: false, data: null })
//         }
//         appElement={document.getElementById("root")}
//         overlayClassName="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-3 backdrop-blur-sm sm:p-6"
//         className="relative my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#15111c] shadow-2xl outline-none"
//       >
//         <ViewNote
//           type={openViewModal.type}
//           storyInfo={openViewModal.data}
//           onClose={() =>
//             setOpenViewModal((prevState) => ({
//               ...prevState,
//               isShown: false,
//             }))
//           }
//           handleEdit={() => {
//             setOpenViewModal((prevState) => ({
//               ...prevState,
//               isShown: false,
//             }));
//             handleEdit(openViewModal.data || null);
//           }}
//           handleDelete={() => handleDelete(openViewModal.data || null)}
//         />
//       </Modal>

//       {/* Floating create button */}
//       <button
//         type="button"
//         aria-label="Create a new memory"
//         onClick={addMemory}
//         className="group fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-600 to-pink-500 text-white shadow-lg shadow-fuchsia-950/40 transition duration-200 hover:-translate-y-1 hover:brightness-110 active:scale-95 sm:bottom-7 sm:right-7"
//       >
//         <Plus className="h-6 w-6 transition-transform duration-200 group-hover:rotate-90" />
//         <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg border border-white/10 bg-[#201829] px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
//           Create a memory
//         </span>
//       </button>

//       <ToastContainer
//         position="bottom-right"
//         autoClose={2500}
//         theme="dark"
//         toastClassName="!rounded-xl !border !border-white/10"
//       />
//     </div>
//   );
// };

// export default Home;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Heart,
//   Sparkles,
//   BookHeart,
//   CalendarDays,
//   Plus,
//   ArrowDownWideNarrow,
//   Images,
//   Users,
//   ArrowRight,
//   X,
// } from "lucide-react";

// import Navbar from "../../Components/Navbar";
// import ConnectionPanel from "../../Components/ConnectionPanel";
// import axiosInstance from "../../utils/axiosinstance";
// import NotesCard from "../../Components/Card/NotesCard";
// import AddEditNote from "./AddEditNote";
// import ViewNote from "./ViewNote";
// import FilterInfoTitle from "../../Components/Card/FilterInfoTitle";
// import Modal from "react-modal";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import EmptyCard from "../../Components/Card/EmptyCard";
// import emptyImg from "../../images/emptyImg.jpg";
// import { DayPicker, getDefaultClassNames } from "react-day-picker";
// import moment from "moment";
// import { getEmptyCardMessage } from "../../utils/helper";

// const Home = () => {
//   const navigate = useNavigate();
//   const defaultClassNames = getDefaultClassNames();

//   const [userInfo, setUserInfo] = useState(null);
//   const [allNotes, setAllNotes] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterType, setFilterType] = useState("");
//   const [showConnections, setShowConnections] = useState(false);

//   const [dateRange, setDateRange] = useState({
//     from: null,
//     to: null,
//   });

//   const [openEditModal, setOpenEditModal] = useState({
//     isShown: false,
//     type: "add",
//     data: null,
//   });

//   const [openViewModal, setOpenViewModal] = useState({
//     isShown: false,
//     data: null,
//   });

//   const getUserInfo = async () => {
//     try {
//       const response = await axiosInstance.get("/get-user");

//       if (response.data?.user) {
//         setUserInfo(response.data.user);
//       }
//     } catch (error) {
//       if (error.response?.status === 401) {
//         localStorage.clear();
//         navigate("/login");
//       } else {
//         console.error("Unable to fetch user information.");
//       }
//     }
//   };

//   const getAllNotes = async () => {
//     try {
//       const response = await axiosInstance.get("/getall-stories");

//       if (response.data?.stories) {
//         setAllNotes(response.data.stories);
//       }
//     } catch (error) {
//       console.error("Unable to fetch notes.");
//     }
//   };

//   const handleDelete = async (data) => {
//     if (!data?._id) return;

//     try {
//       const response = await axiosInstance.delete(
//         `/delete-story/${data._id}`
//       );

//       if (response.data && !response.data.error) {
//         toast.success("Memory deleted successfully 💗");
//         setOpenViewModal({ isShown: false, data: null });
//         getAllNotes();
//       }
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message ||
//           "Unable to delete this memory."
//       );
//     }
//   };

//   const handleEdit = (data) => {
//     setOpenEditModal({
//       isShown: true,
//       type: "edit",
//       data,
//     });
//   };

//   const updateIsFavourite = async (data) => {
//     const storyId = data._id;

//     try {
//       const response = await axiosInstance.put(
//         `/update-is-favourite/${storyId}`,
//         { isFavourite: !data.isFavourite }
//       );

//       if (response.data?.story) {
//         toast.success(
//           data.isFavourite
//             ? "Removed from favourites"
//             : "Added to favourites 💗"
//         );

//         if (filterType === "search" && searchQuery) {
//           onSearchNote(searchQuery);
//         } else if (filterType === "date") {
//           filterNotesByDate(dateRange);
//         } else {
//           getAllNotes();
//         }
//       }
//     } catch (error) {
//       toast.error("Unable to update your favourites.");
//     }
//   };

//   const handleViewNote = (data) => {
//     setOpenViewModal({
//       isShown: true,
//       data,
//     });
//   };

//   const onSearchNote = async (query) => {
//     try {
//       const response = await axiosInstance.get("/search", {
//         params: { query },
//       });

//       if (response.data?.stories) {
//         setFilterType("search");
//         setAllNotes(response.data.stories);
//       }
//     } catch (error) {
//       toast.error("Unable to search memories.");
//     }
//   };

//   const filterNotesByDate = async (day) => {
//     try {
//       if (!day?.from || !day?.to) return;

//       const startDate = moment(day.from).startOf("day").valueOf();
//       const endDate = moment(day.to).endOf("day").valueOf();

//       const response = await axiosInstance.get("/notes/filter", {
//         params: { startDate, endDate },
//       });

//       if (response.data?.stories) {
//         setFilterType("date");
//         setAllNotes(response.data.stories);
//       }
//     } catch (error) {
//       toast.error("Unable to filter memories by date.");
//     }
//   };

//   const handleDayClick = (day) => {
//     if (!day) return;

//     setDateRange(day);

//     if (day.from && day.to) {
//       filterNotesByDate(day);
//     }
//   };

//   const handleClearSearch = () => {
//     setSearchQuery("");
//     setDateRange({ from: null, to: null });
//     setFilterType("");
//     getAllNotes();
//   };

//   const resetFilter = () => {
//     setDateRange({ from: null, to: null });
//     setFilterType("");
//     setSearchQuery("");
//     getAllNotes();
//   };

//   useEffect(() => {
//     getUserInfo();
//     getAllNotes();
//   }, []);

//   const favouriteCount = allNotes.filter(
//     (note) => note.isFavourite
//   ).length;

//   const firstName =
//     userInfo?.fullName?.trim().split(/\s+/)[0] || "there";

//   const addMemory = () => {
//     setOpenEditModal({
//       isShown: true,
//       type: "add",
//       data: null,
//     });
//   };

//   return (
//     <div className="relative min-h-screen overflow-x-hidden bg-[#0d0915] text-white">
//       {/* Background glow */}
//       <div className="pointer-events-none fixed -left-32 top-32 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[110px]" />
//       <div className="pointer-events-none fixed -right-32 top-48 h-80 w-80 rounded-full bg-blue-600/10 blur-[120px]" />

//       {/* Navbar */}
//       <div className="relative z-30 border-b border-white/[0.06]">
//         <Navbar
//           userInfo={userInfo}
//           searchQuery={searchQuery}
//           setSearchQuery={setSearchQuery}
//           onSearchNote={onSearchNote}
//           handleClearSearch={handleClearSearch}
//         />
//       </div>

//       <main className="relative z-10 mx-auto w-full max-w-[1500px] px-4 pb-24 pt-5 sm:px-6 sm:pt-7 lg:px-8">
//         {/* Main dashboard */}
//         <section className="mb-6 grid grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
//           {/* Left column */}
//           <div className="min-w-0 space-y-4">
//             {/* Welcome */}
//             <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#191021] via-[#171020] to-[#101827] p-5 sm:p-6">
//               <div className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full bg-fuchsia-500/10 blur-[70px]" />

//               <div className="relative">
//                 <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-fuchsia-300/15 bg-fuchsia-400/[0.07] px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-fuchsia-200">
//                   <Sparkles className="h-3.5 w-3.5" />
//                   YOUR PERSONAL MEMORY JOURNAL
//                 </div>

//                 <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
//                   Welcome back, {firstName}
//                   <span className="ml-2 text-fuchsia-300">♡</span>
//                 </h1>

//                 <p className="mt-2 max-w-xl text-sm leading-6 text-white/50">
//                   Keep your favourite memories, revisit special places,
//                   and save the little moments that matter.
//                 </p>

//                 <button
//                   type="button"
//                   onClick={addMemory}
//                   className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-950/30 transition duration-200 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0"
//                 >
//                   <Plus className="h-4 w-4" />
//                   Create a memory
//                 </button>
//               </div>
//             </div>

//             {/* Connect button / expandable connection panel */}
//             <div className="w-full">
//               {!showConnections ? (
//                 <button
//                   type="button"
//                   onClick={() => setShowConnections(true)}
//                   className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-[#15111c] p-5 text-left transition-all duration-300 hover:border-violet-400/30 hover:bg-[#191421] sm:p-6"
//                 >
//                   <div className="flex min-w-0 items-center gap-4">
//                     <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300 transition-transform duration-300 group-hover:scale-105">
//                       <Users className="h-5 w-5" />
//                     </div>

//                     <div className="min-w-0">
//                       <h2 className="text-base font-semibold text-white sm:text-lg">
//                         Connect
//                       </h2>
//                       <p className="mt-1 text-sm leading-5 text-white/45">
//                         Find people and manage your connection requests.
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300 transition-all duration-300 group-hover:bg-violet-500/20">
//                     <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
//                   </div>
//                 </button>
//               ) : (
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between gap-3">
//                     <div>
//                       <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">
//                         Your connections
//                       </p>
//                       <p className="mt-1 text-xs text-white/40">
//                         Find people and manage your requests
//                       </p>
//                     </div>

//                     <button
//                       type="button"
//                       onClick={() => setShowConnections(false)}
//                       className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs font-medium text-white/60 transition-colors hover:border-white/15 hover:bg-white/[0.08] hover:text-white"
//                     >
//                       <X className="h-3.5 w-3.5" />
//                       Close
//                     </button>
//                   </div>

//                   <div className="rounded-2xl border border-white/[0.07] bg-[#15111c] p-3 sm:p-4">
//                     <ConnectionPanel />
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Statistics */}
//             <div className="grid grid-cols-2 gap-3">
//               <div className="flex min-h-[100px] items-center gap-3 rounded-2xl border border-white/[0.07] bg-[#15111c] p-4 transition hover:border-fuchsia-400/20">
//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-fuchsia-400/10 text-fuchsia-300">
//                   <BookHeart className="h-5 w-5" />
//                 </div>
//                 <div className="min-w-0">
//                   <p className="text-2xl font-bold text-white">
//                     {allNotes.length}
//                   </p>
//                   <p className="text-xs text-white/45">
//                     Memories shown
//                   </p>
//                 </div>
//               </div>

//               <div className="flex min-h-[100px] items-center gap-3 rounded-2xl border border-white/[0.07] bg-[#15111c] p-4 transition hover:border-pink-400/20">
//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-400/10 text-pink-300">
//                   <Heart className="h-5 w-5 fill-current" />
//                 </div>
//                 <div className="min-w-0">
//                   <p className="text-2xl font-bold text-white">
//                     {favouriteCount}
//                   </p>
//                   <p className="text-xs text-white/45">
//                     Favourites shown
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Calendar — right column */}
//           <aside className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#15111c]">
//             <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3.5">
//               <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-fuchsia-400/10 text-fuchsia-300">
//                 <CalendarDays className="h-4 w-4" />
//               </div>
//               <div>
//                 <h2 className="text-sm font-semibold text-white">
//                   Memory timeline
//                 </h2>
//                 <p className="mt-0.5 text-xs text-white/40">
//                   Find memories by date
//                 </p>
//               </div>
//             </div>

//             <div className="overflow-x-auto p-2 sm:p-3">
//               <DayPicker
//                 mode="range"
//                 selected={dateRange}
//                 onSelect={handleDayClick}
//                 captionLayout="dropdown-buttons"
//                 pagedNavigation
//                 classNames={{
//                   ...defaultClassNames,
//                   root: `${defaultClassNames.root} mx-auto w-full`,
//                   months: `${defaultClassNames.months} w-full`,
//                   month: `${defaultClassNames.month} w-full`,
//                   month_grid: `${defaultClassNames.month_grid} w-full border-collapse`,
//                   weekdays: `${defaultClassNames.weekdays} text-[11px] font-medium text-white/40`,
//                   weekday: `${defaultClassNames.weekday} py-2`,
//                   day: `${defaultClassNames.day} p-0`,
//                   day_button: `${defaultClassNames.day_button} h-9 w-9 rounded-lg text-xs text-white/75 transition hover:bg-fuchsia-400/15 hover:text-white`,
//                   today: `${defaultClassNames.today} font-bold text-fuchsia-300`,
//                   selected: `${defaultClassNames.selected} !bg-fuchsia-500 !text-white rounded-lg`,
//                   range_start: `${defaultClassNames.range_start} !rounded-l-lg !bg-fuchsia-500 !text-white`,
//                   range_end: `${defaultClassNames.range_end} !rounded-r-lg !bg-fuchsia-500 !text-white`,
//                   range_middle: `${defaultClassNames.range_middle} !bg-fuchsia-500/15 !text-fuchsia-100`,
//                   nav: `${defaultClassNames.nav} text-fuchsia-300`,
//                   button_previous: `${defaultClassNames.button_previous} rounded-lg text-white/60 hover:bg-white/5`,
//                   button_next: `${defaultClassNames.button_next} rounded-lg text-white/60 hover:bg-white/5`,
//                   chevron: `${defaultClassNames.chevron} fill-fuchsia-300`,
//                   caption_label: `${defaultClassNames.caption_label} text-sm font-semibold text-white`,
//                   dropdowns: `${defaultClassNames.dropdowns} gap-1`,
//                   dropdown: `${defaultClassNames.dropdown} rounded-md border border-white/10 bg-[#201829] px-1 py-1 text-xs text-white outline-none focus:border-fuchsia-400/50`,
//                 }}
//               />
//             </div>

//             <div className="border-t border-white/[0.06] px-4 py-3">
//               <p className="text-xs leading-5 text-white/40">
//                 Select a start and end date to find memories from that period.
//               </p>

//               {dateRange.from && (
//                 <div className="mt-3 rounded-lg border border-fuchsia-300/10 bg-fuchsia-400/[0.06] px-3 py-2 text-xs text-fuchsia-200">
//                   <span>
//                     {moment(dateRange.from).format("MMM D, YYYY")}
//                   </span>
//                   {dateRange.to && (
//                     <>
//                       <span className="mx-2 text-white/30">→</span>
//                       <span>
//                         {moment(dateRange.to).format("MMM D, YYYY")}
//                       </span>
//                     </>
//                   )}
//                 </div>
//               )}

//               {(filterType === "date" || dateRange.from) && (
//                 <button
//                   type="button"
//                   onClick={resetFilter}
//                   className="mt-3 w-full rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-white/60 transition hover:border-fuchsia-400/30 hover:bg-fuchsia-400/[0.06] hover:text-fuchsia-200"
//                 >
//                   Clear date filter
//                 </button>
//               )}
//             </div>
//           </aside>
//         </section>

//         {/* Memories heading */}
//         <section className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
//           <div>
//             <div className="mb-1.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-fuchsia-300/80">
//               <Images className="h-3.5 w-3.5" />
//               YOUR COLLECTION
//             </div>

//             <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
//               Your memories
//               <span className="ml-2 text-fuchsia-300">♡</span>
//             </h2>

//             <p className="mt-1 text-xs text-white/40 sm:text-sm">
//               Little moments, beautifully remembered.
//             </p>
//           </div>

//           <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs text-white/45">
//             <ArrowDownWideNarrow className="h-3.5 w-3.5 text-fuchsia-300" />
//             Your story collection
//           </div>
//         </section>

//         {/* Notes grid */}
//         <section className="min-w-0 w-full">
//           <FilterInfoTitle
//             filterType={filterType}
//             filterDates={dateRange}
//             onClear={resetFilter}
//           />

//           {allNotes.length > 0 ? (
//             <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3">
//               {allNotes.map((item) => (
//                 <NotesCard
//                   key={item._id}
//                   imageUrl={item.imageUrl}
//                   title={item.title}
//                   date={item.visitedDate}
//                   story={item.story}
//                   visitedLocation={item.visitedLocation}
//                   isFavourite={item.isFavourite}
//                   onFavouriteClick={() => updateIsFavourite(item)}
//                   onClick={() => handleViewNote(item)}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="mt-4 rounded-2xl border border-white/[0.07] bg-[#15111c] p-4 sm:p-6">
//               <EmptyCard
//                 imgSrc={emptyImg}
//                 message={getEmptyCardMessage(filterType)}
//               />
//             </div>
//           )}
//         </section>
//       </main>

//       {/* Add/Edit modal */}
//       <Modal
//         isOpen={openEditModal.isShown}
//         onRequestClose={() =>
//           setOpenEditModal({
//             isShown: false,
//             type: "add",
//             data: null,
//           })
//         }
//         appElement={document.getElementById("root")}
//         overlayClassName="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-3 backdrop-blur-sm sm:p-6"
//         className="relative my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#15111c] shadow-2xl outline-none"
//       >
//         <AddEditNote
//           type={openEditModal.type}
//           storyInfo={openEditModal.data}
//           onClose={() =>
//             setOpenEditModal({
//               isShown: false,
//               type: "add",
//               data: null,
//             })
//           }
//           getAllNotes={getAllNotes}
//         />
//       </Modal>

//       {/* View note modal */}
//       <Modal
//         isOpen={openViewModal.isShown}
//         onRequestClose={() =>
//           setOpenViewModal({ isShown: false, data: null })
//         }
//         appElement={document.getElementById("root")}
//         overlayClassName="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-3 backdrop-blur-sm sm:p-6"
//         className="relative my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#15111c] shadow-2xl outline-none"
//       >
//         <ViewNote
//           type={openViewModal.type}
//           storyInfo={openViewModal.data}
//           onClose={() =>
//             setOpenViewModal((prevState) => ({
//               ...prevState,
//               isShown: false,
//             }))
//           }
//           handleEdit={() => {
//             setOpenViewModal((prevState) => ({
//               ...prevState,
//               isShown: false,
//             }));
//             handleEdit(openViewModal.data || null);
//           }}
//           handleDelete={() => handleDelete(openViewModal.data || null)}
//         />
//       </Modal>

//       {/* Floating create button */}
//       <button
//         type="button"
//         aria-label="Create a new memory"
//         onClick={addMemory}
//         className="group fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-600 to-pink-500 text-white shadow-lg shadow-fuchsia-950/40 transition duration-200 hover:-translate-y-1 hover:brightness-110 active:scale-95 sm:bottom-7 sm:right-7"
//       >
//         <Plus className="h-6 w-6 transition-transform duration-200 group-hover:rotate-90" />
//         <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg border border-white/10 bg-[#201829] px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
//           Create a memory
//         </span>
//       </button>

//       <ToastContainer
//         position="bottom-right"
//         autoClose={2500}
//         theme="dark"
//         toastClassName="!rounded-xl !border !border-white/10"
//       />
//     </div>
//   );
// };

// export default Home;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Sparkles,
  BookHeart,
  CalendarDays,
  Plus,
} from "lucide-react";
import Navbar from "../../Components/Navbar";
import axiosInstance from "../../utils/axiosinstance";
import NotesCard from "../../Components/Card/NotesCard";
import AddEditNote from "./AddEditNote";
import ViewNote from "./ViewNote";
import FilterInfoTitle from "../../Components/Card/FilterInfoTitle";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmptyCard from "../../Components/Card/EmptyCard";
import emptyImg from "../../images/emptyImg.jpg";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import moment from "moment";
import { getEmptyCardMessage } from "../../utils/helper";

const Home = () => {
  const navigate = useNavigate();
  const defaultClassNames = getDefaultClassNames();

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null,
  });

  const [openEditModal, setOpenEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null,
  });

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");

      if (response.data?.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      } else {
        console.error("Unable to fetch user information.");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/getall-stories");

      if (response.data?.stories) {
        setAllNotes(response.data.stories);
      }
    } catch (error) {
      console.error("Unable to fetch notes.");
    }
  };

  const handleDelete = async (data) => {
    if (!data?._id) return;

    try {
      const response = await axiosInstance.delete(
        `/delete-story/${data._id}`
      );

      if (response.data && !response.data.error) {
        toast.success("Memory deleted successfully 💗");
        setOpenViewModal({ isShown: false, data: null });
        getAllNotes();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to delete this memory."
      );
    }
  };


  const handleEdit = (data) => {
    setOpenEditModal({
      isShown: true,
      type: "edit",
      data,
    });
  };


  const updateIsFavourite = async (data) => {
    const storyId = data._id;

    try {
      const response = await axiosInstance.put(
        `/update-is-favourite/${storyId}`,
        { isFavourite: !data.isFavourite }
      );

      if (response.data?.story) {
        toast.success(
          data.isFavourite
            ? "Removed from favourites"
            : "Added to favourites 💗"
        );

        if (filterType === "search" && searchQuery) {
          onSearchNote(searchQuery);
        } else if (filterType === "date") {
          filterNotesByDate(dateRange);
        } else {
          getAllNotes();
        }
      }
    } catch (error) {
      toast.error("Unable to update your favourites.");
    }
  };

  const handleViewNote = (data) => {
    setOpenViewModal({
      isShown: true,
      data,
    });
  };

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search", {
        params: { query },
      });

      if (response.data?.stories) {
        setFilterType("search");
        setAllNotes(response.data.stories);
      }
    } catch (error) {
      toast.error("Unable to search memories.");
    }
  };

  const filterNotesByDate = async (day) => {
    try {
      if (!day?.from || !day?.to) return;

      const startDate = moment(day.from).startOf("day").valueOf();
      const endDate = moment(day.to).endOf("day").valueOf();

      const response = await axiosInstance.get("/notes/filter", {
        params: { startDate, endDate },
      });

      if (response.data?.stories) {
        setFilterType("date");
        setAllNotes(response.data.stories);
      }
    } catch (error) {
      toast.error("Unable to filter memories by date.");
    }
  };

 
  const handleDayClick = (day) => {
    if (!day) return;

    setDateRange(day);

    if (day.from && day.to) {
      filterNotesByDate(day);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setDateRange({ from: null, to: null });
    setFilterType("");
    getAllNotes();
  };

  const resetFilter = () => {
    setDateRange({ from: null, to: null });
    setFilterType("");
    setSearchQuery("");
    getAllNotes();
  };

  useEffect(() => {
    getUserInfo();
    getAllNotes();
  }, []);

  const firstName =
    userInfo?.fullName?.trim().split(/\s+/)[0] || "there";

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#100819] text-white">
      
      <div className="pointer-events-none fixed -left-32 top-32 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-[110px]" />
      <div className="pointer-events-none fixed -right-32 top-64 h-96 w-96 rounded-full bg-blue-600/15 blur-[120px]" />
      <div className="pointer-events-none fixed bottom-0 left-1/3 h-64 w-64 rounded-full bg-purple-600/10 blur-[110px]" />

    
      <div className="relative z-30">
        <Navbar
          userInfo={userInfo}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchNote={onSearchNote}
          handleClearSearch={handleClearSearch}
        />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pb-28 pt-7 sm:px-6 sm:pt-10 lg:px-10">
      
        <section className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      
          <div className="relative flex flex-col justify-between gap-6 overflow-hidden rounded-[2rem] border border-fuchsia-400/20 bg-gradient-to-br from-[#21122f] via-[#1b102b] to-[#141020] p-6 shadow-[0_16px_50px_-20px_rgba(217,70,239,0.2)] sm:flex-row sm:items-center sm:p-8">
            <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full bg-fuchsia-500/15 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-20 left-[30%] h-48 w-48 rounded-full bg-blue-500/10 blur-[80px]" />

            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-3.5 py-2 text-xs font-semibold tracking-wide text-fuchsia-200">
                <Sparkles className="h-4 w-4 text-fuchsia-300" />
                YOUR MEMORIES, YOUR STORY
              </div>

              <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                Hey, {firstName}!
                <span className="ml-2 bg-gradient-to-r from-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
                  ♡
                </span>
              </h1>

              <h2 className="mt-2 text-lg font-bold text-purple-100 sm:text-xl">
                Create a new memory
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-6 text-purple-300 sm:text-base">
                Save a special day, a favourite place, or a moment you
                never want to forget.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setOpenEditModal({
                  isShown: true,
                  type: "add",
                  data: null,
                })
              }
              className="relative inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-blue-500 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-fuchsia-950/30 transition duration-300 hover:-translate-y-1 hover:shadow-fuchsia-500/25 active:scale-[0.98]"
            >
              <Plus className="h-5 w-5" />
              Add memory
            </button>
          </div>

     
          <aside className="w-full min-w-0">
            <div className="relative overflow-hidden rounded-[2rem] border border-fuchsia-400/20 bg-gradient-to-br from-[#21122f] via-[#1b102b] to-[#141020] shadow-[0_16px_50px_-20px_rgba(217,70,239,0.2)]">
           
              <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-fuchsia-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl" />

           
              <div className="relative border-b border-fuchsia-400/15 bg-gradient-to-r from-fuchsia-500/10 via-purple-500/10 to-blue-500/10 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-500/20 to-blue-500/20 text-fuchsia-300 shadow-[0_0_20px_rgba(217,70,239,0.08)]">
                    <CalendarDays className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-bold text-white">
                      Memory timeline
                    </h3>
                    <p className="mt-0.5 text-xs text-purple-300">
                      Find a special day
                    </p>
                  </div>
                </div>
              </div>

         
              <div className="relative overflow-x-auto p-2 sm:p-3">
                <DayPicker
                  mode="range"
                  selected={dateRange}
                  onSelect={handleDayClick}
                  captionLayout="dropdown-buttons"
                  pagedNavigation
                  classNames={{
                    ...defaultClassNames,

                    root: `${defaultClassNames.root} mx-auto w-full p-2 text-purple-100`,
                    months: `${defaultClassNames.months} w-full`,
                    month: `${defaultClassNames.month} w-full`,
                    month_grid: `${defaultClassNames.month_grid} w-full border-collapse`,

                    weekdays: `${defaultClassNames.weekdays} text-xs font-semibold text-fuchsia-300`,
                    weekday: `${defaultClassNames.weekday} py-2 text-fuchsia-300`,

                    day: `${defaultClassNames.day} p-0`,
                    day_button: `${defaultClassNames.day_button} h-9 w-9 rounded-xl text-sm text-purple-100 transition-all duration-200 hover:bg-fuchsia-500/15 hover:text-fuchsia-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400`,

                    today: `${defaultClassNames.today} font-bold text-cyan-300`,

                    selected: `${defaultClassNames.selected} !rounded-xl !bg-fuchsia-500 !text-white shadow-[0_0_12px_rgba(217,70,239,0.25)]`,

                    range_start: `${defaultClassNames.range_start} !rounded-l-xl !bg-fuchsia-500 !text-white`,
                    range_end: `${defaultClassNames.range_end} !rounded-r-xl !bg-blue-500 !text-white`,
                    range_middle: `${defaultClassNames.range_middle} !bg-fuchsia-500/15 !text-fuchsia-200`,

                    outside: `${defaultClassNames.outside} !text-purple-500/40`,
                    disabled: `${defaultClassNames.disabled} !cursor-not-allowed !text-purple-500/30`,

                    nav: `${defaultClassNames.nav} text-fuchsia-300`,
                    button_previous: `${defaultClassNames.button_previous} rounded-xl text-purple-200 transition hover:bg-fuchsia-500/15 hover:text-fuchsia-300`,
                    button_next: `${defaultClassNames.button_next} rounded-xl text-purple-200 transition hover:bg-fuchsia-500/15 hover:text-fuchsia-300`,

                    chevron: `${defaultClassNames.chevron} fill-fuchsia-300`,
                    caption_label: `${defaultClassNames.caption_label} font-bold text-white`,

                    dropdowns: `${defaultClassNames.dropdowns} gap-1`,
                    dropdown: `${defaultClassNames.dropdown} rounded-lg border border-fuchsia-400/20 bg-[#21122f] px-1 py-1 text-sm text-purple-100 outline-none focus:border-fuchsia-400`,
                  }}
                />
              </div>

              
              <div className="relative border-t border-fuchsia-400/15 px-5 py-4">
                <div className="flex items-start gap-2.5">
                  <Heart className="mt-0.5 h-4 w-4 shrink-0 fill-fuchsia-400/50 text-fuchsia-300" />

                  <p className="text-xs leading-5 text-purple-300">
                    Select a start and end date to discover memories
                    from that time.
                  </p>
                </div>

                {dateRange.from && (
                  <div className="mt-3 rounded-xl border border-fuchsia-400/15 bg-gradient-to-r from-fuchsia-500/10 to-blue-500/10 px-3 py-2 text-xs font-medium text-fuchsia-200">
                    <span>
                      {moment(dateRange.from).format("MMM D, YYYY")}
                    </span>

                    {dateRange.to && (
                      <>
                        <span className="mx-2 text-purple-400">→</span>
                        <span>
                          {moment(dateRange.to).format("MMM D, YYYY")}
                        </span>
                      </>
                    )}
                  </div>
                )}

                {(filterType === "date" || dateRange.from) && (
                  <button
                    type="button"
                    onClick={resetFilter}
                    className="mt-3 w-full rounded-xl border border-fuchsia-400/20 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-fuchsia-300 transition-all duration-200 hover:border-fuchsia-400/40 hover:bg-fuchsia-500/10 hover:text-fuchsia-200 active:scale-[0.98]"
                  >
                    Clear date filter
                  </button>
                )}
              </div>
            </div>
          </aside>
        </section>

     
        <section className="w-full">
          <FilterInfoTitle
            filterType={filterType}
            filterDates={dateRange}
            onClear={resetFilter}
          />

          {allNotes.length > 0 ? (
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-3">
              {allNotes.map((item) => (
                <NotesCard
                  key={item._id}
                  imageUrl={item.imageUrl}
                  title={item.title}
                  date={item.visitedDate}
                  story={item.story}
                  visitedLocation={item.visitedLocation}
                  isFavourite={item.isFavourite}
                  onFavouriteClick={() => updateIsFavourite(item)}
                  onClick={() => handleViewNote(item)}
                />
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-[2rem] border border-fuchsia-400/15 bg-[#1b102b]/60 p-4 backdrop-blur-lg sm:p-6">
              <EmptyCard
                imgSrc={emptyImg}
                message={getEmptyCardMessage(filterType)}
              />
            </div>
          )}
        </section>
      </main>

 
      <Modal
        isOpen={openEditModal.isShown}
        onRequestClose={() =>
          setOpenEditModal({
            isShown: false,
            type: "add",
            data: null,
          })
        }
        appElement={document.getElementById("root")}
        overlayClassName="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#080410]/80 p-3 backdrop-blur-md sm:p-6"
        className="relative my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-fuchsia-400/20 bg-[#1b102b] text-white shadow-2xl shadow-fuchsia-950/30 outline-none"
      >
        <AddEditNote
          type={openEditModal.type}
          storyInfo={openEditModal.data}
          onClose={() =>
            setOpenEditModal({
              isShown: false,
              type: "add",
              data: null,
            })
          }
          getAllNotes={getAllNotes}
        />
      </Modal>

  
      <Modal
        isOpen={openViewModal.isShown}
        onRequestClose={() =>
          setOpenViewModal({ isShown: false, data: null })
        }
        appElement={document.getElementById("root")}
        overlayClassName="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#080410]/80 p-3 backdrop-blur-md sm:p-6"
        className="relative my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-fuchsia-400/20 bg-[#1b102b] text-white shadow-2xl shadow-fuchsia-950/30 outline-none"
      >
        <ViewNote
          type={openViewModal.type}
          storyInfo={openViewModal.data}
          onClose={() =>
            setOpenViewModal((prevState) => ({
              ...prevState,
              isShown: false,
            }))
          }
          handleEdit={() => {
            setOpenViewModal((prevState) => ({
              ...prevState,
              isShown: false,
            }));
            handleEdit(openViewModal.data || null);
          }}
          handleDelete={() =>
            handleDelete(openViewModal.data || null)
          }
        />
      </Modal>

      <button
        type="button"
        aria-label="Create a new memory"
        onClick={() =>
          setOpenEditModal({
            isShown: true,
            type: "add",
            data: null,
          })
        }
        className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-blue-500 text-white shadow-xl shadow-fuchsia-950/40 transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-fuchsia-500/30 active:scale-95 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
      >
        <Plus className="h-7 w-7 transition-transform duration-300 group-hover:rotate-90 sm:h-8 sm:w-8" />

        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl border border-fuchsia-400/20 bg-[#21122f] px-3 py-2 text-xs font-semibold text-fuchsia-200 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
          Create a memory
        </span>
      </button>

  
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        theme="dark"
        toastClassName="!rounded-2xl !border !border-fuchsia-400/20 !bg-[#21122f] !text-purple-100 !shadow-lg"
      />
    </div>
  );
};

export default Home;

