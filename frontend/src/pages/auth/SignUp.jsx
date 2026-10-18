

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
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#160824] via-[#251034] to-[#10132f] px-4 py-6 text-white sm:px-8 lg:px-12">

      
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 animate-pulse rounded-full bg-fuchsia-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 animate-pulse rounded-full bg-blue-600/20 blur-3xl [animation-delay:1000ms]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-3xl" />

     
      <span className="pointer-events-none absolute left-[7%] top-[20%] animate-bounce text-3xl text-fuchsia-300/70 [animation-duration:3s]">
        ♡
      </span>
      <span className="pointer-events-none absolute right-[8%] top-[28%] animate-pulse text-4xl text-orange-300/70">
        ✦
      </span>
      <span className="pointer-events-none absolute bottom-[10%] left-[12%] animate-bounce text-2xl text-cyan-300/60 [animation-duration:4s]">
        ✧
      </span>

  
      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold italic tracking-tight text-white transition duration-300 hover:scale-105 sm:text-2xl"
        >
          <Heart
            size={32}
            strokeWidth={2.5}
            className="text-fuchsia-400"
          />
          MilesCloser
        </Link>

        <Link
          to="/"
          className="rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-purple-100 shadow-sm backdrop-blur-xl transition hover:border-fuchsia-400/40 hover:bg-fuchsia-500/10 hover:text-white"
        >
          ← Home
        </Link>
      </nav>

     
      <section className="relative z-10 mx-auto flex max-w-6xl items-center justify-center py-8 sm:py-10">

        <div className="grid w-full overflow-hidden rounded-[2rem] border border-fuchsia-400/25 bg-[#1b1029]/75 shadow-2xl shadow-fuchsia-950/30 backdrop-blur-2xl lg:grid-cols-2 lg:rounded-[2.5rem]">

          
          <div className="group relative min-h-[300px] overflow-hidden sm:min-h-[400px] lg:min-h-[760px]">
            <img
              src={SignUpImg}
              alt="Welcome to MilesCloser"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

        
            <div className="absolute inset-0 bg-gradient-to-t from-[#160824]/95 via-[#251034]/30 to-[#160824]/20" />
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/20 via-transparent to-blue-600/20" />

            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/25 bg-[#190923]/50 px-4 py-2 text-xs font-semibold tracking-wider text-white shadow-lg backdrop-blur-xl sm:left-8 sm:top-8">
              <Heart size={14} className="text-fuchsia-300" />
              YOUR LITTLE WORLD
            </div>

      
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10 lg:p-12">
              <span className="mb-4 inline-block text-sm font-semibold tracking-widest text-fuchsia-200">
                TWO HEARTS · ONE SPACE
              </span>

              <h1 className="text-4xl font-extrabold leading-tight drop-shadow-lg sm:text-5xl lg:text-6xl">
                Miles Apart,
                <br />
                Hearts
                <br />
                <span className="bg-gradient-to-r from-fuchsia-300 via-pink-300 to-orange-200 bg-clip-text italic text-transparent">
                  Together.
                </span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-white/85 sm:text-base">
                Create your account and build a little world filled with
                shared thoughts, daily memories, and meaningful moments.
              </p>

              <div className="mt-7 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-fuchsia-200/30 bg-fuchsia-400/15 text-fuchsia-200 backdrop-blur-lg">
                  <Heart size={19} />
                </div>
                <p className="text-sm italic text-white/90">
                  Every great story starts somewhere.
                </p>
              </div>
            </div>
          </div>

      
          <div className="relative flex items-center justify-center p-5 sm:p-9 lg:p-10">

            
            <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-fuchsia-500/15 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-blue-500/15 blur-3xl" />

            <div className="relative w-full max-w-md animate-[signupFade_0.8s_ease-out_both]">

          
              <div className="mb-7 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-fuchsia-300/30 bg-gradient-to-br from-fuchsia-500/20 to-purple-600/20 text-fuchsia-300 shadow-lg shadow-fuchsia-500/10 transition duration-300 hover:rotate-6 hover:scale-110">
                  <Heart size={30} />
                </div>

                <p className="text-xs font-bold tracking-[0.25em] text-fuchsia-300">
                  YOUR STORY STARTS HERE
                </p>

                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Let's get{" "}
                  <span className="bg-gradient-to-r from-fuchsia-400 via-pink-300 to-orange-300 bg-clip-text text-transparent">
                    closer.
                  </span>
                </h2>

                <p className="mt-3 text-sm leading-6 text-purple-200/70">
                  Create your account and make room for more memories.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate>

                <div className="mb-6 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-sm backdrop-blur-xl transition duration-300 hover:border-fuchsia-400/25 hover:bg-white/[0.06]">

                  <label
                    htmlFor="profile-upload"
                    className="group relative flex h-[68px] w-[68px] shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-fuchsia-400/50 bg-gradient-to-br from-fuchsia-500/15 to-purple-600/15 transition duration-300 hover:border-fuchsia-300 hover:shadow-lg hover:shadow-fuchsia-500/15"
                  >
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Profile preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-fuchsia-300">
                        <ImagePlus size={25} />
                        <span className="text-[9px] font-semibold">
                          PHOTO
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 flex items-center justify-center bg-[#160824]/70 text-white opacity-0 transition group-hover:opacity-100">
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
                    <p className="text-sm font-bold text-white">
                      Your profile photo
                    </p>
                    <p className="mt-1 text-xs leading-5 text-purple-200/65">
                      Add a photo to personalise your account.
                    </p>
                    <label
                      htmlFor="profile-upload"
                      className="mt-1 inline-block cursor-pointer text-xs font-bold text-fuchsia-300 transition hover:text-orange-300"
                    >
                      {profileImage ? "Change photo" : "Upload photo"} ↗
                    </label>
                  </div>
                </div>

                <label
                  htmlFor="signup-name"
                  className="mb-2 block text-sm font-semibold text-purple-100"
                >
                  Full name
                </label>

                <input
                  id="signup-name"
                  type="text"
                  autoComplete="name"
                  placeholder="What should we call you?"
                  className="mb-4 w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm text-white shadow-sm outline-none backdrop-blur-xl transition duration-300 placeholder:text-purple-300/40 focus:border-fuchsia-400/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-fuchsia-500/10"
                  value={fullName}
                  onChange={(event) => {
                    setFullName(event.target.value);
                    if (error) setError("");
                  }}
                />

                <label
                  htmlFor="signup-email"
                  className="mb-2 block text-sm font-semibold text-purple-100"
                >
                  Email address
                </label>

                <input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="mb-4 w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm text-white shadow-sm outline-none backdrop-blur-xl transition duration-300 placeholder:text-purple-300/40 focus:border-fuchsia-400/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-fuchsia-500/10"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (error) setError("");
                  }}
                />

                <label
                  htmlFor="signup-password"
                  className="mb-2 block text-sm font-semibold text-purple-100"
                >
                  Password
                </label>

                <div className="mb-4 rounded-2xl border border-white/10 bg-white/[0.05] px-3 shadow-sm backdrop-blur-xl transition duration-300 focus-within:border-fuchsia-400/60 focus-within:bg-white/[0.08] focus-within:ring-4 focus-within:ring-fuchsia-500/10 [&_input]:!border-0 [&_input]:!bg-transparent [&_input]:!text-white [&_input]:!shadow-none [&_input]:!outline-none [&_input]:placeholder:!text-purple-300/40">
                  <PasswordInput
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      if (error) setError("");
                    }}
                  />
                </div>

                <label
                  htmlFor="signup-confirm-password"
                  className="mb-2 block text-sm font-semibold text-purple-100"
                >
                  Confirm password
                </label>

                <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-3 shadow-sm backdrop-blur-xl transition duration-300 focus-within:border-fuchsia-400/60 focus-within:bg-white/[0.08] focus-within:ring-4 focus-within:ring-fuchsia-500/10 [&_input]:!border-0 [&_input]:!bg-transparent [&_input]:!text-white [&_input]:!shadow-none [&_input]:!outline-none [&_input]:placeholder:!text-purple-300/40">
                  <PasswordInput
                    value={confirmPassword}
                    placeholder="Re-enter your password"
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                      if (error) setError("");
                    }}
                  />
                </div>

                {error && (
                  <div
                    role="alert"
                    className="mt-4 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
                  >
                    {error}
                  </div>
                )}

                
                <button
                  type="submit"
                  disabled={loading}
                  className="group mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-blue-600 py-4 font-bold text-white shadow-xl shadow-fuchsia-950/40 transition duration-300 hover:-translate-y-1 hover:from-fuchsia-500 hover:via-purple-500 hover:to-blue-500 hover:shadow-2xl hover:shadow-fuchsia-900/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {loading ? "Creating your account..." : "Create My Account"}
                  {!loading && (
                    <ArrowRight
                      size={19}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  )}
                </button>

              
                <div className="my-5 flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-fuchsia-400/30" />
                  <span className="text-xs font-medium tracking-wider text-purple-300/70">
                    ALREADY A MEMBER?
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-fuchsia-400/30" />
                </div>

                <Link
                  to="/login"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-fuchsia-300/25 bg-white/[0.04] py-3.5 text-sm font-bold text-purple-100 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-fuchsia-300/50 hover:bg-fuchsia-500/10 hover:text-white hover:shadow-lg hover:shadow-fuchsia-950/20"
                >
                  Log In to Your Account
                  <Heart size={16} className="text-fuchsia-300" />
                </Link>
              </form>

              <p className="mt-6 text-center text-xs text-purple-300/50">
                Made with a little love, for your little world. ♡
              </p>
            </div>
          </div>
        </div>
      </section>

   
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
