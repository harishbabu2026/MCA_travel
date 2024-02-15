const mongoose = require("mongoose");

const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    slug: {
      type: String,
      required: true,
    },
    // package: {
    //   type: mongoose.ObjectId,
    //   ref: "Package",
    // },
    place: {
      type: String,
      required: [true, "place is required"],
    },
    // places: {
    //   names: [String],
    // },
    files: {
      required: true,
      type: [Object],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tour", tourSchema);
