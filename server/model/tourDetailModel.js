const mongoose = require("mongoose");

const detailSchema = mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    files: {
      required: true,
      type: [Object],
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Detail", detailSchema);
