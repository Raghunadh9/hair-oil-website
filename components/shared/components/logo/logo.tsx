import { config } from "@/config/config";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div className="bg-transparent pl-[50px] upto640:pl-[0px]">
      <Link href={"/"}>
        <Image
          src="/images/logo.png"
          width={50}
          height={20}
          alt="logo"
          className="ml-1"
        />
        <h2 className="text-xl text-center">
          <span className="font-extrabold text-white">
            {config.websiteTitle}
          </span>
        </h2>
      </Link>
    </div>
  );
};

export default Logo;
