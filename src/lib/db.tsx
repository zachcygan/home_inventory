import { PrismaClient } from "prisma-client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Use explicit sslmode=verify-full to silence pg v9 / pg-connection-string v3 warning
// and preserve current security behavior (prefer/require/verify-ca are treated as verify-full)
const normalizedUrl = connectionString.replace(
  /([?&])sslmode=(prefer|require|verify-ca)(&|$)/gi,
  "$1sslmode=verify-full$3"
);

const adapter = new PrismaPg({ connectionString: normalizedUrl });
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}