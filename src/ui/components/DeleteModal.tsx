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
};

export default function ArchiveModal({
  open,
  onOpenChange,
}: ArchiveBookmarkDialogProps) {
  const handleDelete = () => {
    onOpenChange(false);
    toast.trash("Bookmark deleted.");
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
            <Button variant={"secondary"}>Cancel</Button>
          </DialogClose>
          <Button variant={"destructive"} onClick={handleDelete}>
            Delete Permanently
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
