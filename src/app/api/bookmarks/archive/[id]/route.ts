import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { sendError, sendSuccess } from "@/lib/api/response";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return sendError("Unauthorized", 401);
    }

    const { id } = await context.params;

    const existing = await prisma.bookmark.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existing) {
      return sendError("Bookmark not found", 404);
    }

    const updated = await prisma.bookmark.update({
      where: { id },
      data: {
        isArchived: !existing.isArchived,
      },
    });

    revalidatePath("/archived");
    revalidatePath("/");

    return sendSuccess(updated);
  } catch (error) {
    console.error(error);
    return sendError("Failed to update bookmark", 500);
  }
}
