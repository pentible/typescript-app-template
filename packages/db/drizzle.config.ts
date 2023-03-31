import type { Config } from "drizzle-kit";
import { TABLE_PREFIX } from "./src/schema";

if (!process.env.DATABASE_URL) {
    throw new Error("missing required env var: DATABASE_URL");
}

export default {
    schema: "./src/schema.ts",
    out: "./drizzle",
    driver: "mysql2",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL,
    },
    tablesFilter: `${TABLE_PREFIX}*`,
} satisfies Config;
