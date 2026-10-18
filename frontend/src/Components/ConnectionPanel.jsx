
// // // // import React, { useCallback, useEffect, useState } from "react";
// // // // import {
// // // //   Search,
// // // //   UserPlus,
// // // //   Users,
// // // //   UserCheck,
// // // //   Clock3,
// // // //   Check,
// // // //   X,
// // // //   Ban,
// // // //   Trash2,
// // // //   RefreshCw,
// // // //   LoaderCircle,
// // // // } from "lucide-react";
// // // // import axiosInstance from "../utils/axiosinstance";
// // // // import { useAuthStore } from "../utils/useAuthStore";

// // // // const getError = (error) =>
// // // //   error?.response?.data?.message || "Something went wrong. Please try again.";

// // // // const getId = (value) =>
// // // //   String(value?._id || value?.id || value || "");

// // // // const getPerson = (connection, type) => {
// // // //   if (!connection) return null;

// // // //   if (type === "incoming") {
// // // //     return connection.requester || connection.sender || connection.user || connection;
// // // //   }

// // // //   if (type === "outgoing") {
// // // //     return connection.recipient || connection.receiver || connection.user || connection;
// // // //   }

// // // //   return connection.user || connection;
// // // // };

// // // // const relationshipStatus = (user) =>
// // // //   user?.relationship?.status || user?.status || "none";

// // // // function PersonAvatar({ person }) {
// // // //   return (
// // // //     <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-violet-600 to-pink-500 text-sm font-bold text-white">
// // // //       {person?.profilePic ? (
// // // //         <img
// // // //           src={person.profilePic}
// // // //           alt={person.fullName || "User"}
// // // //           className="h-full w-full object-cover"
// // // //         />
// // // //       ) : (
// // // //         (person?.fullName || person?.email || "?")
// // // //           .trim()
// // // //           .charAt(0)
// // // //           .toUpperCase()
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // function ActionButton({
// // // //   children,
// // // //   onClick,
// // // //   disabled,
// // // //   variant = "primary",
// // // // }) {
// // // //   const styles = {
// // // //     primary:
// // // //       "bg-violet-600 text-white hover:bg-violet-500",
// // // //     success:
// // // //       "border border-emerald-400/20 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20",
// // // //     neutral:
// // // //       "border border-white/10 bg-white/[0.05] text-gray-200 hover:bg-white/10",
// // // //     danger:
// // // //       "border border-rose-400/20 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20",
// // // //   };

// // // //   return (
// // // //     <button
// // // //       type="button"
// // // //       disabled={disabled}
// // // //       onClick={onClick}
// // // //       className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]}`}
// // // //     >
// // // //       {children}
// // // //     </button>
// // // //   );
// // // // }

// // // // function PersonRow({
// // // //   person,
// // // //   subtitle,
// // // //   children,
// // // // }) {
// // // //   if (!person) return null;

// // // //   return (
// // // //     <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3 transition hover:border-violet-400/20 hover:bg-white/[0.045]">
// // // //       <PersonAvatar person={person} />

// // // //       <div className="min-w-0 flex-1">
// // // //         <p className="truncate text-sm font-semibold text-white">
// // // //           {person.fullName || "MilesCloser user"}
// // // //         </p>
// // // //         <p className="truncate text-xs text-gray-400">
// // // //           {subtitle || person.email || "Member"}
// // // //         </p>
// // // //       </div>

// // // //       <div className="flex shrink-0 flex-wrap justify-end gap-2">
// // // //         {children}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default function ConnectionPanel() {
// // // //   const socket = useAuthStore((state) => state.socket);
// // // //   const authUser = useAuthStore((state) => state.authUser);

// // // //   const [query, setQuery] = useState("");
// // // //   const [searchResults, setSearchResults] = useState([]);
// // // //   const [connections, setConnections] = useState([]);
// // // //   const [incoming, setIncoming] = useState([]);
// // // //   const [outgoing, setOutgoing] = useState([]);
// // // //   const [blockedUsers, setBlockedUsers] = useState([]);

// // // //   const [activeTab, setActiveTab] = useState("search");
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [searching, setSearching] = useState(false);
// // // //   const [busyId, setBusyId] = useState("");
// // // //   const [error, setError] = useState("");

// // // //   const loadConnections = useCallback(async () => {
// // // //     setLoading(true);
// // // //     setError("");

// // // //     try {
// // // //       const [connectionResponse, requestResponse] = await Promise.all([
// // // //         axiosInstance.get("/api/connections/"),
// // // //         axiosInstance.get("/api/connections/requests"),
// // // //       ]);

// // // //       const connectionData = connectionResponse.data;
// // // //       const requestData = requestResponse.data;

// // // //       setConnections(
// // // //         Array.isArray(connectionData)
// // // //           ? connectionData
// // // //           : connectionData?.connections || []
// // // //       );

// // // //       setIncoming(
// // // //         Array.isArray(requestData?.incoming)
// // // //           ? requestData.incoming
// // // //           : Array.isArray(requestData?.incomingRequests)
// // // //             ? requestData.incomingRequests
// // // //             : []
// // // //       );

// // // //       setOutgoing(
// // // //         Array.isArray(requestData?.outgoing)
// // // //           ? requestData.outgoing
// // // //           : Array.isArray(requestData?.outgoingRequests)
// // // //             ? requestData.outgoingRequests
// // // //             : []
// // // //       );

// // // //       setBlockedUsers(
// // // //         Array.isArray(requestData?.blocked)
// // // //           ? requestData.blocked
// // // //           : []
// // // //       );
// // // //     } catch (err) {
// // // //       setError(getError(err));
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     loadConnections();
// // // //   }, [loadConnections]);

// // // //   useEffect(() => {
// // // //     if (!socket) return;

// // // //     const refreshEvents = [
// // // //       "connection:request",
// // // //       "connection:accepted",
// // // //       "connection:rejected",
// // // //       "connection:cancelled",
// // // //       "connection:removed",
// // // //       "connection:blocked",
// // // //       "connection:unblocked",
// // // //     ];

// // // //     refreshEvents.forEach((eventName) => {
// // // //       socket.on(eventName, loadConnections);
// // // //     });

// // // //     return () => {
// // // //       refreshEvents.forEach((eventName) => {
// // // //         socket.off(eventName, loadConnections);
// // // //       });
// // // //     };
// // // //   }, [socket, loadConnections]);

// // // //   useEffect(() => {
// // // //     const trimmedQuery = query.trim();

// // // //     if (trimmedQuery.length < 2) {
// // // //       setSearchResults([]);
// // // //       setSearching(false);
// // // //       return;
// // // //     }

// // // //     let cancelled = false;

// // // //     const timeoutId = setTimeout(async () => {
// // // //       setSearching(true);

// // // //       try {
// // // //         const response = await axiosInstance.get(
// // // //           `/api/connections/search?q=${encodeURIComponent(trimmedQuery)}`
// // // //         );

// // // //         if (!cancelled) {
// // // //           setSearchResults(
// // // //             Array.isArray(response.data)
// // // //               ? response.data
// // // //               : response.data?.users || []
// // // //           );
// // // //           setError("");
// // // //         }
// // // //       } catch (err) {
// // // //         if (!cancelled) {
// // // //           setSearchResults([]);
// // // //           setError(getError(err));
// // // //         }
// // // //       } finally {
// // // //         if (!cancelled) setSearching(false);
// // // //       }
// // // //     }, 300);

// // // //     return () => {
// // // //       cancelled = true;
// // // //       clearTimeout(timeoutId);
// // // //     };
// // // //   }, [query]);

// // // //   const performAction = async (personId, action, config = {}) => {
// // // //     if (!personId) return;

// // // //     setBusyId(personId);
// // // //     setError("");

// // // //     try {
// // // //       await action();
// // // //       await loadConnections();

// // // //       if (config.clearSearch) {
// // // //         setSearchResults((previous) =>
// // // //           previous.map((person) =>
// // // //             getId(person) === personId
// // // //               ? {
// // // //                   ...person,
// // // //                   relationship: {
// // // //                     ...person.relationship,
// // // //                     status: config.newStatus || "pending",
// // // //                   },
// // // //                 }
// // // //               : person
// // // //           )
// // // //         );
// // // //       }
// // // //     } catch (err) {
// // // //       setError(getError(err));
// // // //     } finally {
// // // //       setBusyId("");
// // // //     }
// // // //   };

// // // // // const acceptRequest = (request) => {
// // // // //   const connectionId = getId(request);

// // // // //   return performAction(
// // // // //     connectionId,
// // // // //     () =>
// // // // //       axiosInstance.patch(
// // // // //         `/api/connections/${connectionId}/accept`
// // // // //       )
// // // // //   );
// // // // // };

// // // // // const rejectRequest = (request) => {
// // // // //   const connectionId = getId(request);

// // // // //   return performAction(
// // // // //     connectionId,
// // // // //     () =>
// // // // //       axiosInstance.patch(
// // // // //         `/api/connections/${connectionId}/reject`
// // // // //       )
// // // // //   );
// // // // // };

// // // // // const cancelRequest = (request) => {
// // // // //   const connectionId = getId(request);

// // // // //   return performAction(
// // // // //     connectionId,
// // // // //     () =>
// // // // //       axiosInstance.delete(
// // // // //         `/api/connections/${connectionId}/cancel`
// // // // //       )
// // // // //   );
// // // // // };



// // // // const acceptRequest = (request) => {
// // // //   const connectionId = getId(request);

// // // //   return performAction(
// // // //     connectionId,
// // // //     () =>
// // // //       axiosInstance.patch(
// // // //         `/api/connections/${connectionId}/accept`
// // // //       )
// // // //   );
// // // // };

// // // // const rejectRequest = (request) => {
// // // //   const connectionId = getId(request);

// // // //   return performAction(
// // // //     connectionId,
// // // //     () =>
// // // //       axiosInstance.patch(
// // // //         `/api/connections/${connectionId}/reject`
// // // //       )
// // // //   );
// // // // };

// // // // const cancelRequest = (request) => {
// // // //   const connectionId = getId(request);

// // // //   return performAction(
// // // //     connectionId,
// // // //     () =>
// // // //       axiosInstance.delete(
// // // //         `/api/connections/${connectionId}/cancel`
// // // //       )
// // // //   );
// // // // };

// // // // const sendRequest = (person) => {
// // // //   const personId = getId(person);

// // // //   if (!personId) {
// // // //     setError("Unable to identify this user.");
// // // //     return;
// // // //   }

// // // //   return performAction(
// // // //     personId,
// // // //     () => axiosInstance.post("/api/connections/request", {
// // // //       recipientId: personId,
// // // //     }),
// // // //     {
// // // //       clearSearch: true,
// // // //       newStatus: "pending",
// // // //     }
// // // //   );
// // // // };

// // // //   const removeConnection = (person) => {
// // // //     const personId = getId(person);

// // // //     if (!window.confirm(`Remove ${person?.fullName || "this connection"}?`)) {
// // // //       return;
// // // //     }

// // // //     return performAction(
// // // //       personId,
// // // //       () => axiosInstance.delete(`/api/connections/${personId}`)
// // // //     );
// // // //   };

// // // //   const blockUser = (person) => {
// // // //     const personId = getId(person);

// // // //     if (!window.confirm(`Block ${person?.fullName || "this user"}?`)) {
// // // //       return;
// // // //     }

// // // //     return performAction(
// // // //       personId,
// // // //       () => axiosInstance.post(`/api/connections/${personId}/block`)
// // // //     );
// // // //   };

// // // //   const unblockUser = (person) => {
// // // //     const personId = getId(person);

// // // //     return performAction(
// // // //       personId,
// // // //       () => axiosInstance.delete(`/api/connections/${personId}/block`)
// // // //     );
// // // //   };

// // // //   const tabs = [
// // // //     { id: "search", label: "Discover", icon: Search },
// // // //     { id: "requests", label: "Requests", icon: Clock3, count: incoming.length },
// // // //     { id: "connections", label: "Connections", icon: Users, count: connections.length },
// // // //     { id: "blocked", label: "Blocked", icon: Ban, count: blockedUsers.length },
// // // //   ];

// // // //   const currentUserId = getId(authUser?._id || authUser?.userId);

// // // //   return (
// // // //     <section className="w-full space-y-5 rounded-3xl border border-white/[0.08] bg-[#0b0b12] p-4 text-white shadow-2xl shadow-black/20 sm:p-6">
// // // //       <div className="flex items-start justify-between gap-3">
// // // //         <div>
// // // //           <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">
// // // //             Your circle
// // // //           </p>
// // // //           <h2 className="mt-1 text-2xl font-bold tracking-tight">
// // // //             Connections
// // // //           </h2>
// // // //           <p className="mt-1 text-sm text-gray-400">
// // // //             Find people and choose who you connect with.
// // // //           </p>
// // // //         </div>

// // // //         <button
// // // //           type="button"
// // // //           onClick={loadConnections}
// // // //           disabled={loading}
// // // //           title="Refresh connections"
// // // //           className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-gray-300 transition hover:bg-white/10 disabled:opacity-50"
// // // //         >
// // // //           <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
// // // //         </button>
// // // //       </div>

// // // //       <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
// // // //         {tabs.map(({ id, label, icon: Icon, count }) => (
// // // //           <button
// // // //             key={id}
// // // //             type="button"
// // // //             onClick={() => setActiveTab(id)}
// // // //             className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition duration-200 ${
// // // //               activeTab === id
// // // //                 ? "border-violet-400/30 bg-violet-500/15 text-violet-200"
// // // //                 : "border-white/[0.07] bg-white/[0.025] text-gray-400 hover:bg-white/[0.06] hover:text-white"
// // // //             }`}
// // // //           >
// // // //             <Icon size={16} />
// // // //             <span>{label}</span>
// // // //             {count > 0 && (
// // // //               <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px]">
// // // //                 {count}
// // // //               </span>
// // // //             )}
// // // //           </button>
// // // //         ))}
// // // //       </div>

// // // //       {error && (
// // // //         <div className="rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
// // // //           {error}
// // // //         </div>
// // // //       )}

// // // //       {activeTab === "search" && (
// // // //         <div className="space-y-4">
// // // //           <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#12121b] px-4 py-3 transition focus-within:border-violet-400/50 focus-within:ring-2 focus-within:ring-violet-500/10">
// // // //             <Search size={19} className="shrink-0 text-violet-300" />
// // // //             <input
// // // //               value={query}
// // // //               onChange={(event) => setQuery(event.target.value)}
// // // //               placeholder="Search by name or email..."
// // // //               className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
// // // //             />
// // // //             {searching && (
// // // //               <LoaderCircle size={17} className="animate-spin text-violet-300" />
// // // //             )}
// // // //           </label>

// // // //           {query.trim().length < 2 ? (
// // // //             <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">
// // // //               Enter at least 2 characters to discover people.
// // // //             </p>
// // // //           ) : !searching && searchResults.length === 0 ? (
// // // //             <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">
// // // //               No users found. Try another name or email.
// // // //             </p>
// // // //           ) : (
// // // //             <div className="space-y-2">
// // // //               {searchResults.map((person) => {
// // // //                 const personId = getId(person);
// // // //                 const status = relationshipStatus(person);
// // // //                 const isBusy = busyId === personId;
// // // //                 const isSelf = personId === currentUserId;

// // // //                 return (
// // // //                   <PersonRow
// // // //                     key={personId}
// // // //                     person={person}
// // // //                     subtitle={person.email}
// // // //                   >
// // // //                     {isSelf ? (
// // // //                       <span className="text-xs text-gray-500">You</span>
// // // //                     ) : status === "accepted" ? (
// // // //                       <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
// // // //                         <UserCheck size={14} /> Connected
// // // //                       </span>
// // // //                     ) : status === "pending" ? (
// // // //                       person.relationship?.isRequester ? (
// // // //                         <ActionButton
// // // //                           variant="neutral"
// // // //                           disabled={isBusy}
// // // //                           onClick={() =>
// // // //                             performAction(
// // // //                               personId,
// // // //                               () =>
// // // //                                 axiosInstance.delete(
// // // //                                   `/api/connections/${personId}/cancel`
// // // //                                 ),
// // // //                               { clearSearch: true, newStatus: "none" }
// // // //                             )
// // // //                           }
// // // //                         >
// // // //                           <X size={14} /> Cancel
// // // //                         </ActionButton>
// // // //                       ) : (
// // // //                         <ActionButton
// // // //                           variant="neutral"
// // // //                           onClick={() => setActiveTab("requests")}
// // // //                         >
// // // //                           <Clock3 size={14} /> Respond
// // // //                         </ActionButton>
// // // //                       )
// // // //                     ) : status === "blocked" ? (
// // // //                       <span className="text-xs text-rose-300">Blocked</span>
// // // //                     ) : (
// // // //                       <ActionButton
// // // //                         disabled={isBusy}
// // // //                         onClick={() => sendRequest(person)}
// // // //                       >
// // // //                         {isBusy ? (
// // // //                           <LoaderCircle size={14} className="animate-spin" />
// // // //                         ) : (
// // // //                           <UserPlus size={14} />
// // // //                         )}
// // // //                         Connect
// // // //                       </ActionButton>
// // // //                     )}
// // // //                   </PersonRow>
// // // //                 );
// // // //               })}
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       )}

// // // //       {activeTab === "requests" && (
// // // //         <div className="space-y-5">
// // // //           <div>
// // // //             <h3 className="mb-3 text-sm font-semibold text-gray-200">
// // // //               Incoming requests
// // // //             </h3>
// // // //             {incoming.length === 0 ? (
// // // //               <p className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-center text-sm text-gray-500">
// // // //                 No pending requests right now.
// // // //               </p>
// // // //             ) : (
// // // //               <div className="space-y-2">
// // // //                 {incoming.map((request) => {
// // // //                   const person = getPerson(request, "incoming");
// // // //                   const personId = getId(person);

// // // //                   return (
// // // //                     <PersonRow
// // // //                       key={getId(request._id) || personId}
// // // //                       person={person}
// // // //                       subtitle="Wants to connect with you"
// // // //                     >
// // // //                       <ActionButton
// // // //                         variant="success"
// // // //                         disabled={busyId === personId}
// // // //                         onClick={() => acceptRequest(request)}
// // // //                       >
// // // //                         <Check size={14} /> Accept
// // // //                       </ActionButton>
// // // //                       <ActionButton
// // // //                         variant="neutral"
// // // //                         disabled={busyId === personId}
// // // //                         onClick={() => rejectRequest(request)}
// // // //                       >
// // // //                         <X size={14} /> Reject
// // // //                       </ActionButton>
// // // //                     </PersonRow>
// // // //                   );
// // // //                 })}
// // // //               </div>
// // // //             )}
// // // //           </div>

// // // //           <div>
// // // //             <h3 className="mb-3 text-sm font-semibold text-gray-200">
// // // //               Sent requests
// // // //             </h3>
// // // //             {outgoing.length === 0 ? (
// // // //               <p className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-center text-sm text-gray-500">
// // // //                 You have no outgoing requests.
// // // //               </p>
// // // //             ) : (
// // // //               <div className="space-y-2">
// // // //                 {outgoing.map((request) => {
// // // //                   const person = getPerson(request, "outgoing");
// // // //                   const personId = getId(person);

