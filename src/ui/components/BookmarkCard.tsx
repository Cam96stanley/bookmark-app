import {
  CalendarBlankIcon,
  ClockIcon,
  EyeIcon,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import ActionsButton from "./ActionsButton";

type BookmarkCardProps = {
  favicon: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  views: number;
  lastViewedDate: string | null;
  addedDate: string;
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
}: BookmarkCardProps) {
  const formatDate = (date: string): string => {
    const newDate = new Date(date);
    const formatted = newDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
    return formatted;
  };

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
      <div className="border-t flex gap-4 py-4 -mx-4 px-4">
        <div className="flex items-center gap-1">
          <EyeIcon size={12} />
          <p className="text-preset-5">{views}</p>
        </div>
        <div className="flex items-center gap-1">
          <ClockIcon size={12} />
          <p className="text-preset-5">
            {lastViewedDate && formatDate(lastViewedDate)}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <CalendarBlankIcon size={12} />
          <p className="text-preset-5">{formatDate(addedDate)}</p>
        </div>
      </div>
    </div>
  );
}
