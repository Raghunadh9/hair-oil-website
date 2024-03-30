"use client";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { ICONS } from "../icons";
import { CartNumber } from "../client/singleProduct/cart.count";
import CartSheetContent from "./cart.sheet";
import { useState } from "react";

const FullCartSheet = () => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger>
        {" "}
        <div className="cursor-pointer relative ">
          {ICONS.cart}
          <span className="border-white border-2 absolute bottom-3 rounded-full w-4 h-4 p-0 right-[-5px] text-black bg-white text-[12px] leading-tight text-center">
            <CartNumber />
          </span>
        </div>
      </SheetTrigger>
      <CartSheetContent setOpen={setSheetOpen} />
    </Sheet>
  );
};

export default FullCartSheet;
