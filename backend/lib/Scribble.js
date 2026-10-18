
// const crypto = require("crypto");

// const rooms = new Map();
// const socketRooms = new Map();

// const ROUND_SECONDS = 60;
// const TOTAL_ROUNDS = 5;
// const MIN_PLAYERS = 2;
// const MAX_PLAYERS = 8;

// const WORDS = {
//   classic: [
//     "apple", "bicycle", "rainbow", "guitar", "elephant",
//     "pizza", "airplane", "mountain", "football", "butterfly",
//     "umbrella", "camera", "castle", "dinosaur", "watermelon",
//     "laptop", "rocket", "turtle", "sunflower", "toothbrush",
//   ],
//   couple: [
//     "date night", "candlelight", "love letter", "movie night",
//     "chocolate", "flowers", "sunset", "hug", "heart",
//     "romantic dinner", "picnic", "stargazing", "dance",
//     "love song", "surprise gift", "beach walk",
//   ],
// };

// const normalizeMode = (mode) =>
//   mode === "couple" ? "couple" : "classic";

// const makeRoomCode = () => {
//   const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
//   let code;

//   do {
//     code = Array.from(
//       { length: 6 },
//       () => characters[crypto.randomInt(characters.length)]
//     ).join("");
//   } while (rooms.has(code));

//   return code;
// };

// const chooseWord = (mode) => {
//   const words = WORDS[mode] || WORDS.classic;
//   return words[crypto.randomInt(words.length)];
// };

// function publicRoom(room) {
//   return {
//     roomCode: room.code,
//     code: room.code,
//     mode: room.mode,
//     hostId: room.hostId,
//     players: room.players.map((player) => ({
//       id: player.id,
//       playerId: player.id,
//       playerName: player.name,
//       name: player.name,
//       score: player.score,
//       isDrawing: player.id === room.drawerId,
//       isHost: player.id === room.hostId,
//     })),
//     status: room.status,
//     currentRound: room.currentRound,
//     totalRounds: TOTAL_ROUNDS,
//     round: room.currentRound,
//     maxPlayers: MAX_PLAYERS,
//   };
// }

// function emitRoomUpdate(io, room) {
//   io.to(room.code).emit("scribble:room-update", publicRoom(room));
// }

// function sendError(socket, message) {
//   socket.emit("scribble:error", { message });
// }

// function clearRoundTimer(room) {
//   if (room.timer) {
//     clearInterval(room.timer);
//     room.timer = null;
//   }
// }

// function getPlayer(room, socketId) {
//   return room.players.find((player) => player.socketId === socketId);
// }

// function sendRoundInfo(io, room, eventName) {
//   const drawer = room.players.find(
//     (player) => player.id === room.drawerId
//   );

//   for (const player of room.players) {
//     const isDrawer = player.id === room.drawerId;

//     io.to(player.socketId).emit(eventName, {
//       ...publicRoom(room),
//       word: isDrawer ? room.word : "",
//       wordHint: isDrawer
//         ? room.word
//         : room.word.replace(/[a-z]/gi, "_"),
//       drawerId: room.drawerId,
//       drawerName: drawer?.name || "",
//       currentRound: room.currentRound,
//       totalRounds: TOTAL_ROUNDS,
//       timeLeft: ROUND_SECONDS,
//     });
//   }
// }

// function endRound(io, room) {
//   if (!room || room.status !== "playing" || room.roundEnding) return;

//   room.roundEnding = true;
//   clearRoundTimer(room);

//   io.to(room.code).emit("scribble:round-ended", {
//     word: room.word,
//     scores: room.players.map((player) => ({
//       playerId: player.id,
//       playerName: player.name,
//       score: player.score,
//     })),
//     currentRound: room.currentRound,
//     totalRounds: TOTAL_ROUNDS,
//   });

//   if (room.currentRound >= TOTAL_ROUNDS) {
//     room.status = "finished";

//     io.to(room.code).emit("scribble:game-ended", {
//       ...publicRoom(room),
//       scores: room.players
//         .map((player) => ({
//           playerId: player.id,
//           playerName: player.name,
//           score: player.score,
//         }))
//         .sort((a, b) => b.score - a.score),
//     });

//     return;
//   }

