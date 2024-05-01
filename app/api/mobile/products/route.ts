import Product from "@/components/lib/database/models/product.model";
import { connectToDatabase } from "@/components/lib/database/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const GET = async (request: Request) => {
  try {
    await connectToDatabase();
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
