"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const CarouselComponent = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <Carousel
      plugins={[plugin.current]}
      opts={{
        align: "start",
      }}
      className="w-full max-w-full pl-1 mt-[5px]"
    >
      <CarouselContent className="">
        <CarouselItem className="basis-full ">
          <div className="">
            <Image
              src={`/images/banner/5.png`}
              alt={`image_5`}
              width={1500}
              height={250}
            />
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
export default CarouselComponent;