//   // Start the next round after a short pause.
//   room.nextRoundTimeout = setTimeout(() => {
//     room.nextRoundTimeout = null;

//     if (rooms.get(room.code) !== room || room.status !== "playing") {
//       return;
//     }

//     startRound(io, room);
//   }, 3000);
// }

// function startRound(io, room) {
//   if (room.players.length < MIN_PLAYERS) {
//     room.status = "waiting";
//     clearRoundTimer(room);
//     emitRoomUpdate(io, room);
//     return;
//   }

//   clearRoundTimer(room);

//   if (room.nextRoundTimeout) {
//     clearTimeout(room.nextRoundTimeout);
//     room.nextRoundTimeout = null;
//   }

//   room.currentRound += 1;

//   // Rotate the drawer between players.
//   const drawerIndex = (room.currentRound - 1) % room.players.length;
//   room.drawerId = room.players[drawerIndex].id;
//   room.word = chooseWord(room.mode);
//   room.timeLeft = ROUND_SECONDS;
//   room.roundEnding = false;
//   room.guessedPlayers = new Set();

//   room.players.forEach((player) => {
//     player.hasGuessed = false;
//   });

//   io.to(room.code).emit("scribble:clear", {
//     roomCode: room.code,
//   });

//   sendRoundInfo(io, room, "scribble:round-update");
//   io.to(room.code).emit("scribble:game-started", {
//     ...publicRoom(room),
//     currentRound: room.currentRound,
//     totalRounds: TOTAL_ROUNDS,
//     drawerId: room.drawerId,
//   });

//   room.timer = setInterval(() => {
//     if (rooms.get(room.code) !== room || room.status !== "playing") {
//       clearRoundTimer(room);
//       return;
//     }

//     room.timeLeft -= 1;

//     io.to(room.code).emit("scribble:timer", {
//       timeLeft: room.timeLeft,
//       currentRound: room.currentRound,
//       totalRounds: TOTAL_ROUNDS,
//     });

//     if (room.timeLeft <= 0) {
//       endRound(io, room);
//     }
//   }, 1000);
// }

// function removePlayer(io, socket, room) {
//   if (!room) return;

//   const player = getPlayer(room, socket.id);
//   if (!player) return;

//   room.players = room.players.filter(
//     (item) => item.socketId !== socket.id
//   );

//   socketRooms.delete(socket.id);
//   socket.leave(room.code);

//   if (room.players.length === 0) {
//     clearRoundTimer(room);

//     if (room.nextRoundTimeout) {
//       clearTimeout(room.nextRoundTimeout);
//     }

//     rooms.delete(room.code);
//     return;
//   }

//   if (room.hostId === player.id) {
//     room.hostId = room.players[0].id;
//   }

//   if (room.status === "playing") {
//     // If the drawer leaves, end the round rather than leaving
//     // the remaining players stuck.
//     if (room.drawerId === player.id) {
//       endRound(io, room);
//     } else if (room.players.length < MIN_PLAYERS) {
//       clearRoundTimer(room);
//       room.status = "waiting";
//       room.currentRound = 0;
//       room.drawerId = null;
//       room.word = "";
//       room.roundEnding = false;

//       if (room.nextRoundTimeout) {
//         clearTimeout(room.nextRoundTimeout);
//         room.nextRoundTimeout = null;
//       }

//       io.to(room.code).emit("scribble:game-ended", {
//         ...publicRoom(room),
//         message: "Not enough players to continue.",
//       });
//     }
//   }

//   emitRoomUpdate(io, room);
// }

// function registerScribble(io) {
//   io.on("connection", (socket) => {
//     socket.on("scribble:create-room", (payload = {}) => {
//       try {
//         const playerName = String(
//           payload.playerName || payload.name || ""
//         ).trim().slice(0, 24);

//         if (!playerName) {
//           return sendError(socket, "Enter your player name first.");
//         }

//         // One socket can only belong to one Scribble room.
//         const existingRoomCode = socketRooms.get(socket.id);

//         if (existingRoomCode) {
//           removePlayer(io, socket, rooms.get(existingRoomCode));
//         }

//         const code = makeRoomCode();
//         const player = {
//           id: socket.userId,
//           socketId: socket.id,
//           name: playerName,
//           score: 0,
//           hasGuessed: false,
//         };

