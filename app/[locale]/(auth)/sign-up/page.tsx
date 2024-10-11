import React from "react";
import SingleSignOn from "./../components/sso";
import { Link, redirect } from "@/i18n/routing";
import { auth } from "@/auth";

const SignUpPage = async () => {
  const session = await auth();
  if (session) {
    return redirect("/customers");
  }
  return (
    <div className="flex flex-col gap-5 md:p-10">
      <div className="flex flex-col items-center gap-2 md:items-start">
        <p className="text-3xl font-bold md:text-4xl">
          Create a Boxbox account
        </p>
        <p className="text-gray-600">
          Try Boxbox for free. No credit card needed
        </p>
      </div>
      <SingleSignOn />
      <div className="my-4 flex items-center justify-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <div className="flex justify-center gap-2">
        <div className="text-gray-500">Already have an account?</div>
        <Link href={"/sign-in"} className="text-primary">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
