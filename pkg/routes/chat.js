// Chat routes
const express = require("express");
const router = express.Router();
const Chat = require("../models/chat");
const mongoose = require("mongoose");

// GET - get global chat
router.get("/", (req, res) => {
  Chat.find({}, function (err, messages) {
    if (!err) {
      res
        .status(200)
        .json({ type: "success", message: "message received", data: messages });
    } else {
      console.log("error");
      res.status(500).json({ type: "error", message: err.message });
    }
  });
});
// GET - get p2p chat
router.get("/:id", (res, req) => {
  Chat.findById(req.params.id, (err, messages) => {
    res.status(200).json(messages);
  });
});
// POST - create a message
router.post("/", (req, res) => {
  let chat = new Chat({
    senderId: req.body.senderId,
    body: req.body.body,
  });
  console.log("just created a new chat");
  chat.save((err, newMessage) => {
    if (!err) {
      console.log("success");
      res
        .status(201)
        .json({
          type: "success",
          message: "New chat message",
          data: newMessage,
        });
    } else {
      console.log("error:", err.message);
      res
        .status(500)
        .json({ type: "error", message: "chat failure", data: err });
    }
  });
});

module.exports = router;
