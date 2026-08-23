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
