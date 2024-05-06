import { connectToDatabase } from "@/components/lib/database/db";
import Product from "@/components/lib/database/models/product.model";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const GET = async (req: Request) => {
  try {
    await connectToDatabase();
    const products: TypefAllProducts = await Product.find()
      .sort({
        createdAt: -1,
      })
      .lean();
    if (!products) {
      return NextResponse.json("Products are not yet created!", {
        status: 500,
      });
    }
    return NextResponse.json(JSON.parse(JSON.stringify(products)), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(`${error.message}`, {
      status: 500,
      statusText: error.message,
    });
  }
};
