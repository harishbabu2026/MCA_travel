const route = require("express").Router();
const formiddable = require("express-formidable");
const {
  creatTourController,
  getAllTourController,
} = require("../controller/tourController");
const store = require("../middleware/multer");

route.post(
  "/create-tour",
  formiddable(),
  store.array("images", 12),
  creatTourController
);
route.get("/get-All-tour", getAllTourController);

module.exports = route;
