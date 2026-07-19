import { Router } from "express";
import multer from "multer";
import { uploadDocuments } from "../controller/document.controller.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const temporaryDirectory = path.join(__dirname, "..", "..", "tmp");

if (!fs.existsSync(temporaryDirectory)) {
  fs.mkdirSync(temporaryDirectory, { recursive: true });
}

const upload = multer({
  dest: temporaryDirectory,

  limits: {
    files: 10,
    fileSize: 15 * 1024 * 1024,
  },

  fileFilter: (req, file, callback) => {
    const allowedMimeTypes = [
      "application/pdf",
      "application/json",
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return callback(
        new Error("Only PDF and JSON files are supported."),
      );
    }

    callback(null, true);
  },
});

router.post(
  "/upload",
  upload.array("documents", 10),
  uploadDocuments,
);

export default router;