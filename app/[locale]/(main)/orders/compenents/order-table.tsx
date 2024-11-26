"use client";

import { Order } from "@prisma/client";
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
import { MetaData } from "@/helpers/response-data";
import PaginationServerSide from "@/components/pagination-server-side";
import { useState } from "react";
import moment from "moment";
import { formatCurrency } from "@/helpers/format-currency";
import ActionButton from "./action-button";
import { Icon } from "@iconify-icon/react";
import { toCapitalized } from "@/helpers/format-string";

type ExtendedOrder = Order & {
  _count: {
    products: number;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OrderTable = ({ data, meta }: { data: any; meta: MetaData }) => {
  const orders: ExtendedOrder[] = data ? JSON.parse(data) : [];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedFields, setSeletedFields] = useState([]);

  const renderStatus = (status: "PAID" | "PENDING" | "CANCELLED") => {
    const statusConfig = {
      PAID: {
        bg: "bg-green-100",
        icon: "bxs:check-circle",
        text: "text-green-400",
      },
      PENDING: {
        bg: "bg-yellow-100",
        icon: "ic:baseline-pending",
        text: "text-yellow-400",
      },
      CANCELLED: {
        bg: "bg-red-100",
        icon: "ic:round-cancel",
        text: "text-red-400",
      },
    };
    const { bg, icon, text } = statusConfig[status];
  
    return (
      <div
        className={`inline-flex items-center gap-1 rounded-md px-2 py-1 ${bg}`}
      >
        <Icon icon={icon} className={`text-lg ${text}`} />
        <span>{toCapitalized(status)}</span>
      </div>
    );
  };
  

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
              <TableHead className="min-w-10">Order Id</TableHead>
              <TableHead className="min-w-10">Order Date</TableHead>
              <TableHead className="">Customer</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="">Payment Status</TableHead>
              <TableHead className="text-right">Items</TableHead>
              <TableHead>Note</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="w-16 text-center">
                    <Checkbox />
                  </TableCell>
                  <TableCell className="min-w-10">{order.orderId}</TableCell>
                  <TableCell className="min-w-10">
                    {moment(order.createdAt).format("YYYY-MM-DD")}
                  </TableCell>
                  <TableCell className="max-w-10 capitalize">Lutvy</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(+order.total)}
                  </TableCell>
                  <TableCell className="">
                    {renderStatus(order.paymentStatus)}
                  </TableCell>

                  <TableCell className="text-right">
                    {order._count.products}
                  </TableCell>
                  <TableCell>{order.note}</TableCell>
                  <TableCell className="text-center">
                    <ActionButton id={order.id} />
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

export default OrderTable;
