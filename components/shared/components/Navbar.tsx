import Image from "next/image";
import Link from "next/link";
import { NavLinks, UserLoggedinLinks } from "@/config/constants";
import { Button } from "@nextui-org/react";
import { ICONS } from "./icons";
import MobileHamburgerSheet from "../responsive/components/mobile.hamburger.sheet";
import { SignOutButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const Navbar = async () => {
  return (
    <nav className="flexBetween navbar shadow-md ">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" width={80} height={20} alt="logo" />
        </Link>

        <ul className="xl:flex hidden text-medium font-semibold gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.text}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flexCenter gap-4 upto425:hidden">
        <Link href={"/search-suggestions"}>
          {" "}
          <div className="cursor-pointer">{ICONS.search}</div>
        </Link>
        <Link href={"/favourites"}>
          {" "}
          <div className="cursor-pointer">{ICONS.favourite}</div>
        </Link>
        <Link href="/cart">
          <div className="cursor-pointer">{ICONS.cart}</div>
        </Link>
        <div className="">
          <SignedOut>
            {" "}
            <Link href={"/sign-in"}>
              <Button className={"website-theme-color-bg"}>Sign in</Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Popover>
              <PopoverTrigger asChild>
                <Button className={"website-theme-color-bg"}>
                  {ICONS.user} Account
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                {UserLoggedinLinks.map((link, index) => (
                  <div
                    key={link.text}
                    className="flex flex-row mb-5 justify-between font-bold text-[15px]"
                  >
                    <Link href={link.href}>
                      {link.text === "Logout" ? <SignOutButton /> : link.text}
                    </Link>
                    {link.href === "/profile" && (
                      <span className="">{ICONS.rightArrow}</span>
                    )}
                    {link.href === "/my-orders" && (
                      <span className="">{ICONS.order}</span>
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
