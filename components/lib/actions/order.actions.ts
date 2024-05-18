"use server";
import mongoose from "mongoose";
import { connectToDatabase } from "../database/db";
import Order from "../database/models/order.model";
import User from "../database/models/user.model";

export async function createOrder({
  products,
  shippingAddress,
  paymentMethod,
  total,
  totalBeforeDiscount,
  couponApplied,
  user_id,
  totalSaved,
}: {
  products: any;
  shippingAddress: any;
  paymentMethod: any;
  total: any;
  totalBeforeDiscount: any;
  couponApplied: any;
  user_id: any;
  totalSaved: number;
}) {
  try {
    await connectToDatabase();

    const user = await User.findById(user_id);
    if (!user) {
      return { error: "User not found" };
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
    return { order_id: JSON.parse(JSON.stringify(newOrder._id)) };
  } catch (error) {
    console.log(error);
  }
}
export async function getorderDetailsById(slug: string) {
  await connectToDatabase();
  const orderData = await Order.findById(slug)
    .populate({ path: "user", model: User })
    .lean();
  if (!orderData) {
    return { error: "Order not found" };
  }

  return JSON.parse(JSON.stringify(orderData));
}
