const router = require("express").Router();
router.get("/test", (req, res) => {
  res.send("You have accessed the protected route");
});

module.exports = router;
