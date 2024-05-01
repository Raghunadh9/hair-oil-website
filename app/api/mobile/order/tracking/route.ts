import Order from "@/components/lib/database/models/order.model";
import { NextRequest, NextResponse } from "next/server";
import User from "@/components/lib/database/models/user.model";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const body = await req.json();
    const { slug } = body;
    const orderData = await Order.findById(slug)
      .populate({ path: "user", model: User })
      .lean();
    if (!orderData) {
      return { error: "Order not found" };
    }

    return NextResponse.json(orderData, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
};
