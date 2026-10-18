
// // import React, { useCallback, useEffect, useRef, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   ArrowLeft,
// //   Brush,
// //   Check,
// //   Clock3,
// //   Copy,
// //   Eraser,
// //   Heart,
// //   Loader2,
// //   Palette,
// //   Play,
// //   Send,
// //   Sparkles,
// //   Users,
// //   Trophy,
// //   X,
// // } from "lucide-react";

// // import { useAuthStore } from "../utils/useAuthStore";

// // const COLORS = [
// //   "#1f2937",
// //   "#ef4444",
// //   "#f97316",
// //   "#eab308",
// //   "#22c55e",
// //   "#06b6d4",
// //   "#3b82f6",
// //   "#8b5cf6",
// //   "#ec4899",
// //   "#ffffff",
// // ];

// // const CLASSIC_WORDS = [
// //   "butterfly",
// //   "pizza",
// //   "rainbow",
// //   "guitar",
// //   "castle",
// //   "airplane",
// //   "sunflower",
// //   "dinosaur",
// //   "watermelon",
// //   "lighthouse",
// //   "ice cream",
// //   "bicycle",
// //   "astronaut",
// //   "snowman",
// //   "volcano",
// //   "turtle",
// // ];

// // const COUPLE_WORDS = [
// //   "first date",
// //   "love letter",
// //   "holding hands",
// //   "movie night",
// //   "favorite song",
// //   "sunset walk",
// //   "coffee date",
// //   "surprise gift",
// //   "stargazing",
// //   "photo album",
// //   "heart balloon",
// //   "picnic",
// //   "matching outfits",
// //   "dream vacation",
// // ];

// // const ROUND_SECONDS = 60;
// // const TOTAL_ROUNDS = 5;

// // const makeRoomCode = () =>
// //   Math.random().toString(36).substring(2, 7).toUpperCase();

// // const getRandomWord = (mode) => {
// //   const words = mode === "couple" ? COUPLE_WORDS : CLASSIC_WORDS;
// //   return words[Math.floor(Math.random() * words.length)];
// // };

// // const getSocketId = (socket) => socket?.id;

// // export default function ScribbleGame() {
// //   const navigate = useNavigate();
// //   const socket = useAuthStore((state) => state.socket);
// //   const canvasRef = useRef(null);
// //   const drawingRef = useRef(false);
// //   const lastPointRef = useRef(null);
// //   const timerRef = useRef(null);
// //   const messagesEndRef = useRef(null);

// //   const [screen, setScreen] = useState("lobby");
// //   const [mode, setMode] = useState("classic");
// //   const [roomCode, setRoomCode] = useState("");
// //   const [joinCode, setJoinCode] = useState("");
// //   const [playerName, setPlayerName] = useState("");
// //   const [players, setPlayers] = useState([]);
// //   const [hostId, setHostId] = useState(null);
// //   const [gameStarted, setGameStarted] = useState(false);

// //   const [currentDrawerId, setCurrentDrawerId] = useState(null);
// //   const [word, setWord] = useState("");
// //   const [wordHint, setWordHint] = useState("");
// //   const [round, setRound] = useState(1);
// //   const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
// //   const [scores, setScores] = useState({});
// //   const [guesses, setGuesses] = useState([]);
// //   const [guess, setGuess] = useState("");
// //   const [announcement, setAnnouncement] = useState("");

// //   const [brushColor, setBrushColor] = useState("#ec4899");
// //   const [brushSize, setBrushSize] = useState(5);
// //   const [isEraser, setIsEraser] = useState(false);
// //   const [isDrawing, setIsDrawing] = useState(false);
// //   const [copied, setCopied] = useState(false);

// //   const myId = getSocketId(socket);
// //   const isDrawer = currentDrawerId === myId;
// //   const isHost = hostId === myId;

// //   const currentPlayer = players.find((player) => player.id === myId);
// //   const myName = currentPlayer?.name || playerName || "You";

// //   const initializeCanvas = useCallback(() => {
// //     const canvas = canvasRef.current;
// //     if (!canvas) return;

// //     const rect = canvas.getBoundingClientRect();
// //     const ratio = window.devicePixelRatio || 1;

// //     canvas.width = rect.width * ratio;
// //     canvas.height = rect.height * ratio;

// //     const context = canvas.getContext("2d");
// //     context.setTransform(ratio, 0, 0, ratio, 0, 0);
// //     context.lineCap = "round";
// //     context.lineJoin = "round";
// //     context.fillStyle = "#ffffff";
// //     context.fillRect(0, 0, rect.width, rect.height);
// //   }, []);

// //   useEffect(() => {
// //     if (screen !== "game") return;

// //     initializeCanvas();

// //     const handleResize = () => initializeCanvas();
// //     window.addEventListener("resize", handleResize);

// //     return () => window.removeEventListener("resize", handleResize);
// //   }, [screen, initializeCanvas]);

// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [guesses]);

// //   const drawLine = useCallback((line, emit = false) => {
// //     const canvas = canvasRef.current;
// //     if (!canvas || !line?.from || !line?.to) return;

// //     const context = canvas.getContext("2d");
// //     const rect = canvas.getBoundingClientRect();

// //     context.beginPath();
// //     context.moveTo(
// //       line.from.x * rect.width,
// //       line.from.y * rect.height
// //     );
// //     context.lineTo(
// //       line.to.x * rect.width,
// //       line.to.y * rect.height
// //     );
// //     context.strokeStyle = line.color || "#ec4899";
// //     context.lineWidth = line.size || 5;
// //     context.lineCap = "round";
// //     context.lineJoin = "round";
// //     context.stroke();

// //     if (emit && socket && roomCode) {
// //       socket.emit("scribble:draw", {
// //         roomCode,
// //         line,
// //       });
// //     }
// //   }, [roomCode, socket]);

// //   const getPoint = (event) => {
// //     const canvas = canvasRef.current;
// //     const rect = canvas.getBoundingClientRect();

// //     return {
// //       x: (event.clientX - rect.left) / rect.width,
// //       y: (event.clientY - rect.top) / rect.height,
// //     };
// //   };

// //   const startDrawing = (event) => {
// //     if (!isDrawer || screen !== "game") return;

// //     event.preventDefault();
// //     event.currentTarget.setPointerCapture?.(event.pointerId);

// //     drawingRef.current = true;
// //     setIsDrawing(true);
// //     lastPointRef.current = getPoint(event);
// //   };

// //   const continueDrawing = (event) => {
// //     if (!drawingRef.current || !isDrawer) return;

// //     event.preventDefault();

// //     const nextPoint = getPoint(event);
// //     const line = {
// //       from: lastPointRef.current,
// //       to: nextPoint,
// //       color: isEraser ? "#ffffff" : brushColor,
// //       size: isEraser ? brushSize * 4 : brushSize,
// //     };

// //     drawLine(line, true);
// //     lastPointRef.current = nextPoint;
// //   };

// //   const stopDrawing = () => {
// //     drawingRef.current = false;
// //     lastPointRef.current = null;
// //     setIsDrawing(false);
// //   };

// //   const clearCanvas = () => {
// //     const canvas = canvasRef.current;
// //     if (!canvas) return;

// //     const context = canvas.getContext("2d");
// //     const rect = canvas.getBoundingClientRect();

// //     context.clearRect(0, 0, rect.width, rect.height);
// //     context.fillStyle = "#ffffff";
// //     context.fillRect(0, 0, rect.width, rect.height);

// //     socket?.emit("scribble:clear", { roomCode });
// //   };

// //   const startGame = () => {
// //     if (!socket || !roomCode) {
// //       setAnnouncement("Connect to the server before starting a game.");
// //       return;
// //     }

// //     socket.emit("scribble:start", { roomCode, mode });
// //   };

// //   const createRoom = () => {
// //     const name = playerName.trim();

// //     if (!name) {
// //       setAnnouncement("Enter your name first.");
// //       return;
// //     }

// //     if (!socket?.connected) {
// //       setAnnouncement("You're not connected to the game server yet.");
// //       return;
// //     }

// //     const code = makeRoomCode();
// //     setAnnouncement("");
// //     socket.emit("scribble:create-room", {
// //       roomCode: code,
// //       playerName: name,
// //       mode,
// //     });
// //   };

// //   const joinRoom = () => {
// //     const name = playerName.trim();
// //     const code = joinCode.trim().toUpperCase();

// //     if (!name) {
// //       setAnnouncement("Enter your name first.");
// //       return;
// //     }

// //     if (!code) {
// //       setAnnouncement("Enter a room code.");
// //       return;
// //     }

// //     if (!socket?.connected) {
// //       setAnnouncement("You're not connected to the game server yet.");
// //       return;
// //     }

// //     setAnnouncement("");
// //     socket.emit("scribble:join-room", {
// //       roomCode: code,
// //       playerName: name,
// //     });
// //   };

// //   const sendGuess = (event) => {
// //     event.preventDefault();

// //     const text = guess.trim();
// //     if (!text || !roomCode) return;

// //     socket?.emit("scribble:guess", {
// //       roomCode,
// //       guess: text,
// //     });

// //     setGuess("");
// //   };

// //   const copyRoomCode = async () => {
// //     try {
// //       await navigator.clipboard.writeText(roomCode);
// //       setCopied(true);
// //       window.setTimeout(() => setCopied(false), 1500);
// //     } catch {
// //       setAnnouncement(`Your room code is ${roomCode}. Copy it manually.`);
// //     }
// //   };

// //   const clearGameState = () => {
// //     if (timerRef.current) clearInterval(timerRef.current);

// //     setScreen("lobby");
// //     setRoomCode("");
// //     setPlayers([]);
// //     setHostId(null);
// //     setGameStarted(false);
// //     setCurrentDrawerId(null);
// //     setWord("");
// //     setWordHint("");
// //     setRound(1);
// //     setTimeLeft(ROUND_SECONDS);
// //     setScores({});
// //     setGuesses([]);
// //     setGuess("");
// //     setAnnouncement("");
// //   };

// //   const leaveRoom = () => {
// //     if (roomCode) {
// //       socket?.emit("scribble:leave-room", { roomCode });
// //     }

// //     clearGameState();
// //   };

// //   useEffect(() => {
// //     if (!socket) return;

// //     const handleRoomCreated = (data) => {
// //       setRoomCode(data.roomCode);
// //       setMode(data.mode || mode);
// //       setPlayers(data.players || []);
// //       setHostId(data.hostId || socket.id);
// //       setScores(data.scores || {});
// //       setScreen("room");
// //       setAnnouncement("");
// //     };

// //     const handleRoomJoined = (data) => {
// //       setRoomCode(data.roomCode);
// //       setMode(data.mode || "classic");
// //       setPlayers(data.players || []);
// //       setHostId(data.hostId);
// //       setScores(data.scores || {});
// //       setScreen(data.gameStarted ? "game" : "room");
// //       setGameStarted(Boolean(data.gameStarted));
// //       setAnnouncement("");
// //     };

// //     const handleRoomUpdate = (data) => {
// //       setPlayers(data.players || []);
// //       if (data.hostId) setHostId(data.hostId);
// //       if (data.scores) setScores(data.scores);
// //     };

// //     const handleGameStarted = (data) => {
// //       setScreen("game");
// //       setGameStarted(true);
// //       setRoomCode(data.roomCode || roomCode);
// //       setMode(data.mode || mode);
// //       setRound(data.round || 1);
// //       setTimeLeft(data.timeLeft ?? ROUND_SECONDS);
// //       setCurrentDrawerId(data.drawerId);
// //       setWord(data.word || "");
// //       setWordHint(data.wordHint || "");
// //       setGuesses([]);
// //       setScores(data.scores || {});
// //       setAnnouncement("");
// //       window.setTimeout(initializeCanvas, 50);
// //     };

// //     const handleRoundUpdate = (data) => {
// //       setRound(data.round || 1);
// //       setTimeLeft(data.timeLeft ?? ROUND_SECONDS);
// //       setCurrentDrawerId(data.drawerId);
// //       setWord(data.word || "");
// //       setWordHint(data.wordHint || "");
// //       setGuesses([]);
// //       setScores(data.scores || {});
// //       clearCanvas();
// //     };

// //     const handleDrawing = ({ line }) => drawLine(line, false);

// //     const handleCanvasClear = () => {
// //       const canvas = canvasRef.current;
// //       if (!canvas) return;

// //       const context = canvas.getContext("2d");
// //       const rect = canvas.getBoundingClientRect();
// //       context.clearRect(0, 0, rect.width, rect.height);
// //       context.fillStyle = "#ffffff";
// //       context.fillRect(0, 0, rect.width, rect.height);
// //     };

// //     const handleGuessUpdate = (data) => {
// //       setGuesses((previous) => [...previous, data]);
// //       if (data.scores) setScores(data.scores);
// //     };

// //     const handleTimerUpdate = (data) => {
// //       setTimeLeft(data.timeLeft);
// //     };

// //     const handleRoundEnded = (data) => {
// //       setAnnouncement(data.message || "Round finished!");
// //       setWord(data.word || word);
// //       if (data.scores) setScores(data.scores);
// //     };

// //     const handleGameEnded = (data) => {
// //       setScreen("results");
// //       setGameStarted(false);
// //       setScores(data.scores || {});
// //       setAnnouncement(data.message || "Game finished!");
// //     };

// //     const handleError = (data) => {
// //       setAnnouncement(
// //         typeof data === "string"
// //           ? data
// //           : data?.message || "Something went wrong."
// //       );
// //     };

// //     socket.on("scribble:room-created", handleRoomCreated);
// //     socket.on("scribble:room-joined", handleRoomJoined);
// //     socket.on("scribble:room-update", handleRoomUpdate);
// //     socket.on("scribble:game-started", handleGameStarted);
// //     socket.on("scribble:round-update", handleRoundUpdate);
// //     socket.on("scribble:draw", handleDrawing);
// //     socket.on("scribble:clear", handleCanvasClear);
// //     socket.on("scribble:guess-update", handleGuessUpdate);
// //     socket.on("scribble:timer", handleTimerUpdate);
// //     socket.on("scribble:round-ended", handleRoundEnded);
// //     socket.on("scribble:game-ended", handleGameEnded);
// //     socket.on("scribble:error", handleError);

// //     return () => {
// //       socket.off("scribble:room-created", handleRoomCreated);
// //       socket.off("scribble:room-joined", handleRoomJoined);
// //       socket.off("scribble:room-update", handleRoomUpdate);
// //       socket.off("scribble:game-started", handleGameStarted);
// //       socket.off("scribble:round-update", handleRoundUpdate);
// //       socket.off("scribble:draw", handleDrawing);
// //       socket.off("scribble:clear", handleCanvasClear);
// //       socket.off("scribble:guess-update", handleGuessUpdate);
// //       socket.off("scribble:timer", handleTimerUpdate);
// //       socket.off("scribble:round-ended", handleRoundEnded);
// //       socket.off("scribble:game-ended", handleGameEnded);
// //       socket.off("scribble:error", handleError);
// //     };
// //   }, [socket, mode, roomCode, word, drawLine, initializeCanvas]);

// //   useEffect(() => {
// //     if (screen !== "game" || timeLeft <= 0) return;

// //     timerRef.current = window.setInterval(() => {
// //       setTimeLeft((current) => Math.max(0, current - 1));
// //     }, 1000);

// //     return () => {
// //       if (timerRef.current) clearInterval(timerRef.current);
// //     };
// //   }, [screen, round]);

// //   const sortedPlayers = [...players].sort(
// //     (a, b) => (scores[b.id] || 0) - (scores[a.id] || 0)
// //   );

// //   const winner = [...players].sort(
// //     (a, b) => (scores[b.id] || 0) - (scores[a.id] || 0)
// //   )[0];

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-100 to-pink-200 px-4 py-6 text-slate-800 sm:px-6 lg:px-10">
// //       <div className="mx-auto max-w-7xl">
// //         <header className="mb-8 flex items-center justify-between gap-3">
// //           <button
// //             onClick={() => (screen === "lobby" ? navigate(-1) : leaveRoom())}
// //             className="inline-flex items-center gap-2 rounded-2xl border border-white/80 bg-white/70 px-4 py-2.5 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
// //           >
// //             <ArrowLeft size={17} />
// //             {screen === "lobby" ? "Back" : "Leave room"}
// //           </button>

// //           <div className="flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 shadow-sm">
// //             <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white">
// //               <Brush size={17} />
// //             </span>
// //             <span className="font-black tracking-tight">
// //               MilesCloser <span className="text-rose-500">Scribble</span>
// //             </span>
// //           </div>
// //         </header>

// //         {announcement && (
// //           <div className="mb-5 flex items-start justify-between gap-3 rounded-2xl border border-rose-200 bg-white/80 px-4 py-3 text-sm text-rose-700 shadow-sm">
// //             <span>{announcement}</span>
// //             <button
// //               onClick={() => setAnnouncement("")}
// //               aria-label="Dismiss message"
// //             >
// //               <X size={16} />
// //             </button>
// //           </div>
// //         )}