//         const room = {
//           code,
//           mode: normalizeMode(payload.mode),
//           hostId: player.id,
//           players: [player],
//           status: "waiting",
//           currentRound: 0,
//           drawerId: null,
//           word: "",
//           timeLeft: ROUND_SECONDS,
//           timer: null,
//           nextRoundTimeout: null,
//           roundEnding: false,
//           guessedPlayers: new Set(),
//         };

//         rooms.set(code, room);
//         socketRooms.set(socket.id, code);
//         socket.join(code);

//         socket.emit("scribble:room-created", {
//           ...publicRoom(room),
//           playerId: player.id,
//           playerName: player.name,
//         });

//         emitRoomUpdate(io, room);
//       } catch (error) {
//         console.error("Scribble create room error:", error);
//         sendError(socket, "Could not create a room. Please try again.");
//       }
//     });

//     socket.on("scribble:join-room", (payload = {}) => {
//       const code = String(
//         payload.roomCode || payload.code || ""
//       ).trim().toUpperCase();

//       const playerName = String(
//         payload.playerName || payload.name || ""
//       ).trim().slice(0, 24);

//       const room = rooms.get(code);

//       if (!room) return sendError(socket, "Room not found.");
//       if (!playerName) return sendError(socket, "Enter your player name.");
//       if (room.status !== "waiting") {
//         return sendError(socket, "This game has already started.");
//       }
//       if (room.players.some((player) => player.id === socket.userId)) {
//         return sendError(socket, "You are already in this room.");
//       }
//       if (room.players.length >= MAX_PLAYERS) {
//         return sendError(socket, "This room is full.");
//       }

//       const existingRoomCode = socketRooms.get(socket.id);
//       if (existingRoomCode) {
//         removePlayer(io, socket, rooms.get(existingRoomCode));
//       }

//       const player = {
//         id: socket.userId,
//         socketId: socket.id,
//         name: playerName,
//         score: 0,
//         hasGuessed: false,
//       };

//       room.players.push(player);
//       socketRooms.set(socket.id, code);
//       socket.join(code);

//       socket.emit("scribble:room-joined", {
//         ...publicRoom(room),
//         playerId: player.id,
//         playerName: player.name,
//       });

//       emitRoomUpdate(io, room);
//     });

//     socket.on("scribble:start", () => {
//       const code = socketRooms.get(socket.id);
//       const room = code && rooms.get(code);

//       if (!room) return sendError(socket, "Join a room first.");
//       if (room.hostId !== socket.userId) {
//         return sendError(socket, "Only the room host can start the game.");
//       }
//       if (room.status !== "waiting") {
//         return sendError(socket, "The game has already started.");
//       }
//       if (room.players.length < MIN_PLAYERS) {
//         return sendError(socket, "At least 2 players are needed.");
//       }

//       room.status = "playing";
//       room.players.forEach((player) => {
//         player.score = 0;
//       });

//       startRound(io, room);
//       emitRoomUpdate(io, room);
//     });

//     socket.on("scribble:draw", (payload = {}) => {
//       const code = socketRooms.get(socket.id);
//       const room = code && rooms.get(code);

//       if (
//         !room ||
//         room.status !== "playing" ||
//         room.drawerId !== socket.userId
//       ) {
//         return;
//       }

//       // Relay only drawing data; never accept arbitrary room IDs
//       // from the client as proof of room membership.
//       socket.to(room.code).emit("scribble:draw", {
//         ...payload,
//         playerId: socket.userId,
//       });
//     });

//     socket.on("scribble:clear", () => {
//       const code = socketRooms.get(socket.id);
//       const room = code && rooms.get(code);

//       if (
//         room &&
//         room.status === "playing" &&
//         room.drawerId === socket.userId
//       ) {
//         io.to(room.code).emit("scribble:clear", {
//           roomCode: room.code,
//         });
//       }
//     });

//     socket.on("scribble:guess", (payload = {}) => {
//       const code = socketRooms.get(socket.id);
//       const room = code && rooms.get(code);
//       const player = room && getPlayer(room, socket.id);

//       if (
//         !room ||
//         room.status !== "playing" ||
//         !player ||
//         player.id === room.drawerId ||
//         player.hasGuessed
//       ) {
//         return;
//       }

