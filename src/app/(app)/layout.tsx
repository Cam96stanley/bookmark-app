import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { TagsProvider } from "@/context/TagContext";
import { SidebarProvider } from "@/context/SidebarContext";
import Header from "@/ui/components/Header";
import SideNav from "@/ui/components/SideNav";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  const bookmarks = session?.user?.id
    ? await prisma.bookmark.findMany({
        where: { userId: session.user.id },
        select: { tags: true },
      })
    : [];

  const tagCounts = bookmarks
    .flatMap((b) => b.tags)
    .reduce((acc, tag) => {
      acc[tag] = (acc[tag] ?? 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const initialTags = Object.entries(tagCounts).map(([label, total]) => ({
    label,
    total,
  }));

  return (
    <TagsProvider initialTags={initialTags}>
      <SidebarProvider>
        <div className="flex h-screen overflow-hidden">
          <SideNav />
          <div className="flex flex-col flex-1 min-w-0 overflow-y-auto">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </TagsProvider>
  );
}