// //         {screen === "lobby" && (
// //           <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
// //             <section className="py-6 lg:py-12">
// //               <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/70 px-4 py-2 text-sm font-bold text-rose-600 shadow-sm">
// //                 <Sparkles size={16} />
// //                 Draw, guess, and make memories
// //               </div>

// //               <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
// //                 Your imagination,
// //                 <span className="block bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 bg-clip-text text-transparent">
// //                   one doodle away.
// //                 </span>
// //               </h1>

// //               <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
// //                 Challenge your friends, guess silly drawings, and see who
// //                 knows the other players best.
// //               </p>

// //               <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
// //                 {[
// //                   { icon: Users, value: "Live", label: "Multiplayer" },
// //                   { icon: Clock3, value: "60 sec", label: "Each round" },
// //                   { icon: Trophy, value: "5", label: "Rounds" },
// //                 ].map(({ icon: Icon, value, label }) => (
// //                   <div
// //                     key={label}
// //                     className="rounded-2xl border border-white/80 bg-white/60 p-4 shadow-sm backdrop-blur transition hover:-translate-y-1"
// //                   >
// //                     <Icon className="mb-3 text-rose-500" size={20} />
// //                     <p className="font-black">{value}</p>
// //                     <p className="mt-1 text-xs text-slate-500">{label}</p>
// //                   </div>
// //                 ))}
// //               </div>
// //             </section>

// //             <section className="rounded-[2rem] border border-white/80 bg-white/75 p-5 shadow-xl shadow-pink-300/20 backdrop-blur-xl sm:p-8">
// //               <div className="mb-6">
// //                 <p className="text-sm font-bold uppercase tracking-[0.2em] text-rose-500">
// //                   Game lobby
// //                 </p>
// //                 <h2 className="mt-2 text-2xl font-black">Ready to play?</h2>
// //                 <p className="mt-1 text-sm text-slate-500">
// //                   Start a new room or join someone else's.
// //                 </p>
// //               </div>

// //               <label className="mb-2 block text-sm font-bold">
// //                 Your display name
// //               </label>
// //               <input
// //                 value={playerName}
// //                 onChange={(event) => setPlayerName(event.target.value)}
// //                 maxLength={24}
// //                 placeholder="Enter your name..."
// //                 className="mb-6 w-full rounded-2xl border border-pink-100 bg-white px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
// //               />

// //               <p className="mb-3 text-sm font-bold">Choose your game style</p>
// //               <div className="mb-6 grid grid-cols-2 gap-3">
// //                 <button
// //                   onClick={() => setMode("classic")}
// //                   className={`rounded-2xl border p-4 text-left transition ${
// //                     mode === "classic"
// //                       ? "border-rose-400 bg-rose-50 ring-2 ring-rose-100"
// //                       : "border-pink-100 bg-white hover:border-pink-300"
// //                   }`}
// //                 >
// //                   <Brush className="mb-3 text-rose-500" size={23} />
// //                   <p className="font-black">Classic</p>
// //                   <p className="mt-1 text-xs leading-5 text-slate-500">
// //                     Random words, silly sketches.
// //                   </p>
// //                 </button>

// //                 <button
// //                   onClick={() => setMode("couple")}
// //                   className={`rounded-2xl border p-4 text-left transition ${
// //                     mode === "couple"
// //                       ? "border-rose-400 bg-rose-50 ring-2 ring-rose-100"
// //                       : "border-pink-100 bg-white hover:border-pink-300"
// //                   }`}
// //                 >
// //                   <Heart className="mb-3 text-pink-500" size={23} />
// //                   <p className="font-black">Couple Mode</p>
// //                   <p className="mt-1 text-xs leading-5 text-slate-500">
// //                     Dates, memories, and cute moments.
// //                   </p>
// //                 </button>
// //               </div>

// //               <button
// //                 onClick={createRoom}
// //                 className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-3.5 font-bold text-white shadow-lg shadow-pink-300/40 transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
// //               >
// //                 <Play size={18} fill="currentColor" />
// //                 Create a room
// //               </button>

// //               <div className="my-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
// //                 <span className="h-px flex-1 bg-pink-100" />
// //                 or join a room
// //                 <span className="h-px flex-1 bg-pink-100" />
// //               </div>

// //               <div className="flex gap-2">
// //                 <input
// //                   value={joinCode}
// //                   onChange={(event) =>
// //                     setJoinCode(event.target.value.toUpperCase().slice(0, 8))
// //                   }
// //                   maxLength={8}
// //                   placeholder="ROOM CODE"
// //                   className="min-w-0 flex-1 rounded-2xl border border-pink-100 bg-white px-4 py-3 font-bold uppercase tracking-widest outline-none placeholder:text-xs placeholder:font-medium placeholder:tracking-normal focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
// //                 />
// //                 <button
// //                   onClick={joinRoom}
// //                   className="rounded-2xl border border-pink-200 bg-pink-50 px-5 py-3 font-bold text-rose-600 transition hover:bg-pink-100"
// //                 >
// //                   Join
// //                 </button>
// //               </div>

// //               <p className="mt-5 text-center text-xs text-slate-400">
// //                 {socket?.connected
// //                   ? "Connected to the game server"
// //                   : "Waiting for server connection"}
// //               </p>
// //             </section>
// //           </div>
// //         )}

// //         {screen === "room" && (
// //           <div className="mx-auto max-w-3xl">
// //             <div className="rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-xl shadow-pink-300/20 backdrop-blur-xl sm:p-9">
// //               <div className="text-center">
// //                 <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-pink-100 text-rose-500">
// //                   <Users size={30} />
// //                 </div>
// //                 <p className="text-sm font-bold uppercase tracking-[0.2em] text-rose-500">
// //                   Waiting room
// //                 </p>
// //                 <h1 className="mt-2 text-3xl font-black">Invite your people</h1>
// //                 <p className="mt-2 text-slate-500">
// //                   Share this code with anyone you want to play with.
// //                 </p>

// //                 <button
// //                   onClick={copyRoomCode}
// //                   className="mx-auto mt-6 flex items-center gap-3 rounded-2xl border border-pink-200 bg-pink-50 px-6 py-4 transition hover:bg-pink-100"
// //                 >
// //                   <span className="text-2xl font-black tracking-[0.25em] text-rose-600">
// //                     {roomCode}
// //                   </span>
// //                   {copied ? <Check size={18} /> : <Copy size={18} />}
// //                 </button>
// //                 <p className="mt-2 text-xs text-slate-400">
// //                   {copied ? "Copied!" : "Click to copy room code"}
// //                 </p>
// //               </div>

// //               <div className="mt-8 rounded-2xl bg-rose-50/70 p-5">
// //                 <div className="mb-4 flex items-center justify-between">
// //                   <h2 className="font-black">Players in room</h2>
// //                   <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-rose-600">
// //                     {players.length}
// //                   </span>
// //                 </div>

// //                 <div className="space-y-3">
// //                   {players.map((player, index) => (
// //                     <div
// //                       key={player.id}
// //                       className="flex items-center gap-3 rounded-2xl border border-white bg-white/80 p-3"
// //                     >
// //                       <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 font-black text-white">
// //                         {(player.name || "?").slice(0, 1).toUpperCase()}
// //                       </div>
// //                       <div className="min-w-0 flex-1">
// //                         <p className="truncate font-bold">
// //                           {player.name}
// //                           {player.id === myId ? " (You)" : ""}
// //                         </p>
// //                         <p className="text-xs text-slate-500">
// //                           {player.id === hostId ? "Room host" : "Ready to play"}
// //                         </p>
// //                       </div>
// //                       {index === 0 && (
// //                         <Sparkles size={18} className="text-pink-400" />
// //                       )}
// //                     </div>
// //                   ))}

// //                   {players.length === 0 && (
// //                     <p className="py-4 text-center text-sm text-slate-500">
// //                       Waiting for players to join...
// //                     </p>
// //                   )}
// //                 </div>
// //               </div>

// //               <div className="mt-6 flex flex-col gap-3 sm:flex-row">
// //                 <button
// //                   onClick={leaveRoom}
// //                   className="rounded-2xl border border-pink-200 bg-white px-5 py-3 font-bold text-slate-600 transition hover:bg-pink-50"
// //                 >
// //                   Leave room
// //                 </button>
// //                 {isHost ? (
// //                   <button
// //                     onClick={startGame}
// //                     disabled={players.length < 2}
// //                     className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-3 font-bold text-white shadow-lg shadow-pink-300/40 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
// //                   >
// //                     <Play size={18} fill="currentColor" />
// //                     Start game
// //                   </button>
// //                 ) : (
// //                   <div className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-pink-50 px-5 py-3 font-semibold text-rose-500">
// //                     <Loader2 size={17} className="animate-spin" />
// //                     Waiting for host...
// //                   </div>
// //                 )}
// //               </div>
// //               {players.length < 2 && (
// //                 <p className="mt-3 text-center text-xs text-slate-400">
// //                   At least 2 players are needed to start.
// //                 </p>
// //               )}
// //             </div>
// //           </div>
// //         )}

// //         {screen === "game" && (
// //           <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
// //             <section className="min-w-0">
// //               <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm">
// //                 <div>
// //                   <p className="text-xs font-bold uppercase tracking-widest text-rose-500">
// //                     {mode === "couple" ? "💗 Couple Mode" : "🎨 Classic Mode"}
// //                   </p>
// //                   <h1 className="mt-1 text-xl font-black">
// //                     Round {round} of {TOTAL_ROUNDS}
// //                   </h1>
// //                 </div>
// //                 <div className={`flex items-center gap-2 rounded-xl px-4 py-2 font-black ${timeLeft <= 10 ? "animate-pulse bg-red-100 text-red-600" : "bg-pink-50 text-rose-600"}`}>
// //                   <Clock3 size={18} />
// //                   00:{String(timeLeft).padStart(2, "0")}
// //                 </div>
// //               </div>

// //               <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-sm">
// //                 <div>
// //                   <p className="text-xs text-slate-500">
// //                     {isDrawer ? "Your word to draw" : "Guess the drawing"}
// //                   </p>
// //                   <p className="font-black text-rose-600">
// //                     {isDrawer
// //                       ? word || "Your word is loading..."
// //                       : wordHint || "Watch the drawing!"}
// //                   </p>
// //                 </div>
// //                 {isDrawer && (
// //                   <button
// //                     onClick={clearCanvas}
// //                     className="rounded-xl border border-pink-100 bg-white px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-pink-50"
// //                   >
// //                     Clear canvas
// //                   </button>
// //                 )}
// //               </div>

// //               <div className="overflow-hidden rounded-[1.5rem] border-4 border-white bg-white shadow-xl shadow-pink-300/20">
// //                 <canvas
// //                   ref={canvasRef}
// //                   onPointerDown={startDrawing}
// //                   onPointerMove={continueDrawing}
// //                   onPointerUp={stopDrawing}
// //                   onPointerCancel={stopDrawing}
// //                   onPointerLeave={stopDrawing}
// //                   className={`block h-[360px] w-full touch-none sm:h-[500px] ${isDrawer ? "cursor-crosshair" : "cursor-default"}`}
// //                 />
// //               </div>

// //               <div className="mt-3 flex flex-wrap items-center gap-3 rounded-2xl border border-white/80 bg-white/80 p-3 shadow-sm">
// //                 <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
// //                   <Palette size={17} className="text-rose-500" />
// //                   Colors
// //                 </div>
// //                 <div className="flex flex-wrap items-center gap-2">
// //                   {COLORS.map((color) => (
// //                     <button
// //                       key={color}
// //                       onClick={() => {
// //                         setBrushColor(color);
// //                         setIsEraser(false);
// //                       }}
// //                       disabled={!isDrawer}
// //                       title={color}
// //                       className={`h-7 w-7 rounded-full border border-slate-200 transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50 ${brushColor === color && !isEraser ? "ring-2 ring-rose-400 ring-offset-2" : ""}`}
// //                       style={{ backgroundColor: color }}
// //                     />
// //                   ))}
// //                 </div>

// //                 <div className="mx-1 hidden h-7 w-px bg-pink-100 sm:block" />

// //                 <label className="flex items-center gap-2 text-xs font-bold text-slate-500">
// //                   Brush
// //                   <input
// //                     type="range"
// //                     min="2"
// //                     max="16"
// //                     value={brushSize}
// //                     onChange={(event) =>
// //                       setBrushSize(Number(event.target.value))
// //                     }
// //                     disabled={!isDrawer}
// //                     className="w-20 accent-rose-500 disabled:opacity-50"
// //                   />
// //                 </label>

// //                 <button
// //                   onClick={() => setIsEraser((previous) => !previous)}
// //                   disabled={!isDrawer}
// //                   className={`ml-auto flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition disabled:opacity-50 ${isEraser ? "bg-rose-500 text-white" : "bg-pink-50 text-rose-600 hover:bg-pink-100"}`}
// //                 >
// //                   <Eraser size={16} />
// //                   Eraser
// //                 </button>
// //               </div>

// //               {!isDrawer && (
// //                 <p className="mt-3 text-center text-sm text-slate-500">
// //                   {currentDrawerId
// //                     ? `${players.find((p) => p.id === currentDrawerId)?.name || "Someone"} is drawing. Guess below!`
// //                     : "Waiting for the next drawing..."}
// //                 </p>
// //               )}
// //             </section>

// //             <aside className="flex min-w-0 flex-col gap-5">
// //               <div className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm">
// //                 <h2 className="mb-4 flex items-center gap-2 font-black">
// //                   <Trophy size={18} className="text-rose-500" />
// //                   Scoreboard
// //                 </h2>
// //                 <div className="space-y-3">
// //                   {sortedPlayers.map((player, index) => (
// //                     <div
// //                       key={player.id}
// //                       className="flex items-center gap-3"
// //                     >
// //                       <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-50 text-sm font-black text-rose-500">
// //                         {index + 1}
// //                       </span>
// //                       <span className="min-w-0 flex-1 truncate text-sm font-semibold">
// //                         {player.name}
// //                         {player.id === myId ? " (You)" : ""}
// //                       </span>
// //                       <span className="font-black text-rose-600">
// //                         {scores[player.id] || 0}
// //                       </span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>

// //               <div className="flex min-h-[360px] flex-1 flex-col overflow-hidden rounded-2xl border border-white/80 bg-white/80 shadow-sm">
// //                 <div className="border-b border-pink-100 px-4 py-3">
// //                   <h2 className="font-black">Guesses & chat</h2>
// //                   <p className="mt-1 text-xs text-slate-500">
// //                     Correct guesses earn points.
// //                   </p>
// //                 </div>

// //                 <div className="flex-1 space-y-3 overflow-y-auto p-4">
// //                   {guesses.map((item, index) => (
// //                     <div
// //                       key={`${item.playerId || item.playerName}-${index}`}
// //                       className={`rounded-xl px-3 py-2 text-sm ${item.correct ? "bg-emerald-50 text-emerald-700" : "bg-pink-50 text-slate-700"}`}
// //                     >
// //                       <span className="font-bold">
// //                         {item.playerName || "Player"}:
// //                       </span>{" "}
// //                       {item.correct ? (
// //                         <span className="font-bold">
// //                           Guessed correctly! 🎉
// //                         </span>
// //                       ) : (
// //                         item.guess
// //                       )}
// //                     </div>
// //                   ))}

// //                   {guesses.length === 0 && (
// //                     <div className="flex h-full min-h-36 flex-col items-center justify-center text-center text-slate-400">
// //                       <Sparkles size={24} className="mb-2 text-pink-300" />
// //                       <p className="text-sm">Your guesses appear here.</p>
// //                     </div>
// //                   )}
// //                   <div ref={messagesEndRef} />
// //                 </div>

// //                 <form
// //                   onSubmit={sendGuess}
// //                   className="flex gap-2 border-t border-pink-100 p-3"
// //                 >
// //                   <input
// //                     value={guess}
// //                     onChange={(event) => setGuess(event.target.value)}
// //                     maxLength={100}
// //                     disabled={isDrawer}
// //                     placeholder={isDrawer ? "You're drawing..." : "Your guess..."}
// //                     className="min-w-0 flex-1 rounded-xl border border-pink-100 bg-white px-3 py-2.5 text-sm outline-none focus:border-pink-400 disabled:bg-slate-50"
// //                   />
// //                   <button
// //                     type="submit"
// //                     disabled={isDrawer || !guess.trim()}
// //                     aria-label="Send guess"
// //                     className="rounded-xl bg-rose-500 px-3 text-white transition hover:bg-rose-600 disabled:opacity-40"
// //                   >
// //                     <Send size={17} />
// //                   </button>
// //                 </form>
// //               </div>

