"use client";

import SearchInput from "@/components/search";
import { SignOutButton } from "@/components/sign-out-button";
import { Icon } from "@iconify-icon/react";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 flex h-[80px] w-full items-center border-b bg-white px-8">
      <div className="flex w-full items-center justify-between">
        <div className="w-40 md:w-auto">
          <SearchInput />
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center rounded-lg bg-[#F9F9F9] p-3">
            <Icon icon={"ion:notifications-outline"} />
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center rounded-lg bg-[#F9F9F9] p-2 md:block">
              Cool Store
            </div>
            {/* <div className="flex items-center rounded-lg bg-primary p-2 text-white">
              CS
            </div> */}
            <div className="">
              <SignOutButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
