

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

// //   const firstName =
// //     userInfo?.fullName?.trim().split(/\s+/)[0] || "there";

// //   const addMemory = () => {
// //     setOpenEditModal({
// //       isShown: true,
// //       type: "add",
// //       data: null,
// //     });
// //   };

// //   return (
// //     <div className="relative min-h-screen overflow-x-hidden bg-[#0d0915] text-white">
// //       {/* Background glow */}
// //       <div className="pointer-events-none fixed -left-32 top-32 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[110px]" />
// //       <div className="pointer-events-none fixed -right-32 top-48 h-80 w-80 rounded-full bg-blue-600/10 blur-[120px]" />

// //       {/* Navbar */}
// //       <div className="relative z-30 border-b border-white/[0.06]">
// //         <Navbar
// //           userInfo={userInfo}
// //           searchQuery={searchQuery}
// //           setSearchQuery={setSearchQuery}
// //           onSearchNote={onSearchNote}
// //           handleClearSearch={handleClearSearch}
// //         />
// //       </div>

// //       <main className="relative z-10 mx-auto w-full max-w-[1500px] px-4 pb-24 pt-5 sm:px-6 sm:pt-7 lg:px-8">
// //         {/* Main dashboard */}
// //         <section className="mb-6 grid grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
// //           {/* Left column */}
// //           <div className="min-w-0 space-y-4">
// //             {/* Welcome */}
// //             <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#191021] via-[#171020] to-[#101827] p-5 sm:p-6">
// //               <div className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full bg-fuchsia-500/10 blur-[70px]" />

// //               <div className="relative">
// //                 <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-fuchsia-300/15 bg-fuchsia-400/[0.07] px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-fuchsia-200">
// //                   <Sparkles className="h-3.5 w-3.5" />
// //                   YOUR PERSONAL MEMORY JOURNAL
// //                 </div>

// //                 <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
// //                   Welcome back, {firstName}
// //                   <span className="ml-2 text-fuchsia-300">♡</span>
// //                 </h1>

// //                 <p className="mt-2 max-w-xl text-sm leading-6 text-white/50">
// //                   Keep your favourite memories, revisit special places,
// //                   and save the little moments that matter.
// //                 </p>

// //                 <button
// //                   type="button"
// //                   onClick={addMemory}
// //                   className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-950/30 transition duration-200 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0"
// //                 >
// //                   <Plus className="h-4 w-4" />
// //                   Create a memory
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Connection panel — restored */}
// //             <div className="rounded-2xl border border-white/[0.07] bg-[#15111c] p-3 transition hover:border-violet-400/15 sm:p-4">
// //               <ConnectionPanel />
// //             </div>

// //             {/* Statistics */}
// //             <div className="grid grid-cols-2 gap-3">
// //               <div className="flex min-h-[100px] items-center gap-3 rounded-2xl border border-white/[0.07] bg-[#15111c] p-4 transition hover:border-fuchsia-400/20">
// //                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-fuchsia-400/10 text-fuchsia-300">
// //                   <BookHeart className="h-5 w-5" />
// //                 </div>
// //                 <div className="min-w-0">
// //                   <p className="text-2xl font-bold text-white">
// //                     {allNotes.length}
// //                   </p>
// //                   <p className="text-xs text-white/45">
// //                     Memories shown
// //                   </p>
// //                 </div>
// //               </div>

// //               <div className="flex min-h-[100px] items-center gap-3 rounded-2xl border border-white/[0.07] bg-[#15111c] p-4 transition hover:border-pink-400/20">
// //                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-400/10 text-pink-300">
// //                   <Heart className="h-5 w-5 fill-current" />
// //                 </div>
// //                 <div className="min-w-0">
// //                   <p className="text-2xl font-bold text-white">
// //                     {favouriteCount}
// //                   </p>
// //                   <p className="text-xs text-white/45">
// //                     Favourites shown
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Calendar — right column */}
// //           <aside className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#15111c]">
// //             <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3.5">
// //               <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-fuchsia-400/10 text-fuchsia-300">
// //                 <CalendarDays className="h-4 w-4" />
// //               </div>
// //               <div>
// //                 <h2 className="text-sm font-semibold text-white">
// //                   Memory timeline
// //                 </h2>
// //                 <p className="mt-0.5 text-xs text-white/40">
// //                   Find memories by date
// //                 </p>
// //               </div>
// //             </div>

// //             <div className="overflow-x-auto p-2 sm:p-3">
// //               <DayPicker
// //                 mode="range"
// //                 selected={dateRange}
// //                 onSelect={handleDayClick}
// //                 captionLayout="dropdown-buttons"
// //                 pagedNavigation
// //                 classNames={{
// //                   ...defaultClassNames,
// //                   root: `${defaultClassNames.root} mx-auto w-full`,
// //                   months: `${defaultClassNames.months} w-full`,
// //                   month: `${defaultClassNames.month} w-full`,
// //                   month_grid: `${defaultClassNames.month_grid} w-full border-collapse`,
// //                   weekdays: `${defaultClassNames.weekdays} text-[11px] font-medium text-white/40`,
// //                   weekday: `${defaultClassNames.weekday} py-2`,
// //                   day: `${defaultClassNames.day} p-0`,
// //                   day_button: `${defaultClassNames.day_button} h-9 w-9 rounded-lg text-xs text-white/75 transition hover:bg-fuchsia-400/15 hover:text-white`,
// //                   today: `${defaultClassNames.today} font-bold text-fuchsia-300`,
// //                   selected: `${defaultClassNames.selected} !bg-fuchsia-500 !text-white rounded-lg`,
// //                   range_start: `${defaultClassNames.range_start} !rounded-l-lg !bg-fuchsia-500 !text-white`,
// //                   range_end: `${defaultClassNames.range_end} !rounded-r-lg !bg-fuchsia-500 !text-white`,
// //                   range_middle: `${defaultClassNames.range_middle} !bg-fuchsia-500/15 !text-fuchsia-100`,
// //                   nav: `${defaultClassNames.nav} text-fuchsia-300`,
// //                   button_previous: `${defaultClassNames.button_previous} rounded-lg text-white/60 hover:bg-white/5`,
// //                   button_next: `${defaultClassNames.button_next} rounded-lg text-white/60 hover:bg-white/5`,
// //                   chevron: `${defaultClassNames.chevron} fill-fuchsia-300`,
// //                   caption_label: `${defaultClassNames.caption_label} text-sm font-semibold text-white`,
// //                   dropdowns: `${defaultClassNames.dropdowns} gap-1`,
// //                   dropdown: `${defaultClassNames.dropdown} rounded-md border border-white/10 bg-[#201829] px-1 py-1 text-xs text-white outline-none focus:border-fuchsia-400/50`,
// //                 }}
// //               />
// //             </div>

