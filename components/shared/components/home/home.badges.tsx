import React from "react";
import Image from "next/image";

const HomeBadges = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full my-5 gap-[10px] from1024px:gap-[100px] from768:gap-[30px]">
      <div className="flex flex-col items-center space-y-1.5">
        <Image
          src={"/images/illustrations/fast-delivery.png"}
          alt="_"
          height={200}
          width={200}
        />
        <div className="text-center">
          <h3 className="font-semibold text-sm md:text-lg">Fast Shipping</h3>
          <p className="text-xs md:text-sm">Fast Shipping on every Order!!!</p>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-1.5">
        <Image
          src={"/images/illustrations/qulaity-preference.png"}
          alt="_"
          height={200}
          width={200}
        />
        <div className="text-center">
          <h3 className="font-semibold text-sm md:text-lg">
            High Quality Checked Products
          </h3>
          <p className="text-xs md:text-sm">Quality assured products!!!</p>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-1.5">
        <Image
          src={"/images/illustrations/savings-sale.png"}
          alt="_"
          height={300}
          width={300}
        />
        <div className="text-center">
          <h3 className="font-semibold text-sm md:text-lg">Heavy Discounts</h3>
          <p className="text-xs md:text-sm">Heavy discounts on coupons!!!</p>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-1.5">
        <Image
          src={"/images/illustrations/secure-payment-2.png"}
          alt="_"
          height={300}
          width={300}
        />
        <div className="text-center">
          <h3 className="font-semibold text-sm md:text-lg">Secure Payments</h3>
          <p className="text-xs md:text-sm">Your information is safe!!!</p>
        </div>
      </div>
    </div>
  );
};

export default HomeBadges;
