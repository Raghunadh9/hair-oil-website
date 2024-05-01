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
    const { id, user_id } = body;
    const user = await User.findById(user_id);
    let user_addresses = user.address;
    let addresses = [];
    for (let i = 0; i < user_addresses.length; i++) {
      let temp_address = {};
      if (user_addresses[i]._id == id) {
        temp_address = { ...user_addresses[i].toObject(), active: true };
        addresses.push(temp_address);
      } else {
        temp_address = { ...user_addresses[i].toObject(), active: false };
        addresses.push(temp_address);
      }
    }
    await user.updateOne(
      {
        address: addresses,
      },
      { new: true }
    );

    return NextResponse.json({ addresses });
  } catch (error: any) {
    return new NextResponse(`${error}`, {
      status: 500,
      statusText: error.message,
    });
  }
};

export const DELETE = async (
  req: Request,
  { params, searchParams }: { params: any; searchParams: any }
) => {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { id, user_id } = body;
    const user = await User.findById(user_id);
    await user.updateOne(
      {
        $pull: {
          address: { _id: id },
        },
      },
      { new: true }
    );

    return NextResponse.json({
      addresses: user.address.filter((a: any) => a._id != id),
    });
  } catch (error: any) {
    return new NextResponse(`${error}`, {
      status: 500,
      statusText: error.message,
    });
  }
};
