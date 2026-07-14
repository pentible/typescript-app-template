import { PrismaClient } from "@prisma/client";
import { env } from "#src/env";

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log:
            env.NODE_ENV === "development"
                ? ["query", "error", "warn"]
                : ["error"],
    });

// NOTE: https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
if (env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
