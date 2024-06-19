import { connectToDatabase } from "@/components/lib/database/db";
import User from "@/components/lib/database/models/user.model";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const PUT = async (req: Request) => {
  try {
    await connectToDatabase();
    const { id, user_id } = await req.json();
    const user = await User.findOne({ clerkId: user_id });
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
    // Connect to the database
    await connectToDatabase();

    // Parse the request body
    const { id, user_id } = await req.json();

    // Find the user by their clerkId
    const user = await User.findOne({ clerkId: user_id });

    if (!user) {
      return new NextResponse("User not found", {
        status: 404,
        statusText: "User not found",
      });
    }
    // Update the user's addresses by pulling the address with the specified _id
    const updatedUser = await User.findOneAndUpdate(
      { clerkId: user_id },
      { $pull: { address: { _id: id } } },
      { new: true }
    );

    // Check if the update was successful
    if (!updatedUser) {
      return new NextResponse("Address not found or failed to update", {
        status: 400,
        statusText: "Address not found or failed to update",
      });
    }

    // Return the updated addresses
    return NextResponse.json(
      { addresses: updatedUser.address },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    // Handle errors
    return new NextResponse(`${error.message}`, {
      status: 500,
      statusText: error.message,
    });
  }
};
export const POST = async (req: Request) => {
  try {
    await connectToDatabase();

    const { address, user_id } = await req.json();
    const user = await User.findOne({ clerkId: user_id });

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
