const mongoose = require("mongoose");

const gameDataSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: false },
  word: { type: String, required: false },
  time: { type: Number, required: false },
  points: { type: Number, required: false },
  score: { type: Number, required: false },
});

module.exports = mongoose.model("GameData", gameDataSchema);
