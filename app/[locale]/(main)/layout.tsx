import { ReactNode } from "react";
import Sidebar from "./components/sidebar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full">
      <div className="h-screen w-1/6">
        <Sidebar />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default MainLayout;
