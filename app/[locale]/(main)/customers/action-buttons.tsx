import { Button } from "@/components/ui/button";
import { Icon } from "@iconify-icon/react";
import { useRouter } from "@/i18n/routing";
import DeleteButton from "./delete-button";
import { CustomerWithFullname } from "@/schemas/customer-schema";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ActionButton = ({ customer }: { customer: CustomerWithFullname }) => {
  const router = useRouter();
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => console.log("Update", customer)}
      >
        <Icon icon="mynaui:pencil" className="text-xl text-destructive" />
        <span className="sr-only">Update</span>
      </Button>
      <DeleteButton id={customer.id} />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push(`/customers/${customer.id}`)}
      >
        <Icon icon="quill:eye" className="text-xl" />
        <span className="sr-only">Detail</span>
      </Button>
    </div>
  );
};

export default ActionButton;
