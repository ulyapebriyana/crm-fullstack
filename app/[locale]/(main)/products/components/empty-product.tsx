import Image from "next/image";
import EmptyImage from "@/assets/Products/empty-product.png";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

const EmptyProduct = () => {
  return (
    <div className="flex h-[600px] items-center justify-center rounded-lg border">
      <div className="flex max-w-sm flex-col items-center justify-center gap-5 p-3">
        <Image src={EmptyImage} alt="empty" height={150} width={150} />
        <h1 className="text-center text-lg font-bold md:text-start">
          Your product will show here
        </h1>
        <p className="text-center">
          This is where you manage all of your products.
        </p>
        <div className="flex gap-4">
          <Button variant={"outline"}>Import Products</Button>
          <Button asChild>
            <Link href={"/products/create"}>Add Product</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyProduct;
