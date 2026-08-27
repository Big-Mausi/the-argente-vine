import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export async function createEmployee(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  department: string;
  basicSalary: number;
}) {
  return prisma.employee.create({
    data,
  });
}

export async function getEmployees() {
  return prisma.employee.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getEmployeeById(id: number) {
  return prisma.employee.findUnique({
    where: {
      id,
    },
  });
}

export async function updateEmployee(
  id: number,
  data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    jobTitle?: string;
    department?: string;
    basicSalary?: number;
    isActive?: boolean;
  },
) {
  return prisma.employee.update({
    where: {
      id,
    },
    data,
  });
}

export async function deactivateEmployee(id: number) {
  return prisma.employee.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}
