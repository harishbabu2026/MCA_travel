const tourDetailModel = require("../model/tourDetailModel");

const imageMultiController = async (req, res, next) => {
  try {
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
    const multi = new tourDetailModel({
      title: req.body.title,
      files: arrFile,
    });
    const multifilesUp = await multi.save();
    res.status(201).json({ message: "the file upload success", multifilesUp });
  } catch (error) {
    return next(error);
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

const getMultiFileUpload = async (req, res, next) => {
  try {
    const fileUploaded = await MultiFiles.find();
    res.status(200).json({ success: true, data: fileUploaded });
  } catch (error) {
    return next(error);
  }
};
module.exports = { imageMultiController, getMultiFileUpload };
