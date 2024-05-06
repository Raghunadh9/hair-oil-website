import { connectToDatabase } from "@/components/lib/database/db";
import User from "@/components/lib/database/models/user.model";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const GET = async (
  req: Request,
  { params, searchParams }: { params: any; searchParams: any }
) => {
  try {
    await connectToDatabase();
    const { id } = params;
    const user = await User.findOne({ clerkId: id });
    if (!user) {
      return new NextResponse(`User not found`, {
        status: 500,
      });
    }
    return new NextResponse(user, {
      status: 200,
    });
  } catch (error: any) {
    console.log(error);
    return new NextResponse(`${error}`, {
      status: 500,
      statusText: error.message,
    });
  }
};
export const PUT = async (
  req: Request,
  { params, searchParams }: { params: any; searchParams: any }
) => {
  try {
    await connectToDatabase();
    const { username, image } = await req.json();
    const updatedUser = await User.findOneAndUpdate(
      { clerkId: params.id },
      { username, image },
      {
        new: true,
      }
    );
    if (!updatedUser)
      return new NextResponse(`User update failed`, {
        status: 500,
      });
    return new NextResponse(JSON.parse(JSON.stringify(updatedUser)), {
      status: 200,
    });
  } catch (error: any) {
    console.log(error);
    return new NextResponse(`${error.message}`, {
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
    const userToDelete = await User.findOne({ clerkId: params.id });
    if (!userToDelete) {
      return new NextResponse("User not found ", {
        status: 500,
      });
    }
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    return deletedUser
      ? new NextResponse(JSON.parse(JSON.stringify(deletedUser)), {
          status: 200,
        })
      : null;
  } catch (error: any) {
    console.log(error);
    return new NextResponse(`${error.message}`, {
      status: 500,
      statusText: error.message,
    });
  }
};
