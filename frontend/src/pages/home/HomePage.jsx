import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-pink-100 via-pink-200 to-rose-300 text-white">
      {/* Hero Section */}
      <section className="flex items-center justify-center px-6 pt-24 pb-20">
         <div className="absolute inset-0 overflow-hidden">
    <div className="absolute w-64 h-64 bg-pink-400 opacity-30 rounded-full -top-10 -left-10 animate-pulse"></div>
    <div className="absolute w-72 h-72 bg-rose-300 opacity-20 rounded-full -bottom-20 right-0 animate-ping"></div>
  </div>

  <div className="relative z-10 bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl p-10 max-w-2xl text-center text-white">
    <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-pink-600 bg-clip-text bg-gradient-to-r from-white via-rose-100 to-white drop-shadow-lg mb-6">
      Welcome to<br />
      <span className="inline-block bg-pink-600 text-white px-4 py-2 rounded-xl mt-2 shadow-md">
        MilesCloser
      </span>
    </h1>

    <p className="text-lg md:text-xl text-pink-900 font-medium mb-8">
      Where distance fades, and connection deepens. <br />
      Write your thoughts in a shared journal and chat with your loved one—<br />
      because love is more than just a message.
    </p>

    <div className="flex justify-center gap-6 mt-6">
      <Link
        to="/login"
        className="bg-white text-pink-600 px-6 py-3 rounded-full text-sm font-semibold hover:bg-pink-100 hover:scale-105 transition-all duration-200 shadow-md"
      >
        Log In
      </Link>
      <Link
        to="/signup"
        className="border border-white bg-pink-400 px-6 py-3 rounded-full text-sm font-semibold text-white hover:bg-white hover:text-pink-600 transition-all duration-200 shadow-md hover:scale-105"
      >
        Sign Up
      </Link>
    </div>
  </div>
      </section>

     
      <section className="bg-white py-20 px-6 text-pink-800">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10 tracking-tight">✨ What You Can Do</h2>
          <div className="grid md:grid-cols-3 gap-10 text-left">
            {[
              {
                emoji: "📓",
                title: "Shared Journal",
                desc: "Write your feelings, experiences, and daily thoughts for your partner to see.",
              },
              {
                emoji: "💬",
                title: "Real-Time Chat",
                desc: "Connect through instant messages with a private and secure chat.",
              },
              {
                emoji: "📅",
                title: "Daily Memories",
                desc: "Document your day’s highlights and create moments that matter.",
              },
            ].map(({ emoji, title, desc }, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-2xl shadow hover:shadow-lg transition-transform duration-300 hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold mb-2">{emoji} {title}</h3>
                <p className="text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="bg-pink-300 text-white py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">💕 Made for Long-Distance Love</h2>
          <p className="text-lg mb-6">
            We know how hard it is to be away from someone you love—the longing, the silence, the missed hugs.  
            That’s why we built MilesCloser—to keep you emotionally close even when you're physically far.
          </p>
          <p className="text-xl italic font-light">“It’s not about the distance—it’s about feeling connected.”</p>
        </div>
      </section>

     
      <section className="bg-pink-600 py-20 text-center">
        <h2 className="text-3xl font-bold mb-3">Start your journey today</h2>
        <p className="text-pink-100 mb-8">Your private space for love, built just for two.</p>
        <Link
          to="/signup"
          className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-pink-100 transition-all"
        >
          Join Now
        </Link>
      </section>
    </div>
  );
};

export default HomePage;

