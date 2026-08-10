import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "#backend/env";
import { PrismaClient } from "#backend/generated/prisma/client";

export { PrismaClient } from "#backend/generated/prisma/client";

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined;
};

type PoolConfig = ConstructorParameters<typeof PrismaPg | typeof PrismaNeon>[0];

const adapterConfig = {
    connectionString: env.DATABASE_URL,
} satisfies PoolConfig;

const adapter =
    env.NODE_ENV === "development"
        ? new PrismaPg(adapterConfig)
        : new PrismaNeon(adapterConfig);

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log:
            env.NODE_ENV === "development"
                ? ["query", "warn", "error"]
                : ["error"],
        adapter,
    });

// NOTE: https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
if (env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