// // // //                   return (
// // // //                     <PersonRow
// // // //                       key={getId(request._id) || personId}
// // // //                       person={person}
// // // //                       subtitle="Request pending"
// // // //                     >
// // // //                       <ActionButton
// // // //                         variant="neutral"
// // // //                         disabled={busyId === personId}
// // // //                         onClick={() => cancelRequest(request)}
// // // //                       >
// // // //                         <X size={14} /> Cancel
// // // //                       </ActionButton>
// // // //                     </PersonRow>
// // // //                   );
// // // //                 })}
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {activeTab === "connections" && (
// // // //         <div className="space-y-2">
// // // //           {connections.length === 0 ? (
// // // //             <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">
// // // //               No connections yet. Use Discover to find people.
// // // //             </p>
// // // //           ) : (
// // // //             connections.map((connection) => {
// // // //               const person = getPerson(connection, "connection");
// // // //               const personId = getId(person);

// // // //               return (
// // // //                 <PersonRow
// // // //                   key={getId(connection._id) || personId}
// // // //                   person={person}
// // // //                   subtitle={person?.email || "Your connection"}
// // // //                 >
// // // //                   <ActionButton
// // // //                     variant="neutral"
// // // //                     disabled={busyId === personId}
// // // //                     onClick={() => removeConnection(person)}
// // // //                   >
// // // //                     <Trash2 size={14} /> Remove
// // // //                   </ActionButton>
// // // //                   <ActionButton
// // // //                     variant="danger"
// // // //                     disabled={busyId === personId}
// // // //                     onClick={() => blockUser(person)}
// // // //                   >
// // // //                     <Ban size={14} /> Block
// // // //                   </ActionButton>
// // // //                 </PersonRow>
// // // //               );
// // // //             })
// // // //           )}
// // // //         </div>
// // // //       )}

// // // //       {activeTab === "blocked" && (
// // // //         <div className="space-y-2">
// // // //           {blockedUsers.length === 0 ? (
// // // //             <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">
// // // //               You have no blocked users.
// // // //             </p>
// // // //           ) : (
// // // //             blockedUsers.map((entry) => {
// // // //               const person = getPerson(entry, "connection");
// // // //               const personId = getId(person);

// // // //               return (
// // // //                 <PersonRow
// // // //                   key={getId(entry._id) || personId}
// // // //                   person={person}
// // // //                   subtitle="Blocked user"
// // // //                 >
// // // //                   <ActionButton
// // // //                     variant="neutral"
// // // //                     disabled={busyId === personId}
// // // //                     onClick={() => unblockUser(person)}
// // // //                   >
// // // //                     Unblock
// // // //                   </ActionButton>
// // // //                 </PersonRow>
// // // //               );
// // // //             })
// // // //           )}
// // // //         </div>
// // // //       )}

// // // //       <p className="border-t border-white/[0.07] pt-4 text-xs leading-5 text-gray-500">
// // // //         Only accepted connections should be able to message or call each other.
// // // //         Connection changes are checked by the backend.
// // // //       </p>
// // // //     </section>
// // // //   );
// // // // }



// // // // import React, { useCallback, useEffect, useState } from "react";
// // // // import {
// // // //   Search,
// // // //   UserPlus,
// // // //   Users,
// // // //   UserCheck,
// // // //   Clock3,
// // // //   Check,
// // // //   X,
// // // //   Ban,
// // // //   Trash2,
// // // //   RefreshCw,
// // // //   LoaderCircle,
// // // // } from "lucide-react";
// // // // import axiosInstance from "../utils/axiosinstance";
// // // // import { useAuthStore } from "../utils/useAuthStore";

// // // // const getError = (error) =>
// // // //   error?.response?.data?.message || "Something went wrong. Please try again.";

// // // // // Safely extract an ID from different user/connection response formats.
// // // // const getId = (value) => {
// // // //   if (!value) return "";

// // // //   if (typeof value === "string" || typeof value === "number") {
// // // //     return String(value);
// // // //   }

// // // //   if (typeof value !== "object") return "";

// // // //   const id =
// // // //     value._id ??
// // // //     value.id ??
// // // //     value.userId ??
// // // //     value.recipientId ??
// // // //     value.requesterId ??
// // // //     value.senderId ??
// // // //     value.receiverId ??
// // // //     value.user?._id ??
// // // //     value.user?.id ??
// // // //     value.user?.userId;

// // // //   if (id && typeof id === "object") {
// // // //     return getId(id);
// // // //   }

// // // //   return id != null ? String(id) : "";
// // // // };

// // // // const getPerson = (connection, type) => {
// // // //   if (!connection) return null;

// // // //   if (type === "incoming") {
// // // //     return (
// // // //       connection.requester ||
// // // //       connection.sender ||
// // // //       connection.user ||
// // // //       connection
// // // //     );
// // // //   }

// // // //   if (type === "outgoing") {
// // // //     return (
// // // //       connection.recipient ||
// // // //       connection.receiver ||
// // // //       connection.user ||
// // // //       connection
// // // //     );
// // // //   }

// // // //   return connection.user || connection;
// // // // };

// // // // const relationshipStatus = (user) =>
// // // //   user?.relationship?.status || user?.status || "none";

// // // // function PersonAvatar({ person }) {
// // // //   return (
// // // //     <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-violet-600 to-pink-500 text-sm font-bold text-white">
// // // //       {person?.profilePic ? (
// // // //         <img
// // // //           src={person.profilePic}
// // // //           alt={person.fullName || "User"}
// // // //           className="h-full w-full object-cover"
// // // //         />
// // // //       ) : (
// // // //         (person?.fullName || person?.email || "?")
// // // //           .trim()
// // // //           .charAt(0)
// // // //           .toUpperCase()
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // function ActionButton({
// // // //   children,
// // // //   onClick,
// // // //   disabled,
// // // //   variant = "primary",
// // // // }) {
// // // //   const styles = {
// // // //     primary: "bg-violet-600 text-white hover:bg-violet-500",
// // // //     success:
// // // //       "border border-emerald-400/20 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20",
// // // //     neutral:
// // // //       "border border-white/10 bg-white/[0.05] text-gray-200 hover:bg-white/10",
// // // //     danger:
// // // //       "border border-rose-400/20 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20",
// // // //   };

// // // //   return (
// // // //     <button
// // // //       type="button"
// // // //       disabled={disabled}
// // // //       onClick={onClick}
// // // //       className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]}`}
// // // //     >
// // // //       {children}
// // // //     </button>
// // // //   );
// // // // }

// // // // function PersonRow({ person, subtitle, children }) {
// // // //   if (!person) return null;

// // // //   return (
// // // //     <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3 transition hover:border-violet-400/20 hover:bg-white/[0.045]">
// // // //       <PersonAvatar person={person} />

// // // //       <div className="min-w-0 flex-1">
// // // //         <p className="truncate text-sm font-semibold text-white">
// // // //           {person.fullName || "MilesCloser user"}
// // // //         </p>
// // // //         <p className="truncate text-xs text-gray-400">
// // // //           {subtitle || person.email || "Member"}
// // // //         </p>
// // // //       </div>

// // // //       <div className="flex shrink-0 flex-wrap justify-end gap-2">
// // // //         {children}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default function ConnectionPanel() {
// // // //   const socket = useAuthStore((state) => state.socket);
// // // //   const authUser = useAuthStore((state) => state.authUser);

// // // //   const [query, setQuery] = useState("");
// // // //   const [searchResults, setSearchResults] = useState([]);
// // // //   const [connections, setConnections] = useState([]);
// // // //   const [incoming, setIncoming] = useState([]);
// // // //   const [outgoing, setOutgoing] = useState([]);
// // // //   const [blockedUsers, setBlockedUsers] = useState([]);

// // // //   const [activeTab, setActiveTab] = useState("search");
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [searching, setSearching] = useState(false);
// // // //   const [busyId, setBusyId] = useState("");
// // // //   const [error, setError] = useState("");

// // // //   const loadConnections = useCallback(async () => {
// // // //     setLoading(true);
// // // //     setError("");

// // // //     try {
// // // //       const [connectionResponse, requestResponse] = await Promise.all([
// // // //         axiosInstance.get("/api/connections/"),
// // // //         axiosInstance.get("/api/connections/requests"),
// // // //       ]);

// // // //       const connectionData = connectionResponse.data;
// // // //       const requestData = requestResponse.data;

// // // //       setConnections(
// // // //         Array.isArray(connectionData)
// // // //           ? connectionData
// // // //           : connectionData?.connections || []
// // // //       );

// // // //       setIncoming(
// // // //         Array.isArray(requestData?.incoming)
// // // //           ? requestData.incoming
// // // //           : Array.isArray(requestData?.incomingRequests)
// // // //             ? requestData.incomingRequests
// // // //             : []
// // // //       );

// // // //       setOutgoing(
// // // //         Array.isArray(requestData?.outgoing)
// // // //           ? requestData.outgoing
// // // //           : Array.isArray(requestData?.outgoingRequests)
// // // //             ? requestData.outgoingRequests
// // // //             : []
// // // //       );

// // // //       setBlockedUsers(
// // // //         Array.isArray(requestData?.blocked)
// // // //           ? requestData.blocked
// // // //           : []
// // // //       );
// // // //     } catch (err) {
// // // //       setError(getError(err));
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     loadConnections();
// // // //   }, [loadConnections]);

// // // //   useEffect(() => {
// // // //     if (!socket) return;

// // // //     const refreshEvents = [
// // // //       "connection:request",
// // // //       "connection:accepted",
// // // //       "connection:rejected",
// // // //       "connection:cancelled",
// // // //       "connection:removed",
// // // //       "connection:blocked",
// // // //       "connection:unblocked",
// // // //     ];

// // // //     refreshEvents.forEach((eventName) => {
// // // //       socket.on(eventName, loadConnections);
// // // //     });

// // // //     return () => {
// // // //       refreshEvents.forEach((eventName) => {
// // // //         socket.off(eventName, loadConnections);
// // // //       });
// // // //     };
// // // //   }, [socket, loadConnections]);

// // // //   useEffect(() => {
// // // //     const trimmedQuery = query.trim();

// // // //     if (trimmedQuery.length < 2) {
// // // //       setSearchResults([]);
// // // //       setSearching(false);
// // // //       return;
// // // //     }

// // // //     let cancelled = false;

// // // //     const timeoutId = setTimeout(async () => {
// // // //       setSearching(true);

// // // //       try {
// // // //         const response = await axiosInstance.get(
// // // //           `/api/connections/search?q=${encodeURIComponent(trimmedQuery)}`
// // // //         );

// // // //         if (!cancelled) {
// // // //           setSearchResults(
// // // //             Array.isArray(response.data)
// // // //               ? response.data
// // // //               : response.data?.users || []
// // // //           );
// // // //           setError("");
// // // //         }
// // // //       } catch (err) {
// // // //         if (!cancelled) {
// // // //           setSearchResults([]);
// // // //           setError(getError(err));
// // // //         }
// // // //       } finally {
// // // //         if (!cancelled) setSearching(false);
// // // //       }
// // // //     }, 300);

// // // //     return () => {
// // // //       cancelled = true;
// // // //       clearTimeout(timeoutId);
// // // //     };
// // // //   }, [query]);

// // // //   const performAction = async (personId, action, config = {}) => {
// // // //     if (!personId) {
// // // //       setError("Unable to identify this user.");
// // // //       return;
// // // //     }

// // // //     setBusyId(personId);
// // // //     setError("");

// // // //     try {
// // // //       await action();
// // // //       await loadConnections();

// // // //       if (config.clearSearch) {
// // // //         setSearchResults((previous) =>
// // // //           previous.map((person) =>
// // // //             getId(person) === personId
// // // //               ? {
// // // //                   ...person,
// // // //                   relationship: {
// // // //                     ...person.relationship,
// // // //                     status: config.newStatus || "pending",
// // // //                   },
// // // //                 }
// // // //               : person
// // // //           )
// // // //         );
// // // //       }
// // // //     } catch (err) {
// // // //       setError(getError(err));
// // // //     } finally {
// // // //       setBusyId("");
// // // //     }
// // // //   };

// // // //   const acceptRequest = (request) => {
// // // //     const connectionId = getId(request);

// // // //     return performAction(connectionId, () =>
// // // //       axiosInstance.patch(
// // // //         `/api/connections/${connectionId}/accept`
// // // //       )
// // // //     );
// // // //   };

// // // //   const rejectRequest = (request) => {
// // // //     const connectionId = getId(request);

// // // //     return performAction(connectionId, () =>
// // // //       axiosInstance.patch(
// // // //         `/api/connections/${connectionId}/reject`
// // // //       )
// // // //     );
// // // //   };

// // // //   const cancelRequest = (request) => {
// // // //     const connectionId = getId(request);

// // // //     return performAction(connectionId, () =>
// // // //       axiosInstance.delete(
// // // //         `/api/connections/${connectionId}/cancel`
// // // //       )
// // // //     );
// // // //   };

// // // //   // Send a request using the ID extracted from the selected search result.
// // // //   // const sendRequest = (person) => {
// // // //   //   const personId = getId(person);
// // // //   //   const currentUserId = getId(authUser);

// // // //   //   if (!personId) {
// // // //   //     setError("Unable to identify this user. Please refresh and try again.");
// // // //   //     console.error("Connection request: user ID missing.", person);
// // // //   //     return;
// // // //   //   }

// // // //   //   if (currentUserId && personId === currentUserId) {
// // // //   //     setError("You cannot send a connection request to yourself.");
// // // //   //     return;
// // // //   //   }

// // // //   //   return performAction(
// // // //   //     personId,
// // // //   //     () =>
// // // //   //       axiosInstance.post("/api/connections/request", {
// // // //   //         recipientId: personId,
// // // //   //       }),
// // // //   //     {
// // // //   //       clearSearch: true,
// // // //   //       newStatus: "pending",
// // // //   //     }
// // // //   //   );
// // // //   // };

  
// // // // const sendRequest = (person) => {
// // // //   const personId = getId(person);
// // // //   const currentUserId = getId(authUser);

// // // //   if (!personId) {
// // // //     setError("Unable to identify this user. Please refresh and try again.");
// // // //     console.error("Connection request: user ID missing.", person);
// // // //     return;
// // // //   }

// // // //   if (currentUserId && personId === currentUserId) {
// // // //     setError("You cannot send a connection request to yourself.");
// // // //     return;
// // // //   }

// // // //   return performAction(
// // // //     personId,
// // // //     () =>
// // // //       axiosInstance.post("/api/connections/request", {
// // // //         userId: personId, // Changed here
// // // //       }),
// // // //     {
// // // //       clearSearch: true,
// // // //       newStatus: "pending",
// // // //     }
// // // //   );
// // // // };


// // // //   const removeConnection = (person) => {
// // // //     const personId = getId(person);

// // // //     if (!personId) {
// // // //       setError("Unable to identify this connection.");
// // // //       return;
// // // //     }

// // // //     if (!window.confirm(`Remove ${person?.fullName || "this connection"}?`)) {
// // // //       return;
// // // //     }

// // // //     return performAction(personId, () =>
// // // //       axiosInstance.delete(`/api/connections/${personId}`)
// // // //     );
// // // //   };

// // // //   const blockUser = (person) => {
// // // //     const personId = getId(person);

// // // //     if (!personId) {
// // // //       setError("Unable to identify this user.");
// // // //       return;
// // // //     }

// // // //     if (!window.confirm(`Block ${person?.fullName || "this user"}?`)) {
// // // //       return;
// // // //     }

// // // //     return performAction(personId, () =>
// // // //       axiosInstance.post(`/api/connections/${personId}/block`)
// // // //     );
// // // //   };

// // // //   const unblockUser = (person) => {
// // // //     const personId = getId(person);

// // // //     if (!personId) {
// // // //       setError("Unable to identify this user.");
// // // //       return;
// // // //     }

// // // //     return performAction(personId, () =>
// // // //       axiosInstance.delete(`/api/connections/${personId}/block`)
// // // //     );
// // // //   };

// // // //   const tabs = [
// // // //     { id: "search", label: "Discover", icon: Search },
// // // //     {
// // // //       id: "requests",
// // // //       label: "Requests",
// // // //       icon: Clock3,
// // // //       count: incoming.length,
// // // //     },
// // // //     {
// // // //       id: "connections",
// // // //       label: "Connections",
// // // //       icon: Users,
// // // //       count: connections.length,
// // // //     },
// // // //     {
// // // //       id: "blocked",
// // // //       label: "Blocked",
// // // //       icon: Ban,
// // // //       count: blockedUsers.length,
// // // //     },
// // // //   ];

// // // //   const currentUserId = getId(authUser);

// // // //   return (
// // // //     <section className="w-full space-y-5 rounded-3xl border border-white/[0.08] bg-[#0b0b12] p-4 text-white shadow-2xl shadow-black/20 sm:p-6">
// // // //       <div className="flex items-start justify-between gap-3">
// // // //         <div>
// // // //           <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">
// // // //             Your circle
// // // //           </p>
// // // //           <h2 className="mt-1 text-2xl font-bold tracking-tight">
// // // //             Connections
// // // //           </h2>
// // // //           <p className="mt-1 text-sm text-gray-400">
// // // //             Find people and choose who you connect with.
// // // //           </p>
// // // //         </div>

// // // //         <button
// // // //           type="button"
// // // //           onClick={loadConnections}
// // // //           disabled={loading}
// // // //           title="Refresh connections"
// // // //           className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-gray-300 transition hover:bg-white/10 disabled:opacity-50"
// // // //         >
// // // //           <RefreshCw
// // // //             size={17}
// // // //             className={loading ? "animate-spin" : ""}
// // // //           />
// // // //         </button>
// // // //       </div>

// // // //       <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
// // // //         {tabs.map(({ id, label, icon: Icon, count }) => (
// // // //           <button
// // // //             key={id}
// // // //             type="button"
// // // //             onClick={() => setActiveTab(id)}
// // // //             className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition duration-200 ${
// // // //               activeTab === id
// // // //                 ? "border-violet-400/30 bg-violet-500/15 text-violet-200"
// // // //                 : "border-white/[0.07] bg-white/[0.025] text-gray-400 hover:bg-white/[0.06] hover:text-white"
// // // //             }`}
// // // //           >
// // // //             <Icon size={16} />
// // // //             <span>{label}</span>
// // // //             {count > 0 && (
// // // //               <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px]">
// // // //                 {count}
// // // //               </span>
// // // //             )}
// // // //           </button>
// // // //         ))}
// // // //       </div>

// // // //       {error && (
// // // //         <div
// // // //           role="alert"
// // // //           className="rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
// // // //         >
// // // //           {error}
// // // //         </div>
// // // //       )}

// // // //       {activeTab === "search" && (
// // // //         <div className="space-y-4">
// // // //           <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#12121b] px-4 py-3 transition focus-within:border-violet-400/50 focus-within:ring-2 focus-within:ring-violet-500/10">
// // // //             <Search size={19} className="shrink-0 text-violet-300" />
// // // //             <input
// // // //               value={query}
// // // //               onChange={(event) => setQuery(event.target.value)}
// // // //               placeholder="Search by name or email..."
// // // //               className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
// // // //             />
// // // //             {searching && (
// // // //               <LoaderCircle
// // // //                 size={17}
// // // //                 className="animate-spin text-violet-300"
// // // //               />
// // // //             )}
// // // //           </label>

// // // //           {query.trim().length < 2 ? (
// // // //             <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">
// // // //               Enter at least 2 characters to discover people.
// // // //             </p>
// // // //           ) : searching ? (
// // // //             <p className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/10 px-4 py-8 text-sm text-gray-400">
// // // //               <LoaderCircle size={16} className="animate-spin" />
// // // //               Searching for people...
// // // //             </p>
// // // //           ) : searchResults.length === 0 ? (
// // // //             <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">
// // // //               No users found. Try another name or email.
// // // //             </p>
// // // //           ) : (
// // // //             <div className="space-y-2">
// // // //               {searchResults.map((person, index) => {
// // // //                 const personId = getId(person);
// // // //                 const status = relationshipStatus(person);
// // // //                 const isBusy = !!personId && busyId === personId;
// // // //                 const isSelf =
// // // //                   !!personId && personId === currentUserId;

// // // //                 return (
// // // //                   <PersonRow
// // // //                     key={personId || `search-${index}`}
// // // //                     person={person}
// // // //                     subtitle={person.email}
// // // //                   >
// // // //                     {isSelf ? (
// // // //                       <span className="text-xs text-gray-500">
// // // //                         You
// // // //                       </span>
// // // //                     ) : status === "accepted" ? (
// // // //                       <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
// // // //                         <UserCheck size={14} />
// // // //                         Connected
// // // //                       </span>
// // // //                     ) : status === "pending" ? (
// // // //                       person.relationship?.isRequester ? (
// // // //                         <ActionButton
// // // //                           variant="neutral"
// // // //                           disabled={isBusy}
// // // //                           onClick={() =>
// // // //                             performAction(
// // // //                               personId,
// // // //                               () =>
// // // //                                 axiosInstance.delete(
// // // //                                   `/api/connections/${personId}/cancel`
// // // //                                 ),
// // // //                               {
// // // //                                 clearSearch: true,
// // // //                                 newStatus: "none",
// // // //                               }
// // // //                             )
// // // //                           }
// // // //                         >
// // // //                           <X size={14} />
// // // //                           Cancel
// // // //                         </ActionButton>
// // // //                       ) : (
// // // //                         <ActionButton
// // // //                           variant="neutral"
// // // //                           onClick={() => setActiveTab("requests")}
// // // //                         >
// // // //                           <Clock3 size={14} />
// // // //                           Respond
// // // //                         </ActionButton>
// // // //                       )
// // // //                     ) : status === "blocked" ? (
// // // //                       <span className="text-xs text-rose-300">
// // // //                         Blocked
// // // //                       </span>
// // // //                     ) : (
// // // //                       <ActionButton
// // // //                         disabled={isBusy || !personId}
// // // //                         onClick={() => sendRequest(person)}
// // // //                       >
// // // //                         {isBusy ? (
// // // //                           <LoaderCircle
// // // //                             size={14}
// // // //                             className="animate-spin"
// // // //                           />
// // // //                         ) : (
// // // //                           <UserPlus size={14} />
// // // //                         )}
// // // //                         Connect
// // // //                       </ActionButton>
// // // //                     )}
// // // //                   </PersonRow>
// // // //                 );
// // // //               })}
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       )}

// // // //       {activeTab === "requests" && (
// // // //         <div className="space-y-5">
// // // //           <div>
// // // //             <h3 className="mb-3 text-sm font-semibold text-gray-200">
// // // //               Incoming requests
// // // //             </h3>

// // // //             {incoming.length === 0 ? (
// // // //               <p className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-center text-sm text-gray-500">
// // // //                 No pending requests right now.
// // // //               </p>
// // // //             ) : (
// // // //               <div className="space-y-2">
// // // //                 {incoming.map((request, index) => {
// // // //                   const person = getPerson(request, "incoming");
// // // //                   const personId = getId(person);
// // // //                   const requestId = getId(request);

// // // //                   return (
// // // //                     <PersonRow
// // // //                       key={requestId || personId || `incoming-${index}`}
// // // //                       person={person}
// // // //                       subtitle="Wants to connect with you"
// // // //                     >
// // // //                       <ActionButton
// // // //                         variant="success"
// // // //                         disabled={busyId === requestId || !requestId}
// // // //                         onClick={() => acceptRequest(request)}
// // // //                       >
// // // //                         <Check size={14} />
// // // //                         Accept
// // // //                       </ActionButton>

// // // //                       <ActionButton
// // // //                         variant="neutral"
// // // //                         disabled={busyId === requestId || !requestId}
// // // //                         onClick={() => rejectRequest(request)}
// // // //                       >
// // // //                         <X size={14} />
// // // //                         Reject
// // // //                       </ActionButton>
// // // //                     </PersonRow>
// // // //                   );
// // // //                 })}
// // // //               </div>
// // // //             )}
// // // //           </div>

// // // //           <div>
// // // //             <h3 className="mb-3 text-sm font-semibold text-gray-200">
// // // //               Sent requests
// // // //             </h3>

// // // //             {outgoing.length === 0 ? (
// // // //               <p className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-center text-sm text-gray-500">
// // // //                 You have no outgoing requests.
// // // //               </p>
// // // //             ) : (
// // // //               <div className="space-y-2">
// // // //                 {outgoing.map((request, index) => {
// // // //                   const person = getPerson(request, "outgoing");
// // // //                   const personId = getId(person);
// // // //                   const requestId = getId(request);

