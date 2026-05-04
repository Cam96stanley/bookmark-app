import { prisma } from "@/lib/prisma";
import { createMetadata } from "@/lib/seo";
import BookmarkCard from "@/ui/components/BookmarkCard";
import SortButton from "@/ui/components/SortButton";

export const metadata = createMetadata({ title: "Home" });

export default async function Home() {
  const bookmarks = await prisma.bookmark.findMany({
    where: { isArchived: false },
  });

  return (
    <div className="flex flex-col px-4 py-10 md:px-8 md:py-9">
      <div className="flex items-center justify-between pb-5">
        <h1 className="text-preset-1">All Bookmarks</h1>
        <SortButton />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookmarks.map((bookmark) => (
          <BookmarkCard
            key={bookmark.id}
            id={bookmark.id}
            favicon={bookmark.favicon}
            title={bookmark.title}
            url={bookmark.url}
            description={bookmark.description}
            tags={bookmark.tags}
            views={bookmark.visitCount}
            lastViewedDate={bookmark.lastVisited}
            addedDate={bookmark.createdAt}
            isArchived={bookmark.isArchived}
          />
        ))}
      </div>
    </div>
  );
}
