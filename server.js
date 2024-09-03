require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const expressJWT = require("express-jwt");
const RateLimit = require("express-rate-limit");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + "/client/build"));

const loginLimiter = new RateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3,
  delayMs: 0, // disabled
  message: JSON.stringify({
    type: "error",
    message: "Maximum login attempts exceeded!",
  }),
});

const signupLimiter = new RateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  delayMs: 0, // disabled
  message: JSON.stringify({
    type: "error",
    message: "Account creation maximum exceeded!",
  }),
});

// For Dev
// mongoose.connect('mongodb://localhost/' + process.env.PROPS_DB, {useNewUrlParser: true});
// For Production
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("open", () => {
  console.log(`Connected to Mongo on ${db.host}: ${db.port}`);
});
db.on("error", (err) => {
  console.log(`Database error:\n${err}`);
});

// rate limiters
app.use("/auth/login", loginLimiter);
app.use("/auth/signup", signupLimiter);

// protects resources from non-token bearers
app.use(
  "/locked",
  expressJWT({ secret: process.env.JWT_SECRET }).unless(
    { method: "POST" },
    require("./routes/locked"),
  ),
);

// controller mounts
app.use("/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/props", require("./routes/props"));
app.use("/api/deps", require("./routes/dep"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/chat", require("./routes/chat"));
app.use("/api/seed", require("./routes/seedDb.js"));

app.get("*", function (req, res) {
  res.sendFile(__dirname + "/client/build/index.html");
});

app.listen(process.env.PORT, () => {
  console.log(
    `You're listening to the sweet sounds of ${process.env.PORT} PROPS in the morning...`,
  );
  console.log(`Oh, and the port is`, process.env.PORT);
});
