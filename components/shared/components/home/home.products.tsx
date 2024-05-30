import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HomeProductPage = ({
  product,
  isSimilar,
}: {
  product: TypeofSingleProduct;
  isSimilar: boolean;
}) => {
  const images = product.subProducts[0].images[0];
  const prices = product.subProducts[0]?.sizes
    .map((s) => {
      return s.price;
    })
    .sort((a, b) => {
      return a - b;
    });
  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardDescription>
            <Link href={`/product/${product.slug}?style=0&size=0`}>
              {/* <div className="relative"> */}
              <Image
                src={images.url}
                width={isSimilar ? 350 : 455}
                height={isSimilar ? 350 : 455}
                alt="image"
                className={`${
                  isSimilar
                    ? "min-h-[350] min-w-[350] flex pl-1 "
                    : "min-h-[455] min-w-[455] flex pl-1 "
                } `}
              />
              {/* <div className="absolute right-0 top-0 h-[20px] w-[20px] bg-red-500">
                  -5%
                </div> */}
              {/* </div> */}
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <h1 className="text-[16px] text-center font-bold text-black mt-1 ">
              {product.name.length > 45
                ? `${product.name.substring(0, 40)}...`
                : product.name}{" "}
            </h1>
            <div className="flex justify-center items-center">
              <div className="justify-center flex items-start upto640:text-[15px]">
                <Rating
                  className="w-[20px] h-[20px] flex justify-center "
                  name="half-rating-read"
                  defaultValue={product.rating}
                  precision={0.5}
                  readOnly
                  style={{ color: "#F6A429" }}
                />
                <div className="">
                  {product.numReviews}
                  {product.numReviews == 1 ? " review" : " reviews"}
                </div>
              </div>
            </div>
            <div className=" flex justify-center">
              <span className="text-left font-bold text-[15px]">
                {prices.length === 1
                  ? `Rs. ${prices[0]}`
                  : `Rs. ${prices[0]} - ${prices[prices.length - 1]}`}
              </span>
              {/* <span className="mr-[100px]">-{discount}%</span> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeProductPage;
