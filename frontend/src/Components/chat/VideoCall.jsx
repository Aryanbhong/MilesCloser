
// // import { useCallback, useEffect, useRef, useState } from "react";
// // import {
// //   Video,
// //   VideoOff,
// //   Mic,
// //   MicOff,
// //   Phone,
// //   PhoneOff,
// //   X,
// //   UserRound,
// // } from "lucide-react";
// // import { useAuthStore } from "../../utils/useAuthStore";
// // import { toast } from "react-toastify";

// // const ICE_SERVERS = {
// //   iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
// // };

// // const createCallId = () =>
// //   globalThis.crypto?.randomUUID?.() ||
// //   `${Date.now()}-${Math.random().toString(36).slice(2)}`;

// // const VideoCall = ({ selectedUser }) => {
// //   const socket = useAuthStore((state) => state.socket);
// //   const authUser = useAuthStore((state) => state.authUser);

// //   const [call, setCall] = useState(null);
// //   const [status, setStatus] = useState("idle");
// //   const [muted, setMuted] = useState(false);
// //   const [cameraOff, setCameraOff] = useState(false);

// //   const pcRef = useRef(null);
// //   const localStreamRef = useRef(null);
// //   const remoteStreamRef = useRef(null);
// //   const localVideoRef = useRef(null);
// //   const remoteVideoRef = useRef(null);
// //   const callRef = useRef(null);
// //   const queuedCandidatesRef = useRef([]);
// //   const mountedRef = useRef(false);

// //   const updateCall = useCallback((nextCall) => {
// //     callRef.current = nextCall;
// //     setCall(nextCall);
// //   }, []);

// //   const stopMedia = useCallback(() => {
// //     pcRef.current?.close();
// //     pcRef.current = null;

// //     localStreamRef.current?.getTracks().forEach((track) => track.stop());
// //     localStreamRef.current = null;

// //     remoteStreamRef.current = null;
// //     queuedCandidatesRef.current = [];

// //     if (localVideoRef.current) localVideoRef.current.srcObject = null;
// //     if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

// //     setMuted(false);
// //     setCameraOff(false);
// //   }, []);

// //   const finishCall = useCallback(
// //     ({ notify = false, message = "" } = {}) => {
// //       const current = callRef.current;

// //       if (notify && current && socket?.connected) {
// //         socket.emit("call:end", {
// //           callId: current.callId,
// //           to: current.peerId,
// //         });
// //       }

// //       stopMedia();
// //       updateCall(null);
// //       setStatus("idle");

// //       if (message) toast.info(message);
// //     },
// //     [socket, stopMedia, updateCall]
// //   );

// //   const ensureMedia = useCallback(async () => {
// //     if (!navigator.mediaDevices?.getUserMedia) {
// //       throw new Error("Camera and microphone require HTTPS or localhost.");
// //     }

// //     const stream = await navigator.mediaDevices.getUserMedia({
// //       video: true,
// //       audio: true,
// //     });

// //     localStreamRef.current = stream;

// //     if (localVideoRef.current) {
// //       localVideoRef.current.srcObject = stream;
// //     }

// //     return stream;
// //   }, []);

// //   const createPeer = useCallback(
// //     async (currentCall) => {
// //       const pc = new RTCPeerConnection(ICE_SERVERS);
// //       pcRef.current = pc;

// //       const localStream =
// //         localStreamRef.current || (await ensureMedia());

// //       localStream.getTracks().forEach((track) => {
// //         pc.addTrack(track, localStream);
// //       });

// //       pc.ontrack = (event) => {
// //         const stream = event.streams?.[0];

// //         if (stream) {
// //           remoteStreamRef.current = stream;

// //           if (remoteVideoRef.current) {
// //             remoteVideoRef.current.srcObject = stream;
// //           }
// //         }
// //       };

// //       pc.onicecandidate = (event) => {
// //         if (event.candidate && socket?.connected) {
// //           socket.emit("call:ice-candidate", {
// //             callId: currentCall.callId,
// //             to: currentCall.peerId,
// //             candidate: event.candidate,
// //           });
// //         }
// //       };

// //       pc.onconnectionstatechange = () => {
// //         if (pc.connectionState === "failed") {
// //           toast.error(
// //             "Connection failed. A TURN server may be required for this network."
// //           );
// //           finishCall({ notify: true });
// //         }
// //       };

// //       return pc;
// //     },
// //     [ensureMedia, finishCall, socket]
// //   );

// //   const startCall = useCallback(async () => {
// //     if (!selectedUser?._id || !socket?.connected) {
// //       toast.error("Chat connection is not ready. Please try again.");
// //       return;
// //     }

// //     if (callRef.current) {
// //       toast.info("You already have an active call.");
// //       return;
// //     }

// //     const currentCall = {
// //       callId: createCallId(),
// //       peerId: String(selectedUser._id),
// //       peerName: selectedUser.fullName || "Connection",
// //       direction: "outgoing",
// //     };

// //     updateCall(currentCall);
// //     setStatus("calling");

// //     try {
// //       await ensureMedia();

// //       socket.emit("call:request", {
// //         callId: currentCall.callId,
// //         to: currentCall.peerId,
// //       });
// //     } catch (error) {
// //       console.error("Could not start call:", error);
// //       finishCall();
// //       toast.error(error.message || "Unable to access camera or microphone.");
// //     }
// //   }, [ensureMedia, finishCall, selectedUser, socket, updateCall]);

// //   const acceptCall = useCallback(async () => {
// //     const current = callRef.current;

// //     if (!current || !socket?.connected) return;

// //     try {
// //       await ensureMedia();
// //       const pc = await createPeer(current);

// //       const acceptedCall = { ...current, direction: "incoming" };
// //       updateCall(acceptedCall);

// //       socket.emit("call:accept", {
// //         callId: current.callId,
// //         to: current.peerId,
// //       });

// //       setStatus("connecting");
// //     } catch (error) {
// //       console.error("Could not accept call:", error);
// //       socket.emit("call:decline", {
// //         callId: current.callId,
// //         to: current.peerId,
// //       });
// //       finishCall();
// //       toast.error(error.message || "Unable to accept the call.");
// //     }
// //   }, [createPeer, ensureMedia, finishCall, socket, updateCall]);

// //   const declineCall = useCallback(() => {
// //     const current = callRef.current;

// //     if (current && socket?.connected) {
// //       socket.emit("call:decline", {
// //         callId: current.callId,
// //         to: current.peerId,
// //       });
// //     }

// //     finishCall();
// //   }, [finishCall, socket]);

// //   const toggleMute = () => {
// //     const next = !muted;
// //     localStreamRef.current
// //       ?.getAudioTracks()
// //       .forEach((track) => (track.enabled = !next));
// //     setMuted(next);
// //   };

// //   const toggleCamera = () => {
// //     const next = !cameraOff;
// //     localStreamRef.current
// //       ?.getVideoTracks()
// //       .forEach((track) => (track.enabled = !next));
// //     setCameraOff(next);
// //   };

// //   useEffect(() => {
// //     mountedRef.current = true;
// //     return () => {
// //       mountedRef.current = false;
// //       stopMedia();
// //     };
// //   }, [stopMedia]);

// //   useEffect(() => {
// //     if (!socket) return;

// //     const onIncoming = (payload) => {
// //       if (!payload?.callId || !payload?.from) return;

// //       if (callRef.current) {
// //         socket.emit("call:busy", {
// //           callId: payload.callId,
// //           to: payload.from,
// //         });
// //         return;
// //       }

// //       updateCall({
// //         callId: payload.callId,
// //         peerId: String(payload.from),
// //         peerName:
// //           selectedUser?._id === payload.from
// //             ? selectedUser.fullName
// //             : "Incoming caller",
// //         direction: "incoming",
// //       });

// //       setStatus("incoming");
// //     };

// //     const matchesCall = (payload) =>
// //       payload?.callId &&
// //       payload.callId === callRef.current?.callId &&
// //       String(payload.from) === String(callRef.current?.peerId);

// //     const onAccepted = async (payload) => {
// //       if (!matchesCall(payload)) return;

// //       try {
// //         const pc = await createPeer(callRef.current);
// //         const offer = await pc.createOffer();

// //         await pc.setLocalDescription(offer);

// //         socket.emit("call:offer", {
// //           callId: callRef.current.callId,
// //           to: callRef.current.peerId,
// //           offer: pc.localDescription,
// //         });

// //         setStatus("connecting");
// //       } catch (error) {
// //         console.error("Offer creation failed:", error);
// //         finishCall({ notify: true });
// //         toast.error("Unable to establish the call.");
// //       }
// //     };

// //     const onOffer = async (payload) => {
// //       if (!matchesCall(payload) || !payload.offer) return;

// //       try {
// //         let pc = pcRef.current;

// //         if (!pc) pc = await createPeer(callRef.current);

// //         await pc.setRemoteDescription(
// //           new RTCSessionDescription(payload.offer)
// //         );

// //         for (const candidate of queuedCandidatesRef.current) {
// //           await pc.addIceCandidate(new RTCIceCandidate(candidate));
// //         }
// //         queuedCandidatesRef.current = [];

// //         const answer = await pc.createAnswer();
// //         await pc.setLocalDescription(answer);

// //         socket.emit("call:answer", {
// //           callId: callRef.current.callId,
// //           to: callRef.current.peerId,
// //           answer: pc.localDescription,
// //         });

// //         setStatus("connecting");
// //       } catch (error) {
// //         console.error("Offer handling failed:", error);
// //         finishCall({ notify: true });
// //         toast.error("Unable to connect the call.");
// //       }
// //     };

// //     const onAnswer = async (payload) => {
// //       if (!matchesCall(payload) || !payload.answer || !pcRef.current) return;

// //       try {
// //         await pcRef.current.setRemoteDescription(
// //           new RTCSessionDescription(payload.answer)
// //         );

