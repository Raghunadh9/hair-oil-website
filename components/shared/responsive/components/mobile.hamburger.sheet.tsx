import Link from "next/link";
import { ICONS } from "../../components/icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@nextui-org/react";
import { NavLinksMobile } from "@/config/constants";
import { config } from "@/config/config";
import Image from "next/image";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import MobileHamburgerSheetUser from "../../components/client/mobile.hamburger.sheet.user";

const MobileHamburgerSheet = () => {
  return (
    <div className="flexCenter gap-4 from425:hidden">
      <Sheet>
        <SheetTrigger>{ICONS.hamburger}</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <MobileHamburgerSheetUser />
            <SheetDescription>
              <div>
                <SignedOut>
                  <Link href={"/sign-in"}>
                    <Button className="w-full mb-3 website-theme-color-bg">
                      Login / Sign Up {ICONS.rightArrow}
                    </Button>
                  </Link>
                </SignedOut>
              </div>
            </SheetDescription>
          </SheetHeader>
          <div className="text-center bottom-1 ">
            {NavLinksMobile.map((link, index) => (
              <div
                key={link.text}
                className="flex flex-row mb-5 justify-between font-bold text-[15px]"
              >
                <Link href={link.href}>{link.text}</Link>
                {link.href === "/" && (
                  <span className="">{ICONS.homeMobile}</span>
                )}
                {link.href === "/shop" && (
                  <span className="">{ICONS.shopMobile}</span>
                )}
                {link.href === "/hair-oils" && (
                  <span>{ICONS.oilBottleMobile}</span>
                )}
                {link.href === "/search-suggestions" && (
                  <span>{ICONS.searchMobile}</span>
                )}
                {link.href === "/favourites" && (
                  <span>{ICONS.favouriteMobile}</span>
                )}
                {link.href === "/collections" && (
                  <span>{ICONS.collectionsMobile}</span>
                )}
                {link.href === "/cart" && <span>{ICONS.cartMobile}</span>}
              </div>
            ))}
            <SignedIn>
              <div className="flex flex-row mb-2 mt-[30px] justify-between font-bold text-[15px]">
                <SignOutButton />
                <span>{ICONS.signOutMobile}</span>
              </div>
            </SignedIn>
          </div>
          <SheetFooter>
            <div className="w-full bottom-0 text-center absolute right-0 px-[10px] py-[-20px]">
              <Link href="/">
                <div className="flex justify-center">
                  <Image
                    src="/logo.svg"
                    width={80}
                    height={20}
                    alt="logo"
                    // className="absolute right-0  left-[80px]"
                  />
                </div>
              </Link>
              {config.websiteGreatness}
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileHamburgerSheet;
