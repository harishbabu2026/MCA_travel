const route = require("express").Router();
const {
  registerController,
  loginController,
  testController,
  protectedController,
} = require("../controller/authControllers");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");

route.post("/register", registerController);
route.post("/login", loginController);
route.get("/test", requireSignIn, testController);
route.post("/protected", requireSignIn, isAdmin, protectedController);
route.get("/user-auth", requireSignIn, (req, res) => {
  res.json({ ok: true });
});
route.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.json({ ok: true });
});

module.exports = route;
