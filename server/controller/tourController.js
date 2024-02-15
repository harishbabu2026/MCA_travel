const tourModel = require("../model/tourModel");
const slugify = require("slugify");
const fs = require("fs");
const path = require("path");
const tourDetailModel = require("../model/tourDetailModel");
// const creatTourController = async (req, res) => {
//   try {
//     const { name, slug, place, price } = req.fields;
//     // const { photo } = req.files;
//     const arrFile = [];
//     req.files.forEach((element) => {
//       const file = {
//         fileName: element.originalname,
//         fileType: element.mimetype,
//         filePath: element.path,
//         fileSize: getSizeFile(element.size, 2),
//       };
//       arrFile.push(file);
//     });
//     //validation
//     switch (true) {
//       case !name:
//         return res.status(500).send({ error: "name is required" });
//       //   case !slug:
//       //     return res.status(500).send({ error: "slug is required" });
//       case !package:
//         return res.status(500).send({ error: "package required" });
//       case !place:
//         return res.status(500).send({ error: "place required" });
//       case !places:
//         return res.status(500).send({ error: "places required" });

//       case !price:
//         return res.status(500).send({ error: "price is required" });
//       //   case !catagory:
//       //     return res.status(500).send({ error: "catagoryis required" });
//       //   case !quantity:
//       //     return res.status(500).send({ error: "quantityis required" });
//       // case photo && photo.size > 1000000:
//       //   return res
//       //     .status(500)
//       //     .send({ error: "photo is required less than 1mb" });
//     }

//     //const tour = new tourModel({ ...req.fields, slug: slugify(name) }, images);

//     const multi = new tourModel({
//       ...req.fields,
//       slug: slugify(name),
//       // name: req.body.name,
//       // // package: req.body.package,
//       // place: req.body.place,
//       // // places: req.body.places,
//       // price: req.body.price,
//       files: arrFile,
//     });

//     const multifilesUp = await multi.save();
//     res.status(201).json({ message: "the file upload success", multifilesUp });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "error on creating products",
//       error,
//     });
//     return next(error);
//   }
// };

// const getSizeFile = (bytes, decimals) => {
//   if (decimals === 0) return "0 Bytes";
//   const dm = decimals || 2;
//   const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
//   const index = Math.floor(Math.log(bytes) / Math.log(1000));
//   return (
//     parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + "-" + sizes[index]
//   );
// };
const creatTourController = async (req, res) => {
  try {
    const { name, place, price } = req.body; // Assuming form fields are sent in the request body
    const arrFile = [];
    req.files.forEach((element) => {
      const file = {
        fileName: element.originalname,
        fileType: element.mimetype,
        filePath: element.path,
        fileSize: getSizeFile(element.size, 2),
      };
      arrFile.push(file);
    });

    // Validation
    if (!name || !place || !price) {
      return res
        .status(400)
        .json({ error: "Name, place, and price are required" });
    }

    // Creating new tour document
    const newTour = new tourModel({
      name,
      place,
      price,
      files: arrFile,
      slug: slugify(name),
    });

    // Saving the tour to the database
    const savedTour = await newTour.save();

    res
      .status(201)
      .json({ message: "Tour created successfully", tour: savedTour });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getSizeFile = (bytes, decimals) => {
  if (decimals === 0) return "0 Bytes";
  const dm = decimals || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + "-" + sizes[index]
  );
};

const getAllTourController = async (req, res) => {
  try {
    const tour = await tourModel
      .find({})

      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countOfTour: tour.length,
      message: "AllTours",
      tour,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error on creating tour",
      error,
    });
  }
};

module.exports = { creatTourController, getAllTourController };
