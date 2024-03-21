"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserLoggedinLinks } from "@/config/constants";
import { ICONS } from "../icons";
const UserClerkDynamicNavbar = () => {
  const { user } = useUser();
  return (
    <>
      {user && (
        // <Link href={"/profile"}>
        <Popover>
          <PopoverTrigger asChild>
            <Image
              src={user?.imageUrl}
              alt=""
              width={30}
              height={30}
              className="rounded-full cursor-pointer"
            />
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
        // </Link>
      )}
    </>
  );
};

export default UserClerkDynamicNavbar;
