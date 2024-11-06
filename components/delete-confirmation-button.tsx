"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ApiResponse } from "@/helpers/response-data";
import { useToast } from "@/hooks/use-toast";
import { Icon } from "@iconify-icon/react";

type DeleteConfirmationButtonProps = {
  callAction: () => Promise<ApiResponse<object>>;
};

const DeleteConfirmationButton = ({
  callAction,
}: DeleteConfirmationButtonProps) => {
  const { toast } = useToast();
  const onDelete = async () => {
    const response = await callAction();

    if (response.success) {
      toast({
        title: "Success",
        description: response.message,
        variant: "success",
      });
    } else {
      toast({
        title: "Failed",
        description: response.message,
        variant: "destructive",
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Icon icon="gridicons:trash" className="text-lg text-destructive" />
          <span className="sr-only">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your data
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onDelete();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationButton;
