import React from "react";
import { useTranslations } from "next-intl";
import { SignOutButton } from "@/components/sign-out-button";

const HomePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const t = useTranslations("HomePage");

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center p-3">
        <h1 className="text-center text-3xl font-bold">Coming Soon</h1>
        <p className="text-center">
          We&apos;re working hard to bring you an amazing new website. Stay
          tuned!
        </p>
        <SignOutButton />
      </div>
    </div>
  );
};

export default HomePage;
