import { auth } from "@/auth";
import { sendError, sendSuccess } from "@/lib/api/response";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return sendError("Unauthorized", 401);
    }

    const { id } = await context.params;

    const result = await prisma.bookmark.deleteMany({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (result.count === 0) {
      return sendError("Bookmark not found", 404);
    }

    return sendSuccess("Bookmark deleted.");
  } catch (error) {
    console.error(error);
    return sendError("Failed to update bookmark", 500);
  }
}
