import { NextResponse } from "next/server";
import { connectToDatabase } from "@/components/lib/database/db";
import User from "@/components/lib/database/models/user.model";
import Cart from "@/components/lib/database/models/cart.model";
export const dynamic = "force-dynamic";

export const POST = async (
  req: Request,
  { params, searchParams }: { params: any; searchParams: any }
) => {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { sessionId } = body;
    const user = await User.findById(sessionId);
    const cart = await Cart.findOne({ user: user._id });
    return NextResponse.json({ cart, user });
  } catch (error: any) {
    return new NextResponse(`${error}`, {
      status: 500,
      statusText: error.message,
    });
  }
};