// //               <button
// //                 onClick={leaveRoom}
// //                 className="rounded-2xl border border-rose-200 bg-white/70 px-4 py-3 text-sm font-bold text-rose-600 transition hover:bg-rose-50"
// //               >
// //                 Leave game
// //               </button>
// //             </aside>
// //           </div>
// //         )}

// //         {screen === "results" && (
// //           <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/80 bg-white/80 p-6 text-center shadow-xl shadow-pink-300/20 backdrop-blur-xl sm:p-10">
// //             <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-pink-100 text-rose-500">
// //               <Trophy size={38} />
// //             </div>
// //             <p className="text-sm font-bold uppercase tracking-[0.2em] text-rose-500">
// //               Game complete
// //             </p>
// //             <h1 className="mt-3 text-4xl font-black">
// //               {winner ? `${winner.name} wins!` : "Great game!"}
// //             </h1>
// //             <p className="mt-3 text-slate-500">
// //               {announcement || "Thanks for playing MilesCloser Scribble."}
// //             </p>

// //             <div className="mt-8 space-y-3 text-left">
// //               {sortedPlayers.map((player, index) => (
// //                 <div
// //                   key={player.id}
// //                   className="flex items-center gap-4 rounded-2xl border border-pink-100 bg-white p-4"
// //                 >
// //                   <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 font-black text-rose-500">
// //                     {index + 1}
// //                   </span>
// //                   <span className="flex-1 font-bold">{player.name}</span>
// //                   <span className="font-black text-rose-600">
// //                     {scores[player.id] || 0} pts
// //                   </span>
// //                 </div>
// //               ))}
// //             </div>

// //             <button
// //               onClick={clearGameState}
// //               className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-7 py-3.5 font-bold text-white shadow-lg shadow-pink-300/40 transition hover:-translate-y-0.5"
// //             >
// //               <Play size={18} fill="currentColor" />
// //               Back to lobby
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }



// import React, {
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   ArrowLeft,
//   Brush,
//   Check,
//   Clock3,
//   Copy,
//   Eraser,
//   Heart,
//   Loader2,
//   Palette,
//   Play,
//   Send,
//   Sparkles,
//   Users,
//   Trophy,
//   X,
// } from "lucide-react";

// import { useAuthStore } from "../utils/useAuthStore";

// const COLORS = [
//   "#1f2937",
//   "#ef4444",
//   "#f97316",
//   "#eab308",
//   "#22c55e",
//   "#06b6d4",
//   "#3b82f6",
//   "#8b5cf6",
//   "#ec4899",
//   "#ffffff",
// ];

// const ROUND_SECONDS = 60;
// const TOTAL_ROUNDS = 5;

// const makeRoomCode = () =>
//   Math.random().toString(36).substring(2, 7).toUpperCase();

// const getSocketId = (socket) => socket?.id;

// export default function ScribbleGame() {
//   const navigate = useNavigate();

//   const socket = useAuthStore((state) => state.socket);
//   const connectSocket = useAuthStore((state) => state.connectSocket);

//   const canvasRef = useRef(null);
//   const drawingRef = useRef(false);
//   const lastPointRef = useRef(null);
//   const timerRef = useRef(null);
//   const messagesEndRef = useRef(null);
//   const canvasInitializedRef = useRef(false);

//   const [screen, setScreen] = useState("lobby");
//   const [mode, setMode] = useState("classic");
//   const [roomCode, setRoomCode] = useState("");
//   const [joinCode, setJoinCode] = useState("");
//   const [playerName, setPlayerName] = useState("");
//   const [players, setPlayers] = useState([]);
//   const [hostId, setHostId] = useState(null);
//   const [gameStarted, setGameStarted] = useState(false);

//   const [currentDrawerId, setCurrentDrawerId] = useState(null);
//   const [word, setWord] = useState("");
//   const [wordHint, setWordHint] = useState("");
//   const [round, setRound] = useState(1);
//   const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
//   const [scores, setScores] = useState({});
//   const [guesses, setGuesses] = useState([]);
//   const [guess, setGuess] = useState("");
//   const [announcement, setAnnouncement] = useState("");

//   const [brushColor, setBrushColor] = useState("#ec4899");
//   const [brushSize, setBrushSize] = useState(5);
//   const [isEraser, setIsEraser] = useState(false);
//   const [copied, setCopied] = useState(false);

//   const myId = getSocketId(socket);
//   const isDrawer = currentDrawerId === myId;
//   const isHost = hostId === myId;

//   const sortedPlayers = [...players].sort(
//     (a, b) => (scores[b.id] || 0) - (scores[a.id] || 0)
//   );

//   const winner = sortedPlayers[0];

//   // Connect using the existing authenticated socket store.
//   useEffect(() => {
//     if (!socket || !socket.connected) {
//       connectSocket?.();
//     }
//   }, [socket, connectSocket]);

//   const initializeCanvas = useCallback(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const rect = canvas.getBoundingClientRect();
//     if (!rect.width || !rect.height) return;

//     const ratio = window.devicePixelRatio || 1;

//     canvas.width = Math.round(rect.width * ratio);
//     canvas.height = Math.round(rect.height * ratio);

//     const context = canvas.getContext("2d");
//     if (!context) return;

//     context.setTransform(ratio, 0, 0, ratio, 0, 0);
//     context.lineCap = "round";
//     context.lineJoin = "round";
//     context.fillStyle = "#ffffff";
//     context.fillRect(0, 0, rect.width, rect.height);

//     canvasInitializedRef.current = true;
//   }, []);

//   const clearCanvas = useCallback((emit = true) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const context = canvas.getContext("2d");
//     const rect = canvas.getBoundingClientRect();
//     if (!context) return;

//     context.clearRect(0, 0, rect.width, rect.height);
//     context.fillStyle = "#ffffff";
//     context.fillRect(0, 0, rect.width, rect.height);

//     if (emit && socket?.connected && roomCode) {
//       socket.emit("scribble:clear", { roomCode });
//     }
//   }, [roomCode, socket]);

//   useEffect(() => {
//     if (screen !== "game") return;

//     const initialize = () => initializeCanvas();

//     const frame = window.requestAnimationFrame(initialize);
//     window.addEventListener("resize", initialize);

//     return () => {
//       window.cancelAnimationFrame(frame);
//       window.removeEventListener("resize", initialize);
//     };
//   }, [screen, initializeCanvas]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//       block: "nearest",
//     });
//   }, [guesses]);

//   useEffect(() => {
//     return () => {
//       if (timerRef.current) {
//         window.clearInterval(timerRef.current);
//       }
//     };
//   }, []);

//   const drawLine = useCallback((line, emit = false) => {
//     const canvas = canvasRef.current;
//     if (!canvas || !line?.from || !line?.to) return;

//     const context = canvas.getContext("2d");
//     const rect = canvas.getBoundingClientRect();

//     if (!context || !rect.width || !rect.height) return;

//     context.beginPath();
//     context.moveTo(
//       line.from.x * rect.width,
//       line.from.y * rect.height
//     );
//     context.lineTo(
//       line.to.x * rect.width,
//       line.to.y * rect.height
//     );
//     context.strokeStyle = line.color || "#ec4899";
//     context.lineWidth = line.size || 5;
//     context.lineCap = "round";
//     context.lineJoin = "round";
//     context.stroke();

//     if (emit && socket?.connected && roomCode) {
//       socket.emit("scribble:draw", {
//         roomCode,
//         line,
//       });
//     }
//   }, [roomCode, socket]);

//   const getPoint = (event) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return null;

//     const rect = canvas.getBoundingClientRect();
//     if (!rect.width || !rect.height) return null;

//     return {
//       x: (event.clientX - rect.left) / rect.width,
//       y: (event.clientY - rect.top) / rect.height,
//     };
//   };

//   const startDrawing = (event) => {
//     if (!isDrawer || screen !== "game") return;

//     event.preventDefault();
//     event.currentTarget.setPointerCapture?.(event.pointerId);

//     const point = getPoint(event);
//     if (!point) return;

//     drawingRef.current = true;
//     lastPointRef.current = point;
//   };

//   const continueDrawing = (event) => {
//     if (!drawingRef.current || !isDrawer) return;

//     event.preventDefault();

//     const nextPoint = getPoint(event);
//     if (!nextPoint || !lastPointRef.current) return;

//     const line = {
//       from: lastPointRef.current,
//       to: nextPoint,
//       color: isEraser ? "#ffffff" : brushColor,
//       size: isEraser ? brushSize * 4 : brushSize,
//     };

//     drawLine(line, true);
//     lastPointRef.current = nextPoint;
//   };

//   const stopDrawing = () => {
//     drawingRef.current = false;
//     lastPointRef.current = null;
//   };

//   const createRoom = () => {
//     const name = playerName.trim();

//     if (!name) {
//       setAnnouncement("Enter your name first.");
//       return;
//     }

//     if (!socket?.connected) {
//       setAnnouncement(
//         "Connecting to the server. Please wait a moment and try again."
//       );
//       connectSocket?.();
//       return;
//     }

//     const code = makeRoomCode();

//     setAnnouncement("");

//     socket.emit("scribble:create-room", {
//       roomCode: code,
//       playerName: name,
//       mode,
//     });
//   };

//   const joinRoom = () => {
//     const name = playerName.trim();
//     const code = joinCode.trim().toUpperCase();

//     if (!name) {
//       setAnnouncement("Enter your name first.");
//       return;
//     }

//     if (!code) {
//       setAnnouncement("Enter a room code.");
//       return;
//     }

//     if (!socket?.connected) {
//       setAnnouncement(
//         "Connecting to the server. Please wait a moment and try again."
//       );
//       connectSocket?.();
//       return;
//     }

//     setAnnouncement("");

//     socket.emit("scribble:join-room", {
//       roomCode: code,
//       playerName: name,
//     });
//   };

//   const startGame = () => {
//     if (!socket?.connected || !roomCode) {
//       setAnnouncement("The server connection is unavailable.");
//       connectSocket?.();
//       return;
//     }

//     socket.emit("scribble:start", {
//       roomCode,
//       mode,
//     });
//   };

//   const sendGuess = (event) => {
//     event.preventDefault();

//     const text = guess.trim();
//     if (!text || !roomCode || !socket?.connected) return;

//     socket.emit("scribble:guess", {
//       roomCode,
//       guess: text,
//     });

//     setGuess("");
//   };

//   const copyRoomCode = async () => {
//     try {
//       await navigator.clipboard.writeText(roomCode);
//       setCopied(true);

//       window.setTimeout(() => setCopied(false), 1500);
//     } catch {
//       setAnnouncement(
//         `Your room code is ${roomCode}. Copy it manually.`
//       );
//     }
//   };

//   const clearGameState = () => {
//     if (timerRef.current) {
//       window.clearInterval(timerRef.current);
//       timerRef.current = null;
//     }

//     drawingRef.current = false;
//     lastPointRef.current = null;
//     canvasInitializedRef.current = false;

//     setScreen("lobby");
//     setRoomCode("");
//     setPlayers([]);
//     setHostId(null);
//     setGameStarted(false);
//     setCurrentDrawerId(null);
//     setWord("");
//     setWordHint("");
//     setRound(1);
//     setTimeLeft(ROUND_SECONDS);
//     setScores({});
//     setGuesses([]);
//     setGuess("");
//     setAnnouncement("");
//   };

//   const leaveRoom = () => {
//     if (roomCode && socket?.connected) {
//       socket.emit("scribble:leave-room", { roomCode });
//     }

//     clearGameState();
//   };

//   useEffect(() => {
//     if (!socket) return;

//     const handleRoomCreated = (data) => {
//       setRoomCode(data.roomCode);
//       setMode(data.mode || "classic");
//       setPlayers(data.players || []);
//       setHostId(data.hostId || socket.id);
//       setScores(data.scores || {});
//       setScreen("room");
//       setAnnouncement("");
//     };

//     const handleRoomJoined = (data) => {
//       setRoomCode(data.roomCode);
//       setMode(data.mode || "classic");
//       setPlayers(data.players || []);
//       setHostId(data.hostId || null);
//       setScores(data.scores || {});
//       setGameStarted(Boolean(data.gameStarted));
//       setScreen(data.gameStarted ? "game" : "room");
//       setAnnouncement("");
//     };

//     const handleRoomUpdate = (data) => {
//       setPlayers(data.players || []);
//       if (data.hostId) setHostId(data.hostId);
//       if (data.scores) setScores(data.scores);
//     };

//     const handleGameStarted = (data) => {
//       setScreen("game");
//       setGameStarted(true);
//       setRoomCode(data.roomCode || "");
//       setMode(data.mode || "classic");
//       setRound(data.round || 1);
//       setTimeLeft(data.timeLeft ?? ROUND_SECONDS);
//       setCurrentDrawerId(data.drawerId || null);
//       setWord(data.word || "");
//       setWordHint(data.wordHint || "");
//       setGuesses([]);
//       setScores(data.scores || {});
//       setAnnouncement("");

//       window.setTimeout(initializeCanvas, 50);
//     };

//     const handleRoundUpdate = (data) => {
//       setRound(data.round || 1);
//       setTimeLeft(data.timeLeft ?? ROUND_SECONDS);
//       setCurrentDrawerId(data.drawerId || null);
//       setWord(data.word || "");
//       setWordHint(data.wordHint || "");
//       setGuesses([]);
//       if (data.scores) setScores(data.scores);

//       clearCanvas(false);
//     };

//     const handleDrawing = (data) => {
//       if (data?.line) drawLine(data.line, false);
//     };

//     const handleCanvasClear = () => {
//       clearCanvas(false);
//     };

//     const handleGuessUpdate = (data) => {
//       setGuesses((previous) => [...previous, data]);
//       if (data.scores) setScores(data.scores);
//     };

//     const handleTimerUpdate = (data) => {
//       if (typeof data?.timeLeft === "number") {
//         setTimeLeft(data.timeLeft);
//       }
//     };

//     const handleRoundEnded = (data) => {
//       setAnnouncement(data.message || "Round finished!");
//       if (data.word) setWord(data.word);
//       if (data.scores) setScores(data.scores);
//     };

//     const handleGameEnded = (data) => {
//       setScreen("results");
//       setGameStarted(false);
//       setCurrentDrawerId(null);
//       setScores(data.scores || {});
//       setAnnouncement(data.message || "Game finished!");
//     };

//     const handleError = (data) => {
//       setAnnouncement(
//         typeof data === "string"
//           ? data
//           : data?.message || "Something went wrong."
//       );
//     };

//     socket.on("scribble:room-created", handleRoomCreated);
//     socket.on("scribble:room-joined", handleRoomJoined);
//     socket.on("scribble:room-update", handleRoomUpdate);
//     socket.on("scribble:game-started", handleGameStarted);
//     socket.on("scribble:round-update", handleRoundUpdate);
//     socket.on("scribble:draw", handleDrawing);
//     socket.on("scribble:clear", handleCanvasClear);
//     socket.on("scribble:guess-update", handleGuessUpdate);
//     socket.on("scribble:timer", handleTimerUpdate);
//     socket.on("scribble:round-ended", handleRoundEnded);
//     socket.on("scribble:game-ended", handleGameEnded);
//     socket.on("scribble:error", handleError);

//     return () => {
//       socket.off("scribble:room-created", handleRoomCreated);
//       socket.off("scribble:room-joined", handleRoomJoined);
//       socket.off("scribble:room-update", handleRoomUpdate);
//       socket.off("scribble:game-started", handleGameStarted);
//       socket.off("scribble:round-update", handleRoundUpdate);
//       socket.off("scribble:draw", handleDrawing);
//       socket.off("scribble:clear", handleCanvasClear);
//       socket.off("scribble:guess-update", handleGuessUpdate);
//       socket.off("scribble:timer", handleTimerUpdate);
//       socket.off("scribble:round-ended", handleRoundEnded);
//       socket.off("scribble:game-ended", handleGameEnded);
//       socket.off("scribble:error", handleError);
//     };
//   }, [
//     socket,
//     drawLine,
//     clearCanvas,
//     initializeCanvas,
//   ]);

//   useEffect(() => {
//     if (screen !== "game") {
//       if (timerRef.current) {
//         window.clearInterval(timerRef.current);
//         timerRef.current = null;
//       }
//       return;
//     }

//     if (timerRef.current) {
//       window.clearInterval(timerRef.current);
//     }

//     timerRef.current = window.setInterval(() => {
//       setTimeLeft((current) => {
//         if (current <= 1) {
//           window.clearInterval(timerRef.current);
//           timerRef.current = null;
//           return 0;
//         }

//         return current - 1;
//       });
//     }, 1000);

