import { toast } from "@/lib/toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/primitives/Dialog";
import { Button } from "../primitives/Button";
import { Input } from "../primitives/Input";
import { Textarea } from "../primitives/Textarea";
import ImageUpload from "./ImageUpload";

type EditBookmarkDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  url: string;
  description: string;
  tags: string[];
  favicon: string;
};

export default function EditModal({
  open,
  onOpenChange,
  title,
  url,
  description,
  tags,
  favicon,
}: EditBookmarkDialogProps) {
  const handleEdit = () => {
    onOpenChange(false);
    toast.success("Changes saved.");
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
        <Input defaultValue={title} />
        <label htmlFor="">
          Description <span className="text-red-500">*</span>
        </label>
        <Textarea defaultValue={description} />
        <label htmlFor="">
          Website URL <span className="text-red-500">*</span>
        </label>
        <Input defaultValue={url} />
        <label htmlFor="">
          Tags <span className="text-red-500">*</span>
        </label>
        <Input defaultValue={tags.join(", ")} />
        <label htmlFor="">
          Image Upload <span className="text-red-500">*</span>
        </label>
        <ImageUpload defaultImage={favicon} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleEdit}>Save Bookmark</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
