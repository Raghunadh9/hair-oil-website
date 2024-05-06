import { NextResponse } from "next/server";
import { connectToDatabase } from "@/components/lib/database/db";
import Product from "@/components/lib/database/models/product.model";
export const dynamic = "force-dynamic";
export const POST = async (
  req: Request,
  { params, searchParams }: { params: any; searchParams: any }
) => {
  try {
    await connectToDatabase();
    const { id } = params;
    const body = await req.json();
    const { style, size } = body;
    const product: any = await Product.findById(id).lean();

    let discount = product.subProducts[style].discount;
    let priceBefore = product.subProducts[style].sizes[size].price;
    let price = discount ? priceBefore - priceBefore / discount : priceBefore;
    let data = {
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
    };
    return NextResponse.json(JSON.parse(JSON.stringify(data)), { status: 200 });
  } catch (error: any) {
    return new NextResponse(`${error.message}`, {
      status: 500,
      statusText: error.message,
    });
  }
};
