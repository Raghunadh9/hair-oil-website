import { NextResponse } from "next/server";
import { connectToDatabase } from "@/components/lib/database/db";
import User from "@/components/lib/database/models/user.model";
import Cart from "@/components/lib/database/models/cart.model";
import Coupon from "@/components/lib/database/models/coupon.model";
import Order from "@/components/lib/database/models/order.model";
export const dynamic = "force-dynamic";

export const POST = async (
  req: Request,
  { params, searchParams }: { params: any; searchParams: any }
) => {
  try {
    await connectToDatabase();
    const body = await req.json();
    const {
      products,
      shippingAddress,
      paymentMethod,
      total,
      user_id,
      totalBeforeDiscount,
      couponApplied,
    } = body;
    const user = await User.findById(user_id);
    if (!user) {
      return new NextResponse(`User not found`, {
        status: 500,
        statusText: "User not found",
      });
    }
    const newOrder = await new Order({
      user: user._id,
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
    }).save();

    return NextResponse.json({ order_id: newOrder._id });
  } catch (error: any) {
    return new NextResponse(`${error}`, {
      status: 500,
      statusText: error.message,
    });
  }
};
