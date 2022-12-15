const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  score: { type: Number, required: true },
  time: { type: Number, required: true },
});

module.exports = mongoose.model("Session", sessionSchema);
