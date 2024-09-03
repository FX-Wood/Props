// PROPS routes
const express = require("express");
const router = express.Router();
const Props = require("../models/props");

// GET - get all props
router.get("/", (req, res) => {
  console.log("GET /props");
  Props.find()
    .exec()
    .then((props) => {
      res
        .status(200)
        .json({ type: "success", message: "got props", data: props });
    })
    .catch((err) => {
      console.log("error");
      res.status(500).json({ type: "error", message: err.message });
    });
});
// GET /:id - Get one props
router.get("/:id", (req, res) => {
  Props.findById(req.params.id, (err, props) => {
    res.status(200).json(props);
  });
});

// POST - Create one props
router.post("/", (req, res) => {
  // create one props, return 201 and no data
  console.log("POST /api/props", req.originalUrl);
  let props = new Props({
    body: req.body.body,
    from: req.body.from,
    to: req.body.to,
  });
  props.save((err, newProp) => {
    if (!err) {
      console.log("props created, here is the db response:", newProp);
      res
        .status(201)
        .json({ type: "success", message: "Props created", data: newProp });
    } else {
      console.log(err);
      res
        .status(200)
        .json({
          type: "error",
          message: "there was an error creating your prop",
          data: err,
        });
    }
  });
});

module.exports = router;
