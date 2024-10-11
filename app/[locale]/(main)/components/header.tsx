"use client";

import SearchInput from "@/components/search";
import { SignOutButton } from "@/components/sign-out-button";
import { Icon } from "@iconify-icon/react";

const Header = () => {
  return (
    <header className="sticky top-0 flex h-[80px] w-full items-center border-b bg-white px-8">
      <div className="flex w-full items-center justify-between">
        <div className="">
          <SearchInput />
        </div>
        <div className="flex items-center gap-5">
          <div className="flex h-11 items-center rounded-lg bg-[#F9F9F9] p-3">
            <Icon icon={"ion:notifications-outline"} className="text-xl" />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-11 items-center rounded-lg bg-[#F9F9F9] px-3">
              Cool Store
            </div>
            <div className="flex h-11 items-center rounded-lg bg-primary px-3 text-white">
              CS
            </div>
            <SignOutButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
