"use client";

import { Icon } from "@iconify-icon/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import NullImage from "@/assets/Analitycs/no-datafound.png";

export function SalesByChannel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div className="inline-flex items-center gap-2">
            <Icon
              icon={"fluent:channel-add-48-regular"}
              className="text-lg text-primary"
            />
            <span>Sales by channel</span>
          </div>
          <Button variant="ghost" size="icon">
            <DotsHorizontalIcon />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4 py-10">
          <Image
            src={NullImage}
            alt="no-data-found.png"
            height={120}
            width={120}
          />
          <div className="">No data found in this date range</div>
        </div>
      </CardContent>
    </Card>
  );
}