// //         for (const candidate of queuedCandidatesRef.current) {
// //           await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
// //         }
// //         queuedCandidatesRef.current = [];

// //         setStatus("connected");
// //       } catch (error) {
// //         console.error("Answer handling failed:", error);
// //         finishCall({ notify: true });
// //       }
// //     };

// //     const onCandidate = async (payload) => {
// //       if (!matchesCall(payload) || !payload.candidate) return;

// //       try {
// //         if (pcRef.current?.remoteDescription) {
// //           await pcRef.current.addIceCandidate(
// //             new RTCIceCandidate(payload.candidate)
// //           );
// //         } else {
// //           queuedCandidatesRef.current.push(payload.candidate);
// //         }
// //       } catch (error) {
// //         console.error("ICE candidate error:", error);
// //       }
// //     };

// //     const onDeclined = (payload) => {
// //       if (matchesCall(payload)) {
// //         finishCall({ message: "Call declined." });
// //       }
// //     };

// //     const onBusy = (payload) => {
// //       if (matchesCall(payload)) {
// //         finishCall({ message: "This user is busy on another call." });
// //       }
// //     };

// //     const onEnded = (payload) => {
// //       if (matchesCall(payload)) {
// //         finishCall({ message: "Call ended." });
// //       }
// //     };

// //     const onError = (payload) => {
// //       if (
// //         !payload?.callId ||
// //         payload.callId === callRef.current?.callId
// //       ) {
// //         toast.error(payload?.message || "Call failed.");
// //         finishCall();
// //       }
// //     };

// //     socket.on("call:incoming", onIncoming);
// //     socket.on("call:accepted", onAccepted);
// //     socket.on("call:offer", onOffer);
// //     socket.on("call:answer", onAnswer);
// //     socket.on("call:ice-candidate", onCandidate);
// //     socket.on("call:declined", onDeclined);
// //     socket.on("call:busy", onBusy);
// //     socket.on("call:ended", onEnded);
// //     socket.on("call:error", onError);

// //     return () => {
// //       socket.off("call:incoming", onIncoming);
// //       socket.off("call:accepted", onAccepted);
// //       socket.off("call:offer", onOffer);
// //       socket.off("call:answer", onAnswer);
// //       socket.off("call:ice-candidate", onCandidate);
// //       socket.off("call:declined", onDeclined);
// //       socket.off("call:busy", onBusy);
// //       socket.off("call:ended", onEnded);
// //       socket.off("call:error", onError);
// //     };
// //   }, [socket, selectedUser, createPeer, finishCall, updateCall]);

// //   if (!call) {
// //     return (
// //       <button
// //         type="button"
// //         onClick={startCall}
// //         title="Start video call"
// //         aria-label="Start video call"
// //         className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-300 transition hover:bg-fuchsia-500/20 hover:text-white active:scale-95"
// //       >
// //         <Video className="h-5 w-5" />
// //       </button>
// //     );
// //   }

// //   return (
// //     <>
// //       <button
// //         type="button"
// //         onClick={startCall}
// //         title="Start video call"
// //         aria-label="Start video call"
// //         className="hidden"
// //       >
// //         <Video />
// //       </button>

// //       <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-6">
// //         <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-fuchsia-400/20 bg-[#100819] shadow-2xl">
// //           <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
// //             <div>
// //               <h2 className="font-semibold text-white">
// //                 {call.peerName || "Video call"}
// //               </h2>
// //               <p className="text-xs text-purple-300/70">
// //                 {status === "incoming"
// //                   ? "Incoming video call"
// //                   : status === "calling"
// //                     ? "Calling..."
// //                     : status === "connected"
// //                       ? "Connected"
// //                       : "Connecting..."}
// //               </p>
// //             </div>
// //             <button
// //               onClick={() => finishCall({ notify: true })}
// //               aria-label="Close call"
// //               className="rounded-xl p-2 text-purple-200 hover:bg-white/10"
// //             >
// //               <X />
// //             </button>
// //           </div>

// //           <div className="grid gap-3 p-3 md:grid-cols-2">
// //             <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-[#1b102b]">
// //               <video
// //                 ref={remoteVideoRef}
// //                 autoPlay
// //                 playsInline
// //                 className="h-full w-full object-cover"
// //               />
// //               {!remoteStreamRef.current && (
// //                 <div className="absolute flex flex-col items-center gap-2 text-purple-300/70">
// //                   <UserRound className="h-10 w-10" />
// //                   <span className="text-sm">Waiting for video...</span>
// //                 </div>
// //               )}
// //               <span className="absolute bottom-3 left-3 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
// //                 {call.peerName || "Other user"}
// //               </span>
// //             </div>

// //             <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-[#1b102b]">
// //               <video
// //                 ref={localVideoRef}
// //                 autoPlay
// //                 playsInline
// //                 muted
// //                 className="h-full w-full scale-x-[-1] object-cover"
// //               />
// //               <span className="absolute bottom-3 left-3 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
// //                 You
// //               </span>
// //             </div>
// //           </div>

// //           <div className="flex flex-wrap items-center justify-center gap-3 px-4 pb-5">
// //             {status === "incoming" ? (
// //               <>
// //                 <button
// //                   onClick={acceptCall}
// //                   className="flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 font-semibold text-white hover:bg-emerald-400"
// //                 >
// //                   <Phone className="h-5 w-5" />
// //                   Accept
// //                 </button>
// //                 <button
// //                   onClick={declineCall}
// //                   className="flex items-center gap-2 rounded-full bg-red-500 px-5 py-3 font-semibold text-white hover:bg-red-400"
// //                 >
// //                   <PhoneOff className="h-5 w-5" />
// //                   Decline
// //                 </button>
// //               </>
// //             ) : (
// //               <>
// //                 <button
// //                   onClick={toggleMute}
// //                   title={muted ? "Unmute microphone" : "Mute microphone"}
// //                   className={`rounded-full p-4 text-white ${
// //                     muted ? "bg-red-500" : "bg-white/10 hover:bg-white/20"
// //                   }`}
// //                 >
// //                   {muted ? <MicOff /> : <Mic />}
// //                 </button>
// //                 <button
// //                   onClick={toggleCamera}
// //                   title={cameraOff ? "Turn camera on" : "Turn camera off"}
// //                   className={`rounded-full p-4 text-white ${
// //                     cameraOff ? "bg-red-500" : "bg-white/10 hover:bg-white/20"
// //                   }`}
// //                 >
// //                   {cameraOff ? <VideoOff /> : <Video />}
// //                 </button>
// //                 <button
// //                   onClick={() => finishCall({ notify: true })}
// //                   title="End call"
// //                   className="rounded-full bg-red-500 p-4 text-white hover:bg-red-400"
// //                 >
// //                   <PhoneOff />
// //                 </button>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default VideoCall;



// // import { useCallback, useEffect, useRef, useState } from "react";
// // import {
// //   Video,
// //   VideoOff,
// //   Mic,
// //   MicOff,
// //   Phone,
// //   PhoneOff,
// //   X,
// //   UserRound,
// //   LoaderCircle,
// // } from "lucide-react";
// // import { useAuthStore } from "../../utils/useAuthStore";
// // import { toast } from "react-toastify";

// // const ICE_SERVERS = {
// //   iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
// // };

// // const createCallId = () =>
// //   globalThis.crypto?.randomUUID?.() ||
// //   `${Date.now()}-${Math.random().toString(36).slice(2)}`;

// // const VideoCall = ({ selectedUser }) => {
// //   const socket = useAuthStore((state) => state.socket);

// //   const [call, setCall] = useState(null);
// //   const [status, setStatus] = useState("idle");
// //   const [muted, setMuted] = useState(false);
// //   const [cameraOff, setCameraOff] = useState(false);
// //   const [hasRemoteVideo, setHasRemoteVideo] = useState(false);
// //   const [hasLocalVideo, setHasLocalVideo] = useState(false);

// //   const pcRef = useRef(null);
// //   const localStreamRef = useRef(null);
// //   const remoteStreamRef = useRef(null);
// //   const localVideoRef = useRef(null);
// //   const remoteVideoRef = useRef(null);
// //   const callRef = useRef(null);
// //   const queuedCandidatesRef = useRef([]);

// //   const updateCall = useCallback((nextCall) => {
// //     callRef.current = nextCall;
// //     setCall(nextCall);
// //   }, []);

// //   const stopMedia = useCallback(() => {
// //     if (pcRef.current) {
// //       pcRef.current.ontrack = null;
// //       pcRef.current.onicecandidate = null;
// //       pcRef.current.onconnectionstatechange = null;
// //       pcRef.current.close();
// //       pcRef.current = null;
// //     }

// //     localStreamRef.current?.getTracks().forEach((track) => track.stop());
// //     localStreamRef.current = null;
// //     remoteStreamRef.current = null;
// //     queuedCandidatesRef.current = [];

// //     if (localVideoRef.current) localVideoRef.current.srcObject = null;
// //     if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

// //     setHasRemoteVideo(false);
// //     setHasLocalVideo(false);
// //     setMuted(false);
// //     setCameraOff(false);
// //   }, []);

// //   const finishCall = useCallback(
// //     ({ notify = false, message = "" } = {}) => {
// //       const current = callRef.current;

// //       if (notify && current && socket?.connected) {
// //         socket.emit("call:end", {
// //           callId: current.callId,
// //           to: current.peerId,
// //         });
// //       }

// //       stopMedia();
// //       updateCall(null);
// //       setStatus("idle");

// //       if (message) toast.info(message);
// //     },
// //     [socket, stopMedia, updateCall]
// //   );

// //   const ensureMedia = useCallback(async () => {
// //     if (!navigator.mediaDevices?.getUserMedia) {
// //       throw new Error(
// //         "Camera access requires HTTPS or localhost in your browser."
// //       );
// //     }

