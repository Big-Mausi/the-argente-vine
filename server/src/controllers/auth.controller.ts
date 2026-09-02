import type { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

import { createSession, verifyPassword } from "../services/auth.services.js";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

interface LoginRequestBody {
  email: string;
  password: string;
}

export const login = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response,
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const passwordIsValid = await verifyPassword(password, admin.passwordHash);

    if (!passwordIsValid) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const session = await createSession(admin.id);

    res.cookie("sessionId", session.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(200).json({
      message: "Login successful.",
    });
  } catch (error) {
    console.error("Error logging in:", error);

    return res.status(500).json({
      message: "Something went wrong while logging in.",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const sessionId = req.cookies.sessionId;

    if (sessionId) {
      await prisma.session
        .delete({
          where: { id: sessionId },
        })
        .catch(() => {
          // Session may already be expired or deleted.
        });
    }

    res.clearCookie("sessionId", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    return res.status(200).json({
      message: "Logout successful.",
    });
  } catch (error) {
    console.error("Error logging out:", error);

    return res.status(500).json({
      message: "Something went wrong while logging out.",
    });
  }
};

export const getCurrentAdmin = async (req: Request, res: Response) => {
  try {
    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
      return res.status(401).json({
        message: "Authentication required.",
      });
    }

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        admin: {
          select: {
            id: true,
            email: true,
          },
        },
      },
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

      res.clearCookie("sessionId", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
      });

      return res.status(401).json({
        message: "Session expired.",
      });
    }

    return res.status(200).json({
      admin: session.admin,
    });
  } catch (error) {
    console.error("Error checking authentication:", error);

    return res.status(500).json({
      message: "Something went wrong while checking authentication.",
    });
  }
};
