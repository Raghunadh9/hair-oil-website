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
    <div className="w-full hover:scale-105 hover:shadow-xl sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 transition  ">
      <div className="">
        <Link href={`/product/${product.slug}?style=0`}>
          <Image
            src={images.url}
            width={290}
            height={390}
            alt="image"
            className="object-cover min-h-[330px] flex pl-1 "
          />
        </Link>
      </div>
      <h1 className="text-[13px] font-bold text-black mt-1 ">
        {product.name.length > 45
          ? `${product.name.substring(0, 40)}...`
          : product.name}{" "}
      </h1>
      <div className="flex justify-between">
        <span className="text-left font-thin text-[13px]">
          {prices.length === 1
            ? `Rs. ${prices[0]}`
            : `Rs. ${prices[0]} - ${prices[prices.length - 1]}`}
        </span>
        {/* <span className="mr-[100px]">-{discount}%</span> */}
      </div>

      <div className="flex text-[10px] justify-center items-center mt-[10px]">
        <div className=" ">
          {product.subProducts[0]?.sizes.map((item: any, index: number) => (
            <Link
              href={`/product/${product.slug}?style=0&size=${index}`}
              key={index}
            >
              <span className="border-2 border-gray-600 px-[10px] py-[5px] mr-[5px]">
                {item.size}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeProductPage;
