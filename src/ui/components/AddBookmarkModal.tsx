"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { useTags } from "@/context/TagContext";
import { toast } from "@/lib/toast";
import { createBookmarkSchema } from "@/lib/validators/bookmark";
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

type AddBookmarkDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const getValidUrl = (value: string) => {
  try {
    const normalized = value.startsWith("http") ? value : `https://${value}`;

    return new URL(normalized);
  } catch {
    return null;
  }
};

export default function AddBookmarkModal({
  open,
  onOpenChange,
}: AddBookmarkDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");
  const [favicon, setFavicon] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const { refreshTags } = useTags();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

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

  const handleAdd = async () => {
    const parsed = createBookmarkSchema.safeParse({
      title,
      description,
      url,
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

    setErrors({});
    setLoading(true);

    try {
      const response = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error ?? "Failed to add bookmark.");
        return;
      }

      onOpenChange(false);
      refreshTags();
      toast.success("Bookmark added successfully.");

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
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
          <DialogTitle className="text-preset-1">Add Bookmark</DialogTitle>
        </DialogHeader>

        <label className="text-preset-4" htmlFor="title">
          Title *
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Shadcn Docs"
        />
        {errors.title && <p className="text-red-500">{errors.title}</p>}

        <label className="text-preset-4" htmlFor="description">
          Description *
        </label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A set of beautifully designed components..."
        />
        {errors.description && (
          <p className="text-red-500">{errors.description}</p>
        )}

        <label className="text-preset-4" htmlFor="url">
          Website URL *
        </label>
        <Input
          id="url"
          value={url}
          onChange={handleUrlChange}
          placeholder="https://ui.shadcn.com"
        />
        {errors.url && <p className="text-red-500">{errors.url}</p>}

        {favicon && (
          <div className="flex items-center gap-2">
            <Image
              src={favicon}
              alt="Favicon preview"
              width={44}
              height={44}
              className="rounded-sm border"
            />
            <p className="text-muted-foreground">Favicon preview</p>
          </div>
        )}

        <label className="text-preset-4" htmlFor="tags">
          Tags *
        </label>
        <Input
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="UI, CSS, Components"
        />
        {errors.tags && <p className="text-red-500">{errors.tags}</p>}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>

          <Button onClick={handleAdd} disabled={loading}>
            {loading ? "Adding..." : "Add Bookmark"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
