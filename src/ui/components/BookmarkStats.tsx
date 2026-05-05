"use client";

import { CalendarBlankIcon, ClockIcon, EyeIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/formatDate";

type Props = {
  id: string;
  initialViews: number;
  initialLastViewedDate: Date | null;
  addedDate: Date;
};

export default function BookmarkStats({
  id,
  initialViews,
  initialLastViewedDate,
  addedDate,
}: Props) {
  const [views, setViews] = useState(initialViews ?? 0);
  const [lastViewedDate, setLastViewedDate] = useState<Date | null>(
    initialLastViewedDate ?? null,
  );

  useEffect(() => {
    const handler = (e: Event) => {
      const { bookmarkId, visitCount, lastVisited } = (e as CustomEvent).detail;
      console.log("event received", { bookmarkId, visitCount, lastVisited });
      console.log("this card id:", id);
      if (bookmarkId === id) {
        console.log("match! updating to:", visitCount);
        setViews(visitCount);
        if (lastVisited) setLastViewedDate(new Date(lastVisited));
      }
    };

    window.addEventListener("bookmark:visited", handler);
    return () => window.removeEventListener("bookmark:visited", handler);
  }, [id]);

  return (
    <div className="border-t flex gap-4 py-4 px-4">
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
  );
}
