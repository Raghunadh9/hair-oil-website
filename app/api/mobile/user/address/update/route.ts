import { connectToDatabase } from "@/components/lib/database/db";
import User from "@/components/lib/database/models/user.model";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const PUT = async (req: Request) => {
  try {
    await connectToDatabase();

    const { address, user_id, address_id } = await req.json();
    const user = await User.findOne({ clerkId: user_id });

    if (!user) {
      return NextResponse.json("User not found", { status: 500 });
    }

    const addressIndex = user.address.findIndex(
      (addr: any) => addr._id.toString() === address_id.toString()
    );

    if (addressIndex === -1) {
      return NextResponse.json("Address not found", { status: 404 });
    }

    user.address[addressIndex] = { ...user.address[addressIndex], ...address };
    await user.save();

    return NextResponse.json(
      JSON.parse(JSON.stringify({ addresses: user.address })),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(`${error.message}`, {
      status: 500,
      statusText: error.message,
    });
  }
};
