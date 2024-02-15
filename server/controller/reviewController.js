const reviewModel = require("../model/reviewModel");
const userModel = require("../model/userModel");

const createReviewController = async (req, res) => {
  try {
    const { name, review } = req.body;

    const reviews = await new reviewModel({
      name: name,
      review: review,
    }).save();
    res.status(200).json({
      success: true,
      message: "review updated successfully",
      reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error In Review",
      error,
    });
  }
};

const getReviewController = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find({})

      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,

      message: "AllReviews",
      reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error on creating reviewss",
      error,
    });
  }
};

module.exports = { createReviewController, getReviewController };