// // // //                   return (
// // // //                     <PersonRow
// // // //                       key={requestId || personId || `outgoing-${index}`}
// // // //                       person={person}
// // // //                       subtitle="Request pending"
// // // //                     >
// // // //                       <ActionButton
// // // //                         variant="neutral"
// // // //                         disabled={busyId === requestId || !requestId}
// // // //                         onClick={() => cancelRequest(request)}
// // // //                       >
// // // //                         <X size={14} />
// // // //                         Cancel
// // // //                       </ActionButton>
// // // //                     </PersonRow>
// // // //                   );
// // // //                 })}
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {activeTab === "connections" && (
// // // //         <div className="space-y-2">
// // // //           {connections.length === 0 ? (
// // // //             <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">
// // // //               No connections yet. Use Discover to find people.
// // // //             </p>
// // // //           ) : (
// // // //             connections.map((connection, index) => {
// // // //               const person = getPerson(connection, "connection");
// // // //               const personId = getId(person);

// // // //               return (
// // // //                 <PersonRow
// // // //                   key={
// // // //                     getId(connection) ||
// // // //                     personId ||
// // // //                     `connection-${index}`
// // // //                   }
// // // //                   person={person}
// // // //                   subtitle={person?.email || "Your connection"}
// // // //                 >
// // // //                   <ActionButton
// // // //                     variant="neutral"
// // // //                     disabled={busyId === personId || !personId}
// // // //                     onClick={() => removeConnection(person)}
// // // //                   >
// // // //                     <Trash2 size={14} />
// // // //                     Remove
// // // //                   </ActionButton>

// // // //                   <ActionButton
// // // //                     variant="danger"
// // // //                     disabled={busyId === personId || !personId}
// // // //                     onClick={() => blockUser(person)}
// // // //                   >
// // // //                     <Ban size={14} />
// // // //                     Block
// // // //                   </ActionButton>
// // // //                 </PersonRow>
// // // //               );
// // // //             })
// // // //           )}
// // // //         </div>
// // // //       )}

// // // //       {activeTab === "blocked" && (
// // // //         <div className="space-y-2">
// // // //           {blockedUsers.length === 0 ? (
// // // //             <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">
// // // //               You have no blocked users.
// // // //             </p>
// // // //           ) : (
// // // //             blockedUsers.map((entry, index) => {
// // // //               const person = getPerson(entry, "connection");
// // // //               const personId = getId(person);

// // // //               return (
// // // //                 <PersonRow
// // // //                   key={
// // // //                     getId(entry) ||
// // // //                     personId ||
// // // //                     `blocked-${index}`
// // // //                   }
// // // //                   person={person}
// // // //                   subtitle="Blocked user"
// // // //                 >
// // // //                   <ActionButton
// // // //                     variant="neutral"
// // // //                     disabled={busyId === personId || !personId}
// // // //                     onClick={() => unblockUser(person)}
// // // //                   >
// // // //                     Unblock
// // // //                   </ActionButton>
// // // //                 </PersonRow>
// // // //               );
// // // //             })
// // // //           )}
// // // //         </div>
// // // //       )}

// // // //       <p className="border-t border-white/[0.07] pt-4 text-xs leading-5 text-gray-500">
// // // //         Only accepted connections should be able to message or call each
// // // //         other. Connection changes are checked by the backend.
// // // //       </p>
// // // //     </section>
// // // //   );
// // // // }




// // // import React, { useCallback, useEffect, useState } from "react";
// // // import {
// // //   Search,
// // //   UserPlus,
// // //   Users,
// // //   UserCheck,
// // //   Clock3,
// // //   Check,
// // //   X,
// // //   Ban,
// // //   Trash2,
// // //   RefreshCw,
// // //   LoaderCircle,
// // //   MapPin,
// // //   Sparkles,
// // // } from "lucide-react";
// // // import axiosInstance from "../utils/axiosinstance";
// // // import { useAuthStore } from "../utils/useAuthStore";

// // // const getError = (error) =>
// // //   error?.response?.data?.message || "Something went wrong. Please try again.";

// // // // Safely extract an ID from different user/connection response formats.
// // // const getId = (value) => {
// // //   if (!value) return "";

// // //   if (typeof value === "string" || typeof value === "number") {
// // //     return String(value);
// // //   }

// // //   if (typeof value !== "object") return "";

// // //   const id =
// // //     value._id ??
// // //     value.id ??
// // //     value.userId ??
// // //     value.recipientId ??
// // //     value.requesterId ??
// // //     value.senderId ??
// // //     value.receiverId ??
// // //     value.user?._id ??
// // //     value.user?.id ??
// // //     value.user?.userId;

// // //   if (id && typeof id === "object") {
// // //     return getId(id);
// // //   }

// // //   return id != null ? String(id) : "";
// // // };

// // // const getPerson = (connection, type) => {
// // //   if (!connection) return null;

// // //   if (type === "incoming") {
// // //     return (
// // //       connection.requester ||
// // //       connection.sender ||
// // //       connection.user ||
// // //       connection
// // //     );
// // //   }

// // //   if (type === "outgoing") {
// // //     return (
// // //       connection.recipient ||
// // //       connection.receiver ||
// // //       connection.user ||
// // //       connection
// // //     );
// // //   }

// // //   return connection.user || connection;
// // // };

// // // const relationshipStatus = (user) =>
// // //   user?.relationship?.status || user?.status || "none";

// // // function PersonAvatar({ person }) {
// // //   return (
// // //     <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-violet-600 to-pink-500 text-sm font-bold text-white">
// // //       {person?.profilePic ? (
// // //         <img
// // //           src={person.profilePic}
// // //           alt={person.fullName || "User"}
// // //           className="h-full w-full object-cover"
// // //         />
// // //       ) : (
// // //         (person?.fullName || person?.email || "?")
// // //           .trim()
// // //           .charAt(0)
// // //           .toUpperCase()
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // function ActionButton({
// // //   children,
// // //   onClick,
// // //   disabled,
// // //   variant = "primary",
// // // }) {
// // //   const styles = {
// // //     primary: "bg-violet-600 text-white hover:bg-violet-500",
// // //     success:
// // //       "border border-emerald-400/20 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20",
// // //     neutral:
// // //       "border border-white/10 bg-white/[0.05] text-gray-200 hover:bg-white/10",
// // //     danger:
// // //       "border border-rose-400/20 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20",
// // //   };

// // //   return (
// // //     <button
// // //       type="button"
// // //       disabled={disabled}
// // //       onClick={onClick}
// // //       className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]}`}
// // //     >
// // //       {children}
// // //     </button>
// // //   );
// // // }

// // // function PersonRow({ person, subtitle, children }) {
// // //   if (!person) return null;

// // //   return (
// // //     <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3 transition hover:border-violet-400/20 hover:bg-white/[0.045]">
// // //       <PersonAvatar person={person} />

// // //       <div className="min-w-0 flex-1">
// // //         <p className="truncate text-sm font-semibold text-white">
// // //           {person.fullName || "MilesCloser user"}
// // //         </p>
// // //         <p className="truncate text-xs text-gray-400">
// // //           {subtitle || person.email || "Member"}
// // //         </p>
// // //       </div>

// // //       <div className="flex shrink-0 flex-wrap justify-end gap-2">
// // //         {children}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default function ConnectionPanel() {
// // //   const socket = useAuthStore((state) => state.socket);
// // //   const authUser = useAuthStore((state) => state.authUser);

// // //   const [query, setQuery] = useState("");
// // //   const [searchResults, setSearchResults] = useState([]);
// // //   const [connections, setConnections] = useState([]);
// // //   const [incoming, setIncoming] = useState([]);
// // //   const [outgoing, setOutgoing] = useState([]);
// // //   const [blockedUsers, setBlockedUsers] = useState([]);

// // //   const [activeTab, setActiveTab] = useState("search");
// // //   const [loading, setLoading] = useState(false);
// // //   const [searching, setSearching] = useState(false);
// // //   const [busyId, setBusyId] = useState("");
// // //   const [error, setError] = useState("");
// // //   const [city, setCity] = useState(authUser?.city || "");
// // //   const [citySaving, setCitySaving] = useState(false);
// // //   const [cityMessage, setCityMessage] = useState("");

// // //   useEffect(() => {
// // //     setCity(authUser?.city || "");
// // //   }, [authUser?.city]);

// // //   const loadConnections = useCallback(async () => {
// // //     setLoading(true);
// // //     setError("");

// // //     try {
// // //       const [connectionResponse, requestResponse] = await Promise.all([
// // //         axiosInstance.get("/api/connections/"),
// // //         axiosInstance.get("/api/connections/requests"),
// // //       ]);

// // //       const connectionData = connectionResponse.data;
// // //       const requestData = requestResponse.data;

// // //       setConnections(
// // //         Array.isArray(connectionData)
// // //           ? connectionData
// // //           : connectionData?.connections || []
// // //       );

// // //       setIncoming(
// // //         Array.isArray(requestData?.incoming)
// // //           ? requestData.incoming
// // //           : Array.isArray(requestData?.incomingRequests)
// // //             ? requestData.incomingRequests
// // //             : []
// // //       );

// // //       setOutgoing(
// // //         Array.isArray(requestData?.outgoing)
// // //           ? requestData.outgoing
// // //           : Array.isArray(requestData?.outgoingRequests)
// // //             ? requestData.outgoingRequests
// // //             : []
// // //       );

// // //       setBlockedUsers(
// // //         Array.isArray(requestData?.blocked)
// // //           ? requestData.blocked
// // //           : []
// // //       );
// // //     } catch (err) {
// // //       setError(getError(err));
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     loadConnections();
// // //   }, [loadConnections]);

// // //   useEffect(() => {
// // //     if (!socket) return;

// // //     const refreshEvents = [
// // //       "connection:request",
// // //       "connection:accepted",
// // //       "connection:rejected",
// // //       "connection:cancelled",
// // //       "connection:removed",
// // //       "connection:blocked",
// // //       "connection:unblocked",
// // //     ];

// // //     refreshEvents.forEach((eventName) => {
// // //       socket.on(eventName, loadConnections);
// // //     });

// // //     return () => {
// // //       refreshEvents.forEach((eventName) => {
// // //         socket.off(eventName, loadConnections);
// // //       });
// // //     };
// // //   }, [socket, loadConnections]);

// // //   useEffect(() => {
// // //     const trimmedQuery = query.trim();

// // //     if (trimmedQuery.length < 2) {
// // //       setSearchResults([]);
// // //       setSearching(false);
// // //       return;
// // //     }

// // //     let cancelled = false;

// // //     const timeoutId = setTimeout(async () => {
// // //       setSearching(true);

// // //       try {
// // //         const response = await axiosInstance.get(
// // //           `/api/connections/search?q=${encodeURIComponent(trimmedQuery)}`
// // //         );

// // //         if (!cancelled) {
// // //           setSearchResults(
// // //             Array.isArray(response.data)
// // //               ? response.data
// // //               : response.data?.users || []
// // //           );
// // //           setError("");
// // //         }
// // //       } catch (err) {
// // //         if (!cancelled) {
// // //           setSearchResults([]);
// // //           setError(getError(err));
// // //         }
// // //       } finally {
// // //         if (!cancelled) setSearching(false);
// // //       }
// // //     }, 300);

// // //     return () => {
// // //       cancelled = true;
// // //       clearTimeout(timeoutId);
// // //     };
// // //   }, [query]);

// // //   const performAction = async (personId, action, config = {}) => {
// // //     if (!personId) {
// // //       setError("Unable to identify this user.");
// // //       return;
// // //     }

// // //     setBusyId(personId);
// // //     setError("");

// // //     try {
// // //       await action();
// // //       await loadConnections();

// // //       if (config.clearSearch) {
// // //         setSearchResults((previous) =>
// // //           previous.map((person) =>
// // //             getId(person) === personId
// // //               ? {
// // //                   ...person,
// // //                   relationship: {
// // //                     ...person.relationship,
// // //                     status: config.newStatus || "pending",
// // //                   },
// // //                 }
// // //               : person
// // //           )
// // //         );
// // //       }
// // //     } catch (err) {
// // //       setError(getError(err));
// // //     } finally {
// // //       setBusyId("");
// // //     }
// // //   };

// // //   const acceptRequest = (request) => {
// // //     const connectionId = getId(request);

// // //     return performAction(connectionId, () =>
// // //       axiosInstance.patch(
// // //         `/api/connections/${connectionId}/accept`
// // //       )
// // //     );
// // //   };

// // //   const rejectRequest = (request) => {
// // //     const connectionId = getId(request);

// // //     return performAction(connectionId, () =>
// // //       axiosInstance.patch(
// // //         `/api/connections/${connectionId}/reject`
// // //       )
// // //     );
// // //   };

// // //   const cancelRequest = (request) => {
// // //     const connectionId = getId(request);

// // //     return performAction(connectionId, () =>
// // //       axiosInstance.delete(
// // //         `/api/connections/${connectionId}/cancel`
// // //       )
// // //     );
// // //   };

// // //   // Send a request using the ID extracted from the selected search result.
// // //   // const sendRequest = (person) => {
// // //   //   const personId = getId(person);
// // //   //   const currentUserId = getId(authUser);

// // //   //   if (!personId) {
// // //   //     setError("Unable to identify this user. Please refresh and try again.");
// // //   //     console.error("Connection request: user ID missing.", person);
// // //   //     return;
// // //   //   }

// // //   //   if (currentUserId && personId === currentUserId) {
// // //   //     setError("You cannot send a connection request to yourself.");
// // //   //     return;
// // //   //   }

// // //   //   return performAction(
// // //   //     personId,
// // //   //     () =>
// // //   //       axiosInstance.post("/api/connections/request", {
// // //   //         recipientId: personId,
// // //   //       }),
// // //   //     {
// // //   //       clearSearch: true,
// // //   //       newStatus: "pending",
// // //   //     }
// // //   //   );
// // //   // };

  
// // // const sendRequest = (person) => {
// // //   const personId = getId(person);
// // //   const currentUserId = getId(authUser);

// // //   if (!personId) {
// // //     setError("Unable to identify this user. Please refresh and try again.");
// // //     console.error("Connection request: user ID missing.", person);
// // //     return;
// // //   }

// // //   if (currentUserId && personId === currentUserId) {
// // //     setError("You cannot send a connection request to yourself.");
// // //     return;
// // //   }

// // //   return performAction(
// // //     personId,
// // //     () =>
// // //       axiosInstance.post("/api/connections/request", {
// // //         userId: personId, // Changed here
// // //       }),
// // //     {
// // //       clearSearch: true,
// // //       newStatus: "pending",
// // //     }
// // //   );
// // // };


// // //   const removeConnection = (person) => {
// // //     const personId = getId(person);

// // //     if (!personId) {
// // //       setError("Unable to identify this connection.");
// // //       return;
// // //     }

// // //     if (!window.confirm(`Remove ${person?.fullName || "this connection"}?`)) {
// // //       return;
// // //     }

// // //     return performAction(personId, () =>
// // //       axiosInstance.delete(`/api/connections/${personId}`)
// // //     );
// // //   };

// // //   const blockUser = (person) => {
// // //     const personId = getId(person);

// // //     if (!personId) {
// // //       setError("Unable to identify this user.");
// // //       return;
// // //     }

// // //     if (!window.confirm(`Block ${person?.fullName || "this user"}?`)) {
// // //       return;
// // //     }

// // //     return performAction(personId, () =>
// // //       axiosInstance.post(`/api/connections/${personId}/block`)
// // //     );
// // //   };

// // //   const unblockUser = (person) => {
// // //     const personId = getId(person);

// // //     if (!personId) {
// // //       setError("Unable to identify this user.");
// // //       return;
// // //     }

// // //     return performAction(personId, () =>
// // //       axiosInstance.delete(`/api/connections/${personId}/block`)
// // //     );
// // //   };

// // //   const saveCity = async (event) => {
// // //     event.preventDefault();
// // //     setCitySaving(true);
// // //     setCityMessage("");
// // //     setError("");

// // //     try {
// // //       const normalizedCity = city.trim();
// // //       const response = await axiosInstance.patch("/api/connections/city", {
// // //         city: normalizedCity,
// // //       });

// // //       setCity(normalizedCity);
// // //       setCityMessage(response.data?.message || "City updated!");
// // //       await loadConnections();
// // //     } catch (err) {
// // //       setError(getError(err));
// // //     } finally {
// // //       setCitySaving(false);
// // //     }
// // //   };

// // //   const tabs = [
// // //     { id: "search", label: "Discover", icon: Search },
// // //     {
// // //       id: "requests",
// // //       label: "Requests",
// // //       icon: Clock3,
// // //       count: incoming.length,
// // //     },
// // //     {
// // //       id: "connections",
// // //       label: "Connections",
// // //       icon: Users,
// // //       count: connections.length,
// // //     },
// // //     {
// // //       id: "blocked",
// // //       label: "Blocked",
// // //       icon: Ban,
// // //       count: blockedUsers.length,
// // //     },
// // //   ];

// // //   const currentUserId = getId(authUser);

// // //   return (
// // //     <section className="w-full space-y-5 rounded-3xl border border-white/[0.08] bg-[#0b0b12] p-4 text-white shadow-2xl shadow-black/20 sm:p-6">
// // //       <div className="flex items-start justify-between gap-3">
// // //         <div>
// // //           <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">
// // //             Your circle
// // //           </p>
// // //           <h2 className="mt-1 text-2xl font-bold tracking-tight">
// // //             Connections
// // //           </h2>
// // //           <p className="mt-1 text-sm text-gray-400">
// // //             Find people and choose who you connect with.
// // //           </p>
// // //         </div>

// // //         <button
// // //           type="button"
// // //           onClick={loadConnections}
// // //           disabled={loading}
// // //           title="Refresh connections"
// // //           className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-gray-300 transition hover:bg-white/10 disabled:opacity-50"
// // //         >
// // //           <RefreshCw
// // //             size={17}
// // //             className={loading ? "animate-spin" : ""}
// // //           />
// // //         </button>
// // //       </div>

// // //       <form
// // //         onSubmit={saveCity}
// // //         className="rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-500/[0.08] to-pink-500/[0.04] p-4"
// // //       >
// // //         <div className="mb-3 flex items-start gap-3">
// // //           <div className="rounded-xl bg-violet-500/15 p-2 text-violet-200">
// // //             <MapPin size={18} />
// // //           </div>
// // //           <div className="min-w-0 flex-1">
// // //             <p className="text-sm font-semibold text-white">Your city</p>
// // //             <p className="mt-1 text-xs leading-5 text-gray-400">
// // //               Share your city to see which connections are nearby. You can clear it anytime.
// // //             </p>
// // //           </div>
// // //         </div>
// // //         <div className="flex flex-col gap-2 sm:flex-row">
// // //           <input
// // //             value={city}
// // //             onChange={(event) => {
// // //               setCity(event.target.value);
// // //               setCityMessage("");
// // //             }}
// // //             maxLength={80}
// // //             placeholder="Enter your city (e.g. Mumbai)"
// // //             className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-violet-400/50"
// // //           />
// // //           <button
// // //             type="submit"
// // //             disabled={citySaving}
// // //             className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
// // //           >
// // //             {citySaving && <LoaderCircle size={15} className="animate-spin" />}
// // //             {citySaving ? "Saving..." : "Save city"}
// // //           </button>
// // //         </div>
// // //         {cityMessage && (
// // //           <p className="mt-2 text-xs text-emerald-300">{cityMessage}</p>
// // //         )}
// // //       </form>

// // //       <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
// // //         {tabs.map(({ id, label, icon: Icon, count }) => (
// // //           <button
// // //             key={id}
// // //             type="button"
// // //             onClick={() => setActiveTab(id)}
// // //             className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition duration-200 ${
// // //               activeTab === id
// // //                 ? "border-violet-400/30 bg-violet-500/15 text-violet-200"
// // //                 : "border-white/[0.07] bg-white/[0.025] text-gray-400 hover:bg-white/[0.06] hover:text-white"
// // //             }`}
// // //           >
// // //             <Icon size={16} />
// // //             <span>{label}</span>
// // //             {count > 0 && (
// // //               <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px]">
// // //                 {count}
// // //               </span>
// // //             )}
// // //           </button>
// // //         ))}
// // //       </div>

// // //       {error && (
// // //         <div
// // //           role="alert"
// // //           className="rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
// // //         >
// // //           {error}
// // //         </div>
// // //       )}

// // //       {activeTab === "search" && (
// // //         <div className="space-y-4">
// // //           <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#12121b] px-4 py-3 transition focus-within:border-violet-400/50 focus-within:ring-2 focus-within:ring-violet-500/10">
// // //             <Search size={19} className="shrink-0 text-violet-300" />
// // //             <input
// // //               value={query}
// // //               onChange={(event) => setQuery(event.target.value)}
// // //               placeholder="Search by name or email..."
// // //               className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
// // //             />
// // //             {searching && (
// // //               <LoaderCircle
// // //                 size={17}
// // //                 className="animate-spin text-violet-300"
// // //               />
// // //             )}
// // //           </label>

// // //           {query.trim().length < 2 ? (
// // //             <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">
// // //               Enter at least 2 characters to discover people.
// // //             </p>
// // //           ) : searching ? (
// // //             <p className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/10 px-4 py-8 text-sm text-gray-400">
// // //               <LoaderCircle size={16} className="animate-spin" />
// // //               Searching for people...
// // //             </p>
// // //           ) : searchResults.length === 0 ? (
// // //             <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">
// // //               No users found. Try another name or email.
// // //             </p>
// // //           ) : (
// // //             <div className="space-y-2">
// // //               {searchResults.map((person, index) => {
// // //                 const personId = getId(person);
// // //                 const status = relationshipStatus(person);
// // //                 const isBusy = !!personId && busyId === personId;
// // //                 const isSelf =
// // //                   !!personId && personId === currentUserId;

// // //                 return (
// // //                   <PersonRow
// // //                     key={personId || `search-${index}`}
// // //                     person={person}
// // //                     subtitle={person.email}
// // //                   >
// // //                     {isSelf ? (
// // //                       <span className="text-xs text-gray-500">
// // //                         You
// // //                       </span>
// // //                     ) : status === "accepted" ? (
// // //                       <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
// // //                         <UserCheck size={14} />
// // //                         Connected
// // //                       </span>
// // //                     ) : status === "pending" ? (
// // //                       person.relationship?.isRequester ? (
// // //                         <ActionButton
// // //                           variant="neutral"
// // //                           disabled={isBusy}
// // //                           onClick={() =>
// // //                             performAction(
// // //                               personId,
// // //                               () =>
// // //                                 axiosInstance.delete(
// // //                                   `/api/connections/${personId}/cancel`
// // //                                 ),
// // //                               {
// // //                                 clearSearch: true,
// // //                                 newStatus: "none",
// // //                               }
// // //                             )
// // //                           }
// // //                         >
// // //                           <X size={14} />
// // //                           Cancel
// // //                         </ActionButton>
// // //                       ) : (
// // //                         <ActionButton
// // //                           variant="neutral"
// // //                           onClick={() => setActiveTab("requests")}
// // //                         >
// // //                           <Clock3 size={14} />
// // //                           Respond
// // //                         </ActionButton>
// // //                       )
// // //                     ) : status === "blocked" ? (
// // //                       <span className="text-xs text-rose-300">
// // //                         Blocked
// // //                       </span>
// // //                     ) : (
// // //                       <ActionButton
// // //                         disabled={isBusy || !personId}
// // //                         onClick={() => sendRequest(person)}
// // //                       >
// // //                         {isBusy ? (
// // //                           <LoaderCircle
// // //                             size={14}
// // //                             className="animate-spin"
// // //                           />
// // //                         ) : (
// // //                           <UserPlus size={14} />
// // //                         )}
// // //                         Connect
// // //                       </ActionButton>
// // //                     )}
// // //                   </PersonRow>
// // //                 );
// // //               })}
// // //             </div>
// // //           )}
// // //         </div>
// // //       )}

// // //       {activeTab === "requests" && (
// // //         <div className="space-y-5">
// // //           <div>
// // //             <h3 className="mb-3 text-sm font-semibold text-gray-200">
// // //               Incoming requests
// // //             </h3>

// // //             {incoming.length === 0 ? (
// // //               <p className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-center text-sm text-gray-500">
// // //                 No pending requests right now.
// // //               </p>
// // //             ) : (
// // //               <div className="space-y-2">
// // //                 {incoming.map((request, index) => {
// // //                   const person = getPerson(request, "incoming");
// // //                   const personId = getId(person);
// // //                   const requestId = getId(request);

// // //                   return (
// // //                     <PersonRow
// // //                       key={requestId || personId || `incoming-${index}`}
// // //                       person={person}
// // //                       subtitle="Wants to connect with you"
// // //                     >
// // //                       <ActionButton
// // //                         variant="success"
// // //                         disabled={busyId === requestId || !requestId}
// // //                         onClick={() => acceptRequest(request)}
// // //                       >
// // //                         <Check size={14} />
// // //                         Accept
// // //                       </ActionButton>

// // //                       <ActionButton
// // //                         variant="neutral"
// // //                         disabled={busyId === requestId || !requestId}
// // //                         onClick={() => rejectRequest(request)}
// // //                       >
// // //                         <X size={14} />
// // //                         Reject
// // //                       </ActionButton>
// // //                     </PersonRow>
// // //                   );
// // //                 })}
// // //               </div>
// // //             )}
// // //           </div>

// // //           <div>
// // //             <h3 className="mb-3 text-sm font-semibold text-gray-200">
// // //               Sent requests
// // //             </h3>

// // //             {outgoing.length === 0 ? (
// // //               <p className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-center text-sm text-gray-500">
// // //                 You have no outgoing requests.
// // //               </p>
// // //             ) : (
// // //               <div className="space-y-2">
// // //                 {outgoing.map((request, index) => {
// // //                   const person = getPerson(request, "outgoing");
// // //                   const personId = getId(person);
// // //                   const requestId = getId(request);

// // //                   return (
// // //                     <PersonRow
// // //                       key={requestId || personId || `outgoing-${index}`}
// // //                       person={person}
// // //                       subtitle="Request pending"
// // //                     >
// // //                       <ActionButton
// // //                         variant="neutral"
// // //                         disabled={busyId === requestId || !requestId}
// // //                         onClick={() => cancelRequest(request)}
// // //                       >
// // //                         <X size={14} />
// // //                         Cancel
// // //                       </ActionButton>
// // //                     </PersonRow>
// // //                   );
// // //                 })}
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       )}

// // //       {activeTab === "connections" && (
// // //         <div className="space-y-2">
// // //           {connections.length === 0 ? (
// // //             <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">
// // //               No connections yet. Use Discover to find people.
// // //             </p>
// // //           ) : (
// // //             connections.map((connection, index) => {
// // //               const person = getPerson(connection, "connection");
// // //               const personId = getId(person);

// // //               const myCity = String(city || authUser?.city || "")
// // //                 .trim()
// // //                 .toLocaleLowerCase();
// // //               const theirCity = String(person?.city || "")
// // //                 .trim()
// // //                 .toLocaleLowerCase();
// // //               const sameCity = Boolean(myCity && theirCity && myCity === theirCity);

// // //               return (
// // //                 <div
// // //                   key={
// // //                     getId(connection) ||
// // //                     personId ||
// // //                     `connection-${index}`
// // //                   }
// // //                   className="space-y-2"
// // //                 >
// // //                   <PersonRow
// // //                     person={person}
// // //                     subtitle={person?.email || "Your connection"}
// // //                   >
// // //                     <ActionButton
// // //                       variant="neutral"
// // //                       disabled={busyId === personId || !personId}
// // //                       onClick={() => removeConnection(person)}
// // //                     >
// // //                       <Trash2 size={14} />
// // //                       Remove
// // //                     </ActionButton>

// // //                     <ActionButton
// // //                       variant="danger"
// // //                       disabled={busyId === personId || !personId}
// // //                       onClick={() => blockUser(person)}
// // //                     >
// // //                       <Ban size={14} />
// // //                       Block
// // //                     </ActionButton>
// // //                   </PersonRow>

// // //                   {sameCity && (
// // //                     <div className="flex items-start gap-2 rounded-2xl border border-fuchsia-400/15 bg-gradient-to-r from-violet-500/10 to-pink-500/10 px-4 py-3">
// // //                       <Sparkles size={17} className="mt-0.5 shrink-0 text-fuchsia-300" />
// // //                       <div>
// // //                         <p className="text-sm font-semibold text-fuchsia-200">
// // //                           Same city, same vibe ✨
// // //                         </p>
// // //                         <p className="mt-1 text-xs leading-5 text-gray-300">
// // //                           You're not that far apart anymore! Maybe it's coffee time ☕
// // //                         </p>
// // //                       </div>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               );
// // //             })
// // //           )}
// // //         </div>
// // //       )}

// // //       {activeTab === "blocked" && (
// // //         <div className="space-y-2">
// // //           {blockedUsers.length === 0 ? (
// // //             <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">
// // //               You have no blocked users.
// // //             </p>
// // //           ) : (
// // //             blockedUsers.map((entry, index) => {
// // //               const person = getPerson(entry, "connection");
// // //               const personId = getId(person);

// // //               return (
// // //                 <PersonRow
// // //                   key={
// // //                     getId(entry) ||
// // //                     personId ||
// // //                     `blocked-${index}`
// // //                   }
// // //                   person={person}
// // //                   subtitle="Blocked user"
// // //                 >
// // //                   <ActionButton
// // //                     variant="neutral"
// // //                     disabled={busyId === personId || !personId}
// // //                     onClick={() => unblockUser(person)}
// // //                   >
// // //                     Unblock
// // //                   </ActionButton>
// // //                 </PersonRow>
// // //               );
// // //             })
// // //           )}
// // //         </div>
// // //       )}

// // //       <p className="border-t border-white/[0.07] pt-4 text-xs leading-5 text-gray-500">
// // //         Only accepted connections should be able to message or call each
// // //         other. Connection changes are checked by the backend.
// // //       </p>
// // //     </section>
// // //   );
// // // }



// // // import React, { useCallback, useEffect, useState } from "react";
// // // import {
// // //   Search,
// // //   UserPlus,
// // //   Users,
// // //   UserCheck,
// // //   Clock3,
// // //   Check,
// // //   X,
// // //   Ban,
// // //   Trash2,
// // //   RefreshCw,
// // //   LoaderCircle,
// // //   MapPin,
// // //   Sparkles,
// // // } from "lucide-react";

// // // import axiosInstance from "../utils/axiosinstance";
// // // import { useAuthStore } from "../utils/useAuthStore";

// // // const getError = (error) =>
// // //   error?.response?.data?.message ||
// // //   "Something went wrong. Please try again.";

// // // const getId = (value) => {
// // //   if (!value) return "";

// // //   if (typeof value === "string" || typeof value === "number") {
// // //     return String(value);
// // //   }

// // //   if (typeof value !== "object") return "";

// // //   const id =
// // //     value._id ??
// // //     value.id ??
// // //     value.userId ??
// // //     value.recipientId ??
// // //     value.requesterId ??
// // //     value.senderId ??
// // //     value.receiverId ??
// // //     value.user?._id ??
// // //     value.user?.id ??
// // //     value.user?.userId;

// // //   return id != null && typeof id === "object"
// // //     ? getId(id)
// // //     : id != null
// // //       ? String(id)
// // //       : "";
// // // };

// // // const getPerson = (connection, type) => {
// // //   if (!connection) return null;

// // //   if (type === "incoming") {
// // //     return (
// // //       connection.requester ||
// // //       connection.sender ||
// // //       connection.user ||
// // //       connection
// // //     );
// // //   }

// // //   if (type === "outgoing") {
// // //     return (
// // //       connection.recipient ||
// // //       connection.receiver ||
// // //       connection.user ||
// // //       connection
// // //     );
// // //   }

// // //   return connection.user || connection;
// // // };

// // // const relationshipStatus = (user) =>
// // //   user?.relationship?.status || user?.status || "none";

// // // /* City-centre coordinates for approximate distances in kilometres. */
// // // const CITY_COORDINATES = {
// // //   "mumbai": [19.076, 72.8777],
// // //   "navi mumbai": [19.033, 73.0297],
// // //   "new mumbai": [19.033, 73.0297],
// // //   "thane": [19.2183, 72.9781],
// // //   "pune": [18.5204, 73.8567],
// // //   "nashik": [19.9975, 73.7898],
// // //   "nagpur": [21.1458, 79.0882],
// // //   "chandrapur": [19.9615, 79.2961],
// // //   "jabalpur": [23.1815, 79.9864],
// // //   "bhopal": [23.2599, 77.4126],
// // //   "indore": [22.7196, 75.8577],
// // //   "delhi": [28.6139, 77.209],
// // //   "new delhi": [28.6139, 77.209],
// // //   "bangalore": [12.9716, 77.5946],
// // //   "banglore": [12.9716, 77.5946],
// // //   "bengaluru": [12.9716, 77.5946],
// // //   "hyderabad": [17.385, 78.4867],
// // //   "chennai": [13.0827, 80.2707],
// // //   "kolkata": [22.5726, 88.3639],
// // //   "ahmedabad": [23.0225, 72.5714],
// // //   "jaipur": [26.9124, 75.7873],
// // //   "lucknow": [26.8467, 80.9462],
// // //   "surat": [21.1702, 72.8311],
// // //   "patna": [25.5941, 85.1376],
// // //   "kochi": [9.9312, 76.2673],
// // //   "ernakulam": [9.9816, 76.2999],
// // //   "goa": [15.2993, 74.124],
// // //   "panaji": [15.4909, 73.8278],
// // //   "chandigarh": [30.7333, 76.7794],
// // //   "dehradun": [30.3165, 78.0322],
// // //   "aurangabad": [19.8762, 75.3433],
// // //   "chhatrapati sambhajinagar": [19.8762, 75.3433],
// // // };

// // // function normalizeCity(value) {
// // //   return String(value || "")
// // //     .trim()
// // //     .toLowerCase()
// // //     .replace(/\s+/g, " ");
// // // }

// // // function getCityDistanceKm(cityA, cityB) {
// // //   const a = CITY_COORDINATES[normalizeCity(cityA)];
// // //   const b = CITY_COORDINATES[normalizeCity(cityB)];

// // //   if (!a || !b) return null;

// // //   const toRadians = (degrees) => (degrees * Math.PI) / 180;

// // //   const [lat1, lon1] = a;
// // //   const [lat2, lon2] = b;

// // //   const dLat = toRadians(lat2 - lat1);
// // //   const dLon = toRadians(lon2 - lon1);

// // //   const haversine =
// // //     Math.sin(dLat / 2) ** 2 +
// // //     Math.cos(toRadians(lat1)) *
// // //       Math.cos(toRadians(lat2)) *
// // //       Math.sin(dLon / 2) ** 2;

// // //   return Math.round(
// // //     6371 *
// // //       2 *
// // //       Math.atan2(
// // //         Math.sqrt(haversine),
// // //         Math.sqrt(1 - haversine)
// // //       )
// // //   );
// // // }

// // // function PersonAvatar({ person, size = "h-11 w-11" }) {
// // //   const label = person?.fullName || person?.email || "User";

// // //   return (
// // //     <div
// // //       className={`flex ${size} shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-violet-600 to-pink-500 text-sm font-bold text-white`}
// // //     >
// // //       {person?.profilePic ? (
// // //         <img
// // //           src={person.profilePic}
// // //           alt={label}
// // //           className="h-full w-full object-cover"
// // //         />
// // //       ) : (
// // //         label.trim().charAt(0).toUpperCase()
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // function ActionButton({
// // //   children,
// // //   onClick,
// // //   disabled,
// // //   variant = "primary",
// // // }) {
// // //   const styles = {
// // //     primary: "bg-violet-600 text-white hover:bg-violet-500",
// // //     success:
// // //       "border border-emerald-400/20 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20",
// // //     neutral:
// // //       "border border-white/10 bg-white/[0.05] text-gray-200 hover:bg-white/10",
// // //     danger:
// // //       "border border-rose-400/20 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20",
// // //   };

// // //   return (
// // //     <button
// // //       type="button"
// // //       disabled={disabled}
// // //       onClick={onClick}
// // //       className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]}`}
// // //     >
// // //       {children}
// // //     </button>
// // //   );
// // // }

// // // function PersonRow({ person, subtitle, children }) {
// // //   if (!person) return null;

// // //   return (
// // //     <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3 transition hover:border-violet-400/20 hover:bg-white/[0.045]">
// // //       <PersonAvatar person={person} />

// // //       <div className="min-w-0 flex-1">
// // //         <p className="truncate text-sm font-semibold text-white">
// // //           {person.fullName || "MilesCloser user"}
// // //         </p>
// // //         <p className="truncate text-xs text-gray-400">
// // //           {subtitle || person.email || "Member"}
// // //         </p>
// // //       </div>

// // //       <div className="flex shrink-0 flex-wrap justify-end gap-2">
// // //         {children}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // /* The visual connector displayed under each accepted connection. */
// // // function DistanceConnector({ person, myCity, authUser }) {
// // //   const theirCity = person?.city || "";
// // //   const distance = getCityDistanceKm(myCity, theirCity);

// // //   const myPhoto = authUser?.profilePic;
// // //   const theirPhoto = person?.profilePic;

// // //   const myInitial = (
// // //     authUser?.fullName ||
// // //     authUser?.email ||
// // //     "Y"
// // //   ).trim().charAt(0).toUpperCase();

// // //   const theirInitial = (
// // //     person?.fullName ||
// // //     person?.email ||
// // //     "F"
// // //   ).trim().charAt(0).toUpperCase();

// // //   return (
// // //     <div className="relative mx-1 overflow-hidden rounded-2xl border border-violet-400/20 bg-gradient-to-r from-[#171329] via-[#24152c] to-[#171329] px-3 py-5 sm:px-5">
// // //       {/* Soft background glow */}
// // //       <div className="pointer-events-none absolute -left-10 top-0 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl" />
// // //       <div className="pointer-events-none absolute -right-10 bottom-0 h-24 w-24 rounded-full bg-pink-500/10 blur-2xl" />

// // //       <div className="relative flex items-center justify-between gap-2 sm:gap-4">
// // //         {/* Your profile */}
// // //         <div className="relative z-10 flex w-14 shrink-0 flex-col items-center gap-2 sm:w-16">
// // //           <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-violet-300 bg-violet-600 shadow-lg shadow-violet-500/20 sm:h-14 sm:w-14">
// // //             {myPhoto ? (
// // //               <img
// // //                 src={myPhoto}
// // //                 alt="Your profile"
// // //                 className="h-full w-full object-cover"
// // //               />
// // //             ) : (
// // //               <div className="flex h-full w-full items-center justify-center text-lg font-bold text-white">
// // //                 {myInitial}
// // //               </div>
// // //             )}
// // //           </div>

// // //           <span className="max-w-full truncate text-[10px] font-semibold text-violet-200">
// // //             You
// // //           </span>
// // //         </div>

// // //         {/* Connector */}
// // //         <div className="relative h-16 min-w-0 flex-1">
// // //           <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-white/10">
// // //             <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-violet-400 via-pink-400 to-fuchsia-300" />
// // //           </div>

// // //           <span className="absolute left-[20%] top-0 z-10 animate-bounce text-lg">
// // //             🐻
// // //           </span>

// // //           <span className="absolute right-[18%] bottom-0 z-10 animate-pulse text-lg">
// // //             ✨
// // //           </span>

// // //           <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-pink-300/30 bg-[#24152c] px-3 py-1.5 text-[11px] font-bold text-pink-100 shadow-lg shadow-pink-500/10 sm:px-4 sm:text-xs">
// // //             {distance !== null ? `${distance} km` : "♡ connected ♡"}
// // //           </div>
// // //         </div>

