import { config } from "@/config/config";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Link href={"/"}>
        <Image
          src="/images/logo.png"
          width={50}
          height={20}
          alt="logo"
          className="ml-1"
        />
        <h2 className="text-xl">
          <span className="font-bold">{config.websiteTitle.slice(0, 1)}</span>
          <span className="">{config.websiteTitle.slice(1)}</span>
        </h2>
      </Link>
    </div>
  );
};

export default Logo;