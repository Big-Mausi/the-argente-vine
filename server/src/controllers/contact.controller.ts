import type { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

interface ContactRequestBody {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const createContactMessage = async (
  req: Request<{}, {}, ContactRequestBody>,
  res: Response,
) => {
  try {
    const { name, email, subject, message } = req.body;

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    res.status(201).json({
      message: "Your message has been sent successfully.",
      data: contactMessage,
    });
  } catch (error) {
    console.error("Error creating contact message:", error);

    res.status(500).json({
      message: "Something went wrong while sending your message.",
    });
  }
};

export const getContactMessages = async (_req: Request, res: Response) => {
  try {
    const contactMessages = await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(contactMessages);
  } catch (error) {
    console.error("Error fetching contact messages:", error);

    res.status(500).json({
      message: "Unable to fetch contact messages.",
    });
  }
};

export const deleteContactMessage = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid message ID.",
      });
    }

    await prisma.contactMessage.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: "Contact message deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting contact message:", error);

    res.status(500).json({
      message: "Unable to delete contact message.",
    });
  }
};
