const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Auth failed",
        });
      } else {
        req.user = decode;
        next();
      }
    });
    // const decode = jwt.verify(
    //   req.headers.authorization,
    //   process.env.JWT_SECRET
    // );
    // req.user = decode;

    // next();
  } catch (error) {
    console.log(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    req.user = await userModel.findOne({ _id: req.user.id }).select("admin");

    // Check if admin field is true
    if (!req.user.admin) {
      return "Forbidden";
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "error in admin middleware",
    });
  }
};

module.exports = { requireSignIn, isAdmin };
