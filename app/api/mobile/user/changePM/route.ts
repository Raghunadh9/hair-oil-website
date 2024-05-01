import { NextResponse } from "next/server";
import { connectToDatabase } from "@/components/lib/database/db";
import User from "@/components/lib/database/models/user.model";
import Cart from "@/components/lib/database/models/cart.model";
export const dynamic = "force-dynamic";

export const PUT = async (
  req: Request,
  { params, searchParams }: { params: any; searchParams: any }
) => {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { paymentMethod, user_id } = body;

    // Find the user by user_id
    const user = await User.findById(user_id);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    await user.updateOne(
      {
        defaultPaymentMethod: paymentMethod,
      },
      { returnOriginal: false }
    );
    // Save the updated user
    await user.save();

    return NextResponse.json({ paymentMethod: user.defaultPaymentMethod });
  } catch (error: any) {
    return new NextResponse(`${error}`, {
      status: 500,
      statusText: error.message,
    });
  }
};
