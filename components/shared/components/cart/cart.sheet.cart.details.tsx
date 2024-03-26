import { Button } from "@nextui-org/react";
import React from "react";
import { ICONS } from "../icons";

const CartSheetDetails = ({
  subtotal,
  shippingFee,
  total,
  cart,
  saveCartToDbHandler,
}: {
  subtotal: number;
  shippingFee: number;
  total: number;
  cart: any;
  saveCartToDbHandler: () => Promise<void>;
}) => {
  return (
    <div>
      <div className="flex text-[14px] items-center justify-between ">
        <span>Subtotal</span>
        <span>Rs. {subtotal}</span>
      </div>
      <div className="flex text-[14px] items-center justify-between ">
        <span>Shipping</span>
        <span>+ Rs. {shippingFee}</span>
      </div>
      <div className="flex items-center justify-between font-[700] text-[17px] border-t-2 border-black pt-[1rem] mt-[1rem] ">
        <span>Total</span>
        <span>Rs. {total}</span>
      </div>
      <div className="flex justify-center">
        <Button
          disabled={cart.length == 0}
          onClick={() => saveCartToDbHandler()}
          className="website-theme-color-bg p-7"
        >
          Continue to Secure Checkout {ICONS.rightArrow}
        </Button>
      </div>
    </div>
  );
};

export default CartSheetDetails;
