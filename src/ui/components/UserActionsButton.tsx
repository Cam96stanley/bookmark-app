"use client";

import { PaletteIcon, SignOutIcon } from "@phosphor-icons/react";
import { DotsThreeVerticalIcon } from "@phosphor-icons/react";
import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../primitives/Button";

type UserActionsButtonProps = {
  name: string;
  email: string;
};

export default function UserActionsButton({
  name,
  email,
}: UserActionsButtonProps) {
  const [open, setOpen] = useState(false);
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
        size={"icon-md"}
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer"
      >
        <DotsThreeVerticalIcon />
      </Button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-10 bg-secondary border rounded-sm shadow-md w-[240px]">
          {/* User info */}
          <div className="flex items-center gap-3 p-4 border-b">
            <div>
              <p className="text-preset-4">{name}</p>
              <p className="text-preset-5 text-muted-foreground">{email}</p>
            </div>
          </div>

          {/* Theme toggle */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2">
              <PaletteIcon size={16} />
              <p className="text-preset-4">Theme</p>
            </div>
            {/* theme toggle placeholder */}
          </div>

          {/* Logout */}
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-3 w-full hover:bg-background cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <SignOutIcon size={16} />
            <p className="text-preset-4">Logout</p>
          </button>
        </div>
      )}
    </div>
  );
}
