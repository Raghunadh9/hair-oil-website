import Order from "@/components/lib/database/models/order.model";
import Product from "@/components/lib/database/models/product.model";
import User from "@/components/lib/database/models/user.model";
import { connectToDatabase } from "@/components/lib/database/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const POST = async (req: Request) => {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { slug } = body;
    const orderData = await Order.findById(slug)
      .populate({ path: "user", model: User })
      .lean();
    return new NextResponse(JSON.stringify(orderData), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
