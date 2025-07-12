import {create} from 'zustand'
import axiosInstance from './axiosinstance';
import { toast } from 'react-toastify';
import { io} from "socket.io-client"
const BASE_URL ="http://localhost:8000"

export const useAuthStore = create((set,get) =>({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp:false,
    isLoggingIn: false,
    isUpDatingProfile: false,
    onlineUsers:[],
    socket:null,
    

    checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/api/auth/checkAuth");

      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },




    login: async (email, password, navigate, setError) => {
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post("/signIn", {
        email,
        password,
      });

      if (res.data && res.data.accessToken) {
        localStorage.setItem("token", res.data.accessToken);
        set({ authUser: res.data.user });
        toast.success("Login successful");

        get().connectSocket();

        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      set({ isLoggingIn: false });
    }
  },
    
  //   signUp: async (fullName, email, password, profileImage,navigate,setError) => {
  //   set({ isSigningUp: true });

  //   try {
  //     const response = await axiosInstance.post("/create-account", {
  //       fullName,
  //       email,
  //       password,
  //       profileImage,
  //     });

  //     if (response.data && response.data.accessToken) {
  //       localStorage.setItem("token", response.data.accessToken);
  //       set({ authUser: response.data.user });
  //       toast.success("Account created successfully");
  //        navigate("/dashboard");

  //       get().connectSocket()
       
  //     }
  //   } catch (error) {
  //     if (
  //       error.response &&
  //       error.response.data &&
  //       error.response.data.message
  //     ) {
  //       setError(error.response.data.message);
  //     } else {
  //       setError("An unexpected error occurred. Please try again.");
  //     }
  //   } finally {
  //     set({ isSigningUp: false });
  //   }
  // },  
    signUp: async (fullName, email, password, profileFile, navigate, setError) => {
  set({ isSigningUp: true });

  try {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    if (profileFile) formData.append("profile", profileFile);
    console.log("profile imagee", profileFile)
    const res = await axiosInstance.post("/create-account", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    set({ authUser: res.data.user });
    toast.success("Signup successful!");
    navigate("/home");
  } catch (error) {
    setError(error?.response?.data?.message || "Something went wrong");
  } finally {
    set({ isSigningUp: false });
  }
},




  logout: (navigate) => {
    localStorage.clear();
    set({ authUser: null });
    navigate('/home');
    toast.info("You have been logged out");
    get().disconnectSocket();
  },

    updateProfile: async (data) => {
  set({ isUpdatingProfile: true });

  try {
    console.log("ye data", data); // Should log: { profile: 'https://res.cloudinary.com/...jpg' }

    const res = await axiosInstance.put("/updateProfile", data);

    set({ authUser: res.data });
    toast.success("Profile updated successfully");
  } catch (error) {
    console.log("error in update profile:", error);
    toast.error(error?.response?.data?.message || "Failed to update profile");
  } finally {
    set({ isUpdatingProfile: false });
  }
},


connectSocket: () =>{
 const { socket: existingSocket, authUser } = get();
  if (existingSocket?.connected) return;

  const newSocket = io(BASE_URL, {
    withCredentials: true,
    query:{
      userId: authUser.userId,
    }
  });

  newSocket.connect();

  newSocket.on("connect", () => {
    console.log("Connected to socket server:", newSocket.id);
  });

  set({ socket: newSocket });
  
  newSocket.on("getOnlineUsers" ,(userIds)=>{
    set({onlineUsers: userIds})
  })
},



disconnectSocket:()=>{
   const socket = get().socket;
  if (socket?.connected) {
    socket.disconnect();
    socket.off(); 
    console.log("Socket disconnected");
  }
  set({ socket: null });
},
}))