// //             <div className="border-t border-white/[0.06] px-4 py-3">
// //               <p className="text-xs leading-5 text-white/40">
// //                 Select a start and end date to find memories from that period.
// //               </p>

// //               {dateRange.from && (
// //                 <div className="mt-3 rounded-lg border border-fuchsia-300/10 bg-fuchsia-400/[0.06] px-3 py-2 text-xs text-fuchsia-200">
// //                   <span>
// //                     {moment(dateRange.from).format("MMM D, YYYY")}
// //                   </span>
// //                   {dateRange.to && (
// //                     <>
// //                       <span className="mx-2 text-white/30">→</span>
// //                       <span>
// //                         {moment(dateRange.to).format("MMM D, YYYY")}
// //                       </span>
// //                     </>
// //                   )}
// //                 </div>
// //               )}

// //               {(filterType === "date" || dateRange.from) && (
// //                 <button
// //                   type="button"
// //                   onClick={resetFilter}
// //                   className="mt-3 w-full rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-white/60 transition hover:border-fuchsia-400/30 hover:bg-fuchsia-400/[0.06] hover:text-fuchsia-200"
// //                 >
// //                   Clear date filter
// //                 </button>
// //               )}
// //             </div>
// //           </aside>
// //         </section>

// //         {/* Memories heading */}
// //         <section className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
// //           <div>
// //             <div className="mb-1.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-fuchsia-300/80">
// //               <Images className="h-3.5 w-3.5" />
// //               YOUR COLLECTION
// //             </div>

// //             <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
// //               Your memories
// //               <span className="ml-2 text-fuchsia-300">♡</span>
// //             </h2>

// //             <p className="mt-1 text-xs text-white/40 sm:text-sm">
// //               Little moments, beautifully remembered.
// //             </p>
// //           </div>

// //           <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs text-white/45">
// //             <ArrowDownWideNarrow className="h-3.5 w-3.5 text-fuchsia-300" />
// //             Your story collection
// //           </div>
// //         </section>

// //         {/* Notes grid */}
// //         <section className="min-w-0 w-full">
// //           <FilterInfoTitle
// //             filterType={filterType}
// //             filterDates={dateRange}
// //             onClear={resetFilter}
// //           />

// //           {allNotes.length > 0 ? (
// //             <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3">
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
// //             <div className="mt-4 rounded-2xl border border-white/[0.07] bg-[#15111c] p-4 sm:p-6">
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
// //         overlayClassName="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-3 backdrop-blur-sm sm:p-6"
// //         className="relative my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#15111c] shadow-2xl outline-none"
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
// //         overlayClassName="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-3 backdrop-blur-sm sm:p-6"
// //         className="relative my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#15111c] shadow-2xl outline-none"
// //       >
// //         <ViewNote
// //           type={openViewModal.type}
// //           storyInfo={openViewModal.data}
// //           onClose={() =>
// //             setOpenViewModal((prevState) => ({
// //               ...prevState,
// //               isShown: false,
// //             }))
// //           }
// //           handleEdit={() => {
// //             setOpenViewModal((prevState) => ({
// //               ...prevState,
// //               isShown: false,
// //             }));
// //             handleEdit(openViewModal.data || null);
// //           }}
// //           handleDelete={() => handleDelete(openViewModal.data || null)}
// //         />
// //       </Modal>

// //       {/* Floating create button */}
// //       <button
// //         type="button"
// //         aria-label="Create a new memory"
// //         onClick={addMemory}
// //         className="group fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-600 to-pink-500 text-white shadow-lg shadow-fuchsia-950/40 transition duration-200 hover:-translate-y-1 hover:brightness-110 active:scale-95 sm:bottom-7 sm:right-7"
// //       >
// //         <Plus className="h-6 w-6 transition-transform duration-200 group-hover:rotate-90" />
// //         <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg border border-white/10 bg-[#201829] px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
// //           Create a memory
// //         </span>
// //       </button>

// //       <ToastContainer
// //         position="bottom-right"
// //         autoClose={2500}
// //         theme="dark"
// //         toastClassName="!rounded-xl !border !border-white/10"
// //       />
// //     </div>
// //   );
// // };

// // export default Home;


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
// //   Users,
// //   ArrowRight,
// //   X,
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
// // import moment from "moment";
// // import { getEmptyCardMessage } from "../../utils/helper";

// // const Home = () => {
// //   const navigate = useNavigate();
// //   const defaultClassNames = getDefaultClassNames();

