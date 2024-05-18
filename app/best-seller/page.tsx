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
export const metadata: Metadata = {
  title: `${config.websiteTitle}: Shop All Products`,
};
const ShopPage = async () => {
  const products: TypefAllProducts = await getAllProducts();

  return (
    <div className="my-[50px] px-5">
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
      <ShowHomeProducts products={products} isSimilar={false} />
    </div>
  );
};

export default ShopPage;
