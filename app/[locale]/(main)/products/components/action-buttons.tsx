"use client";

import { deleteProduct } from "@/actions/main/product-action";
import DeleteConfirmationButton from "@/components/delete-confirmation-button";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/routing";
import { Icon } from "@iconify-icon/react";

const ActionButtons = ({ id }: { id: string }) => {
  const router = useRouter();
  return (
    <div className="flex w-full justify-center gap-2">
      <Button
        variant={"outline"}
        size={"icon"}
        onClick={() => router.push(`/products/update/${id}`)}
      >
        <Icon icon={"bxs:edit"} className="text-lg" />
      </Button>

      <DeleteConfirmationButton callAction={() => deleteProduct({ id })} />
    </div>
  );
};

export default ActionButtons;
