// import React, { useEffect, useRef, useState } from 'react';
// import { useChatStore } from '../../utils/useChatStore';
// import ChatHeader from './ChatHeader';
// import MessageInput from './MessageInput';
// import MessageStructure from './MessageStructure';
// import axiosInstance from '../../utils/axiosinstance';
// import { formatMessageTime } from '../../utils/helper';

// const ChatContainer = () => {
//   const {
//     messages,
//     getMessages,
//     isMessagesLoading,
//     selectedUser,
//     subscribeToMessages,
//     unsubscribeFromMessages,
//   } = useChatStore();

//   const messageEndRef = useRef(null);
//   const [user, setUser] = useState(null);

//   const getUserInfo = async () => {
//     try {
//       const response = await axiosInstance.get("/get-user");
//       if (response.data && response.data.user) {
//         setUser(response.data.user);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (selectedUser && selectedUser._id) {
//       getMessages(selectedUser._id);
//       getUserInfo();
//       subscribeToMessages();
//       return () => unsubscribeFromMessages();
//     }
//   }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

//   useEffect(() => {
//     if (messageEndRef.current && messages) {
//       messageEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   if (isMessagesLoading) return (
//     <div className='flex-1 flex flex-col overflow-auto bg-gray-900 text-white'>
//       <ChatHeader />
//       <MessageStructure />
//       <MessageInput />
//     </div>
//   );

//   return (
//     <div className='flex-1 flex flex-col overflow-auto bg-gray-900 text-white'>
//       <ChatHeader />
//       <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-pink-500">
//         {user && Array.isArray(messages) && messages.map((message) => (
//           <div
//             key={message._id}
//             className={`chat ${message.senderId === user._id ? "chat-end" : "chat-start"}`}
//             ref={messageEndRef}
//           >
//             <div className="chat-image avatar">
//               <div className="size-10 rounded-full border border-pink-400">
//                 <img
//                   src={
//                     message.senderId === user._id
//                       ? user.profilePic || "/avatar.png"
//                       : selectedUser.profilePic || "/avatar.png"
//                   }
//                   alt="profile pic"
//                 />
//               </div>
//             </div>
//             <div className="chat-header text-sm text-gray-400 mb-1">
//               <time className="text-xs opacity-70 ml-1">
//                 {formatMessageTime(message.createdAt)}
//               </time>
//             </div>
//             <div
//               className={`chat-bubble max-w-xs break-words shadow-lg ${
//                 message.senderId === user._id
//                   ? "bg-pink-500 text-white"
//                   : "bg-gray-800 text-gray-200"
//               }`}
//             >
//               {message.image && (
//                 <img
//                   src={message.image}
//                   alt="Attachment"
//                   className="sm:max-w-[200px] rounded-md mb-2"
//                 />
//               )}
//               {message.text && <p>{message.text}</p>}
//             </div>
//           </div>
//         ))}
//       </div>
//       <MessageInput />
//     </div>
//   );
// };

// export default ChatContainer;




// import React, { useEffect, useRef, useState } from "react";
// import { MessageCircle, Heart } from "lucide-react";

// import { useChatStore } from "../../utils/useChatStore";
// import ChatHeader from "./ChatHeader";
// import MessageInput from "./MessageInput";
// import MessageStructure from "./MessageStructure";
// import axiosInstance from "../../utils/axiosinstance";
// import { formatMessageTime } from "../../utils/helper";

// const ChatContainer = () => {
//   const {
//     messages,
//     getMessages,
//     isMessagesLoading,
//     selectedUser,
//     subscribeToMessages,
//     unsubscribeFromMessages,
//   } = useChatStore();

//   const messageEndRef = useRef(null);
//   const [user, setUser] = useState(null);

//   const getUserInfo = async () => {
//     try {
//       const response = await axiosInstance.get("/get-user");

//       if (response.data?.user) {
//         setUser(response.data.user);
//       }
//     } catch (error) {
//       console.error("Failed to fetch user info:", error);
//     }
//   };

//   useEffect(() => {
//     if (!selectedUser?._id) return;

