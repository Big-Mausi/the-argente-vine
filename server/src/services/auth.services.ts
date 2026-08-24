import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export async function createSession(adminId: number) {
  const sessionId = randomBytes(32).toString("hex");

  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  const session = await prisma.session.create({
    data: {
      id: sessionId,
      adminId,
      expiresAt,
    },
  });

  return session;
}
