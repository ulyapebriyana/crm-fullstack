"use client";

import SearchInput from "@/components/search";
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
import { MetaData } from "@/helpers/response-data";
import PaginationServerSide from "@/components/pagination-server-side";
import { useState } from "react";
import { Customer } from "@prisma/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomerTable = ({
  data: customers,
  meta,
}: {
  data: Customer[];
  meta: MetaData;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedFields, setSeletedFields] = useState([]);

  return (
    <div className="flex flex-col gap-4">
      <SearchInput />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-10 max-w-10 text-center">
                <Checkbox />
              </TableHead>
              <TableHead className="min-w-48">Name</TableHead>
              <TableHead className="min-w-40">Email</TableHead>
              <TableHead className="min-w-40">Phone number</TableHead>
              <TableHead className="min-w-60">Address</TableHead>
              <TableHead className="text-right">Orders</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers?.map((customer, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="w-16 text-center">
                    <Checkbox />
                  </TableCell>
                  <TableCell className="">
                    {customer.firstName} {customer.lastName}
                  </TableCell>
                  <TableCell className="">{customer.email}</TableCell>
                  <TableCell className="">{customer.phoneNumber}</TableCell>
                  <TableCell className="">{customer.address}</TableCell>
                  <TableCell className="text-right">19</TableCell>
                  <TableCell className="text-end">
                    <div className="flex justify-center">
                      <ActionButtons id={customer.id} />
                    </div>
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

export default CustomerTable;
