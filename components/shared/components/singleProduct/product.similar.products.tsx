import React from "react";
import ShowHomeProducts from "../home/home.show.products";

const RelatedProducts = ({
  data,
  currentProduct,
}: {
  data: any;
  currentProduct: any;
}) => {
  const products = data.products.filter(
    (val: any) => val._id !== currentProduct._id
  );
  return (
    <div>
      <ShowHomeProducts products={products} isSimilar={true} />
    </div>
  );
};

export default RelatedProducts;
