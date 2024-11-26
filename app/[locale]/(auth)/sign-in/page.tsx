import React from "react";
import SingleSignOn from "@/app/[locale]/(auth)/components/sso";
import { Link} from "@/i18n/routing";

const SignInPage = async () => {
  return (
    <div className="flex flex-col gap-5 md:p-10">
      <div className="flex flex-col items-center gap-2 md:items-start">
        <p className="text-3xl font-bold md:text-4xl">
          Login to your Boxbox account
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
        <div className="text-gray-500">Didn&apos;t have an account?</div>
        <Link href={"/sign-up"} className="text-primary">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
