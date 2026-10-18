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
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#160824] via-[#251034] to-[#10132f] px-4 py-8 text-white sm:px-8 lg:px-12">

      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 animate-pulse rounded-full bg-fuchsia-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 animate-pulse rounded-full bg-blue-600/20 blur-3xl [animation-delay:1000ms]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-3xl" />

      
      <span className="pointer-events-none absolute left-[8%] top-[15%] animate-bounce text-3xl text-fuchsia-300/70 [animation-duration:3s]">
        ♡
      </span>
      <span className="pointer-events-none absolute right-[8%] top-[25%] animate-pulse text-4xl text-orange-300/70">
        ✦
      </span>
      <span className="pointer-events-none absolute bottom-[12%] left-[15%] animate-bounce text-2xl text-cyan-300/60 [animation-duration:4s]">
        ✧
      </span>

     
      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold italic tracking-tight text-white transition hover:scale-105 sm:text-2xl"
        >
          <span className="bg-gradient-to-r from-fuchsia-400 to-orange-300 bg-clip-text text-4xl text-transparent">
            ♡
          </span>
          MilesCloser
        </Link>

        <Link
          to="/"
          className="rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-purple-100 shadow-sm backdrop-blur-xl transition hover:border-fuchsia-400/40 hover:bg-fuchsia-500/10 hover:text-white"
        >
          ← Home
        </Link>
      </nav>

  
      <section className="relative z-10 mx-auto mt-8 flex min-h-[calc(100vh-130px)] max-w-6xl items-center justify-center py-6 sm:mt-10">

        <div className="grid w-full overflow-hidden rounded-[2rem] border border-fuchsia-400/25 bg-[#1b1029]/75 shadow-2xl shadow-fuchsia-950/30 backdrop-blur-2xl lg:grid-cols-2 lg:rounded-[2.5rem]">

        
          <div className="group relative min-h-[320px] overflow-hidden sm:min-h-[420px] lg:min-h-[650px]">
            <img
              src={loginImg}
              alt="A warm MilesCloser welcome"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

           
            <div className="absolute inset-0 bg-gradient-to-t from-[#160824]/95 via-[#251034]/30 to-[#160824]/20" />
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/20 via-transparent to-blue-600/20" />

          
            <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-[#190923]/50 px-4 py-2 text-xs font-semibold tracking-wider text-white shadow-lg backdrop-blur-xl sm:left-8 sm:top-8">
              ♡ &nbsp; YOUR LITTLE WORLD
            </div>

            
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10 lg:p-12">
              <span className="mb-4 inline-block text-sm font-semibold tracking-widest text-fuchsia-200">
                TWO HEARTS · ONE SPACE
              </span>

              <h1 className="text-4xl font-extrabold leading-tight drop-shadow-lg sm:text-5xl lg:text-6xl">
                Stay Close,
                <br />
                Even When
                <br />
                <span className="bg-gradient-to-r from-fuchsia-300 via-pink-300 to-orange-200 bg-clip-text italic text-transparent">
                  Far Away.
                </span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-white/85 sm:text-base">
                Your thoughts, your memories, your favourite person.
                A little space to feel close, no matter the distance.
              </p>

              <div className="mt-7 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-fuchsia-200/30 bg-fuchsia-400/15 text-xl text-fuchsia-200 backdrop-blur-lg">
                  ♡
                </span>
                <p className="text-sm italic text-white/90">
                  Every little moment matters.
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center p-6 sm:p-10 lg:p-12">

            
            <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-fuchsia-500/15 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-blue-500/15 blur-3xl" />

            <div className="relative w-full max-w-md animate-[loginFade_0.8s_ease-out_both]">

         
              <div className="mb-9 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-fuchsia-300/30 bg-gradient-to-br from-fuchsia-500/20 to-purple-600/20 text-4xl text-fuchsia-300 shadow-lg shadow-fuchsia-500/10 transition duration-300 hover:rotate-6 hover:scale-110">
                  ♡
                </div>

                <p className="text-xs font-bold tracking-[0.25em] text-fuchsia-300">
                  WELCOME BACK
                </p>

                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Hello,{" "}
                  <span className="bg-gradient-to-r from-fuchsia-400 via-pink-300 to-orange-300 bg-clip-text text-transparent">
                    lovely.
                  </span>
                </h2>

                <p className="mt-3 text-sm leading-6 text-purple-200/70">
                  Your little world has been waiting for you.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
              
                <label
                  htmlFor="login-email"
                  className="mb-2 block text-sm font-semibold text-purple-100"
                >
                  Email address
                </label>

                <div className="mb-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 shadow-sm backdrop-blur-xl transition duration-300 focus-within:border-fuchsia-400/60 focus-within:bg-white/[0.08] focus-within:ring-4 focus-within:ring-fuchsia-500/10">
                  <span className="text-lg text-fuchsia-300">✉</span>
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-purple-300/40"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (error) setError("");
                    }}
                  />
                </div>

            
                <div className="mb-2">
                  <label
                    htmlFor="login-password"
                    className="mb-2 block text-sm font-semibold text-purple-100"
                  >
                    Password
                  </label>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-3 shadow-sm backdrop-blur-xl transition duration-300 focus-within:border-fuchsia-400/60 focus-within:bg-white/[0.08] focus-within:ring-4 focus-within:ring-fuchsia-500/10 [&_input]:!border-0 [&_input]:!bg-transparent [&_input]:!text-white [&_input]:!shadow-none [&_input]:!outline-none [&_input]:placeholder:!text-purple-300/40">
                    <PasswordInput
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        if (error) setError("");
                      }}
                    />
                  </div>
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
                  {loading ? "Signing you in..." : "Log In to MilesCloser"}
                  {!loading && (
                    <span className="transition-transform group-hover:translate-x-1">
                      ↗
                    </span>
                  )}
                </button>

              
                <div className="my-6 flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-fuchsia-400/30" />
                  <span className="text-xs font-medium tracking-wider text-purple-300/70">
                    NEW HERE?
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-fuchsia-400/30" />
                </div>

            
                <Link
                  to="/signup"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-fuchsia-300/25 bg-white/[0.04] py-4 text-sm font-bold text-purple-100 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-fuchsia-300/50 hover:bg-fuchsia-500/10 hover:text-white hover:shadow-lg hover:shadow-fuchsia-950/20"
                >
                  Create your account
                  <span className="text-fuchsia-300">♡</span>
                </Link>
              </form>

              <p className="mt-7 text-center text-xs text-purple-300/50">
                Made with a little love, just for your moments. ♡
              </p>
            </div>
          </div>
        </div>
      </section>

     
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