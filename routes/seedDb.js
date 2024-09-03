const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Dep = require("../models/dep");
const User = require("../models/user");
const Profile = require("../models/profile");
const Props = require("../models/props");
// make the deps
// add only a name

// make the users
// for each user:
// create user
// name, email, password

// make the user a profile
// photo, interests, groups
// add user ref
// add ref to user

// add users to deps
// add user ref to dep
// add dep ref to user

// data for deps
let DEPS = ["DevOps", "AppSec", "Sales", "Marketing"];
// data for users
let USERS = [
  "Gavin",
  "Sang",
  "FX",
  "Mickey",
  "Owen",
  "Ken",
  "Charles",
  "Hannah",
  "Carlo",
  "Garrett",
  "Steve",
  "Mike",
  "Madison",
  "Jennifer",
  "Wahlid",
];

// data for profiles
const HOBBIES = [
  "art",
  "biking",
  "hiking",
  "reading",
  "travel",
  "culinary arts",
  "destiny 2",
  "drinking beer",
  "Music",
  "Politics",
  "News",
  "Bandai Namco",
];
const COMPUTERS = [
  "supercomputing",
  "ES12",
  "Frontend Development",
  "Backend Development",
  "Full-stack Development",
  "Product management",
  "UX design",
  "slacking the colors out",
];
const GROUPS = [
  "Women in computing",
  "Testers for equality",
  "Tim's Dungeons & Dragons campaign",
  "Social Justice Coders",
  "Queer Dev meetup",
];
// these colors will be used in the placeholder images
const COLORS = [
  "#ff1493",
  "#120052",
  "#652ec7",
  "#00c2ba",
  "#82e0bf",
  "#e8bbc6",
  "#ffeda1",
  "#ff8c68",
  "#ff6863",
  "#ff5b00",
  "#234d20",
  "#007f0e",
  "#77ab59",
  "#c9df8a",
  "#f0f7da",
  "#ff00c1",
  "#9600ff",
  "#4900ff",
  "#00b8ff",
  "#00fff9",
];

// data for props
const PROPS_MESSAGES = [
  "Don't judge each day by the harvest you reap but by the seeds that you plant.",
  "Write it on your heart that every day is the best day in the year.",
  "Every moment is a fresh beginning.",
  "Without His love I can do nothing, with His love there is nothing I cannot do.",
  "Everything you’ve ever wanted is on the other side of fear.",
  "Begin at the beginning… and go on till you come to the end: then stop.",
  "Make each day your masterpiece.",
  "Dwell on the beauty of life. Watch the stars, and see yourself running with them.",
  "Perfection is not attainable, but if we chase perfection we can catch excellence.",
  "Put your heart, mind, and soul into even your smallest acts. This is the secret of success.",
  "Wherever you go, go with all your heart.",
  "You cannot tailor-make the situations in life but you can tailor-make the attitudes to fit those situations.",
  "There are two ways of spreading light: to be the candle or the mirror that reflects it.",
  "It is never too late to be what you might have been.",
  "The day is what you make it! So why not make it a great one?",
  "The roots of education are bitter, but the fruit is sweet.",
  "Tough times never last, but tough people do.",
  "To be the best, you must be able to handle the worst.",
  "What we’ve got to do is keep hope alive. Because without it we’ll sink.",
  "Learn from the mistakes of others. You can’t live long enough to make them all yourselves!",
  "The key to immortality is first living a life worth remembering",
  "Believe and act as if it were impossible to fail.",
  "Action is the foundational key to all success.",
  "Turn your wounds into wisdom",
  "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
  "You must be the change you wish to see in the world.",
  "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.",
  "Don’t regret the past, just learn from it.",
  "Keep your face always toward the sunshine - and shadows will fall behind you",
  "The greatest discovery of all time is that a person can change his future by merely changing his attitude.",
];

// array to store profiles that we make
var PROFILE_MODELS = [];

// helper function to get stuff from the arrays
function getItems(n, arr, exclude) {
  // gets some number of items 'n' from array 'arr'
  // does not get the same number twice
  // if an exclusion is provided, does not pick the exclusion
  let input = arr.slice();
  if (input.includes(exclude)) {
    input.slice(input.indexOf(exclude), 1);
  }
  let output = [];
  for (n; n > 0; n--) {
    output.push(input.splice(Math.floor(Math.random() * input.length), 1));
  }
  return output.join(", ");
}
// helper function to get a dep for a user
function addDep(user, depModels) {
  let randNum = Math.floor(Math.random() * depModels.length);
  depModels[randNum].members.push(user._id);
  user.department = depModels[randNum]._id;
  return depModels[randNum];
}
// helper function to make a profile for a user
function makeProfile(user) {
  let interests = getItems(2, HOBBIES) + ", " + getItems(2, COMPUTERS);
  let photo = "https://via.placeholder.com/150/" + getItems(1, COLORS);
  let groups = getItems(2, GROUPS);
  let profile = new Profile({
    interests: interests,
    photo: photo,
    groups: groups,
    user: user._id,
  });
  user.profile = profile._id;
  PROFILE_MODELS.push(profile);
  return profile;
}
// GET all records
router.get("/", (req, res) => {
  console.log("/GET /api/seed", req.originalUrl);
  Dep.find()
    .populate({ path: "members", populate: { path: "profile" } })
    .exec((err, deps) => {
      res.json({ err, deps });
    });
});