// //   const [userInfo, setUserInfo] = useState(null);
// //   const [allNotes, setAllNotes] = useState([]);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [filterType, setFilterType] = useState("");
// //   const [showConnections, setShowConnections] = useState(false);

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

// //   const firstName =
// //     userInfo?.fullName?.trim().split(/\s+/)[0] || "there";

// //   const addMemory = () => {
// //     setOpenEditModal({
// //       isShown: true,
// //       type: "add",
// //       data: null,
// //     });
// //   };

// //   return (
// //     <div className="relative min-h-screen overflow-x-hidden bg-[#0d0915] text-white">
// //       {/* Background glow */}
// //       <div className="pointer-events-none fixed -left-32 top-32 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[110px]" />
// //       <div className="pointer-events-none fixed -right-32 top-48 h-80 w-80 rounded-full bg-blue-600/10 blur-[120px]" />

// //       {/* Navbar */}
// //       <div className="relative z-30 border-b border-white/[0.06]">
// //         <Navbar
// //           userInfo={userInfo}
// //           searchQuery={searchQuery}
// //           setSearchQuery={setSearchQuery}
// //           onSearchNote={onSearchNote}
// //           handleClearSearch={handleClearSearch}
// //         />
// //       </div>

// //       <main className="relative z-10 mx-auto w-full max-w-[1500px] px-4 pb-24 pt-5 sm:px-6 sm:pt-7 lg:px-8">
// //         {/* Main dashboard */}
// //         <section className="mb-6 grid grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
// //           {/* Left column */}
// //           <div className="min-w-0 space-y-4">
// //             {/* Welcome */}
// //             <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#191021] via-[#171020] to-[#101827] p-5 sm:p-6">
// //               <div className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full bg-fuchsia-500/10 blur-[70px]" />

// //               <div className="relative">
// //                 <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-fuchsia-300/15 bg-fuchsia-400/[0.07] px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-fuchsia-200">
// //                   <Sparkles className="h-3.5 w-3.5" />
// //                   YOUR PERSONAL MEMORY JOURNAL
// //                 </div>

// //                 <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
// //                   Welcome back, {firstName}
// //                   <span className="ml-2 text-fuchsia-300">♡</span>
// //                 </h1>

// //                 <p className="mt-2 max-w-xl text-sm leading-6 text-white/50">
// //                   Keep your favourite memories, revisit special places,
// //                   and save the little moments that matter.
// //                 </p>

// //                 <button
// //                   type="button"
// //                   onClick={addMemory}
// //                   className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-950/30 transition duration-200 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0"
// //                 >
// //                   <Plus className="h-4 w-4" />
// //                   Create a memory
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Connect button / expandable connection panel */}
// //             <div className="w-full">
// //               {!showConnections ? (
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowConnections(true)}
// //                   className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-[#15111c] p-5 text-left transition-all duration-300 hover:border-violet-400/30 hover:bg-[#191421] sm:p-6"
// //                 >
// //                   <div className="flex min-w-0 items-center gap-4">
// //                     <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300 transition-transform duration-300 group-hover:scale-105">
// //                       <Users className="h-5 w-5" />
// //                     </div>

// //                     <div className="min-w-0">
// //                       <h2 className="text-base font-semibold text-white sm:text-lg">
// //                         Connect
// //                       </h2>
// //                       <p className="mt-1 text-sm leading-5 text-white/45">
// //                         Find people and manage your connection requests.
// //                       </p>
// //                     </div>
// //                   </div>

// //                   <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300 transition-all duration-300 group-hover:bg-violet-500/20">
// //                     <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
// //                   </div>
// //                 </button>
// //               ) : (
// //                 <div className="space-y-3">
// //                   <div className="flex items-center justify-between gap-3">
// //                     <div>
// //                       <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">
// //                         Your connections
// //                       </p>
// //                       <p className="mt-1 text-xs text-white/40">
// //                         Find people and manage your requests
// //                       </p>
// //                     </div>

// //                     <button
// //                       type="button"
// //                       onClick={() => setShowConnections(false)}
// //                       className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs font-medium text-white/60 transition-colors hover:border-white/15 hover:bg-white/[0.08] hover:text-white"
// //                     >
// //                       <X className="h-3.5 w-3.5" />
// //                       Close
// //                     </button>
// //                   </div>

// //                   <div className="rounded-2xl border border-white/[0.07] bg-[#15111c] p-3 sm:p-4">
// //                     <ConnectionPanel />
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Statistics */}
// //             <div className="grid grid-cols-2 gap-3">
// //               <div className="flex min-h-[100px] items-center gap-3 rounded-2xl border border-white/[0.07] bg-[#15111c] p-4 transition hover:border-fuchsia-400/20">
// //                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-fuchsia-400/10 text-fuchsia-300">
// //                   <BookHeart className="h-5 w-5" />
// //                 </div>
// //                 <div className="min-w-0">
// //                   <p className="text-2xl font-bold text-white">
// //                     {allNotes.length}
// //                   </p>
// //                   <p className="text-xs text-white/45">
// //                     Memories shown
// //                   </p>
// //                 </div>
// //               </div>

// //               <div className="flex min-h-[100px] items-center gap-3 rounded-2xl border border-white/[0.07] bg-[#15111c] p-4 transition hover:border-pink-400/20">
// //                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-400/10 text-pink-300">
// //                   <Heart className="h-5 w-5 fill-current" />
// //                 </div>
// //                 <div className="min-w-0">
// //                   <p className="text-2xl font-bold text-white">
// //                     {favouriteCount}
// //                   </p>
// //                   <p className="text-xs text-white/45">
// //                     Favourites shown
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Calendar — right column */}
// //           <aside className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#15111c]">
// //             <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3.5">
// //               <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-fuchsia-400/10 text-fuchsia-300">
// //                 <CalendarDays className="h-4 w-4" />
// //               </div>
// //               <div>
// //                 <h2 className="text-sm font-semibold text-white">
// //                   Memory timeline
// //                 </h2>
// //                 <p className="mt-0.5 text-xs text-white/40">
// //                   Find memories by date
// //                 </p>
// //               </div>
// //             </div>

