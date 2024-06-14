"use client";
import React from "react";
// import { BackgroundGradient } from "../ui/background-gradient";
import Image from "next/image";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/moving-border";

export function BackgroundGradientDemo() {
  return (
    <div className="flex justify-center ">
      <div className="max-w-full text-center ">
        <div className="rounded-[22px] p-4 sm:p-10 website-theme-color-bg_light from640:flex from640:gap-[30px] ">
          <div className="">
            <Image
              src={`/images/illustrations/subscribe-to-us.png`}
              alt="jordans"
              height="200"
              width="300"
              className="object-contain"
            />
          </div>
          <div className="">
            <p className="text-base sm:text-xl text-black mt-4 mb-2 font-extrabold underline">
              SUBSCRIBE TO US
            </p>

            <p className="text-sm text-neutral-600 ">
              Subscribe to us to get notified when our app is available,
              <br /> when new products are added to our website, <br />
              when there are new events,
              <br />
              festival offers, and much more.
            </p>
            {/* <div className="flex justify-center flex-col w-full max-w-md items-center space-y-3 from640:px-[60px]"> */}
            <div className="flex justify-center mt-[10px]">
              <Input
                type="email"
                placeholder="Email"
                className="mb-[10px] input-field max-w-sm flex justify-center"
              />
            </div>
            <Button className="bg-white text-black" type="submit">
              Subscribe
            </Button>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