// // //         {/* Friend profile */}
// // //         <div className="relative z-10 flex w-14 shrink-0 flex-col items-center gap-2 sm:w-16">
// // //           <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-pink-300 bg-pink-600 shadow-lg shadow-pink-500/20 sm:h-14 sm:w-14">
// // //             {theirPhoto ? (
// // //               <img
// // //                 src={theirPhoto}
// // //                 alt={person?.fullName || "Your connection"}
// // //                 className="h-full w-full object-cover"
// // //               />
// // //             ) : (
// // //               <div className="flex h-full w-full items-center justify-center text-lg font-bold text-white">
// // //                 {theirInitial}
// // //               </div>
// // //             )}
// // //           </div>

// // //           <span className="max-w-full truncate text-[10px] font-semibold text-pink-200">
// // //             {(person?.fullName || "Friend").split(" ")[0]}
// // //           </span>
// // //         </div>
// // //       </div>

// // //       <div className="relative mt-3 flex items-center justify-center gap-1.5 text-center">
// // //         <Sparkles size={13} className="shrink-0 text-fuchsia-300" />

// // //         <p className="text-[11px] leading-5 text-gray-300">
// // //           {distance === null
// // //             ? !normalizeCity(myCity) || !normalizeCity(theirCity)
// // //               ? "Add both cities to discover your distance"
// // //               : "City not in our distance list yet · Still connected 💜"
// // //             : distance === 0
// // //               ? "Same city, closer vibes ✨"
// // //               : "Different cities, one connection 💜"}
// // //         </p>
// // //       </div>

// // //       {distance === null && normalizeCity(myCity) && normalizeCity(theirCity) && (
// // //         <p className="mt-1 text-center text-[10px] text-gray-500">
// // //           Try entering a supported city name.
// // //         </p>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default function ConnectionPanel() {
// // //   const socket = useAuthStore((state) => state.socket);
// // //   const authUser = useAuthStore((state) => state.authUser);

// // //   const [query, setQuery] = useState("");
// // //   const [searchResults, setSearchResults] = useState([]);
// // //   const [connections, setConnections] = useState([]);
// // //   const [incoming, setIncoming] = useState([]);
// // //   const [outgoing, setOutgoing] = useState([]);
// // //   const [blockedUsers, setBlockedUsers] = useState([]);

// // //   const [activeTab, setActiveTab] = useState("search");
// // //   const [loading, setLoading] = useState(false);
// // //   const [searching, setSearching] = useState(false);
// // //   const [busyId, setBusyId] = useState("");
// // //   const [error, setError] = useState("");
// // //   const [city, setCity] = useState(authUser?.city || "");
// // //   const [citySaving, setCitySaving] = useState(false);
// // //   const [cityMessage, setCityMessage] = useState("");

// // //   useEffect(() => {
// // //     setCity(authUser?.city || "");
// // //   }, [authUser?.city]);

// // //   const loadConnections = useCallback(async () => {
// // //     setLoading(true);
// // //     setError("");

// // //     try {
// // //       const [connectionResponse, requestResponse] = await Promise.all([
// // //         axiosInstance.get("/api/connections/"),
// // //         axiosInstance.get("/api/connections/requests"),
// // //       ]);

// // //       const connectionData = connectionResponse.data;
// // //       const requestData = requestResponse.data;

// // //       setConnections(
// // //         Array.isArray(connectionData)
// // //           ? connectionData
// // //           : connectionData?.connections || []
// // //       );

// // //       setIncoming(
// // //         Array.isArray(requestData?.incoming)
// // //           ? requestData.incoming
// // //           : Array.isArray(requestData?.incomingRequests)
// // //             ? requestData.incomingRequests
// // //             : []
// // //       );

// // //       setOutgoing(
// // //         Array.isArray(requestData?.outgoing)
// // //           ? requestData.outgoing
// // //           : Array.isArray(requestData?.outgoingRequests)
// // //             ? requestData.outgoingRequests
// // //             : []
// // //       );

// // //       setBlockedUsers(
// // //         Array.isArray(requestData?.blocked)
// // //           ? requestData.blocked
// // //           : []
// // //       );
// // //     } catch (err) {
// // //       setError(getError(err));
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     loadConnections();
// // //   }, [loadConnections]);

// // //   useEffect(() => {
// // //     if (!socket) return;

// // //     const refreshEvents = [
// // //       "connection:request",
// // //       "connection:accepted",
// // //       "connection:rejected",
// // //       "connection:cancelled",
// // //       "connection:removed",
// // //       "connection:blocked",
// // //       "connection:unblocked",
// // //     ];

// // //     refreshEvents.forEach((eventName) => {
// // //       socket.on(eventName, loadConnections);
// // //     });

// // //     return () => {
// // //       refreshEvents.forEach((eventName) => {
// // //         socket.off(eventName, loadConnections);
// // //       });
// // //     };
// // //   }, [socket, loadConnections]);

// // //   useEffect(() => {
// // //     const trimmedQuery = query.trim();

// // //     if (trimmedQuery.length < 2) {
// // //       setSearchResults([]);
// // //       setSearching(false);
// // //       return;
// // //     }

// // //     let cancelled = false;

// // //     const timeoutId = setTimeout(async () => {
// // //       setSearching(true);

// // //       try {
// // //         const response = await axiosInstance.get(
// // //           `/api/connections/search?q=${encodeURIComponent(trimmedQuery)}`
// // //         );

// // //         if (!cancelled) {
// // //           setSearchResults(
// // //             Array.isArray(response.data)
// // //               ? response.data
// // //               : response.data?.users || []
// // //           );
// // //           setError("");
// // //         }
// // //       } catch (err) {
// // //         if (!cancelled) {
// // //           setSearchResults([]);
// // //           setError(getError(err));
// // //         }
// // //       } finally {
// // //         if (!cancelled) setSearching(false);
// // //       }
// // //     }, 300);

// // //     return () => {
// // //       cancelled = true;
// // //       clearTimeout(timeoutId);
// // //     };
// // //   }, [query]);

// // //   const performAction = async (personId, action, config = {}) => {
// // //     if (!personId) {
// // //       setError("Unable to identify this user.");
// // //       return;
// // //     }

// // //     setBusyId(personId);
// // //     setError("");

// // //     try {
// // //       await action();
// // //       await loadConnections();

// // //       if (config.clearSearch) {
// // //         setSearchResults((previous) =>
// // //           previous.map((person) =>
// // //             getId(person) === personId
// // //               ? {
// // //                   ...person,
// // //                   relationship: {
// // //                     ...person.relationship,
// // //                     status: config.newStatus || "pending",
// // //                   },
// // //                 }
// // //               : person
// // //           )
// // //         );
// // //       }
// // //     } catch (err) {
// // //       setError(getError(err));
// // //     } finally {
// // //       setBusyId("");
// // //     }
// // //   };

// // //   const acceptRequest = (request) => {
// // //     const connectionId = getId(request);

// // //     return performAction(connectionId, () =>
// // //       axiosInstance.patch(
// // //         `/api/connections/${connectionId}/accept`
// // //       )
// // //     );
// // //   };

// // //   const rejectRequest = (request) => {
// // //     const connectionId = getId(request);

// // //     return performAction(connectionId, () =>
// // //       axiosInstance.patch(
// // //         `/api/connections/${connectionId}/reject`
// // //       )
// // //     );
// // //   };

// // //   const cancelRequest = (request) => {
// // //     const connectionId = getId(request);

// // //     return performAction(connectionId, () =>
// // //       axiosInstance.delete(
// // //         `/api/connections/${connectionId}/cancel`
// // //       )
// // //     );
// // //   };

// // //   const sendRequest = (person) => {
// // //     const personId = getId(person);
// // //     const currentUserId = getId(authUser);

// // //     if (!personId) {
// // //       setError("Unable to identify this user. Please refresh and try again.");
// // //       console.error("Connection request: user ID missing.", person);
// // //       return;
// // //     }

// // //     if (currentUserId && personId === currentUserId) {
// // //       setError("You cannot send a connection request to yourself.");
// // //       return;
// // //     }

// // //     return performAction(
// // //       personId,
// // //       () =>
// // //         axiosInstance.post("/api/connections/request", {
// // //           userId: personId,
// // //         }),
// // //       {
// // //         clearSearch: true,
// // //         newStatus: "pending",
// // //       }
// // //     );
// // //   };

// // //   const removeConnection = (person) => {
// // //     const personId = getId(person);

// // //     if (!personId) {
// // //       setError("Unable to identify this connection.");
// // //       return;
// // //     }

// // //     if (!window.confirm(`Remove ${person?.fullName || "this connection"}?`)) {
// // //       return;
// // //     }

// // //     return performAction(personId, () =>
// // //       axiosInstance.delete(`/api/connections/${personId}`)
// // //     );
// // //   };

// // //   const blockUser = (person) => {
// // //     const personId = getId(person);

// // //     if (!personId) {
// // //       setError("Unable to identify this user.");
// // //       return;
// // //     }

// // //     if (!window.confirm(`Block ${person?.fullName || "this user"}?`)) {
// // //       return;
// // //     }

// // //     return performAction(personId, () =>
// // //       axiosInstance.post(`/api/connections/${personId}/block`)
// // //     );
// // //   };

// // //   const unblockUser = (person) => {
// // //     const personId = getId(person);

// // //     if (!personId) {
// // //       setError("Unable to identify this user.");
// // //       return;
// // //     }

// // //     return performAction(personId, () =>
// // //       axiosInstance.delete(`/api/connections/${personId}/block`)
// // //     );
// // //   };

// // //   const saveCity = async (event) => {
// // //     event.preventDefault();
// // //     setCitySaving(true);
// // //     setCityMessage("");
// // //     setError("");

// // //     try {
// // //       const normalizedCity = city.trim();

// // //       const response = await axiosInstance.patch(
// // //         "/api/connections/city",
// // //         { city: normalizedCity }
// // //       );

// // //       setCityMessage(response.data?.message || "City updated!");
// // //       await loadConnections();
// // //     } catch (err) {
// // //       setError(getError(err));
// // //     } finally {
// // //       setCitySaving(false);
// // //     }
// // //   };

// // //   const tabs = [
// // //     { id: "search", label: "Discover", icon: Search },
// // //     {
// // //       id: "requests",
// // //       label: "Requests",
// // //       icon: Clock3,
// // //       count: incoming.length,
// // //     },
// // //     {
// // //       id: "connections",
// // //       label: "Connections",
// // //       icon: Users,
// // //       count: connections.length,
// // //     },
// // //     {
// // //       id: "blocked",
// // //       label: "Blocked",
// // //       icon: Ban,
// // //       count: blockedUsers.length,
// // //     },
// // //   ];

// // //   const currentUserId = getId(authUser);

// // //   return (
// // //     <section className="w-full space-y-5 rounded-3xl border border-white/[0.08] bg-[#0b0b12] p-4 text-white shadow-2xl shadow-black/20 sm:p-6">
// // //       <div className="flex items-start justify-between gap-3">
// // //         <div>
// // //           <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">
// // //             Your circle
// // //           </p>
// // //           <h2 className="mt-1 text-2xl font-bold tracking-tight">
// // //             Connections
// // //           </h2>
// // //           <p className="mt-1 text-sm text-gray-400">
// // //             Find people and choose who you connect with.
// // //           </p>
// // //         </div>

// // //         <button
// // //           type="button"
// // //           onClick={loadConnections}
// // //           disabled={loading}
// // //           title="Refresh connections"
// // //           className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-gray-300 transition hover:bg-white/10 disabled:opacity-50"
// // //         >
// // //           <RefreshCw
// // //             size={17}
// // //             className={loading ? "animate-spin" : ""}
// // //           />
// // //         </button>
// // //       </div>

// // //       <form
// // //         onSubmit={saveCity}
// // //         className="rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-500/[0.08] to-pink-500/[0.04] p-4"
// // //       >
// // //         <div className="mb-3 flex items-start gap-3">
// // //           <div className="rounded-xl bg-violet-500/15 p-2 text-violet-200">
// // //             <MapPin size={18} />
// // //           </div>

// // //           <div className="min-w-0 flex-1">
// // //             <p className="text-sm font-semibold text-white">Your city</p>
// // //             <p className="mt-1 text-xs leading-5 text-gray-400">
// // //               Share your city to see approximate distances to your connections.
// // //               You can clear it anytime.
// // //             </p>
// // //           </div>
// // //         </div>

// // //         <div className="flex flex-col gap-2 sm:flex-row">
// // //           <input
// // //             value={city}
// // //             onChange={(event) => {
// // //               setCity(event.target.value);
// // //               setCityMessage("");
// // //             }}
// // //             maxLength={80}
// // //             placeholder="Enter your city (e.g. Mumbai)"
// // //             className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-violet-400/50"
// // //           />

// // //           <button
// // //             type="submit"
// // //             disabled={citySaving}
// // //             className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
// // //           >
// // //             {citySaving && (
// // //               <LoaderCircle size={15} className="animate-spin" />
// // //             )}
// // //             {citySaving ? "Saving..." : "Save city"}
// // //           </button>
// // //         </div>

// // //         {cityMessage && (
// // //           <p className="mt-2 text-xs text-emerald-300">{cityMessage}</p>
// // //         )}
// // //       </form>

// // //       <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
// // //         {tabs.map(({ id, label, icon: Icon, count }) => (
// // //           <button
// // //             key={id}
// // //             type="button"
// // //             onClick={() => setActiveTab(id)}
// // //             className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition duration-200 ${
// // //               activeTab === id
// // //                 ? "border-violet-400/30 bg-violet-500/15 text-violet-200"
// // //                 : "border-white/[0.07] bg-white/[0.025] text-gray-400 hover:bg-white/[0.06] hover:text-white"
// // //             }`}
// // //           >
// // //             <Icon size={16} />
// // //             <span>{label}</span>
// // //             {count > 0 && (
// // //               <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px]">
// // //                 {count}
// // //               </span>
// // //             )}
// // //           </button>
// // //         ))}
// // //       </div>

// // //       {error && (
// // //         <div
// // //           role="alert"
// // //           className="rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
// // //         >
// // //           {error}
// // //         </div>
// // //       )}

// // //       {activeTab === "search" && (
// // //         <div className="space-y-4">
// // //           <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#12121b] px-4 py-3 transition focus-within:border-violet-400/50 focus-within:ring-2 focus-within:ring-violet-500/10">
// // //             <Search size={19} className="shrink-0 text-violet-300" />

// // //             <input
// // //               value={query}
// // //               onChange={(event) => setQuery(event.target.value)}
// // //               placeholder="Search by name or email..."
// // //               className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
// // //             />

// // //             {searching && (
// // //               <LoaderCircle
// // //                 size={17}
// // //                 className="animate-spin text-violet-300"
// // //               />
// // //             )}
// // //           </label>

// // //           {query.trim().length < 2 ? (
// // //             <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">
// // //               Enter at least 2 characters to discover people.
// // //             </p>
// // //           ) : searching ? (
// // //             <p className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/10 px-4 py-8 text-sm text-gray-400">
// // //               <LoaderCircle size={16} className="animate-spin" />
// // //               Searching for people...
// // //             </p>
// // //           ) : searchResults.length === 0 ? (
// // //             <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">
// // //               No users found. Try another name or email.
// // //             </p>
// // //           ) : (
// // //             <div className="space-y-2">
// // //               {searchResults.map((person, index) => {
// // //                 const personId = getId(person);
// // //                 const status = relationshipStatus(person);
// // //                 const isBusy = !!personId && busyId === personId;
// // //                 const isSelf =
// // //                   !!personId && personId === currentUserId;

// // //                 return (
// // //                   <PersonRow
// // //                     key={personId || `search-${index}`}
// // //                     person={person}
// // //                     subtitle={person.email}
// // //                   >
// // //                     {isSelf ? (
// // //                       <span className="text-xs text-gray-500">You</span>
// // //                     ) : status === "accepted" ? (
// // //                       <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
// // //                         <UserCheck size={14} />
// // //                         Connected
// // //                       </span>
// // //                     ) : status === "pending" ? (
// // //                       person.relationship?.isRequester ? (
// // //                         <ActionButton
// // //                           variant="neutral"
// // //                           disabled={isBusy}
// // //                           onClick={() =>
// // //                             performAction(
// // //                               personId,
// // //                               () =>
// // //                                 axiosInstance.delete(
// // //                                   `/api/connections/${personId}/cancel`
// // //                                 ),
// // //                               {
// // //                                 clearSearch: true,
// // //                                 newStatus: "none",
// // //                               }
// // //                             )
// // //                           }
// // //                         >
// // //                           <X size={14} />
// // //                           Cancel
// // //                         </ActionButton>
// // //                       ) : (
// // //                         <ActionButton
// // //                           variant="neutral"
// // //                           onClick={() => setActiveTab("requests")}
// // //                         >
// // //                           <Clock3 size={14} />
// // //                           Respond
// // //                         </ActionButton>
// // //                       )
// // //                     ) : status === "blocked" ? (
// // //                       <span className="text-xs text-rose-300">Blocked</span>
// // //                     ) : (
// // //                       <ActionButton
// // //                         disabled={isBusy || !personId}
// // //                         onClick={() => sendRequest(person)}
// // //                       >
// // //                         {isBusy ? (
// // //                           <LoaderCircle size={14} className="animate-spin" />
// // //                         ) : (
// // //                           <UserPlus size={14} />
// // //                         )}
// // //                         Connect
// // //                       </ActionButton>
// // //                     )}
// // //                   </PersonRow>
// // //                 );
// // //               })}
// // //             </div>
// // //           )}
// // //         </div>
// // //       )}

// // //       {activeTab === "requests" && (
// // //         <div className="space-y-5">
// // //           <div>
// // //             <h3 className="mb-3 text-sm font-semibold text-gray-200">
// // //               Incoming requests
// // //             </h3>

// // //             {incoming.length === 0 ? (
// // //               <p className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-center text-sm text-gray-500">
// // //                 No pending requests right now.
// // //               </p>
// // //             ) : (
// // //               <div className="space-y-2">
// // //                 {incoming.map((request, index) => {
// // //                   const person = getPerson(request, "incoming");
// // //                   const personId = getId(person);
// // //                   const requestId = getId(request);

// // //                   return (
// // //                     <PersonRow
// // //                       key={requestId || personId || `incoming-${index}`}
// // //                       person={person}
// // //                       subtitle="Wants to connect with you"
// // //                     >
// // //                       <ActionButton
// // //                         variant="success"
// // //                         disabled={busyId === requestId || !requestId}
// // //                         onClick={() => acceptRequest(request)}
// // //                       >
// // //                         <Check size={14} />
// // //                         Accept
// // //                       </ActionButton>

// // //                       <ActionButton
// // //                         variant="neutral"
// // //                         disabled={busyId === requestId || !requestId}
// // //                         onClick={() => rejectRequest(request)}
// // //                       >
// // //                         <X size={14} />
// // //                         Reject
// // //                       </ActionButton>
// // //                     </PersonRow>
// // //                   );
// // //                 })}
// // //               </div>
// // //             )}
// // //           </div>

// // //           <div>
// // //             <h3 className="mb-3 text-sm font-semibold text-gray-200">
// // //               Sent requests
// // //             </h3>

// // //             {outgoing.length === 0 ? (
// // //               <p className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-center text-sm text-gray-500">
// // //                 You have no outgoing requests.
// // //               </p>
// // //             ) : (
// // //               <div className="space-y-2">
// // //                 {outgoing.map((request, index) => {
// // //                   const person = getPerson(request, "outgoing");
// // //                   const personId = getId(person);
// // //                   const requestId = getId(request);

// // //                   return (
// // //                     <PersonRow
// // //                       key={requestId || personId || `outgoing-${index}`}
// // //                       person={person}
// // //                       subtitle="Request pending"
// // //                     >
// // //                       <ActionButton
// // //                         variant="neutral"
// // //                         disabled={busyId === requestId || !requestId}
// // //                         onClick={() => cancelRequest(request)}
// // //                       >
// // //                         <X size={14} />
// // //                         Cancel
// // //                       </ActionButton>
// // //                     </PersonRow>
// // //                   );
// // //                 })}
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       )}

// // //       {activeTab === "connections" && (
// // //         <div className="space-y-4">
// // //           {connections.length === 0 ? (
// // //             <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">
// // //               No connections yet. Use Discover to find people.
// // //             </p>
// // //           ) : (
// // //             connections.map((connection, index) => {
// // //               const person = getPerson(connection, "connection");
// // //               const personId = getId(person);

// // //               return (
// // //                 <div
// // //                   key={
// // //                     getId(connection) ||
// // //                     personId ||
// // //                     `connection-${index}`
// // //                   }
// // //                   className="space-y-2"
// // //                 >
// // //                   <PersonRow
// // //                     person={person}
// // //                     subtitle={person?.email || "Your connection"}
// // //                   >
// // //                     <ActionButton
// // //                       variant="neutral"
// // //                       disabled={busyId === personId || !personId}
// // //                       onClick={() => removeConnection(person)}
// // //                     >
// // //                       <Trash2 size={14} />
// // //                       Remove
// // //                     </ActionButton>

// // //                     <ActionButton
// // //                       variant="danger"
// // //                       disabled={busyId === personId || !personId}
// // //                       onClick={() => blockUser(person)}
// // //                     >
// // //                       <Ban size={14} />
// // //                       Block
// // //                     </ActionButton>
// // //                   </PersonRow>

// // //                   {/* Always render the connector, even if a city is missing. */}
// // //                   <DistanceConnector
// // //                     person={person}
// // //                     myCity={city || authUser?.city || ""}
// // //                     authUser={authUser}
// // //                   />
// // //                 </div>
// // //               );
// // //             })
// // //           )}
// // //         </div>
// // //       )}

// // //       {activeTab === "blocked" && (
// // //         <div className="space-y-2">
// // //           {blockedUsers.length === 0 ? (
// // //             <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">
// // //               You have no blocked users.
// // //             </p>
// // //           ) : (
// // //             blockedUsers.map((entry, index) => {
// // //               const person = getPerson(entry, "connection");
// // //               const personId = getId(person);

// // //               return (
// // //                 <PersonRow
// // //                   key={
// // //                     getId(entry) ||
// // //                     personId ||
// // //                     `blocked-${index}`
// // //                   }
// // //                   person={person}
// // //                   subtitle="Blocked user"
// // //                 >
// // //                   <ActionButton
// // //                     variant="neutral"
// // //                     disabled={busyId === personId || !personId}
// // //                     onClick={() => unblockUser(person)}
// // //                   >
// // //                     Unblock
// // //                   </ActionButton>
// // //                 </PersonRow>
// // //               );
// // //             })
// // //           )}
// // //         </div>
// // //       )}

// // //       <p className="border-t border-white/[0.07] pt-4 text-xs leading-5 text-gray-500">
// // //         Only accepted connections should be able to message or call each
// // //         other. Connection changes are checked by the backend.
// // //         Distances are approximate city-centre estimates, not live locations.
// // //       </p>
// // //     </section>
// // //   );
// // // }



// // import React, { useCallback, useEffect, useState } from "react";
// // import {
// //   Search, UserPlus, Users, UserCheck, Clock3, Check, X, Ban,
// //   Trash2, RefreshCw, LoaderCircle, MapPin, Sparkles,
// // } from "lucide-react";
// // import axiosInstance from "../utils/axiosinstance";
// // import { useAuthStore } from "../utils/useAuthStore";

// // const getError = (error) =>
// //   error?.response?.data?.message || "Something went wrong. Please try again.";

// // const getId = (value) => {
// //   if (!value) return "";
// //   if (typeof value === "string" || typeof value === "number") return String(value);
// //   if (typeof value !== "object") return "";

// //   const id =
// //     value._id ?? value.id ?? value.userId ?? value.recipientId ??
// //     value.requesterId ?? value.senderId ?? value.receiverId ??
// //     value.user?._id ?? value.user?.id ?? value.user?.userId;

// //   return id != null && typeof id === "object"
// //     ? getId(id)
// //     : id != null ? String(id) : "";
// // };

// // const getPerson = (connection, type) => {
// //   if (!connection) return null;
// //   if (type === "incoming") {
// //     return connection.requester || connection.sender || connection.user || connection;
// //   }
// //   if (type === "outgoing") {
// //     return connection.recipient || connection.receiver || connection.user || connection;
// //   }
// //   return connection.user || connection;
// // };

// // const relationshipStatus = (user) =>
// //   user?.relationship?.status || user?.status || "none";

// // /*
// //  * Approximate coordinates of Indian city centres.
// //  * These are city-centre estimates, not live GPS positions.
// //  */
// // const CITY_COORDINATES = {
// //   // Maharashtra
// //   "mumbai": [19.076, 72.8777],
// //   "navi mumbai": [19.033, 73.0297],
// //   "thane": [19.2183, 72.9781],
// //   "kalyan": [19.2437, 73.1355],
// //   "dombivli": [19.2183, 73.0867],
// //   "vasai": [19.3919, 72.8397],
// //   "virar": [19.4559, 72.8114],
// //   "palghar": [19.6967, 72.7655],
// //   "panvel": [18.9894, 73.1175],
// //   "badlapur": [19.1551, 73.2655],
// //   "ulhasnagar": [19.2215, 73.1645],
// //   "ambernath": [19.1864, 73.1919],
// //   "bhiwandi": [19.2813, 73.0483],
// //   "pune": [18.5204, 73.8567],
// //   "pimpri chinchwad": [18.6298, 73.7997],
// //   "nashik": [19.9975, 73.7898],
// //   "nagpur": [21.1458, 79.0882],
// //   "chandrapur": [19.9615, 79.2961],
// //   "amravati": [20.9374, 77.7796],
// //   "akola": [20.7002, 77.0082],
// //   "solapur": [17.6599, 75.9064],
// //   "kolhapur": [16.705, 74.2433],
// //   "sangli": [16.8524, 74.5815],
// //   "satara": [17.6805, 74.0183],
// //   "ahmednagar": [19.0948, 74.748],
// //   "jalgaon": [21.0077, 75.5626],
// //   "dhule": [20.9042, 74.7749],
// //   "latur": [18.4088, 76.5604],
// //   "nanded": [19.1383, 77.321],
// //   "parbhani": [19.2608, 76.7748],
// //   "beed": [18.9891, 75.7601],
// //   "osmanabad": [18.186, 76.0419],
// //   "dharashiv": [18.186, 76.0419],
// //   "aurangabad": [19.8762, 75.3433],
// //   "chhatrapati sambhajinagar": [19.8762, 75.3433],
// //   "ratnagiri": [16.9902, 73.312],
// //   "sindhudurg": [16.3492, 73.5594],
// //   "wardha": [20.7453, 78.6022],
// //   "yavatmal": [20.3888, 78.1204],
// //   "gondia": [21.4624, 80.2209],
// //   "bhandara": [21.1707, 79.6512],

// //   // Madhya Pradesh and Chhattisgarh
// //   "jabalpur": [23.1815, 79.9864],
// //   "bhopal": [23.2599, 77.4126],
// //   "indore": [22.7196, 75.8577],
// //   "gwalior": [26.2183, 78.1828],
// //   "ujjain": [23.1765, 75.7885],
// //   "sagar": [23.8388, 78.7378],
// //   "rewa": [24.5362, 81.3037],
// //   "satna": [24.6005, 80.8322],
// //   "ratlam": [23.3315, 75.0367],
// //   "dewas": [22.9676, 76.0534],
// //   "bilaspur": [22.0797, 82.1409],
// //   "raipur": [21.2514, 81.6296],
// //   "bhilai": [21.1938, 81.3509],
// //   "durg": [21.1904, 81.2849],
// //   "korba": [22.3595, 82.7501],

// //   // Gujarat
// //   "ahmedabad": [23.0225, 72.5714],
// //   "surat": [21.1702, 72.8311],
// //   "vadodara": [22.3072, 73.1812],
// //   "rajkot": [22.3039, 70.8022],
// //   "gandhinagar": [23.2156, 72.6369],
// //   "bhavnagar": [21.7645, 72.1519],
// //   "jamnagar": [22.4707, 70.0577],
// //   "junagadh": [21.5222, 70.4579],
// //   "anand": [22.5645, 72.9289],
// //   "morbi": [22.8119, 70.8236],
// //   "bharuch": [21.7051, 72.9959],
// //   "vapi": [20.3713, 72.9047],