// //             <div className="overflow-x-auto p-2 sm:p-3">
// //               <DayPicker
// //                 mode="range"
// //                 selected={dateRange}
// //                 onSelect={handleDayClick}
// //                 captionLayout="dropdown-buttons"
// //                 pagedNavigation
// //                 classNames={{
// //                   ...defaultClassNames,
// //                   root: `${defaultClassNames.root} mx-auto w-full`,
// //                   months: `${defaultClassNames.months} w-full`,
// //                   month: `${defaultClassNames.month} w-full`,
// //                   month_grid: `${defaultClassNames.month_grid} w-full border-collapse`,
// //                   weekdays: `${defaultClassNames.weekdays} text-[11px] font-medium text-white/40`,
// //                   weekday: `${defaultClassNames.weekday} py-2`,
// //                   day: `${defaultClassNames.day} p-0`,
// //                   day_button: `${defaultClassNames.day_button} h-9 w-9 rounded-lg text-xs text-white/75 transition hover:bg-fuchsia-400/15 hover:text-white`,
// //                   today: `${defaultClassNames.today} font-bold text-fuchsia-300`,
// //                   selected: `${defaultClassNames.selected} !bg-fuchsia-500 !text-white rounded-lg`,
// //                   range_start: `${defaultClassNames.range_start} !rounded-l-lg !bg-fuchsia-500 !text-white`,
// //                   range_end: `${defaultClassNames.range_end} !rounded-r-lg !bg-fuchsia-500 !text-white`,
// //                   range_middle: `${defaultClassNames.range_middle} !bg-fuchsia-500/15 !text-fuchsia-100`,
// //                   nav: `${defaultClassNames.nav} text-fuchsia-300`,
// //                   button_previous: `${defaultClassNames.button_previous} rounded-lg text-white/60 hover:bg-white/5`,
// //                   button_next: `${defaultClassNames.button_next} rounded-lg text-white/60 hover:bg-white/5`,
// //                   chevron: `${defaultClassNames.chevron} fill-fuchsia-300`,
// //                   caption_label: `${defaultClassNames.caption_label} text-sm font-semibold text-white`,
// //                   dropdowns: `${defaultClassNames.dropdowns} gap-1`,
// //                   dropdown: `${defaultClassNames.dropdown} rounded-md border border-white/10 bg-[#201829] px-1 py-1 text-xs text-white outline-none focus:border-fuchsia-400/50`,
// //                 }}
// //               />
// //             </div>

// //             <div className="border-t border-white/[0.06] px-4 py-3">
// //               <p className="text-xs leading-5 text-white/40">
// //                 Select a start and end date to find memories from that period.
// //               </p>

// //               {dateRange.from && (
// //                 <div className="mt-3 rounded-lg border border-fuchsia-300/10 bg-fuchsia-400/[0.06] px-3 py-2 text-xs text-fuchsia-200">
// //                   <span>
// //                     {moment(dateRange.from).format("MMM D, YYYY")}
// //                   </span>
// //                   {dateRange.to && (
// //                     <>
// //                       <span className="mx-2 text-white/30">→</span>
// //                       <span>
// //                         {moment(dateRange.to).format("MMM D, YYYY")}
// //                       </span>
// //                     </>
// //                   )}
// //                 </div>
// //               )}

// //               {(filterType === "date" || dateRange.from) && (
// //                 <button
// //                   type="button"
// //                   onClick={resetFilter}
// //                   className="mt-3 w-full rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-white/60 transition hover:border-fuchsia-400/30 hover:bg-fuchsia-400/[0.06] hover:text-fuchsia-200"
// //                 >
// //                   Clear date filter
// //                 </button>
// //               )}
// //             </div>
// //           </aside>
// //         </section>

// //         {/* Memories heading */}
// //         <section className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
// //           <div>
// //             <div className="mb-1.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-fuchsia-300/80">
// //               <Images className="h-3.5 w-3.5" />
// //               YOUR COLLECTION
// //             </div>

// //             <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
// //               Your memories
// //               <span className="ml-2 text-fuchsia-300">♡</span>
// //             </h2>

// //             <p className="mt-1 text-xs text-white/40 sm:text-sm">
// //               Little moments, beautifully remembered.
// //             </p>
// //           </div>

// //           <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs text-white/45">
// //             <ArrowDownWideNarrow className="h-3.5 w-3.5 text-fuchsia-300" />
// //             Your story collection
// //           </div>
// //         </section>

// //         {/* Notes grid */}
// //         <section className="min-w-0 w-full">
// //           <FilterInfoTitle
// //             filterType={filterType}
// //             filterDates={dateRange}
// //             onClear={resetFilter}
// //           />

// //           {allNotes.length > 0 ? (
// //             <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3">
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
// //             <div className="mt-4 rounded-2xl border border-white/[0.07] bg-[#15111c] p-4 sm:p-6">
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
// //         overlayClassName="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-3 backdrop-blur-sm sm:p-6"
// //         className="relative my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#15111c] shadow-2xl outline-none"
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
// //         overlayClassName="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-3 backdrop-blur-sm sm:p-6"
// //         className="relative my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#15111c] shadow-2xl outline-none"
// //       >
// //         <ViewNote
// //           type={openViewModal.type}
// //           storyInfo={openViewModal.data}
// //           onClose={() =>
// //             setOpenViewModal((prevState) => ({
// //               ...prevState,
// //               isShown: false,
// //             }))
// //           }
// //           handleEdit={() => {
// //             setOpenViewModal((prevState) => ({
// //               ...prevState,
// //               isShown: false,
// //             }));
// //             handleEdit(openViewModal.data || null);
// //           }}
// //           handleDelete={() => handleDelete(openViewModal.data || null)}
// //         />
// //       </Modal>

