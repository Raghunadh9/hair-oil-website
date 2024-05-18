import React from "react";
import type { Metadata } from "next";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ICONS } from "@/components/shared/components/icons";
import { getAllProducts } from "@/components/lib/actions/product.actions";
import ShowHomeProducts from "@/components/shared/components/home/home.show.products";
import { config } from "@/config/config";
import HeaderFilter from "@/components/shared/components/shop/header.filter";
import { GetDataforBrowsePage } from "@/components/lib/actions/data.browse";
export const metadata: Metadata = {
  title: `${config.websiteTitle}: Shop All Products`,
};
const ShopPage = async ({ searchParams }: { searchParams?: any }) => {
  // const products: TypefAllProducts = await getAllProducts();
  const sortQuery = searchParams.sort || "";

  const data = await GetDataforBrowsePage(sortQuery);
  const products: TypefAllProducts = data.products;

  return (
    <div className="my-[50px] px-5">
      <div className="flex justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="upto425:text-[10px] " href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>{ICONS.rightArrow}</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink className="upto425:text-[10px] ">
                Shop
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>{ICONS.rightArrow}</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="upto425:text-[10px] ">
                All
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <HeaderFilter />
      </div>
      <ShowHomeProducts products={products} isSimilar={false} />
    </div>
  );
};

export default ShopPage;
