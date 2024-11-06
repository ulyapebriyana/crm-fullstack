import BackButton from "@/components/back-button";
import React from "react";
import { redirect } from "@/i18n/routing";
import FormUpsert from "../../components/form-upsert";
import { getProduct } from "@/actions/main/product-action";

const UpdateProduct = async ({ params }: { params: { id: string } }) => {
  const product = await getProduct({ id: params.id });

  if (product.success == false) {
    return redirect("/products");
  }
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton className="text-2xl" />
          <span className="text-2xl font-bold">Update Product</span>
        </div>
      </div>
      <FormUpsert id={params.id} products={JSON.stringify(product.data)} />
    </div>
  );
};

export default UpdateProduct;