// //       {/* Floating create button */}
// //       <button
// //         type="button"
// //         aria-label="Create a new memory"
// //         onClick={addMemory}
// //         className="group fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-600 to-pink-500 text-white shadow-lg shadow-fuchsia-950/40 transition duration-200 hover:-translate-y-1 hover:brightness-110 active:scale-95 sm:bottom-7 sm:right-7"
// //       >
// //         <Plus className="h-6 w-6 transition-transform duration-200 group-hover:rotate-90" />
// //         <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg border border-white/10 bg-[#201829] px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
// //           Create a memory
// //         </span>
// //       </button>

// //       <ToastContainer
// //         position="bottom-right"
// //         autoClose={2500}
// //         theme="dark"
// //         toastClassName="!rounded-xl !border !border-white/10"
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
// } from "lucide-react";
// import Navbar from "../../Components/Navbar";
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

//   const firstName =
//     userInfo?.fullName?.trim().split(/\s+/)[0] || "there";

//   return (
//     <div className="relative min-h-screen overflow-x-hidden bg-[#100819] text-white">
      
//       <div className="pointer-events-none fixed -left-32 top-32 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-[110px]" />
//       <div className="pointer-events-none fixed -right-32 top-64 h-96 w-96 rounded-full bg-blue-600/15 blur-[120px]" />
//       <div className="pointer-events-none fixed bottom-0 left-1/3 h-64 w-64 rounded-full bg-purple-600/10 blur-[110px]" />

    
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
      
//         <section className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      
//           <div className="relative flex flex-col justify-between gap-6 overflow-hidden rounded-[2rem] border border-fuchsia-400/20 bg-gradient-to-br from-[#21122f] via-[#1b102b] to-[#141020] p-6 shadow-[0_16px_50px_-20px_rgba(217,70,239,0.2)] sm:flex-row sm:items-center sm:p-8">
//             <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full bg-fuchsia-500/15 blur-[80px]" />
//             <div className="pointer-events-none absolute -bottom-20 left-[30%] h-48 w-48 rounded-full bg-blue-500/10 blur-[80px]" />

//             <div className="relative">
//               <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-3.5 py-2 text-xs font-semibold tracking-wide text-fuchsia-200">
//                 <Sparkles className="h-4 w-4 text-fuchsia-300" />
//                 YOUR MEMORIES, YOUR STORY
//               </div>

//               <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
//                 Hey, {firstName}!
//                 <span className="ml-2 bg-gradient-to-r from-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
//                   ♡
//                 </span>
//               </h1>

//               <h2 className="mt-2 text-lg font-bold text-purple-100 sm:text-xl">
//                 Create a new memory
//               </h2>

