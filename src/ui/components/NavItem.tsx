import Link from "next/link";
import type React from "react";
import { cn } from "@/lib/utils";

type NavItemProps = {
  icon: React.ReactElement;
  label: string;
  link: string;
  isActive?: boolean;
  onClick: () => void;
};

export default function NavItem({
  icon,
  label,
  link,
  isActive,
  onClick,
}: NavItemProps) {
  return (
    <Link
      className={cn(
        "bg-inherit text-preset-3 hover:bg-background flex items-center gap-2 rounded-sm px-3 py-2",
        isActive && "bg-background",
      )}
      onClick={onClick}
      href={link}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
