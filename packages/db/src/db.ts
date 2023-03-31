import { connect } from "@planetscale/database";
import { drizzle as drizzleMysql2 } from "drizzle-orm/mysql2";
import { drizzle as drizzlePlanetscale } from "drizzle-orm/planetscale-serverless";
import { createConnection } from "mysql2";
import { env } from "./env";

function connectToDb() {
    if (process.env.NODE_ENV === "production") {
        const connection = connect({
            url: env.DATABASE_URL,
        });
        const db = drizzlePlanetscale(connection);

        return {
            db,
            disconnect() {
                // noop (there doesn't seem to be a way to disconnect, so presumably it's not required)
            },
        };
    } else {
        const connection = createConnection({
            uri: env.DATABASE_URL,
        });
        const db = drizzleMysql2(connection);

        return {
            db,
            disconnect() {
                connection.destroy();
            },
        };
    }
}

export const { db, disconnect } = connectToDb();
