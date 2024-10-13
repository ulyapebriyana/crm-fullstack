import React from "react";
import EmptyCustomer from "./empty-customer";
import Title from "../components/title";
import { Button } from "@/components/ui/button";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { getCustomers } from "@/actions/main/customer-action";
import { Link } from "@/i18n/routing";

const CustomerPage = async ({
  searchParams,
}: {
  searchParams?: { search?: string };
}) => {
  const customers = await getCustomers({ search: searchParams?.search });

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <Title name="Customers" />
        <div className="flex justify-between gap-3">
          <Button variant={"outline"}>Import Customer</Button>
          <Button asChild>
            <Link href={"/customers/create"}>Add Customer</Link>
          </Button>
        </div>
      </div>
      {customers.length < 1 ? (
        <EmptyCustomer />
      ) : (
        <DataTable columns={columns} data={customers} />
      )}
    </div>
  );
};

export default CustomerPage;
