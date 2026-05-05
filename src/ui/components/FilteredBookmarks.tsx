"use client";

import { useFilter } from "@/context/FilterContext";
import { useSort } from "@/context/SortContext";
import BookmarkCard from "./BookmarkCard";
import Fuse from "fuse.js";
import { useSearch } from "@/context/SearchContext";

type Bookmark = {
  id: string;
  favicon: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  visitCount: number;
  lastVisited: Date | null;
  createdAt: Date;
  isArchived: boolean;
};

export default function FilteredBookmarks({
  bookmarks,
}: {
  bookmarks: Bookmark[];
}) {
  const { selectedTags } = useFilter();
  const { sort } = useSort();
  const { query } = useSearch();

  const fuse = new Fuse(bookmarks, {
    keys: ["title", "description", "url", "tags"],
    threshold: 0.3,
  });

  const searched = query ? fuse.search(query).map((r) => r.item) : bookmarks;

  const filtered =
    selectedTags.length === 0
      ? searched
      : searched.filter((b) =>
          selectedTags.every((tag) => b.tags.includes(tag)),
        );

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "recently-added") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sort === "recently-visited") {
      const aDate = a.lastVisited ? new Date(a.lastVisited).getTime() : 0;
      const bDate = b.lastVisited ? new Date(b.lastVisited).getTime() : 0;
      return bDate - aDate;
    }
    if (sort === "most-visited") {
      return b.visitCount - a.visitCount;
    }
    return 0;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {sorted.map((bookmark) => (
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
  );
}
