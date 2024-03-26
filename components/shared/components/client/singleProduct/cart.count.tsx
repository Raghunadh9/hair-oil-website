"use client";

import { useCartStore } from "@/components/store/cart.store";
import { useEffect } from "react";

export const CartNumber = () => {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  const DisplayCounter = () => {
    const counter = useCartStore((state: any) => state.cart.cartItems);
    return counter.length;
  };
  return DisplayCounter();
};
