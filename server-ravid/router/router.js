const express = require("express");
const router = express.Router();
const cardsRestController = require("../cards/routes/cardsRestController");
const usersRestController = require("../users/routes/usersRestController");

router.use("/cards", cardsRestController);
router.use("/users", usersRestController);

router.use((req, res) => {
  res.status(404).send("page not found");
});

module.exports = router;
