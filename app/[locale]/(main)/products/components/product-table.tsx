"use client";

import SearchInput from "@/components/search";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ActionButtons from "./action-buttons";
import { Product } from "@prisma/client";
import { MetaData } from "@/helpers/response-data";
import PaginationServerSide from "@/components/pagination-server-side";
import { useState } from "react";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductTable = ({ data, meta }: { data: any; meta: MetaData }) => {
  const products: Product[] = data ? JSON.parse(data) : [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedFields, setSeletedFields] = useState([]);

  return (
    <div className="flex flex-col gap-4">
      <SearchInput />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16 text-center">
                <Checkbox />
              </TableHead>
              <TableHead className="min-w-10">Image</TableHead>
              <TableHead className="min-w-28">Product</TableHead>
              <TableHead className="max-w-10 text-center">Status</TableHead>
              <TableHead className="text-right">Inventory</TableHead>
              <TableHead className="text-right">Sales Channel</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="w-16 text-center">
                    <Checkbox />
                  </TableCell>
                  <TableCell className="min-w-10">
                    <Image
                      src={product.imageUrl}
                      alt="image.img"
                      width={60}
                      height={60}
                      style={{ width: "auto", height: "auto" }}
                    />
                  </TableCell>
                  <TableCell className="min-w-28">{product.title}</TableCell>
                  <TableCell className="max-w-10 text-center capitalize">
                    <Badge variant={product.isActive ? "default" : "secondary"}>
                      {product.isActive ? "active" : "inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {product.quantity}
                  </TableCell>
                  <TableCell className="text-right">3</TableCell>
                  <TableCell>Produt Category</TableCell>
                  <TableCell>CoolStore</TableCell>
                  <TableCell className="text-center">
                    <ActionButtons id={product.id} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <PaginationServerSide
        selectedFields={selectedFields.length}
        currentPage={meta.currentPage}
        totalPage={meta.totalPages}
        totalCount={meta.totalCount}
      />
    </div>
  );
};

export default ProductTable;
