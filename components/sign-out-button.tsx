"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { Icon } from "@iconify-icon/react";

export const SignOutButton = () => {
  return (
    <Button
      variant={"destructive"}
      size={"icon"}
      onClick={() => signOut({ callbackUrl: `${window.location.origin}/` })}
    >
      <Icon icon={"el:off"} />
    </Button>
  );
};
