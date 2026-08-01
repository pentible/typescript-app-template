import { PrismaClient } from "@prisma/client";
import { env } from "#src/env";

declare global {
    var prisma: PrismaClient | undefined;
}

export const prisma =
    global.prisma ??
    new PrismaClient({
        log:
            env.NODE_ENV === "development"
                ? ["query", "error", "warn"]
                : ["error"],
    });

// NOTE: https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
if (env.NODE_ENV !== "production") {
    global.prisma = prisma;
}
