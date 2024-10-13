import BackButton from "@/components/back-button";
import React from "react";
import FormUpsert from "../../components/form-upsert";
import { getCustomer } from "@/actions/main/customer-action";
import { redirect } from "@/i18n/routing";

const UpdateCustomer = async ({ params }: { params: { id: string } }) => {
  const customer = await getCustomer({ id: params.id });
  
  if (customer.success == false) {
    return redirect("/customers");
  }
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton className="text-2xl" />
          <span className="text-2xl font-bold">Update Customer</span>
        </div>
      </div>
      <FormUpsert id={params.id} data={customer.data} />
    </div>
  );
};

export default UpdateCustomer;
