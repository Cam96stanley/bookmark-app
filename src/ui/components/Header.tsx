"use client";

import {
  ListIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import { useState } from "react";
import { useSidebar } from "@/context/SidebarContext";
import { Button } from "../primitives/Button";
import { Input } from "../primitives/Input";
import AddBookmarkModal from "./AddBookmarkModal";

export default function Header() {
  const { toggleSidebar } = useSidebar();
  const [addOpen, setAddOpen] = useState(false);

  return (
    <>
      <div className="bg-secondary px-4 py-3 flex items-center gap-2.5 sticky top-0 z-50 right-0 border-b">
        <Button
          variant={"secondary"}
          size={"icon-md"}
          onClick={() => toggleSidebar()}
          className="lg:hidden"
        >
          <ListIcon size={20} />
        </Button>
        <Input
          type="search"
          placeholder="Search by title..."
          icon={<MagnifyingGlassIcon />}
          className="lg:w-[320px]"
        />
        <Button
          className="lg:hidden"
          size={"icon-md"}
          onClick={() => setAddOpen(true)}
        >
          <PlusIcon size={20} />
        </Button>
        <Button
          className="hidden lg:inline-flex"
          onClick={() => setAddOpen(true)}
        >
          <PlusIcon size={20} />
          Add Bookmarks
        </Button>
        <Image src={"/image-avatar.webp"} alt="" width={40} height={40} />
      </div>

      <AddBookmarkModal open={addOpen} onOpenChange={setAddOpen} />
    </>
  );
}
