import React from "react";
import Title from "../components/title";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import EmptyProduct from "./components/empty-product";
import { countProduct, getProducts } from "@/actions/main/product-action";
import ProductTable from "./components/product-table";

const ProductPage = async ({
  searchParams,
}: {
  searchParams?: { search?: string; page?: string; limit?: string };
}) => {
  const products = await getProducts({
    search: searchParams?.search,
    page: +(searchParams?.page || 1),
    limit: +(searchParams?.limit || 10),
  });
  const countProducts = await countProduct();

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <Title name="Products" />
        <div className="flex flex-col-reverse justify-between gap-3 md:flex-row">
          <div className="flex justify-between gap-3">
            <Button asChild variant={"outline"} className="flex-1">
              <Link href={"/products/create"}>Export</Link>
            </Button>
            <Button asChild variant={"outline"} className="flex-1">
              <Link href={"/products/create"}>Import</Link>
            </Button>
          </div>
          <Button asChild>
            <Link href={"/products/create"}>Add Product</Link>
          </Button>
        </div>
      </div>
      {(countProducts?.data ?? 0) < 1 ? (
        <EmptyProduct />
      ) : (
        <ProductTable
          data={JSON.stringify(products?.data.result)}
          meta={products?.data.meta}
        />
      )}
    </div>
  );
};

export default ProductPage;
