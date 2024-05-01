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
    const { address, user_id } = body;

    // Find the user by user_id
    const user = await User.findById(user_id);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Check if 'address' property exists and is an array, if not, create it
    if (!user.address || !Array.isArray(user.address)) {
      user.address = [];
    }

    // Use the push method to add the address to the 'address' array
    user.address.push(address);

    // Save the updated user
    await user.save();

    return NextResponse.json({ addresses: user.address });
  } catch (error: any) {
    return new NextResponse(`${error}`, {
      status: 500,
      statusText: error.message,
    });
  }
};
