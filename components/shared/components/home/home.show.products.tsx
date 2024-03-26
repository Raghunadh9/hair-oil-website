import React from "react";
import HomeProductPage from "./home.products";

const ShowHomeProducts = ({ products }: { products: TypefAllProducts }) => {
  return (
    <div className="my-[50px] ">
      <h1 className="text-center font-bold text-2xl underline mb-5">
        All Products
      </h1>
      <div className="flex flex-wrap gap-[50px] justify-center ">
        {products.map((product: TypeofSingleProduct, index: any) => (
          <HomeProductPage product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ShowHomeProducts;
