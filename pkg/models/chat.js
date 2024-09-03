const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      required: [true, "Chat must have a sender"],
    },
    body: {
      type: String,
      required: [true, "Chat must have content"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Chat", chatSchema);
