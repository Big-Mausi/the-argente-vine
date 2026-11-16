import cloudinary from "../config/cloudinary.js";
import type { UploadApiResponse, UploadApiOptions } from "cloudinary";

interface UploadedMedia {
  url: string;
  publicId: string;
  resourceType: "image" | "video";
}

export const uploadMediaToCloudinary = (
  file: Express.Multer.File,
): Promise<UploadedMedia> => {
  const resourceType = file.mimetype.startsWith("video/") ? "video" : "image";

  const uploadOptions: UploadApiOptions = {
    folder: "argente-vine/menu",
    resource_type: resourceType,
  };

  if (resourceType === "image") {
    uploadOptions.transformation = [{ quality: "auto", fetch_format: "auto" }];
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result?: UploadApiResponse) => {
        if (error || !result) {
          return reject(error || new Error("Media upload failed."));
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          resourceType,
        });
      },
    );

    uploadStream.end(file.buffer);
  });
};

export const deleteMediaFromCloudinary = async (
  publicId: string,
  resourceType: "image" | "video",
): Promise<void> => {
  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });

  if (result.result !== "ok" && result.result !== "not found") {
    throw new Error("Unable to delete media from Cloudinary.");
  }
};
