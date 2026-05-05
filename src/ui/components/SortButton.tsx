"use client";

import { ArrowsDownUpIcon } from "@phosphor-icons/react/ssr";
import { useEffect, useRef, useState } from "react";
import { type SortOption, useSort } from "@/context/SortContext";
import { Button } from "../primitives/Button";
import Dropdown from "./Dropdown";

const sortOptions = [
  { id: 1, label: "Recently added", value: "recently-added" as SortOption },
  { id: 2, label: "Recently visited", value: "recently-visited" as SortOption },
  { id: 3, label: "Most visitied", value: "most-visited" as SortOption },
];

export default function SortButton() {
  const [open, setOpen] = useState(false);
  const { sort, setSort } = useSort();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside); // ← change mousedown to click
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const activeLabel = sortOptions.find((o) => o.value === sort)?.label ?? null;

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
            activeItem={activeLabel}
            onSelect={(label) => {
              if (!label) return;
              const option = sortOptions.find((o) => o.label === label);
              if (option) setSort(option.value);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
