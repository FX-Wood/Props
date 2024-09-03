require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const expressJWT = require("express-jwt");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("open", () => {
  console.log(`Connected to Mongo on ${db.host}: ${db.port}`);
});
db.on("error", (err) => {
  console.log(`Database error:\n${err}`);
});

// protects resources from non-token bearers
app.use(
  "/locked",
  expressJWT({ secret: process.env.JWT_SECRET }).unless(
    { method: "POST" },
    require("./routes/locked"),
  ),
);

app.get("/api/alive", (req, res) => res.json({ message: "props api v1" }));

// controller mounts
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/props", require("./routes/props"));
app.use("/api/deps", require("./routes/dep"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/chat", require("./routes/chat"));
app.use("/api/seed", require("./routes/seedDb.js"));

module.exports = app;
