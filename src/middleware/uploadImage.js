import multer from "multer";
import AppError from "../utils/AppError.js";

export const validExtension = {
  image: ["image/png", "image/jpg", "image/jpeg"],
  pdf: ["application/pdf"],
  video: ["video/mp4", "video/mkv"],
};

export const multerHost = (customValidation = ["image/png", "image/jpg", "image/jpeg"]) => {
  const storage = multer.diskStorage({});

  const fileFilter = function (req, file, cb) {
    if (customValidation.includes(file.mimetype)) {
      return cb(null, true);
    }
    cb(new AppError("file not supported", 400), false);
  };

  const upload = multer({ storage, fileFilter });
  return upload;
};
