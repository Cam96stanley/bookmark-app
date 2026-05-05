"use client";

import {
  ListIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@phosphor-icons/react/ssr";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useSidebar } from "@/context/SidebarContext";
import { Button } from "../primitives/Button";
import { Input } from "../primitives/Input";
import AddBookmarkModal from "./AddBookmarkModal";
import UserActionsButton from "./UserActionsButton";
import { useSearch } from "@/context/SearchContext";

export default function Header() {
  const { toggleSidebar } = useSidebar();
  const { query, setQuery } = useSearch();
  const [addOpen, setAddOpen] = useState(false);
  const { data: session } = useSession();

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
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
        <UserActionsButton
          name={session?.user?.name ?? ""}
          email={session?.user?.email ?? ""}
        />
      </div>

      <AddBookmarkModal open={addOpen} onOpenChange={setAddOpen} />
    </>
  );
}
