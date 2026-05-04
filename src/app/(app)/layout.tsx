import { SidebarProvider } from "@/context/SidebarContext";
import Header from "@/ui/components/Header";
import SideNav from "@/ui/components/SideNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <SideNav />
        <div className="flex flex-col flex-1 min-w-0 overflow-y-auto">
          <Header />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
