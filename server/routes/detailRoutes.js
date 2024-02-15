const route = require("express").Router();
const {
  imageMultiController,
  getMultiFileUpload,
} = require("../controller/detailController");
const store = require("../middleware/multer");

route.post(
  "/uploadmultipleimages",
  store.array("images", 12),
  imageMultiController
);

route.get("/get-images", getMultiFileUpload);

module.exports = route;
