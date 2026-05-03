import type { Metadata } from "next";

type SeoProps = {
  title: string;
  description?: string;
};

const baseTitle = "Bookmark Manager";
const baseDescription =
  "Manage your web bookmarks in one place. Add, edit, archive, and filter bookmarks by tags, title, and more.";

export function createMetadata({ title, description }: SeoProps): Metadata {
  return {
    title: `${baseTitle} | ${title}`,
    description: description ?? baseDescription,
  };
}