// //   // Rajasthan
// //   "jaipur": [26.9124, 75.7873],
// //   "jodhpur": [26.2389, 73.0243],
// //   "udaipur": [24.5854, 73.7125],
// //   "kota": [25.2138, 75.8648],
// //   "ajmer": [26.4499, 74.6399],
// //   "bikaner": [28.0229, 73.3119],
// //   "alwar": [27.553, 76.6346],
// //   "bharatpur": [27.2152, 77.503],
// //   "sikar": [27.6094, 75.1399],

// //   // Uttar Pradesh
// //   "lucknow": [26.8467, 80.9462],
// //   "kanpur": [26.4499, 80.3319],
// //   "agra": [27.1767, 78.0081],
// //   "varanasi": [25.3176, 82.9739],
// //   "prayagraj": [25.4358, 81.8463],
// //   "allahabad": [25.4358, 81.8463],
// //   "ghaziabad": [28.6692, 77.4538],
// //   "noida": [28.5355, 77.391],
// //   "greater noida": [28.4744, 77.504],
// //   "meerut": [28.9845, 77.7064],
// //   "bareilly": [28.367, 79.4304],
// //   "moradabad": [28.8386, 78.7733],
// //   "aligarh": [27.8974, 78.088],
// //   "gorakhpur": [26.7606, 83.3732],
// //   "jhansi": [25.4484, 78.5685],
// //   "mathura": [27.4924, 77.6737],
// //   "ayodhya": [26.7922, 82.1998],
// //   "saharanpur": [29.968, 77.5552],
// //   "muzaffarnagar": [29.4727, 77.7085],
// //   "firozabad": [27.1592, 78.3957],

// //   // Delhi and Haryana
// //   "delhi": [28.6139, 77.209],
// //   "new delhi": [28.6139, 77.209],
// //   "gurugram": [28.4595, 77.0266],
// //   "gurgaon": [28.4595, 77.0266],
// //   "faridabad": [28.4089, 77.3178],
// //   "panipat": [29.3909, 76.9635],
// //   "ambala": [30.3782, 76.7767],
// //   "hisar": [29.1492, 75.7217],
// //   "rohtak": [28.8955, 76.6066],
// //   "karnal": [29.6857, 76.9905],
// //   "sonipat": [28.9931, 77.0151],

// //   // Punjab and Himachal Pradesh
// //   "chandigarh": [30.7333, 76.7794],
// //   "ludhiana": [30.901, 75.8573],
// //   "amritsar": [31.634, 74.8723],
// //   "jalandhar": [31.326, 75.5762],
// //   "patiala": [30.3398, 76.3869],
// //   "bathinda": [30.211, 74.9455],
// //   "mohali": [30.7046, 76.7179],
// //   "shimla": [31.1048, 77.1734],
// //   "manali": [32.2432, 77.1892],
// //   "dharamshala": [32.219, 76.3234],
// //   "solan": [30.9045, 77.0967],

// //   // Uttarakhand
// //   "dehradun": [30.3165, 78.0322],
// //   "haridwar": [29.9457, 78.1642],
// //   "rishikesh": [30.0869, 78.2676],
// //   "roorkee": [29.8543, 77.888],

// //   // Bihar and Jharkhand
// //   "patna": [25.5941, 85.1376],
// //   "gaya": [24.7914, 85.0002],
// //   "muzaffarpur": [26.1209, 85.3647],
// //   "bhagalpur": [25.2425, 86.9842],
// //   "ranchi": [23.3441, 85.3096],
// //   "jamshedpur": [22.8046, 86.2029],
// //   "dhanbad": [23.7957, 86.4304],
// //   "bokaro": [23.6693, 86.1511],

// //   // West Bengal and Odisha
// //   "kolkata": [22.5726, 88.3639],
// //   "howrah": [22.5958, 88.2636],
// //   "durgapur": [23.5204, 87.3119],
// //   "siliguri": [26.7271, 88.3953],
// //   "asansol": [23.6739, 86.9524],
// //   "bhubaneswar": [20.2961, 85.8245],
// //   "cuttack": [20.4625, 85.8828],
// //   "rourkela": [22.2604, 84.8536],
// //   "puri": [19.8135, 85.8312],
// //   "sambalpur": [21.4669, 83.9812],
// //   "berhampur": [19.3149, 84.7941],

// //   // Assam and Northeast
// //   "guwahati": [26.1445, 91.7362],
// //   "dibrugarh": [27.4728, 94.912],
// //   "silchar": [24.8333, 92.7789],
// //   "jorhat": [26.7465, 94.2026],
// //   "shillong": [25.5788, 91.8933],
// //   "imphal": [24.817, 93.9368],
// //   "aizawl": [23.7271, 92.7176],
// //   "kohima": [25.6751, 94.1086],
// //   "dimapur": [25.9063, 93.7278],
// //   "itanagar": [27.0844, 93.6053],
// //   "gangtok": [27.3389, 88.6065],
// //   "agartala": [23.8315, 91.2868],

// //   // Karnataka
// //   "bengaluru": [12.9716, 77.5946],
// //   "bangalore": [12.9716, 77.5946],
// //   "banglore": [12.9716, 77.5946],
// //   "mysuru": [12.2958, 76.6394],
// //   "mysore": [12.2958, 76.6394],
// //   "mangaluru": [12.9141, 74.856],
// //   "mangalore": [12.9141, 74.856],
// //   "hubballi": [15.3647, 75.124],
// //   "hubli": [15.3647, 75.124],
// //   "dharwad": [15.4589, 75.0078],
// //   "belagavi": [15.8497, 74.4977],
// //   "belgaum": [15.8497, 74.4977],
// //   "kalaburagi": [17.3297, 76.8343],
// //   "gulbarga": [17.3297, 76.8343],
// //   "ballari": [15.1394, 76.9214],
// //   "bellary": [15.1394, 76.9214],
// //   "shivamogga": [13.9299, 75.5681],
// //   "tumakuru": [13.3379, 77.1173],
// //   "udupi": [13.3409, 74.7421],

// //   // Telangana and Andhra Pradesh
// //   "hyderabad": [17.385, 78.4867],
// //   "warangal": [17.9689, 79.5941],
// //   "karimnagar": [18.4386, 79.1288],
// //   "nizamabad": [18.6725, 78.0941],
// //   "khammam": [17.2473, 80.1514],
// //   "visakhapatnam": [17.6868, 83.2185],
// //   "vizag": [17.6868, 83.2185],
// //   "vijayawada": [16.5062, 80.648],
// //   "guntur": [16.3067, 80.4365],
// //   "tirupati": [13.6288, 79.4192],
// //   "nellore": [14.4426, 79.9865],
// //   "kurnool": [15.8281, 78.0373],
// //   "rajahmundry": [17.0005, 81.804],
// //   "kakinada": [16.9891, 82.2475],
// //   "anantapur": [14.6819, 77.6006],
// //   "kadapa": [14.4673, 78.8242],

// //   // Tamil Nadu
// //   "chennai": [13.0827, 80.2707],
// //   "coimbatore": [11.0168, 76.9558],
// //   "madurai": [9.9252, 78.1198],
// //   "tiruchirappalli": [10.7905, 78.7047],
// //   "trichy": [10.7905, 78.7047],
// //   "salem": [11.6643, 78.146],
// //   "tiruppur": [11.1085, 77.3411],
// //   "erode": [11.341, 77.7172],
// //   "vellore": [12.9165, 79.1325],
// //   "thanjavur": [10.787, 79.1378],
// //   "thoothukudi": [8.7642, 78.1348],
// //   "tuticorin": [8.7642, 78.1348],
// //   "tirunelveli": [8.7139, 77.7567],
// //   "dindigul": [10.3673, 77.9803],
// //   "kanchipuram": [12.8185, 79.6947],
// //   "hosur": [12.7409, 77.8253],
// //   "nagercoil": [8.1833, 77.4119],
// //   "ooty": [11.4064, 76.6932],

// //   // Kerala
// //   "kochi": [9.9312, 76.2673],
// //   "cochin": [9.9312, 76.2673],
// //   "ernakulam": [9.9816, 76.2999],
// //   "thiruvananthapuram": [8.5241, 76.9366],
// //   "trivandrum": [8.5241, 76.9366],
// //   "kozhikode": [11.2588, 75.7804],
// //   "calicut": [11.2588, 75.7804],
// //   "thrissur": [10.5276, 76.2144],
// //   "kollam": [8.8932, 76.6141],
// //   "kannur": [11.8745, 75.3704],
// //   "alappuzha": [9.4981, 76.3388],
// //   "palakkad": [10.7867, 76.6548],
// //   "kottayam": [9.5916, 76.5222],
// //   "malappuram": [11.051, 76.0711],

// //   // Goa
// //   "goa": [15.2993, 74.124],
// //   "panaji": [15.4909, 73.8278],
// //   "margao": [15.2832, 73.9862],
// //   "vasco da gama": [15.386, 73.844],

// //   // Jammu and Kashmir / Ladakh
// //   "srinagar": [34.0837, 74.7973],
// //   "jammu": [32.7266, 74.857],
// //   "anantnag": [33.7311, 75.1487],
// //   "leh": [34.1526, 77.5771],
// //   "kargil": [34.5539, 76.1349],

// //   // Other major city aliases and locations
// //   "indore": [22.7196, 75.8577],
// //   "bhuj": [23.242, 69.6669],
// //   "porbandar": [21.6417, 69.6293],
// //   "mount abu": [24.5926, 72.7156],
// //   "darjeeling": [27.036, 88.2627],
// //   "port blair": [11.6234, 92.7265],
// // };

// // /* Common alternate city spellings. */
// // const CITY_ALIASES = {
// //   "new mumbai": "navi mumbai",
// //   "bombay": "mumbai",
// //   "greater bombay": "mumbai",
// //   "banglore": "bangalore",
// //   "bengaluru": "bangalore",
// //   "mysuru": "mysore",
// //   "belgaum": "belagavi",
// //   "gulbarga": "kalaburagi",
// //   "bellary": "ballari",
// //   "mangalore": "mangaluru",
// //   "cochin": "kochi",
// //   "calicut": "kozhikode",
// //   "trivandrum": "thiruvananthapuram",
// //   "new delhi": "delhi",
// //   "allahabad": "prayagraj",
// //   "aurangabad": "chhatrapati sambhajinagar",
// //   "dharashiv": "osmanabad",
// //   "vizag": "visakhapatnam",
// //   "trichy": "tiruchirappalli",
// //   "tuticorin": "thoothukudi",
// //   "gurgaon": "gurugram",
// //   "hubli": "hubballi",
// // };

// // function normalizeCity(value) {
// //   const city = String(value || "")
// //     .trim()
// //     .toLowerCase()
// //     .replace(/[.,]/g, "")
// //     .replace(/\s+/g, " ");

// //   return CITY_ALIASES[city] || city;
// // }

// // function getCityDistanceKm(cityA, cityB) {
// //   const a = CITY_COORDINATES[normalizeCity(cityA)];
// //   const b = CITY_COORDINATES[normalizeCity(cityB)];

// //   if (!a || !b) return null;

// //   const radians = (degrees) => (degrees * Math.PI) / 180;
// //   const [lat1, lon1] = a;
// //   const [lat2, lon2] = b;
// //   const dLat = radians(lat2 - lat1);
// //   const dLon = radians(lon2 - lon1);

// //   const h =
// //     Math.sin(dLat / 2) ** 2 +
// //     Math.cos(radians(lat1)) *
// //       Math.cos(radians(lat2)) *
// //       Math.sin(dLon / 2) ** 2;

// //   return Math.round(
// //     6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))
// //   );
// // }

// // function PersonAvatar({ person, size = "h-11 w-11" }) {
// //   const label = person?.fullName || person?.email || "User";

// //   return (
// //     <div className={`flex ${size} shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-violet-600 to-pink-500 text-sm font-bold text-white`}>
// //       {person?.profilePic ? (
// //         <img src={person.profilePic} alt={label} className="h-full w-full object-cover" />
// //       ) : (
// //         label.trim().charAt(0).toUpperCase()
// //       )}
// //     </div>
// //   );
// // }

// // function ActionButton({ children, onClick, disabled, variant = "primary" }) {
// //   const styles = {
// //     primary: "bg-violet-600 text-white hover:bg-violet-500",
// //     success: "border border-emerald-400/20 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20",
// //     neutral: "border border-white/10 bg-white/[0.05] text-gray-200 hover:bg-white/10",
// //     danger: "border border-rose-400/20 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20",
// //   };

// //   return (
// //     <button
// //       type="button"
// //       disabled={disabled}
// //       onClick={onClick}
// //       className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]}`}
// //     >
// //       {children}
// //     </button>
// //   );
// // }

// // function PersonRow({ person, subtitle, children }) {
// //   if (!person) return null;

// //   return (
// //     <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3 transition hover:border-violet-400/20 hover:bg-white/[0.045]">
// //       <PersonAvatar person={person} />
// //       <div className="min-w-0 flex-1">
// //         <p className="truncate text-sm font-semibold text-white">{person.fullName || "MilesCloser user"}</p>
// //         <p className="truncate text-xs text-gray-400">{subtitle || person.email || "Member"}</p>
// //       </div>
// //       <div className="flex shrink-0 flex-wrap justify-end gap-2">{children}</div>
// //     </div>
// //   );
// // }

// // function DistanceConnector({ person, myCity, authUser }) {
// //   const theirCity = person?.city || "";
// //   const distance = getCityDistanceKm(myCity, theirCity);

// //   const myInitial = (authUser?.fullName || authUser?.email || "Y").trim().charAt(0).toUpperCase();
// //   const theirInitial = (person?.fullName || person?.email || "F").trim().charAt(0).toUpperCase();

// //   /*
// //    * Distance affects avatar placement:
// //    * nearby cities = avatars appear closer;
// //    * distant cities = avatars remain at opposite ends.
// //    */
// //   const proximity = distance === null ? 0 : Math.max(0, Math.min(1, distance / 2000));
// //   const avatarGap = distance === null ? "justify-between" : proximity < 0.15 ? "justify-center gap-10" : "justify-between";

// //   return (
// //     <div className="relative mx-1 overflow-hidden rounded-2xl border border-violet-400/20 bg-gradient-to-r from-[#171329] via-[#24152c] to-[#171329] px-3 py-5 sm:px-5">
// //       <div className="pointer-events-none absolute -left-10 top-0 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl" />
// //       <div className="pointer-events-none absolute -right-10 bottom-0 h-24 w-24 rounded-full bg-pink-500/10 blur-2xl" />

// //       <div className={`relative flex items-center ${avatarGap} gap-3`}>
// //         <div className="relative z-10 flex w-14 shrink-0 flex-col items-center gap-2 sm:w-16">
// //           <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-violet-300 bg-violet-600 shadow-lg shadow-violet-500/20 sm:h-14 sm:w-14">
// //             {authUser?.profilePic ? (
// //               <img src={authUser.profilePic} alt="Your profile" className="h-full w-full object-cover" />
// //             ) : (
// //               <div className="flex h-full w-full items-center justify-center text-lg font-bold text-white">{myInitial}</div>
// //             )}
// //           </div>
// //           <span className="max-w-full truncate text-[10px] font-semibold text-violet-200">You</span>
// //         </div>

// //         <div className="relative h-16 min-w-0 flex-1">
// //           <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-white/10">
// //             <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-violet-400 via-pink-400 to-fuchsia-300" />
// //           </div>

// //           <span className="absolute left-[20%] top-0 z-10 animate-bounce text-lg">🐻</span>
// //           <span className="absolute right-[18%] bottom-0 z-10 animate-pulse text-lg">✨</span>

// //           <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-pink-300/30 bg-[#24152c] px-3 py-1.5 text-[11px] font-bold text-pink-100 shadow-lg shadow-pink-500/10 sm:px-4 sm:text-xs">
// //             {distance !== null ? `${distance.toLocaleString()} km` : "Add cities 📍"}
// //           </div>
// //         </div>

// //         <div className="relative z-10 flex w-14 shrink-0 flex-col items-center gap-2 sm:w-16">
// //           <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-pink-300 bg-pink-600 shadow-lg shadow-pink-500/20 sm:h-14 sm:w-14">
// //             {person?.profilePic ? (
// //               <img src={person.profilePic} alt={person?.fullName || "Connection"} className="h-full w-full object-cover" />
// //             ) : (
// //               <div className="flex h-full w-full items-center justify-center text-lg font-bold text-white">{theirInitial}</div>
// //             )}
// //           </div>
// //           <span className="max-w-full truncate text-[10px] font-semibold text-pink-200">{(person?.fullName || "Friend").split(" ")[0]}</span>
// //         </div>
// //       </div>

// //       <div className="relative mt-3 flex items-center justify-center gap-1.5 text-center">
// //         <Sparkles size={13} className="shrink-0 text-fuchsia-300" />
// //         <p className="text-[11px] leading-5 text-gray-300">
// //           {distance === null
// //             ? !normalizeCity(myCity) || !normalizeCity(theirCity)
// //               ? "Add both cities to discover your distance"
// //               : "City not found in our list yet 💜"
// //             : distance === 0
// //               ? "Same city, closer vibes ✨"
// //               : `${myCity} ↔ ${theirCity} · Approximate city-centre distance`}
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // export default function ConnectionPanel() {
// //   const socket = useAuthStore((state) => state.socket);
// //   const authUser = useAuthStore((state) => state.authUser);

// //   const [query, setQuery] = useState("");
// //   const [searchResults, setSearchResults] = useState([]);
// //   const [connections, setConnections] = useState([]);
// //   const [incoming, setIncoming] = useState([]);
// //   const [outgoing, setOutgoing] = useState([]);
// //   const [blockedUsers, setBlockedUsers] = useState([]);
// //   const [activeTab, setActiveTab] = useState("search");
// //   const [loading, setLoading] = useState(false);
// //   const [searching, setSearching] = useState(false);
// //   const [busyId, setBusyId] = useState("");
// //   const [error, setError] = useState("");
// //   const [city, setCity] = useState(authUser?.city || "");
// //   const [citySaving, setCitySaving] = useState(false);
// //   const [cityMessage, setCityMessage] = useState("");

// //   useEffect(() => {
// //     setCity(authUser?.city || "");
// //   }, [authUser?.city]);

// //   const loadConnections = useCallback(async () => {
// //     setLoading(true);
// //     setError("");

// //     try {
// //       const [connectionResponse, requestResponse] = await Promise.all([
// //         axiosInstance.get("/api/connections/"),
// //         axiosInstance.get("/api/connections/requests"),
// //       ]);

// //       const connectionData = connectionResponse.data;
// //       const requestData = requestResponse.data;

// //       setConnections(Array.isArray(connectionData) ? connectionData : connectionData?.connections || []);
// //       setIncoming(Array.isArray(requestData?.incoming) ? requestData.incoming : requestData?.incomingRequests || []);
// //       setOutgoing(Array.isArray(requestData?.outgoing) ? requestData.outgoing : requestData?.outgoingRequests || []);
// //       setBlockedUsers(Array.isArray(requestData?.blocked) ? requestData.blocked : []);
// //     } catch (err) {
// //       setError(getError(err));
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     loadConnections();
// //   }, [loadConnections]);

// //   useEffect(() => {
// //     if (!socket) return;

// //     const events = [
// //       "connection:request", "connection:accepted", "connection:rejected",
// //       "connection:cancelled", "connection:removed", "connection:blocked",
// //       "connection:unblocked",
// //     ];

// //     events.forEach((name) => socket.on(name, loadConnections));
// //     return () => events.forEach((name) => socket.off(name, loadConnections));
// //   }, [socket, loadConnections]);

// //   useEffect(() => {
// //     const trimmedQuery = query.trim();
// //     if (trimmedQuery.length < 2) {
// //       setSearchResults([]);
// //       setSearching(false);
// //       return;
// //     }

// //     let cancelled = false;
// //     const timeoutId = setTimeout(async () => {
// //       setSearching(true);
// //       try {
// //         const response = await axiosInstance.get(`/api/connections/search?q=${encodeURIComponent(trimmedQuery)}`);
// //         if (!cancelled) {
// //           setSearchResults(Array.isArray(response.data) ? response.data : response.data?.users || []);
// //           setError("");
// //         }
// //       } catch (err) {
// //         if (!cancelled) {
// //           setSearchResults([]);
// //           setError(getError(err));
// //         }
// //       } finally {
// //         if (!cancelled) setSearching(false);
// //       }
// //     }, 300);

// //     return () => {
// //       cancelled = true;
// //       clearTimeout(timeoutId);
// //     };
// //   }, [query]);

// //   const performAction = async (personId, action, config = {}) => {
// //     if (!personId) {
// //       setError("Unable to identify this user.");
// //       return;
// //     }

// //     setBusyId(personId);
// //     setError("");

// //     try {
// //       await action();
// //       await loadConnections();

// //       if (config.clearSearch) {
// //         setSearchResults((previous) => previous.map((person) =>
// //           getId(person) === personId
// //             ? { ...person, relationship: { ...person.relationship, status: config.newStatus || "pending" } }
// //             : person
// //         ));
// //       }
// //     } catch (err) {
// //       setError(getError(err));
// //     } finally {
// //       setBusyId("");
// //     }
// //   };

// //   const acceptRequest = (request) => {
// //     const id = getId(request);
// //     return performAction(id, () => axiosInstance.patch(`/api/connections/${id}/accept`));
// //   };

// //   const rejectRequest = (request) => {
// //     const id = getId(request);
// //     return performAction(id, () => axiosInstance.patch(`/api/connections/${id}/reject`));
// //   };

// //   const cancelRequest = (request) => {
// //     const id = getId(request);
// //     return performAction(id, () => axiosInstance.delete(`/api/connections/${id}/cancel`));
// //   };

// //   const sendRequest = (person) => {
// //     const id = getId(person);
// //     if (!id) {
// //       setError("Unable to identify this user. Please refresh and try again.");
// //       return;
// //     }
// //     if (id === getId(authUser)) {
// //       setError("You cannot send a connection request to yourself.");
// //       return;
// //     }

// //     return performAction(id, () => axiosInstance.post("/api/connections/request", { userId: id }), {
// //       clearSearch: true,
// //       newStatus: "pending",
// //     });
// //   };

// //   const removeConnection = (person) => {
// //     const id = getId(person);
// //     if (!id) return setError("Unable to identify this connection.");
// //     if (!window.confirm(`Remove ${person?.fullName || "this connection"}?`)) return;
// //     return performAction(id, () => axiosInstance.delete(`/api/connections/${id}`));
// //   };

// //   const blockUser = (person) => {
// //     const id = getId(person);
// //     if (!id) return setError("Unable to identify this user.");
// //     if (!window.confirm(`Block ${person?.fullName || "this user"}?`)) return;
// //     return performAction(id, () => axiosInstance.post(`/api/connections/${id}/block`));
// //   };

// //   const unblockUser = (person) => {
// //     const id = getId(person);
// //     if (!id) return setError("Unable to identify this user.");
// //     return performAction(id, () => axiosInstance.delete(`/api/connections/${id}/block`));
// //   };

// //   const saveCity = async (event) => {
// //     event.preventDefault();
// //     setCitySaving(true);
// //     setCityMessage("");
// //     setError("");

// //     try {
// //       const normalizedCity = city.trim();
// //       const response = await axiosInstance.patch("/api/connections/city", { city: normalizedCity });
// //       setCity(normalizedCity);
// //       setCityMessage(response.data?.message || "City updated!");
// //       await loadConnections();
// //     } catch (err) {
// //       setError(getError(err));
// //     } finally {
// //       setCitySaving(false);
// //     }
// //   };

// //   const tabs = [
// //     { id: "search", label: "Discover", icon: Search },
// //     { id: "requests", label: "Requests", icon: Clock3, count: incoming.length },
// //     { id: "connections", label: "Connections", icon: Users, count: connections.length },
// //     { id: "blocked", label: "Blocked", icon: Ban, count: blockedUsers.length },
// //   ];

// //   const currentUserId = getId(authUser);
// //   const myCity = city || authUser?.city || "";

// //   return (
// //     <section className="w-full space-y-5 rounded-3xl border border-white/[0.08] bg-[#0b0b12] p-4 text-white shadow-2xl shadow-black/20 sm:p-6">
// //       <div className="flex items-start justify-between gap-3">
// //         <div>
// //           <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">Your circle</p>
// //           <h2 className="mt-1 text-2xl font-bold tracking-tight">Connections</h2>
// //           <p className="mt-1 text-sm text-gray-400">Find people and choose who you connect with.</p>
// //         </div>
// //         <button type="button" onClick={loadConnections} disabled={loading} title="Refresh connections" className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-gray-300 transition hover:bg-white/10 disabled:opacity-50">
// //           <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
// //         </button>
// //       </div>

// //       <form onSubmit={saveCity} className="rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-500/[0.08] to-pink-500/[0.04] p-4">
// //         <div className="mb-3 flex items-start gap-3">
// //           <div className="rounded-xl bg-violet-500/15 p-2 text-violet-200"><MapPin size={18} /></div>
// //           <div className="min-w-0 flex-1">
// //             <p className="text-sm font-semibold text-white">Your city</p>
// //             <p className="mt-1 text-xs leading-5 text-gray-400">Share your city to see approximate distances to your connections. No live location is used.</p>
// //           </div>
// //         </div>
// //         <div className="flex flex-col gap-2 sm:flex-row">
// //           <input value={city} onChange={(event) => { setCity(event.target.value); setCityMessage(""); }} maxLength={80} placeholder="Enter your city (e.g. Mumbai)" className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-violet-400/50" />
// //           <button type="submit" disabled={citySaving} className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:opacity-50">
// //             {citySaving && <LoaderCircle size={15} className="animate-spin" />}
// //             {citySaving ? "Saving..." : "Save city"}
// //           </button>
// //         </div>
// //         {cityMessage && <p className="mt-2 text-xs text-emerald-300">{cityMessage}</p>}
// //       </form>

// //       <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
// //         {tabs.map(({ id, label, icon: Icon, count }) => (
// //           <button key={id} type="button" onClick={() => setActiveTab(id)} className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition ${activeTab === id ? "border-violet-400/30 bg-violet-500/15 text-violet-200" : "border-white/[0.07] bg-white/[0.025] text-gray-400 hover:bg-white/[0.06] hover:text-white"}`}>
// //             <Icon size={16} /><span>{label}</span>
// //             {count > 0 && <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px]">{count}</span>}
// //           </button>
// //         ))}
// //       </div>

// //       {error && <div role="alert" className="rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div>}

// //       {activeTab === "search" && (
// //         <div className="space-y-4">
// //           <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#12121b] px-4 py-3 focus-within:border-violet-400/50">
// //             <Search size={19} className="shrink-0 text-violet-300" />
// //             <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name or email..." className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500" />
// //             {searching && <LoaderCircle size={17} className="animate-spin text-violet-300" />}
// //           </label>

// //           {query.trim().length < 2 ? (
// //             <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">Enter at least 2 characters to discover people.</p>
// //           ) : searching ? (
// //             <p className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/10 px-4 py-8 text-sm text-gray-400"><LoaderCircle size={16} className="animate-spin" />Searching for people...</p>
// //           ) : searchResults.length === 0 ? (
// //             <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">No users found. Try another name or email.</p>
// //           ) : (
// //             <div className="space-y-2">
// //               {searchResults.map((person, index) => {
// //                 const id = getId(person);
// //                 const status = relationshipStatus(person);
// //                 const busy = busyId === id;
// //                 const isSelf = id && id === currentUserId;

