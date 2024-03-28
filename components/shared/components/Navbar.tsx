import Image from "next/image";
import Link from "next/link";
import { NavLinks, UserLoggedinLinks } from "@/config/constants";
import { Button } from "@nextui-org/react";
import { ICONS } from "./icons";

import MobileHamburgerSheet from "../responsive/components/mobile.hamburger.sheet";
import {
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  auth,
} from "@clerk/nextjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

import Logo from "./logo/logo";
import { CartNumber } from "./client/singleProduct/cart.count";
import CartSheetContent from "./cart/cart.sheet";
const Navbar = async () => {
  const { user } = auth();

  return (
    <nav className="flexBetween navbar shadow-md sticky top-0 z-[200] bg-white  upto425:z-[10]">
      <div className="flex-1 flexStart gap-10 bg-">
        <Logo />

        <ul className="xl:flex hidden text-medium font-semibold gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.text}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flexCenter gap-4 ">
        <div className="upto425:hidden flex flex-row gap-4">
          <Link href={"/search-suggestions"}>
            {" "}
            <div className="cursor-pointer">{ICONS.search}</div>
          </Link>
          <Link href={"/favourites"}>
            {" "}
            <div className="cursor-pointer">{ICONS.favourite}</div>
          </Link>
        </div>

        <Sheet>
          <SheetTrigger>
            {" "}
            <div className="cursor-pointer relative ">
              {ICONS.cart}
              <span className="absolute bottom-3 rounded-full website-theme-color-bg w-4 h-4 p-0 right-[-5px] text-white text-[12px] leading-tight text-center">
                <CartNumber />
              </span>
            </div>
          </SheetTrigger>
          <CartSheetContent />
        </Sheet>

        <div className="upto425:hidden">
          <SignedOut>
            {" "}
            <Link href={"/sign-in"}>
              <Button className={"website-theme-color-bg"}>Sign in</Button>
            </Link>
          </SignedOut>
          <SignedIn>
            {/* Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button className={"bg-transparent underline"}>
                  {ICONS.user} Account
                </Button>
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

                    {link.href ===
                      "/my-profile/orders?tab=1&q=all-orders__" && (
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
          </SignedIn>
        </div>
      </div>
      {/* for mobile, add this hamburger */}
      <MobileHamburgerSheet />
    </nav>
  );
};

export default Navbar;
