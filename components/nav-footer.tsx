"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, usePathname } from "@/i18n/routing";
import { Icon } from "@iconify-icon/react";

export function NavFooter({
  items,
}: {
  items: {
    url: string;
    title: string;
    icon: string;
  };
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isMobile } = useSidebar();
  const pathname = usePathname();
  const isActive = pathname.startsWith(items.url);
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          tooltip={items.title}
          isActive={isActive}
          asChild
        >
          <Link href={items.url}>
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarFallback className="rounded-lg">
                <Icon icon={items.icon} className="text-xl" />
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{items.title}</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
