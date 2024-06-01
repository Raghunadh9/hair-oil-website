import { NextResponse } from "next/server";
import { connectToDatabase } from "@/components/lib/database/db";
import Product from "@/components/lib/database/models/product.model";
import Category from "@/components/lib/database/models/category.model";
import SubCategory from "@/components/lib/database/models/subCategory.model";
import User from "@/components/lib/database/models/user.model";
export const dynamic = "force-dynamic";
function calculatePercentage(num: any, product: any) {
  return (
    (product.reviews.reduce((a: any, review: any) => {
      return (
        a + (review.rating == Number(num) || review.rating == Number(num) + 0.5)
      );
    }, 0) *
      100) /
    product.reviews.length
  ).toFixed(1);
}
export const POST = async (
  req: Request,
  { params, searchParams }: { params: any; searchParams: any }
) => {
  try {
    await connectToDatabase();
    const { id } = params;
    const body = await req.json();
    const { style, size } = body;
    let product: any = await Product.findById(id)
      .populate({ path: "category", model: Category })
      .populate({ path: "subCategories", model: SubCategory })
      .populate({ path: "reviews.reviewBy", model: User })
      .lean();
    let subProduct = product.subProducts[style];
    let prices = subProduct.sizes
      .map((s: any) => {
        return s.price;
      })
      .sort((a: any, b: any) => {
        return a - b;
      });
    let newProduct = {
      ...product,
      style,
      images: subProduct.images,
      sizes: subProduct.sizes,
      discount: subProduct.discount,
      sku: subProduct.sku,
      colors: product.subProducts.map((p: any) => {
        return p.color;
      }),
      priceRange:
        prices.length > 1
          ? `From Rs.${prices[0]} to Rs.${prices[prices.length - 1]}`
          : "",
      price:
        subProduct.discount > 0
          ? (
              subProduct.sizes[size].price -
              subProduct.sizes[size].price / subProduct.discount
            ).toFixed(2)
          : subProduct.sizes[size].price,
      priceBefore: subProduct.sizes[size].price,
      quantity: subProduct.sizes[size].qty,
      ratings: [
        {
          percentage: calculatePercentage("5", product),
        },
        {
          percentage: calculatePercentage("4", product),
        },
        {
          percentage: calculatePercentage("3", product),
        },
        {
          percentage: calculatePercentage("2", product),
        },
        {
          percentage: calculatePercentage("1", product),
        },
      ],
      allSizes: product.subProducts
        .map((p: any) => {
          return p.sizes;
        })
        .flat()
        .sort((a: any, b: any) => {
          return a.size - b.size;
        })
        .filter(
          (element: any, index: any, array: any) =>
            array.findIndex((el2: any) => el2.size === element.size) === index
        ),
    };
    return NextResponse.json(JSON.parse(JSON.stringify(newProduct)), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(`${error.message}`, {
      status: 500,
      statusText: error.message,
    });
  }
};