// //     let stream;

// //     try {
// //       stream = await navigator.mediaDevices.getUserMedia({
// //         video: true,
// //         audio: true,
// //       });
// //     } catch (error) {
// //       if (error.name === "NotFoundError" || error.name === "OverconstrainedError") {
// //         throw new Error(
// //           "No suitable camera or microphone was found. Connect a device or check your device settings."
// //         );
// //       }

// //       if (error.name === "NotAllowedError" || error.name === "SecurityError") {
// //         throw new Error(
// //           "Camera or microphone permission was denied. Allow access in your browser settings."
// //         );
// //       }

// //       if (error.name === "NotReadableError") {
// //         throw new Error(
// //           "Your camera or microphone may be in use by another application."
// //         );
// //       }

// //       throw error;
// //     }

// //     localStreamRef.current = stream;
// //     setHasLocalVideo(stream.getVideoTracks().length > 0);

// //     if (localVideoRef.current) {
// //       localVideoRef.current.srcObject = stream;
// //       localVideoRef.current.play().catch(() => {});
// //     }

// //     return stream;
// //   }, []);

// //   const createPeer = useCallback(
// //     async (currentCall) => {
// //       if (pcRef.current) return pcRef.current;

// //       const pc = new RTCPeerConnection(ICE_SERVERS);
// //       pcRef.current = pc;

// //       try {
// //         const localStream =
// //           localStreamRef.current || (await ensureMedia());

// //         localStream.getTracks().forEach((track) => {
// //           pc.addTrack(track, localStream);
// //         });

// //         pc.ontrack = (event) => {
// //           let stream = event.streams?.[0];

// //           if (!stream) {
// //             stream = remoteStreamRef.current || new MediaStream();
// //             if (!stream.getTracks().some((track) => track.id === event.track.id)) {
// //               stream.addTrack(event.track);
// //             }
// //           }

// //           remoteStreamRef.current = stream;

// //           if (remoteVideoRef.current) {
// //             remoteVideoRef.current.srcObject = stream;
// //             remoteVideoRef.current.play().catch(() => {});
// //           }

// //           setHasRemoteVideo(stream.getVideoTracks().some(
// //             (track) => track.readyState === "live"
// //           ));

// //           event.track.onunmute = () => {
// //             setHasRemoteVideo(
// //               Boolean(remoteStreamRef.current?.getVideoTracks().some(
// //                 (track) => track.readyState === "live"
// //               ))
// //             );
// //           };

// //           event.track.onended = () => {
// //             setHasRemoteVideo(
// //               Boolean(remoteStreamRef.current?.getVideoTracks().some(
// //                 (track) => track.readyState === "live"
// //               ))
// //             );
// //           };
// //         };

// //         pc.onicecandidate = (event) => {
// //           if (event.candidate && socket?.connected) {
// //             socket.emit("call:ice-candidate", {
// //               callId: currentCall.callId,
// //               to: currentCall.peerId,
// //               candidate: event.candidate,
// //             });
// //           }
// //         };

// //         pc.onconnectionstatechange = () => {
// //           if (pc.connectionState === "connected") {
// //             setStatus("connected");
// //           } else if (pc.connectionState === "failed") {
// //             toast.error(
// //               "Connection failed. This network may require a TURN server."
// //             );
// //             finishCall({ notify: true });
// //           } else if (pc.connectionState === "disconnected") {
// //             setStatus("connecting");
// //           }
// //         };

// //         return pc;
// //       } catch (error) {
// //         pc.close();
// //         if (pcRef.current === pc) pcRef.current = null;
// //         throw error;
// //       }
// //     },
// //     [ensureMedia, finishCall, socket]
// //   );

// //   const startCall = useCallback(async () => {
// //     if (!selectedUser?._id || !socket?.connected) {
// //       toast.error("Chat connection is not ready. Please try again.");
// //       return;
// //     }

// //     if (callRef.current) {
// //       toast.info("You already have an active call.");
// //       return;
// //     }

// //     const currentCall = {
// //       callId: createCallId(),
// //       peerId: String(selectedUser._id),
// //       peerName: selectedUser.fullName || "Connection",
// //       direction: "outgoing",
// //     };

// //     updateCall(currentCall);
// //     setStatus("calling");

// //     try {
// //       await ensureMedia();

// //       socket.emit("call:request", {
// //         callId: currentCall.callId,
// //         to: currentCall.peerId,
// //       });
// //     } catch (error) {
// //       console.error("Could not start call:", error);
// //       finishCall();
// //       toast.error(error.message || "Unable to access camera or microphone.");
// //     }
// //   }, [ensureMedia, finishCall, selectedUser, socket, updateCall]);

// //   const acceptCall = useCallback(async () => {
// //     const current = callRef.current;
// //     if (!current || !socket?.connected) return;

// //     try {
// //       await ensureMedia();
// //       await createPeer(current);

// //       socket.emit("call:accept", {
// //         callId: current.callId,
// //         to: current.peerId,
// //       });

// //       setStatus("connecting");
// //     } catch (error) {
// //       console.error("Could not accept call:", error);

// //       socket.emit("call:decline", {
// //         callId: current.callId,
// //         to: current.peerId,
// //       });

// //       finishCall();
// //       toast.error(error.message || "Unable to accept the call.");
// //     }
// //   }, [createPeer, ensureMedia, finishCall, socket]);

// //   const declineCall = useCallback(() => {
// //     const current = callRef.current;

// //     if (current && socket?.connected) {
// //       socket.emit("call:decline", {
// //         callId: current.callId,
// //         to: current.peerId,
// //       });
// //     }

// //     finishCall();
// //   }, [finishCall, socket]);

// //   const toggleMute = () => {
// //     const next = !muted;
// //     localStreamRef.current
// //       ?.getAudioTracks()
// //       .forEach((track) => (track.enabled = !next));
// //     setMuted(next);
// //   };

// //   const toggleCamera = () => {
// //     const next = !cameraOff;
// //     localStreamRef.current
// //       ?.getVideoTracks()
// //       .forEach((track) => (track.enabled = !next));
// //     setCameraOff(next);
// //   };

// //   useEffect(() => {
// //     if (!socket) return;

// //     const matchesCall = (payload) =>
// //       payload?.callId &&
// //       payload.callId === callRef.current?.callId &&
// //       String(payload.from) === String(callRef.current?.peerId);

// //     const onIncoming = (payload) => {
// //       if (!payload?.callId || !payload?.from) return;

// //       if (callRef.current) {
// //         socket.emit("call:busy", {
// //           callId: payload.callId,
// //           to: payload.from,
// //         });
// //         return;
// //       }

// //       updateCall({
// //         callId: payload.callId,
// //         peerId: String(payload.from),
// //         peerName:
// //           String(selectedUser?._id) === String(payload.from)
// //             ? selectedUser?.fullName || "Incoming caller"
// //             : "Incoming caller",
// //         direction: "incoming",
// //       });

// //       setStatus("incoming");
// //     };

// //     const onAccepted = async (payload) => {
// //       if (!matchesCall(payload)) return;

// //       try {
// //         const pc = await createPeer(callRef.current);
// //         const offer = await pc.createOffer();

// //         await pc.setLocalDescription(offer);

// //         socket.emit("call:offer", {
// //           callId: callRef.current.callId,
// //           to: callRef.current.peerId,
// //           offer: pc.localDescription,
// //         });

// //         setStatus("connecting");
// //       } catch (error) {
// //         console.error("Offer creation failed:", error);
// //         finishCall({ notify: true });
// //         toast.error(error.message || "Unable to establish the call.");
// //       }
// //     };

// //     const onOffer = async (payload) => {
// //       if (!matchesCall(payload) || !payload.offer) return;

// //       try {
// //         const pc = pcRef.current || (await createPeer(callRef.current));

// //         await pc.setRemoteDescription(payload.offer);

// //         for (const candidate of queuedCandidatesRef.current) {
// //           await pc.addIceCandidate(candidate);
// //         }
// //         queuedCandidatesRef.current = [];

// //         const answer = await pc.createAnswer();
// //         await pc.setLocalDescription(answer);

// //         socket.emit("call:answer", {
// //           callId: callRef.current.callId,
// //           to: callRef.current.peerId,
// //           answer: pc.localDescription,
// //         });

// //         setStatus("connecting");
// //       } catch (error) {
// //         console.error("Offer handling failed:", error);
// //         finishCall({ notify: true });
// //         toast.error("Unable to connect the call.");
// //       }
// //     };

// //     const onAnswer = async (payload) => {
// //       if (!matchesCall(payload) || !payload.answer || !pcRef.current) return;

// //       try {
// //         await pcRef.current.setRemoteDescription(payload.answer);

// //         for (const candidate of queuedCandidatesRef.current) {
// //           await pcRef.current.addIceCandidate(candidate);
// //         }
// //         queuedCandidatesRef.current = [];

// //         setStatus("connected");
// //       } catch (error) {
// //         console.error("Answer handling failed:", error);
// //         finishCall({ notify: true });
// //       }
// //     };

// //     const onCandidate = async (payload) => {
// //       if (!matchesCall(payload) || !payload.candidate) return;

// //       try {
// //         const candidate = new RTCIceCandidate(payload.candidate);

// //         if (pcRef.current?.remoteDescription) {
// //           await pcRef.current.addIceCandidate(candidate);
// //         } else {
// //           queuedCandidatesRef.current.push(payload.candidate);
// //         }
// //       } catch (error) {
// //         console.error("ICE candidate error:", error);
// //       }
// //     };

// //     const onDeclined = (payload) => {
// //       if (matchesCall(payload)) finishCall({ message: "Call declined." });
// //     };

// //     const onBusy = (payload) => {
// //       if (matchesCall(payload)) {
// //         finishCall({ message: "This user is busy on another call." });
// //       }
// //     };

