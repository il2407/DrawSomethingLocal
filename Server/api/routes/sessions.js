const express = require("express");
const router = express.Router();
require("dotenv").config();
const checkAuth = require("../middleware/checkAuth");

const sessionsController = require("../controllers/sessions");

// Adding new user details
// Method: POST
router.post(
  "/createsession",
  checkAuth,
  sessionsController.sessions_add_new_session
);

module.exports = router;
