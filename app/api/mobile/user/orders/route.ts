import { connectToDatabase } from "@/components/lib/database/db";
import Order from "@/components/lib/database/models/order.model";
import User from "@/components/lib/database/models/user.model";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const POST = async (req: Request) => {
  try {
    await connectToDatabase();
    const { clerkId, filter } = await req.json();
    let user = await User.findOne({ clerkId });

    let orders = [];
    if (filter === "") {
      orders = await Order.find({ user: user._id })
        .sort({ createdAt: -1 })
        .lean();
    } else if (filter == "paid") {
      orders = await Order.find({ user: user._id, isPaid: true })
        .sort({ createdAt: -1 })
        .lean();
    } else if (filter == "unpaid") {
      orders = await Order.find({ user: user._id, isPaid: false })
        .sort({ createdAt: -1 })
        .lean();
    } else {
      orders = await Order.find({ user: user._id, status: filter })
        .sort({ createdAt: -1 })
        .lean();
    }
    return NextResponse.json(JSON.parse(JSON.stringify(orders)), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(`${error.message}`, {
      status: 500,
      statusText: error.message,
    });
  }
};
