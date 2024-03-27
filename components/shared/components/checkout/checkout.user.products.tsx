import Image from "next/image";
import React from "react";

const CheckoutUserProducts = ({ cart }: { cart: any }) => {
  return (
    <div className="border border-[#ccc] p-[1rem] mt-[1rem]">
      <div className="flex items-center justify-between ">
        <h1 className=" text-xl text-black">Cart</h1>
        <span className="font-bold">
          {cart.products.length == 1
            ? "1 item"
            : `${cart.products.length} items`}
        </span>
      </div>
      <div className="flex flex-wrap gap-[1rem] pt-[1rem]">
        {cart.products.map((product: any, i: number) => (
          <div className="product" key={product._id}>
            <div className="relative ">
              <Image
                src={product.image}
                alt=""
                width={140}
                height={180}
                className="object-cover rounded-md"
              />
              <div className="bg-[#f3f2f0] p-[5px] flex items-center justify-between font-[700] absolute bottom-0 right-0 left-0 ">
                <Image
                  src={product.color.image}
                  alt=""
                  width={30}
                  height={30}
                  className="rounded-full object-cover"
                />
                <span>{product.size}</span>
                <span>x{product.qty}</span>
                {/* <span>vendor:{product.shop?.name}</span> */}
              </div>
            </div>
            <div className="text-[13px] mt-[2px] ">
              {product.name.length > 18
                ? `${product.name.substring(0, 18)}...`
                : product.name}
            </div>
            <div className="text-[14px] font-[700] ">
              Rs. {(product.price * product.qty).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-[1rem] p-[10px] border-t border-t-[#ccc] ">
        Subtotal: <b>Rs. {cart.cartTotal}</b>
      </div>
    </div>
  );
};

export default CheckoutUserProducts;
