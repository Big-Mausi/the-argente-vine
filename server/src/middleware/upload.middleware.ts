import multer from "multer";
import type { Request, Response, NextFunction } from "express";

const storage = multer.memoryStorage();

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // Maximum 50MB
    files: 1,
  },
  fileFilter: (_req, file, callback) => {
    if (!allowedTypes.includes(file.mimetype)) {
      return callback(
        new Error("Unsupported file type. Upload a supported image or video."),
      );
    }

    callback(null, true);
  },
});

export const uploadMedia = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  upload.single("media")(req, res, (error) => {
    if (error) {
      return next(error);
    }

    if (req.file) {
      const isImage = req.file.mimetype.startsWith("image/");
      const maxSize = isImage ? 10 * 1024 * 1024 : 100 * 1024 * 1024;

      if (req.file.size > maxSize) {
        return res.status(400).json({
          message: isImage
            ? "Image size must not exceed 10MB."
            : "Video size must not exceed 100MB.",
        });
      }
    }

    next();
  });
};
