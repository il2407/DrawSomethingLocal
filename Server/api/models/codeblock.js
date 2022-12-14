const mongoose = require("mongoose");

const codeBlockSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: false },
  text: { type: String, required: false },
});

module.exports = mongoose.model("CodeBlock", codeBlockSchema);
