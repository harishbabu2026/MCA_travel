const packageModel = require("../model/packageModel");
const slugify = require("slugify");
const createPackageContorller = async (req, res) => {
  try {
    const { name, offer } = req.body;
    if (!name) {
      return res.status(401).send({ message: "name is required" });
    }
    if (!offer) {
      return res.status(401).send({ message: "offer is required" });
    }
    const existingPackage = await packageModel.findOne({ name });
    if (existingPackage) {
      return res.status(200).send({
        success: true,
        message: "already existed package",
      });
    }
    const package = await new packageModel({
      name,
      slug: slugify(name),
      offer,
    }).save();
    res.status(201).send({
      success: true,
      message: "newcatagry created",
      package,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in catagory",
      error,
    });
  }
};

const getAllPackageContorller = async (req, res) => {
  try {
    const package = await packageModel.find({});
    res.status(200).send({
      success: true,
      message: "get all package succesfully",
      package,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error on getAllPackage",
      error,
    });
  }
};

const getPackageContorller = async (req, res) => {
  try {
    const { id } = req.params;
    const package = await packageModel.findById(id);
    res.status(200).send({
      success: true,
      message: "get single package succesfully",
      package,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error on singlepackage",
      error,
    });
  }
};

const updatePackageContorller = async (req, res) => {
  try {
    const { name, offer } = req.body;
    const { id } = req.params;
    const package = await packageModel.findByIdAndUpdate(
      id,
      {
        name,
        offer,
        slug: slugify(name),
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "package updated succesfully",
      package,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error on updatepackage",
      error,
    });
  }
};
const deletePackageContorller = async (req, res) => {
  try {
    const { id } = req.params;
    await packageModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "package deleted succesfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error on deleteCatagory",
      error,
    });
  }
};

module.exports = {
  createPackageContorller,
  getAllPackageContorller,
  getPackageContorller,
  deletePackageContorller,
  updatePackageContorller,
};
