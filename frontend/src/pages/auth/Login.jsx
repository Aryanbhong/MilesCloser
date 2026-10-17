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

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { validateEmail } from '../../utils/helper';
// import PasswordInput from '../../Components/input/PasswordInput';
// import axiosInstance from '../../utils/axiosinstance';
// import loginImg from "../../images/login.jpg";
// import { useAuthStore } from '../../utils/useAuthStore';

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const login = useAuthStore((state) => state.login);
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!validateEmail(email)) {
//       setError("Please enter a valid email address");
//       return;
//     }

//     if (!password) {
//       setError("Please enter the password");
//       return;
//     }

//     setError("");
//     await login(email, password, navigate, setError);
//   };

//   return (
//     <div className="min-h-screen  py-10 px-4 h-screen bg-gradient-to-r from-red-400 to-fuchsia-500 overflow-hidden relative">
//       {/* UI Decorations */}
//       <div className="login-ui-box right-10 -top-40 absolute z-[-1]" />
//       <div className="login-ui-box bg-pink-300 -bottom-40 right-1/2 absolute z-[-1] " />

//       {/* Main Layout */}
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center h-full gap-10 container  px-20 ">
//         {/* Left Section - Image */}
//         <div
//           className="w-full lg:w-2/4 h-[300px] sm:h-[400px] lg:h-[90vh] bg-cover bg-center rounded-lg p-8 flex items-end shadow-lg"
//           style={{ backgroundImage: `url(${loginImg})` }}
//         >
//           <div className="text-white">
//             <h4 className="text-4xl sm:text-5xl font-semibold leading-tight drop-shadow-lg">
//               Stay Close,<br /> Even When Far.
//             </h4>
//             <p className="text-sm sm:text-base mt-4 pr-5">
//               Record your day experiences and memories in your personal journal.
//             </p>
//           </div>
//         </div>

//         {/* Right Section - Form */}
//         <div className="w-full lg:w-2/4 bg-white rounded-lg p-6 sm:p-10 shadow-lg text-pink-700">
//           <form onSubmit={handleSubmit}>
//             <h4 className="text-2xl font-semibold mb-6 text-center">Login</h4>

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

//             {error && <p className="text-red-500 text-sm pt-1 pb-3">{error}</p>}

//             <button type="submit" className="btn-primary w-full mb-3">
//               LOGIN
//             </button>

//             <p className="text-xs text-slate-500 text-center my-4">Or</p>

//             <button
//               type="button"
//               className="btn-primary btn-light w-full"
//               onClick={() => navigate("/signUp")}
//             >
//               CREATE ACCOUNT
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import PasswordInput from "../../Components/input/PasswordInput";
import loginImg from "../../images/login.jpg";
import { useAuthStore } from "../../utils/useAuthStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);
      await login(email, password, navigate, setError);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-pink-100 to-pink-300 px-4 py-8 sm:px-8 lg:px-12">

      {/* Background glow */}
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 animate-pulse rounded-full bg-pink-300/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 animate-pulse rounded-full bg-rose-300/50 blur-3xl [animation-delay:1000ms]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-3xl" />

      {/* Floating hearts */}
      <span className="pointer-events-none absolute left-[8%] top-[15%] animate-bounce text-3xl text-pink-400/70 [animation-duration:3s]">
        ♡
      </span>
      <span className="pointer-events-none absolute right-[8%] top-[25%] animate-pulse text-4xl text-rose-400/70">
        ♥
      </span>
      <span className="pointer-events-none absolute bottom-[12%] left-[15%] animate-bounce text-2xl text-pink-500/60 [animation-duration:4s]">
        ✧
      </span>

      {/* Navbar */}
      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold italic tracking-tight text-pink-700 transition hover:scale-105 sm:text-2xl"
        >
          <span className="text-4xl">♡</span>
          MilesCloser
        </Link>

        <Link
          to="/"
          className="rounded-full border border-white/80 bg-white/40 px-5 py-2.5 text-sm font-semibold text-pink-700 shadow-sm backdrop-blur-xl transition hover:bg-white/75"
        >
          ← Home
        </Link>
      </nav>

      {/* Main login layout */}
      <section className="relative z-10 mx-auto mt-8 flex min-h-[calc(100vh-130px)] max-w-6xl items-center justify-center py-6 sm:mt-10">

        <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/80 bg-white/25 shadow-2xl shadow-pink-500/15 backdrop-blur-2xl lg:grid-cols-2 lg:rounded-[2.5rem]">

          {/* Left: Existing image */}
          <div className="group relative min-h-[320px] overflow-hidden sm:min-h-[420px] lg:min-h-[650px]">
            <img
              src={loginImg}
              alt="A warm and romantic MilesCloser welcome"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            {/* Image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-rose-950/80 via-pink-950/10 to-rose-900/10" />
            <div className="absolute inset-0 bg-gradient-to-br from-pink-300/10 to-transparent" />

            {/* Glass label */}
            <div className="absolute left-5 top-5 rounded-full border border-white/40 bg-white/20 px-4 py-2 text-xs font-semibold tracking-wider text-white shadow-lg backdrop-blur-xl sm:left-8 sm:top-8">
              ♡ &nbsp; YOUR LITTLE WORLD
            </div>

            {/* Bottom image text */}
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10 lg:p-12">
              <span className="mb-4 inline-block text-sm font-medium tracking-widest text-pink-100">
                TWO HEARTS · ONE SPACE
              </span>

              <h1 className="text-4xl font-extrabold leading-tight drop-shadow-lg sm:text-5xl lg:text-6xl">
                Stay Close,
                <br />
                Even When
                <br />
                <span className="italic text-pink-200">Far Away.</span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-white/90 sm:text-base">
                Your thoughts, your memories, your favourite person.
                A little space to feel close, no matter the distance.
              </p>

              <div className="mt-7 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/20 text-xl backdrop-blur-lg">
                  ♡
                </span>
                <p className="text-sm italic text-white/90">
                  Every little moment matters.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Login form */}
          <div className="relative flex items-center justify-center p-6 sm:p-10 lg:p-12">

            {/* Form background decoration */}
            <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-pink-200/50 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-rose-200/40 blur-3xl" />

            <div className="relative w-full max-w-md animate-[loginFade_0.8s_ease-out_both]">

              {/* Heading */}
              <div className="mb-9 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white bg-gradient-to-br from-white to-pink-200 text-4xl text-pink-600 shadow-lg shadow-pink-500/10 transition duration-300 hover:rotate-6 hover:scale-110">
                  ♡
                </div>

                <p className="text-xs font-bold tracking-[0.25em] text-pink-600">
                  WELCOME BACK
                </p>

                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-rose-950 sm:text-4xl">
                  Hello, <span className="bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-transparent">lovely.</span>
                </h2>

                <p className="mt-3 text-sm leading-6 text-rose-950/60">
                  Your little world has been waiting for you.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                {/* Email */}
                <label
                  htmlFor="login-email"
                  className="mb-2 block text-sm font-semibold text-rose-900"
                >
                  Email address
                </label>

                <div className="mb-5 flex items-center gap-3 rounded-2xl border border-white/90 bg-white/50 px-4 shadow-sm backdrop-blur-xl transition duration-300 focus-within:border-pink-300 focus-within:bg-white/80 focus-within:ring-4 focus-within:ring-pink-200/40">
                  <span className="text-lg text-pink-500">✉</span>
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full bg-transparent py-4 text-sm text-rose-950 outline-none placeholder:text-rose-400/70"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (error) setError("");
                    }}
                  />
                </div>

                {/* Password */}
                <div className="mb-2">
                  <label
                    htmlFor="login-password"
                    className="mb-2 block text-sm font-semibold text-rose-900"
                  >
                    Password
                  </label>

                  <div className="rounded-2xl border border-white/90 bg-white/50 px-3 shadow-sm backdrop-blur-xl transition duration-300 focus-within:border-pink-300 focus-within:bg-white/80 focus-within:ring-4 focus-within:ring-pink-200/40 [&_input]:!border-0 [&_input]:!bg-transparent [&_input]:!shadow-none [&_input]:!outline-none">
                    <PasswordInput
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        if (error) setError("");
                      }}
                    />
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div
                    role="alert"
                    className="mt-4 rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-600"
                  >
                    {error}
                  </div>
                )}

                {/* Login button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 py-4 font-bold text-white shadow-xl shadow-pink-500/25 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-500/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {loading ? "Signing you in..." : "Log In to MilesCloser"}
                  {!loading && (
                    <span className="transition-transform group-hover:translate-x-1">
                      ↗
                    </span>
                  )}
                </button>

                <div className="my-6 flex items-center gap-4">
                  <div className="h-px flex-1 bg-pink-200/80" />
                  <span className="text-xs font-medium text-rose-400">
                    NEW HERE?
                  </span>
                  <div className="h-px flex-1 bg-pink-200/80" />
                </div>

                <Link
                  to="/signup"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/90 bg-white/35 py-4 text-sm font-bold text-pink-700 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/75 hover:shadow-lg hover:shadow-pink-500/10"
                >
                  Create your account
                  <span>♡</span>
                </Link>
              </form>

              <p className="mt-7 text-center text-xs text-rose-950/50">
                Made with a little love, just for your moments. ♡
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom entrance animation */}
      <style>{`
        @keyframes loginFade {
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

export default Login;

