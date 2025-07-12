import { create } from "zustand";
import axiosInstance from "./axiosinstance";
import { toast } from "react-toastify";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set,get)=>({
    messages: [],
    users:[],
    isUserLoading: false,
    selectedUser: null,
    isMessagesLoading:false,


    getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/api/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  sendMessage: async(messageData)=>{
  const {selectedUser, messages} = get()
  try{
    const res = await axiosInstance.post(`/api/messages/send/${selectedUser._id}`,messageData)
    set({messages:[...messages,res.data]})
  }catch(error){
     toast.error(error.response.data.message)
  }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/api/messages/${userId}`);
      console.log("getMessages response:", res.data);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  subscribeToMessages: ()=>{
   const {selectedUser} = get()
   if(!selectedUser) return;

   const socket = useAuthStore.getState().socket;

   socket.on("newMessage",(newMessage)=>{
    if(newMessage.senderId !== selectedUser._id) return;
    set({
      messages: [...get().messages,newMessage],
    })
   })
  },

  unsubscribeFromMessages:()=>{
   const socket = useAuthStore.getState().socket;
   socket.off("newMessage");
  },


  setSelectedUser: (selectedUser) => set({ selectedUser }),
}))