// //                 return (
// //                   <PersonRow key={id || `search-${index}`} person={person} subtitle={person.email}>
// //                     {isSelf ? <span className="text-xs text-gray-500">You</span>
// //                       : status === "accepted" ? <span className="inline-flex items-center gap-1 text-xs text-emerald-300"><UserCheck size={14} />Connected</span>
// //                       : status === "pending" ? (
// //                         person.relationship?.isRequester ? (
// //                           <ActionButton variant="neutral" disabled={busy} onClick={() => performAction(id, () => axiosInstance.delete(`/api/connections/${id}/cancel`), { clearSearch: true, newStatus: "none" })}><X size={14} />Cancel</ActionButton>
// //                         ) : (
// //                           <ActionButton variant="neutral" onClick={() => setActiveTab("requests")}><Clock3 size={14} />Respond</ActionButton>
// //                         )
// //                       ) : status === "blocked" ? <span className="text-xs text-rose-300">Blocked</span>
// //                       : <ActionButton disabled={busy || !id} onClick={() => sendRequest(person)}>{busy ? <LoaderCircle size={14} className="animate-spin" /> : <UserPlus size={14} />}Connect</ActionButton>}
// //                   </PersonRow>
// //                 );
// //               })}
// //             </div>
// //           )}
// //         </div>
// //       )}

// //       {activeTab === "requests" && (
// //         <div className="space-y-5">
// //           <div>
// //             <h3 className="mb-3 text-sm font-semibold text-gray-200">Incoming requests</h3>
// //             {incoming.length === 0 ? <p className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-center text-sm text-gray-500">No pending requests right now.</p> : (
// //               <div className="space-y-2">{incoming.map((request, index) => {
// //                 const person = getPerson(request, "incoming");
// //                 const requestId = getId(request);
// //                 return <PersonRow key={requestId || getId(person) || index} person={person} subtitle="Wants to connect with you">
// //                   <ActionButton variant="success" disabled={busyId === requestId || !requestId} onClick={() => acceptRequest(request)}><Check size={14} />Accept</ActionButton>
// //                   <ActionButton variant="neutral" disabled={busyId === requestId || !requestId} onClick={() => rejectRequest(request)}><X size={14} />Reject</ActionButton>
// //                 </PersonRow>;
// //               })}</div>
// //             )}
// //           </div>
// //           <div>
// //             <h3 className="mb-3 text-sm font-semibold text-gray-200">Sent requests</h3>
// //             {outgoing.length === 0 ? <p className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-center text-sm text-gray-500">You have no outgoing requests.</p> : (
// //               <div className="space-y-2">{outgoing.map((request, index) => {
// //                 const person = getPerson(request, "outgoing");
// //                 const requestId = getId(request);
// //                 return <PersonRow key={requestId || getId(person) || index} person={person} subtitle="Request pending">
// //                   <ActionButton variant="neutral" disabled={busyId === requestId || !requestId} onClick={() => cancelRequest(request)}><X size={14} />Cancel</ActionButton>
// //                 </PersonRow>;
// //               })}</div>
// //             )}
// //           </div>
// //         </div>
// //       )}

// //       {activeTab === "connections" && (
// //         <div className="space-y-4">
// //           {connections.length === 0 ? <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">No connections yet. Use Discover to find people.</p> : connections.map((connection, index) => {
// //             const person = getPerson(connection, "connection");
// //             const id = getId(person);
// //             return (
// //               <div key={getId(connection) || id || index} className="space-y-2">
// //                 <PersonRow person={person} subtitle={person?.email || "Your connection"}>
// //                   <ActionButton variant="neutral" disabled={busyId === id || !id} onClick={() => removeConnection(person)}><Trash2 size={14} />Remove</ActionButton>
// //                   <ActionButton variant="danger" disabled={busyId === id || !id} onClick={() => blockUser(person)}><Ban size={14} />Block</ActionButton>
// //                 </PersonRow>
// //                 <DistanceConnector person={person} myCity={myCity} authUser={authUser} />
// //               </div>
// //             );
// //           })}
// //         </div>
// //       )}

// //       {activeTab === "blocked" && (
// //         <div className="space-y-2">
// //           {blockedUsers.length === 0 ? <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">You have no blocked users.</p> : blockedUsers.map((entry, index) => {
// //             const person = getPerson(entry, "connection");
// //             const id = getId(person);
// //             return <PersonRow key={getId(entry) || id || index} person={person} subtitle="Blocked user">
// //               <ActionButton variant="neutral" disabled={busyId === id || !id} onClick={() => unblockUser(person)}>Unblock</ActionButton>
// //             </PersonRow>;
// //           })}
// //         </div>
// //       )}

// //       <p className="border-t border-white/[0.07] pt-4 text-xs leading-5 text-gray-500">
// //         Only accepted connections should be able to message or call each other.
// //         Distances are approximate city-centre estimates, not live locations.
// //       </p>
// //     </section>
// //   );
// // }



// import React, { useCallback, useEffect, useState } from "react";
// import {
//   Search,
//   UserPlus,
//   Users,
//   UserCheck,
//   Clock3,
//   Check,
//   X,
//   Ban,
//   Trash2,
//   RefreshCw,
//   LoaderCircle,
//   MapPin,
//   Sparkles,
//   LocateFixed,
// } from "lucide-react";

// import axiosInstance from "../utils/axiosinstance";
// import { useAuthStore } from "../utils/useAuthStore";

// /* -------------------- HELPERS -------------------- */

// const getError = (error) =>
//   error?.response?.data?.message ||
//   error?.message ||
//   "Something went wrong. Please try again.";

// const getId = (value) => {
//   if (!value) return "";

//   if (typeof value === "string" || typeof value === "number") {
//     return String(value);
//   }

//   if (typeof value !== "object") return "";

//   const id =
//     value._id ??
//     value.id ??
//     value.userId ??
//     value.recipientId ??
//     value.requesterId ??
//     value.senderId ??
//     value.receiverId ??
//     value.user?._id ??
//     value.user?.id;

//   return id != null && typeof id === "object"
//     ? getId(id)
//     : id != null
//       ? String(id)
//       : "";
// };

// const getPerson = (connection, type) => {
//   if (!connection) return null;

//   if (type === "incoming") {
//     return connection.requester || connection.sender || connection.user || connection;
//   }

//   if (type === "outgoing") {
//     return connection.recipient || connection.receiver || connection.user || connection;
//   }

//   return connection.user || connection;
// };

// const relationshipStatus = (user) =>
//   user?.relationship?.status || user?.status || "none";

// /* -------------------- CITY DATABASE -------------------- */
// /* Approximate city-centre coordinates. */

// const CITY_COORDINATES = {
//   // Maharashtra
//   "mumbai": [19.076, 72.8777],
//   "navi mumbai": [19.033, 73.0297],
//   "new mumbai": [19.033, 73.0297],
//   "thane": [19.2183, 72.9781],
//   "kalyan": [19.2437, 73.1355],
//   "dombivli": [19.2183, 73.0867],
//   "panvel": [18.9894, 73.1175],
//   "vasai": [19.3919, 72.8397],
//   "virar": [19.4559, 72.8114],
//   "palghar": [19.6967, 72.7655],
//   "badlapur": [19.1551, 73.2655],
//   "ambernath": [19.2014, 73.1868],
//   "ulhasnagar": [19.2215, 73.1645],
//   "bhiwandi": [19.2813, 73.0483],
//   "pune": [18.5204, 73.8567],
//   "pimpri chinchwad": [18.6298, 73.7997],
//   "nashik": [19.9975, 73.7898],
//   "nagpur": [21.1458, 79.0882],
//   "chandrapur": [19.9615, 79.2961],
//   "amravati": [20.9374, 77.7796],
//   "akola": [20.7002, 77.0082],
//   "solapur": [17.6599, 75.9064],
//   "kolhapur": [16.705, 74.2433],
//   "sangli": [16.8524, 74.5815],
//   "satara": [17.6805, 74.0183],
//   "latur": [18.4088, 76.5604],
//   "nanded": [19.1383, 77.321],
//   "jalgaon": [21.0077, 75.5626],
//   "dhule": [20.9042, 74.7749],
//   "ahilyanagar": [19.0948, 74.748],
//   "ahmednagar": [19.0948, 74.748],
//   "baramati": [18.1517, 74.5777],
//   "ratnagiri": [16.9902, 73.312],
//   "sindhudurg": [16.0, 73.5],
//   "wardha": [20.7453, 78.6022],
//   "yavatmal": [20.3888, 78.1204],
//   "gondia": [21.4624, 80.2209],
//   "bhandara": [21.1669, 79.6528],
//   "beed": [18.9891, 75.7601],
//   "parbhani": [19.2608, 76.7748],
//   "hingoli": [19.7191, 77.1499],
//   "osmanabad": [18.186, 76.0419],
//   "dharashiv": [18.186, 76.0419],
//   "chhatrapati sambhajinagar": [19.8762, 75.3433],
//   "aurangabad": [19.8762, 75.3433],
//   "malegaon": [20.5579, 74.5089],
//   "ichalkaranji": [16.6912, 74.4605],

//   // Madhya Pradesh
//   "bhopal": [23.2599, 77.4126],
//   "indore": [22.7196, 75.8577],
//   "jabalpur": [23.1815, 79.9864],
//   "gwalior": [26.2183, 78.1828],
//   "ujjain": [23.1765, 75.7885],
//   "sagar": [23.8388, 78.7378],
//   "rewa": [24.5362, 81.3037],
//   "satna": [24.6005, 80.8322],
//   "ratlam": [23.3315, 75.0367],
//   "dewas": [22.9676, 76.0534],

//   // Gujarat
//   "ahmedabad": [23.0225, 72.5714],
//   "surat": [21.1702, 72.8311],
//   "vadodara": [22.3072, 73.1812],
//   "rajkot": [22.3039, 70.8022],
//   "gandhinagar": [23.2156, 72.6369],
//   "jamnagar": [22.4707, 70.0577],
//   "bhavnagar": [21.7645, 72.1519],
//   "junagadh": [21.5222, 70.4579],
//   "anand": [22.5645, 72.9289],
//   "morbi": [22.8119, 70.837],
//   "bharuch": [21.7051, 72.9959],
//   "valsad": [20.5992, 72.9342],

//   // Rajasthan
//   "jaipur": [26.9124, 75.7873],
//   "jodhpur": [26.2389, 73.0243],
//   "udaipur": [24.5854, 73.7125],
//   "kota": [25.2138, 75.8648],
//   "ajmer": [26.4499, 74.6399],
//   "bikaner": [28.0229, 73.3119],
//   "alwar": [27.553, 76.6346],
//   "bharatpur": [27.2152, 77.503],

//   // Delhi and North India
//   "delhi": [28.6139, 77.209],
//   "new delhi": [28.6139, 77.209],
//   "gurugram": [28.4595, 77.0266],
//   "gurgaon": [28.4595, 77.0266],
//   "faridabad": [28.4089, 77.3178],
//   "noida": [28.5355, 77.391],
//   "greater noida": [28.4744, 77.504],
//   "ghaziabad": [28.6692, 77.4538],
//   "meerut": [28.9845, 77.7064],
//   "agra": [27.1767, 78.0081],
//   "mathura": [27.4924, 77.6737],
//   "lucknow": [26.8467, 80.9462],
//   "kanpur": [26.4499, 80.3319],
//   "varanasi": [25.3176, 82.9739],
//   "prayagraj": [25.4358, 81.8463],
//   "allahabad": [25.4358, 81.8463],
//   "gorakhpur": [26.7606, 83.3732],
//   "bareilly": [28.367, 79.4304],
//   "moradabad": [28.8386, 78.7733],
//   "aligarh": [27.8974, 78.088],
//   "jhansi": [25.4484, 78.5685],
//   "dehradun": [30.3165, 78.0322],
//   "haridwar": [29.9457, 78.1642],
//   "rishikesh": [30.0869, 78.2676],
//   "chandigarh": [30.7333, 76.7794],
//   "ludhiana": [30.901, 75.8573],
//   "amritsar": [31.634, 74.8723],
//   "jalandhar": [31.326, 75.5762],
//   "patiala": [30.3398, 76.3869],
//   "shimla": [31.1048, 77.1734],
//   "manali": [32.2396, 77.1887],
//   "srinagar": [34.0837, 74.7973],
//   "jammu": [32.7266, 74.857],
//   "leh": [34.1526, 77.5771],

//   // Karnataka
//   "bengaluru": [12.9716, 77.5946],
//   "bangalore": [12.9716, 77.5946],
//   "banglore": [12.9716, 77.5946],
//   "mysore": [12.2958, 76.6394],
//   "mysuru": [12.2958, 76.6394],
//   "mangalore": [12.9141, 74.856],
//   "mangaluru": [12.9141, 74.856],
//   "hubli": [15.3647, 75.124],
//   "hubballi": [15.3647, 75.124],
//   "dharwad": [15.4589, 75.0078],
//   "belgaum": [15.8497, 74.4977],
//   "belagavi": [15.8497, 74.4977],
//   "shimoga": [13.9299, 75.5681],
//   "shivamogga": [13.9299, 75.5681],
//   "ballari": [15.1394, 76.9214],
//   "bellary": [15.1394, 76.9214],
//   "udupi": [13.3409, 74.7421],

//   // Telangana and Andhra Pradesh
//   "hyderabad": [17.385, 78.4867],
//   "warangal": [17.9689, 79.5941],
//   "karimnagar": [18.4386, 79.1288],
//   "nizamabad": [18.6725, 78.0941],
//   "khammam": [17.2473, 80.1514],
//   "visakhapatnam": [17.6868, 83.2185],
//   "vizag": [17.6868, 83.2185],
//   "vijayawada": [16.5062, 80.648],
//   "guntur": [16.3067, 80.4365],
//   "tirupati": [13.6288, 79.4192],
//   "nellore": [14.4426, 79.9865],
//   "kurnool": [15.8281, 78.0373],
//   "rajahmundry": [17.0005, 81.804],
//   "kakinada": [16.9891, 82.2475],
//   "anantapur": [14.6819, 77.6006],

//   // Tamil Nadu
//   "chennai": [13.0827, 80.2707],
//   "coimbatore": [11.0168, 76.9558],
//   "madurai": [9.9252, 78.1198],
//   "tiruchirappalli": [10.7905, 78.7047],
//   "trichy": [10.7905, 78.7047],
//   "salem": [11.6643, 78.146],
//   "tirunelveli": [8.7139, 77.7567],
//   "vellore": [12.9165, 79.1325],
//   "erode": [11.341, 77.7172],
//   "thoothukudi": [8.7642, 78.1348],
//   "tuticorin": [8.7642, 78.1348],
//   "thanjavur": [10.787, 79.1378],
//   "dindigul": [10.3673, 77.9803],
//   "kanchipuram": [12.8185, 79.6947],

//   // Kerala
//   "kochi": [9.9312, 76.2673],
//   "cochin": [9.9312, 76.2673],
//   "ernakulam": [9.9816, 76.2999],
//   "thiruvananthapuram": [8.5241, 76.9366],
//   "trivandrum": [8.5241, 76.9366],
//   "kozhikode": [11.2588, 75.7804],
//   "calicut": [11.2588, 75.7804],
//   "thrissur": [10.5276, 76.2144],
//   "kollam": [8.8932, 76.6141],
//   "alappuzha": [9.4981, 76.3388],
//   "palakkad": [10.7867, 76.6548],
//   "kannur": [11.8745, 75.3704],
//   "kottayam": [9.5916, 76.5222],

//   // West Bengal and eastern India
//   "kolkata": [22.5726, 88.3639],
//   "howrah": [22.5958, 88.2636],
//   "durgapur": [23.5204, 87.3119],
//   "siliguri": [26.7271, 88.3953],
//   "asansol": [23.6889, 86.9661],
//   "patna": [25.5941, 85.1376],
//   "gaya": [24.7914, 85.0002],
//   "muzaffarpur": [26.1209, 85.3647],
//   "ranchi": [23.3441, 85.3096],
//   "jamshedpur": [22.8046, 86.2029],
//   "dhanbad": [23.7957, 86.4304],
//   "bhubaneswar": [20.2961, 85.8245],
//   "cuttack": [20.4625, 85.883],
//   "rourkela": [22.2604, 84.8536],
//   "guwahati": [26.1445, 91.7362],
//   "silchar": [24.8333, 92.7789],
//   "imphal": [24.817, 93.9368],
//   "shillong": [25.5788, 91.8933],
//   "aizawl": [23.7271, 92.7176],
//   "kohima": [25.6751, 94.1086],
//   "agartala": [23.8315, 91.2868],
//   "itanagar": [27.0844, 93.6053],

//   // Uttar Pradesh and Uttarakhand additions
//   "ayodhya": [26.7922, 82.1998],
//   "firozabad": [27.1592, 78.3957],
//   "saharanpur": [29.968, 77.5552],
//   "rampur": [28.8154, 79.025],
//   "muzaffarnagar": [29.4727, 77.7085],
//   "haldwani": [29.2183, 79.513],
//   "nainital": [29.3803, 79.4636],

//   // Haryana and Punjab additions
//   "panipat": [29.3909, 76.9635],
//   "ambala": [30.3782, 76.7767],
//   "hisar": [29.1492, 75.7217],
//   "rohtak": [28.8955, 76.6066],
//   "karnal": [29.6857, 76.9905],
//   "bathinda": [30.211, 74.9455],
//   "pathankot": [32.2643, 75.6421],

//   // Odisha, Assam and Northeast additions
//   "puri": [19.8135, 85.8312],
//   "sambalpur": [21.4669, 83.9812],
//   "jorhat": [26.7465, 94.2026],
//   "dibrugarh": [27.4728, 94.912],
//   "tinsukia": [27.4922, 95.3468],

//   // Goa
//   "goa": [15.2993, 74.124],
//   "panaji": [15.4909, 73.8278],
//   "margao": [15.2832, 73.9862],
//   "vasco da gama": [15.386, 73.844],
// };

// /* Normalize different spellings and common aliases. */
// function normalizeCity(value) {
//   let city = String(value || "")
//     .trim()
//     .toLowerCase()
//     .replace(/\s+/g, " ");

//   const aliases = {
//     "new mumbai": "navi mumbai",
//     "banglore": "bangalore",
//     "bengaluru": "bangalore",
//     "mysuru": "mysore",
//     "mangaluru": "mangalore",
//     "hubballi": "hubli",
//     "belagavi": "belgaum",
//     "shivamogga": "shimoga",
//     "new delhi": "delhi",
//     "gurgaon": "gurugram",
//     "allahabad": "prayagraj",
//     "cochin": "kochi",
//     "trivandrum": "thiruvananthapuram",
//     "calicut": "kozhikode",
//     "trichy": "tiruchirappalli",
//     "vizag": "visakhapatnam",
//     "tuticorin": "thoothukudi",
//     "aurangabad": "chhatrapati sambhajinagar",
//   };

//   return aliases[city] || city;
// }

// /* Calculate approximate straight-line city-centre distance. */
// function getCityDistanceKm(cityA, cityB) {
//   const a = CITY_COORDINATES[normalizeCity(cityA)];
//   const b = CITY_COORDINATES[normalizeCity(cityB)];

//   if (!a || !b) return null;

//   const toRadians = (degrees) => (degrees * Math.PI) / 180;
//   const [lat1, lon1] = a;
//   const [lat2, lon2] = b;

//   const dLat = toRadians(lat2 - lat1);
//   const dLon = toRadians(lon2 - lon1);

//   const haversine =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(toRadians(lat1)) *
//       Math.cos(toRadians(lat2)) *
//       Math.sin(dLon / 2) ** 2;

//   return Math.round(
//     6371 *
//       2 *
//       Math.atan2(
//         Math.sqrt(haversine),
//         Math.sqrt(1 - haversine)
//       )
//   );
// }

// /* -------------------- UI COMPONENTS -------------------- */

// function PersonAvatar({ person, size = "h-11 w-11" }) {
//   const label = person?.fullName || person?.email || "User";

//   return (
//     <div
//       className={`flex ${size} shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-violet-600 to-pink-500 text-sm font-bold text-white`}
//     >
//       {person?.profilePic ? (
//         <img
//           src={person.profilePic}
//           alt={label}
//           className="h-full w-full object-cover"
//         />
//       ) : (
//         label.trim().charAt(0).toUpperCase()
//       )}
//     </div>
//   );
// }

// function ActionButton({
//   children,
//   onClick,
//   disabled,
//   variant = "primary",
// }) {
//   const styles = {
//     primary: "bg-violet-600 text-white hover:bg-violet-500",
//     success:
//       "border border-emerald-400/20 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20",
//     neutral:
//       "border border-white/10 bg-white/[0.05] text-gray-200 hover:bg-white/10",
//     danger:
//       "border border-rose-400/20 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20",
//   };

//   return (
//     <button
//       type="button"
//       disabled={disabled}
//       onClick={onClick}
//       className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]}`}
//     >
//       {children}
//     </button>
//   );
// }

// function PersonRow({ person, subtitle, children }) {
//   if (!person) return null;

//   return (
//     <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3 transition hover:border-violet-400/20 hover:bg-white/[0.045]">
//       <PersonAvatar person={person} />

//       <div className="min-w-0 flex-1">
//         <p className="truncate text-sm font-semibold text-white">
//           {person.fullName || "MilesCloser user"}
//         </p>
//         <p className="truncate text-xs text-gray-400">
//           {subtitle || person.email || "Member"}
//         </p>
//       </div>

//       <div className="flex shrink-0 flex-wrap justify-end gap-2">
//         {children}
//       </div>
//     </div>
//   );
// }

// function DistanceConnector({ person, myCity, authUser }) {
//   const theirCity = person?.city || "";
//   const distance = getCityDistanceKm(myCity, theirCity);

//   const myInitial = (
//     authUser?.fullName ||
//     authUser?.email ||
//     "Y"
//   ).trim().charAt(0).toUpperCase();

//   const theirInitial = (
//     person?.fullName ||
//     person?.email ||
//     "F"
//   ).trim().charAt(0).toUpperCase();

//   return (
//     <div className="relative mx-1 overflow-hidden rounded-2xl border border-violet-400/20 bg-gradient-to-r from-[#171329] via-[#24152c] to-[#171329] px-3 py-5 sm:px-5">
//       <div className="pointer-events-none absolute -left-10 top-0 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl" />
//       <div className="pointer-events-none absolute -right-10 bottom-0 h-24 w-24 rounded-full bg-pink-500/10 blur-2xl" />

//       <div className="relative flex items-center justify-between gap-2 sm:gap-4">
//         <div className="relative z-10 flex w-14 shrink-0 flex-col items-center gap-2 sm:w-16">
//           <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-violet-300 bg-violet-600 shadow-lg shadow-violet-500/20 sm:h-14 sm:w-14">
//             {authUser?.profilePic ? (
//               <img
//                 src={authUser.profilePic}
//                 alt="Your profile"
//                 className="h-full w-full object-cover"
//               />
//             ) : (
//               <div className="flex h-full w-full items-center justify-center text-lg font-bold text-white">
//                 {myInitial}
//               </div>
//             )}
//           </div>
//           <span className="max-w-full truncate text-[10px] font-semibold text-violet-200">
//             You
//           </span>
//         </div>

//         <div className="relative h-16 min-w-0 flex-1">
//           <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-white/10">
//             <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-violet-400 via-pink-400 to-fuchsia-300" />
//           </div>

//           <span className="absolute left-[20%] top-0 z-10 animate-bounce text-lg">
//             🐻
//           </span>

//           <span className="absolute right-[18%] bottom-0 z-10 animate-pulse text-lg">
//             ✨
//           </span>

//           <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-pink-300/30 bg-[#24152c] px-3 py-1.5 text-[11px] font-bold text-pink-100 shadow-lg shadow-pink-500/10 sm:px-4 sm:text-xs">
//             {distance !== null ? `${distance.toLocaleString()} km` : "♡ connected ♡"}
//           </div>
//         </div>

//         <div className="relative z-10 flex w-14 shrink-0 flex-col items-center gap-2 sm:w-16">
//           <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-pink-300 bg-pink-600 shadow-lg shadow-pink-500/20 sm:h-14 sm:w-14">
//             {person?.profilePic ? (
//               <img
//                 src={person.profilePic}
//                 alt={person?.fullName || "Your connection"}
//                 className="h-full w-full object-cover"
//               />
//             ) : (
//               <div className="flex h-full w-full items-center justify-center text-lg font-bold text-white">
//                 {theirInitial}
//               </div>
//             )}
//           </div>
//           <span className="max-w-full truncate text-[10px] font-semibold text-pink-200">
//             {(person?.fullName || "Friend").split(" ")[0]}
//           </span>
//         </div>
//       </div>

//       <div className="relative mt-3 flex items-center justify-center gap-1.5 text-center">
//         <Sparkles size={13} className="shrink-0 text-fuchsia-300" />
//         <p className="text-[11px] leading-5 text-gray-300">
//           {distance === null
//             ? !normalizeCity(myCity) || !normalizeCity(theirCity)
//               ? "Add both cities to discover your distance"
//               : "City not supported yet · Still connected 💜"
//             : distance === 0
//               ? "Same city, closer vibes ✨"
//               : "Different cities, one connection 💜"}
//         </p>
//       </div>

//       {distance === null &&
//         normalizeCity(myCity) &&
//         normalizeCity(theirCity) && (
//           <p className="mt-1 text-center text-[10px] text-gray-500">
//             This city isn't in the current distance database yet.
//           </p>
//         )}
//     </div>
//   );
// }

// /* -------------------- MAIN CONNECTION PANEL -------------------- */

// export default function ConnectionPanel() {
//   const socket = useAuthStore((state) => state.socket);
//   const authUser = useAuthStore((state) => state.authUser);

//   const [query, setQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [connections, setConnections] = useState([]);
//   const [incoming, setIncoming] = useState([]);
//   const [outgoing, setOutgoing] = useState([]);
//   const [blockedUsers, setBlockedUsers] = useState([]);

//   const [activeTab, setActiveTab] = useState("search");
//   const [loading, setLoading] = useState(false);
//   const [searching, setSearching] = useState(false);
//   const [busyId, setBusyId] = useState("");
//   const [error, setError] = useState("");

//   const [city, setCity] = useState(authUser?.city || "");
//   const [citySaving, setCitySaving] = useState(false);
//   const [detectingCity, setDetectingCity] = useState(false);
//   const [cityMessage, setCityMessage] = useState("");

//   useEffect(() => {
//     setCity(authUser?.city || "");
//   }, [authUser?.city]);

//   /* Fetch connections and requests. */
//   const loadConnections = useCallback(async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const [connectionResponse, requestResponse] = await Promise.all([
//         axiosInstance.get("/api/connections/"),
//         axiosInstance.get("/api/connections/requests"),
//       ]);

//       const connectionData = connectionResponse.data;
//       const requestData = requestResponse.data;

//       setConnections(
//         Array.isArray(connectionData)
//           ? connectionData
//           : connectionData?.connections || []
//       );

//       setIncoming(
//         Array.isArray(requestData?.incoming)
//           ? requestData.incoming
//           : Array.isArray(requestData?.incomingRequests)
//             ? requestData.incomingRequests
//             : []
//       );

//       setOutgoing(
//         Array.isArray(requestData?.outgoing)
//           ? requestData.outgoing
//           : Array.isArray(requestData?.outgoingRequests)
//             ? requestData.outgoingRequests
//             : []
//       );

//       setBlockedUsers(
//         Array.isArray(requestData?.blocked)
//           ? requestData.blocked
//           : []
//       );
//     } catch (err) {
//       setError(getError(err));
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadConnections();
//   }, [loadConnections]);

//   /* Refresh after connection socket events. */
//   useEffect(() => {
//     if (!socket) return;

//     const events = [
//       "connection:request",
//       "connection:accepted",
//       "connection:rejected",
//       "connection:cancelled",
//       "connection:removed",
//       "connection:blocked",
//       "connection:unblocked",
//     ];

//     events.forEach((event) => socket.on(event, loadConnections));

//     return () => {
//       events.forEach((event) => socket.off(event, loadConnections));
//     };
//   }, [socket, loadConnections]);

