import { connectToDatabase } from "./../../../../../components/lib/database/db";
export const dynamic = "force-dynamic";
import Order from "@/components/lib/database/models/order.model";
import User from "@/components/lib/database/models/user.model";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  await connectToDatabase();
  const body = await req.json();
  const { id } = body;
  const orderData = await Order.findById(id)
    .populate({ path: "user", model: User })
    .lean();
  if (!orderData) {
    return NextResponse.json("Order not found", { status: 500 });
  }

  return NextResponse.json(JSON.parse(JSON.stringify(orderData)), {
    status: 200,
  });
};
