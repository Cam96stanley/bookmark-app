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

type ArchiveBookmarkDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isArchived: boolean;
  id: string;
};

export default function ArchiveModal({
  open,
  onOpenChange,
  isArchived,
  id,
}: ArchiveBookmarkDialogProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleArchive = async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/bookmarks/archive/${id}`, {
        method: "PATCH",
      });

      if (!res.ok) {
        toast.error("Failed to update bookmark");
        return;
      }

      onOpenChange(false);

      toast.success(isArchived ? "Bookmark unarchived" : "Bookmark archived");

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
          <DialogTitle className="text-preset-1">
            {isArchived ? "Unarchive Bookmark" : "Archive Bookmark"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-preset-4-md">
          Are you sure you want to {isArchived ? "unarchive" : "archive"} this
          bookmark?
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"} disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleArchive} disabled={loading}>
            {loading ? "Updating..." : isArchived ? "Unarchive" : "Archive"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
