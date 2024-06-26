"use client";

import { getProductDetailsById } from "@/components/lib/actions/product.actions";
import { useCartStore } from "@/components/store/cart.store";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsHandbagFill, BsHeart } from "react-icons/bs";
import { TbMinus, TbPlus } from "react-icons/tb";
import { toast as sonnerToast } from "sonner";
import { ICONS } from "../../icons";
import { Button } from "@nextui-org/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SelectSizes from "./select.sizes";

const QtyButtons = ({
  product,
  size,
  style,
}: {
  product: any;
  size: number | string;
  style: number;
}) => {
  const [qty, setQty] = useState(1);
  useEffect(() => {
    size = "";
    setQty(1);
  }, [style]);
  useEffect(() => {
    if (qty > product.quantity) {
      setQty(product.quantity);
    }
  }, [size]);
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  const searchParams = useSearchParams();

  const frontEndSize = searchParams.get("size");
  const { addToCart, updateCart, emptyCart } = useCartStore();
  const cart = useCartStore((state: any) => state.cart.cartItems);
  const addToCartHandler = async () => {
    if (frontEndSize == null) {
      toast.error("Please select the Size! ");
      return;
    }
    try {
      const data = await getProductDetailsById(
        product._id,
        product.style,
        frontEndSize
      );
      if (qty > data.quantity) {
        toast.error("The quantity you have choosed is more than in stock!");

        return;
      } else if (data.quantity < 1) {
        toast.error("The quantity you have choosed is more than in stock!");

        return;
      } else {
        let _uid = `${data._id}_${product.style}_${frontEndSize}`;
        let exist: any = cart.find((p: any) => p._uid === _uid);
        if (exist) {
          let newCart = cart.map((p: any) => {
            if (p._uid == exist._uid) {
              return { ...p, qty: qty };
            }
            return p;
          });
          updateCart(newCart);
          sonnerToast(
            <div className="flex justify-center items-center gap-[20px] ">
              <Image src={data.images[0].url} alt="_" height={50} width={50} />
              <div className="flex items-center justify-center text-xl upto640:text-[15px]">
                Product updated successfully {ICONS.right}
              </div>
            </div>,
            { style: { backgroundColor: "#00983B" } }
          );
        } else {
          addToCart({
            ...data,
            qty,
            size: data.size,
            _uid,
          });
          sonnerToast(
            <div className="flex justify-center items-center gap-[20px] ">
              <Image src={data.images[0].url} alt="_" height={40} width={40} />
              <div className="flex items-center justify-center text-xl upto640:text-[15px]">
                Product added to cart {ICONS.right}
              </div>
            </div>,
            { style: { backgroundColor: "#00983B" } }
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  // if(!frontEndSize){

  // }
  return (
    <div>
      <div className="upto640:flex upto640:justify-start upto640:ml-1 upto640:items-center flex items-center gap-[10px] pb-[0rem] upto425:text-[15px] upto425:ml-[10rem]">
        <button
          className="p-2 rounded-full grid place-items-center cursor-pointer website-theme-color-bg upto425:text-[15px]"
          onClick={() => qty > 1 && setQty((prev) => prev - 1)}
        >
          <TbMinus className="scale-[0.9]  text-white upto425:text-[15px]" />
        </button>
        <span className="w-[30px] text-center text-2xl upto425:text-[15px]">
          {qty}
        </span>
        <button
          className=" p-2 rounded-full grid place-items-center cursor-pointer website-theme-color-bg upto425:text-[15px]"
          onClick={() => qty < product.quantity && setQty((prev) => prev + 1)}
        >
          <TbPlus className="scale-[0.9] text-white upto425:text-[15px]" />
        </button>
      </div>
      <div className="">
        {product.quantity < 1 && (
          <span className="text-red-500">Out Of Stock</span>
        )}
      </div>
      {/* ActionsPage */}
      <div className="from1024px:flex gap-4 flex from1024px:gap-4 upto425:text-[15px] upto640:flex upto640:justify-center upto640:items-center ">
        {frontEndSize == null ? (
          <>
            <Dialog>
              <DialogTrigger
                className="mt-[1rem] rounded-md text-[17px] website-theme-color-bg text-white z-[50] cursor-pointer w-full font-[600] flex items-center justify-center gap-[10px] h-[60px] upto425:h-[50px] upto425:fixed upto425:bottom-0 upto425:right-[1px] disabled:website-theme-color-bg_disabled"
                disabled={product.quantity < 1 || qty === 0 || size === null}
                style={{
                  cursor: `${product.quantity < 1 ? "not-allowed" : ""}`,
                }}
              >
                <BsHandbagFill
                  className={"w-[30px] h-[30px] translate-y-[-3px]"}
                />
                <b className="">ADD TO CART</b>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="font-bold text-xl">
                  Please Select a Size:{" "}
                </DialogHeader>
                <DialogDescription>
                  <SelectSizes product={product} style={style} />
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <Button
            onClick={() => addToCartHandler()}
            className="mt-[1rem] rounded-md text-[17px] website-theme-color-bg text-white z-[50] cursor-pointer w-full font-[600] flex items-center justify-center gap-[10px] h-[60px] upto425:h-[50px] upto425:fixed upto425:bottom-0 upto425:right-[1px] disabled:website-theme-color-bg_disabled"
            disabled={product.quantity < 1 || qty === 0 || size === null}
            style={{ cursor: `${product.quantity < 1 ? "not-allowed" : ""}` }}
          >
            <BsHandbagFill className={"w-[30px] h-[30px] translate-y-[-3px]"} />
            <b className="">ADD TO CART</b>
          </Button>
        )}

        <button
          // onClick={() => handleWishList()}
          className="rounded-md bg-black mt-[1rem] text-white flex gap-[5px] items-center p-[10px] from425:p-[25px] upto425:p-[10px] upto425:h-[50px] upto425:w-full upto425:justify-center  h-[60px]"
        >
          <BsHeart
            className={"w-[30px] h-[30px] translate-y-[-3px] mt-[5px] "}
          />
          <span className="upto425:text-[15px]">WISHLIST</span>
        </button>
      </div>
    </div>
  );
};

export default QtyButtons;
