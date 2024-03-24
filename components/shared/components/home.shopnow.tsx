// import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { ICONS } from "./icons";
import { config } from "@/config/config";
import Link from "next/link";
import { Button } from "@/components/ui/moving-border";

const ShopNowComponent = () => {
  return (
    <div className="flex flex-col md:flex-row items-center text-center website-theme-color-bg_light py-5 p-1">
      <div className="md:w-1/2 p-10">
        <Image
          src={"/images/oil-bottle/download.png"}
          alt="_"
          height={500}
          width={500}
        />
      </div>
      <div className="md:w-1/2 p-1">
        <h1 className="text-2xl font-bold pb-2">
          The Hair Oil made with Ayurvedic Ingredients.
        </h1>
        <p className="pb-2">
          Discover {config.websiteTitle}&apos;s Best homemade Hair oil
          collections...
        </p>
        <Link href={"/shop"}>
          <Button
            borderRadius="1.75rem"
            className="bg-white  text-black  border-neutral-200 "
          >
            Shop now {ICONS.rightArrow}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ShopNowComponent;
