"use client";
import { SheetTitle } from "@/components/ui/sheet";
import {
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  useClerk,
} from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@nextui-org/react";
import { UserLoggedinLinks } from "@/config/constants";
import { ICONS } from "../icons";
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
          <Popover>
            <PopoverTrigger asChild>
              <p className="underline">Account</p>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              {UserLoggedinLinks.map((link, index) => (
                <div
                  key={link.text}
                  className="flex flex-row my-5 justify-between font-bold text-[15px]"
                >
                  <Link href={link.href}>
                    {link.text === "Logout" ? <SignOutButton /> : link.text}
                  </Link>
                  {link.href === "/my-profile" && (
                    <span className="">{ICONS.profile}</span>
                  )}

                  {link.href === "/my-profile/orders?tab=1&q=all-orders__" && (
                    <span className="">{ICONS.order}</span>
                  )}
                  {link.href === "/my-profile/address" && (
                    <span className="">{ICONS.map}</span>
                  )}
                  {link.href === "/hair-oils" && (
                    <span>{ICONS.oilBottleMobile}</span>
                  )}
                  {link.href === "/track-order" && (
                    <span>{ICONS.trackOrder}</span>
                  )}
                  {link.href === "" && <span>{ICONS.logOut}</span>}
                </div>
              ))}
            </PopoverContent>
          </Popover>
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
