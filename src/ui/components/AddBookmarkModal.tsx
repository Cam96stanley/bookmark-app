import { toast } from "@/lib/toast";
import { Button } from "../primitives/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../primitives/Dialog";
import { Input } from "../primitives/Input";
import { Textarea } from "../primitives/Textarea";
import ImageUpload from "./ImageUpload";

type AddBookmarkDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AddBookmarkModal({
  open,
  onOpenChange,
}: AddBookmarkDialogProps) {
  const handleAdd = () => {
    onOpenChange(false);
    toast.success("Bookmark added successfully.");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="overflow-y-auto max-h-[90svh] md:max-h-full"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-preset-1">Edit Bookmark</DialogTitle>
        </DialogHeader>
        <label htmlFor="">
          Title <span className="text-red-500">*</span>
        </label>
        <Input />
        <label htmlFor="">
          Description <span className="text-red-500">*</span>
        </label>
        <Textarea />
        <label htmlFor="">
          Website URL <span className="text-red-500">*</span>
        </label>
        <Input />
        <label htmlFor="">
          Tags <span className="text-red-500">*</span>
        </label>
        <Input />
        <label htmlFor="">
          Upload Image <span className="text-red-500">*</span>
        </label>
        <ImageUpload />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleAdd}>Add Bookmark</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
