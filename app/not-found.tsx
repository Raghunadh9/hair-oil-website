import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex justify-center my-[50px]">
      {/* <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
        <div className="rounded-lg bg-white p-8 text-center shadow-xl">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="text-gray-600">
            Oops! The page you are looking for could not be found.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block rounded website-theme-color-bg px-4 py-2 font-semibold text-white "
          >
            {" "}
            Go back to Home{" "}
          </Link>
        </div>
      </div> */}
      <Image
        src={"/images/illustrations/404.png"}
        alt="_"
        height={600}
        width={800}
      />
    </div>
  );
};

export default NotFound;
