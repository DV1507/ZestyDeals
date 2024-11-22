import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient();

export async function checkDatabaseConnection() {
  try {
    await prismaClient.$connect();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error);
  } finally {
    await prismaClient.$disconnect();
  }
}
