"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavFooter } from "@/components/nav-footer";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  navFooter: {
    title: "Setting",
    url: "/settings",
    icon: "ph:gear",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "/home",
      icon: "tabler:smart-home",
    },
    {
      title: "Orders",
      url: "/orders",
      icon: "mdi:order-bool-ascending-variant",
    },
    {
      title: "Products",
      url: "/products",
      icon: "fluent-mdl2:product-variant",
    },
    {
      title: "Customers",
      url: "/customers",
      icon: "fluent:people-24-regular",
    },
    {
      title: "Finance",
      url: "/finance",
      icon: "material-symbols-light:finance",
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: "oui:vis-pie",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter items={data.navFooter} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
