import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Prisma 7 dùng driver adapter. Adapter pg kết nối trực tiếp tới PostgreSQL.
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

// Giữ một instance PrismaClient duy nhất qua các lần hot-reload ở môi trường dev,
// tránh cạn kết nối tới PostgreSQL.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
