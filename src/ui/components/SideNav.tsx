"use client";

import { ArchiveIcon } from "@phosphor-icons/react";
import { HouseIcon, XIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import { useTags } from "@/context/TagContext";
import { cn } from "@/lib/utils";
import NavItem from "./NavItem";
import TagItem from "./TagItem";

const navItems = [
  {
    icon: <HouseIcon size={20} />,
    label: "Home",
    link: "/",
  },
  {
    icon: <ArchiveIcon size={20} />,
    label: "Archived",
    link: "/archived",
  },
];

export default function SideNav() {
  const pathname = usePathname();
  const { tags, isLoading, error } = useTags();
  const { open, toggleSidebar } = useSidebar();

  return (
    <div
      className={cn(
        "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:relative lg:inset-auto lg:bg-transparent lg:z-auto lg:opacity-100 lg:pointer-events-auto",
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none",
      )}
    >
      <div
        className={cn(
          "fixed top-0 left-0 border-r h-full w-[296px] bg-sidebar transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 lg:static lg:h-svh lg:z-auto flex flex-col",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-5">
          <Image src={"/logo-light-theme.svg"} alt="" width={214} height={32} />
          <button
            className="cursor-pointer lg:hidden"
            type="button"
            onClick={() => toggleSidebar()}
          >
            <XIcon size={20} />
          </button>
        </div>
        <div className="mt-1.25 px-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              link={item.link}
              isActive={pathname === item.link}
              onClick={toggleSidebar}
            />
          ))}
        </div>
        <div className="py-4 flex flex-col min-h-0 flex-1">
          <p className="uppercase text-[12px] font-bold !text-light-gray ml-7 mb-4 shrink-0">
            Tags
          </p>
          <div className="px-7 flex flex-col gap-4 overflow-y-auto">
            {isLoading && (
              <p className="text-light-gray text-preset-5">Loading...</p>
            )}
            {error && <p className="text-red-500 text-preset-5">{error}</p>}
            {(tags ?? []).map((tag) => (
              <TagItem key={tag.label} label={tag.label} total={tag.total} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
