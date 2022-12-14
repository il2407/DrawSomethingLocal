const express = require("express");
const router = express.Router();
require("dotenv").config();

const usersController = require("../controllers/users");

// Get All users
// Method: GET
router.get("/", usersController.users_get_all);

// Get User by email
// Method: GET
router.get("/role/:email", usersController.users_role_validate);

// Adding new user details
// Method: POST
router.post("/signup", usersController.users_add_new_user);

// Log in method
// Method: POST
router.post("/login", usersController.users_login);

// Delete User by id
// Method: DELETE
router.delete("/:userId", usersController.users_delete);

module.exports = router;