// //     const onEnded = (payload) => {
// //       if (matchesCall(payload)) finishCall({ message: "Call ended." });
// //     };

// //     const onError = (payload) => {
// //       if (
// //         !payload?.callId ||
// //         payload.callId === callRef.current?.callId
// //       ) {
// //         toast.error(payload?.message || "Call failed.");
// //         finishCall();
// //       }
// //     };

// //     socket.on("call:incoming", onIncoming);
// //     socket.on("call:accepted", onAccepted);
// //     socket.on("call:offer", onOffer);
// //     socket.on("call:answer", onAnswer);
// //     socket.on("call:ice-candidate", onCandidate);
// //     socket.on("call:declined", onDeclined);
// //     socket.on("call:busy", onBusy);
// //     socket.on("call:ended", onEnded);
// //     socket.on("call:error", onError);

// //     return () => {
// //       socket.off("call:incoming", onIncoming);
// //       socket.off("call:accepted", onAccepted);
// //       socket.off("call:offer", onOffer);
// //       socket.off("call:answer", onAnswer);
// //       socket.off("call:ice-candidate", onCandidate);
// //       socket.off("call:declined", onDeclined);
// //       socket.off("call:busy", onBusy);
// //       socket.off("call:ended", onEnded);
// //       socket.off("call:error", onError);
// //     };
// //   }, [socket, selectedUser, createPeer, finishCall, updateCall]);

// //   useEffect(() => {
// //     if (localVideoRef.current && localStreamRef.current) {
// //       localVideoRef.current.srcObject = localStreamRef.current;
// //       localVideoRef.current.play().catch(() => {});
// //     }

// //     if (remoteVideoRef.current && remoteStreamRef.current) {
// //       remoteVideoRef.current.srcObject = remoteStreamRef.current;
// //       remoteVideoRef.current.play().catch(() => {});
// //     }
// //   }, [call, status]);

// //   if (!call) {
// //     return (
// //       <button
// //         type="button"
// //         onClick={startCall}
// //         title="Start video call"
// //         aria-label="Start video call"
// //         className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-300 transition hover:bg-fuchsia-500/20 hover:text-white active:scale-95"
// //       >
// //         <Video className="h-5 w-5" />
// //       </button>
// //     );
// //   }

// //   return (
// //     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-2 backdrop-blur-md sm:p-5">
// //       <section className="relative flex h-[min(90dvh,850px)] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-fuchsia-400/20 bg-[#090510] shadow-[0_0_80px_rgba(168,85,247,0.18)]">
// //         <header className="z-10 flex shrink-0 items-center justify-between border-b border-white/10 bg-[#100819]/90 px-4 py-3 sm:px-6">
// //           <div className="flex min-w-0 items-center gap-3">
// //             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-300">
// //               <Video className="h-5 w-5" />
// //             </div>
// //             <div className="min-w-0">
// //               <h2 className="truncate font-semibold text-white">
// //                 {call.peerName || "Video call"}
// //               </h2>
// //               <p className="flex items-center gap-1.5 text-xs text-purple-300/70">
// //                 <span
// //                   className={`h-1.5 w-1.5 rounded-full ${
// //                     status === "connected"
// //                       ? "bg-emerald-400"
// //                       : "bg-amber-400 animate-pulse"
// //                   }`}
// //                 />
// //                 {status === "incoming"
// //                   ? "Incoming video call"
// //                   : status === "calling"
// //                     ? "Calling..."
// //                     : status === "connected"
// //                       ? "Connected"
// //                       : "Connecting..."}
// //               </p>
// //             </div>
// //           </div>

// //           <button
// //             type="button"
// //             onClick={() => finishCall({ notify: true })}
// //             aria-label="Close call"
// //             className="rounded-xl p-2 text-purple-200 transition hover:bg-white/10 hover:text-white"
// //           >
// //             <X className="h-5 w-5" />
// //           </button>
// //         </header>

// //         <div className="relative min-h-0 flex-1 overflow-hidden bg-[#05030a]">
// //           <video
// //             ref={remoteVideoRef}
// //             autoPlay
// //             playsInline
// //             className={`absolute inset-0 h-full w-full object-contain sm:object-cover ${
// //               hasRemoteVideo ? "opacity-100" : "opacity-0"
// //             }`}
// //           />

// //           {!hasRemoteVideo && (
// //             <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(ellipse_at_center,rgba(88,28,135,0.22),transparent_65%)] text-center">
// //               <div className="flex h-24 w-24 items-center justify-center rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-300 shadow-[0_0_50px_rgba(217,70,239,0.12)]">
// //                 {status === "calling" || status === "connecting" ? (
// //                   <LoaderCircle className="h-10 w-10 animate-spin" />
// //                 ) : (
// //                   <UserRound className="h-10 w-10" />
// //                 )}
// //               </div>
// //               <div>
// //                 <p className="text-lg font-semibold text-white">
// //                   {status === "incoming"
// //                     ? "Someone is calling you"
// //                     : status === "calling"
// //                       ? "Calling..."
// //                       : "Waiting for video"}
// //                 </p>
// //                 <p className="mt-1 text-sm text-purple-200/50">
// //                   {status === "incoming"
// //                     ? "Accept to start your conversation"
// //                     : "Video will appear here when the connection is ready"}
// //                 </p>
// //               </div>
// //             </div>
// //           )}

// //           <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-xs text-white backdrop-blur-md sm:left-5 sm:top-5">
// //             {call.peerName || "Other user"}
// //           </div>

// //           <div className="absolute bottom-4 right-3 h-28 w-40 overflow-hidden rounded-2xl border border-white/20 bg-[#1b102b] shadow-2xl sm:bottom-5 sm:right-5 sm:h-44 sm:w-64">
// //             {hasLocalVideo && !cameraOff ? (
// //               <video
// //                 ref={localVideoRef}
// //                 autoPlay
// //                 playsInline
// //                 muted
// //                 className="h-full w-full scale-x-[-1] object-cover"
// //               />
// //             ) : (
// //               <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-purple-200/60">
// //                 <UserRound className="h-8 w-8" />
// //                 <span className="text-xs">Camera off</span>
// //               </div>
// //             )}
// //             <span className="absolute bottom-2 left-2 rounded-full bg-black/50 px-2 py-1 text-[10px] text-white">
// //               You
// //             </span>
// //           </div>
// //         </div>

// //         <footer className="flex shrink-0 flex-wrap items-center justify-center gap-3 border-t border-white/10 bg-[#100819]/95 px-3 py-4 backdrop-blur-xl sm:gap-4 sm:py-5">
// //           {status === "incoming" ? (
// //             <>
// //               <button
// //                 type="button"
// //                 onClick={acceptCall}
// //                 className="flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-400 active:scale-95"
// //               >
// //                 <Phone className="h-5 w-5" />
// //                 Accept
// //               </button>
// //               <button
// //                 type="button"
// //                 onClick={declineCall}
// //                 className="flex items-center gap-2 rounded-full bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-400 active:scale-95"
// //               >
// //                 <PhoneOff className="h-5 w-5" />
// //                 Decline
// //               </button>
// //             </>
// //           ) : (
// //             <>
// //               <button
// //                 type="button"
// //                 onClick={toggleMute}
// //                 title={muted ? "Unmute microphone" : "Mute microphone"}
// //                 aria-label={muted ? "Unmute microphone" : "Mute microphone"}
// //                 className={`flex h-12 w-12 items-center justify-center rounded-full transition active:scale-95 ${
// //                   muted
// //                     ? "bg-red-500 text-white"
// //                     : "bg-white/10 text-white hover:bg-white/20"
// //                 }`}
// //               >
// //                 {muted ? <MicOff /> : <Mic />}
// //               </button>

// //               <button
// //                 type="button"
// //                 onClick={toggleCamera}
// //                 title={cameraOff ? "Turn camera on" : "Turn camera off"}
// //                 aria-label={cameraOff ? "Turn camera on" : "Turn camera off"}
// //                 className={`flex h-12 w-12 items-center justify-center rounded-full transition active:scale-95 ${
// //                   cameraOff
// //                     ? "bg-red-500 text-white"
// //                     : "bg-white/10 text-white hover:bg-white/20"
// //                 }`}
// //               >
// //                 {cameraOff ? <VideoOff /> : <Video />}
// //               </button>

// //               <button
// //                 type="button"
// //                 onClick={() => finishCall({ notify: true })}
// //                 title="End call"
// //                 aria-label="End call"
// //                 className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white shadow-lg shadow-red-500/20 transition hover:bg-red-400 active:scale-95"
// //               >
// //                 <PhoneOff className="h-6 w-6" />
// //               </button>
// //             </>
// //           )}
// //         </footer>
// //       </section>
// //     </div>
// //   );
// // };

// // export default VideoCall;



// import { createPortal } from "react-dom";
// import { useCallback, useEffect, useRef, useState } from "react";
// import {
//   Video,
//   VideoOff,
//   Mic,
//   MicOff,
//   Phone,
//   PhoneOff,
//   X,
//   UserRound,
//   LoaderCircle,
// } from "lucide-react";
// import { useAuthStore } from "../../utils/useAuthStore";
// import { toast } from "react-toastify";

// const ICE_SERVERS = {
//   iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
// };

// const createCallId = () =>
//   globalThis.crypto?.randomUUID?.() ||
//   `${Date.now()}-${Math.random().toString(36).slice(2)}`;

// const VideoCall = ({ selectedUser }) => {
//   const socket = useAuthStore((state) => state.socket);

//   const [call, setCall] = useState(null);
//   const [status, setStatus] = useState("idle");
//   const [muted, setMuted] = useState(false);
//   const [cameraOff, setCameraOff] = useState(false);
//   const [hasRemoteVideo, setHasRemoteVideo] = useState(false);
//   const [hasLocalVideo, setHasLocalVideo] = useState(false);

