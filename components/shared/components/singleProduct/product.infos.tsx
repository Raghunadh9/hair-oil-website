import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ICONS } from "../icons";
import { Divider } from "@nextui-org/react";
import SelectSizes from "../client/singleProduct/select.sizes";
import QtyButtons from "../client/singleProduct/qty.buttons";
import ProductBadges from "./product.badges";

const ProductInfo = ({
  product,
  style,
  size,
}: {
  product: any;
  style: number;
  size: number;
}) => {
  return (
    <div className="text-black leading-[50px] bg-white upto768:!pt-[-4rem] upto425:max-w-[340px] upto425:px-0 upto425:mx-0 ">
      <div className="">
        <h1 className="text-[30px] font-extrabold upto425:text-[20px]">
          {product.name}
        </h1>
        <div className="flex gap-[5px] items-center">
          <div className="">
            <Image
              src={"/images/product/badge.png"}
              alt="_"
              height={70}
              width={70}
            />
          </div>
          <div className="text-gray-400 leading-5">
            High-quality and verified product on our website that <br />
            controls hair fall, dandruff, and enhances texture!
          </div>
        </div>
        {/* reviews */}
        <div className="">
          <span className="font-bold text-orange-400 flex gap-[5px] items-center">
            <span> {product.rating} </span>
            <span className="mb-[3px]">{ICONS.reviewStar} </span>
            <div className="flex h-5 items-center space-x-4 gap-[5px] text-small">
              <Divider orientation="vertical" />
              {product.numReviews}
              {product.numReviews == 1 ? " review" : " reviews"}
            </div>{" "}
          </span>
        </div>

        <div className="text-black flex items-center  upto425:mt-[0rem] border-b-2 border-b-gray-300 ">
          {!size ? (
            <h1 className="text-black p-0 text-[30px] font-extrabold upto425:text-[20px] ">
              Rs. {product.price}
            </h1>
          ) : (
            <h1 className="text-black p text-[30px] font-extrabold upto425:text-[20px]">
              Rs. {product.price}
            </h1>
          )}
          {product.discount > 0 ? (
            <h3 className="font-normal text-[16px] pl-[5px] text-black flex items-center gap-[5px] upto425:text-[14px]">
              <span className="line-through ml-[15px]">
                Rs. {product.priceBefore}
              </span>
              <span className="text-green-500 font-bold px-[-3px]  ml-[15px] upto425:text-[15px]">
                {product.discount}% Off
              </span>
            </h3>
          ) : (
            <div></div>
          )}
        </div>

        {/* <span className="block text-black upto425:text-[15px]">
          {product.shipping ? (
            `+ Rs. ${product.shipping} Shipping fee`
          ) : (
            <div className="text-black font-extrabold">Free Shipping!</div>
          )}
        </span> */}
        <span className="font-bold upto425:text-[15px] ">
          <span className="underline text-green-500 ">
            {size ? product.quantity : product.sizes[size].qty}
          </span>{" "}
          pieces available.
        </span>
        <div className="upto425:text-[15px] ">
          <h4 className="font-bold">Select a Size : </h4>
          <div className="max600:flex max600:justify-center max600:items-center ">
            <SelectSizes product={product} style={style} size={size} />
          </div>
        </div>
        <div className="max600:flex max600:justify-center max600:items-center flex items-center mt-[1rem] gap-[1rem] upto425:text-[15px]">
          {product.colors &&
            product.colors.map((color: any, i: any) => (
              <span
                key={i}
                className={`${
                  i == style ? "border-[3px] border-black border-double" : ""
                } grid w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer hover:border-[3px] hover:border-black hover:border-double `}
              >
                <Link href={`/product/${product.slug}?style=${i}`}>
                  <Image
                    src={color.image}
                    alt="iamge"
                    width={50}
                    height={50}
                    className="object-cover "
                  />
                </Link>
              </span>
            ))}
        </div>
        <span className="font-bold mt-[0rem] upto425:text-[15px]">
          Quantity:
        </span>
        <QtyButtons product={product} size={size} style={style} />
        <ProductBadges />
      </div>
    </div>
  );
};

export default ProductInfo;
