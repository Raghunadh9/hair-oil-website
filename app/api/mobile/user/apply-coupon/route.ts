import { connectToDatabase } from "@/components/lib/database/db";
import Cart from "@/components/lib/database/models/cart.model";
import Coupon from "@/components/lib/database/models/coupon.model";
import User from "@/components/lib/database/models/user.model";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const PUT = async (req: Request) => {
  try {
    await connectToDatabase();
    const { user_id, coupon } = await req.json();
    const user = await User.findOne({ clerkId: user_id });
    const checkCoupon = await Coupon.findOne({ coupon });
    if (!user) {
      return new NextResponse(`User not found`, {
        status: 404,
      });
    }
    if (checkCoupon == null) {
      return new NextResponse(`Invalid Coupon`, {
        status: 404,
      });
    }
    const { cartTotal } = await Cart.findOne({ user: user_id });
    let totalAfterDiscount =
      cartTotal - (cartTotal * checkCoupon.discount) / 100;
    await Cart.findByIdAndUpdate(user._id, { totalAfterDiscount });
    return NextResponse.json(
      JSON.parse(
        JSON.stringify({
          totalAfterDiscount: totalAfterDiscount.toFixed(2),
          discount: checkCoupon.discount,
        })
      ),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(`${error.message}`, {
      status: 500,
      statusText: error.message,
    });
  }
};