//               <p className="mt-3 max-w-lg text-sm leading-6 text-purple-300 sm:text-base">
//                 Save a special day, a favourite place, or a moment you
//                 never want to forget.
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={() =>
//                 setOpenEditModal({
//                   isShown: true,
//                   type: "add",
//                   data: null,
//                 })
//               }
//               className="relative inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-blue-500 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-fuchsia-950/30 transition duration-300 hover:-translate-y-1 hover:shadow-fuchsia-500/25 active:scale-[0.98]"
//             >
//               <Plus className="h-5 w-5" />
//               Add memory
//             </button>
//           </div>

     
//           <aside className="w-full min-w-0">
//             <div className="relative overflow-hidden rounded-[2rem] border border-fuchsia-400/20 bg-gradient-to-br from-[#21122f] via-[#1b102b] to-[#141020] shadow-[0_16px_50px_-20px_rgba(217,70,239,0.2)]">
           
//               <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-fuchsia-500/10 blur-3xl" />
//               <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl" />

           
//               <div className="relative border-b border-fuchsia-400/15 bg-gradient-to-r from-fuchsia-500/10 via-purple-500/10 to-blue-500/10 p-5">
//                 <div className="flex items-center gap-3">
//                   <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-500/20 to-blue-500/20 text-fuchsia-300 shadow-[0_0_20px_rgba(217,70,239,0.08)]">
//                     <CalendarDays className="h-5 w-5" />
//                   </div>

//                   <div>
//                     <h3 className="font-bold text-white">
//                       Memory timeline
//                     </h3>
//                     <p className="mt-0.5 text-xs text-purple-300">
//                       Find a special day
//                     </p>
//                   </div>
//                 </div>
//               </div>

         
//               <div className="relative overflow-x-auto p-2 sm:p-3">
//                 <DayPicker
//                   mode="range"
//                   selected={dateRange}
//                   onSelect={handleDayClick}
//                   captionLayout="dropdown-buttons"
//                   pagedNavigation
//                   classNames={{
//                     ...defaultClassNames,

//                     root: `${defaultClassNames.root} mx-auto w-full p-2 text-purple-100`,
//                     months: `${defaultClassNames.months} w-full`,
//                     month: `${defaultClassNames.month} w-full`,
//                     month_grid: `${defaultClassNames.month_grid} w-full border-collapse`,

//                     weekdays: `${defaultClassNames.weekdays} text-xs font-semibold text-fuchsia-300`,
//                     weekday: `${defaultClassNames.weekday} py-2 text-fuchsia-300`,

//                     day: `${defaultClassNames.day} p-0`,
//                     day_button: `${defaultClassNames.day_button} h-9 w-9 rounded-xl text-sm text-purple-100 transition-all duration-200 hover:bg-fuchsia-500/15 hover:text-fuchsia-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400`,

//                     today: `${defaultClassNames.today} font-bold text-cyan-300`,

//                     selected: `${defaultClassNames.selected} !rounded-xl !bg-fuchsia-500 !text-white shadow-[0_0_12px_rgba(217,70,239,0.25)]`,

//                     range_start: `${defaultClassNames.range_start} !rounded-l-xl !bg-fuchsia-500 !text-white`,
//                     range_end: `${defaultClassNames.range_end} !rounded-r-xl !bg-blue-500 !text-white`,
//                     range_middle: `${defaultClassNames.range_middle} !bg-fuchsia-500/15 !text-fuchsia-200`,

//                     outside: `${defaultClassNames.outside} !text-purple-500/40`,
//                     disabled: `${defaultClassNames.disabled} !cursor-not-allowed !text-purple-500/30`,

//                     nav: `${defaultClassNames.nav} text-fuchsia-300`,
//                     button_previous: `${defaultClassNames.button_previous} rounded-xl text-purple-200 transition hover:bg-fuchsia-500/15 hover:text-fuchsia-300`,
//                     button_next: `${defaultClassNames.button_next} rounded-xl text-purple-200 transition hover:bg-fuchsia-500/15 hover:text-fuchsia-300`,

//                     chevron: `${defaultClassNames.chevron} fill-fuchsia-300`,
//                     caption_label: `${defaultClassNames.caption_label} font-bold text-white`,

//                     dropdowns: `${defaultClassNames.dropdowns} gap-1`,
//                     dropdown: `${defaultClassNames.dropdown} rounded-lg border border-fuchsia-400/20 bg-[#21122f] px-1 py-1 text-sm text-purple-100 outline-none focus:border-fuchsia-400`,
//                   }}
//                 />
//               </div>

              
//               <div className="relative border-t border-fuchsia-400/15 px-5 py-4">
//                 <div className="flex items-start gap-2.5">
//                   <Heart className="mt-0.5 h-4 w-4 shrink-0 fill-fuchsia-400/50 text-fuchsia-300" />

//                   <p className="text-xs leading-5 text-purple-300">
//                     Select a start and end date to discover memories
//                     from that time.
//                   </p>
//                 </div>

//                 {dateRange.from && (
//                   <div className="mt-3 rounded-xl border border-fuchsia-400/15 bg-gradient-to-r from-fuchsia-500/10 to-blue-500/10 px-3 py-2 text-xs font-medium text-fuchsia-200">
//                     <span>
//                       {moment(dateRange.from).format("MMM D, YYYY")}
//                     </span>

//                     {dateRange.to && (
//                       <>
//                         <span className="mx-2 text-purple-400">→</span>
//                         <span>
//                           {moment(dateRange.to).format("MMM D, YYYY")}
//                         </span>
//                       </>
//                     )}
//                   </div>
//                 )}

//                 {(filterType === "date" || dateRange.from) && (
//                   <button
//                     type="button"
//                     onClick={resetFilter}
//                     className="mt-3 w-full rounded-xl border border-fuchsia-400/20 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-fuchsia-300 transition-all duration-200 hover:border-fuchsia-400/40 hover:bg-fuchsia-500/10 hover:text-fuchsia-200 active:scale-[0.98]"
//                   >
//                     Clear date filter
//                   </button>
//                 )}
//               </div>
//             </div>
//           </aside>
//         </section>

     
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
//             <div className="mt-5 rounded-[2rem] border border-fuchsia-400/15 bg-[#1b102b]/60 p-4 backdrop-blur-lg sm:p-6">
//               <EmptyCard
//                 imgSrc={emptyImg}
//                 message={getEmptyCardMessage(filterType)}
//               />
//             </div>
//           )}
//         </section>
//       </main>

 
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
//         overlayClassName="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#080410]/80 p-3 backdrop-blur-md sm:p-6"
//         className="relative my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-fuchsia-400/20 bg-[#1b102b] text-white shadow-2xl shadow-fuchsia-950/30 outline-none"
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

  
//       <Modal
//         isOpen={openViewModal.isShown}
//         onRequestClose={() =>
//           setOpenViewModal({ isShown: false, data: null })
//         }
//         appElement={document.getElementById("root")}
//         overlayClassName="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#080410]/80 p-3 backdrop-blur-md sm:p-6"
//         className="relative my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-fuchsia-400/20 bg-[#1b102b] text-white shadow-2xl shadow-fuchsia-950/30 outline-none"
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
//           handleDelete={() =>
//             handleDelete(openViewModal.data || null)
//           }
//         />
//       </Modal>

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
//         className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-blue-500 text-white shadow-xl shadow-fuchsia-950/40 transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-fuchsia-500/30 active:scale-95 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
//       >
//         <Plus className="h-7 w-7 transition-transform duration-300 group-hover:rotate-90 sm:h-8 sm:w-8" />

//         <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl border border-fuchsia-400/20 bg-[#21122f] px-3 py-2 text-xs font-semibold text-fuchsia-200 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
//           Create a memory
//         </span>
//       </button>

  
//       <ToastContainer
//         position="bottom-right"
//         autoClose={2500}
//         theme="dark"
//         toastClassName="!rounded-2xl !border !border-fuchsia-400/20 !bg-[#21122f] !text-purple-100 !shadow-lg"
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
  ArrowDownWideNarrow,
  Images,
  Users,
  ArrowRight,
  X,
  Gamepad2,
} from "lucide-react";

