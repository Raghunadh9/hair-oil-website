import React from "react";
import HomeProductPage from "./home.products";

const ShowHomeProducts = ({
  products,
  isSimilar,
}: {
  products: TypefAllProducts;
  isSimilar: boolean;
}) => {
  return (
    <div className="my-[50px] ">
      <h1 className="text-center font-bold text-2xl website-theme-color mb-5">
        {isSimilar ? "Similar Products" : "All Products"}
      </h1>
      <div className="flex flex-wrap gap-[10px] justify-center ">
        {products.map((product: any, index: any) => (
          <HomeProductPage
            product={product}
            key={index}
            isSimilar={isSimilar}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowHomeProducts;
