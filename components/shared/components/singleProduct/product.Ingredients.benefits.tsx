"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import { ICONS } from "../icons";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const ProductIngredientsAndBenefits = ({ product }: { product: any }) => {
  // product.benefits, product.ingredients

  return (
    <div className=" w-[80%]">
      <div className="from1024px:flex from1024px:justify-between">
        <div className="">
          <h1 className="font-bold text-2xl text-start mb-[30px]">
            INGREDIENTS
          </h1>
          <div className="">
            <Carousel
              plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]}
              className="w-full max-w-full"
            >
              <CarouselContent className="-ml-1">
                {product.ingredients.map((ingredient: any, index: number) => (
                  <CarouselItem
                    key={index}
                    className="pl-1 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex w-[50px] h-[150px]">
                          <span className="font-semibold text-center">
                            {ingredient.name}
                          </span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>

        <div className="">
          <h1 className="font-bold text-2xl text-start mb-[30px]">BENEFITS</h1>
          {product.benefits.map((i: any, index: number) => (
            <div className="flex gap-[20px] mb-[10px] items-center" key={index}>
              <div className="">{ICONS.checkBadgeProduct}</div>
              <div className="text-gray-500 text-xl">
                {i.name.length > 32 ? (
                  <div className="">
                    {i.name.substr(0, 32)}
                    <br />
                    {i.name.substr(32, i.name.length)}
                  </div>
                ) : (
                  i.name
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductIngredientsAndBenefits;