//   /* Search users. */
//   useEffect(() => {
//     const trimmedQuery = query.trim();

//     if (trimmedQuery.length < 2) {
//       setSearchResults([]);
//       setSearching(false);
//       return;
//     }

//     let cancelled = false;

//     const timeoutId = setTimeout(async () => {
//       setSearching(true);

//       try {
//         const response = await axiosInstance.get(
//           `/api/connections/search?q=${encodeURIComponent(trimmedQuery)}`
//         );

//         if (!cancelled) {
//           setSearchResults(
//             Array.isArray(response.data)
//               ? response.data
//               : response.data?.users || []
//           );
//           setError("");
//         }
//       } catch (err) {
//         if (!cancelled) {
//           setSearchResults([]);
//           setError(getError(err));
//         }
//       } finally {
//         if (!cancelled) setSearching(false);
//       }
//     }, 350);

//     return () => {
//       cancelled = true;
//       clearTimeout(timeoutId);
//     };
//   }, [query]);

//   /* Perform connection actions. */
//   const performAction = async (personId, action, config = {}) => {
//     if (!personId) {
//       setError("Unable to identify this user.");
//       return;
//     }

//     setBusyId(personId);
//     setError("");

//     try {
//       await action();
//       await loadConnections();

//       if (config.clearSearch) {
//         setSearchResults((previous) =>
//           previous.map((person) =>
//             getId(person) === personId
//               ? {
//                   ...person,
//                   relationship: {
//                     ...person.relationship,
//                     status: config.newStatus || "pending",
//                   },
//                 }
//               : person
//           )
//         );
//       }
//     } catch (err) {
//       setError(getError(err));
//     } finally {
//       setBusyId("");
//     }
//   };

//   const acceptRequest = (request) => {
//     const requestId = getId(request);
//     return performAction(requestId, () =>
//       axiosInstance.patch(`/api/connections/${requestId}/accept`)
//     );
//   };

//   const rejectRequest = (request) => {
//     const requestId = getId(request);
//     return performAction(requestId, () =>
//       axiosInstance.patch(`/api/connections/${requestId}/reject`)
//     );
//   };

//   const cancelRequest = (request) => {
//     const requestId = getId(request);
//     return performAction(requestId, () =>
//       axiosInstance.delete(`/api/connections/${requestId}/cancel`)
//     );
//   };

//   const sendRequest = (person) => {
//     const personId = getId(person);
//     const currentUserId = getId(authUser);

//     if (!personId) {
//       setError("Unable to identify this user. Please refresh and try again.");
//       return;
//     }

//     if (personId === currentUserId) {
//       setError("You cannot send a connection request to yourself.");
//       return;
//     }

//     return performAction(
//       personId,
//       () =>
//         axiosInstance.post("/api/connections/request", {
//           userId: personId,
//         }),
//       { clearSearch: true, newStatus: "pending" }
//     );
//   };

//   const removeConnection = (person) => {
//     const personId = getId(person);

//     if (!personId) {
//       setError("Unable to identify this connection.");
//       return;
//     }

//     if (!window.confirm(`Remove ${person?.fullName || "this connection"}?`)) {
//       return;
//     }

//     return performAction(personId, () =>
//       axiosInstance.delete(`/api/connections/${personId}`)
//     );
//   };

//   const blockUser = (person) => {
//     const personId = getId(person);

//     if (!personId) {
//       setError("Unable to identify this user.");
//       return;
//     }

//     if (!window.confirm(`Block ${person?.fullName || "this user"}?`)) {
//       return;
//     }

//     return performAction(personId, () =>
//       axiosInstance.post(`/api/connections/${personId}/block`)
//     );
//   };

//   const unblockUser = (person) => {
//     const personId = getId(person);

//     if (!personId) {
//       setError("Unable to identify this user.");
//       return;
//     }

//     return performAction(personId, () =>
//       axiosInstance.delete(`/api/connections/${personId}/block`)
//     );
//   };

//   /* Save a manually entered city. */
//   const saveCity = async (event) => {
//     event.preventDefault();
//     setCitySaving(true);
//     setCityMessage("");
//     setError("");

//     try {
//       const normalizedCity = city.trim();

//       const response = await axiosInstance.patch(
//         "/api/connections/city",
//         { city: normalizedCity }
//       );

//       setCity(normalizedCity);
//       setCityMessage(
//         response.data?.message || "Your city has been updated!"
//       );

//       // Update the client auth state if the store exposes an updater.
//       const updateAuthUser = useAuthStore.getState?.().setAuthUser;
//       if (typeof updateAuthUser === "function") {
//         updateAuthUser({
//           ...authUser,
//           city: normalizedCity,
//         });
//       }

//       await loadConnections();
//     } catch (err) {
//       setError(getError(err));
//     } finally {
//       setCitySaving(false);
//     }
//   };

//   /* -------------------- AUTOMATIC CITY DETECTION -------------------- */

//   const detectMyCity = async () => {
//     if (!navigator.geolocation) {
//       setError(
//         "Your browser doesn't support location detection. Please enter your city manually."
//       );
//       return;
//     }

//     setDetectingCity(true);
//     setCityMessage("");
//     setError("");

//     try {
//       // Request coordinates only after the user clicks the button.
//       const position = await new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(resolve, reject, {
//           enableHighAccuracy: false,
//           timeout: 15000,
//           maximumAge: 300000,
//         });
//       });

//       const { latitude, longitude } = position.coords;

//       // OpenStreetMap Nominatim reverse geocoding.
//       const url = new URL(
//         "https://nominatim.openstreetmap.org/reverse"
//       );

//       url.searchParams.set("format", "jsonv2");
//       url.searchParams.set("lat", latitude);
//       url.searchParams.set("lon", longitude);
//       url.searchParams.set("zoom", "10");
//       url.searchParams.set("addressdetails", "1");

//       const response = await fetch(url.toString(), {
//         headers: {
//           Accept: "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error(
//           "The city lookup service is temporarily unavailable. Please enter your city manually."
//         );
//       }

//       const data = await response.json();
//       const address = data.address || {};

//       // Prefer a city or town, then use broader locality fields.
//       const detectedCity =
//         address.city ||
//         address.town ||
//         address.village ||
//         address.municipality ||
//         address.city_district ||
//         address.county ||
//         address.state_district;

//       if (!detectedCity) {
//         throw new Error(
//           "We couldn't identify your city from this location. Please enter it manually."
//         );
//       }

//       // Send only the city name to your existing backend.
//       // Latitude and longitude are not saved in your database.
//       const saveResponse = await axiosInstance.patch(
//         "/api/connections/city",
//         { city: detectedCity }
//       );

//       setCity(detectedCity);
//       setCityMessage(
//         saveResponse.data?.message ||
//           `City detected and saved: ${detectedCity}`
//       );

//       const updateAuthUser = useAuthStore.getState?.().setAuthUser;
//       if (typeof updateAuthUser === "function") {
//         updateAuthUser({
//           ...authUser,
//           city: detectedCity,
//         });
//       }

//       await loadConnections();
//     } catch (err) {
//       if (err?.code === 1) {
//         setError(
//           "Location permission was denied. Allow location access in your browser, or enter your city manually."
//         );
//       } else if (err?.code === 2) {
//         setError(
//           "Your location is unavailable. Check your device location settings or enter your city manually."
//         );
//       } else if (err?.code === 3) {
//         setError(
//           "Location detection timed out. Try again or enter your city manually."
//         );
//       } else {
//         setError(getError(err));
//       }
//     } finally {
//       setDetectingCity(false);
//     }
//   };

//   const tabs = [
//     { id: "search", label: "Discover", icon: Search },
//     {
//       id: "requests",
//       label: "Requests",
//       icon: Clock3,
//       count: incoming.length,
//     },
//     {
//       id: "connections",
//       label: "Connections",
//       icon: Users,
//       count: connections.length,
//     },
//     {
//       id: "blocked",
//       label: "Blocked",
//       icon: Ban,
//       count: blockedUsers.length,
//     },
//   ];

//   const currentUserId = getId(authUser);

//   /* -------------------- RENDER -------------------- */

//   return (
//     <section className="w-full space-y-5 rounded-3xl border border-white/[0.08] bg-[#0b0b12] p-4 text-white shadow-2xl shadow-black/20 sm:p-6">
//       {/* Header */}
//       <div className="flex items-start justify-between gap-3">
//         <div>
//           <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">
//             Your circle
//           </p>
//           <h2 className="mt-1 text-2xl font-bold tracking-tight">
//             Connections
//           </h2>
//           <p className="mt-1 text-sm text-gray-400">
//             Find people and choose who you connect with.
//           </p>
//         </div>

//         <button
//           type="button"
//           onClick={loadConnections}
//           disabled={loading}
//           title="Refresh connections"
//           className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-gray-300 transition hover:bg-white/10 disabled:opacity-50"
//         >
//           <RefreshCw
//             size={17}
//             className={loading ? "animate-spin" : ""}
//           />
//         </button>
//       </div>

//       {/* City settings */}
//       <form
//         onSubmit={saveCity}
//         className="rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-500/[0.08] to-pink-500/[0.04] p-4"
//       >
//         <div className="mb-3 flex items-start gap-3">
//           <div className="rounded-xl bg-violet-500/15 p-2 text-violet-200">
//             <MapPin size={18} />
//           </div>

//           <div className="min-w-0 flex-1">
//             <p className="text-sm font-semibold text-white">Your city</p>
//             <p className="mt-1 text-xs leading-5 text-gray-400">
//               Detect your city automatically or enter it manually.
//               Only your city name is saved, not your GPS coordinates.
//             </p>
//           </div>
//         </div>

//         <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
//           <input
//             value={city}
//             onChange={(event) => {
//               setCity(event.target.value);
//               setCityMessage("");
//             }}
//             maxLength={80}
//             placeholder="Enter your city (e.g. Mumbai)"
//             className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-violet-400/50"
//           />

//           <button
//             type="button"
//             onClick={detectMyCity}
//             disabled={detectingCity || citySaving}
//             className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-400/30 bg-violet-500/10 px-4 py-2.5 text-sm font-semibold text-violet-200 transition hover:bg-violet-500/20 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             {detectingCity ? (
//               <LoaderCircle size={15} className="animate-spin" />
//             ) : (
//               <LocateFixed size={15} />
//             )}
//             {detectingCity ? "Detecting..." : "Detect my city"}
//           </button>

//           <button
//             type="submit"
//             disabled={citySaving || detectingCity}
//             className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             {citySaving && (
//               <LoaderCircle size={15} className="animate-spin" />
//             )}
//             {citySaving ? "Saving..." : "Save city"}
//           </button>
//         </div>

//         {cityMessage && (
//           <p className="mt-2 text-xs text-emerald-300">{cityMessage}</p>
//         )}
//       </form>

//       {/* Tabs */}
//       <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
//         {tabs.map(({ id, label, icon: Icon, count }) => (
//           <button
//             key={id}
//             type="button"
//             onClick={() => setActiveTab(id)}
//             className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition ${
//               activeTab === id
//                 ? "border-violet-400/30 bg-violet-500/15 text-violet-200"
//                 : "border-white/[0.07] bg-white/[0.025] text-gray-400 hover:bg-white/[0.06] hover:text-white"
//             }`}
//           >
//             <Icon size={16} />
//             <span>{label}</span>
//             {count > 0 && (
//               <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px]">
//                 {count}
//               </span>
//             )}
//           </button>
//         ))}
//       </div>

//       {/* Errors */}
//       {error && (
//         <div
//           role="alert"
//           className="rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
//         >
//           {error}
//         </div>
//       )}

//       {/* DISCOVER */}
//       {activeTab === "search" && (
//         <div className="space-y-4">
//           <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#12121b] px-4 py-3 transition focus-within:border-violet-400/50 focus-within:ring-2 focus-within:ring-violet-500/10">
//             <Search size={19} className="shrink-0 text-violet-300" />

//             <input
//               value={query}
//               onChange={(event) => setQuery(event.target.value)}
//               placeholder="Search by name or email..."
//               className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
//             />

//             {searching && (
//               <LoaderCircle
//                 size={17}
//                 className="animate-spin text-violet-300"
//               />
//             )}
//           </label>

//           {query.trim().length < 2 ? (
//             <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">
//               Enter at least 2 characters to discover people.
//             </p>
//           ) : searching ? (
//             <p className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/10 px-4 py-8 text-sm text-gray-400">
//               <LoaderCircle size={16} className="animate-spin" />
//               Searching for people...
//             </p>
//           ) : searchResults.length === 0 ? (
//             <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">
//               No users found. Try another name or email.
//             </p>
//           ) : (
//             <div className="space-y-2">
//               {searchResults.map((person, index) => {
//                 const personId = getId(person);
//                 const status = relationshipStatus(person);
//                 const isBusy = !!personId && busyId === personId;
//                 const isSelf = !!personId && personId === currentUserId;

//                 return (
//                   <PersonRow
//                     key={personId || `search-${index}`}
//                     person={person}
//                     subtitle={person.email}
//                   >
//                     {isSelf ? (
//                       <span className="text-xs text-gray-500">You</span>
//                     ) : status === "accepted" ? (
//                       <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
//                         <UserCheck size={14} />
//                         Connected
//                       </span>
//                     ) : status === "pending" ? (
//                       person.relationship?.isRequester ? (
//                         <ActionButton
//                           variant="neutral"
//                           disabled={isBusy}
//                           onClick={() =>
//                             performAction(
//                               personId,
//                               () =>
//                                 axiosInstance.delete(
//                                   `/api/connections/${personId}/cancel`
//                                 ),
//                               { clearSearch: true, newStatus: "none" }
//                             )
//                           }
//                         >
//                           <X size={14} />
//                           Cancel
//                         </ActionButton>
//                       ) : (
//                         <ActionButton
//                           variant="neutral"
//                           onClick={() => setActiveTab("requests")}
//                         >
//                           <Clock3 size={14} />
//                           Respond
//                         </ActionButton>
//                       )
//                     ) : status === "blocked" ? (
//                       <span className="text-xs text-rose-300">Blocked</span>
//                     ) : (
//                       <ActionButton
//                         disabled={isBusy || !personId}
//                         onClick={() => sendRequest(person)}
//                       >
//                         {isBusy ? (
//                           <LoaderCircle size={14} className="animate-spin" />
//                         ) : (
//                           <UserPlus size={14} />
//                         )}
//                         Connect
//                       </ActionButton>
//                     )}
//                   </PersonRow>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       )}

//       {/* REQUESTS */}
//       {activeTab === "requests" && (
//         <div className="space-y-5">
//           <div>
//             <h3 className="mb-3 text-sm font-semibold text-gray-200">
//               Incoming requests
//             </h3>

//             {incoming.length === 0 ? (
//               <p className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-center text-sm text-gray-500">
//                 No pending requests right now.
//               </p>
//             ) : (
//               <div className="space-y-2">
//                 {incoming.map((request, index) => {
//                   const person = getPerson(request, "incoming");
//                   const requestId = getId(request);

//                   return (
//                     <PersonRow
//                       key={requestId || `incoming-${index}`}
//                       person={person}
//                       subtitle="Wants to connect with you"
//                     >
//                       <ActionButton
//                         variant="success"
//                         disabled={busyId === requestId || !requestId}
//                         onClick={() => acceptRequest(request)}
//                       >
//                         <Check size={14} />
//                         Accept
//                       </ActionButton>

//                       <ActionButton
//                         variant="neutral"
//                         disabled={busyId === requestId || !requestId}
//                         onClick={() => rejectRequest(request)}
//                       >
//                         <X size={14} />
//                         Reject
//                       </ActionButton>
//                     </PersonRow>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           <div>
//             <h3 className="mb-3 text-sm font-semibold text-gray-200">
//               Sent requests
//             </h3>

//             {outgoing.length === 0 ? (
//               <p className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-center text-sm text-gray-500">
//                 You have no outgoing requests.
//               </p>
//             ) : (
//               <div className="space-y-2">
//                 {outgoing.map((request, index) => {
//                   const person = getPerson(request, "outgoing");
//                   const requestId = getId(request);

//                   return (
//                     <PersonRow
//                       key={requestId || `outgoing-${index}`}
//                       person={person}
//                       subtitle="Request pending"
//                     >
//                       <ActionButton
//                         variant="neutral"
//                         disabled={busyId === requestId || !requestId}
//                         onClick={() => cancelRequest(request)}
//                       >
//                         <X size={14} />
//                         Cancel
//                       </ActionButton>
//                     </PersonRow>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* CONNECTIONS */}
//       {activeTab === "connections" && (
//         <div className="space-y-4">
//           {connections.length === 0 ? (
//             <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">
//               No connections yet. Use Discover to find people.
//             </p>
//           ) : (
//             connections.map((connection, index) => {
//               const person = getPerson(connection, "connection");
//               const personId = getId(person);

//               return (
//                 <div
//                   key={
//                     getId(connection) ||
//                     personId ||
//                     `connection-${index}`
//                   }
//                   className="space-y-2"
//                 >
//                   <PersonRow
//                     person={person}
//                     subtitle={person?.email || "Your connection"}
//                   >
//                     <ActionButton
//                       variant="neutral"
//                       disabled={busyId === personId || !personId}
//                       onClick={() => removeConnection(person)}
//                     >
//                       <Trash2 size={14} />
//                       Remove
//                     </ActionButton>

//                     <ActionButton
//                       variant="danger"
//                       disabled={busyId === personId || !personId}
//                       onClick={() => blockUser(person)}
//                     >
//                       <Ban size={14} />
//                       Block
//                     </ActionButton>
//                   </PersonRow>

//                   <DistanceConnector
//                     person={person}
//                     myCity={city || authUser?.city || ""}
//                     authUser={{ ...authUser, city: city || authUser?.city || "" }}
//                   />
//                 </div>
//               );
//             })
//           )}
//         </div>
//       )}

//       {/* BLOCKED */}
//       {activeTab === "blocked" && (
//         <div className="space-y-2">
//           {blockedUsers.length === 0 ? (
//             <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">
//               You have no blocked users.
//             </p>
//           ) : (
//             blockedUsers.map((entry, index) => {
//               const person = getPerson(entry, "connection");
//               const personId = getId(person);

//               return (
//                 <PersonRow
//                   key={getId(entry) || personId || `blocked-${index}`}
//                   person={person}
//                   subtitle="Blocked user"
//                 >
//                   <ActionButton
//                     variant="neutral"
//                     disabled={busyId === personId || !personId}
//                     onClick={() => unblockUser(person)}
//                   >
//                     Unblock
//                   </ActionButton>
//                 </PersonRow>
//               );
//             })
//           )}
//         </div>
//       )}

//       <p className="border-t border-white/[0.07] pt-4 text-xs leading-5 text-gray-500">
//         Only accepted connections should be able to message or call each
//         other. Distances are approximate city-centre estimates, not live
//         locations. Your browser location is requested only when you click
//         Detect my city.
//       </p>
//     </section>
//   );
// }



import React, { useCallback, useEffect, useState } from "react";
import {
  Search,
  UserPlus,
  Users,
  UserCheck,
  Clock3,
  Check,
  X,
  Ban,
  Trash2,
  RefreshCw,
  LoaderCircle,
  MapPin,
  Sparkles,
  LocateFixed,
} from "lucide-react";

import axiosInstance from "../utils/axiosinstance";
import { useAuthStore } from "../utils/useAuthStore";

/* -------------------- HELPERS -------------------- */

const getError = (error) =>
  error?.response?.data?.message ||
  error?.message ||
  "Something went wrong. Please try again.";

const getId = (value) => {
  if (!value) return "";

  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (typeof value !== "object") return "";

  const id =
    value._id ??
    value.id ??
    value.userId ??
    value.recipientId ??
    value.requesterId ??
    value.senderId ??
    value.receiverId ??
    value.user?._id ??
    value.user?.id;

  return id != null && typeof id === "object"
    ? getId(id)
    : id != null
      ? String(id)
      : "";
};

const getPerson = (connection, type) => {
  if (!connection) return null;

  if (type === "incoming") {
    return connection.requester || connection.sender || connection.user || connection;
  }

  if (type === "outgoing") {
    return connection.recipient || connection.receiver || connection.user || connection;
  }

  return connection.user || connection;
};

const relationshipStatus = (user) =>
  user?.relationship?.status || user?.status || "none";

/* -------------------- CITY DATABASE -------------------- */
/* Approximate city-centre coordinates. */

const CITY_COORDINATES = {
  // Maharashtra
  "mumbai": [19.076, 72.8777],
  "navi mumbai": [19.033, 73.0297],
  "new mumbai": [19.033, 73.0297],
  "thane": [19.2183, 72.9781],
  "kalyan": [19.2437, 73.1355],
  "dombivli": [19.2183, 73.0867],
  "panvel": [18.9894, 73.1175],
  "vasai": [19.3919, 72.8397],
  "virar": [19.4559, 72.8114],
  "palghar": [19.6967, 72.7655],
  "badlapur": [19.1551, 73.2655],
  "ambernath": [19.2014, 73.1868],
  "ulhasnagar": [19.2215, 73.1645],
  "bhiwandi": [19.2813, 73.0483],
  "pune": [18.5204, 73.8567],
  "pimpri chinchwad": [18.6298, 73.7997],
  "nashik": [19.9975, 73.7898],
  "nagpur": [21.1458, 79.0882],
  "chandrapur": [19.9615, 79.2961],
  "amravati": [20.9374, 77.7796],
  "akola": [20.7002, 77.0082],
  "solapur": [17.6599, 75.9064],
  "kolhapur": [16.705, 74.2433],
  "sangli": [16.8524, 74.5815],
  "satara": [17.6805, 74.0183],
  "latur": [18.4088, 76.5604],
  "nanded": [19.1383, 77.321],
  "jalgaon": [21.0077, 75.5626],
  "dhule": [20.9042, 74.7749],
  "ahilyanagar": [19.0948, 74.748],
  "ahmednagar": [19.0948, 74.748],
  "baramati": [18.1517, 74.5777],
  "ratnagiri": [16.9902, 73.312],
  "sindhudurg": [16.0, 73.5],
  "wardha": [20.7453, 78.6022],
  "yavatmal": [20.3888, 78.1204],
  "gondia": [21.4624, 80.2209],
  "bhandara": [21.1669, 79.6528],
  "beed": [18.9891, 75.7601],
  "parbhani": [19.2608, 76.7748],
  "hingoli": [19.7191, 77.1499],
  "osmanabad": [18.186, 76.0419],
  "dharashiv": [18.186, 76.0419],
  "chhatrapati sambhajinagar": [19.8762, 75.3433],
  "aurangabad": [19.8762, 75.3433],
  "malegaon": [20.5579, 74.5089],
  "ichalkaranji": [16.6912, 74.4605],

  // Madhya Pradesh
  "bhopal": [23.2599, 77.4126],
  "indore": [22.7196, 75.8577],
  "jabalpur": [23.1815, 79.9864],
  "gwalior": [26.2183, 78.1828],
  "ujjain": [23.1765, 75.7885],
  "sagar": [23.8388, 78.7378],
  "rewa": [24.5362, 81.3037],
  "satna": [24.6005, 80.8322],
  "ratlam": [23.3315, 75.0367],
  "dewas": [22.9676, 76.0534],

  // Gujarat
  "ahmedabad": [23.0225, 72.5714],
  "surat": [21.1702, 72.8311],
  "vadodara": [22.3072, 73.1812],
  "rajkot": [22.3039, 70.8022],
  "gandhinagar": [23.2156, 72.6369],
  "jamnagar": [22.4707, 70.0577],
  "bhavnagar": [21.7645, 72.1519],
  "junagadh": [21.5222, 70.4579],
  "anand": [22.5645, 72.9289],
  "morbi": [22.8119, 70.837],
  "bharuch": [21.7051, 72.9959],
  "valsad": [20.5992, 72.9342],

  // Rajasthan
  "jaipur": [26.9124, 75.7873],
  "jodhpur": [26.2389, 73.0243],
  "udaipur": [24.5854, 73.7125],
  "kota": [25.2138, 75.8648],
  "ajmer": [26.4499, 74.6399],
  "bikaner": [28.0229, 73.3119],
  "alwar": [27.553, 76.6346],
  "bharatpur": [27.2152, 77.503],

  // Delhi and North India
  "delhi": [28.6139, 77.209],
  "new delhi": [28.6139, 77.209],
  "gurugram": [28.4595, 77.0266],
  "gurgaon": [28.4595, 77.0266],
  "faridabad": [28.4089, 77.3178],
  "noida": [28.5355, 77.391],
  "greater noida": [28.4744, 77.504],
  "ghaziabad": [28.6692, 77.4538],
  "meerut": [28.9845, 77.7064],
  "agra": [27.1767, 78.0081],
  "mathura": [27.4924, 77.6737],
  "lucknow": [26.8467, 80.9462],
  "kanpur": [26.4499, 80.3319],
  "varanasi": [25.3176, 82.9739],
  "prayagraj": [25.4358, 81.8463],
  "allahabad": [25.4358, 81.8463],
  "gorakhpur": [26.7606, 83.3732],
  "bareilly": [28.367, 79.4304],
  "moradabad": [28.8386, 78.7733],
  "aligarh": [27.8974, 78.088],
  "jhansi": [25.4484, 78.5685],
  "dehradun": [30.3165, 78.0322],
  "haridwar": [29.9457, 78.1642],
  "rishikesh": [30.0869, 78.2676],
  "chandigarh": [30.7333, 76.7794],
  "ludhiana": [30.901, 75.8573],
  "amritsar": [31.634, 74.8723],
  "jalandhar": [31.326, 75.5762],
  "patiala": [30.3398, 76.3869],
  "shimla": [31.1048, 77.1734],
  "manali": [32.2396, 77.1887],
  "srinagar": [34.0837, 74.7973],
  "jammu": [32.7266, 74.857],
  "leh": [34.1526, 77.5771],

  // Karnataka
  "bengaluru": [12.9716, 77.5946],
  "bangalore": [12.9716, 77.5946],
  "banglore": [12.9716, 77.5946],
  "mysore": [12.2958, 76.6394],
  "mysuru": [12.2958, 76.6394],
  "mangalore": [12.9141, 74.856],
  "mangaluru": [12.9141, 74.856],
  "hubli": [15.3647, 75.124],
  "hubballi": [15.3647, 75.124],
  "dharwad": [15.4589, 75.0078],
  "belgaum": [15.8497, 74.4977],
  "belagavi": [15.8497, 74.4977],
  "shimoga": [13.9299, 75.5681],
  "shivamogga": [13.9299, 75.5681],
  "ballari": [15.1394, 76.9214],
  "bellary": [15.1394, 76.9214],
  "udupi": [13.3409, 74.7421],

  // Telangana and Andhra Pradesh
  "hyderabad": [17.385, 78.4867],
  "warangal": [17.9689, 79.5941],
  "karimnagar": [18.4386, 79.1288],
  "nizamabad": [18.6725, 78.0941],
  "khammam": [17.2473, 80.1514],
  "visakhapatnam": [17.6868, 83.2185],
  "vizag": [17.6868, 83.2185],
  "vijayawada": [16.5062, 80.648],
  "guntur": [16.3067, 80.4365],
  "tirupati": [13.6288, 79.4192],
  "nellore": [14.4426, 79.9865],
  "kurnool": [15.8281, 78.0373],
  "rajahmundry": [17.0005, 81.804],
  "kakinada": [16.9891, 82.2475],
  "anantapur": [14.6819, 77.6006],

  // Tamil Nadu
  "chennai": [13.0827, 80.2707],
  "coimbatore": [11.0168, 76.9558],
  "madurai": [9.9252, 78.1198],
  "tiruchirappalli": [10.7905, 78.7047],
  "trichy": [10.7905, 78.7047],
  "salem": [11.6643, 78.146],
  "tirunelveli": [8.7139, 77.7567],
  "vellore": [12.9165, 79.1325],
  "erode": [11.341, 77.7172],
  "thoothukudi": [8.7642, 78.1348],
  "tuticorin": [8.7642, 78.1348],
  "thanjavur": [10.787, 79.1378],
  "dindigul": [10.3673, 77.9803],
  "kanchipuram": [12.8185, 79.6947],

  // Kerala
  "kochi": [9.9312, 76.2673],
  "cochin": [9.9312, 76.2673],
  "ernakulam": [9.9816, 76.2999],
  "thiruvananthapuram": [8.5241, 76.9366],
  "trivandrum": [8.5241, 76.9366],
  "kozhikode": [11.2588, 75.7804],
  "calicut": [11.2588, 75.7804],
  "thrissur": [10.5276, 76.2144],
  "kollam": [8.8932, 76.6141],
  "alappuzha": [9.4981, 76.3388],
  "palakkad": [10.7867, 76.6548],
  "kannur": [11.8745, 75.3704],
  "kottayam": [9.5916, 76.5222],

  // West Bengal and eastern India
  "kolkata": [22.5726, 88.3639],
  "howrah": [22.5958, 88.2636],
  "durgapur": [23.5204, 87.3119],
  "siliguri": [26.7271, 88.3953],
  "asansol": [23.6889, 86.9661],
  "patna": [25.5941, 85.1376],
  "gaya": [24.7914, 85.0002],
  "muzaffarpur": [26.1209, 85.3647],
  "ranchi": [23.3441, 85.3096],
  "jamshedpur": [22.8046, 86.2029],
  "dhanbad": [23.7957, 86.4304],
  "bhubaneswar": [20.2961, 85.8245],
  "cuttack": [20.4625, 85.883],
  "rourkela": [22.2604, 84.8536],
  "guwahati": [26.1445, 91.7362],
  "silchar": [24.8333, 92.7789],
  "imphal": [24.817, 93.9368],
  "shillong": [25.5788, 91.8933],
  "aizawl": [23.7271, 92.7176],
  "kohima": [25.6751, 94.1086],
  "agartala": [23.8315, 91.2868],
  "itanagar": [27.0844, 93.6053],

  // Uttar Pradesh and Uttarakhand additions
  "ayodhya": [26.7922, 82.1998],
  "firozabad": [27.1592, 78.3957],
  "saharanpur": [29.968, 77.5552],
  "rampur": [28.8154, 79.025],
  "muzaffarnagar": [29.4727, 77.7085],
  "haldwani": [29.2183, 79.513],
  "nainital": [29.3803, 79.4636],

  // Haryana and Punjab additions
  "panipat": [29.3909, 76.9635],
  "ambala": [30.3782, 76.7767],
  "hisar": [29.1492, 75.7217],
  "rohtak": [28.8955, 76.6066],
  "karnal": [29.6857, 76.9905],
  "bathinda": [30.211, 74.9455],
  "pathankot": [32.2643, 75.6421],

  // Odisha, Assam and Northeast additions
  "puri": [19.8135, 85.8312],
  "sambalpur": [21.4669, 83.9812],
  "jorhat": [26.7465, 94.2026],
  "dibrugarh": [27.4728, 94.912],
  "tinsukia": [27.4922, 95.3468],

  // Goa
  "goa": [15.2993, 74.124],
  "panaji": [15.4909, 73.8278],
  "margao": [15.2832, 73.9862],
  "vasco da gama": [15.386, 73.844],
};

