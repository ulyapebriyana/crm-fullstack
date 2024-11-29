"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useState } from "react";
// import OnlineStoreSessionChart from "./online-store-session-chart";
import ConversionRateChart from "./conversion-rate-chart";
import TotalOrderChart from "./total-order-chart";
import TotalSalesChart from "./total-sales-chart";
import { Icon } from "@iconify-icon/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Check, ChevronsUpDown } from "lucide-react";
import { formatCurrency } from "@/helpers/format-currency";

const formatPercentage = (value: number): string => {
  return `${value}%`;
};

const HomeCharts = () => {
  const [activeOptionId, setActiveOptionId] = useState(2);

  const storeOptions = [
    // {
    //   id: 1,
    //   icon: "bx:store",
    //   name: "Online store session",
    //   numberHeader: 239,
    //   type: "number",
    //   components: <OnlineStoreSessionChart />,
    // },
    {
      id: 2,
      icon: "hugeicons:coins-01",
      name: "Total sales",
      numberHeader: 23000,
      type: "currency",
      components: <TotalSalesChart />,
    },
    {
      id: 3,
      icon: "f7:cube-box",
      name: "Total orders",
      numberHeader: 239,
      type: "number",
      components: <TotalOrderChart />,
    },
    {
      id: 4,
      icon: "gravity-ui:seal-percent",
      name: "Conversion rate",
      numberHeader: 64,
      type: "percent",
      components: <ConversionRateChart />,
    },
  ];

  const activeOption = storeOptions.find(
    (option) => option.id === activeOptionId,
  );

  return (
    <Card>
      <CardHeader>
        {/* Grid for screens medium and above */}
        <ul className="hidden grid-cols-3 gap-4 lg:grid">
          {storeOptions.map((data) => (
            <li
              key={data.id}
              onClick={() => setActiveOptionId(data.id)}
              className={`cursor-pointer rounded-lg p-4 ${
                activeOptionId === data.id ? "bg-secondary text-primary" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon icon={data.icon} />
                <span>{data.name}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {data.type === "currency"
                  ? formatCurrency(data.numberHeader)
                  : data.type === "percent"
                    ? formatPercentage(data.numberHeader)
                    : data.numberHeader}
              </h3>
            </li>
          ))}
        </ul>

        {/* Single option for screens below medium */}
        <div className="block lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
                  <Icon
                    icon={
                      storeOptions.find((value) => value.id === activeOptionId)
                        ?.icon as string
                    }
                  />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">
                    {
                      storeOptions.find((value) => value.id === activeOptionId)
                        ?.name
                    }
                  </span>
                  <span className="">
                    {storeOptions.find((value) => value.id === activeOptionId)
                      ?.type === "currency"
                      ? formatCurrency(
                          storeOptions.find(
                            (value) => value.id === activeOptionId,
                          )?.numberHeader as number,
                        )
                      : storeOptions.find(
                            (value) => value.id === activeOptionId,
                          )?.type === "percent"
                        ? formatPercentage(
                            storeOptions.find(
                              (value) => value.id === activeOptionId,
                            )?.numberHeader as number,
                          )
                        : storeOptions.find(
                            (value) => value.id === activeOptionId,
                          )?.numberHeader}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width]"
              align="start"
            >
              {storeOptions.map((data) => (
                <DropdownMenuItem
                  key={data.id}
                  onSelect={() => setActiveOptionId(data.id)}
                >
                  {data.name}{" "}
                  {data.id === activeOptionId && <Check className="ml-auto" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>{activeOption && activeOption.components}</CardContent>
    </Card>
  );
};

export default HomeCharts;
