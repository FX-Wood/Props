const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const depSchema = new Schema({
  name: String,
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Dep", depSchema);
