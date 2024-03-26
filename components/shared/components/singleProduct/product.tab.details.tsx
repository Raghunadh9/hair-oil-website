import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const ProductDetailsTabs = ({
  product,
  details,
}: {
  product: any;
  details: any;
}) => {
  return (
    <div className="border-t-2 border-t-gray-300 ">
      <h1 className="my-[50px] underline text-center from321:my-[10px]">
        Product Details
      </h1>
      <div className=" upto425:overflow-x-auto">
        <Tabs defaultValue="Description" className="w-[500px] ">
          <TabsList className="grid w-full grid-cols-2 ">
            <TabsTrigger value="Description">Description</TabsTrigger>
            <TabsTrigger value="moredetails">
              More Details of the product
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Description">
            <div className="">{details[0]}</div>
          </TabsContent>
          <TabsContent value="moredetails">
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
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetailsTabs;
