const express = require("express");
const router = express.Router();
require("dotenv").config();

const gameDatasController = require("../controllers/gameData");

// Adding new user details
// Method: POST
router.post("/createGameData", gameDatasController.gameDatas_add_new_gameData);

router.get("/", gameDatasController.gameDatas_get_all);

router.put("/:gameDataId", gameDatasController.gamedata_edit);

module.exports = router;
