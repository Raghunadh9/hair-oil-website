import { NextResponse } from "next/server";
import { connectToDatabase } from "@/components/lib/database/db";
import Product from "@/components/lib/database/models/product.model";
export const dynamic = "force-dynamic";

export const GET = async (
  req: Request,
  { params, searchParams }: { params: any; searchParams: any }
) => {
  try {
    await connectToDatabase();
    const { id } = params;
    const fullUrl = `${req.url}`;
    const url = new URL(fullUrl);
    const queryParams = url.searchParams;
    const style: any = queryParams.get("style") || 0;
    const size: any = queryParams.get("size") || 0;
    const product: any = await Product.findById(id).lean();
    let discount = product.subProducts[style].discount;
    let priceBefore = product.subProducts[style].sizes[size].price;
    let price = discount ? priceBefore - priceBefore / discount : priceBefore;

    return NextResponse.json(
      {
        _id: product._id.toString(),
        style: Number(style),
        name: product.name,
        description: product.description,
        slug: product.slug,
        sku: product.subProducts[style].sku,
        brand: product.brand,
        category: product.category,
        subCategories: product.subCategories,
        shipping: product.shipping,
        images: product.subProducts[style].images,
        color: product.subProducts[style].color,
        size: product.subProducts[style].sizes[size].size,
        price,
        priceBefore,
        vendor: product.vendor,
        quantity: product.subProducts[style].sizes[size].qty,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(`${error}`, {
      status: 500,
      statusText: error.message,
    });
  }
};
