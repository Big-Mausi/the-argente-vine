import type { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

import {
  uploadMediaToCloudinary,
  deleteMediaFromCloudinary,
} from "../services/media.service.js";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export const getMenuItems = async (_req: Request, res: Response) => {
  try {
    const menuItems = await prisma.menuItem.findMany({
      orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    });

    return res.status(200).json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);

    return res.status(500).json({
      message: "Unable to fetch menu items.",
    });
  }
};

export const createMenuItem = async (req: Request, res: Response) => {
  let uploadedMedia: Awaited<
    ReturnType<typeof uploadMediaToCloudinary>
  > | null = null;

  try {
    const { name, description, price, alt, category } = req.body;

    if (
      !name?.trim() ||
      !description?.trim() ||
      price === undefined ||
      !alt?.trim() ||
      !category?.trim()
    ) {
      return res.status(400).json({
        message: "All menu item fields are required.",
      });
    }

    const numericPrice = Number(price);

    if (!Number.isFinite(numericPrice) || numericPrice < 0) {
      return res.status(400).json({
        message: "Please provide a valid menu item price.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Please select an image or video for this menu item.",
      });
    }

    uploadedMedia = await uploadMediaToCloudinary(req.file);

    const menuItem = await prisma.menuItem.create({
      data: {
        name: name.trim(),
        description: description.trim(),
        price: numericPrice,
        mediaUrl: uploadedMedia.url,
        mediaPublicId: uploadedMedia.publicId,
        mediaType: uploadedMedia.resourceType === "video" ? "VIDEO" : "IMAGE",
        alt: alt.trim(),
        category: category.trim(),
      },
    });

    return res.status(201).json(menuItem);
  } catch (error) {
    console.error("Error creating menu item:", error);

    // Remove the Cloudinary file if saving the menu item failed.
    if (uploadedMedia) {
      try {
        await deleteMediaFromCloudinary(
          uploadedMedia.publicId,
          uploadedMedia.resourceType,
        );
      } catch (cleanupError) {
        console.error("Unable to clean up uploaded media:", cleanupError);
      }
    }

    return res.status(500).json({
      message: "Unable to create menu item.",
    });
  }
};

export const updateMenuItem = async (req: Request, res: Response) => {
  let uploadedMedia: Awaited<
    ReturnType<typeof uploadMediaToCloudinary>
  > | null = null;

  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid menu item ID.",
      });
    }

    const existingItem = await prisma.menuItem.findUnique({
      where: { id },
    });

    if (!existingItem) {
      return res.status(404).json({
        message: "Menu item not found.",
      });
    }

    const { name, description, price, alt, category } = req.body;

    const data: {
      name?: string;
      description?: string;
      price?: number;
      alt?: string;
      category?: string;
      mediaUrl?: string;
      mediaPublicId?: string;
      mediaType?: "IMAGE" | "VIDEO";
    } = {};

    if (name !== undefined) data.name = name.trim();
    if (description !== undefined) data.description = description.trim();
    if (alt !== undefined) data.alt = alt.trim();
    if (category !== undefined) data.category = category.trim();

    if (price !== undefined) {
      const numericPrice = Number(price);

      if (!Number.isFinite(numericPrice) || numericPrice < 0) {
        return res.status(400).json({
          message: "Please provide a valid menu item price.",
        });
      }

      data.price = numericPrice;
    }

    // Upload replacement media only when a new file was selected.
    if (req.file) {
      uploadedMedia = await uploadMediaToCloudinary(req.file);

      data.mediaUrl = uploadedMedia.url;
      data.mediaPublicId = uploadedMedia.publicId;
      data.mediaType =
        uploadedMedia.resourceType === "video" ? "VIDEO" : "IMAGE";
    }

    const updatedItem = await prisma.menuItem.update({
      where: { id },
      data,
    });

    // Delete the previous Cloudinary file only after the update succeeds.
    if (uploadedMedia && existingItem.mediaPublicId) {
      try {
        await deleteMediaFromCloudinary(
          existingItem.mediaPublicId,
          existingItem.mediaType === "VIDEO" ? "video" : "image",
        );
      } catch (cleanupError) {
        console.error("Unable to delete previous menu media:", cleanupError);
      }
    }

    return res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Error updating menu item:", error);

    // If the database update failed, clean up the newly uploaded file.
    if (uploadedMedia) {
      try {
        await deleteMediaFromCloudinary(
          uploadedMedia.publicId,
          uploadedMedia.resourceType,
        );
      } catch (cleanupError) {
        console.error("Unable to clean up replacement media:", cleanupError);
      }
    }

    return res.status(500).json({
      message: "Unable to update menu item.",
    });
  }
};

export const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid menu item ID.",
      });
    }

    const existingItem = await prisma.menuItem.findUnique({
      where: { id },
    });

    if (!existingItem) {
      return res.status(404).json({
        message: "Menu item not found.",
      });
    }

    await prisma.menuItem.delete({
      where: { id },
    });

    // The database record is deleted; now remove its Cloudinary media.
    if (existingItem.mediaPublicId) {
      try {
        await deleteMediaFromCloudinary(
          existingItem.mediaPublicId,
          existingItem.mediaType === "VIDEO" ? "video" : "image",
        );
      } catch (cleanupError) {
        console.error(
          "Unable to delete menu media from Cloudinary:",
          cleanupError,
        );
      }
    }

    return res.status(200).json({
      message: "Menu item deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting menu item:", error);

    return res.status(500).json({
      message: "Unable to delete menu item.",
    });
  }
};