//       const guess = String(
//         typeof payload === "string" ? payload : payload.guess || ""
//       ).trim().slice(0, 100);

//       if (!guess) return;

//       const correct =
//         guess.toLowerCase() === room.word.toLowerCase();

//       if (correct) {
//         player.hasGuessed = true;
//         room.guessedPlayers.add(player.id);

//         // Faster correct guesses earn more points.
//         player.score += Math.max(10, room.timeLeft * 10);

//         const drawer = room.players.find(
//           (item) => item.id === room.drawerId
//         );

//         if (drawer) drawer.score += 25;
//       }

//       io.to(room.code).emit("scribble:guess-update", {
//         playerId: player.id,
//         playerName: player.name,
//         guess: correct ? "Correct guess!" : guess,
//         correct,
//         scores: room.players.map((item) => ({
//           playerId: item.id,
//           playerName: item.name,
//           score: item.score,
//         })),
//       });

//       if (
//         correct &&
//         room.players
//           .filter((item) => item.id !== room.drawerId)
//           .every((item) => item.hasGuessed)
//       ) {
//         endRound(io, room);
//       }
//     });

//     socket.on("scribble:leave-room", () => {
//       const code = socketRooms.get(socket.id);
//       if (code) removePlayer(io, socket, rooms.get(code));
//     });

//     socket.on("disconnect", () => {
//       const code = socketRooms.get(socket.id);
//       if (code) removePlayer(io, socket, rooms.get(code));
//     });
//   });
// }

// module.exports = registerScribble;



const crypto = require("crypto");

const rooms = new Map();
const socketRooms = new Map();

const ROUND_SECONDS = 60;
const TOTAL_ROUNDS = 5;
const MIN_PLAYERS = 2;
const MAX_PLAYERS = 8;

const WORDS = {
  classic: [
    "apple", "bicycle", "rainbow", "guitar", "elephant",
    "pizza", "airplane", "mountain", "football", "butterfly",
    "umbrella", "camera", "castle", "dinosaur", "watermelon",
    "laptop", "rocket", "turtle", "sunflower", "toothbrush",
  ],
  couple: [
    "date night", "candlelight", "love letter", "movie night",
    "chocolate", "flowers", "sunset", "hug", "heart",
    "romantic dinner", "picnic", "stargazing", "dance",
    "love song", "surprise gift", "beach walk",
  ],
};

const normalizeMode = (mode) =>
  mode === "couple" ? "couple" : "classic";

const makeRoomCode = () => {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code;

  do {
    code = Array.from(
      { length: 6 },
      () => characters[crypto.randomInt(characters.length)]
    ).join("");
  } while (rooms.has(code));

  return code;
};

const chooseWord = (mode) => {
  const words = WORDS[mode] || WORDS.classic;
  return words[crypto.randomInt(words.length)];
};

function getPlayer(room, socketId) {
  return room.players.find((player) => player.socketId === socketId);
}

// function publicRoom(room) {
//   return {
//     roomCode: room.code,
//     code: room.code,
//     mode: room.mode,
//     hostId: room.hostId,
//     players: room.players.map((player) => ({
//       id: player.socketId,
//       playerId: player.socketId,
//       playerName: player.name,
//       name: player.name,
//       score: player.score,
//       isDrawing: player.socketId === room.drawerId,
//       isHost: player.socketId === room.hostId,
//     })),
//     status: room.status,
//     gameStarted: room.status === "playing",
//     currentRound: room.currentRound,
//     round: room.currentRound,
//     totalRounds: TOTAL_ROUNDS,
//     maxPlayers: MAX_PLAYERS,
//   };
// }

function publicRoom(room) {
  const host = room.players.find(
    (player) => player.id === room.hostId
  );

  const drawer = room.players.find(
    (player) => player.id === room.drawerId
  );

  return {
    roomCode: room.code,
    code: room.code,
    mode: room.mode,

    // The frontend compares these IDs with socket.id.
    hostId: host?.socketId || null,
    drawerId: drawer?.socketId || null,

    players: room.players.map((player) => ({
      id: player.socketId,
      playerId: player.id,
      playerName: player.name,
      name: player.name,
      score: player.score,
      isDrawing: player.id === room.drawerId,
      isHost: player.id === room.hostId,
    })),

    status: room.status,
    currentRound: room.currentRound,
    totalRounds: TOTAL_ROUNDS,
    round: room.currentRound,
    maxPlayers: MAX_PLAYERS,
  };
}

