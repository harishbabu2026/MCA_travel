const {
  createContactController,
  getContactController,
  // getOneContactController,
  // updateContactController,
  updateControllerContact,
  getOneController,
  deleteContactController,
} = require("../controller/contactController");

const route = require("express").Router();

route.post("/create-contact", createContactController);
route.get("/get-all-contact", getContactController);
// route.get("/get-contact/:id", getOneContactController);
route.get("/get-one/:id", getOneController);
// route.patch("/update-contact/:id", updateContactController);
route.put("/update-contacts/:id", updateControllerContact);
route.delete("/delete-contact/:id", deleteContactController);
module.exports = route;
