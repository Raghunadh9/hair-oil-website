import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ICONS } from "../icons";
import { useCartStore } from "@/components/store/cart.store";
import toast from "react-hot-toast";
import { SheetFooter } from "@/components/ui/sheet";
const CartSheetItems = ({
  product,
  cartItems,
  saveCartToDbHandler,
}: {
  product: any;
  cartItems: any;
  saveCartToDbHandler: any;
}) => {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  const { addToCart, updateCart, emptyCart } = useCartStore();
  const cart = useCartStore((state: any) => state.cart.cartItems);

  const updateQty = (type: string) => {
    let newCart = cart.map((p: any) => {
      if (p._uid == product._uid) {
        return {
          ...p,
          qty: type == "plus" ? product.qty + 1 : product.qty - 1,
        };
      }
      return p;
    });
    updateCart(newCart);
    toast.success("Cart updated successfully");
  };
  const removeProduct = (id: string) => {
    let newCart = cart.filter((p: any) => {
      return p._uid != id;
    });
    updateCart(newCart);
    toast.success("Item deleted successfully");
  };

  return (
    <div className="">
      {" "}
      <div key={product._uid} className="flex gap-[10px] mb-[20px]">
        <Image
          className="object-cover upto425:w-[70px]"
          src={product.images[0].url}
          alt="images"
          width={100}
          height={140}
        />
        <div className="">
          <h1 className="upto425:text-[12px] text-[15px] font-bold ">
            {product.name}
          </h1>
          <div className="text-gray-500 text-[12px] upto425:text-[10px]">
            {product.description.length > 14
              ? product.description.substring(0, 53) + "..."
              : product.description}{" "}
            <br />
            {product.size && (
              <span className="font-[600] bg-[#f5f5f5] upto425:text-[10px] ">
                {product.size}
              </span>
            )}{" "}
            {product.price && (
              <span className="font-[600] bg-[#f5f5f5] upto425:text-[10px]">
                Rs. {product.price.toFixed(2)}
              </span>
            )}
          </div>
          <div className="">
            <div className="flex items-center gap-[10px]  ">
              <span className="text-[17px] font-[600] upto425:text-[12px] ">
                Rs. {(product.price * product.qty).toFixed(2)}
              </span>
              {product.price !== product.priceBefore && (
                <span className="line-through  text-[14px] upto425:text-[12px] ">
                  Rs. {product.priceBefore}
                </span>
              )}
              {product.discount > 0 && (
                <span className="text-green-400 bg- text-[14px] rounded-sm py-[2px] px-[10px] font-[600]  ">
                  -{product.discount}%
                </span>
              )}
            </div>
          </div>
          <div className="">
            <div className="flex items-center gap-[10px]">
              <button
                onClick={() => updateQty("minus")}
                className="bg-black py-1 w-[30px] text-white height-[50px] rounded-full grid place-items-center cursor-pointer "
                disabled={product.qty < 2}
              >
                -
              </button>
              <span className="text-[14px] ">{product.qty}</span>
              <button
                onClick={() => updateQty("plus")}
                className="bg-black py-1 w-[30px] text-white height-[50px] rounded-full grid place-items-center cursor-pointer "
                disabled={product.qty == product.quantity}
              >
                +
              </button>
            </div>
          </div>
          {product.quantity < 1 && (
            <div className="text-red-500 text-[15px] pl-[2rem] z-[2] ">
              This product is out of stock, Add it to your whishlish it may get
              restocked!.
            </div>
          )}
        </div>
        <div className="">
          <div
            className="cursor-pointer"
            style={{ zIndex: 2 }}
            onClick={() => removeProduct(product._uid)}
          >
            {ICONS.delete}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSheetItems;