function emitRoomUpdate(io, room) {
  io.to(room.code).emit("scribble:room-update", {
    ...publicRoom(room),
    scores: Object.fromEntries(
      room.players.map((player) => [
        player.socketId,
        player.score,
      ])
    ),
  });
}

function sendError(socket, message) {
  socket.emit("scribble:error", { message });
}

function clearRoundTimer(room) {
  if (room.timer) {
    clearInterval(room.timer);
    room.timer = null;
  }
}

function clearNextRoundTimeout(room) {
  if (room.nextRoundTimeout) {
    clearTimeout(room.nextRoundTimeout);
    room.nextRoundTimeout = null;
  }
}

function sendRoundInfo(io, room, eventName) {
  const drawer = room.players.find(
    (player) => player.socketId === room.drawerId
  );

  for (const player of room.players) {
    const isDrawer = player.socketId === room.drawerId;

    io.to(player.socketId).emit(eventName, {
      ...publicRoom(room),
      word: isDrawer ? room.word : "",
      wordHint: isDrawer
        ? room.word
        : room.word.replace(/[a-z]/gi, "_"),
    //   drawerId: room.drawerId,
    drawerId: room.players.find(
  (player) => player.id === room.drawerId
)?.socketId || null,
      drawerName: drawer?.name || "",
      timeLeft: room.timeLeft,
      scores: Object.fromEntries(
        room.players.map((item) => [
          item.socketId,
          item.score,
        ])
      ),
    });
  }
}

function endRound(io, room) {
  if (!room || room.status !== "playing" || room.roundEnding) return;

  room.roundEnding = true;
  clearRoundTimer(room);

  io.to(room.code).emit("scribble:round-ended", {
    word: room.word,
    message: `The word was "${room.word}".`,
    scores: Object.fromEntries(
      room.players.map((player) => [
        player.socketId,
        player.score,
      ])
    ),
    currentRound: room.currentRound,
    totalRounds: TOTAL_ROUNDS,
  });

  if (room.currentRound >= TOTAL_ROUNDS) {
    room.status = "finished";

    io.to(room.code).emit("scribble:game-ended", {
      ...publicRoom(room),
      message: "Game finished!",
      scores: Object.fromEntries(
        room.players.map((player) => [
          player.socketId,
          player.score,
        ])
      ),
    });

    emitRoomUpdate(io, room);
    return;
  }

  room.nextRoundTimeout = setTimeout(() => {
    room.nextRoundTimeout = null;

    if (rooms.get(room.code) !== room || room.status !== "playing") {
      return;
    }

    startRound(io, room);
  }, 3000);
}

function startRound(io, room) {
  if (room.players.length < MIN_PLAYERS) {
    room.status = "waiting";
    room.currentRound = 0;
    room.drawerId = null;
    room.word = "";
    clearRoundTimer(room);
    clearNextRoundTimeout(room);
    emitRoomUpdate(io, room);
    return;
  }

  clearRoundTimer(room);
  clearNextRoundTimeout(room);

  room.currentRound += 1;

  const drawerIndex = (room.currentRound - 1) % room.players.length;
  room.drawerId = room.players[drawerIndex].socketId;
  room.word = chooseWord(room.mode);
  room.timeLeft = ROUND_SECONDS;
  room.roundEnding = false;
  room.guessedPlayers = new Set();

  room.players.forEach((player) => {
    player.hasGuessed = false;
  });

//   io.to(room.code).emit("scribble:clear", {
//     roomCode: room.code,
//   });
   io.to(room.code).emit("scribble:game-started", {
  ...publicRoom(room),
  roomCode: room.code,
  currentRound: room.currentRound,
  round: room.currentRound,
  totalRounds: TOTAL_ROUNDS,
  drawerId: room.players.find(
    (player) => player.id === room.drawerId
  )?.socketId || null,
});

  sendRoundInfo(io, room, "scribble:round-update");

  // Include the word only in the drawer's private round-update.
  // Do not broadcast the secret word to all players.
  io.to(room.code).emit("scribble:game-started", {
    ...publicRoom(room),
    currentRound: room.currentRound,
    totalRounds: TOTAL_ROUNDS,
    drawerId: room.drawerId,
    timeLeft: room.timeLeft,
    scores: Object.fromEntries(
      room.players.map((player) => [
        player.socketId,
        player.score,
      ])
    ),
  });

  room.timer = setInterval(() => {
    if (rooms.get(room.code) !== room || room.status !== "playing") {
      clearRoundTimer(room);
      return;
    }

    room.timeLeft = Math.max(0, room.timeLeft - 1);

    io.to(room.code).emit("scribble:timer", {
      timeLeft: room.timeLeft,
      currentRound: room.currentRound,
      totalRounds: TOTAL_ROUNDS,
    });

    if (room.timeLeft <= 0) {
      endRound(io, room);
    }
  }, 1000);
}