/* Normalize different spellings and common aliases. */
function normalizeCity(value) {
  let city = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

  const aliases = {
    "new mumbai": "navi mumbai",
    "banglore": "bangalore",
    "bengaluru": "bangalore",
    "mysuru": "mysore",
    "mangaluru": "mangalore",
    "hubballi": "hubli",
    "belagavi": "belgaum",
    "shivamogga": "shimoga",
    "new delhi": "delhi",
    "gurgaon": "gurugram",
    "allahabad": "prayagraj",
    "cochin": "kochi",
    "trivandrum": "thiruvananthapuram",
    "calicut": "kozhikode",
    "trichy": "tiruchirappalli",
    "vizag": "visakhapatnam",
    "tuticorin": "thoothukudi",
    "aurangabad": "chhatrapati sambhajinagar",
  };

  return aliases[city] || city;
}

/* Calculate approximate straight-line city-centre distance. */
function getCityDistanceKm(cityA, cityB) {
  const a = CITY_COORDINATES[normalizeCity(cityA)];
  const b = CITY_COORDINATES[normalizeCity(cityB)];

  if (!a || !b) return null;

  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const [lat1, lon1] = a;
  const [lat2, lon2] = b;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const haversine =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  return Math.round(
    6371 *
      2 *
      Math.atan2(
        Math.sqrt(haversine),
        Math.sqrt(1 - haversine)
      )
  );
}

/* -------------------- UI COMPONENTS -------------------- */

function PersonAvatar({ person, size = "h-11 w-11" }) {
  const label = person?.fullName || person?.email || "User";

  return (
    <div
      className={`flex ${size} shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-violet-600 to-pink-500 text-sm font-bold text-white`}
    >
      {person?.profilePic ? (
        <img
          src={person.profilePic}
          alt={label}
          className="h-full w-full object-cover"
        />
      ) : (
        label.trim().charAt(0).toUpperCase()
      )}
    </div>
  );
}

function ActionButton({
  children,
  onClick,
  disabled,
  variant = "primary",
}) {
  const styles = {
    primary: "bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-950/40 hover:from-fuchsia-500 hover:via-violet-500 hover:to-indigo-500 hover:shadow-fuchsia-500/20",
    success:
      "border border-emerald-400/20 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20",
    neutral:
      "border border-white/10 bg-white/[0.05] text-gray-200 hover:bg-white/10",
    danger:
      "border border-rose-400/20 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20",
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

function PersonRow({ person, subtitle, children }) {
  if (!person) return null;

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3 transition hover:border-fuchsia-400/25 hover:bg-white/[0.05]">
      <PersonAvatar person={person} />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">
          {person.fullName || "MilesCloser user"}
        </p>
        <p className="truncate text-xs text-gray-400">
          {subtitle || person.email || "Member"}
        </p>
      </div>

      <div className="flex shrink-0 flex-wrap justify-end gap-2">
        {children}
      </div>
    </div>
  );
}

function DistanceConnector({ person, myCity, authUser }) {
  const theirCity = person?.city || "";
  const distance = getCityDistanceKm(myCity, theirCity);

  const myInitial = (
    authUser?.fullName ||
    authUser?.email ||
    "Y"
  ).trim().charAt(0).toUpperCase();

  const theirInitial = (
    person?.fullName ||
    person?.email ||
    "F"
  ).trim().charAt(0).toUpperCase();

  return (
    <div className="relative mx-1 overflow-hidden rounded-2xl border border-fuchsia-400/20 bg-gradient-to-r from-[#1b0d2c] via-[#28113a] to-[#1b0d2c] px-3 py-5 sm:px-5">
      <div className="pointer-events-none absolute -left-10 top-0 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-24 w-24 rounded-full bg-pink-500/10 blur-2xl" />

      <div className="relative flex items-center justify-between gap-2 sm:gap-4">
        <div className="relative z-10 flex w-14 shrink-0 flex-col items-center gap-2 sm:w-16">
          <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-violet-300 bg-violet-600 shadow-lg shadow-violet-500/20 sm:h-14 sm:w-14">
            {authUser?.profilePic ? (
              <img
                src={authUser.profilePic}
                alt="Your profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-lg font-bold text-white">
                {myInitial}
              </div>
            )}
          </div>
          <span className="max-w-full truncate text-[10px] font-semibold text-violet-200">
            You
          </span>
        </div>

        <div className="relative h-16 min-w-0 flex-1">
          <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-violet-400 via-pink-400 to-fuchsia-300" />
          </div>

          <span className="absolute left-[20%] top-0 z-10 animate-bounce text-lg">
            🐻
          </span>

          <span className="absolute right-[18%] bottom-0 z-10 animate-pulse text-lg">
            ✨
          </span>

          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-pink-300/30 bg-[#24152c] px-3 py-1.5 text-[11px] font-bold text-pink-100 shadow-lg shadow-pink-500/10 sm:px-4 sm:text-xs">
            {distance !== null ? `${distance.toLocaleString()} km` : "♡ connected ♡"}
          </div>
        </div>

        <div className="relative z-10 flex w-14 shrink-0 flex-col items-center gap-2 sm:w-16">
          <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-pink-300 bg-pink-600 shadow-lg shadow-pink-500/20 sm:h-14 sm:w-14">
            {person?.profilePic ? (
              <img
                src={person.profilePic}
                alt={person?.fullName || "Your connection"}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-lg font-bold text-white">
                {theirInitial}
              </div>
            )}
          </div>
          <span className="max-w-full truncate text-[10px] font-semibold text-pink-200">
            {(person?.fullName || "Friend").split(" ")[0]}
          </span>
        </div>
      </div>

      <div className="relative mt-3 flex items-center justify-center gap-1.5 text-center">
        <Sparkles size={13} className="shrink-0 text-fuchsia-300" />
        <p className="text-[11px] leading-5 text-gray-300">
          {distance === null
            ? !normalizeCity(myCity) || !normalizeCity(theirCity)
              ? "Add both cities to discover your distance"
              : "City not supported yet · Still connected 💜"
            : distance === 0
              ? "Same city, closer vibes ✨"
              : "Different cities, one connection 💜"}
        </p>
      </div>

      {distance === null &&
        normalizeCity(myCity) &&
        normalizeCity(theirCity) && (
          <p className="mt-1 text-center text-[10px] text-gray-500">
            This city isn't in the current distance database yet.
          </p>
        )}
    </div>
  );
}

/* -------------------- MAIN CONNECTION PANEL -------------------- */

export default function ConnectionPanel() {
  const socket = useAuthStore((state) => state.socket);
  const authUser = useAuthStore((state) => state.authUser);

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [connections, setConnections] = useState([]);
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);

  const [activeTab, setActiveTab] = useState("search");
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");

  const [city, setCity] = useState(authUser?.city || "");
  const [citySaving, setCitySaving] = useState(false);
  const [detectingCity, setDetectingCity] = useState(false);
  const [cityMessage, setCityMessage] = useState("");

  useEffect(() => {
    setCity(authUser?.city || "");
  }, [authUser?.city]);

  /* Fetch connections and requests. */
  const loadConnections = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [connectionResponse, requestResponse] = await Promise.all([
        axiosInstance.get("/api/connections/"),
        axiosInstance.get("/api/connections/requests"),
      ]);

      const connectionData = connectionResponse.data;
      const requestData = requestResponse.data;

      setConnections(
        Array.isArray(connectionData)
          ? connectionData
          : connectionData?.connections || []
      );

      setIncoming(
        Array.isArray(requestData?.incoming)
          ? requestData.incoming
          : Array.isArray(requestData?.incomingRequests)
            ? requestData.incomingRequests
            : []
      );

      setOutgoing(
        Array.isArray(requestData?.outgoing)
          ? requestData.outgoing
          : Array.isArray(requestData?.outgoingRequests)
            ? requestData.outgoingRequests
            : []
      );

      setBlockedUsers(
        Array.isArray(requestData?.blocked)
          ? requestData.blocked
          : []
      );
    } catch (err) {
      setError(getError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadConnections();
  }, [loadConnections]);

  /* Refresh after connection socket events. */
  useEffect(() => {
    if (!socket) return;

    const events = [
      "connection:request",
      "connection:accepted",
      "connection:rejected",
      "connection:cancelled",
      "connection:removed",
      "connection:blocked",
      "connection:unblocked",
    ];

    events.forEach((event) => socket.on(event, loadConnections));

    return () => {
      events.forEach((event) => socket.off(event, loadConnections));
    };
  }, [socket, loadConnections]);

  /* Search users. */
  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2) {
      setSearchResults([]);
      setSearching(false);
      return;
    }

    let cancelled = false;

    const timeoutId = setTimeout(async () => {
      setSearching(true);

      try {
        const response = await axiosInstance.get(
          `/api/connections/search?q=${encodeURIComponent(trimmedQuery)}`
        );

        if (!cancelled) {
          setSearchResults(
            Array.isArray(response.data)
              ? response.data
              : response.data?.users || []
          );
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setSearchResults([]);
          setError(getError(err));
        }
      } finally {
        if (!cancelled) setSearching(false);
      }
    }, 350);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [query]);

  /* Perform connection actions. */
  const performAction = async (personId, action, config = {}) => {
    if (!personId) {
      setError("Unable to identify this user.");
      return;
    }

    setBusyId(personId);
    setError("");

    try {
      await action();
      await loadConnections();

      if (config.clearSearch) {
        setSearchResults((previous) =>
          previous.map((person) =>
            getId(person) === personId
              ? {
                  ...person,
                  relationship: {
                    ...person.relationship,
                    status: config.newStatus || "pending",
                  },
                }
              : person
          )
        );
      }
    } catch (err) {
      setError(getError(err));
    } finally {
      setBusyId("");
    }
  };

  const acceptRequest = (request) => {
    const requestId = getId(request);
    return performAction(requestId, () =>
      axiosInstance.patch(`/api/connections/${requestId}/accept`)
    );
  };

  const rejectRequest = (request) => {
    const requestId = getId(request);
    return performAction(requestId, () =>
      axiosInstance.patch(`/api/connections/${requestId}/reject`)
    );
  };

  const cancelRequest = (request) => {
    const requestId = getId(request);
    return performAction(requestId, () =>
      axiosInstance.delete(`/api/connections/${requestId}/cancel`)
    );
  };

  const sendRequest = (person) => {
    const personId = getId(person);
    const currentUserId = getId(authUser);

    if (!personId) {
      setError("Unable to identify this user. Please refresh and try again.");
      return;
    }

    if (personId === currentUserId) {
      setError("You cannot send a connection request to yourself.");
      return;
    }

    return performAction(
      personId,
      () =>
        axiosInstance.post("/api/connections/request", {
          userId: personId,
        }),
      { clearSearch: true, newStatus: "pending" }
    );
  };

  const removeConnection = (person) => {
    const personId = getId(person);

    if (!personId) {
      setError("Unable to identify this connection.");
      return;
    }

    if (!window.confirm(`Remove ${person?.fullName || "this connection"}?`)) {
      return;
    }

    return performAction(personId, () =>
      axiosInstance.delete(`/api/connections/${personId}`)
    );
  };

  const blockUser = (person) => {
    const personId = getId(person);

    if (!personId) {
      setError("Unable to identify this user.");
      return;
    }

    if (!window.confirm(`Block ${person?.fullName || "this user"}?`)) {
      return;
    }

    return performAction(personId, () =>
      axiosInstance.post(`/api/connections/${personId}/block`)
    );
  };

  const unblockUser = (person) => {
    const personId = getId(person);

    if (!personId) {
      setError("Unable to identify this user.");
      return;
    }

    return performAction(personId, () =>
      axiosInstance.delete(`/api/connections/${personId}/block`)
    );
  };

  /* Save a manually entered city. */
  const saveCity = async (event) => {
    event.preventDefault();
    setCitySaving(true);
    setCityMessage("");
    setError("");

    try {
      const normalizedCity = city.trim();

      const response = await axiosInstance.patch(
        "/api/connections/city",
        { city: normalizedCity }
      );

      setCity(normalizedCity);
      setCityMessage(
        response.data?.message || "Your city has been updated!"
      );

      // Update the client auth state if the store exposes an updater.
      const updateAuthUser = useAuthStore.getState?.().setAuthUser;
      if (typeof updateAuthUser === "function") {
        updateAuthUser({
          ...authUser,
          city: normalizedCity,
        });
      }

      await loadConnections();
    } catch (err) {
      setError(getError(err));
    } finally {
      setCitySaving(false);
    }
  };

  /* -------------------- AUTOMATIC CITY DETECTION -------------------- */

  const detectMyCity = async () => {
    if (!navigator.geolocation) {
      setError(
        "Your browser doesn't support location detection. Please enter your city manually."
      );
      return;
    }

    setDetectingCity(true);
    setCityMessage("");
    setError("");

    try {
      // Request coordinates only after the user clicks the button.
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false,
          timeout: 15000,
          maximumAge: 300000,
        });
      });

      const { latitude, longitude } = position.coords;

      // OpenStreetMap Nominatim reverse geocoding.
      const url = new URL(
        "https://nominatim.openstreetmap.org/reverse"
      );

      url.searchParams.set("format", "jsonv2");
      url.searchParams.set("lat", latitude);
      url.searchParams.set("lon", longitude);
      url.searchParams.set("zoom", "10");
      url.searchParams.set("addressdetails", "1");

      const response = await fetch(url.toString(), {
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          "The city lookup service is temporarily unavailable. Please enter your city manually."
        );
      }

      const data = await response.json();
      const address = data.address || {};

      // Prefer a city or town, then use broader locality fields.
      const detectedCity =
        address.city ||
        address.town ||
        address.village ||
        address.municipality ||
        address.city_district ||
        address.county ||
        address.state_district;

      if (!detectedCity) {
        throw new Error(
          "We couldn't identify your city from this location. Please enter it manually."
        );
      }

      // Send only the city name to your existing backend.
      // Latitude and longitude are not saved in your database.
      const saveResponse = await axiosInstance.patch(
        "/api/connections/city",
        { city: detectedCity }
      );

      setCity(detectedCity);
      setCityMessage(
        saveResponse.data?.message ||
          `City detected and saved: ${detectedCity}`
      );

      const updateAuthUser = useAuthStore.getState?.().setAuthUser;
      if (typeof updateAuthUser === "function") {
        updateAuthUser({
          ...authUser,
          city: detectedCity,
        });
      }

      await loadConnections();
    } catch (err) {
      if (err?.code === 1) {
        setError(
          "Location permission was denied. Allow location access in your browser, or enter your city manually."
        );
      } else if (err?.code === 2) {
        setError(
          "Your location is unavailable. Check your device location settings or enter your city manually."
        );
      } else if (err?.code === 3) {
        setError(
          "Location detection timed out. Try again or enter your city manually."
        );
      } else {
        setError(getError(err));
      }
    } finally {
      setDetectingCity(false);
    }
  };

  const tabs = [
    { id: "search", label: "Discover", icon: Search },
    {
      id: "requests",
      label: "Requests",
      icon: Clock3,
      count: incoming.length,
    },
    {
      id: "connections",
      label: "Connections",
      icon: Users,
      count: connections.length,
    },
    {
      id: "blocked",
      label: "Blocked",
      icon: Ban,
      count: blockedUsers.length,
    },
  ];

  const currentUserId = getId(authUser);

  /* -------------------- RENDER -------------------- */

  return (
    <section className="relative isolate w-full space-y-5 overflow-hidden rounded-3xl border border-white/[0.10] bg-[#160824] p-4 text-white shadow-2xl shadow-black/30 sm:p-6">
      <div className="pointer-events-none absolute -left-24 -top-24 -z-10 h-64 w-64 rounded-full bg-fuchsia-600/15 blur-[90px]" />
      <div className="pointer-events-none absolute -right-20 top-1/3 -z-10 h-72 w-72 rounded-full bg-violet-600/15 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 -z-10 h-56 w-56 rounded-full bg-indigo-500/10 blur-[90px]" />
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">
            Your circle
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight">
            Connections
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Find people and choose who you connect with.
          </p>
        </div>

        <button
          type="button"
          onClick={loadConnections}
          disabled={loading}
          title="Refresh connections"
          className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-gray-300 transition hover:bg-white/10 disabled:opacity-50"
        >
          <RefreshCw
            size={17}
            className={loading ? "animate-spin" : ""}
          />
        </button>
      </div>

      {/* City settings */}
      <form
        onSubmit={saveCity}
        className="rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-500/[0.12] via-fuchsia-500/[0.06] to-pink-500/[0.08] p-4"
      >
        <div className="mb-3 flex items-start gap-3">
          <div className="rounded-xl bg-violet-500/15 p-2 text-violet-200">
            <MapPin size={18} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white">Your city</p>
            <p className="mt-1 text-xs leading-5 text-gray-400">
              Detect your city automatically or enter it manually.
              Only your city name is saved, not your GPS coordinates.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <input
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
              setCityMessage("");
            }}
            maxLength={80}
            placeholder="Enter your city (e.g. Mumbai)"
            className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-violet-400/50"
          />

          <button
            type="button"
            onClick={detectMyCity}
            disabled={detectingCity || citySaving}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-400/30 bg-violet-500/10 px-4 py-2.5 text-sm font-semibold text-violet-200 transition hover:bg-violet-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {detectingCity ? (
              <LoaderCircle size={15} className="animate-spin" />
            ) : (
              <LocateFixed size={15} />
            )}
            {detectingCity ? "Detecting..." : "Detect my city"}
          </button>

          <button
            type="submit"
            disabled={citySaving || detectingCity}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition duration-300 hover:scale-[1.02] hover:from-fuchsia-500 hover:via-violet-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {citySaving && (
              <LoaderCircle size={15} className="animate-spin" />
            )}
            {citySaving ? "Saving..." : "Save city"}
          </button>
        </div>

        {cityMessage && (
          <p className="mt-2 text-xs text-emerald-300">{cityMessage}</p>
        )}
      </form>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {tabs.map(({ id, label, icon: Icon, count }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition ${
              activeTab === id
                ? "border-fuchsia-400/30 bg-gradient-to-r from-fuchsia-500/15 to-violet-500/15 text-fuchsia-100"
                : "border-white/[0.07] bg-white/[0.025] text-gray-400 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            <Icon size={16} />
            <span>{label}</span>
            {count > 0 && (
              <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px]">
                {count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Errors */}
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
        >
          {error}
        </div>
      )}

      {/* DISCOVER */}
      {activeTab === "search" && (
        <div className="space-y-4">
          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#21102f]/80 px-4 py-3 transition duration-300 focus-within:border-fuchsia-400/50 focus-within:ring-2 focus-within:ring-violet-500/10">
            <Search size={19} className="shrink-0 text-violet-300" />

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name or email..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
            />

            {searching && (
              <LoaderCircle
                size={17}
                className="animate-spin text-violet-300"
              />
            )}
          </label>

          {query.trim().length < 2 ? (
            <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">
              Enter at least 2 characters to discover people.
            </p>
          ) : searching ? (
            <p className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/10 px-4 py-8 text-sm text-gray-400">
              <LoaderCircle size={16} className="animate-spin" />
              Searching for people...
            </p>
          ) : searchResults.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">
              No users found. Try another name or email.
            </p>
          ) : (
            <div className="space-y-2">
              {searchResults.map((person, index) => {
                const personId = getId(person);
                const status = relationshipStatus(person);
                const isBusy = !!personId && busyId === personId;
                const isSelf = !!personId && personId === currentUserId;

                return (
                  <PersonRow
                    key={personId || `search-${index}`}
                    person={person}
                    subtitle={person.email}
                  >
                    {isSelf ? (
                      <span className="text-xs text-gray-500">You</span>
                    ) : status === "accepted" ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
                        <UserCheck size={14} />
                        Connected
                      </span>
                    ) : status === "pending" ? (
                      person.relationship?.isRequester ? (
                        <ActionButton
                          variant="neutral"
                          disabled={isBusy}
                          onClick={() =>
                            performAction(
                              personId,
                              () =>
                                axiosInstance.delete(
                                  `/api/connections/${personId}/cancel`
                                ),
                              { clearSearch: true, newStatus: "none" }
                            )
                          }
                        >
                          <X size={14} />
                          Cancel
                        </ActionButton>
                      ) : (
                        <ActionButton
                          variant="neutral"
                          onClick={() => setActiveTab("requests")}
                        >
                          <Clock3 size={14} />
                          Respond
                        </ActionButton>
                      )
                    ) : status === "blocked" ? (
                      <span className="text-xs text-rose-300">Blocked</span>
                    ) : (
                      <ActionButton
                        disabled={isBusy || !personId}
                        onClick={() => sendRequest(person)}
                      >
                        {isBusy ? (
                          <LoaderCircle size={14} className="animate-spin" />
                        ) : (
                          <UserPlus size={14} />
                        )}
                        Connect
                      </ActionButton>
                    )}
                  </PersonRow>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* REQUESTS */}
      {activeTab === "requests" && (
        <div className="space-y-5">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-200">
              Incoming requests
            </h3>

            {incoming.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-center text-sm text-gray-500">
                No pending requests right now.
              </p>
            ) : (
              <div className="space-y-2">
                {incoming.map((request, index) => {
                  const person = getPerson(request, "incoming");
                  const requestId = getId(request);

                  return (
                    <PersonRow
                      key={requestId || `incoming-${index}`}
                      person={person}
                      subtitle="Wants to connect with you"
                    >
                      <ActionButton
                        variant="success"
                        disabled={busyId === requestId || !requestId}
                        onClick={() => acceptRequest(request)}
                      >
                        <Check size={14} />
                        Accept
                      </ActionButton>

                      <ActionButton
                        variant="neutral"
                        disabled={busyId === requestId || !requestId}
                        onClick={() => rejectRequest(request)}
                      >
                        <X size={14} />
                        Reject
                      </ActionButton>
                    </PersonRow>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-200">
              Sent requests
            </h3>

            {outgoing.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-center text-sm text-gray-500">
                You have no outgoing requests.
              </p>
            ) : (
              <div className="space-y-2">
                {outgoing.map((request, index) => {
                  const person = getPerson(request, "outgoing");
                  const requestId = getId(request);

                  return (
                    <PersonRow
                      key={requestId || `outgoing-${index}`}
                      person={person}
                      subtitle="Request pending"
                    >
                      <ActionButton
                        variant="neutral"
                        disabled={busyId === requestId || !requestId}
                        onClick={() => cancelRequest(request)}
                      >
                        <X size={14} />
                        Cancel
                      </ActionButton>
                    </PersonRow>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* CONNECTIONS */}
      {activeTab === "connections" && (
        <div className="space-y-4">
          {connections.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">
              No connections yet. Use Discover to find people.
            </p>
          ) : (
            connections.map((connection, index) => {
              const person = getPerson(connection, "connection");
              const personId = getId(person);

              return (
                <div
                  key={
                    getId(connection) ||
                    personId ||
                    `connection-${index}`
                  }
                  className="space-y-2"
                >
                  <PersonRow
                    person={person}
                    subtitle={person?.email || "Your connection"}
                  >
                    <ActionButton
                      variant="neutral"
                      disabled={busyId === personId || !personId}
                      onClick={() => removeConnection(person)}
                    >
                      <Trash2 size={14} />
                      Remove
                    </ActionButton>

                    <ActionButton
                      variant="danger"
                      disabled={busyId === personId || !personId}
                      onClick={() => blockUser(person)}
                    >
                      <Ban size={14} />
                      Block
                    </ActionButton>
                  </PersonRow>

                  <DistanceConnector
                    person={person}
                    myCity={city || authUser?.city || ""}
                    authUser={{ ...authUser, city: city || authUser?.city || "" }}
                  />
                </div>
              );
            })
          )}
        </div>
      )}

      {/* BLOCKED */}
      {activeTab === "blocked" && (
        <div className="space-y-2">
          {blockedUsers.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">
              You have no blocked users.
            </p>
          ) : (
            blockedUsers.map((entry, index) => {
              const person = getPerson(entry, "connection");
              const personId = getId(person);

              return (
                <PersonRow
                  key={getId(entry) || personId || `blocked-${index}`}
                  person={person}
                  subtitle="Blocked user"
                >
                  <ActionButton
                    variant="neutral"
                    disabled={busyId === personId || !personId}
                    onClick={() => unblockUser(person)}
                  >
                    Unblock
                  </ActionButton>
                </PersonRow>
              );
            })
          )}
        </div>
      )}

      <p className="border-t border-white/[0.07] pt-4 text-xs leading-5 text-gray-500">
        Only accepted connections should be able to message or call each
        other. Distances are approximate city-centre estimates, not live
        locations. Your browser location is requested only when you click
        Detect my city.
      </p>
    </section>
  );
}
