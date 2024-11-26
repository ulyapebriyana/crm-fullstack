import React from "react";
import Title from "../components/title";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import EmptyOrder from "./empty-order";
import { File } from "lucide-react";
import { countOrder, getOrders } from "@/actions/main/order-action";
import OrderTable from "./compenents/order-table";

const OrderPage = async ({
  searchParams,
}: {
  searchParams?: { search?: string; page?: string; limit?: string };
}) => {
  const orderData = await getOrders({
    search: searchParams?.search,
    page: +(searchParams?.page || 1),
    limit: +(searchParams?.limit || 10),
  });

  const countOrders = await countOrder();

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <Title name="Orders" />
        <div className="flex justify-between gap-3 md:flex-row">
          <Button asChild variant={"outline"} className="w-full">
            <Link href={"/products/create"}>
              <File className="h-4 w-4" />
              <p className="ml-1">Draft</p>
            </Link>
          </Button>
          <Button asChild className="w-full">
            <Link href={"/orders/create"}>Create Order</Link>
          </Button>
        </div>
      </div>
      {(countOrders?.data ?? 0) < 1 ? (
        <EmptyOrder />
      ) : (
        <OrderTable
          data={JSON.stringify(orderData?.data.result)}
          meta={orderData?.data.meta}
        />
      )}
    </div>
  );
};

export default OrderPage;
