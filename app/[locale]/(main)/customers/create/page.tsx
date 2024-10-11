import BackButton from "@/components/back-button";

import FormCreate from "./form-create";

const CreateCustomer = async () => {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton className="text-2xl" />
          <span className="text-2xl font-bold">Add Customer</span>
        </div>
      </div>
      <FormCreate />
    </div>
  );
};

export default CreateCustomer;
