import { connectToDatabase } from "@/components/lib/database/db";
import Cart from "@/components/lib/database/models/cart.model";
import User from "@/components/lib/database/models/user.model";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    await connectToDatabase();
    const { userId } = await req.json();
    let user = await User.findOne({ clerkId: userId });
    const cart = await Cart.findOne({ user: user._id });
    return NextResponse.json(
      {
        user: JSON.parse(JSON.stringify(user)),
        cart: JSON.parse(JSON.stringify(cart)),
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return new NextResponse(`${error.message}`, {
      status: 500,
      statusText: error.message,
    });
  }
};
