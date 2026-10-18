
const express = require("express");
const { authenticateToken } = require("../utils");
const {
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
} = require("../controlers/connectionControlers");

const router = express.Router();

router.use(authenticateToken);

router.get("/", getConnections);
router.get("/requests", getRequests);
router.post("/request", sendRequest);
router.patch("/:id/accept", acceptRequest);
router.patch("/:id/reject", rejectRequest);
router.delete("/:id/cancel", cancelRequest);
router.delete("/:id", removeConnection);
router.post("/:id/block", blockUser);
router.delete("/:id/block", unblockUser);
router.get("/search", searchUsers);
router.patch("/city", updateMyCity);


module.exports = router;
