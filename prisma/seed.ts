import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { bookmarks } from "../src/data/data";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL ?? "",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "seed@example.com" },
    update: {},
    create: {
      name: "Seed User",
      email: "seed@example.com",
    },
  });

  for (const bookmark of bookmarks) {
    await prisma.bookmark.upsert({
      where: { url: bookmark.url },
      update: {},
      create: {
        title: bookmark.title,
        favicon: bookmark.favicon,
        url: bookmark.url,
        description: bookmark.description,
        isArchived: bookmark.isArchived,
        visitCount: bookmark.visitCount,
        lastVisited: bookmark.lastVisited
          ? new Date(bookmark.lastVisited)
          : null,
        tags: bookmark.tags,
        userId: user.id,
      },
    });
  }
  console.log("Seeded successfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