//     return () => {
//       if (timerRef.current) {
//         window.clearInterval(timerRef.current);
//         timerRef.current = null;
//       }
//     };
//   }, [screen, round]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-100 to-pink-200 px-4 py-6 text-slate-800 sm:px-6 lg:px-10">
//       <div className="mx-auto max-w-7xl">
//         <header className="mb-8 flex items-center justify-between gap-3">
//           <button
//             onClick={() => (screen === "lobby" ? navigate(-1) : leaveRoom())}
//             className="inline-flex items-center gap-2 rounded-2xl border border-white/80 bg-white/70 px-4 py-2.5 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
//           >
//             <ArrowLeft size={17} />
//             {screen === "lobby" ? "Back" : "Leave room"}
//           </button>

//           <div className="flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 shadow-sm">
//             <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white">
//               <Brush size={17} />
//             </span>
//             <span className="font-black tracking-tight">
//               MilesCloser <span className="text-rose-500">Scribble</span>
//             </span>
//           </div>
//         </header>

//         {announcement && (
//           <div className="mb-5 flex items-start justify-between gap-3 rounded-2xl border border-rose-200 bg-white/80 px-4 py-3 text-sm text-rose-700 shadow-sm">
//             <span>{announcement}</span>
//             <button
//               onClick={() => setAnnouncement("")}
//               aria-label="Dismiss message"
//             >
//               <X size={16} />
//             </button>
//           </div>
//         )}

//         {screen === "lobby" && (
//           <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
//             <section className="py-6 lg:py-12">
//               <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/70 px-4 py-2 text-sm font-bold text-rose-600 shadow-sm">
//                 <Sparkles size={16} />
//                 Draw, guess, and make memories
//               </div>

//               <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
//                 Your imagination,
//                 <span className="block bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 bg-clip-text text-transparent">
//                   one doodle away.
//                 </span>
//               </h1>

//               <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
//                 Challenge your friends, guess silly drawings, and see who
//                 knows the other players best.
//               </p>

//               <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
//                 {[
//                   { icon: Users, value: "Live", label: "Multiplayer" },
//                   { icon: Clock3, value: "60 sec", label: "Each round" },
//                   { icon: Trophy, value: "5", label: "Rounds" },
//                 ].map(({ icon: Icon, value, label }) => (
//                   <div
//                     key={label}
//                     className="rounded-2xl border border-white/80 bg-white/60 p-4 shadow-sm backdrop-blur transition hover:-translate-y-1"
//                   >
//                     <Icon className="mb-3 text-rose-500" size={20} />
//                     <p className="font-black">{value}</p>
//                     <p className="mt-1 text-xs text-slate-500">{label}</p>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             <section className="rounded-[2rem] border border-white/80 bg-white/75 p-5 shadow-xl shadow-pink-300/20 backdrop-blur-xl sm:p-8">
//               <div className="mb-6">
//                 <p className="text-sm font-bold uppercase tracking-[0.2em] text-rose-500">
//                   Game lobby
//                 </p>
//                 <h2 className="mt-2 text-2xl font-black">Ready to play?</h2>
//                 <p className="mt-1 text-sm text-slate-500">
//                   Start a new room or join someone else's.
//                 </p>
//               </div>

//               <label className="mb-2 block text-sm font-bold">
//                 Your display name
//               </label>
//               <input
//                 value={playerName}
//                 onChange={(event) => setPlayerName(event.target.value)}
//                 maxLength={24}
//                 placeholder="Enter your name..."
//                 className="mb-6 w-full rounded-2xl border border-pink-100 bg-white px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
//               />

//               <p className="mb-3 text-sm font-bold">Choose your game style</p>
//               <div className="mb-6 grid grid-cols-2 gap-3">
//                 <button
//                   onClick={() => setMode("classic")}
//                   className={`rounded-2xl border p-4 text-left transition ${
//                     mode === "classic"
//                       ? "border-rose-400 bg-rose-50 ring-2 ring-rose-100"
//                       : "border-pink-100 bg-white hover:border-pink-300"
//                   }`}
//                 >
//                   <Brush className="mb-3 text-rose-500" size={23} />
//                   <p className="font-black">Classic</p>
//                   <p className="mt-1 text-xs leading-5 text-slate-500">
//                     Random words, silly sketches.
//                   </p>
//                 </button>

//                 <button
//                   onClick={() => setMode("couple")}
//                   className={`rounded-2xl border p-4 text-left transition ${
//                     mode === "couple"
//                       ? "border-rose-400 bg-rose-50 ring-2 ring-rose-100"
//                       : "border-pink-100 bg-white hover:border-pink-300"
//                   }`}
//                 >
//                   <Heart className="mb-3 text-pink-500" size={23} />
//                   <p className="font-black">Couple Mode</p>
//                   <p className="mt-1 text-xs leading-5 text-slate-500">
//                     Dates, memories, and cute moments.
//                   </p>
//                 </button>
//               </div>

//               <button
//                 onClick={createRoom}
//                 className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-3.5 font-bold text-white shadow-lg shadow-pink-300/40 transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
//               >
//                 <Play size={18} fill="currentColor" />
//                 Create a room
//               </button>

//               <div className="my-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
//                 <span className="h-px flex-1 bg-pink-100" />
//                 or join a room
//                 <span className="h-px flex-1 bg-pink-100" />
//               </div>

//               <div className="flex gap-2">
//                 <input
//                   value={joinCode}
//                   onChange={(event) =>
//                     setJoinCode(event.target.value.toUpperCase().slice(0, 8))
//                   }
//                   maxLength={8}
//                   placeholder="ROOM CODE"
//                   className="min-w-0 flex-1 rounded-2xl border border-pink-100 bg-white px-4 py-3 font-bold uppercase tracking-widest outline-none placeholder:text-xs placeholder:font-medium placeholder:tracking-normal focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
//                 />
//                 <button
//                   onClick={joinRoom}
//                   className="rounded-2xl border border-pink-200 bg-pink-50 px-5 py-3 font-bold text-rose-600 transition hover:bg-pink-100"
//                 >
//                   Join
//                 </button>
//               </div>

//               <p className="mt-5 text-center text-xs text-slate-400">
//                 {socket?.connected
//                   ? "Connected to the game server"
//                   : "Waiting for server connection"}
//               </p>
//             </section>
//           </div>
//         )}

//         {screen === "room" && (
//           <div className="mx-auto max-w-3xl">
//             <div className="rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-xl shadow-pink-300/20 backdrop-blur-xl sm:p-9">
//               <div className="text-center">
//                 <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-pink-100 text-rose-500">
//                   <Users size={30} />
//                 </div>
//                 <p className="text-sm font-bold uppercase tracking-[0.2em] text-rose-500">
//                   Waiting room
//                 </p>
//                 <h1 className="mt-2 text-3xl font-black">Invite your people</h1>
//                 <p className="mt-2 text-slate-500">
//                   Share this code with anyone you want to play with.
//                 </p>

//                 <button
//                   onClick={copyRoomCode}
//                   className="mx-auto mt-6 flex items-center gap-3 rounded-2xl border border-pink-200 bg-pink-50 px-6 py-4 transition hover:bg-pink-100"
//                 >
//                   <span className="text-2xl font-black tracking-[0.25em] text-rose-600">
//                     {roomCode}
//                   </span>
//                   {copied ? <Check size={18} /> : <Copy size={18} />}
//                 </button>

//                 <p className="mt-2 text-xs text-slate-400">
//                   {copied ? "Copied!" : "Click to copy room code"}
//                 </p>
//               </div>

//               <div className="mt-8 rounded-2xl bg-rose-50/70 p-5">
//                 <div className="mb-4 flex items-center justify-between">
//                   <h2 className="font-black">Players in room</h2>
//                   <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-rose-600">
//                     {players.length}
//                   </span>
//                 </div>

//                 <div className="space-y-3">
//                   {players.map((player, index) => (
//                     <div
//                       key={player.id}
//                       className="flex items-center gap-3 rounded-2xl border border-white bg-white/80 p-3"
//                     >
//                       <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 font-black text-white">
//                         {(player.name || "?").slice(0, 1).toUpperCase()}
//                       </div>
//                       <div className="min-w-0 flex-1">
//                         <p className="truncate font-bold">
//                           {player.name}
//                           {player.id === myId ? " (You)" : ""}
//                         </p>
//                         <p className="text-xs text-slate-500">
//                           {player.id === hostId ? "Room host" : "Ready to play"}
//                         </p>
//                       </div>
//                       {index === 0 && (
//                         <Sparkles size={18} className="text-pink-400" />
//                       )}
//                     </div>
//                   ))}

//                   {players.length === 0 && (
//                     <p className="py-4 text-center text-sm text-slate-500">
//                       Waiting for players to join...
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="mt-6 flex flex-col gap-3 sm:flex-row">
//                 <button
//                   onClick={leaveRoom}
//                   className="rounded-2xl border border-pink-200 bg-white px-5 py-3 font-bold text-slate-600 transition hover:bg-pink-50"
//                 >
//                   Leave room
//                 </button>

//                 {isHost ? (
//                   <button
//                     onClick={startGame}
//                     disabled={players.length < 2}
//                     className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-3 font-bold text-white shadow-lg shadow-pink-300/40 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
//                   >
//                     <Play size={18} fill="currentColor" />
//                     Start game
//                   </button>
//                 ) : (
//                   <div className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-pink-50 px-5 py-3 font-semibold text-rose-500">
//                     <Loader2 size={17} className="animate-spin" />
//                     Waiting for host...
//                   </div>
//                 )}
//               </div>

//               {players.length < 2 && (
//                 <p className="mt-3 text-center text-xs text-slate-400">
//                   At least 2 players are needed to start.
//                 </p>
//               )}
//             </div>
//           </div>
//         )}

//         {screen === "game" && (
//           <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
//             <section className="min-w-0">
//               <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm">
//                 <div>
//                   <p className="text-xs font-bold uppercase tracking-widest text-rose-500">
//                     {mode === "couple" ? "💗 Couple Mode" : "🎨 Classic Mode"}
//                   </p>
//                   <h1 className="mt-1 text-xl font-black">
//                     Round {round} of {TOTAL_ROUNDS}
//                   </h1>
//                 </div>

//                 <div
//                   className={`flex items-center gap-2 rounded-xl px-4 py-2 font-black ${
//                     timeLeft <= 10
//                       ? "animate-pulse bg-red-100 text-red-600"
//                       : "bg-pink-50 text-rose-600"
//                   }`}
//                 >
//                   <Clock3 size={18} />
//                   00:{String(timeLeft).padStart(2, "0")}
//                 </div>
//               </div>

//               <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-sm">
//                 <div>
//                   <p className="text-xs text-slate-500">
//                     {isDrawer ? "Your word to draw" : "Guess the drawing"}
//                   </p>
//                   <p className="font-black text-rose-600">
//                     {isDrawer ? word || "Your word is loading..." : wordHint || "Watch the drawing!"}
//                   </p>
//                 </div>

//                 {isDrawer && (
//                   <button
//                     onClick={() => clearCanvas(true)}
//                     className="rounded-xl border border-pink-100 bg-white px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-pink-50"
//                   >
//                     Clear canvas
//                   </button>
//                 )}
//               </div>

//               <div className="overflow-hidden rounded-[1.5rem] border-4 border-white bg-white shadow-xl shadow-pink-300/20">
//                 <canvas
//                   ref={canvasRef}
//                   onPointerDown={startDrawing}
//                   onPointerMove={continueDrawing}
//                   onPointerUp={stopDrawing}
//                   onPointerCancel={stopDrawing}
//                   onPointerLeave={stopDrawing}
//                   className={`block h-[360px] w-full touch-none sm:h-[500px] ${isDrawer ? "cursor-crosshair" : "cursor-default"}`}
//                 />
//               </div>

//               <div className="mt-3 flex flex-wrap items-center gap-3 rounded-2xl border border-white/80 bg-white/80 p-3 shadow-sm">
//                 <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
//                   <Palette size={17} className="text-rose-500" />
//                   Colors
//                 </div>

//                 <div className="flex flex-wrap items-center gap-2">
//                   {COLORS.map((color) => (
//                     <button
//                       key={color}
//                       onClick={() => {
//                         setBrushColor(color);
//                         setIsEraser(false);
//                       }}
//                       disabled={!isDrawer}
//                       title={color}
//                       className={`h-7 w-7 rounded-full border border-slate-200 transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50 ${
//                         brushColor === color && !isEraser
//                           ? "ring-2 ring-rose-400 ring-offset-2"
//                           : ""
//                       }`}
//                       style={{ backgroundColor: color }}
//                     />
//                   ))}
//                 </div>

//                 <div className="mx-1 hidden h-7 w-px bg-pink-100 sm:block" />

//                 <label className="flex items-center gap-2 text-xs font-bold text-slate-500">
//                   Brush
//                   <input
//                     type="range"
//                     min="2"
//                     max="16"
//                     value={brushSize}
//                     onChange={(event) => setBrushSize(Number(event.target.value))}
//                     disabled={!isDrawer}
//                     className="w-20 accent-rose-500 disabled:opacity-50"
//                   />
//                 </label>

//                 <button
//                   onClick={() => setIsEraser((previous) => !previous)}
//                   disabled={!isDrawer}
//                   className={`ml-auto flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition disabled:opacity-50 ${
//                     isEraser
//                       ? "bg-rose-500 text-white"
//                       : "bg-pink-50 text-rose-600 hover:bg-pink-100"
//                   }`}
//                 >
//                   <Eraser size={16} />
//                   Eraser
//                 </button>
//               </div>

//               {!isDrawer && (
//                 <p className="mt-3 text-center text-sm text-slate-500">
//                   {currentDrawerId
//                     ? `${players.find((player) => player.id === currentDrawerId)?.name || "Someone"} is drawing. Guess below!`
//                     : "Waiting for the next drawing..."}
//                 </p>
//               )}
//             </section>

//             <aside className="flex min-w-0 flex-col gap-5">
//               <div className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm">
//                 <h2 className="mb-4 flex items-center gap-2 font-black">
//                   <Trophy size={18} className="text-rose-500" />
//                   Scoreboard
//                 </h2>

//                 <div className="space-y-3">
//                   {sortedPlayers.map((player, index) => (
//                     <div key={player.id} className="flex items-center gap-3">
//                       <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-50 text-sm font-black text-rose-500">
//                         {index + 1}
//                       </span>
//                       <span className="min-w-0 flex-1 truncate text-sm font-semibold">
//                         {player.name}
//                         {player.id === myId ? " (You)" : ""}
//                       </span>
//                       <span className="font-black text-rose-600">
//                         {scores[player.id] || 0}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="flex min-h-[360px] flex-1 flex-col overflow-hidden rounded-2xl border border-white/80 bg-white/80 shadow-sm">
//                 <div className="border-b border-pink-100 px-4 py-3">
//                   <h2 className="font-black">Guesses & chat</h2>
//                   <p className="mt-1 text-xs text-slate-500">
//                     Correct guesses earn points.
//                   </p>
//                 </div>

//                 <div className="flex-1 space-y-3 overflow-y-auto p-4">
//                   {guesses.map((item, index) => (
//                     <div
//                       key={`${item.playerId || item.playerName}-${index}`}
//                       className={`rounded-xl px-3 py-2 text-sm ${
//                         item.correct
//                           ? "bg-emerald-50 text-emerald-700"
//                           : "bg-pink-50 text-slate-700"
//                       }`}
//                     >
//                       <span className="font-bold">
//                         {item.playerName || "Player"}:
//                       </span>{" "}
//                       {item.correct ? (
//                         <span className="font-bold">Guessed correctly! 🎉</span>
//                       ) : (
//                         item.guess
//                       )}
//                     </div>
//                   ))}

//                   {guesses.length === 0 && (
//                     <div className="flex h-full min-h-36 flex-col items-center justify-center text-center text-slate-400">
//                       <Sparkles size={24} className="mb-2 text-pink-300" />
//                       <p className="text-sm">Your guesses appear here.</p>
//                     </div>
//                   )}

//                   <div ref={messagesEndRef} />
//                 </div>

//                 <form
//                   onSubmit={sendGuess}
//                   className="flex gap-2 border-t border-pink-100 p-3"
//                 >
//                   <input
//                     value={guess}
//                     onChange={(event) => setGuess(event.target.value)}
//                     maxLength={100}
//                     disabled={isDrawer}
//                     placeholder={isDrawer ? "You're drawing..." : "Your guess..."}
//                     className="min-w-0 flex-1 rounded-xl border border-pink-100 bg-white px-3 py-2.5 text-sm outline-none focus:border-pink-400 disabled:bg-slate-50"
//                   />
//                   <button
//                     type="submit"
//                     disabled={isDrawer || !guess.trim()}
//                     aria-label="Send guess"
//                     className="rounded-xl bg-rose-500 px-3 text-white transition hover:bg-rose-600 disabled:opacity-40"
//                   >
//                     <Send size={17} />
//                   </button>
//                 </form>
//               </div>

