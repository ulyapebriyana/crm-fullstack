import React from "react";
import Title from "../components/title";
import { Button } from "@/components/ui/button";
import { countCustomer, getCustomers } from "@/actions/main/customer-action";
import { Link } from "@/i18n/routing";
import ImportDropzoneButton from "./components/import-dropzone-button";
import CustomerTable from "./components/customer-table";
import EmptyCustomer from "./components/empty-customer";

const CustomerPage = async ({
  searchParams,
}: {
  searchParams?: { search?: string; page?: string; limit?: string };
}) => {
  const customers = await getCustomers({
    search: searchParams?.search,
    page: +(searchParams?.page || 1),
    limit: +(searchParams?.limit || 10),
  });
  const countCustomers = await countCustomer();

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <Title name="Customers" />
        <div className="flex justify-between gap-3">
          <ImportDropzoneButton />
          <Button asChild>
            <Link href={"/customers/create"}>Add Customer</Link>
          </Button>
        </div>
      </div>
      {(countCustomers?.data ?? 0) < 1 ? (
        <EmptyCustomer />
      ) : (
        <CustomerTable
          data={customers?.data.result}
          meta={customers?.data.meta}
        />
      )}
    </div>
  );
};

export default CustomerPage;
