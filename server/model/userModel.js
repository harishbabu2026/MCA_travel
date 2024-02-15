const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    state: {
      type: String,
      required: [true, "state is required"],
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
    },
    pincode: {
      type: String,
      required: [true, "pincode is required"],
    },
    // role: {
    //   type: Number,
    //   default: 0,
    // },
    admin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
