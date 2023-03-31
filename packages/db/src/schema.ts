import {
    // index,
    mysqlTableCreator,
    text,
    timestamp,
    varchar,
} from "drizzle-orm/mysql-core";

export const TABLE_PREFIX = "Ptat_";

const mysqlTable = mysqlTableCreator((name) => `${TABLE_PREFIX}${name}`);

export const example = mysqlTable(
    "Example",
    {
        id: varchar("id", { length: 24 }).primaryKey().notNull(),
        title: text("title").notNull(),
        created_at: timestamp("created_at").notNull().defaultNow(),
        updated_at: timestamp("updated_at")
            .notNull()
            .defaultNow()
            .onUpdateNow(),
    },
    // (post) => ({
    //     userIdIndex: index("example__user_id__idx").on(post.user_id),
    // }),
);
