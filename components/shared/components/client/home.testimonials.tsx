"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";

export default function HomeMobileCarousel() {
  return (
    <div className="mb-[50px] upto425:mb-[20px] mt-[5px] from768:hidden">
      {/* <h1 className="text-center font-bold text-2xl underline mb-5">
        Testimonials
      </h1> */}
      <Carousel
        opts={{
          align: "start",
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full max-w-full my-5 upto640:my-[0px] "
      >
        <CarouselContent>
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="">
                <Link href={"/shop"}>
                  <Image
                    src={`/images/banner/mobile/${index + 1}.png`}
                    alt={`image_${index + 1}`}
                    width={1500}
                    height={300}
                  />
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