router.post("/", (req, res) => {
  console.log("/POST /api/seed", req.originalUrl);

  // MAKE THE THINGS

  // make the deps
  var depModels = DEPS.map((dep) => {
    return new Dep({
      name: dep,
      members: [],
    });
  });

  // make the users and profiles, attach the deps
  var userModels = USERS.map((userName) => {
    let user = new User({
      name: userName,
      email: userName.toLowerCase() + "@ga.co",
      password: "password()",
    });
    console.log("user is done", user);
    let profile = makeProfile(user);
    console.log("profile is done", user, profile);
    let dep = addDep(user, depModels);
    console.log("dep is done", user, dep);
    return user;
  });

  // send a bunch from one department
  // send a little less from another department
  // send a little less from another department
  userModels.map((userModel) => userModel.save());
  depModels.forEach((depModel) => depModel.save());
  PROFILE_MODELS.forEach((profileModel) => profileModel.save());

  res
    .status(201)
    .json({ type: "success", message: "DB successfully seeded", data: null });
});

router.get("/props", (req, res) => {
  Props.find()
    .populate({ path: "from", populate: "profile" })
    .populate("to")
    .exec((err, props) => {
      if (!err) {
        res
          .status(200)
          .json({
            type: "success",
            message: "you got all the props",
            data: props,
          });
      }
    });
});

router.post("/props", (req, res) => {
  User.find()
    .populate("department")
    .exec((err, users) => {
      console.log(users);
      // make the props
      // send a baseline number at random
      let userIDs = users.map((user) => user._id);
      let baseline = 15;
      userIDs.forEach((userID) => {
        let propsArr = [];
        for (let j = baseline; j > 0; j--) {
          let body = getItems(1, PROPS_MESSAGES);
          let from = userID;
          let to = getItems(1, userIDs, userID);
          console.log({ body, from, to });
          let singleProps = new Props({
            body: getItems(1, PROPS_MESSAGES),
            from: userID,
            to: getItems(1, userIDs, userID),
          });
          propsArr.push(singleProps);
        }
        console.log(propsArr);
        Props.bulkWrite(
          propsArr.map((props) => {
            console.log("writing these", propsArr);
            return { insertOne: { document: props } };
          }),
        );
      });
      res
        .status(201)
        .json({
          type: "success",
          message: "you successfully seeded props to the db",
          data: null,
        });
    });
});
// use this route to seed some departments with more outgoing props
router.post("/props/outgoing", (req, res) => {
  Dep.find((err, deps) => {
    console.log("these are the deps", deps);
    let targetDep = deps.splice(Math.floor(Math.random() * deps.length), 1)[0];
    console.log("this is the target deps members", targetDep.members);
    console.log("these are the receiving deps", deps);
    let senderIDs = targetDep.members.map((user) => user._id);
    let receiverIDs = deps
      .map((dep) => dep.members)
      .reduce((acc, next) => acc.concat(next), []);
    console.log(receiverIDs);
    let baseline = 15;
    senderIDs.forEach((senderID) => {
      let propsArr = [];
      for (let j = baseline; j > 0; j--) {
        let body = getItems(1, PROPS_MESSAGES);
        let from = getItems(1, senderIDs);
        let to = getItems(1, receiverIDs);
        console.log({ body, from, to });
        let singleProps = new Props({
          body: body,
          from: from,
          to: to,
        });
        propsArr.push(singleProps);
      }
      Props.bulkWrite(
        propsArr.map((props) => {
          return { insertOne: { document: props } };
        }),
      );
    });
    res
      .status(201)
      .json({
        type: "success",
        message: "you successfully seeded props to the db",
        data: null,
      });
  });
});

router.delete("/duke/nuke/em", (req, res) => {
  Profile.deleteMany({}, (err, res) => console.log("profile delete", err, res)),
    User.deleteMany({}, (err, res) => console.log("user delete", err, res)),
    Dep.deleteMany({}, (err, res) => console.log("dep delete", err, res)),
    Props.deleteMany({}, (err, res) => console.log("props delete", err, res));
  res.json({
    type: "success",
    message: "you duked the nukem out of your database",
  });
});

module.exports = router;
