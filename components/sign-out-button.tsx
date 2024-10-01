"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export const SignOutButton = () => {
  return (
    <Button
      variant={"destructive"}
      onClick={() => signOut({ callbackUrl: `${window.location.origin}/` })}
    >
      Sign Out
    </Button>
  );
};