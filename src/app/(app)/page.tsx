import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { createMetadata } from "@/lib/seo";
import FilteredBookmarks from "@/ui/components/FilteredBookmarks";
import SortButton from "@/ui/components/SortButton";

export const metadata = createMetadata({ title: "Home" });

export default async function Home() {
  const session = await auth();

  const bookmarks = await prisma.bookmark.findMany({
    where: { isArchived: false, userId: session?.user?.id },
  });

  return (
    <div className="flex flex-col px-4 py-10 md:px-8 md:py-9">
      <div className="flex items-center justify-between pb-5">
        <h1 className="text-preset-1">All Bookmarks</h1>
        <SortButton />
      </div>
      <FilteredBookmarks bookmarks={bookmarks} />
    </div>
  );
}
