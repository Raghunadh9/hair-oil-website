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
      <div className="max-w-6xl text-center ">
        <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-white from640:flex from640:gap-[30px] ">
          <Image
            src={`/images/home/1.jpeg`}
            alt="jordans"
            height="400"
            width="400"
            className="object-contain"
          />
          <div className="">
            <p className="text-base sm:text-xl text-black mt-4 mb-2 ">
              Subscribe to Us !!!
            </p>

            <p className="text-sm text-neutral-600 ">
              Subscribe to us to get notified when new products are added to our
              website, when there are new events, festival offers, and much
              more.
            </p>
            {/* <div className="flex justify-center flex-col w-full max-w-md items-center space-y-3 from640:px-[60px]"> */}
            <div className="my-5">
              <Input
                type="email"
                placeholder="Email"
                className="mb-[10px] input-field"
              />
              <Button className="bg-white text-black" type="submit">
                Subscribe
              </Button>
            </div>
            {/* </div> */}
          </div>
        </BackgroundGradient>
      </div>
    </div>
  );
}
