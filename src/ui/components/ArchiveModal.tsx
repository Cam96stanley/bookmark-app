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
};

export default function ArchiveModal({
  open,
  onOpenChange,
  isArchived,
}: ArchiveBookmarkDialogProps) {
  const handleArchive = () => {
    onOpenChange(false);
    if (isArchived) {
      toast.archive("Bookmark Unarchived.");
    } else {
      toast.archive("Bookmark Archived");
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
          Are you sure you want to archive this bookmark?
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleArchive}>
            {isArchived ? "Unarchive" : "Archive"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
