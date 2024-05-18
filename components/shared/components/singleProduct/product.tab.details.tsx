import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import Reviews from "../client/singleProduct/reviews/reviews";

const ProductDetailsTabs = ({
  product,
  details,
}: {
  product: any;
  details: any;
}) => {
  return (
    <div className="border-t-2 border-t-gray-300 ">
      <h1 className="my-[50px] text-center from321:my-[10px] text-2xl font-bold">
        Product Details
      </h1>
      <div className=" upto425:overflow-x-auto bg-white shadow-xl">
        <Tabs defaultValue="Description" className="w-full ">
          <TabsList className="grid w-full grid-cols-3 ">
            <TabsTrigger
              value="Description"
              className="py-[20px] border-2 border-gray-500"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="moredetails"
              className="py-[20px] border-2 border-gray-500"
            >
              Details
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="py-[20px] border-2 border-gray-500"
            >
              Reviews ({product.reviews.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Description" className="my-[30px]">
            <div className="p-[50px] ">
              <h1 className="text-xl font-bold">Know Your Product:</h1>
              <div className="text-[18px]">{details[0]}</div>
            </div>
          </TabsContent>
          <TabsContent value="moredetails" className="my-[30px]">
            {details.slice(1, details.length).map((info: any, index: any) => (
              <div key={index}>
                <div className="flex ">
                  <h2 className="flex gap-[2px] font-bold">{info.name}:</h2>
                  <span className="flex gap-[2px] w-[180px] ">
                    &nbsp;
                    {" " + info.value}
                  </span>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="reviews" className="my-[30px]">
            <Reviews product={product} direct={false} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetailsTabs;
