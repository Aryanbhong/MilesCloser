import React from 'react'
import { useChatStore } from '../../utils/useChatStore';
import Sidebar from '../../Components/chat/Sidebar';
import NoChatSelected from '../../Components/chat/NoChatSelected';
import ChatContainer from '../../Components/chat/ChatContainer';
import Navbar from '../../Components/Navbar';

const ChatPage = () => {
  const { selectedUser } = useChatStore();
  <Navbar/>
  return (
   
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage
