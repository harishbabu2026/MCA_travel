const mongoose = require("mongoose");

const reviewModel = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    review: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewModel);
