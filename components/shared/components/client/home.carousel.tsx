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
import Link from "next/link";

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
      className="w-full max-w-full mt-[5px]"
    >
      <CarouselContent className="">
        {Array.from({ length: 3 }).map((_, index) => (
          <CarouselItem key={index} className="basis-full ">
            <div className="">
              <Link href={"/shop"}>
                <Image
                  src={`/images/banner/${index + 1}.png`}
                  alt={`image_${index + 1}`}
                  width={1500}
                  height={100}
                />
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
export default CarouselComponent;
