"use client";

import { Icon } from "@iconify-icon/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

export function OnlineStoreConversionRate() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div className="inline-flex items-center gap-2">
            <Icon
              icon={"iconamoon:discount-light"}
              className="text-lg text-primary"
            />
            <span>Online store conversion rate</span>
          </div>
          <Button variant="ghost" size="icon">
            <DotsHorizontalIcon />
          </Button>
        </CardTitle>
        <h3 className="text-2xl font-bold">$ 0.00</h3>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="">
            <h4 className="font-bold">Added to cart</h4>
            <p className="text-sm">0 Session</p>
          </div>
          <span>0%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="">
            <h4 className="font-bold">Reached checkout</h4>
            <p className="text-sm">0 Session</p>
          </div>
          <span>0%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="">
            <h4 className="font-bold">Sessions converted</h4>
            <p className="text-sm">0 Session</p>
          </div>
          <span>0%</span>
        </div>
      </CardContent>
    </Card>
  );
}
