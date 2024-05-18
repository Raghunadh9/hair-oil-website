import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomeProductPage = ({ product }: { product: TypeofSingleProduct }) => {
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
      <div className="hover:scale-105 hover:shadow-xl transition h-full w-full max-h-[454px] max-w-[455px]  ">
        <div className="">
          <Link href={`/product/${product.slug}?style=0&size=0`}>
            <Image
              src={images.url}
              width={455}
              height={455}
              alt="image"
              className="min-h-[454px] min-w-[455px] flex pl-1 "
            />
          </Link>
        </div>
        <h1 className="text-[16px] text-center font-bold text-black mt-1 ">
          {product.name.length > 45
            ? `${product.name.substring(0, 40)}...`
            : product.name}{" "}
        </h1>
        <div className=" flex justify-center">
          <span className="text-left font-thin text-[13px]">
            {prices.length === 1
              ? `Rs. ${prices[0]}`
              : `Rs. ${prices[0]} - ${prices[prices.length - 1]}`}
          </span>
          {/* <span className="mr-[100px]">-{discount}%</span> */}
        </div>
      </div>
    </div>
  );
};

export default HomeProductPage;