//               <button
//                 onClick={leaveRoom}
//                 className="rounded-2xl border border-rose-200 bg-white/70 px-4 py-3 text-sm font-bold text-rose-600 transition hover:bg-rose-50"
//               >
//                 Leave game
//               </button>
//             </aside>
//           </div>
//         )}

//         {screen === "results" && (
//           <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/80 bg-white/80 p-6 text-center shadow-xl shadow-pink-300/20 backdrop-blur-xl sm:p-10">
//             <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-pink-100 text-rose-500">
//               <Trophy size={38} />
//             </div>

//             <p className="text-sm font-bold uppercase tracking-[0.2em] text-rose-500">
//               Game complete
//             </p>

//             <h1 className="mt-3 text-4xl font-black">
//               {winner ? `${winner.name} wins!` : "Great game!"}
//             </h1>

//             <p className="mt-3 text-slate-500">
//               {announcement || "Thanks for playing MilesCloser Scribble."}
//             </p>

//             <div className="mt-8 space-y-3 text-left">
//               {sortedPlayers.map((player, index) => (
//                 <div
//                   key={player.id}
//                   className="flex items-center gap-4 rounded-2xl border border-pink-100 bg-white p-4"
//                 >
//                   <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 font-black text-rose-500">
//                     {index + 1}
//                   </span>
//                   <span className="flex-1 font-bold">{player.name}</span>
//                   <span className="font-black text-rose-600">
//                     {scores[player.id] || 0} pts
//                   </span>
//                 </div>
//               ))}
//             </div>

//             <button
//               onClick={clearGameState}
//               className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-7 py-3.5 font-bold text-white shadow-lg shadow-pink-300/40 transition hover:-translate-y-0.5"
//             >
//               <Play size={18} fill="currentColor" />
//               Back to lobby
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// import React, {
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   ArrowLeft,
//   Brush,
//   Check,
//   Clock3,
//   Copy,
//   Eraser,
//   Heart,
//   Loader2,
//   Palette,
//   Play,
//   Send,
//   Sparkles,
//   Users,
//   Trophy,
//   X,
// } from "lucide-react";

// import { useAuthStore } from "../utils/useAuthStore";

// const COLORS = [
//   "#1f2937",
//   "#ef4444",
//   "#f97316",
//   "#eab308",
//   "#22c55e",
//   "#06b6d4",
//   "#3b82f6",
//   "#8b5cf6",
//   "#ec4899",
//   "#ffffff",
// ];

// const ROUND_SECONDS = 60;
// const TOTAL_ROUNDS = 5;

// const makeRoomCode = () =>
//   Math.random().toString(36).substring(2, 7).toUpperCase();

// const getSocketId = (socket) => socket?.id;

// export default function ScribbleGame() {
//   const navigate = useNavigate();

//   const socket = useAuthStore((state) => state.socket);
//   const connectSocket = useAuthStore((state) => state.connectSocket);

//   const canvasRef = useRef(null);
//   const drawingRef = useRef(false);
//   const lastPointRef = useRef(null);
//   const timerRef = useRef(null);
//   const messagesEndRef = useRef(null);
//   const canvasInitializedRef = useRef(false);
//   const copyTimeoutRef = useRef(null);

//   const [screen, setScreen] = useState("lobby");
//   const [mode, setMode] = useState("classic");
//   const [roomCode, setRoomCode] = useState("");
//   const [joinCode, setJoinCode] = useState("");
//   const [playerName, setPlayerName] = useState("");
//   const [players, setPlayers] = useState([]);
//   const [hostId, setHostId] = useState(null);
//   const [gameStarted, setGameStarted] = useState(false);

//   const [currentDrawerId, setCurrentDrawerId] = useState(null);
//   const [word, setWord] = useState("");
//   const [wordHint, setWordHint] = useState("");
//   const [round, setRound] = useState(1);
//   const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
//   const [scores, setScores] = useState({});
//   const [guesses, setGuesses] = useState([]);
//   const [guess, setGuess] = useState("");
//   const [announcement, setAnnouncement] = useState("");

//   const [brushColor, setBrushColor] = useState("#ec4899");
//   const [brushSize, setBrushSize] = useState(5);
//   const [isEraser, setIsEraser] = useState(false);
//   const [copied, setCopied] = useState(false);

//   // The backend sends socket.id as the public player ID.
//   const myId = getSocketId(socket);
//   const isDrawer = Boolean(
//     myId && currentDrawerId === myId
//   );
//   const isHost = Boolean(myId && hostId === myId);

//   const sortedPlayers = [...players].sort(
//     (a, b) =>
//       (scores[b.id] ?? b.score ?? 0) -
//       (scores[a.id] ?? a.score ?? 0)
//   );

//   const winner = sortedPlayers[0];

//   useEffect(() => {
//     if (!socket || !socket.connected) {
//       connectSocket?.();
//     }
//   }, [socket, connectSocket]);

//   const initializeCanvas = useCallback(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const rect = canvas.getBoundingClientRect();
//     if (!rect.width || !rect.height) return;

//     const ratio = window.devicePixelRatio || 1;

//     canvas.width = Math.round(rect.width * ratio);
//     canvas.height = Math.round(rect.height * ratio);

//     const context = canvas.getContext("2d");
//     if (!context) return;

//     context.setTransform(ratio, 0, 0, ratio, 0, 0);
//     context.lineCap = "round";
//     context.lineJoin = "round";
//     context.fillStyle = "#ffffff";
//     context.fillRect(0, 0, rect.width, rect.height);

//     canvasInitializedRef.current = true;
//   }, []);

//   const clearCanvas = useCallback(
//     (emit = true) => {
//       const canvas = canvasRef.current;
//       if (!canvas) return;

//       const context = canvas.getContext("2d");
//       const rect = canvas.getBoundingClientRect();

//       if (!context) return;

//       context.clearRect(0, 0, rect.width, rect.height);
//       context.fillStyle = "#ffffff";
//       context.fillRect(0, 0, rect.width, rect.height);

//       if (emit && socket?.connected && roomCode) {
//         socket.emit("scribble:clear", { roomCode });
//       }
//     },
//     [roomCode, socket]
//   );

//   useEffect(() => {
//     if (screen !== "game") return;

//     const frame = window.requestAnimationFrame(initializeCanvas);
//     window.addEventListener("resize", initializeCanvas);

//     return () => {
//       window.cancelAnimationFrame(frame);
//       window.removeEventListener("resize", initializeCanvas);
//     };
//   }, [screen, initializeCanvas]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//       block: "nearest",
//     });
//   }, [guesses]);

//   useEffect(() => {
//     return () => {
//       if (timerRef.current) {
//         window.clearInterval(timerRef.current);
//       }

//       if (copyTimeoutRef.current) {
//         window.clearTimeout(copyTimeoutRef.current);
//       }
//     };
//   }, []);

//   const drawLine = useCallback(
//     (line, emit = false) => {
//       const canvas = canvasRef.current;
//       if (!canvas || !line?.from || !line?.to) return;

//       const context = canvas.getContext("2d");
//       const rect = canvas.getBoundingClientRect();

//       if (!context || !rect.width || !rect.height) return;

//       context.beginPath();
//       context.moveTo(
//         line.from.x * rect.width,
//         line.from.y * rect.height
//       );
//       context.lineTo(
//         line.to.x * rect.width,
//         line.to.y * rect.height
//       );
//       context.strokeStyle = line.color || "#ec4899";
//       context.lineWidth = line.size || 5;
//       context.lineCap = "round";
//       context.lineJoin = "round";
//       context.stroke();

//       if (emit && socket?.connected && roomCode) {
//         socket.emit("scribble:draw", {
//           roomCode,
//           line,
//         });
//       }
//     },
//     [roomCode, socket]
//   );

//   const getPoint = (event) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return null;

//     const rect = canvas.getBoundingClientRect();
//     if (!rect.width || !rect.height) return null;

//     return {
//       x: (event.clientX - rect.left) / rect.width,
//       y: (event.clientY - rect.top) / rect.height,
//     };
//   };

//   const startDrawing = (event) => {
//     if (!isDrawer || screen !== "game") return;

//     event.preventDefault();
//     event.currentTarget.setPointerCapture?.(event.pointerId);

//     const point = getPoint(event);
//     if (!point) return;

//     drawingRef.current = true;
//     lastPointRef.current = point;
//   };

//   const continueDrawing = (event) => {
//     if (!drawingRef.current || !isDrawer) return;

//     event.preventDefault();

//     const nextPoint = getPoint(event);
//     if (!nextPoint || !lastPointRef.current) return;

//     const line = {
//       from: lastPointRef.current,
//       to: nextPoint,
//       color: isEraser ? "#ffffff" : brushColor,
//       size: isEraser ? brushSize * 4 : brushSize,
//     };

//     drawLine(line, true);
//     lastPointRef.current = nextPoint;
//   };

//   const stopDrawing = () => {
//     drawingRef.current = false;
//     lastPointRef.current = null;
//   };

//   const createRoom = () => {
//     const name = playerName.trim();

//     if (!name) {
//       setAnnouncement("Enter your name first.");
//       return;
//     }

//     if (!socket?.connected) {
//       setAnnouncement(
//         "Connecting to the server. Please wait a moment and try again."
//       );
//       connectSocket?.();
//       return;
//     }

//     setAnnouncement("");

//     socket.emit("scribble:create-room", {
//       playerName: name,
//       mode,
//     });
//   };

//   const joinRoom = () => {
//     const name = playerName.trim();
//     const code = joinCode.trim().toUpperCase();

//     if (!name) {
//       setAnnouncement("Enter your name first.");
//       return;
//     }

//     if (!code) {
//       setAnnouncement("Enter a room code.");
//       return;
//     }

//     if (!socket?.connected) {
//       setAnnouncement(
//         "Connecting to the server. Please wait a moment and try again."
//       );
//       connectSocket?.();
//       return;
//     }

//     setAnnouncement("");

//     socket.emit("scribble:join-room", {
//       roomCode: code,
//       playerName: name,
//     });
//   };

//   const startGame = () => {
//     if (!socket?.connected || !roomCode) {
//       setAnnouncement("The server connection is unavailable.");
//       connectSocket?.();
//       return;
//     }

//     if (!isHost) {
//       setAnnouncement("Only the room host can start the game.");
//       return;
//     }

//     if (players.length < 2) {
//       setAnnouncement("At least 2 players are needed to start.");
//       return;
//     }

//     socket.emit("scribble:start", { roomCode });
//   };

//   const sendGuess = (event) => {
//     event.preventDefault();

//     const text = guess.trim();
//     if (!text || !roomCode || !socket?.connected) return;

//     socket.emit("scribble:guess", {
//       roomCode,
//       guess: text,
//     });

//     setGuess("");
//   };

//   const copyRoomCode = async () => {
//     try {
//       await navigator.clipboard.writeText(roomCode);
//       setCopied(true);

//       if (copyTimeoutRef.current) {
//         window.clearTimeout(copyTimeoutRef.current);
//       }

//       copyTimeoutRef.current = window.setTimeout(
//         () => setCopied(false),
//         1500
//       );
//     } catch {
//       setAnnouncement(
//         `Your room code is ${roomCode}. Copy it manually.`
//       );
//     }
//   };

//   const clearGameState = () => {
//     if (timerRef.current) {
//       window.clearInterval(timerRef.current);
//       timerRef.current = null;
//     }

//     drawingRef.current = false;
//     lastPointRef.current = null;
//     canvasInitializedRef.current = false;

//     setScreen("lobby");
//     setRoomCode("");
//     setJoinCode("");
//     setPlayers([]);
//     setHostId(null);
//     setGameStarted(false);
//     setCurrentDrawerId(null);
//     setWord("");
//     setWordHint("");
//     setRound(1);
//     setTimeLeft(ROUND_SECONDS);
//     setScores({});
//     setGuesses([]);
//     setGuess("");
//     setAnnouncement("");
//     setCopied(false);
//   };

//   const leaveRoom = () => {
//     if (roomCode && socket?.connected) {
//       socket.emit("scribble:leave-room", { roomCode });
//     }

//     clearGameState();
//   };

//   useEffect(() => {
//     if (!socket) return;

//     const handleRoomCreated = (data) => {
//       setRoomCode(data.roomCode || data.code || "");
//       setMode(data.mode || "classic");
//       setPlayers(data.players || []);
//       setHostId(data.hostId || data.playerId || null);
//       setScores(
//         data.scores ||
//           Object.fromEntries(
//             (data.players || []).map((player) => [
//               player.id,
//               player.score || 0,
//             ])
//           )
//       );
//       setGameStarted(false);
//       setScreen("room");
//       setAnnouncement("");
//     };

//     const handleRoomJoined = (data) => {
//       setRoomCode(data.roomCode || data.code || "");
//       setMode(data.mode || "classic");
//       setPlayers(data.players || []);
//       setHostId(data.hostId || null);
//       setScores(
//         data.scores ||
//           Object.fromEntries(
//             (data.players || []).map((player) => [
//               player.id,
//               player.score || 0,
//             ])
//           )
//       );

//       const started =
//         data.status === "playing" || Boolean(data.gameStarted);

//       setGameStarted(started);
//       setScreen(started ? "game" : "room");
//       setAnnouncement("");
//     };

//     const handleRoomUpdate = (data) => {
//       setPlayers(data.players || []);

//       if (data.hostId) {
//         setHostId(data.hostId);
//       }

//       if (data.scores) {
//         setScores(data.scores);
//       } else if (Array.isArray(data.players)) {
//         setScores(
//           Object.fromEntries(
//             data.players.map((player) => [
//               player.id,
//               player.score || 0,
//             ])
//           )
//         );
//       }

//       if (data.status === "playing") {
//         setGameStarted(true);
//       } else if (data.status === "waiting") {
//         setGameStarted(false);
//       }
//     };

//     const handleGameStarted = (data) => {
//       setScreen("game");
//       setGameStarted(true);

//       if (data.roomCode || data.code) {
//         setRoomCode(data.roomCode || data.code);
//       }

//       setMode(data.mode || "classic");
//       setRound(data.currentRound || data.round || 1);
//       setTimeLeft(data.timeLeft ?? ROUND_SECONDS);
//       setCurrentDrawerId(data.drawerId || null);

//       // The word is sent privately through round-update.
//       // Do not overwrite it with an empty value here.
//       if (data.word !== undefined) {
//         setWord(data.word);
//       }

//       if (data.wordHint !== undefined) {
//         setWordHint(data.wordHint);
//       }

//       setGuesses([]);

//       if (data.scores) {
//         setScores(data.scores);
//       }

//       setAnnouncement("");
//       window.setTimeout(initializeCanvas, 50);
//     };

//     const handleRoundUpdate = (data) => {
//       setRound(data.currentRound || data.round || 1);
//       setTimeLeft(data.timeLeft ?? ROUND_SECONDS);
//       setCurrentDrawerId(data.drawerId || null);
//       setWord(data.word ?? "");
//       setWordHint(data.wordHint ?? "");
//       setGuesses([]);

//       if (data.scores) {
//         setScores(data.scores);
//       }

//       window.setTimeout(() => clearCanvas(false), 0);
//     };

//     const handleDrawing = (data) => {
//       if (data?.line) {
//         drawLine(data.line, false);
//       }
//     };

//     const handleCanvasClear = () => {
//       clearCanvas(false);
//     };

//     const handleGuessUpdate = (data) => {
//       setGuesses((previous) => [...previous, data]);

//       if (data.scores) {
//         setScores(data.scores);
//       }
//     };

//     const handleTimerUpdate = (data) => {
//       if (typeof data?.timeLeft === "number") {
//         setTimeLeft(data.timeLeft);
//       }
//     };

//     const handleRoundEnded = (data) => {
//       setAnnouncement(data.message || "Round finished!");

//       if (data.word) {
//         setWord(data.word);
//       }

//       if (data.scores) {
//         setScores(data.scores);
//       }
//     };

//     const handleGameEnded = (data) => {
//       setScreen("results");
//       setGameStarted(false);
//       setCurrentDrawerId(null);

//       if (data.scores) {
//         setScores(data.scores);
//       }

//       if (data.message) {
//         setAnnouncement(data.message);
//       }
//     };

//     const handleError = (data) => {
//       setAnnouncement(
//         typeof data === "string"
//           ? data
//           : data?.message || "Something went wrong."
//       );
//     };

