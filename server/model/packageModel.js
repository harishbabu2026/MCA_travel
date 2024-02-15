const mongoose = require("mongoose");

const packageModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  offer: {
    type: String,
  },
});

module.exports = mongoose.model("Package", packageModel);