//   const pcRef = useRef(null);
//   const localStreamRef = useRef(null);
//   const remoteStreamRef = useRef(null);
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const callRef = useRef(null);
//   const queuedCandidatesRef = useRef([]);

//   const updateCall = useCallback((nextCall) => {
//     callRef.current = nextCall;
//     setCall(nextCall);
//   }, []);

//   const stopMedia = useCallback(() => {
//     if (pcRef.current) {
//       pcRef.current.ontrack = null;
//       pcRef.current.onicecandidate = null;
//       pcRef.current.onconnectionstatechange = null;
//       pcRef.current.close();
//       pcRef.current = null;
//     }

//     localStreamRef.current?.getTracks().forEach((track) => track.stop());
//     localStreamRef.current = null;
//     remoteStreamRef.current = null;
//     queuedCandidatesRef.current = [];

//     if (localVideoRef.current) localVideoRef.current.srcObject = null;
//     if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

//     setHasRemoteVideo(false);
//     setHasLocalVideo(false);
//     setMuted(false);
//     setCameraOff(false);
//   }, []);

//   const finishCall = useCallback(
//     ({ notify = false, message = "" } = {}) => {
//       const current = callRef.current;

//       if (notify && current && socket?.connected) {
//         socket.emit("call:end", {
//           callId: current.callId,
//           to: current.peerId,
//         });
//       }

//       stopMedia();
//       updateCall(null);
//       setStatus("idle");

//       if (message) toast.info(message);
//     },
//     [socket, stopMedia, updateCall]
//   );

// //   const ensureMedia = useCallback(async () => {
// //     if (!navigator.mediaDevices?.getUserMedia) {
// //       throw new Error("Camera access requires HTTPS or localhost.");
// //     }

// //     try {
// //       const stream = await navigator.mediaDevices.getUserMedia({
// //         video: true,
// //         audio: true,
// //       });

// //       localStreamRef.current = stream;
// //       setHasLocalVideo(stream.getVideoTracks().length > 0);

// //       if (localVideoRef.current) {
// //         localVideoRef.current.srcObject = stream;
// //         localVideoRef.current.play().catch(() => {});
// //       }

// //       return stream;
// //     } catch (error) {
// //       if (
// //         error.name === "NotFoundError" ||
// //         error.name === "OverconstrainedError"
// //       ) {
// //         throw new Error(
// //           "Camera or microphone not found. Connect a device or check your settings."
// //         );
// //       }

// //       if (
// //         error.name === "NotAllowedError" ||
// //         error.name === "SecurityError"
// //       ) {
// //         throw new Error(
// //           "Camera or microphone permission denied. Allow access in browser settings."
// //         );
// //       }

// //       if (error.name === "NotReadableError") {
// //         throw new Error(
// //           "Camera or microphone is busy. Close other apps using it."
// //         );
// //       }

// //       throw error;
// //     }
// //   }, []);


// const ensureMedia = useCallback(async () => {
//   if (!navigator.mediaDevices?.getUserMedia) {
//     throw new Error("Camera and microphone require HTTPS or localhost.");
//   }

//   let stream;

//   try {
//     stream = await navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: true,
//     });
//   } catch (firstError) {
//     try {
//       // Try microphone only if the camera is unavailable.
//       stream = await navigator.mediaDevices.getUserMedia({
//         video: false,
//         audio: true,
//       });
//       toast.info("Camera unavailable. Continuing with audio only.");
//     } catch {
//       try {
//         // Try camera only if the microphone is unavailable.
//         stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: false,
//         });
//         toast.info("Microphone unavailable. Continuing without audio.");
//       } catch {
//         if (
//           firstError.name === "NotAllowedError" ||
//           firstError.name === "SecurityError"
//         ) {
//           throw new Error(
//             "Camera or microphone permission denied. Allow access in your browser settings."
//           );
//         }

//         throw new Error(
//           "No available camera or microphone was found. Connect a device or check your browser permissions."
//         );
//       }
//     }
//   }

//   localStreamRef.current = stream;

//   setHasLocalVideo(stream.getVideoTracks().length > 0);
//   setCameraOff(stream.getVideoTracks().length === 0);
//   setMuted(stream.getAudioTracks().length === 0);

//   if (localVideoRef.current) {
//     localVideoRef.current.srcObject = stream;
//     localVideoRef.current.play().catch(() => {});
//   }

//   return stream;
// }, []);

//   const createPeer = useCallback(
//     async (currentCall) => {
//       if (pcRef.current) return pcRef.current;

//       const pc = new RTCPeerConnection(ICE_SERVERS);
//       pcRef.current = pc;

//       try {
//         const stream = localStreamRef.current || (await ensureMedia());

//         stream.getTracks().forEach((track) => {
//           pc.addTrack(track, stream);
//         });

//         pc.ontrack = (event) => {
//           let remoteStream = event.streams?.[0];

//           if (!remoteStream) {
//             remoteStream = remoteStreamRef.current || new MediaStream();

//             if (
//               !remoteStream
//                 .getTracks()
//                 .some((track) => track.id === event.track.id)
//             ) {
//               remoteStream.addTrack(event.track);
//             }
//           }

//           remoteStreamRef.current = remoteStream;

//           if (remoteVideoRef.current) {
//             remoteVideoRef.current.srcObject = remoteStream;
//             remoteVideoRef.current.play().catch(() => {});
//           }

//           const updateRemoteVideo = () => {
//             setHasRemoteVideo(
//               Boolean(
//                 remoteStreamRef.current
//                   ?.getVideoTracks()
//                   .some(
//                     (track) =>
//                       track.readyState === "live" && !track.muted
//                   )
//               )
//             );
//           };

//           updateRemoteVideo();
//           event.track.onunmute = updateRemoteVideo;
//           event.track.onended = updateRemoteVideo;
//           event.track.onmute = updateRemoteVideo;
//         };

//         pc.onicecandidate = (event) => {
//           if (event.candidate && socket?.connected) {
//             socket.emit("call:ice-candidate", {
//               callId: currentCall.callId,
//               to: currentCall.peerId,
//               candidate: event.candidate,
//             });
//           }
//         };

//         pc.onconnectionstatechange = () => {
//           if (pc.connectionState === "connected") {
//             setStatus("connected");
//           } else if (pc.connectionState === "failed") {
//             toast.error(
//               "Connection failed. A TURN server may be needed for this network."
//             );
//             finishCall({ notify: true });
//           } else if (pc.connectionState === "disconnected") {
//             setStatus("connecting");
//           }
//         };

//         return pc;
//       } catch (error) {
//         pc.close();
//         if (pcRef.current === pc) pcRef.current = null;
//         throw error;
//       }
//     },
//     [ensureMedia, finishCall, socket]
//   );

//   const startCall = useCallback(async () => {
//     if (!selectedUser?._id || !socket?.connected) {
//       toast.error("Chat connection is not ready. Please try again.");
//       return;
//     }

//     if (callRef.current) {
//       toast.info("You already have an active call.");
//       return;
//     }

//     const currentCall = {
//       callId: createCallId(),
//       peerId: String(selectedUser._id),
//       peerName: selectedUser.fullName || "Connection",
//       direction: "outgoing",
//     };

//     updateCall(currentCall);
//     setStatus("calling");

//     try {
//       await ensureMedia();

//       socket.emit("call:request", {
//         callId: currentCall.callId,
//         to: currentCall.peerId,
//       });
//     } catch (error) {
//       console.error("Could not start call:", error);
//       finishCall();
//       toast.error(error.message || "Unable to access camera or microphone.");
//     }
//   }, [ensureMedia, finishCall, selectedUser, socket, updateCall]);

//   const acceptCall = useCallback(async () => {
//     const current = callRef.current;
//     if (!current || !socket?.connected) return;

//     try {
//       await ensureMedia();
//       await createPeer(current);

//       socket.emit("call:accept", {
//         callId: current.callId,
//         to: current.peerId,
//       });

//       setStatus("connecting");
//     } catch (error) {
//       console.error("Could not accept call:", error);

//       socket.emit("call:decline", {
//         callId: current.callId,
//         to: current.peerId,
//       });

//       finishCall();
//       toast.error(error.message || "Unable to accept the call.");
//     }
//   }, [createPeer, ensureMedia, finishCall, socket]);

//   const declineCall = useCallback(() => {
//     const current = callRef.current;

//     if (current && socket?.connected) {
//       socket.emit("call:decline", {
//         callId: current.callId,
//         to: current.peerId,
//       });
//     }

//     finishCall();
//   }, [finishCall, socket]);

//   const toggleMute = () => {
//     const next = !muted;

//     localStreamRef.current
//       ?.getAudioTracks()
//       .forEach((track) => {
//         track.enabled = !next;
//       });

//     setMuted(next);
//   };

//   const toggleCamera = () => {
//     const next = !cameraOff;

//     localStreamRef.current
//       ?.getVideoTracks()
//       .forEach((track) => {
//         track.enabled = !next;
//       });

//     setCameraOff(next);
//   };

//   useEffect(() => {
//     if (!socket) return;

//     const matchesCall = (payload) =>
//       Boolean(
//         payload?.callId &&
//           payload.callId === callRef.current?.callId &&
//           String(payload.from) === String(callRef.current?.peerId)
//       );

//     const onIncoming = (payload) => {
//       if (!payload?.callId || !payload?.from) return;

//       if (callRef.current) {
//         socket.emit("call:busy", {
//           callId: payload.callId,
//           to: payload.from,
//         });
//         return;
//       }

//       updateCall({
//         callId: payload.callId,
//         peerId: String(payload.from),
//         peerName:
//           String(selectedUser?._id) === String(payload.from)
//             ? selectedUser?.fullName || "Incoming caller"
//             : "Incoming caller",
//         direction: "incoming",
//       });

