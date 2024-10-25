import multer from "multer";
import { storage } from "../utils/uploads";
import { Request } from "express";

export const upload = multer({
  storage,
  fileFilter: (req: Request, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type"));
    }
    cb(null, true);
  },
});
