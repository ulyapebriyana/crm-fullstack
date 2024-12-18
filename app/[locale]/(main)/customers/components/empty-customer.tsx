import Image from "next/image";
import EmptyImage from "@/assets/Customers/empty.png";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import ImportDropzoneButton from "./import-dropzone-button";

const EmptyCustomer = () => {
  return (
    <div className="flex h-[600px] items-center justify-center rounded-lg border">
      <div className="flex max-w-sm flex-col items-center justify-center gap-5 p-3">
        <Image src={EmptyImage} alt="empty" height={150} width={150} />
        <h1 className="text-center text-lg font-bold md:text-start">
          Everything customers-related in one place
        </h1>
        <p className="text-center">
          Manage customer details, see customer order history, and group
          customer into segments
        </p>
        <div className="flex gap-4">
          <ImportDropzoneButton />
          <Button asChild>
            <Link href={"/customers/create"}>Add Customer</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyCustomer;
