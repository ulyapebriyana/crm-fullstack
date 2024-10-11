import { ReactNode } from "react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full">
      <div className="sticky top-0 hidden h-screen w-1/6 md:block">
        <Sidebar />
      </div>
      <section className="w-full">
        <Header />
        {children}
      </section>
    </div>
  );
};

export default MainLayout;
