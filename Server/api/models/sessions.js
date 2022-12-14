const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  uuid: { type: String, required: true },
  user: { type: String, required: false },
});

module.exports = mongoose.model("Session", sessionSchema);
