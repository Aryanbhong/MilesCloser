// import { create } from "zustand";
// import axiosInstance from "./axiosinstance";
// import { toast } from "react-toastify";
// import { useAuthStore } from "./useAuthStore";

// export const useChatStore = create((set,get)=>({
//     messages: [],
//     users:[],
//     isUserLoading: false,
//     selectedUser: null,
//     isMessagesLoading:false,


//     getUsers: async () => {
//     set({ isUsersLoading: true });
//     try {
//       const res = await axiosInstance.get("/api/messages/users");
//       set({ users: res.data });
//     } catch (error) {
//       toast.error(error.response.data.message);
//     } finally {
//       set({ isUsersLoading: false });
//     }
//   },

//   sendMessage: async(messageData)=>{
//   const {selectedUser, messages} = get()
//   try{
//     const res = await axiosInstance.post(`/api/messages/send/${selectedUser._id}`,messageData)
//     set({messages:[...messages,res.data]})
//   }catch(error){
//      toast.error(error.response.data.message)
//   }
//   },

//   getMessages: async (userId) => {
//     set({ isMessagesLoading: true });
//     try {
//       const res = await axiosInstance.get(`/api/messages/${userId}`);
//       console.log("getMessages response:", res.data);
//       set({ messages: res.data });
//     } catch (error) {
//       toast.error(error.response.data.message);
//     } finally {
//       set({ isMessagesLoading: false });
//     }
//   },

//   subscribeToMessages: ()=>{
//    const {selectedUser} = get()
//    if(!selectedUser) return;

//    const socket = useAuthStore.getState().socket;

//    socket.on("newMessage",(newMessage)=>{
//     if(newMessage.senderId !== selectedUser._id) return;
//     set({
//       messages: [...get().messages,newMessage],
//     })
//    })
//   },

//   unsubscribeFromMessages:()=>{
//    const socket = useAuthStore.getState().socket;
//    socket.off("newMessage");
//   },


//   setSelectedUser: (selectedUser) => set({ selectedUser }),
// }))



import { create } from "zustand";
import axiosInstance from "./axiosinstance";
import { toast } from "react-toastify";
import { useAuthStore } from "./useAuthStore";

const getErrorMessage = (error, fallback) =>
  error?.response?.data?.message || fallback;

const sameId = (a, b) =>
  String(a?._id || a) === String(b?._id || b);

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  isUserLoading: false,
  selectedUser: null,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });

    try {
      const res = await axiosInstance.get("/api/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to load connections."));
    } finally {
      set({ isUserLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();

    if (!selectedUser) {
      toast.error("Select a connection first.");
      return;
    }

    try {
      const res = await axiosInstance.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData
      );

      // The socket can deliver this message before the HTTP response.
      set((state) => {
        const alreadyAdded = state.messages.some((message) =>
          sameId(message._id, res.data._id)
        );

        return {
          messages: alreadyAdded
            ? state.messages
            : [...state.messages, res.data],
        };
      });
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to send message."));
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true, messages: [] });

    try {
      const res = await axiosInstance.get(`/api/messages/${userId}`);

      // Ignore stale responses if the user switched chats mid-request.
      if (sameId(get().selectedUser?._id, userId)) {
        set({ messages: res.data });
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to load messages."));
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    const socket = useAuthStore.getState().socket;

    if (!selectedUser || !socket) return;

    socket.off("newMessage");

    socket.on("newMessage", (newMessage) => {
      const activeUser = get().selectedUser;
      if (!activeUser) return;

      const fromActiveUser = sameId(newMessage.senderId, activeUser._id);
      const toActiveUser = sameId(newMessage.receiverId, activeUser._id);

      if (!fromActiveUser && !toActiveUser) return;

      set((state) => {
        if (state.messages.some((message) => sameId(message._id, newMessage._id))) {
          return state;
        }

        return { messages: [...state.messages, newMessage] };
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off("newMessage");
  },

  setSelectedUser: (selectedUser) =>
    set({ selectedUser, messages: [] }),
}));
