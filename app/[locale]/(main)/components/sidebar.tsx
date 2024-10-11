"use client";

import { Icon } from "@iconify-icon/react";
import Image from "next/image";
import Logo from "@/assets/Login/Logo.png";
import { Link, usePathname } from "@/i18n/routing";

const menu = [
  {
    name: "Home",
    href: "/home",
    icon: "tabler:smart-home",
  },
  {
    name: "Orders",
    href: "/orders",
    icon: "mdi:order-bool-ascending-variant",
  },
  {
    name: "Products",
    href: "/products",
    icon: "fluent-mdl2:product-variant",
  },
  {
    name: "Customers",
    href: "/customers",
    icon: "fluent:people-24-regular",
  },
  {
    name: "Finance",
    href: "/finance",
    icon: "material-symbols-light:finance",
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: "lucide:chart-pie",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex h-screen flex-col bg-[#F9F9F9]">
      {/* Header Section */}
      <div className="flex h-[80px] items-center gap-3 p-5">
        <Image src={Logo} alt="logo" priority height={30} width={30} />
        <span className="text-2xl font-bold">Boxbox</span>
      </div>

      {/* Menu Section */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div className="flex flex-col space-y-2 overflow-y-auto">
          {menu.map((data, index) => {
            const isActive = pathname.startsWith(data.href);

            return (
              <Link
                href={data.href}
                className={`group flex cursor-pointer items-center gap-3 rounded-lg p-3 font-medium hover:bg-white hover:shadow-sm ${isActive ? "bg-white shadow-sm" : ""}`}
                key={index}
              >
                <Icon
                  icon={data.icon}
                  className={`text-xl ${isActive ? "text-primary" : "group-hover:text-primary"}`}
                />
                <div>{data.name}</div>
              </Link>
            );
          })}
        </div>

        {/* Footer Section (Settings) */}
        <Link
          href={"/settings"}
          className={`flex cursor-pointer items-center gap-3 p-3 font-medium hover:text-primary ${pathname.startsWith("/settings") ? "text-primary" : ""}`}
        >
          <Icon icon="lsicon:setting-outline" className="text-xl" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
