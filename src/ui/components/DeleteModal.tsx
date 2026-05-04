"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "@/lib/toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/primitives/Dialog";
import { Button } from "../primitives/Button";

type DeleteBookmarkDialogProps = {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function DeleteModal({
  id,
  open,
  onOpenChange,
}: DeleteBookmarkDialogProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!id) {
      console.log("NO ID");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch(`/api/bookmarks/delete/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        toast.error("Failed to update bookmark");
        setLoading(false);
        return;
      }

      onOpenChange(false);

      toast.trash("Bookmark deleted.");

      router.refresh();
    } catch (_error) {
      toast.error("Somthing went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-preset-1">Delete Bookmark</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-preset-4-md">
          Are you sure you want to delete this bookmark?
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"} disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant={"destructive"}
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Permanently delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
