import Product from "@/components/lib/database/models/product.model";
import { connectToDatabase } from "@/components/lib/database/db";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const data = await req.json();
    const { categoryQuery } = data;

    const category =
      categoryQuery && categoryQuery !== "" ? { category: categoryQuery } : {};
    let products = await Product.find({ ...category });
    return NextResponse.json(
      { success: true, products: JSON.parse(JSON.stringify(products)) },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("error boom", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
