import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import { connectToDatabase } from "@/components/lib/database/db";
import Order from "@/components/lib/database/models/order.model";
import Product from "@/components/lib/database/models/product.model";
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = await req.json();
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
      .update(body.toString())
      .digest("hex");
    const isAuthentic = expectedSignature === razorpay_signature;
    await connectToDatabase();
    const order = await Order.findById(orderId);
    // console.log(order);

    if (isAuthentic) {
      order.isPaid = true;
      order.paidAt = Date.now();
      // QTY HANDLING:-
      order.products.map(async (i: any, index: number) => {
        const orderedProduct = i.product;
        const orderedProductSize = i.size;
        const orderedProductQty = i.qty;
        const product = await Product.findById(orderedProduct);

        product.subProducts[0].sizes.map(async (item: any, i: number) => {
          if (item.size === orderedProductSize) {
            item.qty = item.qty - orderedProductQty;
          }
        });
        product.subProducts[0].sold += 1;
        await product.save();
      });

      await order.save();
      return NextResponse.json(
        {
          message: "success",
        },
        {
          status: 400,
        }
      );
    } else {
      order.isPaid = false;
      // order.paidAt = Date.now();
      await order.save();
      return NextResponse.json(
        {
          message: "fail",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error: any) {
    console.log("error from backend", error);

    return NextResponse.json(
      {
        message: "success",
        error: error,
      },
      {
        status: 200,
      }
    );
  }
}
