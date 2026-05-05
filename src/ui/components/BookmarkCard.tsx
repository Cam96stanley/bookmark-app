import Image from "next/image";
import ActionsButton from "./ActionsButton";
import BookmarkStats from "./BookmarkStats";

type BookmarkCardProps = {
  id: string;
  favicon: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  views: number;
  lastViewedDate: Date | null;
  addedDate: Date;
  isArchived: boolean;
};

export default function BookmarkCard({
  favicon,
  title,
  url,
  description,
  tags,
  views,
  lastViewedDate,
  addedDate,
  isArchived,
  id,
}: BookmarkCardProps) {
  return (
    <div className="flex flex-col border rounded-sm bg-secondary px-4 pt-4">
      <div className="flex items-center gap-2 w-full border-b pb-4">
        <div className="border rounded-sm">
          <Image
            className="rounded-sm"
            src={favicon}
            alt={`${title} logo`}
            width={44}
            height={44}
          />
        </div>
        <div className="flex justify-between w-full">
          <div>
            <h2 className="text-preset-2">{title}</h2>
            <p className="text-preset-5">{url}</p>
          </div>
          <ActionsButton
            id={id}
            url={url}
            title={title}
            description={description}
            tags={tags}
            isArchived={isArchived}
            favicon={favicon}
            variant={isArchived ? "archived" : "active"}
          />
        </div>
      </div>
      <div className="py-4 flex flex-col flex-1">
        <p className="text-preset-4-md">{description}</p>
        <div className="flex gap-2 py-4">
          {tags.map((tag) => (
            <div key={tag} className="py-[2px] px-2 bg-background rounded-sm">
              <p className="text-preset-5">{tag}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="-mx-4">
        <BookmarkStats
          id={id}
          initialViews={views}
          initialLastViewedDate={lastViewedDate}
          addedDate={addedDate}
        />
      </div>
    </div>
  );
}
