import { useEffect, useState } from 'react'
import { BrowserRouter, useLocation, useNavigate  } from 'react-router-dom'
import { Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from "./pages/auth/Login"
import SignUp from "./pages/auth/SignUp"
import Home from './pages/home/Home'
import "react-day-picker/style.css";
import HomePage from './pages/home/HomePage'
import ProfilePage from "./pages/auth/ProfilePage"
import ChatPage from './pages/chat/ChatPage'
import Layout from './pages/home/layout'
import Navbar from './Components/Navbar'
import { useAuthStore } from './utils/useAuthStore'
import axiosInstance from './utils/axiosinstance'

 
function App() {
const location = useLocation();
const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore()
const [userInfo, setUserInfo] = useState(null);
const navigate = useNavigate();
console.log({onlineUsers})
const hideNavbarOn = ['/dashboard', '/login', '/signUp', '/home']; // ✅ defined
const shouldHideNavbar = hideNavbarOn.includes(location.pathname); // ✅ usage


const PrivateRoute = ({ children }) => {
const token = localStorage.getItem("token");
return token ? children : <Navigate to="/home" />;
};
const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get("/get-user");
    if (response.data?.user) {
      setUserInfo(response.data.user);
    }
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      // Only redirect to login if you're on a private route
      const protectedRoutes = ['/dashboard', '/chat', '/profile'];
      if (protectedRoutes.includes(location.pathname)) {
        navigate("/login");
      }
    }
  }
  useEffect(() => {
  checkAuth();
  
  const publicRoutes = ['/', '/home', '/login', '/signUp'];
  if (!publicRoutes.includes(location.pathname)) {
    getUserInfo(); // only fetch user info on protected routes
  }
}, [location.pathname]);

};


  return (
    <div>
      {!shouldHideNavbar && <Navbar userInfo={userInfo} />}

  <Routes>
  <Route path='/' element={<Root />} />
  <Route path='/home' element={<HomePage />} />
  <Route path='/login' element={<Login />} />
  <Route path='/signUp' element={<SignUp />} />

  
  <Route path='/dashboard' element={
    <PrivateRoute><Home /></PrivateRoute>
  } />
  <Route path='/profile' element={
    <PrivateRoute><ProfilePage /></PrivateRoute>
  } />
  <Route path='/chat' element={
    <PrivateRoute><ChatPage /></PrivateRoute>
  } />
</Routes>

    </div>
  );
}

const Root = () => {
  return <Navigate to="/home" />;
};


export default App
