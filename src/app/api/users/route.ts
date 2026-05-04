import bcrypt from "bcryptjs";
import { sendError, sendSuccess } from "@/lib/api/response";
import { prisma } from "@/lib/prisma";
import { createUserSchema } from "@/lib/validators/user";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createUserSchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors: Record<string, string[]> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = [];
        fieldErrors[key].push(issue.message);
      }
      return sendError("Validation failed", 400, fieldErrors);
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });

    if (existingUser) {
      return sendError("Email already in use", 409);
    }

    const hashedPassword = await bcrypt.hash(parsed.data.password, 12);

    const user = await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        password: hashedPassword,
      },
    });

    return sendSuccess(
      { id: user.id, name: user.name, email: user.email },
      201,
    );
  } catch (_error) {
    return sendError("Failed to create user", 500);
  }
}
