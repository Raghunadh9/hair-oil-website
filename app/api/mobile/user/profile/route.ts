import Order from "@/components/lib/database/models/order.model";
import { connectToDatabase } from "@/components/lib/database/db";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { sessionUserId, filter } = body;
    await connectToDatabase();
    let orders = [];
    if (!filter) {
      orders = await Order.find({ user: sessionUserId })
        .sort({ createdAt: -1 })
        .lean();
    } else if (filter == "paid") {
      orders = await Order.find({ user: sessionUserId, isPaid: true })
        .sort({ createdAt: -1 })
        .lean();
    } else if (filter == "unpaid") {
      orders = await Order.find({ user: sessionUserId, isPaid: false })
        .sort({ createdAt: -1 })
        .lean();
    } else {
      orders = await Order.find({ user: sessionUserId, status: filter })
        .sort({ createdAt: -1 })
        .lean();
    }
    return NextResponse.json(
      { orders: JSON.parse(JSON.stringify(orders)) },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
