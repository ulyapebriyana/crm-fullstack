"use client";

import { Icon } from "@iconify-icon/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export function TopSellingProduct() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div className="inline-flex items-center gap-2">
            <Icon
              icon={"iconamoon:discount-light"}
              className="text-lg text-primary"
            />
            <span>Top sellling products</span>
          </div>
          <Button variant="ghost" size="icon">
            <DotsHorizontalIcon />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <table className="table-auto">
          <tbody>
            <tr className="mb-4">
              <td className="py-2">
                <Image
                  src={
                    "https://cdn.ulyadevelopment.site/8ac167e2-5214-47d7-a62b-9796f5413f57-2024-11-17"
                  }
                  alt="image.img"
                  width={60}
                  height={60}
                  style={{ width: "auto", height: "auto" }}
                />
              </td>
              <td className="py-2 text-sm md:text-base">Macbook pro M1</td>
              <td className="py-2 text-end text-sm font-bold md:text-base">
                Rp. 4.000.000
              </td>
            </tr>
            <tr className="mb-4">
              <td className="py-2">
                <Image
                  src={
                    "https://cdn.ulyadevelopment.site/8ac167e2-5214-47d7-a62b-9796f5413f57-2024-11-17"
                  }
                  alt="image.img"
                  width={60}
                  height={60}
                  style={{ width: "auto", height: "auto" }}
                />
              </td>
              <td className="py-2 text-sm md:text-base">Macbook pro M1</td>
              <td className="py-2 text-end text-sm font-bold md:text-base">
                Rp. 4.000.000
              </td>
            </tr>
            <tr className="">
              <td className="py-2">
                <Image
                  src={
                    "https://cdn.ulyadevelopment.site/8ac167e2-5214-47d7-a62b-9796f5413f57-2024-11-17"
                  }
                  alt="image.img"
                  width={60}
                  height={60}
                  style={{ width: "auto", height: "auto" }}
                />
              </td>
              <td className="py-2 text-sm md:text-base">Macbook pro M1</td>
              <td className="py-2 text-end text-sm font-bold md:text-base">
                Rp. 4.000.000
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
