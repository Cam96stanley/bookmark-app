import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../ui/styles/globals.css";
import { Toaster } from "sonner";
import { SidebarProvider } from "@/context/SidebarContext";
import { cn } from "@/lib/utils";
import Header from "@/ui/components/Header";
import SideNav from "@/ui/components/SideNav";
import { SessionProvider } from "next-auth/react";

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
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
