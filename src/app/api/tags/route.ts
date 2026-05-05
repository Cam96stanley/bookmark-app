import { auth } from "@/auth";
import { sendError, sendSuccess } from "@/lib/api/response";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return sendError("Unauthorized", 401);
    }

    const tags = await prisma.bookmark.findMany({
      where: { userId: session.user.id },
      select: { tags: true },
    });

    const tagCounts = tags
      .flatMap((bookmark) => bookmark.tags)
      .reduce(
        (acc, tag) => {
          acc[tag] = (acc[tag] ?? 0) + 1;
          return acc;
        },
        {} as Record<string, string>,
      );

    const result = Object.entries(tagCounts).map(([label, total]) => ({
      label,
      total,
    }));
    return sendSuccess(result);
  } catch (_error) {
    return sendError("Failed to fetch tags", 500);
  }
}