//       setStatus("incoming");
//     };

//     const onAccepted = async (payload) => {
//       if (!matchesCall(payload)) return;

//       try {
//         const pc = await createPeer(callRef.current);
//         const offer = await pc.createOffer();

//         await pc.setLocalDescription(offer);

//         socket.emit("call:offer", {
//           callId: callRef.current.callId,
//           to: callRef.current.peerId,
//           offer: pc.localDescription,
//         });

//         setStatus("connecting");
//       } catch (error) {
//         console.error("Offer creation failed:", error);
//         finishCall({ notify: true });
//         toast.error("Unable to establish the call.");
//       }
//     };

//     const onOffer = async (payload) => {
//       if (!matchesCall(payload) || !payload.offer) return;

//       try {
//         const pc = pcRef.current || (await createPeer(callRef.current));

//         await pc.setRemoteDescription(payload.offer);

//         for (const candidate of queuedCandidatesRef.current) {
//           await pc.addIceCandidate(new RTCIceCandidate(candidate));
//         }

//         queuedCandidatesRef.current = [];

//         const answer = await pc.createAnswer();
//         await pc.setLocalDescription(answer);

//         socket.emit("call:answer", {
//           callId: callRef.current.callId,
//           to: callRef.current.peerId,
//           answer: pc.localDescription,
//         });

//         setStatus("connecting");
//       } catch (error) {
//         console.error("Offer handling failed:", error);
//         finishCall({ notify: true });
//         toast.error("Unable to connect the call.");
//       }
//     };

//     const onAnswer = async (payload) => {
//       if (!matchesCall(payload) || !payload.answer || !pcRef.current) {
//         return;
//       }

//       try {
//         await pcRef.current.setRemoteDescription(payload.answer);

//         for (const candidate of queuedCandidatesRef.current) {
//           await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
//         }

//         queuedCandidatesRef.current = [];
//         setStatus("connected");
//       } catch (error) {
//         console.error("Answer handling failed:", error);
//         finishCall({ notify: true });
//       }
//     };

//     const onCandidate = async (payload) => {
//       if (!matchesCall(payload) || !payload.candidate) return;

//       try {
//         if (pcRef.current?.remoteDescription) {
//           await pcRef.current.addIceCandidate(
//             new RTCIceCandidate(payload.candidate)
//           );
//         } else {
//           queuedCandidatesRef.current.push(payload.candidate);
//         }
//       } catch (error) {
//         console.error("ICE candidate error:", error);
//       }
//     };

//     const onDeclined = (payload) => {
//       if (matchesCall(payload)) finishCall({ message: "Call declined." });
//     };

//     const onBusy = (payload) => {
//       if (matchesCall(payload)) {
//         finishCall({ message: "This user is busy on another call." });
//       }
//     };

//     const onEnded = (payload) => {
//       if (matchesCall(payload)) finishCall({ message: "Call ended." });
//     };

//     const onError = (payload) => {
//       if (
//         !payload?.callId ||
//         payload.callId === callRef.current?.callId
//       ) {
//         toast.error(payload?.message || "Call failed.");
//         finishCall();
//       }
//     };

//     socket.on("call:incoming", onIncoming);
//     socket.on("call:accepted", onAccepted);
//     socket.on("call:offer", onOffer);
//     socket.on("call:answer", onAnswer);
//     socket.on("call:ice-candidate", onCandidate);
//     socket.on("call:declined", onDeclined);
//     socket.on("call:busy", onBusy);
//     socket.on("call:ended", onEnded);
//     socket.on("call:error", onError);

//     return () => {
//       socket.off("call:incoming", onIncoming);
//       socket.off("call:accepted", onAccepted);
//       socket.off("call:offer", onOffer);
//       socket.off("call:answer", onAnswer);
//       socket.off("call:ice-candidate", onCandidate);
//       socket.off("call:declined", onDeclined);
//       socket.off("call:busy", onBusy);
//       socket.off("call:ended", onEnded);
//       socket.off("call:error", onError);
//     };
//   }, [socket, selectedUser, createPeer, finishCall, updateCall]);

//   useEffect(() => {
//     if (localVideoRef.current && localStreamRef.current) {
//       localVideoRef.current.srcObject = localStreamRef.current;
//       localVideoRef.current.play().catch(() => {});
//     }

//     if (remoteVideoRef.current && remoteStreamRef.current) {
//       remoteVideoRef.current.srcObject = remoteStreamRef.current;
//       remoteVideoRef.current.play().catch(() => {});
//     }
//   }, [call, status, hasLocalVideo, hasRemoteVideo, cameraOff]);

//   if (!call) {
//     return (
//       <button
//         type="button"
//         onClick={startCall}
//         title="Start video call"
//         aria-label="Start video call"
//         className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-300 transition hover:bg-fuchsia-500/20 hover:text-white active:scale-95"
//       >
//         <Video className="h-5 w-5" />
//       </button>
//     );
//   }

//   return createPortal(
//     <div className="fixed inset-0 z-[99999] flex h-[100dvh] w-screen items-center justify-center overflow-y-auto bg-black/90 p-2 backdrop-blur-md sm:p-5">
//       <section className="relative flex h-[min(90dvh,850px)] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-fuchsia-400/20 bg-[#090510] shadow-[0_0_80px_rgba(168,85,247,0.18)]">
//         <header className="z-10 flex shrink-0 items-center justify-between border-b border-white/10 bg-[#100819]/90 px-4 py-3 sm:px-6">
//           <div className="flex min-w-0 items-center gap-3">
//             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-300">
//               <Video className="h-5 w-5" />
//             </div>

//             <div className="min-w-0">
//               <h2 className="truncate font-semibold text-white">
//                 {call.peerName || "Video call"}
//               </h2>

//               <p className="flex items-center gap-1.5 text-xs text-purple-300/70">
//                 <span
//                   className={`h-1.5 w-1.5 rounded-full ${
//                     status === "connected"
//                       ? "bg-emerald-400"
//                       : "animate-pulse bg-amber-400"
//                   }`}
//                 />

//                 {status === "incoming"
//                   ? "Incoming video call"
//                   : status === "calling"
//                     ? "Calling..."
//                     : status === "connected"
//                       ? "Connected"
//                       : "Connecting..."}
//               </p>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={() => finishCall({ notify: true })}
//             aria-label="Close call"
//             className="rounded-xl p-2 text-purple-200 transition hover:bg-white/10 hover:text-white"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </header>

//         <div className="relative min-h-0 flex-1 overflow-hidden bg-[#05030a]">
//           <video
//             ref={remoteVideoRef}
//             autoPlay
//             playsInline
//             className={`absolute inset-0 h-full w-full object-contain sm:object-cover ${
//               hasRemoteVideo ? "opacity-100" : "opacity-0"
//             }`}
//           />

//           {!hasRemoteVideo && (
//             <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(ellipse_at_center,rgba(88,28,135,0.22),transparent_65%)] text-center">
//               <div className="flex h-24 w-24 items-center justify-center rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-300 shadow-[0_0_50px_rgba(217,70,239,0.12)]">
//                 {status === "calling" || status === "connecting" ? (
//                   <LoaderCircle className="h-10 w-10 animate-spin" />
//                 ) : (
//                   <UserRound className="h-10 w-10" />
//                 )}
//               </div>

//               <div>
//                 <p className="text-lg font-semibold text-white">
//                   {status === "incoming"
//                     ? "Someone is calling you"
//                     : status === "calling"
//                       ? "Calling..."
//                       : "Waiting for video"}
//                 </p>

//                 <p className="mt-1 text-sm text-purple-200/50">
//                   {status === "incoming"
//                     ? "Accept to start your conversation"
//                     : "Video will appear here when the connection is ready"}
//                 </p>
//               </div>
//             </div>
//           )}

//           <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-xs text-white backdrop-blur-md sm:left-5 sm:top-5">
//             {call.peerName || "Other user"}
//           </div>

//           <div className="absolute bottom-4 right-3 h-28 w-40 overflow-hidden rounded-2xl border border-white/20 bg-[#1b102b] shadow-2xl sm:bottom-5 sm:right-5 sm:h-44 sm:w-64">
//             {hasLocalVideo && !cameraOff ? (
//               <video
//                 ref={localVideoRef}
//                 autoPlay
//                 playsInline
//                 muted
//                 className="h-full w-full scale-x-[-1] object-cover"
//               />
//             ) : (
//               <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-purple-200/60">
//                 <UserRound className="h-8 w-8" />
//                 <span className="text-xs">Camera off</span>
//               </div>
//             )}

//             <span className="absolute bottom-2 left-2 rounded-full bg-black/50 px-2 py-1 text-[10px] text-white">
//               You
//             </span>
//           </div>
//         </div>

//         <footer className="flex shrink-0 flex-wrap items-center justify-center gap-3 border-t border-white/10 bg-[#100819]/95 px-3 py-4 backdrop-blur-xl sm:gap-4 sm:py-5">
//           {status === "incoming" ? (
//             <>
//               <button
//                 type="button"
//                 onClick={acceptCall}
//                 className="flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-400 active:scale-95"
//               >
//                 <Phone className="h-5 w-5" />
//                 Accept
//               </button>

//               <button
//                 type="button"
//                 onClick={declineCall}
//                 className="flex items-center gap-2 rounded-full bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-400 active:scale-95"
//               >
//                 <PhoneOff className="h-5 w-5" />
//                 Decline
//               </button>
//             </>
//           ) : (
//             <>
//               <button
//                 type="button"
//                 onClick={toggleMute}
//                 title={muted ? "Unmute microphone" : "Mute microphone"}
//                 aria-label={muted ? "Unmute microphone" : "Mute microphone"}
//                 className={`flex h-12 w-12 items-center justify-center rounded-full transition active:scale-95 ${
//                   muted
//                     ? "bg-red-500 text-white"
//                     : "bg-white/10 text-white hover:bg-white/20"
//                 }`}
//               >
//                 {muted ? <MicOff /> : <Mic />}
//               </button>

