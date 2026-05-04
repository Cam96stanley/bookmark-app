import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../ui/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { TagsProvider } from "@/context/TagContext";
import { cn } from "@/lib/utils";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bookmark Manager",
  description:
    "Manage your web bookmarks in one place. Add, edit, archive, and filter bookmarks by tags, title, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", manrope.variable)}>
      <body className="min-h-screen">
        <TagsProvider>
          <SessionProvider>{children}</SessionProvider>
        </TagsProvider>
      </body>
    </html>
  );
}
