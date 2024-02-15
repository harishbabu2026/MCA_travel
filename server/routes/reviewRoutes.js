const {
  createReviewController,
  getReviewController,
} = require("../controller/reviewController");
const { requireSignIn } = require("../middleware/authMiddleware");

const route = require("express").Router();

route.post("/create-review", createReviewController);
route.get("/get-review", getReviewController);

module.exports = route;
