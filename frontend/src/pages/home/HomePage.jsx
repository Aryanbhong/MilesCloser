
import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: "📖",
    title: "Shared Journal",
    description:
      "Save your favorite moments, little thoughts, and memories together, no matter how far apart you are.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: "💬",
    title: "Real-Time Chat",
    description:
      "Talk about your day, share your thoughts, and make distance feel a little smaller with every message.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: "✨",
    title: "Daily Memories",
    description:
      "Keep the little things that matter in one place and build a beautiful collection of moments together.",
    gradient: "from-orange-400 to-pink-500",
  },
];

function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#160824] text-white selection:bg-pink-400 selection:text-white">
  
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] animate-pulse rounded-full bg-fuchsia-600/70 blur-[120px]" />

        <div className="absolute -right-40 top-10 h-[30rem] w-[30rem] rounded-full bg-blue-600/70 blur-[120px]" />

        <div className="absolute left-[25%] top-[35%] h-[28rem] w-[28rem] rounded-full bg-pink-600/50 blur-[130px]" />

        <div className="absolute -bottom-40 right-[10%] h-[32rem] w-[32rem] rounded-full bg-orange-500/50 blur-[130px]" />

        <div className="absolute bottom-[5%] left-[-10rem] h-[26rem] w-[26rem] rounded-full bg-violet-600/60 blur-[120px]" />

        <div className="absolute left-[45%] top-[65%] h-72 w-72 rounded-full bg-cyan-500/30 blur-[110px]" />

        <div className="absolute inset-0 bg-[#160824]/25" />
      </div>


      <div className="relative z-10">
 
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
          <Link
            to="/"
            className="group flex items-center gap-2 text-2xl font-black tracking-tight"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-orange-400 shadow-lg shadow-fuchsia-500/30 transition-transform group-hover:rotate-12">
              ♡
            </span>
            <span className="bg-gradient-to-r from-white via-pink-200 to-orange-200 bg-clip-text text-transparent">
              MilesCloser
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium text-white/80 md:flex">
            <a href="#home" className="transition hover:text-pink-300">
              Home
            </a>
            <a href="#features" className="transition hover:text-pink-300">
              Features
            </a>
            <a href="#story" className="transition hover:text-pink-300">
              Our Story
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-lg transition hover:border-pink-300/60 hover:bg-white/10 sm:inline-flex"
            >
              Log In
            </Link>

            <Link
              to="/signup"
              className="rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-400 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/30 transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-pink-500/50"
            >
              Sign Up <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </nav>

     
        <section
          id="home"
          className="mx-auto grid min-h-[78vh] max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 md:grid-cols-2 lg:px-12 lg:py-24"
        >
          <div className="animate-[fadeInUp_0.8s_ease-out]">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-pink-300/30 bg-white/10 px-4 py-2 text-sm font-medium text-pink-100 shadow-lg shadow-pink-500/10 backdrop-blur-xl">
              <span className="h-2 w-2 animate-pulse rounded-full bg-orange-400" />
              Made for the moments that matter
              <span>♡</span>
            </div>

            <h1 className="max-w-2xl text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Even miles apart,
              <span className="mt-2 block bg-gradient-to-r from-pink-300 via-fuchsia-300 to-orange-300 bg-clip-text pb-2 text-transparent">
                we're closer.
              </span>
              <span className="text-pink-400">♡</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-white/75 sm:text-lg">
              Distance may keep you apart, but your memories, conversations,
              and little everyday moments can still bring you closer. Make every
              mile feel a little less lonely with MilesCloser.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-400 px-7 py-4 font-bold text-white shadow-xl shadow-fuchsia-500/25 transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-fuchsia-500/40"
              >
                Start Your Story
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-xl transition hover:border-pink-300/60 hover:bg-white/15"
              >
                Explore Features <span>↓</span>
              </a>
            </div>

            <div className="mt-10 flex items-center gap-4 text-sm text-white/65">
              <div className="flex -space-x-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#160824] bg-pink-400">
                  💗
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#160824] bg-violet-400">
                  💜
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#160824] bg-orange-300">
                  🧡
                </span>
              </div>
              <p>Little moments. Lasting memories.</p>
            </div>
          </div>

      
          <div className="relative mx-auto flex min-h-[420px] w-full max-w-lg items-center justify-center">
            <div className="absolute left-[8%] top-[8%] h-40 w-40 rounded-full bg-fuchsia-500/50 blur-[80px]" />
            <div className="absolute bottom-[5%] right-[5%] h-44 w-44 rounded-full bg-blue-500/50 blur-[80px]" />

            <div className="absolute right-[7%] top-[8%] rotate-12 text-5xl text-orange-300/90">
              ✦
            </div>
            <div className="absolute bottom-[9%] left-[8%] -rotate-12 text-5xl text-pink-300/90">
              ♡
            </div>
            <div className="absolute left-[12%] top-[20%] text-3xl text-cyan-300">
              ✧
            </div>

            <div className="absolute left-0 top-[17%] z-20 w-[78%] -rotate-6 rounded-3xl border border-white/50 bg-white/95 p-5 text-purple-950 shadow-2xl shadow-black/30 transition duration-500 hover:rotate-0 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-600">
                    Our little journal
                  </p>
                  <h3 className="mt-2 text-xl font-black">Dear you, 💌</h3>
                </div>
                <span className="text-3xl">🌷</span>
              </div>

              <p className="mt-4 text-sm leading-6 text-purple-900/75">
                "Even an ordinary day feels special when I get to share it with
                you."
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-pink-100 pt-4">
                <span className="text-xs font-medium text-purple-500">
                  A memory to keep
                </span>
                <span className="text-pink-500">♥ ♥ ♥</span>
              </div>
            </div>

            <div className="absolute bottom-[12%] right-0 z-30 w-[76%] rotate-6 rounded-3xl border border-fuchsia-200/60 bg-gradient-to-br from-white to-pink-50 p-5 text-purple-950 shadow-2xl shadow-black/40 transition duration-500 hover:rotate-0 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-violet-600 text-xl text-white shadow-lg">
                  ♡
                </div>
                <div>
                  <h3 className="font-extrabold">Your favorite person</h3>
                  <p className="text-xs text-purple-500">Always a message away</p>
                </div>
                <span className="ml-auto h-2.5 w-2.5 rounded-full bg-green-400 ring-4 ring-green-100" />
              </div>

              <div className="mt-5 space-y-3">
                <div className="w-fit max-w-[90%] rounded-2xl rounded-bl-sm bg-purple-100 px-4 py-3 text-sm">
                  Guess what I was thinking about? 🥹
                </div>
                <div className="ml-auto w-fit max-w-[90%] rounded-2xl rounded-br-sm bg-gradient-to-r from-pink-500 to-fuchsia-500 px-4 py-3 text-sm text-white shadow-md">
                  Me? Obviously 😌💕
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-full bg-pink-50 px-4 py-3 text-xs text-purple-400">
                <span>Type a little something...</span>
                <span className="text-lg text-pink-500">➤</span>
              </div>
            </div>
          </div>
        </section>

 
        <section id="features" className="px-5 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-pink-300">
                The good stuff
              </p>
              <h2 className="mt-4 text-3xl font-black sm:text-5xl">
                Distance is real.
                <span className="block bg-gradient-to-r from-pink-300 via-fuchsia-300 to-orange-300 bg-clip-text pt-1 text-transparent">
                  Feeling close is too.
                </span>
              </h2>
              <p className="mt-5 leading-7 text-white/70">
                Everything you need to keep your connection alive, one little
                moment at a time.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="group rounded-3xl border border-white/30 bg-white/[0.96] p-7 text-purple-950 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-2 hover:border-pink-300 hover:shadow-pink-500/20"
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-2xl text-white shadow-lg transition duration-300 group-hover:rotate-6 group-hover:scale-110`}
                  >
                    {feature.icon}
                  </div>

                  <h3 className="mt-6 text-xl font-black">{feature.title}</h3>
                  <p className="mt-3 leading-7 text-purple-900/70">
                    {feature.description}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-pink-600">
                    Made with love <span>♡</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

   
        <section id="story" className="px-5 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-[2rem] border border-white/20 bg-white/[0.08] p-8 shadow-2xl shadow-black/10 backdrop-blur-2xl sm:p-12 lg:grid-cols-2 lg:p-16">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-300">
                A little about us
              </p>
              <h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">
                Because the little things are actually
                <span className="bg-gradient-to-r from-pink-300 to-orange-300 bg-clip-text text-transparent">
                  {" "}
                  the big things.
                </span>
              </h2>
            </div>

            <div>
              <p className="leading-8 text-white/75">
                A random good morning. A story about your day. A memory that
                makes you smile all over again. MilesCloser is a cozy little
                space for sharing those moments and keeping them close, even
                when life puts miles between you.
              </p>

              <Link
                to="/signup"
                className="mt-7 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 font-bold text-purple-950 shadow-lg transition hover:-translate-y-1 hover:bg-pink-100"
              >
                Create your space <span className="text-pink-600">♡</span>
              </Link>
            </div>
          </div>
        </section>


        <section className="px-5 py-20 sm:px-8 lg:px-12">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/25 bg-gradient-to-r from-pink-600 via-fuchsia-600 to-violet-700 px-6 py-14 text-center shadow-2xl shadow-fuchsia-950/30 sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-orange-400/50 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-blue-400/50 blur-[90px]" />

            <div className="relative">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-pink-100">
                Your story starts here
              </p>
              <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black sm:text-5xl">
                Make the distance feel a little smaller. 💗
              </h2>
              <p className="mx-auto mt-5 max-w-xl leading-7 text-white/85">
                Your memories deserve a home. Make one together.
              </p>

              <Link
                to="/signup"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-extrabold text-purple-950 shadow-xl transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-pink-50"
              >
                Let's get closer <span className="text-pink-600">♡</span>
              </Link>
            </div>
          </div>
        </section>


        <footer className="border-t border-white/10 px-5 py-8 sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <Link to="/" className="text-xl font-black">
              <span className="bg-gradient-to-r from-pink-300 to-orange-300 bg-clip-text text-transparent">
                MilesCloser ♡
              </span>
            </Link>

            <p className="text-sm text-white/55">
              Made with love, for the moments that matter.
            </p>

            <a
              href="#home"
              className="text-sm font-semibold text-pink-200 transition hover:text-orange-200"
            >
              Back to top ↑
            </a>
          </div>
        </footer>
      </div>


      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}

export default HomePage;
