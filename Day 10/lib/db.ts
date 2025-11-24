import { PrismaClient } from "@prisma/client";

// Extend the global object to include a prisma property
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// Initialize Prisma Client or use the existing global instance
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"], // Optional: configure logging
  });

// In development, store the instance globally to prevent re-initialization during hot-reloading
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
