import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Dummy URL for prisma generate when DATABASE_URL is not set; real URL used at runtime
    url: process.env.DATABASE_URL ?? "postgresql://localhost:5432/dummy",
  },
});
