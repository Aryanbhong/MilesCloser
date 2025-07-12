// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { validateEmail } from '../../utils/helper';
// import PasswordInput from '../../Components/input/PasswordInput';
// import axiosInstance from '../../utils/axiosinstance';
// import SignUpImg from '../../images/signup1.jpg'
// import { useAuthStore } from '../../utils/useAuthStore';

// const SignUp = () => {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState(null);

//   const { signUp } = useAuthStore();
//   const navigate = useNavigate();

//   const handleSubmit = async (event) =>{
//    event.preventDefault();

//    if(!validateEmail(email)){
//     setError("please enter a valid email address");
//     return;

//    }

//    if(!fullName){
//     setError("please enter your name");
//     return;
//    }
   
//    if(!password){
//     setError("please enter the password");
//     return;
//    }

//    setError("");
 

//    if(password != confirmPassword){
//     setError(" password and confirmPassword does'nt match");
//     return;
//    }

//    await signUp(fullName, email, password, navigate, setError);
//   }
//   return (
//     <div className='h-screen bg-gradient-to-r from-red-400 to-fuchsia-500 overflow-hidden relative'>
      
//       <div className='login-ui-box right-10 -top-40'/>
//       <div className='login-ui-box bg-pink-300 -bottom-40 right-1/2'/>
//      <div className='container h-screen flex items-center justify-center px-20 mx-auto'>
//       <div className="w-2/4 h-[90vh] flex items-end  bg-cover bg-center rounded-lg p-10 z-50" style={{ backgroundImage: `url(${SignUpImg})`}}>
//        <div>
//         <h4 className='[text-shadow:_0px_5px_4px_rgba(54,24,67,0.9)] text-5xl mb-70 text-white ml-56 font-semibold leading-[58px]'> 
//           Miles Apart,<br/> Hearts Together. </h4>
//         <p className='text-[15px] text-white leading-6 pr-7 ml-30 mt-4'>
//         Create Account now and start your journey of love and memories!"
//         </p>
//        </div>
//       </div>
       
//        <div className='w-2/4 h-[75vh] text-pink-600 bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20'>
//         <form onSubmit={handleSubmit}>
//           <h4 className='text-2xl font-semibold mb-7'> SignUp</h4>
           
          
//           <input 
//           type="text" 
//           placeholder='Full Name' 
//           className='input-box'
//           value={fullName}
//           onChange={({target})=>{setFullName(target.value)}}
//           />
          
//           <input 
//           type="text" 
//           placeholder='Email' 
//           className='input-box'
//           value={email}
//           onChange={({target})=>{setEmail(target.value)}}
//           />
          
//          <PasswordInput
//           value={password}
//           onChange={({target})=>{
//             setPassword(target.value);
//           }}
//          />
         
//          <PasswordInput
//           value={confirmPassword}
//           placeholder={"confirmPassword"}
//           onChange={({target})=>{
//             setConfirmPassword(target.value);
//           }
         
//         }
//          />

//          {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
//           <button type='submit' className='btn-primary'>
//             CREATE ACCOUNT
//           </button>

//           <p className='text-xs text-slate-500 text-center my-4'> Or</p>

//           <button 
//            type='submit'
//            className='btn-primary btn-light'
//            onClick={()=>{
//             navigate("/login");
//            }}
//           >
//           LOGIN
//           </button>
//         </form>
//        </div>
//      </div>
//     </div>
//   )
// }

// export default SignUp
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import PasswordInput from '../../Components/input/PasswordInput';
import axiosInstance from '../../utils/axiosinstance';
import SignUpImg from '../../images/signup1.jpg';
import { useAuthStore } from '../../utils/useAuthStore';
import { Camera } from 'lucide-react';

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState(null);

  const { signUp } = useAuthStore();
  const navigate = useNavigate();

   const handleImageChange = (e) => {
      // const file = e.target.files[0];
      // if (!file.type.startsWith("image/")) {
      //   toast.error("Please select an image file");
      //   return;
      // }
  
      // const reader = new FileReader();
      // reader.onloadend = () => {
      //   setProfileImage(reader.result);
      // };
      // reader.readAsDataURL(file);
      const file = e.target.files[0];
  if (!file || !file.type.startsWith("image/")) {
    toast.error("Please select a valid image file");
    return;
  }

  setProfileImage(file); // Save actual file

  // Optional: Preview
  const reader = new FileReader();
  reader.onloadend = () => {
    const preview = reader.result;
    document.getElementById("preview-img").src = preview;
  };
  reader.readAsDataURL(file);
    };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!fullName) {
      setError("Please enter your name");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password and Confirm Password don't match");
      return;
    }

    setError("");


    await signUp(fullName, email, password,profileImage, navigate, setError);
  };

  return (
    <div className='h-screen bg-gradient-to-r from-red-400 to-fuchsia-500 overflow-hidden relative'>
      <div className='login-ui-box right-10 -top-40' />
      <div className='login-ui-box bg-pink-300 -bottom-40 right-1/2' />
      <div className='container h-screen flex items-center justify-center px-20 mx-auto'>
        <div
          className="w-2/4 h-[90vh] flex items-end bg-cover bg-center rounded-lg p-10 z-50"
          style={{ backgroundImage: `url(${SignUpImg})` }}
        >
          <div>
            <h4 className='[text-shadow:_0px_5px_4px_rgba(54,24,67,0.9)] text-5xl mb-70 text-white ml-56 font-semibold leading-[58px]'>
              Miles Apart,<br /> Hearts Together.
            </h4>
            <p className='text-[15px] text-white leading-6 pr-7 ml-30 mt-4'>
              Create Account now and start your journey of love and memories!"
            </p>
          </div>
        </div>

        <div className='w-2/4 h-[75vh] text-pink-600 bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20 overflow-y-auto'>
          <form onSubmit={handleSubmit}>
            <h4 className='text-2xl font-semibold mb-7'> SignUp</h4>

            {/* Profile Image Upload */}
           <label className="cursor-pointer flex flex-row items-center gap-2 text-sm text-pink-600">
           <Camera/>
         <span>Upload Profile Photo</span>
         <input
         type="file"
         accept="image/*"
         className="hidden"
         onChange={handleImageChange}
          />
          {profileImage && (
              // <img
              //   src={profileImage}
              //   alt="Preview"
              //   className="w-16 h-16 rounded-full object-cover mb-4"
              // />
              <img
  id="preview-img"
  alt="Preview"
  className="w-16 h-16 rounded-full object-cover mb-4"
/>
            )}
        </label>

            
          

            <input
              type="text"
              placeholder='Full Name'
              className='input-box'
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
            />

            <input
              type="text"
              placeholder='Email'
              className='input-box'
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />

            <PasswordInput
              value={password}
              onChange={({ target }) => {
                setPassword(target.value);
              }}
            />

            <PasswordInput
              value={confirmPassword}
              placeholder={"Confirm Password"}
              onChange={({ target }) => {
                setConfirmPassword(target.value);
              }}
            />

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

            <button type='submit' className='btn-primary'>
              CREATE ACCOUNT
            </button>

            <p className='text-xs text-slate-500 text-center my-4'>Or</p>

            <button
              type='button'
              className='btn-primary btn-light'
              onClick={() => navigate("/login")}
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
