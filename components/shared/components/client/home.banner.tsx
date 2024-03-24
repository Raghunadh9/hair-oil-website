import { Button } from "@nextui-org/react";
import React from "react";

const HomeBanner = () => {
  return (
    <React.Fragment>
      <div className="relative w-full">
        <img
          className="w-full object-cover  filter lg:h-[400px]"
          src="https://i.imgur.com/K9K6MYz.jpg"
          alt="Living room image"
        />
        <div className="absolute top-1/2 left-1/2 mx-auto flex w-11/12 max-w-[1200px] -translate-x-1/2 -translate-y-1/2 flex-col text-center text-white lg:ml-5">
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-left">
            Lorem ipsum
          </h1>
          <p className="pt-3 text-xs lg:w-3/5 lg:pt-5 lg:text-left lg:text-base">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Consequatur aperiam natus, nulla, obcaecati nesciunt, itaque
            adipisci earum ducimus pariatur eaque labore.
          </p>
          <Button className="mx-auto mt-5 w-1/2 bg-amber-400 px-3 py-1 text-black duration-100 hover:bg-yellow-300 lg:mx-0 lg:h-10 lg:w-2/12 lg:px-10">
            Order Now
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomeBanner;
