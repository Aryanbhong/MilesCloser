// import React from "react";
// import { Link } from "react-router-dom";

// const HomePage = () => {
//   return (
//     <div className="min-h-screen font-sans bg-gradient-to-br from-pink-100 via-pink-200 to-rose-300 text-white">
//       {/* Hero Section */}
//       <section className="flex items-center justify-center px-6 pt-24 pb-20">
//          <div className="absolute inset-0 overflow-hidden">
//     <div className="absolute w-64 h-64 bg-pink-400 opacity-30 rounded-full -top-10 -left-10 animate-pulse"></div>
//     <div className="absolute w-72 h-72 bg-rose-300 opacity-20 rounded-full -bottom-20 right-0 animate-ping"></div>
//   </div>

//   <div className="relative z-10 bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl p-10 max-w-2xl text-center text-white">
//     <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-pink-600 bg-clip-text bg-gradient-to-r from-white via-rose-100 to-white drop-shadow-lg mb-6">
//       Welcome to<br />
//       <span className="inline-block bg-pink-600 text-white px-4 py-2 rounded-xl mt-2 shadow-md">
//         MilesCloser
//       </span>
//     </h1>

//     <p className="text-lg md:text-xl text-pink-900 font-medium mb-8">
//       Where distance fades, and connection deepens. <br />
//       Write your thoughts in a shared journal and chat with your loved one—<br />
//       because love is more than just a message.
//     </p>

//     <div className="flex justify-center gap-6 mt-6">
//       <Link
//         to="/login"
//         className="bg-white text-pink-600 px-6 py-3 rounded-full text-sm font-semibold hover:bg-pink-100 hover:scale-105 transition-all duration-200 shadow-md"
//       >
//         Log In
//       </Link>
//       <Link
//         to="/signup"
//         className="border border-white bg-pink-400 px-6 py-3 rounded-full text-sm font-semibold text-white hover:bg-white hover:text-pink-600 transition-all duration-200 shadow-md hover:scale-105"
//       >
//         Sign Up
//       </Link>
//     </div>
//   </div>
//       </section>

     
//       <section className="bg-white py-20 px-6 text-pink-800">
//         <div className="max-w-5xl mx-auto text-center">
//           <h2 className="text-4xl font-bold mb-10 tracking-tight">✨ What You Can Do</h2>
//           <div className="grid md:grid-cols-3 gap-10 text-left">
//             {[
//               {
//                 emoji: "📓",
//                 title: "Shared Journal",
//                 desc: "Write your feelings, experiences, and daily thoughts for your partner to see.",
//               },
//               {
//                 emoji: "💬",
//                 title: "Real-Time Chat",
//                 desc: "Connect through instant messages with a private and secure chat.",
//               },
//               {
//                 emoji: "📅",
//                 title: "Daily Memories",
//                 desc: "Document your day’s highlights and create moments that matter.",
//               },
//             ].map(({ emoji, title, desc }, i) => (
//               <div
//                 key={i}
//                 className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-2xl shadow hover:shadow-lg transition-transform duration-300 hover:-translate-y-1"
//               >
//                 <h3 className="text-xl font-bold mb-2">{emoji} {title}</h3>
//                 <p className="text-sm leading-relaxed">{desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>


//       <section className="bg-pink-300 text-white py-20 px-6 text-center">
//         <div className="max-w-4xl mx-auto">
//           <h2 className="text-4xl font-bold mb-4">💕 Made for Long-Distance Love</h2>
//           <p className="text-lg mb-6">
//             We know how hard it is to be away from someone you love—the longing, the silence, the missed hugs.  
//             That’s why we built MilesCloser—to keep you emotionally close even when you're physically far.
//           </p>
//           <p className="text-xl italic font-light">“It’s not about the distance—it’s about feeling connected.”</p>
//         </div>
//       </section>

     
//       <section className="bg-pink-600 py-20 text-center">
//         <h2 className="text-3xl font-bold mb-3">Start your journey today</h2>
//         <p className="text-pink-100 mb-8">Your private space for love, built just for two.</p>
//         <Link
//           to="/signup"
//           className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-pink-100 transition-all"
//         >
//           Join Now
//         </Link>
//       </section>
//     </div>
//   );
// };

// export default HomePage;



