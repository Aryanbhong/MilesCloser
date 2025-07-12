import React, { useEffect, useRef, useState } from 'react';
import { useChatStore } from '../../utils/useChatStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageStructure from './MessageStructure';
import axiosInstance from '../../utils/axiosinstance';
import { formatMessageTime } from '../../utils/helper';

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
      if (response.data && response.data.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedUser && selectedUser._id) {
      getMessages(selectedUser._id);
      getUserInfo();
      subscribeToMessages();
      return () => unsubscribeFromMessages();
    }
  }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) return (
    <div className='flex-1 flex flex-col overflow-auto bg-gray-900 text-white'>
      <ChatHeader />
      <MessageStructure />
      <MessageInput />
    </div>
  );

  return (
    <div className='flex-1 flex flex-col overflow-auto bg-gray-900 text-white'>
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-pink-500">
        {user && Array.isArray(messages) && messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === user._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border border-pink-400">
                <img
                  src={
                    message.senderId === user._id
                      ? user.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header text-sm text-gray-400 mb-1">
              <time className="text-xs opacity-70 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div
              className={`chat-bubble max-w-xs break-words shadow-lg ${
                message.senderId === user._id
                  ? "bg-pink-500 text-white"
                  : "bg-gray-800 text-gray-200"
              }`}
            >
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;