//               <button
//                 type="button"
//                 onClick={toggleCamera}
//                 title={cameraOff ? "Turn camera on" : "Turn camera off"}
//                 aria-label={cameraOff ? "Turn camera on" : "Turn camera off"}
//                 className={`flex h-12 w-12 items-center justify-center rounded-full transition active:scale-95 ${
//                   cameraOff
//                     ? "bg-red-500 text-white"
//                     : "bg-white/10 text-white hover:bg-white/20"
//                 }`}
//               >
//                 {cameraOff ? <VideoOff /> : <Video />}
//               </button>

//               <button
//                 type="button"
//                 onClick={() => finishCall({ notify: true })}
//                 title="End call"
//                 aria-label="End call"
//                 className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white shadow-lg shadow-red-500/20 transition hover:bg-red-400 active:scale-95"
//               >
//                 <PhoneOff className="h-6 w-6" />
//               </button>
//             </>
//           )}
//         </footer>
//       </section>
//     </div>,
//     document.body
//   );
// };

// export default VideoCall;



import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  X,
  UserRound,
  LoaderCircle,
} from "lucide-react";
import { useAuthStore } from "../../utils/useAuthStore";
import { toast } from "react-toastify";

const ICE_SERVERS = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

const createCallId = () =>
  globalThis.crypto?.randomUUID?.() ||
  `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const VideoCall = ({ selectedUser }) => {
  const socket = useAuthStore((state) => state.socket);

  const [call, setCall] = useState(null);
  const [status, setStatus] = useState("idle");
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [hasRemoteVideo, setHasRemoteVideo] = useState(false);
  const [hasLocalVideo, setHasLocalVideo] = useState(false);

  const callRef = useRef(null);
  const pcRef = useRef(null);
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const queuedCandidatesRef = useRef([]);
  const processingOfferRef = useRef(false);
  const mountedRef = useRef(false);

  const updateCall = useCallback((nextCall) => {
    callRef.current = nextCall;
    setCall(nextCall);
  }, []);

  const stopMedia = useCallback(() => {
    const pc = pcRef.current;
    pcRef.current = null;

    if (pc) {
      pc.ontrack = null;
      pc.onicecandidate = null;
      pc.onconnectionstatechange = null;
      pc.close();
    }

    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    localStreamRef.current = null;
    remoteStreamRef.current = null;
    queuedCandidatesRef.current = [];
    processingOfferRef.current = false;

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    setHasRemoteVideo(false);
    setHasLocalVideo(false);
    setMuted(false);
    setCameraOff(false);
  }, []);

  const finishCall = useCallback(
    ({ notify = false, message = "" } = {}) => {
      const current = callRef.current;

      if (notify && current && socket?.connected) {
        socket.emit("call:end", {
          callId: current.callId,
          to: current.peerId,
        });
      }

      updateCall(null);
      setStatus("idle");
      stopMedia();

      if (message) toast.info(message);
    },
    [socket, stopMedia, updateCall]
  );

  const ensureMedia = useCallback(async () => {
    if (localStreamRef.current) {
      return localStreamRef.current;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error("Camera and microphone require HTTPS or localhost.");
    }

    let stream;

    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
    } catch (firstError) {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: true,
        });
        toast.info("Camera unavailable. Continuing with audio only.");
      } catch {
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
          toast.info("Microphone unavailable. Continuing without audio.");
        } catch {
          if (
            firstError.name === "NotAllowedError" ||
            firstError.name === "SecurityError"
          ) {
            throw new Error(
              "Camera or microphone permission denied. Allow access in your browser settings."
            );
          }

          throw new Error(
            "Could not access your camera or microphone. Check your device and browser permissions."
          );
        }
      }
    }

    localStreamRef.current = stream;

    const hasVideo = stream.getVideoTracks().length > 0;
    const hasAudio = stream.getAudioTracks().length > 0;

    setHasLocalVideo(hasVideo);
    setCameraOff(!hasVideo);
    setMuted(!hasAudio);

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
      localVideoRef.current.play().catch(() => {});
    }

    return stream;
  }, []);

  const flushCandidates = useCallback(async (pc) => {
    if (!pc.remoteDescription) return;

    const pending = [...queuedCandidatesRef.current];
    queuedCandidatesRef.current = [];

    for (const candidate of pending) {
      try {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (error) {
        console.error("Could not add queued ICE candidate:", error);
      }
    }
  }, []);

  const createPeer = useCallback(
    async (currentCall) => {
      if (pcRef.current) return pcRef.current;

      const pc = new RTCPeerConnection(ICE_SERVERS);
      pcRef.current = pc;

      try {
        const stream = await ensureMedia();

        stream.getTracks().forEach((track) => {
          pc.addTrack(track, stream);
        });

        pc.ontrack = (event) => {
          let remoteStream = event.streams?.[0];

          if (!remoteStream) {
            remoteStream = remoteStreamRef.current || new MediaStream();

            if (
              !remoteStream
                .getTracks()
                .some((track) => track.id === event.track.id)
            ) {
              remoteStream.addTrack(event.track);
            }
          }

          remoteStreamRef.current = remoteStream;

          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play().catch(() => {});
          }

          const updateRemoteVideo = () => {
            const videoTrack = remoteStreamRef.current
              ?.getVideoTracks()
              .some((track) => track.readyState === "live" && !track.muted);

            setHasRemoteVideo(Boolean(videoTrack));
          };

          updateRemoteVideo();

          event.track.onunmute = updateRemoteVideo;
          event.track.onmute = updateRemoteVideo;
          event.track.onended = updateRemoteVideo;
        };

        pc.onicecandidate = (event) => {
          if (event.candidate && socket?.connected) {
            socket.emit("call:ice-candidate", {
              callId: currentCall.callId,
              to: currentCall.peerId,
              candidate: event.candidate,
            });
          }
        };

        pc.onconnectionstatechange = () => {
          if (pcRef.current !== pc) return;

          if (pc.connectionState === "connected") {
            setStatus("connected");
          } else if (pc.connectionState === "failed") {
            toast.error(
              "Connection failed. This network may require a TURN server."
            );
            finishCall({ notify: true });
          } else if (
            pc.connectionState === "disconnected" &&
            callRef.current
          ) {
            setStatus("connecting");
          }
        };

        return pc;
      } catch (error) {
        pc.close();

        if (pcRef.current === pc) {
          pcRef.current = null;
        }

        throw error;
      }
    },
    [ensureMedia, finishCall, socket]
  );

  const startCall = useCallback(async () => {
    if (!selectedUser?._id || !socket?.connected) {
      toast.error("Chat connection is not ready. Please try again.");
      return;
    }

    if (callRef.current) {
      toast.info("You already have an active call.");
      return;
    }

    const currentCall = {
      callId: createCallId(),
      peerId: String(selectedUser._id),
      peerName: selectedUser.fullName || "Connection",
      direction: "outgoing",
    };

    updateCall(currentCall);
    setStatus("calling");

    try {
      await ensureMedia();

      if (callRef.current?.callId !== currentCall.callId) return;

      socket.emit("call:request", {
        callId: currentCall.callId,
        to: currentCall.peerId,
      });
    } catch (error) {
      console.error("Could not start call:", error);
      finishCall();
      toast.error(error.message || "Unable to start the call.");
    }
  }, [selectedUser, socket, ensureMedia, updateCall, finishCall]);

  const acceptCall = useCallback(async () => {
    const current = callRef.current;

    if (!current || !socket?.connected) {
      toast.error("Call connection is not ready. Please try again.");
      return;
    }

    try {
      // Keep the call open while preparing the camera and peer.
      setStatus("connecting");

      await ensureMedia();

      if (callRef.current?.callId !== current.callId) return;

      await createPeer(current);

      if (callRef.current?.callId !== current.callId) return;

      socket.emit("call:accept", {
        callId: current.callId,
        to: current.peerId,
      });
    } catch (error) {
      console.error("Could not accept call:", error);

      socket.emit("call:decline", {
        callId: current.callId,
        to: current.peerId,
      });

      finishCall();
      toast.error(error.message || "Unable to accept the call.");
    }
  }, [socket, ensureMedia, createPeer, finishCall]);

  const declineCall = useCallback(() => {
    const current = callRef.current;

    if (current && socket?.connected) {
      socket.emit("call:decline", {
        callId: current.callId,
        to: current.peerId,
      });
    }

    finishCall();
  }, [socket, finishCall]);

  const toggleMute = () => {
    const next = !muted;

    localStreamRef.current?.getAudioTracks().forEach((track) => {
      track.enabled = !next;
    });

    setMuted(next);
  };

  const toggleCamera = () => {
    const next = !cameraOff;

    localStreamRef.current?.getVideoTracks().forEach((track) => {
      track.enabled = !next;
    });

    setCameraOff(next);
    setHasLocalVideo(
      Boolean(
        localStreamRef.current?.getVideoTracks().some(
          (track) => track.readyState === "live"
        )
      )
    );
  };

  // Attach the video elements whenever the call UI is rendered.
  useEffect(() => {
    if (localVideoRef.current && localStreamRef.current) {
      localVideoRef.current.srcObject = localStreamRef.current;
      localVideoRef.current.play().catch(() => {});
    }

    if (remoteVideoRef.current && remoteStreamRef.current) {
      remoteVideoRef.current.srcObject = remoteStreamRef.current;
      remoteVideoRef.current.play().catch(() => {});
    }
  }, [call, status, hasLocalVideo, hasRemoteVideo, cameraOff]);

  // Register listeners against the current socket without losing call state
  // when callback dependencies change.
  useEffect(() => {
    if (!socket) return;

    mountedRef.current = true;

    const matchesCall = (payload) =>
      Boolean(
        payload?.callId &&
          payload.callId === callRef.current?.callId &&
          String(payload.from) === String(callRef.current?.peerId)
      );

    const onIncoming = (payload) => {
      if (!payload?.callId || !payload?.from) return;

      if (callRef.current) {
        socket.emit("call:busy", {
          callId: payload.callId,
          to: payload.from,
        });
        return;
      }

      updateCall({
        callId: payload.callId,
        peerId: String(payload.from),
        peerName:
          String(selectedUser?._id) === String(payload.from)
            ? selectedUser?.fullName || "Incoming caller"
            : "Incoming caller",
        direction: "incoming",
      });

      setStatus("incoming");
    };

    const onAccepted = async (payload) => {
      if (!matchesCall(payload)) return;

      try {
        const current = callRef.current;
        const pc = await createPeer(current);

        if (callRef.current?.callId !== payload.callId) return;

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        socket.emit("call:offer", {
          callId: current.callId,
          to: current.peerId,
          offer: pc.localDescription,
        });

        setStatus("connecting");
      } catch (error) {
        console.error("Offer creation failed:", error);
        finishCall({ notify: true });
        toast.error(error.message || "Unable to establish the call.");
      }
    };

    const onOffer = async (payload) => {
      if (!matchesCall(payload) || !payload.offer) return;
      if (processingOfferRef.current) return;

      processingOfferRef.current = true;

      try {
        const current = callRef.current;
        const pc = pcRef.current || (await createPeer(current));

        if (callRef.current?.callId !== payload.callId) return;

        await pc.setRemoteDescription(
          new RTCSessionDescription(payload.offer)
        );

        await flushCandidates(pc);

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        socket.emit("call:answer", {
          callId: current.callId,
          to: current.peerId,
          answer: pc.localDescription,
        });

        setStatus("connecting");
      } catch (error) {
        console.error("Offer handling failed:", error);
        finishCall({ notify: true });
        toast.error("Unable to connect the call.");
      } finally {
        processingOfferRef.current = false;
      }
    };

    const onAnswer = async (payload) => {
      if (!matchesCall(payload) || !payload.answer || !pcRef.current) {
        return;
      }

      try {
        await pcRef.current.setRemoteDescription(
          new RTCSessionDescription(payload.answer)
        );

        await flushCandidates(pcRef.current);
        setStatus("connecting");
      } catch (error) {
        console.error("Answer handling failed:", error);
        finishCall({ notify: true });
        toast.error("Unable to complete the call.");
      }
    };

    const onCandidate = async (payload) => {
      if (!matchesCall(payload) || !payload.candidate) return;

      try {
        const candidate = new RTCIceCandidate(payload.candidate);
        const pc = pcRef.current;

        if (pc?.remoteDescription) {
          await pc.addIceCandidate(candidate);
        } else {
          queuedCandidatesRef.current.push(payload.candidate);
        }
      } catch (error) {
        console.error("ICE candidate error:", error);
      }
    };

    const onDeclined = (payload) => {
      if (matchesCall(payload)) {
        finishCall({ message: "Call declined." });
      }
    };

    const onBusy = (payload) => {
      if (matchesCall(payload)) {
        finishCall({ message: "This user is busy on another call." });
      }
    };

    const onEnded = (payload) => {
      if (matchesCall(payload)) {
        finishCall({ message: "Call ended." });
      }
    };

    const onError = (payload) => {
      if (
        !payload?.callId ||
        payload.callId === callRef.current?.callId
      ) {
        toast.error(payload?.message || "Call failed.");
        finishCall();
      }
    };

    socket.on("call:incoming", onIncoming);
    socket.on("call:accepted", onAccepted);
    socket.on("call:offer", onOffer);
    socket.on("call:answer", onAnswer);
    socket.on("call:ice-candidate", onCandidate);
    socket.on("call:declined", onDeclined);
    socket.on("call:busy", onBusy);
    socket.on("call:ended", onEnded);
    socket.on("call:error", onError);

    return () => {
      mountedRef.current = false;

      socket.off("call:incoming", onIncoming);
      socket.off("call:accepted", onAccepted);
      socket.off("call:offer", onOffer);
      socket.off("call:answer", onAnswer);
      socket.off("call:ice-candidate", onCandidate);
      socket.off("call:declined", onDeclined);
      socket.off("call:busy", onBusy);
      socket.off("call:ended", onEnded);
      socket.off("call:error", onError);
    };
  }, [
    socket,
    selectedUser,
    createPeer,
    finishCall,
    updateCall,
    flushCandidates,
  ]);

  // Release camera and microphone when the component actually unmounts.
  useEffect(() => {
    return () => {
      mountedRef.current = false;

      pcRef.current?.close();
      pcRef.current = null;

      localStreamRef.current?.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
      remoteStreamRef.current = null;
    };
  }, []);

  if (!call) {
    return (
      <button
        type="button"
        onClick={startCall}
        title="Start video call"
        aria-label="Start video call"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-300 transition hover:bg-fuchsia-500/20 hover:text-white active:scale-95"
      >
        <Video className="h-5 w-5" />
      </button>
    );
  }

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex h-[100dvh] w-screen items-center justify-center overflow-y-auto bg-black/90 p-2 backdrop-blur-md sm:p-5">
      <section className="relative flex h-[min(90dvh,850px)] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-fuchsia-400/20 bg-[#090510] shadow-[0_0_80px_rgba(168,85,247,0.18)]">
        <header className="z-10 flex shrink-0 items-center justify-between border-b border-white/10 bg-[#100819]/90 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-300">
              <Video className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h2 className="truncate font-semibold text-white">
                {call.peerName || "Video call"}
              </h2>

              <p className="flex items-center gap-1.5 text-xs text-purple-300/70">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    status === "connected"
                      ? "bg-emerald-400"
                      : "animate-pulse bg-amber-400"
                  }`}
                />

                {status === "incoming"
                  ? "Incoming video call"
                  : status === "calling"
                    ? "Calling..."
                    : status === "connected"
                      ? "Connected"
                      : "Connecting..."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => finishCall({ notify: true })}
            aria-label="Close call"
            className="rounded-xl p-2 text-purple-200 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="relative min-h-0 flex-1 overflow-hidden bg-[#05030a]">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className={`absolute inset-0 h-full w-full object-contain sm:object-cover ${
              hasRemoteVideo ? "opacity-100" : "opacity-0"
            }`}
          />

          {!hasRemoteVideo && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(ellipse_at_center,rgba(88,28,135,0.22),transparent_65%)] text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-300 shadow-[0_0_50px_rgba(217,70,239,0.12)]">
                {status === "calling" || status === "connecting" ? (
                  <LoaderCircle className="h-10 w-10 animate-spin" />
                ) : (
                  <UserRound className="h-10 w-10" />
                )}
              </div>

              <div>
                <p className="text-lg font-semibold text-white">
                  {status === "incoming"
                    ? "Someone is calling you"
                    : status === "calling"
                      ? "Calling..."
                      : "Waiting for video"}
                </p>

                <p className="mt-1 text-sm text-purple-200/50">
                  {status === "incoming"
                    ? "Accept to start your conversation"
                    : "Video will appear here when the connection is ready"}
                </p>
              </div>
            </div>
          )}

          <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-xs text-white backdrop-blur-md sm:left-5 sm:top-5">
            {call.peerName || "Other user"}
          </div>

          <div className="absolute bottom-4 right-3 h-28 w-40 overflow-hidden rounded-2xl border border-white/20 bg-[#1b102b] shadow-2xl sm:bottom-5 sm:right-5 sm:h-44 sm:w-64">
            {hasLocalVideo && !cameraOff ? (
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full scale-x-[-1] object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-purple-200/60">
                <UserRound className="h-8 w-8" />
                <span className="text-xs">Camera off</span>
              </div>
            )}

            <span className="absolute bottom-2 left-2 rounded-full bg-black/50 px-2 py-1 text-[10px] text-white">
              You
            </span>
          </div>
        </div>

        <footer className="flex shrink-0 flex-wrap items-center justify-center gap-3 border-t border-white/10 bg-[#100819]/95 px-3 py-4 backdrop-blur-xl sm:gap-4 sm:py-5">
          {status === "incoming" ? (
            <>
              <button
                type="button"
                onClick={acceptCall}
                className="flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-400 active:scale-95"
              >
                <Phone className="h-5 w-5" />
                Accept
              </button>

              <button
                type="button"
                onClick={declineCall}
                className="flex items-center gap-2 rounded-full bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-400 active:scale-95"
              >
                <PhoneOff className="h-5 w-5" />
                Decline
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={toggleMute}
                title={muted ? "Unmute microphone" : "Mute microphone"}
                aria-label={muted ? "Unmute microphone" : "Mute microphone"}
                className={`flex h-12 w-12 items-center justify-center rounded-full transition active:scale-95 ${
                  muted
                    ? "bg-red-500 text-white"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {muted ? <MicOff /> : <Mic />}
              </button>

              <button
                type="button"
                onClick={toggleCamera}
                title={cameraOff ? "Turn camera on" : "Turn camera off"}
                aria-label={cameraOff ? "Turn camera on" : "Turn camera off"}
                className={`flex h-12 w-12 items-center justify-center rounded-full transition active:scale-95 ${
                  cameraOff
                    ? "bg-red-500 text-white"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {cameraOff ? <VideoOff /> : <Video />}
              </button>

              <button
                type="button"
                onClick={() => finishCall({ notify: true })}
                title="End call"
                aria-label="End call"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white shadow-lg shadow-red-500/20 transition hover:bg-red-400 active:scale-95"
              >
                <PhoneOff className="h-6 w-6" />
              </button>
            </>
          )}
        </footer>
      </section>
    </div>,
    document.body
  );
};

export default VideoCall;
