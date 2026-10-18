
const Connection = require("../models/Connection");

async function getConnection(userA, userB) {
  return Connection.findOne({
    $or: [
      { requester: userA, recipient: userB },
      { requester: userB, recipient: userA },
    ],
  });
}

async function areConnected(userA, userB) {
  if (!userA || !userB || String(userA) === String(userB)) {
    return false;
  }

  const connection = await getConnection(userA, userB);
  return connection?.status === "accepted";
}

async function isBlocked(userA, userB) {
  const connection = await getConnection(userA, userB);
  return connection?.status === "blocked";
}

module.exports = { getConnection, areConnected, isBlocked };
