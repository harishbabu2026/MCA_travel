const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const registerController = async (req, res) => {
  try {
    console.log(req.body);
    const existingUser = await userModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: "user already existed",
      });
    }
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      address: req.body.address,
      state: req.body.state,
      phone: req.body.phone,
      pincode: req.body.pincode,
    });
    await user.save();

    return res.status(201).json({
      success: true,
      message: "register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error In Register",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send(401).json({
        success: false,
        message: "email or password invalid",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "invalid email",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(201).json({
        success: false,
        message: "invalid password",
      });
    }

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "login successfull",
      user: {
        name: user.name,
        email: user.email,
        address: user.address,
        state: user.state,
        phone: user.phone,
        pincode: user.pincode,
        admin: user.admin,
      },
      admin: user.admin,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error In Login",
      error,
    });
  }
};

const testController = async (req, res) => {
  try {
    return res.json({
      success: true,
      message: "proteted route",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in testing ",
      error,
    });
  }
};

const protectedController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "invalid email",
      });
    }

    res.json({
      success: true,
      message: "admin route",
      admin: user.admin,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in admin testing ",
      error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  testController,
  protectedController,
};
