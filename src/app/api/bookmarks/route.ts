import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { createBookmarkSchema } from "@/lib/validators/bookmark";
import { sendError, sendSuccess } from "../../../lib/api/response";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return sendError("Unauthorized", 401);
    }

    const body = await request.json();
    const parsed = createBookmarkSchema.safeParse(body);

    if (!parsed.success) {
      return sendError(
        "Validation failed",
        400,
        parsed.error.flatten().fieldErrors,
      );
    }
    const bookmark = await prisma.bookmark.create({
      data: {
        ...parsed.data,
        userId: session.user.id,
      },
    });

    revalidatePath("/");

    return sendSuccess(bookmark, 201);
  } catch (_error) {
    return sendError("Failed to create bookmark", 500);
  }
}
