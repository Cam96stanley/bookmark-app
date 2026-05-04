"use client";

import Image from "next/image";
import type React from "react";
import { useState } from "react";
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

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);

    const result = createBookmarkSchema.shape.url.safeParse(value);
    if (result.success) {
      const hostname = new URL(value).hostname;
      setFavicon(`https://www.google.com/s2/favicons?domain=${hostname}&sz=64`);
    } else {
      setFavicon("");
    }
  };

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
      toast.success("Bookmark added successfully.");
    } catch (error) {
      console.error("Failed to add bookmark:", error);
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
        <label htmlFor="title">
          Title <span className="text-red-500">*</span>
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Shadcn Docs"
        />
        {errors.title && (
          <p className="text-red-500 text-preset-5">{errors.title}</p>
        )}
        <label htmlFor="description">
          Description <span className="text-red-500">*</span>
        </label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A set of beautifully designed components..."
        />
        {errors.description && (
          <p className="text-red-500 text-preset-5">{errors.description}</p>
        )}
        <label htmlFor="url">
          Website URL <span className="text-red-500">*</span>
        </label>
        <Input
          id="url"
          value={url}
          onChange={handleUrlChange}
          placeholder="https://ui.shadcn.com"
        />
        {errors.url && (
          <p className="text-red-500 text-preset-5">{errors.url}</p>
        )}
        {favicon && (
          <div className="flex items-center gap-2">
            <Image
              src={favicon}
              alt="Favicon preview"
              width={44}
              height={44}
              className="rounded-sm border"
            />
            <p className="text-preset-5 text-muted-foreground">
              Favicon preview
            </p>
          </div>
        )}
        <label htmlFor="tags">
          Tags <span className="text-red-500">*</span>
        </label>
        <Input
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="UI, CSS, Components"
        />
        {errors.tags && (
          <p className="text-red-500 text-preset-5">{errors.tags}</p>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleAdd} disabled={loading}>
            {loading ? "Adding..." : "Add Bookmark"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
