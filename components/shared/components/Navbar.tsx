import Link from "next/link";
import { NavLinks, UserLoggedinLinks } from "@/config/constants";
import { Button } from "@nextui-org/react";
import { ICONS } from "./icons";

import MobileHamburgerSheet from "../responsive/components/mobile.hamburger.sheet";
import { SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Logo from "./logo/logo";
import FullCartSheet from "./cart/cart.full.sheet";
import { CurrentPageProvider } from "./currentPageProvider";
import { twMerge } from "tailwind-merge";

const Navbar = async () => {
  return (
    <>
      <div className="w-full website-theme-color-bg text-white flex justify-center items-center h-[45px] text-sm">
        ✨Buy One Get One is live✨ | Use code- BOGO
        <Button className="bg-white rounded-md ml-[10px] py-[1px]">
          Shop now
        </Button>
      </div>
      <nav className="uppercase flexBetween navbar shadow-md sticky top-0 z-[200] bg-white text-black upto425:z-[10] h-[90px]">
        <div className="flex-1 flexStart gap-10 bg-">
          <Logo />

          <ul className="xl:flex hidden text-medium gap-7">
            {NavLinks.map((link) => (
              <CurrentPageProvider href={link.href} key={link.text}>
                <Link href={link.href} className={"hover:underline"}>
                  {link.text}
                </Link>
              </CurrentPageProvider>
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

          <FullCartSheet />
          <div className="upto425:hidden">
            <SignedOut>
              {" "}
              <Link href={"/sign-in"}>
                <Button
                  variant="bordered"
                  className="border-2 border-[#00983B] bg-white text-black"
                >
                  Sign in
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              {/* Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center gap-[5px] cursor-pointer">
                    Account <span className="">{ICONS.downArrow}</span>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  {UserLoggedinLinks.map((link, index) => (
                    <div
                      key={link.text}
                      className="flex flex-row my-5 justify-between font-bold text-[15px]"
                    >
                      <Link href={link.href}>
                        {link.text === "Logout" ? (
                          <span className="border-none outline-none">
                            <SignOutButton />
                          </span>
                        ) : (
                          link.text
                        )}
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
    </>
  );
};

export default Navbar;