import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: "📓",
    title: "Shared Journal",
    desc: "Write your feelings, little wins, and daily thoughts in a space that belongs to both of you.",
    tag: "Your little corner",
  },
  {
    icon: "💌",
    title: "Real-Time Chat",
    desc: "Share your day, send sweet messages, and make even the smallest moments feel special.",
    tag: "Always connected",
  },
  {
    icon: "✨",
    title: "Daily Memories",
    desc: "Keep your favourite moments close and build a beautiful collection of memories together.",
    tag: "Moments to keep",
  },
];

const HomePage = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-pink-100 to-pink-200 font-sans text-rose-950">

      {/* Animated background */}
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 animate-pulse rounded-full bg-pink-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-96 h-96 w-96 animate-pulse rounded-full bg-rose-300/40 blur-3xl [animation-delay:1000ms]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-pink-200/60 blur-3xl" />

      {/* Navbar */}
      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold italic tracking-tight text-pink-700 transition hover:scale-105">
          <span className="text-4xl">♡</span>
          MilesCloser
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-rose-900/70 md:flex">
          <a href="#home" className="transition hover:text-pink-600">Home</a>
          <a href="#features" className="transition hover:text-pink-600">Features</a>
          <a href="#about" className="transition hover:text-pink-600">Our Story</a>
        </div>

        <div className="flex gap-2 sm:gap-3">
          <Link
            to="/login"
            className="rounded-full border border-white/80 bg-white/40 px-4 py-2.5 text-sm font-semibold text-pink-700 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/80 sm:px-6"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-gradient-to-r from-pink-500 to-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-500/25 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/40 sm:px-6"
          >
            Sign Up ↗
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="home"
        className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-12 lg:grid-cols-2 lg:px-10 lg:pb-32 lg:pt-16"
      >
        <div className="animate-[fadeInUp_0.9s_ease-out_both]">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/50 px-4 py-2 text-xs font-bold tracking-widest text-pink-700 shadow-lg shadow-pink-200/30 backdrop-blur-xl">
            <span className="h-2 w-2 animate-pulse rounded-full bg-pink-500" />
            TWO HEARTS · ONE SPACE
          </div>

          <h1 className="text-6xl font-extrabold leading-[1.05] tracking-tight text-rose-950 sm:text-7xl lg:text-8xl">
            Even miles
            <br />
            apart, we're
            <br />
            <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-pink-400 bg-clip-text text-transparent">
              closer
            </span>
            <span className="ml-2 inline-block animate-pulse text-pink-500">♡</span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-8 text-rose-950/65 sm:text-lg">
            Where distance fades and connection deepens. Write your thoughts
            in a shared journal and chat with your favourite person — one
            little moment at a time.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/signup"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 px-7 py-4 font-bold text-white shadow-xl shadow-pink-500/25 transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-pink-500/40"
            >
              Start your story
              <span className="transition-transform group-hover:translate-x-1">↗</span>
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/40 px-7 py-4 font-semibold text-pink-700 shadow-lg backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/75"
            >
              Welcome back ♡
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-3 text-sm text-rose-950/60">
            <div className="flex -space-x-2">
              <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-pink-200">♡</span>
              <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-rose-100">✿</span>
              <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-pink-300">✧</span>
            </div>
            A little space for your favourite person.
          </div>
        </div>

        {/* Glassmorphism illustration */}
        <div className="relative mx-auto flex min-h-[450px] w-full max-w-lg items-center justify-center sm:min-h-[500px]">
          <div className="absolute h-72 w-72 animate-pulse rounded-full bg-pink-300/30 blur-3xl sm:h-96 sm:w-96" />

          <div className="absolute h-72 w-72 rounded-full border border-white/70 shadow-[0_0_60px_rgba(236,72,153,0.12)] sm:h-96 sm:w-96" />
          <div className="absolute h-64 w-80 rotate-45 rounded-[45%] border border-white/70 sm:h-80 sm:w-96" />

          <span className="absolute right-10 top-10 animate-bounce text-5xl text-pink-500/80 [animation-duration:3s]">♡</span>
          <span className="absolute bottom-16 left-7 animate-pulse text-3xl text-rose-400">♥</span>
          <span className="absolute right-0 top-1/2 animate-bounce text-2xl text-pink-500 [animation-duration:2.5s]">✧</span>

          {/* Journal card */}
          <div className="absolute left-2 top-12 z-10 w-[58%] -rotate-6 rounded-[2rem] border border-white/90 bg-white/50 p-5 shadow-2xl shadow-pink-500/10 backdrop-blur-2xl transition duration-500 hover:-translate-y-3 hover:rotate-0 sm:left-4 sm:p-6">
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-pink-100 to-pink-300 text-xl text-pink-700">♡</span>
              <span className="text-[10px] font-bold tracking-widest text-pink-600">OUR JOURNAL</span>
            </div>

            <p className="mt-7 text-xs uppercase tracking-widest text-rose-400">A little note</p>
            <h3 className="mt-2 text-xl font-bold text-rose-900 sm:text-2xl">Dear you,</h3>
            <p className="mt-3 text-xs leading-6 text-rose-950/65 sm:text-sm sm:leading-7">
              Even on the busiest days, you're still my favourite part of the story.
            </p>

            <div className="mt-5 flex h-20 items-center justify-center rounded-2xl border border-white/80 bg-gradient-to-br from-rose-100 via-pink-200 to-rose-300 sm:h-24">
              <span className="animate-pulse text-5xl text-white drop-shadow-lg">♡</span>
            </div>

            <div className="mt-4 flex justify-between text-xs text-pink-700/70">
              <span>Our little moments</span>
              <span>♥</span>
            </div>
          </div>

          {/* Chat card */}
          <div className="absolute bottom-10 right-1 z-20 w-[58%] rotate-6 rounded-[2rem] border border-white/90 bg-white/55 p-4 shadow-2xl shadow-pink-500/15 backdrop-blur-2xl transition duration-500 hover:-translate-y-3 hover:rotate-0 sm:right-2 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-pink-200 to-rose-400 text-xl text-white">♡</div>
              <div>
                <p className="text-xs font-bold text-rose-900 sm:text-sm">My favourite person</p>
                <p className="mt-1 text-[10px] text-pink-600">A little hello ✨</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl rounded-tl-sm border border-white/80 bg-white/70 p-3 text-xs leading-5 text-rose-800">
              Guess what? You made me smile again. ♡
            </div>
            <div className="ml-auto mt-3 w-fit rounded-2xl rounded-tr-sm bg-gradient-to-r from-pink-400 to-rose-400 p-3 text-xs text-white shadow-md">
              You always do. ✨
            </div>

            <div className="mt-5 flex items-center justify-between gap-2 rounded-full border border-white bg-white/70 p-2 pl-4 text-[10px] text-rose-400 sm:text-xs">
              Write something sweet...
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-pink-500 text-sm text-white">↗</span>
            </div>
          </div>

          <div className="absolute bottom-2 left-0 z-30 rounded-full border border-white/90 bg-white/65 px-4 py-3 text-xs font-semibold text-pink-700 shadow-lg backdrop-blur-xl animate-[float_4s_ease-in-out_infinite]">
            ♡ Thinking of you
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="text-xs font-bold tracking-[0.25em] text-pink-600">
              MADE WITH A LITTLE LOVE
            </span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-rose-950 sm:text-5xl">
              Little things,{" "}
              <span className="bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-transparent">
                big feelings.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-7 text-rose-950/60">
              Everything you need to make the distance feel smaller and
              your moments feel more special.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <article
                key={feature.title}
                className="group relative overflow-hidden rounded-[2rem] border border-white/90 bg-white/40 p-7 shadow-xl shadow-pink-500/5 backdrop-blur-2xl transition duration-500 hover:-translate-y-3 hover:border-white hover:bg-white/65 hover:shadow-2xl hover:shadow-pink-500/15 sm:p-8"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-pink-300/20 blur-2xl transition duration-500 group-hover:scale-150 group-hover:bg-pink-300/40" />

                <div className="relative flex items-start justify-between">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl border border-white bg-gradient-to-br from-white to-pink-200 text-3xl shadow-lg shadow-pink-500/10 transition duration-500 group-hover:rotate-6 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <span className="text-xs font-bold tracking-widest text-pink-400/80">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="relative mt-7 text-xl font-bold text-rose-950">
                  {feature.title}
                </h3>
                <p className="relative mt-3 min-h-20 text-sm leading-7 text-rose-950/60">
                  {feature.desc}
                </p>

                <div className="relative mt-6 flex items-center justify-between border-t border-pink-200/50 pt-5 text-sm font-semibold text-pink-700">
                  {feature.tag}
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-white bg-white/70 transition duration-300 group-hover:rotate-45 group-hover:bg-pink-500 group-hover:text-white">
                    ↗
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Our story */}
      <section id="about" className="relative z-10 px-6 py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-10 overflow-hidden rounded-[2rem] border border-white/90 bg-white/40 p-8 shadow-2xl shadow-pink-500/10 backdrop-blur-2xl sm:rounded-[2.5rem] sm:p-12 lg:grid-cols-2 lg:p-16">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-pink-600">
              DISTANCE IS JUST A NUMBER
            </span>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-rose-950 sm:text-5xl">
              Two places.
              <br />
              One{" "}
              <span className="bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-transparent">
                little world.
              </span>
            </h2>
            <p className="mt-6 max-w-lg leading-8 text-rose-950/65">
              Missing someone isn't always easy. That's why MilesCloser gives
              you a space to share everyday things, remember the special ones,
              and stay part of each other's world.
            </p>
            <blockquote className="mt-7 border-l-2 border-pink-400 pl-5 font-serif text-lg italic leading-8 text-pink-700">
              "It's not about the distance.
              <br />
              It's about feeling connected." ♡
            </blockquote>
          </div>

          <div className="relative flex min-h-72 items-center justify-center overflow-hidden rounded-[2rem] border border-white/80 bg-gradient-to-br from-rose-100 via-pink-200 to-rose-300 sm:min-h-96">
            <div className="absolute left-1/2 top-10 h-28 w-28 -translate-x-1/2 rounded-full border border-white/80 bg-white/40 shadow-[0_0_80px_rgba(255,255,255,0.9)] backdrop-blur-xl" />
            <div className="absolute bottom-0 h-1/2 w-full rounded-t-[50%] border-t border-white/70 bg-white/20" />
            <div className="absolute bottom-16 left-[12%] h-24 w-24 rounded-t-full border border-white/70 bg-pink-300/50 backdrop-blur-xl" />
            <div className="absolute bottom-16 right-[12%] h-32 w-28 rounded-t-full border border-white/70 bg-rose-300/50 backdrop-blur-xl" />
            <div className="absolute left-[15%] right-[15%] top-1/2 h-10 -rotate-6 rounded-[50%] border-t border-white/90" />
            <span className="absolute left-1/2 top-[43%] -translate-x-1/2 animate-pulse text-5xl text-white drop-shadow-lg">
              ♡
            </span>
            <div className="absolute bottom-5 rounded-full border border-white/80 bg-white/45 px-5 py-3 text-xs font-semibold text-rose-800 shadow-lg backdrop-blur-xl">
              Different places, same hearts.
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 py-24 text-center">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/90 bg-white/40 px-6 py-14 shadow-2xl shadow-pink-500/10 backdrop-blur-2xl sm:rounded-[2.5rem] sm:px-12 sm:py-16">
          <div className="absolute -left-20 -top-24 h-64 w-64 rounded-full bg-pink-300/30 blur-3xl" />
          <div className="absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-rose-300/30 blur-3xl" />

          <div className="relative">
            <span className="inline-block animate-pulse text-4xl text-pink-500">♡</span>
            <p className="mt-4 text-xs font-bold tracking-[0.2em] text-pink-600">
              YOUR LITTLE WORLD STARTS HERE
            </p>
            <h2 className="mt-5 text-3xl font-extrabold text-rose-950 sm:text-5xl">
              Make every moment{" "}
              <span className="bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-transparent">
                count.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg leading-7 text-rose-950/60">
              Your thoughts, your memories, your favourite person.
              All in one beautiful little space.
            </p>
            <Link
              to="/signup"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 px-8 py-4 font-bold text-white shadow-xl shadow-pink-500/25 transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-pink-500/40"
            >
              Join MilesCloser
              <span className="transition-transform group-hover:scale-125">♡</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/70 px-6 py-7">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-sm text-rose-950/60 sm:flex-row">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold italic text-pink-700">
            <span className="text-2xl">♡</span> MilesCloser
          </Link>
          <p>Made with a little love, for the moments that matter. ♡</p>
        </div>
      </footer>

      {/* Inline Tailwind-compatible keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
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
};

export default HomePage;

