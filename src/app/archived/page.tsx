import { bookmarks } from "@/data/data";
import BookmarkCard from "@/ui/components/BookmarkCard";
import SortButton from "@/ui/components/SortButton";

export default function ArchivePage() {
  return (
    <div className="flex flex-col px-4 py-10 md:px-8 md:py-9">
      <div className="flex items-center justify-between pb-5">
        <h1 className="text-preset-1">Archived Bookmarks</h1>
        <SortButton />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookmarks
          .filter((bookmark) => bookmark.isArchived)
          .map((bookmark) => (
            <BookmarkCard
              key={bookmark.url}
              favicon={bookmark.favicon}
              title={bookmark.title}
              url={bookmark.url}
              description={bookmark.description}
              isArchived={bookmark.isArchived}
              tags={bookmark.tags}
              views={bookmark.visitCount}
              lastViewedDate={bookmark.lastVisited}
              addedDate={bookmark.createdAt}
            />
          ))}
      </div>
    </div>
  );
}
