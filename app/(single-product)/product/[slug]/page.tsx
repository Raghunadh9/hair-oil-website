import React from "react";
import { Metadata } from "next";
import { getSingleProduct } from "@/components/lib/actions/product.actions";
import { config } from "@/config/config";
import styles from "./page.module.css";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ProductMainSwiper from "@/components/shared/components/client/singleProduct/single.product.switch.swiper";
import ProductInfo from "@/components/shared/components/singleProduct/product.infos";
import { ICONS } from "@/components/shared/components/icons";
import ProductDetailsTabs from "@/components/shared/components/singleProduct/product.tab.details";
// generate metadata:
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const slug = params.slug;
  const style = Number(searchParams.style);
  const size = Number(searchParams.size) || 0;
  const product = await getSingleProduct(slug, style, size);

  return {
    title: `${config.websiteTitle} - ${product.name}`,
    description: product.description,
  };
}
const SingleProductPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const slug = params.slug;
  const style = Number(searchParams.style);
  const size = Number(searchParams.size) || 0;
  const product: TypeofSingleProduct = await getSingleProduct(
    slug,
    style,
    size
  );
  return (
    <div className="min-h-[100vh] m-4">
      <div className="max-w-[1300px] my-0 mx-auto p-[1rem]">
        {/* BreadCrumb */}
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
                {product.category.name}
              </BreadcrumbLink>
              <BreadcrumbLink>
                {product.subCategories.map((sub: any, index: number) => (
                  <span className="upto425:text-[10px] " key={index}>
                    {sub.name}
                  </span>
                ))}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>{ICONS.rightArrow}</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="upto425:text-[10px] from425:hidden">
                {product.name.substring(0, 15)}...
              </BreadcrumbPage>
              <BreadcrumbPage className="upto425:hidden">
                {product.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className={styles.main}>
          <ProductMainSwiper product={product} />
          <ProductInfo product={product} style={style} size={size} />
        </div>
        <div className="mt-[50px]">
          <ProductDetailsTabs
            product={product}
            details={[product.description, ...product.details]}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
