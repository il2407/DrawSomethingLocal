const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../middleware/checkAuth");

const codeBlocksController = require("../controllers/codeblock");

// Get All
// Method: GET
router.get("/", checkAuth, codeBlocksController.codeblocks_get_all);

// Create new
// Method: POST
router.post("/", checkAuth, codeBlocksController.codeblocks_create_codeblock);

// Get  By Id
// Method: GET
router.get("/:codeBlockId", codeBlocksController.codeblocks_get_by_id);

// Update  by Id
// Method: PUT
router.put("/:codeBlockId", codeBlocksController.codeblocks_edit);

// Delete  by Id
// Method: DELETE
router.delete(
  "/:codeBlockId",

  codeBlocksController.codeblocks_delete
);

module.exports = router;
