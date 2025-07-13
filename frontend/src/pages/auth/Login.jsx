// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { validateEmail } from '../../utils/helper';
// import PasswordInput from '../../Components/input/PasswordInput';
// import axiosInstance from '../../utils/axiosinstance';
// import loginImg from "../../images/login.jpg"
// import { useAuthStore } from '../../utils/useAuthStore';


// const Login = () => {
  
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const login = useAuthStore((state) => state.login)

//   const navigate = useNavigate();

//   const handleSubmit = async (event) =>{
//    event.preventDefault();

//    if(!validateEmail(email)){
//     setError("please enter a valid email address");
//     return;

//    }
   
//    if(!password){
//     setError("please enter the password");
//     return;
//    }

//    setError("");
//   await login(email, password, navigate, setError);
//   }
//   return (
//     <div className='h-screen bg-gradient-to-r from-red-400 to-fuchsia-500 overflow-hidden relative'>
      
//       <div className='login-ui-box right-10 -top-40'/>
//       <div className='login-ui-box bg-pink-300 -bottom-40 right-1/2'/>
//      <div className='container h-screen flex items-center justify-center px-20 mx-auto'>
//       <div className="w-2/4  bg-cover bg-center h-[90vh] flex items-end  rounded-lg p-10 z-50" style={{ backgroundImage: `url(${loginImg})`}}>
//       {/* <img src={loginImg} alt="" className='  bg-cover bg-center rounded-lg p-10 z-50'/> */}
//        <div>
//         <h4 className='[text-shadow:_0px_5px_4px_rgba(54,24,67,0.9)] text-5xl text-white font-semibold leading-[58px]'> 
//           Stay Close,<br/> Even When Far. </h4>
//         <p className='text-[15px] text-white leading-6 pr-7 mt-4'>
//           Record You day experience and memories in your personal Journal
//         </p>
//        </div>
//       </div>
       
//        <div className='w-2/4 h-[75vh] text-pink-700 bg-white rounded-r-lg rounded-lg relative p-16 shadow-lg shadow-cyan-200/20'>
//         <form onSubmit={handleSubmit}>
//           <h4 className='text-2xl font-semibold mb-7'> login</h4>

//           <input type="text" placeholder='Email' className='input-box'
//            value={email}
//            onChange={({target})=>{setEmail(target.value)}}
//           />
          
//          <PasswordInput
//           value={password}
//           onChange={({target})=>{
//             setPassword(target.value);
//           }}
//          />

//          {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
//           <button type='submit' className='btn-primary'>
//             LOGIN
//           </button>

//           <p className='text-xs text-slate-500 text-center my-4'> Or</p>

//           <button 
//            type='submit'
//            className='btn-primary btn-light'
//            onClick={()=>{
//             navigate("/signUp");
//            }}
//           >
//           CREATE ACCOUNT
//           </button>
//         </form>
//        </div>
//      </div>
//     </div>
//   )
// }

// export default Login

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import PasswordInput from '../../Components/input/PasswordInput';
import axiosInstance from '../../utils/axiosinstance';
import loginImg from "../../images/login.jpg";
import { useAuthStore } from '../../utils/useAuthStore';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");
    await login(email, password, navigate, setError);
  };

  return (
    <div className="min-h-screen  py-10 px-4 h-screen bg-gradient-to-r from-red-400 to-fuchsia-500 overflow-hidden relative">
      {/* UI Decorations */}
      <div className="login-ui-box right-10 -top-40 absolute z-[-1]" />
      <div className="login-ui-box bg-pink-300 -bottom-40 right-1/2 absolute z-[-1] " />

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center h-full gap-10 container  px-20 ">
        {/* Left Section - Image */}
        <div
          className="w-full lg:w-2/4 h-[300px] sm:h-[400px] lg:h-[90vh] bg-cover bg-center rounded-lg p-8 flex items-end shadow-lg"
          style={{ backgroundImage: `url(${loginImg})` }}
        >
          <div className="text-white">
            <h4 className="text-4xl sm:text-5xl font-semibold leading-tight drop-shadow-lg">
              Stay Close,<br /> Even When Far.
            </h4>
            <p className="text-sm sm:text-base mt-4 pr-5">
              Record your day experiences and memories in your personal journal.
            </p>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full lg:w-2/4 bg-white rounded-lg p-6 sm:p-10 shadow-lg text-pink-700">
          <form onSubmit={handleSubmit}>
            <h4 className="text-2xl font-semibold mb-6 text-center">Login</h4>

            <input
              type="text"
              placeholder="Email"
              className="input-box w-full mb-4"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />

            <PasswordInput
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />

            {error && <p className="text-red-500 text-sm pt-1 pb-3">{error}</p>}

            <button type="submit" className="btn-primary w-full mb-3">
              LOGIN
            </button>

            <p className="text-xs text-slate-500 text-center my-4">Or</p>

            <button
              type="button"
              className="btn-primary btn-light w-full"
              onClick={() => navigate("/signUp")}
            >
              CREATE ACCOUNT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
