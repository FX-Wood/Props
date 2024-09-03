// PROFILE routes
const router = require("express").Router();
const Profile = require("../models/profile");
const User = require("../models/user");
const mongoose = require("mongoose");

router.post("/", (req, res) => {
  // make a new profile, return 201 and no data
  console.log("POST api/profile/", req.originalUrl);
  // make new profile
  Profile.create(
    {
      photo: req.body.photo,
      interests: req.body.interests,
      groups: req.body.groups,
      user: mongoose.Types.ObjectId(req.body.userID),
    },
    (err, profile) => {
      console.log("return from Profile.create", err, profile);
      if (!err) {
        // add profile ref and department ref to user
        User.findByIdAndUpdate(
          req.body.user,
          {
            profile: profile._id,
            department: req.body.dep,
          },
          (err, user) => {
            if (!err) {
              res.json({
                type: "success",
                message: "successfully created user profile",
                data: { user, profile },
              });
            } else {
              res
                .status(500)
                .json({
                  type: "error",
                  message: "there was an error adding profile to your user",
                  data: err,
                });
            }
          },
        );
      } else {
        res
          .status(500)
          .json({
            type: "error",
            message: "there was an error during profile creation",
            data: err,
          });
      }
    },
  );
});

router
  .route("/:id/profile")
  .get((req, res) => {
    console.log("GET /user/:id/profile", req.originalUrl);
    Profile.findById(req.params.id)
      .populate("user")
      .exec((err, profile) => {
        if (!err) {
          console.log("got back from the database", { err, profile });
          res
            .status(200)
            .json({
              type: "success",
              message: "got profile and its associated user",
              profile,
            });
        } else {
          console.log("error", err);
          res.status(500).json({ type: "error", message: err.message });
        }
      });
  })
  .put((req, res) => {
    console.log("PUT /user/:id/profile", req.originalUrl);
    Profile.findByIdAndUpdate(
      req.params.id,
      { interests, photo, groups },
      (err, res) => {
        if (!err) {
          res
            .status(204)
            .json({ type: "success", message: "successfully updated profile" });
        } else {
          res.status(500).json({ type: "error", message: err.message });
        }
      },
    );
  });

module.exports = router;
