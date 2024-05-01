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
    const body = await req.json();
    const { products } = body;
    const promises = products.map(async (p: any) => {
      let dbProduct: any = await Product.findById(p._id).lean();
      let originalPrice = dbProduct.subProducts[p.style].sizes.find(
        (x: any) => x.size == p.size
      ).price;
      let quantity = dbProduct.subProducts[p.style].sizes.find(
        (x: any) => x.size == p.size
      ).qty;
      let discount = dbProduct.subProducts[p.style].discount;
      return {
        ...p,
        priceBefore: originalPrice,
        price:
          discount > 0
            ? originalPrice - originalPrice / discount
            : originalPrice,
        discount: discount,
        quantity: quantity,
        shippingFee: dbProduct.shipping,
      };
    });
    const data = await Promise.all(promises);

    return NextResponse.json(data);
  } catch (error: any) {
    return new NextResponse(`${error}`, {
      status: 500,
      statusText: error.message,
    });
  }
};
