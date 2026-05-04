"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "@/lib/toast";
import { updateBookmarkSchema } from "@/lib/validators/bookmark";
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

type EditBookmarkDialogProps = {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  url: string;
  description: string;
  tags: string[];
  favicon: string;
};

const getValidUrl = (value: string) => {
  try {
    const normalized = value.startsWith("http") ? value : `https://${value}`;
    return new URL(normalized);
  } catch {
    return null;
  }
};

export default function EditModal({
  id,
  open,
  onOpenChange,
  title: initialTitle,
  url: initialUrl,
  description: initialDescription,
  tags: initialTags,
  favicon: initialFavicon,
}: EditBookmarkDialogProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialTitle);
  const [url, setUrl] = useState(initialUrl);
  const [description, setDescription] = useState(initialDescription);
  const [tags, setTags] = useState(initialTags.join(", "));
  const [favicon, setFavicon] = useState(initialFavicon);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // reset when opening different bookmark
  useEffect(() => {
    if (open) {
      setTitle(initialTitle);
      setUrl(initialUrl);
      setDescription(initialDescription);
      setTags(initialTags.join(", "));
      setFavicon(initialFavicon);
    }
  }, [
    open,
    initialTitle,
    initialUrl,
    initialDescription,
    initialTags,
    initialFavicon,
  ]);

  useEffect(() => {
    if (!url) {
      setFavicon("");
      return;
    }

    const timeout = setTimeout(() => {
      const parsed = getValidUrl(url);

      if (!parsed || !parsed.hostname.includes(".")) {
        setFavicon("");
        return;
      }

      setFavicon(`https://icons.duckduckgo.com/ip3/${parsed.hostname}.ico`);
    }, 400);

    return () => clearTimeout(timeout);
  }, [url]);

  const handleSave = async () => {
    const parsed = updateBookmarkSchema.safeParse({
      id,
      title,
      url,
      description,
      favicon,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;

      setErrors(
        Object.fromEntries(
          Object.entries(fieldErrors).map(([key, val]) => [
            key,
            val?.[0] ?? "",
          ]),
        ),
      );

      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/bookmarks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Failed to update bookmark");
        return;
      }

      toast.success("Bookmark updated.");
      onOpenChange(false);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="overflow-y-auto max-h-[90svh] md:max-h-full"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edit Bookmark</DialogTitle>
        </DialogHeader>

        <label htmlFor="title">Title *</label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="text-red-500">{errors.title}</p>}

        <label htmlFor="description">Description *</label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && (
          <p className="text-red-500">{errors.description}</p>
        )}

        <label htmlFor="url">Website URL *</label>
        <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} />
        {errors.url && <p className="text-red-500">{errors.url}</p>}

        {favicon && (
          <div className="flex items-center gap-2">
            <Image
              src={favicon}
              alt="favicon"
              width={44}
              height={44}
              className="rounded-sm border"
            />
            <p className="text-muted-foreground">Favicon preview</p>
          </div>
        )}

        <label htmlFor="tags">Tags *</label>
        <Input
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        {errors.tags && <p className="text-red-500">{errors.tags}</p>}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>

          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
