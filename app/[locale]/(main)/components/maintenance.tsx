import Image from "next/image";
import React from "react";

const Maintenance = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Image
        src="https://www.svgrepo.com/show/426192/cogs-settings.svg"
        alt="Logo"
        className="mb-8"
        width={160}
        height={160}
      />
      <h1 className="mb-4 text-center text-4xl font-bold text-gray-700 dark:text-white md:text-5xl lg:text-6xl">
        Site is under maintenance
      </h1>
      <p className="mb-8 text-center text-lg text-gray-500 dark:text-gray-300 md:text-xl lg:text-2xl">
        We&apos;re working hard to improve the user experience. Stay tuned!
      </p>
      <div className="flex space-x-4">
        <a
          href="#"
          className="rounded bg-gray-800 px-6 py-3 font-bold text-white hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Contact Us
        </a>
        <a
          href="#"
          className="rounded border-2 border-gray-800 px-6 py-3 font-bold text-black dark:border-white dark:text-white"
        >
          Reload
        </a>
      </div>
    </div>
  );
};

export default Maintenance;
