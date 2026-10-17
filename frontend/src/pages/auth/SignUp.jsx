// // // import React, { useState } from 'react'
// // // import { useNavigate } from 'react-router-dom'
// // // import { validateEmail } from '../../utils/helper';
// // // import PasswordInput from '../../Components/input/PasswordInput';
// // // import axiosInstance from '../../utils/axiosinstance';
// // // import SignUpImg from '../../images/signup1.jpg'
// // // import { useAuthStore } from '../../utils/useAuthStore';

// // // const SignUp = () => {
// // //   const [fullName, setFullName] = useState("");
// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const [confirmPassword, setConfirmPassword] = useState("");
// // //   const [error, setError] = useState(null);

// // //   const { signUp } = useAuthStore();
// // //   const navigate = useNavigate();

// // //   const handleSubmit = async (event) =>{
// // //    event.preventDefault();

// // //    if(!validateEmail(email)){
// // //     setError("please enter a valid email address");
// // //     return;

// // //    }

// // //    if(!fullName){
// // //     setError("please enter your name");
// // //     return;
// // //    }
   
// // //    if(!password){
// // //     setError("please enter the password");
// // //     return;
// // //    }

// // //    setError("");
 

// // //    if(password != confirmPassword){
// // //     setError(" password and confirmPassword does'nt match");
// // //     return;
// // //    }

// // //    await signUp(fullName, email, password, navigate, setError);
// // //   }
// // //   return (
// // //     <div className='h-screen bg-gradient-to-r from-red-400 to-fuchsia-500 overflow-hidden relative'>
      
// // //       <div className='login-ui-box right-10 -top-40'/>
// // //       <div className='login-ui-box bg-pink-300 -bottom-40 right-1/2'/>
// // //      <div className='container h-screen flex items-center justify-center px-20 mx-auto'>
// // //       <div className="w-2/4 h-[90vh] flex items-end  bg-cover bg-center rounded-lg p-10 z-50" style={{ backgroundImage: `url(${SignUpImg})`}}>
// // //        <div>
// // //         <h4 className='[text-shadow:_0px_5px_4px_rgba(54,24,67,0.9)] text-5xl mb-70 text-white ml-56 font-semibold leading-[58px]'> 
// // //           Miles Apart,<br/> Hearts Together. </h4>
// // //         <p className='text-[15px] text-white leading-6 pr-7 ml-30 mt-4'>
// // //         Create Account now and start your journey of love and memories!"
// // //         </p>
// // //        </div>
// // //       </div>
       
// // //        <div className='w-2/4 h-[75vh] text-pink-600 bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20'>
// // //         <form onSubmit={handleSubmit}>
// // //           <h4 className='text-2xl font-semibold mb-7'> SignUp</h4>
           
          
// // //           <input 
// // //           type="text" 
// // //           placeholder='Full Name' 
// // //           className='input-box'
// // //           value={fullName}
// // //           onChange={({target})=>{setFullName(target.value)}}
// // //           />
          
// // //           <input 
// // //           type="text" 
// // //           placeholder='Email' 
// // //           className='input-box'
// // //           value={email}
// // //           onChange={({target})=>{setEmail(target.value)}}
// // //           />
          
// // //          <PasswordInput
// // //           value={password}
// // //           onChange={({target})=>{
// // //             setPassword(target.value);
// // //           }}
// // //          />
         
// // //          <PasswordInput
// // //           value={confirmPassword}
// // //           placeholder={"confirmPassword"}
// // //           onChange={({target})=>{
// // //             setConfirmPassword(target.value);
// // //           }
         
// // //         }
// // //          />

// // //          {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
// // //           <button type='submit' className='btn-primary'>
// // //             CREATE ACCOUNT
// // //           </button>

// // //           <p className='text-xs text-slate-500 text-center my-4'> Or</p>

// // //           <button 
// // //            type='submit'
// // //            className='btn-primary btn-light'
// // //            onClick={()=>{
// // //             navigate("/login");
// // //            }}
// // //           >
// // //           LOGIN
// // //           </button>
// // //         </form>
// // //        </div>
// // //      </div>
// // //     </div>
// // //   )
// // // }

// // // export default SignUp
// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { validateEmail } from '../../utils/helper';
// // import PasswordInput from '../../Components/input/PasswordInput';
// // import axiosInstance from '../../utils/axiosinstance';
// // import SignUpImg from '../../images/signup1.jpg';
// // import { useAuthStore } from '../../utils/useAuthStore';
// // import { Camera } from 'lucide-react';

