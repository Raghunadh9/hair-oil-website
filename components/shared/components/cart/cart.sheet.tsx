"use client";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React, { useState } from "react";
import { ICONS } from "../icons";
import { CartNumber } from "../client/singleProduct/cart.count";
import { useEffect } from "react";
import { useCartStore } from "@/components/store/cart.store";
import { updateCart } from "@/components/lib/actions/cart.actions";
import { useRouter } from "next/navigation";
import { saveCartForUser } from "@/components/lib/actions/user.actions";
import CartSheetItems from "./cart.sheet.items";
import CartSheetDetails from "./cart.sheet.cart.details";
import { Spinner } from "@nextui-org/react";
import { useAuth } from "@clerk/nextjs";

const CartSheetContent = () => {
  const router = useRouter();
  const { userId } = useAuth();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const cart = useCartStore((state: any) => state.cart.cartItems);
  const [shippingFee, setShippingFee] = useState(0);
  const [subTotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const update = async () => {
      try {
        const data = await updateCart(cart);

        if (data) {
          updateCart(data);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (cart.length > 0) {
      update();
    }
  }, [cart.length > 0]);
  useEffect(() => {
    setShippingFee(
      cart.reduce((a: any, c: any) => a + Number(c.shipping), 0).toFixed(2)
    );
    setSubtotal(
      cart.reduce((a: any, c: any) => a + c.price * c.qty, 0).toFixed(2)
    );
    setTotal(
      (
        cart.reduce((a: any, c: any) => a + c.price * c.qty, 0) +
        Number(shippingFee)
      ).toFixed(2)
    );
  }, [cart]);
  const saveCartToDbHandler = async () => {
    if (userId !== null) {
      setLoading(true);
      saveCartForUser(cart, userId);
      setTimeout(() => {
        router.push("/checkout");
      }, 1000);
      setLoading(false);
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <SheetContent className="z-[250]">
      {loading ? (
        <>
          {" "}
          <Spinner label="Primary" color="primary" labelColor="primary" />
        </>
      ) : (
        <>
          {" "}
          <SheetHeader>
            <SheetTitle>
              <div className="flex gap-[20px] mb-[30px] ">
                <span>{ICONS.cart}</span>
                <span>
                  <CartNumber /> Items
                </span>
              </div>
              <div className="border-b border-b-gray-500"></div>
            </SheetTitle>
            <SheetDescription>
              <div className="upto640:overflow-y-scroll">
                {cart.map((product: any) => (
                  // SDeperate compnent here
                  <CartSheetItems
                    product={product}
                    cartItems={cart}
                    key={product._uid}
                    saveCartToDbHandler={saveCartToDbHandler}
                  />
                ))}
              </div>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <div className="border-t-1 border-gray-400 absolute bottom-4 w-[90%]">
              <CartSheetDetails
                subtotal={subTotal}
                shippingFee={shippingFee}
                total={total}
                cart={cart}
                saveCartToDbHandler={saveCartToDbHandler}
              />
            </div>
          </SheetFooter>
        </>
      )}
    </SheetContent>
  );
};

export default CartSheetContent;