//     socket.on("scribble:room-created", handleRoomCreated);
//     socket.on("scribble:room-joined", handleRoomJoined);
//     socket.on("scribble:room-update", handleRoomUpdate);
//     socket.on("scribble:game-started", handleGameStarted);
//     socket.on("scribble:round-update", handleRoundUpdate);
//     socket.on("scribble:draw", handleDrawing);
//     socket.on("scribble:clear", handleCanvasClear);
//     socket.on("scribble:guess-update", handleGuessUpdate);
//     socket.on("scribble:timer", handleTimerUpdate);
//     socket.on("scribble:round-ended", handleRoundEnded);
//     socket.on("scribble:game-ended", handleGameEnded);
//     socket.on("scribble:error", handleError);

//     return () => {
//       socket.off("scribble:room-created", handleRoomCreated);
//       socket.off("scribble:room-joined", handleRoomJoined);
//       socket.off("scribble:room-update", handleRoomUpdate);
//       socket.off("scribble:game-started", handleGameStarted);
//       socket.off("scribble:round-update", handleRoundUpdate);
//       socket.off("scribble:draw", handleDrawing);
//       socket.off("scribble:clear", handleCanvasClear);
//       socket.off("scribble:guess-update", handleGuessUpdate);
//       socket.off("scribble:timer", handleTimerUpdate);
//       socket.off("scribble:round-ended", handleRoundEnded);
//       socket.off("scribble:game-ended", handleGameEnded);
//       socket.off("scribble:error", handleError);
//     };
//   }, [
//     socket,
//     drawLine,
//     clearCanvas,
//     initializeCanvas,
//   ]);

//   useEffect(() => {
//     if (screen !== "game") {
//       if (timerRef.current) {
//         window.clearInterval(timerRef.current);
//         timerRef.current = null;
//       }
//       return;
//     }

//     if (timerRef.current) {
//       window.clearInterval(timerRef.current);
//     }

//     timerRef.current = window.setInterval(() => {
//       setTimeLeft((current) => {
//         if (current <= 1) {
//           window.clearInterval(timerRef.current);
//           timerRef.current = null;
//           return 0;
//         }

//         return current - 1;
//       });
//     }, 1000);

//     return () => {
//       if (timerRef.current) {
//         window.clearInterval(timerRef.current);
//         timerRef.current = null;
//       }
//     };
//   }, [screen, round]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-100 to-pink-200 px-4 py-6 text-slate-800 sm:px-6 lg:px-10">
//       <div className="mx-auto max-w-7xl">
//         <header className="mb-8 flex items-center justify-between gap-3">
//           <button
//             onClick={() => (screen === "lobby" ? navigate(-1) : leaveRoom())}
//             className="inline-flex items-center gap-2 rounded-2xl border border-white/80 bg-white/70 px-4 py-2.5 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
//           >
//             <ArrowLeft size={17} />
//             {screen === "lobby" ? "Back" : "Leave room"}
//           </button>

//           <div className="flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 shadow-sm">
//             <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white">
//               <Brush size={17} />
//             </span>
//             <span className="font-black tracking-tight">
//               MilesCloser <span className="text-rose-500">Scribble</span>
//             </span>
//           </div>
//         </header>

//         {announcement && (
//           <div className="mb-5 flex items-start justify-between gap-3 rounded-2xl border border-rose-200 bg-white/80 px-4 py-3 text-sm text-rose-700 shadow-sm">
//             <span>{announcement}</span>
//             <button
//               onClick={() => setAnnouncement("")}
//               aria-label="Dismiss message"
//             >
//               <X size={16} />
//             </button>
//           </div>
//         )}

//         {screen === "lobby" && (
//           <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
//             <section className="py-6 lg:py-12">
//               <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/70 px-4 py-2 text-sm font-bold text-rose-600 shadow-sm">
//                 <Sparkles size={16} />
//                 Draw, guess, and make memories
//               </div>

//               <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
//                 Your imagination,
//                 <span className="block bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 bg-clip-text text-transparent">
//                   one doodle away.
//                 </span>
//               </h1>

//               <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
//                 Challenge your friends, guess silly drawings, and see who
//                 knows the other players best.
//               </p>

//               <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
//                 {[
//                   { icon: Users, value: "Live", label: "Multiplayer" },
//                   { icon: Clock3, value: "60 sec", label: "Each round" },
//                   { icon: Trophy, value: "5", label: "Rounds" },
//                 ].map(({ icon: Icon, value, label }) => (
//                   <div
//                     key={label}
//                     className="rounded-2xl border border-white/80 bg-white/60 p-4 shadow-sm backdrop-blur transition hover:-translate-y-1"
//                   >
//                     <Icon className="mb-3 text-rose-500" size={20} />
//                     <p className="font-black">{value}</p>
//                     <p className="mt-1 text-xs text-slate-500">{label}</p>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             <section className="rounded-[2rem] border border-white/80 bg-white/75 p-5 shadow-xl shadow-pink-300/20 backdrop-blur-xl sm:p-8">
//               <div className="mb-6">
//                 <p className="text-sm font-bold uppercase tracking-[0.2em] text-rose-500">
//                   Game lobby
//                 </p>
//                 <h2 className="mt-2 text-2xl font-black">Ready to play?</h2>
//                 <p className="mt-1 text-sm text-slate-500">
//                   Start a new room or join someone else's.
//                 </p>
//               </div>

//               <label className="mb-2 block text-sm font-bold">
//                 Your display name
//               </label>
//               <input
//                 value={playerName}
//                 onChange={(event) => setPlayerName(event.target.value)}
//                 maxLength={24}
//                 placeholder="Enter your name..."
//                 className="mb-6 w-full rounded-2xl border border-pink-100 bg-white px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
//               />

//               <p className="mb-3 text-sm font-bold">Choose your game style</p>
//               <div className="mb-6 grid grid-cols-2 gap-3">
//                 <button
//                   onClick={() => setMode("classic")}
//                   className={`rounded-2xl border p-4 text-left transition ${
//                     mode === "classic"
//                       ? "border-rose-400 bg-rose-50 ring-2 ring-rose-100"
//                       : "border-pink-100 bg-white hover:border-pink-300"
//                   }`}
//                 >
//                   <Brush className="mb-3 text-rose-500" size={23} />
//                   <p className="font-black">Classic</p>
//                   <p className="mt-1 text-xs leading-5 text-slate-500">
//                     Random words, silly sketches.
//                   </p>
//                 </button>

//                 <button
//                   onClick={() => setMode("couple")}
//                   className={`rounded-2xl border p-4 text-left transition ${
//                     mode === "couple"
//                       ? "border-rose-400 bg-rose-50 ring-2 ring-rose-100"
//                       : "border-pink-100 bg-white hover:border-pink-300"
//                   }`}
//                 >
//                   <Heart className="mb-3 text-pink-500" size={23} />
//                   <p className="font-black">Couple Mode</p>
//                   <p className="mt-1 text-xs leading-5 text-slate-500">
//                     Dates, memories, and cute moments.
//                   </p>
//                 </button>
//               </div>

//               <button
//                 onClick={createRoom}
//                 className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-3.5 font-bold text-white shadow-lg shadow-pink-300/40 transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
//               >
//                 <Play size={18} fill="currentColor" />
//                 Create a room
//               </button>

//               <div className="my-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
//                 <span className="h-px flex-1 bg-pink-100" />
//                 or join a room
//                 <span className="h-px flex-1 bg-pink-100" />
//               </div>

//               <div className="flex gap-2">
//                 <input
//                   value={joinCode}
//                   onChange={(event) =>
//                     setJoinCode(event.target.value.toUpperCase().slice(0, 8))
//                   }
//                   maxLength={8}
//                   placeholder="ROOM CODE"
//                   className="min-w-0 flex-1 rounded-2xl border border-pink-100 bg-white px-4 py-3 font-bold uppercase tracking-widest outline-none placeholder:text-xs placeholder:font-medium placeholder:tracking-normal focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
//                 />
//                 <button
//                   onClick={joinRoom}
//                   className="rounded-2xl border border-pink-200 bg-pink-50 px-5 py-3 font-bold text-rose-600 transition hover:bg-pink-100"
//                 >
//                   Join
//                 </button>
//               </div>

//               <p className="mt-5 text-center text-xs text-slate-400">
//                 {socket?.connected
//                   ? "Connected to the game server"
//                   : "Waiting for server connection"}
//               </p>
//             </section>
//           </div>
//         )}

//         {screen === "room" && (
//           <div className="mx-auto max-w-3xl">
//             <div className="rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-xl shadow-pink-300/20 backdrop-blur-xl sm:p-9">
//               <div className="text-center">
//                 <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-pink-100 text-rose-500">
//                   <Users size={30} />
//                 </div>
//                 <p className="text-sm font-bold uppercase tracking-[0.2em] text-rose-500">
//                   Waiting room
//                 </p>
//                 <h1 className="mt-2 text-3xl font-black">Invite your people</h1>
//                 <p className="mt-2 text-slate-500">
//                   Share this code with anyone you want to play with.
//                 </p>

//                 <button
//                   onClick={copyRoomCode}
//                   className="mx-auto mt-6 flex items-center gap-3 rounded-2xl border border-pink-200 bg-pink-50 px-6 py-4 transition hover:bg-pink-100"
//                 >
//                   <span className="text-2xl font-black tracking-[0.25em] text-rose-600">
//                     {roomCode}
//                   </span>
//                   {copied ? <Check size={18} /> : <Copy size={18} />}
//                 </button>

//                 <p className="mt-2 text-xs text-slate-400">
//                   {copied ? "Copied!" : "Click to copy room code"}
//                 </p>
//               </div>

//               <div className="mt-8 rounded-2xl bg-rose-50/70 p-5">
//                 <div className="mb-4 flex items-center justify-between">
//                   <h2 className="font-black">Players in room</h2>
//                   <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-rose-600">
//                     {players.length}
//                   </span>
//                 </div>

//                 <div className="space-y-3">
//                   {players.map((player, index) => (
//                     <div
//                       key={player.id}
//                       className="flex items-center gap-3 rounded-2xl border border-white bg-white/80 p-3"
//                     >
//                       <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 font-black text-white">
//                         {(player.name || player.playerName || "?")
//                           .slice(0, 1)
//                           .toUpperCase()}
//                       </div>
//                       <div className="min-w-0 flex-1">
//                         <p className="truncate font-bold">
//                           {player.name || player.playerName}
//                           {player.id === myId ? " (You)" : ""}
//                         </p>
//                         <p className="text-xs text-slate-500">
//                           {player.id === hostId ? "Room host" : "Ready to play"}
//                         </p>
//                       </div>
//                       {player.id === hostId && (
//                         <Sparkles size={18} className="text-pink-400" />
//                       )}
//                     </div>
//                   ))}

//                   {players.length === 0 && (
//                     <p className="py-4 text-center text-sm text-slate-500">
//                       Waiting for players to join...
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="mt-6 flex flex-col gap-3 sm:flex-row">
//                 <button
//                   onClick={leaveRoom}
//                   className="rounded-2xl border border-pink-200 bg-white px-5 py-3 font-bold text-slate-600 transition hover:bg-pink-50"
//                 >
//                   Leave room
//                 </button>

//                 {isHost ? (
//                   <button
//                     onClick={startGame}
//                     disabled={!socket?.connected || players.length < 2}
//                     className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-3 font-bold text-white shadow-lg shadow-pink-300/40 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
//                   >
//                     <Play size={18} fill="currentColor" />
//                     Start game
//                   </button>
//                 ) : (
//                   <div className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-pink-50 px-5 py-3 font-semibold text-rose-500">
//                     <Loader2 size={17} className="animate-spin" />
//                     Waiting for host...
//                   </div>
//                 )}
//               </div>

//               {players.length < 2 && (
//                 <p className="mt-3 text-center text-xs text-slate-400">
//                   At least 2 players are needed to start.
//                 </p>
//               )}
//             </div>
//           </div>
//         )}

//         {screen === "game" && (
//           <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
//             <section className="min-w-0">
//               <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm">
//                 <div>
//                   <p className="text-xs font-bold uppercase tracking-widest text-rose-500">
//                     {mode === "couple" ? "💗 Couple Mode" : "🎨 Classic Mode"}
//                   </p>
//                   <h1 className="mt-1 text-xl font-black">
//                     Round {round} of {TOTAL_ROUNDS}
//                   </h1>
//                 </div>

//                 <div
//                   className={`flex items-center gap-2 rounded-xl px-4 py-2 font-black ${
//                     timeLeft <= 10
//                       ? "animate-pulse bg-red-100 text-red-600"
//                       : "bg-pink-50 text-rose-600"
//                   }`}
//                 >
//                   <Clock3 size={18} />
//                   00:{String(timeLeft).padStart(2, "0")}
//                 </div>
//               </div>

//               <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-sm">
//                 <div>
//                   <p className="text-xs text-slate-500">
//                     {isDrawer ? "Your word to draw" : "Guess the drawing"}
//                   </p>
//                   <p className="font-black text-rose-600">
//                     {isDrawer
//                       ? word || "Your word is loading..."
//                       : wordHint || "Watch the drawing!"}
//                   </p>
//                 </div>

//                 {isDrawer && (
//                   <button
//                     onClick={() => clearCanvas(true)}
//                     className="rounded-xl border border-pink-100 bg-white px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-pink-50"
//                   >
//                     Clear canvas
//                   </button>
//                 )}
//               </div>

//               <div className="overflow-hidden rounded-[1.5rem] border-4 border-white bg-white shadow-xl shadow-pink-300/20">
//                 <canvas
//                   ref={canvasRef}
//                   onPointerDown={startDrawing}
//                   onPointerMove={continueDrawing}
//                   onPointerUp={stopDrawing}
//                   onPointerCancel={stopDrawing}
//                   onPointerLeave={stopDrawing}
//                   className={`block h-[360px] w-full touch-none sm:h-[500px] ${
//                     isDrawer ? "cursor-crosshair" : "cursor-default"
//                   }`}
//                 />
//               </div>

//               <div className="mt-3 flex flex-wrap items-center gap-3 rounded-2xl border border-white/80 bg-white/80 p-3 shadow-sm">
//                 <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
//                   <Palette size={17} className="text-rose-500" />
//                   Colors
//                 </div>

//                 <div className="flex flex-wrap items-center gap-2">
//                   {COLORS.map((color) => (
//                     <button
//                       key={color}
//                       onClick={() => {
//                         setBrushColor(color);
//                         setIsEraser(false);
//                       }}
//                       disabled={!isDrawer}
//                       title={color}
//                       className={`h-7 w-7 rounded-full border border-slate-200 transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50 ${
//                         brushColor === color && !isEraser
//                           ? "ring-2 ring-rose-400 ring-offset-2"
//                           : ""
//                       }`}
//                       style={{ backgroundColor: color }}
//                     />
//                   ))}
//                 </div>

//                 <div className="mx-1 hidden h-7 w-px bg-pink-100 sm:block" />

//                 <label className="flex items-center gap-2 text-xs font-bold text-slate-500">
//                   Brush
//                   <input
//                     type="range"
//                     min="2"
//                     max="16"
//                     value={brushSize}
//                     onChange={(event) =>
//                       setBrushSize(Number(event.target.value))
//                     }
//                     disabled={!isDrawer}
//                     className="w-20 accent-rose-500 disabled:opacity-50"
//                   />
//                 </label>

//                 <button
//                   onClick={() => setIsEraser((previous) => !previous)}
//                   disabled={!isDrawer}
//                   className={`ml-auto flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition disabled:opacity-50 ${
//                     isEraser
//                       ? "bg-rose-500 text-white"
//                       : "bg-pink-50 text-rose-600 hover:bg-pink-100"
//                   }`}
//                 >
//                   <Eraser size={16} />
//                   Eraser
//                 </button>
//               </div>

//               {!isDrawer && (
//                 <p className="mt-3 text-center text-sm text-slate-500">
//                   {currentDrawerId
//                     ? `${
//                         players.find((player) => player.id === currentDrawerId)
//                           ?.name || "Someone"
//                       } is drawing. Guess below!`
//                     : "Waiting for the next drawing..."}
//                 </p>
//               )}
//             </section>

//             <aside className="flex min-w-0 flex-col gap-5">
//               <div className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm">
//                 <h2 className="mb-4 flex items-center gap-2 font-black">
//                   <Trophy size={18} className="text-rose-500" />
//                   Scoreboard
//                 </h2>

//                 <div className="space-y-3">
//                   {sortedPlayers.map((player, index) => (
//                     <div key={player.id} className="flex items-center gap-3">
//                       <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-50 text-sm font-black text-rose-500">
//                         {index + 1}
//                       </span>
//                       <span className="min-w-0 flex-1 truncate text-sm font-semibold">
//                         {player.name || player.playerName}
//                         {player.id === myId ? " (You)" : ""}
//                       </span>
//                       <span className="font-black text-rose-600">
//                         {scores[player.id] ?? player.score ?? 0}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="flex min-h-[360px] flex-1 flex-col overflow-hidden rounded-2xl border border-white/80 bg-white/80 shadow-sm">
//                 <div className="border-b border-pink-100 px-4 py-3">
//                   <h2 className="font-black">Guesses & chat</h2>
//                   <p className="mt-1 text-xs text-slate-500">
//                     Correct guesses earn points.
//                   </p>
//                 </div>

