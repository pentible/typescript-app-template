// eslint-disable-next-line import-x/no-unused-modules
import { createId } from "@paralleldrive/cuid2";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

try {
    // TODO: create any data we need to test
    await prisma.example.create({
        data: {
            id: createId(),
            title: "seed me",
        },
    });
} finally {
    void prisma.$disconnect();
}
