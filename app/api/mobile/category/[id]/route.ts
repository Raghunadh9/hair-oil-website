import { NextResponse } from "next/server";
import { connectToDatabase } from "@/components/lib/database/db";
import Product from "@/components/lib/database/models/product.model";
import Category from "@/components/lib/database/models/category.model";
export const dynamic = "force-dynamic";
export const GET = async (
  req: Request,
  { params, searchParams }: { params: any; searchParams: any }
) => {
  try {
    await connectToDatabase();
    const { id } = params;
    const category = await Category.findById(id).sort({ updatedAt: -1 }).lean();

    return NextResponse.json(JSON.parse(JSON.stringify(category)), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(`${error.message}`, {
      status: 500,
      statusText: error.message,
    });
  }
};
