// import React from 'react'
// import { useChatStore } from '../../utils/useChatStore';
// import Sidebar from '../../Components/chat/Sidebar';
// import NoChatSelected from '../../Components/chat/NoChatSelected';
// import ChatContainer from '../../Components/chat/ChatContainer';
// import Navbar from '../../Components/Navbar';

// const ChatPage = () => {
//   const { selectedUser } = useChatStore();
//   <Navbar/>
//   return (
   
//     <div className="h-screen bg-base-200">
//       <div className="flex items-center justify-center pt-20 px-4">
//         <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
//           <div className="flex h-full rounded-lg overflow-hidden">
//             <Sidebar />

//             {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatPage





import React from "react";
import { useChatStore } from "../../utils/useChatStore";
import Sidebar from "../../Components/chat/Sidebar";
import NoChatSelected from "../../Components/chat/NoChatSelected";
import ChatContainer from "../../Components/chat/ChatContainer";
import Navbar from "../../Components/Navbar";

const ChatPage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50">

      {/* Navbar */}
      <Navbar />

      {/* Main Chat Area */}
      <main className="flex min-h-0 flex-1 justify-center p-3 pt-4 sm:p-5 lg:p-6">
        <div className="flex h-full w-full max-w-7xl overflow-hidden rounded-3xl border border-pink-100/80 bg-white/70 shadow-[0_20px_60px_-20px_rgba(236,72,153,0.2)] backdrop-blur-xl">

          {/* Sidebar */}
          <Sidebar />

          {/* Selected Chat or Welcome Screen */}
          <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
            {!selectedUser ? (
              <NoChatSelected />
            ) : (
              <ChatContainer />
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default ChatPage;

