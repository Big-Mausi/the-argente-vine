import type { Request, Response, NextFunction } from "express";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
      return res.status(401).json({
        message: "Authentication required.",
      });
    }

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }

    if (session.expiresAt < new Date()) {
      await prisma.session.delete({
        where: { id: sessionId },
      });

      return res.status(401).json({
        message: "Session expired.",
      });
    }

    next();
  } catch (error) {
    console.error("Authentication error:", error);

    return res.status(500).json({
      message: "Authentication check failed.",
    });
  }
};
