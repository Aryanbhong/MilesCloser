// // // socket.js
// // const { Server } = require("socket.io");
// // const http = require("http");
// // const express = require("express");

// // const app = express();
// // const server = http.createServer(app);

// // const io = new Server(server, {
// //   cors: {
// //     origin: ["http://localhost:5173"],
// //     credentials: true, 
// //     methods: ["GET", "POST"],
// //   },
// // });

// // const getRecieverSocketId=(userId)=>{
// //   return userSocketMap[userId];
// // }

// // const userSocketMap ={};

// // io.on("connection", (socket) => {
// //   // console.log("A user connected", socket.id);
  
// //   const userId = socket.handshake.query.userId;
// //   if(userId) userSocketMap[userId] = socket.id;

// //   io.emit("getOnlineUsers",Object.keys(userSocketMap));

// //   socket.on("disconnect", () => {
// //     // console.log("A user disconnected", socket.id);
// //     delete userSocketMap[userId];
// //     io.emit("getOnlineUsers", Object.keys(userSocketMap));
// //   });
// // });

// // module.exports = { io, app, server ,getRecieverSocketId};


// const { Server } = require("socket.io");
// const http = require("http");
// const express = require("express");
// const jwt = require("jsonwebtoken");

// const app = express();
// const server = http.createServer(app);

// const allowedOrigins = [
//   "http://localhost:5173",
//   process.env.FRONTEND_URL,
//   "https://milescloser-14.onrender.com",
// ].filter(Boolean);

// const io = new Server(server, {
//   cors: {
//     origin(origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }
//       return callback(new Error("Origin not allowed by CORS"));
//     },
//     credentials: true,
//     methods: ["GET", "POST"],
//   },
// });

// const userSocketMap = new Map();

// function getRecieverSocketId(userId) {
//   const sockets = userSocketMap.get(String(userId));
//   return sockets ? [...sockets][0] : undefined;
// }

// function emitToUser(userId, event, payload) {
//   const sockets = userSocketMap.get(String(userId));
//   if (!sockets) return;

//   for (const socketId of sockets) {
//     io.to(socketId).emit(event, payload);
//   }
// }

// io.use((socket, next) => {
//   const token = socket.handshake.auth?.token;

//   if (!token) {
//     return next(new Error("Authentication required"));
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
//     if (error || !decoded?.userId) {
//       return next(new Error("Invalid authentication token"));
//     }

//     socket.userId = String(decoded.userId);
//     next();
//   });
// });

// io.on("connection", (socket) => {
//   const userId = socket.userId;
//   const sockets = userSocketMap.get(userId) || new Set();

//   sockets.add(socket.id);
//   userSocketMap.set(userId, sockets);

//   io.emit("getOnlineUsers", [...userSocketMap.keys()]);

//   socket.on("disconnect", () => {
//     const activeSockets = userSocketMap.get(userId);

//     if (activeSockets) {
//       activeSockets.delete(socket.id);

//       if (activeSockets.size === 0) {
//         userSocketMap.delete(userId);
//       }
//     }

//     io.emit("getOnlineUsers", [...userSocketMap.keys()]);
//   });
// });

// module.exports = {
//   io,
//   app,
//   server,
//   getRecieverSocketId,
//   emitToUser,
// };



const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Connection = require("../models/Connection");

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "https://milescloser-c0wt.onrender.com",
  "https://milescloser-14.onrender.com",
].filter(Boolean);

const io = new Server(server, {
  cors: {
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST"],
  },
});

const userSocketMap = new Map();

function getRecieverSocketId(userId) {
  const sockets = userSocketMap.get(String(userId));
  return sockets ? [...sockets][0] : undefined;
}

function emitToUser(userId, event, payload) {
  const sockets = userSocketMap.get(String(userId));
  if (!sockets) return;

  for (const socketId of sockets) {
    io.to(socketId).emit(event, payload);
  }
}

async function areConnected(userA, userB) {
  if (
    !mongoose.Types.ObjectId.isValid(userA) ||
    !mongoose.Types.ObjectId.isValid(userB) ||
    String(userA) === String(userB)
  ) {
    return false;
  }

  const relationship = await Connection.findOne({
    $or: [
      { requester: userA, recipient: userB },
      { requester: userB, recipient: userA },
    ],
  }).select("status");

  return relationship?.status === "accepted";
}

io.use((socket, next) => {
  const token = socket.handshake.auth?.token;

  if (!token) {
    return next(new Error("Authentication required"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error || !decoded?.userId) {
      return next(new Error("Invalid authentication token"));
    }

    socket.userId = String(decoded.userId);
    next();
  });
});

io.on("connection", (socket) => {
  const userId = socket.userId;
  const sockets = userSocketMap.get(userId) || new Set();

  sockets.add(socket.id);
  userSocketMap.set(userId, sockets);

  io.emit("getOnlineUsers", [...userSocketMap.keys()]);

  // Every call must have a unique ID generated by the caller.
  const validCallPayload = (payload) =>
    payload &&
    typeof payload === "object" &&
    typeof payload.callId === "string" &&
    payload.callId.length > 0 &&
    payload.callId.length <= 128 &&
    mongoose.Types.ObjectId.isValid(payload.to);

  async function relayCallEvent(eventName, payload) {
    if (!validCallPayload(payload)) {
      socket.emit("call:error", {
        callId: payload?.callId,
        message: "Invalid call request.",
      });
      return;
    }

    const recipientId = String(payload.to);

    if (!(await areConnected(userId, recipientId))) {
      socket.emit("call:error", {
        callId: payload.callId,
        message: "Calls are only allowed between accepted connections.",
      });
      return;
    }

    emitToUser(recipientId, eventName, {
      ...payload,
      from: userId,
    });
  }

  socket.on("call:request", (payload) =>
    relayCallEvent("call:incoming", payload)
  );

  socket.on("call:accept", (payload) =>
    relayCallEvent("call:accepted", payload)
  );

  socket.on("call:decline", (payload) =>
    relayCallEvent("call:declined", payload)
  );

  socket.on("call:busy", (payload) =>
    relayCallEvent("call:busy", payload)
  );

  socket.on("call:offer", (payload) =>
    relayCallEvent("call:offer", payload)
  );

  socket.on("call:answer", (payload) =>
    relayCallEvent("call:answer", payload)
  );

  socket.on("call:ice-candidate", (payload) =>
    relayCallEvent("call:ice-candidate", payload)
  );

  socket.on("call:end", (payload) =>
    relayCallEvent("call:ended", payload)
  );

  socket.on("disconnect", () => {
    const activeSockets = userSocketMap.get(userId);

    if (activeSockets) {
      activeSockets.delete(socket.id);

      if (activeSockets.size === 0) {
        userSocketMap.delete(userId);
      }
    }

    io.emit("getOnlineUsers", [...userSocketMap.keys()]);
  });
});

const registerScribble = require("./Scribble");

registerScribble(io);

module.exports = {
  io,
  app,
  server,
  getRecieverSocketId,
  emitToUser,
};
