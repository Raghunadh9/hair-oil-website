import { connectToDatabase } from "@/components/lib/database/db";
import Order from "@/components/lib/database/models/order.model";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const PUT = async (req: NextRequest, { params }: { params: any }) => {
  try {
    const { id } = params;
    await connectToDatabase();
    const body = await req.json();
    const { orderId, status } = body;
    const order = await Order.findById(orderId);

    if (!order) {
      return new NextResponse("Order not found", { status: 404 });
    }
    order.products = order.products.map((product: any) => {
      if (product._id.toString() === id) {
        return { ...product, status: status.toString() }; // Update the status property of the matched product
      }
      return product; // Return the product unchanged if it doesn't match the productId
    });
    const updatedOrder = await order.save();
    // message:"Order Refund Request Successful!"
    return NextResponse.json(
      { message: "Order Refund Request Successful!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
