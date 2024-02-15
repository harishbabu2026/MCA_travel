const {
  createPackageContorller,
  getAllPackageContorller,
  getPackageContorller,
  updatePackageContorller,
  deletePackageContorller,
} = require("../controller/packageController");

const route = require("express").Router();
//create-package
route.post("/create-package", createPackageContorller);

route.get("/get-all-package", getAllPackageContorller);

route.get("/get-package/:id", getPackageContorller);

route.put("/update-package/:id", updatePackageContorller);

route.delete("/delete-package/:id", deletePackageContorller);

module.exports = route;
