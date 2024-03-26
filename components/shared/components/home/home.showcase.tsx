import React from "react";

import { HomeShowcaseContent } from "@/config/constants";
import Image from "next/image";

const ProductShowCase = () => {
  return (
    <div className="my-[50px]">
      <h1 className="text-center font-bold text-2xl underline mb-5">
        Why Choose Us?
      </h1>
      <div className="grid md:grid-cols-2 md:gap-6 lg:grid-cols-3 px-1">
        {HomeShowcaseContent.map((i, index) => (
          <div className=" text-center" key={index}>
            <div className="aspect-w-16 aspect-h-">
              <img
                alt="_"
                className="object-cover w-full"
                height="500"
                src={i.image}
                style={{
                  aspectRatio: "500/500",
                  objectFit: "contain",
                }}
                width="600500"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold ">{i.title}</h2>
              <p className="text-sm text-gray-500 ">{i.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductShowCase;
