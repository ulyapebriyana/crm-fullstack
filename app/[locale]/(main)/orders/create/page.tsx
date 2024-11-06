import BackButton from "@/components/back-button";
import React from "react";
import FormUpsert from "../compenents/form-upsert";

const page = () => {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton className="text-2xl" />
          <span className="text-2xl font-bold">Add Order</span>
        </div>
      </div>
      <FormUpsert />
    </div>
  );
};

export default page;
