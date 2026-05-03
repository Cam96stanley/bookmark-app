"use client";

import { ArrowsDownUpIcon } from "@phosphor-icons/react/ssr";
import { useEffect, useRef, useState } from "react";
import { Button } from "../primitives/Button";
import Dropdown from "./Dropdown";

const sortOptions = [
  { id: 1, label: "Recently added" },
  { id: 2, label: "Recently visited" },
  { id: 3, label: "Most visitied" },
];

export default function SortButton() {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <Button
        variant={"secondary"}
        size={"sm"}
        onClick={() => setOpen((prev) => !prev)}
      >
        <ArrowsDownUpIcon />
        <span className="text-preset-3">Sort by</span>
      </Button>
      {open && (
        <div className="absolute right-0 top-full mt-1 z-10 overflow-hidden rounded-sm shadow-md">
          <Dropdown
            items={sortOptions}
            activeItem={activeItem}
            onSelect={(item) => {
              setActiveItem(item);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
