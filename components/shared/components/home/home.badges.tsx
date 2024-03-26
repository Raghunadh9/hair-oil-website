import React from "react";
import { HeadphonesIcon, LockIcon, TruckIcon, BadgeCheck } from "lucide-react";

const HomeBadges = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full my-5 gap-5 from1024px:gap-[300px] from768:gap-[30px]">
      <div className="flex flex-col items-center space-y-1.5">
        <TruckIcon className="h-8 w-8 md:h-12 md:w-12" />
        <div className="text-center">
          <h3 className="font-semibold text-sm md:text-lg">Free Shipping</h3>
          <p className="text-xs md:text-sm">On all orders over $50</p>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-1.5">
        <BadgeCheck className="h-8 w-8 md:h-12 md:w-12" />
        <div className="text-center">
          <h3 className="font-semibold text-sm md:text-lg">
            High Quality Checked Products
          </h3>
          <p className="text-xs md:text-sm">Quality assured products</p>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-1.5">
        <LockIcon className="h-8 w-8 md:h-12 md:w-12" />
        <div className="text-center">
          <h3 className="font-semibold text-sm md:text-lg">Secure Payments</h3>
          <p className="text-xs md:text-sm">Your information is safe</p>
        </div>
      </div>
    </div>
  );
};

export default HomeBadges;
