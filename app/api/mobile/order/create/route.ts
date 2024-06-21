import { connectToDatabase } from "./../../../../../components/lib/database/db";
export const dynamic = "force-dynamic";
import Order from "@/components/lib/database/models/order.model";
import User from "@/components/lib/database/models/user.model";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    await connectToDatabase();
    const body = await req.json();
    const {
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
      user_id,
      totalSaved,
    } = body;
    const user = await User.findOne({ clerkId: user_id });
    if (!user) {
      NextResponse.json("User not found", { status: 500 });
    }
    const newOrder = await new Order({
      user: user._id,
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
      totalSaved,
    }).save();
    return NextResponse.json(
      { order_id: JSON.parse(JSON.stringify(newOrder._id)) },
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(`${error.message}`, {
      status: 500,
      statusText: error.message,
    });
  }
};
