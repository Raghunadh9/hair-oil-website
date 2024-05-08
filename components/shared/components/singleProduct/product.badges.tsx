import React from "react";
import {
  ProductBadgesDataLeft,
  ProductBadgesDataRight,
} from "@/config/constants";
const ProductBadges = () => {
  return (
    <div className="flex justify-start my-[10px] gap-[30px] upto640:hidden">
      <div className="">
        {" "}
        {ProductBadgesDataLeft.map((product, index: number) => (
          <div className="flex items-center gap-[10px]" key={index}>
            <div className="website-theme-color-bg text-white  rounded-full w-[35px] h-[35px]  relative">
              <span className="absolute top-[6px] left-[7px]">
                {product.icon}
              </span>
            </div>
            <div className="">{product.title}</div>
          </div>
        ))}
      </div>
      <div className="">
        {ProductBadgesDataRight.map((product, index: number) => (
          <div className="flex items-center gap-[10px]" key={index}>
            <div className="website-theme-color-bg text-white rounded-full w-[35px] h-[35px] relative">
              <span className="absolute top-[6px] left-[7px]">
                {product.icon}
              </span>
            </div>
            <div className="">{product.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductBadges;