// // const SignUp = () => {
// //   const [fullName, setFullName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [confirmPassword, setConfirmPassword] = useState("");
// //   const [profileImage, setProfileImage] = useState(null);
// //   const [error, setError] = useState(null);

// //   const { signUp } = useAuthStore();
// //   const navigate = useNavigate();

// //    const handleImageChange = (e) => {
// //       // const file = e.target.files[0];
// //       // if (!file.type.startsWith("image/")) {
// //       //   toast.error("Please select an image file");
// //       //   return;
// //       // }
  
// //       // const reader = new FileReader();
// //       // reader.onloadend = () => {
// //       //   setProfileImage(reader.result);
// //       // };
// //       // reader.readAsDataURL(file);
// //       const file = e.target.files[0];
// //   if (!file || !file.type.startsWith("image/")) {
// //     toast.error("Please select a valid image file");
// //     return;
// //   }

// //   setProfileImage(file); // Save actual file

// //   // Optional: Preview
// //   const reader = new FileReader();
// //   reader.onloadend = () => {
// //     const preview = reader.result;
// //     document.getElementById("preview-img").src = preview;
// //   };
// //   reader.readAsDataURL(file);
// //     };

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();

// //     if (!validateEmail(email)) {
// //       setError("Please enter a valid email address");
// //       return;
// //     }

// //     if (!fullName) {
// //       setError("Please enter your name");
// //       return;
// //     }

// //     if (!password) {
// //       setError("Please enter the password");
// //       return;
// //     }

// //     if (password !== confirmPassword) {
// //       setError("Password and Confirm Password don't match");
// //       return;
// //     }

// //     setError("");


// //     await signUp(fullName, email, password,profileImage, navigate, setError);
// //   };

// //   return (
// //     <div className='h-screen bg-gradient-to-r from-red-400 to-fuchsia-500 overflow-hidden relative'>
// //       <div className='login-ui-box right-10 -top-40' />
// //       <div className='login-ui-box bg-pink-300 -bottom-40 right-1/2' />
// //       <div className='container h-screen flex items-center justify-center px-20 mx-auto'>
// //         <div
// //           className="w-2/4 h-[90vh] flex items-end bg-cover bg-center rounded-lg p-10 z-50"
// //           style={{ backgroundImage: `url(${SignUpImg})` }}
// //         >
// //           <div>
// //             <h4 className='[text-shadow:_0px_5px_4px_rgba(54,24,67,0.9)] text-5xl mb-70 text-white ml-56 font-semibold leading-[58px]'>
// //               Miles Apart,<br /> Hearts Together.
// //             </h4>
// //             <p className='text-[15px] text-white leading-6 pr-7 ml-30 mt-4'>
// //               Create Account now and start your journey of love and memories!"
// //             </p>
// //           </div>
// //         </div>

// //         <div className='w-2/4 h-[75vh] text-pink-600 bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20 overflow-y-auto'>
// //           <form onSubmit={handleSubmit}>
// //             <h4 className='text-2xl font-semibold mb-7'> SignUp</h4>

// //             {/* Profile Image Upload */}
// //            <label className="cursor-pointer flex flex-row items-center gap-2 text-sm text-pink-600">
// //            <Camera/>
// //          <span>Upload Profile Photo</span>
// //          <input
// //          type="file"
// //          accept="image/*"
// //          className="hidden"
// //          onChange={handleImageChange}
// //           />
// //           {profileImage && (
// //               // <img
// //               //   src={profileImage}
// //               //   alt="Preview"
// //               //   className="w-16 h-16 rounded-full object-cover mb-4"
// //               // />
// //               <img
// //   id="preview-img"
// //   alt="Preview"
// //   className="w-16 h-16 rounded-full object-cover mb-4"
// // />
// //             )}
// //         </label>

            
          

// //             <input
// //               type="text"
// //               placeholder='Full Name'
// //               className='input-box'
// //               value={fullName}
// //               onChange={({ target }) => setFullName(target.value)}
// //             />

// //             <input
// //               type="text"
// //               placeholder='Email'
// //               className='input-box'
// //               value={email}
// //               onChange={({ target }) => setEmail(target.value)}
// //             />

// //             <PasswordInput
// //               value={password}
// //               onChange={({ target }) => {
// //                 setPassword(target.value);
// //               }}
// //             />

// //             <PasswordInput
// //               value={confirmPassword}
// //               placeholder={"Confirm Password"}
// //               onChange={({ target }) => {
// //                 setConfirmPassword(target.value);
// //               }}
// //             />

// //             {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

// //             <button type='submit' className='btn-primary'>
// //               CREATE ACCOUNT
// //             </button>

// //             <p className='text-xs text-slate-500 text-center my-4'>Or</p>

