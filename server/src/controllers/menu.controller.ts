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
