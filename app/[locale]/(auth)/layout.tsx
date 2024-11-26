import Image from "next/image";
import React from "react";
import Logo from "@/assets/Login/Logo.png";
import { CarouselPlugin } from "./components/carousel";
import SelectLanguage from "./components/language";
import { auth } from "@/auth";
import { redirect } from "@/i18n/routing";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (session) {
    return redirect("/home");
  }
  return (
    <section className="container mx-auto flex h-screen w-full">
      <div className="flex h-full w-full flex-col justify-between p-3">
        <header className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src={Logo}
              alt="boxbox.jpg"
              width={40}
              height={20}
              priority
            />
            <div className="text-3xl font-bold">Boxbox</div>
          </div>
          <div className="flex items-center gap-5">
            <div className="hidden md:block">I&rsquo;am located in</div>
            <SelectLanguage />
          </div>
        </header>
        {children}
        <footer className="flex justify-center gap-10 text-gray-500 md:justify-start">
          <div className="">Help</div>
          <div className="">Privacy</div>
          <div className="">Terms</div>
        </footer>
      </div>
      <div className="hidden h-full w-full pl-3 md:block">
        <CarouselPlugin />
      </div>
    </section>
  );
};

export default AuthLayout;
