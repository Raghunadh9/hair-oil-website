import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set: any) => ({
      cart: {
        cartItems: [],
        cartItemsCount: 0,
        cartItemsText: "No Cart Items",
      },
      cartCount: () => {
        set((state: any) => ({
          cart: {
            cartItemsCount: state.cartItems.length,
          },
        }));
      },
      cartText: () => {
        set((state: any) => ({
          cart: {
            cartItemsText: state.cartItems.length > 1 ? "Items" : "Item",
          },
        }));
      },
      addToCart: (item: any) => {
        set((state: any) => ({
          cart: {
            cartItems: [...state.cart.cartItems, item],
          },
        }));
      },
      updateCart: (newCartItems: any) => {
        set((state: any) => ({
          cart: {
            cartItems: newCartItems,
          },
        }));
      },
      emptyCart: () => {
        set(() => ({
          cart: {
            cartItems: [],
          },
        }));
      },
    }),
    {
      name: "cart", // name of the item in the storage (must be unique)
      skipHydration: true,
    }
  )
);
