import { auth } from "@/auth";
import { sendError, sendSuccess } from "@/lib/api/response";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session?.user?.id) return sendError("Unauthorized", 401);

    const { id } = await params;

    const bookmark = await prisma.bookmark.update({
      where: { id, userId: session.user.id },
      data: {
        visitCount: { increment: 1 },
        lastVisited: new Date(),
      },
    });

    return sendSuccess(bookmark);
  } catch (error) {
    console.error("View update error:", error);
    return sendError("Failed to update view", 500);
  }
}
