import multer from "multer";
import path from "path";
import { Request } from "express";
import fs from "fs";
import log from "./logger";

export const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    const dirname = path.join(__dirname, "..", `uploads/${file.fieldname}`);
    fs.mkdir(dirname, { recursive: true, mode: 0o755 }, (err) => {
      if (err) log.error(err);
      cb(null, dirname);
    });
  },

  filename: (req: Request, file: Express.Multer.File, cb) => {
    const extension = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extension);
    cb(null, `${basename}-${Date.now()}${extension}`);
  },
});
