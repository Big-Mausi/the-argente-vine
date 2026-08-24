import type { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export const getMenuItems = async (req: Request, res: Response) => {
  try {
    const menuItems = await prisma.menuItem.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res.status(200).json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);

    res.status(500).json({
      message: "Unable to fetch menu items.",
    });
  }
};

export const createMenuItem = async (req: Request, res: Response) => {
  try {
    const { name, description, price, image, alt, category } = req.body;

    if (
      !name ||
      !description ||
      price === undefined ||
      !image ||
      !alt ||
      !category
    ) {
      return res.status(400).json({
        message: "All menu item fields are required.",
      });
    }

    const menuItem = await prisma.menuItem.create({
      data: {
        name,
        description,
        price: Number(price),
        image,
        alt,
        category,
      },
    });

    return res.status(201).json(menuItem);
  } catch (error) {
    console.error("Error creating menu item:", error);

    return res.status(500).json({
      message: "Unable to create menu item.",
    });
  }
};

export const updateMenuItem = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid menu item ID.",
      });
    }

    const { name, description, price, image, alt, category } = req.body;

    const data: {
      name?: string;
      description?: string;
      price?: number;
      image?: string;
      alt?: string;
      category?: string;
    } = {};

    if (name !== undefined) data.name = name;
    if (description !== undefined) data.description = description;
    if (price !== undefined) data.price = Number(price);
    if (image !== undefined) data.image = image;
    if (alt !== undefined) data.alt = alt;
    if (category !== undefined) data.category = category;

    const menuItem = await prisma.menuItem.update({
      where: { id },
      data,
    });

    return res.status(200).json(menuItem);
  } catch (error) {
    console.error("Error updating menu item:", error);

    return res.status(500).json({
      message: "Unable to update menu item.",
    });
  }
};

export const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid menu item ID.",
      });
    }

    await prisma.menuItem.delete({
      where: { id },
    });

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