//                 <div className="flex-1 space-y-3 overflow-y-auto p-4">
//                   {guesses.map((item, index) => (
//                     <div
//                       key={`${item.playerId || item.playerName}-${index}`}
//                       className={`rounded-xl px-3 py-2 text-sm ${
//                         item.correct
//                           ? "bg-emerald-50 text-emerald-700"
//                           : "bg-pink-50 text-slate-700"
//                       }`}
//                     >
//                       <span className="font-bold">
//                         {item.playerName || "Player"}:
//                       </span>{" "}
//                       {item.correct ? (
//                         <span className="font-bold">
//                           Guessed correctly! 🎉
//                         </span>
//                       ) : (
//                         item.guess
//                       )}
//                     </div>
//                   ))}

//                   {guesses.length === 0 && (
//                     <div className="flex h-full min-h-36 flex-col items-center justify-center text-center text-slate-400">
//                       <Sparkles size={24} className="mb-2 text-pink-300" />
//                       <p className="text-sm">Your guesses appear here.</p>
//                     </div>
//                   )}

//                   <div ref={messagesEndRef} />
//                 </div>

//                 <form
//                   onSubmit={sendGuess}
//                   className="flex gap-2 border-t border-pink-100 p-3"
//                 >
//                   <input
//                     value={guess}
//                     onChange={(event) => setGuess(event.target.value)}
//                     maxLength={100}
//                     disabled={isDrawer}
//                     placeholder={isDrawer ? "You're drawing..." : "Your guess..."}
//                     className="min-w-0 flex-1 rounded-xl border border-pink-100 bg-white px-3 py-2.5 text-sm outline-none focus:border-pink-400 disabled:bg-slate-50"
//                   />
//                   <button
//                     type="submit"
//                     disabled={isDrawer || !guess.trim()}
//                     aria-label="Send guess"
//                     className="rounded-xl bg-rose-500 px-3 text-white transition hover:bg-rose-600 disabled:opacity-40"
//                   >
//                     <Send size={17} />
//                   </button>
//                 </form>
//               </div>

//               <button
//                 onClick={leaveRoom}
//                 className="rounded-2xl border border-rose-200 bg-white/70 px-4 py-3 text-sm font-bold text-rose-600 transition hover:bg-rose-50"
//               >
//                 Leave game
//               </button>
//             </aside>
//           </div>
//         )}

//         {screen === "results" && (
//           <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/80 bg-white/80 p-6 text-center shadow-xl shadow-pink-300/20 backdrop-blur-xl sm:p-10">
//             <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-pink-100 text-rose-500">
//               <Trophy size={38} />
//             </div>

//             <p className="text-sm font-bold uppercase tracking-[0.2em] text-rose-500">
//               Game complete
//             </p>

//             <h1 className="mt-3 text-4xl font-black">
//               {winner
//                 ? `${winner.name || winner.playerName} wins!`
//                 : "Great game!"}
//             </h1>

//             <p className="mt-3 text-slate-500">
//               {announcement || "Thanks for playing MilesCloser Scribble."}
//             </p>

//             <div className="mt-8 space-y-3 text-left">
//               {sortedPlayers.map((player, index) => (
//                 <div
//                   key={player.id}
//                   className="flex items-center gap-4 rounded-2xl border border-pink-100 bg-white p-4"
//                 >
//                   <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 font-black text-rose-500">
//                     {index + 1}
//                   </span>
//                   <span className="flex-1 font-bold">
//                     {player.name || player.playerName}
//                   </span>
//                   <span className="font-black text-rose-600">
//                     {scores[player.id] ?? player.score ?? 0} pts
//                   </span>
//                 </div>
//               ))}
//             </div>

//             <button
//               onClick={clearGameState}
//               className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-7 py-3.5 font-bold text-white shadow-lg shadow-pink-300/40 transition hover:-translate-y-0.5"
//             >
//               <Play size={18} fill="currentColor" />
//               Back to lobby
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Brush,
  Check,
  Clock3,
  Copy,
  Eraser,
  Heart,
  Loader2,
  Palette,
  Play,
  Send,
  Sparkles,
  Users,
  Trophy,
  X,
} from "lucide-react";

import { useAuthStore } from "../utils/useAuthStore";

const COLORS = [
  "#1f2937",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#ffffff",
];

const ROUND_SECONDS = 60;
const TOTAL_ROUNDS = 5;

const makeRoomCode = () =>
  Math.random().toString(36).substring(2, 7).toUpperCase();

const getSocketId = (socket) => socket?.id;

