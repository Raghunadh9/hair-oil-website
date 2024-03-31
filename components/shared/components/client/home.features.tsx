"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

export default function HomeFeatures() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  return (
    <Carousel
      className="w-full max-w-full my-5 upto425:my-2 upto640:my-[0px] from640:container_own upto640:hidden"
      plugins={[plugin.current]}
    >
      <CarouselContent className="-ml-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="pl-1 md:basis-1/2 lg:basis-1/3 flex justify-center"
          >
            <div className="p-1">
              <Image
                src={`/images/features/${index + 1}.webp`}
                alt={`image_${index + 1}`}
                width={500}
                height={100}
              />
            </div>{" "}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
