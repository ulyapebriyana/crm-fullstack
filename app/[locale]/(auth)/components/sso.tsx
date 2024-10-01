"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { Icon } from "@iconify-icon/react";
import { signIn } from "next-auth/react";

const buttons = [
  {
    label: "Sign In with Email",
    icon: "oui:email",
    href: "/",
    provider: "google",
    isDisable: true,
  },
  {
    label: "Login with Google",
    icon: "logos:google-icon",
    href: "/",
    provider: "google",
    isDisable: false,
  },
  {
    label: "Login with Facebook",
    icon: "logos:facebook",
    href: "/",
    provider: "google",
    isDisable: true,
  },
  {
    label: "Login with Apple",
    icon: "basil:apple-solid",
    href: "/",
    provider: "google",
    isDisable: true,
  },
];

const SingleSignOn = () => {
  return (
    <div className="flex flex-col gap-5">
      {buttons.map((data, index) => (
        <Button
          key={index}
          variant={"secondary"}
          className="flex w-full items-center justify-center gap-3 hover:bg-primary hover:text-white"
          size={"lg"}
          onClick={() => signIn(data.provider, { redirect: false })}
          disabled={data.isDisable}
        >
          <Icon icon={data.icon} className="text-xl" />
          {data.label}
        </Button>
      ))}
    </div>
  );
};

export default SingleSignOn;
