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
    const user = await User.findById(user_id);
    const checkCoupon = await Coupon.findOne({ coupon });
    if (!user) {
      return { error: "User not found" };
    }
    if (checkCoupon == null) {
      return { error: "Invalid Coupon" };
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
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
