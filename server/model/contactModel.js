const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "firstname is required"],
    },
    lastname: {
      type: String,
      required: [true, "lastname is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
    },

    address: {
      type: String,
      required: [true, "address is required"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Contact", contactSchema);
