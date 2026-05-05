"use client";

import {
  ArchiveIcon,
  ArrowSquareOutIcon,
  ClockCounterClockwiseIcon,
  CopyIcon,
  DotsThreeVerticalIcon,
  PencilSimpleIcon,
  PushPinSimpleIcon,
  TrashIcon,
} from "@phosphor-icons/react/ssr";
import { useEffect, useRef, useState } from "react";
import { toast } from "@/lib/toast";
import { Button } from "../primitives/Button";
import ArchiveModal from "./ArchiveModal";
import DeleteModal from "./DeleteModal";
import Dropdown, { type DropdownItem } from "./Dropdown";
import EditModal from "./EditModal";

type ActionsButtonProps = {
  id: string;
  url: string;
  title: string;
  description: string;
  tags: string[];
  isArchived: boolean;
  favicon: string;
  variant?: "active" | "archived";
};

export default function ActionsButton({
  id,
  url,
  title,
  description,
  tags,
  isArchived,
  favicon,
  variant = "active",
}: ActionsButtonProps) {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleVisit = async () => {
    try {
      setOpen(false);
      window.open(url);
      
      const res = await fetch(`/api/bookmarks/${id}/view`, { method: "PATCH" });
      const json = await res.json();
      console.log(json);
  
      window.dispatchEvent(
        new CustomEvent("bookmark:visited", {
          detail: {
            bookmarkId: id,
            visitCount: json.data.visitCount,
            lastVisited: json.data.lastVisited,
          }
        })
      )
    } catch (error) {
      console.error("Failed to update error", error);
    }
  };

  const activeActions: DropdownItem[] = [
    {
      id: 1,
      label: "Visit",
      iconLeft: <ArrowSquareOutIcon />,
      onClick: handleVisit,
    },
    {
      id: 2,
      label: "Copy URL",
      iconLeft: <CopyIcon />,
      onClick: () => {
        toast.copy("Link copied to clipboard.");
        navigator.clipboard.writeText(url);
      },
    },
    {
      id: 3,
      label: "Pin",
      iconLeft: <PushPinSimpleIcon />,
      onClick: () => toast.pin("Bookmark pinned to top."),
    },
    {
      id: 4,
      label: "Edit",
      iconLeft: <PencilSimpleIcon />,
      onClick: () => {
        setOpen(false);
        setEditOpen(true);
      },
    },
    {
      id: 5,
      label: "Archive",
      iconLeft: <ArchiveIcon />,
      onClick: () => {
        setOpen(false);
        setArchiveOpen(true);
      },
    },
  ];

  const archivedActions: DropdownItem[] = [
    {
      id: 1,
      label: "Visit",
      iconLeft: <ArrowSquareOutIcon />,
      onClick: handleVisit,
    },
    {
      id: 2,
      label: "Copy URL",
      iconLeft: <CopyIcon />,
      onClick: () => {
        toast.copy("Link copied to clipboard.");
        navigator.clipboard.writeText(url);
      },
    },
    {
      id: 3,
      label: "Unarchive",
      iconLeft: <ClockCounterClockwiseIcon />,
      onClick: () => setArchiveOpen(true),
    },
    {
      id: 4,
      label: "Delete Permanently",
      iconLeft: <TrashIcon />,
      onClick: () => setDeleteOpen(true),
    },
  ];

  const actions = variant === "archived" ? archivedActions : activeActions;

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
    <>
      <div className="relative" ref={ref}>
        <Button
          variant={"secondary"}
          size={"sm"}
          onClick={() => setOpen((prev) => !prev)}
        >
          <DotsThreeVerticalIcon />
        </Button>
        {open && (
          <div className="absolute right-0 top-full mt-1 z-10 overflow-hidden rounded-sm shadow-md">
            <Dropdown
              items={actions}
              activeItem={activeItem}
              onSelect={(item) => {
                setActiveItem(item);
                setOpen(false);
              }}
            />
          </div>
        )}
      </div>

      <EditModal
        id={id}
        url={url}
        title={title}
        description={description}
        tags={tags}
        open={editOpen}
        onOpenChange={setEditOpen}
        favicon={favicon}
      />

      <ArchiveModal
        id={id}
        open={archiveOpen}
        onOpenChange={setArchiveOpen}
        isArchived={isArchived}
      />

      <DeleteModal id={id} open={deleteOpen} onOpenChange={setDeleteOpen} />
    </>
  );
}