//     getMessages(selectedUser._id);
//     getUserInfo();
//     subscribeToMessages();

//     return () => unsubscribeFromMessages();
//   }, [
//     selectedUser?._id,
//     getMessages,
//     subscribeToMessages,
//     unsubscribeFromMessages,
//   ]);

//   useEffect(() => {
//     messageEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//       block: "end",
//     });
//   }, [messages]);

//   return (
//     <div className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50 text-gray-800">
//       {/* Soft background decorations */}
//       <div className="pointer-events-none absolute inset-0 overflow-hidden">
//         <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-pink-200/20 blur-3xl" />
//         <div className="absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-purple-200/25 blur-3xl" />
//       </div>

//       {/* Chat Header */}
//       <div className="relative z-10 border-b border-pink-100/80 bg-white/80 shadow-[0_4px_20px_rgba(236,72,153,0.05)] backdrop-blur-xl">
//         <ChatHeader />
//       </div>

//       {/* Messages Area */}
//       <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden">
//         {isMessagesLoading ? (
//           <div className="flex flex-1 flex-col">
//             <div className="flex flex-1 flex-col items-center justify-center px-6">
//               <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-pink-100 bg-white/80 shadow-lg shadow-pink-100/60">
//                 <MessageCircle className="h-9 w-9 animate-pulse text-pink-400" />
//                 <Heart className="absolute -right-2 -top-2 h-6 w-6 fill-pink-300 text-pink-300" />
//               </div>

//               <p className="text-sm font-semibold text-gray-600">
//                 Getting your conversation ready...
//               </p>

//               <p className="mt-1 text-xs text-gray-400">
//                 Just a little moment 💗
//               </p>

//               <div className="mt-5">
//                 <MessageStructure />
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3 py-5 sm:px-6 sm:py-6">
//             {Array.isArray(messages) && messages.length > 0 ? (
//               <div className="mx-auto flex w-full max-w-4xl flex-col gap-5">
//                 {user &&
//                   messages.map((message) => {
//                     const isMine = message.senderId === user._id;

//                     return (
//                       <div
//                         key={message._id}
//                         className={`flex w-full items-end gap-2.5 ${
//                           isMine ? "justify-end" : "justify-start"
//                         }`}
//                       >
//                         {/* Other person's avatar */}
//                         {!isMine && (
//                           <div className="mb-1 h-9 w-9 shrink-0 overflow-hidden rounded-2xl border-2 border-white bg-gradient-to-br from-pink-100 to-purple-100 shadow-sm ring-1 ring-pink-100">
//                             <img
//                               src={selectedUser?.profilePic || "/avatar.png"}
//                               alt="Their profile"
//                               className="h-full w-full object-cover"
//                             />
//                           </div>
//                         )}

//                         <div
//                           className={`flex max-w-[82%] flex-col sm:max-w-[70%] ${
//                             isMine ? "items-end" : "items-start"
//                           }`}
//                         >
//                           {/* Message bubble */}
//                           <div
//                             className={`overflow-hidden break-words rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm sm:px-5 ${
//                               isMine
//                                 ? "rounded-br-md bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 text-white shadow-pink-200/50"
//                                 : "rounded-bl-md border border-pink-100/80 bg-white/90 text-gray-700 shadow-pink-100/40 backdrop-blur-md"
//                             }`}
//                           >
//                             {message.image && (
//                               <img
//                                 src={message.image}
//                                 alt="Message attachment"
//                                 loading="lazy"
//                                 className="mb-2 max-h-72 w-full rounded-2xl object-cover"
//                               />
//                             )}

//                             {message.text && (
//                               <p className="whitespace-pre-wrap">
//                                 {message.text}
//                               </p>
//                             )}
//                           </div>

//                           {/* Timestamp */}
//                           <span
//                             className={`mt-1.5 px-1 text-[10px] font-medium text-gray-400 ${
//                               isMine ? "text-right" : "text-left"
//                             }`}
//                           >
//                             {formatMessageTime(message.createdAt)}
//                           </span>
//                         </div>

