import { createId } from "@paralleldrive/cuid2";
import { db, disconnect } from "./db";
import { example } from "./schema";

await db.insert(example).values({
    id: createId(),
    title: "seed me",
});

disconnect();
