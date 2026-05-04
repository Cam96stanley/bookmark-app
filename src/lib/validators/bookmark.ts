import z from "zod";

export const createBookmarkSchema = z.object({
  title: z.string().min(1, "Title is required"),
  favicon: z.url("Favicon must be a valid URL"),
  url: z.url("URL must be valid"),
  description: z.string().min(1, "Description is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  userId: z.string().min(1, "User ID is required"),
});

export const updateBookmarkSchema = createBookmarkSchema.partial().extend({
  isArchived: z.boolean().optional(),
});

export type CreateBookmarkInput = z.infer<typeof createBookmarkSchema>;
export type UpdateBookmarkInput = z.infer<typeof updateBookmarkSchema>;
