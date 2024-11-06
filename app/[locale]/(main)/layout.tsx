import { ReactNode } from "react";
import Header from "./components/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <section className="w-full">
        <Header />
        {children}
      </section>
    </SidebarProvider>
  );
};

export default MainLayout;
