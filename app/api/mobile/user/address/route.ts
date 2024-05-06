import { connectToDatabase } from "@/components/lib/database/db";
import User from "@/components/lib/database/models/user.model";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const PUT = async (req: Request) => {
  try {
    await connectToDatabase();
    const { id, user_id } = await req.json();
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
    return NextResponse.json(JSON.parse(JSON.stringify({ addresses })), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(`${error.message}`, {
      status: 500,
      statusText: error.message,
    });
  }
};
export const DELETE = async (req: Request) => {
  try {
    await connectToDatabase();
    const { id, user_id } = await req.json();
    const user = await User.findById(user_id);
    await user.updateOne(
      {
        $pull: {
          address: { _id: id },
        },
      },
      { new: true }
    );
    return NextResponse.json(
      JSON.parse(
        JSON.stringify({
          addresses: user.address.filter((a: any) => a._id != id),
        })
      ),
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
export const POST = async (req: Request) => {
  try {
    const { address, user_id } = await req.json();
    const user = await User.findById(user_id);

    if (!user) {
      return NextResponse.json("User not found", { status: 500 });
    }
    if (!user.address || !Array.isArray(user.address)) {
      user.address = [];
    }
    user.address.push(address);
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
