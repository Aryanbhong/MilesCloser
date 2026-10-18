
const mongoose = require("mongoose");
const User = require("../models/user");
const Connection = require("../models/Connection");
const { io, emitToUser } = require("../lib/socket");

const validId = (id) => mongoose.Types.ObjectId.isValid(id);

const safeUserFields = "fullName email profilePic city";

async function sendRequest(req, res) {
  try {
    const requester = req.user.userId;
    const { userId: recipient } = req.body;

    if (!validId(recipient) || String(requester) === String(recipient)) {
      return res.status(400).json({ message: "Invalid recipient." });
    }

    const recipientUser = await User.findById(recipient);
    if (!recipientUser) {
      return res.status(404).json({ message: "User not found." });
    }

    let connection = await Connection.findOne({
      $or: [
        { requester, recipient },
        { requester: recipient, recipient: requester },
      ],
    });

    if (connection?.status === "blocked") {
      return res.status(403).json({
        message: "This connection is blocked and cannot be requested.",
      });
    }

    if (connection?.status === "accepted") {
      return res.status(409).json({
        message: "You are already connected.",
      });
    }

    if (connection?.status === "pending") {
      if (String(connection.requester) === String(requester)) {
        return res.status(409).json({
          message: "Your request is already pending.",
        });
      }

      // An incoming request already exists. Accepting it is explicit.
      return res.status(409).json({
        message: "This user has already sent you a request.",
        incomingRequest: true,
      });
    }
   
    if (connection) {
      connection.requester = requester;
      connection.recipient = recipient;
      connection.status = "pending";
      connection.blockedBy = null;
      await connection.save();
    } else {
      connection = await Connection.create({
        requester,
        recipient,
        status: "pending",
      });
    }

    const populated = await Connection.findById(connection._id)
      .populate("requester", safeUserFields)
      .populate("recipient", safeUserFields);

    emitToUser(recipient, "connection:request", populated);

    return res.status(201).json({
      message: "Connection request sent.",
      connection: populated,
    });
  } catch (error) {
    console.error("sendRequest:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
}

// async function getConnections(req, res) {
//   try {
//     const userId = req.user.userId;

//     const connections = await Connection.find({
//       status: "accepted",
//       $or: [{ requester: userId }, { recipient: userId }],
//     })
//       .populate("requester", safeUserFields)
//       .populate("recipient", safeUserFields)
//       .sort({ updatedAt: -1 });

//       console.log("Recipient ID:", recipientId);

//     const users = connections.map((connection) => {
//       const requester = connection.requester;
//       const recipient = connection.recipient;

//       return String(requester._id) === String(userId)
//         ? recipient
//         : requester;
//     });

//     return res.json(users);
//   } catch (error) {
//     console.error("getConnections:", error.message);
//     return res.status(500).json({ message: "Internal server error." });
//   }
// }

async function updateMyCity(req, res) {
  try {
    const userId = req.user.userId;
    const city = String(req.body.city || "").trim();

    if (city.length > 80) {
      return res.status(400).json({
        message: "City must be 80 characters or fewer.",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { city } },
      {
        new: true,
        runValidators: true,
      }
    ).select("fullName city");

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.json({
      message: city
        ? "Your city has been updated!"
        : "Your city has been cleared.",
      user,
    });
  } catch (error) {
    console.error("updateMyCity:", error.message);

    return res.status(500).json({
      message: "Unable to update your city.",
    });
  }
}



// async function getConnections(req, res) {
//   try {
//     const userId = req.user.userId;

//     const connections = await Connection.find({
//       status: "accepted",
//       $or: [{ requester: userId }, { recipient: userId }],
//     })
//       .populate("requester", safeUserFields)
//       .populate("recipient", safeUserFields)
//       .sort({ updatedAt: -1 });

//     const users = connections
//       .map((connection) => {
//         const requester = connection.requester;
//         const recipient = connection.recipient;

//         if (!requester || !recipient) return null;

//         return String(requester._id) === String(userId)
//           ? recipient
//           : requester;
//       })
//       .filter(Boolean);

//     return res.json(users);
//   } catch (error) {
//     console.error("getConnections:", error);
//     return res.status(500).json({
//       message: "Unable to fetch connections.",
//     });
//   }
// }


async function getConnections(req, res) {
  try {
    const userId = req.user.userId;

    const connections = await Connection.find({
      status: "accepted",
      $or: [
        { requester: userId },
        { recipient: userId },
      ],
    })
      .populate("requester", "fullName email profilePic city")
      .populate("recipient", "fullName email profilePic city")
      .sort({ updatedAt: -1 });

    const users = connections
      .map((connection) => {
        const requester = connection.requester;
        const recipient = connection.recipient;

        if (!requester || !recipient) return null;

        return String(requester._id) === String(userId)
          ? recipient
          : requester;
      })
      .filter(Boolean);

    return res.json(users);
  } catch (error) {
    console.error("getConnections:", error);

    return res.status(500).json({
      message: "Unable to fetch connections.",
    });
  }
}


async function getRequests(req, res) {
  try {
    const userId = req.user.userId;

    const [incoming, outgoing] = await Promise.all([
      Connection.find({ recipient: userId, status: "pending" })
        .populate("requester", safeUserFields)
        .sort({ createdAt: -1 }),
      Connection.find({ requester: userId, status: "pending" })
        .populate("recipient", safeUserFields)
        .sort({ createdAt: -1 }),
    ]);

    return res.json({
      incoming,
      outgoing,
    });
  } catch (error) {
    console.error("getRequests:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
}

// async function acceptRequest(req, res) {
//   try {
//     const userId = req.user.userId;
//     const { id } = req.params;

//     if (!validId(id)) {
//       return res.status(400).json({ message: "Invalid request ID." });
//     }

//     const connection = await Connection.findOneAndUpdate(
//       { _id: id, recipient: userId, status: "pending" },
//       { $set: { status: "accepted" } },
//       { new: true }
//     )
//       .populate("requester", safeUserFields)
//       .populate("recipient", safeUserFields);
      
//       console.log("Recipient ID:", recipientId);
//     if (!connection) {
//       return res.status(404).json({
//         message: "Pending incoming request not found.",
//       });
//     }

//     emitToUser(connection.requester._id, "connection:accepted", connection);
//     emitToUser(connection.recipient._id, "connection:accepted", connection);

//     return res.json({
//       message: "Connection accepted.",
//       connection,
//     });
//   } catch (error) {
//     console.error("acceptRequest:", error.message);
//     return res.status(500).json({ message: "Internal server error." });
//   }
// }

// async function acceptRequest(req, res) {
//   try {
//     const userId = req.user.userId;
//     const { id } = req.params;

//     if (!validId(id)) {
//       return res.status(400).json({
//         message: "Invalid request ID.",
//       });
//     }

//     const connection = await Connection.findOneAndUpdate(
//       {
//         _id: id,
//         recipient: userId,
//         status: "pending",
//       },
//       {
//         $set: { status: "accepted" },
//       },
//       { new: true }
//     )
//       .populate("requester", safeUserFields)
//       .populate("recipient", safeUserFields);

//     if (!connection) {
//       return res.status(404).json({
//         message: "Pending incoming request not found.",
//       });
//     }

//     emitToUser(connection.requester._id, "connection:accepted", connection);
//     emitToUser(connection.recipient._id, "connection:accepted", connection);

//     return res.json({
//       message: "Connection accepted.",
//       connection,
//     });
//   } catch (error) {
//     console.error("acceptRequest:", error);
//     return res.status(500).json({
//       message: "Internal server error.",
//     });
//   }
// }


// async function acceptRequest(req, res) {
//   try {
//     const userId = req.user.userId;
//     const { id } = req.params;

//     if (!validId(id)) {
//       return res.status(400).json({
//         message: "Invalid request ID.",
//       });
//     }

//     console.log("Accept request:", {
//       requestId: id,
//       loggedInUserId: String(userId),
//     });

//     // Find the request first so we can identify why it cannot be accepted.
//     const existingConnection = await Connection.findById(id);

//     if (!existingConnection) {
//       return res.status(404).json({
//         message: "Connection request not found.",
//       });
//     }

//     console.log("Existing connection:", {
//       requester: String(existingConnection.requester),
//       recipient: String(existingConnection.recipient),
//       status: existingConnection.status,
//     });

//     if (String(existingConnection.recipient) !== String(userId)) {
//       return res.status(403).json({
//         message: "You are not authorized to accept this request.",
//       });
//     }

//     if (existingConnection.status !== "pending") {
//       return res.status(409).json({
//         message: "This request is no longer pending.",
//         status: existingConnection.status,
//       });
//     }

//     existingConnection.status = "accepted";
//     await existingConnection.save();

//     const connection = await Connection.findById(existingConnection._id)
//       .populate("requester", safeUserFields)
//       .populate("recipient", safeUserFields);

//     emitToUser(connection.requester._id, "connection:accepted", connection);
//     emitToUser(connection.recipient._id, "connection:accepted", connection);

//     return res.json({
//       message: "Connection accepted.",
//       connection,
//     });
//   } catch (error) {
//     console.error("acceptRequest:", error);
//     return res.status(500).json({
//       message: "Internal server error.",
//     });
//   }
// }


async function acceptRequest(req, res) {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    console.log("STEP 1: Accept request started", {
      requestId: id,
      loggedInUserId: String(userId),
    });

    if (!validId(id)) {
      return res.status(400).json({
        message: "Invalid request ID.",
      });
    }

    console.log("STEP 2: Searching MongoDB...");

    const existingConnection = await Connection.findById(id).exec();

    console.log(
      "STEP 3: Database query completed:",
      existingConnection ? "Connection found" : "Connection not found"
    );

    if (!existingConnection) {
      return res.status(404).json({
        message: "Connection request not found.",
      });
    }

    console.log("STEP 4: Connection details:", {
      requester: String(existingConnection.requester),
      recipient: String(existingConnection.recipient),
      status: existingConnection.status,
    });

    if (String(existingConnection.recipient) !== String(userId)) {
      return res.status(403).json({
        message: "You are not authorized to accept this request.",
      });
    }

    if (existingConnection.status !== "pending") {
      return res.status(409).json({
        message: "This request is no longer pending.",
        status: existingConnection.status,
      });
    }

    existingConnection.status = "accepted";
    await existingConnection.save();

    console.log("STEP 5: Connection accepted in database.");

    const connection = await Connection.findById(existingConnection._id)
      .populate("requester", safeUserFields)
      .populate("recipient", safeUserFields);

    emitToUser(connection.requester._id, "connection:accepted", connection);
    emitToUser(connection.recipient._id, "connection:accepted", connection);

    return res.json({
      message: "Connection accepted.",
      connection,
    });
  } catch (error) {
    console.error("acceptRequest ERROR:", error);
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}



async function rejectRequest(req, res) {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    if (!validId(id)) {
      return res.status(400).json({ message: "Invalid request ID." });
    }

    const connection = await Connection.findOneAndUpdate(
      { _id: id, recipient: userId, status: "pending" },
      { $set: { status: "rejected" } },
      { new: true }
    );

    if (!connection) {
      return res.status(404).json({
        message: "Pending incoming request not found.",
      });
    }

    emitToUser(connection.requester, "connection:rejected", {
      connectionId: String(connection._id),
    });

    return res.json({ message: "Connection request rejected." });
  } catch (error) {
    console.error("rejectRequest:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
}

async function cancelRequest(req, res) {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    if (!validId(id)) {
      return res.status(400).json({ message: "Invalid request ID." });
    }

    const connection = await Connection.findOneAndDelete({
      _id: id,
      requester: userId,
      status: "pending",
    });

    if (!connection) {
      return res.status(404).json({
        message: "Your pending request was not found.",
      });
    }

    emitToUser(connection.recipient, "connection:cancelled", {
      connectionId: String(connection._id),
    });

    return res.json({ message: "Connection request cancelled." });
  } catch (error) {
    console.error("cancelRequest:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
}

async function removeConnection(req, res) {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    if (!validId(id)) {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    const connection = await Connection.findOneAndDelete({
      status: "accepted",
      $or: [
        { requester: userId, recipient: id },
        { requester: id, recipient: userId },
      ],
    });

    if (!connection) {
      return res.status(404).json({ message: "Connection not found." });
    }

    emitToUser(id, "connection:removed", {
      userId: String(userId),
    });

    emitToUser(userId, "connection:removed", {
      userId: String(id),
    });

    return res.json({ message: "Connection removed." });
  } catch (error) {
    console.error("removeConnection:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
}

async function blockUser(req, res) {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    if (!validId(id) || String(id) === String(userId)) {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    const target = await User.findById(id);
    if (!target) {
      return res.status(404).json({ message: "User not found." });
    }

    let connection = await Connection.findOne({
      $or: [
        { requester: userId, recipient: id },
        { requester: id, recipient: userId },
      ],
    });

    if (connection) {
      connection.status = "blocked";
      connection.blockedBy = userId;
      await connection.save();
    } else {
      connection = await Connection.create({
        requester: userId,
        recipient: id,
        status: "blocked",
        blockedBy: userId,
      });
    }

    emitToUser(id, "connection:removed", {
      userId: String(userId),
      blocked: true,
    });

    return res.json({ message: "User blocked." });
  } catch (error) {
    console.error("blockUser:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
}

async function unblockUser(req, res) {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const connection = await Connection.findOneAndDelete({
      requester: { $in: [userId, id] },
      recipient: { $in: [userId, id] },
      status: "blocked",
      blockedBy: userId,
    });

    if (!connection) {
      return res.status(404).json({
        message: "Blocked user relationship not found.",
      });
    }

    return res.json({ message: "User unblocked. Send a new request to reconnect." });
  } catch (error) {
    console.error("unblockUser:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
}



async function searchUsers(req, res) {
  try {
    const currentUserId = req.user.userId;
    const query = String(req.query.q || "").trim();

    if (query.length < 2) {
      return res.status(400).json({
        message: "Enter at least 2 characters to search.",
      });
    }

    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const users = await User.find({
      _id: { $ne: currentUserId },
      $or: [
        { fullName: { $regex: escaped, $options: "i" } },
        { email: { $regex: escaped, $options: "i" } },
      ],
    })
      .select("fullName email profilePic")
      .limit(20)
      .lean();

    const relationships = await Connection.find({
      $or: [
        { requester: currentUserId, recipient: { $in: users.map((u) => u._id) } },
        { recipient: currentUserId, requester: { $in: users.map((u) => u._id) } },
      ],
    }).select("requester recipient status blockedBy");

    const relationshipMap = new Map();

    for (const relationship of relationships) {
      const otherId =
        String(relationship.requester) === String(currentUserId)
          ? String(relationship.recipient)
          : String(relationship.requester);

      relationshipMap.set(otherId, {
        status: relationship.status,
        isRequester: String(relationship.requester) === String(currentUserId),
        blockedBy: relationship.blockedBy
          ? String(relationship.blockedBy)
          : null,
      });
    }

    const results = users.map((user) => ({
      ...user,
      relationship: relationshipMap.get(String(user._id)) || {
        status: "none",
        isRequester: false,
        blockedBy: null,
      },
    }));

    return res.json(results);
  } catch (error) {
    console.error("searchUsers:", error.message);
    return res.status(500).json({ message: "Unable to search users." });
  }
}


module.exports = {
  sendRequest,
  getConnections,
  getRequests,
  acceptRequest,
  rejectRequest,
  cancelRequest,
  removeConnection,
  blockUser,
  unblockUser,
  searchUsers,
  updateMyCity,
};
