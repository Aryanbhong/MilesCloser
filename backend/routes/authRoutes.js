const express = require("express");
const { authenticateToken } = require("../utils");
const { checkAuth } = require("../controlers/authControler");

const router = express.Router();



router.get("/checkAuth",authenticateToken,checkAuth);

module.exports = router;