//                         {/* Your avatar */}
//                         {isMine && (
//                           <div className="mb-1 h-9 w-9 shrink-0 overflow-hidden rounded-2xl border-2 border-white bg-gradient-to-br from-pink-100 to-purple-100 shadow-sm ring-1 ring-pink-200">
//                             <img
//                               src={user?.profilePic || "/avatar.png"}
//                               alt="Your profile"
//                               className="h-full w-full object-cover"
//                             />
//                           </div>
//                         )}
//                       </div>
//                     );
//                   })}

//                 {/* Scroll target at the end of the conversation */}
//                 <div ref={messageEndRef} className="h-px shrink-0" />
//               </div>
//             ) : (
//               <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
//                 <div className="relative mb-5 flex h-24 w-24 items-center justify-center rounded-[2rem] border border-pink-100 bg-white/80 shadow-[0_12px_35px_rgba(236,72,153,0.12)] backdrop-blur-xl">
//                   <MessageCircle className="h-11 w-11 text-pink-400" />
//                   <Heart className="absolute -right-2 -top-2 h-7 w-7 fill-pink-300 text-pink-300" />
//                 </div>

//                 <h3 className="text-xl font-bold text-gray-800">
//                   Start a little conversation
//                 </h3>

//                 <p className="mt-2 max-w-xs text-sm leading-6 text-gray-500">
//                   Every great memory starts with a message. Say hello and make
//                   this conversation yours. 💗
//                 </p>

//                 <div className="mt-5 flex items-center gap-2 rounded-full border border-pink-100 bg-white/80 px-4 py-2 text-xs font-medium text-pink-500 shadow-sm">
//                   <Heart className="h-3.5 w-3.5 fill-pink-400" />
//                   Your space to stay connected
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Message Input */}
//       <div className="relative z-10 border-t border-pink-100/80 bg-white/85 px-2 py-3 shadow-[0_-4px_25px_rgba(236,72,153,0.05)] backdrop-blur-xl sm:px-5 sm:py-4">
//         <div className="mx-auto w-full max-w-4xl">
//           <MessageInput />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatContainer;



import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, Heart } from "lucide-react";

