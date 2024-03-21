"use client";
import { SheetTitle } from "@/components/ui/sheet";
import { SignedIn, SignedOut, UserButton, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const MobileHamburgerSheetUser = () => {
  const { user } = useClerk();
  return (
    <SheetTitle>
      <SignedOut>
        <span>Welcome Guest!</span>
      </SignedOut>
      <SignedIn>
        <span className="capitalize ">Hai, {user?.username}!</span>

        <div className="flex flex-row mb-2 mt-[30px] justify-between font-bold text-[15px]">
          <Link href={"/profile"} className="font-bold">
            Manage Account
          </Link>
          <div className="">
            {" "}
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </SignedIn>
    </SheetTitle>
  );
};

export default MobileHamburgerSheetUser;
