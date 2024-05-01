import { NextResponse } from "next/server";
import { connectToDatabase } from "@/components/lib/database/db";
import User from "@/components/lib/database/models/user.model";
import Cart from "@/components/lib/database/models/cart.model";
import Coupon from "@/components/lib/database/models/coupon.model";
import mongoose from "mongoose";
export const dynamic = "force-dynamic";

export const POST = async (
  req: Request,
  { params, searchParams }: { params: any; searchParams: any }
) => {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { coupon, user_id } = body;

    // Find the user by user_id
    const user = await User.findById(user_id);
    const checkCoupon = await Coupon.findOne({ coupon });
    if (!user) {
      return new NextResponse("User not found.", { status: 404 });
    }
    if (checkCoupon == null) {
      return NextResponse.json({ message: "Invalid coupon." });
    }
    const { cartTotal } = await Cart.findOne({ user: user_id });
    let totalAfterDiscount =
      cartTotal - (cartTotal * checkCoupon.discount) / 100;
    await Cart.findByIdAndUpdate(user._id, { totalAfterDiscount });

    return NextResponse.json({
      totalAfterDiscount: totalAfterDiscount.toFixed(2),
      discount: checkCoupon.discount,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
