import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../ui/styles/globals.css";
import { Toaster } from "sonner";
import { SidebarProvider } from "@/context/SidebarContext";
import { cn } from "@/lib/utils";
import Header from "@/ui/components/Header";
import SideNav from "@/ui/components/SideNav";

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
        <SidebarProvider>
          <div className="flex h-screen overflow-hidden">
            <SideNav />
            <div className="flex flex-col flex-1 min-w-0 overflow-y-auto">
              <Header />
              <main className="flex-1">{children}</main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster position="top-right" offset={100} />
      </body>
    </html>
  );
}