// //             <button
// //               type='button'
// //               className='btn-primary btn-light'
// //               onClick={() => navigate("/login")}
// //             >
// //               LOGIN
// //             </button>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SignUp;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { validateEmail } from '../../utils/helper';
// import PasswordInput from '../../Components/input/PasswordInput';
// import axiosInstance from '../../utils/axiosinstance';
// import SignUpImg from '../../images/signup1.jpg';
// import { useAuthStore } from '../../utils/useAuthStore';
// import { Camera } from 'lucide-react';

// const SignUp = () => {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [profileImage, setProfileImage] = useState(null);
//   const [error, setError] = useState(null);

//   const { signUp } = useAuthStore();
//   const navigate = useNavigate();

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file || !file.type.startsWith("image/")) {
//       toast.error("Please select a valid image file");
//       return;
//     }

//     setProfileImage(file);

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       document.getElementById("preview-img").src = reader.result;
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!validateEmail(email)) {
//       setError("Please enter a valid email address");
//       return;
//     }

//     if (!fullName) {
//       setError("Please enter your name");
//       return;
//     }

//     if (!password) {
//       setError("Please enter the password");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Password and Confirm Password don't match");
//       return;
//     }

//     setError("");
//     await signUp(fullName, email, password, profileImage, navigate, setError);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-red-400 to-fuchsia-500 overflow-hidden py-10 px-4 relative">
//       <div className="login-ui-box right-10 -top-40 absolute z-[-1]" />
//       <div className="login-ui-box bg-pink-300 -bottom-40 right-1/2 absolute z-[-1]" />

//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-10">
//         {/* Left - Image */}
//         <div
//           className="w-full lg:w-2/4 h-[300px] sm:h-[400px] lg:h-[90vh] flex items-end bg-cover bg-center rounded-lg p-8 shadow-lg"
//           style={{ backgroundImage: `url(${SignUpImg})` }}
//         >
//           <div className="text-white">
//             <h4 className="text-4xl sm:text-5xl font-semibold leading-tight drop-shadow-lg text-center lg:text-left">
//               Miles Apart,<br /> Hearts Together.
//             </h4>
//             <p className="text-sm sm:text-base mt-4">
//               Create your account now and start your journey of love and memories!
//             </p>
//           </div>
//         </div>

//         {/* Right - Form */}
//         <div className="w-full lg:w-2/4 bg-white text-pink-600 rounded-lg p-6 sm:p-10 shadow-lg max-h-[90vh] overflow-y-auto">
//           <form onSubmit={handleSubmit}>
//             <h4 className="text-2xl font-semibold mb-6 text-center">Sign Up</h4>

//             {/* Profile Image */}
//             <label className="cursor-pointer flex items-center gap-2 text-sm mb-4">
//               <Camera />
//               <span>Upload Profile Photo</span>
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleImageChange}
//               />
//             </label>

//             {profileImage && (
//               <img
//                 id="preview-img"
//                 alt="Preview"
//                 className="w-16 h-16 rounded-full object-cover mb-4"
//               />
//             )}

//             <input
//               type="text"
//               placeholder="Full Name"
//               className="input-box w-full mb-4"
//               value={fullName}
//               onChange={({ target }) => setFullName(target.value)}
//             />

//             <input
//               type="text"
//               placeholder="Email"
//               className="input-box w-full mb-4"
//               value={email}
//               onChange={({ target }) => setEmail(target.value)}
//             />

//             <PasswordInput
//               value={password}
//               onChange={({ target }) => setPassword(target.value)}
//             />

//             <PasswordInput
//               value={confirmPassword}
//               placeholder="Confirm Password"
//               onChange={({ target }) => setConfirmPassword(target.value)}
//             />

//             {error && <p className="text-red-500 text-sm mt-2 mb-3">{error}</p>}

//             <button type="submit" className="btn-primary w-full mb-4">
//               CREATE ACCOUNT
//             </button>

//             <p className="text-xs text-slate-500 text-center mb-4">Or</p>

