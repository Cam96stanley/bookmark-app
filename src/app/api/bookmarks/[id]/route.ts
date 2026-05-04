import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { sendError, sendSuccess } from "@/lib/api/response";
import { prisma } from "@/lib/prisma";
import { updateBookmarkSchema } from "@/lib/validators/bookmark";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PATCH(req: Request, { params }: Context) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return sendError("Unauthorized", 401);
    }

    const { id } = await params;

    const body = await req.json();

    const parsed = updateBookmarkSchema.safeParse(body);

    if (!parsed.success) {
      return sendError(
        "Validation failed",
        400,
        parsed.error.flatten().fieldErrors,
      );
    }

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
      data: parsed.data,
    });

    revalidatePath("/");

    return sendSuccess(updated);
  } catch (error) {
    console.error(error);
    return sendError("Failed to update bookmark", 500);
  }
}
