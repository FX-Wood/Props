const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  interests: String,
  photo: String,
  groups: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Profile", profileSchema);
