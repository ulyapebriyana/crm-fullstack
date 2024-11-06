import { Button } from "@/components/ui/button";
import { Icon } from "@iconify-icon/react";
import { useRouter } from "@/i18n/routing";
import DeleteButton from "./delete-button";

const ActionButton = ({ id }: { id: string }) => {
  const router = useRouter();
  return (
    <div className="flex items-center space-x-2">
      <Button
        asChild
        variant="ghost"
        size="icon"
        onClick={() => router.push(`/customers/update/${id}`)}
      >
        <div className="">
          <Icon icon="mynaui:pencil" className="text-xl text-destructive" />
          <span className="sr-only">Update</span>
        </div>
      </Button>
      <DeleteButton id={id} />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push(`/customers/${id}`)}
      >
        <Icon icon="quill:eye" className="text-xl" />
        <span className="sr-only">Detail</span>
      </Button>
    </div>
  );
};

export default ActionButton;
