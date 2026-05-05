import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../ui/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { FilterProvider } from "@/context/FilterContext";
import { SortProvider } from "@/context/SortContext";
import { cn } from "@/lib/utils";
import { SearchProvider } from "@/context/SearchContext";

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
          <FilterProvider>
            <SortProvider>
              <SearchProvider>
                <SessionProvider>{children}</SessionProvider>
              </SearchProvider>
            </SortProvider>
          </FilterProvider>
      </body>
    </html>
  );
}
