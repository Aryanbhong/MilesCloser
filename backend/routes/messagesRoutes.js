const {authenticateToken} = require("../utils")
const {getUsersForSidebar, getMessages, sendMessages} = require("../controlers/messageControlers")
const {checkAuth} = require("../controlers/authControler")
const express = require("express");



const router = express.Router();

router.get("/users",authenticateToken,getUsersForSidebar);
router.get("/:id",authenticateToken,getMessages);
router.post("/send/:id", authenticateToken, sendMessages);
router.get("/check", authenticateToken, checkAuth);

module.exports = router;
