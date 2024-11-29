"use client";

import { Icon } from "@iconify-icon/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@prisma/client";
import { formatCurrency } from "@/helpers/format-currency";
import { Skeleton } from "@/components/ui/skeleton";

export function TopSellingProduct() {
  const { isLoading, data: topProducts } = useQuery({
    queryKey: ["topProduct"],
    queryFn: () => fetch("/api/products/top-seller").then((res) => res.json()),
  });

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
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <tr key={index}>
                    <td className="py-2">
                      <Skeleton className="h-[60px] w-[60px]" />
                    </td>
                    <td className="py-2 text-sm md:text-base">
                      <Skeleton className="h-[20px] w-[150px]" />
                    </td>
                    <td className="py-2 text-end text-sm font-bold md:text-base">
                      <Skeleton className="h-[20px] w-[100px]" />
                    </td>
                  </tr>
                ))
              : topProducts?.data?.map((product: Product) => (
                  <tr className="" key={product.id}>
                    <td className="py-2">
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        width={60}
                        height={60}
                        style={{ width: "auto", height: "auto" }}
                      />
                    </td>
                    <td className="py-2 text-sm md:text-base">
                      {product.title}
                    </td>
                    <td className="py-2 text-end text-sm font-bold md:text-base">
                      {formatCurrency(+product.price)}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