function removePlayer(io, socket, room) {
  if (!room) return;

  const player = getPlayer(room, socket.id);
  if (!player) return;

  room.players = room.players.filter(
    (item) => item.socketId !== socket.id
  );

  socketRooms.delete(socket.id);
  socket.leave(room.code);

  if (room.players.length === 0) {
    clearRoundTimer(room);
    clearNextRoundTimeout(room);
    rooms.delete(room.code);
    return;
  }

  if (room.hostId === socket.id) {
    room.hostId = room.players[0].socketId;
  }

  if (room.status === "playing" && room.players.length < MIN_PLAYERS) {
    clearRoundTimer(room);
    clearNextRoundTimeout(room);

    room.status = "waiting";
    room.currentRound = 0;
    room.drawerId = null;
    room.word = "";
    room.roundEnding = false;
    room.guessedPlayers = new Set();

    io.to(room.code).emit("scribble:game-ended", {
      ...publicRoom(room),
      message: "Not enough players to continue. The host can start again when another player joins.",
    });
  } else if (
    room.status === "playing" &&
    room.drawerId === socket.id
  ) {
    endRound(io, room);
  }

  emitRoomUpdate(io, room);
}

function registerScribble(io) {
  io.on("connection", (socket) => {
    // Each connected socket can participate in only one room.
    socket.on("scribble:create-room", (payload = {}) => {
      try {
        const playerName = String(
          payload.playerName || payload.name || ""
        ).trim().slice(0, 24);

        if (!playerName) {
          return sendError(socket, "Enter your player name first.");
        }

        const existingCode = socketRooms.get(socket.id);
        if (existingCode) {
          removePlayer(io, socket, rooms.get(existingCode));
        }

        const code = makeRoomCode();

        const player = {
          id: socket.id,
          socketId: socket.id,
          userId: socket.userId,
          name: playerName,
          score: 0,
          hasGuessed: false,
        };

        const room = {
          code,
          mode: normalizeMode(payload.mode),
          hostId: socket.id,
          players: [player],
          status: "waiting",
          currentRound: 0,
          drawerId: null,
          word: "",
          timeLeft: ROUND_SECONDS,
          timer: null,
          nextRoundTimeout: null,
          roundEnding: false,
          guessedPlayers: new Set(),
        };

        rooms.set(code, room);
        socketRooms.set(socket.id, code);
        socket.join(code);

        socket.emit("scribble:room-created", {
          ...publicRoom(room),
          playerId: socket.id,
          playerName: player.name,
          scores: { [socket.id]: 0 },
        });

        emitRoomUpdate(io, room);
      } catch (error) {
        console.error("Scribble create room error:", error);
        sendError(socket, "Could not create a room. Please try again.");
      }
    });

    socket.on("scribble:join-room", (payload = {}) => {
      const code = String(
        payload.roomCode || payload.code || ""
      ).trim().toUpperCase();

      const playerName = String(
        payload.playerName || payload.name || ""
      ).trim().slice(0, 24);

      const room = rooms.get(code);

      if (!room) return sendError(socket, "Room not found.");
      if (!playerName) return sendError(socket, "Enter your player name.");
      if (room.status !== "waiting") {
        return sendError(socket, "This game has already started.");
      }

      // Prevent the same authenticated account joining twice,
      // even from another browser tab or socket.
      if (room.players.some((player) => player.userId === socket.userId)) {
        return sendError(socket, "You are already in this room.");
      }

      if (room.players.length >= MAX_PLAYERS) {
        return sendError(socket, "This room is full.");
      }

      const existingCode = socketRooms.get(socket.id);
      if (existingCode) {
        removePlayer(io, socket, rooms.get(existingCode));
      }

      const player = {
        id: socket.id,
        socketId: socket.id,
        userId: socket.userId,
        name: playerName,
        score: 0,
        hasGuessed: false,
      };

      room.players.push(player);
      socketRooms.set(socket.id, code);
      socket.join(code);

      socket.emit("scribble:room-joined", {
        ...publicRoom(room),
        playerId: socket.id,
        playerName: player.name,
        scores: Object.fromEntries(
          room.players.map((item) => [
            item.socketId,
            item.score,
          ])
        ),
      });

      emitRoomUpdate(io, room);
    });

    socket.on("scribble:start", () => {
      const code = socketRooms.get(socket.id);
      const room = code && rooms.get(code);

      if (!room) return sendError(socket, "Join a room first.");
      if (room.hostId !== socket.id) {
        return sendError(socket, "Only the room host can start the game.");
      }
      if (room.status !== "waiting") {
        return sendError(socket, "The game has already started.");
      }
      if (room.players.length < MIN_PLAYERS) {
        return sendError(socket, "At least 2 players are needed.");
      }

      room.status = "playing";
      room.players.forEach((player) => {
        player.score = 0;
        player.hasGuessed = false;
      });

      startRound(io, room);
      emitRoomUpdate(io, room);
    });

    socket.on("scribble:draw", (payload = {}) => {
      const code = socketRooms.get(socket.id);
      const room = code && rooms.get(code);

      if (
        !room ||
        room.status !== "playing" ||
        room.drawerId !== socket.id ||
        !payload.line
      ) {
        return;
      }

      socket.to(room.code).emit("scribble:draw", {
        roomCode: room.code,
        line: payload.line,
        playerId: socket.id,
      });
    });

    socket.on("scribble:clear", () => {
      const code = socketRooms.get(socket.id);
      const room = code && rooms.get(code);

      if (
        room &&
        room.status === "playing" &&
        room.drawerId === socket.id
      ) {
        io.to(room.code).emit("scribble:clear", {
          roomCode: room.code,
        });
      }
    });

    socket.on("scribble:guess", (payload = {}) => {
      const code = socketRooms.get(socket.id);
      const room = code && rooms.get(code);
      const player = room && getPlayer(room, socket.id);

      if (
        !room ||
        room.status !== "playing" ||
        !player ||
        player.socketId === room.drawerId ||
        player.hasGuessed
      ) {
        return;
      }

      const guess = String(
        typeof payload === "string" ? payload : payload.guess || ""
      ).trim().slice(0, 100);

      if (!guess) return;

      const correct = guess.toLowerCase() === room.word.toLowerCase();

      if (correct) {
        player.hasGuessed = true;
        room.guessedPlayers.add(player.socketId);

        player.score += Math.max(10, room.timeLeft * 10);

        const drawer = room.players.find(
          (item) => item.socketId === room.drawerId
        );

        if (drawer) drawer.score += 25;
      }

      io.to(room.code).emit("scribble:guess-update", {
        playerId: player.socketId,
        playerName: player.name,
        guess: correct ? "Correct guess!" : guess,
        correct,
        scores: Object.fromEntries(
          room.players.map((item) => [
            item.socketId,
            item.score,
          ])
        ),
      });

      const guessers = room.players.filter(
        (item) => item.socketId !== room.drawerId
      );

      if (correct && guessers.length > 0 && guessers.every((item) => item.hasGuessed)) {
        endRound(io, room);
      }
    });

    socket.on("scribble:leave-room", () => {
      const code = socketRooms.get(socket.id);
      if (code) removePlayer(io, socket, rooms.get(code));
    });

    socket.on("disconnect", () => {
      const code = socketRooms.get(socket.id);
      if (code) removePlayer(io, socket, rooms.get(code));
    });
  });
}

module.exports = registerScribble;