import Navbar from "../../Components/Navbar";
import ConnectionPanel from "../../Components/ConnectionPanel";
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
  const [showConnections, setShowConnections] = useState(false);

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

  const favouriteCount = allNotes.filter(
    (note) => note.isFavourite
  ).length;

  const firstName =
    userInfo?.fullName?.trim().split(/\s+/)[0] || "there";

  const addMemory = () => {
    setOpenEditModal({
      isShown: true,
      type: "add",
      data: null,
    });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0d0915] text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed -left-32 top-32 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[110px]" />
      <div className="pointer-events-none fixed -right-32 top-48 h-80 w-80 rounded-full bg-blue-600/10 blur-[120px]" />

      {/* Navbar */}
      <div className="relative z-30 border-b border-white/[0.06]">
        <Navbar
          userInfo={userInfo}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchNote={onSearchNote}
          handleClearSearch={handleClearSearch}
        />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-[1500px] px-4 pb-24 pt-5 sm:px-6 sm:pt-7 lg:px-8">
        {/* Main dashboard */}
        <section className="mb-6 grid grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
          {/* Left column */}
          <div className="min-w-0 space-y-4">
            {/* Welcome */}
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#191021] via-[#171020] to-[#101827] p-5 sm:p-6">
              <div className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full bg-fuchsia-500/10 blur-[70px]" />

              <div className="relative">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-fuchsia-300/15 bg-fuchsia-400/[0.07] px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-fuchsia-200">
                  <Sparkles className="h-3.5 w-3.5" />
                  YOUR PERSONAL MEMORY JOURNAL
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Welcome back, {firstName}
                  <span className="ml-2 text-fuchsia-300">♡</span>
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-white/50">
                  Keep your favourite memories, revisit special places,
                  and save the little moments that matter.
                </p>

                <button
                  type="button"
                  onClick={addMemory}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-950/30 transition duration-200 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0"
                >
                  <Plus className="h-4 w-4" />
                  Create a memory
                </button>
              </div>
            </div>

            {/* Connect button / expandable connection panel */}
            <div className="w-full">
              {!showConnections ? (
                <button
                  type="button"
                  onClick={() => setShowConnections(true)}
                  className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-[#15111c] p-5 text-left transition-all duration-300 hover:border-violet-400/30 hover:bg-[#191421] sm:p-6"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300 transition-transform duration-300 group-hover:scale-105">
                      <Users className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-base font-semibold text-white sm:text-lg">
                        Connect
                      </h2>
                      <p className="mt-1 text-sm leading-5 text-white/45">
                        Find people and manage your connection requests.
                      </p>
                    </div>
                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300 transition-all duration-300 group-hover:bg-violet-500/20">
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">
                        Your connections
                      </p>
                      <p className="mt-1 text-xs text-white/40">
                        Find people and manage your requests
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowConnections(false)}
                      className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs font-medium text-white/60 transition-colors hover:border-white/15 hover:bg-white/[0.08] hover:text-white"
                    >
                      <X className="h-3.5 w-3.5" />
                      Close
                    </button>
                  </div>

                  <div className="rounded-2xl border border-white/[0.07] bg-[#15111c] p-3 sm:p-4">
                    <ConnectionPanel />
                  </div>
                </div>
              )}
            </div>

            {/* Scribble multiplayer game */}
            <div className="group relative isolate overflow-hidden rounded-2xl border border-fuchsia-400/20 bg-gradient-to-br from-[#21112b] via-[#191020] to-[#10121f] p-5 transition-all duration-300 hover:border-fuchsia-400/40 hover:shadow-xl hover:shadow-fuchsia-950/20 sm:p-6">
              <div className="pointer-events-none absolute -right-10 -top-12 -z-10 h-40 w-40 rounded-full bg-fuchsia-500/15 blur-[65px] transition-all duration-500 group-hover:bg-fuchsia-500/25" />

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-fuchsia-300/20 bg-fuchsia-400/10 text-fuchsia-300 transition-transform duration-300 group-hover:scale-105">
                    <Gamepad2 className="h-6 w-6" />
                  </div>

                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-bold text-white sm:text-xl">
                        Scribble Together
                      </h2>

                      <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-300">
                        Multiplayer
                      </span>
                    </div>

                    <p className="max-w-xl text-sm leading-6 text-white/50">
                      Draw, guess, and challenge each other. Create a
                      private room and see who knows the other better!
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/40">
                      <span className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1.5">
                        Classic Mode
                      </span>
                      <span className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1.5">
                        Couple Mode
                      </span>
                      <span className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1.5">
                        Private Rooms
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/scribble")}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-950/30 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0"
                >
                  <Gamepad2 className="h-4 w-4" />
                  Play Scribble
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex min-h-[100px] items-center gap-3 rounded-2xl border border-white/[0.07] bg-[#15111c] p-4 transition hover:border-fuchsia-400/20">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-fuchsia-400/10 text-fuchsia-300">
                  <BookHeart className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-2xl font-bold text-white">
                    {allNotes.length}
                  </p>
                  <p className="text-xs text-white/45">
                    Memories shown
                  </p>
                </div>
              </div>

              <div className="flex min-h-[100px] items-center gap-3 rounded-2xl border border-white/[0.07] bg-[#15111c] p-4 transition hover:border-pink-400/20">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-400/10 text-pink-300">
                  <Heart className="h-5 w-5 fill-current" />
                </div>
                <div className="min-w-0">
                  <p className="text-2xl font-bold text-white">
                    {favouriteCount}
                  </p>
                  <p className="text-xs text-white/45">
                    Favourites shown
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar — right column */}
          <aside className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#15111c]">
            <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-fuchsia-400/10 text-fuchsia-300">
                <CalendarDays className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white">
                  Memory timeline
                </h2>
                <p className="mt-0.5 text-xs text-white/40">
                  Find memories by date
                </p>
              </div>
            </div>

            <div className="overflow-x-auto p-2 sm:p-3">
              <DayPicker
                mode="range"
                selected={dateRange}
                onSelect={handleDayClick}
                captionLayout="dropdown-buttons"
                pagedNavigation
                classNames={{
                  ...defaultClassNames,
                  root: `${defaultClassNames.root} mx-auto w-full`,
                  months: `${defaultClassNames.months} w-full`,
                  month: `${defaultClassNames.month} w-full`,
                  month_grid: `${defaultClassNames.month_grid} w-full border-collapse`,
                  weekdays: `${defaultClassNames.weekdays} text-[11px] font-medium text-white/40`,
                  weekday: `${defaultClassNames.weekday} py-2`,
                  day: `${defaultClassNames.day} p-0`,
                  day_button: `${defaultClassNames.day_button} h-9 w-9 rounded-lg text-xs text-white/75 transition hover:bg-fuchsia-400/15 hover:text-white`,
                  today: `${defaultClassNames.today} font-bold text-fuchsia-300`,
                  selected: `${defaultClassNames.selected} !bg-fuchsia-500 !text-white rounded-lg`,
                  range_start: `${defaultClassNames.range_start} !rounded-l-lg !bg-fuchsia-500 !text-white`,
                  range_end: `${defaultClassNames.range_end} !rounded-r-lg !bg-fuchsia-500 !text-white`,
                  range_middle: `${defaultClassNames.range_middle} !bg-fuchsia-500/15 !text-fuchsia-100`,
                  nav: `${defaultClassNames.nav} text-fuchsia-300`,
                  button_previous: `${defaultClassNames.button_previous} rounded-lg text-white/60 hover:bg-white/5`,
                  button_next: `${defaultClassNames.button_next} rounded-lg text-white/60 hover:bg-white/5`,
                  chevron: `${defaultClassNames.chevron} fill-fuchsia-300`,
                  caption_label: `${defaultClassNames.caption_label} text-sm font-semibold text-white`,
                  dropdowns: `${defaultClassNames.dropdowns} gap-1`,
                  dropdown: `${defaultClassNames.dropdown} rounded-md border border-white/10 bg-[#201829] px-1 py-1 text-xs text-white outline-none focus:border-fuchsia-400/50`,
                }}
              />
            </div>

            <div className="border-t border-white/[0.06] px-4 py-3">
              <p className="text-xs leading-5 text-white/40">
                Select a start and end date to find memories from that period.
              </p>

              {dateRange.from && (
                <div className="mt-3 rounded-lg border border-fuchsia-300/10 bg-fuchsia-400/[0.06] px-3 py-2 text-xs text-fuchsia-200">
                  <span>
                    {moment(dateRange.from).format("MMM D, YYYY")}
                  </span>
                  {dateRange.to && (
                    <>
                      <span className="mx-2 text-white/30">→</span>
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
                  className="mt-3 w-full rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-white/60 transition hover:border-fuchsia-400/30 hover:bg-fuchsia-400/[0.06] hover:text-fuchsia-200"
                >
                  Clear date filter
                </button>
              )}
            </div>
          </aside>
        </section>

        {/* Memories heading */}
        <section className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="mb-1.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-fuchsia-300/80">
              <Images className="h-3.5 w-3.5" />
              YOUR COLLECTION
            </div>

            <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              Your memories
              <span className="ml-2 text-fuchsia-300">♡</span>
            </h2>

            <p className="mt-1 text-xs text-white/40 sm:text-sm">
              Little moments, beautifully remembered.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs text-white/45">
            <ArrowDownWideNarrow className="h-3.5 w-3.5 text-fuchsia-300" />
            Your story collection
          </div>
        </section>

        {/* Notes grid */}
        <section className="min-w-0 w-full">
          <FilterInfoTitle
            filterType={filterType}
            filterDates={dateRange}
            onClear={resetFilter}
          />

          {allNotes.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3">
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
            <div className="mt-4 rounded-2xl border border-white/[0.07] bg-[#15111c] p-4 sm:p-6">
              <EmptyCard
                imgSrc={emptyImg}
                message={getEmptyCardMessage(filterType)}
              />
            </div>
          )}
        </section>
      </main>

      {/* Add/Edit modal */}
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
        overlayClassName="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-3 backdrop-blur-sm sm:p-6"
        className="relative my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#15111c] shadow-2xl outline-none"
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

      {/* View note modal */}
      <Modal
        isOpen={openViewModal.isShown}
        onRequestClose={() =>
          setOpenViewModal({ isShown: false, data: null })
        }
        appElement={document.getElementById("root")}
        overlayClassName="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-3 backdrop-blur-sm sm:p-6"
        className="relative my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#15111c] shadow-2xl outline-none"
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
          handleDelete={() => handleDelete(openViewModal.data || null)}
        />
      </Modal>

      {/* Floating create button */}
      <button
        type="button"
        aria-label="Create a new memory"
        onClick={addMemory}
        className="group fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-600 to-pink-500 text-white shadow-lg shadow-fuchsia-950/40 transition duration-200 hover:-translate-y-1 hover:brightness-110 active:scale-95 sm:bottom-7 sm:right-7"
      >
        <Plus className="h-6 w-6 transition-transform duration-200 group-hover:rotate-90" />
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg border border-white/10 bg-[#201829] px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
          Create a memory
        </span>
      </button>

      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        theme="dark"
        toastClassName="!rounded-xl !border !border-white/10"
      />
    </div>
  );
};

export default Home;
