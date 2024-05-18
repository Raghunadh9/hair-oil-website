"use client";
import { Button } from "@nextui-org/react";
import React from "react";
import { ICONS } from "../icons";
import { icons } from "lucide-react";
import { redirect, usePathname, useRouter } from "next/navigation";

const CartSheetDetails = ({
  subtotal,
  shippingFee,
  total,
  cart,
  saveCartToDbHandler,
  setOpen,
}: {
  subtotal: number;
  shippingFee: number;
  total: number;
  cart: any;
  saveCartToDbHandler: () => Promise<void>;
  setOpen: any;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  if (pathname === "/checkout") {
    router.push("/");
  }
  const totalSaved: number = cart.reduce((acc: any, curr: any) => {
    // Add the 'saved' property value to the accumulator
    return acc + curr.saved * curr.qty;
  }, 0);
  const carttotal = Number(subtotal) + totalSaved;
  return (
    <>
      <div className="website-theme-color-bg_light website-theme-color font-bold flex p-[12px] rounded-t-lg items-center gap-[20px] justify-start">
        <div className="">{ICONS.discount}</div>
        <div className="upto425:text-[12px]">
          Yay! You have saved <span className="underline">₹{totalSaved}</span>{" "}
          on this order
        </div>
      </div>
      <div className="bg-white">
        <div className="flex text-[14px] items-center justify-between ">
          <span>Total MRP</span>
          <span>Rs. {carttotal}</span>
        </div>

        <div className="flex text-[14px] items-center justify-between ">
          <span>Cart Discount</span>
          <span className="website-theme-color">- ₹ {totalSaved}</span>
        </div>
        <div className="flex text-[14px] items-center justify-between ">
          <span>Shipping Charges</span>
          <span className="text-[17px]  website-theme-color">Free</span>
        </div>
        <div className="flex items-center justify-between font-[700] text-[17px] border-t-2 border-black pt-[1rem] mt-[1rem] ">
          <span>Total</span>
          <span>Rs. {total}</span>
        </div>
        <div className="flex justify-center">
          <Button
            disabled={cart.length == 0}
            onClick={() => {
              saveCartToDbHandler();
              setOpen(false);
            }}
            className="website-theme-color-bg p-7"
          >
            Continue to Secure Checkout {ICONS.rightArrow}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartSheetDetails;
