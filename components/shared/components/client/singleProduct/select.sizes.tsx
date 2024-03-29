"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const SelectSizes = ({
  product,
  style,
  size,
}: {
  product: any;
  style: number;
  size: number;
}) => {
  const searchParams = useSearchParams();

  const querySize =
    searchParams.get("size") === null ? null : Number(searchParams.get("size"));
  return (
    <div className=" flex items-center flex-wrap gap-[1rem] upto425:text-[15px]">
      {product.sizes.map((sizes: any, i: number) => (
        <Link
          href={`/product/${product.slug}?style=${style}&size=${i}`}
          key={sizes.size}
        >
          <div
            className={`${
              i == querySize && "website-theme-color-bg text-white"
            } w-[45px] h-[45px] rounded-md grid items-center border border-[#e6e6e6] cursor-pointer justify-center hover:text-white hover:bg-[#7BCAD7]`}
          >
            {sizes.size}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SelectSizes;
