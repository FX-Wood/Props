// PROPS MODEL
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propsSchema = new Schema(
  {
    body: {
      type: String,
      required: [true, "Your props must have a message"],
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Your props must have a sender"],
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Your props must have a recipient"],
    },
  },
  { timestamps: true },
); // add createdAt and updatedAt

module.exports = mongoose.model("Props", propsSchema);