export default function ScribbleGame() {
  const navigate = useNavigate();

  const socket = useAuthStore((state) => state.socket);
  const connectSocket = useAuthStore((state) => state.connectSocket);

  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef(null);
  const timerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const canvasInitializedRef = useRef(false);
  const copyTimeoutRef = useRef(null);

  const [screen, setScreen] = useState("lobby");
  const [mode, setMode] = useState("classic");
  const [roomCode, setRoomCode] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState([]);
  const [hostId, setHostId] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  const [currentDrawerId, setCurrentDrawerId] = useState(null);
  const [word, setWord] = useState("");
  const [wordHint, setWordHint] = useState("");
  const [round, setRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [scores, setScores] = useState({});
  const [guesses, setGuesses] = useState([]);
  const [guess, setGuess] = useState("");
  const [announcement, setAnnouncement] = useState("");

  const [brushColor, setBrushColor] = useState("#ec4899");
  const [brushSize, setBrushSize] = useState(5);
  const [isEraser, setIsEraser] = useState(false);
  const [copied, setCopied] = useState(false);

  // The backend sends socket.id as the public player ID.
  const myId = getSocketId(socket);
  const isDrawer = Boolean(
    myId && currentDrawerId === myId
  );
  const isHost = Boolean(myId && hostId === myId);

  const sortedPlayers = [...players].sort(
    (a, b) =>
      (scores[b.id] ?? b.score ?? 0) -
      (scores[a.id] ?? a.score ?? 0)
  );

  const winner = sortedPlayers[0];

  useEffect(() => {
    if (!socket || !socket.connected) {
      connectSocket?.();
    }
  }, [socket, connectSocket]);

  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const ratio = window.devicePixelRatio || 1;

    canvas.width = Math.round(rect.width * ratio);
    canvas.height = Math.round(rect.height * ratio);

    const context = canvas.getContext("2d");
    if (!context) return;

    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, rect.width, rect.height);

    canvasInitializedRef.current = true;
  }, []);

  const clearCanvas = useCallback(
    (emit = true) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();

      if (!context) return;

      context.clearRect(0, 0, rect.width, rect.height);
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, rect.width, rect.height);

      if (emit && socket?.connected && roomCode) {
        socket.emit("scribble:clear", { roomCode });
      }
    },
    [roomCode, socket]
  );

  useEffect(() => {
    if (screen !== "game") return;

    const frame = window.requestAnimationFrame(initializeCanvas);
    window.addEventListener("resize", initializeCanvas);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", initializeCanvas);
    };
  }, [screen, initializeCanvas]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [guesses]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }

      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const drawLine = useCallback(
    (line, emit = false) => {
      const canvas = canvasRef.current;
      if (!canvas || !line?.from || !line?.to) return;

      const context = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();

      if (!context || !rect.width || !rect.height) return;

      context.beginPath();
      context.moveTo(
        line.from.x * rect.width,
        line.from.y * rect.height
      );
      context.lineTo(
        line.to.x * rect.width,
        line.to.y * rect.height
      );
      context.strokeStyle = line.color || "#ec4899";
      context.lineWidth = line.size || 5;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.stroke();

      if (emit && socket?.connected && roomCode) {
        socket.emit("scribble:draw", {
          roomCode,
          line,
        });
      }
    },
    [roomCode, socket]
  );

  const getPoint = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;

    return {
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    };
  };

  const startDrawing = (event) => {
    if (!isDrawer || screen !== "game") return;

    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);

    const point = getPoint(event);
    if (!point) return;

    drawingRef.current = true;
    lastPointRef.current = point;
  };

  const continueDrawing = (event) => {
    if (!drawingRef.current || !isDrawer) return;

    event.preventDefault();

    const nextPoint = getPoint(event);
    if (!nextPoint || !lastPointRef.current) return;

    const line = {
      from: lastPointRef.current,
      to: nextPoint,
      color: isEraser ? "#ffffff" : brushColor,
      size: isEraser ? brushSize * 4 : brushSize,
    };

    drawLine(line, true);
    lastPointRef.current = nextPoint;
  };

  const stopDrawing = () => {
    drawingRef.current = false;
    lastPointRef.current = null;
  };

  const createRoom = () => {
    const name = playerName.trim();

    if (!name) {
      setAnnouncement("Enter your name first.");
      return;
    }

    if (!socket?.connected) {
      setAnnouncement(
        "Connecting to the server. Please wait a moment and try again."
      );
      connectSocket?.();
      return;
    }

    setAnnouncement("");

    socket.emit("scribble:create-room", {
      playerName: name,
      mode,
    });
  };

  const joinRoom = () => {
    const name = playerName.trim();
    const code = joinCode.trim().toUpperCase();

    if (!name) {
      setAnnouncement("Enter your name first.");
      return;
    }

    if (!code) {
      setAnnouncement("Enter a room code.");
      return;
    }

    if (!socket?.connected) {
      setAnnouncement(
        "Connecting to the server. Please wait a moment and try again."
      );
      connectSocket?.();
      return;
    }

    setAnnouncement("");

    socket.emit("scribble:join-room", {
      roomCode: code,
      playerName: name,
    });
  };

  const startGame = () => {
    if (!socket?.connected || !roomCode) {
      setAnnouncement("The server connection is unavailable.");
      connectSocket?.();
      return;
    }

    if (!isHost) {
      setAnnouncement("Only the room host can start the game.");
      return;
    }

    if (players.length < 2) {
      setAnnouncement("At least 2 players are needed to start.");
      return;
    }

    socket.emit("scribble:start", { roomCode });
  };

  const sendGuess = (event) => {
    event.preventDefault();

    const text = guess.trim();
    if (!text || !roomCode || !socket?.connected) return;

    socket.emit("scribble:guess", {
      roomCode,
      guess: text,
    });

    setGuess("");
  };

  const copyRoomCode = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
      setCopied(true);

      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }

      copyTimeoutRef.current = window.setTimeout(
        () => setCopied(false),
        1500
      );
    } catch {
      setAnnouncement(
        `Your room code is ${roomCode}. Copy it manually.`
      );
    }
  };

  const clearGameState = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }

    drawingRef.current = false;
    lastPointRef.current = null;
    canvasInitializedRef.current = false;

    setScreen("lobby");
    setRoomCode("");
    setJoinCode("");
    setPlayers([]);
    setHostId(null);
    setGameStarted(false);
    setCurrentDrawerId(null);
    setWord("");
    setWordHint("");
    setRound(1);
    setTimeLeft(ROUND_SECONDS);
    setScores({});
    setGuesses([]);
    setGuess("");
    setAnnouncement("");
    setCopied(false);
  };

  const leaveRoom = () => {
    if (roomCode && socket?.connected) {
      socket.emit("scribble:leave-room", { roomCode });
    }

    clearGameState();
  };

  useEffect(() => {
    if (!socket) return;

    const handleRoomCreated = (data) => {
      setRoomCode(data.roomCode || data.code || "");
      setMode(data.mode || "classic");
      setPlayers(data.players || []);
      setHostId(data.hostId || data.playerId || null);
      setScores(
        data.scores ||
          Object.fromEntries(
            (data.players || []).map((player) => [
              player.id,
              player.score || 0,
            ])
          )
      );
      setGameStarted(false);
      setScreen("room");
      setAnnouncement("");
    };

    const handleRoomJoined = (data) => {
      setRoomCode(data.roomCode || data.code || "");
      setMode(data.mode || "classic");
      setPlayers(data.players || []);
      setHostId(data.hostId || null);
      setScores(
        data.scores ||
          Object.fromEntries(
            (data.players || []).map((player) => [
              player.id,
              player.score || 0,
            ])
          )
      );

      const started =
        data.status === "playing" || Boolean(data.gameStarted);

      setGameStarted(started);
      setScreen(started ? "game" : "room");
      setAnnouncement("");
    };

    const handleRoomUpdate = (data) => {
      setPlayers(data.players || []);

      if (data.hostId) {
        setHostId(data.hostId);
      }

      if (data.scores) {
        setScores(data.scores);
      } else if (Array.isArray(data.players)) {
        setScores(
          Object.fromEntries(
            data.players.map((player) => [
              player.id,
              player.score || 0,
            ])
          )
        );
      }

      if (data.status === "playing") {
        setGameStarted(true);
      } else if (data.status === "waiting") {
        setGameStarted(false);
      }
    };

    const handleGameStarted = (data) => {
      setScreen("game");
      setGameStarted(true);

      if (data.roomCode || data.code) {
        setRoomCode(data.roomCode || data.code);
      }

      setMode(data.mode || "classic");
      setRound(data.currentRound || data.round || 1);
      setTimeLeft(data.timeLeft ?? ROUND_SECONDS);
      setCurrentDrawerId(data.drawerId || null);

      // The word is sent privately through round-update.
      // Do not overwrite it with an empty value here.
      if (data.word !== undefined) {
        setWord(data.word);
      }

      if (data.wordHint !== undefined) {
        setWordHint(data.wordHint);
      }

      setGuesses([]);

      if (data.scores) {
        setScores(data.scores);
      }

      setAnnouncement("");
      window.setTimeout(initializeCanvas, 50);
    };

    const handleRoundUpdate = (data) => {
      setRound(data.currentRound || data.round || 1);
      setTimeLeft(data.timeLeft ?? ROUND_SECONDS);
      setCurrentDrawerId(data.drawerId || null);
      setWord(data.word ?? "");
      setWordHint(data.wordHint ?? "");
      setGuesses([]);

      if (data.scores) {
        setScores(data.scores);
      }

      window.setTimeout(() => clearCanvas(false), 0);
    };

    const handleDrawing = (data) => {
      if (data?.line) {
        drawLine(data.line, false);
      }
    };

    const handleCanvasClear = () => {
      clearCanvas(false);
    };

    const handleGuessUpdate = (data) => {
      setGuesses((previous) => [...previous, data]);

      if (data.scores) {
        setScores(data.scores);
      }
    };

    const handleTimerUpdate = (data) => {
      if (typeof data?.timeLeft === "number") {
        setTimeLeft(data.timeLeft);
      }
    };

    const handleRoundEnded = (data) => {
      setAnnouncement(data.message || "Round finished!");

      if (data.word) {
        setWord(data.word);
      }

      if (data.scores) {
        setScores(data.scores);
      }
    };

    const handleGameEnded = (data) => {
      setScreen("results");
      setGameStarted(false);
      setCurrentDrawerId(null);

      if (data.scores) {
        setScores(data.scores);
      }

      if (data.message) {
        setAnnouncement(data.message);
      }
    };

    const handleError = (data) => {
      setAnnouncement(
        typeof data === "string"
          ? data
          : data?.message || "Something went wrong."
      );
    };

    socket.on("scribble:room-created", handleRoomCreated);
    socket.on("scribble:room-joined", handleRoomJoined);
    socket.on("scribble:room-update", handleRoomUpdate);
    socket.on("scribble:game-started", handleGameStarted);
    socket.on("scribble:round-update", handleRoundUpdate);
    socket.on("scribble:draw", handleDrawing);
    socket.on("scribble:clear", handleCanvasClear);
    socket.on("scribble:guess-update", handleGuessUpdate);
    socket.on("scribble:timer", handleTimerUpdate);
    socket.on("scribble:round-ended", handleRoundEnded);
    socket.on("scribble:game-ended", handleGameEnded);
    socket.on("scribble:error", handleError);

    return () => {
      socket.off("scribble:room-created", handleRoomCreated);
      socket.off("scribble:room-joined", handleRoomJoined);
      socket.off("scribble:room-update", handleRoomUpdate);
      socket.off("scribble:game-started", handleGameStarted);
      socket.off("scribble:round-update", handleRoundUpdate);
      socket.off("scribble:draw", handleDrawing);
      socket.off("scribble:clear", handleCanvasClear);
      socket.off("scribble:guess-update", handleGuessUpdate);
      socket.off("scribble:timer", handleTimerUpdate);
      socket.off("scribble:round-ended", handleRoundEnded);
      socket.off("scribble:game-ended", handleGameEnded);
      socket.off("scribble:error", handleError);
    };
  }, [
    socket,
    drawLine,
    clearCanvas,
    initializeCanvas,
  ]);

  useEffect(() => {
    if (screen !== "game") {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }

    timerRef.current = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [screen, round]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#160824] px-4 py-6 text-white sm:px-6 lg:px-10">
      <div className="pointer-events-none fixed -left-32 top-10 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-[120px]" />
      <div className="pointer-events-none fixed -right-24 top-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="mb-8 flex items-center justify-between gap-3">
          <button
            onClick={() => (screen === "lobby" ? navigate(-1) : leaveRoom())}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-[#21102f]/[0.04] backdrop-blur-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:bg-[#21102f]"
          >
            <ArrowLeft size={17} />
            {screen === "lobby" ? "Back" : "Leave room"}
          </button>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#21102f]/[0.04] backdrop-blur-xl px-4 py-2 shadow-sm">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 via-pink-500 to-orange-400 text-white">
              <Brush size={17} />
            </span>
            <span className="font-black tracking-tight">
              MilesCloser <span className="text-pink-300">Scribble</span>
            </span>
          </div>
        </header>

        {announcement && (
          <div className="mb-5 flex items-start justify-between gap-3 rounded-2xl border border-fuchsia-400/20 bg-[#21102f]/80 px-4 py-3 text-sm text-pink-200 shadow-sm">
            <span>{announcement}</span>
            <button
              onClick={() => setAnnouncement("")}
              aria-label="Dismiss message"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {screen === "lobby" && (
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="py-6 lg:py-12">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-[#21102f]/[0.04] px-4 py-2 text-sm font-bold text-pink-300 shadow-sm">
                <Sparkles size={16} />
                Draw, guess, and make memories
              </div>

              <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Your imagination,
                <span className="block bg-gradient-to-r from-fuchsia-400 via-pink-400 to-orange-300 bg-clip-text text-transparent">
                  one doodle away.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
                Challenge your friends, guess silly drawings, and see who
                knows the other players best.
              </p>

              <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
                {[
                  { icon: Users, value: "Live", label: "Multiplayer" },
                  { icon: Clock3, value: "60 sec", label: "Each round" },
                  { icon: Trophy, value: "5", label: "Rounds" },
                ].map(({ icon: Icon, value, label }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-[#21102f]/[0.04] backdrop-blur-xl p-4 shadow-sm backdrop-blur transition hover:-translate-y-1"
                  >
                    <Icon className="mb-3 text-pink-300" size={20} />
                    <p className="font-black">{value}</p>
                    <p className="mt-1 text-xs text-white/55">{label}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/80 bg-[#21102f]/80 p-5 shadow-xl shadow-fuchsia-950/40 backdrop-blur-xl sm:p-8">
              <div className="mb-6">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-300">
                  Game lobby
                </p>
                <h2 className="mt-2 text-2xl font-black">Ready to play?</h2>
                <p className="mt-1 text-sm text-white/55">
                  Start a new room or join someone else's.
                </p>
              </div>

              <label className="mb-2 block text-sm font-bold">
                Your display name
              </label>
              <input
                value={playerName}
                onChange={(event) => setPlayerName(event.target.value)}
                maxLength={24}
                placeholder="Enter your name..."
                className="mb-6 w-full rounded-2xl border border-white/10 bg-[#21102f] px-4 py-3.5 outline-none transition placeholder:text-white/40 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-500/20"
              />

              <p className="mb-3 text-sm font-bold">Choose your game style</p>
              <div className="mb-6 grid grid-cols-2 gap-3">
                <button
                  onClick={() => setMode("classic")}
                  className={`rounded-2xl border p-4 text-left transition ${
                    mode === "classic"
                      ? "border-rose-400 bg-fuchsia-500/10 ring-2 ring-rose-100"
                      : "border-white/10 bg-[#21102f] hover:border-fuchsia-400/40"
                  }`}
                >
                  <Brush className="mb-3 text-pink-300" size={23} />
                  <p className="font-black">Classic</p>
                  <p className="mt-1 text-xs leading-5 text-white/55">
                    Random words, silly sketches.
                  </p>
                </button>

                <button
                  onClick={() => setMode("couple")}
                  className={`rounded-2xl border p-4 text-left transition ${
                    mode === "couple"
                      ? "border-rose-400 bg-fuchsia-500/10 ring-2 ring-rose-100"
                      : "border-white/10 bg-[#21102f] hover:border-fuchsia-400/40"
                  }`}
                >
                  <Heart className="mb-3 text-pink-300" size={23} />
                  <p className="font-black">Couple Mode</p>
                  <p className="mt-1 text-xs leading-5 text-white/55">
                    Dates, memories, and cute moments.
                  </p>
                </button>
              </div>

              <button
                onClick={createRoom}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400 px-5 py-3.5 font-bold text-white shadow-lg shadow-fuchsia-500/20 transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
              >
                <Play size={18} fill="currentColor" />
                Create a room
              </button>

              <div className="my-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-white/40">
                <span className="h-px flex-1 bg-fuchsia-500/15" />
                or join a room
                <span className="h-px flex-1 bg-fuchsia-500/15" />
              </div>

              <div className="flex gap-2">
                <input
                  value={joinCode}
                  onChange={(event) =>
                    setJoinCode(event.target.value.toUpperCase().slice(0, 8))
                  }
                  maxLength={8}
                  placeholder="ROOM CODE"
                  className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-[#21102f] px-4 py-3 font-bold uppercase tracking-widest outline-none placeholder:text-xs placeholder:font-medium placeholder:tracking-normal focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-500/20"
                />
                <button
                  onClick={joinRoom}
                  className="rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/10 px-5 py-3 font-bold text-pink-300 transition hover:bg-fuchsia-500/15"
                >
                  Join
                </button>
              </div>

              <p className="mt-5 text-center text-xs text-white/40">
                {socket?.connected
                  ? "Connected to the game server"
                  : "Waiting for server connection"}
              </p>
            </section>
          </div>
        )}

        {screen === "room" && (
          <div className="mx-auto max-w-3xl">
            <div className="rounded-[2rem] border border-white/10 bg-[#21102f]/80 backdrop-blur-xl p-6 shadow-xl shadow-fuchsia-950/40 backdrop-blur-xl sm:p-9">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-fuchsia-500/15 text-pink-300">
                  <Users size={30} />
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-300">
                  Waiting room
                </p>
                <h1 className="mt-2 text-3xl font-black">Invite your people</h1>
                <p className="mt-2 text-white/55">
                  Share this code with anyone you want to play with.
                </p>

                <button
                  onClick={copyRoomCode}
                  className="mx-auto mt-6 flex items-center gap-3 rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/10 px-6 py-4 transition hover:bg-fuchsia-500/15"
                >
                  <span className="text-2xl font-black tracking-[0.25em] text-pink-300">
                    {roomCode}
                  </span>
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>

                <p className="mt-2 text-xs text-white/40">
                  {copied ? "Copied!" : "Click to copy room code"}
                </p>
              </div>

              <div className="mt-8 rounded-2xl bg-[#2a123b]/80 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-black">Players in room</h2>
                  <span className="rounded-full bg-[#21102f] px-3 py-1 text-sm font-bold text-pink-300">
                    {players.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {players.map((player, index) => (
                    <div
                      key={player.id}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#21102f]/[0.04] p-3"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-orange-400 font-black text-white">
                        {(player.name || player.playerName || "?")
                          .slice(0, 1)
                          .toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-bold">
                          {player.name || player.playerName}
                          {player.id === myId ? " (You)" : ""}
                        </p>
                        <p className="text-xs text-white/55">
                          {player.id === hostId ? "Room host" : "Ready to play"}
                        </p>
                      </div>
                      {player.id === hostId && (
                        <Sparkles size={18} className="text-pink-300" />
                      )}
                    </div>
                  ))}

                  {players.length === 0 && (
                    <p className="py-4 text-center text-sm text-white/55">
                      Waiting for players to join...
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={leaveRoom}
                  className="rounded-2xl border border-fuchsia-400/20 bg-[#21102f] px-5 py-3 font-bold text-white/75 transition hover:bg-fuchsia-500/10"
                >
                  Leave room
                </button>

                {isHost ? (
                  <button
                    onClick={startGame}
                    disabled={!socket?.connected || players.length < 2}
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400 px-5 py-3 font-bold text-white shadow-lg shadow-fuchsia-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Play size={18} fill="currentColor" />
                    Start game
                  </button>
                ) : (
                  <div className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-fuchsia-500/10 px-5 py-3 font-semibold text-pink-300">
                    <Loader2 size={17} className="animate-spin" />
                    Waiting for host...
                  </div>
                )}
              </div>

              {players.length < 2 && (
                <p className="mt-3 text-center text-xs text-white/40">
                  At least 2 players are needed to start.
                </p>
              )}
            </div>
          </div>
        )}

        {screen === "game" && (
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
            <section className="min-w-0">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#21102f]/80 backdrop-blur-xl p-4 shadow-sm">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-pink-300">
                    {mode === "couple" ? "💗 Couple Mode" : "🎨 Classic Mode"}
                  </p>
                  <h1 className="mt-1 text-xl font-black">
                    Round {round} of {TOTAL_ROUNDS}
                  </h1>
                </div>

                <div
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 font-black ${
                    timeLeft <= 10
                      ? "animate-pulse bg-red-500/15 text-red-300"
                      : "bg-fuchsia-500/10 text-pink-300"
                  }`}
                >
                  <Clock3 size={18} />
                  00:{String(timeLeft).padStart(2, "0")}
                </div>
              </div>

              <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#21102f]/80 backdrop-blur-xl px-4 py-3 shadow-sm">
                <div>
                  <p className="text-xs text-white/55">
                    {isDrawer ? "Your word to draw" : "Guess the drawing"}
                  </p>
                  <p className="font-black text-pink-300">
                    {isDrawer
                      ? word || "Your word is loading..."
                      : wordHint || "Watch the drawing!"}
                  </p>
                </div>

                {isDrawer && (
                  <button
                    onClick={() => clearCanvas(true)}
                    className="rounded-xl border border-white/10 bg-[#21102f] px-3 py-2 text-sm font-bold text-white/75 transition hover:bg-fuchsia-500/10"
                  >
                    Clear canvas
                  </button>
                )}
              </div>

              <div className="overflow-hidden rounded-[1.5rem] border-4 border-white bg-[#21102f] shadow-xl shadow-fuchsia-950/40">
                <canvas
                  ref={canvasRef}
                  onPointerDown={startDrawing}
                  onPointerMove={continueDrawing}
                  onPointerUp={stopDrawing}
                  onPointerCancel={stopDrawing}
                  onPointerLeave={stopDrawing}
                  className={`block h-[360px] w-full touch-none bg-white sm:h-[500px] ${
                    isDrawer ? "cursor-crosshair" : "cursor-default"
                  }`}
                />
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-[#21102f]/80 backdrop-blur-xl p-3 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-bold text-white/75">
                  <Palette size={17} className="text-pink-300" />
                  Colors
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        setBrushColor(color);
                        setIsEraser(false);
                      }}
                      disabled={!isDrawer}
                      title={color}
                      className={`h-7 w-7 rounded-full border border-white/15 transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50 ${
                        brushColor === color && !isEraser
                          ? "ring-2 ring-fuchsia-400 ring-offset-2 ring-offset-[#160824]"
                          : ""
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                <div className="mx-1 hidden h-7 w-px bg-fuchsia-500/15 sm:block" />

                <label className="flex items-center gap-2 text-xs font-bold text-white/55">
                  Brush
                  <input
                    type="range"
                    min="2"
                    max="16"
                    value={brushSize}
                    onChange={(event) =>
                      setBrushSize(Number(event.target.value))
                    }
                    disabled={!isDrawer}
                    className="w-20 accent-rose-500 disabled:opacity-50"
                  />
                </label>

                <button
                  onClick={() => setIsEraser((previous) => !previous)}
                  disabled={!isDrawer}
                  className={`ml-auto flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition disabled:opacity-50 ${
                    isEraser
                      ? "bg-fuchsia-500/100 text-white"
                      : "bg-fuchsia-500/10 text-pink-300 hover:bg-fuchsia-500/15"
                  }`}
                >
                  <Eraser size={16} />
                  Eraser
                </button>
              </div>

              {!isDrawer && (
                <p className="mt-3 text-center text-sm text-white/55">
                  {currentDrawerId
                    ? `${
                        players.find((player) => player.id === currentDrawerId)
                          ?.name || "Someone"
                      } is drawing. Guess below!`
                    : "Waiting for the next drawing..."}
                </p>
              )}
            </section>

            <aside className="flex min-w-0 flex-col gap-5">
              <div className="rounded-2xl border border-white/10 bg-[#21102f]/80 backdrop-blur-xl p-4 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 font-black">
                  <Trophy size={18} className="text-pink-300" />
                  Scoreboard
                </h2>

                <div className="space-y-3">
                  {sortedPlayers.map((player, index) => (
                    <div key={player.id} className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-fuchsia-500/10 text-sm font-black text-pink-300">
                        {index + 1}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm font-semibold">
                        {player.name || player.playerName}
                        {player.id === myId ? " (You)" : ""}
                      </span>
                      <span className="font-black text-pink-300">
                        {scores[player.id] ?? player.score ?? 0}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex min-h-[360px] flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#21102f]/80 backdrop-blur-xl shadow-sm">
                <div className="border-b border-white/10 px-4 py-3">
                  <h2 className="font-black">Guesses & chat</h2>
                  <p className="mt-1 text-xs text-white/55">
                    Correct guesses earn points.
                  </p>
                </div>

                <div className="flex-1 space-y-3 overflow-y-auto p-4">
                  {guesses.map((item, index) => (
                    <div
                      key={`${item.playerId || item.playerName}-${index}`}
                      className={`rounded-xl px-3 py-2 text-sm ${
                        item.correct
                          ? "bg-emerald-500/10 text-emerald-300"
                          : "bg-fuchsia-500/10 text-white/80"
                      }`}
                    >
                      <span className="font-bold">
                        {item.playerName || "Player"}:
                      </span>{" "}
                      {item.correct ? (
                        <span className="font-bold">
                          Guessed correctly! 🎉
                        </span>
                      ) : (
                        item.guess
                      )}
                    </div>
                  ))}

                  {guesses.length === 0 && (
                    <div className="flex h-full min-h-36 flex-col items-center justify-center text-center text-white/40">
                      <Sparkles size={24} className="mb-2 text-pink-300" />
                      <p className="text-sm">Your guesses appear here.</p>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                <form
                  onSubmit={sendGuess}
                  className="flex gap-2 border-t border-white/10 p-3"
                >
                  <input
                    value={guess}
                    onChange={(event) => setGuess(event.target.value)}
                    maxLength={100}
                    disabled={isDrawer}
                    placeholder={isDrawer ? "You're drawing..." : "Your guess..."}
                    className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#21102f] px-3 py-2.5 text-sm outline-none focus:border-fuchsia-400 disabled:bg-white/[0.04]"
                  />
                  <button
                    type="submit"
                    disabled={isDrawer || !guess.trim()}
                    aria-label="Send guess"
                    className="rounded-xl bg-fuchsia-500/100 px-3 text-white transition hover:bg-pink-500 disabled:opacity-40"
                  >
                    <Send size={17} />
                  </button>
                </form>
              </div>

              <button
                onClick={leaveRoom}
                className="rounded-2xl border border-fuchsia-400/20 bg-[#21102f]/[0.04] px-4 py-3 text-sm font-bold text-pink-300 transition hover:bg-fuchsia-500/10"
              >
                Leave game
              </button>
            </aside>
          </div>
        )}

        {screen === "results" && (
          <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-[#21102f]/80 backdrop-blur-xl p-6 text-center shadow-xl shadow-fuchsia-950/40 backdrop-blur-xl sm:p-10">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-fuchsia-500/15 text-pink-300">
              <Trophy size={38} />
            </div>

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-300">
              Game complete
            </p>

            <h1 className="mt-3 text-4xl font-black">
              {winner
                ? `${winner.name || winner.playerName} wins!`
                : "Great game!"}
            </h1>

            <p className="mt-3 text-white/55">
              {announcement || "Thanks for playing MilesCloser Scribble."}
            </p>

            <div className="mt-8 space-y-3 text-left">
              {sortedPlayers.map((player, index) => (
                <div
                  key={player.id}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#21102f] p-4"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-500/10 font-black text-pink-300">
                    {index + 1}
                  </span>
                  <span className="flex-1 font-bold">
                    {player.name || player.playerName}
                  </span>
                  <span className="font-black text-pink-300">
                    {scores[player.id] ?? player.score ?? 0} pts
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={clearGameState}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400 px-7 py-3.5 font-bold text-white shadow-lg shadow-fuchsia-500/20 transition hover:-translate-y-0.5"
            >
              <Play size={18} fill="currentColor" />
              Back to lobby
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