import { useChatStore } from "../../utils/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageStructure from "./MessageStructure";
import axiosInstance from "../../utils/axiosinstance";
import { formatMessageTime } from "../../utils/helper";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const messageEndRef = useRef(null);
  const [user, setUser] = useState(null);

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");

      if (response.data?.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  useEffect(() => {
    if (!selectedUser?._id) return;

    getMessages(selectedUser._id);
    getUserInfo();
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  return (
    <div className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-[#100819] text-purple-50">
      
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-fuchsia-600/[0.07] blur-[100px]" />
        <div className="absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-blue-600/[0.07] blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/[0.03] blur-[120px]" />
      </div>

  
      <div className="relative z-20 border-b border-fuchsia-400/10 bg-[#160d22]/90 shadow-[0_4px_25px_rgba(0,0,0,0.2)] backdrop-blur-xl">
        <ChatHeader />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden">
        {isMessagesLoading ? (
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-3 py-5 sm:px-6">
            <div className="relative mb-5 flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-fuchsia-400/20 bg-[#1b102b]/80 shadow-[0_0_35px_rgba(217,70,239,0.1)]">
              <MessageCircle className="h-9 w-9 animate-pulse text-fuchsia-400" />
              <Heart className="absolute -right-2 -top-2 h-6 w-6 fill-fuchsia-400 text-fuchsia-400" />
            </div>

            <p className="text-center text-sm font-semibold text-purple-100">
              Getting your conversation ready...
            </p>

            <p className="mt-1 text-center text-xs text-purple-300/50">
              Just a little moment 💗
            </p>

            <div className="mt-5 w-full max-w-3xl">
              <MessageStructure />
            </div>
          </div>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3 py-5 sm:px-6 sm:py-6">
            {Array.isArray(messages) && messages.length > 0 ? (
              <div className="mx-auto flex w-full max-w-4xl flex-col gap-5">
                {user &&
                  messages.map((message) => {
                    const isMine = message.senderId === user._id;

                    return (
                      <div
                        key={message._id}
                        className={`flex w-full items-end gap-2.5 ${
                          isMine ? "justify-end" : "justify-start"
                        }`}
                      >
                    
                        {!isMine && (
                          <div className="mb-1 h-9 w-9 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-fuchsia-500/70 to-blue-500/70 p-[1.5px] shadow-[0_0_15px_rgba(217,70,239,0.1)]">
                            <div className="h-full w-full overflow-hidden rounded-[14px] bg-[#1b102b]">
                              <img
                                src={selectedUser?.profilePic || "/avatar.png"}
                                alt="Their profile"
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </div>
                        )}

                        <div
                          className={`flex max-w-[82%] flex-col sm:max-w-[70%] ${
                            isMine ? "items-end" : "items-start"
                          }`}
                        >
                       
                          <div
                            className={`overflow-hidden break-words rounded-3xl px-4 py-3 text-sm leading-6 sm:px-5 ${
                              isMine
                                ? "rounded-br-md border border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-600/90 via-purple-600/90 to-blue-600/90 text-white shadow-[0_4px_25px_rgba(168,85,247,0.12)]"
                                : "rounded-bl-md border border-white/[0.08] bg-[#1b102b]/90 text-purple-50 shadow-[0_4px_20px_rgba(0,0,0,0.15)] backdrop-blur-md"
                            }`}
                          >
                            {message.image && (
                              <img
                                src={message.image}
                                alt="Message attachment"
                                loading="lazy"
                                className="mb-2 max-h-72 w-full rounded-2xl border border-white/10 object-cover"
                              />
                            )}

                            {message.text && (
                              <p className="whitespace-pre-wrap">
                                {message.text}
                              </p>
                            )}
                          </div>

                       
                          <span
                            className={`mt-1.5 px-1 text-[10px] font-medium text-purple-300/40 ${
                              isMine ? "text-right" : "text-left"
                            }`}
                          >
                            {formatMessageTime(message.createdAt)}
                          </span>
                        </div>

                        
                        {isMine && (
                          <div className="mb-1 h-9 w-9 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/70 to-fuchsia-500/70 p-[1.5px] shadow-[0_0_15px_rgba(96,165,250,0.1)]">
                            <div className="h-full w-full overflow-hidden rounded-[14px] bg-[#1b102b]">
                              <img
                                src={user?.profilePic || "/avatar.png"}
                                alt="Your profile"
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

          
                <div ref={messageEndRef} className="h-px shrink-0" />
              </div>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
              
                <div className="relative mb-5 flex h-24 w-24 items-center justify-center rounded-[2rem] border border-fuchsia-400/20 bg-[#1b102b]/80 shadow-[0_0_40px_rgba(217,70,239,0.1)] backdrop-blur-xl">
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-fuchsia-500/[0.08] to-blue-500/[0.08]" />
                  <MessageCircle className="relative h-11 w-11 text-fuchsia-400" />
                  <Heart className="absolute -right-2 -top-2 h-7 w-7 fill-fuchsia-400 text-fuchsia-400" />
                </div>

                <h3 className="text-xl font-bold tracking-tight text-purple-50">
                  Start a little conversation
                </h3>

                <p className="mt-2 max-w-xs text-sm leading-6 text-purple-300/60">
                  Every great memory starts with a message. Say hello and make
                  this conversation yours. 💗
                </p>

                <div className="mt-5 flex items-center gap-2 rounded-full border border-fuchsia-400/15 bg-[#1b102b]/70 px-4 py-2 text-xs font-medium text-fuchsia-300/80 shadow-[0_0_20px_rgba(217,70,239,0.05)]">
                  <Heart className="h-3.5 w-3.5 fill-fuchsia-400/80" />
                  Your space to stay connected
                </div>
              </div>
            )}
          </div>
        )}
      </div>

  
      <div className="relative z-20 border-t border-fuchsia-400/10 bg-[#160d22]/95 px-2 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.15)] backdrop-blur-xl sm:px-5 sm:py-4">
        <div className="mx-auto w-full max-w-4xl">
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