//             <button
//               type="button"
//               className="btn-primary btn-light w-full"
//               onClick={() => navigate("/login")}
//             >
//               LOGIN
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import PasswordInput from "../../Components/input/PasswordInput";
import SignUpImg from "../../images/signup1.jpg";
import { useAuthStore } from "../../utils/useAuthStore";
import { Camera, Heart, ArrowRight, ImagePlus } from "lucide-react";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuthStore();
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Please choose an image smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    setError("");
    setProfileImage(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!fullName.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await signUp(
        fullName.trim(),
        email,
        password,
        profileImage,
        navigate,
        setError
      );
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-pink-100 to-pink-300 px-4 py-6 sm:px-8 lg:px-12">

      {/* Background glow */}
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 animate-pulse rounded-full bg-pink-300/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 animate-pulse rounded-full bg-rose-300/50 blur-3xl [animation-delay:1000ms]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-3xl" />

      {/* Floating hearts */}
      <span className="pointer-events-none absolute left-[7%] top-[20%] animate-bounce text-3xl text-pink-400/70 [animation-duration:3s]">
        ♡
      </span>
      <span className="pointer-events-none absolute right-[8%] top-[28%] animate-pulse text-4xl text-rose-400/70">
        ♥
      </span>
      <span className="pointer-events-none absolute bottom-[10%] left-[12%] animate-bounce text-2xl text-pink-500/60 [animation-duration:4s]">
        ✧
      </span>

      {/* Navbar */}
      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold italic tracking-tight text-pink-700 transition duration-300 hover:scale-105 sm:text-2xl"
        >
          <Heart size={32} strokeWidth={2.5} />
          MilesCloser
        </Link>

        <Link
          to="/"
          className="rounded-full border border-white/80 bg-white/40 px-5 py-2.5 text-sm font-semibold text-pink-700 shadow-sm backdrop-blur-xl transition hover:bg-white/75"
        >
          ← Home
        </Link>
      </nav>

      {/* Main content */}
      <section className="relative z-10 mx-auto flex max-w-6xl items-center justify-center py-8 sm:py-10">

        <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/80 bg-white/25 shadow-2xl shadow-pink-500/15 backdrop-blur-2xl lg:grid-cols-2 lg:rounded-[2.5rem]">

          {/* Left image panel */}
          <div className="group relative min-h-[300px] overflow-hidden sm:min-h-[400px] lg:min-h-[760px]">

            <img
              src={SignUpImg}
              alt="Welcome to MilesCloser"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-rose-950/85 via-pink-950/15 to-rose-900/10" />
            <div className="absolute inset-0 bg-gradient-to-br from-pink-300/10 to-transparent" />

            {/* Image badge */}
            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-4 py-2 text-xs font-semibold tracking-wider text-white shadow-lg backdrop-blur-xl sm:left-8 sm:top-8">
              <Heart size={14} />
              YOUR LITTLE WORLD
            </div>

            {/* Image text */}
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10 lg:p-12">

              <span className="mb-4 inline-block text-sm font-medium tracking-widest text-pink-100">
                TWO HEARTS · ONE SPACE
              </span>

              <h1 className="text-4xl font-extrabold leading-tight drop-shadow-lg sm:text-5xl lg:text-6xl">
                Miles Apart,
                <br />
                Hearts
                <br />
                <span className="italic text-pink-200">
                  Together.
                </span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-white/90 sm:text-base">
                Create your account and build a little world filled with
                shared thoughts, daily memories, and meaningful moments.
              </p>

              <div className="mt-7 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/20 backdrop-blur-lg">
                  <Heart size={19} />
                </div>
                <p className="text-sm italic text-white/90">
                  Every great story starts somewhere.
                </p>
              </div>
            </div>
          </div>

          {/* Right signup form */}
          <div className="relative flex items-center justify-center p-5 sm:p-9 lg:p-10">

            <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-pink-200/50 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-rose-200/40 blur-3xl" />

            <div className="relative w-full max-w-md animate-[signupFade_0.8s_ease-out_both]">

              {/* Form heading */}
              <div className="mb-7 text-center">

                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white bg-gradient-to-br from-white to-pink-200 text-pink-600 shadow-lg shadow-pink-500/10 transition duration-300 hover:rotate-6 hover:scale-110">
                  <Heart size={30} />
                </div>

                <p className="text-xs font-bold tracking-[0.25em] text-pink-600">
                  YOUR STORY STARTS HERE
                </p>

                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-rose-950 sm:text-4xl">
                  Let's get
                  <span className="ml-2 bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-transparent">
                    closer.
                  </span>
                </h2>

                <p className="mt-3 text-sm leading-6 text-rose-950/60">
                  Create your account and make room for more memories.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate>

                {/* Profile photo upload */}
                <div className="mb-6 flex items-center gap-4 rounded-2xl border border-white/90 bg-white/35 p-4 shadow-sm backdrop-blur-xl transition duration-300 hover:bg-white/55">

                  <label
                    htmlFor="profile-upload"
                    className="group relative flex h-[68px] w-[68px] shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-pink-300 bg-gradient-to-br from-white to-pink-100 transition duration-300 hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/15"
                  >
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Profile preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-pink-500">
                        <ImagePlus size={25} />
                        <span className="text-[9px] font-semibold">
                          PHOTO
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 flex items-center justify-center bg-rose-950/45 text-white opacity-0 transition group-hover:opacity-100">
                      <Camera size={22} />
                    </div>
                  </label>

                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />

                  <div className="min-w-0">
                    <p className="text-sm font-bold text-rose-950">
                      Your profile photo
                    </p>
                    <p className="mt-1 text-xs leading-5 text-rose-950/55">
                      Add a photo to personalise your account.
                    </p>
                    <label
                      htmlFor="profile-upload"
                      className="mt-1 inline-block cursor-pointer text-xs font-bold text-pink-600 transition hover:text-rose-700"
                    >
                      {profileImage ? "Change photo" : "Upload photo"} ↗
                    </label>
                  </div>
                </div>

                {/* Full name */}
                <label
                  htmlFor="signup-name"
                  className="mb-2 block text-sm font-semibold text-rose-900"
                >
                  Full name
                </label>

                <input
                  id="signup-name"
                  type="text"
                  autoComplete="name"
                  placeholder="What should we call you?"
                  className="mb-4 w-full rounded-2xl border border-white/90 bg-white/50 px-4 py-3.5 text-sm text-rose-950 shadow-sm outline-none backdrop-blur-xl transition duration-300 placeholder:text-rose-400/70 focus:border-pink-300 focus:bg-white/80 focus:ring-4 focus:ring-pink-200/40"
                  value={fullName}
                  onChange={(event) => {
                    setFullName(event.target.value);
                    if (error) setError("");
                  }}
                />

                {/* Email */}
                <label
                  htmlFor="signup-email"
                  className="mb-2 block text-sm font-semibold text-rose-900"
                >
                  Email address
                </label>

                <input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="mb-4 w-full rounded-2xl border border-white/90 bg-white/50 px-4 py-3.5 text-sm text-rose-950 shadow-sm outline-none backdrop-blur-xl transition duration-300 placeholder:text-rose-400/70 focus:border-pink-300 focus:bg-white/80 focus:ring-4 focus:ring-pink-200/40"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (error) setError("");
                  }}
                />

                {/* Password */}
                <label
                  className="mb-2 block text-sm font-semibold text-rose-900"
                >
                  Password
                </label>

                <div className="mb-4 rounded-2xl border border-white/90 bg-white/50 px-3 shadow-sm backdrop-blur-xl transition duration-300 focus-within:border-pink-300 focus-within:bg-white/80 focus-within:ring-4 focus-within:ring-pink-200/40 [&_input]:!border-0 [&_input]:!bg-transparent [&_input]:!shadow-none [&_input]:!outline-none">
                  <PasswordInput
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      if (error) setError("");
                    }}
                  />
                </div>

                {/* Confirm password */}
                <label className="mb-2 block text-sm font-semibold text-rose-900">
                  Confirm password
                </label>

                <div className="rounded-2xl border border-white/90 bg-white/50 px-3 shadow-sm backdrop-blur-xl transition duration-300 focus-within:border-pink-300 focus-within:bg-white/80 focus-within:ring-4 focus-within:ring-pink-200/40 [&_input]:!border-0 [&_input]:!bg-transparent [&_input]:!shadow-none [&_input]:!outline-none">
                  <PasswordInput
                    value={confirmPassword}
                    placeholder="Re-enter your password"
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                      if (error) setError("");
                    }}
                  />
                </div>

                {/* Error message */}
                {error && (
                  <div
                    role="alert"
                    className="mt-4 rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-600"
                  >
                    {error}
                  </div>
                )}

                {/* Create account */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 py-4 font-bold text-white shadow-xl shadow-pink-500/25 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-500/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {loading ? "Creating your account..." : "Create My Account"}
                  {!loading && (
                    <ArrowRight
                      size={19}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  )}
                </button>

                {/* Login link */}
                <div className="my-5 flex items-center gap-4">
                  <div className="h-px flex-1 bg-pink-200/80" />
                  <span className="text-xs font-medium text-rose-400">
                    ALREADY A MEMBER?
                  </span>
                  <div className="h-px flex-1 bg-pink-200/80" />
                </div>

                <Link
                  to="/login"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/90 bg-white/35 py-3.5 text-sm font-bold text-pink-700 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/75 hover:shadow-lg hover:shadow-pink-500/10"
                >
                  Log In to Your Account
                  <Heart size={16} />
                </Link>
              </form>

              <p className="mt-6 text-center text-xs text-rose-950/50">
                Made with a little love, for your little world. ♡
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Entrance animation */}
      <style>{`
        @keyframes signupFade {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
};

export default SignUp;



